import {createHash} from 'node:crypto';
import {readFileSync,statSync} from 'node:fs';
import {resolve,sep} from 'node:path';
import {fileURLToPath,URL} from 'node:url';
import {Buffer} from 'node:buffer';
import {analyzeAudio,isAudioMime} from './audio-analysis.mjs';
import {loadCatalogSync} from './catalog-cache.mjs';

const root=fileURLToPath(new URL('../../../',import.meta.url));
const catalogFile=resolve(root,'assets/free-assets/catalog.json');
const text={type:'string',minLength:1,maxLength:2048};
export const ASSET_PROVENANCE_SCHEMA={
 type:'object',additionalProperties:false,
 properties:{
  origin:{const:'third-party-free'},sourceId:text,sourceFile:text,
  sourceHash:{type:'string',pattern:'^sha256:[a-f0-9]{64}$'},
  author:text,license:text,sourceUrl:text,styleFamily:text,
 },
 required:['origin','sourceId','sourceFile','sourceHash','author','license','sourceUrl','styleFamily'],
};
function check(value,code){if(!value)throw Error(code);}
const hash=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');
const byteReceipts=new Map();
function sourceBytes(path){
 check(typeof path==='string'&&path.startsWith('assets/'),'E_ASSET_POLICY_SOURCE_FILE');
 const file=resolve(root,path);
 check(file.startsWith(resolve(root,'assets')+sep),'E_ASSET_POLICY_SOURCE_FILE');
 try{
  const stats=statSync(file),prior=byteReceipts.get(file);
  if(prior&&prior.mtimeMs===stats.mtimeMs&&prior.size===stats.size)return prior.bytes;
  const bytes=readFileSync(file);byteReceipts.set(file,{mtimeMs:stats.mtimeMs,size:stats.size,bytes});return bytes;
 }catch{throw Error('E_ASSET_POLICY_SOURCE_FILE');}
}
function readCatalog(){
 try{
  const catalog=loadCatalogSync(catalogFile);
  check(catalog.format==='tora-free-asset-catalog-1'&&Array.isArray(catalog.sources),'E_ASSET_POLICY_CATALOG');
  check(new Set(catalog.sources.map(source=>source.id)).size===catalog.sources.length,'E_ASSET_POLICY_CATALOG');
  if(catalog.audioCollections!==undefined){
   check(Array.isArray(catalog.audioCollections)&&new Set(catalog.audioCollections.map(collection=>collection.id)).size===catalog.audioCollections.length,'E_ASSET_POLICY_CATALOG');
   const roles=['ambient','tap','match','reject','reward','win','loss'],files=catalog.sources.flatMap(source=>source.files);
   for(const collection of catalog.audioCollections){
    check(collection&&typeof collection.label==='string'&&collection.auditionStatus==='analyzed'&&collection.cues&&typeof collection.cues==='object','E_ASSET_POLICY_CATALOG');
    check(Object.keys(collection.cues).sort().join(',')===[...roles].sort().join(','),'E_ASSET_POLICY_CATALOG');
    check(new Set(Object.values(collection.cues)).size===roles.length,'E_ASSET_POLICY_CATALOG');
    for(const role of roles){
     const matches=files.filter(file=>file.id===collection.cues[role]);
     check(matches.length===1&&matches[0].audioMeta?.role===role,'E_ASSET_POLICY_CATALOG');
    }
   }
  }
  return catalog;
 }catch{throw Error('E_ASSET_POLICY_CATALOG');}
}
function publicUrl(value){
 try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password&&!!url.hostname;}catch{return false;}
}

const audioMetaFields=[
 'role','valence','energy','styleTags','loopable','auditionStatus',
 'channels','sampleRate','bitsPerSample','frameCount','durationSec','peakDbfs','rmsDbfs',
 'silenceThresholdDbfs','leadingSilenceSec','trailingSilenceSec','activeStartSec','activeEndSec',
 'trimmedDurationSec','dcOffset','clippedSamples','clipping','loopSeamDelta','loopSeamClick',
];
const audioExactFields=['channels','sampleRate','bitsPerSample','frameCount','clippedSamples','clipping','loopSeamClick'];
const audioRoundedFields=['durationSec','peakDbfs','rmsDbfs','silenceThresholdDbfs','leadingSilenceSec','trailingSilenceSec','activeStartSec','activeEndSec','trimmedDurationSec','dcOffset','loopSeamDelta'];
const identifierText=value=>typeof value==='string'&&/^[a-z][a-z0-9-]{0,63}$/.test(value);
export function validateAudioMetadata(metadata,bytes,mime='audio/wav'){
 check(metadata&&typeof metadata==='object'&&!Array.isArray(metadata),'E_ASSET_POLICY_AUDIO_META');
 check(Object.keys(metadata).length===audioMetaFields.length&&audioMetaFields.every(field=>Object.hasOwn(metadata,field)),'E_ASSET_POLICY_AUDIO_META');
 check(identifierText(metadata.role)&&['positive','neutral','negative'].includes(metadata.valence)&&['low','medium','high'].includes(metadata.energy),'E_ASSET_POLICY_AUDIO_META');
 check(Array.isArray(metadata.styleTags)&&metadata.styleTags.length>0&&metadata.styleTags.length<=16&&metadata.styleTags.every(identifierText)&&new Set(metadata.styleTags).size===metadata.styleTags.length,'E_ASSET_POLICY_AUDIO_META');
 check(typeof metadata.loopable==='boolean'&&metadata.auditionStatus==='analyzed','E_ASSET_POLICY_AUDIO_META');
 let actual;
 try{actual=analyzeAudio(bytes,mime);}catch{throw Error('E_ASSET_POLICY_AUDIO_META');}
 for(const field of audioExactFields)check(metadata[field]===actual[field],'E_ASSET_POLICY_AUDIO_META');
 for(const field of audioRoundedFields){
  const value=metadata[field],expected=actual[field];
  check(typeof value==='number'&&!Number.isNaN(value)&&(Number.isFinite(expected)?Number.isFinite(value)&&Math.abs(value-expected)<=.000001:value===expected),'E_ASSET_POLICY_AUDIO_META');
 }
}

