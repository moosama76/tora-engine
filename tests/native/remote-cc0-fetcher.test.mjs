import test from 'node:test';
import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {RemoteCc0Fetcher,assertRemoteUrl,readZipEntries} from '../../scripts/lean/native/remote-cc0-fetcher.mjs';

const publicDns=async()=>[{address:'93.184.216.34',family:4}];
const response=(body,init={})=>new globalThis.Response(body,{status:200,...init});
const table=Array.from({length:256},(_,n)=>{let value=n;for(let bit=0;bit<8;bit++)value=value&1?0xedb88320^(value>>>1):value>>>1;return value>>>0;});
function crc32(bytes){let crc=0xffffffff;for(const byte of bytes)crc=table[(crc^byte)&0xff]^(crc>>>8);return (crc^0xffffffff)>>>0;}
function zip(entries){
 const locals=[],centrals=[];let offset=0;
 for(const [name,value] of entries){
  const path=Buffer.from(name),bytes=Buffer.from(value),crc=crc32(bytes),local=Buffer.alloc(30+path.length+bytes.length);
  local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);local.writeUInt32LE(crc,14);local.writeUInt32LE(bytes.length,18);local.writeUInt32LE(bytes.length,22);local.writeUInt16LE(path.length,26);path.copy(local,30);bytes.copy(local,30+path.length);locals.push(local);
  const central=Buffer.alloc(46+path.length);central.writeUInt32LE(0x02014b50,0);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt32LE(crc,16);central.writeUInt32LE(bytes.length,20);central.writeUInt32LE(bytes.length,24);central.writeUInt16LE(path.length,28);central.writeUInt32LE(offset,42);path.copy(central,46);centrals.push(central);offset+=local.length;
 }
 const central=Buffer.concat(centrals),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(central.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...locals,central,end]);
}
async function fixture(t){
 const root=await mkdtemp(resolve('reports/remote-cc0-'));t.after(()=>rm(root,{recursive:true,force:true}));return {root,png:await readFile('fixtures/native/ding-dang-assets/cat_0.png')};
}
test('remote CC0 fetcher verifies Kenney archive license, decodes media, and reuses immutable cache',async t=>{
 const {root,png}=await fixture(t),archive=zip([['License.txt','CC0 1.0 Universal\nhttps://creativecommons.org/publicdomain/zero/1.0/'],['PNG/cat.png',png]]);let calls=0;
 const fetchImpl=async url=>{calls++;return url.endsWith('.zip')?response(archive):response('<html><title>Test cats</title><p>CC0 1.0 Universal</p><a href="https://kenney.nl/media/cats.zip">Download</a></html>');};
 const fetcher=new RemoteCc0Fetcher({cacheRoot:root,fetchImpl,lookup:publicDns}),first=await fetcher.fetchPack({sourceUrl:'https://kenney.nl/assets/cats'});
 assert.equal(first.provider,'kenney');assert.equal(first.author,'Kenney');assert.equal(first.license,'CC0-1.0');assert.equal(first.files.length,1);assert.equal(first.files[0].width>0,true);assert.match(first.files[0].sha256,/^sha256:/);assert.ok(first.archiveSha256);
 const second=await fetcher.fetchPack({sourceUrl:'https://kenney.nl/assets/cats'});assert.equal(second.cached,true);assert.equal(calls,2);assert.deepEqual(second.files[0].sha256,first.files[0].sha256);
});
test('OpenGameArt page license is machine verified before a single attachment download',async t=>{
 const {root,png}=await fixture(t);let downloaded=false;
 const fetchImpl=async url=>{if(url.endsWith('.png')){downloaded=true;return response(png);}return response('<title>CC0 cat</title><p>CC0 1.0</p><a href="https://opengameart.org/sites/default/files/cat.png">cat</a>');};
 const fetcher=new RemoteCc0Fetcher({cacheRoot:root,fetchImpl,lookup:publicDns}),receipt=await fetcher.fetchPack({sourceUrl:'https://opengameart.org/content/cc0-cat'});assert.equal(downloaded,true);assert.equal(receipt.provider,'opengameart');assert.equal(receipt.files[0].mime,'image/png');
});
test('remote origin, DNS, redirect, and streaming bounds reject unsafe sources',async t=>{
 const {root}=await fixture(t);assert.throws(()=>assertRemoteUrl('http://kenney.nl/assets/cats'),/E_REMOTE_ASSET_ORIGIN/);assert.throws(()=>assertRemoteUrl('https://localhost/asset'),/E_REMOTE_ASSET_ORIGIN/);assert.throws(()=>assertRemoteUrl('https://127.0.0.1/asset'),/E_REMOTE_ASSET_ORIGIN/);
 const redirect=new RemoteCc0Fetcher({cacheRoot:root,fetchImpl:async()=>response(null,{status:302,headers:{location:'https://example.com/file'}}),lookup:publicDns});await assert.rejects(redirect.fetchPack({sourceUrl:'https://kenney.nl/assets/cats'}),/E_REMOTE_ASSET_ORIGIN/);
 const privateDns=new RemoteCc0Fetcher({cacheRoot:root,fetchImpl:async()=>response(''),lookup:async()=>[{address:'127.0.0.1',family:4}]});await assert.rejects(privateDns.fetchPack({sourceUrl:'https://kenney.nl/assets/cats'}),/E_REMOTE_ASSET_ORIGIN/);
 const bounded=new RemoteCc0Fetcher({cacheRoot:root,fetchImpl:async()=>response(Buffer.alloc(11)),lookup:publicDns});await assert.rejects(bounded.download('https://kenney.nl/asset.png',{maxBytes:10}),/E_REMOTE_ASSET_SIZE/);
});
test('unverifiable licenses and hostile ZIP entries are rejected',async t=>{
 const {root,png}=await fixture(t);
 for(const license of ['CC BY-NC 4.0','CC BY-SA 4.0','GPL v3','All rights reserved']){
  const fetcher=new RemoteCc0Fetcher({cacheRoot:root,fetchImpl:async()=>response(`<p>${license}</p>`),lookup:publicDns});await assert.rejects(fetcher.fetchPack({sourceUrl:'https://opengameart.org/content/not-cc0'}),/E_ASSET_LICENSE_UNVERIFIED/);
 }
 assert.throws(()=>readZipEntries(zip([['../escape.png',png]])),/E_REMOTE_ASSET_ARCHIVE/);
 const bomb=zip([['License.txt','CC0 1.0'],['small.png',png]]),signature=Buffer.from('small.png'),at=bomb.indexOf(signature),centralAt=bomb.indexOf(signature,at+signature.length),entry=centralAt-46;bomb.writeUInt32LE(64_000_001,entry+24);assert.throws(()=>readZipEntries(bomb),/E_REMOTE_ASSET_ARCHIVE_LIMIT/);
});
test('offline fetch returns local CC0 fallback matches without failing the build',async t=>{
 const {root}=await fixture(t),catalog={load:async()=>{},list:()=>[{id:'catalog-local',license:'CC0-1.0'}]},fetcher=new RemoteCc0Fetcher({cacheRoot:root,catalog,lookup:publicDns,fetchImpl:async()=>{throw Error('offline');}});
 const result=await fetcher.fetchPackWithFallback({sourceUrl:'https://kenney.nl/assets/cats',fileFilter:'cat'});assert.equal(result.online,false);assert.equal(result.fallbackLocalMatches[0].id,'catalog-local');assert.match(result.warning,/local CC0/);
});
test('cache keys isolate fileFilter subsets, ZIP skips directory entries, and search keeps surviving providers',async t=>{
 const {root,png}=await fixture(t),archive=zip([['PNG/',''],['License.txt','CC0 1.0 Universal'],['PNG/cat.png',png],['PNG/dog.png',png]]);
 const fetcher=new RemoteCc0Fetcher({cacheRoot:root,lookup:publicDns,fetchImpl:async url=>{
  if(url.endsWith('.zip'))return response(archive);
  if(url.includes('kenney.nl/assets?'))return response('<a href="/assets/category:2D">Cat</a><a href="/assets/racing-pack">Racing</a><a href="/assets/racing-pack">Racing dup</a><a href="/assets/sports-pack">Sports</a>');
  if(url.includes('opengameart.org'))return response('',{status:503});
  return response('<title>Animals</title><p>CC0 1.0 Universal</p><a href="https://kenney.nl/media/animals.zip">Download</a>');
 }});
 const cats=await fetcher.fetchPack({sourceUrl:'https://kenney.nl/assets/animals',fileFilter:'cat'});
 const dogs=await fetcher.fetchPack({sourceUrl:'https://kenney.nl/assets/animals',fileFilter:'dog'});
 assert.deepEqual(cats.files.map(f=>f.name),['cat.png']);
 assert.deepEqual(dogs.files.map(f=>f.name),['dog.png']);
 const searched=await fetcher.search({query:'racing',includeRemote:true});
 assert.equal(searched.online,true);
 assert.deepEqual(searched.remotePacks.map(p=>p.sourceUrl),['https://kenney.nl/assets/racing-pack','https://kenney.nl/assets/sports-pack']);
 assert.match(searched.warning,/opengameart/);
});
