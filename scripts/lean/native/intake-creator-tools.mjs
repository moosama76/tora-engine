import {Buffer} from 'node:buffer';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {registerSource,safeFile} from './assets.mjs';
import {AssetCatalog,assertAssetSourceAllowed,inspectMedia} from './asset-catalog.mjs';
import {NativeAgentTools} from './agent-tools.mjs';
import {check,exact} from './document.mjs';
import {RemoteCc0Fetcher} from './remote-cc0-fetcher.mjs';
import {mapWithConcurrency} from './concurrency.mjs';
import {assertSingleVisualStyleFamily} from './cc0-staging.mjs';

const identity=value=>({revisionId:value.revisionId,contentHash:value.contentHash});
const compactAsset=asset=>({id:asset.id,name:asset.name,mime:asset.mime,kind:asset.kind??(asset.mime.startsWith('image/')?'sprite':'audio'),bytes:asset.bytes,width:asset.width,height:asset.height,durationSec:asset.durationSec,styleFamily:asset.styleFamily,license:asset.license??'creator-declared',source:asset.source??'studio',sourceUrl:asset.sourceUrl,author:asset.author});
function bounded(value,limit=24_000){
 const text=JSON.stringify(value);if(Buffer.byteLength(text)>limit)throw Error('E_CREATOR_TOOL_RESPONSE_LIMIT');return value;
}
export const creatorToolDefinitions=[
 {name:'discover_contracts',description:'Discover exact Tora contracts before authoring. Use packs for complete domains, names for individual descriptors, or both. Use format:"compact" for concise schema with units.',parameters:{type:'object',properties:{names:{type:'array',items:{type:'string'},maxItems:16},packs:{type:'array',items:{type:'string'},maxItems:7},format:{type:'string',enum:['full','compact']}},additionalProperties:false}},
 {name:'list_assets',description:'List creator uploads and verified local CC0 media with dimensions and provenance. Optionally search allowlisted live CC0 providers.',parameters:{type:'object',properties:{query:{type:'string'},kind:{type:'string',enum:['sprite','audio','mesh']},styleFamily:{type:'string'},includeRemote:{type:'boolean'}},additionalProperties:false}},
 {name:'fetch_remote_pack',description:'Fetch and verify one allowlisted Kenney or OpenGameArt CC0 pack. Returns cached normalized media and license receipts.',parameters:{type:'object',properties:{sourceUrl:{type:'string'},packId:{type:'string'},fileFilter:{type:'string'}},required:['sourceUrl'],additionalProperties:false}},
 {name:'stage_assets',description:'Stage verified uploaded, local catalog, or fetched remote assets into the draft in one atomic revision. Asset-source slider and one visual style family are enforced.',parameters:{type:'object',properties:{intakeAssetIds:{type:'array',items:{type:'string'}},catalogAssetIds:{type:'array',items:{type:'string'}},remoteAssetIds:{type:'array',items:{type:'string'}}},additionalProperties:false}},
 {name:'inspect_draft',description:'Inspect draft revision, records, and dependencies with bounded results. Use tree:true for a compact scene outline.',parameters:{type:'object',properties:{ids:{type:'array',items:{type:'string'}},search:{type:'string'},tree:{type:'boolean'},sceneId:{type:'string'}},additionalProperties:false}},
 {name:'apply_operations',description:'Preview and atomically commit a tora-transaction-1 operation batch. Register assets only through stage_assets.',parameters:{type:'object',properties:{operations:{type:'array',items:{type:'object'}},summary:{type:'string'}},required:['operations','summary'],additionalProperties:false}},
 {name:'run_qa',description:'Compile and run static, acoustic, four-viewport, and interaction Creative QA. Returned screenshots must be visually inspected before finishing.',parameters:{type:'object',properties:{target:{type:'string',enum:['standalone-browser-draft','unity-ads-ua-playable','applovin-growth-playable']}},additionalProperties:false}},
 {name:'finish_build',description:'Finish only after real interaction, an end-card Store CTA, staged media, and a clean QA run. Returns the editor-ready project and provenance summary.',parameters:{type:'object',properties:{title:{type:'string'},summary:{type:'string'}},required:['title','summary'],additionalProperties:false}},
];

