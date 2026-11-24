import {Buffer} from 'node:buffer';
import {createHash} from 'node:crypto';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {fileURLToPath,URL} from 'node:url';
import {safeFile} from './assets.mjs';
import {validateMp3,validateToraMesh} from './media-validate.mjs';

const workspaceRoot=fileURLToPath(new URL('../../../',import.meta.url));
const planPacks=['kenney-harvest','kenney-space-salvage','kenney-sports','kenney-racing','tora-golf','tora-traffic'];
const mediaMimes=new Set(['image/png','image/jpeg','audio/wav','audio/mpeg','model/tora-mesh']);
const assetSources=new Set(['studio-assets','hybrid-free','free-licensed']);
const digest=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');

function contained(root,path){
 const absolute=resolve(root,path);
 if(absolute!==resolve(root)&&!absolute.startsWith(resolve(root)+sep))throw Error('E_ASSET_PATH');
 return absolute;
}
function imageDimensions(bytes,mime){
 if(mime==='image/png'&&bytes.length>=24&&bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))){
  return {width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};
 }
 if(mime==='image/jpeg'&&bytes.length>=4&&bytes[0]===0xff&&bytes[1]===0xd8){
  let offset=2;
  while(offset+9<bytes.length){
   if(bytes[offset]!==0xff){offset++;continue;}
   const marker=bytes[offset+1];
   if([0xc0,0xc1,0xc2].includes(marker))return {height:bytes.readUInt16BE(offset+5),width:bytes.readUInt16BE(offset+7)};
   if(marker===0xd8||marker===0xd9||marker===0x01||(marker>=0xd0&&marker<=0xd7)){offset+=2;continue;}
   const length=bytes.readUInt16BE(offset+2);
   if(length<2)break;
   offset+=2+length;
  }
 }
 return null;
}
function wavMetadata(bytes){
 if(bytes.length<44||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WAVE')return {};
 let offset=12,rate=0,align=0,dataSize=0,channels=0;
 while(offset+8<=bytes.length){
  const type=bytes.toString('ascii',offset,offset+4),size=bytes.readUInt32LE(offset+4);
  if(offset+8+size>bytes.length)break;
  if(type==='fmt '&&size>=16){channels=bytes.readUInt16LE(offset+10);rate=bytes.readUInt32LE(offset+12);align=channels*bytes.readUInt16LE(offset+22)/8;}
  if(type==='data')dataSize=size;
  offset+=8+size+(size%2);
 }
 return rate&&align?{durationSec:dataSize/align/rate,sampleRate:rate,channels}:{};
}
export function inspectMedia(bytes,mime){
 const result={mime,bytes:bytes.length,sha256:digest(bytes)};
 if(mime==='image/png'||mime==='image/jpeg')Object.assign(result,imageDimensions(bytes,mime)??{});
 else if(mime==='audio/wav')Object.assign(result,wavMetadata(bytes));
 else if(mime==='audio/mpeg')Object.assign(result,validateMp3(bytes));
 else if(mime==='model/tora-mesh')Object.assign(result,validateToraMesh(bytes));
 return result;
}
function mediaKind(mime){
 if(mime.startsWith('image/'))return 'sprite';
 if(mime.startsWith('audio/'))return 'audio';
 return 'mesh';
}
function semanticTags(sourceId,path,file={}){
 const values=[sourceId,path,file.id,file.role,...(file.roles??[])].filter(Boolean).join(' ');
 return [...new Set(values.toLowerCase().replace(/[_./-]+/g,' ').split(/\s+/).filter(word=>word.length>1))].slice(0,32);
}
function compact(entry){
 const publicEntry={...entry};delete publicEntry.absolutePath;delete publicEntry.rights;delete publicEntry.licenseEvidence;return publicEntry;
}
export function assertAssetSourceAllowed(mode,source){
 if(!['studio','local','remote'].includes(source)||!assetSources.has(mode))throw Error('E_ASSET_SOURCE_DISALLOWED');
 const allowed=mode==='hybrid-free'||mode==='studio-assets'&&source==='studio'||mode==='free-licensed'&&source!=='studio';
 if(!allowed)throw Error('E_ASSET_SOURCE_DISALLOWED');
}
async function licenseIsCc0(root,source){
 if(source.license!=='CC0-1.0'||!source.author||!source.sourceUrl)return false;
 if(!source.licenseFile)return source.licenseUrl==='https://creativecommons.org/publicdomain/zero/1.0/';
 try{
  const path=contained(root,source.licenseFile),bytes=await safeFile(path);
  if(source.licenseSha256&&digest(bytes)!==source.licenseSha256)return false;
  return /CC0|Creative Commons Zero|CC0 1\.0 Universal/i.test(bytes.toString('utf8'));
 }catch{return false;}
}

export class AssetCatalog{
 constructor({root=workspaceRoot,catalogPath=resolve(root,'assets/free-assets/catalog.json'),packNames=planPacks}={}){
  this.root=resolve(root);this.catalogPath=catalogPath;this.packNames=packNames;this.entries=new Map();this.loaded=false;
 }
 async addFile({source,file,packRoot}){
  const inferred={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.wav':'audio/wav','.mp3':'audio/mpeg','.t3d':'model/tora-mesh'}[extname(file.file??'').toLowerCase()];file={...file,mime:file.mime??inferred};
  if(!mediaMimes.has(file.mime)||!file.file||!file.sha256&&!file.sourceHash)return;
  let absolutePath;
  try{absolutePath=contained(this.root,packRoot?resolve(packRoot,file.file):file.file);}catch{return;}
  const sourceFile=file.path??file.provenance?.sourceFile??file.processing?.sourceFile??file.file;
  const sourceId=source.id,styleFamily=file.provenance?.styleFamily??source.styleFamily??source.id;
  const catalogId='catalog-'+createHash('sha256').update(sourceId+'\0'+sourceFile).digest('hex').slice(0,32);
  if(this.entries.has(catalogId))return;
  let bytes,info;
  try{
   const details=await stat(absolutePath);if(!details.isFile()||details.size>700000)return;
   bytes=await safeFile(absolutePath);info=inspectMedia(bytes,file.mime);
  }catch{return;}
  const declared=file.sha256??file.sourceHash;
  if(declared&&declared!==info.sha256)return;
  if(info.mime.startsWith('image/')&&(!info.width||!info.height))return;
  const entry={
   id:catalogId,source:'local',sourceId,packTitle:source.title??source.id,author:source.author,license:'CC0-1.0',licenseUrl:source.licenseUrl,
   licenseEvidence:source.licenseFile??source.sourceUrl,sourceUrl:source.sourceUrl,sourceFile,name:sourceFile.split('/').pop(),
   kind:mediaKind(file.mime),styleFamily,tags:semanticTags(sourceId,sourceFile,file),absolutePath,rights:file.rights??`${source.author}, CC0-1.0. ${source.sourceUrl}`,
   provenance:{origin:'local-cc0',sourceId,sourceFile,sourceHash:info.sha256,author:source.author,license:'CC0-1.0',licenseUrl:source.licenseUrl,sourceUrl:source.sourceUrl,styleFamily},
   ...info,
  };
  this.entries.set(catalogId,entry);
 }
 async load(){
  if(this.loaded)return this;
  this.loaded=true;
  let catalog;
  try{catalog=JSON.parse(await readFile(this.catalogPath,'utf8'));}catch{catalog={sources:[]};}
  for(const source of catalog.sources??[]){
   if(!await licenseIsCc0(this.root,source))continue;
   for(const file of source.files??[])await this.addFile({source,file});
  }
  for(const packName of this.packNames){
   let plan;
   try{plan=JSON.parse(await readFile(resolve(this.root,'assets',packName,'plan.json'),'utf8'));}catch{continue;}
   const packRoot=resolve(this.root,'assets',packName);
   if(Array.isArray(plan.assets)){
    const groups=new Map();
    for(const file of plan.assets){
     const provenance=file.provenance;
     if(!provenance)continue;
     if(!groups.has(provenance.sourceId))groups.set(provenance.sourceId,{...provenance,id:provenance.sourceId,title:provenance.sourceId,files:[]});
     groups.get(provenance.sourceId).files.push(file);
    }
    for(const source of groups.values()){
     if(!await licenseIsCc0(this.root,source))continue;
     for(const file of source.files)await this.addFile({source,file:{...file,sha256:file.sha256??file.provenance.sourceHash},packRoot});
    }
   }
   if(plan.source&&Array.isArray(plan.files)&&await licenseIsCc0(this.root,plan.source)){
    for(const file of plan.files)await this.addFile({source:plan.source,file});
   }
  }
  return this;
 }
 list({query='',kind,styleFamily,limit=40}={}){
  const words=String(query).toLowerCase().split(/\s+/).filter(Boolean);
  return [...this.entries.values()].filter(entry=>
   (!kind||entry.kind===kind)&&(!styleFamily||entry.styleFamily===styleFamily)&&
   words.every(word=>(entry.name+' '+entry.tags.join(' ')+' '+entry.packTitle).toLowerCase().includes(word))
  ).sort((a,b)=>a.styleFamily.localeCompare(b.styleFamily)||a.name.localeCompare(b.name)).slice(0,Math.min(100,Math.max(1,limit))).map(compact);
 }
 get(ids){
  return ids.map(id=>{const entry=this.entries.get(id);if(!entry)throw Error('E_ASSET_NOT_FOUND');return entry;});
 }
 summary(){
  const entries=[...this.entries.values()],families=new Set(entries.filter(entry=>entry.kind==='sprite').map(entry=>entry.styleFamily));
  return {assets:entries.length,sprites:entries.filter(entry=>entry.kind==='sprite').length,audio:entries.filter(entry=>entry.kind==='audio').length,meshes:entries.filter(entry=>entry.kind==='mesh').length,styleFamilies:[...families].sort()};
 }
 async bytes(id){const [entry]=this.get([id]);return safeFile(entry.absolutePath);}
}
