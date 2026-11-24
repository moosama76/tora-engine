use rule_checker::{
    HostScript, ReviewDate, RuleReviewStatus, ScriptPlacement, SizeStatus, load_builtin,
    parse_rule_pack,
};
use serde_json::{Value, json};
use std::{fs, path::PathBuf};
fn fixture(name: &str) -> String {
    fs::read_to_string(
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join("../../fixtures/rules")
            .join(name),
    )
    .unwrap()
}
fn ua() -> Value {
    serde_json::from_str(&fixture("valid-reviewed-ua.json")).unwrap()
}
fn parse(value: &Value) -> rule_checker::Profile {
    parse_rule_pack(&value.to_string()).unwrap()
}
fn date(s: &str) -> ReviewDate {
    s.parse().unwrap()
}
#[test]
fn positive_and_negative_rule_pack_fixtures() {
    let cases: Vec<Value> = serde_json::from_str(&fixture("manifest.json")).unwrap();
    assert!(cases.len() >= 40);
    for case in cases {
        let name = case["file"].as_str().unwrap();
        let result = parse_rule_pack(&fixture(name));
        if case["valid"] == true {
            let profile = result.unwrap_or_else(|e| panic!("{name}: {e}"));
            assert_eq!(
                parse(&profile.as_value()).as_value(),
                profile.as_value(),
                "{name}"
            );
        } else {
            let error = result.expect_err(name);
            assert_eq!(
                error.code,
                case["code"].as_str().unwrap(),
                "{name}: {error}"
            );
        }
    }
}
#[test]
fn every_unknown_critical_rule_blocks_even_when_size_is_small() {
    let baseline = ua();
    let as_of = date("2026-10-17");
    for key in baseline["rules"].as_object().unwrap().keys() {
        let mut value = baseline.clone();
        value["rules"][key] = json!({"status":"unverified","sources":["specs"],"reason":"Required rule not yet confirmed","candidate":baseline["rules"][key]["value"]});
        let profile = parse(&value);
        let result = profile.assess_upload_size(1, &as_of, Some(&as_of));
        assert_eq!(result.status, SizeStatus::BlockedUnverifiedRules, "{key}");
        assert!(
            result
                .rule_review
                .findings
                .iter()
                .any(|f| f.path == format!("/rules/{key}") && f.code == "B_RULE_UNVERIFIED")
        );
    }
}
#[test]
fn unsupported_critical_extensions_cannot_assert_their_own_pass() {
    let as_of = date("2026-10-17");
    let mut value = ua();
    for review in [
        json!({"status":"unverified","reason":"Future rule","sources":[]}),
        json!({"status":"verified","value":{"pass":true},"basis":"public-documentation","notes":"Caller asserts reviewed","sources":["specs"]}),
    ] {
        value["additionalRules"] =
            json!([{"id":"new-critical-rule","critical":true,"review":review}]);
        let report = parse(&value).assess_upload_size(1, &as_of, Some(&as_of));
        assert_eq!(report.status, SizeStatus::BlockedUnverifiedRules);
        assert!(
            report
                .rule_review
                .findings
                .iter()
                .any(|f| f.code == "B_RULE_UNSUPPORTED")
        );
    }
    value["additionalRules"][0]["critical"] = json!(false);
    let result = parse(&value).assess_rules(&as_of, Some(&as_of));
    assert_eq!(result.status, RuleReviewStatus::ReadyForImplementation);
    assert!(
        result
            .findings
            .iter()
            .any(|f| f.code == "W_RULE_UNEVALUATED")
    );
}
#[test]
fn size_comparators_preserve_exact_boundary_and_overflow_safety() {
    let as_of = date("2026-10-17");
    for (file, at_limit) in [
        ("valid-reviewed-ua.json", SizeStatus::Fail),
        ("valid-inclusive-size.json", SizeStatus::Pass),
    ] {
        let profile = parse_rule_pack(&fixture(file)).unwrap();
        assert_eq!(
            profile
                .assess_upload_size(4_999_999, &as_of, Some(&as_of))
                .status,
            SizeStatus::Pass
        );
        assert_eq!(
            profile
                .assess_upload_size(5_000_000, &as_of, Some(&as_of))
                .status,
            at_limit
        );
        assert_eq!(
            profile
                .assess_upload_size(5_000_001, &as_of, Some(&as_of))
                .status,
            SizeStatus::Fail
        );
        assert_eq!(
            profile
                .assess_upload_size(u64::MAX, &as_of, Some(&as_of))
                .status,
            SizeStatus::Fail
        );
        let exact_headroom = profile.assess_upload_size(4_750_000, &as_of, Some(&as_of));
        assert!(
            !exact_headroom
                .rule_review
                .findings
                .iter()
                .any(|f| f.code == "W_SIZE_HEADROOM")
        );
        let warning = profile.assess_upload_size(4_750_001, &as_of, Some(&as_of));
        assert_eq!(warning.status, SizeStatus::Pass);
        assert!(
            warning
                .rule_review
                .findings
                .iter()
                .any(|f| f.code == "W_SIZE_HEADROOM")
        );
    }
}
#[test]
fn freshness_confirmation_and_sources_cannot_be_bypassed_by_small_size() {
    let profile = parse(&ua());
    let reviewed = date("2026-10-17");
    for (as_of, confirmation, code) in [
        (date("2026-10-17"), None, "B_REVIEW_CONFIRMATION_REQUIRED"),
        (
            date("2026-10-17"),
            Some(date("2026-10-16")),
            "B_REVIEW_CONFIRMATION_MISMATCH",
        ),
        (
            date("2026-10-16"),
            Some(reviewed.clone()),
            "B_RULE_REVIEW_FUTURE",
        ),
        (
            date("2026-11-17"),
            Some(reviewed.clone()),
            "B_RULE_REVIEW_EXPIRED",
        ),
    ] {
        let report = profile.assess_upload_size(1, &as_of, confirmation.as_ref());
        assert_eq!(report.status, SizeStatus::BlockedUnverifiedRules);
        assert!(report.rule_review.findings.iter().any(|f| f.code == code));
    }
    assert_eq!(
        profile
            .assess_rules(&date("2026-11-16"), Some(&reviewed))
            .status,
        RuleReviewStatus::ReadyForImplementation
    );
    let mut old_source = ua();
    old_source["sources"][0]["checkedAt"] = json!("2026-09-01");
    assert_eq!(
        parse(&old_source)
            .assess_rules(&reviewed, Some(&reviewed))
            .status,
        RuleReviewStatus::BlockedUnverifiedRules
    );
    let mut unresolved = ua();
    unresolved["unresolved"] = json!(["Confirm channel"]);
    assert_eq!(
        parse(&unresolved)
            .assess_upload_size(1, &reviewed, Some(&reviewed))
            .status,
        SizeStatus::BlockedUnverifiedRules
    );
}
#[test]
fn host_exception_matches_only_declared_host_script_and_context() {
    let profile = parse_rule_pack(&fixture("valid-exact-host-exception.json")).unwrap();
    let inline = profile.rules().inline.verified_value().unwrap();
    let exact = HostScript {
        src: "mraid.js".into(),
        placement: ScriptPlacement::HeadBeforeRuntime,
        host_provided: true,
    };
    assert!(inline.permits_host_script(&exact));
    for src in [
        "https://host.test/mraid.js",
        "mraid.js?foo",
        "./mraid.js",
        "../mraid.js",
        "another.js",
        "*",
    ] {
        let other = HostScript {
            src: src.into(),
            ..exact.clone()
        };
        assert!(!inline.permits_host_script(&other));
    }
    assert!(!inline.permits_host_script(&HostScript {
        host_provided: false,
        ..exact
    }));
    let ua_profile = load_builtin("unity-ads-ua-playable").unwrap();
    assert!(
        ua_profile
            .rules()
            .inline
            .verified_value()
            .unwrap()
            .host_exceptions
            .is_empty()
    );
}
#[test]
fn builtin_channel_reviews_preserve_uncertainty_and_do_not_award_artifact_evidence() {
    for (id, status) in [
        (
            "applovin-growth-playable",
            RuleReviewStatus::ReadyForImplementation,
        ),
        (
            "unity-ads-ua-playable",
            RuleReviewStatus::ReadyForImplementation,
        ),
        (
            "mintegral-appgrowth-single-html",
            RuleReviewStatus::BlockedUnverifiedRules,
        ),
    ] {
        let profile = load_builtin(id).unwrap();
        let as_of = profile.reviewed_at().clone();
        let review = profile.assess_rules(&as_of, Some(profile.reviewed_at()));
        assert_eq!(review.status, status);
        assert!(review.observed_evidence.is_none());
        assert_eq!(review.network_acceptance, "not yet verified");
        assert_eq!(review.physical_devices, "not yet verified");
        assert_eq!(
            serde_json::to_string(&review).unwrap(),
            serde_json::to_string(&profile.assess_rules(&as_of, Some(profile.reviewed_at())))
                .unwrap()
        );
        assert_eq!(
            profile.assess_rules(&as_of, None).status,
            RuleReviewStatus::BlockedUnverifiedRules
        );
    }
    assert_eq!(
        load_builtin("mintegral").unwrap_err().code,
        "E_RULE_PROFILE_UNKNOWN"
    );
    assert_eq!(
        load_builtin("mintegral-appgrowth-playable")
            .unwrap_err()
            .code,
        "E_RULE_PROFILE_UNKNOWN"
    );
}
#[test]
fn dates_are_real_gregorian_days_and_json_is_bounded() {
    assert_eq!(date("1970-01-01").days_since_epoch(), 0);
    assert_eq!(
        date("2000-03-01").days_since_epoch() - date("2000-02-28").days_since_epoch(),
        2
    );
    assert_eq!(
        date("2100-03-01").days_since_epoch() - date("2100-02-28").days_since_epoch(),
        1
    );
    for invalid in [
        "2100-02-29",
        "2026-2-01",
        "1969-12-31",
        "2026-01-00",
        "２０２６-01-01",
    ] {
        assert!(invalid.parse::<ReviewDate>().is_err());
    }
    assert!(ReviewDate::today_utc().is_ok());
    assert_eq!(
        parse_rule_pack(&" ".repeat(1_048_577)).unwrap_err().code,
        "E_JSON_LIMIT"
    );
    let deep = "[".repeat(65) + "0" + &"]".repeat(65);
    assert_eq!(parse_rule_pack(&deep).unwrap_err().code, "E_JSON_LIMIT");
}
#[test]
fn companions_and_extension_shapes_are_checked_even_in_unverified_candidates() {
    let mut base = load_builtin("mintegral-appgrowth-single-html")
        .unwrap()
        .as_value();
    // This test targets unverified candidate parsing, independent of later source reviews.
    let size = base["rules"]["uploadSize"]["value"].clone();
    base["rules"]["uploadSize"] = json!({
        "status":"unverified", "reason":"Candidate-shape regression fixture",
        "sources":["assets"], "candidate":size
    });
    for (pointer, replacement) in [
        (
            "/rules/companionAssets/value/0/dimensions/0/width",
            json!(0),
        ),
        ("/rules/companionAssets/value/0/formats", json!([])),
        ("/rules/companionAssets/value/1/id", json!("app-icon")),
        ("/rules/uploadSize/candidate/limitBytes", json!(-1)),
    ] {
        let mut value = base.clone();
        *value.pointer_mut(pointer).unwrap() = replacement;
        assert!(parse_rule_pack(&value.to_string()).is_err(), "{pointer}");
    }
}
#[test]
fn visibility_events_are_explicit_and_not_borrowed_across_mraid_versions() {
    let unity = load_builtin("unity-ads-ua-playable").unwrap();
    let visibility = unity.rules().viewability.verified_value().unwrap();
    assert!(visibility.allow_initial_state_query);
    assert_eq!(
        visibility.required_events,
        vec![rule_checker::HostVisibilityEvent::ViewableChange]
    );
    let mut value = ua();
    value["rules"]["mraid"]["value"]["version"] = json!("2.0");
    value["rules"]["viewability"]["value"]["requiredEvents"] = json!(["exposureChange"]);
    assert!(parse_rule_pack(&value.to_string()).is_err());
    value["rules"]["mraid"]["value"]["version"] = json!("3.0");
    assert!(parse_rule_pack(&value.to_string()).is_ok());
    value["rules"]["viewability"]["value"]["requiredEvents"] = json!([]);
    assert!(parse_rule_pack(&value.to_string()).is_err());
}
