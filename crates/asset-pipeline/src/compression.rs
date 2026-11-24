//! Fixed work bounds, exact RGBA (including alpha-zero RGB), one texture, no lossy transforms.
use crate::{
    Atlas, Request, Result, decode_embedded_png, discover, err, hash, layout_pixels,
    png as baseline_png,
};
use image::RgbaImage;
use serde::{Deserialize, Serialize};
use std::{
    collections::{BTreeMap, BTreeSet},
    path::Path,
};
#[derive(Clone, Copy, Debug, Default, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchTimings {
    pub source_preparation_ms: f64,
    pub layout_ms: f64,
    pub encoding_and_round_trip_ms: f64,
    pub assembly_and_inspection_ms: f64,
    pub total_ms: f64,
}
pub const POLICY: &str = "exact-png-layout-v1/2px/no-rotation/max-side/no-memory-growth";
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum CompressionPolicy {
    Legacy,
    Exact,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields, rename_all = "camelCase")]
pub struct SearchRecord {
    pub id: String,
    pub width: u32,
    pub height: u32,
    pub decoded_bytes: u64,
    pub png_bytes: Option<usize>,
    pub png_sha256: Option<String>,
    pub rgba_sha256: Option<String>,
    pub cost_bytes: Option<usize>,
    pub rejection: Option<String>,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields, rename_all = "camelCase")]
