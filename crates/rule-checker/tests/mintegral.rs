use rule_checker::{RuleReviewStatus, SizeStatus, check_artifact, load_builtin};

#[test]
fn current_mintegral_review_cannot_enable_an_unimplemented_vendor_contract() {
    let profile = load_builtin("mintegral-appgrowth-single-html").unwrap();
    let date = profile.reviewed_at();
    let review = profile.assess_rules(date, Some(date));
    assert_eq!(review.status, RuleReviewStatus::BlockedUnverifiedRules);
    assert!(!review.findings.iter().any(|f| {
        f.code.starts_with("B_RULE_REVIEW_") || f.code.starts_with("B_REVIEW_CONFIRMATION_")
    }));
    for path in [
        "/rules/packaging",
        "/rules/mraid",
        "/rules/viewability",
        "/rules/preview",
    ] {
        assert!(
            review
                .findings
                .iter()
                .any(|f| { f.code == "B_RULE_UNVERIFIED" && f.path == path }),
            "Missing selected-workflow blocker: {path}"
        );
    }
    assert!(
        review
            .findings
            .iter()
            .any(|f| { f.code == "B_RULE_UNSUPPORTED" && f.path == "/additionalRules/0" })
    );
    assert_eq!(
        profile.assess_upload_size(1, date, Some(date)).status,
        SizeStatus::BlockedUnverifiedRules
    );
    assert!(review.observed_evidence.is_none());
    assert_eq!(review.network_acceptance, "not yet verified");
}

#[test]
fn native_unity_artifact_cannot_be_relabelled_as_mintegral() {
    let profile = load_builtin("mintegral-appgrowth-single-html").unwrap();
    let html = format!(
        "{}{{}}</script><script>{}</script>",
        packer::native::PREFIX,
        include_str!("../../packer/trusted/native.js")
    );
    let report = check_artifact(
        html.as_bytes(),
        "index.html",
        &profile,
        profile.reviewed_at(),
        Some(profile.reviewed_at()),
    );
    assert_eq!(report.exit_code(), 5);
    assert_eq!(report.technical_status, "FAIL");
    assert!(report.facts.is_none());
    assert!(report.findings.iter().any(|f| f.code == "E_ADAPTER_PROFILE"));
}
