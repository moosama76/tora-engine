use serde_json::json;
use std::{fs, path::Path, process::Command};

fn invoke(args: &[&str]) -> std::process::Output {
    Command::new(env!("CARGO_BIN_EXE_playable"))
        .args(args)
        .output()
        .unwrap()
}

fn native_html(profile_id: &str) -> String {
    let project = json!({
        "schemaVersion": "2.1.0",
        "projectId": "cli-native-test",
        "revisionId": "initial",
        "generationOrigin": "human-authored",
        "creativeBrief": {"goal": "CLI static check", "language": "en"},
        "base": {
            "kind": "native-scene",
            "runtimeId": "tora-native",
            "runtimeVersion": "1.0.0",
            "width": 390,
            "height": 700,
            "startScene": "scene.play",
            "storeUrl": "https://play.google.com/store/apps/details?id=com.playablelab.cli"
        },
        "scenes": [{"id": "scene.play", "label": "Play", "role": "interactive"}],
        "components": [],
        "assets": [],
        "variables": [],
        "gameplay": [],
        "events": [],
        "eventBindings": [],
        "tombstones": []
    });
    let raw = packer::embedded_json(&project).unwrap();
    format!(
        "{}{raw}</script><script>{}</script><script>globalThis.toraRuntime=ToraNative.mountNative(JSON.parse(document.getElementById(\"project\").textContent),document.querySelector(\"canvas\"),{{\"edit\":false,\"network\":\"{profile_id}\"}});</script></body></html>",
        packer::native::PREFIX,
        include_str!("../../packer/trusted/native.js")
    )
}

#[test]
fn static_check_passes_valid_native_applovin_and_unity_artifacts() {
    let dir = std::env::temp_dir().join(format!("tora-cli-check-{}", std::process::id()));
    fs::create_dir_all(&dir).unwrap();
    for profile_id in ["applovin-growth-playable", "unity-ads-ua-playable"] {
        let profile = rule_checker::load_builtin(profile_id).unwrap();
        let file = dir.join("index.html");
        let html = native_html(profile_id);
        fs::write(&file, &html).unwrap();
        let confirmed = profile.reviewed_at().to_string();
        let r = invoke(&[
            "artifact",
            "check",
            file.to_str().unwrap(),
            "--network",
            profile_id,
            "--confirm-reviewed",
            &confirmed,
            "--json",
        ]);
        assert_eq!(r.status.code(), Some(0), "{}", String::from_utf8_lossy(&r.stderr));
        let v: serde_json::Value = serde_json::from_slice(&r.stdout).unwrap();
        assert_eq!(v["technicalStatus"], "PASS");
        assert_eq!(v["status"], "STATIC_PASS");
        assert_eq!(v["fileBytes"].as_u64().unwrap(), html.len() as u64);
    }
    let _ = fs::remove_dir_all(&dir);
}

#[test]
fn bad_artifact_unknown_profile_and_invalid_options_have_distinct_exit_codes() {
    let dir = Path::new(env!("CARGO_MANIFEST_DIR"));
    for (args, code) in [
        (
            vec!["artifact", "check", "Cargo.toml", "--network", "applovin-growth-playable", "--json"],
            5,
        ),
        (
            vec!["artifact", "check", "Cargo.toml", "--network", "unknown", "--json"],
            6,
        ),
        (
            vec![
                "artifact",
                "check",
                "Cargo.toml",
                "--network",
                "applovin-growth-playable",
                "--as-of",
                "2026-10-17",
                "--json",
            ],
            2,
        ),
        (
            vec![
                "artifact",
                "check",
                dir.to_str().unwrap(),
                "--network",
                "applovin-growth-playable",
                "--json",
            ],
            5,
        ),
    ] {
        let r = invoke(&args);
        assert_eq!(r.status.code(), Some(code));
        let v: serde_json::Value = serde_json::from_slice(&r.stdout).unwrap();
        assert!(v["status"] == "ERROR" || v["status"] == "FAIL");
    }
}
