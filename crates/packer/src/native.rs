use crate::{ArtifactFacts, PackError, error};
use data_encoding::BASE64;
use serde_json::Value;

pub const PREFIX_HEAD: &str = "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1\"><title>Tora playable draft</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:";
pub const PREFIX_TAIL: &str = "}canvas{width:100%;height:100%;display:block;touch-action:none}</style></head><body><canvas aria-label=\"Playable game\"></canvas><script type=\"application/json\" id=\"project\">";
pub const PREFIX: &str = "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1\"><title>Tora playable draft</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#102a34}canvas{width:100%;height:100%;display:block;touch-action:none}</style></head><body><canvas aria-label=\"Playable game\"></canvas><script type=\"application/json\" id=\"project\">";

pub fn strip_prefix(html: &str) -> Option<&str> {
    let rest = html.strip_prefix(PREFIX_HEAD)?;
    let bytes = rest.as_bytes();
    if bytes.len() < 7 || bytes[0] != b'#' || !bytes[1..7].iter().all(|b| b.is_ascii_hexdigit()) {
        return None;
    }
    rest[7..].strip_prefix(PREFIX_TAIL)
}

pub fn is_native_html(bytes: &[u8]) -> bool {
    let head = PREFIX_HEAD.as_bytes();
    let tail = PREFIX_TAIL.as_bytes();
    bytes.len() >= head.len() + 7 + tail.len()
        && &bytes[..head.len()] == head
        && bytes[head.len()] == b'#'
        && bytes[head.len() + 1..head.len() + 7]
            .iter()
            .all(|b| b.is_ascii_hexdigit())
        && &bytes[head.len() + 7..head.len() + 7 + tail.len()] == tail
}
const SCRIPT: &str = include_str!("../trusted/native.js");
const SCRIPT_3D: &str = include_str!("../trusted/native-3d.js");
fn mount_suffix(profile_id: &str) -> String {
    format!(
        "</script><script>globalThis.toraRuntime=ToraNative.mountNative(JSON.parse(document.getElementById(\"project\").textContent),document.querySelector(\"canvas\"),{{\"edit\":false,\"network\":\"{profile_id}\"}});</script></body></html>"
    )
}

fn validate_mp3(bytes: &[u8]) -> Result<(), PackError> {
    const MPEG1_BR: [u32; 16] = [
        0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0,
    ];
    const MPEG2_BR: [u32; 16] = [
        0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0,
    ];
    if bytes.len() < 16 || bytes.len() > 700_000 {
        return Err(error("E_ARTIFACT_RESOURCE", "Invalid embedded MP3 size"));
    }
    let mut offset = 0usize;
    if bytes.len() >= 10 && &bytes[..3] == b"ID3" {
        if bytes[3] == 0xff || bytes[4] == 0xff {
            return Err(error("E_ARTIFACT_RESOURCE", "Invalid ID3v2 header"));
        }
        if (bytes[6] | bytes[7] | bytes[8] | bytes[9]) & 0x80 != 0 {
            return Err(error("E_ARTIFACT_RESOURCE", "Invalid ID3v2 size"));
        }
        let tag_size = ((bytes[6] as usize) << 21)
            | ((bytes[7] as usize) << 14)
            | ((bytes[8] as usize) << 7)
            | (bytes[9] as usize);
        let footer = if (bytes[5] & 0x10) != 0 { 10 } else { 0 };
        offset = 10 + tag_size + footer;
        if offset >= bytes.len() {
            return Err(error("E_ARTIFACT_RESOURCE", "Truncated ID3v2 tag"));
        }
    }
    let mut end_limit = bytes.len();
    if end_limit >= offset + 128 && &bytes[end_limit - 128..end_limit - 125] == b"TAG" {
        end_limit -= 128;
    }
    let mut frames = 0usize;
    let mut total_samples = 0u64;
    let mut first_sr = 0u32;
    while offset + 4 <= end_limit {
        let b0 = bytes[offset];
        let b1 = bytes[offset + 1];
        let b2 = bytes[offset + 2];
        if b0 != 0xff || (b1 & 0xe0) != 0xe0 {
            if frames == 0 && offset < 64 {
                offset += 1;
                continue;
            }
            break;
        }
        let version = (b1 >> 3) & 3;
        let layer = (b1 >> 1) & 3;
        let br_idx = ((b2 >> 4) & 0x0f) as usize;
        let sr_idx = ((b2 >> 2) & 3) as usize;
        let padding = ((b2 >> 1) & 1) as usize;
        if version == 1 || layer != 1 || br_idx == 0 || br_idx == 15 || sr_idx == 3 {
            return Err(error("E_ARTIFACT_RESOURCE", "Invalid MP3 frame header"));
        }
        let br = if version == 3 {
            MPEG1_BR[br_idx]
        } else {
            MPEG2_BR[br_idx]
        } * 1000;
        let sr = match version {
            3 => [44_100, 48_000, 32_000][sr_idx],
            2 => [22_050, 24_000, 16_000][sr_idx],
            0 => [11_025, 12_000, 8_000][sr_idx],
            _ => return Err(error("E_ARTIFACT_RESOURCE", "Unsupported MPEG version")),
        };
        let spf = if version == 3 { 1152u64 } else { 576u64 };
        let coef = if version == 3 { 144u64 } else { 72u64 };
        let frame_len = ((coef * u64::from(br)) / u64::from(sr)) as usize + padding;
        if frame_len < 4 || offset + frame_len > bytes.len() {
            return Err(error("E_ARTIFACT_RESOURCE", "Truncated MP3 frame"));
        }
        if frames == 0 {
            first_sr = sr;
        }
        frames += 1;
        total_samples += spf;
        offset += frame_len;
    }
    if frames == 0 || first_sr == 0 || total_samples > u64::from(first_sr) * 120 {
        return Err(error("E_ARTIFACT_RESOURCE", "Invalid embedded MP3 stream"));
    }
    Ok(())
}

