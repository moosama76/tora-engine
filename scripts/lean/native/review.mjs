import {randomUUID} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import {Buffer} from 'node:buffer';
import {resolve} from 'node:path';
import {check,exact} from './document.mjs';
import {lowerAssets} from './assets.mjs';
import {exportProjectFile} from './local-bundle.mjs';
import {reviewOperations,reviewTargets} from './review-targets.mjs';
import {createReviewTools} from './review-agent-tools.mjs';
import {feedbackModel,paidFeedbackModel} from './review-resolver.mjs';
import {ProjectIndexCache} from './project-index.mjs';
import {canTransferOutcomeCue,compileDeterministicIntent,deterministicIntents,eligibleOutcomeCueChoices,interpretationOptions} from './review-intents.mjs';
import {loadCatalog} from './catalog-cache.mjs';
import {applyReviewReceiptEvent,createReviewReceipt} from './review-receipts.mjs';

const uuid = value => typeof value==='string' && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(value);
const identity = current => ({revisionId:current.revisionId,contentHash:current.contentHash});
const withoutFrame=({frame,...note})=>({...note,...(frame?{hasFrame:true}:{})});
const empty = () => ({passesUsed:0,requests:[]});
function find(state,requestId) {
 check(uuid(requestId),'E_REVIEW_ARGUMENT');
 const request=state.requests.find(item=>item.id===requestId);
 check(request,'E_REVIEW_NOT_FOUND');
 return request;
}
function publicRequest(request) {
 const details={...request};
 delete details.operations;
 delete details.previewDigest;
 delete details.proposals;
 delete details.frame;
 delete details.modelRun;
 delete details.agentProgress;
 if(details.notes)details.notes=details.notes.map(withoutFrame);
 return details;
}
const nonemptyRecord=value=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length>0;
const editList=value=>Array.isArray(value)?value:[value];
const indexesByService=new WeakMap();
function validProposal(answer){
 return exact(answer,['summary','edits'])&&typeof answer.summary==='string'&&answer.summary.trim()&&
  answer.summary.length<=500&&nonemptyRecord(answer.edits)&&Object.values(answer.edits).every(value=>{
   const edits=editList(value);
   return edits.length>0&&edits.length<=8&&edits.every(edit=>
    exact(edit,['target','changes'])&&typeof edit.target==='string'&&edit.target.trim()&&nonemptyRecord(edit.changes));
  });
}
function briefing(request) {
 return {...publicRequest(request),instruction:request.notes
  ? 'Submit one proposal for the list. Key changes by each scoped note ID, with an object of authorized fields and values for that note. Use whole-moment notes as context. If a note calls for a change outside its authorized scope, return needs-scope with the reason.'
  : 'Use the review proposal tool with this request ID and only the selected field IDs. For unaddressable notes return needs-scope with the reason. Use the editor preview to inspect the baseline before proposing changes.'};
}

function reviewBatchOperations(project,notes,changes){
 const scoped=notes.flatMap((note,index)=>note.target===null?[]:[[String(index+1),note]]);
 check(isDeepStrictEqual(Object.keys(changes).sort(),scoped.map(([id])=>id).sort()),'E_REVIEW_SCOPE');
 const operations=[],proposed=new Map(),cropReplacements=new Map();
 let expected=project;
 for(const [id,note] of scoped){
  const result=reviewOperations(expected,note.target,note.fields,changes[id],project);
  for(const [field,value] of Object.entries(changes[id])){
   if(field==='shared-art'){
    const previous=cropReplacements.get(note.target);
    check(previous===value||previous===undefined&&![...cropReplacements.values()].includes(value),'E_REVIEW_CONFLICT');
    cropReplacements.set(note.target,value);
   }else{
    check(!proposed.has(field)||proposed.get(field)===value,'E_REVIEW_CONFLICT');
    proposed.set(field,value);
   }
  }
  operations.push(...result.operations);
  expected=result.expected;
 }
 return {operations,expected};
}

export class NativeReview {
 constructor(service,{resolver,agent,interpreter,deterministic=false,exercise,qaRunner,connectionInfo}={}) {
  this.service=service;
  this.resolver=resolver;
  this.agent=agent;
  this.interpreter=interpreter;
  this.deterministic=deterministic;
  this.exercise=exercise;
  this.qaRunner=qaRunner;
  this.connectionInfo=connectionInfo;
  if(!indexesByService.has(service))indexesByService.set(service,new ProjectIndexCache());
  this.indexes=indexesByService.get(service);
 }

