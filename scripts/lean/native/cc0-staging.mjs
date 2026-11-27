/** Shared verified CC0 asset staging and single-visual-style-family enforcement. */
import {resolve} from 'node:path';
import {check,identifier} from './document.mjs';
import {registerSource} from './assets.mjs';
import {mapWithConcurrency} from './concurrency.mjs';

export function extractStyleFamily(asset){
 if(!asset)return null;
 if(typeof asset.styleFamily==='string'&&asset.styleFamily.trim())return asset.styleFamily.trim();
 const raw=asset.provenance;
 if(!raw)return null;
 if(typeof raw==='object'&&typeof raw.styleFamily==='string'&&raw.styleFamily.trim())return raw.styleFamily.trim();
 if(typeof raw==='string'&&raw.trim().startsWith('{')){
  try{
   const parsed=JSON.parse(raw);
   if(typeof parsed?.styleFamily==='string'&&parsed.styleFamily.trim())return parsed.styleFamily.trim();
  }catch{
   return null;
  }
 }
 return null;
}

export function assertSingleVisualStyleFamily(existingAssets,incomingAssets){
 const families=new Set();
 for(const asset of [...(existingAssets??[]),...(incomingAssets??[])]){
  if(!asset?.mime?.startsWith?.('image/'))continue;
  const family=extractStyleFamily(asset);
  if(family)families.add(family);
 }
 check(families.size<=1,'E_ASSET_STYLE_FAMILY');
 return [...families][0]??null;
}

export async function resolveCc0SourceItem(sourceId,{catalog,remoteFetcher}){
 check(typeof sourceId==='string'&&sourceId.length>0&&sourceId.length<=128,'E_ASSET_NOT_FOUND');
 if(catalog){
  await catalog.load();
  if(catalog.entries.has(sourceId)){
   const entry=catalog.entries.get(sourceId);
   const bytes=await catalog.bytes(sourceId);
   return {
    source:'local',
    sourceId:entry.id,
    mime:entry.mime,
    bytes,
    rights:entry.rights,
    styleFamily:entry.styleFamily,
    provenance:entry.provenance,
   };
  }
 }
 if(remoteFetcher){
  const cached=await remoteFetcher.getCachedFile(sourceId);
  if(cached){
   const {receipt,file,bytes}=cached;
   return {
    source:'remote',
    sourceId:file.id,
    mime:file.mime,
    bytes,
    rights:`${receipt.author}, CC0-1.0. ${receipt.sourceUrl}`,
    styleFamily:file.styleFamily,
    provenance:{
     origin:'remote-cc0',
     sourceId:receipt.sourceId,
     sourceFile:file.path,
     sourceHash:file.sha256,
     author:receipt.author,
     license:'CC0-1.0',
     licenseEvidence:receipt.licenseEvidence,
     sourceUrl:receipt.sourceUrl,
     archiveSha256:receipt.archiveSha256,
     styleFamily:file.styleFamily,
    },
   };
  }
 }
 throw Error('E_ASSET_NOT_FOUND');
}

export async function stageVerifiedCc0Assets({service,projectId,expected,items,catalog,remoteFetcher}){
 check(Array.isArray(items)&&items.length>=1&&items.length<=32,'E_NATIVE_ARGUMENT');
 check(expected&&typeof expected.revisionId==='string'&&typeof expected.contentHash==='string','E_NATIVE_ENVELOPE');
 const current=await service.read(projectId);
 check(expected.revisionId===current.revisionId&&expected.contentHash===current.contentHash,'E_NATIVE_STALE');

 const resolved=[];
 const seenTargetIds=new Set();
 for(const item of items){
  check(item&&typeof item==='object'&&typeof item.sourceId==='string','E_NATIVE_ARGUMENT');
  const source=await resolveCc0SourceItem(item.sourceId,{catalog,remoteFetcher});
  const targetId=item.assetId??item.sourceId;
  check(identifier(targetId),'E_NATIVE_ASSET');
  check(!seenTargetIds.has(targetId),'E_NATIVE_DUPLICATE');
  seenTargetIds.add(targetId);
  resolved.push({
   ...source,
   targetId,
   optimize:item.optimize,
   preserveResolution:item.preserveResolution,
  });
 }

 assertSingleVisualStyleFamily(current.project.assets,resolved);

 const projectRoot=resolve(service.store.root,projectId);
 const registered=await mapWithConcurrency(resolved,4,async item=>{
  const input={
   id:item.targetId,
   mime:item.mime,
   data:item.bytes.toString('base64'),
   rights:item.rights,
   ...(item.optimize!==undefined?{optimize:item.optimize}:{}),
   ...(item.preserveResolution!==undefined?{preserveResolution:item.preserveResolution}:{}),
  };
  const provenance=JSON.stringify(item.provenance);
  const metadata=await registerSource(projectRoot,input,{provenance});
  return metadata;
 });

 const existingIds=new Set(current.project.assets.map(a=>a.id));
 const operations=registered.map(metadata=>{
  const {optimization,...record}=metadata;
  void optimization;
  return {kind:existingIds.has(record.id)?'updateAsset':'registerAsset',asset:record};
 });
 const envelope={format:'tora-transaction-1',expected,operations};
 const preview=await service.preview(projectId,envelope);
 const committed=await service.transact(projectId,{...envelope,previewDigest:preview.previewDigest});
 return {
  ...committed,
  assets:registered.map(({optimization,...record})=>({...record,...(optimization?{optimization}:{})})),
 };
}
