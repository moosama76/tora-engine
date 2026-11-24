import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {NativeReview} from '../../scripts/lean/native/review.mjs';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
import {legacyHarvestOutcomeConcept} from '../helpers/native-concept.mjs';
import {feedbackModel,orcaReviewResolver} from '../../scripts/lean/native/review-resolver.mjs';

const response = value=>new globalThis.Response(JSON.stringify({
 choices:[{finish_reason:'stop',message:{content:JSON.stringify(value)}}],
}),{headers:{'Content-Type':'application/json'}});

test('DeepSeek resolves whole-moment feedback into one scoped Harvest candidate',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-orca-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='orca-harvest',requestId=randomUUID();
 const {expected}=await tools.run({command:'compose',id,concept:await legacyHarvestOutcomeConcept()});
 const {service}=tools;
 const base=(await service.read(id)).project;
 let calls=0;
 const resolver=orcaReviewResolver(' fixture-orca-token\n',async (url,options)=>{
  calls++;
  assert.equal(url,'https://api.orcarouter.ai/v1/chat/completions');
  assert.equal(options.headers.Authorization,'Bearer fixture-orca-token');
  assert.equal(options.redirect,'error');
  const prompt=JSON.parse(options.body);
  assert.equal(prompt.model,feedbackModel);
  assert.deepEqual(prompt.thinking,{type:'disabled'});
  assert.deepEqual(prompt.response_format,{type:'json_object'});
  assert.equal(prompt.tools,undefined);
  assert.ok(prompt.messages.every(message=>typeof message.content==='string'));
  const context=JSON.parse(prompt.messages[1].content);
  assert.doesNotMatch(prompt.messages[1].content,/data:image|storeUrl|fixture-orca-token/);
  assert.equal(context.notes.length,1);
  assert.equal(context.notes[0].pinned,false);
  const general=context.notes[0].allowed;
  assert.ok(general.some(target=>target.id==='opening'&&target.moment==='opening'));
  assert.ok(general.some(target=>target.id==='ending'&&target.moment==='end-card'));
  assert.ok(general.every(target=>target.fields.every(field=>!field.confirm)));
  const ending=general.find(target=>target.id==='ending');
  assert.equal(ending.fields.find(field=>field.id==='landscape-inset').viewportWidth,700);
  return response({summary:'Show the opening hint sooner, use a short restoration jingle, inset the landscape panel and center the timeout message.',
   edits:{1:[{target:'opening',changes:{'hint-delay':0.8}},{target:'ending',changes:{'win-cue':'audio-repair','landscape-inset':12,'timeout-caption':'Try another harvest'}}]}});
 });
 const review=new NativeReview(service,{resolver});
 assert.equal((await review.read(id)).feedbackModel,feedbackModel);
 await review.request(id,{expected,requestId,notes:[
  {target:null,fields:[],moment:'live',note:'Show the first hint sooner and brighten the win cue. Also inset the landscape end card and center its timeout caption.'},
 ]});
 await review.claim(id,requestId);
 await review.needsScope(id,requestId,'Older editor did not expose these controls.');
 const result=await review.post(id,{action:'resolve',requestId});
 assert.equal(result.status,'candidate',JSON.stringify(result));
 assert.deepEqual(result.candidate.moments,['opening','end-card','timeout']);
 assert.equal((await review.read(id)).passesUsed,1);
 assert.deepEqual((await service.read(id)).project,base);
 const {project}=await review.candidate(id,requestId);
 const get=id=>project.components.find(item=>item.id===id);
 const panel=get('harvest.board.lock');
 const layout=project.gameplay.find(item=>item.id==='harvest.puzzle.layout.responsive').parameters;
 assert.equal(layout.x+(panel.transform[4]+panel.parameters.width)*layout.scaleX,688);
 assert.equal(get('harvest.audio.complete').assetSlots[0].assetId,'audio-repair');
 assert.equal(get('harvest.timeout.caption').parameters.text,'Try another harvest');
 const hint=project.eventBindings.find(binding=>binding.id==='harvest.hint.show');
 assert.equal(hint.condition.any[0].all.find(part=>part.variableId==='harvest.idle').value,0.8);
 assert.ok(result.candidate.bytes<5000000);
 assert.deepEqual(await review.resolve(id,requestId),result);
 assert.equal(calls,1);
});

