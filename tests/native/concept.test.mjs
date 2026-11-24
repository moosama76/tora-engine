import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {validateCreativeConcept,conceptHash,composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {nativeConcept as concept} from '../helpers/native-concept.mjs';

for(const mechanic of ['tap-collect','drag-catch'])test(`${mechanic} concept validates and composes a bounded native project`,()=>{const input=concept(mechanic),parsed=validateCreativeConcept(JSON.stringify(input)),composition=composeNativeConcept(parsed),project=applyOperations(emptyProject({id:'concept-'+mechanic,name:'Concept'}),composition.operations).project;assert.equal(project.base.storeUrl,input.product.storeUrl);assert.ok(project.components.some(c=>c.id==='target'));assert.equal(project.variables.find(v=>v.id==='score').initial,0);assert.match(conceptHash(input),/^sha256:[a-f0-9]{64}$/);assert.deepEqual(composeNativeConcept(input),composition);assert.equal(composition.conceptAccepted,false);assert.ok(Object.isFrozen(composition.operations));});

test('concept rejects unsupported mechanics, missing strategy and placeholder destinations',()=>{const unsupported=concept();unsupported.experience.mechanic='arbitrary-code';assert.throws(()=>validateCreativeConcept(unsupported),/E_CONCEPT_SCHEMA/);const missing=concept();missing.audience.motivation='';assert.throws(()=>validateCreativeConcept(missing),/E_CONCEPT_SCHEMA/);const store=concept();store.product.storeUrl='https://play.google.com/store/apps/details?id=com.example.game';assert.throws(()=>validateCreativeConcept(store),/E_CONCEPT_STORE/);const duration=concept();duration.experience.arc[0].seconds=15;assert.throws(()=>validateCreativeConcept(duration),/E_CONCEPT_DURATION/);});

test('match-restore requires artwork and an explicit persistent action binding',()=>{const missing=concept('match-restore');delete missing.restoration;assert.throws(()=>validateCreativeConcept(missing),/E_CONCEPT_RESTORATION_REQUIRED/);const artwork=concept('match-restore');delete artwork.restoration.areas[0].after;assert.throws(()=>validateCreativeConcept(artwork),/E_CONCEPT_RESTORATION_ARTWORK/);const binding=concept('match-restore');delete binding.restoration.binding;assert.throws(()=>validateCreativeConcept(binding),/E_CONCEPT_RESTORATION_BINDING/);const identical=concept('match-restore');identical.restoration.areas[0].after.data=identical.restoration.areas[0].before.data;assert.throws(()=>composeNativeConcept(identical),/E_CONCEPT_RESTORATION_ARTWORK/);});

test('match-restore compiles strategy, artwork, repair choice and timed payoff into native operations',()=>{const input=concept('match-restore'),composition=composeNativeConcept(input),project=applyOperations(emptyProject({id:'concept-match-restore',name:'Concept'}),composition.operations).project;assert.equal(composition.assets.length,4);assert.equal(project.assets.length,4);assert.ok(project.events.some(event=>event.kind==='validMatch'&&event.componentId==='board.controller'));const choice=project.eventBindings.find(binding=>binding.id==='repair.pond.select');assert.ok(choice.actions.some(action=>action.kind==='setAsset'&&action.componentId==='world.pond'&&action.assetId==='art-pond-after'));assert.ok(choice.actions.some(action=>action.kind==='set'&&action.variableId==='repaired.pond'&&action.value===true));const payoff=project.eventBindings.find(binding=>binding.id==='director.payoff.finish');assert.equal(payoff.condition.all[1].value,input.experience.arc.find(step=>step.phase==='payoff').seconds);const revised=concept('match-restore');revised.experience.arc.find(step=>step.phase==='escalation').description='Pick the damaged pond or flowerbed.';assert.notDeepEqual(composeNativeConcept(revised).operations,composition.operations);assert.deepEqual(composeNativeConcept(input),composition);});

test('agent composition binds the concept hash without auto-accepting the project',async t=>{await mkdir('reports',{recursive:true});const root=await mkdtemp(resolve('reports/concept-tools-'));t.after(()=>rm(root,{recursive:true,force:true}));const store=new ProjectStore(root),tool=new NativeAgentTools(new NativeService(store,new EditorState(store))),input=concept('drag-catch'),result=await tool.run({command:'compose',id:'concept-drag-proof',concept:input});assert.equal(result.status,'COMPOSED');assert.equal(result.conceptHash,conceptHash(input));assert.equal(result.conceptAccepted,false);assert.equal(result.accepted,false);const current=await tool.run({command:'inspect',id:'concept-drag-proof',full:true});assert.equal(current.project.base.storeUrl,input.product.storeUrl);assert.ok(current.project.gameplay.some(b=>b.kind==='drag'));assert.ok(current.project.gameplay.some(b=>b.kind==='motion'));assert.equal(current.accepted,false);});

test('strategic concept rejects stale claims and missing observable requirements',async()=>{
 const {strategicConcept}=await import('../helpers/native-concept.mjs');
 const original=strategicConcept();
 const composition=composeNativeConcept(original);
 const project=applyOperations(emptyProject({id:'strategic-proof',name:'Strategy'}),composition.operations).project;
 assert.equal(composition.creativeStatus,'REQUIRES_VISUAL_REVIEW');
 assert.equal(composition.requirements.length,8);
 for(const requirement of composition.requirements)for(const id of requirement.records)assert.ok([...project.components,...project.eventBindings].some(record=>record.id===id),id);
 const stale=globalThis.structuredClone(original);stale.product.gameplayTruth='Rescue a stranded kitten by repairing bridges.';
 assert.throws(()=>composeNativeConcept(stale),/E_CONCEPT_REQUIREMENT_STALE/);
 const incompatible=globalThis.structuredClone(original);incompatible.requirements[0].effect='continuity';
 assert.throws(()=>composeNativeConcept(incompatible),/E_CONCEPT_REQUIREMENT_COVERAGE/);
 const noArt=globalThis.structuredClone(original);delete noArt.restoration.areas[0].after;
 assert.throws(()=>composeNativeConcept(noArt),/E_CONCEPT_RESTORATION_ARTWORK/);
 const sameArt=globalThis.structuredClone(original);sameArt.restoration.areas[0].after=globalThis.structuredClone(sameArt.restoration.areas[0].before);
 assert.throws(()=>composeNativeConcept(sameArt),/E_CONCEPT_RESTORATION_ARTWORK/);
 const retimed=globalThis.structuredClone(original);retimed.experience.arc[3].seconds=2;
 assert.notDeepEqual(composeNativeConcept(retimed).operations,composition.operations);
 assert.equal(composeNativeConcept(concept()).creativeStatus,'PROTOTYPE');
});


test('concept size and cycles reject consistently before composition',()=>{
 const oversized=concept();oversized.presentation.title='x'.repeat(4194305);
 assert.throws(()=>composeNativeConcept(oversized),/E_CONCEPT_SIZE/);
 assert.throws(()=>composeNativeConcept(JSON.stringify(oversized)),/E_CONCEPT_SIZE/);
 const circular=concept();circular.circular=circular;
 assert.throws(()=>composeNativeConcept(circular),/E_CONCEPT_JSON/);
});

test('legacy restoration still supports three repair areas while v2 requires two',async()=>{
 const legacy=concept('match-restore');
 const third=globalThis.structuredClone(legacy.restoration.areas[0]);
 third.id='gazebo';third.label='Gazebo';
 legacy.restoration.areas.push(third);
 const composition=composeNativeConcept(legacy);
 const project=applyOperations(emptyProject({id:'legacy-three',name:'Legacy'}),composition.operations).project;
 assert.ok(project.components.some(component=>component.id==='world.gazebo'));
 assert.equal(project.eventBindings.find(binding=>binding.id==='progress.complete').condition.value,3);
 const {strategicConcept}=await import('../helpers/native-concept.mjs');
 const strict=strategicConcept();strict.restoration.areas.push(third);
 assert.throws(()=>composeNativeConcept(strict),/E_CONCEPT_REPAIR_GOAL/);
});

test('agent composition returns complete Unicode requirement claims after commit',async t=>{
 const {strategicConcept}=await import('../helpers/native-concept.mjs');
 const input=strategicConcept();
 for(const requirement of input.requirements){
  const [section,key]=requirement.source.split('.');
  input[section][key]='🌿'.repeat(240);
  requirement.claim=input[section][key];
 }
 const root=await mkdtemp(resolve('reports/concept-unicode-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root);
 const tool=new NativeAgentTools(new NativeService(store,new EditorState(store)));
 const result=await tool.run({command:'compose',id:'unicode-garden',concept:input});
 assert.equal(result.status,'COMPOSED');
 assert.ok(JSON.stringify(result).length>4096);
 assert.equal(result.requirements.length,8);
 assert.equal(result.requirements[0].claim,input.requirements[0].claim);
 assert.equal((await tool.run({command:'inspect',id:'unicode-garden'})).expected.revisionId,result.expected.revisionId);
});
