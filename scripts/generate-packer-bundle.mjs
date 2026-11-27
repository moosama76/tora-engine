import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {build, version as esbuildVersion} from "esbuild";
import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "node:path";
import process from "node:process";
import {ROOT} from "./workspace.mjs";
import {nativeCompatibilityPlugin, nativeCompatibilityMetadata} from "./lean/native/compatibility.mjs";

const sha256 = text => "sha256:" + createHash("sha256").update(text, "utf8").digest("hex");

const targets = [
  ["scripts/lean/native/runtime.mjs", "native", false, false],
  ["scripts/lean/native/runtime.mjs", "native-3d", true, false],
  ["scripts/lean/native/runtime.mjs", "review-runtime", true, true],
];

const hostTargets = [
  ["packages/test-harness/src/mraid-host.ts", "mraid-host.iife.js", "MraidHost"],
  ["packages/test-harness/src/vendor-hosts.ts", "vendor-hosts.iife.js", "VendorHost"],
];

const check = process.argv.slice(2);
assert.ok(check.length === 0 || (check.length === 1 && check[0] === "--check"), "Usage: node scripts/generate-packer-bundle.mjs [--check]");

for (const [entry, name, include3d, includeReview] of targets) {
  // Fixed repository entry; project folders never supply executable JS, HTML, CSS or plugins.
  const compilerFlags = {
    bundle: true,
    platform: "browser",
    target: include3d ? "es2020" : ["es2019", "safari13"],
    format: "iife",
    minify: true,
    charset: "ascii",
    legalComments: "none",
    sourcemap: false,
    globalName: "ToraNative",
  };
  const result = await build({
    absWorkingDir: ROOT,
    entryPoints: [entry],
    ...compilerFlags,
    write: false,
    metafile: true,
    plugins: [nativeCompatibilityPlugin({include3d, includeReview})],
  });
  assert.equal(result.outputFiles.length, 1);
  const output = Object.values(result.metafile.outputs)[0];
  assert.deepEqual(output.imports, []);
  const script = result.outputFiles[0].text;
  assert.ok(!/<\/script|<!--|<script[\s/>]/i.test(script), "Unsafe inline-script raw-text sequence in trusted bundle");
  const metadata = JSON.stringify({
    renderer: {
      backend: include3d ? "webgl2-three" : "canvas2d",
      version: includeReview ? "tora-native-review-1" : include3d ? "tora-native-3d-1" : "tora-native-1",
    },
    entry,
    compiler: {name: "esbuild", version: esbuildVersion},
    preprocessor: nativeCompatibilityMetadata,
    flags: compilerFlags,
    inputs: Object.keys(result.metafile.inputs),
    javascriptBytes: result.outputFiles[0].contents.length,
    sha256: sha256(script),
    externalImports: output.imports,
  }, null, 2) + "\n";

  for (const [filename, contents] of [[`${name}.js`, script], [`${name}-meta.json`, metadata]]) {
    const path = resolve(ROOT, "crates/packer/trusted", filename);
    if (check.length) {
      assert.equal(await readFile(path, "utf8"), contents, `Stale trusted bundle: ${filename}; run npm run packer:generate`);
    } else {
      await writeFile(path, contents);
    }
  }
  globalThis.console.log(check.length ? `Trusted ${name} bundle matches pinned compilation.` : `Generated trusted ${name} bundle.`);
}

const hostMetaEntries = {};
for (const [entry, filename, globalName] of hostTargets) {
  const result = await build({
    absWorkingDir: ROOT,
    entryPoints: [entry],
    bundle: true,
    format: "iife",
    globalName,
    write: false,
    platform: "browser",
  });
  assert.equal(result.outputFiles.length, 1);
  const script = result.outputFiles[0].text;
  const path = resolve(ROOT, "crates/packer/trusted", filename);
  if (check.length) {
    assert.equal(await readFile(path, "utf8"), script, `Stale trusted host bundle: ${filename}; run npm run packer:generate`);
  } else {
    await writeFile(path, script);
  }
  hostMetaEntries[filename] = {
    entry,
    globalName,
    javascriptBytes: result.outputFiles[0].contents.length,
    sha256: sha256(script),
  };
}
const hostMeta = JSON.stringify({
  format: "tora-qa-host-bundles-1",
  compiler: {name: "esbuild", version: esbuildVersion},
  bundles: hostMetaEntries,
}, null, 2) + "\n";
const hostMetaPath = resolve(ROOT, "crates/packer/trusted", "host-bundles-meta.json");
if (check.length) {
  assert.equal(await readFile(hostMetaPath, "utf8"), hostMeta, "Stale trusted host-bundles-meta.json; run npm run packer:generate");
} else {
  await writeFile(hostMetaPath, hostMeta);
}
globalThis.console.log(check.length ? "Trusted QA host bundles match pinned compilation." : "Generated trusted QA host bundles.");
