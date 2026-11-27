import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import process from 'node:process';
import {spawnSync} from 'node:child_process';
import {chromium} from 'playwright';
import {ROOT,run} from './workspace.mjs';
import {checkToolchain} from './check-toolchain.mjs';
import {ensureNativeBinary} from './lean/native/native-bin.mjs';

const skipBrowsers=process.argv.includes('--skip-browsers');
const prebuilt=process.argv.includes('--prebuilt');
const npmCmd=process.platform==='win32'?'npm.cmd':'npm';
const npxCmd=process.platform==='win32'?'npx.cmd':'npx';

if(prebuilt){
 const major=Number(process.versions.node.split('.')[0]);
 if(!Number.isInteger(major)||major<22)throw Error(`Node >= 22 is required (found ${process.versions.node})`);
 globalThis.console.log(`1/5 Node ${process.versions.node} detected (--prebuilt mode; Rust not required).`);
 globalThis.console.log('2/5 Ensuring prebuilt native playable binary...');
 const native=await ensureNativeBinary({allowDownload:true});
 globalThis.console.log(`    Native binary ready (${native.source}): ${native.command}`);
}else{
 globalThis.console.log('1/5 Checking Node & Rust toolchains...');
 const tools=await checkToolchain(ROOT);
 globalThis.console.log(`    Node ${tools.node}, npm ${tools.npm}, Rust ${tools.rust}`);
 globalThis.console.log('2/5 Building native asset decoder & playable-cli...');
 run('cargo',['build','--locked','-p','asset-pipeline','--example','inspect_native']);
 run('cargo',['build','--locked','-p','asset-pipeline','--example','optimize_native']);
 run('cargo',['build','--locked','-p','playable-cli']);
}

globalThis.console.log('3/5 Checking Playwright Chromium...');
let browserPath;
try{browserPath=chromium.executablePath();}catch{browserPath='';}
if(browserPath&&existsSync(browserPath)){
 globalThis.console.log(`    Chromium ready (${browserPath})`);
}else if(skipBrowsers){
 globalThis.console.log('    Skipped Chromium install (--skip-browsers). Run `npm run browsers:install` before Creative QA.');
}else{
 globalThis.console.log('    Installing Chromium via Playwright...');
 const installed=spawnSync(npxCmd,['playwright','install','chromium'],{cwd:ROOT,stdio:'inherit'});
 if(installed.status!==0){
  globalThis.console.warn('    Warning: Playwright Chromium install failed (possibly offline). Run `npm run browsers:install` when online.');
 }
}

globalThis.console.log('4/5 Building local editor bundle & verifying trusted packer...');
run(npmCmd,['run','build:editor']);
run(npmCmd,['run','packer:check']);

globalThis.console.log('5/5 Tora is ready!\n');
const toraBin=resolve(ROOT,'bin/tora.mjs');
const mcpConfig={
 mcpServers:{
  tora:{
   command:'node',
   args:[toraBin,'mcp','--workspace',ROOT],
  },
 },
};
globalThis.console.log('Paste into your MCP client config (or run `node bin/tora.mjs init --client cursor|claude-code|gemini|codex`):');
globalThis.console.log(JSON.stringify(mcpConfig,null,2));
globalThis.console.log('\nNext steps:');
globalThis.console.log('  • Start the local studio editor:  npm run dev:editor');
globalThis.console.log('  • Check environment health:       node bin/tora.mjs doctor');
globalThis.console.log('  • Run full verification suite:    npm run verify');
