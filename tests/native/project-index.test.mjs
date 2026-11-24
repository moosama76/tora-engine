import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {applyOperations,emptyProject} from '../../scripts/lean/native/document.mjs';
import {contentHash} from '../../scripts/lean/native/service.mjs';
import {createProjectIndex,ProjectIndexCache,resolveProjectRoles} from '../../scripts/lean/native/project-index.mjs';

async function harvestProject(){
 const composition=composeNativeConcept(await createHarvestConcept());
 return applyOperations(emptyProject({id:'role-fixture',name:'Role fixture'}),composition.operations).project;
}

test('versioned Harvest roles resolve repeatedly from one immutable content index',async()=>{
 const project=await harvestProject(),hash=contentHash(project),cache=new ProjectIndexCache();
 const index=cache.get(project,hash);
 assert.strictEqual(cache.get(project,hash),index);
 assert.strictEqual(createProjectIndex(project,hash).format,'tora-project-index-1');
 const resolved=resolveProjectRoles(index),fixture=JSON.parse(await readFile('fixtures/native/harvest-role-resolution-v1.json','utf8'));
 assert.equal(resolved.status,'resolved',JSON.stringify(resolved));
 assert.equal(resolved.version,fixture.roleVersion);
 for(const [role,expected] of Object.entries(fixture.roles)){
  const actual=resolved.roles[role];
  for(const [key,value] of Object.entries(expected)){
   const cueKey={cueBehaviorId:'behaviorId',cueComponentId:'componentId'}[key];
   assert.equal(cueKey?actual.cue[cueKey]:actual[key],value,role+'.'+key);
  }
 }
 assert.deepEqual(index.referencedBy('harvest.audio.complete.play'),['harvest.restore.3']);
 assert.equal(index.parent('harvest.cta.label'),'harvest.cta');
 assert.equal(index.scene('harvest.cta.label'),'scene.play');
});

test('labels do not affect roles but deleted or rewired outcome bindings invalidate them',async()=>{
 const project=await harvestProject();
 const renamed=applyOperations(project,[{kind:'renameComponent',id:'harvest.audio.complete',label:'A creator-facing label'}]).project;
 assert.equal(resolveProjectRoles(createProjectIndex(renamed,contentHash(renamed))).status,'resolved');
 const removed=applyOperations(project,[{kind:'deleteBinding',id:'harvest.restore.3'}]).project;
 const missing=resolveProjectRoles(createProjectIndex(removed,contentHash(removed)));
 assert.equal(missing.status,'unresolved');
 assert.ok(missing.unresolved.some(role=>role.startsWith('winEvent:')));
 const binding=project.eventBindings.find(item=>item.id==='harvest.restore.3');
 const rewired=applyOperations(project,[{kind:'putBinding',binding:{...binding,eventId:'harvest.deadline.cta.event'}}]).project;
 const invalid=resolveProjectRoles(createProjectIndex(rewired,contentHash(rewired)));
 assert.equal(invalid.status,'unresolved');
 assert.ok(invalid.unresolved.some(role=>role.startsWith('winEvent:')));
});
