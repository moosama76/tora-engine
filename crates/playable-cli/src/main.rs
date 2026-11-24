use std::process::ExitCode;

fn main() -> ExitCode {
    let arguments: Vec<String> = std::env::args().skip(1).collect();
    match playable_cli::dispatch(&arguments) {
        Ok(output) => {
            print!("{}", output.stdout);
            eprint!("{}", output.stderr);
            ExitCode::from(output.exit_code)
        }
        Err(error) => {
            eprint!("{error}");
            ExitCode::from(2)
        }
    }
}
