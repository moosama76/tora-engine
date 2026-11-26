use serde_json::Value;
use std::process::Command;

fn invoke(args: &[&str]) -> std::process::Output {
    Command::new(env!("CARGO_BIN_EXE_playable"))
        .args(args)
        .output()
        .unwrap()
}

#[test]
fn mintegral_status_remains_blocked_and_aliases_are_rejected() {
    let profile = rule_checker::load_builtin("mintegral-appgrowth-single-html").unwrap();
    let date = profile.reviewed_at().to_string();
    let status = invoke(&[
        "rules",
        "status",
        "--network",
        profile.profile_id(),
        "--as-of",
        &date,
        "--confirm-reviewed",
        &date,
        "--json",
    ]);
    assert_eq!(status.status.code(), Some(6));
    let review: Value = serde_json::from_slice(&status.stdout).unwrap();
    assert_eq!(review["status"], "BLOCKED_UNVERIFIED_RULES");
    assert!(
        review["findings"]
            .as_array()
            .unwrap()
            .iter()
            .any(|f| f["code"] == "B_RULE_UNSUPPORTED" && f["path"] == "/additionalRules/0")
    );
    let result = invoke(&["rules", "status", "--network", "mintegral", "--json"]);
    assert_eq!(result.status.code(), Some(6));
    let report: Value = serde_json::from_slice(&result.stdout).unwrap();
    assert_eq!(report["findings"][0]["code"], "E_RULE_PROFILE_UNKNOWN");
}
