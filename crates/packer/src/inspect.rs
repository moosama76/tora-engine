//! Closed-format verifier: accepts only the current trusted Tora Native 2D/3D shell and bundle.
use crate::{PackError, error};
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ArtifactFacts {
    pub project_id: String,
    pub profile_id: String,
    pub renderer: Option<String>,
    pub width: u32,
    pub height: u32,
    pub decoded_bytes: u64,
    pub referenced_images: usize,
    pub artifact_sha256: String,
    pub orientation: String,
}

pub fn inspect_applovin_html(bytes: &[u8]) -> Result<ArtifactFacts, PackError> {
    inspect_network_html(bytes, "applovin-growth-playable")
}

pub fn inspect_network_html(bytes: &[u8], profile_id: &str) -> Result<ArtifactFacts, PackError> {
    if !["applovin-growth-playable", "unity-ads-ua-playable"].contains(&profile_id) {
        return Err(error(
            "E_ADAPTER_PROFILE",
            "No compiled native adapter for this exact profile",
        ));
    }
    if bytes.len() > crate::MAX_HTML_BYTES {
        return Err(error("E_ARTIFACT_SIZE", "Local inspection bound exceeded"));
    }
    if !crate::native::is_native_html(bytes) {
        return Err(error(
            "E_ARTIFACT_TRUSTED_STRUCTURE",
            "HTML/CSS/JS differs from the trusted Tora Native format; external references, host scripts and arbitrary code are not permitted",
        ));
    }
    crate::native::inspect_for_profile(bytes, profile_id)
}
