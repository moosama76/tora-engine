import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {mkdtemp,rm} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {NativeReview} from '../../scripts/lean/native/review.mjs';

test('general review resumes a clarification and carries prior decisions into follow-up feedback',async t=>{
 const root=await mkdtemp(resolve('reports/tora-general-review-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root);
 const history=new EditorState(store);
 history.directory=join(root,'history');
 const service=new NativeService(store,history);
 const id='review-without-harvest-fields';
 const created=await service.create({id,name:'Review draft'});
 const createdExpected={revisionId:created.revisionId,contentHash:created.contentHash};
 const operations=[
  {kind:'createComponent',component:{id:'title',contract:'native.text.v1',sceneId:'scene.play',transform:[1,0,0,1,64,80],parameters:{text:'Original title',width:240,height:40,fontSize:24}}},
  {kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}},
  {kind:'createComponent',component:{id:'primary',contract:'native.button.v1',sceneId:'scene.play',transform:[1,0,0,1,115,285],parameters:{width:160,height:160,visible:true,enabled:true,fill:'#4f9d76'}}},
  {kind:'putBinding',binding:{id:'primary.feedback',event:{kind:'click',componentId:'primary'},actions:[{kind:'add',variableId:'score',value:1}]}},
 ];
 const envelope={format:'tora-transaction-1',expected:createdExpected,operations};
 const preview=await service.preview(id,envelope);
 const revision=await service.transact(id,{...envelope,previewDigest:preview.previewDigest});
 const baseline={revisionId:revision.revisionId,contentHash:revision.contentHash};
 const requestId=randomUUID();
 const seen=[];
 const review=new NativeReview(service,{agent:async({input,callTool,progress,checkpoint,answer,validateFinal})=>{
  assert.equal(input.notes.length,1);
  seen.push(input.history);
  if(input.notes[0].note==='Change the title.'&&!answer){
   await checkpoint({turns:1,messages:[]});
   return validateFinal({question:'What should the title say?'});
  }
  const text=answer??'One more round';
  if(answer)assert.equal(progress.turns,1);
  const {previewDigest}=await callTool('preview',{edits:[{
   noteId:'1',scope:['title'],operations:[{kind:'setParameter',id:'title',key:'text',value:text}],
  }]});
  const {checks}=await callTool('exercise',{previewDigest});
  return validateFinal({previewDigest,noteResults:[{noteId:'1',records:['title'],verification:checks.map(check=>check.id)}]});
 }});
 const note=(expected,requestId,note)=>({expected,requestId,notes:[{target:null,moment:'live',fields:[],note}]});
 assert.equal((await review.read(id)).targets.length,0);
 await review.request(id,note(baseline,requestId,'Change the title.'));
 const question=await review.resolve(id,requestId);
 assert.equal(question.status,'needs-clarification');
 assert.equal(question.agentProgress,undefined);
 const candidate=await review.answer(id,requestId,'Play again');
 assert.equal(candidate.status,'candidate',JSON.stringify(candidate));
 assert.deepEqual((await review.read(id)).expected,baseline);
 const promoted=await review.promote(id,requestId);
 const expected={revisionId:promoted.revisionId,contentHash:promoted.contentHash};
 const followUpId=randomUUID();
 await review.request(id,note(expected,followUpId,'Make the title we just edited warmer.'));
 const followUp=await review.resolve(id,followUpId);
 assert.equal(followUp.status,'candidate',followUp.reason);
 assert.equal(seen.at(-1)[0].status,'promoted');
 assert.match(seen.at(-1)[0].changes,/Play again/);
 await review.discard(id,followUpId);
 assert.deepEqual((await review.read(id)).expected,expected);
});