 get configured() {return Boolean(this.agent||this.resolver);}
 hasDeterministicIntent(request) {return Boolean(this.deterministic&&deterministicIntents(request));}

 async read(id) {
  const current=await this.service.read(id);
  const journal=await this.service.history.readRevisionJournal(id);
  const review=journal.review??empty();
  const project=current.project;
  const expected=identity(current),now=Date.now();
  const outcomeCueChoices=this.deterministic&&canTransferOutcomeCue(this.indexes.get(project,expected.contentHash))?eligibleOutcomeCueChoices(project,await loadCatalog()):[];
  const activeModel=this.connectionInfo?.model??feedbackModel;
  const showPaidModel=Boolean(this.agent)&&(!this.connectionInfo||this.connectionInfo.provider==='orca');
  return {
   expected, accepted:current.accepted, canUndo:journal.index>0,
   name:project.creativeBrief?.goal??id, storeUrl:project.base.storeUrl,
   ...reviewTargets(project), passesUsed:review.passesUsed,
   requests:review.requests.map(request=>{
    const run=request.modelRun??{};
    const canResume=request.status==='resolving'&&isDeepStrictEqual(request.expected,expected)&&
     (Object.hasOwn(run,'answer')||((this.configured||this.deterministic&&run.route==='deterministic')&&!(run.until>now)));
    return {...publicRequest(request),...(canResume?{canResume:true}:{})};
   }),
   ...(this.configured?{feedbackModel:activeModel}:{}),
   ...(showPaidModel?{paidFeedbackModel}:{}),
   ...(this.connectionInfo?{connection:this.connectionInfo}:{}),
   ...(this.deterministic?{deterministicAuthoring:{intents:['replaceText','setTiming','alignCaption','replaceSharedArtwork',
    ...(outcomeCueChoices.length?['transferOutcomeCue']:[])],outcomeCueChoices}}:{}),
  };
 }

 async update(id,fn) {
  const current=await this.service.read(id);
  return this.service.history.commitRevision(id,current.revisionId,async journal=>{
   journal.review??=empty();
   return {state:journal,value:await fn(journal.review,current)};
  });
 }

 async recordReceipt(id,requestId,event,runId) {
  await this.update(id,state=>{
   const request=find(state,requestId);
   if(runId&&request.modelRun?.id!==runId)return;
   request.receipt??=createReviewReceipt(requestId,request.expected);
   applyReviewReceiptEvent(request.receipt,event);
  });
 }

 async request(id,input) {
  const {expected,requestId,replacesRequestId,paid=false}=input;
  check(typeof paid==='boolean','E_REVIEW_ARGUMENT');
  const batched=Object.hasOwn(input,'notes');
  const submitted=batched?input.notes:[{target:input.target,fields:input.fields,moment:input.moment,note:input.note,frame:input.frame,intent:input.intent}];
  check(uuid(requestId)&&Array.isArray(submitted)&&submitted.length>0&&submitted.length<=8,'E_REVIEW_ARGUMENT');
  check(submitted.length===1||submitted.every(item=>item.intent===undefined),'E_REVIEW_INTENT_BATCH');
  const notes=submitted.map(item=>{
   check(exact(item,['target','fields','moment','note','frame','intent']),'E_REVIEW_ARGUMENT');
   const {target,fields,moment,note,frame,intent}=item;
   check(typeof note==='string'&&note.trim()&&note.length<=2000&&Array.isArray(fields),'E_REVIEW_ARGUMENT');
   if(intent!==undefined)check(intent&&typeof intent==='object'&&!Array.isArray(intent)&&JSON.stringify(intent).length<=4096,'E_REVIEW_INTENT');
   if(frame!==undefined){
    check(typeof frame==='string'&&frame.length<=250000&&frame.length>=8,'E_REVIEW_FRAME');
    const bytes=Buffer.from(frame,'base64');
    check(bytes.toString('base64')===frame&&bytes[0]===255&&bytes[1]===216&&bytes.at(-2)===255&&bytes.at(-1)===217,'E_REVIEW_FRAME');
   }
   return {target,fields,moment,note:note.trim(),...(frame?{frame}:{}),...(intent?{intent:globalThis.structuredClone(intent)}:{})};
  });
  return this.update(id,(state,current)=>{
   const prior=state.requests.find(item=>item.id===requestId);
   if(prior){
    const {target,fields,moment,note,frame,intent}=prior;
    const saved=prior.notes??[{target,fields,moment,note,...(frame?{frame}:{}),...(intent?{intent}:{})}];
    check(prior.replacesRequestId===replacesRequestId&&Boolean(prior.paid)===paid&&isDeepStrictEqual([prior.expected,saved],[expected,notes]),'E_REVIEW_EXISTS');
    return publicRequest(prior);
   }
   check(isDeepStrictEqual(expected,identity(current)),'E_NATIVE_STALE');
   const map=reviewTargets(current.project);
   for(const {target,fields,moment} of notes){
    check(moment==='live'||map.moments.some(item=>item.id===moment),'E_REVIEW_ARGUMENT');
    const selected=map.targets.find(item=>item.id===target);
    check(target===null?fields.length===0:selected&&selected.moment===moment&&fields.length>0&&new Set(fields).size===fields.length&&fields.every(key=>selected.fields.some(field=>field.id===key)),'E_REVIEW_SCOPE');
   }
   if(replacesRequestId!==undefined){
    const replaced=find(state,replacesRequestId);
    check(isDeepStrictEqual(replaced.expected,expected),'E_NATIVE_STALE');
    check(['waiting','claimed','rejected','needs-scope','needs-clarification','model-error'].includes(replaced.status),'E_REVIEW_STATUS');
    replaced.status='superseded';
    delete replaced.agentProgress;
   }
   const request={id:requestId,expected,...(batched?{notes}:notes[0]),status:'waiting',proposals:[],
    receipt:createReviewReceipt(requestId,expected),...(replacesRequestId?{replacesRequestId}:{}),...(paid?{paid}:{})};
   state.requests.push(request);
   return publicRequest(request);
  });
 }