const pngSignature=Buffer.from([137,80,78,71,13,10,26,10]);
const colorMetadata=new Set(['gAMA','cHRM','iCCP','sRGB']);
/** Remove reviewed color metadata while copying every retained chunk byte for byte. */
export function preparePngSource(input){
 const bytes=Buffer.from(input);
 check(bytes.length>=20&&bytes.subarray(0,8).equals(pngSignature),'E_ASSET_POLICY_PROCESSING');
 const chunks=[bytes.subarray(0,8)];
 let offset=8,ended=false;
 while(offset<bytes.length){
  check(offset+12<=bytes.length&&!ended,'E_ASSET_POLICY_PROCESSING');
  const size=bytes.readUInt32BE(offset),end=offset+size+12;
  check(end<=bytes.length,'E_ASSET_POLICY_PROCESSING');
  const kind=bytes.toString('ascii',offset+4,offset+8);
  if(!colorMetadata.has(kind))chunks.push(bytes.subarray(offset,end));
  ended=kind==='IEND';
  offset=end;
 }
 check(ended,'E_ASSET_POLICY_PROCESSING');
 return Buffer.concat(chunks);
}

/** The checked-in source catalog is the trust boundary, independent of concept declarations. */
export function validateAssetPolicy(asset,{role,styleFamily}={}){
 check(role==='visual'||role==='audio','E_ASSET_POLICY_ROLE');
 const provenance=asset?.provenance;
 check(provenance?.origin==='third-party-free','E_ASSET_POLICY_PROVENANCE');
 const source=readCatalog().sources.find(source=>source.id===provenance.sourceId);
 check(source&&Array.isArray(source.files),'E_ASSET_POLICY_SOURCE');
 check(source.author&&publicUrl(source.sourceUrl)&&publicUrl(source.licenseUrl)&&publicUrl(source.archive?.url)&&/^sha256:[a-f0-9]{64}$/.test(source.archive?.sha256),'E_ASSET_POLICY_SOURCE');
 check(['CC0-1.0','CC-BY-4.0','CC-BY-3.0'].includes(source.license),'E_ASSET_POLICY_LICENSE');
 check(source.license==='CC0-1.0'||typeof source.attribution==='string'&&source.attribution.trim().length>0,'E_ASSET_POLICY_ATTRIBUTION');
 check(hash(sourceBytes(source.licenseFile))===source.licenseSha256,'E_ASSET_POLICY_LICENSE');
 for(const field of ['author','license','sourceUrl','styleFamily'])check(provenance[field]===source[field],'E_ASSET_POLICY_PROVENANCE');
 if(role==='visual')check(typeof styleFamily==='string'&&styleFamily.length>0&&source.styleFamily===styleFamily,'E_ASSET_POLICY_STYLE');
 const files=source.files.filter(file=>file.path===provenance.sourceFile);
 check(files.length===1,'E_ASSET_POLICY_SOURCE_FILE');
 const file=files[0],bytes=Buffer.from(asset.data??'','base64');
 check(file.mime===asset.mime&&((role==='visual'&&/^image\/(png|jpeg)$/.test(file.mime))||(role==='audio'&&isAudioMime(file.mime))),'E_ASSET_POLICY_MEDIA');
 check(provenance.sourceHash===file.sha256&&hash(bytes)===file.sha256&&hash(sourceBytes(file.file))===file.sha256,'E_ASSET_POLICY_BYTES');
 if(file.audioMeta!==undefined){
  check(role==='audio','E_ASSET_POLICY_AUDIO_META');
  validateAudioMetadata(file.audioMeta,sourceBytes(file.file),file.mime);
 }
 if(file.processing){
  const original=sourceBytes(file.processing.sourceFile);
  check(hash(original)===file.processing.sourceSha256,'E_ASSET_POLICY_PROCESSING');
  if(file.processing.kind==='png-strip-color-metadata'){
   check(role==='visual'&&file.mime==='image/png'&&preparePngSource(original).equals(bytes),'E_ASSET_POLICY_PROCESSING');
  }else{
   check(role==='audio'&&file.processing.kind==='audio-transcode'&&['ffmpeg','Web Audio OfflineAudioContext','GStreamer lamemp3enc'].includes(file.processing.tool)&&Array.isArray(file.processing.arguments)&&file.processing.arguments.length>0,'E_ASSET_POLICY_PROCESSING');
  }
 }
 return Object.freeze({
  ...provenance,licenseUrl:source.licenseUrl,attribution:source.attribution??'',
  archiveUrl:source.archive.url,archiveHash:source.archive.sha256,
  ...(file.processing?{processing:globalThis.structuredClone(file.processing)}:{}),
 });
}
