//! Offline Tora Native verification CLI: rule review, static closed-format checks, and media inspection.
mod artifact;
mod assets;
mod rules;

const HELP: &str = "Usage: playable artifact check <index.html> --network <profile> [--confirm-reviewed YYYY-MM-DD] [--json]\n       playable rules status (--network <profile-id> | --file <rule-pack.json>) [--as-of YYYY-MM-DD] [--confirm-reviewed YYYY-MM-DD] [--json]\n       playable assets inspect <directory> <relative-image-path>...\n       playable [--help | --version]\n\nOffline Tora Native rule review, bounded image decoding, and closed-format static checks for Unity Ads (MRAID 3.0) and AppLovin (MRAID 2.0).\nStatic checks never grant human visual approval, physical device sign-off, or official ad-network acceptance.\nMintegral adapter is not implemented; Mintegral remains BLOCKED.\n";

pub struct CommandOutput {
    pub stdout: String,
    pub stderr: String,
    pub exit_code: u8,
}
impl CommandOutput {
    fn success(stdout: String) -> Self {
        Self {
            stdout,
            stderr: String::new(),
            exit_code: 0,
        }
    }
}

pub fn dispatch(arguments: &[String]) -> Result<CommandOutput, String> {
    if arguments.first().is_some_and(|arg| arg == "artifact") {
        return artifact::dispatch(arguments);
    }
    if arguments.first().is_some_and(|arg| arg == "rules") {
        return rules::dispatch_rules(arguments);
    }
    if arguments.first().is_some_and(|arg| arg == "assets") {
        return assets::dispatch(arguments);
    }
    match arguments {
        [] => Ok(CommandOutput::success(HELP.to_owned())),
        [flag] if flag == "--help" || flag == "-h" => Ok(CommandOutput::success(HELP.to_owned())),
        [flag] if flag == "--version" || flag == "-V" => Ok(CommandOutput::success(format!(
            "playable {}\n",
            env!("CARGO_PKG_VERSION")
        ))),
        _ => Err(
            "Unsupported command or arguments. Use `playable --help` for supported artifact, rules, and assets commands.\n"
                .to_owned(),
        ),
    }
}