test('rate limits leave the pass available and explicit fields cannot be widened by the model',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-orca-scope-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='orca-scope',requestId=randomUUID();
 const {expected}=await tools.run({command:'compose',id,concept:await createHarvestConcept()});
 let next=new globalThis.Response(null,{status:429,headers:{'Retry-After':'24'}});
 const resolver=orcaReviewResolver('fixture-orca-token',async()=>next);
 const review=new NativeReview(tools.service,{resolver});
 await review.request(id,{expected,requestId,target:'cta',fields:['text'],moment:'end-card',note:'Update the button wording.'});
 const limited=await review.resolve(id,requestId);
 assert.equal(limited.reason,'E_MODEL_RATE_LIMIT');
 assert.equal(limited.retryAfterSeconds,24);
 assert.ok(limited.retryAt>Date.now());
 assert.equal((await review.read(id)).passesUsed,0);
 next=response({summary:'Change the button wording and an unrelated layout.',edits:{1:[
  {target:'cta',changes:{text:'Too many edits'}},{target:'ending',changes:{'landscape-inset':12}},
 ]}});
 const rejected=await review.resolve(id,requestId);
 assert.equal(rejected.reason,'E_REVIEW_SCOPE');
 assert.equal(rejected.retryAfterSeconds,undefined);
 assert.equal((await review.read(id)).passesUsed,0);
 assert.deepEqual((await review.read(id)).expected,expected);
 next=new globalThis.Response(JSON.stringify({choices:[{finish_reason:'stop',message:{content:'not a JSON proposal'}}]}));
 assert.equal((await review.resolve(id,requestId)).reason,'E_REVIEW_MODEL_RESPONSE');
 assert.equal((await review.read(id)).passesUsed,0);
 next=response({summary:'An edit has no changes yet.',edits:{1:{target:'cta',changes:{}}}});
 assert.equal((await review.resolve(id,requestId)).reason,'E_REVIEW_MODEL_RESPONSE');
 assert.equal((await review.read(id)).passesUsed,0);
 next=response({summary:'Use a shorter label.',edits:{1:{target:'cta',changes:{text:'Play now'}}}});
 assert.equal((await review.resolve(id,requestId)).status,'candidate');
 assert.equal((await review.read(id)).passesUsed,1);
 const secondRequestId=randomUUID();
 await review.request(id,{expected,requestId:secondRequestId,target:'cta',fields:['text'],moment:'end-card',note:'Use a more direct install label.'});
 next=response({summary:'Use direct wording.',edits:{1:{target:'cta',changes:{text:'Harvest now'}}}});
 assert.equal((await review.resolve(id,secondRequestId)).status,'candidate');
 assert.equal((await review.read(id)).passesUsed,2);
 const third=await review.request(id,{expected,requestId:randomUUID(),target:'cta',fields:['text'],moment:'end-card',note:'Another creative edit.'});
 assert.equal(third.status,'waiting');
});

test('OrcaRouter failures have stable codes with no provider body or key disclosure',async t=>{
 const key='fixture-private-token';
 const free=(reason,seconds)=>({error:{code:'free_rate_limited',message:'Provider prose',metadata:{reason,retry_after_seconds:seconds}}});
 for(const [status,body,code,wait] of [
  [401,{error:{message:key}},'E_MODEL_AUTH'],
  [403,{error:{message:'Key is forbidden'}},'E_MODEL_FORBIDDEN'],
  [402,{},'E_MODEL_QUOTA'],
  [404,{},'E_MODEL_UNAVAILABLE'],
  [400,free('err_free_prompt_cap'),'E_MODEL_FREE_PROMPT_LIMIT'],
  [429,free('err_free_access_denied'),'E_MODEL_FREE_ACCESS'],
  [429,free('err_free_rate',37),'E_MODEL_RATE_LIMIT',37],
  [429,free('err_free_rate'),'E_MODEL_FREE_CAPACITY'],
  [504,{},'E_MODEL_TIMEOUT'],
  [503,{},'E_MODEL_UPSTREAM'],
  [200,{error:{message:'Relay failed after returning HTTP headers'}},'E_MODEL_UPSTREAM'],
  [200,{choices:[{finish_reason:'stop',message:{content:'   '}}]},'E_MODEL_INCOMPLETE'],
  [200,{choices:[{finish_reason:'length',message:{content:'{...'}}]},'E_MODEL_INCOMPLETE'],
 ]){
  await t.test(status+' '+code,async()=>{
   let attempts=0;
   const resolver=orcaReviewResolver(key,async()=>{
    attempts++;
    return new globalThis.Response(JSON.stringify(body),{status});
   });
   await assert.rejects(resolver({notes:[]}),error=>
    error.message===code&&error.code===code&&error.retryAfterSeconds===wait&&!JSON.stringify(error).includes(key));
   assert.equal(attempts,1);
  });
 }
});

test('an expired provider lease can retry and a saved second-pass answer can resume without credentials',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-orca-resume-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='orca-resume',requestId=randomUUID();
 const {expected}=await tools.run({command:'compose',id,concept:await createHarvestConcept()});
 let calls=0;
 const resolver=orcaReviewResolver('fixture-orca-token',async()=>{
  calls++;
  return response({summary:'Use direct wording',edits:{1:{target:'cta',changes:{text:'Play now'}}}});
 });
 const first=new NativeReview(tools.service,{resolver});
 const afterReconnect=new NativeReview(tools.service,{resolver:null});
 await first.request(id,{expected,requestId,target:'cta',fields:['text'],moment:'end-card',note:'Change the CTA to Play now.'});
 await first.update(id,state=>{
  state.passesUsed=1;
  state.requests[0].status='resolving';
  state.requests[0].modelRun={id:randomUUID(),until:Date.now()-1};
 });
 assert.equal((await first.read(id)).requests[0].canResume,true);
 assert.equal((await afterReconnect.read(id)).requests[0].canResume,undefined);
 const started=globalThis.Promise.withResolvers(),dispatch=globalThis.Promise.withResolvers();
 const build=first.buildCandidate.bind(first);
 first.buildCandidate=async(...args)=>{
  started.resolve();
  await dispatch.promise;
  return build(...args);
 };
 const pending=first.resolve(id,requestId);
 await started.promise;
 try{
  const recovering=await afterReconnect.read(id);
  assert.equal(recovering.requests[0].canResume,true);
  assert.equal(recovering.passesUsed,2);
  const result=await afterReconnect.resolve(id,requestId);
  assert.equal(result.status,'candidate',JSON.stringify(result));
  assert.equal(calls,1);
  assert.equal((await afterReconnect.read(id)).passesUsed,2);
 }finally{
  dispatch.resolve();
  await pending;
 }
});
