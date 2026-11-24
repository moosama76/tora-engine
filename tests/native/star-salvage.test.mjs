import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {mkdtemp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {NativeReview} from '../../scripts/lean/native/review.mjs';
import {ReviewIntake} from '../../scripts/lean/native/review-intake.mjs';
import {createSalvageConcept} from '../../scripts/lean/native/author-salvage.mjs';
import {composeNativeConcept,conceptHash,validateCreativeConcept} from '../../scripts/lean/native/concept.mjs';
import {applyOperations,emptyProject} from '../../scripts/lean/native/document.mjs';
import {contentHash} from '../../scripts/lean/native/service.mjs';
import {createProjectIndex} from '../../scripts/lean/native/project-index.mjs';
import {reviewOperations,reviewTargets} from '../../scripts/lean/native/review-targets.mjs';
import {compileDeterministicIntent,deterministicIntent,transferOutcomeCueIntent} from '../../scripts/lean/native/review-intents.mjs';

const source=await createSalvageConcept();
const concept=()=>globalThis.structuredClone(source);
function projectFor(input=concept()){
 const composition=composeNativeConcept(input),{project}=applyOperations(emptyProject({id:'star-salvage-test',name:'Star Salvage'}),composition.operations);
 return {composition,project};
}
async function isolatedTools(t,prefix){
 const root=await mkdtemp(resolve('reports/'+prefix));t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root),tools=new NativeAgentTools(new NativeService(store,new EditorState(store)));return tools;
}

test('Star Salvage uses verified media and deterministic bounded composition and reward treatments',()=>{
 const input=concept();assert.doesNotThrow(()=>validateCreativeConcept(input));
 const {composition,project}=projectFor(input);
 assert.ok(composition.operations.length<=256);
 assert.equal(project.components.find(item=>item.id==='salvage.backdrop').parameters.width,700);
 assert.equal(project.components.find(item=>item.id==='salvage.backdrop').parameters.height,700);
 assert.equal(project.gameplay.find(item=>item.id==='salvage.celebration').parameters.shape,'confetti');
 assert.equal(project.gameplay.find(item=>item.id==='salvage.celebration').parameters.coverage,'screen');
 assert.equal(project.components.some(item=>item.id==='salvage.reward.badge'),false);
 assert.equal(project.components.some(item=>item.id==='salvage.replay'),false);
 assert.equal(composition.assetPolicy.length,input.salvage.assets.length);
 assert.ok(composition.assetPolicy.every(receipt=>receipt.origin==='third-party-free'&&receipt.license==='CC0-1.0'));
 assert.ok(composition.assetPolicy.some(receipt=>receipt.sourceId==='kenney-space-shooter-redux'));
 assert.ok(composition.assetPolicy.some(receipt=>receipt.sourceFile?.startsWith('arcade-pop/')));
 assert.equal(composition.recipe.variant,'turbo');assert.equal(composition.recipe.reviewStatus,'pending');
 assert.equal(contentHash(project),contentHash(projectFor(input).project));
 assert.equal(conceptHash(input),conceptHash(concept()));
 assert.equal(project.eventBindings.find(binding=>binding.id==='salvage.restore.1').actions.find(action=>action.kind==='floatingText').text,'+1 PART');
 assert.ok(!project.eventBindings.find(binding=>binding.id==='salvage.restore.3').actions.some(action=>action.kind==='floatingText'));
 input.salvage.rewardRecipe.variant='nova';const nova=projectFor(input);
 assert.notDeepEqual(nova.composition.recipe,composition.recipe);assert.equal(nova.composition.recipe.variant,'nova');
 const changed=composition.operations.filter((operation,index)=>JSON.stringify(operation)!==JSON.stringify(nova.composition.operations[index]));
 assert.deepEqual(changed.map(operation=>operation.behavior?.id??operation.binding?.id),['salvage.station.stage.3.reveal','salvage.audio.complete.play','salvage.restore.3','salvage.celebration']);
 const invalid=concept();invalid.salvage.assets[0].provenance.sourceHash='sha256:'+'0'.repeat(64);
 assert.throws(()=>composeNativeConcept(invalid),/E_ASSET_POLICY_BYTES/);
});

