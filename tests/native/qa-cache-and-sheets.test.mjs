import test from 'node:test';
import assert from 'node:assert/strict';
import process from 'node:process';
import {Buffer} from 'node:buffer';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {setTimeout,clearTimeout} from 'node:timers';
import {mkdtemp,mkdir,readdir,readFile,rm,writeFile,stat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {getSharedBrowser,closeSharedBrowser} from '../../scripts/lean/native/browser-pool.mjs';
import {CREATIVE_QA_CHECKER_VERSION,CREATIVE_QA_FORMAT,DEFAULT_VIEWPORTS,getPlaywrightBrowserVersion,runBrowserQa,runCreativeQa} from '../../scripts/lean/native/creative-qa.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {verifyImageSignature} from '../../scripts/lean/native/assets.mjs';

const sha256=buf=>'sha256:'+createHash('sha256').update(buf).digest('hex');

test('browser-pool reuses connected browser, recovers on disconnect, and closes cleanly',async()=>{
 await closeSharedBrowser();
 let launches=0;
 const makeFake=()=>{
  let connected=true;
  const listeners=[];
  return {
   id:++launches,
   isConnected:()=>connected,
   version:()=>'fake-1.0',
   on:(ev,fn)=>{if(ev==='disconnected')listeners.push(fn);},
   async close(){connected=false;for(const fn of listeners)fn();},
   crash(){connected=false;for(const fn of listeners)fn();},
  };
 };
 const [b1,b2]=await Promise.all([getSharedBrowser(async()=>makeFake()),getSharedBrowser(async()=>makeFake())]);
 assert.equal(b1,b2);
 assert.equal(launches,1);
 const b3=await getSharedBrowser(async()=>makeFake());
 assert.equal(b3,b1);
 assert.equal(launches,1);
 // Simulate crash/disconnect
 b1.crash();
 const b4=await getSharedBrowser(async()=>makeFake());
 assert.notEqual(b4,b1);
 assert.equal(launches,2);
 await closeSharedBrowser();
 assert.equal(b4.isConnected(),false);
});

test('CREATIVE_QA_CHECKER_VERSION incorporates creative-qa.mjs, mraid-host.ts, and vendor-hosts.ts',async()=>{
 const [qa,mraid,vendor]=await Promise.all([
  readFile('scripts/lean/native/creative-qa.mjs'),
  readFile('packages/test-harness/src/mraid-host.ts'),
  readFile('packages/test-harness/src/vendor-hosts.ts'),
 ]);
 const expected='tora-creative-qa-1:'+sha256(Buffer.concat([qa,mraid,vendor]));
 assert.equal(CREATIVE_QA_CHECKER_VERSION,expected);
});

test('service.runQa -> service.export hits verifyCache deterministically and invalidates on edit or missing file',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/qa-cache-test-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root),history=new EditorState(store);
 let runnerCalls=0;
 const spyQaRunner=async({outputDir})=>{
  runnerCalls++;
  const shotsDir=resolve(outputDir,'screenshots');
  await mkdir(shotsDir,{recursive:true});
  const bytes=Buffer.from('fake-png-run-'+runnerCalls);
  await writeFile(resolve(shotsDir,'390x844-opening.png'),bytes);
  const report={
   format:CREATIVE_QA_FORMAT,ok:true,scope:'static+browser',
   summary:{blockers:0,warnings:0,viewports:[{width:390,height:844}],checkedStates:['opening'],skippedStates:[]},
   blockers:[],warnings:[],checks:{},interactions:[],states:[],
   screenshots:[{viewport:{width:390,height:844},state:'opening',path:'screenshots/390x844-opening.png',sha256:sha256(bytes)}],
  };
  await writeFile(resolve(outputDir,'report.json'),JSON.stringify(report));
  return report;
 };
 const service=new NativeService(store,history,{qaRunner:spyQaRunner,useVerifyCache:true});
 const tools=new NativeAgentTools(service);
 const id='cache-game';
 let cur=await tools.run({command:'create',id,name:'Cache Game'});
 cur=await tools.run({command:'edit',id,expected:cur.expected,scope:[],scopeCreates:true,operations:[
  {kind:'createComponent',component:{id:'btn.go',contract:'native.button.v1',transform:[1,0,0,1,100,250],parameters:{width:180,height:72}}},
  {kind:'putVariable',variable:{id:'clicks',label:'Clicks',type:'number',initial:0}},
  {kind:'putBinding',binding:{id:'go.tap',event:{kind:'click',componentId:'btn.go'},actions:[{kind:'add',variableId:'clicks',value:1}]}},
 ]});

 // First QA run misses cache
 const qa1=await service.runQa(id,{revisionId:cur.expected.revisionId,target:'unity-ads-ua-playable',outputDir:resolve(root,'manual-qa')});
 assert.equal(qa1.ok,true);
 assert.equal(qa1.cacheHit,false);
 assert.equal(runnerCalls,1);

 // Export for same revision & target hits verifyCache without re-running QA
 const exported=await service.export(id,{revisionId:cur.expected.revisionId,target:'unity-ads-ua-playable'});
 assert.equal(exported.creativeQa.cacheHit,true);
 assert.equal(runnerCalls,1);
 // Screenshot copied into export qa output dir
 const copied=await readFile(resolve(root,id,'qa',cur.expected.revisionId,'unity-ads-ua-playable','screenshots/390x844-opening.png'));
 assert.equal(copied.toString(),'fake-png-run-1');

 // Deleting referenced screenshot file invalidates cache
 await rm(resolve(root,'manual-qa','screenshots/390x844-opening.png'));
 const qa2=await service.runQa(id,{revisionId:cur.expected.revisionId,target:'unity-ads-ua-playable',outputDir:resolve(root,'manual-qa-2')});
 assert.equal(qa2.cacheHit,false);
 assert.equal(runnerCalls,2);

 // 1-byte edit creates new artifactHash and invalidates cache
 const cur2=await tools.run({command:'edit',id,expected:cur.expected,scope:['btn.go'],operations:[{kind:'setParameter',id:'btn.go',key:'width',value:181}]});
 const qa3=await service.runQa(id,{revisionId:cur2.expected.revisionId,target:'unity-ads-ua-playable',outputDir:resolve(root,'manual-qa-3')});
 assert.equal(qa3.cacheHit,false);
 assert.equal(runnerCalls,3);
});

