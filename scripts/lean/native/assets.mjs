import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,writeFile,mkdir,mkdtemp,rm,lstat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {Buffer} from 'node:buffer';
import process from 'node:process';
import {check,exact,identifier} from './document.mjs';
import {hash} from './compiler.mjs';
import {validateMp3,validateToraMesh} from './media-validate.mjs';
const run=promisify(execFile);
export const nativeDecoderPath=resolve(import.meta.dirname,'../../../target/debug/examples',process.platform==='win32'?'inspect_native.exe':'inspect_native');
async function noLinks(path){let p=resolve(path);while(p!==dirname(p)){try{check(!(await lstat(p)).isSymbolicLink(),'E_NATIVE_ASSET_PATH');}catch(e){if(e.code!=='ENOENT')throw e;}p=dirname(p);}}
export async function safeFile(path){await noLinks(path);return readFile(path);}
function validateWav(bytes){
 check(bytes.length>=44&&bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WAVE'&&bytes.readUInt32LE(4)+8===bytes.length,'E_NATIVE_ASSET_DECODE');
 let offset=12,align=0,rate=0,dataSize=0;
 while(offset+8<=bytes.length){
  const type=bytes.toString('ascii',offset,offset+4),size=bytes.readUInt32LE(offset+4);
  check(offset+8+size<=bytes.length,'E_NATIVE_ASSET_DECODE');
  if(type==='fmt '){
   check(size>=16&&bytes.readUInt16LE(offset+8)===1,'E_NATIVE_ASSET_DECODE');
   const channels=bytes.readUInt16LE(offset+10),bits=bytes.readUInt16LE(offset+22);rate=bytes.readUInt32LE(offset+12);align=channels*bits/8;
   check([1,2].includes(channels)&&[8,16].includes(bits)&&rate>=8000&&rate<=48000&&bytes.readUInt16LE(offset+20)===align&&bytes.readUInt32LE(offset+16)===rate*align,'E_NATIVE_ASSET_DECODE');
  }
  if(type==='data'){check(size>0&&!dataSize,'E_NATIVE_ASSET_DECODE');dataSize=size;}
  offset+=8+size+(size%2);
 }
 check(align&&dataSize&&dataSize%align===0&&dataSize/align/rate<=120&&offset===bytes.length,'E_NATIVE_ASSET_DECODE');
}
export async function registerSource(root,input){
 check(exact(input,['id','mime','data','rights'])&&identifier(input.id)&&typeof input.rights==='string'&&input.rights.trim().length>0&&input.rights.length<=2048,'E_NATIVE_ASSET');
 check(typeof input.data==='string'&&/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input.data),'E_NATIVE_ASSET');
 const bytes=Buffer.from(input.data,'base64');check(bytes.length>0&&bytes.length<=700000,'E_NATIVE_ASSET_SIZE');
 const digest=hash(bytes),folder=resolve(root,'sources/assets'),file=digest.slice(7);
 await noLinks(folder);await mkdir(folder,{recursive:true});const stage=await mkdtemp(resolve(folder,'.decode-'));
 try{
  await writeFile(resolve(stage,file),bytes,{flag:'wx'});
  if(input.mime==='audio/wav')validateWav(bytes);
  else if(input.mime==='audio/mpeg')validateMp3(bytes,'E_NATIVE_ASSET_DECODE');
  else if(input.mime==='model/tora-mesh')validateToraMesh(bytes,'E_NATIVE_ASSET_DECODE');
  else{
   check(['image/png','image/jpeg'].includes(input.mime),'E_NATIVE_ASSET_MIME');let decoded;
   try{decoded=JSON.parse((await run(nativeDecoderPath,[stage,file],{timeout:10000,maxBuffer:16384})).stdout)[0];}catch{throw Error('E_NATIVE_ASSET_DECODE');}
   check(decoded?.source_mime===input.mime,'E_NATIVE_ASSET_MIME');
  }
  try{await writeFile(resolve(folder,file),bytes,{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;check(hash(await safeFile(resolve(folder,file)))===digest,'E_NATIVE_ASSET_HASH');}
  const metadata={mime:input.mime,bytes:bytes.length},path=resolve(folder,file+'.json');
  try{await writeFile(path,JSON.stringify(metadata),{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;check(JSON.stringify(JSON.parse((await safeFile(path)).toString()))===JSON.stringify(metadata),'E_NATIVE_ASSET_METADATA');}
  return {id:input.id,hash:digest,mime:input.mime,bytes:bytes.length,rights:input.rights,provenance:'Public API upload; content hash and decoded media verified by Tora.'};
 }finally{await rm(stage,{recursive:true,force:true});}
}
export async function lowerAssets(root,assets){
 const output=[];
 for(const a of assets){
  const metadata=JSON.parse((await safeFile(resolve(root,'sources/assets',a.hash.slice(7)+'.json'))).toString());check(metadata.mime===a.mime&&metadata.bytes===a.bytes,'E_NATIVE_ASSET_METADATA');
  const bytes=await safeFile(resolve(root,'sources/assets',a.hash.slice(7)));check(hash(bytes)===a.hash&&bytes.length===a.bytes,'E_NATIVE_ASSET_HASH');output.push({...a,data:bytes.toString('base64')});
 }
 return output;
}
