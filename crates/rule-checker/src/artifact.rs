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
        "applovin-growth-playable" | "unity-ads-ua-playable"
    ) {
        add(
            "E_ADAPTER_PROFILE",
            "/profileId",
            "No compiled adapter for this profile".into(),
        );
    }
    if profile.profile_id() == "unity-ads-ua-playable" {
        let wrong_mraid = profile
            .rules()
            .mraid
            .verified_value()
            .is_some_and(|rule| !matches!(rule.version, crate::MraidVersion::V3));
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
        let wrong_mraid = profile
            .rules()
            .mraid
            .verified_value()
            .is_some_and(|rule| !matches!(rule.version, crate::MraidVersion::V2));
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
    if profile
        .rules()
        .inline
        .verified_value()
        .is_some_and(|inline| {
            !inline.required_host_scripts.is_empty() || !inline.host_exceptions.is_empty()
        })
    {
        add(
            "E_HOST_SCRIPT_PROFILE_MISMATCH",
            "/rules/inline",
            "This compiled target emits no host-script exception".into(),
        );
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
    if let Some(Packaging::SingleHtml { entry_file, .. }) =
        profile.rules().packaging.verified_value()
    {
        if entry != entry_file {
            add(
                "E_ARTIFACT_ENTRY",
                "/entry",
                "Entry filename differs from the single-HTML profile".into(),
            );
        }
    } else if profile.rules().packaging.verified_value().is_some() {
        add(
            "E_ARTIFACT_PACKAGE",
            "/entry",
            "Only single HTML is supported".into(),
        );
    }
    // Closed-format verification inspects every active context by exact trusted reconstruction.
    let facts = match packer::inspect_network_html(bytes, profile.profile_id()) {
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
