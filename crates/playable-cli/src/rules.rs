use crate::CommandOutput;
use rule_checker::{ReviewDate, RuleReviewStatus, load_builtin, parse_rule_pack};
use std::{collections::BTreeSet, fs, io::Read};
const USAGE: &str = "Usage: playable rules status (--network <profile-id> | --file <rule-pack.json>) [--as-of YYYY-MM-DD] [--confirm-reviewed YYYY-MM-DD] [--json]\n";
fn date(value: &str) -> Result<ReviewDate, String> {
    value.parse().map_err(|e| format!("E_RULE_DATE: {e}\n"))
}
pub(crate) fn dispatch_rules(arguments: &[String]) -> Result<CommandOutput, String> {
    if arguments.get(1).is_none_or(|arg| arg != "status") {
        return Err(USAGE.into());
    }
    let mut seen = BTreeSet::new();
    let mut network = None;
    let mut file = None;
    let mut as_of = None;
    let mut confirmation = None;
    let mut json = false;
    let mut index = 2;
    while let Some(flag) = arguments.get(index) {
        if !seen.insert(flag.as_str()) {
            return Err(format!("Duplicate option: {flag}\n{USAGE}"));
        }
        if flag == "--json" {
            json = true;
            index += 1;
            continue;
        }
        if !["--network", "--file", "--as-of", "--confirm-reviewed"].contains(&flag.as_str()) {
            return Err(format!("Unknown option: {flag}\n{USAGE}"));
        }
        let value = arguments
            .get(index + 1)
            .filter(|value| !value.starts_with("--"))
            .ok_or_else(|| USAGE.to_owned())?;
        match flag.as_str() {
            "--network" => network = Some(value),
            "--file" => file = Some(value),
            "--as-of" => as_of = Some(date(value)?),
            "--confirm-reviewed" => confirmation = Some(date(value)?),
            _ => unreachable!(),
        }
        index += 2;
    }
    if network.is_some() == file.is_some() {
        return Err(USAGE.into());
    }
    let as_of = match as_of {
        Some(date) => date,
        None => ReviewDate::today_utc().map_err(|e| format!("E_RULE_CLOCK: {e}\n"))?,
    };
    let profile = if let Some(id) = network {
        match load_builtin(id) {
            Ok(profile) => profile,
            Err(error) if error.code == "E_RULE_PROFILE_UNKNOWN" => {
                let stdout = if json {
                    serde_json::to_string_pretty(&serde_json::json!({
                    "scope":"rule-review-only", "status":"BLOCKED_UNVERIFIED_RULES", "profileId":id, "asOf":as_of,
                    "findings":[{"code":error.code,"severity":"BLOCKED","path":error.path,"message":error.message}],
                    "observedEvidence":null,"networkAcceptance":"not yet verified","physicalDevices":"not yet verified"
                })).unwrap() + "\n"
                } else {
                    format!("BLOCKED_UNVERIFIED_RULES: {error}\n")
                };
                return Ok(CommandOutput {
                    stdout,
                    stderr: "BLOCKED_UNVERIFIED_RULES: no known channel rule pack.\n".into(),
                    exit_code: 6,
                });
            }
            Err(error) => return Err(format!("{error}\n")),
        }
    } else {
        let path = file.unwrap();
        let mut text = String::new();
        fs::File::open(path)
            .and_then(|f| f.take(1_048_577).read_to_string(&mut text))
            .map_err(|e| format!("E_RULE_READ {path}: {e}\n"))?;
        parse_rule_pack(&text).map_err(|e| format!("{e}\n"))?
    };
    let report = profile.assess_rules(&as_of, confirmation.as_ref());
    let blocked = report.status == RuleReviewStatus::BlockedUnverifiedRules;
    let stdout = if json {
        serde_json::to_string_pretty(&report).map_err(|e| e.to_string())? + "\n"
    } else {
        let status = if blocked {
            "BLOCKED_UNVERIFIED_RULES"
        } else {
            "READY_FOR_IMPLEMENTATION"
        };
        let mut text = format!(
            "{status}: {} ({}), reviewed {}, as of {}\n",
            report.profile_id, report.rules_version, report.reviewed_at, report.as_of
        );
        for finding in &report.findings {
            text.push_str(&format!(
                "{} {}: {}\n",
                finding.code, finding.path, finding.message
            ));
        }
        for source in &report.sources {
            text.push_str(&format!(
                "Source {} checked {}: {}\n",
                source.id, source.checked_at, source.url
            ));
        }
        text.push_str("Scope: offline rule review only. Artifact, network acceptance and physical devices: not yet verified.\n");
        text
    };
    Ok(CommandOutput {
        stdout,
        stderr: if blocked {
            "BLOCKED_UNVERIFIED_RULES: critical rules or review confirmation are missing, unresolved or expired.\n".into()
        } else {
            String::new()
        },
        exit_code: if blocked { 6 } else { 0 },
    })
}