 async store(id,{expected,url}) {
  const envelope={format:'tora-transaction-1',expected,operations:[{kind:'setStore',url}]};
  const preview=await this.service.preview(id,envelope);
  return this.service.transact(id,{...envelope,previewDigest:preview.previewDigest});
 }

 async claim(id,requestId) {
  return this.update(id,(state,current)=>{
   const request=find(state,requestId);
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   if(request.status==='building'){
    const {id:proposalId,changes,summary}=request.proposals.at(-1);
    return {...briefing(request),pendingProposal:{proposalId,changes,summary},frame:request.frame};
   }
   check(['waiting','claimed','rejected'].includes(request.status),'E_REVIEW_STATUS');
   check(request.proposals.length<2,'E_REVIEW_LIMIT');
   request.status='claimed';
   const {targets}=reviewTargets(current.project);
   const describe=note=>{
    const target=targets.find(item=>item.id===note.target);
    return {authorizedFields:target?.fields.filter(field=>note.fields.includes(field.id))??[],...(target?.imageChoices?{imageChoices:target.imageChoices,affectedComponentIds:target.uses}:{})};
   };
   if(request.notes)return {...briefing(request),notes:request.notes.map((note,index)=>({
    id:String(index+1),...withoutFrame(note),...describe(note),
   })),frames:request.notes.flatMap((note,index)=>note.frame?[{noteId:String(index+1),data:note.frame}]:[])};
   return {...briefing(request),frame:request.frame,...describe(request)};
  });
 }

 async needsScope(id,requestId,reason) {
  check(typeof reason==='string'&&reason.trim()&&reason.length<=500,'E_REVIEW_ARGUMENT');
  return this.update(id,(state,current)=>{
   const request=find(state,requestId);
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   check(request.status==='claimed','E_REVIEW_STATUS');
   request.status='needs-scope';
   request.reason=reason.trim();
   request.receipt??=createReviewReceipt(requestId,request.expected);
   applyReviewReceiptEvent(request.receipt,{type:'final',disposition:'needs-scope'});
   return publicRequest(request);
  });
 }