test('Star Salvage exposes stable roles and deterministic CTA, timing, caption and shared-art edits',async()=>{
 const {project}=projectFor(),targets=reviewTargets(project);
 assert.equal(targets.module,'star-salvage');assert.ok(targets.targets.some(target=>target.id==='core-art'));assert.ok(targets.targets.some(target=>target.id==='hazard-art'));
 assert.equal(reviewOperations(project,'cta',['text'],{text:'RESCUE NOW'}).expected.components.find(item=>item.id==='salvage.cta.label').parameters.text,'RESCUE NOW');
 assert.equal(reviewOperations(project,'opening',['hint-delay'],{'hint-delay':1.2}).expected.gameplay.find(item=>item.id==='salvage.hand').parameters.idleDelaySeconds,1.2);
 assert.equal(reviewOperations(project,'ending',['payoff-hold'],{'payoff-hold':2.8}).expected.eventBindings.find(item=>item.id==='salvage.payoff.finish').condition.all[1].value,2.8);
 assert.equal(reviewOperations(project,'timeout-card',['caption-alignment'],{'caption-alignment':'center'}).expected.components.find(item=>item.id==='salvage.timeout.caption').parameters.align,'center');
 const target=targets.targets.find(item=>item.id==='core-art'),assetId=target.imageChoices.find(id=>id==='salvage-core-alt');
 const request={target:'core-art',moment:'opening',fields:['shared-art'],note:'Replace all uses with "'+assetId+'"'};
 const intent=deterministicIntent(request);assert.equal(intent.action,'replaceSharedArtwork');
 const compiled=await compileDeterministicIntent(project,intent,createProjectIndex(project));
 assert.equal(compiled.edit.changes['shared-art'],assetId);
 const changed=reviewOperations(project,'core-art',['shared-art'],{'shared-art':assetId}).expected;
 assert.equal(changed.components.find(item=>item.id==='salvage.core.image').assetSlots[0].assetId,assetId);
});

test('provider-disconnected outcome transfer stages a verified Star Salvage candidate without altering the baseline',async t=>{
 const tools=await isolatedTools(t,'salvage-deterministic-'),input=concept();delete input.salvage.audio.loss;
 const id='salvage-deterministic-transfer',{expected}=await tools.run({command:'compose',id,concept:input}),baseline=(await tools.service.read(id)).project;
 const review=new NativeReview(tools.service,{deterministic:true,agent:()=>assert.fail('Unexpected provider call')});
 const saved=await review.request(id,{requestId:randomUUID(),expected,target:'ending',moment:'end-card',fields:['win-cue'],note:'Move the current win sound to loss and use a new win cue.',intent:transferOutcomeCueIntent()});
 const result=await review.resolve(id,saved.id);assert.equal(result.status,'candidate',JSON.stringify(result));
 assert.equal(result.receipt.route,'deterministic');assert.deepEqual(result.receipt.providerCalls,[]);
 assert.ok(result.receipt.verificationRuns.some(run=>run.kind==='salvage-outcome-audio'&&run.status==='completed'));
 const candidate=(await review.candidate(id,saved.id)).project;
 assert.ok(candidate.eventBindings.find(item=>item.id==='salvage.deadline.cta').actions.some(action=>action.kind==='playAudio'&&action.behaviorId==='salvage.audio.complete.play'));
 assert.ok(candidate.eventBindings.find(item=>item.id==='salvage.restore.3').actions.some(action=>action.kind==='playAudio'&&action.behaviorId==='salvage.restore.3.cue.play'));
 assert.notEqual(candidate.components.find(item=>item.id==='salvage.restore.3.cue').assetSlots[0].assetId,candidate.components.find(item=>item.id==='salvage.audio.complete').assetSlots[0].assetId);
 assert.deepEqual((await tools.service.read(id)).project,baseline);
});

test('studio intake composes and publishes a complete Star Salvage Unity artifact',async t=>{
 const tools=await isolatedTools(t,'salvage-intake-'),intake=new ReviewIntake(tools.service),input=concept();
 const draft=await intake.create({projectId:'studio-star-salvage',name:input.product.name,storeUrl:input.product.storeUrl,studio:'Fixture supplier',brief:'Catch cores and restore a station.',rights:'CC0 fixture media supplied for intake verification.',mechanic:'star-salvage'});
 await assert.rejects(intake.submit(draft.id),/E_INTAKE_SALVAGE_MEDIA/);
 const uploaded=new Map();
 for(const asset of input.salvage.assets){
  const current=await intake.upload(draft.id,{name:asset.id,mime:asset.mime,data:asset.data});
  uploaded.set(asset.id,current.assets.find(item=>item.name===asset.id).id);
 }
 assert.equal((await intake.submit(draft.id)).status,'queued');assert.equal((await intake.claim(draft.id)).status,'claimed');
 delete input.salvage.assets;
 for(const key of Object.keys(input.salvage.sprites))input.salvage.sprites[key]=uploaded.get(input.salvage.sprites[key]);
 for(const key of ['coreVariants','hazardVariants'])input.salvage[key]=input.salvage[key].map(id=>uploaded.get(id));
 for(const object of input.salvage.bay)object.assetId=uploaded.get(object.assetId);
 for(const key of Object.keys(input.salvage.audio))input.salvage.audio[key]=uploaded.get(input.salvage.audio[key]);
 const ready=await intake.build(draft.id,{concept:input});assert.equal(ready.status,'ready');assert.ok(ready.artifact.bytes<5_000_000);
 const saved=await tools.service.read('studio-star-salvage');assert.equal(saved.project.gameplay.find(item=>item.id==='salvage.rules').parameters.maxX,306);
 assert.ok(saved.project.assets.every(asset=>JSON.parse(asset.provenance).origin==='studio-original'));
 const artifact=await tools.service.build('studio-star-salvage',saved.project,'unity-ads-ua-playable');assert.equal(artifact.manifest.artifactHash,ready.artifact.artifactHash);
});
