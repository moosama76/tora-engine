/** Compact deterministic adapters over the native authoring service. No model calls. */
import {Buffer} from 'node:buffer';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname,basename} from 'node:path';
import {ProjectStore} from '../project-store.mjs';
import {EditorState} from '../editor-state.mjs';
import {NativeService} from './service.mjs';
import {runtimeBundle} from './compiler.mjs';
import {exportProjectFile,importProjectPath} from './local-bundle.mjs';
import {playableHTML} from './html.mjs';
import {registerSource} from './assets.mjs';
import {capabilities,capabilitiesForPacks,compactCapabilities} from './contracts.mjs';
import {composeNativeConcept,CREATIVE_CONCEPT_SCHEMA} from './concept.mjs';
import {references,check} from './document.mjs';
const collections=['scenes','components','variables','gameplay','events','eventBindings','assets'];
const mutableCollections=['components','variables','gameplay','events','eventBindings'];
const identity=r=>({revisionId:r.revisionId,contentHash:r.contentHash});
const round1=n=>Math.round(Number(n)*10)/10;
const shortContract=id=>({rectangle:'rect',button:'btn',image:'img',group:'grp',ellipse:'ell',sprite:'spr','walk-sprite':'walk'})[id.replace(/^native\./,'').replace(/\.v1$/,'')]??id.replace(/^native\./,'').replace(/\.v1$/,'');
function bounded(value,limit){check(Buffer.byteLength(JSON.stringify(value))<=limit,'E_AGENT_NARROW_SCOPE');return value;}
function pick(record,fields){if(!fields)return record;const result={id:record.id};for(const key of fields){if(Object.hasOwn(record,key))result[key]=record[key];else if(key.startsWith('parameters.')&&Object.hasOwn(record.parameters??{},key.slice(11))){result.parameters??={};result.parameters[key.slice(11)]=record.parameters[key.slice(11)];}}return result;}
function descriptors(project,ids,fields){const result={},registry=capabilities().contracts;for(const c of project.components.filter(c=>ids.includes(c.id))){if(!c.contract||!registry[c.contract])continue;const keys=!fields||fields.includes('parameters')?Object.keys(c.parameters):fields.filter(k=>k.startsWith('parameters.')).map(k=>k.slice(11));if(keys.length)result[c.contract]={properties:Object.fromEntries(keys.filter(key=>Object.hasOwn(registry[c.contract].properties,key)).map(key=>[key,registry[c.contract].properties[key]]))};}return result;}
function records(project){return collections.flatMap(collection=>project[collection].map(record=>({collection,record})));}
function recordRefs(record){
 const refs=[...references(record)];
 if(record?.parentId)refs.push(record.parentId);
 if(record?.contract==='native.text.v1'&&typeof record.parameters?.text==='string'){
  for(const m of record.parameters.text.matchAll(/\{\{([a-z0-9_.-]+)\}\}/g))refs.push(m[1]);
 }
 return refs;
}
function summarizeEvent(event){
 if(!event)return '?';
 const target=event.componentId??event.sceneId??event.variableId??event.behaviorId??'';
 return target?`${event.kind}(${target})`:event.kind;
}
function summarizeActions(actions){
 const groups=[];
 for(const action of actions){
  const target=action.componentId??action.variableId??action.behaviorId??action.sceneId??action.prototypeId??'';
  const prev=groups[groups.length-1];
  if(prev&&prev.kind===action.kind&&target){
   if(!prev.targets.includes(target))prev.targets.push(target);
  }else{
   groups.push({kind:action.kind,targets:target?[target]:[]});
  }
 }
 return groups.map(g=>g.targets.length?`${g.kind}(${g.targets.join(',')})`:g.kind).join(', ');
}
export function buildInspectTree(projectId,current,sceneId){
 const project=current.project;
 if(sceneId!==undefined)check(typeof sceneId==='string'&&project.scenes.some(s=>s.id===sceneId),'E_AGENT_UNKNOWN_SCENE');
 const behaviorsByComp=new Map();
 for(const b of project.gameplay){
  if(!behaviorsByComp.has(b.componentId))behaviorsByComp.set(b.componentId,[]);
  behaviorsByComp.get(b.componentId).push(b.kind);
 }
 const targetScenes=sceneId?project.scenes.filter(s=>s.id===sceneId):project.scenes;
 const sceneCompIds=new Set();
 const scenes=targetScenes.map(scene=>{
  const comps=project.components.filter(c=>c.sceneId===scene.id);
  for(const c of comps)sceneCompIds.add(c.id);
  const childrenOf=parentKey=>comps.filter(c=>(c.parentId??scene.id)===parentKey).sort((a,b)=>a.order-b.order||(a.id<b.id?-1:a.id>b.id?1:0));
  const nodes=[];
  const walk=(parentKey,depth)=>{
   for(const c of childrenOf(parentKey)){
    const p=c.parameters??{},parts=[`${'  '.repeat(depth)}${c.id} [${shortContract(c.contract)}]`];
    if(c.contract==='native.mesh3d.v1'){
     parts.push(`${p.primitive??'box'}@(${round1(p.x??0)},${round1(p.y??0)},${round1(p.z??0)})`);
    }else{
     const t=c.transform??[1,0,0,1,0,0],tx=round1(t[4]),ty=round1(t[5]),w=round1(p.width??0),h=round1(p.height??0);
     if(tx!==0||ty!==0)parts.push(`@(${tx},${ty})`);
     if(w!==0||h!==0)parts.push(`${w}x${h}`);
    }
    const assetId=c.assetSlots?.[0]?.assetId;
    if(assetId)parts.push(`a:${assetId}`);
    if(typeof p.text==='string'){const clean=p.text.replace(/\s+/g,' ');parts.push(`"${clean.length>24?clean.slice(0,23)+'…':clean}"`);}
    if(p.visible===false)parts.push('hidden');
    if(c.prototype)parts.push('proto');
    if(p.enabled===false)parts.push('disabled');
    const behs=behaviorsByComp.get(c.id);
    if(behs?.length)parts.push(`[${behs.join(',')}]`);
    nodes.push(parts.join(' '));
    walk(c.id,depth+1);
   }
  };
  walk(scene.id,0);
  return {id:scene.id,label:scene.label,role:scene.role,nodes};
 });
 const eventsById=new Map(project.events.map(e=>[e.id,e]));
 const bindings=project.eventBindings.filter(b=>{
  if(!sceneId)return true;
  const ev=eventsById.get(b.eventId);
  if(ev?.sceneId===sceneId||(ev?.componentId&&sceneCompIds.has(ev.componentId)))return true;
  return b.actions.some(a=>a.sceneId===sceneId||(a.componentId&&sceneCompIds.has(a.componentId)));
 }).map(b=>`${b.id}: ${summarizeEvent(eventsById.get(b.eventId))} -> ${summarizeActions(b.actions)}`);
 return bounded({
  projectId,expected:identity(current),accepted:current.accepted,
  base:{width:project.base.width,height:project.base.height,startScene:project.base.startScene,storeUrl:project.base.storeUrl},
  assets:project.assets.map(a=>`${a.id} (${a.mime},${a.bytes}B)`),
  variables:project.variables.map(v=>`${v.id}:${v.type}=${JSON.stringify(v.initial)}`),
  scenes,bindings,
 },16384);
}
export class NativeAgentTools{
 constructor(service=new NativeService(new ProjectStore(resolve('.tora/native-projects')),undefined)){this.service=service;this.previewCache=new Map();if(!service.history)service.history=new EditorState(service.store);}
 async run(input){check(input&&typeof input==='object'&&!Array.isArray(input),'E_AGENT_ARGUMENT');const {command,id}=input;
 if(command==='contracts'){
  check(input.format===undefined||['full','compact'].includes(input.format),'E_AGENT_ARGUMENT');
  check(input.packs===undefined||Array.isArray(input.packs),'E_AGENT_CONTRACT_SCOPE');
  if(input.names!==undefined)check(Array.isArray(input.names)&&input.names.length>0&&input.names.length<=16,'E_AGENT_CONTRACT_SCOPE');
  else check(Boolean(input.packs),'E_AGENT_CONTRACT_SCOPE');
  if(input.format==='compact'){
   const rawNames=input.names??[],wantsConcept=rawNames.includes('creative-concept'),otherNames=rawNames.filter(n=>n!=='creative-concept');
   const result=input.packs||otherNames.length?compactCapabilities({packs:input.packs,names:otherNames.length?otherNames:undefined}):{format:'tora-creation-capabilities-compact-1'};
   if(wantsConcept)result['creative-concept']=CREATIVE_CONCEPT_SCHEMA;
   return bounded(result,input.packs?65536:24576);
  }
  const cap=capabilities();
  const result=input.packs?capabilitiesForPacks(input.packs):{};
  for(const name of input.names??[]){
   if(cap.contracts[name]){if(input.packs){result.contracts??={};result.contracts[name]=cap.contracts[name];}else result[name]=cap.contracts[name];}
   else if(cap.behaviors[name]){if(input.packs){result.behaviors??={};result.behaviors[name]=cap.behaviors[name];}else result[name]=cap.behaviors[name];}
   else if(name==='creative-concept')result['creative-concept']=CREATIVE_CONCEPT_SCHEMA;
   else if(name==='operations')result.operations=cap.operations;
   else if(name==='actions')result.actions=cap.actions;
   else if(name==='events')result.events=cap.events;
   else if(name==='limits')result.limits=cap.limits;
   else throw Error('E_AGENT_UNKNOWN_CONTRACT');
  }
  return bounded(result,input.packs?65536:24576);
 }
 if(command==='compose'){
  const composition=composeNativeConcept(input.concept);
  const summary={status:'COMPOSED',projectId:id,conceptHash:composition.conceptHash,conceptAccepted:false,accepted:false,creativeStatus:composition.creativeStatus,unmetRequirements:composition.unmetRequirements,requirements:composition.requirements,...(composition.recipe?{recipe:composition.recipe}:{})};
  // Check response capacity before creating a project or committing a revision.
  bounded({...summary,expected:{revisionId:'rev-'+'0'.repeat(36),contentHash:'sha256:'+'0'.repeat(64)}},24576);
  const created=await this.service.create({id,name:input.name??input.concept?.product?.name});
  const registered=new Map();for(const asset of composition.assets)registered.set(asset.id,await registerSource(resolve(this.service.store.root,id),asset));
  const operations=composition.operations.map(operation=>{if(operation.kind!=='registerAsset'||!registered.has(operation.asset.id))return operation;const metadata=registered.get(operation.asset.id);return {...operation,asset:{...operation.asset,hash:metadata.hash,mime:metadata.mime,bytes:metadata.bytes}};});
  const envelope={format:'tora-transaction-1',expected:identity(created),operations};
  const preview=await this.service.preview(id,envelope);
  const record=composition.recipe?(state,revision)=>{
   state.authoring={recipe:composition.recipe,conceptHash:composition.conceptHash,createdRevisionId:revision.revisionId};
  }:undefined;
  const result=await this.service.transact(id,{...envelope,previewDigest:preview.previewDigest},{record});
  return {...summary,expected:identity(result)};
 }
 if(command==='create'){const r=await this.service.create({id,name:input.name,...(input.androidUrl?{androidUrl:input.androidUrl}:{})});return bounded({status:'CREATED',projectId:id,expected:identity(r)},4096);}
 if(command==='import'){check(typeof input.file==='string','E_AGENT_ARGUMENT');return bounded(await importProjectPath(this.service,input.file,{copy:input.copy===true}),4096);}
 if(command==='export'&&input.format==='project'){check(typeof input.output==='string'&&input.output.length>0,'E_AGENT_OUTPUT');const text=await exportProjectFile(this.service,id),output=resolve(input.output);await mkdir(dirname(output),{recursive:true});await writeFile(output,text);return {status:'EXPORTED',projectId:id,output,format:'tora-project-bundle',version:1};}
 const current=await this.service.read(id,input.revisionId);
 if(command==='inspect'){
  if(input.full)return {projectId:id,expected:identity(current),accepted:current.accepted,project:current.project};
  if(input.tree)return buildInspectTree(id,current,input.sceneId);
  const all=records(current.project);
  if(input.ids){check(Array.isArray(input.ids)&&input.ids.length>0&&input.ids.length<=64&&new Set(input.ids).size===input.ids.length,'E_AGENT_SCOPE');check(input.ids.every(id=>all.some(x=>x.record.id===id)),'E_AGENT_UNKNOWN_RECORD');if(input.fields)check(Array.isArray(input.fields)&&input.fields.every(k=>typeof k==='string'),'E_AGENT_FIELDS');const selected=new Set(input.ids),needed=new Set(input.ids);for(const id of input.ids){let component=current.project.components.find(c=>c.id===id);while(component){needed.add(component.sceneId);if(component.parentId)needed.add(component.parentId);component=current.project.components.find(c=>c.id===component.parentId);}}
   for(const {record}of all)if(selected.has(record.id))for(const ref of references(record))needed.add(ref);
   const related=all.filter(({record})=>needed.has(record.id)||references(record).some(ref=>selected.has(ref)));
   return bounded({projectId:id,expected:identity(current),records:related.map(({collection,record})=>({collection,...pick(record,selected.has(record.id)?input.fields:undefined)})),contracts:descriptors(current.project,input.ids,input.fields)},24576);
  }
  if(input.search!==undefined){check(typeof input.search==='string'&&input.search.length<=128,'E_AGENT_ARGUMENT');const query=input.search.toLowerCase();return bounded({projectId:id,expected:identity(current),matches:all.filter(({record})=>(record.id+' '+(record.label??'')).toLowerCase().includes(query)).map(({collection,record})=>({collection,id:record.id,label:record.label}))},8192);}
  return bounded({projectId:id,expected:identity(current),goal:current.project.creativeBrief.goal,scenes:current.project.scenes,counts:Object.fromEntries(collections.map(k=>[k,current.project[k].length])),targets:capabilities().targets},8192);
 }
 if(command==='edit'){
  check(input.expected&&Array.isArray(input.scope)&&input.scope.every(s=>typeof s==='string'),'E_AGENT_ARGUMENT');
  check(input.scopeCreates===undefined||typeof input.scopeCreates==='boolean','E_AGENT_ARGUMENT');
  const hasOps=input.operations!==undefined,hasCommit=input.commitPreviewDigest!==undefined;
  check(hasOps!==hasCommit,'E_AGENT_ARGUMENT');
  if(hasOps)check(Array.isArray(input.operations),'E_AGENT_ARGUMENT');
  if(hasCommit)check(typeof input.commitPreviewDigest==='string'&&input.commitPreviewDigest.length>0,'E_AGENT_ARGUMENT');
  check(input.expected.revisionId===current.revisionId&&input.expected.contentHash===current.contentHash,'E_NATIVE_STALE');
  let operations,previewDigest,changed,warnings,previewProject;
  if(hasCommit){
   const cached=this.previewCache.get(input.commitPreviewDigest);
   check(cached&&cached.id===id&&cached.expected.revisionId===input.expected.revisionId&&cached.expected.contentHash===input.expected.contentHash,'E_NATIVE_PREVIEW_STALE');
   this.previewCache.delete(input.commitPreviewDigest);this.previewCache.set(input.commitPreviewDigest,cached);
   ({operations,previewDigest,changed,warnings,previewProject}=cached);
  }else{
   operations=input.operations;
   const envelope={format:'tora-transaction-1',expected:input.expected,operations},preview=await this.service.preview(id,envelope);
   previewDigest=preview.previewDigest;warnings=preview.effects.warnings;previewProject=preview.project;
   changed=[...new Set(Object.values(preview.effects.changed).flat())];
   if(JSON.stringify(preview.project.base)!==JSON.stringify(current.project.base))changed.push('$project.base');
   this.previewCache.delete(previewDigest);
   this.previewCache.set(previewDigest,{id,expected:input.expected,operations,previewDigest,changed,warnings,previewProject});
   while(this.previewCache.size>16)this.previewCache.delete(this.previewCache.keys().next().value);
  }
  const scope=new Set(input.scope);
  let outside;
  if(input.scopeCreates){
   const existingAll=new Set(collections.flatMap(col=>current.project[col].map(r=>r.id)));
   const existingMutable=new Set(mutableCollections.flatMap(col=>current.project[col].map(r=>r.id)));
   const previewById=new Map(collections.flatMap(col=>previewProject[col].map(r=>[r.id,r])));
   outside=changed.filter(cid=>{
    if(scope.has(cid))return false;
    if(cid==='$project.base'||existingAll.has(cid))return true;
    const rec=previewById.get(cid);
    if(!rec)return true;
    const refs=recordRefs(rec);
    return refs.some(ref=>existingMutable.has(ref)&&!scope.has(ref));
   });
  }else{
   outside=changed.filter(cid=>!scope.has(cid));
  }
  // Explicit scope includes all intended writes (or reference-safe creates when scopeCreates:true).
  if(input.previewOnly||outside.length){return bounded({status:'PREVIEW',expected:input.expected,previewDigest,changedIds:changed,outsideScope:outside,warnings},24576);}
  if(input.previewDigest)check(input.previewDigest===previewDigest,'E_NATIVE_PREVIEW_STALE');
  const detailed={status:'COMMITTED',changedIds:changed,warnings},summary=Buffer.byteLength(JSON.stringify({...detailed,expected:{revisionId:'rev-'+'0'.repeat(36),contentHash:'sha256:'+'0'.repeat(64)}}))<=4096?detailed:{status:'COMMITTED',changedCount:changed.length,changedIdsOmitted:true,warnings};bounded({...summary,expected:{revisionId:'rev-'+'0'.repeat(36),contentHash:'sha256:'+'0'.repeat(64)}},4096);
  const result=await this.service.transact(id,{format:'tora-transaction-1',expected:input.expected,operations,previewDigest});
  this.previewCache.delete(previewDigest);
  return {...summary,expected:identity(result)};
 }
 if(command==='history'){check(input.expected,'E_AGENT_EXPECTED');const r=await this.service.navigate(id,{expected:input.expected,action:input.action});return {status:'SAVED',expected:identity(r)};}
 if(command==='export'||command==='render'||command==='qa'){
  if(command==='qa'){const output=resolve(input.output??resolve(this.service.store.root,id,'qa','manual',current.revisionId));return bounded(await this.service.runQa(id,{revisionId:current.revisionId,target:input.target??'standalone-browser-draft',outputDir:output}),65536);}
  if(command==='export'&&input.targets!==undefined){
   check(input.format===undefined&&input.output===undefined&&input.target===undefined,'E_AGENT_ARGUMENT');
   check(typeof input.outputDir==='string'&&input.outputDir.length>0,'E_AGENT_OUTPUT');
   return bounded(await this.service.exportBatch(id,{revisionId:current.revisionId,targets:input.targets,outputDir:input.outputDir}),16384);
  }
  check(typeof input.output==='string'&&input.output.length>0,'E_AGENT_OUTPUT');const output=resolve(input.output);let html,archiveBytes,artifactHash,sceneId,manifest;
  if(command==='render'){sceneId=input.sceneId??current.project.base.startScene;check(current.project.scenes.some(scene=>scene.id===sceneId),'E_AGENT_UNKNOWN_SCENE');const render=await this.service.render(id,current.revisionId);html=playableHTML({...current.project,assets:render.assets},await runtimeBundle(),{edit:true,sceneId});const {hash}=await import('./compiler.mjs');artifactHash=hash(html);}else{const artifact=await this.service.export(id,{revisionId:current.revisionId,target:input.target??'standalone-browser-draft'});html=artifact.html;archiveBytes=artifact.archiveBytes;artifactHash=artifact.manifest.artifactHash;manifest=artifact.manifest;if(artifact.archiveBytes){check(output.toLowerCase().endsWith('.zip'),'E_AGENT_OUTPUT');if((input.target??'') === 'mintegral-appgrowth-zip')check(basename(output)===`${id}.zip`,'E_AGENT_OUTPUT');}}
  await mkdir(dirname(output),{recursive:true});await writeFile(output,archiveBytes??html);return bounded({status:command==='render'?'RENDER_READY':'EXPORTED',projectId:id,expected:identity(current),output,artifactHash,target:command==='render'?'editor-preview':input.target??'standalone-browser-draft',...(manifest?{bytes:manifest.bytes,packaging:manifest.packaging}:{}),...(sceneId?{sceneId,edit:true}:{})},4096);
 }
 throw Error('E_AGENT_COMMAND');
 }
}
