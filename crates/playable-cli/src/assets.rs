use crate::CommandOutput;
use asset_pipeline::{Request, inspect};
use std::path::Path;

pub fn dispatch(arguments: &[String]) -> Result<CommandOutput, String> {
    if arguments.get(1).is_none_or(|arg| arg != "inspect") || arguments.len() < 4 {
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

#[cfg(test)]
mod tests {
    use crate::dispatch;
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
}