 async propose(id,{requestId,proposalId,changes,summary}) {
  check(uuid(proposalId)&&changes&&typeof changes==='object'&&!Array.isArray(changes)&&JSON.stringify(changes).length<=4096&&typeof summary==='string'&&summary.trim()&&summary.length<=500,'E_REVIEW_ARGUMENT');
  // A rejected creative proposal still consumes one pass. Keep the receipt
  // alongside the working revision, so reconnecting cannot restore a pass.
  const pending=await this.update(id,(state,current)=>{
   const request=find(state,requestId);
   const prior=request.proposals.find(item=>item.id===proposalId);
   if(prior){
    check(isDeepStrictEqual(prior.changes,changes)&&prior.summary===summary.trim(),'E_REVIEW_EXISTS');
    if(request.status==='building'&&request.proposals.at(-1)===prior){
     check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
     return {request:publicRequest(request),project:current.project};
    }
    return {duplicate:true,request:publicRequest(request)};
   }
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   check(['claimed','rejected'].includes(request.status)&&(request.notes?request.notes.some(note=>note.target!==null):request.target!==null),'E_REVIEW_STATUS');
   check(request.proposals.length<2,'E_REVIEW_LIMIT');
   state.passesUsed++;
   request.status='building';
   request.receipt??=createReviewReceipt(requestId,request.expected);
   applyReviewReceiptEvent(request.receipt,{type:'route',route:'manual-agent'});
   request.proposals.push({id:proposalId,changes,summary:summary.trim()});
   return {request:publicRequest(request),project:current.project};
  });
  if(pending.duplicate)return pending.request;
  const {request,project}=pending;
  let outcome;
  try {
   const {operations,expected}=request.notes
    ? reviewBatchOperations(project,request.notes,changes)
    : reviewOperations(project,request.target,request.fields,changes);
   outcome=await this.buildCandidate(id,{request,proposalId,project,operations,expected,summary:summary.trim()});
  }catch(e){
   outcome={status:'rejected',reason:/^E_[A-Z_]+$/.test(e.message)?e.message:'E_REVIEW_BUILD',...(e.creativeQa?{creativeQa:e.creativeQa}:{})};
  }
  return this.update(id,state=>{
   const current=find(state,requestId);
   if(current.status==='building'&&current.proposals.at(-1)?.id===proposalId){
    delete current.reason;
    Object.assign(current,outcome);
    applyReviewReceiptEvent(current.receipt,{type:'final',disposition:outcome.status,candidateId:outcome.status==='candidate'?proposalId:undefined});
   }
   return publicRequest(current);
  });
 }

 async buildCandidate(id,{request,proposalId,project,operations,expected,summary}){
  let started=Date.now();
  const preview=await this.service.preview(id,{format:'tora-transaction-1',expected:request.expected,operations});
  await this.recordReceipt(id,request.id,{type:'tool',name:'preview',status:'completed',responseBytes:0,durationMs:Date.now()-started});
  check(isDeepStrictEqual(preview.project,expected),'E_REVIEW_SCOPE');
  check(!isDeepStrictEqual(project,expected),'E_REVIEW_NO_CHANGE');
  preview.project.revisionId='rev-'+proposalId;
  started=Date.now();
  const artifact=await this.service.build(id,preview.project,'unity-ads-ua-playable');
  await this.recordReceipt(id,request.id,{type:'compilation',durationMs:Date.now()-started});
  return {status:'candidate',operations,previewDigest:preview.previewDigest,candidate:{bytes:artifact.manifest.bytes,summary}};
 }

 async buildIntentCandidate({id,request,project,proposalId,intents,onReceipt}){
  const index=this.indexes.get(project,request.expected.contentHash),notes=request.notes??[request];
  const edits=[];
  for(const intent of intents){
   const note=notes[Number(intent.noteId)-1];
   edits.push((await compileDeterministicIntent(project,intent,index,note?.target)).edit);
  }
  const intent=intents.length===1?intents[0]:undefined;
  const toolsSession=createReviewTools({service:this.service,id,request,project,proposalId,intent,typed:true,onReceipt,exercise:this.exercise,qaRunner:this.qaRunner});
  try{
   const preview=await toolsSession.callTool('preview',{edits});
   const {checks}=await toolsSession.callTool('exercise',{previewDigest:preview.previewDigest});
   const completed=new Set(checks.map(item=>item.id));
   return await toolsSession.finalize({previewDigest:preview.previewDigest,noteResults:intents.map(({noteId,requiredChecks})=>{
    check(requiredChecks.every(key=>completed.has(key)),'E_REVIEW_VERIFICATION');
    return {noteId,records:preview.notes[noteId],verification:requiredChecks};
   })});
  }finally{await toolsSession.dispose();}
 }

