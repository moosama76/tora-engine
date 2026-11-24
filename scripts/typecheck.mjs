import process from "node:process";
import { resolve } from "node:path";
import { ROOT, packageDirectories, run } from "./workspace.mjs";

for (const name of await packageDirectories()) {
  globalThis.console.log(`Typecheck @playable/${name}`);
  run(process.execPath, [resolve(ROOT, "node_modules/typescript/bin/tsc"), "--project", `packages/${name}/tsconfig.json`, "--noEmit"]);
}
