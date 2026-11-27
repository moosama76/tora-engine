import {writeFile,mkdir,readFile,copyFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
import {canonical,projectContent} from '../../../packages/creative-project/src/canonical.ts';
import {check,exact,applyOperations,validateDocument} from './document.mjs';
import {compileNative,hash,projectUses3d,runtime3dBundle,runtimeBundle} from './compiler.mjs';
import {lowerAssets,readOriginal,registerSource,safeFile} from './assets.mjs';
import {capabilities} from './contracts.mjs';
import {CREATIVE_QA_CHECKER_VERSION,CREATIVE_QA_FORMAT,getPlaywrightBrowserVersion,runStaticPreflight} from './creative-qa.mjs';
import {isAudioMime} from './media-validate.mjs';
import {assertNetworkTarget} from './network-targets.mjs';
import {NativeBuildCache,VerificationReceiptCache,buildCacheKey} from './build-cache.mjs';
import {mapWithConcurrency} from './concurrency.mjs';
import {assertSingleVisualStyleFamily} from './cc0-staging.mjs';
const PREAPPLY_AUDIO_BLOCKERS=new Set(['audio-role-mismatch','audio-valence-mismatch','audio-win-loss-duplicate','audio-contour-mismatch','audio-clipping']);
export const contentHash=p=>hash('tora-v2-hash/1\ndocument-content\n'+canonical(projectContent(p)));
export function requireCreativeQa(report){
 if(report?.ok)return report;
 const error=Error('E_CREATIVE_QA');error.code='E_CREATIVE_QA';error.creativeQa=report;throw error;
}
async function defaultQaRunner(options){const {runCreativeQa}=await import('./creative-qa.mjs');return runCreativeQa(options);}
function qaScenarioTag({motionFilmstrip=true,recordVideo=false}={}){
 return `motion=${motionFilmstrip?1:0};video=${recordVideo?1:0}`;
}
function qaReportSatisfiesOptions(report,{motionFilmstrip=true,recordVideo=false,isDefaultRunner=true}={}){
 const warningKinds=new Set((report?.warnings??[]).map(w=>w?.defectKind));
 if(recordVideo){
  if(!report?.video?.path||!report?.video?.sha256||warningKinds.has('video-capture-failed'))return false;
 }
 if(motionFilmstrip){
  if(warningKinds.has('motion-filmstrip-failed'))return false;
  if(isDefaultRunner&&(report?.interactions?.length??0)>0&&!(report?.motionFilmstrips?.length>0))return false;
 }
 return true;
}
async function verifyAndCopyQaArtifacts(cachedOutputDir,targetOutputDir,report,options={}){
 if(!qaReportSatisfiesOptions(report,options))return false;
 const files=[
  ...(report.screenshots??[]),
  ...(report.contactSheets??[]),
  ...(report.motionFilmstrips??[]),
  ...(report.video?[report.video]:[]),
 ];
 for(const entry of files){
  if(!entry?.path||!entry?.sha256)return false;
  try{
   const bytes=await readFile(resolve(cachedOutputDir,entry.path));
   if(hash(bytes)!==entry.sha256)return false;
  }catch{return false;}
 }
 const srcRoot=resolve(cachedOutputDir),dstRoot=resolve(targetOutputDir);
 if(srcRoot!==dstRoot){
  await mkdir(dstRoot,{recursive:true});
  for(const entry of files){
   const dst=resolve(dstRoot,entry.path);
   await mkdir(dirname(dst),{recursive:true});
   await copyFile(resolve(srcRoot,entry.path),dst);
  }
  await copyFile(resolve(srcRoot,'report.json'),resolve(dstRoot,'report.json')).catch(()=>{});
 }
 return true;
}
export class NativeService{
 constructor(store,history,{qaRunner=defaultQaRunner,browserProvider,useVerifyCache}={}){this.store=store;this.history=history;this.qaRunner=qaRunner;this.browserProvider=browserProvider;this.useVerifyCache=useVerifyCache;this.buildCache=new NativeBuildCache();this.verifyCache=new VerificationReceiptCache(store.root);}
 async create(input){check(input?.id!=='compose'&&/^[a-z][a-z0-9-]{1,47}$/.test(input?.id)&&exact(input,['id','name','kind','androidUrl']),'E_NATIVE_ARGUMENT');await this.store.createNative(input);return this.read(input.id);}
 async read(id,revisionId){const base=await this.store.open(id);check(base.project.base.kind==='native-scene','E_NATIVE_KIND');const journal=await this.history.readRevisionJournal(id);revisionId??=journal.history[journal.index];check(revisionId==='initial'||/^rev-[a-f0-9-]{36}$/.test(revisionId),'E_NATIVE_REVISION');check((journal.revisions??journal.history).includes(revisionId)||journal.accepted.includes(revisionId),'E_NATIVE_NOT_FOUND');const project=revisionId==='initial'?base.project:validateDocument(JSON.parse((await safeFile(resolve(this.store.root,id,'revisions',revisionId,'project.json'))).toString()));check(project.projectId===id&&project.revisionId===revisionId,'E_NATIVE_REVISION');const digest=contentHash(project);if(journal.hashes?.[revisionId])check(journal.hashes[revisionId]===digest,'E_NATIVE_HASH');return {project,revisionId,contentHash:digest,accepted:journal.accepted.includes(revisionId),workingRevision:journal.history[journal.index],editorUrl:'/?project='+id,capabilities:capabilities()};}
 async preview(id,envelope){check(exact(envelope,['format','expected','operations','previewDigest'])&&envelope.format==='tora-transaction-1'&&exact(envelope.expected,['revisionId','contentHash']),'E_NATIVE_ENVELOPE');const current=await this.read(id);check(envelope.expected.revisionId===current.revisionId&&envelope.expected.contentHash===current.contentHash,'E_NATIVE_STALE');const result=applyOperations(current.project,envelope.operations);result.effects.changed=Object.fromEntries(['scenes','components','variables','gameplay','events','eventBindings','assets'].map(key=>[key,[...new Set([...current.project[key],...result.project[key]].map(x=>x.id))].filter(id=>JSON.stringify(current.project[key].find(x=>x.id===id))!==JSON.stringify(result.project[key].find(x=>x.id===id)))]));result.effects.affectedBindings=result.project.eventBindings.filter(b=>result.effects.changed.events.includes(b.eventId)).map(b=>b.id);result.effects.assetReferences=current.project.components.filter(c=>result.effects.removed.includes(c.id)).flatMap(c=>c.assetSlots.map(a=>({componentId:c.id,assetId:a.assetId,remainingReferences:result.project.components.filter(x=>x.assetSlots.some(s=>s.assetId===a.assetId)).length,assetRetained:true})));const digest=hash(canonical({expected:envelope.expected,operations:envelope.operations,effects:result.effects,resultHash:contentHash(result.project)}));return {...result,previewDigest:digest,expected:envelope.expected};}
 async transact(id,envelope,{guard,record}={}){
  const preview=await this.preview(id,envelope);
  check(envelope.previewDigest===preview.previewDigest,'E_NATIVE_PREVIEW_STALE');
  const project=preview.project;
  const touchesAudioWiring=envelope.operations.some(op=>['putBehavior','putBinding','replaceAsset'].includes(op.kind));
  const touchesAssetUpload=envelope.operations.some(op=>['registerAsset','updateAsset'].includes(op.kind));
  if(envelope.expected.revisionId!=='initial'&&(touchesAudioWiring||touchesAssetUpload)&&project.gameplay.some(b=>b.kind==='audio')&&project.assets.some(a=>isAudioMime(a.mime))){
   const lowered=await lowerAssets(resolve(this.store.root,id),project.assets);
   const preflight=await runStaticPreflight({...project,assets:lowered});
   const blocking=preflight.blockers.filter(d=>touchesAudioWiring?PREAPPLY_AUDIO_BLOCKERS.has(d.defectKind):d.defectKind==='audio-clipping');
   if(blocking.length)requireCreativeQa({...preflight,ok:false,blockers:blocking});
  }
  project.revisionId='rev-'+randomUUID();
  const artifact=await this.build(id,project);
  return this.history.commitRevision(id,envelope.expected.revisionId,async state=>{
   guard?.(state);
   const folder=resolve(this.store.root,id,'revisions',project.revisionId);
   await mkdir(folder);
   await writeFile(resolve(folder,'project.json'),JSON.stringify(project),{flag:'wx'});
   await writeFile(resolve(folder,'playable.html'),artifact.html,{flag:'wx'});
   await writeFile(resolve(folder,'manifest.json'),JSON.stringify(artifact.manifest),{flag:'wx'});
   const revision={revisionId:project.revisionId,contentHash:contentHash(project)};
   state.hashes={...state.hashes,[revision.revisionId]:revision.contentHash};
   state.revisions=[...new Set([...(state.revisions??state.history),revision.revisionId])];
   state.history=state.history.slice(0,state.index+1);
   state.history.push(revision.revisionId);
   state.index++;
   record?.(state,revision);
   return {state,value:{...revision,previousRevisionId:envelope.expected.revisionId,artifact:artifact.manifest,effects:preview.effects,editorUrl:'/?project='+id,capabilities:capabilities()}};
  });
 }
 async navigate(id,{expected,action}){const current=await this.read(id);check(expected?.revisionId===current.revisionId&&expected.contentHash===current.contentHash,'E_NATIVE_STALE');check(['undo','redo','save'].includes(action),'E_NATIVE_ARGUMENT');await this.history.commitRevision(id,current.revisionId,async state=>{const index=state.index+(action==='undo'?-1:action==='redo'?1:0);check(state.history[index],'E_NATIVE_HISTORY_BOUNDARY');state.index=index;return {state,value:true};});return this.read(id);}
 async accept(id,{revisionId,contentHash:expected}){const current=await this.read(id,revisionId);check(current.contentHash===expected,'E_NATIVE_STALE');await this.history.commitRevision(id,current.workingRevision,async state=>{state.accepted=[...new Set([...state.accepted,revisionId])];return {state,value:true};});return {revisionId,contentHash:expected,accepted:true};}
 async build(id,project,target='standalone-browser-draft'){
  const assets=await lowerAssets(resolve(this.store.root,id),project.assets),runtimeHash=hash(projectUses3d(project)?await runtime3dBundle():await runtimeBundle()),key=buildCacheKey({project,target,runtimeHash});
  return this.buildCache.getOrBuild(key,()=>compileNative(project,{assets,target}));
 }
 async render(id,revisionId){check(typeof revisionId==='string','E_NATIVE_ARGUMENT');const {project}=await this.read(id,revisionId),assets=await lowerAssets(resolve(this.store.root,id),project.assets),artifact=await compileNative(project,{assets});return {assets,artifact:artifact.manifest};}
 async upload(id,{expected,asset,provenance}){const current=await this.read(id),input={...asset};const explicitProvenance=provenance??input.provenance;delete input.provenance;if(input.sourceHash){input.data=(await readOriginal(resolve(this.store.root,id),input.sourceHash)).toString('base64');delete input.sourceHash;}if(explicitProvenance)assertSingleVisualStyleFamily(current.project.assets,[{mime:input.mime,provenance:explicitProvenance}]);const metadata=await registerSource(resolve(this.store.root,id),input,explicitProvenance?{provenance:explicitProvenance}:{}),{optimization,...record}=metadata,kind=current.project.assets.some(asset=>asset.id===record.id)?'updateAsset':'registerAsset',envelope={format:'tora-transaction-1',expected,operations:[{kind,asset:record}]};const preview=await this.preview(id,envelope);return {...await this.transact(id,{...envelope,previewDigest:preview.previewDigest}),asset:{...record,...(optimization?{optimization}:{})}};}
 async uploadBatch(id,{expected,assets}){
  check(Array.isArray(assets)&&assets.length>=1&&assets.length<=32,'E_NATIVE_ARGUMENT');
  check(expected&&exact(expected,['revisionId','contentHash']),'E_NATIVE_ENVELOPE');
  const ids=assets.map(item=>item?.id);
  check(new Set(ids).size===ids.length,'E_NATIVE_DUPLICATE');
  const current=await this.read(id);
  check(expected.revisionId===current.revisionId&&expected.contentHash===current.contentHash,'E_NATIVE_STALE');
  assertSingleVisualStyleFamily(current.project.assets,assets);
  const projectRoot=resolve(this.store.root,id);
  const registered=await mapWithConcurrency(assets,4,async item=>{
   const input={...item};
   const explicitProvenance=input.provenance;
   delete input.provenance;
   if(input.sourceHash){input.data=(await readOriginal(projectRoot,input.sourceHash)).toString('base64');delete input.sourceHash;}
   return registerSource(projectRoot,input,explicitProvenance?{provenance:explicitProvenance}:{});
  });
  const existingIds=new Set(current.project.assets.map(a=>a.id));
  const operations=registered.map(metadata=>{
   const {optimization,...record}=metadata;void optimization;
   return {kind:existingIds.has(record.id)?'updateAsset':'registerAsset',asset:record};
  });
  const envelope={format:'tora-transaction-1',expected,operations};
  const preview=await this.preview(id,envelope);
  const committed=await this.transact(id,{...envelope,previewDigest:preview.previewDigest});
  return {...committed,assets:registered.map(({optimization,...record})=>({...record,...(optimization?{optimization}:{})}))};
 }
 async runQa(id,{revisionId,target='standalone-browser-draft',outputDir,motionFilmstrip=true,recordVideo=false}={}){
  assertNetworkTarget(target);
  const current=await this.read(id,revisionId),effectiveRevisionId=current.revisionId;
  const qaDirSuffix=recordVideo?'-video':motionFilmstrip?'':'-nomotion';
  const resolvedOut=resolve(outputDir??resolve(this.store.root,id,'qa',effectiveRevisionId,target+qaDirSuffix));
  const artifact=await this.build(id,current.project,target);
  const isDefaultRunner=this.qaRunner===defaultQaRunner;
  const cacheEnabled=this.useVerifyCache??isDefaultRunner;
  const scenario=qaScenarioTag({motionFilmstrip,recordVideo});
  let receiptKey;
  if(cacheEnabled){
   const browserVersion=await getPlaywrightBrowserVersion();
   receiptKey=this.verifyCache.receiptKey({artifactHash:artifact.manifest.artifactHash,checkerVersion:`${CREATIVE_QA_CHECKER_VERSION}:${browserVersion}`,kind:'creative-qa',host:target,scenario});
   const cached=await this.verifyCache.read(receiptKey);
   if(cached?.report?.ok===true&&cached.report.format===CREATIVE_QA_FORMAT&&typeof cached.outputDir==='string'){
    if(await verifyAndCopyQaArtifacts(cached.outputDir,resolvedOut,cached.report,{motionFilmstrip,recordVideo,isDefaultRunner})){
     return {...cached.report,cacheHit:true};
    }
   }
  }
  const browser=isDefaultRunner&&this.browserProvider?await this.browserProvider():undefined;
  const report=await this.qaRunner({html:artifact.html,outputDir:resolvedOut,network:target,motionFilmstrip,recordVideo,...(browser?{browser}:{})});
  if(cacheEnabled&&report?.ok===true&&receiptKey&&qaReportSatisfiesOptions(report,{motionFilmstrip,recordVideo,isDefaultRunner})){
   await this.verifyCache.write(receiptKey,{report,outputDir:resolvedOut});
  }
  return {...report,cacheHit:false};
 }
 async export(id,{revisionId,target}){check(typeof revisionId==='string','E_NATIVE_ARGUMENT');assertNetworkTarget(target);const {project,accepted}=await this.read(id,revisionId),artifact=await this.build(id,project,target),outputDir=resolve(this.store.root,id,'qa',revisionId,target),creativeQa=requireCreativeQa(await this.runQa(id,{revisionId,target,outputDir}));return {...artifact,creativeQa,manifest:{...artifact.manifest,accepted,creativeQa:{format:CREATIVE_QA_FORMAT,ok:true,blockers:0,warnings:creativeQa.warnings.length},checks:[...artifact.manifest.checks,'creative-qa']}};}
 async exportBatch(id,{revisionId,targets,outputDir}){
  check(Array.isArray(targets)&&targets.length>=1&&targets.length<=8&&new Set(targets).size===targets.length,'E_NATIVE_ARGUMENT');
  check(typeof outputDir==='string'&&outputDir.length>0,'E_AGENT_OUTPUT');
  for(const target of targets)assertNetworkTarget(target);
  const current=await this.read(id,revisionId),resolvedDir=resolve(outputDir);
  const built=await mapWithConcurrency(targets,4,async target=>({target,artifact:await this.build(id,current.project,target)}));
  const verified=[];
  for(const {target,artifact}of built){
   const qaDir=resolve(this.store.root,id,'qa',current.revisionId,target);
   const creativeQa=requireCreativeQa(await this.runQa(id,{revisionId:current.revisionId,target,outputDir:qaDir}));
   verified.push({target,artifact,creativeQa});
  }
  await mkdir(resolvedDir,{recursive:true});
  const exports=[];
  for(const {target,artifact,creativeQa}of verified){
   const filename=target==='mintegral-appgrowth-zip'?`${id}.zip`:artifact.archiveBytes?`${id}-${target}.zip`:`${id}-${target}.html`;
   const output=resolve(resolvedDir,filename);
   await writeFile(output,artifact.archiveBytes??artifact.html);
   exports.push({target,output,artifactHash:artifact.manifest.artifactHash,bytes:artifact.manifest.bytes,packaging:artifact.manifest.packaging,cacheHit:Boolean(creativeQa.cacheHit)});
  }
  return {status:'EXPORTED',projectId:id,expected:{revisionId:current.revisionId,contentHash:current.contentHash},outputDir:resolvedDir,exports};
 }
}