 async resolveDeterministic(id,requestId){
  check(this.deterministic,'E_REVIEW_INTENT_DISABLED');
  const runId=randomUUID();
  const start=await this.update(id,(state,current)=>{
   const request=find(state,requestId);
   const intents=deterministicIntents(request);
   if(!intents)return {};
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   if(request.status==='candidate')return {request:publicRequest(request)};
   const now=Date.now();
   if(request.status==='resolving'&&request.modelRun?.until>now)return {request:publicRequest(request)};
   check(!state.requests.some(item=>item.id!==requestId&&item.status==='resolving'&&item.modelRun?.until>now),'E_REVIEW_MODEL_BUSY');
   check(['waiting','claimed','needs-scope','rejected','model-error','resolving'].includes(request.status),'E_REVIEW_STATUS');
   const proposalId=request.modelRun?.proposalId??runId;
   request.status='resolving';
   request.modelRun={id:runId,proposalId,route:'deterministic',until:now+90000};
   request.receipt??=createReviewReceipt(requestId,request.expected);
   applyReviewReceiptEvent(request.receipt,{type:'route',route:'deterministic'});
   delete request.reason;
   return {request:publicRequest(request),project:current.project,intents,proposalId};
  });
  const {request,project,intents,proposalId}=start;
  if(!project)return request;
  let outcome;
  try{
   outcome=await this.buildIntentCandidate({id,request,project,proposalId,intents,
    onReceipt:event=>this.recordReceipt(id,requestId,event,runId)});
  }catch(error){
   const reason=/^E_[A-Z0-9_]+$/.test(error.message)?error.message:'E_REVIEW_BUILD';
   outcome={status:reason==='E_NATIVE_STALE'?'model-error':'rejected',reason,...(error.creativeQa?{creativeQa:error.creativeQa}:{})};
  }
  return this.update(id,(state,current)=>{
   const active=find(state,requestId);
   if(active.status==='resolving'&&active.modelRun?.id===runId){
    delete active.modelRun;
    const result=isDeepStrictEqual(request.expected,identity(current))?outcome:{status:'model-error',reason:'E_NATIVE_STALE'};
    Object.assign(active,result);
    applyReviewReceiptEvent(active.receipt,{type:'final',disposition:result.status,candidateId:result.status==='candidate'?proposalId:undefined});
   }
   return publicRequest(active);
  });
 }

