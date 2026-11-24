import {createHash,randomUUID} from 'node:crypto';
import {mkdir,readdir,rename,rm,stat,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {canonical,projectContent} from '../../../packages/creative-project/src/canonical.ts';
import {safeFile} from './assets.mjs';
import {assertStorePath} from './store-path.mjs';

const digest=value=>'sha256:'+createHash('sha256').update(value).digest('hex');
export const VERIFICATION_CACHE_VERSION='tora-verify-cache-1';
export function buildCacheKey({project,target,runtimeHash}){
 return digest(canonical({format:'tora-build-cache-1',revisionId:project.revisionId,contentHash:digest('tora-v2-hash/1\ndocument-content\n'+canonical(projectContent(project))),target,runtimeHash,assetHashes:project.assets.map(asset=>asset.hash).sort()}));
}
export class NativeBuildCache{
 constructor({maxEntries=16}={}){
  if(!Number.isSafeInteger(maxEntries)||maxEntries<1)throw Error('E_NATIVE_CACHE_ARGUMENT');
  this.maxEntries=maxEntries;this.entries=new Map();this.inFlight=new Map();this.counters={hits:0,misses:0,inFlightDedupes:0};
 }
 async getOrBuild(key,buildFn){
  if(this.entries.has(key)){
   const value=this.entries.get(key);this.entries.delete(key);this.entries.set(key,value);this.counters.hits++;
   return {...value,cacheHit:true};
  }
  if(this.inFlight.has(key)){
   this.counters.inFlightDedupes++;return {...await this.inFlight.get(key),cacheHit:true};
  }
  this.counters.misses++;
  const promise=Promise.resolve().then(buildFn);
  this.inFlight.set(key,promise);
  try{
   const value=await promise;this.entries.set(key,value);
   while(this.entries.size>this.maxEntries)this.entries.delete(this.entries.keys().next().value);
   return {...value,cacheHit:false};
  }finally{this.inFlight.delete(key);}
 }
 stats(){return {...this.counters};}
}
export class VerificationReceiptCache{
 constructor(storeRoot,{maxFiles=64}={}){
  if(!Number.isSafeInteger(maxFiles)||maxFiles<1)throw Error('E_NATIVE_CACHE_ARGUMENT');
  this.root=resolve(storeRoot,'.cache','verify');this.maxFiles=maxFiles;
 }
 receiptKey({artifactHash,checkerVersion,kind,viewport,host,scenario}){
  return digest(canonical({format:VERIFICATION_CACHE_VERSION,artifactHash,checkerVersion,kind,viewport:viewport??'',host:host??'',scenario:scenario??''}));
 }
 path(key){
  if(typeof key!=='string'||!/^sha256:[a-f0-9]{64}$/.test(key))throw Error('E_NATIVE_CACHE_KEY');
  return resolve(this.root,key.slice(7)+'.json');
 }
 async read(key){
  await assertStorePath(this.root);
  try{
   const envelope=JSON.parse((await safeFile(this.path(key))).toString());
   if(envelope?.format!==VERIFICATION_CACHE_VERSION||envelope.key!==key||!Object.hasOwn(envelope,'payload'))return null;
   return envelope.payload;
  }catch{return null;}
 }
 async write(key,payload){
  await assertStorePath(this.root);await mkdir(this.root,{recursive:true});await assertStorePath(this.root);
  const path=this.path(key),temporary=resolve(this.root,'.'+key.slice(7)+'-'+randomUUID()+'.tmp');
  try{
   await writeFile(temporary,JSON.stringify({format:VERIFICATION_CACHE_VERSION,key,payload}),{flag:'wx'});
   await rename(temporary,path);
  }finally{await rm(temporary,{force:true});}
  const names=(await readdir(this.root)).filter(name=>/^[a-f0-9]{64}\.json$/.test(name));
  if(names.length>this.maxFiles){
   const oldest=await Promise.all(names.map(async name=>({name,stats:await stat(resolve(this.root,name))})));
   oldest.sort((a,b)=>a.stats.mtimeMs-b.stats.mtimeMs||a.name.localeCompare(b.name));
   for(const {name} of oldest.slice(0,names.length-this.maxFiles))await rm(resolve(this.root,name),{force:true});
  }
  return payload;
 }
}
