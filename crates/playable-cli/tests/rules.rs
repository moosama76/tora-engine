use serde_json::Value;
use std::{path::PathBuf, process::Command};
fn invoke(args: &[&str]) -> std::process::Output {
    Command::new(env!("CARGO_BIN_EXE_playable"))
        .args(args)
        .output()
        .unwrap()
}
#[test]
fn rule_status_requires_confirmation_and_produces_deterministic_json() {
    let review = current_review();
    let args = [
        "rules",
        "status",
        "--network",
        "unity-ads-ua-playable",
        "--as-of",
        &review,
        "--json",
    ];
    let blocked = invoke(&args);
    assert_eq!(blocked.status.code(), Some(6));
    assert!(String::from_utf8_lossy(&blocked.stderr).contains("BLOCKED_UNVERIFIED_RULES"));
    let report: Value = serde_json::from_slice(&blocked.stdout).unwrap();
    assert_eq!(report["status"], "BLOCKED_UNVERIFIED_RULES");
    assert!(
        report["findings"]
            .as_array()
            .unwrap()
            .iter()
            .any(|f| f["code"] == "B_REVIEW_CONFIRMATION_REQUIRED")
    );
    let confirmed = [
        "rules",
        "status",
        "--network",
        "unity-ads-ua-playable",
        "--as-of",
        &review,
        "--confirm-reviewed",
        &review,
        "--json",
    ];
    let first = invoke(&confirmed);
    let second = invoke(&confirmed);
    assert!(first.status.success());
    assert!(first.stderr.is_empty());
    assert_eq!(first.stdout, second.stdout);
    let report: Value = serde_json::from_slice(&first.stdout).unwrap();
    assert_eq!(report["scope"], "rule-review-only");
    assert_eq!(report["status"], "READY_FOR_IMPLEMENTATION");
    assert_eq!(report["networkId"], "unity-ads");
    assert_eq!(report["channelId"], "ua-playable");
    assert!(report["observedEvidence"].is_null());
    assert_eq!(report["networkAcceptance"], "not yet verified");
    assert_eq!(report["physicalDevices"], "not yet verified");
}
#[test]
fn confirmation_does_not_clear_unresolved_channels_unknown_profiles_or_stale_reviews() {
    let review = current_review();
    for profile in [
        "mintegral-appgrowth-single-html",
        "mintegral",
        "unity-exchange",
    ] {
        let output = invoke(&[
            "rules",
            "status",
            "--network",
            profile,
            "--as-of",
            &review,
            "--confirm-reviewed",
            &review,
            "--json",
        ]);
        assert_eq!(output.status.code(), Some(6), "{profile}");
        let report: Value = serde_json::from_slice(&output.stdout).unwrap();
        assert_eq!(report["status"], "BLOCKED_UNVERIFIED_RULES");
    }
    let reviewed: rule_checker::ReviewDate = review.parse().unwrap();
    let year: u32 = review[..4].parse().unwrap();
    let expired = (year..=year + 1)
        .flat_map(|year| {
            (1..=12).flat_map(move |month| {
                (1..=31).map(move |day| format!("{year:04}-{month:02}-{day:02}"))
            })
        })
        .find(|date| {
            date.parse::<rule_checker::ReviewDate>()
                .is_ok_and(|date| date.days_since_epoch() == reviewed.days_since_epoch() + 31)
        })
        .unwrap();
    let old = invoke(&[
        "rules",
        "status",
        "--network",
        "unity-ads-ua-playable",
        "--as-of",
        &expired,
        "--confirm-reviewed",
        &review,
        "--json",
    ]);
    assert_eq!(old.status.code(), Some(6));
    let report: Value = serde_json::from_slice(&old.stdout).unwrap();
    assert!(
        report["findings"]
            .as_array()
            .unwrap()
            .iter()
            .any(|f| f["code"] == "B_RULE_REVIEW_EXPIRED")
    );
}
#[test]
fn file_parser_is_read_only_and_human_output_keeps_sources_and_scope() {
    let review = current_review();
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../../network-rules/unity-ads-ua-playable.json");
    let before = std::fs::read(&path).unwrap();
    let output = invoke(&[
        "rules",
        "status",
        "--file",
        path.to_str().unwrap(),
        "--as-of",
        &review,
        "--confirm-reviewed",
        &review,
    ]);
    assert!(output.status.success());
    let text = String::from_utf8(output.stdout).unwrap();
    assert!(text.contains("READY_FOR_IMPLEMENTATION"));
    assert!(text.contains(&format!(
        "Source specs checked {review}: https://docs.unity.com/"
    )));
    assert!(text.contains("offline rule review only"));
    assert!(text.contains("not yet verified"));
    assert_eq!(std::fs::read(&path).unwrap(), before);
    let invalid = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../../fixtures/rules/invalid-duplicate.json");
    let output = invoke(&[
        "rules",
        "status",
        "--file",
        invalid.to_str().unwrap(),
        "--json",
    ]);
    assert_eq!(output.status.code(), Some(2));
    assert!(output.stdout.is_empty());
    assert!(String::from_utf8_lossy(&output.stderr).contains("E_JSON_INVALID"));
}
#[test]
fn ambiguous_flags_and_invalid_dates_fail_as_input_errors() {
    for tail in [
        vec![],
        vec!["--network"],
        vec![
            "--network",
            "unity-ads-ua-playable",
            "--network",
            "applovin-growth-playable",
        ],
        vec!["--network", "unity-ads-ua-playable", "--file", "pack.json"],
        vec!["--unknown"],
        vec!["--network", "unity-ads-ua-playable", "--json", "--json"],
        vec![
            "--network",
            "unity-ads-ua-playable",
            "--as-of",
            "2026-02-30",
        ],
        vec![
            "--network",
            "unity-ads-ua-playable",
            "--confirm-reviewed",
            "yesterday",
        ],
    ] {
        let mut args = vec!["rules", "status"];
        args.extend(tail);
        let output = invoke(&args);
        assert_eq!(output.status.code(), Some(2), "{args:?}");
        assert!(output.stdout.is_empty());
    }
}

fn current_review() -> String {
    let profile = rule_checker::load_builtin("unity-ads-ua-playable").unwrap();
    profile.reviewed_at().to_string()
}
