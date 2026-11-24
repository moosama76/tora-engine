import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
import {createSalvageConcept} from '../../scripts/lean/native/author-salvage.mjs';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {applyOperations,emptyProject} from '../../scripts/lean/native/document.mjs';
import {createProjectIndex,resolveProjectRoles} from '../../scripts/lean/native/project-index.mjs';
import {detectModule,getModule,moduleForProject,modules,timingFieldEntries} from '../../scripts/lean/native/modules/index.mjs';
import {reviewOperations,reviewTargets} from '../../scripts/lean/native/review-targets.mjs';
import {compileDeterministicIntent,deterministicIntent,eligibleOutcomeCueChoices,interpretationOptions} from '../../scripts/lean/native/review-intents.mjs';
import {nativeConcept} from '../helpers/native-concept.mjs';

function projectFrom(concept,id='module-fixture'){
 const composition=composeNativeConcept(concept);
 return applyOperations(emptyProject({id,name:'Module fixture'}),composition.operations).project;
}

test('registry order and Harvest role output preserve the versioned fixture',async()=>{
 assert.deepEqual(modules.map(module=>module.id),['harvest-restore','star-salvage','tap-collect']);
 assert.equal(getModule('harvest-restore'),modules[0]);
 assert.throws(()=>getModule('missing'),/E_MODULE_UNKNOWN/);
 const project=projectFrom(await createHarvestConcept()),index=createProjectIndex(project);
 assert.equal(detectModule(index).id,'harvest-restore');
 const resolved=resolveProjectRoles(index),fixture=JSON.parse(await readFile('fixtures/native/harvest-role-resolution-v1.json','utf8'));
 assert.equal(resolved.status,'resolved');
 assert.equal(resolved.module,'harvest-restore');
 assert.equal(resolved.version,fixture.roleVersion);
 for(const [role,expected] of Object.entries(fixture.roles)){
  const actual=resolved.roles[role];
  for(const [key,value] of Object.entries(expected)){
   const cueKey={cueBehaviorId:'behaviorId',cueComponentId:'componentId'}[key];
   assert.equal(cueKey?actual.cue[cueKey]:actual[key],value,role+'.'+key);
  }
 }
 const metadata=reviewTargets(project);
 assert.equal(metadata.module,'harvest-restore');
 assert.deepEqual(metadata.momentRules,{phaseVariable:'harvest.phase',progressVariable:'harvest.moves',goal:3,progressMoment:'first-harvest'});
 const changed=reviewOperations(project,'cta',['text'],{text:'Play now'});
 assert.equal(changed.expected.components.find(component=>component.id==='harvest.cta.label').parameters.text,'Play now');
});

test('deleted and rewired outcome bindings remain unresolved',async()=>{
 const project=projectFrom(await createHarvestConcept());
 const removed=applyOperations(project,[{kind:'deleteBinding',id:'harvest.restore.3'}]).project;
 assert.ok(resolveProjectRoles(createProjectIndex(removed)).unresolved.some(role=>role.startsWith('winEvent:')));
 const deadline=project.eventBindings.find(binding=>binding.id==='harvest.deadline.cta');
 const shared=applyOperations(project,[{kind:'putBinding',binding:{...deadline,id:'harvest.restore.3'}}]).project;
 const resolution=resolveProjectRoles(createProjectIndex(shared));
 assert.equal(resolution.status,'unresolved');
 assert.ok(resolution.unresolved.some(role=>role.startsWith('winEvent:')));
});

test('tap-collect and star-salvage route through their own descriptors',()=>{
 const tap=projectFrom(nativeConcept('tap-collect'),'tap-module');
 const {descriptor,resolution}=moduleForProject(tap);
 assert.equal(descriptor.id,'tap-collect');
 assert.equal(resolution.status,'resolved');
 assert.ok(reviewTargets(tap).targets.some(target=>target.id==='tap-feedback'));
 const changed=reviewOperations(tap,'tap-feedback',['feedback-duration'],{'feedback-duration':.3});
 assert.equal(changed.expected.gameplay.find(behavior=>behavior.id==='feedback.pulse').parameters.seconds,.3);
 const salvage=applyOperations(emptyProject({id:'salvage-module',name:'Salvage'}),[
  {kind:'createComponent',component:{id:'salvage.ship',label:'Ship',contract:'native.button.v1',transform:[1,0,0,1,20,560],parameters:{width:64,height:64}}},
  {kind:'putBehavior',behavior:{id:'salvage.rules',componentId:'salvage.ship',kind:'drag',parameters:{axis:'x'}}},
 ]).project;
 assert.equal(detectModule(createProjectIndex(salvage)).id,'star-salvage');
 assert.equal(reviewTargets(salvage).module,'star-salvage');
});

test('every registered module timing field round-trips across all advertised targets without cross-module clobbering',async()=>{
 const fixtures=[
  ['harvest-restore',projectFrom(await createHarvestConcept(),'harvest-contract')],
  ['star-salvage',projectFrom(await createSalvageConcept(),'salvage-contract')],
  ['tap-collect',projectFrom(nativeConcept('tap-collect'),'tap-contract')],
 ];
 assert.deepEqual(fixtures.map(([id])=>id),modules.map(module=>module.id));
 for(const [moduleId,project] of fixtures){
  const index=createProjectIndex(project),targets=reviewTargets(project).targets;
  const entries=timingFieldEntries(moduleId);
  assert.ok(entries.length>0,moduleId+' should declare timing fields');
  for(const entry of entries){
   for(const targetId of entry.targets){
    const target=targets.find(item=>item.id===targetId),field=target?.fields.find(item=>item.id===entry.field);
    assert.ok(field,`${moduleId} missing advertised field ${entry.field} on target ${targetId}`);
    const nextValue=Math.min(field.max,Math.max(field.min,Number((field.value===field.min?field.min+.1:field.min).toFixed(2))));
    const literalNote={target:targetId,moment:entry.moment,fields:[entry.field],note:`Set the ${entry.label} to ${nextValue} seconds`};
    const fromLiteral=deterministicIntent(literalNote);
    assert.equal(fromLiteral?.action,'setTiming',`${moduleId}:${targetId}:${entry.field} literal intent failed`);
    const directNote={target:targetId,moment:entry.moment,fields:[entry.field],note:'Direct timing edit',intent:fromLiteral};
    const fromDirect=deterministicIntent(directNote);
    assert.equal(fromDirect?.action,'setTiming',`${moduleId}:${targetId}:${entry.field} direct intent failed`);
    const compiled=await compileDeterministicIntent(project,fromDirect,index,targetId);
    assert.equal(compiled.edit.target,targetId);
    assert.equal(compiled.edit.changes[entry.field],nextValue);
    const options=interpretationOptions(literalNote,index,project);
    assert.ok(options.some(option=>option.action==='setTiming'&&option.arguments.field===entry.field),`${moduleId}:${targetId}:${entry.field} missing from interpretationOptions`);
   }
  }
 }
 const safeChoices=eligibleOutcomeCueChoices({assets:[]},{audioFiles:[{catalogId:'missing-meta/win.wav',source:{id:'missing-meta'},file:{path:'win.wav',sha256:'sha256:'+'1'.repeat(64)}}]});
 assert.deepEqual(safeChoices,[]);
});
