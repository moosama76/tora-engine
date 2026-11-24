import {createHash} from 'node:crypto';
import {readFileSync,statSync} from 'node:fs';
import {readFile,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath,URL} from 'node:url';
import {isAudioMime} from './media-validate.mjs';

const defaultCatalog=fileURLToPath(new URL('../../../assets/free-assets/catalog.json',import.meta.url));
const entries=new Map();
const freeze=value=>{
 if(value&&typeof value==='object'&&!Object.isFrozen(value)){
  for(const child of Object.values(value))freeze(child);
  Object.freeze(value);
 }
 return value;
};
function index(catalog){
 const bySource=new Map(),byHash=new Map(),audioFiles=[],visualFiles=[],audioCollectionsById=new Map();
 for(const source of catalog.sources??[]){
  for(const file of source.files??[]){
   const row=Object.freeze({source,file,catalogId:source.id+'/'+file.path});
   bySource.set(source.id+':'+file.path,row);
   if(file.sha256)byHash.set(file.sha256,row);
   if(isAudioMime(file.mime))audioFiles.push(row);
   if(/^image\//.test(file.mime))visualFiles.push(row);
  }
 }
 for(const collection of catalog.audioCollections??[])audioCollectionsById.set(collection.id,collection);
 return {bySource,byHash,audioFiles:Object.freeze(audioFiles),visualFiles:Object.freeze(visualFiles),audioCollectionsById};
}
function catalog(path,raw,stats){
 const parsed=JSON.parse(raw.toString('utf8'));
 const result=freeze({...parsed,...index(parsed)});
 const entry={mtimeMs:stats.mtimeMs,size:stats.size,sha256:'sha256:'+createHash('sha256').update(raw).digest('hex'),value:result};
 entries.set(path,entry);
 return result;
}
export function loadCatalogSync(catalogPath=defaultCatalog){
 const path=resolve(catalogPath),stats=statSync(path),prior=entries.get(path);
 if(prior&&prior.mtimeMs===stats.mtimeMs&&prior.size===stats.size)return prior.value;
 return catalog(path,readFileSync(path),stats);
}
export async function loadCatalog(catalogPath=defaultCatalog){
 const path=resolve(catalogPath),stats=await stat(path),prior=entries.get(path);
 if(prior&&prior.mtimeMs===stats.mtimeMs&&prior.size===stats.size)return prior.value;
 return catalog(path,await readFile(path),stats);
}
export function resetCatalogCache(){entries.clear();}
