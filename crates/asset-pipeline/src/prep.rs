//! Bounded, deterministic faithful mechanical image preparation (crop, trim, grid slice, resize).
use crate::{
    AssetError, MAX_FILE, MAX_SIDE, OPTIMIZE_MAX_PIXELS, OPTIMIZE_MAX_SOURCE_SIDE, best_png, err,
    hash, resize_upload, supported_with_color_policy,
};
use image::{DynamicImage, GenericImage, ImageDecoder, ImageReader, Rgba, RgbaImage};
use serde::{Deserialize, Serialize};
use std::io::Cursor;

const MAX_OUTPUTS: usize = 64;
const MAX_PADDING_PX: u32 = 64;

#[derive(Clone, Copy, Debug, Default, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum SliceOutputMode {
    #[default]
    Frames,
    Strip,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields, rename_all = "camelCase")]
pub struct SliceGridOptions {
    pub cols: u32,
    pub rows: u32,
    #[serde(default)]
    pub margin: u32,
    #[serde(default)]
    pub spacing: u32,
    #[serde(default)]
    pub trim_cells: bool,
    #[serde(default = "default_true")]
    pub skip_empty: bool,
    #[serde(default)]
    pub max_frames: Option<usize>,
    #[serde(default)]
    pub output_mode: SliceOutputMode,
}

fn default_true() -> bool {
    true
}

