use crate::{
    AdditionalRule, MAX_REVIEW_AGE_DAYS, NetworkId, Profile, ReviewDate, Rule, Rules, Source,
};
use serde::Serialize;
#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum RuleReviewStatus {
    ReadyForImplementation,
    BlockedUnverifiedRules,
}
#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum Severity {
    Blocked,
    Warning,
    Error,
}
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Finding {
    pub severity: Severity,
    pub code: &'static str,
    pub path: String,
    pub message: String,
}
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RuleReviewReport {
    pub scope: &'static str,
    pub status: RuleReviewStatus,
    pub profile_id: String,
    pub network_id: NetworkId,
    pub channel_id: String,
    pub rules_version: String,
    pub reviewed_at: ReviewDate,
    pub as_of: ReviewDate,
    pub sources: Vec<Source>,
    pub rules: Rules,
    pub additional_rules: Vec<AdditionalRule>,
    pub unresolved: Vec<String>,
    pub findings: Vec<Finding>,
    pub observed_evidence: Option<String>,
    pub network_acceptance: &'static str,
    pub physical_devices: &'static str,
}
fn finding(
    findings: &mut Vec<Finding>,
    severity: Severity,
    code: &'static str,
    path: &str,
    message: impl Into<String>,
) {
    findings.push(Finding {
        severity,
        code,
        path: path.into(),
        message: message.into(),
    });
}
fn check_review<T>(rule: &Rule<T>, path: &str, findings: &mut Vec<Finding>) {
    if let Rule::Unverified { reason, .. } = rule {
        finding(
            findings,
            Severity::Blocked,
            "B_RULE_UNVERIFIED",
            path,
            reason,
        );
    }
}
fn date_fresh(date: &ReviewDate, as_of: &ReviewDate, path: &str, findings: &mut Vec<Finding>) {
    let Some(age) = as_of
        .days_since_epoch()
        .checked_sub(date.days_since_epoch())
    else {
        finding(
            findings,
            Severity::Blocked,
            "B_RULE_REVIEW_FUTURE",
            path,
            "Review is in the future relative to asOf",
        );
        return;
    };
    if age > MAX_REVIEW_AGE_DAYS {
        finding(
            findings,
            Severity::Blocked,
            "B_RULE_REVIEW_EXPIRED",
            path,
            format!("Review age {age} days exceeds {MAX_REVIEW_AGE_DAYS}"),
        );
    }
}
impl Profile {
    /// Caller explicitly supplies the assessment date and confirms the exact reviewed date.
    /// This evaluates rule availability, not an artifact, host or external acceptance.
    pub fn assess_rules(
        &self,
        as_of: &ReviewDate,
        confirmation: Option<&ReviewDate>,
    ) -> RuleReviewReport {
        let p = &self.pack;
        let mut findings = Vec::new();
        date_fresh(&p.reviewed_at, as_of, "/reviewedAt", &mut findings);
        for (i, source) in p.sources.iter().enumerate() {
            date_fresh(
                &source.checked_at,
                as_of,
                &format!("/sources/{i}/checkedAt"),
                &mut findings,
            );
        }
        match confirmation {
            None => finding(
                &mut findings,
                Severity::Blocked,
                "B_REVIEW_CONFIRMATION_REQUIRED",
                "/reviewedAt",
                "Human/CI confirmation of the reviewed date is required",
            ),
            Some(date) if date != &p.reviewed_at => finding(
                &mut findings,
                Severity::Blocked,
                "B_REVIEW_CONFIRMATION_MISMATCH",
                "/reviewedAt",
                "Confirmation does not match this pack's reviewedAt",
            ),
            _ => (),
        }
        let r = &p.rules;
        macro_rules! check {
            ($field:ident, $name:literal) => {
                check_review(&r.$field, concat!("/rules/", $name), &mut findings)
            };
        }
        check!(upload_size, "uploadSize");
        check!(packaging, "packaging");
        check!(inline, "inline");
        check!(mraid, "mraid");
        if let Some(vendor_host) = &r.vendor_host {
            check_review(vendor_host, "/rules/vendorHost", &mut findings);
        }
        check!(autoplay, "autoplay");
        check!(first_click, "firstClick");
        check!(viewability, "viewability");
        check!(orientations, "orientations");
        check!(preview, "preview");
        check!(companion_assets, "companionAssets");
        for (i, rule) in p.additional_rules.iter().enumerate() {
            if rule.critical {
                finding(
                    &mut findings,
                    Severity::Blocked,
                    "B_RULE_UNSUPPORTED",
                    &format!("/additionalRules/{i}"),
                    format!(
                        "Critical extension {} has no implemented evaluator, regardless of its declared review status",
                        rule.id
                    ),
                );
            } else {
                finding(
                    &mut findings,
                    Severity::Warning,
                    "W_RULE_UNEVALUATED",
                    &format!("/additionalRules/{i}"),
                    format!("Noncritical extension {} was not evaluated", rule.id),
                );
            }
        }
        for (i, reason) in p.unresolved.iter().enumerate() {
            finding(
                &mut findings,
                Severity::Blocked,
                "B_RULE_UNRESOLVED",
                &format!("/unresolved/{i}"),
                reason,
            );
        }
        findings.sort_by(|a, b| (&a.path, a.code).cmp(&(&b.path, b.code)));
        let status = if findings.iter().any(|f| f.severity == Severity::Blocked) {
            RuleReviewStatus::BlockedUnverifiedRules
        } else {
            RuleReviewStatus::ReadyForImplementation
        };
        RuleReviewReport {
            scope: "rule-review-only",
            status,
            profile_id: p.profile_id.clone(),
            network_id: p.network_id.clone(),
            channel_id: p.channel_id.clone(),
            rules_version: p.rules_version.clone(),
            reviewed_at: p.reviewed_at.clone(),
            as_of: as_of.clone(),
            sources: p.sources.clone(),
            rules: p.rules.clone(),
            additional_rules: p.additional_rules.clone(),
            unresolved: p.unresolved.clone(),
            findings,
            observed_evidence: None,
            network_acceptance: "not yet verified",
            physical_devices: "not yet verified",
        }
    }
    /// Only the provided byte count is tested. No file/media/HTML inspection or E1 claim.
    /// The entire critical-rule gate must pass before any byte comparison can pass.
    pub fn assess_upload_size(
        &self,
        provided_file_bytes: u64,
        as_of: &ReviewDate,
        confirmation: Option<&ReviewDate>,
    ) -> SizeAssessment {
        let mut rule_review = self.assess_rules(as_of, confirmation);
        let status = if rule_review.status == RuleReviewStatus::BlockedUnverifiedRules {
            SizeStatus::BlockedUnverifiedRules
        } else {
            let size = self
                .pack
                .rules
                .upload_size
                .verified_value()
                .expect("critical gate ensures a verified size");
            if !size.accepts(provided_file_bytes) {
                finding(
                    &mut rule_review.findings,
                    Severity::Error,
                    "E_UPLOAD_SIZE",
                    "/rules/uploadSize",
                    "Provided upload bytes violate the profile comparator",
                );
                SizeStatus::Fail
            } else {
                if size.exceeds_headroom(provided_file_bytes) {
                    finding(
                        &mut rule_review.findings,
                        Severity::Warning,
                        "W_SIZE_HEADROOM",
                        "/rules/uploadSize",
                        "Provided bytes exceed the local 95% headroom target",
                    );
                }
                SizeStatus::Pass
            }
        };
        SizeAssessment {
            scope: "provided-upload-byte-count-only",
            status,
            provided_file_bytes,
            rule_review,
        }
    }
}
#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum SizeStatus {
    Pass,
    Fail,
    BlockedUnverifiedRules,
}
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SizeAssessment {
    pub scope: &'static str,
    pub status: SizeStatus,
    pub provided_file_bytes: u64,
    pub rule_review: RuleReviewReport,
}
