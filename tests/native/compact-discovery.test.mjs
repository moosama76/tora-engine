/* global URL, fetch */
import test from 'node:test';
import assert from 'node:assert/strict';
import process from 'node:process';
import {Buffer} from 'node:buffer';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {setTimeout,clearTimeout} from 'node:timers';
import {mkdtemp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {capabilities,capabilitiesForPacks,compactCapabilities} from '../../scripts/lean/native/contracts.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {nativeApi} from '../../scripts/lean/native/api.mjs';
import {materializeDemo} from '../../scripts/lean/native/demos.mjs';

const unitAbbrev={pixels:'px',seconds:'s',degrees:'deg',Hz:'Hz',normalized:'0..1','pixels / second':'px/s','pixels / second²':'px/s²','frames / second':'fps',frames:'frames',columns:'cols',count:'count',scalar:''};
const fmt=n=>Number.isInteger(n)?String(n):String(Number(n.toFixed(4)));

async function mcpClient(t){
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/compact-disc-mcp-'));
 const brief=resolve(root,'playable.md');
 await writeFile(brief,'Compact discovery test brief.');
 const child=spawn(process.execPath,[resolve('scripts/lean/native/mcp-server.mjs')],{cwd:tmpdir(),env:{...process.env,TORA_PROJECT_STORE:resolve(root,'store'),TORA_PLAYABLE_BRIEF:brief},stdio:['pipe','pipe','pipe']});
 let serial=0,stderr='';const pending=new Map();child.stderr.on('data',chunk=>stderr+=chunk);
 const lines=createInterface({input:child.stdout});
 lines.on('line',line=>{const response=JSON.parse(line);const p=pending.get(response.id);if(p){pending.delete(response.id);clearTimeout(p.timer);p.resolve(response);}});
 t.after(async()=>{child.kill();lines.close();await rm(root,{recursive:true,force:true});});
 const request=(method,params={})=>new Promise((res,rej)=>{const id=++serial,timer=setTimeout(()=>{pending.delete(id);rej(Error('MCP timeout: '+stderr));},30000);pending.set(id,{resolve:res,reject:rej,timer});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
 await request('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'compact-test',version:'1.0'}});
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const call=(name,args={})=>request('tools/call',{name,arguments:args});
 const value=response=>{assert.equal(response.error,undefined,JSON.stringify(response));assert.notEqual(response.result.isError,true,JSON.stringify(response));return JSON.parse(response.result.content[0].text);};
 return {root,brief,call,value};
}

test('compactCapabilities preserves every contract, behavior, event, action, bound, enum, and unit while shrinking >=65%',()=>{
 const full=capabilities(),compact=compactCapabilities();
 assert.equal(compact.format,'tora-creation-capabilities-compact-1');
 assert.deepEqual(Object.keys(compact.contracts).sort(),Object.keys(full.contracts).sort());
 assert.deepEqual(Object.keys(compact.behaviors).sort(),Object.keys(full.behaviors).sort());
 assert.deepEqual(compact.events,full.events);
 assert.deepEqual(compact.actions,full.actions);

 let totalUnitBearing=0,nonScalarUnitBearing=0;
 const verifyDescriptor=(encoded,desc,ctx)=>{
  assert.equal(typeof encoded,'string',ctx);
  if(desc.type==='number'){
   assert.ok(encoded.includes(`[${fmt(desc.min)}..${fmt(desc.max)}]`),`${ctx}: missing bounds in ${encoded}`);
   assert.ok(encoded.includes(`=${fmt(desc.default)}`),`${ctx}: missing default in ${encoded}`);
   if(desc.units){
    totalUnitBearing++;
    if(desc.units!=='scalar'){
     nonScalarUnitBearing++;
     const short=unitAbbrev[desc.units];
     assert.ok(short,`Unexpected unit ${desc.units}`);
     assert.ok(encoded.endsWith(' '+short),`${ctx}: expected unit "${short}" in "${encoded}"`);
    }
   }
  }else if(desc.type==='enum'){
   for(const opt of desc.options)assert.ok(encoded.includes(opt),`${ctx}: missing enum option ${opt} in ${encoded}`);
   assert.ok(encoded.includes(`'${desc.default}'`),`${ctx}: missing default in ${encoded}`);
  }
  if(desc.optional)assert.ok(encoded.includes('?'),`${ctx}: missing optional marker in ${encoded}`);
 };

 for(const [cid,contract]of Object.entries(full.contracts)){
  const merged={...compact.commonContractProps,...compact.contracts[cid].props};
  assert.deepEqual(Object.keys(merged).sort(),Object.keys(contract.properties).sort(),cid);
  for(const [k,desc]of Object.entries(contract.properties))verifyDescriptor(merged[k],desc,`${cid}.${k}`);
 }
 for(const [bid,params]of Object.entries(full.behaviors)){
  assert.deepEqual(Object.keys(compact.behaviors[bid]).sort(),Object.keys(params).sort(),bid);
  for(const [k,desc]of Object.entries(params))verifyDescriptor(compact.behaviors[bid][k],desc,`${bid}.${k}`);
 }
 assert.equal(totalUnitBearing,228,`Expected 228 unit-bearing fields, checked ${totalUnitBearing}`);
 assert.equal(nonScalarUnitBearing,98,`Expected 98 non-scalar unit-bearing fields, checked ${nonScalarUnitBearing}`);

 const fullBytes=Buffer.byteLength(JSON.stringify(full)),compactBytes=Buffer.byteLength(JSON.stringify(compact));
 const coreFullBytes=Buffer.byteLength(JSON.stringify(capabilitiesForPacks(['core']))),coreCompactBytes=Buffer.byteLength(JSON.stringify(compactCapabilities({packs:['core']})));
 const fullReduction=1-compactBytes/fullBytes,coreReduction=1-coreCompactBytes/coreFullBytes;
 assert.ok(fullReduction>=0.65,`Expected >=65% reduction on full capabilities, got ${(fullReduction*100).toFixed(1)}% (${fullBytes} -> ${compactBytes})`);
 assert.ok(coreReduction>=0.60,`Expected >=60% reduction on core capabilities, got ${(coreReduction*100).toFixed(1)}% (${coreFullBytes} -> ${coreCompactBytes})`);
});

test('tora_brief keeps documents byte-compatible, returns digests, and hash-checks alreadyRead',async t=>{
 const c=await mcpClient(t);
 const first=c.value(await c.call('tora_brief',{}));
 const winPath=resolve('skills/tora-playables/references/win-effects-and-cta.md');
 assert.deepEqual(first.documents.find(d=>d.name==='winEffectsAndCta'),{
  name:'winEffectsAndCta',path:winPath,text:await readFile(winPath,'utf8'),
 });
 assert.ok(first.digests&&typeof first.digests.playable==='string'&&first.digests.playable.startsWith('sha256:'));

 const alreadyRead=Object.entries(first.digests).map(([name,sha256])=>({name,sha256}));
 const second=c.value(await c.call('tora_brief',{alreadyRead}));
 assert.ok(second.documents.every(d=>d.omitted===true&&d.text===undefined&&d.sha256===first.digests[d.name]));
 assert.ok(Buffer.byteLength(JSON.stringify(second))<Buffer.byteLength(JSON.stringify(first))*0.2);

 // Tampered/mismatched hash always returns full text
 const tampered=alreadyRead.map(entry=>entry.name==='playable'?{name:'playable',sha256:'sha256:'+'0'.repeat(64)}:entry);
 const third=c.value(await c.call('tora_brief',{alreadyRead:tampered}));
 const playableDoc=third.documents.find(d=>d.name==='playable');
 assert.equal(playableDoc.omitted,undefined);
 assert.equal(playableDoc.text,'Compact discovery test brief.');

 // Live disk update invalidates cached digest automatically
 await writeFile(c.brief,'Updated brief content.');
 const fourth=c.value(await c.call('tora_brief',{alreadyRead}));
 const updated=fourth.documents.find(d=>d.name==='playable');
 assert.equal(updated.omitted,undefined);
 assert.equal(updated.text,'Updated brief content.');
 assert.notEqual(fourth.digests.playable,first.digests.playable);

 // MCP compact capabilities works too
 const cap=c.value(await c.call('tora_capabilities',{packs:['core'],format:'compact'}));
 assert.equal(cap.format,'tora-creation-capabilities-compact-1');
 assert.ok(cap.commonContractProps.width.includes('px'));
});

test('tora_inspect({ tree: true }) and HTTP ?tree=1 & ?format=compact provide parity and massive outline savings',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/compact-tree-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root),service=new NativeService(store,new EditorState(store)),tools=new NativeAgentTools(service);

 // Typical 24-component playable outline stays < 4 KB
 const mid=await tools.run({command:'create',id:'mid-playable',name:'Mid Playable'});
 const ops=[
  {kind:'createScene',scene:{id:'scene.end',label:'End Card',role:'end-card'}},
  {kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}},
  ...Array.from({length:20},(_,i)=>({kind:'createComponent',component:{id:`item.${i}`,contract:'native.rectangle.v1',transform:[1,0,0,1,20+i*10,100+i*15],parameters:{width:48,height:48}}})),
  {kind:'createComponent',component:{id:'cta.btn',contract:'native.button.v1',sceneId:'scene.end',transform:[1,0,0,1,95,520],parameters:{width:200,height:64}}},
  {kind:'createComponent',component:{id:'cta.label',contract:'native.text.v1',sceneId:'scene.end',parentId:'cta.btn',transform:[1,0,0,1,10,14],parameters:{width:180,height:36,text:'PLAY NOW'}}},
  {kind:'putBinding',binding:{id:'cta.store',event:{kind:'click',componentId:'cta.btn'},actions:[{kind:'store'}]}},
 ];
 await tools.run({command:'edit',id:'mid-playable',expected:mid.expected,scope:[],scopeCreates:true,operations:ops});
 const midTree=await tools.run({command:'inspect',id:'mid-playable',tree:true});
 assert.ok(Buffer.byteLength(JSON.stringify(midTree))<4096,`Expected typical playable tree < 4096 bytes, got ${Buffer.byteLength(JSON.stringify(midTree))}`);

 // Large 138-node showcase project (101 KB full) shrinks >=85% and stays <= 16 KB
 await materializeDemo(service,'mini-golf');
 const full=await tools.run({command:'inspect',id:'mini-golf',full:true});
 const tree=await tools.run({command:'inspect',id:'mini-golf',tree:true});
 const fullBytes=Buffer.byteLength(JSON.stringify(full)),treeBytes=Buffer.byteLength(JSON.stringify(tree));
 assert.ok(treeBytes<=16384,`Expected showcase tree <= 16384 bytes, got ${treeBytes}`);
 assert.ok(treeBytes<fullBytes*0.15,`Expected >=85% reduction vs full inspect (${fullBytes} -> ${treeBytes})`);
 assert.ok(tree.scenes.length>=1&&tree.scenes[0].nodes.length>0);
 assert.ok(Array.isArray(tree.assets)&&Array.isArray(tree.variables)&&Array.isArray(tree.bindings));

 // Scene filter works deterministically (end-card scene < 4 KB)
 const endScene=tree.scenes.find(s=>s.role==='end-card')??tree.scenes[0];
 const filtered=await tools.run({command:'inspect',id:'mini-golf',tree:true,sceneId:endScene.id});
 assert.equal(filtered.scenes.length,1);
 assert.equal(filtered.scenes[0].id,endScene.id);
 assert.ok(Buffer.byteLength(JSON.stringify(filtered))<4096,`Expected filtered scene tree < 4096 bytes, got ${Buffer.byteLength(JSON.stringify(filtered))}`);

 // HTTP parity checks
 const route=nativeApi(service),server=createServer((req,res)=>route(req,res,new URL(req.url,'http://localhost'),server.address().port));
 await new Promise(res=>server.listen(0,'127.0.0.1',res));
 t.after(async()=>{server.closeAllConnections();await new Promise(res=>server.close(res));});
 const origin=`http://127.0.0.1:${server.address().port}`;
 const capRes=await fetch(`${origin}/api/creation/capabilities?format=compact&packs=core`);
 assert.equal(capRes.status,200);
 const capJson=await capRes.json();
 assert.equal(capJson.format,'tora-creation-capabilities-compact-1');
 assert.deepEqual(capJson.packs,['core']);
 assert.ok(capJson.commonContractProps.width.endsWith('px'));

 const sumRes=await fetch(`${origin}/api/creation/capabilities?summary=1`);
 assert.equal(sumRes.status,200);
 assert.equal((await sumRes.json()).format,'tora-capability-summary-1');

 const treeRes=await fetch(`${origin}/api/projects/mini-golf?tree=1`);
 assert.equal(treeRes.status,200);
 const httpTree=await treeRes.json();
 assert.deepEqual(httpTree,tree);
});
