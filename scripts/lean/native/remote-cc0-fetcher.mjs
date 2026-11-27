/* global AbortController */
import {Buffer} from 'node:buffer';
import {execFile} from 'node:child_process';
import {createHash,randomUUID} from 'node:crypto';
import {mkdir,mkdtemp,readdir,readFile,rename,rm,writeFile} from 'node:fs/promises';
import {lookup as dnsLookup} from 'node:dns/promises';
import {isIP} from 'node:net';
import {resolve,extname} from 'node:path';
import {URL} from 'node:url';
import {setTimeout,clearTimeout} from 'node:timers';
import {promisify} from 'node:util';
import {inflateRawSync} from 'node:zlib';
import {registerSource,safeFile} from './assets.mjs';
import {AssetCatalog,inspectMedia} from './asset-catalog.mjs';
import {assertStorePath} from './store-path.mjs';
import {PACKAGE_ROOT,resolveRemoteCacheRoot} from '../runtime-paths.mjs';

const run=promisify(execFile);
const maxZipBytes=25_000_000,maxSingleBytes=2_000_000,maxUncompressedBytes=64_000_000;
const mediaExtensions=new Map([['.png','image/png'],['.jpg','image/jpeg'],['.jpeg','image/jpeg'],['.wav','audio/wav'],['.mp3','audio/mpeg'],['.ogg','audio/ogg']]);
const crcTable=Array.from({length:256},(_,n)=>{
 let value=n;for(let bit=0;bit<8;bit++)value=value&1?0xedb88320^(value>>>1):value>>>1;return value>>>0;
});
function crc32(bytes){
 let crc=0xffffffff;for(const byte of bytes)crc=crcTable[(crc^byte)&0xff]^(crc>>>8);return (crc^0xffffffff)>>>0;
}
function sha256Hex(value){return createHash('sha256').update(value).digest('hex');}
function sha256Prefixed(value){return 'sha256:'+sha256Hex(value);}
function remoteId(value){return 'remote-'+sha256Hex(value).slice(0,32);}
function computePackKey(sourceHref){return sha256Hex(sourceHref);}
function computeCacheKey(sourceHref,packId,fileFilter){return sha256Hex(sourceHref+'\0'+(packId??'')+'\0'+JSON.stringify(fileFilter??''));}
function cleanPath(name){
 if(!name||name.length>512||name.includes('\0')||name.includes('\\')||name.startsWith('/')||/^[a-z]:/i.test(name))throw Error('E_REMOTE_ASSET_ARCHIVE');
 const parts=name.split('/');if(parts.some(part=>part==='..'||part===''))throw Error('E_REMOTE_ASSET_ARCHIVE');
 return parts.join('/');
}
export function readZipEntries(archive,entryFilter){
 if(archive.length<22||archive.length>maxZipBytes)throw Error('E_REMOTE_ASSET_ARCHIVE');
 let eocd=-1;
 for(let offset=archive.length-22;offset>=Math.max(0,archive.length-65_557);offset--){
  if(archive.readUInt32LE(offset)===0x06054b50){eocd=offset;break;}
 }
 if(eocd<0)throw Error('E_REMOTE_ASSET_ARCHIVE');
 const count=archive.readUInt16LE(eocd+10),centralSize=archive.readUInt32LE(eocd+12),centralOffset=archive.readUInt32LE(eocd+16);
 if(count>2000||count===0xffff||centralOffset===0xffffffff||centralSize===0xffffffff||centralOffset+centralSize>eocd)throw Error('E_REMOTE_ASSET_ARCHIVE_LIMIT');
 const entries=[];let offset=centralOffset,total=0;
 for(let index=0;index<count;index++){
  if(offset+46>archive.length||archive.readUInt32LE(offset)!==0x02014b50)throw Error('E_REMOTE_ASSET_ARCHIVE');
  const flags=archive.readUInt16LE(offset+8),method=archive.readUInt16LE(offset+10),expectedCrc=archive.readUInt32LE(offset+16),compressedSize=archive.readUInt32LE(offset+20),uncompressedSize=archive.readUInt32LE(offset+24);
  const nameLength=archive.readUInt16LE(offset+28),extraLength=archive.readUInt16LE(offset+30),commentLength=archive.readUInt16LE(offset+32),externalAttributes=archive.readUInt32LE(offset+38),localOffset=archive.readUInt32LE(offset+42);
  if(offset+46+nameLength+extraLength+commentLength>archive.length||compressedSize===0xffffffff||uncompressedSize===0xffffffff||localOffset===0xffffffff)throw Error('E_REMOTE_ASSET_ARCHIVE_LIMIT');
  const rawName=archive.toString('utf8',offset+46,offset+46+nameLength);
  const unixMode=(externalAttributes>>>16)&0xffff;
  if(flags&1||![0,8].includes(method)||(unixMode&0o170000)===0o120000)throw Error('E_REMOTE_ASSET_ARCHIVE');
  total+=uncompressedSize;if(total>maxUncompressedBytes)throw Error('E_REMOTE_ASSET_ARCHIVE_LIMIT');
  offset+=46+nameLength+extraLength+commentLength;
  const trimmed=rawName.replace(/\/+$/,'');
  if(!trimmed&&rawName.endsWith('/')&&uncompressedSize===0)continue;
  const name=cleanPath(trimmed);
  if(rawName.endsWith('/')&&uncompressedSize===0)continue;
  entries.push({name,flags,method,expectedCrc,compressedSize,uncompressedSize,localOffset});
 }
 const selected=entryFilter?entries.filter(entry=>entryFilter(entry.name)):entries;
 return selected.map(entry=>{
  if(entry.localOffset+30>archive.length||archive.readUInt32LE(entry.localOffset)!==0x04034b50)throw Error('E_REMOTE_ASSET_ARCHIVE');
  const start=entry.localOffset+30+archive.readUInt16LE(entry.localOffset+26)+archive.readUInt16LE(entry.localOffset+28),end=start+entry.compressedSize;
  if(end>archive.length)throw Error('E_REMOTE_ASSET_ARCHIVE');
  let bytes;
  try{bytes=entry.method===0?archive.subarray(start,end):inflateRawSync(archive.subarray(start,end),{maxOutputLength:entry.uncompressedSize+1});}catch{throw Error('E_REMOTE_ASSET_ARCHIVE');}
  if(bytes.length!==entry.uncompressedSize||crc32(bytes)!==entry.expectedCrc)throw Error('E_REMOTE_ASSET_ARCHIVE');
  return {...entry,bytes};
 });
}
function privateAddress(address){
 if(address==='::'||address==='::1'||address==='0.0.0.0')return true;
 const normalized=address.toLowerCase().split('%')[0];
 if(/^f[cd]/.test(normalized)||/^fe[89ab]/.test(normalized)||normalized.startsWith('::ffff:127.')||normalized.startsWith('::ffff:10.')||normalized.startsWith('::ffff:192.168.'))return true;
 const mapped=/^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(normalized);if(mapped)return privateAddress(mapped[1]);
 const parts=normalized.split('.').map(Number);if(parts.length!==4||parts.some(part=>!Number.isInteger(part)||part<0||part>255))return false;
 const [a,b]=parts;return a===0||a===10||a===127||a>=224||a===100&&b>=64&&b<=127||a===169&&b===254||a===172&&b>=16&&b<=31||a===192&&b===168||a===198&&(b===18||b===19)||a===192&&b===0||a===198&&b===51||a===203&&b===0;
}
export function assertRemoteUrl(value){
 let url;try{url=new URL(value);}catch{throw Error('E_REMOTE_ASSET_ORIGIN');}
 const host=url.hostname.toLowerCase();
 const allowed=url.protocol==='https:'&&!url.username&&!url.password&&(host==='kenney.nl'||host.endsWith('.kenney.nl')||host==='opengameart.org'||host.endsWith('.opengameart.org'));
 if(!allowed||isIP(host))throw Error('E_REMOTE_ASSET_ORIGIN');
 return url;
}
function htmlText(html,pattern){const match=pattern.exec(html);return match?.[1]?.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim();}
function links(html,base){
 return [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map(match=>{
  try{return new URL(match[1].replace(/&amp;/g,'&'),base).href;}catch{return null;}
 }).filter(Boolean);
}
function verifyCc0Evidence(text){
 if(!/CC0(?:\s|&nbsp;|<|\/|-)*1\.0|CC0 1\.0 Universal|Creative Commons Zero|public domain/i.test(text)||/(?:NonCommercial|Non-Commercial|CC BY-NC|CC BY-SA|CC BY-ND|GNU GPL|GPL v\d)/i.test(text))throw Error('E_ASSET_LICENSE_UNVERIFIED');
}
function mimeFor(path){return mediaExtensions.get(extname(path).toLowerCase());}
function fileMatches(path,filter){
 if(!filter)return true;const values=Array.isArray(filter)?filter:[filter];return values.some(value=>path.toLowerCase().includes(String(value).toLowerCase().slice(0,128)));
}
function deriveAuthor(provider,pageHtml){
 return provider==='kenney'?'Kenney':htmlText(pageHtml,/(?:submitted by|author)[\s\S]{0,200}?>([A-Za-z0-9 _.-]{2,80})</i)??'OpenGameArt contributor';
}

export class RemoteCc0Fetcher{
 constructor({root,workspaceRoot,cacheRoot,fetchImpl=globalThis.fetch,lookup=async host=>dnsLookup(host,{all:true,verbatim:true}),catalog}={}){
  const catalogRoot=root??PACKAGE_ROOT;
  this.cacheRoot=resolve(cacheRoot??(root?resolve(root,'.tora/remote-asset-cache'):resolveRemoteCacheRoot(workspaceRoot)));
  this.fetchImpl=fetchImpl;this.lookup=lookup;this.catalog=catalog??new AssetCatalog({root:catalogRoot});
 }
 async assertPublicHost(url){
  let addresses;try{addresses=await this.lookup(url.hostname);}catch{throw Error('E_REMOTE_ASSET_FETCH');}
  if(!Array.isArray(addresses))addresses=[{address:addresses.address??addresses,family:addresses.family}];
  if(!addresses.length||addresses.some(item=>privateAddress(item.address)))throw Error('E_REMOTE_ASSET_ORIGIN');
 }
 async download(value,{maxBytes=maxSingleBytes,signal}={}){
  let url=assertRemoteUrl(value);const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15_000);
  const abort=()=>controller.abort();signal?.addEventListener('abort',abort,{once:true});
  try{
   for(let redirects=0;redirects<=5;redirects++){
    await this.assertPublicHost(url);
    let response;try{response=await this.fetchImpl(url.href,{redirect:'manual',signal:controller.signal,headers:{'User-Agent':'Tora-CC0-Asset-Fetcher/1.0'}});}catch(error){if(signal?.aborted)throw Error('E_BUILD_CANCELLED',{cause:error});throw Error(error.name==='AbortError'?'E_REMOTE_ASSET_TIMEOUT':'E_REMOTE_ASSET_FETCH',{cause:error});}
    if([301,302,303,307,308].includes(response.status)){
     const location=response.headers.get('location');await response.body?.cancel().catch(()=>{});
     if(!location||redirects===5)throw Error('E_REMOTE_ASSET_ORIGIN');url=assertRemoteUrl(new URL(location,url).href);continue;
    }
    if(!response.ok){await response.body?.cancel().catch(()=>{});throw Error('E_REMOTE_ASSET_FETCH');}
    const declared=Number(response.headers.get('content-length')??0);if(declared>maxBytes){await response.body?.cancel().catch(()=>{});throw Error('E_REMOTE_ASSET_SIZE');}
    const chunks=[];let size=0;
    try{
     for await(const chunk of response.body){size+=chunk.length;if(size>maxBytes){await response.body.cancel().catch(()=>{});throw Error('E_REMOTE_ASSET_SIZE');}chunks.push(chunk);}
    }catch(error){if(error.message==='E_REMOTE_ASSET_SIZE')throw error;throw Error('E_REMOTE_ASSET_FETCH',{cause:error});}
    return {bytes:Buffer.concat(chunks),contentType:response.headers.get('content-type')??'',finalUrl:url.href};
   }
   throw Error('E_REMOTE_ASSET_ORIGIN');
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
 }
 async cached(key){
  if(typeof key!=='string'||!/^[a-f0-9]{64}$/.test(key))return null;
  try{await assertStorePath(this.cacheRoot);}catch{return null;}
  let receipt;try{receipt=JSON.parse((await safeFile(resolve(this.cacheRoot,key,'receipt.json'))).toString('utf8'));}catch{return null;}
  if(receipt?.format!=='tora-remote-cc0-1'||receipt.license!=='CC0-1.0'||!Array.isArray(receipt.files))return null;
  try{
   const source=assertRemoteUrl(receipt.sourceUrl);
   const expectedCacheKey=computeCacheKey(source.href,receipt.packId??'',receipt.fileFilter??'');
   if(expectedCacheKey!==key)return null;
   const expectedPackKey=computePackKey(source.href);
   const expectedProvider=source.hostname.endsWith('kenney.nl')?'kenney':'opengameart';
   const expectedSourceId='remote-'+expectedPackKey.slice(0,24);
   const expectedStyleFamily='remote-'+expectedPackKey.slice(0,16);
   if(receipt.provider!==expectedProvider||receipt.sourceId!==expectedSourceId)return null;
   if(receipt.packKey&&receipt.packKey!==expectedPackKey)return null;

   const archive=await safeFile(resolve(this.cacheRoot,key,'archive.bin'));
   if(sha256Prefixed(archive)!==receipt.archiveSha256)return null;

   let pageHtml='',verifiedEvidence=false;
   if(receipt.pageSha256){
    const pageBytes=await safeFile(resolve(this.cacheRoot,key,'page.html'));
    if(sha256Prefixed(pageBytes)!==receipt.pageSha256)return null;
    pageHtml=pageBytes.toString('utf8');
    verifyCc0Evidence(pageHtml);
    verifiedEvidence=true;
   }
   if(deriveAuthor(expectedProvider,pageHtml)!==receipt.author)return null;

   if(receipt.archiveLicenseEntry){
    const entries=readZipEntries(archive,name=>name===receipt.archiveLicenseEntry);
    if(entries.length!==1)return null;
    verifyCc0Evidence(entries[0].bytes.toString('utf8'));
    verifiedEvidence=true;
   }else if(expectedProvider==='kenney'&&archive.length>=4&&archive.readUInt32LE(0)===0x04034b50){
    return null;
   }
   if(!verifiedEvidence)return null;

   for(const file of receipt.files){
    if(!/^files\/\d{3}\.(?:png|jpg|wav|mp3)$/.test(file.storedPath))return null;
    if(file.styleFamily!==expectedStyleFamily||file.sourceId!==expectedSourceId)return null;
    const bytes=await safeFile(resolve(this.cacheRoot,key,file.storedPath));
    if(inspectMedia(bytes,file.mime).sha256!==file.sha256)return null;
   }
   return {...receipt,cacheKey:key,cached:true};
  }catch{return null;}
 }
 async normalize({path,bytes,mime,temp,rights}){
  if(mime==='image/png'||mime==='image/jpeg'){
   if(bytes.length===0||bytes.length>8_000_000)return null;
   const id=remoteId(path+sha256Hex(bytes).slice(0,16));
   try{
    const registered=await registerSource(temp,{id,mime,data:bytes.toString('base64'),rights});
    const outBytes=await readFile(resolve(temp,'sources/assets',registered.hash.slice(7)));
    return {bytes:outBytes,mime:registered.mime};
   }catch(error){
    if(['E_NATIVE_ASSET_DECODE','E_NATIVE_ASSET_SIZE','E_NATIVE_ASSET_MIME'].includes(error.message))return null;
    throw error;
   }
  }
  let normalized=bytes,outputMime=mime,inputPath=resolve(temp,'input'+extname(path));
  await writeFile(inputPath,bytes);
  if(mime==='audio/ogg'||bytes.length>700000){
   outputMime='audio/wav';
   const outputPath=resolve(temp,'output.wav');
   const args=['-v','error','-y','-i',inputPath,'-t','120','-ac','1','-ar','44100','-c:a','pcm_s16le',outputPath];
   try{await run('ffmpeg',args,{timeout:15000,maxBuffer:16384});normalized=await readFile(outputPath);}catch{return null;}
  }
  if(normalized.length>8_000_000)return null;
  const id=remoteId(path+sha256Hex(normalized).slice(0,16));
  try{
   const registered=await registerSource(temp,{id,mime:outputMime,data:normalized.toString('base64'),rights});
   const outBytes=await readFile(resolve(temp,'sources/assets',registered.hash.slice(7)));
   return {bytes:outBytes,mime:registered.mime};
  }catch(error){
   if(['E_NATIVE_ASSET_DECODE','E_NATIVE_ASSET_SIZE','E_NATIVE_ASSET_MIME'].includes(error.message))return null;
   throw error;
  }
 }
 async persist(key,receipt,archive,pageHtml,files){
  await assertStorePath(this.cacheRoot);
  await mkdir(this.cacheRoot,{recursive:true});
  await assertStorePath(this.cacheRoot);
  const folder=resolve(this.cacheRoot,key),temporary=resolve(this.cacheRoot,'.staging-'+randomUUID());
  await mkdir(resolve(temporary,'files'),{recursive:true});
  try{
   await writeFile(resolve(temporary,'archive.bin'),archive,{flag:'wx'});
   if(pageHtml){
    await writeFile(resolve(temporary,'page.html'),pageHtml,{flag:'wx'});
   }
   const publicFiles=[];
   for(let index=0;index<files.length;index++){
    const file=files[index],storedPath='files/'+String(index).padStart(3,'0')+(file.mime==='image/png'?'.png':file.mime==='image/jpeg'?'.jpg':file.mime==='audio/wav'?'.wav':'.mp3');
    await writeFile(resolve(temporary,storedPath),file.data,{flag:'wx'});
    const metadata={...file};delete metadata.data;publicFiles.push({...metadata,storedPath});
   }
   const finalReceipt={...receipt,cacheKey:key,files:publicFiles};await writeFile(resolve(temporary,'receipt.json'),JSON.stringify(finalReceipt),{flag:'wx'});
   try{await rename(temporary,folder);}catch(error){await rm(temporary,{recursive:true,force:true});if(error.code!=='EEXIST'&&error.code!=='ENOTEMPTY')throw error;}
   return await this.cached(key)??{...finalReceipt,cached:false};
  }finally{await rm(temporary,{recursive:true,force:true});}
 }
 async fetchPack({sourceUrl,packId,fileFilter,signal}){
  const source=assertRemoteUrl(sourceUrl),key=computeCacheKey(source.href,packId,fileFilter),packKey=computePackKey(source.href);
  const cached=await this.cached(key);if(cached)return cached;
  const first=await this.download(source.href,{maxBytes:/\.zip(?:$|\?)/i.test(source.pathname)?maxZipBytes:maxSingleBytes,signal});
  let archive=first.bytes,pageHtml='',evidenceUrl=source.href,downloadUrl=source.href;
  const isZip=archive.length>=4&&archive.readUInt32LE(0)===0x04034b50;
  if(!isZip){
   pageHtml=archive.toString('utf8');verifyCc0Evidence(pageHtml);
   const candidates=links(pageHtml,source.href),provider=source.hostname.endsWith('kenney.nl')?'kenney':'opengameart';
   const selected=candidates.find(url=>/\.zip(?:$|\?)/i.test(url))??(provider==='opengameart'?candidates.find(url=>mimeFor(new URL(url).pathname)):null);
   if(!selected)throw Error('E_REMOTE_ASSET_NOT_FOUND');downloadUrl=assertRemoteUrl(selected).href;
   const downloaded=await this.download(downloadUrl,{maxBytes:/\.zip(?:$|\?)/i.test(downloadUrl)?maxZipBytes:maxSingleBytes,signal});archive=downloaded.bytes;
  }
  const provider=source.hostname.endsWith('kenney.nl')?'kenney':'opengameart',title=htmlText(pageHtml,/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i)??htmlText(pageHtml,/<title>([^<]+)/i)??source.pathname.split('/').filter(Boolean).pop()??'CC0 pack';
  const author=deriveAuthor(provider,pageHtml);
  let licenseEvidence=pageHtml?evidenceUrl:'',archiveLicenseEntry=null,selected;
  if(archive.length>=4&&archive.readUInt32LE(0)===0x04034b50){
   const isLicense=name=>/(?:^|\/)(?:license|copying)(?:\.txt)?$/i.test(name);
   const entries=readZipEntries(archive,name=>isLicense(name)||Boolean(mimeFor(name)&&fileMatches(name,fileFilter)));
   const licenseEntry=entries.find(entry=>isLicense(entry.name));
   if(licenseEntry){verifyCc0Evidence(licenseEntry.bytes.toString('utf8'));archiveLicenseEntry=licenseEntry.name;licenseEvidence+=(licenseEvidence?'; ':'')+'archive:'+licenseEntry.name;}else if(provider==='kenney'||!pageHtml)throw Error('E_ASSET_LICENSE_UNVERIFIED');
   selected=entries.filter(entry=>mimeFor(entry.name)&&fileMatches(entry.name,fileFilter));
  }else{
   if(!pageHtml)throw Error('E_ASSET_LICENSE_UNVERIFIED');
   const path=new URL(downloadUrl).pathname;if(!mimeFor(path))throw Error('E_REMOTE_ASSET_MIME');selected=[{name:path.split('/').pop(),bytes:archive}];
  }
  const sourceId='remote-'+packKey.slice(0,24),styleFamily='remote-'+packKey.slice(0,16);
  const temp=await (async()=>{await assertStorePath(this.cacheRoot);await mkdir(this.cacheRoot,{recursive:true});return mkdtemp(resolve(this.cacheRoot,'.verify-'));})(),files=[];
  try{
   for(const entry of selected.slice(0,100)){
    const originalMime=mimeFor(entry.name),rights=`${author}, CC0-1.0. ${source.href}`;
    const normalized=await this.normalize({path:entry.name,bytes:entry.bytes,mime:originalMime,temp,rights});if(!normalized)continue;
    const info=inspectMedia(normalized.bytes,normalized.mime),id=remoteId(source.href+'\0'+entry.name);
    files.push({id,source:'remote',sourceId,path:entry.name,name:entry.name.split('/').pop(),kind:info.mime.startsWith('image/')?'sprite':'audio',styleFamily,tags:entry.name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean),data:normalized.bytes,...info});
   }
  }finally{await rm(temp,{recursive:true,force:true});}
  if(!files.length)throw Error('E_REMOTE_ASSET_NO_SUPPORTED_MEDIA');
  const receipt={
   format:'tora-remote-cc0-1',
   packKey,
   packId:packId??'',
   fileFilter:fileFilter??'',
   sourceId,
   provider,
   packTitle:title,
   author,
   license:'CC0-1.0',
   licenseEvidence,
   ...(archiveLicenseEntry?{archiveLicenseEntry}:{}),
   ...(pageHtml?{pageSha256:sha256Prefixed(Buffer.from(pageHtml,'utf8'))}:{}),
   sourceUrl:source.href,
   fetchedAt:new Date().toISOString(),
   archiveSha256:sha256Prefixed(archive),
   files,
  };
  return this.persist(key,receipt,archive,pageHtml,files);
 }
 async listCached({query='',kind,styleFamily,limit=40}={}){
  try{await assertStorePath(this.cacheRoot);}catch{return [];}
  let dirs;
  try{dirs=await readdir(this.cacheRoot);}catch(e){if(e.code==='ENOENT')return [];throw e;}
  const byId=new Map();
  for(const key of dirs.sort()){
   if(!/^[a-f0-9]{64}$/.test(key))continue;
   const receipt=await this.cached(key);
   if(!receipt)continue;
   for(const file of receipt.files){
    if(byId.has(file.id))continue;
    byId.set(file.id,{
     id:file.id,
     source:'remote',
     sourceId:receipt.sourceId,
     packTitle:receipt.packTitle,
     author:receipt.author,
     license:receipt.license,
     sourceUrl:receipt.sourceUrl,
     path:file.path,
     name:file.name,
     kind:file.kind,
     styleFamily:file.styleFamily,
     tags:file.tags??[],
     mime:file.mime,
     bytes:file.bytes,
     sha256:file.sha256,
     ...(file.width!==undefined?{width:file.width,height:file.height}:{}),
     ...(file.durationSec!==undefined?{durationSec:file.durationSec}:{}),
     cached:true,
    });
   }
  }
  const words=String(query).toLowerCase().split(/\s+/).filter(Boolean);
  return [...byId.values()].filter(entry=>
   (!kind||entry.kind===kind)&&(!styleFamily||entry.styleFamily===styleFamily)&&
   words.every(word=>(entry.name+' '+entry.tags.join(' ')+' '+entry.packTitle+' '+entry.sourceId).toLowerCase().includes(word))
  ).sort((a,b)=>a.styleFamily.localeCompare(b.styleFamily)||a.name.localeCompare(b.name)).slice(0,Math.min(100,Math.max(1,limit)));
 }
 async getCachedFile(remoteAssetId){
  if(typeof remoteAssetId!=='string'||!remoteAssetId.startsWith('remote-'))return null;
  try{await assertStorePath(this.cacheRoot);}catch{return null;}
  let dirs;
  try{dirs=await readdir(this.cacheRoot);}catch(e){if(e.code==='ENOENT')return null;throw e;}
  for(const key of dirs.sort()){
   if(!/^[a-f0-9]{64}$/.test(key))continue;
   const receipt=await this.cached(key);
   if(!receipt)continue;
   const file=receipt.files.find(entry=>entry.id===remoteAssetId);
   if(!file)continue;
   const bytes=await safeFile(resolve(this.cacheRoot,key,file.storedPath));
   if(inspectMedia(bytes,file.mime).sha256!==file.sha256)continue;
   return {receipt,file,bytes};
  }
  return null;
 }
 async search({query,includeRemote=false,kind,styleFamily,limit=40,signal}={}){
  await this.catalog.load();
  const localMatches=this.catalog.list({query,kind,styleFamily,limit});
  const cachedRemoteMatches=await this.listCached({query,kind,styleFamily,limit});
  const fallbackLocalMatches=[...localMatches,...cachedRemoteMatches].slice(0,Math.min(100,Math.max(1,limit)));
  if(!includeRemote)return {online:false,assets:fallbackLocalMatches,cachedRemoteMatches,remotePacks:[],fallbackLocalMatches};
  const packs=[],seen=new Set(),failures=[];let reachedAny=false;
  const sources=[
   {provider:'kenney',url:`https://kenney.nl/assets?q=${encodeURIComponent(query??'')}`,match:href=>/^https:\/\/(?:www\.)?kenney\.nl\/assets\/[a-z0-9-]+(?:\/)?$/i.test(href)},
   {provider:'opengameart',url:`https://opengameart.org/art-search-advanced?keys=${encodeURIComponent(query??'')}&field_art_licenses_tid%5B%5D=17981`,match:href=>/^https:\/\/(?:www\.)?opengameart\.org\/content\/[a-z0-9-]+/i.test(href)},
  ];
  for(const source of sources){
   try{
    const page=await this.download(source.url,{signal}),html=page.bytes.toString('utf8'),base=new URL(source.url);reachedAny=true;
    let added=0;
    for(const href of links(html,base)){
     const clean=href.split('#')[0];
     if(!source.match(clean)||seen.has(clean))continue;
     seen.add(clean);packs.push({sourceUrl:clean,provider:source.provider,license:'CC0-1.0',licenseVerified:false,isRemotePack:true});
     if(++added>=6)break;
    }
   }catch{failures.push(source.provider);}
  }
  if(!reachedAny)return {online:false,warning:'Remote CC0 sources are unavailable; using the verified local catalog.',assets:fallbackLocalMatches,cachedRemoteMatches,remotePacks:[],fallbackLocalMatches};
  const warning=failures.length?`Some remote CC0 sources were unavailable (${failures.join(', ')}); returning available remote packs and local CC0 matches.`:undefined;
  return {online:true,...(warning?{warning}:{}),assets:[...fallbackLocalMatches,...packs],cachedRemoteMatches,remotePacks:packs,fallbackLocalMatches};
 }
 async fetchPackWithFallback(options){
  try{return await this.fetchPack(options);}catch(error){
   if(['E_REMOTE_ASSET_ORIGIN','E_BUILD_CANCELLED','E_REMOTE_ASSET_SIZE','E_REMOTE_ASSET_ARCHIVE','E_REMOTE_ASSET_ARCHIVE_LIMIT'].includes(error.message))throw error;
   await this.catalog.load();
   const fallbackLocalMatches=[...this.catalog.list({query:options.fileFilter}),...await this.listCached({query:options.fileFilter})];
   return {online:false,warning:'Remote asset could not be verified or downloaded; use these local CC0 matches instead.',error:error.message,fallbackLocalMatches,files:[]};
  }
 }
}
