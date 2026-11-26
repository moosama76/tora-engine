import {Buffer} from 'node:buffer';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {isDeepStrictEqual} from 'node:util';
import {fileURLToPath,URL} from 'node:url';
import {capabilities} from './contracts.mjs';
import {applyOperations,check,exact,identifier} from './document.mjs';
import {registerSource} from './assets.mjs';
import {validateAssetPolicy} from './asset-policy.mjs';
import {reviewOperations,reviewTargets} from './review-targets.mjs';
import {createProjectIndex,resolveProjectRoles} from './project-index.mjs';
import {getModule} from './modules/index.mjs';
import {requireCreativeQa} from './service.mjs';
import {hash} from './compiler.mjs';
import {loadCatalog} from './catalog-cache.mjs';
import {isAudioMime} from './media-validate.mjs';

const root=fileURLToPath(new URL('../../../',import.meta.url));
function projectModule(project){
 const resolution=resolveProjectRoles(createProjectIndex(project));
 return {resolution,descriptor:resolution.module&&resolution.module!=='tora-native-primitives'?getModule(resolution.module):null};
}
const collections=['scenes','components','variables','gameplay','events','eventBindings','assets'];
const string={type:'string'};
const strings={type:'array',items:string};
const object=(properties,required=[])=>({type:'object',properties,required,additionalProperties:false});
const editSchema=object({
 noteId:string,operations:{type:'array',items:{type:'object'}},scope:strings,
 imports:{type:'array',items:object({catalogId:string,assetId:string},['catalogId','assetId'])},
 changes:{type:'object'},target:string,
},['noteId']);
const definition=(name,description,properties,required)=>({type:'function',function:{name,description,parameters:object(properties,required)}});
const toolDefinitions=[
 definition('inspect','Inspect the working baseline. No arguments returns the project overview. Search record IDs and labels, or read exact records and their referring IDs. Use collection/offset for paging.',{
  ids:strings,search:string,collection:{enum:collections,type:'string'},offset:{type:'integer',minimum:0},previewDigest:string,
 }),
 definition('contracts','List available contracts and supported native operations, or get descriptors by name, including actions, events and operations.',{names:strings}),
 definition('audio','Inspect playable audio routing (bindings, event IDs, conditions, audio assets, bus and volume) and importable licensed WAV cues. Media bytes stay local.',{previewDigest:string}),
 definition('layout','Inspect visible Harvest loss-screen controls and text from a real packaged landscape playthrough. Returns component IDs, text bounds, clipping, and the offset from vertical center between the panel top and install button. Omit previewDigest for the baseline.',{previewDigest:string}),
 definition('preview','Propose all notes in one batch against the original revision. One edit per note. For a pinned note pass changes keyed by authorized field. For unpinned notes optionally use target and changes from the allowed list, or pass native operations and scope listing every changed record ID, including new IDs. Optional imports stage catalog WAVs under assetId. Audio routing supports {kind:"setBindingAudio",bindingId,assetId,replaceBehaviorId?}; omit replaceBehaviorId to add an additional cue. The audio tool describes the required scope. You may append another native action using {kind:"appendAction",bindingId,action}. The preview can be revised. Return its digest with your final noteResults.',{
  edits:{type:'array',items:editSchema},
 },['edits']),
 definition('exercise','Package a validated preview, run Creative QA, and exercise supported audio outcomes. Returns server evidence IDs for final noteResults verification, and actual checks completed. Call after preview.',{previewDigest:string},['previewDigest']),
 definition('qa','Run deterministic static, acoustic, four-viewport layout and primary-interaction QA on the baseline or a packaged preview. Returns exact component defects and labeled screenshot paths. Call this to diagnose an E_CREATIVE_QA rejection.',{previewDigest:string}),
];

