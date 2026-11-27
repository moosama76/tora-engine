import test from 'node:test';
import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {createMcpServer} from '../../scripts/lean/native/mcp-server.mjs';
import {RemoteCc0Fetcher} from '../../scripts/lean/native/remote-cc0-fetcher.mjs';
import {exportProjectFile} from '../../scripts/lean/native/local-bundle.mjs';
import {createEditorServer} from '../../scripts/lean/editor.mjs';

const publicDns=async()=>[{address:'93.184.216.34',family:4}];
const response=(body,init={})=>new globalThis.Response(body,{status:200,...init});
const crcTable=Array.from({length:256},(_,n)=>{let v=n;for(let b=0;b<8;b++)v=v&1?0xedb88320^(v>>>1):v>>>1;return v>>>0;});
function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&0xff]^(c>>>8);return (c^0xffffffff)>>>0;}
function makeZip(entries){
 const locals=[],centrals=[];let offset=0;
 for(const [name,value]of entries){
  const path=Buffer.from(name),bytes=Buffer.from(value),crc=crc32(bytes),local=Buffer.alloc(30+path.length+bytes.length);
  local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);local.writeUInt32LE(crc,14);local.writeUInt32LE(bytes.length,18);local.writeUInt32LE(bytes.length,22);local.writeUInt16LE(path.length,26);path.copy(local,30);bytes.copy(local,30+path.length);locals.push(local);
  const central=Buffer.alloc(46+path.length);central.writeUInt32LE(0x02014b50,0);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt32LE(crc,16);central.writeUInt32LE(bytes.length,20);central.writeUInt32LE(bytes.length,24);central.writeUInt16LE(path.length,28);central.writeUInt32LE(offset,42);path.copy(central,46);centrals.push(central);offset+=local.length;
 }
 const central=Buffer.concat(centrals),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(central.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...locals,central,end]);
}

function makeUncompressedPng(width,height,pixelFn){
 const {deflateSync}=globalThis.process.getBuiltinModule('node:zlib');
 const raw=Buffer.alloc((width*4+1)*height);
 for(let y=0;y<height;y++){
  const row=y*(width*4+1);
  raw[row]=0;
  for(let x=0;x<width;x++){
   const [r,g,b,a]=pixelFn(x,y);
   const i=row+1+x*4;
   raw[i]=r;raw[i+1]=g;raw[i+2]=b;raw[i+3]=a;
  }
 }
 const chunk=(type,data)=>{
  const len=Buffer.alloc(4);len.writeUInt32BE(data.length,0);
  const t=Buffer.from(type,'ascii');
  const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([t,data])),0);
  return Buffer.concat([len,t,data,crc]);
 };
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width,0);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw,{level:0})),chunk('IEND',Buffer.alloc(0))]);
}

