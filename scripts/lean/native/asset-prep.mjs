/** Rust-backed faithful mechanical sprite preparation with hash-bound provenance receipts. */
import {execFile} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {mkdir,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {basename,dirname,extname,isAbsolute,relative,resolve,sep} from 'node:path';
import {promisify} from 'node:util';
import {check} from './document.mjs';
import {hash} from './compiler.mjs';
import {readUploadFile,safeFile} from './assets.mjs';
import {resolveCc0SourceItem} from './cc0-staging.mjs';
import {mapWithConcurrency} from './concurrency.mjs';
import {requireNativeTool} from './native-bin.mjs';
import {assertStorePath} from './store-path.mjs';
import {resolvePreparedAssetsRoot,resolveWorkspaceRoot} from '../runtime-paths.mjs';

const run=promisify(execFile);
const PREP_MANIFEST_FORMAT='tora-prepared-assets-1';
const IMAGE_MIMES=new Set(['image/png','image/jpeg']);

function inferImageMime(path,bytes){
 if(bytes.length>=8&&bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47)return 'image/png';
 if(bytes.length>=3&&bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff)return 'image/jpeg';
 const ext=extname(path).toLowerCase();
 if(ext==='.png')return 'image/png';
 if(ext==='.jpg'||ext==='.jpeg')return 'image/jpeg';
 throw Error('E_NATIVE_ASSET_MIME');
}

function compactProvenanceJson(payload){
 const full=JSON.stringify(payload);
 if(full.length<=2048)return full;
 const trimmed={...payload,prepOperations:(payload.prepOperations??[]).slice(0,4)};
 const medium=JSON.stringify(trimmed);
 if(medium.length<=2048)return medium;
 delete trimmed.licenseEvidence;
 delete trimmed.prepOperations;
 return JSON.stringify(trimmed).slice(0,2048);
}

function normalizePrepOptions(item,index){
 const opts={
  outputPrefix:item.outputPrefix??`prep_${String(index).padStart(2,'0')}`,
 };
 if(item.crop!==undefined)opts.crop=item.crop;
 if(item.trim!==undefined)opts.trim=Boolean(item.trim);
 if(item.alphaThreshold!==undefined)opts.alphaThreshold=item.alphaThreshold;
 if(item.paddingPx!==undefined)opts.paddingPx=item.paddingPx;
 if(item.resize!==undefined)opts.resize=item.resize;
 if(item.maxSide!==undefined)opts.maxSide=item.maxSide;
 if(item.allowDeform!==undefined)opts.allowDeform=Boolean(item.allowDeform);
 if(item.sliceGrid!==undefined)opts.sliceGrid=item.sliceGrid;
 return opts;
}

export async function prepAssets({workspaceRoot,items,catalog,remoteFetcher}){
 check(Array.isArray(items)&&items.length>=1&&items.length<=16,'E_PREP_ARGUMENT');
 const ws=resolveWorkspaceRoot(workspaceRoot);
 const prepRoot=resolvePreparedAssetsRoot(ws);
 await assertStorePath(prepRoot);
 await mkdir(prepRoot,{recursive:true});
 await assertStorePath(prepRoot);

 const tool=requireNativeTool('prep');
 const batchId='prep-'+randomUUID().slice(0,12);
 const batchDir=resolve(prepRoot,batchId);
 await mkdir(batchDir,{recursive:true});

 const manifestEntries={};
 const outputs=[];
 const usedFiles=new Set();

 try{
  const preparedItems=await mapWithConcurrency(items,4,async(item,index)=>{
   check(item&&typeof item==='object','E_PREP_ARGUMENT');
   const hasFile=typeof item.filePath==='string'&&item.filePath.length>0;
   const hasSource=typeof item.sourceId==='string'&&item.sourceId.length>0;
   check(hasFile!==hasSource,'E_PREP_ARGUMENT');

   let bytes,mime,rights,provenance,sourceFile;
   if(hasFile){
    bytes=await readUploadFile(ws,item.filePath);
    mime=inferImageMime(item.filePath,bytes);
    sourceFile=item.filePath;
    rights=typeof item.rights==='string'&&item.rights.trim().length>0
     ?item.rights.trim()
     :'Studio original upload faithfully prepared via Tora.';
    provenance={
     origin:'studio-original',
     sourceFile:item.filePath,
     sourceHash:hash(bytes),
     ...(typeof item.styleFamily==='string'&&item.styleFamily.trim()?{styleFamily:item.styleFamily.trim()}:{}),
    };
   }else{
    const src=await resolveCc0SourceItem(item.sourceId,{catalog,remoteFetcher});
    check(IMAGE_MIMES.has(src.mime),'E_NATIVE_ASSET_MIME');
    bytes=src.bytes;
    mime=src.mime;
    sourceFile=src.provenance?.sourceFile??item.sourceId;
    rights=src.rights;
    provenance={...src.provenance};
   }

   const stage=await mkdtemp(resolve(prepRoot,'.stage-'));
   try{
    const ext=mime==='image/jpeg'?'.jpg':'.png';
    const inName='input'+ext;
    await writeFile(resolve(stage,inName),bytes,{flag:'wx'});
    const opts=normalizePrepOptions(item,index);
    let report;
    try{
     const {stdout}=await run(tool.command,[...tool.prefixArgs,stage,inName,'out',JSON.stringify(opts)],{timeout:60000,maxBuffer:2*1024*1024});
     report=JSON.parse(stdout);
    }catch(error){
     const code=error.stderr?.match(/E_[A-Z_]+/)?.[0]??'E_PREP_FAILED';
     throw Error(code,{cause:error});
    }
    const itemFiles=[];
    for(const out of report.outputs??[]){
     const outBytes=await readFile(resolve(stage,'out',out.file));
     itemFiles.push({
      file:out.file,
      bytes:outBytes,
      width:out.width,
      height:out.height,
      bytesLen:out.bytesLen??outBytes.length,
      sha256:out.sha256,
      hasAlpha:out.hasAlpha,
      operations:out.operations,
      sourceHash:report.sourceSha256,
      sourceFile,
      rights,
      provenance,
     });
    }
    return itemFiles;
   }finally{
    await rm(stage,{recursive:true,force:true});
   }
  });

  for(const group of preparedItems){
   for(const entry of group){
    let finalName=entry.file;
    if(usedFiles.has(finalName)){
     const stem=finalName.replace(/\.png$/i,'');
     let n=2;
     while(usedFiles.has(`${stem}_${n}.png`))n++;
     finalName=`${stem}_${n}.png`;
    }
    usedFiles.add(finalName);
    const outPath=resolve(batchDir,finalName);
    await writeFile(outPath,entry.bytes,{flag:'wx'});
    const relPath=relative(ws,outPath).split(sep).join('/');
    manifestEntries[finalName]={
     outputSha256:entry.sha256,
     sourceHash:entry.sourceHash,
     sourceFile:entry.sourceFile,
     operations:entry.operations,
     rights:entry.rights,
     provenance:entry.provenance,
    };
    outputs.push({
     filePath:relPath,
     file:finalName,
     mime:'image/png',
     width:entry.width,
     height:entry.height,
     bytes:entry.bytesLen,
     sha256:entry.sha256,
     hasAlpha:entry.hasAlpha,
     operations:entry.operations,
     rights:entry.rights,
     styleFamily:entry.provenance?.styleFamily??null,
     sourceHash:entry.sourceHash,
    });
   }
  }

  const manifest={format:PREP_MANIFEST_FORMAT,batchId,entries:manifestEntries};
  await writeFile(resolve(batchDir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
  return {status:'PREPARED',batchId,outputs};
 }catch(error){
  await rm(batchDir,{recursive:true,force:true}).catch(()=>{});
  throw error;
 }
}

export async function resolvePreparedProvenance(workspaceRoot,filePath,bytes){
 if(typeof filePath!=='string'||!filePath.length)return null;
 const ws=resolveWorkspaceRoot(workspaceRoot);
 const prepRoot=resolvePreparedAssetsRoot(ws);
 const candidate=resolve(ws,filePath);
 const relToPrep=relative(prepRoot,candidate);
 if(!relToPrep||relToPrep.startsWith('..')||isAbsolute(relToPrep))return null;

 await assertStorePath(candidate);
 const batchDir=dirname(candidate);
 const manifestPath=resolve(batchDir,'manifest.json');
 await assertStorePath(manifestPath);
 let manifest;
 try{
  manifest=JSON.parse((await safeFile(manifestPath)).toString('utf8'));
 }catch{
  throw Error('E_PREP_PROVENANCE_MISMATCH');
 }
 if(manifest?.format!==PREP_MANIFEST_FORMAT||!manifest.entries||typeof manifest.entries!=='object'){
  throw Error('E_PREP_PROVENANCE_MISMATCH');
 }
 const entry=manifest.entries[basename(candidate)];
 if(!entry||typeof entry.outputSha256!=='string')throw Error('E_PREP_PROVENANCE_MISMATCH');
 if(hash(bytes)!==entry.outputSha256)throw Error('E_PREP_PROVENANCE_MISMATCH');

 const mergedProvenance={
  ...(entry.provenance&&typeof entry.provenance==='object'?entry.provenance:{}),
  preparedFrom:entry.sourceHash,
  preparedOutputHash:entry.outputSha256,
  prepOperations:entry.operations,
 };
 return {
  rights:entry.rights,
  provenance:compactProvenanceJson(mergedProvenance),
  styleFamily:entry.provenance?.styleFamily??null,
 };
}