#[derive(Clone, Debug, Default, Deserialize)]
#[serde(default, deny_unknown_fields, rename_all = "camelCase")]
pub struct PrepOptions {
    pub output_prefix: Option<String>,
    pub crop: Option<[u32; 4]>,
    pub trim: bool,
    pub alpha_threshold: u8,
    pub padding_px: u32,
    pub resize: Option<[u32; 2]>,
    pub max_side: Option<u32>,
    pub allow_deform: bool,
    pub slice_grid: Option<SliceGridOptions>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PrepOutput {
    #[serde(skip)]
    pub bytes: Vec<u8>,
    pub file: String,
    pub width: u32,
    pub height: u32,
    pub bytes_len: usize,
    pub sha256: String,
    pub has_alpha: bool,
    pub operations: Vec<String>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PrepReport {
    pub source_sha256: String,
    pub source_mime: String,
    pub source_width: u32,
    pub source_height: u32,
    pub outputs: Vec<PrepOutput>,
}

fn valid_prefix(prefix: &str) -> Result<String, AssetError> {
    if prefix.is_empty()
        || prefix.len() > 48
        || !prefix
            .bytes()
            .all(|c| c.is_ascii_alphanumeric() || c == b'-' || c == b'_')
    {
        return Err(err(
            "E_ASSET_REQUEST",
            "outputPrefix must be 1–48 ASCII letters, digits, '-' or '_'",
        ));
    }
    Ok(prefix.to_owned())
}

fn trim_bounds(pixels: &RgbaImage, alpha_threshold: u8) -> Option<[u32; 4]> {
    let (w, h) = pixels.dimensions();
    let (mut min_x, mut min_y) = (w, h);
    let (mut max_x, mut max_y) = (0_u32, 0_u32);
    let mut found = false;
    for y in 0..h {
        for x in 0..w {
            if pixels.get_pixel(x, y)[3] > alpha_threshold {
                found = true;
                min_x = min_x.min(x);
                min_y = min_y.min(y);
                max_x = max_x.max(x);
                max_y = max_y.max(y);
            }
        }
    }
    if !found {
        None
    } else {
        Some([min_x, min_y, max_x - min_x + 1, max_y - min_y + 1])
    }
}

fn trim_rgba(
    pixels: &RgbaImage,
    alpha_threshold: u8,
    padding_px: u32,
) -> Result<(RgbaImage, String), AssetError> {
    if alpha_threshold == 255 {
        return Err(err("E_ASSET_REQUEST", "alphaThreshold must be 0..=254"));
    }
    if padding_px > MAX_PADDING_PX {
        return Err(err("E_ASSET_REQUEST", "paddingPx must be 0..=64"));
    }
    let Some([bx, by, bw, bh]) = trim_bounds(pixels, alpha_threshold) else {
        return Err(err("E_ASSET_EMPTY", "image is fully transparent"));
    };
    let x0 = bx.saturating_sub(padding_px);
    let y0 = by.saturating_sub(padding_px);
    let x1 = bx.saturating_add(bw).saturating_add(padding_px).min(pixels.width());
    let y1 = by.saturating_add(bh).saturating_add(padding_px).min(pixels.height());
    let out_w = x1 - x0;
    let out_h = y1 - y0;
    let cropped = image::imageops::crop_imm(pixels, x0, y0, out_w, out_h).to_image();
    Ok((
        cropped,
        format!("trim:alpha>{alpha_threshold};pad={padding_px};rect={x0},{y0},{out_w}x{out_h}"),
    ))
}

fn apply_resize(
    pixels: RgbaImage,
    resize: Option<[u32; 2]>,
    max_side: Option<u32>,
    allow_deform: bool,
    ops: &mut Vec<String>,
) -> Result<RgbaImage, AssetError> {
    if resize.is_some() && max_side.is_some() {
        return Err(err(
            "E_ASSET_REQUEST",
            "specify either resize or maxSide, not both",
        ));
    }
    if let Some([w, h]) = resize {
        if w == 0 || h == 0 || w > MAX_SIDE || h > MAX_SIDE {
            return Err(err("E_ASSET_TOO_LARGE", "resize bounds 1..=2048"));
        }
        if !allow_deform
            && u64::from(w) * u64::from(pixels.height()) != u64::from(h) * u64::from(pixels.width())
        {
            return Err(err(
                "E_ASSET_ASPECT",
                "resize changes aspect ratio; crop explicitly or allowDeform",
            ));
        }
        if w == pixels.width() && h == pixels.height() {
            return Ok(pixels);
        }
        let old = (pixels.width(), pixels.height());
        let out = resize_upload(&pixels, w, h);
        ops.push(format!(
            "resize:{}x{}->{}x{};Lanczos3-premultiplied",
            old.0, old.1, w, h
        ));
        return Ok(out);
    }
    if let Some(limit) = max_side {
        if !(16..=MAX_SIDE).contains(&limit) {
            return Err(err("E_ASSET_REQUEST", "maxSide must be 16..=2048"));
        }
        let longest = pixels.width().max(pixels.height());
        if longest > limit {
            let scale = limit as f64 / longest as f64;
            let w = ((pixels.width() as f64 * scale).round() as u32).max(1);
            let h = ((pixels.height() as f64 * scale).round() as u32).max(1);
            let old = (pixels.width(), pixels.height());
            let out = resize_upload(&pixels, w, h);
            ops.push(format!(
                "maxSide:{limit};{}x{}->{}x{};Lanczos3-premultiplied",
                old.0, old.1, w, h
            ));
            return Ok(out);
        }
    }
    if pixels.width() > MAX_SIDE || pixels.height() > MAX_SIDE {
        return Err(err(
            "E_ASSET_TOO_LARGE",
            "prepared output exceeds 2048px side; supply maxSide or resize",
        ));
    }
    Ok(pixels)
}

fn encode_output(
    file: String,
    pixels: RgbaImage,
    mut operations: Vec<String>,
) -> Result<PrepOutput, AssetError> {
    if pixels.width() == 0
        || pixels.height() == 0
        || pixels.width() > MAX_SIDE
        || pixels.height() > MAX_SIDE
    {
        return Err(err("E_ASSET_TOO_LARGE", "prepared output exceeds 2048px side"));
    }
    let has_alpha = pixels.pixels().any(|p| p[3] != 255);
    let (png_bytes, encoding) = best_png(&pixels)?;
    operations.push(format!("exact-png:{encoding}"));
    let sha256 = format!("sha256:{}", hash(&png_bytes));
    let bytes_len = png_bytes.len();
    Ok(PrepOutput {
        bytes: png_bytes,
        file,
        width: pixels.width(),
        height: pixels.height(),
        bytes_len,
        sha256,
        has_alpha,
        operations,
    })
}

/// Mechanically prepare a PNG or JPEG byte buffer into 1..=64 deterministic lossless PNG outputs.
pub fn prep_image_bytes(bytes: &[u8], options: &PrepOptions) -> Result<PrepReport, AssetError> {
    if bytes.is_empty() || bytes.len() as u64 > MAX_FILE {
        return Err(err("E_ASSET_TOO_LARGE", "expected 1 byte through 8 MiB"));
    }
    if options.alpha_threshold == 255 {
        return Err(err("E_ASSET_REQUEST", "alphaThreshold must be 0..=254"));
    }
    if options.padding_px > MAX_PADDING_PX {
        return Err(err("E_ASSET_REQUEST", "paddingPx must be 0..=64"));
    }
    let prefix = valid_prefix(options.output_prefix.as_deref().unwrap_or("prepared"))?;
    let format = supported_with_color_policy(bytes, false)?;
    let mut reader = ImageReader::with_format(Cursor::new(bytes), format);
    let mut limits = image::Limits::default();
    limits.max_image_width = Some(OPTIMIZE_MAX_SOURCE_SIDE);
    limits.max_image_height = Some(OPTIMIZE_MAX_SOURCE_SIDE);
    limits.max_alloc = Some(96 * 1024 * 1024);
    reader.limits(limits);
    let mut decoder = reader
        .into_decoder()
        .map_err(|e| err("E_ASSET_CORRUPT", e))?;
    let (w, h) = decoder.dimensions();
    if w == 0 || h == 0 || u64::from(w) * u64::from(h) > OPTIMIZE_MAX_PIXELS {
        return Err(err("E_ASSET_TOO_LARGE", "source exceeds 16,777,216 pixels"));
    }
    let orientation = decoder
        .orientation()
        .map_err(|e| err("E_ASSET_CORRUPT", e))?;
    let mut image = DynamicImage::from_decoder(decoder).map_err(|e| err("E_ASSET_CORRUPT", e))?;
    image.apply_orientation(orientation);
    let source_width = image.width();
    let source_height = image.height();
    let mut pixels = image.into_rgba8();
    let mut base_ops = vec!["decode-rgba8;normalize-orientation;strip-color-metadata".to_owned()];

    if let Some([x, y, cw, ch]) = options.crop {
        if cw == 0
            || ch == 0
            || x.checked_add(cw).is_none_or(|v| v > pixels.width())
            || y.checked_add(ch).is_none_or(|v| v > pixels.height())
        {
            return Err(err("E_ASSET_CROP", "crop rect out of image bounds"));
        }
        pixels = image::imageops::crop_imm(&pixels, x, y, cw, ch).to_image();
        base_ops.push(format!("crop:{x},{y},{cw}x{ch}"));
    }

    if options.trim {
        let (trimmed, op) = trim_rgba(&pixels, options.alpha_threshold, options.padding_px)?;
        pixels = trimmed;
        base_ops.push(op);
    }

    let mut outputs = Vec::new();
    if let Some(grid) = &options.slice_grid {
        if grid.cols == 0 || grid.rows == 0 {
            return Err(err("E_ASSET_REQUEST", "sliceGrid cols and rows must be >= 1"));
        }
        let max_frames = grid.max_frames.unwrap_or(MAX_OUTPUTS);
        if max_frames == 0 || max_frames > MAX_OUTPUTS {
            return Err(err("E_ASSET_COUNT", "sliceGrid maxFrames must be 1..=64"));
        }
        let total_cells = grid
            .cols
            .checked_mul(grid.rows)
            .ok_or_else(|| err("E_ASSET_COUNT", "sliceGrid overflow"))?;
        if total_cells as usize > MAX_OUTPUTS && grid.max_frames.is_none() && !grid.skip_empty {
            return Err(err("E_ASSET_COUNT", "sliceGrid exceeds 64 outputs"));
        }
        let margin2 = grid
            .margin
            .checked_mul(2)
            .ok_or_else(|| err("E_ASSET_CROP", "margin overflow"))?;
        let space_x = grid
            .spacing
            .checked_mul(grid.cols.saturating_sub(1))
            .ok_or_else(|| err("E_ASSET_CROP", "spacing overflow"))?;
        let space_y = grid
            .spacing
            .checked_mul(grid.rows.saturating_sub(1))
            .ok_or_else(|| err("E_ASSET_CROP", "spacing overflow"))?;
        let usable_w = pixels
            .width()
            .checked_sub(margin2.saturating_add(space_x))
            .ok_or_else(|| err("E_ASSET_CROP", "sliceGrid margin/spacing exceeds width"))?;
        let usable_h = pixels
            .height()
            .checked_sub(margin2.saturating_add(space_y))
            .ok_or_else(|| err("E_ASSET_CROP", "sliceGrid margin/spacing exceeds height"))?;
        if usable_w == 0
            || usable_h == 0
            || usable_w % grid.cols != 0
            || usable_h % grid.rows != 0
        {
            return Err(err(
                "E_ASSET_CROP",
                "usable sheet dimensions must divide evenly by sliceGrid cols/rows",
            ));
        }
        let cell_w = usable_w / grid.cols;
        let cell_h = usable_h / grid.rows;
        let mut frames: Vec<(RgbaImage, Vec<String>)> = Vec::new();
        'outer: for row in 0..grid.rows {
            for col in 0..grid.cols {
                let cx = grid.margin + col * (cell_w + grid.spacing);
                let cy = grid.margin + row * (cell_h + grid.spacing);
                let mut cell = image::imageops::crop_imm(&pixels, cx, cy, cell_w, cell_h).to_image();
                if grid.skip_empty && trim_bounds(&cell, options.alpha_threshold).is_none() {
                    continue;
                }
                if frames.len() >= max_frames {
                    if grid.max_frames.is_some() {
                        break 'outer;
                    }
                    return Err(err("E_ASSET_COUNT", "sliceGrid exceeds 64 non-empty outputs"));
                }
                let mut ops = base_ops.clone();
                ops.push(format!(
                    "slice-grid:{}x{}:cell({col},{row})@{cx},{cy},{cell_w}x{cell_h}",
                    grid.cols, grid.rows
                ));
                if grid.trim_cells {
                    let (trimmed, op) =
                        trim_rgba(&cell, options.alpha_threshold, options.padding_px)?;
                    cell = trimmed;
                    ops.push(op);
                }
                cell = apply_resize(
                    cell,
                    options.resize,
                    options.max_side,
                    options.allow_deform,
                    &mut ops,
                )?;
                frames.push((cell, ops));
            }
        }
        if frames.is_empty() {
            return Err(err("E_ASSET_EMPTY", "sliceGrid produced zero non-empty frames"));
        }
        match grid.output_mode {
            SliceOutputMode::Frames => {
                for (index, (frame, ops)) in frames.into_iter().enumerate() {
                    outputs.push(encode_output(format!("{prefix}_{index:02}.png"), frame, ops)?);
                }
            }
            SliceOutputMode::Strip => {
                let frame_w = frames.iter().map(|(f, _)| f.width()).max().unwrap_or(1);
                let frame_h = frames.iter().map(|(f, _)| f.height()).max().unwrap_or(1);
                let strip_w = frame_w
                    .checked_mul(frames.len() as u32)
                    .ok_or_else(|| err("E_ASSET_TOO_LARGE", "strip width overflow"))?;
                if strip_w > MAX_SIDE || frame_h > MAX_SIDE {
                    return Err(err(
                        "E_ASSET_TOO_LARGE",
                        "horizontal strip exceeds 2048px side; reduce frame size or use frames mode",
                    ));
                }
                let mut strip = RgbaImage::from_pixel(strip_w, frame_h, Rgba([0, 0, 0, 0]));
                for (index, (frame, _)) in frames.iter().enumerate() {
                    let ox = index as u32 * frame_w + (frame_w - frame.width()) / 2;
                    let oy = (frame_h - frame.height()) / 2;
                    strip
                        .copy_from(frame, ox, oy)
                        .map_err(|e| err("E_ASSET_ENCODE", e))?;
                }
                let mut ops = base_ops;
                ops.push(format!(
                    "slice-grid:{}x{}:strip:{}x({frame_w}x{frame_h})",
                    grid.cols,
                    grid.rows,
                    frames.len()
                ));
                outputs.push(encode_output(format!("{prefix}.png"), strip, ops)?);
            }
        }
    } else {
        pixels = apply_resize(
            pixels,
            options.resize,
            options.max_side,
            options.allow_deform,
            &mut base_ops,
        )?;
        outputs.push(encode_output(format!("{prefix}.png"), pixels, base_ops)?);
    }

    Ok(PrepReport {
        source_sha256: format!("sha256:{}", hash(bytes)),
        source_mime: format.to_mime_type().to_owned(),
        source_width,
        source_height,
        outputs,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::encode_baseline_png;

    #[test]
    fn trim_with_padding_and_empty_rejection() {
        let mut img = RgbaImage::from_pixel(20, 16, Rgba([0, 0, 0, 0]));
        for y in 5..10 {
            for x in 6..12 {
                img.put_pixel(x, y, Rgba([240, 80, 40, 255]));
            }
        }
        let png = encode_baseline_png(&img).unwrap();
        let report = prep_image_bytes(
            &png,
            &PrepOptions {
                output_prefix: Some("hero".into()),
                trim: true,
                padding_px: 2,
                ..Default::default()
            },
        )
        .unwrap();
        assert_eq!(report.outputs.len(), 1);
        assert_eq!(report.outputs[0].file, "hero.png");
        assert_eq!((report.outputs[0].width, report.outputs[0].height), (10, 9));

        let empty = encode_baseline_png(&RgbaImage::from_pixel(8, 8, Rgba([0, 0, 0, 0]))).unwrap();
        assert_eq!(
            prep_image_bytes(
                &empty,
                &PrepOptions {
                    trim: true,
                    ..Default::default()
                }
            )
            .unwrap_err()
            .code,
            "E_ASSET_EMPTY"
        );
    }

    #[test]
    fn crop_and_aspect_safe_resize_and_max_side() {
        let img = RgbaImage::from_fn(32, 16, |x, y| Rgba([x as u8 * 7, y as u8 * 15, 100, 255]));
        let png = encode_baseline_png(&img).unwrap();
        assert_eq!(
            prep_image_bytes(
                &png,
                &PrepOptions {
                    crop: Some([20, 0, 20, 16]),
                    ..Default::default()
                }
            )
            .unwrap_err()
            .code,
            "E_ASSET_CROP"
        );
        assert_eq!(
            prep_image_bytes(
                &png,
                &PrepOptions {
                    resize: Some([16, 16]),
                    ..Default::default()
                }
            )
            .unwrap_err()
            .code,
            "E_ASSET_ASPECT"
        );
        let scaled = prep_image_bytes(
            &png,
            &PrepOptions {
                max_side: Some(16),
                ..Default::default()
            },
        )
        .unwrap();
        assert_eq!((scaled.outputs[0].width, scaled.outputs[0].height), (16, 8));
    }

    #[test]
    fn slice_grid_frames_and_strip_skip_empty_and_enforce_cap() {
        let mut sheet = RgbaImage::from_pixel(32, 32, Rgba([0, 0, 0, 0]));
        // Fill 3 of 4 16x16 cells, leaving bottom-right cell empty.
        for (ox, oy, color) in [
            (2, 2, Rgba([255, 0, 0, 255])),
            (18, 2, Rgba([0, 255, 0, 255])),
            (2, 18, Rgba([0, 0, 255, 255])),
        ] {
            for dy in 0..8 {
                for dx in 0..8 {
                    sheet.put_pixel(ox + dx, oy + dy, color);
                }
            }
        }
        let png = encode_baseline_png(&sheet).unwrap();
        let frames = prep_image_bytes(
            &png,
            &PrepOptions {
                output_prefix: Some("walk".into()),
                slice_grid: Some(SliceGridOptions {
                    cols: 2,
                    rows: 2,
                    margin: 0,
                    spacing: 0,
                    trim_cells: true,
                    skip_empty: true,
                    max_frames: None,
                    output_mode: SliceOutputMode::Frames,
                }),
                ..Default::default()
            },
        )
        .unwrap();
        assert_eq!(frames.outputs.len(), 3);
        assert_eq!(frames.outputs[0].file, "walk_00.png");
        assert_eq!(frames.outputs[2].file, "walk_02.png");
        assert!(frames.outputs.iter().all(|o| o.width == 8 && o.height == 8));

        let strip = prep_image_bytes(
            &png,
            &PrepOptions {
                output_prefix: Some("walk-strip".into()),
                slice_grid: Some(SliceGridOptions {
                    cols: 2,
                    rows: 2,
                    margin: 0,
                    spacing: 0,
                    trim_cells: true,
                    skip_empty: true,
                    max_frames: None,
                    output_mode: SliceOutputMode::Strip,
                }),
                ..Default::default()
            },
        )
        .unwrap();
        assert_eq!(strip.outputs.len(), 1);
        assert_eq!(strip.outputs[0].file, "walk-strip.png");
        assert_eq!((strip.outputs[0].width, strip.outputs[0].height), (24, 8));

        let big = encode_baseline_png(&RgbaImage::from_pixel(90, 90, Rgba([1, 2, 3, 255]))).unwrap();
        assert_eq!(
            prep_image_bytes(
                &big,
                &PrepOptions {
                    slice_grid: Some(SliceGridOptions {
                        cols: 9,
                        rows: 9,
                        margin: 0,
                        spacing: 0,
                        trim_cells: false,
                        skip_empty: false,
                        max_frames: None,
                        output_mode: SliceOutputMode::Frames,
                    }),
                    ..Default::default()
                }
            )
            .unwrap_err()
            .code,
            "E_ASSET_COUNT"
        );
    }
}
