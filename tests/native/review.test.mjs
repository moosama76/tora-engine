import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {NativeReview} from '../../scripts/lean/native/review.mjs';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';

test('Harvest review validates scope, stages an isolated candidate, promotes, undoes and limits passes',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-review-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const agent=new NativeAgentTools();
 agent.service.store=new ProjectStore(store);
 agent.service.history.store=agent.service.store;
 const {service}=agent;
 const review=new NativeReview(service);
 const id='harvest-review';
 const {expected}=await agent.run({command:'compose',id,concept:await createHarvestConcept()});
 const initial=await service.read(id);
 const state=await review.read(id);
 assert.deepEqual(state.expected,expected);
 assert.deepEqual(state.moments.map(m=>m.id),['opening','first-harvest','end-card','timeout']);

 const note={requestId:randomUUID(),expected,moment:'end-card',target:'cta',fields:['text'],note:'Change the install button wording to Play now'};
 const request=await review.request(id,note);
 assert.deepEqual(await review.request(id,note),request);
 assert.equal((await review.claim(id,request.id)).status,'claimed');
 const proposal={requestId:request.id,proposalId:randomUUID(),changes:{text:'Play now'},summary:'Shortened the install button wording.'};
 const candidate=await review.propose(id,proposal);
 assert.equal(candidate.status,'candidate',JSON.stringify(candidate));
 assert.ok(candidate.candidate.bytes<5000000);
 assert.deepEqual(await review.propose(id,proposal),candidate);
 assert.deepEqual((await review.read(id)).expected,expected);

 const approved=globalThis.structuredClone(initial.project);
 approved.components.find(c=>c.id==='harvest.cta.label').parameters.text='Play now';
 assert.deepEqual((await review.candidate(id,request.id)).project,approved);

 const promoted=await review.promote(id,request.id);
 assert.deepEqual((await service.read(id)).project,{...approved,revisionId:promoted.revisionId});
 const reopened=new NativeReview(service);
 assert.equal((await reopened.read(id)).passesUsed,1);
 const exported=await service.export(id,{revisionId:promoted.revisionId,target:'unity-ads-ua-playable'});
 assert.equal(exported.manifest.bytes,candidate.candidate.bytes);
 await service.navigate(id,{expected:{revisionId:promoted.revisionId,contentHash:promoted.contentHash},action:'undo'});
 assert.deepEqual((await service.read(id)).project,initial.project);

 const second=await reopened.request(id,{expected,requestId:randomUUID(),notes:[
  {target:'opening',fields:['instruction'],moment:'opening',note:'Update the opening instruction.'},
  {target:'cta',fields:['text'],moment:'end-card',note:'Update the install label.'},
 ]});
 await reopened.claim(id,second.id);
 const rejected=await reopened.propose(id,{...proposal,requestId:second.id,proposalId:randomUUID(),changes:{1:{text:'Play now'},2:{text:'Install now'}}});
 assert.equal(rejected.reason,'E_REVIEW_SCOPE');
 await reopened.discard(id,second.id);
 assert.equal((await reopened.request(id,{...note,requestId:randomUUID()})).status,'waiting');
 assert.deepEqual((await service.read(id)).project,initial.project);
});

test('a Harvest candidate becomes stale after any working head change',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-stale-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const agent=new NativeAgentTools();
 agent.service.store=new ProjectStore(store);
 agent.service.history.store=agent.service.store;
 const {service}=agent, review=new NativeReview(service),id='harvest-stale';
 const {expected}=await agent.run({command:'compose',id,concept:await createHarvestConcept()});
 const request=await review.request(id,{requestId:randomUUID(),expected,moment:'first-harvest',target:'first-harvest',fields:['reveal-duration'],note:'Let the first tree reveal play a little longer.'});
 await review.claim(id,request.id);
 const proposal={proposalId:randomUUID(),changes:{'reveal-duration':1},summary:'Extended the first reveal to one second.'};
 // Simulate a process exit after the pass receipt was written, before build.
 await review.update(id,state=>{
  state.passesUsed=1;
  state.requests[0].status='building';
  state.requests[0].proposals.push({id:proposal.proposalId,changes:proposal.changes,summary:proposal.summary});
 });
 assert.deepEqual((await review.claim(id,request.id)).pendingProposal,proposal);
 const result=await review.propose(id,{requestId:request.id,...proposal});
 assert.equal(result.status,'candidate',JSON.stringify(result));
 await review.store(id,{expected,url:'https://play.google.com/store/apps/details?id=com.example.changed'});
 await assert.rejects(review.promote(id,request.id),/E_NATIVE_STALE/);
 await assert.rejects(review.candidate(id,request.id),/E_NATIVE_STALE/);
 assert.equal((await review.read(id)).passesUsed,1);
});

test('replacing a crop requires explicit scope and updates every use of the selected asset',async t=>{
 const store=await mkdtemp(resolve('reports/harvest-shared-art-'));
 t.after(()=>rm(store,{recursive:true,force:true}));
 const agent=new NativeAgentTools();
 agent.service.store=new ProjectStore(store);
 agent.service.history.store=agent.service.store;
 const {service}=agent, review=new NativeReview(service), id='harvest-shared-art';
 const {expected}=await agent.run({command:'compose',id,concept:await createHarvestConcept()});
 const {project}=await service.read(id);
 const carrot=(await review.read(id)).targets.find(target=>target.id==='crop-carrot');
 assert.ok(carrot.uses.length>1);
 const note={requestId:randomUUID(),expected,target:carrot.id,moment:'opening',note:'Use the alternate source image for the carrot art.'};
 await assert.rejects(review.request(id,{...note,fields:[]}),/E_REVIEW_SCOPE/);
 const request=await review.request(id,{...note,fields:['shared-art']});
 const claim=await review.claim(id,request.id);
 assert.deepEqual(claim.affectedComponentIds,carrot.uses);
 const replacement=claim.imageChoices[0];
 const proposal=await review.propose(id,{requestId:request.id,proposalId:randomUUID(),changes:{'shared-art':replacement},summary:'Reused an alternate image from the project.'});
 assert.equal(proposal.status,'candidate',JSON.stringify(proposal));
 const local=new NativeReview(service,{deterministic:true});
 const explicit=await local.request(id,{...note,requestId:randomUUID(),fields:['shared-art'],note:'Replace all uses with "'+replacement+'"'});
 const automatic=await local.resolve(id,explicit.id);
 assert.equal(automatic.status,'candidate',JSON.stringify(automatic));
 assert.equal(automatic.receipt.providerCalls.length,0);
 for(const component of project.components){
  if(carrot.uses.includes(component.id))component.assetSlots[0].assetId=replacement;
 }
 assert.deepEqual((await review.candidate(id,request.id)).project,project);
 assert.deepEqual((await local.candidate(id,explicit.id)).project,project);
});
