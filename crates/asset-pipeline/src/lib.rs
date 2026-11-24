//! Bounded, deterministic, single-worker PNG/JPEG tooling. No network or runtime decoder.
mod compression;
pub use compression::{
    CompressionPolicy, SearchRecord, SearchReport, SearchTimings, encode_exact_png,
    policy_descriptor, search_atlas,
};
use image::{DynamicImage, ImageDecoder, ImageEncoder, ImageFormat, ImageReader, RgbaImage};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::{
    collections::{BTreeMap, BTreeSet},
    fmt, fs,
    io::{Cursor, Read},
    path::{Component, Path},
};
pub const VERSION: &str = "assets-v2/exact-png-1/image-0.25.10/png-0.18.1";
const MAX_FILE: u64 = 8 * 1024 * 1024;
const MAX_PIXELS: u64 = 4 * 1024 * 1024;
const MAX_TOTAL: u64 = 16 * 1024 * 1024;
const MAX_SIDE: u32 = 2048;
#[derive(Debug)]
pub struct AssetError {
    pub code: &'static str,
    pub detail: String,
}
impl fmt::Display for AssetError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.code, self.detail)
    }
}
impl std::error::Error for AssetError {}
type Result<T> = std::result::Result<T, AssetError>;
fn err(code: &'static str, detail: impl ToString) -> AssetError {
    AssetError {
        code,
        detail: detail.to_string(),
    }
}
pub fn hash(bytes: &[u8]) -> String {
    Sha256::digest(bytes)
        .iter()
        .map(|v| format!("{v:02x}"))
        .collect()
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Request {
    pub id: String,
    pub path: String,
    #[serde(default)]
    pub crop: Option<[u32; 4]>,
    #[serde(default)]
    pub size: Option<[u32; 2]>,
    #[serde(default)]
    pub allow_deform: bool,
    #[serde(default = "pivot")]
    pub pivot: [f32; 2],
}
fn pivot() -> [f32; 2] {
    [0.5, 0.5]
}
#[derive(Clone, Debug, Serialize)]
pub struct AssetInfo {
    pub id: String,
    pub path: String,
    pub source_sha256: String,
    pub source_bytes: u64,
    pub source_mime: String,
    pub source_width: u32,
    pub source_height: u32,
    pub pixel_format: &'static str,
    pub request_sha256: String,
    pub width: u32,
    pub height: u32,
    pub has_alpha: bool,
    pub decoded_bytes: u64,
    pub transformed_sha256: String,
    pub operations: Vec<String>,
    pub pivot: [f32; 2],
    pub png_bytes: usize,
    pub jpeg_bytes: Option<usize>,
    pub quality_review: &'static str,
}
struct Decoded {
    info: AssetInfo,
    pixels: RgbaImage,
}
/// Read a bounded regular file beneath a local project root, without image decoding.
/// Also used to diagnose referenced media that this image-only pipeline cannot process.
pub fn read_source(root: &Path, path: &str) -> Result<Vec<u8>> {
    if path.is_empty()
        || path.contains(['\\', ':', '%', '\0'])
        || Path::new(path)
            .components()
            .any(|c| !matches!(c, Component::Normal(_)))
    {
        return Err(err("E_ASSET_PATH", path));
    }
    let root = root.canonicalize().map_err(|e| err("E_ASSET_ROOT", e))?;
    let mut current = root.clone();
    for part in Path::new(path).components() {
        current.push(part);
        let meta = fs::symlink_metadata(&current).map_err(|e| err("E_ASSET_READ", e))?;
        if meta.file_type().is_symlink() {
            return Err(err("E_ASSET_PATH", "symlinks forbidden"));
        }
    }
    let canonical = current.canonicalize().map_err(|e| err("E_ASSET_READ", e))?;
    if !canonical.starts_with(&root) {
        return Err(err("E_ASSET_PATH", path));
    }
    if !fs::metadata(&canonical)
        .map_err(|e| err("E_ASSET_READ", e))?
        .is_file()
    {
        return Err(err("E_ASSET_PATH", "not a regular file"));
    }
    let file = fs::File::open(canonical).map_err(|e| err("E_ASSET_READ", e))?;
    let meta = file.metadata().map_err(|e| err("E_ASSET_READ", e))?;
    if !meta.is_file() || meta.len() > MAX_FILE {
        return Err(err("E_ASSET_TOO_LARGE", "not a regular file or >8MiB"));
    }
    let mut data = Vec::new();
    file.take(MAX_FILE + 1)
        .read_to_end(&mut data)
        .map_err(|e| err("E_ASSET_READ", e))?;
    if data.len() as u64 > MAX_FILE {
        return Err(err("E_ASSET_TOO_LARGE", path));
    }
    Ok(data)
}
fn supported(bytes: &[u8]) -> Result<ImageFormat> {
    let format = image::guess_format(bytes).map_err(|e| err("E_ASSET_FORMAT", e))?;
    match format {
        ImageFormat::Png => {
            let mut offset = 8usize;
            while offset + 12 <= bytes.len() {
                let size = u32::from_be_bytes(
                    bytes[offset..offset + 4]
                        .try_into()
                        .map_err(|e| err("E_ASSET_CORRUPT", e))?,
                ) as usize;
                let end = offset
                    .checked_add(size)
                    .and_then(|v| v.checked_add(12))
                    .filter(|end| *end <= bytes.len())
                    .ok_or_else(|| err("E_ASSET_CORRUPT", "truncated PNG chunk"))?;
                let kind = &bytes[offset + 4..offset + 8];
                // We emit unprofiled sRGB-assumed RGBA. These chunks can change browser
                // appearance without changing raw channels; reject before decode/hash/dedup.
                if matches!(
                    kind,
                    b"gAMA" | b"cHRM" | b"iCCP" | b"cICP" | b"mDCV" | b"cLLI"
                ) {
                    return Err(err(
                        "E_ASSET_COLOR_PROFILE",
                        "PNG color metadata requires reviewed conversion to sRGB before import",
                    ));
                }
                if kind == b"acTL" {
                    return Err(err("E_ASSET_FORMAT", "animated PNG unsupported"));
                }
                offset = end;
            }
        }
        ImageFormat::Jpeg => {
            let mut pos = 2;
            while pos + 1 < bytes.len() {
                if bytes[pos] != 0xff {
                    return Err(err("E_ASSET_CORRUPT", "JPEG marker"));
                }
                while pos < bytes.len() && bytes[pos] == 0xff {
                    pos += 1;
                }
                let marker = *bytes
                    .get(pos)
                    .ok_or_else(|| err("E_ASSET_CORRUPT", "JPEG marker"))?;
                pos += 1;
                if marker == 0xda || marker == 0xd9 {
                    break;
                }
                if marker == 0xc2 {
                    return Err(err("E_ASSET_FORMAT", "progressive JPEG unsupported"));
                }
                if marker == 0x01 || (0xd0..=0xd8).contains(&marker) {
                    continue;
                }
                let length = bytes
                    .get(pos..pos + 2)
                    .ok_or_else(|| err("E_ASSET_CORRUPT", "JPEG length"))?;
                let length = u16::from_be_bytes([length[0], length[1]]) as usize;
                if length < 2 {
                    return Err(err("E_ASSET_CORRUPT", "JPEG length"));
                }
                pos += length;
            }
        }
        _ => {
            return Err(err(
                "E_ASSET_FORMAT",
                "only static PNG and baseline JPEG supported",
            ));
        }
    }
    Ok(format)
}
fn png(pixels: &RgbaImage) -> Result<Vec<u8>> {
    let mut data = Vec::new();
    image::codecs::png::PngEncoder::new_with_quality(
        &mut data,
        image::codecs::png::CompressionType::Best,
        image::codecs::png::FilterType::Adaptive,
    )
    .write_image(
        pixels.as_raw(),
        pixels.width(),
        pixels.height(),
        image::ExtendedColorType::Rgba8,
    )
    .map_err(|e| err("E_ASSET_ENCODE", e))?;
    Ok(data)
}
/// Internal comparison entry: baseline encoder on an already validated raster.
pub fn encode_baseline_png(pixels: &RgbaImage) -> Result<Vec<u8>> {
    if pixels.width() == 0
        || pixels.height() == 0
        || pixels.width() > MAX_SIDE
        || pixels.height() > MAX_SIDE
    {
        return Err(err("E_ASSET_TOO_LARGE", "PNG dimensions"));
    }
    png(pixels)
}

fn jpeg(pixels: &RgbaImage) -> Result<Vec<u8>> {
    let rgb = DynamicImage::ImageRgba8(pixels.clone()).into_rgb8();
    let mut data = Vec::new();
    image::codecs::jpeg::JpegEncoder::new_with_quality(&mut data, 90)
        .encode(
            rgb.as_raw(),
            rgb.width(),
            rgb.height(),
            image::ExtendedColorType::Rgb8,
        )
        .map_err(|e| err("E_ASSET_ENCODE", e))?;
    Ok(data)
}
fn decode(root: &Path, request: &Request) -> Result<Decoded> {
    let bytes = read_source(root, &request.path)?;
    let format = supported(&bytes)?;
    let mut reader = ImageReader::with_format(Cursor::new(&bytes), format);
    let mut limits = image::Limits::default();
    limits.max_image_width = Some(MAX_SIDE);
    limits.max_image_height = Some(MAX_SIDE);
    limits.max_alloc = Some(32 * 1024 * 1024);
    reader.limits(limits);
    let mut decoder = reader
        .into_decoder()
        .map_err(|e| err("E_ASSET_CORRUPT", e))?;
    let (w, h) = decoder.dimensions();
    if u64::from(w) * u64::from(h) > MAX_PIXELS {
        return Err(err("E_ASSET_TOO_LARGE", "decoded pixel bound"));
    }
    if decoder
        .icc_profile()
        .map_err(|e| err("E_ASSET_CORRUPT", e))?
        .is_some()
    {
        return Err(err(
            "E_ASSET_COLOR_PROFILE",
            "ICC sources require reviewed conversion to sRGB before import",
        ));
    }
    let orientation = decoder
        .orientation()
        .map_err(|e| err("E_ASSET_CORRUPT", e))?;
    let mut image = DynamicImage::from_decoder(decoder).map_err(|e| err("E_ASSET_CORRUPT", e))?;
    image.apply_orientation(orientation);
    let (source_width, source_height) = (image.width(), image.height());
    let mut operations = vec![format!(
        "{VERSION}: decode RGBA8; orientation {orientation:?}"
    )];
    if let Some([x, y, w, h]) = request.crop {
        if w == 0
            || h == 0
            || x.checked_add(w).is_none_or(|v| v > image.width())
            || y.checked_add(h).is_none_or(|v| v > image.height())
        {
            return Err(err("E_ASSET_CROP", &request.id));
        }
        image = image.crop_imm(x, y, w, h);
        operations.push(format!("crop {x},{y},{w},{h}"));
    }
    if let Some([w, h]) = request.size {
        if w == 0 || h == 0 || w > MAX_SIDE || h > MAX_SIDE {
            return Err(err("E_ASSET_TOO_LARGE", "resize bounds"));
        }
        if !request.allow_deform
            && u64::from(w) * u64::from(image.height()) != u64::from(h) * u64::from(image.width())
        {
            return Err(err(
                "E_ASSET_ASPECT",
                "resize changes aspect ratio; crop explicitly or allow_deform",
            ));
        }
        // Premultiply before filtering to avoid dark/colored halos at transparent edges.
        let mut rgba = image.to_rgba32f();
        for p in rgba.pixels_mut() {
            for c in 0..3 {
                p[c] *= p[3];
            }
        }
        let mut resized =
            image::imageops::resize(&rgba, w, h, image::imageops::FilterType::Lanczos3);
        for p in resized.pixels_mut() {
            if p[3] > 0.0 {
                for c in 0..3 {
                    p[c] = (p[c] / p[3]).clamp(0.0, 1.0);
                }
            }
        }
        image = DynamicImage::ImageRgba32F(resized);
        operations.push(format!("resize {w}x{h} Lanczos3 premultiplied"));
    }
    let pixels = image.into_rgba8();
    let has_alpha = pixels.pixels().any(|p| p[3] != 255);
    operations.push("encode PNG Best/Adaptive; JPEG90 candidate only if opaque".into());
    let info = AssetInfo {
        id: request.id.clone(),
        path: request.path.clone(),
        source_sha256: hash(&bytes),
        source_bytes: bytes.len() as u64,
        source_mime: format.to_mime_type().into(),
        source_width,
        source_height,
        pixel_format: "RGBA8",
        request_sha256: hash(&serde_json::to_vec(request).map_err(|e| err("E_ASSET_REQUEST", e))?),
        width: pixels.width(),
        height: pixels.height(),
        has_alpha,
        decoded_bytes: u64::from(pixels.width()) * u64::from(pixels.height()) * 4,
        transformed_sha256: hash(pixels.as_raw()),
        operations,
        pivot: request.pivot,
        png_bytes: png(&pixels)?.len(),
        jpeg_bytes: if has_alpha {
            None
        } else {
            Some(jpeg(&pixels)?.len())
        },
        quality_review: "lossless PNG default; JPEG90 candidate requires human approval",
    };
    Ok(Decoded { info, pixels })
}
/// Validate an untrusted embedded PNG without filesystem access or unbounded decoding.
pub fn decode_embedded_png(bytes: &[u8]) -> Result<RgbaImage> {
    if bytes.len() as u64 > MAX_FILE {
        return Err(err("E_ASSET_TOO_LARGE", "embedded PNG encoded bound"));
    }
    if supported(bytes)? != ImageFormat::Png {
        return Err(err("E_ASSET_FORMAT", "embedded atlas must be PNG"));
    }
    let mut reader = ImageReader::with_format(Cursor::new(bytes), ImageFormat::Png);
    let mut limits = image::Limits::default();
    limits.max_image_width = Some(MAX_SIDE);
    limits.max_image_height = Some(MAX_SIDE);
    limits.max_alloc = Some(32 * 1024 * 1024);
    reader.limits(limits);
    let decode_error = |e: image::ImageError| {
        let code = if matches!(&e, image::ImageError::Limits(_)) {
            "E_ASSET_TOO_LARGE"
        } else {
            "E_ASSET_CORRUPT"
        };
        err(code, e)
    };
    let decoder = reader.into_decoder().map_err(decode_error)?;
    let (width, height) = decoder.dimensions();
    if u64::from(width) * u64::from(height) > MAX_PIXELS {
        return Err(err("E_ASSET_TOO_LARGE", "embedded PNG pixel bound"));
    }
    Ok(DynamicImage::from_decoder(decoder)
        .map_err(decode_error)?
        .into_rgba8())
}
pub fn validate_embedded_png(bytes: &[u8]) -> Result<(u32, u32)> {
    Ok(decode_embedded_png(bytes)?.dimensions())
}

fn discover(root: &Path, requests: &[Request]) -> Result<Vec<Decoded>> {
    if requests.is_empty() || requests.len() > 64 {
        return Err(err("E_ASSET_COUNT", "expected 1–64 references"));
    }
    let mut sorted = requests.to_vec();
    sorted.sort_by(|a, b| a.id.cmp(&b.id));
    let mut ids = BTreeSet::new();
    let mut total = 0;
    let mut results = Vec::new();
    for request in sorted {
        if request.id.is_empty()
            || request.id.len() > 64
            || !request
                .id
                .bytes()
                .all(|c| c.is_ascii_alphanumeric() || c == b'-' || c == b'_')
            || !ids.insert(request.id.clone())
            || request
                .pivot
                .iter()
                .any(|v| !v.is_finite() || !(0.0..=1.0).contains(v))
        {
            return Err(err("E_ASSET_REQUEST", "invalid/duplicate ID or pivot"));
        }
        let decoded = decode(root, &request)?;
        total += decoded.info.decoded_bytes;
        if total > MAX_TOTAL {
            return Err(err("E_ASSET_MEMORY", "total decoded assets exceed 16MiB"));
        }
        results.push(decoded);
    }
    Ok(results)
}
pub fn inspect(root: &Path, requests: &[Request]) -> Result<Vec<AssetInfo>> {
    Ok(discover(root, requests)?
        .into_iter()
        .map(|v| v.info)
        .collect())
}
#[derive(Clone, Debug, Serialize)]
pub struct Sprite {
    pub rect: [u32; 4],
    pub uv: [f32; 4],
    pub pivot: [f32; 2],
    pub canonical_id: String,
}
#[derive(Clone, Debug, Serialize)]
pub struct AtlasReport {
    pub version: &'static str,
    pub workers: u8,
    pub mime: &'static str,
    pub width: u32,
    pub height: u32,
    pub extrusion: u32,
    pub decoded_bytes: u64,
    pub png_bytes: usize,
    pub jpeg_bytes: Option<usize>,
    pub sha256: String,
    pub sprites: BTreeMap<String, Sprite>,
    pub assets: Vec<AssetInfo>,
}
pub struct Atlas {
    pub report: AtlasReport,
    pub png: Vec<u8>,
    pub jpeg_candidate: Option<Vec<u8>>,
}
/// Stable ID order, shelf packing, no rotation, two-pixel extrusion. Lossless output is always selected.
pub fn build_atlas_baseline(root: &Path, requests: &[Request], side: u32) -> Result<Atlas> {
    if !(16..=MAX_SIDE).contains(&side) {
        return Err(err("E_ATLAS_SIZE", "side must be 16–2048"));
    }
    let decoded = discover(root, requests)?;
    layout_atlas(&decoded, side, side, false)
}
fn layout_pixels(
    decoded: &[Decoded],
    side: u32,
    row_width: u32,
    height_order: bool,
) -> Result<(Atlas, RgbaImage)> {
    if !(16..=MAX_SIDE).contains(&side) {
        return Err(err("E_ATLAS_SIZE", "side must be 16–2048"));
    }
    let mut indices: Vec<_> = (0..decoded.len()).collect();
    if height_order {
        indices.sort_by_key(|&i| {
            (
                std::cmp::Reverse(decoded[i].info.height),
                std::cmp::Reverse(decoded[i].info.width),
                &decoded[i].info.id,
            )
        });
    }
    let mut positions = BTreeMap::<String, ([u32; 4], String)>::new();
    let mut sprites = BTreeMap::new();
    let mut unique = Vec::new();
    let (mut x, mut y, mut row, mut width) = (0, 0, 0, 0);
    for index in indices {
        let asset = &decoded[index];
        let key = format!(
            "{}:{}:{}",
            asset.info.width, asset.info.height, asset.info.transformed_sha256
        );
        let (rect, canonical) = if let Some(v) = positions.get(&key) {
            v.clone()
        } else {
            let w = asset.info.width + 4;
            let h = asset.info.height + 4;
            if w > row_width || h > side {
                return Err(err("E_ATLAS_FULL", &asset.info.id));
            }
            if x + w > row_width {
                x = 0;
                y += row;
                row = 0;
            }
            if y + h > side {
                return Err(err("E_ATLAS_FULL", "reduce output sizes or split atlas"));
            }
            let rect = [x + 2, y + 2, w - 4, h - 4];
            x += w;
            row = row.max(h);
            width = width.max(x);
            let value = (rect, asset.info.id.clone());
            positions.insert(key, value.clone());
            unique.push((index, rect));
            value
        };
        sprites.insert(
            asset.info.id.clone(),
            Sprite {
                rect,
                uv: [0.0; 4],
                pivot: asset.info.pivot,
                canonical_id: canonical,
            },
        );
    }
    let height = y + row;
    let mut pixels = RgbaImage::new(width, height);
    for (index, [x, y, w, h]) in unique {
        let source = &decoded[index].pixels;
        for dy in 0..h + 4 {
            for dx in 0..w + 4 {
                pixels.put_pixel(
                    x + dx - 2,
                    y + dy - 2,
                    *source.get_pixel(
                        dx.saturating_sub(2).min(w - 1),
                        dy.saturating_sub(2).min(h - 1),
                    ),
                );
            }
        }
    }
    for sprite in sprites.values_mut() {
        let [x, y, w, h] = sprite.rect;
        sprite.uv = [
            x as f32 / width as f32,
            y as f32 / height as f32,
            (x + w) as f32 / width as f32,
            (y + h) as f32 / height as f32,
        ];
    }
    let png = Vec::new();
    let jpeg_candidate: Option<Vec<u8>> = None;
    let report = AtlasReport {
        version: VERSION,
        workers: 1,
        mime: "image/png",
        width,
        height,
        extrusion: 2,
        decoded_bytes: u64::from(width) * u64::from(height) * 4,
        png_bytes: png.len(),
        jpeg_bytes: jpeg_candidate.as_ref().map(Vec::len),
        sha256: hash(&png),
        sprites,
        assets: decoded.iter().map(|v| v.info.clone()).collect(),
    };
    Ok((
        Atlas {
            report,
            png,
            jpeg_candidate,
        },
        pixels,
    ))
}

fn layout_atlas(
    decoded: &[Decoded],
    side: u32,
    row_width: u32,
    height_order: bool,
) -> Result<Atlas> {
    let (mut atlas, pixels) = layout_pixels(decoded, side, row_width, height_order)?;
    atlas.png = png(&pixels)?;
    atlas.report.png_bytes = atlas.png.len();
    atlas.report.sha256 = hash(&atlas.png);
    atlas.jpeg_candidate = if pixels.pixels().all(|p| p[3] == 255) {
        Some(jpeg(&pixels)?)
    } else {
        None
    };
    atlas.report.jpeg_bytes = atlas.jpeg_candidate.as_ref().map(Vec::len);
    Ok(atlas)
}
/// Standalone atlas tooling has no HTML context. Keep legacy layout and select exact PNG bytes.
pub fn build_atlas(root: &Path, requests: &[Request], side: u32) -> Result<Atlas> {
    if !(16..=MAX_SIDE).contains(&side) {
        return Err(err("E_ATLAS_SIZE", "side must be 16–2048"));
    }
    let decoded = discover(root, requests)?;
    let (mut winner, pixels) = layout_pixels(&decoded, side, side, false)?;
    winner.png = png(&pixels)?;
    compression::visit_encodings(&pixels, |_, bytes| {
        if bytes.len() < winner.png.len() {
            winner.png = bytes;
        }
        Ok(())
    })?;
    winner.jpeg_candidate = if pixels.pixels().all(|p| p[3] == 255) {
        Some(jpeg(&pixels)?)
    } else {
        None
    };
    winner.report.jpeg_bytes = winner.jpeg_candidate.as_ref().map(Vec::len);
    winner.report.png_bytes = winner.png.len();
    winner.report.sha256 = hash(&winner.png);
    Ok(winner)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::sync::atomic::{AtomicUsize, Ordering};
    static NEXT: AtomicUsize = AtomicUsize::new(0);
    struct Fixture(std::path::PathBuf);
    impl Fixture {
        fn new() -> Self {
            let p = std::env::temp_dir().join(format!(
                "playable-assets-{}-{}",
                std::process::id(),
                NEXT.fetch_add(1, Ordering::Relaxed)
            ));
            fs::create_dir(&p).unwrap();
            Self(p)
        }
        fn put(&self, name: &str, pixels: &RgbaImage) {
            fs::write(self.0.join(name), png(pixels).unwrap()).unwrap();
        }
    }
    impl Drop for Fixture {
        fn drop(&mut self) {
            fs::remove_dir_all(&self.0).unwrap();
        }
    }
    fn req(id: &str, path: &str) -> Request {
        Request {
            id: id.into(),
            path: path.into(),
            crop: None,
            size: None,
            allow_deform: false,
            pivot: [0.5, 0.5],
        }
    }
    #[test]
    fn sha256_known_vector() {
        assert_eq!(
            hash(b"abc"),
            "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
        );
    }
    #[test]
    fn sniff_not_extension_and_alpha_preserved() {
        let f = Fixture::new();
        let mut p = RgbaImage::from_pixel(3, 2, image::Rgba([255, 0, 0, 255]));
        p.put_pixel(1, 1, image::Rgba([0, 255, 0, 64]));
        f.put("a.bin", &p);
        let info = inspect(&f.0, &[req("a", "a.bin")]).unwrap();
        assert_eq!(info[0].source_mime, "image/png");
        assert!(info[0].has_alpha);
        assert_eq!(info[0].jpeg_bytes, None);
        assert_eq!(info[0].decoded_bytes, 24);
    }
    #[test]
    fn corrupt_and_unsupported_are_typed_without_panics() {
        let f = Fixture::new();
        for data in [
            vec![],
            b"<svg onload='alert(1)'/>".to_vec(),
            b"GIF89a".to_vec(),
            b"\x89PNG\r\n\x1a\n".to_vec(),
            vec![255, 216, 255, 224, 0, 0],
            b"\x89PNG\r\n\x1a\n\0\0\0\0acTL\0\0\0\0".to_vec(),
            vec![255, 216, 255, 194, 0, 2],
        ] {
            fs::write(f.0.join("bad"), data).unwrap();
            assert!(
                inspect(&f.0, &[req("bad", "bad")])
                    .unwrap_err()
                    .code
                    .starts_with("E_ASSET_")
            );
        }
    }
    #[test]
    fn traversal_absolute_encoded_and_symlink_rejected() {
        let f = Fixture::new();
        for path in ["../a", "/etc/passwd", "a/../b", "a\\b", "C:a", "a%2fb", ""] {
            assert_eq!(
                inspect(&f.0, &[req("a", path)]).unwrap_err().code,
                "E_ASSET_PATH"
            );
        }
        #[cfg(unix)]
        {
            std::os::unix::fs::symlink("/etc/passwd", f.0.join("link")).unwrap();
            assert_eq!(
                inspect(&f.0, &[req("a", "link")]).unwrap_err().code,
                "E_ASSET_PATH"
            );
        }
    }
    #[test]
    fn oversized_source_and_decoded_headers_rejected() {
        let f = Fixture::new();
        let file = fs::File::create(f.0.join("large")).unwrap();
        file.set_len(MAX_FILE + 1).unwrap();
        assert_eq!(
            inspect(&f.0, &[req("a", "large")]).unwrap_err().code,
            "E_ASSET_TOO_LARGE"
        );
        let p = RgbaImage::new(2049, 1);
        f.put("wide", &p);
        assert!(inspect(&f.0, &[req("a", "wide")]).is_err());
    }
    #[test]
    fn crop_resize_and_explicit_aspect_guard() {
        let f = Fixture::new();
        let p = RgbaImage::from_fn(4, 4, |x, y| image::Rgba([x as u8, y as u8, 0, 255]));
        f.put("p", &p);
        let mut r = req("a", "p");
        r.crop = Some([2, 1, 2, 2]);
        r.size = Some([4, 4]);
        let d = decode(&f.0, &r).unwrap();
        assert_eq!((d.info.width, d.info.height), (4, 4));
        assert!(d.info.jpeg_bytes.is_some());
        r.size = Some([4, 3]);
        assert_eq!(decode(&f.0, &r).err().unwrap().code, "E_ASSET_ASPECT");
        r.allow_deform = true;
        assert!(decode(&f.0, &r).is_ok());
        r.crop = Some([u32::MAX, 0, 2, 2]);
        assert_eq!(decode(&f.0, &r).err().unwrap().code, "E_ASSET_CROP");
    }
    #[test]
    fn atlas_dedup_order_uv_extrusion_and_roundtrip_pixels() {
        let f = Fixture::new();
        let p = RgbaImage::from_fn(3, 2, |x, y| {
            image::Rgba([x as u8 * 40, y as u8 * 60, 90, 128])
        });
        f.put("a", &p);
        f.put("duplicate", &p);
        let requests = [req("z", "duplicate"), req("a", "a")];
        let a = build_atlas(&f.0, &requests, 32).unwrap();
        let b = build_atlas(&f.0, &[requests[1].clone(), requests[0].clone()], 32).unwrap();
        assert_eq!(a.png, b.png);
        assert_eq!(
            serde_json::to_vec(&a.report).unwrap(),
            serde_json::to_vec(&b.report).unwrap()
        );
        assert_eq!(a.report.sprites["z"].canonical_id, "a");
        assert_eq!(a.report.sprites["a"].rect, [2, 2, 3, 2]);
        assert_eq!((a.report.width, a.report.height), (7, 6));
        let decoded = image::load_from_memory(&a.png).unwrap().into_rgba8();
        for y in 0..6 {
            for x in 0..7 {
                assert_eq!(
                    decoded.get_pixel(x, y),
                    p.get_pixel(x.saturating_sub(2).min(2), y.saturating_sub(2).min(1))
                );
            }
        }
        let s = &a.report.sprites["a"];
        assert_eq!(s.uv, [2.0 / 7.0, 2.0 / 6.0, 5.0 / 7.0, 4.0 / 6.0]);
    }
    #[test]
    fn atlas_full_and_invalid_requests_fail_closed() {
        let f = Fixture::new();
        f.put("p", &RgbaImage::new(16, 16));
        assert_eq!(
            build_atlas(&f.0, &[req("a", "p")], 16).err().unwrap().code,
            "E_ATLAS_FULL"
        );
        assert_eq!(inspect(&f.0, &[]).unwrap_err().code, "E_ASSET_COUNT");
        assert_eq!(
            inspect(&f.0, &[req("a", "p"), req("a", "p")])
                .unwrap_err()
                .code,
            "E_ASSET_REQUEST"
        );
        let mut r = req("a", "p");
        r.pivot = [f32::NAN, 0.0];
        assert_eq!(inspect(&f.0, &[r]).unwrap_err().code, "E_ASSET_REQUEST");
    }
    #[test]
    fn total_memory_and_count_bounded() {
        let f = Fixture::new();
        f.put("p", &RgbaImage::new(1024, 1024));
        let requests = (0..5)
            .map(|i| req(&format!("a{i}"), "p"))
            .collect::<Vec<_>>();
        assert_eq!(inspect(&f.0, &requests).unwrap_err().code, "E_ASSET_MEMORY");
        assert_eq!(
            inspect(&f.0, &vec![req("a", "p"); 65]).unwrap_err().code,
            "E_ASSET_COUNT"
        );
    }
    #[test]
    fn jpeg_baseline_candidate_roundtrip() {
        let f = Fixture::new();
        let pixels = RgbaImage::from_pixel(8, 8, image::Rgba([210, 80, 40, 255]));
        fs::write(f.0.join("jpeg"), jpeg(&pixels).unwrap()).unwrap();
        let d = decode(&f.0, &req("a", "jpeg")).unwrap();
        assert_eq!(d.info.source_mime, "image/jpeg");
        assert!(!d.info.has_alpha);
        assert_eq!((d.info.width, d.info.height), (8, 8));
    }
    #[test]
    fn icc_profile_requires_explicit_conversion() {
        let f = Fixture::new();
        let pixels = RgbaImage::from_pixel(2, 2, image::Rgba([0, 0, 255, 255]));
        let mut bytes = Vec::new();
        let mut encoder = image::codecs::png::PngEncoder::new(&mut bytes);
        encoder.set_icc_profile(vec![0; 128]).unwrap();
        encoder
            .write_image(pixels.as_raw(), 2, 2, image::ExtendedColorType::Rgba8)
            .unwrap();
        fs::write(f.0.join("icc"), bytes).unwrap();
        assert_eq!(
            inspect(&f.0, &[req("a", "icc")]).unwrap_err().code,
            "E_ASSET_COLOR_PROFILE"
        );
    }
    #[test]
    fn resize_filters_alpha_without_hidden_color_halo() {
        let f = Fixture::new();
        let pixels = RgbaImage::from_fn(2, 1, |x, _| {
            if x == 0 {
                image::Rgba([255, 0, 0, 0])
            } else {
                image::Rgba([0, 0, 255, 255])
            }
        });
        f.put("p", &pixels);
        let mut request = req("a", "p");
        request.size = Some([8, 4]);
        let decoded = decode(&f.0, &request).unwrap();
        for p in decoded.pixels.pixels().filter(|p| p[3] > 2) {
            assert_eq!(p[0], 0);
            assert_eq!(p[2], 255);
        }
    }
    #[test]
    fn multiple_shelves_stable_order_and_opaque_jpeg_candidate() {
        let f = Fixture::new();
        for (name, color) in [
            ("a", [255, 0, 0, 255]),
            ("b", [0, 255, 0, 255]),
            ("c", [0, 0, 255, 255]),
        ] {
            f.put(name, &RgbaImage::from_pixel(4, 4, image::Rgba(color)));
        }
        let requests = [req("c", "c"), req("b", "b"), req("a", "a")];
        let atlas = build_atlas(&f.0, &requests, 16).unwrap();
        let reverse = build_atlas(
            &f.0,
            &[
                requests[2].clone(),
                requests[1].clone(),
                requests[0].clone(),
            ],
            16,
        )
        .unwrap();
        assert_eq!(atlas.png, reverse.png);
        assert_eq!(atlas.report.sprites["a"].rect, [2, 2, 4, 4]);
        assert_eq!(atlas.report.sprites["b"].rect, [10, 2, 4, 4]);
        assert_eq!(atlas.report.sprites["c"].rect, [2, 10, 4, 4]);
        let single = build_atlas(&f.0, &requests[0..1], 16).unwrap();
        assert!(single.jpeg_candidate.is_some());
        assert_eq!(
            image::load_from_memory(single.jpeg_candidate.as_ref().unwrap())
                .unwrap()
                .width(),
            8
        );
    }
    #[test]
    fn jpeg_exif_orientation_normalizes_dimensions() {
        let f = Fixture::new();
        let mut bytes = jpeg(&RgbaImage::from_pixel(3, 2, image::Rgba([200, 30, 0, 255]))).unwrap();
        let exif = b"Exif\0\0II\x2a\0\x08\0\0\0\x01\0\x12\x01\x03\0\x01\0\0\0\x06\0\0\0\0\0\0\0";
        let len = (exif.len() + 2) as u16;
        let mut segment = vec![255, 225];
        segment.extend(len.to_be_bytes());
        segment.extend(exif);
        bytes.splice(2..2, segment);
        fs::write(f.0.join("oriented"), bytes).unwrap();
        let d = decode(&f.0, &req("a", "oriented")).unwrap();
        assert_eq!((d.info.width, d.info.height), (2, 3));
    }
}
