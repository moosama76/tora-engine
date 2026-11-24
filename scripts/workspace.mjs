import { readFile, readdir } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import process from "node:process";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const RUST_CRATES = [
  "creative-project-schema", "asset-pipeline", "packer", "rule-checker", "playable-cli",
];
export const JS_PACKAGES = [
  "adapters", "creative-project", "test-harness",
];
export const SOURCE_PATHS = [
  ".github", ".gitattributes", ".gitignore", ".node-version", ".npmrc", ".nvmrc",
  "AGENTS.md", "CONTRIBUTING.md", "LICENSE", "PRODUCTION_MASTER.md", "README.md",
  "Cargo.toml", "Cargo.lock", "rust-toolchain.toml", "package.json", "package-lock.json",
  "tsconfig.base.json", "eslint.config.mjs",
  "assets", "crates", "packages", "network-rules", "fixtures", "skills", "tests", "scripts", "docs",
];
/** Source snapshots exclude workspace dependencies and local planning reports. */
export function isSourceSnapshotPath(path, root = ROOT) {
  const parts = relative(root, path).split(sep);
  const localReport = parts.length === 2 && parts[0] === "docs" && /^(?:T\d{3}.*|AUDIT_.*T\d{3}.*|issue-backlog)\.md$/.test(parts[1]);
  return !parts.includes("node_modules") && !localReport;
}
export async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}
export async function packageDirectories(root = ROOT) {
  const entries = await readdir(resolve(root, "packages"), { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}
export function run(command, arguments_, { cwd = ROOT, capture = false, env = process.env } = {}) {
  const result = spawnSync(command, arguments_, {
    cwd, env, encoding: "utf8", stdio: capture ? "pipe" : "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${arguments_.join(" ")} failed (${result.status ?? result.signal})\n${result.stdout ?? ""}${result.stderr ?? ""}`);
  }
  return result.stdout ?? "";
}