 async resolve(id,requestId){
  if(this.deterministic){
   const direct=await this.resolveDeterministic(id,requestId);
   if(direct)return direct;
  }
  if(this.agent)return this.resolveAgent(id,requestId);
  let runId=randomUUID();
  const {request,project,savedAnswer}=await this.update(id,(state,current)=>{
   const request=find(state,requestId);
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   if(request.status==='candidate')return {request:publicRequest(request)};
   const now=Date.now();
   if(request.status==='resolving'){
    if(Object.hasOwn(request.modelRun??{},'answer')){
     runId=request.modelRun.id;
     return {request:publicRequest(request),project:current.project,savedAnswer:request.modelRun.answer};
    }
    if(request.modelRun?.until>now)return {request:publicRequest(request)};
   }
   check(this.resolver,'E_REVIEW_MODEL_NOT_CONFIGURED');
   check(['waiting','claimed','needs-scope','rejected','model-error','resolving'].includes(request.status),'E_REVIEW_STATUS');
   check(!state.requests.some(item=>item.id!==requestId&&item.status==='resolving'&&item.modelRun?.until>now),'E_REVIEW_MODEL_BUSY');
   request.status='resolving';
   request.modelRun={id:runId,until:now+90000};
   request.receipt??=createReviewReceipt(requestId,request.expected);
   applyReviewReceiptEvent(request.receipt,{type:'route',route:'field-resolver'});
   delete request.reason;
   delete request.retryAfterSeconds;
   delete request.retryAt;
   return {request:publicRequest(request),project:current.project};
  });
  if(!project)return request;

  let outcome;
  try{
   const {targets}=reviewTargets(project);
   const notes=(request.notes??[request]).map(({target,fields,moment,note},index)=>{
    const allowed=targets.filter(option=>target===null?(moment==='live'||option.moment===moment):option.id===target)
      .map(({id,label,moment:targetMoment,fields:options,imageChoices})=>({id,label,moment:targetMoment,
       fields:target===null?options.filter(field=>!field.confirm):options.filter(field=>fields.includes(field.id)),
       ...(target!==null&&imageChoices?{imageChoices}:{}),
      })).filter(option=>option.fields.length);
    return {id:String(index+1),note,moment,pinned:target!==null,allowed};
   });
   let answer=savedAnswer;
   if(answer===undefined){
    const started=Date.now();
    await this.recordReceipt(id,requestId,{type:'provider-start',model:feedbackModel});
    try{
     answer=await this.resolver({project:project.creativeBrief.goal,notes});
     await this.recordReceipt(id,requestId,{type:'provider-success',durationMs:Date.now()-started,usage:null});
    }catch(error){
     await this.recordReceipt(id,requestId,{type:'provider-error',durationMs:Date.now()-started,code:error.message,retryAfterSeconds:error.retryAfterSeconds});
     throw error;
    }
   }
   if(exact(answer,['reason'])&&typeof answer.reason==='string'&&answer.reason.trim()&&answer.reason.length<=500){
    outcome={status:'needs-scope',reason:answer.reason.trim()};
   }else{
    check(validProposal(answer),'E_REVIEW_MODEL_RESPONSE');
    // Journal the answer with the pass before building. A reconnect can then
    // retry the same deterministic build without another provider call.
    if(savedAnswer===undefined)await this.update(id,(state,current)=>{
     const active=find(state,requestId);
     check(active.status==='resolving'&&active.modelRun?.id===runId,'E_REVIEW_STATUS');
     check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
     state.passesUsed++;
     active.modelRun.answer=answer;
    });
    check(exact(answer.edits,notes.map(note=>note.id))&&Object.keys(answer.edits).length===notes.length,'E_REVIEW_SCOPE');
    const resolved=[];
    const changes={};
    const changedMoments=new Set();
    for(const note of notes){
     const value=answer.edits[note.id];
     check(!note.pinned||!Array.isArray(value),'E_REVIEW_SCOPE');
     for(const edit of editList(value)){
      const allowed=note.allowed.find(target=>target.id===edit.target);
      check(allowed,'E_REVIEW_SCOPE');
      resolved.push({target:edit.target,fields:allowed.fields.map(field=>field.id)});
      changes[String(resolved.length)]=edit.changes;
      for(const field of Object.keys(edit.changes))changedMoments.add(field==='timeout-caption'?'timeout':allowed.moment);
     }
    }
    const {operations,expected}=reviewBatchOperations(project,resolved,changes);
    outcome=await this.buildCandidate(id,{request,proposalId:runId,project,operations,expected,summary:answer.summary.trim()});
    outcome.candidate.moments=[...changedMoments];
   }
  }catch(error){
   const code=/^E_[A-Z0-9_]+$/.test(error.message)?error.message:'E_REVIEW_MODEL_RESPONSE';
   const retryAfterSeconds=error.retryAfterSeconds;
   outcome={status:'model-error',reason:code,...(error.creativeQa?{creativeQa:error.creativeQa}:{})};
   if(Number.isSafeInteger(retryAfterSeconds)&&retryAfterSeconds>=0){
    outcome.retryAfterSeconds=retryAfterSeconds;
    const retryAt=Date.now()+retryAfterSeconds*1000;
    if(Number.isFinite(new Date(retryAt).getTime()))outcome.retryAt=retryAt;
   }
  }

  return this.update(id,(state,current)=>{
   const active=find(state,requestId);
   if(active.status==='resolving'&&active.modelRun?.id===runId){
    const charged=Object.hasOwn(active.modelRun,'answer');
    delete active.modelRun;
    if(outcome.status==='model-error'&&charged)state.passesUsed=Math.max(0,state.passesUsed-1);
    const result=isDeepStrictEqual(request.expected,identity(current))?outcome:{status:'model-error',reason:'E_NATIVE_STALE'};
    Object.assign(active,result);
    if(result.status==='needs-clarification')applyReviewReceiptEvent(active.receipt,{type:'clarification'});
    applyReviewReceiptEvent(active.receipt,{type:'final',disposition:result.status,candidateId:result.status==='candidate'?runId:undefined});
   }
   return publicRequest(active);
  });
 }

 async answer(id,requestId,answer) {
  check(typeof answer==='string'&&answer.trim()&&answer.length<=2000,'E_REVIEW_ARGUMENT');
  await this.update(id,(state,current)=>{
   const request=find(state,requestId);
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   check(request.status==='needs-clarification','E_REVIEW_STATUS');
   check(this.configured,'E_REVIEW_MODEL_NOT_CONFIGURED');
   request.clarification={question:request.question,answer:answer.trim()};
   delete request.question;
   request.status='waiting';
  });
  return this.resolve(id,requestId);
 }

