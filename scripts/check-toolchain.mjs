import assert from "node:assert/strict";
import process from "node:process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, run } from "./workspace.mjs";

export async function checkToolchain(root = ROOT) {
  const major = Number(process.versions.node.split(".")[0]);
  assert.ok(Number.isInteger(major) && major >= 22, `Node >= 22 is required (found ${process.versions.node})`);
  const npm = run(process.platform === "win32" ? "npm.cmd" : "npm", ["--version"], { cwd: root, capture: true }).trim();
  assert.ok(/^\d+\.\d+\.\d+/.test(npm), "npm is required");
  const config = await readFile(resolve(root, "rust-toolchain.toml"), "utf8");
  const pinnedRust = config.match(/^channel = "([^"]+)"$/m)?.[1];
  const rustc = run("rustc", ["--version"], { cwd: root, capture: true }).trim().split(/\s+/)[1];
  const cargo = run("cargo", ["--version"], { cwd: root, capture: true }).trim().split(/\s+/)[1];
  assert.ok(rustc && cargo, "Rust toolchain (rustc and cargo) is required");
  return { node: process.versions.node, npm, rust: rustc, pinnedRust };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const tools = await checkToolchain();
  globalThis.console.log(`Toolchain ready: Node ${tools.node}, npm ${tools.npm}, Rust ${tools.rust}`);
}