test('runCreativeQa generates valid triage-only contact sheets while preserving full-res PNGs, and MCP batch export runs serial QA',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/qa-sheets-batch-'));
 const brief=resolve(root,'playable.md');
 await writeFile(brief,'Sheets and batch export brief.');
 const storeRoot=resolve(root,'store');
 const child=spawn(process.execPath,[resolve('scripts/lean/native/mcp-server.mjs')],{cwd:tmpdir(),env:{...process.env,TORA_PROJECT_STORE:storeRoot,TORA_PLAYABLE_BRIEF:brief},stdio:['pipe','pipe','pipe']});
 let serial=0,stderr='';const pending=new Map();child.stderr.on('data',chunk=>stderr+=chunk);
 const lines=createInterface({input:child.stdout});
 lines.on('line',line=>{const response=JSON.parse(line);const p=pending.get(response.id);if(p){pending.delete(response.id);clearTimeout(p.timer);p.resolve(response);}});
 t.after(async()=>{child.kill();lines.close();await closeSharedBrowser();await rm(root,{recursive:true,force:true});});
 const request=(method,params={})=>new Promise((res,rej)=>{const id=++serial,timer=setTimeout(()=>{pending.delete(id);rej(Error('MCP timeout: '+stderr));},90000);pending.set(id,{resolve:res,reject:rej,timer});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
 await request('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'qa-batch-test',version:'1.0'}});
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const call=(name,args={})=>request('tools/call',{name,arguments:args});
 const value=response=>{assert.equal(response.error,undefined,JSON.stringify(response));assert.notEqual(response.result.isError,true,JSON.stringify(response));return JSON.parse(response.result.content[0].text);};

 await call('tora_brief',{});
 const id='sheets-batch-proof';
 let cur=value(await call('tora_create',{id,name:'Sheets Proof'}));
 const edited=value(await call('tora_edit',{id,expected:cur.expected,scope:[],scopeCreates:true,operations:[
  {kind:'createComponent',component:{id:'bg',contract:'native.rectangle.v1',transform:[1,0,0,1,0,0],parameters:{width:390,height:700,fill:'#1d3557'}}},
  {kind:'createComponent',component:{id:'btn.play',contract:'native.button.v1',transform:[1,0,0,1,95,280],parameters:{width:200,height:80,fill:'#ffb703'}}},
  {kind:'createComponent',component:{id:'btn.label',contract:'native.text.v1',parentId:'btn.play',transform:[1,0,0,1,10,20],parameters:{width:180,height:40,text:'TAP ME',color:'#111111',fontSize:24}}},
  {kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}},
  {kind:'putBinding',binding:{id:'play.tap',event:{kind:'click',componentId:'btn.play'},actions:[{kind:'add',variableId:'score',value:1},{kind:'setComponent',componentId:'btn.label',key:'text',value:'SCORE {{score}}'}]}},
 ]}));
 assert.equal(edited.status,'COMMITTED');

 // 1. Run tora_qa via MCP (uses warm browser pool + writes contact sheets)
 const qaOut=resolve(root,'qa-out');
 const qaReport=value(await call('tora_qa',{id,output:qaOut,target:'unity-ads-ua-playable'}));
 assert.equal(qaReport.ok,true,JSON.stringify(qaReport.blockers));
 assert.equal(qaReport.screenshots.length,8);
 assert.ok(Array.isArray(qaReport.contactSheets)&&qaReport.contactSheets.length>=3);
 assert.ok(qaReport.contactSheets.every(s=>s.triageOnly===true&&s.width>0&&s.height>0));
 const allSheet=qaReport.contactSheets.find(s=>s.state==='all');
 assert.equal(allSheet.path,'screenshots/contact-sheet.png');
 const sheetBytes=await readFile(resolve(qaOut,allSheet.path));
 const verifiedSheet=verifyImageSignature(sheetBytes,'image/png');
 assert.equal(verifiedSheet.width,allSheet.width);
 assert.equal(verifiedSheet.height,allSheet.height);
 // Verify all individual full-res PNGs are intact on disk
 for(const shot of qaReport.screenshots){
  const sBytes=await readFile(resolve(qaOut,shot.path));
  const dims=verifyImageSignature(sBytes,'image/png');
  assert.equal(dims.width,shot.viewport.width);
  assert.equal(dims.height,shot.viewport.height);
 }

 // 2. Batch export 3 targets in 1 MCP call (unity should hit verifyCache!)
 const exportDir=resolve(root,'exports');
 const exported=value(await call('tora_export',{id,targets:['unity-ads-ua-playable','meta-audience-playable','tiktok-ads-playable'],outputDir:exportDir}));
 assert.equal(exported.status,'EXPORTED');
 assert.equal(exported.exports.length,3);
 assert.equal(exported.exports[0].target,'unity-ads-ua-playable');
 assert.equal(exported.exports[0].cacheHit,true,'Unity target already verified by tora_qa should hit verifyCache');
 assert.ok(exported.exports[0].output.endsWith(`${id}-unity-ads-ua-playable.html`));
 assert.ok(exported.exports[1].output.endsWith(`${id}-meta-audience-playable.html`));
 assert.ok(exported.exports[2].output.endsWith(`${id}-tiktok-ads-playable.zip`));
 for(const row of exported.exports){
  const info=await stat(row.output);
  assert.ok(info.size>0);
 }
 // Verify clean MCP shutdown on stdin EOF (closes warm browser cleanly)
 const exited=new Promise(res=>child.once('exit',code=>res(code)));
 child.stdin.end();
 const exitCode=await exited;
 assert.equal(exitCode,0);

 // Direct runCreativeQa smoke check (verify helper exists)
 assert.equal(typeof runCreativeQa,'function');
});

test('contact-sheet failure degrades to a warning without failing QA',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/sheet-warn-test-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const project={
  base:{width:390,height:700,startScene:'scene.play'},
  scenes:[{id:'scene.play',label:'Play',role:'interactive'}],
  components:[{id:'btn.go',contract:'native.button.v1',sceneId:'scene.play',order:0,transform:[1,0,0,1,100,250],parameters:{width:160,height:80,visible:true,enabled:true}}],
  assets:[],gameplay:[],variables:[{id:'score',type:'number',initial:0}],
  events:[{id:'go.click',kind:'click',componentId:'btn.go'}],
  eventBindings:[{id:'go.bind',eventId:'go.click',actions:[{kind:'add',variableId:'score',value:1}]}],
 };
 let score=0,viewport=DEFAULT_VIEWPORTS[0];
 const adapter={
  async createSession(){
   return {
    async setViewport(vp){viewport=vp;},
    async load(){score=0;},
    async screenshot(){return Buffer.from(`${viewport.width}x${viewport.height}:${score}`);},
    async auditLayout(){return {defects:[],missing:[]};},
    async getState(){return {score,time:10};},
    async getPrimaryTarget(){return {componentId:'btn.go',x:100,y:100};},
    async click(){score++;},
    async composeContactSheets(){throw Error('Simulated canvas error');},
    async close(){},
   };
  },
 };
 const report=await runBrowserQa({html:'<html></html>',project,outputDir:root,browserAdapter:adapter});
 assert.equal(report.ok,true);
 assert.equal(report.contactSheets,undefined);
 const warn=report.warnings.find(w=>w.defectKind==='contact-sheet-failed');
 assert.ok(warn,'Expected contact-sheet-failed warning');
 assert.match(warn.detail,/Simulated canvas error/);
});