 async resolveAgent(id,requestId) {
  const runId=randomUUID();
  const lease=90000;
  const start=await this.update(id,(state,current)=>{
   const request=find(state,requestId);
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   const now=Date.now();
   if(request.status==='candidate'||request.status==='resolving'&&request.modelRun?.until>now||
      request.status==='model-error'&&request.retryAt>now)return {request:publicRequest(request)};
   check(['waiting','claimed','needs-scope','rejected','model-error','resolving'].includes(request.status),'E_REVIEW_STATUS');
   check(!state.requests.some(item=>item.id!==requestId&&item.status==='resolving'&&item.modelRun?.until>now),'E_REVIEW_MODEL_BUSY');
   request.status='resolving';
   const proposalId=request.modelRun?.proposalId??runId;
   request.modelRun={id:runId,proposalId,until:now+lease};
   request.receipt??=createReviewReceipt(requestId,request.expected);
   applyReviewReceiptEvent(request.receipt,{type:'route',route:'general-agent'});
   delete request.reason;
   delete request.retryAfterSeconds;
   delete request.retryAt;
   const history=state.requests.filter(item=>item.id!==requestId&&(
    item.expected.contentHash===request.expected.contentHash||item.revision?.contentHash===request.expected.contentHash
   )&&['promoted','discarded'].includes(item.status)).slice(-2).map(item=>({
    notes:(item.notes??[item]).slice(0,3).map(note=>note.note.slice(0,500)),
    status:item.status,changes:item.candidate?.summary,
   }));
   return {request:publicRequest(request),project:current.project,progress:request.agentProgress,proposalId,history};
  });
  const {request,project,progress,proposalId,history}=start;
  if(!project)return request;
  const checkpoint=async next=>this.update(id,(state,current)=>{
   const active=find(state,requestId);
   check(active.status==='resolving'&&active.modelRun?.id===runId,'E_REVIEW_STATUS');
   check(isDeepStrictEqual(request.expected,identity(current)),'E_NATIVE_STALE');
   active.agentProgress=next;
   active.modelRun.until=Date.now()+lease;
  });
  const notes=(request.notes??[request]).map(({target,fields,moment,note},index)=>({
   id:String(index+1),note,target,fields,moment,pinned:target!==null,
  }));
  let outcome;
  const toolsSession=createReviewTools({service:this.service,id,request,project,notes,proposalId,progress,exercise:this.exercise,qaRunner:this.qaRunner,onReceipt:event=>this.recordReceipt(id,requestId,event,runId)});
  try {
   let interpreterCalls=request.receipt?.providerCalls.filter(call=>call.phase==='interpretation').length??0;
   const onReceipt=event=>{
    if(event.type==='provider-start'&&event.phase==='interpretation')interpreterCalls++;
    return this.recordReceipt(id,requestId,event,runId);
   };
   const {tools,callTool,finalize}=toolsSession;
   const pinnedTargets=reviewTargets(project).targets.filter(target=>notes.some(note=>note.pinned&&note.target===target.id));
   const frames=(request.notes??[request]).filter(note=>typeof note.frame==='string'&&note.frame).slice(0,4).map(note=>({mimeType:'image/jpeg',data:note.frame}));
   const input={project:project.creativeBrief.goal,notes,history,pinnedTargets,
    ...(frames.length?{screenshots:frames}:{}),
    ...(!progress&&request.clarification?{clarification:request.clarification}:{})};
   const previousInterpretation=request.receipt?.providerCalls.some(call=>call.phase==='interpretation'&&call.status==='completed');
   const options=this.interpreter&&!progress&&!request.clarification&&!previousInterpretation
    ?await interpretationOptions(request,this.indexes.get(project,request.expected.contentHash),project):[];
   if(options.length){
    await onReceipt({type:'route',route:'interpretation'});
    let interpreted;
    try{
     interpreted=await this.interpreter({input,options,onReceipt,paid:request.paid===true});
    }catch(error){
     if(!/^E_(REVIEW_INTENT|REVIEW_MODEL_RESPONSE|MODEL_(INCOMPLETE|JSON|INPUT_LIMIT))$/.test(error.message))throw error;
     interpreted={reason:'The intent could not be validated.'};
    }
    if(interpreted.question){
     outcome=await finalize({question:interpreted.question});
    }else if(interpreted.intent){
     try{
      outcome=await this.buildIntentCandidate({id,request,project,proposalId,intents:[interpreted.intent],onReceipt});
     }catch(error){
      if(!/^E_REVIEW_(INTENT|VALUE|SCOPE|TEXT_FIT|ROLE_UNRESOLVED|OUTCOME_AUDIO_AMBIGUOUS|ASSET_CHOICE|WIN_AUDIO_MUST_BE_NEW)$/.test(error.message))throw error;
      await onReceipt({type:'route',route:'general-agent'});
     }
    }else{
     await onReceipt({type:'route',route:'general-agent'});
    }
   }
   outcome??=await this.agent({
    input,
    tools,callTool,progress,checkpoint,paid:request.paid===true,onReceipt,
    ...(interpreterCalls?{turnBudget:Math.max(1,8-interpreterCalls)}:{}),
    answer:request.clarification?.answer,
    validateFinal:async answer=>{
     check(!Object.hasOwn(answer,'question')||!request.clarification,'E_REVIEW_CLARIFICATION');
     return finalize(answer);
    },
   });
  }catch(error){
   const reason=/^E_[A-Z0-9_]+$/.test(error.message)?error.message:'E_REVIEW_MODEL_RESPONSE';
   outcome={status:'model-error',reason,...(error.creativeQa?{creativeQa:error.creativeQa}:{})};
   const retryAfterSeconds=error.retryAfterSeconds??(reason==='E_MODEL_RATE_LIMIT'?30:undefined);
   if(Number.isSafeInteger(retryAfterSeconds)&&retryAfterSeconds>=0){
    outcome.retryAfterSeconds=retryAfterSeconds;
    outcome.retryAt=Date.now()+Math.min(retryAfterSeconds,86400)*1000;
   }
  }finally{await toolsSession.dispose();}
  return this.update(id,(state,current)=>{
   const active=find(state,requestId);
   if(active.status==='resolving'&&active.modelRun?.id===runId){
    delete active.modelRun;
    if(!isDeepStrictEqual(request.expected,identity(current))){
     delete active.agentProgress;
     Object.assign(active,{status:'model-error',reason:'E_NATIVE_STALE'});
    }else{
     if(outcome.status==='candidate')state.passesUsed++;
     if(!['model-error','needs-clarification'].includes(outcome.status))delete active.agentProgress;
     Object.assign(active,outcome);
     if(outcome.status==='needs-clarification')applyReviewReceiptEvent(active.receipt,{type:'clarification'});
     applyReviewReceiptEvent(active.receipt,{type:'final',disposition:outcome.status,candidateId:outcome.status==='candidate'?proposalId:undefined});
    }
   }
   return publicRequest(active);
  });
 }