pub struct SearchReport {
    pub policy: String,
    pub mode: String,
    pub selected: String,
    pub baseline: String,
    pub records: Vec<SearchRecord>,
}
/// Stable lexicographic exact RGBA palette, packed high bits first, reset padding each row.
type PaletteData = (Vec<[u8; 4]>, Vec<u8>, u8);
fn palette(pixels: &RgbaImage) -> Option<PaletteData> {
    let mut colors = BTreeSet::new();
    for p in pixels.pixels() {
        colors.insert(p.0);
        if colors.len() > 256 {
            return None;
        }
    }
    let colors: Vec<_> = colors.into_iter().collect();
    let bits = match colors.len() {
        0 => return None,
        1..=2 => 1,
        3..=4 => 2,
        5..=16 => 4,
        _ => 8,
    };
    let lookup: BTreeMap<_, _> = colors
        .iter()
        .enumerate()
        .map(|(i, c)| (*c, i as u8))
        .collect();
    let stride = (pixels.width() as usize * bits as usize).div_ceil(8);
    let mut data = vec![0; stride * pixels.height() as usize];
    for (y, row) in pixels.rows().enumerate() {
        for (x, p) in row.enumerate() {
            let bit = x * bits as usize;
            data[y * stride + bit / 8] |= lookup[&p.0] << (8 - bits as usize - bit % 8);
        }
    }
    Some((colors, data, bits))
}
fn encode(
    pixels: &RgbaImage,
    indexed: Option<&PaletteData>,
    filter: png::Filter,
    compression: png::Compression,
) -> Result<Vec<u8>> {
    let mut out = Vec::new();
    {
        let mut encoder = png::Encoder::new(&mut out, pixels.width(), pixels.height());
        encoder.set_compression(compression);
        encoder.set_filter(filter);
        let data = if let Some((colors, data, bits)) = indexed {
            encoder.set_color(png::ColorType::Indexed);
            encoder.set_depth(match bits {
                1 => png::BitDepth::One,
                2 => png::BitDepth::Two,
                4 => png::BitDepth::Four,
                _ => png::BitDepth::Eight,
            });
            encoder.set_palette(
                colors
                    .iter()
                    .flat_map(|c| c[..3].iter().copied())
                    .collect::<Vec<_>>(),
            );
            let mut alpha: Vec<_> = colors.iter().map(|p| p[3]).collect();
            while alpha.last() == Some(&255) {
                alpha.pop();
            }
            if !alpha.is_empty() {
                encoder.set_trns(alpha);
            }
            data.as_slice()
        } else {
            encoder.set_color(png::ColorType::Rgba);
            encoder.set_depth(png::BitDepth::Eight);
            pixels.as_raw()
        };
        encoder
            .write_header()
            .map_err(|e| err("E_ASSET_ENCODE", e))?
            .write_image_data(data)
            .map_err(|e| err("E_ASSET_ENCODE", e))?;
    }
    if decode_embedded_png(&out)? != *pixels {
        return Err(err(
            "E_PNG_EXACTNESS",
            "encoded RGBA differs from normalized pixels",
        ));
    }
    Ok(out)
}
/// Controlled entry for synthetic correctness tests. Source import must use the validated pipeline.
pub fn encode_exact_png(pixels: &RgbaImage, indexed: bool) -> Result<Vec<u8>> {
    if pixels.width() == 0
        || pixels.height() == 0
        || pixels.width() > crate::MAX_SIDE
        || pixels.height() > crate::MAX_SIDE
    {
        return Err(err("E_ASSET_TOO_LARGE", "PNG dimensions"));
    }
    let pal = if indexed {
        Some(palette(pixels).ok_or_else(|| err("E_PNG_PALETTE", "more than 256 exact colors"))?)
    } else {
        None
    };
    encode(
        pixels,
        pal.as_ref(),
        png::Filter::NoFilter,
        png::Compression::High,
    )
}
pub(crate) fn visit_encodings(
    pixels: &RgbaImage,
    mut visit: impl FnMut(String, Vec<u8>) -> Result<()>,
) -> Result<()> {
    let pal = palette(pixels);
    for indexed in [false, true] {
        if indexed && pal.is_none() {
            continue;
        }
        for compression in [png::Compression::Balanced, png::Compression::High] {
            for filter in [
                png::Filter::NoFilter,
                png::Filter::Sub,
                png::Filter::Up,
                png::Filter::Avg,
                png::Filter::Paeth,
                png::Filter::Adaptive,
                png::Filter::MinEntropy,
            ] {
                let id = format!(
                    "{}/{compression:?}/{filter:?}",
                    if indexed { "indexed" } else { "rgba" }
                );
                visit(
                    id,
                    encode(
                        pixels,
                        if indexed { pal.as_ref() } else { None },
                        filter,
                        compression,
                    )?,
                )?;
            }
        }
    }
    Ok(())
}
/// At most nine layouts × 29 encodings, sequential evaluation; never hold a candidate matrix.
/// The caller returns ACTUAL assembled HTML bytes (or a typed validation rejection).
pub fn search_atlas(
    root: &Path,
    requests: &[Request],
    side: u32,
    policy: CompressionPolicy,
    mut evaluate: impl FnMut(&Atlas) -> Result<usize>,
) -> Result<(Atlas, SearchReport, SearchTimings)> {
    if !(16..=crate::MAX_SIDE).contains(&side) {
        return Err(err("E_ATLAS_SIZE", "side must be 16–2048"));
    }
    let total_start = std::time::Instant::now();
    let mut timings = SearchTimings::default();
    let decoded = discover(root, requests)?;
    timings.source_preparation_ms = total_start.elapsed().as_secs_f64() * 1000.;
    let layout_start = std::time::Instant::now();
    let baseline = layout_pixels(&decoded, side, side, false)?;
    timings.layout_ms += layout_start.elapsed().as_secs_f64() * 1000.;
    let evaluation_ms = std::cell::Cell::new(0.0);
    let ceiling = baseline.0.report.decoded_bytes;
    let mut baseline = Some(baseline);
    let baseline_id = "legacy/baseline-rgba-High-Adaptive".to_owned();
    let mut report = SearchReport {
        policy: POLICY.into(),
        mode: if policy == CompressionPolicy::Exact {
            "exact"
        } else {
            "legacy"
        }
        .into(),
        selected: baseline_id.clone(),
        baseline: baseline_id.clone(),
        records: vec![],
    };
    let mut winner: Option<(usize, u64, String, Atlas)> = None;
    let mut seen = BTreeSet::new();
    let mut layouts = vec![("legacy".to_owned(), side, false)];
    if policy == CompressionPolicy::Exact {
        for width in [256, 384, 512, 1024] {
            for order in [false, true] {
                layouts.push((
                    format!(
                        "shelf-{width}-{}",
                        if order { "height-width-id" } else { "id" }
                    ),
                    width,
                    order,
                ));
            }
        }
    }
    for (layout, width, order) in layouts {
        let layout_start = std::time::Instant::now();
        let built = if layout == "legacy" {
            Ok(baseline.take().unwrap())
        } else if width > side {
            Err(err("E_ATLAS_SIZE", "row width exceeds maximum side"))
        } else {
            layout_pixels(&decoded, side, width, order)
        };
        timings.layout_ms += layout_start.elapsed().as_secs_f64() * 1000.;
        let (mut atlas, pixels) = match built {
            Ok(a) => a,
            Err(e) => {
                report.records.push(SearchRecord {
                    id: layout,
                    width: 0,
                    height: 0,
                    decoded_bytes: 0,
                    png_bytes: None,
                    png_sha256: None,
                    rgba_sha256: None,
                    cost_bytes: None,
                    rejection: Some(e.to_string()),
                });
                continue;
            }
        };
        let layout_key = serde_json::to_string(&(
            &atlas.report.width,
            &atlas.report.height,
            &atlas.report.sprites,
        ))
        .map_err(|e| err("E_ATLAS_METADATA", e))?;
        let rejection = if atlas.report.decoded_bytes > ceiling {
            Some("E_ATLAS_MEMORY: exceeds legacy decoded RGBA allocation")
        } else if !seen.insert(layout_key) {
            Some("DUPLICATE_LAYOUT: same dimensions and sprite metadata")
        } else {
            None
        };
        if let Some(reason) = rejection {
            report.records.push(SearchRecord {
                id: layout,
                width: atlas.report.width,
                height: atlas.report.height,
                decoded_bytes: atlas.report.decoded_bytes,
                png_bytes: None,
                png_sha256: None,
                rgba_sha256: None,
                cost_bytes: None,
                rejection: Some(reason.into()),
            });
            continue;
        }
        // Reuse the validated atlas raster for every encoding trial; source artwork is decoded once.
        let rgba_sha = hash(pixels.as_raw());
        if policy == CompressionPolicy::Exact && palette(&pixels).is_none() {
            report.records.push(SearchRecord {
                id: format!("{layout}/indexed"),
                width: atlas.report.width,
                height: atlas.report.height,
                decoded_bytes: atlas.report.decoded_bytes,
                png_bytes: None,
                png_sha256: None,
                rgba_sha256: Some(rgba_sha.clone()),
                cost_bytes: None,
                rejection: Some(
                    "E_PNG_PALETTE: more than 256 exact RGBA colors; quantization prohibited"
                        .into(),
                ),
            });
        }

        let encode_start = std::time::Instant::now();
        let eval_before = evaluation_ms.get();
        let mut accept = |id: String, bytes: Vec<u8>| -> Result<()> {
            atlas.png = bytes;
            atlas.report.png_bytes = atlas.png.len();
            atlas.report.sha256 = hash(&atlas.png);
            let eval_start = std::time::Instant::now();
            let cost = evaluate(&atlas);
            evaluation_ms.set(evaluation_ms.get() + eval_start.elapsed().as_secs_f64() * 1000.);
            report.records.push(SearchRecord {
                id: id.clone(),
                width: atlas.report.width,
                height: atlas.report.height,
                decoded_bytes: atlas.report.decoded_bytes,
                png_bytes: Some(atlas.png.len()),
                png_sha256: Some(atlas.report.sha256.clone()),
                rgba_sha256: Some(rgba_sha.clone()),
                cost_bytes: cost.as_ref().ok().copied(),
                rejection: cost.as_ref().err().map(ToString::to_string),
            });
            if let Ok(cost) = cost
                && winner.as_ref().is_none_or(|(bytes, memory, key, _)| {
                    (cost, atlas.report.decoded_bytes, &id) < (*bytes, *memory, key)
                })
            {
                winner = Some((
                    cost,
                    atlas.report.decoded_bytes,
                    id,
                    Atlas {
                        report: atlas.report.clone(),
                        png: atlas.png.clone(),
                        jpeg_candidate: atlas.jpeg_candidate.clone(),
                    },
                ));
            }
            Ok(())
        };
        if layout == "legacy" {
            let bytes = baseline_png(&pixels)?;
            if decode_embedded_png(&bytes)? != pixels {
                return Err(err("E_PNG_EXACTNESS", "baseline RGBA mismatch"));
            }
            accept(baseline_id.clone(), bytes)?;
        }
        if policy == CompressionPolicy::Exact {
            visit_encodings(&pixels, |id, bytes| accept(format!("{layout}/{id}"), bytes))?;
        }
        timings.encoding_and_round_trip_ms +=
            encode_start.elapsed().as_secs_f64() * 1000. - (evaluation_ms.get() - eval_before);
    }
    let (_, _, id, atlas) = winner.ok_or_else(|| {
        err(
            "E_ATLAS_NO_CANDIDATE",
            "no exact, inspector-accepted artifact",
        )
    })?;
    report.selected = id;
    timings.assembly_and_inspection_ms = evaluation_ms.get();
    timings.total_ms = total_start.elapsed().as_secs_f64() * 1000.;
    Ok((atlas, report, timings))
}

/// Output-affecting policy identity shared by caches and native provenance.
pub fn policy_descriptor() -> serde_json::Value {
    serde_json::json!({"version":POLICY,"pngVersion":"0.18.1","imageVersion":"0.25.10","deflate":["Balanced","High"],"filters":["NoFilter","Sub","Up","Avg","Paeth","Adaptive","MinEntropy"],"palette":"lexicographic exact RGBA, <=256 colors, minimal 1/2/4/8 bit depth, high-bit-first row packing; trailing opaque tRNS entries omitted; hidden RGB preserved","rowWidths":[256,384,512,1024],"orders":["id","height-desc/width-desc/id"],"extrusion":2,"rotation":false,"textures":1,"decodedCeiling":"legacy allocation","maxLayouts":9,"maxEncodingsPerLayout":29,"selection":"actual assembled HTML, decoded bytes, stable candidate ID","representation":"single-inline-PNG-canonical-atlas-v1","optimizer":"native-only; no Oxipng"})
}
