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
    if ![
        "applovin-growth-playable",
        "unity-ads-ua-playable",
        "ironsource-levelplay-playable",
        "meta-audience-playable",
    ]
    .contains(&profile_id)
    {
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

pub fn inspect_network_zip(
    bytes: &[u8],
    archive_name: &str,
    profile_id: &str,
) -> Result<ArtifactFacts, PackError> {
    if ![
        "google-ads-app-playable",
        "mintegral-appgrowth-zip",
        "tiktok-ads-playable",
    ]
    .contains(&profile_id)
    {
        return Err(error(
            "E_ARTIFACT_PACKAGE",
            "This profile requires a single HTML artifact",
        ));
    }
    let entries = crate::zip::read(bytes)?;
    let expected_entry = match profile_id {
        "google-ads-app-playable" => {
            if entries.len() != 1 {
                return Err(error(
                    "E_ARTIFACT_PACKAGE",
                    "Google Ads ZIP must contain only index.html",
                ));
            }
            "index.html".to_owned()
        }
        "tiktok-ads-playable" => {
            if entries.len() != 2
                || !entries.iter().any(|entry| entry.name == "index.html")
                || !entries.iter().any(|entry| {
                    entry.name == "config.json" && entry.bytes == b"{\"Playable_orientation\":0}"
                })
            {
                return Err(error(
                    "E_ARTIFACT_PACKAGE",
                    "TikTok ZIP requires index.html and an exact portrait config.json",
                ));
            }
            "index.html".into()
        }
        "mintegral-appgrowth-zip" => {
            let name = archive_name
                .strip_suffix(".zip")
                .ok_or_else(|| error("E_ARTIFACT_PACKAGE", "Mintegral artifact must use .zip"))?;
            if name.is_empty()
                || !name
                    .bytes()
                    .all(|byte| byte.is_ascii_lowercase() || byte.is_ascii_digit() || byte == b'-')
            {
                return Err(error(
                    "E_ARTIFACT_PACKAGE",
                    "Invalid Mintegral archive basename",
                ));
            }
            if entries.len() != 1 {
                return Err(error(
                    "E_ARTIFACT_PACKAGE",
                    "Mintegral ZIP must contain one HTML entry",
                ));
            }
            format!("{name}/{name}.html")
        }
        _ => return Err(error("E_ADAPTER_PROFILE", "No ZIP adapter for profile")),
    };
    let html = entries
        .iter()
        .find(|entry| entry.name == expected_entry)
        .ok_or_else(|| {
            error(
                "E_ARTIFACT_PACKAGE",
                "Archive/folder/HTML names do not match the selected profile",
            )
        })?;
    let mut facts = crate::native::inspect_for_profile(&html.bytes, profile_id)?;
    facts.artifact_sha256 = asset_pipeline::hash(bytes);
    Ok(facts)
}
