use asset_pipeline::{OptimizeOptions, optimize_image_bytes, read_source};
use std::path::Path;

fn main() {
    let args: Vec<_> = std::env::args().collect();
    if args.len() != 5 {
        std::process::exit(2);
    }
    let result = (|| {
        let options: OptimizeOptions = serde_json::from_str(&args[4])?;
        let bytes = read_source(Path::new(&args[1]), &args[2])?;
        let optimized = optimize_image_bytes(&bytes, &options)?;
        std::fs::write(Path::new(&args[1]).join(&args[3]), &optimized.bytes).map_err(|error| {
            asset_pipeline::AssetError {
                code: "E_ASSET_WRITE",
                detail: error.to_string(),
            }
        })?;
        Ok::<_, Box<dyn std::error::Error>>(optimized)
    })();
    match result {
        Ok(result) => println!("{}", serde_json::to_string(&result).unwrap()),
        Err(error) => {
            eprintln!("{error}");
            std::process::exit(1);
        }
    }
}
