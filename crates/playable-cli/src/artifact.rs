use crate::CommandOutput;
use rule_checker::{Packaging, ReviewDate, load_builtin};
use std::{collections::BTreeSet, fs, io::Read, path::Path};

fn failure(code: &str, message: impl ToString, exit_code: u8, json: bool) -> CommandOutput {
    let message = message.to_string();
    CommandOutput {
        stdout: if json {
            serde_json::to_string_pretty(&serde_json::json!({
                "scope": "artifact-static-only",
                "status": "ERROR",
                "code": code,
                "message": message,
                "exitCode": exit_code
            }))
            .unwrap()
                + "\n"
        } else {
            String::new()
        },
        stderr: format!("{code}: {message}\n"),
        exit_code,
    }
}

pub fn dispatch(arguments: &[String]) -> Result<CommandOutput, String> {
    let json = arguments.iter().any(|s| s == "--json");
    match run(arguments, json) {
        Ok(output) => Ok(output),
        Err(e) => {
            let code = e
                .split_ascii_whitespace()
                .next()
                .filter(|s| s.starts_with("E_"))
                .unwrap_or("E_ARTIFACT_ARGUMENT")
                .trim_end_matches(':');
            Ok(failure(code, &e, 2, json))
        }
    }
}

fn run(arguments: &[String], json: bool) -> Result<CommandOutput, String> {
    if arguments.get(1).is_none_or(|s| s != "check") {
        return Err("Usage: playable artifact check <index.html|artifact.zip> --network <profile> [--confirm-reviewed YYYY-MM-DD] [--json]".into());
    }
    let input = arguments
        .get(2)
        .filter(|s| !s.starts_with('-'))
        .ok_or("Missing artifact HTML input")?;
    let mut seen = BTreeSet::new();
    let mut network = None;
    let mut confirmation = None;
    let mut i = 3;
    while let Some(flag) = arguments.get(i) {
        if !seen.insert(flag) {
            return Err(format!("Duplicate option {flag}"));
        }
        if flag == "--json" {
            i += 1;
            continue;
        }
        let value = arguments
            .get(i + 1)
            .filter(|s| !s.starts_with('-'))
            .ok_or("Missing flag value")?;
        match flag.as_str() {
            "--network" => network = Some(value),
            "--confirm-reviewed" => {
                confirmation = Some(value.parse::<ReviewDate>().map_err(|e| e.to_string())?)
            }
            _ => return Err(format!("Unknown option {flag}")),
        }
        i += 2;
    }
    let network = network.ok_or("An exact --network profile is required")?;
    let profile = match load_builtin(network) {
        Ok(p) => p,
        Err(e) => return Ok(failure(e.code, e, 6, json)),
    };
    let today = ReviewDate::today_utc().map_err(|e| e.to_string())?;
    let path = Path::new(input);
    let zip = matches!(
        profile.rules().packaging.verified_value(),
        Some(Packaging::Zip { .. })
    );
    let metadata = match fs::symlink_metadata(path) {
        Ok(m) => m,
        Err(e) => return Ok(failure("E_ARTIFACT_READ", e, 5, json)),
    };
    if !metadata.is_file()
        || metadata.file_type().is_symlink()
        || metadata.len() > packer::MAX_HTML_BYTES as u64
    {
        return Ok(failure(
            "E_ARTIFACT_PACKAGE",
            if zip {
                "Expected one bounded regular ZIP file, not a directory/symlink"
            } else {
                "Expected one bounded regular HTML file, not a directory/ZIP/symlink"
            },
            5,
            json,
        ));
    }
    let mut bytes = Vec::new();
    if let Err(e) = fs::File::open(path).and_then(|f| {
        f.take(packer::MAX_HTML_BYTES as u64 + 1)
            .read_to_end(&mut bytes)
    }) {
        return Ok(failure("E_ARTIFACT_READ", e, 5, json));
    }
    let report = rule_checker::check_artifact(
        &bytes,
        path.file_name().and_then(|s| s.to_str()).unwrap_or(""),
        &profile,
        &today,
        confirmation.as_ref(),
    );
    let exit_code = report.exit_code();
    Ok(CommandOutput {
        stdout: if json {
            serde_json::to_string_pretty(&report).unwrap() + "\n"
        } else {
            format!(
                "{}: {} bytes; technical {}. Devices/networks: not yet verified.\n",
                report.status, report.file_bytes, report.technical_status
            )
        },
        stderr: if exit_code == 0 {
            String::new()
        } else {
            format!("{}: static/rule gate incomplete\n", report.status)
        },
        exit_code,
    })
}
