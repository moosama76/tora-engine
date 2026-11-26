import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,utimes,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {NativeBuildCache,VerificationReceiptCache,buildCacheKey} from '../../scripts/lean/native/build-cache.mjs';
import {loadCatalogSync,resetCatalogCache} from '../../scripts/lean/native/catalog-cache.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {emptyProject} from '../../scripts/lean/native/document.mjs';
import {registerSource} from '../../scripts/lean/native/assets.mjs';
import {musicAsset} from '../../scripts/lean/native/author-games.mjs';

const revision=()=> 'rev-00000000-0000-4000-8000-000000000000';
test('native builds deduplicate and preserve bytes while keys isolate content and runtime',async t=>{
 const root=await mkdtemp(resolve(tmpdir(),'tora-build-cache-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const music=musicAsset(),registered=await registerSource(resolve(root,'cache-proof'),music),delivery={...registered},project=emptyProject({id:'cache-proof',name:'Cache proof'});delete delivery.optimization;
 project.assets=[delivery];project.revisionId=revision();
 const service=new NativeService({root},{});
 const cold=await service.build('cache-proof',project),warm=await service.build('cache-proof',project);
 assert.equal(cold.cacheHit,false);assert.equal(warm.cacheHit,true);assert.equal(warm.html,cold.html);assert.deepEqual(warm.manifest,cold.manifest);
 const concurrent=new NativeBuildCache();let calls=0;
 const values=await Promise.all(Array.from({length:5},()=>concurrent.getOrBuild('one',async()=>{calls++;await new Promise(resolveDelay=>globalThis.setTimeout(resolveDelay,10));return {html:'same'};})));
 assert.equal(calls,1);assert.equal(values[0].cacheHit,false);assert.ok(values.slice(1).every(value=>value.cacheHit));assert.equal(concurrent.stats().inFlightDedupes,4);
 const runtimeHash='sha256:'+'0'.repeat(64),key=buildCacheKey({project,target:'standalone-browser-draft',runtimeHash});
 assert.notEqual(buildCacheKey({project:{...project,revisionId:'rev-other'},target:'standalone-browser-draft',runtimeHash}),key);
 assert.notEqual(buildCacheKey({project:{...project,assets:[{...registered,hash:'sha256:'+'1'.repeat(64)}]},target:'standalone-browser-draft',runtimeHash}),key);
 assert.notEqual(buildCacheKey({project,target:'unity-ads-ua-playable',runtimeHash}),key);
 assert.notEqual(buildCacheKey({project,target:'standalone-browser-draft',runtimeHash:'sha256:'+'1'.repeat(64)}),key);
 await assert.rejects(concurrent.getOrBuild('failure',async()=>{throw Error('no');}),/no/);
 assert.equal(concurrent.inFlight.has('failure'),false);
});

test('verification receipts are atomic, isolated and corruption-tolerant',async t=>{
 const root=await mkdtemp(resolve(tmpdir(),'tora-verify-cache-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const cache=new VerificationReceiptCache(root,{maxFiles:2});
 const input={artifactHash:'sha256:'+'a'.repeat(64),checkerVersion:'qa-1',kind:'creative-qa',viewport:{width:390,height:844},host:'unity',scenario:'candidate'},key=cache.receiptKey(input);
 assert.equal(await cache.read(key),null);await cache.write(key,{ok:true,screenshots:[]});assert.deepEqual(await cache.read(key),{ok:true,screenshots:[]});
 for(const field of ['checkerVersion','kind','viewport','host','scenario','artifactHash'])assert.equal(await cache.read(cache.receiptKey({...input,[field]:field==='viewport'?{width:320,height:568}:'changed'})),null,field);
 const path=cache.path(key);await writeFile(path,'{"partial"');assert.equal(await cache.read(key),null);
 await writeFile(path,JSON.stringify({format:'wrong',key,payload:{ok:true}}));assert.equal(await cache.read(key),null);
 await cache.write(cache.receiptKey({...input,scenario:'two'}),{id:2});await cache.write(cache.receiptKey({...input,scenario:'three'}),{id:3});
 assert.equal((await Promise.all([cache.read(key),cache.read(cache.receiptKey({...input,scenario:'two'}))])).filter(Boolean).length,1);
 assert.deepEqual(await cache.read(cache.receiptKey({...input,scenario:'three'})),{id:3});
});

test('catalog reads are frozen, indexed and invalidated by changed stat metadata',async t=>{
 const folder=await mkdtemp(resolve(tmpdir(),'tora-catalog-cache-')),path=resolve(folder,'catalog.json');t.after(()=>rm(folder,{recursive:true,force:true}));
 await writeFile(path,JSON.stringify({format:'tora-free-asset-catalog-1',sources:[]}));resetCatalogCache();
 const first=loadCatalogSync(path),second=loadCatalogSync(path);assert.equal(first,second);assert.ok(Object.isFrozen(first.sources));assert.ok(first.bySource instanceof Map);
 const before=await readFile(path);await writeFile(path,JSON.stringify({format:'tora-free-asset-catalog-1',sources:[{id:'changed',files:[]}]}));
 await utimes(path,new Date(),new Date(Date.now()+2000));const third=loadCatalogSync(path);
 assert.notEqual(third,first);assert.equal(third.sources[0].id,'changed');assert.ok(before.length>0);
 assert.throws(()=>{first.sources.push({});},TypeError);
});
