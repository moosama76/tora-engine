use crate::CommandOutput;
use asset_pipeline::{
    OptimizeOptions, PrepOptions, Request, inspect, optimize_image_bytes, prep_image_bytes,
    read_source,
};
use std::fs;
use std::path::{Component, Path, PathBuf};

fn safe_relative_output(root: &Path, rel: &str) -> Result<PathBuf, String> {
    if rel.is_empty()
        || rel.contains(['\\', ':', '%', '\0'])
        || Path::new(rel)
            .components()
            .any(|c| !matches!(c, Component::Normal(_)))
    {
        return Err(format!("E_ASSET_PATH: {rel}"));
    }
    let root = root
        .canonicalize()
        .map_err(|e| format!("E_ASSET_ROOT: {e}"))?;
    let mut current = root.clone();
    for part in Path::new(rel).components() {
        current.push(part);
        if let Ok(meta) = fs::symlink_metadata(&current)
            && meta.file_type().is_symlink()
        {
            return Err("E_ASSET_PATH: symlinks forbidden".into());
        }
    }
    if !current.starts_with(&root) {
        return Err(format!("E_ASSET_PATH: {rel}"));
    }
    Ok(current)
}

pub fn dispatch(arguments: &[String]) -> Result<CommandOutput, String> {
    match arguments.get(1).map(String::as_str) {
        Some("inspect") => dispatch_inspect(arguments),
        Some("optimize") => dispatch_optimize(arguments),
        Some("prep") => dispatch_prep(arguments),
        _ => Err(
            "Usage: playable assets inspect <directory> <relative-image-path>...\n       playable assets optimize <directory> <input-rel> <output-rel> <options-json>\n       playable assets prep <directory> <input-rel> <output-dir-rel> <options-json>"
                .into(),
        ),
    }
}

fn dispatch_inspect(arguments: &[String]) -> Result<CommandOutput, String> {
    if arguments.len() < 4 {
        return Err("Usage: playable assets inspect <directory> <relative-image-path>...".into());
    }
    let root = Path::new(&arguments[2]);
    let requests: Vec<Request> = arguments[3..]
        .iter()
        .enumerate()
        .map(|(index, rel)| Request {
            id: format!("asset-{index}"),
            path: rel.clone(),
            crop: None,
            size: None,
            allow_deform: false,
            pivot: [0.5, 0.5],
        })
        .collect();
    let info = inspect(root, &requests).map_err(|e| e.to_string())?;
    Ok(CommandOutput::success(format!(
        "{}\n",
        serde_json::to_string_pretty(&info).map_err(|e| e.to_string())?
    )))
}

fn dispatch_optimize(arguments: &[String]) -> Result<CommandOutput, String> {
    if arguments.len() != 6 {
        return Err(
            "Usage: playable assets optimize <directory> <input-rel> <output-rel> <options-json>"
                .into(),
        );
    }
    let root = Path::new(&arguments[2]);
    let options: OptimizeOptions =
        serde_json::from_str(&arguments[5]).map_err(|e| format!("E_ASSET_REQUEST: {e}"))?;
    let bytes = read_source(root, &arguments[3]).map_err(|e| e.to_string())?;
    let output_path = safe_relative_output(root, &arguments[4])?;
    let optimized = optimize_image_bytes(&bytes, &options).map_err(|e| e.to_string())?;
    if let Some(parent) = output_path.parent() {
        fs::create_dir_all(parent).map_err(|e| format!("E_ASSET_WRITE: {e}"))?;
    }
    fs::write(&output_path, &optimized.bytes).map_err(|e| format!("E_ASSET_WRITE: {e}"))?;
    Ok(CommandOutput::success(format!(
        "{}\n",
        serde_json::to_string(&optimized).map_err(|e| e.to_string())?
    )))
}

