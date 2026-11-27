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
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {nativeApi} from '../../scripts/lean/native/api.mjs';
import {registerSource,readOriginal,verifyImageSignature} from '../../scripts/lean/native/assets.mjs';
import {ReviewIntake} from '../../scripts/lean/native/review-intake.mjs';
import {AssetCatalog} from '../../scripts/lean/native/asset-catalog.mjs';
import {IntakeCreatorTools} from '../../scripts/lean/native/intake-creator-tools.mjs';
import {musicAsset} from '../../scripts/lean/native/author-games.mjs';

function makeWav(freq=440){
 const rate=22050,frames=2205,buf=Buffer.alloc(44+frames*2);
 buf.write('RIFF',0);buf.writeUInt32LE(36+frames*2,4);buf.write('WAVE',8);buf.write('fmt ',12);
 buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(1,22);buf.writeUInt32LE(rate,24);
 buf.writeUInt32LE(rate*2,28);buf.writeUInt16LE(2,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(frames*2,40);
 for(let i=0;i<frames;i++)buf.writeInt16LE(Math.round(Math.sin(2*Math.PI*freq*i/rate)*8000),44+i*2);
 return buf;
}

async function mcpClient(t){
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/batch-mcp-'));
 const brief=resolve(root,'playable.md');
 await writeFile(brief,'Batch test brief.');
 const storeRoot=resolve(root,'store');
 const child=spawn(process.execPath,[resolve('scripts/lean/native/mcp-server.mjs')],{cwd:tmpdir(),env:{...process.env,TORA_PROJECT_STORE:storeRoot,TORA_PLAYABLE_BRIEF:brief},stdio:['pipe','pipe','pipe']});
 let serial=0,stderr='';const pending=new Map();child.stderr.on('data',chunk=>stderr+=chunk);
 const lines=createInterface({input:child.stdout});
 lines.on('line',line=>{const response=JSON.parse(line);const p=pending.get(response.id);if(p){pending.delete(response.id);clearTimeout(p.timer);p.resolve(response);}});
 t.after(async()=>{child.kill();lines.close();await rm(root,{recursive:true,force:true});});
 const request=(method,params={})=>new Promise((res,rej)=>{const id=++serial,timer=setTimeout(()=>{pending.delete(id);rej(Error('MCP timeout: '+stderr));},60000);pending.set(id,{resolve:res,reject:rej,timer});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
 await request('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'batch-test',version:'1.0'}});
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const call=(name,args={})=>request('tools/call',{name,arguments:args});
 const value=response=>{assert.equal(response.error,undefined,JSON.stringify(response));assert.notEqual(response.result.isError,true,JSON.stringify(response));return JSON.parse(response.result.content[0].text);};
 await call('tora_brief',{});
 return {root,storeRoot,call,value};
}

test('verifyImageSignature validates PNG/JPEG headers and rejects tampered or mismatched MIME bytes',async()=>{
 const png=await readFile('fixtures/native/ding-dang-assets/cat_0.png');
 const verified=verifyImageSignature(png,'image/png');
 assert.equal(verified.source_mime,'image/png');
 assert.ok(verified.width>0&&verified.height>0);
 assert.throws(()=>verifyImageSignature(png,'image/jpeg'),/E_NATIVE_ASSET_MIME/);
 assert.throws(()=>verifyImageSignature(Buffer.from('not an image at all 1234567890'),'image/png'),/E_NATIVE_ASSET_DECODE/);
 // Fake JPEG header without SOF
 const fakeJpeg=Buffer.from([0xff,0xd8,0xff,0xe0,0x00,0x10,0x4a,0x46,0x49,0x46,0,1,1,0,0,1,0,1,0,0,0xff,0xd9,0,0]);
 assert.throws(()=>verifyImageSignature(fakeJpeg,'image/jpeg'),/E_NATIVE_ASSET_DECODE/);
 assert.throws(()=>verifyImageSignature(fakeJpeg,'image/png'),/E_NATIVE_ASSET_MIME/);
});

test('registerSource optimize:none still rejects corrupt PNG via inspect_native',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/opt-none-check-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const png=Buffer.from(await readFile('fixtures/native/ding-dang-assets/cat_0.png'));
 // Corrupt IDAT payload after IHDR so magic header passes but full decode fails
 const corrupt=Buffer.from(png);
 corrupt.fill(0xaa,60,Math.min(corrupt.length-12,120));
 await assert.rejects(registerSource(root,{id:'bad.png',mime:'image/png',data:corrupt.toString('base64'),rights:'Fixture',optimize:'none'}),/E_NATIVE_ASSET_DECODE/);
});

test('tora_upload_assets and HTTP batch assets upload 6 mixed PNG/WAV files in 1 atomic revision',async t=>{
 const c=await mcpClient(t);
 const id='batch-upload-mcp';
 const created=c.value(await c.call('tora_create',{id,name:'Batch upload'}));
 const pngBytes=await readFile('fixtures/native/ding-dang-assets/cat_0.png');
 const wav1=makeWav(440),wav2=makeWav(660),wav3=makeWav(880);
 const files=[
  {name:'a.png',id:'img.a',mime:'image/png',bytes:pngBytes},
  {name:'b.png',id:'img.b',mime:'image/png',bytes:pngBytes},
  {name:'c.png',id:'img.c',mime:'image/png',bytes:pngBytes},
  {name:'a.wav',id:'sfx.a',mime:'audio/wav',bytes:wav1},
  {name:'b.wav',id:'sfx.b',mime:'audio/wav',bytes:wav2},
  {name:'c.wav',id:'sfx.c',mime:'audio/wav',bytes:wav3},
 ];
 const items=[];
 for(const f of files){
  const fp=resolve(c.root,f.name);
  await writeFile(fp,f.bytes);
  items.push({filePath:fp,asset:{id:f.id,mime:f.mime,rights:'Test fixture'}});
 }
 const store=new ProjectStore(c.storeRoot),history=new EditorState(store);
 const beforeJournal=await history.readRevisionJournal(id);
 const uploaded=c.value(await c.call('tora_upload_assets',{id,expected:created.expected,items}));
 assert.equal(uploaded.status,'UPLOADED');
 assert.equal(uploaded.assets.length,6);
 assert.deepEqual(uploaded.assets.map(a=>a.id),files.map(f=>f.id));
 const afterJournal=await history.readRevisionJournal(id);
 assert.equal(afterJournal.history.length,beforeJournal.history.length+1,'Batch upload must create exactly 1 revision');

 // Originals & receipts preserved
 for(const asset of uploaded.assets){
  assert.ok(asset.optimization?.originalHash);
  const orig=await readOriginal(resolve(c.storeRoot,id),asset.optimization.originalHash);
  assert.ok(orig.length>0);
  const receipt=JSON.parse(await readFile(resolve(c.storeRoot,id,'sources/assets',asset.hash.slice(7)+'.json'),'utf8'));
  assert.equal(receipt.bytes,asset.bytes);
 }

 // HTTP POST /api/projects/:id/assets with assets[] array
 const service=new NativeService(store,history);
 const route=nativeApi(service),server=createServer((req,res)=>route(req,res,new URL(req.url,'http://localhost'),server.address().port));
 await new Promise(res=>server.listen(0,'127.0.0.1',res));
 t.after(async()=>{server.closeAllConnections();await new Promise(res=>server.close(res));});
 const origin=`http://127.0.0.1:${server.address().port}`;
 const httpAssets=[
  {id:'http.png',mime:'image/png',data:pngBytes.toString('base64'),rights:'HTTP fixture'},
  {id:'http.wav',mime:'audio/wav',data:musicAsset().data,rights:'HTTP fixture'},
 ];
 const res=await fetch(`${origin}/api/projects/${id}/assets`,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({expected:uploaded.expected,assets:httpAssets})});
 assert.equal(res.status,201);
 const body=await res.json();
 assert.equal(body.assets.length,2);
 const afterHttpJournal=await history.readRevisionJournal(id);
 assert.equal(afterHttpJournal.history.length,afterJournal.history.length+1);
});

test('IntakeCreatorTools.stageAssets commits multiple catalog assets in 1 single revision',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/stage-batch-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root),history=new EditorState(store),service=new NativeService(store,history);
 const intakes=new ReviewIntake(service);
 const draft=await intakes.create({projectId:'stage-batch-game',name:'Stage Batch',brief:'Test batch staging.',studio:'Test',rights:'CC0',mechanic:'custom',assetSource:'free-licensed'});
 const catalog=await new AssetCatalog().load();
 const farmSprites=catalog.list({query:'farm',kind:'sprite',limit:4});
 assert.ok(farmSprites.length>=3);
 const tools=new IntakeCreatorTools(service,intakes,draft,{catalog});
 await tools.ensureDraft();
 const before=(await history.readRevisionJournal('stage-batch-game')).history.length;
 const staged=await tools.stageAssets({catalogAssetIds:farmSprites.map(s=>s.id)});
 assert.equal(staged.staged.length,farmSprites.length);
 const after=(await history.readRevisionJournal('stage-batch-game')).history.length;
 assert.equal(after,before+1,'stageAssets must commit all assets in 1 revision');
});