 async candidate(id,requestId) {
  const journal=await this.service.history.readRevisionJournal(id);
  const request=find(journal.review??empty(),requestId);
  check(request.status==='candidate','E_REVIEW_STATUS');
  const {project,previewDigest}=await this.service.preview(id,this.envelope(request));
  check(previewDigest===request.previewDigest,'E_NATIVE_PREVIEW_STALE');
  const assets=await lowerAssets(resolve(this.service.store.root,id),project.assets);
  return {project,assets};
 }

 envelope(request) {
  return {format:'tora-transaction-1',expected:request.expected,operations:request.operations,previewDigest:request.previewDigest};
 }

 async promote(id,requestId) {
  const journal=await this.service.history.readRevisionJournal(id);
  const request=find(journal.review??empty(),requestId);
  if(request.status==='promoted')return request.revision;
  check(request.status==='candidate','E_REVIEW_STATUS');
  return this.service.transact(id,this.envelope(request),{
   guard:state=>check(find(state.review,requestId).status==='candidate','E_REVIEW_STATUS'),
   record:(state,revision)=>{
    const active=find(state.review,requestId);
    Object.assign(active,{status:'promoted',revision});
    active.receipt??=createReviewReceipt(requestId,active.expected);
    applyReviewReceiptEvent(active.receipt,{type:'final',disposition:'promoted',candidateId:active.modelRun?.proposalId??active.candidate?.id});
   },
  });
 }

 async discard(id,requestId) {
  return this.update(id,state=>{
   const request=find(state,requestId);
   check(request.status!=='promoted','E_REVIEW_STATUS');
   request.status='discarded';
   request.receipt??=createReviewReceipt(requestId,request.expected);
   applyReviewReceiptEvent(request.receipt,{type:'final',disposition:'discarded'});
   delete request.agentProgress;
   return publicRequest(request);
  });
 }

 async bundle(id) {return JSON.parse(await exportProjectFile(this.service,id));}

 async post(id,input) {
  const fields={
   request:Object.hasOwn(input??{},'notes')?['expected','notes','requestId']:['expected','target','fields','moment','note','requestId'],
   store:['expected','url'],
   promote:['requestId'],
   discard:['requestId'],
   resolve:['requestId'],
   answer:['requestId','answer'],
  }[input?.action];
  check(Array.isArray(fields)&&exact(input,['action',...fields,...(input.action==='request'?['frame','intent','replacesRequestId','paid']:[])])&&fields.every(field=>Object.hasOwn(input,field)),'E_REVIEW_ARGUMENT');
  if(input.action==='request')return this.request(id,input);
  if(input.action==='store')return this.store(id,input);
  if(input.action==='answer')return this.answer(id,input.requestId,input.answer);
  return this[input.action](id,input.requestId);
 }
}