fn validate_tora_mesh(bytes: &[u8]) -> Result<(), PackError> {
    if bytes.len() < 16 || bytes.len() > 700_000 || &bytes[..8] != b"TORA3DM1" {
        return Err(error("E_ARTIFACT_RESOURCE", "Invalid Tora 3D mesh header"));
    }
    let vertex_count = u32::from_le_bytes(bytes[8..12].try_into().unwrap()) as usize;
    let index_count = u32::from_le_bytes(bytes[12..16].try_into().unwrap()) as usize;
    if !(1..=65_535).contains(&vertex_count)
        || !(3..=196_605).contains(&index_count)
        || !index_count.is_multiple_of(3)
    {
        return Err(error("E_ARTIFACT_RESOURCE", "Invalid Tora 3D mesh counts"));
    }
    let expected = 16 + vertex_count * 32 + index_count * 2;
    if bytes.len() != expected {
        return Err(error("E_ARTIFACT_RESOURCE", "Tora 3D mesh byte mismatch"));
    }
    for i in 0..(vertex_count * 8) {
        let off = 16 + i * 4;
        let v = f32::from_le_bytes(bytes[off..off + 4].try_into().unwrap());
        if !v.is_finite() {
            return Err(error("E_ARTIFACT_RESOURCE", "Non-finite 3D mesh vertex"));
        }
    }
    let idx_start = 16 + vertex_count * 32;
    for i in 0..index_count {
        let off = idx_start + i * 2;
        let idx = u16::from_le_bytes(bytes[off..off + 2].try_into().unwrap()) as usize;
        if idx >= vertex_count {
            return Err(error("E_ARTIFACT_RESOURCE", "Out-of-bounds 3D mesh index"));
        }
    }
    Ok(())
}

fn payload(raw: &str) -> Result<(Value, Vec<String>), PackError> {
    let token = "\"data\":\"";
    let mut metadata = String::with_capacity(raw.len());
    let mut encoded = Vec::new();
    let mut rest = raw;
    while let Some(start) = rest.find(token) {
        let at = start + token.len();
        metadata.push_str(&rest[..at]);
        let end = rest[at..]
            .find('"')
            .map(|v| at + v)
            .ok_or_else(|| error("E_ARTIFACT_RESOURCE", "Unterminated native asset"))?;
        let data = &rest[at..end];
        if data.len() > BASE64.encode_len(700_000)
            || !data
                .bytes()
                .all(|b| b.is_ascii_alphanumeric() || b == b'+' || b == b'/' || b == b'=')
        {
            return Err(error(
                "E_ARTIFACT_RESOURCE",
                "Invalid native asset encoding",
            ));
        }
        encoded.push(data.to_string());
        rest = &rest[end..];
    }
    metadata.push_str(rest);
    let value = creative_project_schema::parse_native_json(metadata.as_bytes())
        .map_err(|e| error(e.code, e))?;
    Ok((value, encoded))
}

