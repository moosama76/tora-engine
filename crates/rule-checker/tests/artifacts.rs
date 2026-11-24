use rule_checker::{check_artifact, load_builtin, parse_rule_pack};
use serde_json::{Value, json};

const NATIVE_SCRIPT: &str = include_str!("../../packer/trusted/native.js");
const NATIVE_SCRIPT_3D: &str = include_str!("../../packer/trusted/native-3d.js");

fn native_project() -> Value {
    json!({
        "schemaVersion": "2.1.0",
        "projectId": "native-rule-test",
        "revisionId": "initial",
        "generationOrigin": "human-authored",
        "creativeBrief": {"goal": "Verify native artifact rules", "language": "en"},
        "base": {
            "kind": "native-scene",
            "runtimeId": "tora-native",
            "runtimeVersion": "1.0.0",
            "width": 390,
            "height": 700,
            "startScene": "scene.play",
            "storeUrl": "https://play.google.com/store/apps/details?id=com.playablelab.game"
        },
        "scenes": [{"id": "scene.play", "label": "Play", "role": "interactive"}],
        "components": [],
        "assets": [],
        "variables": [],
        "gameplay": [],
        "events": [],
        "eventBindings": [],
        "tombstones": []
    })
}

fn native_html(project: &Value, profile_id: &str, script: &str) -> String {
    let raw = packer::embedded_json(project).unwrap();
    format!(
        "{}{raw}</script><script>{script}</script><script>globalThis.toraRuntime=ToraNative.mountNative(JSON.parse(document.getElementById(\"project\").textContent),document.querySelector(\"canvas\"),{{\"edit\":false,\"network\":\"{profile_id}\"}});</script></body></html>",
        packer::native::PREFIX
    )
}

#[test]
fn native_applovin_and_unity_2d_and_3d_pass_current_verified_rules() {
    for profile_id in ["applovin-growth-playable", "unity-ads-ua-playable"] {
        let p = load_builtin(profile_id).unwrap();
        for (script, expected_renderer) in [
            (NATIVE_SCRIPT, "tora-native-canvas2d"),
            (NATIVE_SCRIPT_3D, "tora-native-webgl2-3d"),
        ] {
            let html = native_html(&native_project(), profile_id, script);
            let r = check_artifact(
                html.as_bytes(),
                "index.html",
                &p,
                p.reviewed_at(),
                Some(p.reviewed_at()),
            );
            assert_eq!(r.technical_status, "PASS", "{profile_id}: {:?}", r.findings);
            assert_eq!(r.status, "STATIC_PASS");
            assert_eq!(r.exit_code(), 0);
            assert!(r.rule_review.findings.is_empty());
            let facts = r.facts.unwrap();
            assert_eq!(facts.profile_id, profile_id);
            assert_eq!(facts.renderer.as_deref(), Some(expected_renderer));
        }
    }
}

#[test]
fn native_mutations_and_injected_scripts_fail_closed() {
    let p = load_builtin("applovin-growth-playable").unwrap();
    let html = native_html(&native_project(), "applovin-growth-playable", NATIVE_SCRIPT);
    for (candidate, code) in [
        (
            html.replace("<head>", "<head><script src=\"mraid.js\"></script>"),
            "E_ARTIFACT_TRUSTED_STRUCTURE",
        ),
        (
            html.replace("</body>", "<script>fetch('https://bad.invalid')</script></body>"),
            "E_ARTIFACT_TRUSTED_STRUCTURE",
        ),
        (
            html.replacen("applovin-growth-playable", "unity-ads-ua-playable", 1),
            "E_ARTIFACT_TRUSTED_STRUCTURE",
        ),
    ] {
        let r = check_artifact(
            candidate.as_bytes(),
            "index.html",
            &p,
            p.reviewed_at(),
            Some(p.reviewed_at()),
        );
        assert_eq!(r.technical_status, "FAIL");
        assert!(r.findings.iter().any(|f| f.code == code), "{:?}", r.findings);
        assert_eq!(r.exit_code(), 5);
    }
    let mut bad_store = native_project();
    bad_store["base"]["storeUrl"] = "https://play.google.com/store/apps/details?id=com.example.bad".into();
    let r = check_artifact(
        native_html(&bad_store, "applovin-growth-playable", NATIVE_SCRIPT).as_bytes(),
        "index.html",
        &p,
        p.reviewed_at(),
        Some(p.reviewed_at()),
    );
    assert_eq!(r.technical_status, "FAIL");
    assert!(r.findings.iter().any(|f| f.code == "E_ARTIFACT_PLACEHOLDER"));
}

#[test]
fn exact_size_filename_profile_and_host_exception_rules_are_enforced() {
    let p = load_builtin("applovin-growth-playable").unwrap();
    for len in [5_000_000, 5_000_001] {
        let bytes = vec![b' '; len];
        let r = check_artifact(&bytes, "index.html", &p, p.reviewed_at(), Some(p.reviewed_at()));
        assert_eq!(r.findings.iter().any(|f| f.code == "E_UPLOAD_SIZE"), len > 5_000_000);
    }
    let html = native_html(&native_project(), "applovin-growth-playable", NATIVE_SCRIPT);
    let r = check_artifact(html.as_bytes(), "wrong.html", &p, p.reviewed_at(), Some(p.reviewed_at()));
    assert!(r.findings.iter().any(|f| f.code == "E_ARTIFACT_ENTRY"));

    let unity = load_builtin("unity-ads-ua-playable").unwrap();
    let r = check_artifact(
        html.as_bytes(),
        "index.html",
        &unity,
        unity.reviewed_at(),
        Some(unity.reviewed_at()),
    );
    assert!(r.findings.iter().any(|f| f.code == "E_ARTIFACT_TRUSTED_STRUCTURE"));

    let mut v = p.as_value();
    let script = json!({"src":"mraid.js","placement":"head-before-runtime","hostProvided":true});
    v["rules"]["inline"]["value"]["requiredHostScripts"] = json!([script]);
    v["rules"]["inline"]["value"]["hostExceptions"] =
        v["rules"]["inline"]["value"]["requiredHostScripts"].clone();
    let changed = parse_rule_pack(&v.to_string()).unwrap();
    let r = check_artifact(
        html.as_bytes(),
        "index.html",
        &changed,
        changed.reviewed_at(),
        Some(changed.reviewed_at()),
    );
    assert!(r.findings.iter().any(|f| f.code == "E_HOST_SCRIPT_PROFILE_MISMATCH"));
}

#[test]
fn stale_missing_or_false_confirmation_never_yields_a_pass() {
    let html = native_html(&native_project(), "applovin-growth-playable", NATIVE_SCRIPT);
    let p = load_builtin("applovin-growth-playable").unwrap();
    let future = "2027-01-01".parse().unwrap();
    let wrong = "2026-10-16".parse().unwrap();
    for (date, confirmation) in [
        (p.reviewed_at(), None),
        (&future, Some(p.reviewed_at())),
        (p.reviewed_at(), Some(&wrong)),
    ] {
        let r = check_artifact(html.as_bytes(), "index.html", &p, date, confirmation);
        assert_eq!(r.technical_status, "PASS");
        assert_eq!(r.status, "BLOCKED_UNVERIFIED_RULES");
        assert_eq!(r.exit_code(), 6);
    }
}
