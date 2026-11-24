//! Closed-format native artifact verification from repository-owned trusted bundles.
//! Static verification only; grants no device or ad-network acceptance.
mod inspect;
pub mod native;
pub use inspect::{ArtifactFacts, inspect_applovin_html, inspect_network_html};
use serde_json::Value;
use std::fmt;

/// Offline inspection bound, not an ad-network upload limit.
pub const MAX_HTML_BYTES: usize = 16 * 1024 * 1024;

#[derive(Debug)]
pub struct PackError {
    pub code: &'static str,
    pub detail: String,
}
impl fmt::Display for PackError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.code, self.detail)
    }
}
impl std::error::Error for PackError {}
impl From<asset_pipeline::AssetError> for PackError {
    fn from(e: asset_pipeline::AssetError) -> Self {
        Self {
            code: e.code,
            detail: e.detail,
        }
    }
}
pub(crate) fn error(code: &'static str, detail: impl ToString) -> PackError {
    PackError {
        code,
        detail: detail.to_string(),
    }
}

/// Canonical HTML-safe JSON encoding for inline `<script type="application/json">` payloads.
pub fn embedded_json(value: &Value) -> Result<String, PackError> {
    let raw = serde_json::to_string(value).map_err(|e| error("E_PACK_JSON", e))?;
    let mut out = String::with_capacity(raw.len());
    for ch in raw.chars() {
        match ch {
            '&' => out.push_str("\\u0026"),
            '<' => out.push_str("\\u003c"),
            '>' => out.push_str("\\u003e"),
            '\u{2028}' => out.push_str("\\u2028"),
            '\u{2029}' => out.push_str("\\u2029"),
            _ => out.push(ch),
        }
    }
    Ok(out)
}
