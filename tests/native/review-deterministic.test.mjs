import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
import {URL} from 'node:url';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {NativeReview} from '../../scripts/lean/native/review.mjs';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
import {eligibleOutcomeCueChoices,transferOutcomeCueIntent} from '../../scripts/lean/native/review-intents.mjs';
import {loadCatalogSync} from '../../scripts/lean/native/catalog-cache.mjs';
import {configuredReviewInterpreter,reviewRoutingFlags} from '../../scripts/lean/native/review-resolver.mjs';
import {contentHash} from '../../scripts/lean/native/service.mjs';
import {registerSource} from '../../scripts/lean/native/assets.mjs';
import {nativeConcept,legacyHarvestOutcomeConcept} from '../helpers/native-concept.mjs';
import {reviewOperations,reviewTargets} from '../../scripts/lean/native/review-targets.mjs';

test('provider-disconnected literal copy and typed sound edits produce checked deterministic candidates',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-deterministic-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const {service}=tools,review=new NativeReview(service,{deterministic:true});
 let id='harvest-deterministic';
 let {expected}=await tools.run({command:'compose',id,concept:await createHarvestConcept()});
 let baseline=(await service.read(id)).project;

 const copy=await review.request(id,{requestId:randomUUID(),expected,target:'cta',fields:['text'],moment:'end-card',note:'Change the selected CTA to "Play now"'});
 const copyCandidate=await review.resolve(id,copy.id);
 assert.equal(copyCandidate.status,'candidate',JSON.stringify(copyCandidate));
 assert.equal(copyCandidate.receipt.route,'deterministic');
 assert.deepEqual(copyCandidate.receipt.providerCalls,[]);
 assert.deepEqual(copyCandidate.receipt.providerUsage,{inputTokens:0,outputTokens:0,cachedInputTokens:0});
 assert.equal(copyCandidate.receipt.disposition,'candidate');
 assert.ok(copyCandidate.receipt.timing.compilationMs>=0);
 assert.equal((await review.candidate(id,copy.id)).project.components.find(item=>item.id==='harvest.cta.label').parameters.text,'Play now');
 assert.deepEqual((await service.read(id)).project,baseline);
 const discarded=await review.discard(id,copy.id);
 assert.equal(discarded.receipt.timing.endToEndMs,copyCandidate.receipt.timing.endToEndMs);

 id='harvest-deterministic-legacy';
 ({expected}=await tools.run({command:'compose',id,concept:await legacyHarvestOutcomeConcept()}));
 baseline=(await service.read(id)).project;
 const request=await review.request(id,{requestId:randomUUID(),expected,notes:[{
  target:'ending',fields:['win-cue'],moment:'end-card',note:'Move the current win jingle to loss and use a new celebratory cue for winning.',intent:transferOutcomeCueIntent(),
 }]});
 const candidate=await review.resolve(id,request.id);
 assert.equal(candidate.status,'candidate',JSON.stringify(candidate));
 assert.equal(candidate.receipt.route,'deterministic');
 assert.deepEqual(candidate.receipt.providerCalls,[]);
 assert.equal(candidate.receipt.repairs,0);
 assert.ok(candidate.receipt.verificationRuns.some(run=>run.kind==='harvest-outcome-audio'&&run.status==='completed'));
 assert.ok(candidate.receipt.tools.some(tool=>tool.name==='preview'&&tool.status==='completed'));
 assert.deepEqual(new Set(candidate.candidate.audioMoments),new Set(['end-card','timeout']));
 assert.ok(candidate.candidate.evidence.some(line=>line.startsWith('Win playback started')));
 assert.ok(candidate.candidate.evidence.some(line=>line.startsWith('Loss playback started')));

 const staged=(await review.candidate(id,request.id)).project;
 const component=(project,id)=>project.components.find(item=>item.id===id);
 const behavior=(project,id)=>project.gameplay.find(item=>item.id===id);
 const binding=(project,id)=>project.eventBindings.find(item=>item.id===id);
 const oldAssetId=component(baseline,'harvest.audio.complete').assetSlots[0].assetId;
 const oldHash=baseline.assets.find(asset=>asset.id===oldAssetId).hash;
 const newAssetId=component(staged,'harvest.restore.3.cue').assetSlots[0].assetId;
 const newHash=staged.assets.find(asset=>asset.id===newAssetId).hash;
 assert.equal(oldAssetId,'audio-complete');
 assert.notEqual(newHash,oldHash);
 assert.equal(newHash,'sha256:20c6d0a71e3aff1ff59abdaf8772d0cdf2ddcb2abffa2d4f6057683eaf6ca2ec');
 assert.ok(binding(staged,'harvest.deadline.cta').actions.some(action=>action.kind==='playAudio'&&action.behaviorId==='harvest.audio.complete.play'));
 assert.ok(binding(staged,'harvest.restore.3').actions.some(action=>action.kind==='playAudio'&&action.behaviorId==='harvest.restore.3.cue.play'));
 assert.equal(behavior(staged,'harvest.audio.complete.play').componentId,'harvest.audio.complete');
 assert.equal(reviewTargets(staged).targets.find(item=>item.id==='ending').fields.find(item=>item.id==='win-cue').value,newAssetId);
 const followup=reviewOperations(staged,'ending',['win-cue'],{'win-cue':'audio-repair'});
 assert.equal(followup.operations[0].id,'harvest.restore.3.cue');
 for(const cue of ['ambient','match','repair','reject'])assert.deepEqual(component(staged,'harvest.audio.'+cue),component(baseline,'harvest.audio.'+cue));
 assert.equal((await review.read(id)).passesUsed,0);
 assert.deepEqual((await service.read(id)).project,baseline);

 const repeated=await review.request(id,{requestId:randomUUID(),expected,notes:[{
  target:'ending',fields:['win-cue'],moment:'end-card',note:'Use the explicit outcome sound transfer.',intent:transferOutcomeCueIntent(),
 }]});
 const second=await review.resolve(id,repeated.id);
 assert.equal(second.status,'candidate',JSON.stringify(second));
 assert.deepEqual(second.operations,candidate.operations);
 assert.equal(second.previewDigest,candidate.previewDigest);
 assert.equal(contentHash((await review.candidate(id,repeated.id)).project),contentHash(staged));
 assert.equal(second.receipt.disposition,'candidate');
});