fn valid_store(store: &str) -> bool {
    if let Some(id) = store.strip_prefix("https://play.google.com/store/apps/details?id=") {
        let segments = id.split('.').collect::<Vec<_>>();
        return (2..=10).contains(&segments.len())
            && segments.iter().all(|segment| {
                let mut chars = segment.chars();
                chars.next().is_some_and(|c| c.is_ascii_alphabetic())
                    && chars.all(|c| c.is_ascii_alphanumeric() || c == '_')
            });
    }
    let Some(path) = store.strip_prefix("https://apps.apple.com/") else {
        return false;
    };
    let mut parts = path.split('/').collect::<Vec<_>>();
    if parts.first() != Some(&"app")
        && parts
            .first()
            .is_some_and(|part| part.len() == 2 && part.chars().all(|c| c.is_ascii_lowercase()))
    {
        parts.remove(0);
    }
    if parts.first() != Some(&"app") {
        return false;
    }
    parts.remove(0);
    if parts.len() == 2 {
        let slug = parts.remove(0);
        if slug.is_empty() || !slug.chars().all(|c| c.is_ascii_alphanumeric() || c == '-') {
            return false;
        }
    }
    if parts.len() != 1 {
        return false;
    }
    parts[0].strip_prefix("id").is_some_and(|id| {
        (6..=20).contains(&id.len())
            && id.starts_with(|c: char| c.is_ascii_digit() && c != '0')
            && id.chars().all(|c| c.is_ascii_digit())
    })
}

pub fn inspect(bytes: &[u8]) -> Result<ArtifactFacts, PackError> {
    inspect_for_profile(bytes, "unity-ads-ua-playable")
}

