//! Offline Tora Native Creative Project v2.1 schema tooling & strict bounded JSON parser.
#![forbid(unsafe_code)]
use serde::de::{self, MapAccess, SeqAccess, Visitor};
use serde::{Deserialize, Deserializer};
use serde_json::{Map, Value};
use sha2::{Digest, Sha256};
use std::{fmt, sync::OnceLock};
#[path = "generated-v21.rs"]
pub mod generated_v21;
pub const NATIVE_SCHEMA_JSON: &str =
    include_str!("../../../packages/creative-project/project-v21.schema.json");
#[derive(Debug, Clone)]
pub struct Error {
    pub code: &'static str,
    pub message: String,
}
impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.code, self.message)
    }
}
impl std::error::Error for Error {}
fn fail(code: &'static str, message: impl Into<String>) -> Error {
    Error {
        code,
        message: message.into(),
    }
}
// A custom value visitor rejects duplicates before serde_json can discard them.
struct StrictValue(Value);
impl<'de> Deserialize<'de> for StrictValue {
    fn deserialize<D: Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        struct StrictVisitor;
        impl<'de> Visitor<'de> for StrictVisitor {
            type Value = StrictValue;
            fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
                f.write_str("finite JSON without duplicate keys")
            }
            fn visit_bool<E: de::Error>(self, v: bool) -> Result<StrictValue, E> {
                Ok(StrictValue(v.into()))
            }
            fn visit_i64<E: de::Error>(self, v: i64) -> Result<StrictValue, E> {
                if v.unsigned_abs() > 9_007_199_254_740_991 {
                    return Err(E::custom("E_V2_VALUE"));
                }

                Ok(StrictValue(v.into()))
            }
            fn visit_u64<E: de::Error>(self, v: u64) -> Result<StrictValue, E> {
                if v > 9_007_199_254_740_991 {
                    return Err(E::custom("E_V2_VALUE"));
                }
                Ok(StrictValue(v.into()))
            }
            fn visit_f64<E: de::Error>(self, v: f64) -> Result<StrictValue, E> {
                // JSON Schema integers are mathematical integers, including 1.0 and 1e0.
                if !v.is_finite() || v.abs() > 9_007_199_254_740_991.0 {
                    return Err(E::custom("E_V2_VALUE"));
                }
                let value = if v.fract() == 0.0 && v.abs() <= 9_007_199_254_740_991.0 {
                    Value::from(v as i64)
                } else {
                    Value::Number(
                        serde_json::Number::from_f64(v)
                            .ok_or_else(|| E::custom("Non-finite number"))?,
                    )
                };
                Ok(StrictValue(value))
            }
            fn visit_str<E: de::Error>(self, v: &str) -> Result<StrictValue, E> {
                Ok(StrictValue(v.into()))
            }
            fn visit_string<E: de::Error>(self, v: String) -> Result<StrictValue, E> {
                Ok(StrictValue(v.into()))
            }
            fn visit_unit<E: de::Error>(self) -> Result<StrictValue, E> {
                Err(E::custom("E_V2_VALUE"))
            }
            fn visit_seq<A: SeqAccess<'de>>(self, mut seq: A) -> Result<StrictValue, A::Error> {
                let mut values = Vec::new();
                while let Some(StrictValue(value)) = seq.next_element()? {
                    values.push(value);
                }
                Ok(StrictValue(values.into()))
            }
            fn visit_map<A: MapAccess<'de>>(self, mut map: A) -> Result<StrictValue, A::Error> {
                let mut values = Map::new();
                while let Some(key) = map.next_key::<String>()? {
                    if values.contains_key(&key) {
                        return Err(de::Error::custom(format!("E_V2_DUPLICATE_KEY: {key}")));
                    }
                    let StrictValue(value) = map.next_value()?;
                    values.insert(key, value);
                }
                Ok(StrictValue(values.into()))
            }
        }
        deserializer.deserialize_any(StrictVisitor)
    }
}

fn limits(value: &Value, depth: usize, nodes: &mut usize, max_nodes: usize) -> Result<(), Error> {
    *nodes += 1;
    if depth > 64 || *nodes > max_nodes {
        return Err(fail("E_V2_LIMIT", "Tree budget"));
    }
    match value {
        Value::Array(a) => {
            for v in a {
                limits(v, depth + 1, nodes, max_nodes)?;
            }
        }
        Value::Object(m) => {
            for v in m.values() {
                limits(v, depth + 1, nodes, max_nodes)?;
            }
        }
        _ => (),
    }
    Ok(())
}
// Strict JSON visitor allowing JSON null (used by rule packs), rejecting duplicate keys & non-finite numbers.
struct NullableStrictValue(Value);
impl<'de> Deserialize<'de> for NullableStrictValue {
    fn deserialize<D: Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        struct StrictVisitor;
        impl<'de> Visitor<'de> for StrictVisitor {
            type Value = NullableStrictValue;
            fn expecting(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
                f.write_str("finite JSON without duplicate keys")
            }
            fn visit_bool<E: de::Error>(self, v: bool) -> Result<NullableStrictValue, E> {
                Ok(NullableStrictValue(v.into()))
            }
            fn visit_i64<E: de::Error>(self, v: i64) -> Result<NullableStrictValue, E> {
                Ok(NullableStrictValue(v.into()))
            }
            fn visit_u64<E: de::Error>(self, v: u64) -> Result<NullableStrictValue, E> {
                Ok(NullableStrictValue(v.into()))
            }
            fn visit_f64<E: de::Error>(self, v: f64) -> Result<NullableStrictValue, E> {
                let value = if v.fract() == 0.0 && v.abs() <= 9_007_199_254_740_991.0 {
                    Value::from(v as i64)
                } else {
                    Value::Number(
                        serde_json::Number::from_f64(v)
                            .ok_or_else(|| E::custom("Non-finite number"))?,
                    )
                };
                Ok(NullableStrictValue(value))
            }
            fn visit_str<E: de::Error>(self, v: &str) -> Result<NullableStrictValue, E> {
                Ok(NullableStrictValue(v.into()))
            }
            fn visit_string<E: de::Error>(self, v: String) -> Result<NullableStrictValue, E> {
                Ok(NullableStrictValue(v.into()))
            }
            fn visit_unit<E: de::Error>(self) -> Result<NullableStrictValue, E> {
                Ok(NullableStrictValue(Value::Null))
            }
            fn visit_seq<A: SeqAccess<'de>>(
                self,
                mut seq: A,
            ) -> Result<NullableStrictValue, A::Error> {
                let mut values = Vec::new();
                while let Some(NullableStrictValue(value)) = seq.next_element()? {
                    values.push(value);
                }
                Ok(NullableStrictValue(values.into()))
            }
            fn visit_map<A: MapAccess<'de>>(
                self,
                mut map: A,
            ) -> Result<NullableStrictValue, A::Error> {
                let mut values = Map::new();
                while let Some(key) = map.next_key::<String>()? {
                    if values.contains_key(&key) {
                        return Err(de::Error::custom(format!("Duplicate key: {key}")));
                    }
                    let NullableStrictValue(value) = map.next_value()?;
                    values.insert(key, value);
                }
                Ok(NullableStrictValue(values.into()))
            }
        }
        deserializer.deserialize_any(StrictVisitor)
    }
}