function bounded(value,limit=16384){
 check(Buffer.byteLength(JSON.stringify(value))<=limit,'E_AGENT_NARROW_SCOPE');
 return value;
}
const byId=(records,id)=>records.find(record=>record.id===id);
const indexes=new WeakMap();
function indexProject(project){
 if(!indexes.has(project))indexes.set(project,createProjectIndex(project));
 return indexes.get(project);
}
function changedRecords(before,after){
 const first=indexProject(before),next=indexProject(after);
 const ids=new Set([...first.entries(),...next.entries()].map(([id])=>id));
 const changed=[...ids].filter(id=>!isDeepStrictEqual(first.record(id),next.record(id)));
 if(!isDeepStrictEqual(before.base,after.base))changed.push('$project.base');
 return changed;
}
function sanitizedRecord(collection,record){
 if(collection==='assets')return {id:record.id,hash:record.hash,mime:record.mime,bytes:record.bytes};
 return record;
}
function inspect(project,{ids,search,collection,offset=0}){
 const index=indexProject(project);
 if(ids!==undefined){
  check(Array.isArray(ids)&&ids.length>0&&ids.length<=16&&ids.every(id=>index.record(id)),'E_AGENT_UNKNOWN_RECORD');
  return bounded({records:ids.map(id=>{
   const {collection,record}=index.record(id);
   return {collection,...sanitizedRecord(collection,record),referencedBy:index.referencedBy(id)};
  })});
 }
 if(collection!==undefined||search!==undefined){
  check((collection===undefined||collections.includes(collection))&&(search===undefined||typeof search==='string'&&search.length<=128)&&Number.isSafeInteger(offset)&&offset>=0,'E_AGENT_ARGUMENT');
  const needle=(search??'').toLowerCase();
  const matches=[...index.entries()].map(([,item])=>item).filter(item=>(!collection||item.collection===collection)&&[item.record.id,item.record.label,item.record.kind,item.record.parameters?.text].some(value=>typeof value==='string'&&value.toLowerCase().includes(needle)));
  return {total:matches.length,matches:matches.slice(offset,offset+40).map(({collection,record})=>({collection,id:record.id,label:record.label,kind:record.kind}))};
 }
 return {goal:project.creativeBrief.goal,base:{width:project.base.width,height:project.base.height,startScene:project.base.startScene},scenes:project.scenes,counts:Object.fromEntries(collections.map(c=>[c,project[c].length]))};
}
const blockedOperations=new Set(['registerAsset','setStore']);
function contractInfo(names){
 const cap=capabilities();
 const operations=cap.operations.filter(name=>!blockedOperations.has(name)).concat('appendAction','setBindingAudio','adjustTarget');
 if(!names?.length)return {components:Object.keys(cap.contracts),behaviors:Object.keys(cap.behaviors),operations,lookups:['events','actions','conditions','limits']};
 check(Array.isArray(names)&&names.length<=12,'E_AGENT_CONTRACT_SCOPE');
 const registry={...cap.contracts,...cap.behaviors,operations,events:cap.events,actions:cap.actions,conditions:cap.conditions,limits:cap.limits};
 for(const name of names)check(typeof name==='string'&&Object.hasOwn(registry,name),'E_AGENT_UNKNOWN_CONTRACT');
 return bounded(Object.fromEntries(names.map(name=>[name,registry[name]])));
}
export async function catalogAudio(){
 return (await loadCatalog()).audioFiles;
}
function audioRoutes(project){
 const assets=new Map(project.assets.map(a=>[a.id,a]));
 return project.gameplay.filter(b=>b.kind==='audio').map(behavior=>{
  const component=byId(project.components,behavior.componentId);
  const asset=assets.get(component?.assetSlots[0]?.assetId);
  const bindings=project.eventBindings.filter(binding=>binding.actions.some(a=>a.kind==='playAudio'&&a.behaviorId===behavior.id))
   .map(({id,eventId,condition})=>({id,eventId,...(condition?{condition}:{})}));
  return {behaviorId:behavior.id,componentId:behavior.componentId,assetId:asset?.id,assetHash:asset?.hash,...behavior.parameters,bindings};
 });
}
async function stageAudio(service,id,imports){
 check(Array.isArray(imports)&&imports.length<=8,'E_REVIEW_IMPORT');
 if(!imports.length)return [];
 const catalog=await catalogAudio();
 const operations=[];
 for(const item of imports){
  check(exact(item,['catalogId','assetId'])&&identifier(item.assetId),'E_REVIEW_IMPORT');
  const choice=catalog.find(cue=>cue.catalogId===item.catalogId);
  check(choice,'E_REVIEW_IMPORT');
  const {source,file}=choice;
  const provenance={origin:'third-party-free',sourceId:source.id,sourceFile:file.path,sourceHash:file.sha256,author:source.author,license:source.license,sourceUrl:source.sourceUrl,styleFamily:source.styleFamily};
  const data=(await readFile(resolve(root,file.file))).toString('base64');
  const receipt=validateAssetPolicy({mime:file.mime,data,provenance},{role:'audio'});
  const rights=[source.author+', '+source.license+'. '+source.sourceUrl,receipt.attribution].filter(Boolean).join('\n');
  const asset=await registerSource(resolve(service.store.root,id),{id:item.assetId,mime:file.mime,data,rights}),record={...asset};delete record.optimization;
  operations.push({kind:'registerAsset',asset:{...record,provenance:JSON.stringify(receipt)}});
 }
 return operations;
}
/** Attach a cue to an existing authored event without copying unrelated actions or
 * changing the signal used by any other event. Reuse a bound one-shot where possible. */
