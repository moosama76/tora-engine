#!/usr/bin/env node
/** Unified Tora CLI: init, mcp, editor, doctor, check. */
import {spawnSync} from 'node:child_process';
import {copyFileSync,existsSync,realpathSync} from 'node:fs';
import {access,constants as fsConstants,mkdir,readFile,rename,rm,writeFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {dirname,resolve} from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {IS_SOURCE_CHECKOUT,PACKAGE_ROOT,defaultStoreRoot,resolveEditorStateDir,resolveWorkspaceRoot} from '../scripts/lean/runtime-paths.mjs';
import {ensureNativeBinary,packageVersion,platformTarget,resolveNativeTool} from '../scripts/lean/native/native-bin.mjs';
import {assertStorePath} from '../scripts/lean/native/store-path.mjs';

const HELP=`Usage: tora <command> [options]

Commands:
  tora init [--client claude-code|cursor|codex|gemini|all|print] [--global]
            [--workspace <dir>] [--install-browsers|--skip-browsers] [--no-download] [--dry-run]
  tora mcp [--workspace <dir>] [--store <dir>]
  tora editor [--port 8001] [--workspace <dir>] [--store <dir>]
  tora doctor [--workspace <dir>] [--json]
  tora check <artifact|rules|assets> ...
  tora --version | --help
`;

function parseFlags(argv){
 const flags={},positional=[];
 for(let i=0;i<argv.length;i++){
  const arg=argv[i];
  if(arg==='--help'||arg==='-h'){flags.help=true;continue;}
  if(arg==='--version'||arg==='-V'){flags.version=true;continue;}
  if(arg.startsWith('--')){
   const eq=arg.indexOf('=');
   if(eq!==-1){
    flags[arg.slice(2,eq)]=arg.slice(eq+1);
    continue;
   }
   const key=arg.slice(2);
   if(['global','dry-run','skip-browsers','install-browsers','no-download','json','local-bin'].includes(key)){
    flags[key]=true;
   }else{
    const next=argv[i+1];
    if(next===undefined||next.startsWith('--'))throw Error(`Missing value for --${key}`);
    flags[key]=next;
    i++;
   }
  }else{
   positional.push(arg);
  }
 }
 return {flags,positional};
}

function commandExists(cmd){
 const probe=spawnSync(process.platform==='win32'?'where':'which',[cmd],{stdio:'ignore'});
 return probe.status===0;
}

async function detectChromiumPath(){
 try{
  const {chromium}=await import('playwright');
  const execPath=chromium.executablePath();
  return {path:execPath,installed:Boolean(execPath&&existsSync(execPath))};
 }catch{
  return {path:'',installed:false};
 }
}

export function buildMcpClientEntry({workspaceRoot,localBin=IS_SOURCE_CHECKOUT}={}){
 const ws=resolveWorkspaceRoot(workspaceRoot);
 if(localBin){
  return {
   command:process.execPath,
   args:[resolve(PACKAGE_ROOT,'bin/tora.mjs'),'mcp','--workspace',ws],
  };
 }
 return {
  command:'npx',
  args:['-y','@tora-editor/tora','mcp','--workspace',ws],
 };
}

export async function mergeJsonMcpConfig(filePath,serverName,entry,{dryRun=false}={}){
 let existing={};
 const existed=existsSync(filePath);
 if(existed){
  const raw=await readFile(filePath,'utf8');
  existing=raw.trim()?JSON.parse(raw):{};
  if(!existing||typeof existing!=='object'||Array.isArray(existing)){
   throw Error(`Config file is not a JSON object: ${filePath}`);
  }
 }
 const next={
  ...existing,
  mcpServers:{
   ...(existing.mcpServers&&typeof existing.mcpServers==='object'&&!Array.isArray(existing.mcpServers)?existing.mcpServers:{}),
   [serverName]:entry,
  },
 };
 const serialized=JSON.stringify(next,null,2)+'\n';
 if(!dryRun){
  await mkdir(dirname(filePath),{recursive:true});
  const backupPath=filePath+'.bak';
  if(existed&&!existsSync(backupPath))copyFileSync(filePath,backupPath);
  const tmp=`${filePath}.${process.pid}.tmp`;
  try{
   await writeFile(tmp,serialized,'utf8');
   await rename(tmp,filePath);
  }finally{
   await rm(tmp,{force:true});
  }
 }
 return {path:filePath,existed,dryRun,config:next};
}

async function runDoctor(flags){
 const ws=resolveWorkspaceRoot(flags.workspace);
 const nodeMajor=Number(process.versions.node.split('.')[0]);
 const nodeOk=Number.isInteger(nodeMajor)&&nodeMajor>=22;
 let nativeInfo=null,nativeError=null,nativeVersion=null;
 try{
  nativeInfo=resolveNativeTool('cli');
  if(nativeInfo){
   const probe=spawnSync(nativeInfo.command,['--version'],{encoding:'utf8'});
   if(probe.status===0)nativeVersion=probe.stdout.trim();
   else nativeError=probe.stderr?.trim()||`exit ${probe.status}`;
  }
 }catch(error){
  nativeError=error.message;
 }
 const chromiumInfo=await detectChromiumPath();
 const storePath=defaultStoreRoot(ws);
 const journalPath=resolveEditorStateDir(ws);
 let storeSafe=true,journalSafe=true,workspaceWritable=true;
 try{await assertStorePath(storePath);}catch{storeSafe=false;}
 try{await assertStorePath(journalPath);}catch{journalSafe=false;}
 try{await access(ws,fsConstants.W_OK);}catch{workspaceWritable=false;}
 const ffmpeg=commandExists('ffmpeg');
 const gstreamer=commandExists('gst-launch-1.0');
 const clientConfigs={
  cursorProject:existsSync(resolve(ws,'.cursor/mcp.json')),
  cursorGlobal:existsSync(resolve(homedir(),'.cursor/mcp.json')),
  geminiGlobal:existsSync(resolve(homedir(),'.gemini/settings.json')),
  claudeProject:existsSync(resolve(ws,'.mcp.json')),
 };
 const ok=nodeOk&&Boolean(nativeInfo)&&!nativeError&&storeSafe&&journalSafe;
 const report={
  ok,
  version:packageVersion(PACKAGE_ROOT),
  mode:IS_SOURCE_CHECKOUT?'source-checkout':'packaged',
  packageRoot:PACKAGE_ROOT,
  workspaceRoot:ws,
  node:{version:process.versions.node,ok:nodeOk},
  platform:platformTarget(),
  nativeBinary:nativeInfo?{...nativeInfo,version:nativeVersion,ok:!nativeError}:{ok:false,error:nativeError??'missing'},
  chromium:chromiumInfo,
  audioTranscode:{ffmpeg,gstreamer},
  paths:{storeRoot:storePath,storeSafe,journalDir:journalPath,journalSafe,workspaceWritable},
  clientConfigs,
 };
 if(flags.json){
  globalThis.console.log(JSON.stringify(report,null,2));
 }else{
  globalThis.console.log(`Tora v${report.version} (${report.mode})`);
  globalThis.console.log(`  Node:           ${report.node.version} (${nodeOk?'ok':'requires >=22'})`);
  globalThis.console.log(`  Workspace:      ${ws}`);
  globalThis.console.log(`  Native binary:  ${nativeInfo?`${nativeInfo.command} (${nativeInfo.source}, ${nativeVersion??'unverified'})`:`MISSING (${nativeError??'run tora init'})`}`);
  globalThis.console.log(`  Chromium:       ${chromiumInfo.installed?`ready (${chromiumInfo.path})`:'missing (run: npx playwright install chromium)'}`);
  globalThis.console.log(`  Audio tools:    ffmpeg=${ffmpeg?'yes':'no'}, gstreamer=${gstreamer?'yes':'no'} (optional)`);
  globalThis.console.log(`  Store/Journal:  store=${storeSafe?'safe':'UNSAFE'}, journal=${journalSafe?'safe':'UNSAFE'}`);
 }
 return ok?0:1;
}

async function runInit(flags){
 const ws=resolveWorkspaceRoot(flags.workspace);
 const dryRun=Boolean(flags['dry-run']);
 const client=String(flags.client??'print').toLowerCase();
 const validClients=new Set(['claude-code','cursor','codex','gemini','all','print']);
 if(!validClients.has(client))throw Error(`Unsupported --client "${client}". Choose claude-code, cursor, codex, gemini, all, or print.`);

 const nodeMajor=Number(process.versions.node.split('.')[0]);
 if(!Number.isInteger(nodeMajor)||nodeMajor<22)throw Error(`Node >= 22 is required (found ${process.versions.node})`);

 let native=resolveNativeTool('cli');
 if(!native&&!dryRun&&!flags['no-download']){
  try{
   native=await ensureNativeBinary({allowDownload:true});
   globalThis.console.log(`Native binary ready (${native.source}): ${native.command}`);
  }catch(error){
   globalThis.console.warn(`Warning: native binary unavailable (${error.message}).`);
  }
 }else if(native){
  globalThis.console.log(`Native binary ready (${native.source}): ${native.command}`);
 }else{
  globalThis.console.log('Native binary: not found locally (skipped download in dry-run/no-download mode).');
 }

 const chromiumInfo=await detectChromiumPath();
 if(chromiumInfo.installed){
  globalThis.console.log(`Playwright Chromium ready: ${chromiumInfo.path}`);
 }else if(!flags['skip-browsers']&&!dryRun&&(flags['install-browsers']||client!=='print')){
  const npxCmd=process.platform==='win32'?'npx.cmd':'npx';
  const installed=spawnSync(npxCmd,['playwright','install','chromium'],{stdio:'inherit'});
  if(installed.status!==0){
   globalThis.console.warn('Warning: Playwright Chromium install failed. Run `npx playwright install chromium` before Creative QA.');
  }
 }else{
  globalThis.console.log('Playwright Chromium: not installed (run `npx playwright install chromium` before Creative QA).');
 }

 const entry=buildMcpClientEntry({workspaceRoot:ws,localBin:Boolean(flags['local-bin']||IS_SOURCE_CHECKOUT)});
 const targets=client==='all'?['cursor','gemini','claude-code','codex']:client==='print'?[]:[client];
 const results=[];

 for(const target of targets){
  if(target==='cursor'){
   const cfgPath=flags.global?resolve(homedir(),'.cursor/mcp.json'):resolve(ws,'.cursor/mcp.json');
   const merged=await mergeJsonMcpConfig(cfgPath,'tora',entry,{dryRun});
   results.push({client:'cursor',action:dryRun?'dry-run':'written',path:merged.path});
  }else if(target==='gemini'){
   const cfgPath=resolve(homedir(),'.gemini/settings.json');
   const merged=await mergeJsonMcpConfig(cfgPath,'tora',entry,{dryRun});
   results.push({client:'gemini',action:dryRun?'dry-run':'written',path:merged.path});
  }else if(target==='claude-code'){
   if(!dryRun&&commandExists('claude')){
    const res=spawnSync('claude',['mcp','add','tora','--',entry.command,...entry.args],{cwd:ws,stdio:'inherit'});
    if(res.status===0){results.push({client:'claude-code',action:'cli-added'});continue;}
   }
   const cfgPath=flags.global?resolve(homedir(),'.claude.json'):resolve(ws,'.mcp.json');
   const merged=await mergeJsonMcpConfig(cfgPath,'tora',entry,{dryRun});
   results.push({client:'claude-code',action:dryRun?'dry-run':'written',path:merged.path});
  }else if(target==='codex'){
   if(!dryRun&&commandExists('codex')){
    const res=spawnSync('codex',['mcp','add','tora','--',entry.command,...entry.args],{cwd:ws,stdio:'inherit'});
    if(res.status===0){results.push({client:'codex',action:'cli-added'});continue;}
   }
   const cmd=`codex mcp add tora -- ${entry.command} ${entry.args.map(a=>JSON.stringify(a)).join(' ')}`;
   results.push({client:'codex',action:'print-command',command:cmd});
  }
 }

 if(client==='print'||dryRun){
  globalThis.console.log('\nMCP server entry:');
  globalThis.console.log(JSON.stringify({mcpServers:{tora:entry}},null,2));
 }
 for(const r of results){
  if(r.command)globalThis.console.log(`[${r.client}] Run: ${r.command}`);
  else globalThis.console.log(`[${r.client}] ${r.action}${r.path?`: ${r.path}`:''}`);
 }
 return 0;
}

export async function runCli(argv=process.argv.slice(2)){
 const [sub,...rest]=argv;
 if(!sub||sub==='--help'||sub==='-h'){
  globalThis.console.log(HELP);
  return 0;
 }
 if(sub==='--version'||sub==='-V'){
  globalThis.console.log(`tora ${packageVersion(PACKAGE_ROOT)}`);
  return 0;
 }
 if(sub==='check'){
  const tool=resolveNativeTool('cli');
  if(!tool){
   globalThis.console.error('Native playable binary not found. Run `tora init` or `npm run setup`.');
   return 1;
  }
  const args=rest.length&&!['artifact','rules','assets','--help','-h','--version','-V'].includes(rest[0])
   ?['artifact','check',...rest]
   :rest;
  const res=spawnSync(tool.command,args,{stdio:'inherit'});
  return res.status??1;
 }
 const {flags}=parseFlags(rest);
 if(flags.help){globalThis.console.log(HELP);return 0;}
 if(sub==='mcp'){
  const {startMcpServer}=await import('../scripts/lean/native/mcp-server.mjs');
  await startMcpServer({workspaceRoot:flags.workspace,storeRoot:flags.store});
  return 0;
 }
 if(sub==='editor'){
  const {startEditor}=await import('../scripts/serve-editor.mjs');
  const port=flags.port!==undefined?Number(flags.port):Number(process.env.EDITOR_PORT??8001);
  const {url}=await startEditor({port,workspaceRoot:flags.workspace,storeRoot:flags.store});
  globalThis.console.log('Tora editor: '+url+'/?view=new');
  return 0;
 }
 if(sub==='doctor')return runDoctor(flags);
 if(sub==='init')return runInit(flags);
 globalThis.console.error(`Unknown command: ${sub}\n\n${HELP}`);
 return 2;
}

const isDirectExecution=(()=>{
 if(!process.argv[1])return false;
 try{return realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url));}
 catch{return resolve(process.argv[1])===fileURLToPath(import.meta.url);}
})();
if(isDirectExecution){
 runCli().then(code=>{if(code&&code!==0)process.exitCode=code;}).catch(error=>{
  globalThis.console.error(error?.message??String(error));
  process.exitCode=1;
 });
}