test('tap-collect uses local CTA and timing edits and supports interpreted timing',async t=>{
 const store=await mkdtemp(resolve('reports/tap-deterministic-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='tap-deterministic';
 let {expected}=await tools.run({command:'compose',id,concept:nativeConcept('tap-collect')});
 const asset=await registerSource(resolve(tools.service.store.root,id),{id:'feedback.audio',mime:'audio/wav',data:(await readFile(new URL('../../assets/free-audio/casual-warm/audio/tap.wav',import.meta.url))).toString('base64'),rights:'Kenney Interface Sounds, CC0-1.0. https://kenney.nl/assets/interface-sounds'});
 const current=(await tools.service.read(id)).project;
 const sound=current.gameplay.find(behavior=>behavior.id==='feedback.sound');
 const setup=await tools.run({command:'edit',id,expected,scope:['feedback.audio','feedback.audio.source','feedback.sound'],operations:[
  {kind:'registerAsset',asset},
  {kind:'createComponent',component:{id:'feedback.audio.source',contract:'native.group.v1',sceneId:'scene.play',parameters:{visible:false},assetSlots:[{slotId:'source',assetId:asset.id}]}},
  {kind:'putBehavior',behavior:{...sound,componentId:'feedback.audio.source'}},
 ]});
 expected=setup.expected;
 const request=async(target,fields,moment,note)=>review.request(id,{requestId:randomUUID(),expected,target,fields,moment,note});
 let interpretations=0;
 const review=new NativeReview(tools.service,{deterministic:true,agent:()=>assert.fail('Unexpected general agent'),interpreter:({options})=>{
  interpretations++;
  const intent=options.find(option=>option.action==='setTiming');
  return {intent:{...intent,arguments:{...intent.arguments,seconds:.4}}};
 }});
 const copy=await request('cta',['text'],'end-card','Set the CTA to "Play now"');
 assert.equal((await review.resolve(id,copy.id)).status,'candidate',JSON.stringify(await review.read(id)));
 assert.equal((await review.candidate(id,copy.id)).project.components.find(item=>item.id==='success.cta.label').parameters.text,'Play now');
 const timing=await request('tap-feedback',['feedback-duration'],'opening','Set the tap feedback duration to 0.3 seconds');
 assert.equal((await review.resolve(id,timing.id)).receipt.route,'deterministic');
 assert.equal((await review.candidate(id,timing.id)).project.gameplay.find(item=>item.id==='feedback.pulse').parameters.seconds,.3);
 const ordinary=await request('tap-feedback',['feedback-duration'],'opening','Make the tap pulse last four tenths of a second');
 assert.equal((await review.resolve(id,ordinary.id)).receipt.route,'interpretation');
 assert.equal((await review.candidate(id,ordinary.id)).project.gameplay.find(item=>item.id==='feedback.pulse').parameters.seconds,.4);
 assert.equal(interpretations,1);
 const notes=[
  {target:'cta',fields:['text'],moment:'end-card',note:'Set the CTA to "Play now"'},
  {target:'tap-feedback',fields:['feedback-duration'],moment:'opening',note:'Set the tap feedback duration to 0.3 seconds'},
 ];
 const batch=await review.request(id,{requestId:randomUUID(),expected,notes});
 const batchResult=await review.resolve(id,batch.id);
 assert.equal(batchResult.status,'candidate');
 assert.equal(batchResult.receipt.route,'deterministic');
 const conflict=await review.request(id,{requestId:randomUUID(),expected,notes:[notes[0],{...notes[0],note:'Set the CTA to "Get it"'}]});
 assert.equal((await review.resolve(id,conflict.id)).reason,'E_REVIEW_CONFLICT');
});

test('complete literal grammar does not consume negation or extra clauses',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-literal-scope-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='harvest-literal-scope';
 const {expected}=await tools.run({command:'compose',id,concept:await createHarvestConcept()});
 const review=new NativeReview(tools.service,{deterministic:true});
 const saved=await review.request(id,{requestId:randomUUID(),expected,target:'cta',fields:['text'],moment:'end-card',note:'Change the selected CTA to "Play now" and keep the loss sound'});
 assert.equal(await review.resolveDeterministic(id,saved.id),undefined);
 assert.equal((await review.read(id)).requests[0].status,'waiting');
});

test('local timeout alignment preserves the existing caption and checks packaged landscape bounds',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-caption-scope-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='harvest-caption-scope',review=new NativeReview(tools.service,{deterministic:true});
 const {expected}=await tools.run({command:'compose',id,concept:await createHarvestConcept()});
 const {project}=await tools.service.read(id);
 const {operations}=reviewOperations(project,'timeout-card',['timeout-caption'],{'timeout-caption':'Try again'});
 const caption=operations.find(op=>op.component?.id==='harvest.timeout.caption').component;
 caption.transform[4]+=20;
 caption.transform[5]+=12;
 caption.parameters.align='left';
 const envelope={format:'tora-transaction-1',expected,operations};
 const {previewDigest}=await tools.service.preview(id,envelope);
 const {revisionId,contentHash}=await tools.service.transact(id,{...envelope,previewDigest});
 const note=await review.request(id,{requestId:randomUUID(),expected:{revisionId,contentHash},target:'timeout-card',
  fields:['caption-alignment'],moment:'timeout',note:'Center the existing timeout caption in the panel'});
 const result=await review.resolve(id,note.id);
 assert.equal(result.status,'candidate',JSON.stringify(result));
 assert.equal(result.receipt.providerCalls.length,0);
 assert.ok(result.receipt.verificationRuns.some(run=>run.kind==='harvest-layout'&&run.status==='completed'));
 const staged=(await review.candidate(id,note.id)).project.components.find(item=>item.id===caption.id);
 assert.equal(staged.parameters.text,'Try again');
 assert.equal(staged.parameters.align,'center');
 assert.equal(staged.transform[4],45);
 assert.equal(staged.transform[5],405.5);
});