pub fn inspect_for_profile(bytes: &[u8], profile_id: &str) -> Result<ArtifactFacts, PackError> {
    if !["applovin-growth-playable", "unity-ads-ua-playable"].contains(&profile_id) {
        return Err(error(
            "E_ADAPTER_PROFILE",
            "No compiled native adapter for this exact profile",
        ));
    }
    if bytes.len() > 5_000_000
        || (profile_id == "unity-ads-ua-playable" && bytes.len() == 5_000_000)
    {
        return Err(error(
            "E_ARTIFACT_SIZE",
            format!("Native {profile_id} creative violates its 5,000,000 byte limit"),
        ));
    }
    let html = std::str::from_utf8(bytes).map_err(|e| error("E_HTML_ENCODING", e))?;
    let middle = format!("</script><script>{SCRIPT}");
    let middle_3d = format!("</script><script>{SCRIPT_3D}");
    let mounted = strip_prefix(html)
        .ok_or_else(|| error("E_ARTIFACT_TRUSTED_STRUCTURE", "Native HTML prefix differs"))?
        .strip_suffix(&mount_suffix(profile_id))
        .ok_or_else(|| {
            error(
                "E_ARTIFACT_TRUSTED_STRUCTURE",
                "Native network mount differs",
            )
        })?;
    let (raw, is_3d_runtime) = if let Some(stripped) = mounted.strip_suffix(&middle_3d) {
        (stripped, true)
    } else if let Some(stripped) = mounted.strip_suffix(&middle) {
        (stripped, false)
    } else {
        let actual = &mounted[mounted.len().saturating_sub(middle.len())..];
        return Err(error(
            "E_ARTIFACT_TRUSTED_STRUCTURE",
            format!(
                "Native runtime differs: actual {} expected {}",
                asset_pipeline::hash(actual.as_bytes()),
                asset_pipeline::hash(middle.as_bytes())
            ),
        ));
    };
    let (mut value, encoded) = payload(raw)?;
    let assets = value["assets"]
        .as_array_mut()
        .ok_or_else(|| error("E_NATIVE_SCHEMA", "Missing native assets"))?;
    if assets.len() != encoded.len() {
        return Err(error(
            "E_ARTIFACT_RESOURCE",
            "Native asset payload count mismatch",
        ));
    }
    let mut decoded_bytes = 0_u64;
    let mut referenced_images = 0_usize;
    for (asset, data) in assets.iter_mut().zip(encoded) {
        if asset.as_object().map(|value| {
            value
                .keys()
                .map(String::as_str)
                .collect::<std::collections::BTreeSet<_>>()
        }) != Some(std::collections::BTreeSet::from([
            "id",
            "hash",
            "mime",
            "bytes",
            "rights",
            "provenance",
            "data",
        ])) {
            return Err(error(
                "E_NATIVE_ASSET",
                "Native asset metadata differs from the authoring contract",
            ));
        }
        if asset["data"] != "" {
            return Err(error("E_ARTIFACT_RESOURCE", "Misplaced native asset data"));
        }
        let bytes = BASE64
            .decode(data.as_bytes())
            .map_err(|e| error("E_ARTIFACT_RESOURCE", e))?;
        if BASE64.encode(&bytes) != data
            || bytes.is_empty()
            || asset["bytes"].as_u64() != Some(bytes.len() as u64)
            || asset["hash"].as_str()
                != Some(format!("sha256:{}", asset_pipeline::hash(&bytes)).as_str())
        {
            return Err(error(
                "E_ARTIFACT_RESOURCE",
                "Native asset bytes, encoding or hash mismatch",
            ));
        }
        match asset["mime"].as_str().unwrap_or("") {
            "image/png" => {
                let (w, h) = asset_pipeline::validate_embedded_png(&bytes)?;
                decoded_bytes += u64::from(w) * u64::from(h) * 4;
                referenced_images += 1;
            }
            "image/jpeg" => {
                if !bytes.starts_with(&[0xff, 0xd8, 0xff]) || !bytes.ends_with(&[0xff, 0xd9]) {
                    return Err(error("E_ARTIFACT_RESOURCE", "Invalid embedded JPEG"));
                }
                decoded_bytes += bytes.len() as u64;
                referenced_images += 1;
            }
            "audio/wav" => {
                if bytes.len() < 44 || &bytes[..4] != b"RIFF" || &bytes[8..12] != b"WAVE" {
                    return Err(error("E_ARTIFACT_RESOURCE", "Invalid embedded WAV"));
                }
            }
            "audio/mpeg" => {
                validate_mp3(&bytes)?;
            }
            "model/tora-mesh" => {
                validate_tora_mesh(&bytes)?;
            }
            _ => return Err(error("E_ARTIFACT_RESOURCE", "Unsupported native asset")),
        }
        asset.as_object_mut().unwrap().remove("data");
    }
    let project = creative_project_schema::parse_project(value.to_string().as_bytes())
        .map_err(|e| error(e.code, e))?;
    let config = project.to_string();
    if [
        "[Product Name]",
        "[Store URL]",
        "id=com.yourcompany.",
        "id=com.yourapp.",
        "id=com.demo.",
        "id=com.test.",
        "id=com.example.",
        "placeholder",
    ]
    .iter()
    .any(|marker| config.contains(marker))
    {
        return Err(error(
            "E_ARTIFACT_PLACEHOLDER",
            "Unresolved native placeholder/development destination",
        ));
    }
    let base = &project["base"];
    let store = base["storeUrl"].as_str().unwrap_or("");
    if !valid_store(store) {
        return Err(error("E_NATIVE_STORE", "Invalid native store destination"));
    }
    let width = u32::try_from(base["width"].as_u64().unwrap_or(0))
        .map_err(|e| error("E_NATIVE_SCHEMA", e))?;
    let height = u32::try_from(base["height"].as_u64().unwrap_or(0))
        .map_err(|e| error("E_NATIVE_SCHEMA", e))?;
    Ok(ArtifactFacts {
        project_id: project["projectId"].as_str().unwrap().into(),
        profile_id: profile_id.into(),
        renderer: Some(
            if is_3d_runtime {
                "tora-native-webgl2-3d"
            } else {
                "tora-native-canvas2d"
            }
            .into(),
        ),
        width,
        height,
        decoded_bytes,
        referenced_images,
        artifact_sha256: asset_pipeline::hash(bytes),
        orientation: "responsive".into(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn artifact(project: Value) -> String {
        artifact_for(project, "unity-ads-ua-playable", SCRIPT)
    }
    fn artifact_for(project: Value, profile_id: &str, script: &str) -> String {
        let raw = crate::embedded_json(&project).unwrap();
        format!(
            "{PREFIX}{raw}</script><script>{script}{}",
            mount_suffix(profile_id)
        )
    }
    fn project() -> Value {
        json!({
            "schemaVersion":"2.1.0","projectId":"native-test","revisionId":"initial",
            "generationOrigin":"human-authored","creativeBrief":{"goal":"Test native artifact","language":"en"},
            "base":{"kind":"native-scene","runtimeId":"tora-native","runtimeVersion":"1.0.0","width":390,"height":700,"startScene":"scene.play","storeUrl":"https://play.google.com/store/apps/details?id=com.playablelab.game"},
            "scenes":[{"id":"scene.play","label":"Play","role":"interactive"}],
            "components":[],"assets":[],"variables":[],"gameplay":[],"events":[],"eventBindings":[],"tombstones":[]
        })
    }
    #[test]
    fn native_assets_require_canonical_bytes_and_matching_hashes() {
        let png = include_bytes!("../../../fixtures/native/ding-dang-assets/cat_0.png");
        let encoded = BASE64.encode(png);
        let mut value = project();
        value["assets"] = json!([{"id":"cat","hash":format!("sha256:{}",asset_pipeline::hash(png)),"mime":"image/png","bytes":png.len(),"rights":"fixture","provenance":"fixture","data":encoded}]);
        let html = artifact(value.clone());
        let facts = inspect(html.as_bytes()).unwrap();
        assert_eq!(facts.referenced_images, 1);
        assert!(facts.decoded_bytes > 0);
        value["assets"][0]["hash"] = format!("sha256:{}", "0".repeat(64)).into();
        assert!(inspect(artifact(value.clone()).as_bytes()).is_err());
        value["assets"][0]["data"] = "not base64!".into();
        assert!(inspect(artifact(value).as_bytes()).is_err());
    }
    #[test]
    fn native_unity_format_is_strict_and_rejects_untrusted_or_placeholder_artifacts() {
        let html = artifact(project());
        let facts = inspect(html.as_bytes()).unwrap();
        assert_eq!(facts.project_id, "native-test");
        assert_eq!(facts.orientation, "responsive");
        assert_eq!(
            crate::inspect_network_html(html.as_bytes(), "unity-ads-ua-playable")
                .unwrap()
                .artifact_sha256,
            asset_pipeline::hash(html.as_bytes())
        );
        assert!(inspect(html.replacen(SCRIPT, "alert(1)", 1).as_bytes()).is_err());
        assert!(
            inspect(
                html.replacen("unity-ads-ua-playable", "standalone-browser-draft", 1)
                    .as_bytes()
            )
            .is_err()
        );
        let mut placeholder = project();
        placeholder["creativeBrief"]["goal"] = "placeholder".into();
        assert!(inspect(artifact(placeholder).as_bytes()).is_err());
        let mut external = project();
        external["assets"] = json!([{"id":"image","hash":"sha256:0000000000000000000000000000000000000000000000000000000000000000","mime":"image/png","bytes":1,"rights":"test","provenance":"test","data":"https://invalid/image.png"}]);
        assert!(inspect(artifact(external).as_bytes()).is_err());
    }
    #[test]
    fn native_applovin_supports_2d_and_3d_and_rejects_cross_profile_mounts() {
        let applovin = artifact_for(project(), "applovin-growth-playable", SCRIPT);
        let facts = inspect_for_profile(applovin.as_bytes(), "applovin-growth-playable").unwrap();
        assert_eq!(facts.profile_id, "applovin-growth-playable");
        assert_eq!(facts.renderer.as_deref(), Some("tora-native-canvas2d"));
        let applovin_3d = artifact_for(project(), "applovin-growth-playable", SCRIPT_3D);
        let facts_3d =
            inspect_for_profile(applovin_3d.as_bytes(), "applovin-growth-playable").unwrap();
        assert_eq!(facts_3d.renderer.as_deref(), Some("tora-native-webgl2-3d"));
        let mismatch =
            inspect_for_profile(applovin.as_bytes(), "unity-ads-ua-playable").unwrap_err();
        assert_eq!(mismatch.code, "E_ARTIFACT_TRUSTED_STRUCTURE");
        let unity = artifact(project());
        let mismatch =
            inspect_for_profile(unity.as_bytes(), "applovin-growth-playable").unwrap_err();
        assert_eq!(mismatch.code, "E_ARTIFACT_TRUSTED_STRUCTURE");
    }
}