async function mcpSession(server){
 await server.dispatch({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-11-25'}});
 await server.dispatch({jsonrpc:'2.0',method:'notifications/initialized'});
 let seq=10;
 return async(name,args={})=>{
  const res=await server.dispatch({jsonrpc:'2.0',id:++seq,method:'tools/call',params:{name,arguments:args}});
  return {isError:Boolean(res.result?.isError),value:JSON.parse(res.result.content[0].text)};
 };
}

test('RemoteCc0Fetcher assigns stable packKey styleFamily across fileFilter fetches, binds cache to source evidence, and optimizes >700KB PNG without ffmpeg',async t=>{
 const ws=await mkdtemp(resolve('/tmp/tora-cc0-remote-'));
 t.after(()=>rm(ws,{recursive:true,force:true}));
 const png=await readFile('fixtures/native/ding-dang-assets/cat_0.png');
 // Build an uncompressed >700 KB PNG to prove Rust optimization handles it without ffmpeg!
 const bigPng=makeUncompressedPng(450,450,(x,y)=>[(x*3)&255,(y*5)&255,((x+y)*2)&255,255]);
 assert.ok(bigPng.length>700_000,`fixture must exceed 700 KB, got ${bigPng.length}`);

 const archive=makeZip([
  ['License.txt','CC0 1.0 Universal\nhttps://creativecommons.org/publicdomain/zero/1.0/'],
  ['PNG/cat.png',png],
  ['PNG/dog.png',png],
  ['PNG/big_bg.png',bigPng],
 ]);
 const pageHtml='<html><title>Kenney Animals</title><p>CC0 1.0 Universal</p><a href="https://kenney.nl/media/animals.zip">Download</a></html>';
 const fetcher=new RemoteCc0Fetcher({
  workspaceRoot:ws,
  lookup:publicDns,
  fetchImpl:async url=>url.endsWith('.zip')?response(archive):response(pageHtml),
 });

 const cats=await fetcher.fetchPack({sourceUrl:'https://kenney.nl/assets/animals',fileFilter:'cat'});
 const dogs=await fetcher.fetchPack({sourceUrl:'https://kenney.nl/assets/animals',fileFilter:'dog'});
 const bg=await fetcher.fetchPack({sourceUrl:'https://kenney.nl/assets/animals',fileFilter:'big_bg'});

 // Distinct cache keys, IDENTICAL pack sourceId and styleFamily across filtered fetches!
 assert.notEqual(cats.cacheKey,dogs.cacheKey);
 assert.equal(cats.sourceId,dogs.sourceId);
 assert.equal(cats.files[0].styleFamily,dogs.files[0].styleFamily);
 assert.equal(bg.files.length,1);
 assert.ok(bg.files[0].bytes<=700_000,'oversized PNG optimized under 700 KB without ffmpeg');

 // Cross-session listCached discovers all three files.
 const cachedList=await fetcher.listCached({query:'kenney'});
 assert.equal(cachedList.length,3);

 // Tampering with author or sourceUrl inside receipt.json causes cached() to reject!
 const receiptPath=resolve(fetcher.cacheRoot,cats.cacheKey,'receipt.json');
 const originalReceipt=await readFile(receiptPath,'utf8');
 const tamperedAuthor=JSON.parse(originalReceipt);
 tamperedAuthor.author='Spoofed Author';
 await writeFile(receiptPath,JSON.stringify(tamperedAuthor));
 assert.equal(await fetcher.cached(cats.cacheKey),null);

 const tamperedUrl=JSON.parse(originalReceipt);
 tamperedUrl.sourceUrl='https://kenney.nl/assets/other-pack';
 await writeFile(receiptPath,JSON.stringify(tamperedUrl));
 assert.equal(await fetcher.cached(cats.cacheKey),null);

 // Restoring receipt passes; tampering with page.html fails!
 await writeFile(receiptPath,originalReceipt);
 assert.ok(await fetcher.cached(cats.cacheKey));
 await writeFile(resolve(fetcher.cacheRoot,cats.cacheKey,'page.html'),'<html><p>All rights reserved</p></html>');
 assert.equal(await fetcher.cached(cats.cacheKey),null);
});

test('MCP tora_prep_assets binds provenance into tora_upload_assets, survives export, and enforces single visual styleFamily',async t=>{
 const ws=await mkdtemp(resolve('/tmp/tora-mcp-prep-'));
 t.after(()=>rm(ws,{recursive:true,force:true}));
 const server=createMcpServer({workspaceRoot:ws});
 t.after(()=>server.close());
 const call=await mcpSession(server);

 assert.equal((await call('tora_brief',{})).isError,false);
 const listRes=await call('tora_list_assets',{kind:'sprite'});
 assert.equal(listRes.isError,false);
 const racingSprite=listRes.value.assets.find(a=>a.styleFamily==='kenney-racing-pack');
 const otherFamilySprite=listRes.value.assets.find(a=>a.styleFamily!==racingSprite.styleFamily);
 const audioList=await call('tora_list_assets',{kind:'audio'});
 const sfxAsset=audioList.value.assets[0];
 assert.ok(racingSprite&&otherFamilySprite&&sfxAsset,'local catalog has >=2 visual style families and audio');

 // Create a local 2x2 studio sprite sheet inside the workspace to test sliceGrid + trim + strip mode.
 const sheetPng=makeUncompressedPng(32,32,(x,y)=>{
  const inCell0=x>=2&&x<10&&y>=2&&y<10;
  const inCell1=x>=18&&x<26&&y>=2&&y<10;
  if(inCell0)return [240,60,40,255];
  if(inCell1)return [40,180,240,255];
  return [0,0,0,0];
 });
 const sheetPath=resolve(ws,'sheet.png');
 await writeFile(sheetPath,sheetPng);

 // Prep both: (1) a verified CC0 racing sprite with trim+maxSide, and (2) the local 2x2 sheet sliced into frames + strip.
 const preppedCc0=await call('tora_prep_assets',{
  items:[
   {sourceId:racingSprite.id,outputPrefix:'racer',trim:true,paddingPx:1,maxSide:96},
   {filePath:'sheet.png',outputPrefix:'hero-frames',rights:'Studio test sheet',styleFamily:'studio-sheet-family',sliceGrid:{cols:2,rows:2,trimCells:true,skipEmpty:true,outputMode:'frames'}},
   {filePath:'sheet.png',outputPrefix:'hero-strip',rights:'Studio test sheet',styleFamily:'studio-sheet-family',sliceGrid:{cols:2,rows:2,trimCells:true,skipEmpty:true,outputMode:'strip'}},
  ],
 });
 assert.equal(preppedCc0.isError,false,JSON.stringify(preppedCc0.value));
 const racerOut=preppedCc0.value.outputs.find(o=>o.file==='racer.png');
 const frameOuts=preppedCc0.value.outputs.filter(o=>o.file.startsWith('hero-frames_'));
 const stripOut=preppedCc0.value.outputs.find(o=>o.file==='hero-strip.png');
 assert.ok(racerOut&&racerOut.width<=96&&racerOut.styleFamily==='kenney-racing-pack');
 assert.equal(frameOuts.length,2);
 assert.equal(stripOut.width,16);
 assert.equal(stripOut.height,8);

 // Create project & upload the prepared CC0 sprite via tora_upload_assets.
 const created=await call('tora_create',{id:'prep-prov',name:'Prep Provenance Test'});
 assert.equal(created.isError,false);

 // First verify that tampering with a prepared file fails closed with E_PREP_PROVENANCE_MISMATCH!
 const tamperedCopy=resolve(ws,frameOuts[0].filePath);
 const origFrameBytes=await readFile(tamperedCopy);
 await writeFile(tamperedCopy,Buffer.concat([origFrameBytes,Buffer.from([0])]));
 const tamperReject=await call('tora_upload_assets',{
  id:'prep-prov',
  expected:created.value.expected,
  items:[{filePath:frameOuts[0].filePath,asset:{id:'bad-frame',mime:'image/png',rights:'Studio'}}],
 });
 assert.equal(tamperReject.isError,true);
 assert.equal(tamperReject.value.code,'E_PREP_PROVENANCE_MISMATCH');

 // Now upload the untampered prepared CC0 racing sprite — provenance must bind automatically!
 const uploaded=await call('tora_upload_assets',{
  id:'prep-prov',
  expected:created.value.expected,
  items:[{filePath:racerOut.filePath,asset:{id:'racer-trimmed',mime:'image/png',rights:'Placeholder rights overridden by CC0 receipt'}}],
 });
 assert.equal(uploaded.isError,false,JSON.stringify(uploaded.value));
 const savedAsset=uploaded.value.assets[0];
 const parsedProv=JSON.parse(savedAsset.provenance);
 assert.equal(parsedProv.origin,'local-cc0');
 assert.equal(parsedProv.styleFamily,'kenney-racing-pack');
 assert.equal(parsedProv.preparedFrom,racerOut.sourceHash);
 assert.ok(Array.isArray(parsedProv.prepOperations)&&parsedProv.prepOperations.length>=2);
 assert.match(savedAsset.rights,/Kenney.*CC0-1\.0/);

 // Provenance survives project export (.tora.json)!
 const exportedBundle=JSON.parse(await exportProjectFile(server.service,'prep-prov'));
 const exportedAsset=exportedBundle.project.assets.find(a=>a.id==='racer-trimmed');
 assert.equal(JSON.parse(exportedAsset.provenance).styleFamily,'kenney-racing-pack');
 assert.equal(JSON.parse(exportedAsset.provenance).preparedFrom,racerOut.sourceHash);

 // Staging a sprite from a SECOND visual styleFamily must be rejected with E_ASSET_STYLE_FAMILY!
 const wrongFamily=await call('tora_stage_cc0_assets',{
  id:'prep-prov',
  expected:uploaded.value.expected,
  items:[{sourceId:otherFamilySprite.id,assetId:'clash-sprite'}],
 });
 assert.equal(wrongFamily.isError,true);
 assert.equal(wrongFamily.value.code,'E_ASSET_STYLE_FAMILY');

 // Staging audio from a separate compatible CC0 audio pack MUST succeed!
 const audioStage=await call('tora_stage_cc0_assets',{
  id:'prep-prov',
  expected:uploaded.value.expected,
  items:[{sourceId:sfxAsset.id,assetId:'tap-sfx'}],
 });
 assert.equal(audioStage.isError,false,JSON.stringify(audioStage.value));
 assert.equal(audioStage.value.status,'STAGED');
});

test('HTTP API exposes parity routes for /api/assets/catalog, /api/assets/prep, and /api/projects/:id/stage-cc0',async t=>{
 const ws=await mkdtemp(resolve('/tmp/tora-http-cc0-'));
 t.after(()=>rm(ws,{recursive:true,force:true}));
 const store=new ProjectStore(resolve(ws,'.tora/native-projects'),{workspaceRoot:ws});
 const server=await createEditorServer({store,port:0});
 t.after(()=>new Promise(done=>{server.closeAllConnections();server.close(done);}));
 const base=`http://127.0.0.1:${server.address().port}`;
 const headers={'content-type':'application/json',origin:base};

 const catRes=await globalThis.fetch(`${base}/api/assets/catalog?kind=sprite&limit=5`);
 assert.equal(catRes.status,200);
 const catJson=await catRes.json();
 assert.ok(catJson.assets.length>=1);
 const sprite=catJson.assets[0];

 const prepRes=await globalThis.fetch(`${base}/api/assets/prep`,{
  method:'POST',headers,
  body:JSON.stringify({items:[{sourceId:sprite.id,outputPrefix:'http-prepped',trim:true}]}),
 });
 assert.equal(prepRes.status,200);
 const prepJson=await prepRes.json();
 assert.equal(prepJson.status,'PREPARED');
 assert.equal(prepJson.outputs.length,1);

 const createRes=await globalThis.fetch(`${base}/api/projects`,{
  method:'POST',headers,
  body:JSON.stringify({id:'http-cc0',name:'HTTP CC0'}),
 });
 assert.equal(createRes.status,201);
 const created=await createRes.json();

 const stageRes=await globalThis.fetch(`${base}/api/projects/http-cc0/stage-cc0`,{
  method:'POST',headers,
  body:JSON.stringify({expected:{revisionId:created.revisionId,contentHash:created.contentHash},items:[{sourceId:sprite.id,assetId:'http-sprite'}]}),
 });
 assert.equal(stageRes.status,201);
 const staged=await stageRes.json();
 assert.equal(staged.assets[0].id,'http-sprite');
 assert.ok(JSON.parse(staged.assets[0].provenance).styleFamily);

 // Verify NativeService + EditorState keep store isolated to ws.
 const svc=new NativeService(store,new EditorState(store));
 const head=await svc.read('http-cc0');
 assert.equal(head.project.assets.length,1);
 assert.equal(dirname(resolve(ws,prepJson.outputs[0].filePath)).startsWith(resolve(ws,'.tora/prepared-assets')),true);
});
