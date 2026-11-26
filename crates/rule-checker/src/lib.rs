//! Offline, channel-specific rule review. Artifact scanning and adapters are later tickets.
mod artifact;
mod date;
pub use artifact::{ArtifactReport, check_artifact};
mod model;
mod review;
pub use date::ReviewDate;
use model::RulePack;
pub use model::*;
pub use review::*;
use serde_json::Value;
use std::{collections::BTreeSet, fmt};
pub const RULE_SCHEMA_VERSION: &str = "1.0.0";
pub const MAX_REVIEW_AGE_DAYS: u32 = 30;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RuleError {
    pub code: &'static str,
    pub path: String,
    pub message: String,
}
impl fmt::Display for RuleError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} {}: {}", self.code, self.path, self.message)
    }
}
impl std::error::Error for RuleError {}
fn invalid(path: &str, message: impl Into<String>) -> RuleError {
    RuleError {
        code: "E_RULE_PACK",
        path: path.into(),
        message: message.into(),
    }
}
fn require(ok: bool, path: &str, message: &str) -> Result<(), RuleError> {
    if ok {
        Ok(())
    } else {
        Err(invalid(path, message))
    }
}
fn safe_id(value: &str) -> bool {
    value.len() <= 64
        && value
            .bytes()
            .next()
            .is_some_and(|b| b.is_ascii_lowercase() || b.is_ascii_digit())
        && value
            .bytes()
            .all(|b| b.is_ascii_lowercase() || b.is_ascii_digit() || b == b'_' || b == b'-')
}
fn text(value: &str, maximum: usize) -> bool {
    !value.trim().is_empty()
        && value.chars().count() <= maximum
        && !value
            .chars()
            .any(|c| c.is_control() && c != '\n' && c != '\t')
}
fn official_https(url: &str, network: &NetworkId) -> bool {
    if url.len() > 2048
        || !url.is_ascii()
        || url
            .chars()
            .any(|c| c.is_whitespace() || c.is_control() || c == '\\')
    {
        return false;
    }
    let Some(rest) = url.strip_prefix("https://") else {
        return false;
    };
    let host = rest.split(['/', '?', '#']).next().unwrap_or("");
    match network {
        NetworkId::Applovin => ["support.applovin.com", "p.applov.in"].contains(&host),
        NetworkId::UnityAds => ["docs.unity.com", "cloud.unity.com"].contains(&host),
        NetworkId::Mintegral => [
            "helpcenter.mintegral.com",
            "www.mindworks-creative.com",
            "www.playturbo.com",
        ]
        .contains(&host),
        NetworkId::Meta => ["www.facebook.com", "developers.facebook.com"].contains(&host),
        NetworkId::GoogleAds => ["support.google.com", "developers.google.com"].contains(&host),
        NetworkId::Ironsource => ["developers.is.com", "docs.unity.com"].contains(&host),
        NetworkId::Tiktok => ["ads.tiktok.com"].contains(&host),
    }
}
fn size_valid(size: &SizeRule, path: &str) -> Result<(), RuleError> {
    require(
        (1..=1_000_000_000).contains(&size.limit_bytes),
        path,
        "Byte limit must be 1 through 1,000,000,000",
    )
}
fn review_valid<T>(rule: &Rule<T>, path: &str, ids: &BTreeSet<&str>) -> Result<(), RuleError> {
    require(
        text(rule.notes(), 4000),
        path,
        "Rule notes/reason must be nonempty bounded text",
    )?;
    require(
        rule.sources().len() <= 32,
        path,
        "Too many source references",
    )?;
    if rule.verified_value().is_some() {
        require(
            !rule.sources().is_empty(),
            path,
            "Verified rules require source references",
        )?;
    }
    let mut references = BTreeSet::new();
    for source in rule.sources() {
        require(
            ids.contains(source.as_str()) && references.insert(source),
            path,
            "Unknown or duplicate source reference",
        )?;
    }
    Ok(())
}
/// A rule pack is constructible only through strict parsing and semantic checks.
#[derive(Debug, Clone)]
pub struct Profile {
    pub(crate) pack: RulePack,
}
impl Profile {
    pub fn profile_id(&self) -> &str {
        &self.pack.profile_id
    }
    pub fn reviewed_at(&self) -> &ReviewDate {
        &self.pack.reviewed_at
    }
    pub fn rules(&self) -> &Rules {
        &self.pack.rules
    }
    pub fn as_value(&self) -> Value {
        serde_json::to_value(&self.pack).expect("validated rule pack")
    }
}
pub fn parse_rule_pack(input: &str) -> Result<Profile, RuleError> {
    let value = creative_project_schema::parse_json_document(input).map_err(|e| RuleError {
        code: e.code,
        path: String::new(),
        message: e.message,
    })?;
    if let Some(version) = value["schemaVersion"].as_str()
        && version != RULE_SCHEMA_VERSION
    {
        return Err(RuleError {
            code: "E_RULE_VERSION",
            path: "/schemaVersion".into(),
            message: format!("Unsupported rule schema {version}"),
        });
    }
    let pack: RulePack = serde_json::from_value(value).map_err(|e| invalid("/", e.to_string()))?;
    validate(&pack)?;
    Ok(Profile { pack })
}
fn validate(p: &RulePack) -> Result<(), RuleError> {
    require(
        p.schema_version == RULE_SCHEMA_VERSION,
        "/schemaVersion",
        "Unsupported rule schema",
    )?;
    for (path, value) in [
        ("/profileId", &p.profile_id),
        ("/channelId", &p.channel_id),
        ("/rulesVersion", &p.rules_version),
    ] {
        require(safe_id(value), path, "Expected bounded safe identifier")?;
    }
    require(
        p.profile_id == format!("{}-{}", p.network_id.as_str(), p.channel_id),
        "/profileId",
        "Profile ID must bind networkId and channelId without an alias",
    )?;
    require(
        !p.sources.is_empty() && p.sources.len() <= 32,
        "/sources",
        "Expected 1 through 32 sources",
    )?;
    let mut source_ids = BTreeSet::new();
    for (i, source) in p.sources.iter().enumerate() {
        let path = format!("/sources/{i}");
        require(
            safe_id(&source.id) && source_ids.insert(source.id.as_str()),
            &path,
            "Invalid or duplicate source ID",
        )?;
        require(
            official_https(&source.url, &p.network_id),
            &path,
            "Expected HTTPS source URL on an approved host for this network",
        )?;
        require(
            text(&source.title, 300) && text(&source.notes, 4000),
            &path,
            "Source title and notes must be bounded nonempty text",
        )?;
        require(
            source.checked_at <= p.reviewed_at,
            &path,
            "Source checkedAt cannot follow reviewedAt",
        )?;
    }
    let r = &p.rules;
    macro_rules! rule {
        ($field:ident, $name:literal) => {
            review_valid(&r.$field, concat!("/rules/", $name), &source_ids)?
        };
    }
    rule!(upload_size, "uploadSize");
    rule!(packaging, "packaging");
    rule!(inline, "inline");
    rule!(mraid, "mraid");
    if let Some(vendor_host) = &r.vendor_host {
        review_valid(vendor_host, "/rules/vendorHost", &source_ids)?;
    }
    rule!(autoplay, "autoplay");
    rule!(first_click, "firstClick");
    rule!(viewability, "viewability");
    rule!(orientations, "orientations");
    rule!(preview, "preview");
    rule!(companion_assets, "companionAssets");
    if let Some(size) = r.upload_size.any_value() {
        size_valid(size, "/rules/uploadSize")?;
    }
    if let Some(packaging) = r.packaging.any_value() {
        let entry = match packaging {
            Packaging::SingleHtml { entry_file, .. } | Packaging::Zip { entry_file, .. } => {
                entry_file
            }
        };
        require(
            entry.strip_suffix(".html").is_some_and(safe_id),
            "/rules/packaging",
            "Entry must be a safe HTML basename; no paths, URL or traversal",
        )?;
        if let Packaging::Zip {
            required_files,
            name_matches_archive,
            flat_root,
            ..
        } = packaging
        {
            require(
                required_files.len() <= 15
                    && required_files
                        .iter()
                        .all(|name| safe_id(name) || name == "config.json"),
                "/rules/packaging",
                "ZIP companion files must be safe flat basenames",
            )?;
            require(
                !name_matches_archive || !flat_root,
                "/rules/packaging",
                "Archive-named HTML cannot use a flat root",
            )?;
        }
    }
    if let Some(inline) = r.inline.any_value() {
        require(
            inline.require_inline_assets,
            "/rules/inline",
            "v1 profiles require inline assets",
        )?;
        require(
            inline.required_host_scripts.len() <= 4 && inline.host_exceptions.len() <= 4,
            "/rules/inline",
            "Too many host script exceptions",
        )?;
        for script in inline
            .required_host_scripts
            .iter()
            .chain(&inline.host_exceptions)
        {
            let allowed = script.host_provided
                && match script.src.as_str() {
                    "mraid.js" => script.placement == ScriptPlacement::HeadBeforeRuntime,
                    "https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js" => {
                        script.placement == ScriptPlacement::HeadBeforeRuntime
                    }
                    "https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/Playable/sdk/Playable-sdk.js" => {
                        script.placement == ScriptPlacement::BodyBeforeRuntime
                    }
                    _ => false,
                };
            require(
                allowed,
                "/rules/inline",
                "Only exact declared MRAID, Google ExitApi, or TikTok host scripts are supported",
            )?;
        }
        require(
            inline
                .required_host_scripts
                .iter()
                .all(|s| inline.host_exceptions.contains(s))
                && inline
                    .host_exceptions
                    .iter()
                    .all(|s| inline.required_host_scripts.contains(s)),
            "/rules/inline",
            "Every exception must match a required host script exactly",
        )?;
        for scripts in [&inline.required_host_scripts, &inline.host_exceptions] {
            require(
                scripts
                    .iter()
                    .enumerate()
                    .all(|(i, script)| !scripts[..i].contains(script)),
                "/rules/inline",
                "Duplicate host script",
            )?;
        }
    }
    if let Some(visibility) = r.viewability.any_value() {
        require(
            !visibility.required_events.is_empty()
                && visibility.required_events.len() <= 2
                && visibility
                    .required_events
                    .iter()
                    .enumerate()
                    .all(|(i, event)| !visibility.required_events[..i].contains(event)),
            "/rules/viewability",
            "Expected explicit, unique visibility event subscriptions",
        )?;
        if r.mraid.any_value().is_some_and(|m| {
            m.as_ref()
                .is_some_and(|rule| matches!(rule.version, MraidVersion::V2))
        }) {
            require(
                !visibility
                    .required_events
                    .contains(&HostVisibilityEvent::ExposureChange),
                "/rules/viewability",
                "exposureChange is not a MRAID 2 event",
            )?;
        }
    }
    if let Some(preview) = r.preview.any_value() {
        require(
            official_https(&preview.url, &p.network_id) && text(&preview.instructions, 4000),
            "/rules/preview",
            "Expected official HTTPS preview URL and bounded instructions",
        )?;
    }
    if let Some(assets) = r.companion_assets.any_value() {
        require(
            assets.len() <= 16,
            "/rules/companionAssets",
            "Too many companion assets",
        )?;
        let mut ids = BTreeSet::new();
        for asset in assets {
            require(
                safe_id(&asset.id) && ids.insert(&asset.id),
                "/rules/companionAssets",
                "Invalid or duplicate companion asset ID",
            )?;
            require(
                !asset.dimensions.is_empty()
                    && asset.dimensions.len() <= 8
                    && asset.dimensions.iter().all(|d| {
                        (1..=10_000).contains(&d.width) && (1..=10_000).contains(&d.height)
                    }),
                "/rules/companionAssets",
                "Invalid companion dimensions",
            )?;
            require(
                !asset.formats.is_empty() && asset.formats.len() <= 5,
                "/rules/companionAssets",
                "Invalid companion formats",
            )?;
            size_valid(&asset.size, "/rules/companionAssets")?;
        }
    }
    require(
        p.additional_rules.len() <= 64 && p.unresolved.len() <= 64,
        "/",
        "Too many extension rules or unresolved items",
    )?;
    let mut extra_ids = BTreeSet::new();
    for (i, extra) in p.additional_rules.iter().enumerate() {
        let path = format!("/additionalRules/{i}");
        require(
            safe_id(&extra.id) && extra_ids.insert(&extra.id),
            &path,
            "Invalid or duplicate extension rule ID",
        )?;
        review_valid(&extra.review, &path, &source_ids)?;
    }
    for reason in &p.unresolved {
        require(
            text(reason, 4000),
            "/unresolved",
            "Unresolved items need bounded nonempty explanations",
        )?;
    }
    Ok(())
}
pub fn load_builtin(profile_id: &str) -> Result<Profile, RuleError> {
    let source = match profile_id {
        "applovin-growth-playable" => {
            include_str!("../../../network-rules/applovin-growth-playable.json")
        }
        "unity-ads-ua-playable" => {
            include_str!("../../../network-rules/unity-ads-ua-playable.json")
        }
        "mintegral-appgrowth-single-html" => {
            include_str!("../../../network-rules/mintegral-appgrowth-single-html.json")
        }
        "ironsource-levelplay-playable" => {
            include_str!("../../../network-rules/ironsource-levelplay-playable.json")
        }
        "meta-audience-playable" => {
            include_str!("../../../network-rules/meta-audience-playable.json")
        }
        "google-ads-app-playable" => {
            include_str!("../../../network-rules/google-ads-app-playable.json")
        }
        "mintegral-appgrowth-zip" => {
            include_str!("../../../network-rules/mintegral-appgrowth-zip.json")
        }
        "tiktok-ads-playable" => include_str!("../../../network-rules/tiktok-ads-playable.json"),
        _ => {
            return Err(RuleError {
                code: "E_RULE_PROFILE_UNKNOWN",
                path: "/profileId".into(),
                message: format!("No bundled channel profile: {profile_id}"),
            });
        }
    };
    parse_rule_pack(source)
}
