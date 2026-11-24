//! Reuse the bounded production image decoder for native authoring uploads.
use asset_pipeline::{Request, inspect};
fn main() {
    let args: Vec<_> = std::env::args().collect();
    if args.len() != 3 {
        std::process::exit(2);
    }
    let request = Request {
        id: "source".into(),
        path: args[2].clone(),
        crop: None,
        size: None,
        allow_deform: false,
        pivot: [0.5, 0.5],
    };
    match inspect(std::path::Path::new(&args[1]), &[request]) {
        Ok(result) => println!("{}", serde_json::to_string(&result).unwrap()),
        Err(_) => {
            eprintln!("E_NATIVE_ASSET_DECODE");
            std::process::exit(1);
        }
    }
}