test('edit supports commitPreviewDigest with strict scope enforcement and reference-safe scopeCreates',async t=>{
 await mkdir('reports',{recursive:true});
 const root=await mkdtemp(resolve('reports/edit-scope-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root),service=new NativeService(store,new EditorState(store)),tools=new NativeAgentTools(service);
 const id='edit-safety';
 let cur=await tools.run({command:'create',id,name:'Edit Safety'});

 // Reject neither or both operations and commitPreviewDigest
 await assert.rejects(tools.run({command:'edit',id,expected:cur.expected,scope:[]}),/E_AGENT_ARGUMENT/);
 await assert.rejects(tools.run({command:'edit',id,expected:cur.expected,operations:[],commitPreviewDigest:'sha256:'+'0'.repeat(64),scope:[]}),/E_AGENT_ARGUMENT/);

 // 1. scopeCreates:true auto-allows brand-new self-contained records
 const initOps=[
  {kind:'createComponent',component:{id:'btn.play',contract:'native.button.v1',transform:[1,0,0,1,100,200],parameters:{width:160,height:64}}},
  {kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}},
  {kind:'putBinding',binding:{id:'btn.tap',event:{kind:'click',componentId:'btn.play'},actions:[{kind:'add',variableId:'score',value:1}]}},
 ];
 cur=await tools.run({command:'edit',id,expected:cur.expected,operations:initOps,scope:[],scopeCreates:true});
 assert.equal(cur.status,'COMMITTED');

 // 2. scopeCreates:true REJECTS (PREVIEW) when a new behavior references a pre-existing component not in scope
 const attachBehavior=[{kind:'putBehavior',behavior:{id:'beh.press',componentId:'btn.play',kind:'press-feedback',parameters:{scaleDown:0.9,springBackSeconds:0.15,liftShadow:true}}}];
 const previewBeh=await tools.run({command:'edit',id,expected:cur.expected,operations:attachBehavior,scope:[],scopeCreates:true});
 assert.equal(previewBeh.status,'PREVIEW');
 assert.ok(previewBeh.outsideScope.includes('beh.press'));

 // 3. commitPreviewDigest enforces scope — omitting changed/target IDs stays PREVIEW
 const stillPreview=await tools.run({command:'edit',id,expected:cur.expected,commitPreviewDigest:previewBeh.previewDigest,scope:[]});
 assert.equal(stillPreview.status,'PREVIEW');
 assert.ok(stillPreview.outsideScope.includes('beh.press'));

 // 4. commitPreviewDigest commits cleanly once scope includes the required ID (or existing target + scopeCreates:true)
 const committedBeh=await tools.run({command:'edit',id,expected:cur.expected,commitPreviewDigest:previewBeh.previewDigest,scope:['btn.play'],scopeCreates:true});
 assert.equal(committedBeh.status,'COMMITTED');

 // 5. Stale digest / stale revision rejected
 await assert.rejects(tools.run({command:'edit',id,expected:committedBeh.expected,commitPreviewDigest:previewBeh.previewDigest,scope:['beh.press']}),/E_NATIVE_PREVIEW_STALE/);
 await assert.rejects(tools.run({command:'edit',id,expected:cur.expected,commitPreviewDigest:previewBeh.previewDigest,scope:['beh.press']}),/E_NATIVE_STALE/);
 cur=committedBeh;

 // 6. scopeCreates:true REJECTS new click binding targeting pre-existing component not in scope
 const attachBinding=[{kind:'putBinding',binding:{id:'btn.extra',event:{kind:'click',componentId:'btn.play'},actions:[{kind:'add',variableId:'score',value:2}]}}];
 const previewBind=await tools.run({command:'edit',id,expected:cur.expected,operations:attachBinding,scope:[],scopeCreates:true});
 assert.equal(previewBind.status,'PREVIEW');
 assert.ok(previewBind.outsideScope.includes('btn.extra.event'));

 // 7. scopeCreates:true REJECTS unscoped edit to existing component or $project.base
 const editExisting=await tools.run({command:'edit',id,expected:cur.expected,operations:[{kind:'setParameter',id:'btn.play',key:'width',value:190}],scope:[],scopeCreates:true});
 assert.equal(editExisting.status,'PREVIEW');
 assert.deepEqual(editExisting.outsideScope,['btn.play']);
 const editBase=await tools.run({command:'edit',id,expected:cur.expected,operations:[{kind:'setStore',url:'https://play.google.com/store/apps/details?id=com.example.updated'}],scope:[],scopeCreates:true});
 assert.equal(editBase.status,'PREVIEW');
 assert.deepEqual(editBase.outsideScope,['$project.base']);

 // Commit base edit via commitPreviewDigest with explicit $project.base scope
 const committedBase=await tools.run({command:'edit',id,expected:cur.expected,commitPreviewDigest:editBase.previewDigest,scope:['$project.base']});
 assert.equal(committedBase.status,'COMMITTED');
});