function routeAudio(project,bindings,routes,op,assetIds){
 check(exact(op,['kind','bindingId','assetId','replaceBehaviorId'])&&assetIds.has(op.assetId),'E_REVIEW_AUDIO_ROUTE');
 const binding=bindings.get(op.bindingId);
 check(binding,'E_NATIVE_BINDING');
 const oldIndex=op.replaceBehaviorId===undefined?-1:binding.actions.findIndex(action=>action.kind==='playAudio'&&action.behaviorId===op.replaceBehaviorId);
 check(op.replaceBehaviorId===undefined||oldIndex!==-1,'E_REVIEW_AUDIO_ROUTE');
 const oldRoute=routes.find(route=>route.behaviorId===op.replaceBehaviorId);
 const parameters=oldRoute?.parameters??{bus:'sfx',loop:false,volume:.4,frequency:660,seconds:.15};
 let route=routes.find(item=>item.assetId===op.assetId&&!item.parameters.loop&&item.parameters.volume>0);
 const ops=[];
 if(!route){
  const componentId=binding.id+'.cue',behaviorId=componentId+'.play';
  check(identifier(behaviorId)&&!project.components.some(c=>c.id===componentId)&&!routes.some(r=>r.behaviorId===behaviorId),'E_REVIEW_AUDIO_ROUTE');
  const sceneId=project.components.find(c=>c.id===oldRoute?.componentId)?.sceneId??project.base.startScene;
  route={componentId,behaviorId,parameters,assetId:op.assetId};
  routes.push(route);
  ops.push({kind:'createComponent',component:{id:componentId,contract:'native.group.v1',sceneId,parameters:{visible:false},assetSlots:[{slotId:'source',assetId:op.assetId}]}},
   {kind:'putBehavior',behavior:{id:behaviorId,componentId,kind:'audio',parameters}});
 }
 const actions=[...binding.actions];
 const play={kind:'playAudio',behaviorId:route.behaviorId};
 if(oldIndex>=0)actions[oldIndex]=play;
 else {
  check(!actions.some(action=>isDeepStrictEqual(action,play)),'E_REVIEW_NO_CHANGE');
  actions.push(play);
 }
 const next={...binding,actions};
 bindings.set(next.id,next);
 return [...ops,{kind:'putBinding',binding:next}];
}
function expandOperations(project,operations,imports){
 check(Array.isArray(operations)&&operations.length<=128,'E_NATIVE_OPERATIONS');
 const bindings=new Map(project.eventBindings.map(b=>[b.id,b]));
 const assetIds=new Set([...project.assets,...imports.map(op=>op.asset)].filter(a=>isAudioMime(a.mime)).map(a=>a.id));
 const routes=project.gameplay.filter(b=>b.kind==='audio').map(b=>({behaviorId:b.id,componentId:b.componentId,parameters:b.parameters,assetId:byId(project.components,b.componentId)?.assetSlots[0]?.assetId}));
 return operations.flatMap(op=>{
  check(op&&typeof op.kind==='string'&&!blockedOperations.has(op.kind),'E_REVIEW_OPERATION');
  if(op.kind==='adjustTarget'){
   const target=reviewTargets(project).targets.find(t=>t.id===op.target);
   check(target&&exact(op,['kind','target','changes']),'E_REVIEW_SCOPE');
   return reviewOperations(project,target.id,target.fields.filter(field=>!field.confirm).map(field=>field.id),op.changes,project).operations;
  }
  if(op.kind==='setBindingAudio')return routeAudio(project,bindings,routes,op,assetIds);
  if(op.kind==='appendAction'){
   check(exact(op,['kind','bindingId','action'])&&bindings.has(op.bindingId),'E_NATIVE_BINDING');
   const original=bindings.get(op.bindingId);
   op={kind:'putBinding',binding:{...original,actions:[...original.actions,op.action]}};
  }
  if(op.kind==='putBinding'&&op.binding)bindings.set(op.binding.id,op.binding);
  if(op.kind==='deleteBinding')bindings.delete(op.id);
  return [op];
 });
}
function preserveSharedArt(before,after){
 const images=new Set(before.assets.filter(a=>a.mime.startsWith('image/')).map(a=>a.id));
 const counts=new Map();
 for(const component of before.components){
  const assetId=component.assetSlots[0]?.assetId;
  if(images.has(assetId))counts.set(assetId,(counts.get(assetId)??0)+1);
 }
 for(const component of before.components){
  const source=component.assetSlots[0]?.assetId;
  if(counts.get(source)>1){
   const retained=byId(after.components,component.id);
   check(!retained||retained.assetSlots[0]?.assetId===source,'E_REVIEW_SHARED_ART_SCOPE');
  }
 }
}

// Keep candidate evidence independent of the model's description of its own edits.
function recordEvidence(before,after,id){
 const a=indexProject(before).record(id),b=indexProject(after).record(id);
 if(!a)return 'Added '+id;
 if(!b)return 'Removed '+id;
 const hints=[];
 function collect(first,next,path){
  if(hints.length>=3||isDeepStrictEqual(first,next))return;
  if(first&&next&&typeof first==='object'&&typeof next==='object'){
   for(const key of new Set([...Object.keys(first),...Object.keys(next)]))collect(first[key],next[key],[...path,key]);
  }else{
   const value=typeof next==='object'?undefined:JSON.stringify(next);
   hints.push(path.join('.')+(value&&value.length<=110?' = '+value:''));
  }
 }
 collect(sanitizedRecord(a.collection,a.record),sanitizedRecord(b.collection,b.record),[]);
 return 'Changed '+id+(hints.length?' ('+hints.join(', ')+')':'');
}
function modelText(answer,key){
 check(exact(answer,[key])&&typeof answer[key]==='string'&&answer[key].trim()&&answer[key].length<=500,'E_REVIEW_MODEL_RESPONSE');
 return answer[key].trim();
}
function resumedPreview(progress,digest){
 const calls=new Map();
 for(const message of progress?.messages??[]){
  for(const call of message.tool_calls??[])if(call.function.name==='preview')calls.set(call.id,call.function.arguments);
  if(message.role==='tool'&&calls.has(message.tool_call_id)){
   try{if(JSON.parse(message.content).previewDigest===digest)return JSON.parse(calls.get(message.tool_call_id));}catch{/* Ignore unrelated incomplete calls. */}
  }
 }
}