test('exportBatch verifies all targets before writing files and verifyCache hits never invoke browserProvider',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/atomic-batch-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root),history=new EditorState(store);
 let qaCalls=0,browserProviderCalls=0;
 const failingRunner=async({network,outputDir})=>{
  qaCalls++;
  if(network==='tiktok-ads-playable')return {format:CREATIVE_QA_FORMAT,ok:false,blockers:[{severity:'blocker',defectKind:'simulated-failure',componentId:null,viewport:null,remediation:'fix'}],warnings:[]};
  const shotsDir=resolve(outputDir,'screenshots');await mkdir(shotsDir,{recursive:true});
  const bytes=Buffer.from('ok-'+network);await writeFile(resolve(shotsDir,'390x844-opening.png'),bytes);
  return {format:CREATIVE_QA_FORMAT,ok:true,blockers:[],warnings:[],screenshots:[{viewport:{width:390,height:844},state:'opening',path:'screenshots/390x844-opening.png',sha256:sha256(bytes)}]};
 };
 const service=new NativeService(store,history,{qaRunner:failingRunner,useVerifyCache:true,browserProvider:async()=>{browserProviderCalls++;return undefined;}});
 const tools=new NativeAgentTools(service);
 const id='atomic-export';
 let cur=await tools.run({command:'create',id,name:'Atomic Export'});
 cur=await tools.run({command:'edit',id,expected:cur.expected,scope:[],scopeCreates:true,operations:[
  {kind:'createComponent',component:{id:'btn.go',contract:'native.button.v1',transform:[1,0,0,1,100,250],parameters:{width:160,height:64}}},
  {kind:'putVariable',variable:{id:'s',label:'S',type:'number',initial:0}},
  {kind:'putBinding',binding:{id:'b',event:{kind:'click',componentId:'btn.go'},actions:[{kind:'add',variableId:'s',value:1}]}},
 ]});

 // 1. Mid-batch QA failure on 3rd target leaves zero output files in outputDir
 const outDir=resolve(root,'out');
 await assert.rejects(service.exportBatch(id,{revisionId:cur.expected.revisionId,targets:['unity-ads-ua-playable','meta-audience-playable','tiktok-ads-playable'],outputDir:outDir}),/E_CREATIVE_QA/);
 const files=await readdir(outDir).catch(()=>[]);
 assert.deepEqual(files,[],'No partial files should be written when a later target fails QA');

 // 2. Real defaultQaRunner cache hit on a fresh service instance NEVER calls browserProvider
 const pwVer=await getPlaywrightBrowserVersion();
 assert.match(pwVer,/^playwright@\d+\.\d+\.\d+:/);
 const coldService=new NativeService(store,history,{browserProvider:async()=>{browserProviderCalls++;return getSharedBrowser();}});
 // Reuse the cached passing receipt written for unity-ads-ua-playable during exportBatch above
 const cached=await coldService.runQa(id,{revisionId:cur.expected.revisionId,target:'unity-ads-ua-playable',outputDir:resolve(root,'cached-qa')});
 assert.equal(cached.cacheHit,true);
 assert.equal(qaCalls,3);
 assert.equal(browserProviderCalls,0,'Cold-session verifyCache hit must not invoke browserProvider');
});