test('typed direct text and timing edits need no provider or free-text grammar',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-direct-intents-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='harvest-direct-intents',review=new NativeReview(tools.service,{deterministic:true});
 const {expected}=await tools.run({command:'compose',id,concept:await createHarvestConcept()});
 const requests=[
  {target:'cta',fields:['text'],moment:'end-card',note:'Change the selected CTA to "Launch now"',intent:{
   format:'tora-authoring-intent-1',noteId:'1',action:'replaceText',targetRole:'primaryCta',arguments:{text:'Launch now'},
   constraints:{literal:true},requiredChecks:['package','diff-1'],
  }},
  {target:'opening',fields:['hint-delay'],moment:'opening',note:'Set the selected timing to 1.2 seconds.',intent:{
   format:'tora-authoring-intent-1',noteId:'1',action:'setTiming',targetRole:'reviewTiming',arguments:{field:'hint-delay',seconds:1.2},
   constraints:{absolute:true},requiredChecks:['package','diff-1'],
  }},
  {target:'first-harvest',fields:['reveal-duration'],moment:'first-harvest',note:'Set the reveal duration to 0.7 seconds.',intent:{
   format:'tora-authoring-intent-1',noteId:'1',action:'setTiming',targetRole:'reviewTiming',arguments:{field:'reveal-duration',seconds:.7},
   constraints:{absolute:true},requiredChecks:['package','diff-1'],
  }},
  {target:'cta',fields:['payoff-hold'],moment:'end-card',note:'Set the payoff hold to 1.6 seconds.',intent:{
   format:'tora-authoring-intent-1',noteId:'1',action:'setTiming',targetRole:'reviewTiming',arguments:{field:'payoff-hold',seconds:1.6},
   constraints:{absolute:true},requiredChecks:['package','diff-1'],
  }},
 ];
 for(const note of requests){
  const saved=await review.request(id,{requestId:randomUUID(),expected,notes:[note]});
  const result=await review.resolve(id,saved.id);
  assert.equal(result.status,'candidate',JSON.stringify(result));
  assert.equal(result.receipt.route,'deterministic');
  assert.equal(result.receipt.providerCalls.length,0);
 }
});