// Only this locally authored probe is evaluated in the browser. The model supplies a
// preview digest, and receives measured bounds and strings from the packaged canvas.
async function inspectHarvestLayout(page){
 const project=await page.evaluate(()=>JSON.parse(globalThis.document.getElementById('project').textContent));
 const {resolution}=projectModule(project),panelId=resolution.roles?.outcomePanel?.componentId,ctaId=resolution.roles?.primaryCta?.componentId;
 const replay=project.components.find(component=>component.id==='harvest.replay'||component.id==='salvage.replay')?.id;
 return page.evaluate(({panelId,ctaId,replay})=>{
  const project=JSON.parse(globalThis.document.getElementById('project').textContent);
  const runtime=globalThis.toraRuntime,state=runtime.state();
  const components=new Map(project.components.map(c=>[c.id,c]));
  const responsive=new Map(project.gameplay.filter(b=>b.kind==='responsive-layout').map(b=>[b.componentId,b.parameters]));
  function bounds(id){
   const chain=[];
   let c=components.get(id);
   while(c){chain.unshift(c);c=components.get(c.parentId);}
   let matrix=new globalThis.DOMMatrix();
   for(const node of chain){
    const t=[...(state.components[node.id]?.transform??node.transform)];
    const layout=responsive.get(node.id);
    if(state.viewport.landscape&&layout){
     t[4]+=layout.x-node.transform[4];t[5]+=layout.y-node.transform[5];
     t[0]*=layout.scaleX;t[1]*=layout.scaleX;t[2]*=layout.scaleY;t[3]*=layout.scaleY;
    }
    matrix=matrix.multiply(new globalThis.DOMMatrix(t));
   }
   const props={...chain.at(-1).parameters,...state.components[id]?.parameters};
   const points=[[0,0],[props.width,0],[0,props.height],[props.width,props.height]].map(([x,y])=>matrix.transformPoint({x,y}));
   return {top:Math.min(...points.map(p=>p.y)),bottom:Math.max(...points.map(p=>p.y)),left:Math.min(...points.map(p=>p.x)),right:Math.max(...points.map(p=>p.x))};
  }
  const ids=project.components.filter(c=>c.id===panelId||c.contract==='native.text.v1'||c.id===ctaId||c.id===replay).map(c=>c.id);
  const audit=runtime.auditViewport(ids),missing=new Set(audit.missing);
  const visible=ids.filter(id=>!missing.has(id)).map(id=>{
   const raw=state.components[id]?.parameters.text??components.get(id).parameters.text;
   const text=raw?.replace(/\{\{([a-z0-9_.-]+)\}\}/g,(_,key)=>String(state.variables[key]));
   return {id,bounds:bounds(id),...(text?{text}:{})};
  });
  const panel=visible.find(c=>c.id===panelId),cta=visible.find(c=>c.id===ctaId);
  const contentCenter=panel&&cta?(panel.bounds.top+cta.bounds.top)/2:null;
  for(const label of visible.filter(c=>c.text&&contentCenter!==null))label.verticalOffset=(label.bounds.top+label.bounds.bottom)/2-contentCenter;
  return {viewport:audit.viewport,clipped:audit.issues.map(issue=>issue.id),contentCenter,visible};
 },{panelId,ctaId,replay});
}
const mentionsLayout=text=>/\b(landscape|horizontal|sideways)\b/i.test(text)&&/clip|cut off|center|centre|inset|overflow|margin/i.test(text);
async function outcomeEvidence(project,candidate,artifact,notes,exercise,intent,{browser,verifyCache,onReceipt,scenario}={}){
 const routes=audioRoutes(project),{resolution,descriptor}=projectModule(project);
 if(resolution.status!=='resolved'||!descriptor?.outcomeAudio)return [];
 const finalBinding=resolution.roles.winEvent.bindingId,deadlineBinding=resolution.roles.timeoutEvent.bindingId;
 const tiedTo=(routes,binding)=>routes.filter(route=>route.bindings.some(b=>b.id===binding));
 const oldWin=tiedTo(routes,finalBinding)[0];
 const feedback=notes.map(note=>note.note.toLowerCase()+(note.moment==='end-card'?' win':'')+(note.moment==='timeout'?' loss':''));
 const hasAudio=text=>/\b(sound|music|audio|cue|jingle|sfx)s?\b/.test(text);
 const win=text=>/\b(win|wins|won|winning|victory|complet\w*|success|payoff)\b/.test(text);
 const loss=text=>/\b(loss|lose|lost|losing|fail\w*|timeout)\b/.test(text);
 const typed=intent?.action==='transferOutcomeCue';
 const both=typed||feedback.some(text=>hasAudio(text)&&win(text)&&loss(text));
 const needWin=typed||feedback.some(text=>hasAudio(text)&&win(text));
 const needLoss=typed||feedback.some(text=>hasAudio(text)&&loss(text));
 if(!needWin&&!needLoss)return [];
 const nextRoutes=audioRoutes(candidate);
 const audioChanged=!isDeepStrictEqual(routes,nextRoutes);
 check(audioChanged,'E_REVIEW_AUDIO_UNCHANGED');
 if(typed){
  for(const route of routes.filter(route=>route.behaviorId!==oldWin?.behaviorId)){
   check(isDeepStrictEqual(route,nextRoutes.find(next=>next.behaviorId===route.behaviorId)),'E_REVIEW_ORDINARY_AUDIO_CHANGED');
  }
 }
 const outcomes=[...(needWin?['win']:[]),...(needLoss?['loss']:[])];
 let result;
 if(exercise)result=await exercise(artifact,{outcomes,accelerateIdle:true});
 else{
  const {exercise:exerciseOutcome,checkerVersion}=await descriptor.outcomeAudio();
  const key=verifyCache.receiptKey({artifactHash:artifact.manifest.artifactHash,checkerVersion,kind:'outcome-audio',host:'unity-ads-ua-playable',scenario:scenario+':'+outcomes.join(',')});
  result=await verifyCache.read(key);await onReceipt({type:'cache',stage:'outcome-audio',hit:Boolean(result)});
  if(!result){result=await exerciseOutcome(artifact,{outcomes,accelerateIdle:true,browser:await browser()});await verifyCache.write(key,result);}
 }
 const evidence=[];
 for(const outcome of outcomes){
  const played=result[outcome]?.started?.filter(cue=>cue.assetHash&&cue.level>0&&!cue.loop)??[];
  const afterOutcome=played.filter(cue=>cue.at>=result[outcome].outcomeAt);
  const opposite=outcome==='win'?'loss':'win';
  const otherStarts=result[opposite]?.started??[];
  const isMove=typed||both&&oldWin&&feedback.some(text=>/\b(mov\w*|swap|transfer|instead)\b/.test(text)&&win(text)&&loss(text));
  const needsNew=typed?intent.constraints.replacementMustBeNew:feedback.some(text=>/\bnew\b/.test(text)&&win(text));
  const oldHashes=new Set(project.assets.map(a=>a.hash));
  let cue;
  if(isMove){
   const fits=outcome==='win'?(item=>item.assetHash!==oldWin.assetHash&&(!needsNew||!oldHashes.has(item.assetHash))):(item=>item.assetHash===oldWin.assetHash);
   const matches=afterOutcome.filter(fits);
   check(matches.length===1,'E_REVIEW_OUTCOME_AUDIO_MISMATCH');
   [cue]=matches;
   check(played.filter(item=>item.assetHash===cue.assetHash).length===1,'E_REVIEW_OUTCOME_AUDIO_COUNT');
   check(!otherStarts.some(item=>item.assetHash===cue.assetHash&&item.level>0),'E_REVIEW_OUTCOME_AUDIO_MISMATCH');
  }else{
   const expected=tiedTo(nextRoutes,outcome==='win'?finalBinding:deadlineBinding);
   const matches=afterOutcome.filter(item=>expected.some(route=>route.assetHash===item.assetHash));
   // An authored outcome can have its own conditional binding rather than use
   // the module's default. The actual ending is still exercised in that case.
   cue=matches.at(-1)??afterOutcome.at(-1);
   check(cue,'E_REVIEW_OUTCOME_AUDIO_MISSING');
  }
  evidence.push((outcome==='win'?'Win':'Loss')+' playback started '+cue.assetId+' in the packaged playable.');
 }
 return evidence;
}

