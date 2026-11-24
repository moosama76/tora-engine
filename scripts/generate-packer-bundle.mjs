import assert from "node:assert/strict";
import {build, version as esbuildVersion} from "esbuild";
import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "node:path";
import process from "node:process";
import {ROOT} from "./workspace.mjs";
import {nativeCompatibilityPlugin, nativeCompatibilityMetadata} from "./lean/native/compatibility.mjs";

const targets = [
  ["scripts/lean/native/runtime.mjs", "native", false],
  ["scripts/lean/native/runtime.mjs", "native-3d", true],
];

const check = process.argv.slice(2);
assert.ok(check.length === 0 || (check.length === 1 && check[0] === "--check"), "Usage: node scripts/generate-packer-bundle.mjs [--check]");

for (const [entry, name, include3d] of targets) {
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
    plugins: [nativeCompatibilityPlugin({include3d})],
  });
  assert.equal(result.outputFiles.length, 1);
  const output = Object.values(result.metafile.outputs)[0];
  assert.deepEqual(output.imports, []);
  const script = result.outputFiles[0].text;
  assert.ok(!/<\/script|<!--|<script[\s/>]/i.test(script), "Unsafe inline-script raw-text sequence in trusted bundle");
  const metadata = JSON.stringify({
    renderer: {
      backend: include3d ? "webgl2-three" : "canvas2d",
      version: include3d ? "tora-native-3d-1" : "tora-native-1",
    },
    entry,
    compiler: {name: "esbuild", version: esbuildVersion},
    preprocessor: nativeCompatibilityMetadata,
    flags: compilerFlags,
    inputs: Object.keys(result.metafile.inputs),
    javascriptBytes: result.outputFiles[0].contents.length,
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