fn dispatch_prep(arguments: &[String]) -> Result<CommandOutput, String> {
    if arguments.len() != 6 {
        return Err(
            "Usage: playable assets prep <directory> <input-rel> <output-dir-rel> <options-json>"
                .into(),
        );
    }
    let root = Path::new(&arguments[2]);
    let options: PrepOptions =
        serde_json::from_str(&arguments[5]).map_err(|e| format!("E_ASSET_REQUEST: {e}"))?;
    let bytes = read_source(root, &arguments[3]).map_err(|e| e.to_string())?;
    let out_dir = safe_relative_output(root, &arguments[4])?;
    let report = prep_image_bytes(&bytes, &options).map_err(|e| e.to_string())?;
    fs::create_dir_all(&out_dir).map_err(|e| format!("E_ASSET_WRITE: {e}"))?;
    for item in &report.outputs {
        let target = safe_relative_output(&out_dir, &item.file)?;
        fs::write(&target, &item.bytes).map_err(|e| format!("E_ASSET_WRITE: {e}"))?;
    }
    Ok(CommandOutput::success(format!(
        "{}\n",
        serde_json::to_string(&report).map_err(|e| e.to_string())?
    )))
}

#[cfg(test)]
mod tests {
    use crate::dispatch;
    use std::fs;
    use std::path::Path;

    fn args(values: &[&str]) -> Vec<String> {
        values.iter().map(|s| (*s).to_owned()).collect()
    }

    #[test]
    fn inspect_decodes_valid_native_png_fixture() {
        let dir = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../fixtures/native/ding-dang-assets");
        let output = dispatch(&args(&["assets", "inspect", dir.to_str().unwrap(), "cat_0.png"])).unwrap();
        assert_eq!(output.exit_code, 0);
        let info: serde_json::Value = serde_json::from_str(&output.stdout).unwrap();
        assert_eq!(info.as_array().unwrap().len(), 1);
        assert_eq!(info[0]["source_mime"], "image/png");
    }

    #[test]
    fn optimize_and_prep_subcommands_produce_verified_outputs_and_block_traversal() {
        let tmp = std::env::temp_dir().join(format!("playable-cli-assets-{}", std::process::id()));
        let _ = fs::remove_dir_all(&tmp);
        fs::create_dir_all(&tmp).unwrap();
        let fixture =
            Path::new(env!("CARGO_MANIFEST_DIR")).join("../../fixtures/native/ding-dang-assets/cat_0.png");
        fs::copy(&fixture, tmp.join("cat_0.png")).unwrap();

        let opt = dispatch(&args(&[
            "assets",
            "optimize",
            tmp.to_str().unwrap(),
            "cat_0.png",
            "cat_opt.png",
            r#"{"mode":"auto","preserveResolution":false}"#,
        ]))
        .unwrap();
        assert_eq!(opt.exit_code, 0);
        let opt_json: serde_json::Value = serde_json::from_str(&opt.stdout).unwrap();
        assert!(tmp.join("cat_opt.png").is_file());
        assert!(opt_json["width"].as_u64().unwrap() > 0);

        let prep = dispatch(&args(&[
            "assets",
            "prep",
            tmp.to_str().unwrap(),
            "cat_0.png",
            "out",
            r#"{"outputPrefix":"cat","trim":true,"paddingPx":1,"maxSide":64}"#,
        ]))
        .unwrap();
        assert_eq!(prep.exit_code, 0);
        let prep_json: serde_json::Value = serde_json::from_str(&prep.stdout).unwrap();
        assert_eq!(prep_json["outputs"].as_array().unwrap().len(), 1);
        assert!(tmp.join("out/cat.png").is_file());
        assert!(prep_json["outputs"][0]["width"].as_u64().unwrap() <= 64);

        let err = dispatch(&args(&[
            "assets",
            "prep",
            tmp.to_str().unwrap(),
            "cat_0.png",
            "../escape",
            "{}",
        ]))
        .err()
        .unwrap();
        assert!(err.contains("E_ASSET_PATH"));

        let _ = fs::remove_dir_all(&tmp);
    }
}