/// Strict bounded JSON parser shared by rule-pack validation.
/// Rejects duplicate/escape-equivalent keys, non-finite numbers, and excessive trees.
pub fn parse_json_document(text: &str) -> Result<Value, Error> {
    if text.len() > 1_048_576 {
        return Err(fail("E_JSON_LIMIT", "Input exceeds 1 MiB"));
    }
    let NullableStrictValue(value) =
        serde_json::from_str(text).map_err(|e| fail("E_JSON_INVALID", e.to_string()))?;
    limits(&value, 0, &mut 0, 10_000).map_err(|_| fail("E_JSON_LIMIT", "Tree budget exceeded"))?;
    Ok(value)
}

pub fn parse_json(bytes: &[u8]) -> Result<Value, Error> {
    parse_ingress(bytes, false)
}
pub fn parse_native_json(bytes: &[u8]) -> Result<Value, Error> {
    parse_ingress(bytes, true)
}
fn parse_ingress(bytes: &[u8], allow_native: bool) -> Result<Value, Error> {
    if bytes.len() > if allow_native { 4_194_304 } else { 1_048_576 } {
        return Err(fail("E_V2_LIMIT", "Byte budget"));
    }
    let text = std::str::from_utf8(bytes).map_err(|e| fail("E_V2_UNICODE", e.to_string()))?;
    let StrictValue(value) = serde_json::from_str(text).map_err(|e| {
        let msg = e.to_string();
        let code = if msg.contains("E_V2_DUPLICATE_KEY") {
            "E_V2_DUPLICATE_KEY"
        } else if msg.contains("E_V2_VALUE") {
            "E_V2_VALUE"
        } else {
            "E_V2_JSON"
        };
        fail(code, msg)
    })?;
    let native = allow_native && value["schemaVersion"] == "2.1.0";
    require(native || bytes.len() <= 1_048_576, "E_V2_LIMIT")?;
    limits(&value, 0, &mut 0, if native { 100_000 } else { 10_000 })?;
    Ok(value)
}
pub fn parse_project(bytes: &[u8]) -> Result<Value, Error> {
    let v = parse_ingress(bytes, true)?;
    if v["schemaVersion"] != "2.1.0" {
        return Err(fail("E_V2_VERSION", "Unsupported version; expected 2.1.0"));
    }
    static NATIVE: OnceLock<jsonschema::Validator> = OnceLock::new();
    let validator = NATIVE.get_or_init(|| {
        jsonschema::validator_for(
            &serde_json::from_str(NATIVE_SCHEMA_JSON).expect("native schema JSON"),
        )
        .expect("native schema")
    });
    if let Some(e) = validator.iter_errors(&v).next() {
        return Err(fail("E_NATIVE_SCHEMA", e.to_string()));
    }
    native_semantics(&v)?;
    Ok(v)
}
fn quote(s: &str) -> String {
    let mut o = String::from("\"");
    for c in s.chars() {
        match c {
            '"' | '\\' => {
                o.push('\\');
                o.push(c);
            }
            c if (c as u32) < 32 => o.push_str(&format!("\\u{:04x}", c as u32)),
            _ => o.push(c),
        }
    }
    o.push('"');
    o
}
pub fn canonical(v: &Value) -> String {
    match v {
        Value::Bool(b) => format!("[\"b\",{b}]"),
        Value::Number(n) => {
            let x = n.as_f64().expect("validated number");
            let bits = if x == 0.0 { 0 } else { x.to_bits() };
            format!("[\"n\",\"{bits:016x}\"]")
        }
        Value::String(s) => format!("[\"s\",{}]", quote(s)),
        Value::Array(a) => format!(
            "[\"a\",[{}]]",
            a.iter().map(canonical).collect::<Vec<_>>().join(",")
        ),
        Value::Object(m) => {
            let mut keys: Vec<_> = m.keys().collect();
            keys.sort();
            format!(
                "[\"o\",[{}]]",
                keys.iter()
                    .map(|k| format!("[{},{}]", quote(k), canonical(&m[*k])))
                    .collect::<Vec<_>>()
                    .join(",")
            )
        }
        Value::Null => panic!("null prohibited"),
    }
}
pub fn content_digest(v: &Value) -> String {
    let mut content = v.clone();
    content
        .as_object_mut()
        .expect("project")
        .remove("revisionId");
    let mut h = Sha256::new();
    h.update(b"tora-v2-hash/1\ndocument-content\n");
    h.update(canonical(&content).as_bytes());
    format!(
        "sha256:{}",
        h.finalize()
            .iter()
            .map(|b| format!("{b:02x}"))
            .collect::<String>()
    )
}
fn arr<'a>(v: &'a Value, key: &str) -> &'a [Value] {
    v.get(key)
        .and_then(Value::as_array)
        .map(Vec::as_slice)
        .unwrap_or(&[])
}
fn s<'a>(v: &'a Value, key: &str) -> &'a str {
    v.get(key).and_then(Value::as_str).unwrap_or("")
}
fn require(ok: bool, code: &'static str) -> Result<(), Error> {
    if ok {
        Ok(())
    } else {
        Err(fail(code, "Semantic rule rejected document"))
    }
}
fn cycle(edges: &std::collections::BTreeMap<String, Vec<String>>) -> Result<(), Error> {
    fn walk(
        node: &str,
        edges: &std::collections::BTreeMap<String, Vec<String>>,
        active: &mut std::collections::BTreeSet<String>,
        done: &mut std::collections::BTreeSet<String>,
    ) -> Result<(), Error> {
        if done.contains(node) {
            return Ok(());
        }
        require(active.insert(node.into()), "E_V2_CYCLE")?;
        if let Some(children) = edges.get(node) {
            for child in children {
                walk(child, edges, active, done)?;
            }
        }
        active.remove(node);
        done.insert(node.into());
        Ok(())
    }
    let mut active = std::collections::BTreeSet::new();
    let mut done = std::collections::BTreeSet::new();
    for key in edges.keys() {
        walk(key, edges, &mut active, &mut done)?;
    }
    Ok(())
}
fn native_semantics(v: &Value) -> Result<(), Error> {
    use std::collections::{BTreeMap, BTreeSet};
    let mut ids = BTreeSet::new();
    for key in [
        "scenes",
        "components",
        "variables",
        "gameplay",
        "events",
        "eventBindings",
        "assets",
    ] {
        for x in arr(v, key) {
            require(ids.insert(s(x, "id")), "E_NATIVE_DUPLICATE")?;
            require(
                !["constructor", "prototype", "__proto__"].contains(&s(x, "id")),
                "E_NATIVE_ID",
            )?;
        }
    }
    let tombstones: Vec<_> = arr(v, "tombstones")
        .iter()
        .map(|x| x.as_str().unwrap())
        .collect();
    require(
        tombstones.iter().all(|id| !ids.contains(id)),
        "E_NATIVE_TOMBSTONE",
    )?;
    let map = |key| {
        arr(v, key)
            .iter()
            .map(|x| (s(x, "id"), x))
            .collect::<BTreeMap<_, _>>()
    };
    let scenes = map("scenes");
    let objects = map("components");
    let variables = map("variables");
    let behaviors = map("gameplay");
    let event_defs = map("events");
    let assets = map("assets");
    require(
        scenes.contains_key(s(&v["base"], "startScene")),
        "E_NATIVE_REFERENCE",
    )?;
    require(
        arr(v, "gameplay").len() + arr(v, "eventBindings").len() <= 512,
        "E_NATIVE_LIMIT",
    )?;
    let mut edges = BTreeMap::new();
    for c in objects.values() {
        require(scenes.contains_key(s(c, "sceneId")), "E_NATIVE_REFERENCE")?;
        if s(c, "contract") == "native.mesh3d.v1" {
            require(c.get("parentId").is_some(), "E_NATIVE_PARENT")?;
        }
        if let Some(parent) = c.get("parentId") {
            let id = parent.as_str().unwrap();
            let p = objects
                .get(id)
                .ok_or_else(|| fail("E_NATIVE_REFERENCE", "parent"))?;
            let valid_parent = if s(c, "contract") == "native.mesh3d.v1" {
                ["native.stage3d.v1", "native.mesh3d.v1"].contains(&s(p, "contract"))
            } else {
                ["native.group.v1", "native.button.v1"].contains(&s(p, "contract"))
            };
            require(
                s(c, "sceneId") == s(p, "sceneId") && valid_parent,
                "E_NATIVE_PARENT",
            )?;
            edges.insert(s(c, "id").to_owned(), vec![id.to_owned()]);
        }
        for slot in arr(c, "assetSlots") {
            require(
                assets.contains_key(s(slot, "assetId")),
                "E_NATIVE_REFERENCE",
            )?;
        }
        if s(c, "contract") == "native.text.v1" {
            let text = s(&c["parameters"], "text");
            for part in text.split("{{").skip(1) {
                if let Some((id, _)) = part.split_once("}}") {
                    if !id.is_empty()
                        && id.chars().all(|c| {
                            c.is_ascii_lowercase() || c.is_ascii_digit() || "_.-".contains(c)
                        })
                    {
                        require(variables.contains_key(id), "E_NATIVE_REFERENCE")?;
                    }
                }
            }
        }
    }
    cycle(&edges)?;
    for c in objects.values() {
        let mut current = *c;
        let mut depth = 0;
        while let Some(parent) = current.get("parentId") {
            depth += 1;
            require(depth < 64, "E_NATIVE_LIMIT")?;
            current = objects[parent.as_str().unwrap()];
        }
    }
    for b in behaviors.values() {
        if s(b, "kind") == "animation" && b["parameters"]["fromCurrent"] == true {
            require(
                ["x", "y", "opacity"].contains(&s(&b["parameters"], "property")),
                "E_NATIVE_PROPERTY",
            )?;
        }
        require(
            objects.contains_key(s(b, "componentId")),
            "E_NATIVE_REFERENCE",
        )?;
        if s(b, "kind") == "erase-mask" {
            require(["native.image.v1", "native.rectangle.v1"].contains(&s(objects[s(b, "componentId")], "contract")), "E_NATIVE_PROPERTY")?;
            if let Some(variable_id) = b["parameters"].get("progressVariableId").and_then(|value| value.as_str()) {
                require(variables.get(variable_id).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_REFERENCE")?;
            }
        }
        if s(b, "kind") == "draw-stroke" {
            require(s(objects[s(b, "componentId")], "contract") == "native.group.v1", "E_NATIVE_PROPERTY")?;
            if s(&b["parameters"], "mode") == "path-trace" {
                require(objects.contains_key(s(&b["parameters"], "followComponentId")) && b["parameters"].get("followSpeed").is_some(), "E_NATIVE_REFERENCE")?;
            }
            if let Some(variable_id) = b["parameters"].get("inkVariableId").and_then(|value| value.as_str()) {
                require(variables.get(variable_id).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_REFERENCE")?;
            }
        }
        if s(b, "kind") == "physics-joint" {
            let owner = objects[s(b, "componentId")];
            let anchor = objects.get(s(&b["parameters"], "anchorComponentId"));
            require(
                anchor.is_some_and(|a| s(a, "id") != s(owner, "id") && s(a, "sceneId") == s(owner, "sceneId"))
                    && behaviors.values().any(|other| {
                        s(other, "kind") == "physics-body"
                            && s(other, "componentId") == s(b, "componentId")
                            && s(&other["parameters"], "mode") == "dynamic"
                    }),
                "E_NATIVE_PHYSICS",
            )?;
        }
        if s(b, "kind") == "instance-state" {
            require(b["parameters"]["hp"].as_f64().unwrap() <= b["parameters"]["maxHp"].as_f64().unwrap(), "E_NATIVE_PROPERTY")?;
        }
        if s(b, "kind") == "steer" {
            let parameters = &b["parameters"];
            require(
                (s(parameters, "targetMode") != "component" || objects.contains_key(s(parameters, "targetComponentId")))
                    && (s(parameters, "targetMode") != "nearest-team" || parameters.get("team").is_some()),
                "E_NATIVE_REFERENCE",
            )?;
        }
        if s(b, "kind") == "value-meter" {
            require(
                b["parameters"]["max"].as_f64().unwrap() > b["parameters"]["min"].as_f64().unwrap(),
                "E_NATIVE_REFERENCE",
            )?;
            if b["parameters"].get("instanceField").is_some() {
                require(b["parameters"].get("variableId").is_none(), "E_NATIVE_REFERENCE")?;
            } else {
                require(variables.get(s(&b["parameters"], "variableId")).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_REFERENCE")?;
            }
        }
        if s(b, "kind") == "hold-charge" {
            require(
                variables
                    .get(s(&b["parameters"], "variableId"))
                    .is_some_and(|variable| variable["initial"].is_number())
                    && b["parameters"]["max"].as_f64().unwrap()
                        > b["parameters"]["min"].as_f64().unwrap(),
                "E_NATIVE_REFERENCE",
            )?;
        }
    }
    for board in behaviors
        .values()
        .filter(|behavior| s(behavior, "kind") == "match-board")
    {
        let component = objects[s(board, "componentId")];
        let rows = board["parameters"]["rows"].as_u64().unwrap();
        let columns = board["parameters"]["columns"].as_u64().unwrap();
        let tiles: Vec<_> = behaviors
            .values()
            .filter(|tile| {
                s(tile, "kind") == "match-tile"
                    && s(objects[s(tile, "componentId")], "parentId") == s(component, "id")
            })
            .collect();
        require(
            s(component, "contract") == "native.group.v1"
                && component["prototype"] == false
                && tiles.len() as u64 == rows * columns,
            "E_NATIVE_MATCH_BOARD",
        )?;
        require(
            behaviors
                .values()
                .filter(|other| {
                    s(other, "kind") == "match-board"
                        && s(other, "componentId") == s(component, "id")
                })
                .count()
                == 1,
            "E_NATIVE_MATCH_BOARD",
        )?;
        require(
            !behaviors.values().any(|other| {
                s(other, "componentId") == s(component, "id")
                    && ["drag", "motion"].contains(&s(other, "kind"))
            }),
            "E_NATIVE_MATCH_BOARD",
        )?;
        let mut coordinates = BTreeSet::new();
        let mut tile_ids = BTreeSet::new();
        let mut groups = BTreeSet::new();
        for tile in tiles {
            let target = objects[s(tile, "componentId")];
            let row = tile["parameters"]["row"].as_u64().unwrap();
            let column = tile["parameters"]["column"].as_u64().unwrap();
            require(
                row < rows
                    && tile_ids.insert(s(tile, "componentId"))
                    && column < columns
                    && coordinates.insert((row, column))
                    && s(target, "contract") == "native.button.v1"
                    && target["prototype"] == false,
                "E_NATIVE_MATCH_BOARD",
            )?;
            require(
                !behaviors.values().any(|other| {
                    s(other, "componentId") == s(target, "id")
                        && ["drag", "motion"].contains(&s(other, "kind"))
                }),
                "E_NATIVE_MATCH_BOARD",
            )?;
            groups.insert(s(&tile["parameters"], "group"));
        }
        require(groups.len() >= 3, "E_NATIVE_MATCH_BOARD")?;
        let mut ancestor = component;
        loop {
            require(ancestor["prototype"] == false, "E_NATIVE_MATCH_BOARD")?;
            match ancestor.get("parentId") {
                Some(parent) => ancestor = objects[parent.as_str().unwrap()],
                None => break,
            }
        }
    }
    for behavior in behaviors
        .values()
        .filter(|behavior| s(behavior, "kind") == "responsive-layout")
    {
        let component = objects[s(behavior, "componentId")];
        require(
            s(component, "contract") == "native.group.v1",
            "E_NATIVE_LAYOUT",
        )?;
        require(
            component["prototype"] == true
                || !behaviors.values().any(|other| {
                    s(other, "componentId") == s(component, "id")
                        && ["drag", "motion"].contains(&s(other, "kind"))
                }),
            "E_NATIVE_LAYOUT",
        )?;
        require(
            behaviors
                .values()
                .filter(|other| {
                    s(other, "componentId") == s(component, "id")
                        && s(other, "kind") == "responsive-layout"
                })
                .count()
                == 1,
            "E_NATIVE_LAYOUT",
        )?;
        let mut ancestor = component;
        while let Some(parent) = ancestor.get("parentId") {
            ancestor = objects[parent.as_str().unwrap()];
            require(ancestor["prototype"] == false, "E_NATIVE_LAYOUT")?;
        }
    }
    fn condition(c: &Value, variables: &BTreeMap<&str, &Value>, depth: usize) -> Result<(), Error> {
        require(depth < 8, "E_NATIVE_LIMIT")?;
        if let Some(items) = c.get("all").or_else(|| c.get("any")) {
            for item in items.as_array().unwrap() {
                condition(item, variables, depth + 1)?;
            }
        } else if c.get("instanceField").is_some() {
            require(["self", "other"].contains(&s(c, "instanceTarget")), "E_NATIVE_CONDITION")?;
            let field = s(c, "instanceField");
            require(["hp", "value", "tag"].contains(&field), "E_NATIVE_CONDITION")?;
            let expected_string = field == "tag";
            if let Some(other_id) = c.get("compareVariableId").and_then(|v| v.as_str()) {
                let other = variables.get(other_id).ok_or_else(|| fail("E_NATIVE_CONDITION", "instance compare variable"))?;
                let ok = if expected_string { other["initial"].is_string() } else { other["initial"].is_number() };
                require(ok, "E_NATIVE_CONDITION")?;
            } else {
                let ok = if expected_string { c["value"].is_string() } else { c["value"].is_number() };
                require(ok, "E_NATIVE_CONDITION")?;
            }
            if expected_string {
                require(["eq", "ne"].contains(&s(c, "op")), "E_NATIVE_CONDITION")?;
            }
        } else {
            let var = variables
                .get(s(c, "variableId"))
                .ok_or_else(|| fail("E_NATIVE_REFERENCE", "condition variable"))?;
            if let Some(other_id) = c.get("compareVariableId").and_then(|v| v.as_str()) {
                let other = variables
                    .get(other_id)
                    .ok_or_else(|| fail("E_NATIVE_CONDITION", "condition compare variable"))?;
                require(
                    same_type(&var["initial"], &other["initial"]),
                    "E_NATIVE_CONDITION",
                )?;
            } else {
                require(
                    same_type(&var["initial"], &c["value"]),
                    "E_NATIVE_CONDITION",
                )?;
            }
        }
        Ok(())
    }
    fn same_type(a: &Value, b: &Value) -> bool {
        a.is_number() && b.is_number()
            || a.is_boolean() && b.is_boolean()
            || a.is_string() && b.is_string()
    }
    for e in arr(v, "events") {
        for key in ["componentId", "otherId"] {
            if let Some(id) = e.get(key) {
                require(
                    objects.contains_key(id.as_str().unwrap()),
                    "E_NATIVE_REFERENCE",
                )?;
            }
        }
        if let Some(id) = e.get("sceneId") {
            require(
                scenes.contains_key(id.as_str().unwrap()),
                "E_NATIVE_REFERENCE",
            )?;
        }
        if let Some(id) = e.get("variableId") {
            require(
                variables.contains_key(id.as_str().unwrap()),
                "E_NATIVE_REFERENCE",
            )?;
        }
        if let Some(id) = e.get("behaviorId") {
            let expected = if s(e, "kind") == "jointBreak" { "physics-joint" } else { "timer" };
            require(
                behaviors
                    .get(id.as_str().unwrap())
                    .is_some_and(|b| s(b, "kind") == expected),
                "E_NATIVE_REFERENCE",
            )?;
        }
    }
    for b in arr(v, "eventBindings") {
        require(
            event_defs.contains_key(s(b, "eventId")),
            "E_NATIVE_REFERENCE",
        )?;
        if let Some(c) = b.get("condition") {
            condition(c, &variables, 0)?;
        }
        for a in arr(b, "actions") {
            let kind = s(a, "kind");
            if ["add", "set"].contains(&kind) {
                let variable = variables
                    .get(s(a, "variableId"))
                    .ok_or_else(|| fail("E_NATIVE_REFERENCE", "action variable"))?;
                require(
                    same_type(&variable["initial"], &a["value"]),
                    "E_NATIVE_VARIABLE",
                )?;
            }
            if [
                "setComponent",
                "setAsset",
                "resetMatch",
                "hintMatch",
                "copyMatchAsset",
            ]
            .contains(&kind)
            {
                let component = objects
                    .get(s(a, "componentId"))
                    .ok_or_else(|| fail("E_NATIVE_REFERENCE", "action component"))?;
                if kind == "copyMatchAsset" {
                    require(
                        s(component, "contract") == "native.image.v1"
                            && behaviors.values().any(|behavior| {
                                s(behavior, "kind") == "match-board"
                                    && s(behavior, "componentId") == s(a, "boardId")
                            }),
                        "E_NATIVE_REFERENCE",
                    )?;
                }
                if kind == "hintMatch" {
                    require(
                        behaviors.values().any(|behavior| {
                            s(behavior, "kind") == "match-board"
                                && s(behavior, "componentId") == s(component, "id")
                        }),
                        "E_NATIVE_REFERENCE",
                    )?;
                }
                if kind == "setComponent" {
                    let schema: Value =
                        serde_json::from_str(NATIVE_SCHEMA_JSON).expect("native schema");
                    let variant = schema["properties"]["components"]["items"]["oneOf"]
                        .as_array()
                        .unwrap()
                        .iter()
                        .find(|variant| {
                            variant["properties"]["contract"]["const"] == component["contract"]
                        })
                        .unwrap();
                    let descriptor =
                        &variant["properties"]["parameters"]["properties"][s(a, "key")];
                    require(!descriptor.is_null(), "E_NATIVE_PROPERTY")?;
                    let validator =
                        jsonschema::validator_for(descriptor).expect("native parameter descriptor");
                    if let Some(variable_id) = a.get("valueVariableId").and_then(|value| value.as_str()) {
                        require(a.get("value").is_none(), "E_NATIVE_PROPERTY")?;
                        let variable = variables.get(variable_id).ok_or_else(|| fail("E_NATIVE_REFERENCE", "component value variable"))?;
                        let type_ok = match descriptor.get("type").and_then(|t| t.as_str()) {
                            Some("number" | "integer") => variable["initial"].is_number(),
                            Some("boolean") => variable["initial"].is_boolean(),
                            Some("string") => variable["initial"].is_string(),
                            None if descriptor.get("enum").is_some() => variable["initial"].is_string(),
                            _ => false,
                        };
                        require(type_ok, "E_NATIVE_PROPERTY")?;
                    } else {
                        require(validator.is_valid(&a["value"]), "E_NATIVE_PROPERTY")?;
                    }
                    if s(a, "key") == "text" {
                        for part in s(a, "value").split("{{").skip(1) {
                            if let Some((id, _)) = part.split_once("}}") {
                                if !id.is_empty()
                                    && id.chars().all(|c| {
                                        c.is_ascii_lowercase()
                                            || c.is_ascii_digit()
                                            || "_.-".contains(c)
                                    })
                                {
                                    require(variables.contains_key(id), "E_NATIVE_REFERENCE")?;
                                }
                            }
                        }
                    }
                }
                if kind == "setAsset" {
                    require(
                        [
                            "native.image.v1",
                            "native.sprite.v1",
                            "native.walk-sprite.v1",
                        ]
                        .contains(&s(component, "contract"))
                            && assets
                                .get(s(a, "assetId"))
                                .is_some_and(|asset| s(asset, "mime").starts_with("image/")),
                        "E_NATIVE_ASSET",
                    )?;
                }
            }
            if kind == "changeScene" {
                require(scenes.contains_key(s(a, "sceneId")), "E_NATIVE_REFERENCE")?;
            }
            if ["moveToComponent", "returnToOrigin"].contains(&kind) {
                require(objects.contains_key(s(a, "componentId")), "E_NATIVE_REFERENCE")?;
                require(a["seconds"].as_f64().is_some_and(|seconds| (0.02..=2.0).contains(&seconds)), "E_NATIVE_ACTION")?;
                if kind == "moveToComponent" {
                    require(objects.contains_key(s(a, "targetComponentId")), "E_NATIVE_REFERENCE")?;
                }
            }
            if kind == "spawnAt" {
                require(
                    objects.get(s(a, "prototypeId")).is_some_and(|object| object["prototype"] == true)
                        && objects.contains_key(s(a, "targetComponentId")),
                    "E_NATIVE_REFERENCE",
                )?;
            }
            if kind == "clearStrokes" {
                require(behaviors.values().any(|behavior| s(behavior, "kind") == "draw-stroke" && s(behavior, "componentId") == s(a, "componentId")), "E_NATIVE_REFERENCE")?;
            }
            if kind == "resetMask" {
                require(behaviors.values().any(|behavior| s(behavior, "kind") == "erase-mask" && s(behavior, "componentId") == s(a, "componentId")), "E_NATIVE_REFERENCE")?;
            }
            if kind == "random" {
                require(
                    variables.get(s(a, "variableId")).is_some_and(|variable| variable["initial"].is_number())
                        && a["min"].as_f64().zip(a["max"].as_f64()).is_some_and(|(min, max)| max >= min),
                    "E_NATIVE_VARIABLE",
                )?;
            }
            if kind == "modifyInstanceState" {
                let field = s(a, "field");
                require(["hp", "value", "tag"].contains(&field), "E_NATIVE_ACTION")?;
                require(["self", "other", "component"].contains(&s(a, "target")), "E_NATIVE_ACTION")?;
                if s(a, "target") == "component" {
                    require(behaviors.values().any(|behavior| s(behavior, "kind") == "instance-state" && s(behavior, "componentId") == s(a, "componentId")), "E_NATIVE_REFERENCE")?;
                }
                require(a.get("value").is_some() != a.get("variableId").is_some(), "E_NATIVE_ACTION")?;
                if let Some(variable_id) = a.get("variableId").and_then(|value| value.as_str()) {
                    let variable = variables.get(variable_id).ok_or_else(|| fail("E_NATIVE_REFERENCE", "instance value variable"))?;
                    let ok = if field == "tag" { variable["initial"].is_string() } else { variable["initial"].is_number() };
                    require(ok, "E_NATIVE_VARIABLE")?;
                } else {
                    let ok = if field == "tag" { a["value"].as_str().is_some_and(|v| v.len() <= 32) } else { a["value"].is_number() };
                    require(ok, "E_NATIVE_ACTION")?;
                }
                require(field != "tag" || s(a, "op") == "set", "E_NATIVE_ACTION")?;
            }
            if kind == "launchToward" {
                require(behaviors.values().any(|behavior| s(behavior, "kind") == "physics-body" && s(behavior, "componentId") == s(a, "componentId") && s(&behavior["parameters"], "mode") == "dynamic"), "E_NATIVE_PHYSICS")?;
                match s(a, "targetMode") {
                    "component" => require(objects.contains_key(s(a, "targetComponentId")), "E_NATIVE_REFERENCE")?,
                    "angle-variable" => require(variables.get(s(a, "angleVariableId")).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_REFERENCE")?,
                    "nearest-team" => require(["neutral", "player", "enemy", "hazard", "pickup"].contains(&s(a, "team")), "E_NATIVE_REFERENCE")?,
                    _ => {}
                }
                require(a.get("speed").is_some() != a.get("speedVariableId").is_some(), "E_NATIVE_PHYSICS")?;
                if let Some(variable_id) = a.get("speedVariableId").and_then(|value| value.as_str()) {
                    require(variables.get(variable_id).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_REFERENCE")?;
                } else {
                    require(a["speed"].as_f64().is_some_and(|speed| (1.0..=4000.0).contains(&speed)), "E_NATIVE_ACTION")?;
                }
            }
            if ["setVelocity", "applyImpulse", "setPosition"].contains(&kind) {
                require(behaviors.values().any(|behavior| s(behavior, "componentId") == s(a, "componentId") && ["physics-body", "physics-3d"].contains(&s(behavior, "kind"))), "E_NATIVE_PHYSICS")?;
                let pairs = match kind {
                    "setVelocity" => [("vx", "vxVariableId"), ("vy", "vyVariableId")],
                    "applyImpulse" => [("ix", "vxVariableId"), ("iy", "vyVariableId")],
                    _ => [("x", "xVariableId"), ("y", "yVariableId")],
                };
                for (lit, vid) in pairs {
                    require(a.get(lit).is_some() != a.get(vid).is_some(), "E_NATIVE_ACTION")?;
                }
            }
            if kind == "compute" {
                let op = s(a, "op");
                require(variables.get(s(a, "variableId")).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_VARIABLE")?;
                require(["floor", "ceil", "abs", "clamp"].contains(&op) || a.get("value").is_some() || a.get("operandVariableId").is_some(), "E_NATIVE_VARIABLE")?;
                if let Some(other_id) = a.get("operandVariableId").and_then(|value| value.as_str()) {
                    require(variables.get(other_id).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_VARIABLE")?;
                } else if ["div", "mod"].contains(&op) {
                    require(a["value"].as_f64().is_some_and(|v| v != 0.0), "E_NATIVE_VARIABLE")?;
                }
                if op == "clamp" {
                    require(a["min"].as_f64().zip(a["max"].as_f64()).is_some_and(|(min, max)| max >= min), "E_NATIVE_VARIABLE")?;
                }
            }
            for key in ["vxVariableId", "vyVariableId", "xVariableId", "yVariableId", "countVariableId"] {
                if let Some(variable_id) = a.get(key).and_then(|value| value.as_str()) {
                    require(variables.get(variable_id).is_some_and(|variable| variable["initial"].is_number()), "E_NATIVE_REFERENCE")?;
                }
            }
            if kind == "spawn" {
                require(
                    objects
                        .get(s(a, "prototypeId"))
                        .is_some_and(|o| o["prototype"] == true),
                    "E_NATIVE_REFERENCE",
                )?;
            }
            if a.get("behaviorId").is_some() {
                let required = match kind {
                    "animate" | "stopAnimation" => "animation",
                    "emit" => "emitter",
                    "playAudio" => "audio",
                    "setPathEdge" => "path-network",
                    "setPathGate" => "path-gate",
                    _ => "",
                };
                require(
                    behaviors
                        .get(s(a, "behaviorId"))
                        .is_some_and(|b| s(b, "kind") == required),
                    "E_NATIVE_REFERENCE",
                )?;
            }
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn native_conformance_and_schema_identity() {
        let root = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
            .join("../../fixtures/native/conformance.json");
        let rows: Value = serde_json::from_slice(&std::fs::read(root).unwrap()).unwrap();
        for row in rows.as_array().unwrap() {
            let bytes = serde_json::to_vec(&row["document"]).unwrap();
            let result = parse_project(&bytes);
            assert_eq!(
                result.is_ok(),
                row["valid"].as_bool().unwrap(),
                "{} {:?}",
                row["id"],
                result.as_ref().err()
            );
            if let Ok(value) = result {
                assert_eq!(content_digest(&value), row["contentHash"]);
            }
        }
        let mut h = Sha256::new();
        h.update(NATIVE_SCHEMA_JSON.as_bytes());
        let hex = h
            .finalize()
            .iter()
            .map(|b| format!("{b:02x}"))
            .collect::<String>();
        assert_eq!(hex, generated_v21::NATIVE_SCHEMA_SHA256);
    }
    #[test]
    fn responsive_layout_supports_prototype_roots_and_static_groups() {
        let root = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
            .join("../../fixtures/native/conformance.json");
        let rows: Value = serde_json::from_slice(&std::fs::read(root).unwrap()).unwrap();
        let mut document = rows
            .as_array()
            .unwrap()
            .iter()
            .find(|row| row["valid"] == true)
            .unwrap()["document"]
            .clone();
        let scene = document["base"]["startScene"].clone();
        document["components"]
            .as_array_mut()
            .unwrap()
            .push(serde_json::json!({
                "id":"responsive-test", "label":"Layout", "contract":"native.group.v1",
                "sceneId":scene, "order":100, "transform":[1,0,0,1,0,0],
                "parameters":{"width":80,"height":80,"visible":true,"opacity":1,"clip":false},
                "assetSlots":[], "prototype":false
            }));
        document["gameplay"]
            .as_array_mut()
            .unwrap()
            .push(serde_json::json!({
                "id":"responsive-test.layout", "componentId":"responsive-test",
                "kind":"responsive-layout", "parameters":{"x":300,"y":0,"scaleX":1,"scaleY":1}
            }));
        assert!(parse_project(&serde_json::to_vec(&document).unwrap()).is_ok());
        let mut prototype = document.clone();
        prototype["components"]
            .as_array_mut()
            .unwrap()
            .last_mut()
            .unwrap()["prototype"] = true.into();
        assert!(parse_project(&serde_json::to_vec(&prototype).unwrap()).is_ok());
        let mut moving_prototype = prototype.clone();
        moving_prototype["gameplay"]
            .as_array_mut()
            .unwrap()
            .push(serde_json::json!({
                "id":"responsive-test.motion", "componentId":"responsive-test",
                "kind":"motion", "parameters":{"vx":0,"vy":20,"gravity":0}
            }));
        assert!(parse_project(&serde_json::to_vec(&moving_prototype).unwrap()).is_ok());
        document["gameplay"]
            .as_array_mut()
            .unwrap()
            .push(serde_json::json!({
                "id":"responsive-test.motion", "componentId":"responsive-test",
                "kind":"motion", "parameters":{"vx":0,"vy":20,"gravity":0}
            }));
        assert_eq!(
            parse_project(&serde_json::to_vec(&document).unwrap())
                .unwrap_err()
                .code,
            "E_NATIVE_LAYOUT"
        );
    }

    #[test]
    fn match_board_requires_a_complete_grid_and_valid_hint_source() {
        let root = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
            .join("../../fixtures/native/conformance.json");
        let corpus: Value = serde_json::from_slice(&std::fs::read(root).unwrap()).unwrap();
        let mut document = corpus
            .as_array()
            .unwrap()
            .iter()
            .find(|row| row["valid"] == true)
            .unwrap()["document"]
            .clone();
        let scene = document["base"]["startScene"].clone();
        document["components"]
            .as_array_mut()
            .unwrap()
            .push(serde_json::json!({
                "id":"test-board", "label":"Board", "contract":"native.group.v1",
                "sceneId":scene, "order":100, "transform":[1,0,0,1,0,0],
                "parameters":{"width":200,"height":200,"visible":true,"opacity":1,"clip":false},
                "assetSlots":[], "prototype":false
            }));
        document["gameplay"]
            .as_array_mut()
            .unwrap()
            .push(serde_json::json!({
                "id":"test-board.rules", "componentId":"test-board", "kind":"match-board",
                "parameters":{"rows":3,"columns":3,"seed":17}
            }));
        for row in 0..3 {
            for column in 0..3 {
                let id = format!("test-cell-{}-{}", row, column);
                document["components"].as_array_mut().unwrap().push(serde_json::json!({
                    "id":id, "label":"Crop", "contract":"native.button.v1", "parentId":"test-board",
                    "sceneId":scene, "order":column+row*3, "transform":[1,0,0,1,column*50,row*50],
                    "parameters":{"width":48,"height":48,"visible":true,"opacity":1,"enabled":true,"fill":"#ffffff","stroke":"#000000","strokeWidth":0,"radius":4,"hoverFill":"#ffffff","pressedFill":"#cccccc","disabledFill":"#888888"},
                    "assetSlots":[], "prototype":false
                }));
                document["gameplay"].as_array_mut().unwrap().push(serde_json::json!({
                    "id":format!("{}.type",id), "componentId":id, "kind":"match-tile",
                    "parameters":{"row":row,"column":column,"group":(["carrot","corn","pumpkin"][(row+column)%3])}
                }));
            }
        }
        assert!(parse_project(&serde_json::to_vec(&document).unwrap()).is_ok());
        document["gameplay"]
            .as_array_mut()
            .unwrap()
            .last_mut()
            .unwrap()["parameters"]["column"] = 1.into();
        assert_eq!(
            parse_project(&serde_json::to_vec(&document).unwrap())
                .unwrap_err()
                .code,
            "E_NATIVE_MATCH_BOARD"
        );
    }

    #[test]
    fn native_expansion_packs_have_valid_and_invalid_conformance() {
        fn document() -> Value {
            let root = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
                .join("../../fixtures/native/conformance.json");
            let rows: Value = serde_json::from_slice(&std::fs::read(root).unwrap()).unwrap();
            rows.as_array().unwrap().iter().find(|row| row["valid"] == true).unwrap()["document"].clone()
        }
        fn accept(document: &Value) {
            assert!(parse_project(&serde_json::to_vec(document).unwrap()).is_ok());
        }
        let mut gestures = document();
        gestures["gameplay"].as_array_mut().unwrap().extend([
            serde_json::json!({"id":"gesture.zone","componentId":"tap.background","kind":"drop-zone","parameters":{"acceptTags":[],"snapMode":"center","capacity":1,"onOccupied":"swap","radiusPx":0,"highlightColor":"#ffffff"}}),
            serde_json::json!({"id":"gesture.hold","componentId":"tap.background","kind":"hold-charge","parameters":{"dragMode":"anywhere","variableId":"score","ratePerSecond":2,"min":0,"max":10,"pingPong":false,"resetOnRelease":true}}),
        ]);
        gestures["events"].as_array_mut().unwrap().push(serde_json::json!({"id":"gesture.drop","kind":"dragDrop","componentId":"tap.background","otherId":"tap.target"}));
        gestures["eventBindings"].as_array_mut().unwrap().push(serde_json::json!({"id":"gesture.binding","eventId":"gesture.drop","actions":[{"kind":"despawn","target":"both"}]}));
        accept(&gestures);

        let mut entities = document();
        entities["gameplay"].as_array_mut().unwrap().extend([
            serde_json::json!({"id":"entity.state","componentId":"tap.background","kind":"instance-state","parameters":{"hp":2,"maxHp":2,"value":0,"tag":"enemy","team":"enemy"}}),
            serde_json::json!({"id":"entity.body","componentId":"tap.background","kind":"physics-body","parameters":{"mode":"dynamic","shape":"circle","restitution":0.8,"friction":0,"linearDamping":0,"gravity":0,"maxSpeed":900,"restSpeed":1,"restDelaySeconds":0.1,"wallBounce":false,"spinToRotation":false,"mass":1,"collisionGroup":"enemy"}}),
            serde_json::json!({"id":"entity.steer","componentId":"tap.background","kind":"steer","parameters":{"mode":"chase","targetMode":"nearest-team","team":"player","speed":100,"turnRateDegPerSec":360,"maxRangePx":0,"orientToVelocity":true}}),
        ]);
        entities["events"].as_array_mut().unwrap().push(serde_json::json!({"id":"entity.depleted","kind":"instanceDepleted","componentId":"tap.background"}));
        entities["eventBindings"].as_array_mut().unwrap().push(serde_json::json!({"id":"entity.binding","eventId":"entity.depleted","actions":[{"kind":"random","variableId":"score","min":0,"max":4,"integer":true},{"kind":"launchToward","componentId":"tap.background","targetMode":"nearest-team","team":"player","speed":100}]}));
        accept(&entities);

        let mut canvas = document();
        canvas["components"].as_array_mut().unwrap().push(serde_json::json!({"id":"canvas.field","label":"Field","contract":"native.group.v1","sceneId":"scene.play","order":100,"transform":[1,0,0,1,0,0],"parameters":{"width":390,"height":700,"visible":true,"opacity":1,"clip":false},"assetSlots":[],"prototype":false}));
        canvas["gameplay"].as_array_mut().unwrap().extend([
            serde_json::json!({"id":"canvas.mask","componentId":"tap.background","kind":"erase-mask","parameters":{"mode":"erase","brushRadiusPx":24,"gridSize":24,"targetPercent":75,"progressVariableId":"score","maskColor":"#dceeff"}}),
            serde_json::json!({"id":"canvas.draw","componentId":"canvas.field","kind":"draw-stroke","parameters":{"mode":"slice-blade","maxPoints":64,"minSegmentPx":8,"maxStrokes":4,"strokeWidth":12,"color":"#ffffff"}}),
            serde_json::json!({"id":"canvas.body","componentId":"tap.background","kind":"physics-body","parameters":{"mode":"dynamic","shape":"circle","restitution":0.8,"friction":0,"linearDamping":0,"gravity":0,"maxSpeed":900,"restSpeed":1,"restDelaySeconds":0.1,"wallBounce":false,"spinToRotation":false,"mass":1,"collisionGroup":"prop"}}),
            serde_json::json!({"id":"canvas.joint","componentId":"tap.background","kind":"physics-joint","parameters":{"kind":"distance","anchorComponentId":"tap.target","lengthPx":100,"breakable":true,"drawRope":true,"ropeColor":"#ffffff","ropeWidth":2}}),
        ]);
        canvas["events"].as_array_mut().unwrap().extend([
            serde_json::json!({"id":"canvas.complete","kind":"maskComplete","componentId":"tap.background"}),
            serde_json::json!({"id":"canvas.break","kind":"jointBreak","componentId":"tap.background","behaviorId":"canvas.joint"}),
        ]);
        canvas["eventBindings"].as_array_mut().unwrap().push(serde_json::json!({"id":"canvas.binding","eventId":"canvas.complete","actions":[{"kind":"clearStrokes","componentId":"canvas.field"},{"kind":"resetMask","componentId":"tap.background"}]}));
        accept(&canvas);

        let mut invalid = gestures.clone();
        invalid["gameplay"].as_array_mut().unwrap().last_mut().unwrap()["parameters"]["variableId"] = "missing".into();
        let error = parse_project(&serde_json::to_vec(&invalid).unwrap()).unwrap_err();
        assert_eq!(error.code, "E_NATIVE_REFERENCE", "{}", error.message);
        let mut invalid_joint = canvas.clone();
        invalid_joint["gameplay"].as_array_mut().unwrap().last_mut().unwrap()["parameters"]["anchorComponentId"] = "missing".into();
        assert_eq!(parse_project(&serde_json::to_vec(&invalid_joint).unwrap()).unwrap_err().code, "E_NATIVE_PHYSICS");

        let mut static_joint = canvas.clone();
        static_joint["gameplay"].as_array_mut().unwrap().iter_mut().find(|b| b["id"] == "canvas.body").unwrap()["parameters"]["mode"] = "static".into();
        assert_eq!(parse_project(&serde_json::to_vec(&static_joint).unwrap()).unwrap_err().code, "E_NATIVE_PHYSICS");

        let mut clamp_ok = entities.clone();
        clamp_ok["eventBindings"].as_array_mut().unwrap().push(serde_json::json!({"id":"entity.clamp","eventId":"entity.depleted","actions":[{"kind":"compute","variableId":"score","op":"clamp","min":0,"max":10}]}));
        accept(&clamp_ok);

        let mut bad_mod = entities.clone();
        bad_mod["eventBindings"].as_array_mut().unwrap().push(serde_json::json!({"id":"entity.badmod","eventId":"entity.depleted","actions":[{"kind":"modifyInstanceState","target":"component","componentId":"tap.background","field":"hp","op":"sub"}]}));
        assert_eq!(parse_project(&serde_json::to_vec(&bad_mod).unwrap()).unwrap_err().code, "E_NATIVE_ACTION");

        let mut bad_meter = entities.clone();
        bad_meter["gameplay"].as_array_mut().unwrap().push(serde_json::json!({"id":"entity.meter","componentId":"tap.background","kind":"value-meter","parameters":{"variableId":"score","min":10,"max":5,"axis":"x","direction":"positive","smoothingSeconds":0.1}}));
        assert_eq!(parse_project(&serde_json::to_vec(&bad_meter).unwrap()).unwrap_err().code, "E_NATIVE_REFERENCE");
    }

    #[test]
    fn ingress_rejects_unsafe_documents() {
        for bytes in [
            b"{\"a\":1,\"a\":2}".as_slice(),
            b"{\"a\":1,\"\\u0061\":2}",
            b"null",
            b"9007199254740992",
            b"-9007199254740992",
            b"1e999",
            b"\"\\ud800\"",
            b"[] trailing",
            &[0xff],
        ] {
            assert!(parse_json(bytes).is_err(), "{:?}", bytes);
        }
    }
    #[test]
    fn ingress_limits() {
        assert!(parse_json(&vec![b' '; 1_048_577]).is_err());
        assert!(parse_json(format!("{}0{}", "[".repeat(65), "]".repeat(65)).as_bytes()).is_err());
        assert!(parse_json(format!("[{}]", vec!["0"; 10_000].join(",")).as_bytes()).is_err());
    }
}
