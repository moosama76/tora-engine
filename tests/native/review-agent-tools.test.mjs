import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {tmpdir} from 'node:os';
import {mkdtemp,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {createReviewTools} from '../../scripts/lean/native/review-agent-tools.mjs';
import {NativeService,contentHash} from '../../scripts/lean/native/service.mjs';
import {applyOperations,emptyProject} from '../../scripts/lean/native/document.mjs';

async function fixture(t){
 const project=applyOperations(emptyProject({id:'review-sample',name:'Orb chase'}),[
  {kind:'createComponent',component:{id:'headline',contract:'native.text.v1',parameters:{text:'Orb'}}},
 ]).project;
 const expected={revisionId:project.revisionId,contentHash:contentHash(project)};
 const root=await mkdtemp(join(tmpdir(),'tora-review-tools-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const service=new NativeService({root});
 service.read=async()=>({...expected,project});
 const note={moment:'live',target:null,fields:[],note:'Change the title to Chase'};
 return {service,project,request:{expected,notes:[note]},id:project.projectId,proposalId:randomUUID(),qaRunner:async()=>({ok:true,blockers:[],warnings:[],checks:{},states:[],screenshots:[],interactions:[]})};
}
const edit={noteId:'1',operations:[{kind:'setParameter',id:'headline',key:'text',value:'Chase'}],scope:['headline']};
test('generic agent previews, packages and resumes a revision for a non-Harvest project',async t=>{
 const fixtureData=await fixture(t);
 const {callTool}=createReviewTools(fixtureData);
 const search=await callTool('inspect',{collection:'components',search:'orb'});
 assert.deepEqual(search.matches.map(item=>item.id),['headline']);
 const args={edits:[edit]};
 const result=await callTool('preview',args);
 assert.deepEqual(result.notes,{'1':['headline']});
 const after=await callTool('inspect',{ids:['headline'],previewDigest:result.previewDigest});
 assert.equal(after.records[0].parameters.text,'Chase');
 const receipts=[];
 const resumed=createReviewTools({...fixtureData,onReceipt:event=>receipts.push(event),progress:{messages:[
  {role:'assistant',tool_calls:[{id:'call-1',function:{name:'preview',arguments:JSON.stringify(args)}}]},
  {role:'tool',tool_call_id:'call-1',content:JSON.stringify(result)},
 ]}});
 const verify=await resumed.callTool('exercise',{previewDigest:result.previewDigest});
 assert.ok(verify.checks.some(c=>c.id==='diff-1'));
 assert.equal((await resumed.callTool('preview',args)).previewDigest,result.previewDigest);
 const answer={previewDigest:result.previewDigest,noteResults:[{noteId:'1',records:['headline'],verification:['diff-1','package']}]};
 const candidate=await resumed.finalize(answer);
 assert.equal(candidate.status,'candidate');
 assert.deepEqual(candidate.candidate.audioMoments,[]);
 assert.match(candidate.candidate.summary,/Chase/);
 assert.equal(fixtureData.project.components[0].parameters.text,'Orb');
 assert.equal(receipts.filter(event=>event.type==='compilation').length,1);
 await assert.rejects(resumed.finalize({...answer,noteResults:[{noteId:'1',records:['headline'],verification:['imagined-check']}]}),/E_REVIEW_EVIDENCE/);
});
test('Creative QA reports exact candidate defects and blocks exercise and staging',async t=>{
 const fixtureData=await fixture(t),report={format:'tora-creative-qa-1',ok:false,blockers:[{defectKind:'text-overflow',componentId:'headline',viewport:{width:320,height:568},remediation:'Enlarge the text box.'}],warnings:[],checks:{},states:[],screenshots:[],interactions:[]};
 const tools=createReviewTools({...fixtureData,qaRunner:async()=>report});
 const preview=await tools.callTool('preview',{edits:[edit]});
 assert.equal(await tools.callTool('qa',{previewDigest:preview.previewDigest}),report);
 await assert.rejects(tools.callTool('exercise',{previewDigest:preview.previewDigest}),error=>error.code==='E_CREATIVE_QA'&&error.creativeQa===report);
 await assert.rejects(tools.finalize({previewDigest:preview.previewDigest,noteResults:[{noteId:'1',records:['headline'],verification:['diff-1']}]}),/E_CREATIVE_QA/);
});
test('agent enforces pinned fields, changed scope, issued preview digests and local asset provenance',async t=>{
 const fixtureData=await fixture(t);
 const {callTool,finalize}=createReviewTools(fixtureData);
 const preview=edit=>callTool('preview',{edits:[edit]});
 await assert.rejects(preview({...edit,scope:['not-in-scope']}),/E_REVIEW_OUTSIDE_SCOPE/);
 await assert.rejects(preview({...edit,operations:[{kind:'setStore',url:'https://example.com'}]}),/E_REVIEW_OPERATION/);
 await assert.rejects(preview({...edit,imports:[{catalogId:'../../pretend.wav',assetId:'win'}]}),/E_REVIEW_IMPORT/);
 await assert.rejects(finalize({previewDigest:'sha256:'+'0'.repeat(64),noteResults:[]}),/E_REVIEW_NOTE_COVERAGE/);
 const pinned=createReviewTools({...fixtureData,request:{...fixtureData.request,notes:[{...fixtureData.request.notes[0],target:'cta',fields:['text'],moment:'end-card'}]}});
 await assert.rejects(pinned.callTool('preview',{edits:[edit]}),/E_REVIEW_SCOPE/);
 const {catalog}=await callTool('audio',{});
 const imports=[{catalogId:catalog[0].catalogId,assetId:'licensed-sound'}];
 const candidate=await preview({...edit,imports,operations:[{kind:'createComponent',component:{id:'gate',contract:'native.group.v1',assetSlots:[{slotId:'source',assetId:'licensed-sound'}]}}],scope:['licensed-sound','gate']});
 assert.deepEqual(new Set(candidate.notes['1']),new Set(['licensed-sound','gate']));
 assert.equal(fixtureData.project.assets.length,0);
 const details=await callTool('inspect',{ids:['licensed-sound'],previewDigest:candidate.previewDigest});
 assert.equal(details.records[0].mime,'audio/wav');
 assert.ok(!('data' in details.records[0]));
});