/** Local, baseline-bound tools for the feedback model. No tool can publish a working revision. */
export function createReviewTools({service,id,request,project,proposalId,progress,exercise,intent,typed=Boolean(intent),onReceipt,qaRunner}){
 const emit=async event=>{if(onReceipt)await onReceipt(event);};
 const baseline=request.expected;
 const rawNotes=request.notes??[request];
 const normalized=rawNotes.map((note,index)=>({...note,id:String(index+1)}));
 const previews=new Map();
 const layouts=new Map();
 const artifacts=new Map();
 const qaReports=new Map();
 let browserPromise;
 const sharedBrowser=()=>browserPromise??=import('playwright').then(({chromium})=>chromium.launch({headless:true}));
 const dispose=async()=>{if(browserPromise)(await browserPromise.catch(()=>null))?.close();};

 async function preview({edits}){
  check(Array.isArray(edits)&&edits.length===normalized.length&&new Set(edits.map(e=>e?.noteId)).size===edits.length,'E_REVIEW_NOTE_COVERAGE');
  let current=project;
  const operations=[],perNote=new Map();
  const targets=reviewTargets(project).targets;
  for(const note of normalized){
   const edit=edits.find(e=>e.noteId===note.id);
   check(edit&&exact(edit,['noteId','changes','target','operations','scope','imports']),'E_REVIEW_SCOPE');
   let nextOps;
   if(edit.changes!==undefined){
    check(exact(edit,['noteId','target','changes']),'E_REVIEW_SCOPE');
    const targetId=note.target??edit.target;
    check(edit.target===undefined||edit.target===targetId,'E_REVIEW_SCOPE');
    const target=targets.find(item=>item.id===targetId);
    check(target&&(note.moment==='live'||note.moment===target.moment),'E_REVIEW_SCOPE');
    const fields=note.target!==null?note.fields:target.fields.filter(field=>!field.confirm).map(field=>field.id);
    nextOps=reviewOperations(current,targetId,fields,edit.changes,project).operations;
   }else{
    check((note.target===null||intent?.action==='transferOutcomeCue')&&exact(edit,['noteId','operations','scope','imports']),'E_REVIEW_SCOPE');
    check(Array.isArray(edit.scope)&&edit.scope.length>0&&edit.scope.every(key=>identifier(key)||key==='$project.base'),'E_REVIEW_SCOPE');
    const assets=await stageAudio(service,id,edit.imports??[]);
    nextOps=[...assets,...expandOperations(current,edit.operations,assets)];
   }
   const next=applyOperations(current,nextOps).project;
   const changed=changedRecords(current,next);
   check(changed.length>0,'E_REVIEW_NO_CHANGE');
   if(edit.operations!==undefined){
    check(changed.every(key=>edit.scope.includes(key)),'E_REVIEW_OUTSIDE_SCOPE');
    preserveSharedArt(current,next);
   }
   // A second note cannot overwrite the result authorized by an earlier pinned note.
   for(const [otherId,otherChanged] of perNote){
    if(note.target!==null||normalized.find(n=>n.id===otherId).target!==null){
     check(!otherChanged.some(key=>changed.includes(key)),'E_REVIEW_CONFLICT');
    }
   }
   perNote.set(note.id,changed);
   operations.push(...nextOps);
   current=next;
  }
  const native=await service.preview(id,{format:'tora-transaction-1',expected:baseline,operations});
  check(isDeepStrictEqual(native.project,current),'E_REVIEW_SCOPE');
  const changedIds=changedRecords(project,current);
  check(changedIds.length&&[...perNote.values()].every(keys=>keys.every(key=>changedIds.includes(key))),'E_REVIEW_CONFLICT');
  const receipts=Object.fromEntries([...perNote].map(([noteId,keys])=>[noteId,keys.map(key=>recordEvidence(project,current,key))]));
  const previous=previews.get(native.previewDigest);
  if(!isDeepStrictEqual(previous?.perNote,perNote)){
   previews.set(native.previewDigest,{project:current,operations,changedIds,receipts,perNote});
  }
  return bounded({previewDigest:native.previewDigest,notes:Object.fromEntries(perNote),evidence:receipts,warnings:native.effects.warnings});
 }
 async function getPreview(digest){
  check(typeof digest==='string'&&/^sha256:[0-9a-f]{64}$/.test(digest),'E_NATIVE_PREVIEW_STALE');
  if(!previews.has(digest)){
   const previous=resumedPreview(progress,digest);
   check(previous,'E_NATIVE_PREVIEW_STALE');
   check((await preview(previous)).previewDigest===digest,'E_NATIVE_PREVIEW_STALE');
  }
  return previews.get(digest);
 }
 async function packageArtifact(digest){
  if(!artifacts.has(digest)){
   const build=async()=>{
    const selected=digest?{...(await getPreview(digest)).project,revisionId:'rev-'+proposalId}:project;
    const started=Date.now();
    try{const artifact=await service.build(id,selected,'unity-ads-ua-playable');await emit({type:'cache',stage:'build',hit:artifact.cacheHit});return artifact;}
    finally{await emit({type:'compilation',durationMs:Date.now()-started});}
   };
   artifacts.set(digest,build().catch(error=>{artifacts.delete(digest);throw error;}));
  }
  return artifacts.get(digest);
 }
 async function creativeQa(digest){
  if(!qaReports.has(digest)){
   const run=async()=>{
    const artifact=await packageArtifact(digest),outputDir=resolve(service.store.root,id,'qa','reviews',proposalId,digest??'baseline');
    if(qaRunner)return qaRunner({html:artifact.html,outputDir,network:'unity-ads-ua-playable'});
    const {runCreativeQa,CREATIVE_QA_CHECKER_VERSION,CREATIVE_QA_FORMAT}=await import('./creative-qa.mjs');
    const key=service.verifyCache.receiptKey({artifactHash:artifact.manifest.artifactHash,checkerVersion:CREATIVE_QA_CHECKER_VERSION,kind:'creative-qa',host:'unity-ads-ua-playable',scenario:digest??'baseline'});
    let report=await service.verifyCache.read(key),valid=report?.format===CREATIVE_QA_FORMAT&&Array.isArray(report.screenshots);
    if(valid)for(const screenshot of report.screenshots){
     try{const bytes=await readFile(resolve(outputDir,screenshot.path));if(hash(bytes)!==screenshot.sha256){valid=false;break;}}catch{valid=false;break;}
    }
    await emit({type:'cache',stage:'creative-qa',hit:valid});
    if(!valid){report=await runCreativeQa({html:artifact.html,outputDir,network:'unity-ads-ua-playable',browser:await sharedBrowser()});await service.verifyCache.write(key,report);}
    return report;
   };
   qaReports.set(digest,run().catch(error=>{qaReports.delete(digest);throw error;}));
  }
  return qaReports.get(digest);
 }
 async function layout(digest){
  const {descriptor}=projectModule(project);
  check(descriptor?.supportsLandscapeReview,'E_REVIEW_SCENARIO_UNAVAILABLE');
  if(layouts.has(digest))return layouts.get(digest);
  const artifact=await packageArtifact(digest);
  const started=Date.now();
  let result;
  try{
   if(exercise){const report=await exercise(artifact,{outcomes:['loss'],landscape:true,inspectOutcome:inspectHarvestLayout,accelerateIdle:true});result=report.loss?.layout;}
   else{
    const {exercise:exerciseOutcome,checkerVersion}=await descriptor.outcomeAudio();
    const key=service.verifyCache.receiptKey({artifactHash:artifact.manifest.artifactHash,checkerVersion,kind:'landscape-layout',viewport:{width:844,height:390},host:'unity-ads-ua-playable',scenario:digest??'baseline'});
    result=await service.verifyCache.read(key);await emit({type:'cache',stage:'landscape-layout',hit:Boolean(result)});
    if(!result){const report=await exerciseOutcome(artifact,{outcomes:['loss'],landscape:true,inspectOutcome:inspectHarvestLayout,accelerateIdle:true,browser:await sharedBrowser()});result=report.loss?.layout;if(result)await service.verifyCache.write(key,result);}
   }
  }finally{await emit({type:'playback',kind:'harvest-layout',outcomes:['loss'],status:result?'completed':'failed',durationMs:Date.now()-started});}
  check(result,'E_REVIEW_LAYOUT');
  layouts.set(digest,result);
  return result;
 }
 async function exercisePreview(digest){
  const staged=await getPreview(digest),{resolution,descriptor}=projectModule(project);
  if(!staged.verified){
   const candidateProject={...staged.project,revisionId:'rev-'+proposalId};
   const artifact=await packageArtifact(digest);
   const qa=requireCreativeQa(await creativeQa(digest));
   const started=Date.now();
   let outcome;
   try{outcome=typed&&intent?.action!=='transferOutcomeCue'?[]:
    await outcomeEvidence(project,candidateProject,artifact,normalized,exercise,intent,{browser:exercise?undefined:sharedBrowser,verifyCache:service.verifyCache,onReceipt:emit,scenario:digest??'baseline'});}
   finally{if(intent?.action==='transferOutcomeCue'||outcome?.length)await emit({type:'playback',kind:descriptor?.outcomeKind??'outcome-audio',outcomes:intent?.action==='transferOutcomeCue'?['win','loss']:[],status:outcome?'completed':'failed',durationMs:Date.now()-started});}
   const checks=[{id:'package',detail:'Packaged candidate ('+artifact.manifest.bytes+' bytes).'},
    {id:'creative-qa',detail:`Creative QA passed with ${qa.warnings.length} warning(s) across four viewports.`},
    ...outcome.map(detail=>({id:detail.startsWith('Win ')?'win-audio':'loss-audio',detail})),
    ...[...staged.perNote.keys()].map(noteId=>({id:'diff-'+noteId,detail:staged.receipts[noteId].join('. ')}))];
   if((intent?.action==='alignCaption'||!typed&&normalized.some(note=>mentionsLayout(note.note)))&&descriptor?.supportsLandscapeReview){
    const actual=await layout(digest);
    check(actual.clipped.length===0,'E_REVIEW_LANDSCAPE_CLIPPED');
    if(intent?.action==='alignCaption'){
     const captionId=resolution.roles.timeoutCaption?.componentId,panelId=resolution.roles.outcomePanel?.componentId;
     const caption=actual.visible.find(item=>item.id===captionId);
     const panel=actual.visible.find(item=>item.id===panelId);
     const original=byId(project.components,captionId);
     const center=item=>(item.bounds.left+item.bounds.right)/2;
     check(caption&&panel&&caption.text===original.parameters.text&&
      actual.visible.filter(item=>item.text===caption.text).length===1&&Math.abs(center(caption)-center(panel))<1&&
      actual.contentCenter!==null&&Math.abs(caption.verticalOffset)<1,
     'E_REVIEW_LAYOUT');
    }
    checks.push({id:'landscape-loss',detail:'Visible text, buttons and panel fit inside the packaged landscape loss screen.'});
    if(normalized.some(note=>/cent(?:er|re)/i.test(note.note)&&/vertic/i.test(note.note)&&/lo(?:s|st)|timeout/i.test(note.note))){
     const baseline=await layout(undefined);
     const original=baseline.visible.find(c=>c.id===resolution.roles.timeoutCaption?.componentId)??baseline.visible.find(c=>c.id==='harvest.instruction')??baseline.visible.find(c=>c.id==='harvest.reward.detail');
     const texts=actual.visible.filter(c=>c.text===original?.text);
     check(texts.length===1&&Math.abs(texts[0].verticalOffset)<=4,'E_REVIEW_LOSS_TEXT_ALIGNMENT');
     checks.push({id:'loss-text',detail:'The original timeout message appears once, centered within four stage pixels between the panel top and install button.'});
    }
   }
   staged.verified={bytes:artifact.manifest.bytes,outcome,checks};
  }
  return staged.verified;
 }
 async function callToolUnchecked(name,args){
  check(args&&typeof args==='object'&&!Array.isArray(args),'E_AGENT_ARGUMENT');
  const definition=toolDefinitions.find(tool=>tool.function.name===name);
  check(definition&&exact(args,Object.keys(definition.function.parameters.properties)),'E_AGENT_ARGUMENT');
  const selected=args.previewDigest?(await getPreview(args.previewDigest)).project:project;
  switch(name){
   case 'inspect':return inspect(selected,args);
   case 'contracts':return contractInfo(args.names);
   case 'layout':return {loss:await layout(args.previewDigest),speaksTo:'The banner and any centered loss caption may carry the same wording. Inspect the visibility of both, preserving the original words unless asked for copy changes.',targets:reviewTargets(selected).targets.filter(t=>['ending','timeout-card'].includes(t.id)).map(({id,fields})=>({id,fields})),fieldAdapter:'Unpinned typed operations may include {kind:"adjustTarget",target,changes} plus additional native operations. For an existing caption, text-only changes do not reposition it.'};
   case 'audio':{
    const catalog=(await catalogAudio()).map(({catalogId,source,file})=>({catalogId,author:source.author,license:source.license,availableInProjectAs:selected.assets.filter(a=>a.hash===file.sha256).map(a=>a.id)}));
    const routes=audioRoutes(selected);
    const {resolution,descriptor}=projectModule(selected);
    const outcomes=resolution.status==='resolved'&&descriptor?.outcomeAudio?{
     win:{bindingId:resolution.roles.winEvent.bindingId,when:'the authored win outcome completes'},
     loss:{bindingId:resolution.roles.timeoutEvent.bindingId,when:'the authored deadline reaches the loss end card'},
    }:undefined;
    return bounded({routes,catalog,outcomes,routing:{operation:{kind:'setBindingAudio',bindingId:'existing binding ID',assetId:'project or imported WAV ID',replaceBehaviorId:'omit to add cue, use original behavior ID to replace'},scope:'Include the binding ID. If the WAV has no one-shot audio behavior add BINDING_ID.cue and BINDING_ID.cue.play. For an imported WAV also include the new asset ID.',import:'Use edits[].imports:[{catalogId,assetId}] in preview; choose an entry whose availableInProjectAs is empty when a genuinely new sound is requested.'},events:selected.eventBindings.filter(binding=>/deadline|timeout|payoff|restore\.3/.test(binding.id)).map(({id,eventId,condition,actions})=>({id,eventId,condition,actions:actions.filter(a=>a.kind==='playAudio'||a.kind==='set')}))});
   }
   case 'preview':return preview(args);
   case 'qa':return bounded(await creativeQa(args.previewDigest),24000);
   case 'exercise':return {previewDigest:args.previewDigest,checks:(await exercisePreview(args.previewDigest)).checks};
  }
 }
 async function callTool(name,args){
  const started=Date.now();
  try{
   const result=await callToolUnchecked(name,args);
   await emit({type:'tool',name,status:'completed',responseBytes:Buffer.byteLength(JSON.stringify(result??null)),durationMs:Date.now()-started});
   return result;
  }catch(error){
   await emit({type:'tool',name,status:'failed',durationMs:Date.now()-started});
   throw error;
  }
 }
 async function finalize(answer){
  if(answer?.question!==undefined)return {status:'needs-clarification',question:modelText(answer,'question')};
  if(answer?.reason!==undefined)return {status:'needs-scope',reason:modelText(answer,'reason')};
  check(exact(answer,['previewDigest','noteResults'])&&Array.isArray(answer.noteResults)&&answer.noteResults.length===normalized.length,'E_REVIEW_NOTE_COVERAGE');
  const staged=await getPreview(answer.previewDigest);
  for(const note of normalized){
   const result=answer.noteResults.find(item=>item?.noteId===note.id);
   const changed=staged.perNote.get(note.id);
   check(result&&exact(result,['noteId','records','verification'])&&Array.isArray(result.records)&&result.records.length>0&&result.records.every(key=>changed.includes(key)),'E_REVIEW_NOTE_COVERAGE');
  }
  const {bytes,outcome,checks}=await exercisePreview(answer.previewDigest);
  for(const result of answer.noteResults){
   check(Array.isArray(result.verification)&&result.verification.length&&result.verification.every(key=>checks.some(c=>c.id===key)),'E_REVIEW_EVIDENCE');
  }
  const moments=normalized.map(note=>note.moment).filter(moment=>moment!=='live');
  const audioMoments=outcome.map(line=>line.startsWith('Win ')?'end-card':'timeout');
  moments.push(...audioMoments);
  const notesEvidence=Object.values(staged.receipts).flat();
  const summary=outcome.length?outcome.join(' '):notesEvidence.slice(0,3).join('. ').slice(0,500);
  return {status:'candidate',operations:staged.operations,previewDigest:answer.previewDigest,candidate:{
   bytes,summary,audioMoments,moments:[...new Set(moments)],evidence:[...outcome,...checks.filter(c=>c.id==='landscape-loss'||c.id==='loss-text').map(c=>c.detail),...notesEvidence],
  }};
 }
 return {tools:toolDefinitions,callTool,finalize,dispose};
}