test('eligible outcome cues retain NES compatibility and include the arcade win cue',()=>{
 const choices=eligibleOutcomeCueChoices({assets:[]},loadCatalogSync());
 assert.equal(choices[0].catalogId,'kenney-music-jingles/audio/victory.wav');
 assert.ok(choices.some(choice=>choice.catalogId.endsWith('/arcade-pop/win.wav')));
});

test('deterministic routing and interpretation default on with explicit zero opt-outs',()=>{
 assert.deepEqual(reviewRoutingFlags({}),{deterministic:true,interpretation:true});
 assert.deepEqual(reviewRoutingFlags({TORA_DETERMINISTIC_REVIEW:'0',TORA_REVIEW_INTERPRETATION:'0'}),{deterministic:false,interpretation:false});
});

test('two malformed interpretations fall back with the remaining agent budget',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-interpretation-budget-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const tools=new NativeAgentTools();
 tools.service.store=new ProjectStore(store);
 tools.service.history.store=tools.service.store;
 const id='harvest-interpretation-budget';
 const {expected}=await tools.run({command:'compose',id,concept:await createHarvestConcept()});
 let calls=0,budget;
 const interpreter=configuredReviewInterpreter({provider:'orca',endpoint:'https://models.example.test',apiKey:'fixture-key',model:'fixture-model'},async()=>{
  calls++;
  return new globalThis.Response(JSON.stringify({choices:[{finish_reason:'stop',message:{content:'not json'}}]}));
 });
 const review=new NativeReview(tools.service,{deterministic:true,interpreter,agent:async input=>{
  budget=input.turnBudget;
  return input.validateFinal({question:'Which exact revision should I make?'});
 }});
 const saved=await review.request(id,{requestId:randomUUID(),expected,target:'cta',fields:['text'],moment:'end-card',note:'Improve the button wording.'});
 const result=await review.resolve(id,saved.id);
 assert.equal(calls,2);
 assert.equal(budget,6);
 assert.equal(result.status,'needs-clarification',JSON.stringify(result));
 assert.equal(result.receipt.repairs,1);
});
