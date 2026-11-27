import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,writeFile,mkdir,mkdtemp,rm,lstat} from 'node:fs/promises';
import {resolve,dirname,relative,isAbsolute} from 'node:path';
import {Buffer} from 'node:buffer';
import process from 'node:process';
import {check,exact,identifier} from './document.mjs';
import {hash} from './compiler.mjs';
import {validateMp3,validateToraMesh} from './media-validate.mjs';
import {optimizeAudio,validateWav} from './audio-optimize.mjs';
import {mapWithConcurrency} from './concurrency.mjs';
const run=promisify(execFile);
const examples=resolve(import.meta.dirname,'../../../target/debug/examples');
export const nativeDecoderPath=resolve(examples,process.platform==='win32'?'inspect_native.exe':'inspect_native');
export const nativeOptimizerPath=resolve(examples,process.platform==='win32'?'optimize_native.exe':'optimize_native');
async function noLinks(path){let p=resolve(path);while(p!==dirname(p)){try{check(!(await lstat(p)).isSymbolicLink(),'E_NATIVE_ASSET_PATH');}catch(e){if(e.code!=='ENOENT')throw e;}p=dirname(p);}}
export async function safeFile(path){await noLinks(path);return readFile(path);}
export async function readUploadFile(root,path){
 check(typeof path==='string'&&path.length>0&&path.length<=4096&&!path.includes('\0'),'E_NATIVE_ASSET_PATH');
 const base=resolve(root),candidate=resolve(base,path),rel=relative(base,candidate);check(rel&&!rel.startsWith('..')&&!isAbsolute(rel),'E_NATIVE_ASSET_PATH');
 await noLinks(candidate);const info=await lstat(candidate);check(info.isFile()&&info.size>0&&info.size<=8_000_000,'E_NATIVE_ASSET_SIZE');return readFile(candidate);
}
export async function readOriginal(root,digest){check(/^sha256:[a-f0-9]{64}$/.test(digest),'E_NATIVE_ASSET_PATH');return safeFile(resolve(root,'sources/assets/originals',digest.slice(7)));}
async function writeContent(path,bytes){try{await writeFile(path,bytes,{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;check(hash(await safeFile(path))===hash(bytes),'E_NATIVE_ASSET_HASH');}}
async function inspectImage(stage,file,mime){let decoded;try{decoded=JSON.parse((await run(nativeDecoderPath,[stage,file],{timeout:10000,maxBuffer:16384})).stdout)[0];}catch{throw Error('E_NATIVE_ASSET_DECODE');}check(decoded?.source_mime===mime,'E_NATIVE_ASSET_MIME');return decoded;}
const PNG_SIG=[0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a];
const isPngBytes=b=>b.length>=24&&PNG_SIG.every((v,i)=>b[i]===v);
const isJpegBytes=b=>b.length>=4&&b[0]===0xff&&b[1]===0xd8&&b[2]===0xff;
export function verifyImageSignature(bytes,mime){
 check(mime==='image/png'||mime==='image/jpeg','E_NATIVE_ASSET_MIME');
 check(bytes&&bytes.length>=24,'E_NATIVE_ASSET_DECODE');
 if(mime==='image/png'){
  if(!isPngBytes(bytes))throw Error(isJpegBytes(bytes)?'E_NATIVE_ASSET_MIME':'E_NATIVE_ASSET_DECODE');
  const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  check(view.getUint32(8,false)===13&&bytes[12]===0x49&&bytes[13]===0x48&&bytes[14]===0x44&&bytes[15]===0x52,'E_NATIVE_ASSET_DECODE');
  const width=view.getUint32(16,false),height=view.getUint32(20,false);
  check(width>0&&height>0&&width<=16384&&height<=16384,'E_NATIVE_ASSET_DECODE');
  return {source_mime:'image/png',width,height};
 }
 if(!isJpegBytes(bytes))throw Error(isPngBytes(bytes)?'E_NATIVE_ASSET_MIME':'E_NATIVE_ASSET_DECODE');
 let i=2;
 while(i+3<bytes.length){
  if(bytes[i]!==0xff){throw Error('E_NATIVE_ASSET_DECODE');}
  while(i<bytes.length&&bytes[i]===0xff)i++;
  if(i>=bytes.length)break;
  const marker=bytes[i++];
  if(marker===0xd9||marker===0xda)break;
  if((marker>=0xd0&&marker<=0xd8)||marker===0x01)continue;
  if(i+1>=bytes.length)break;
  const len=(bytes[i]<<8)|bytes[i+1];
  check(len>=2&&i+len<=bytes.length,'E_NATIVE_ASSET_DECODE');
  if((marker>=0xc0&&marker<=0xc3)||(marker>=0xc5&&marker<=0xc7)||(marker>=0xc9&&marker<=0xcb)||(marker>=0xcd&&marker<=0xcf)){
   check(len>=7,'E_NATIVE_ASSET_DECODE');
   const height=(bytes[i+3]<<8)|bytes[i+4],width=(bytes[i+5]<<8)|bytes[i+6];
   check(width>0&&height>0&&width<=16384&&height<=16384,'E_NATIVE_ASSET_DECODE');
   return {source_mime:'image/jpeg',width,height};
  }
  i+=len;
 }
 throw Error('E_NATIVE_ASSET_DECODE');
}
export async function registerSource(root,input){
 check(exact(input,['id','mime','data','rights','optimize','preserveResolution'])&&identifier(input.id)&&typeof input.rights==='string'&&input.rights.trim().length>0&&input.rights.length<=2048,'E_NATIVE_ASSET');
 const optimize=input.optimize??'auto',preserveResolution=input.preserveResolution??false;
 check(['auto','lossless','none'].includes(optimize)&&typeof preserveResolution==='boolean','E_NATIVE_ASSET');
 check(typeof input.data==='string'&&input.data.length<=11184812&&/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input.data),'E_NATIVE_ASSET');
 const original=Buffer.from(input.data,'base64'),optimizable=['image/png','image/jpeg','audio/wav','audio/mpeg'].includes(input.mime);
 check(original.length>0&&original.length<=(optimizable?8_000_000:700_000),'E_NATIVE_ASSET_SIZE');
 const originalHash=hash(original),folder=resolve(root,'sources/assets'),originals=resolve(folder,'originals');
 await noLinks(folder);await mkdir(originals,{recursive:true});const stage=await mkdtemp(resolve(folder,'.decode-'));
 try{
  let bytes=original,mime=input.mime,optimization,imageOptimized=false;
  if(optimizable){
   await writeContent(resolve(originals,originalHash.slice(7)),original);
   if(mime==='audio/wav'||mime==='audio/mpeg'){
    const result=await optimizeAudio(original,mime,{mode:optimize,stagingDir:stage});bytes=result.bytes;mime=result.mime;
    optimization={mode:optimize,originalHash,originalMime:input.mime,originalBytes:original.length,savedBytes:original.length-bytes.length,savedPercent:Number(((original.length-bytes.length)*100/original.length).toFixed(1)),operations:result.operations,encoder:result.encoder};
   }else{
    const sourceFile=originalHash.slice(7),outputFile='optimized';await writeFile(resolve(stage,sourceFile),original,{flag:'wx'});
    let result;
    try{result=JSON.parse((await run(nativeOptimizerPath,[stage,sourceFile,outputFile,JSON.stringify({mode:optimize,preserveResolution})],{timeout:60000,maxBuffer:1048576})).stdout);}catch(error){const code=error.stderr?.match(/E_[A-Z_]+/)?.[0],normalized=code==='E_NATIVE_ASSET_SIZE'||code==='E_ASSET_TOO_LARGE'?'E_NATIVE_ASSET_SIZE':'E_NATIVE_ASSET_DECODE';throw Error(normalized,{cause:error});}
    bytes=await readFile(resolve(stage,outputFile));mime=result.mime;
    check(typeof mime==='string'&&result.originalWidth>0&&result.originalHeight>0,'E_NATIVE_ASSET_DECODE');
    if(optimize!=='none')imageOptimized=true;
    optimization={mode:optimize,originalHash,originalMime:input.mime,originalBytes:original.length,savedBytes:original.length-bytes.length,savedPercent:Number(((original.length-bytes.length)*100/original.length).toFixed(1)),operations:result.operations,width:result.width,height:result.height,originalWidth:result.originalWidth,originalHeight:result.originalHeight};
   }
  }
  check(bytes.length>0&&bytes.length<=700000,'E_NATIVE_ASSET_SIZE');
  const digest=hash(bytes),file=digest.slice(7);await writeContent(resolve(stage,file),bytes);
  if(mime==='audio/wav')validateWav(bytes);
  else if(mime==='audio/mpeg')validateMp3(bytes,'E_NATIVE_ASSET_DECODE');
  else if(mime==='model/tora-mesh')validateToraMesh(bytes,'E_NATIVE_ASSET_DECODE');
  else{
   check(['image/png','image/jpeg'].includes(mime),'E_NATIVE_ASSET_MIME');
   if(imageOptimized){
    const verified=verifyImageSignature(bytes,mime);
    if(optimization?.width&&optimization?.height)check(verified.width===optimization.width&&verified.height===optimization.height,'E_NATIVE_ASSET_DECODE');
   }else await inspectImage(stage,file,mime);
  }
  await writeContent(resolve(folder,file),bytes);
  const metadata={mime,bytes:bytes.length,...(optimization?{optimization}:{})},path=resolve(folder,file+'.json');
  try{await writeFile(path,JSON.stringify(metadata),{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;const existing=JSON.parse((await safeFile(path)).toString());check(existing.mime===metadata.mime&&existing.bytes===metadata.bytes,'E_NATIVE_ASSET_METADATA');}
  return {id:input.id,hash:digest,mime,bytes:bytes.length,rights:input.rights,provenance:'Public API upload; content hash and decoded media verified by Tora.',...(optimization?{optimization}:{})};
 }finally{await rm(stage,{recursive:true,force:true});}
}
export async function lowerAssets(root,assets){
 return mapWithConcurrency(assets,8,async a=>{
  const metadata=JSON.parse((await safeFile(resolve(root,'sources/assets',a.hash.slice(7)+'.json'))).toString());check(metadata.mime===a.mime&&metadata.bytes===a.bytes,'E_NATIVE_ASSET_METADATA');
  const bytes=await safeFile(resolve(root,'sources/assets',a.hash.slice(7)));check(hash(bytes)===a.hash&&bytes.length===a.bytes,'E_NATIVE_ASSET_HASH');
  return {...a,data:bytes.toString('base64')};
 });
}