export class IntakeCreatorTools{
 constructor(service,intakes,intake,{catalog,fetcher,onProgress=()=>{},signal}={}){
  this.service=service;this.intakes=intakes;this.intake=intake;this.catalog=catalog??new AssetCatalog();this.fetcher=fetcher??new RemoteCc0Fetcher({catalog:this.catalog});this.onProgress=onProgress;this.signal=signal;this.agent=new NativeAgentTools(service);this.remote=new Map();this.qaCount=0;this.lastQa=null;this.finished=null;
 }
 async execute(name,args={}){
  if(this.signal?.aborted)throw Error('E_BUILD_CANCELLED');
  const method={discover_contracts:'discoverContracts',list_assets:'listAssets',fetch_remote_pack:'fetchRemotePack',stage_assets:'stageAssets',inspect_draft:'inspectDraft',apply_operations:'applyOperations',run_qa:'runQa',finish_build:'finishBuild'}[name];
  if(!method)throw Error('E_CREATOR_TOOL_UNKNOWN');
  return this[method](args);
 }
 async discoverContracts(args){
  check(exact(args,['names','packs','format'])&&(Array.isArray(args.names)||Array.isArray(args.packs)),'E_CREATOR_TOOL_ARGUMENT');
  return bounded(await this.agent.run({command:'contracts',names:args.names,packs:args.packs,...(args.format?{format:args.format}:{})}),args.packs?65536:24000);
 }
 async studioAssets(){
  const output=[];
  for(const asset of this.intake.assets){
   const {bytes,mime}=await this.intakes.sourceAsset(this.intake.id,asset),info=inspectMedia(bytes,mime);
   output.push(compactAsset({...asset,...info,source:'studio',styleFamily:this.intake.projectId,license:'creator-commercial-rights'}));
  }
  return output;
 }
 async listAssets(args){
  check(exact(args,['query','kind','styleFamily','includeRemote']),'E_CREATOR_TOOL_ARGUMENT');await this.catalog.load();
  const mode=this.intake.assetSource??'studio-assets',studio=mode==='free-licensed'?[]:await this.studioAssets();
  let localAssets,remotePacks=[],fallbackLocalMatches=[],online=false,warning;
  if(mode==='studio-assets'){
   if(args.includeRemote)throw Error('E_ASSET_SOURCE_DISALLOWED');localAssets=studio;
  }else{
   const result=await this.fetcher.search({...args,signal:this.signal});online=result.online;warning=result.warning;fallbackLocalMatches=result.fallbackLocalMatches??[];
   remotePacks=result.remotePacks??(result.assets??[]).filter(item=>item.isRemotePack||(!item.mime&&item.sourceUrl));
   const localMatches=(result.assets??[]).filter(item=>!item.isRemotePack&&(item.mime||!item.sourceUrl));
   localAssets=[...studio,...localMatches];
  }
  const query=String(args.query??'').toLowerCase();
  const filteredLocal=localAssets.filter(asset=>(!args.kind||asset.kind===args.kind)&&(!args.styleFamily||asset.styleFamily===args.styleFamily)&&(!query||JSON.stringify(asset).toLowerCase().includes(query))).slice(0,40);
  const filteredRemote=remotePacks.slice(0,12);
  return bounded({mode,online,warning,assets:filteredLocal,remotePacks:filteredRemote,fallbackLocalMatches:fallbackLocalMatches.slice(0,12),localCatalog:this.catalog.summary()});
 }
 async fetchRemotePack(args){
  check(exact(args,['sourceUrl','packId','fileFilter']),'E_CREATOR_TOOL_ARGUMENT');assertAssetSourceAllowed(this.intake.assetSource??'studio-assets','remote');
  await this.onProgress({phase:'assets',stepLabel:'Verifying licensed CC0 assets…'});
  const receipt=await this.fetcher.fetchPackWithFallback({...args,signal:this.signal});
  for(const file of receipt.files??[])this.remote.set(file.id,{file,receipt});
  return bounded(receipt);
 }
 async ensureDraft(){
  try{return await this.service.read(this.intake.projectId);}catch(error){
   if(error.code!=='ENOENT'&&error.message!=='E_NATIVE_NOT_FOUND')throw error;
   const created=await this.service.create({id:this.intake.projectId,name:this.intake.name,androidUrl:this.intake.storeUrl??'https://play.google.com/store/apps/details?id=com.playablelab.draft'});
   await this.onProgress({draftProjectId:this.intake.projectId});return created;
  }
 }
 async stageAssets(args){
  check(exact(args,['intakeAssetIds','catalogAssetIds','remoteAssetIds']),'E_CREATOR_TOOL_ARGUMENT');await this.catalog.load();
  const current=await this.ensureDraft();
  const ids=new Set([...(args.intakeAssetIds??[]),...(args.catalogAssetIds??[]),...(args.remoteAssetIds??[])]);check(ids.size<=64,'E_ASSET_LIMIT');
  const candidates=[];
  for(const id of args.intakeAssetIds??[]){
   const asset=this.intake.assets.find(entry=>entry.id===id);check(asset,'E_ASSET_NOT_FOUND');const {bytes,mime}=await this.intakes.sourceAsset(this.intake.id,asset);
   candidates.push({id,mime,bytes,rights:this.intake.rights,source:'studio',styleFamily:this.intake.projectId,provenance:{origin:'studio-original',studio:this.intake.studio,sourceFile:asset.name,sourceHash:asset.hash,intakeId:this.intake.id,styleFamily:this.intake.projectId}});
  }
  for(const entry of this.catalog.get(args.catalogAssetIds??[])){
   const bytes=await this.catalog.bytes(entry.id);candidates.push({...entry,bytes,source:'local'});
  }
  for(const id of args.remoteAssetIds??[]){
   const remote=this.remote.get(id);check(remote,'E_ASSET_NOT_FOUND');const {file,receipt}=remote,bytes=await safeFile(resolve(this.fetcher.cacheRoot,receipt.cacheKey,file.storedPath));
   const provenance={origin:'remote-cc0',sourceId:receipt.sourceId,sourceFile:file.path,sourceHash:file.sha256,author:receipt.author,license:'CC0-1.0',licenseEvidence:receipt.licenseEvidence,sourceUrl:receipt.sourceUrl,archiveSha256:receipt.archiveSha256,styleFamily:file.styleFamily};
   candidates.push({id:file.id,mime:file.mime,bytes,rights:`${receipt.author}, CC0-1.0. ${receipt.sourceUrl}`,source:'remote',styleFamily:file.styleFamily,provenance});
  }
  const existingById=new Map(current.project.assets.map(asset=>[asset.id,asset]));
  const pendingById=new Map(),plan=[];
  for(const item of candidates){
   assertAssetSourceAllowed(this.intake.assetSource??'studio-assets',item.source);
   const existing=existingById.get(item.id);
   if(existing){check(existing.hash===item.provenance.sourceHash,'E_ASSET_DUPLICATE_ID');plan.push({existing});continue;}
   if(pendingById.has(item.id)){
    const prior=pendingById.get(item.id);
    check(prior.provenance.sourceHash===item.provenance.sourceHash,'E_ASSET_DUPLICATE_ID');
    plan.push({duplicateOf:item.id});continue;
   }
   pendingById.set(item.id,item);plan.push({item});
  }
  const toRegister=[...pendingById.values()],projectRoot=resolve(this.service.store.root,this.intake.projectId);
  assertSingleVisualStyleFamily(current.project.assets,toRegister);
  const registeredList=await mapWithConcurrency(toRegister,4,async item=>{
   const metadata=await registerSource(projectRoot,{id:item.id,mime:item.mime,data:item.bytes.toString('base64'),rights:item.rights},{provenance:JSON.stringify(item.provenance)});
   const record={...metadata};delete record.optimization;
   return record;
  });
  const registeredById=new Map(registeredList.map(asset=>[asset.id,asset]));
  if(registeredList.length){
   const envelope={format:'tora-transaction-1',expected:identity(current),operations:registeredList.map(asset=>({kind:'registerAsset',asset}))};
   const preview=await this.service.preview(this.intake.projectId,envelope);
   await this.service.transact(this.intake.projectId,{...envelope,previewDigest:preview.previewDigest});
   this.lastQa=null;
  }
  const staged=plan.map(entry=>entry.existing??registeredById.get(entry.duplicateOf??entry.item.id));
  const summary=await this.assetsSummary();await this.onProgress({phase:'assets',stepLabel:'Licensed assets staged',assetsSummary:summary});return bounded({staged:staged.map(asset=>({id:asset.id,hash:asset.hash,mime:asset.mime})),assetsSummary:summary});
 }
 async inspectDraft(args){
  check(exact(args,['ids','search','tree','sceneId']),'E_CREATOR_TOOL_ARGUMENT');await this.ensureDraft();return bounded(await this.agent.run({command:'inspect',id:this.intake.projectId,...args}));
 }
 async applyOperations(args){
  check(exact(args,['operations','summary'])&&Array.isArray(args.operations)&&typeof args.summary==='string'&&args.summary.length<=500,'E_CREATOR_TOOL_ARGUMENT');
  check(args.operations.every(operation=>!['registerAsset','replaceAsset'].includes(operation.kind)),'E_ASSET_SOURCE_DISALLOWED');const current=await this.ensureDraft();
  const envelope={format:'tora-transaction-1',expected:identity(current),operations:args.operations},preview=await this.service.preview(this.intake.projectId,envelope),result=await this.service.transact(this.intake.projectId,{...envelope,previewDigest:preview.previewDigest});
  this.lastQa=null;
  await this.onProgress({phase:'authoring',stepLabel:'Authoring scene & controls',draftProjectId:this.intake.projectId});return bounded({status:'COMMITTED',expected:identity(result),changed:result.effects.changed,warnings:result.effects.warnings});
 }
 async runQa(args){
  check(exact(args,['target']),'E_CREATOR_TOOL_ARGUMENT');const target=args.target??'standalone-browser-draft',current=await this.ensureDraft(),outputDir=resolve(this.intakes.folder(this.intake.id),'qa-'+String(++this.qaCount));
  await this.onProgress({phase:'qa',stepLabel:'Testing 4 screen sizes & audio'});
  const artifact=await this.service.build(this.intake.projectId,current.project,target);
  const report=await this.service.runQa(this.intake.projectId,{revisionId:current.revisionId,target,outputDir});
  const selected=report.screenshots.filter(row=>row.state==='opening'&&(row.viewport.width===390||row.viewport.width===844)).slice(0,2),endCard=report.screenshots.find(row=>row.state==='end-card');if(endCard)selected.push(endCard);
  const screenshots=[];for(const row of selected.slice(0,4)){const bytes=await readFile(resolve(outputDir,row.path));if(bytes.length<=2_500_000)screenshots.push({mimeType:'image/png',data:bytes.toString('base64'),label:`${row.state} ${row.viewport.width}x${row.viewport.height}`});}
  this.lastQa={target,revisionId:current.revisionId,report,bytes:artifact.manifest.bytes,outputDir,screenshots};
  await this.onProgress({phase:'qa',stepLabel:report.ok?'Creative QA passed':'Repairing Creative QA findings',qa:{passed:report.ok,blockerCount:report.blockers.length,warningCount:report.warnings.length,bytes:artifact.manifest.bytes}});
  return {result:bounded({ok:report.ok,bytes:artifact.manifest.bytes,blockers:report.blockers,warnings:report.warnings,summary:report.summary,checks:report.checks}),screenshots};
 }
 async assetsSummary(){
  const current=await this.ensureDraft(),counts={studioCount:0,localCc0Count:0,remoteCc0Count:0,sources:new Map()};
  for(const asset of current.project.assets){
   let provenance;try{provenance=JSON.parse(asset.provenance);}catch{provenance=asset.provenance;}
   const origin=provenance?.origin,key=origin==='studio-original'?'studioCount':origin==='remote-cc0'?'remoteCc0Count':'localCc0Count';counts[key]++;
   if(provenance?.sourceId)counts.sources.set(provenance.sourceId,{sourceId:provenance.sourceId,author:provenance.author??this.intake.studio,license:provenance.license??'creator-commercial-rights',sourceUrl:provenance.sourceUrl,count:(counts.sources.get(provenance.sourceId)?.count??0)+1});
  }
  return {studioCount:counts.studioCount,localCc0Count:counts.localCc0Count,remoteCc0Count:counts.remoteCc0Count,sources:[...counts.sources.values()]};
 }
 async finishBuild(args){
  check(exact(args,['title','summary'])&&typeof args.title==='string'&&args.title.trim().length>0&&args.title.length<=80&&typeof args.summary==='string'&&args.summary.length<=1000,'E_CREATOR_TOOL_ARGUMENT');const current=await this.ensureDraft();
  check(current.project.scenes.some(scene=>scene.role==='interactive')&&current.project.scenes.some(scene=>scene.role==='end-card'),'E_CREATOR_INCOMPLETE');
  check(current.project.events.some(event=>event.kind==='click')&&current.project.eventBindings.some(binding=>binding.actions.some(action=>action.kind==='store')),'E_CREATOR_INCOMPLETE');
  check(this.lastQa?.report.ok&&this.lastQa.revisionId===current.revisionId,'E_CREATIVE_QA_REQUIRED');const artifact=await this.service.build(this.intake.projectId,current.project,this.lastQa.target),assetsSummary=await this.assetsSummary();
  this.finished={title:args.title.trim(),summary:args.summary.trim(),projectId:this.intake.projectId,editorUrl:'/?project='+this.intake.projectId,qa:{passed:true,blockerCount:0,warningCount:this.lastQa.report.warnings.length,bytes:artifact.manifest.bytes},assetsSummary};return this.finished;
 }
}
