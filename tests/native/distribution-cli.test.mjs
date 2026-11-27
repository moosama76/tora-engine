import test from 'node:test';
import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {createHash} from 'node:crypto';
import {spawn,spawnSync} from 'node:child_process';
import {chmod,copyFile,mkdir,mkdtemp,readFile,rm,symlink,writeFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import process from 'node:process';
import {clearTimeout,setTimeout} from 'node:timers';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {PACKAGE_ROOT} from '../../scripts/lean/runtime-paths.mjs';
import {ensureNativeBinary,platformTarget,resolveNativeTool} from '../../scripts/lean/native/native-bin.mjs';
import {buildMcpClientEntry,mergeJsonMcpConfig,runCli} from '../../bin/tora.mjs';
import {buildCliPackage} from '../../scripts/build-cli-package.mjs';

const sha256=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');

async function chmodRecursive(dir,mode){
 const {readdir,lstat}=await import('node:fs/promises');
 const info=await lstat(dir);
 if(info.isSymbolicLink())return;
 if(info.isDirectory()){
  for(const entry of await readdir(dir))await chmodRecursive(resolve(dir,entry),mode);
 }
 await chmod(dir,mode);
}

function startJsonRpcProcess(command,args,{cwd,env}){
 const child=spawn(command,args,{cwd,env,stdio:['pipe','pipe','pipe']});
 let pendingBuf=Buffer.alloc(0),stderr='',serial=0;
 const inflight=new Map();
 child.stderr.on('data',c=>{stderr+=c.toString('utf8');});
 child.once('exit',(code,signal)=>{
  for(const [id,entry]of inflight.entries()){
   clearTimeout(entry.timer);
   inflight.delete(id);
   entry.reject(Error(`MCP exited early (code=${code}, signal=${signal}): ${stderr}`));
  }
 });
 child.stdout.on('data',chunk=>{
  pendingBuf=Buffer.concat([pendingBuf,chunk]);
  let idx;
  while((idx=pendingBuf.indexOf(10))!==-1){
   const line=pendingBuf.subarray(0,idx).toString('utf8');
   pendingBuf=pendingBuf.subarray(idx+1);
   if(!line)continue;
   const msg=JSON.parse(line);
   const entry=inflight.get(msg.id);
   if(entry){clearTimeout(entry.timer);inflight.delete(msg.id);entry.resolve(msg);}
  }
 });
 const request=(method,params={})=>new Promise((res,rej)=>{
  const id=++serial;
  const timer=setTimeout(()=>{inflight.delete(id);rej(Error(`MCP timeout (${method}): ${stderr}`));},90_000);
  inflight.set(id,{resolve:res,reject:rej,timer});
  child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');
 });
 const notify=(method,params={})=>{child.stdin.write(JSON.stringify({jsonrpc:'2.0',method,params})+'\n');};
 const call=async(name,argumentsValue={})=>{
  const msg=await request('tools/call',{name,arguments:argumentsValue});
  return {isError:Boolean(msg.result?.isError),value:JSON.parse(msg.result.content[0].text)};
 };
 const close=async()=>{
  child.stdin.end();
  await new Promise(done=>{
   const t=setTimeout(()=>{child.kill('SIGTERM');done();},5000);
   child.once('exit',()=>{clearTimeout(t);done();});
  });
 };
 return {request,notify,call,close,stderr:()=>stderr};
}

test('native-bin resolves explicit env, cache, and verifies SHA-256 on prebuilt download',async t=>{
 await mkdir(resolve('reports'),{recursive:true});
 const tmp=await mkdtemp(resolve('reports/native-bin-'));
 t.after(()=>rm(tmp,{recursive:true,force:true}));
 const info=platformTarget();
 assert.ok(info,'supported CI platform target');

 // Explicit nonexistent TORA_NATIVE_BIN fails closed.
 assert.throws(()=>resolveNativeTool('cli',{env:{TORA_NATIVE_BIN:resolve(tmp,'missing')}}),/E_NATIVE_BIN_NOT_FOUND/);

 // Tampered download fails SHA-256 verification before writing.
 const goodBytes=Buffer.from('#!/bin/sh\necho playable 0.1.0\n');
 const badManifest={targets:{[info.target]:{filename:`${info.target}-${info.bin}`,sha256:sha256(Buffer.from('different')),url:'https://example.invalid/playable'}}};
 await assert.rejects(
  ensureNativeBinary({
   allowDownload:true,
   manifest:badManifest,
   fetchImpl:async()=>new globalThis.Response(goodBytes,{status:200}),
   cacheDir:resolve(tmp,'cache'),
   env:{},
   packageRoot:resolve(tmp,'empty-pkg'),
  }),
  /E_NATIVE_BIN_CHECKSUM/,
 );

 // Matching SHA-256 downloads atomically to cache and resolves on next lookup.
 const goodManifest={targets:{[info.target]:{filename:`${info.target}-${info.bin}`,sha256:sha256(goodBytes),url:'https://example.invalid/playable'}}};
 const installed=await ensureNativeBinary({
  allowDownload:true,
  manifest:goodManifest,
  fetchImpl:async()=>new globalThis.Response(goodBytes,{status:200}),
  cacheDir:resolve(tmp,'cache'),
  env:{},
  packageRoot:resolve(tmp,'empty-pkg'),
 });
 assert.equal(installed.downloaded,true);
 assert.equal(installed.source,'cache');
 const cachedLookup=resolveNativeTool('inspect',{
  cacheDir:resolve(tmp,'cache'),
  env:{},
  packageRoot:resolve(tmp,'empty-pkg'),
  allowCheckoutFallback:false,
 });
 assert.equal(cachedLookup.source,'cache');
 assert.deepEqual(cachedLookup.prefixArgs,['assets','inspect']);
});

test('external workspace isolates store and symlink-checked journal from repository paths',async t=>{
 const ext=await mkdtemp(resolve('/tmp/tora-ext-ws-'));
 t.after(()=>rm(ext,{recursive:true,force:true}));

 // Default store under external workspace lives inside <ext>/.tora/native-projects.
 const store=new ProjectStore(undefined,{workspaceRoot:ext});
 assert.equal(store.root,resolve(ext,'.tora/native-projects'));
 assert.equal(store.workspaceRoot,ext);

 // Repository .tora store is rejected when an external workspace is active.
 assert.throws(
  ()=>new ProjectStore(resolve(PACKAGE_ROOT,'.tora/native-projects'),{workspaceRoot:ext}),
  /E_WORKSPACE_OUTSIDE_PROJECT/,
 );

 // EditorState derives journal inside <ext>/.tora/editor-state and rejects symlinked journal dir.
 await store.createNative({id:'ws-check',name:'Workspace Isolation'});
 const history=new EditorState(store);
 assert.equal(history.directory,resolve(ext,'.tora/editor-state'));
 const realOutside=await mkdtemp(resolve('/tmp/tora-symlink-target-'));
 t.after(()=>rm(realOutside,{recursive:true,force:true}));
 await mkdir(resolve(ext,'.tora'),{recursive:true});
 await symlink(realOutside,resolve(ext,'.tora/editor-state'));
 await assert.rejects(history.readRevisionJournal('ws-check'),/E_NATIVE_STORE_SYMLINK/);
});

test('tora init merges Cursor config non-destructively and supports --dry-run',async t=>{
 const ws=await mkdtemp(resolve('/tmp/tora-init-'));
 t.after(()=>rm(ws,{recursive:true,force:true}));
 const cursorCfg=resolve(ws,'.cursor/mcp.json');
 await mkdir(dirname(cursorCfg),{recursive:true});
 await writeFile(cursorCfg,JSON.stringify({mcpServers:{other:{command:'echo',args:['ok']}}},null,2)+'\n');

 const entry=buildMcpClientEntry({workspaceRoot:ws,localBin:false});
 assert.equal(entry.command,'npx');
 assert.deepEqual(entry.args,['-y','@tora-engine/tora','mcp','--workspace',ws]);

 // Dry-run leaves file untouched.
 const dry=await mergeJsonMcpConfig(cursorCfg,'tora',entry,{dryRun:true});
 assert.equal(dry.dryRun,true);
 assert.equal(JSON.parse(await readFile(cursorCfg,'utf8')).mcpServers.tora,undefined);

 // Real merge preserves existing servers and writes .bak backup.
 await mergeJsonMcpConfig(cursorCfg,'tora',entry,{dryRun:false});
 const merged=JSON.parse(await readFile(cursorCfg,'utf8'));
 assert.deepEqual(merged.mcpServers.other,{command:'echo',args:['ok']});
 assert.deepEqual(merged.mcpServers.tora,entry);
 const backup=JSON.parse(await readFile(cursorCfg+'.bak','utf8'));
 assert.equal(backup.mcpServers.tora,undefined);

 // CLI doctor succeeds in source checkout.
 const doctorCode=await runCli(['doctor','--workspace',PACKAGE_ROOT]);
 assert.equal(doctorCode,0);
});

test('packed @tora-engine/tora runs zero-Rust MCP (offline starter CC0 + QA + export) and editor review from read-only node_modules',async t=>{
 const sandbox=await mkdtemp(resolve('/tmp/tora-pack-smoke-'));
 const stagedOut=resolve(sandbox,'staged');
 const pkgHost=resolve(sandbox,'host');
 const userWs=resolve(sandbox,'user-game');
 const binDir=resolve(sandbox,'native-bin');
 const installedPkg=resolve(pkgHost,'node_modules/@tora-engine/tora');
 t.after(async()=>{
  await chmodRecursive(installedPkg,0o755).catch(()=>{});
  await rm(sandbox,{recursive:true,force:true});
 });

 // 1. Stage the publishable CLI package and verify starter CC0 size budget.
 const built=await buildCliPackage({outRoot:stagedOut});
 assert.ok(built.starterBytes<=1_500_000,`starter CC0 should be <= 1.5 MB, got ${built.starterBytes}`);
 const stagedPkgJson=JSON.parse(await readFile(resolve(built.cliDir,'package.json'),'utf8'));
 assert.equal(stagedPkgJson.name,'@tora-engine/tora');
 assert.deepEqual(Object.keys(stagedPkgJson.bin),['tora']);
 assert.deepEqual(Object.keys(stagedPkgJson.dependencies).sort(),['ajv','playwright']);

 // 2. Pack via npm pack and extract into an isolated host node_modules with ONLY ajv + playwright (no esbuild/typescript/three!).
 const packed=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['pack','--pack-destination',sandbox],{
  cwd:built.cliDir,
  env:{...process.env,HOME:sandbox,USERPROFILE:sandbox,npm_config_cache:resolve(sandbox,'.npm-cache')},
  encoding:'utf8',
 });
 assert.equal(packed.status,0,packed.stderr||packed.stdout);
 const tgzName=packed.stdout.trim().split('\n').pop().trim();
 const tgzPath=resolve(sandbox,tgzName);

 await mkdir(resolve(pkgHost,'node_modules/@tora-engine'),{recursive:true});
 await mkdir(resolve(pkgHost,'node_modules/.bin'),{recursive:true});
 await mkdir(userWs,{recursive:true});
 await mkdir(binDir,{recursive:true});

 const untar=spawnSync('tar',['-xzf',tgzPath,'-C',resolve(pkgHost,'node_modules/@tora-engine')],{encoding:'utf8'});
 assert.equal(untar.status,0,untar.stderr);
 const {rename}=await import('node:fs/promises');
 await rename(resolve(pkgHost,'node_modules/@tora-engine/package'),installedPkg);

 // Link only declared runtime deps (ajv@8 + transitive deps, playwright, playwright-core) — explicitly NOT esbuild, typescript, or three.
 await symlink(resolve(PACKAGE_ROOT,'packages/creative-project/node_modules/ajv'),resolve(pkgHost,'node_modules/ajv'));
 await symlink(resolve(PACKAGE_ROOT,'packages/creative-project/node_modules/json-schema-traverse'),resolve(pkgHost,'node_modules/json-schema-traverse'));
 for(const dep of ['fast-deep-equal','fast-uri','require-from-string','uri-js','playwright','playwright-core']){
  const src=resolve(PACKAGE_ROOT,'node_modules',dep);
  const exists=await readFile(resolve(src,'package.json')).then(()=>true).catch(()=>false);
  if(exists)await symlink(src,resolve(pkgHost,'node_modules',dep));
 }
 const binLink=resolve(pkgHost,'node_modules/.bin/tora');
 await symlink(resolve(installedPkg,'bin/tora.mjs'),binLink);

 // Copy built playable binary outside the repo and strip cargo/rustc from PATH.
 const nativeTool=resolveNativeTool('cli');
 assert.ok(nativeTool,'playable binary must be built for smoke test');
 const copiedBin=resolve(binDir,process.platform==='win32'?'playable.exe':'playable');
 await copyFile(nativeTool.command,copiedBin);
 if(process.platform!=='win32')await chmod(copiedBin,0o755);

 // Make installed package directory read-only to prove zero writes into node_modules/.
 await chmodRecursive(installedPkg,0o555);

 const noRustEnv={
  ...process.env,
  PATH:`${dirname(process.execPath)}:/usr/bin:/bin`,
  TORA_NATIVE_BIN:copiedBin,
  PLAYWRIGHT_BROWSERS_PATH:process.env.PLAYWRIGHT_BROWSERS_PATH??resolve(process.env.HOME??'','.cache/ms-playwright'),
  HOME:sandbox,
  USERPROFILE:sandbox,
 };
 delete noRustEnv.TORA_PROJECT_STORE;
 delete noRustEnv.TORA_WORKSPACE_ROOT;
 delete noRustEnv.TORA_PLAYABLE_BRIEF;

 // Verify npm executable bin runs --version cleanly without Rust.
 const ver=spawnSync(binLink,['--version'],{cwd:userWs,env:noRustEnv,encoding:'utf8'});
 assert.equal(ver.status,0,ver.stderr);
 assert.match(ver.stdout,/^tora 0\.1\.0/);

 // 3. Launch the exact MCP command (`tora mcp --workspace <userWs>`, no --store flag!).
 const mcp=startJsonRpcProcess(binLink,['mcp','--workspace',userWs],{cwd:userWs,env:noRustEnv});
 t.after(()=>mcp.close());
 const initRes=await mcp.request('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'smoke',version:'1'}});
 assert.equal(initRes.result?.serverInfo?.name,'tora',mcp.stderr());
 mcp.notify('notifications/initialized');

 const brief=await mcp.call('tora_brief',{});
 assert.equal(brief.isError,false,JSON.stringify(brief.value));
 assert.equal(brief.value.workspace,userWs);
 assert.equal(brief.value.store,resolve(userWs,'.tora/native-projects'));

 // Offline starter CC0 catalog must return real verified sprites without network!
 const listed=await mcp.call('tora_list_assets',{kind:'sprite'});
 assert.equal(listed.isError,false,JSON.stringify(listed.value));
 assert.ok(listed.value.assets.length>=5,`expected >=5 offline starter sprites, got ${listed.value.assets.length}`);
 const carAsset=listed.value.assets.find(a=>a.name.includes('car_blue')||a.name.includes('car.blue'));
 assert.ok(carAsset,'starter kenney-racing sprite available offline');

 const created=await mcp.call('tora_create',{id:'smoke-pack',name:'Smoke Pack',androidUrl:'https://play.google.com/store/apps/details?id=com.tora.smoke'});
 assert.equal(created.isError,false,JSON.stringify(created.value));

 const staged=await mcp.call('tora_stage_cc0_assets',{
  id:'smoke-pack',
  expected:created.value.expected,
  items:[{sourceId:carAsset.id,assetId:'hero-car'}],
 });
 assert.equal(staged.isError,false,JSON.stringify(staged.value));
 assert.equal(staged.value.status,'STAGED');

 const edited=await mcp.call('tora_edit',{
  id:'smoke-pack',
  expected:staged.value.expected,
  scope:[],
  scopeCreates:true,
  operations:[
   {kind:'createScene',scene:{id:'play',label:'Play',role:'interactive'}},
   {kind:'setStartScene',id:'play'},
   {kind:'createComponent',component:{id:'bg',label:'Backdrop',contract:'native.rectangle.v1',sceneId:'play',order:0,transform:[1,0,0,1,0,0],parameters:{width:390,height:700,fill:'#182235',stroke:'#182235',strokeWidth:0,radius:0,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'hero',label:'Hero Car',contract:'native.image.v1',sceneId:'play',order:1,transform:[1,0,0,1,155,280],parameters:{width:80,height:120,fit:'contain',opacity:1,visible:true},assetSlots:[{slotId:'source',assetId:'hero-car'}]}},
   {kind:'createComponent',component:{id:'go',label:'Boost Button',contract:'native.button.v1',sceneId:'play',order:2,transform:[1,0,0,1,95,460],parameters:{width:200,height:84,enabled:true,fill:'#2563eb',stroke:'#1d4ed8',strokeWidth:2,radius:16,hoverFill:'#3b82f6',pressedFill:'#1e40af',disabledFill:'#64748b',opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'go-label',label:'Boost Text',contract:'native.text.v1',sceneId:'play',parentId:'go',order:0,transform:[1,0,0,1,0,24],parameters:{width:200,height:36,text:'BOOST',fontSize:22,fontFamily:'sans-serif',fontWeight:'700',align:'center',color:'#ffffff',opacity:1,visible:true},assetSlots:[]}},
   {kind:'putVariable',variable:{id:'taps',label:'Taps',type:'number',initial:0}},
   {kind:'putEvent',event:{id:'ev-go',kind:'click',componentId:'go'}},
   {kind:'putBinding',binding:{id:'b-go',eventId:'ev-go',actions:[{kind:'add',variableId:'taps',value:1},{kind:'setComponent',componentId:'go-label',key:'text',value:'BOOSTED!'}]}},
  ],
 });
 assert.equal(edited.isError,false,JSON.stringify(edited.value));
 // $project.base was changed by setStartScene -> confirm via commitPreviewDigest.
 const committed=edited.value.status==='PREVIEW'
  ?await mcp.call('tora_edit',{id:'smoke-pack',expected:staged.value.expected,scope:['$project.base'],scopeCreates:true,commitPreviewDigest:edited.value.previewDigest})
  :edited;
 assert.equal(committed.isError,false,JSON.stringify(committed.value));
 assert.equal(committed.value.status,'COMMITTED');

 // QA runs offline using bundled catalog.json + prebuilt host bundles + zero esbuild!
 const qa=await mcp.call('tora_qa',{id:'smoke-pack',target:'unity-ads-ua-playable',motionFilmstrip:false});
 assert.equal(qa.isError,false,JSON.stringify(qa.value));
 assert.equal(qa.value.ok,true,JSON.stringify(qa.value.blockers));

 // Export Unity HTML using SHA-verified prebuilt native.js (zero esbuild/three/typescript!).
 const outHtml=resolve(userWs,'smoke-unity.html');
 const exp=await mcp.call('tora_export',{id:'smoke-pack',target:'unity-ads-ua-playable',output:outHtml});
 assert.equal(exp.isError,false,JSON.stringify(exp.value));
 assert.equal(exp.value.status,'EXPORTED');
 const htmlText=await readFile(outHtml,'utf8');
 assert.ok(htmlText.includes('ToraNative')&&htmlText.includes('mraid'));

 // 4. Launch packaged `tora editor --port 0 --workspace <userWs>` and verify live review runtime serving!
 const editorProc=spawn(binLink,['editor','--port','0','--workspace',userWs],{cwd:userWs,env:noRustEnv,stdio:['ignore','pipe','pipe']});
 let editorErr='';
 editorProc.stderr.on('data',c=>{editorErr+=c.toString('utf8');});
 const editorUrl=await new Promise((res,rej)=>{
  let out='';
  const timer=setTimeout(()=>rej(Error(`Editor startup timeout: ${out}\n${editorErr}`)),20_000);
  editorProc.stdout.on('data',c=>{
   out+=c.toString('utf8');
   const m=out.match(/http:\/\/127\.0\.0\.1:\d+/);
   if(m){clearTimeout(timer);res(m[0]);}
  });
  editorProc.once('exit',code=>{clearTimeout(timer);rej(Error(`Editor exited ${code}: ${editorErr}`));});
 });
 t.after(()=>{editorProc.kill('SIGTERM');});

 const homeRes=await globalThis.fetch(editorUrl+'/');
 assert.equal(homeRes.status,200);
 const reviewRtRes=await globalThis.fetch(editorUrl+'/review-runtime.js');
 assert.equal(reviewRtRes.status,200,`review-runtime.js failed: ${editorErr}`);
 const reviewJs=await reviewRtRes.text();
 assert.ok(reviewJs.includes('ToraNative')&&reviewJs.length>100_000);
 const projectsRes=await globalThis.fetch(editorUrl+'/api/projects');
 assert.equal(projectsRes.status,200);
 const projectsJson=await projectsRes.json();
 assert.ok(projectsJson.projects.some(p=>p.id==='smoke-pack'),'editor sees MCP-created workspace project');
});
