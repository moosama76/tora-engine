use crate::{
    Finding, Packaging, Profile, ReviewDate, RuleReviewReport, RuleReviewStatus, Severity,
};
use serde::Serialize;
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ArtifactReport {
    pub scope: &'static str,
    pub status: &'static str,
    pub technical_status: &'static str,
    pub file_bytes: usize,
    pub facts: Option<packer::ArtifactFacts>,
    pub findings: Vec<Finding>,
    pub rule_review: RuleReviewReport,
    pub network_acceptance: &'static str,
    pub physical_devices: &'static str,
}
impl ArtifactReport {
    pub fn exit_code(&self) -> u8 {
        if self.technical_status == "FAIL" {
            5
        } else if self.status == "BLOCKED_UNVERIFIED_RULES" {
            6
        } else {
            0
        }
    }
}
pub fn check_artifact(
    bytes: &[u8],
    entry: &str,
    profile: &Profile,
    as_of: &ReviewDate,
    confirmation: Option<&ReviewDate>,
) -> ArtifactReport {
    let review = profile.assess_rules(as_of, confirmation);
    let mut findings = Vec::new();
    let mut add = |code, path: &str, message: String| {
        findings.push(Finding {
            severity: Severity::Error,
            code,
            path: path.into(),
            message,
        })
    };
    if !matches!(
        profile.profile_id(),
        "applovin-growth-playable"
            | "unity-ads-ua-playable"
            | "ironsource-levelplay-playable"
            | "meta-audience-playable"
            | "google-ads-app-playable"
            | "mintegral-appgrowth-zip"
            | "tiktok-ads-playable"
    ) {
        add(
            "E_ADAPTER_PROFILE",
            "/profileId",
            "No compiled adapter for this profile".into(),
        );
    }
    if profile.profile_id() == "unity-ads-ua-playable" {
        let wrong_mraid = profile.rules().mraid.verified_value().is_some_and(|rule| {
            rule.as_ref()
                .is_none_or(|mraid| !matches!(mraid.version, crate::MraidVersion::V3))
        });
        let wrong_visibility = profile
            .rules()
            .viewability
            .verified_value()
            .is_some_and(|rule| {
                !rule.allow_initial_state_query
                    || rule.required_events != [crate::HostVisibilityEvent::ViewableChange]
            });
        if wrong_mraid || wrong_visibility {
            add("E_ADAPTER_PROFILE", "/rules", "Compiled Unity UA adapter requires MRAID 3.0, viewableChange and the post-ready initial visibility query".into());
        }
    }
    if profile.profile_id() == "applovin-growth-playable" {
        let wrong_mraid = profile.rules().mraid.verified_value().is_some_and(|rule| {
            rule.as_ref()
                .is_none_or(|mraid| !matches!(mraid.version, crate::MraidVersion::V2))
        });
        let wrong_visibility = profile
            .rules()
            .viewability
            .verified_value()
            .is_some_and(|rule| {
                !rule.allow_initial_state_query
                    || rule.required_events != [crate::HostVisibilityEvent::ViewableChange]
            });
        if wrong_mraid || wrong_visibility {
            add("E_ADAPTER_PROFILE", "/rules", "Compiled AppLovin adapter requires MRAID 2.0, viewableChange and the initial visibility query".into());
        }
    }
    let expected_vendor = match profile.profile_id() {
        "ironsource-levelplay-playable" => Some(crate::VendorHostRule::Dapi),
        "meta-audience-playable" => Some(crate::VendorHostRule::MetaFbPlayableAd),
        "google-ads-app-playable" => Some(crate::VendorHostRule::GoogleExitApi),
        "mintegral-appgrowth-zip" => Some(crate::VendorHostRule::MintegralGlobal),
        "tiktok-ads-playable" => Some(crate::VendorHostRule::TikTokPlayableSdk),
        _ => None,
    };
    if let Some(expected) = expected_vendor {
        if profile
            .rules()
            .vendor_host
            .as_ref()
            .and_then(|rule| rule.verified_value())
            != Some(&expected)
        {
            add(
                "E_ADAPTER_PROFILE",
                "/rules/vendorHost",
                "Vendor host rule differs from the compiled adapter".into(),
            );
        }
        if profile
            .rules()
            .mraid
            .verified_value()
            .is_some_and(Option::is_some)
        {
            add(
                "E_ADAPTER_PROFILE",
                "/rules/mraid",
                "Vendor-host targets must not claim a MRAID adapter".into(),
            );
        }
        if let Some(visibility) = profile.rules().viewability.verified_value() {
            use crate::HostVisibilityEvent::{
                DocumentVisibilityChange, GameClose, GameStart, ViewableChange,
            };
            let valid = match profile.profile_id() {
                "ironsource-levelplay-playable" => {
                    visibility.required_events == [ViewableChange]
                        && visibility.allow_initial_state_query
                }
                "mintegral-appgrowth-zip" => {
                    visibility.required_events == [GameStart, GameClose]
                        && !visibility.allow_initial_state_query
                }
                "meta-audience-playable" | "google-ads-app-playable" | "tiktok-ads-playable" => {
                    visibility.required_events == [DocumentVisibilityChange]
                        && visibility.allow_initial_state_query
                }
                _ => true,
            };
            if !valid {
                add(
                    "E_ADAPTER_PROFILE",
                    "/rules/viewability",
                    "Visibility events differ from the compiled vendor adapter".into(),
                );
            }
        }
    }
    let expected_script = match profile.profile_id() {
        "google-ads-app-playable" => Some((
            "https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js",
            crate::ScriptPlacement::HeadBeforeRuntime,
        )),
        "tiktok-ads-playable" => Some((
            "https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/Playable/sdk/Playable-sdk.js",
            crate::ScriptPlacement::BodyBeforeRuntime,
        )),
        _ => None,
    };
    if let Some(inline) = profile.rules().inline.verified_value() {
        let matches = expected_script.as_ref().is_some_and(|(src, placement)| {
            inline.required_host_scripts
                == [crate::HostScript {
                    src: (*src).into(),
                    placement: *placement,
                    host_provided: true,
                }]
                && inline.host_exceptions == inline.required_host_scripts
        });
        if expected_script.is_some() != matches
            || (expected_script.is_none()
                && (!inline.required_host_scripts.is_empty() || !inline.host_exceptions.is_empty()))
        {
            add(
                "E_HOST_SCRIPT_PROFILE_MISMATCH",
                "/rules/inline",
                "Host scripts differ from this compiled target".into(),
            );
        }
    }
    if let Some(size) = profile.rules().upload_size.verified_value()
        && !size.accepts(bytes.len() as u64)
    {
        add(
            "E_UPLOAD_SIZE",
            "/fileBytes",
            "Exact final bytes violate profile comparator".into(),
        );
    }
    let packaging = profile.rules().packaging.verified_value();
    if let Some(Packaging::SingleHtml { entry_file, .. }) = packaging {
        if entry != entry_file {
            add(
                "E_ARTIFACT_ENTRY",
                "/entry",
                "Entry filename differs from the single-HTML profile".into(),
            );
        }
        if entry.ends_with(".zip") {
            add(
                "E_ARTIFACT_PACKAGE",
                "/entry",
                "Single-HTML profiles reject ZIP artifacts".into(),
            );
        }
    } else if let Some(Packaging::Zip { .. }) = packaging
        && !entry.ends_with(".zip")
    {
        add(
            "E_ARTIFACT_PACKAGE",
            "/entry",
            "This profile requires a .zip artifact".into(),
        );
    }
    // Closed-format verification inspects every active context by exact trusted reconstruction.
    let inspected = match packaging {
        Some(Packaging::SingleHtml { .. }) => {
            packer::inspect_network_html(bytes, profile.profile_id())
        }
        Some(Packaging::Zip { .. }) => {
            packer::inspect_network_zip(bytes, entry, profile.profile_id())
        }
        None => Err(packer::PackError {
            code: "E_ARTIFACT_PACKAGE",
            detail: "Packaging rule is not verified".into(),
        }),
    };
    let facts = match inspected {
        Ok(facts) => {
            if facts.orientation != "responsive" {
                add(
                    "E_ARTIFACT_ORIENTATION",
                    "/project/orientation",
                    "The compiled network target requires both orientations".into(),
                );
            }
            Some(facts)
        }
        Err(e) => {
            add(e.code, "/artifact", e.detail);
            None
        }
    };
    if profile
        .rules()
        .upload_size
        .verified_value()
        .is_some_and(|size| size.exceeds_headroom(bytes.len() as u64))
    {
        findings.push(Finding {
            severity: Severity::Warning,
            code: "W_SIZE_HEADROOM",
            path: "/fileBytes".into(),
            message: "Final bytes exceed the local 95% headroom target".into(),
        });
    }
    let technical_status = if findings.iter().any(|f| f.severity == Severity::Error) {
        "FAIL"
    } else {
        "PASS"
    };
    let status = if technical_status == "FAIL" {
        "FAIL"
    } else if review.status == RuleReviewStatus::BlockedUnverifiedRules {
        "BLOCKED_UNVERIFIED_RULES"
    } else {
        "STATIC_PASS"
    };
    ArtifactReport {
        scope: "static-trusted-artifact-only",
        status,
        technical_status,
        file_bytes: bytes.len(),
        facts,
        findings,
        rule_review: review,
        network_acceptance: "not yet verified",
        physical_devices: "not yet verified",
    }
}
