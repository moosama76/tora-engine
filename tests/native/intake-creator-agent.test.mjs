import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {setTimeout as delay} from 'node:timers/promises';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {ReviewIntake} from '../../scripts/lean/native/review-intake.mjs';
import {IntakeCreatorAgent} from '../../scripts/lean/native/intake-creator-agent.mjs';
import {assertAssetSourceAllowed,AssetCatalog} from '../../scripts/lean/native/asset-catalog.mjs';
import {IntakeCreatorTools} from '../../scripts/lean/native/intake-creator-tools.mjs';

const key='test-openai-key-that-must-never-leak';
const active={provider:'openai',providerLabel:'OpenAI',model:'gpt-5-test',modelLabel:'GPT-5 Test',apiKey:key,verified:true};
const finished={title:'Sky Garden',summary:'A responsive garden playable built with verified media.',projectId:'sky-garden-test',qa:{passed:true,blockerCount:0,warningCount:0,bytes:123456},assetsSummary:{studioCount:0,localCc0Count:2,remoteCc0Count:1,sources:[]}};
const toolCall=(name,args,id)=>({id,type:'function',function:{name,arguments:JSON.stringify(args)}});
const completion=(calls,content=null)=>new globalThis.Response(JSON.stringify({id:'chatcmpl-test',model:'gpt-5-test',choices:[{finish_reason:calls.length?'tool_calls':'stop',message:{role:'assistant',content,tool_calls:calls}}],usage:{prompt_tokens:100,completion_tokens:50}}),{status:200,headers:{'Content-Type':'application/json'}});
async function setup(t){
 const root=await mkdtemp(resolve('reports/intake-creator-'));t.after(()=>rm(root,{recursive:true,force:true}));const store=new ProjectStore(root),service=new NativeService(store,new EditorState(store));return {root,store,service};
}
async function source(service,projectId='sky-garden-test',assetSource='free-licensed'){
 const intakes=new ReviewIntake(service);return intakes.create({projectId,name:'Sky Garden',brief:'Build a polished garden restoration playable with a shiny install CTA.',studio:'Test studio',rights:'CC0 test sources',mechanic:'custom',assetSource});
}
async function waitStatus(intakes,id,status){for(let n=0;n<200;n++){const current=await intakes.read(id);if(current.status===status)return current;await delay(10);}throw Error('Timed out waiting for '+status);}
class RepairTools{
 constructor(options,png){this.onProgress=options.onProgress;this.catalog={load:async()=>({summary:()=>({assets:2,sprites:1,audio:1,styleFamilies:['test-cc0']})})};this.png=png;this.calls=[];this.finished=null;this.lastQa=null;}
 async studioAssets(){return [];}
 async execute(name,args){
  this.calls.push({name,args});
  if(name==='run_qa'&&!this.calls.some(call=>call.name==='apply_operations')){this.lastQa={report:{ok:false}};return {result:{ok:false,bytes:100,blockers:[{defectKind:'text-overflow'}],warnings:[],summary:{}},screenshots:[{mimeType:'image/png',data:this.png,label:'opening 390x844'}]};}
  if(name==='apply_operations'){this.lastQa=null;return {status:'COMMITTED',expected:{revisionId:'rev-test',contentHash:'sha256:test'}};}
  if(name==='run_qa'){this.lastQa={report:{ok:true}};return {result:{ok:true,bytes:123456,blockers:[],warnings:[],summary:{}},screenshots:[]};}
  if(name==='finish_build'){this.finished={...finished,title:args.title,summary:args.summary};return this.finished;}
  return {ok:true};
 }
}
test('mocked BYOK loop repairs QA with vision feedback and persists a ready completion summary',async t=>{
 const {service}=await setup(t),draft=await source(service),png=(await readFile('fixtures/native/ding-dang-assets/cat_0.png')).toString('base64'),requests=[];let tools;
 const replies=[['run_qa',{}],['apply_operations',{operations:[],summary:'Repair text layout'}],['run_qa',{}],['finish_build',{title:'Sky Garden',summary:finished.summary}]];
 const connection={read:async()=>active,fetch:async(_url,init)=>{requests.push(JSON.parse(init.body));const [name,args]=replies[requests.length-1];return completion([toolCall(name,args,'call-'+requests.length)]);}};
 const intakes=new ReviewIntake(service,{connection,agentFactory:options=>new IntakeCreatorAgent(service,intakes,options.intake,{...options,toolsFactory:toolOptions=>(tools=new RepairTools(toolOptions,png))})});
 const building=await intakes.submit(draft.id,{mode:'auto'});assert.equal(building.status,'building');const ready=await waitStatus(intakes,draft.id,'ready');
 assert.equal(ready.title,'Sky Garden');assert.equal(ready.build.qa.bytes,123456);assert.equal(ready.build.draftProjectId,'sky-garden-test');assert.deepEqual(ready.build.usage,{promptTokens:400,completionTokens:200,totalTokens:600});assert.deepEqual(tools.calls.map(call=>call.name),['run_qa','apply_operations','run_qa','finish_build']);
 assert.equal(requests.length,4);assert.ok(requests[1].messages.some(message=>Array.isArray(message.content)&&message.content.some(part=>part.type==='image_url')));assert.ok(!requests.some(request=>JSON.stringify(request).includes(key)));
});
test('no verified key preserves the free MCP handoff',async t=>{
 const {service}=await setup(t),intakes=new ReviewIntake(service,{connection:{read:async()=>null}}),draft=await intakes.create({projectId:'mcp-fallback-test',name:'MCP fallback',brief:'Build from this reference.',studio:'Test',rights:'Creator rights',mechanic:'custom',assetSource:'free-licensed'}),queued=await intakes.submit(draft.id,{});assert.equal(queued.status,'queued');assert.equal(queued.build,undefined);
});
test('cancel and retry preserve intake state and reach ready without re-uploading',async t=>{
 const {service}=await setup(t),draft=await source(service);let attempts=0;
 const connection={read:async()=>active,fetch:async()=>{throw Error('unused');}},agentFactory=options=>({run:async()=>{
  attempts++;await options.onProgress({phase:'authoring',stepLabel:'Authoring scene & controls'});
  if(attempts===1){if(options.signal.aborted)throw Error('E_BUILD_CANCELLED');await new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(Error('E_BUILD_CANCELLED')),{once:true}));}
  return finished;
 }});
 const intakes=new ReviewIntake(service,{connection,agentFactory});await intakes.submit(draft.id,{mode:'byok'});const cancelled=await intakes.cancel(draft.id);assert.equal(cancelled.status,'cancelled');await intakes.retry(draft.id);const ready=await waitStatus(intakes,draft.id,'ready');assert.equal(ready.status,'ready');assert.equal(attempts,2);
});
test('turn cap and provider secret echoes fail honestly without exposing the key',async t=>{
 for(const secretEcho of [false,true]){
  const {service}=await setup(t),draft=await source(service,secretEcho?'secret-echo-test':'turn-cap-test'),png='';let calls=0;
  const connection={read:async()=>active,fetch:async()=>{calls++;return completion([],secretEcho?key:'Still working');}},intakes=new ReviewIntake(service,{connection,agentFactory:options=>new IntakeCreatorAgent(service,intakes,options.intake,{...options,toolsFactory:toolOptions=>new RepairTools(toolOptions,png)})});
  await intakes.submit(draft.id,{mode:'auto'});const failed=await waitStatus(intakes,draft.id,'failed');assert.equal(failed.build.error,secretEcho?'E_MODEL_SECRET_IN_RESPONSE':'E_CREATOR_TURN_CAP');assert.equal(calls,secretEcho?1:12);assert.ok(!JSON.stringify(failed).includes(key));
 }
});
test('all three asset-source modes enforce their server-side staging gates',()=>{
 for(const sourceMode of ['local','remote'])assert.throws(()=>assertAssetSourceAllowed('studio-assets',sourceMode),/E_ASSET_SOURCE_DISALLOWED/);
 assert.doesNotThrow(()=>assertAssetSourceAllowed('studio-assets','studio'));assert.throws(()=>assertAssetSourceAllowed('free-licensed','studio'),/E_ASSET_SOURCE_DISALLOWED/);
 for(const sourceMode of ['local','remote']){assert.doesNotThrow(()=>assertAssetSourceAllowed('hybrid-free',sourceMode));assert.doesNotThrow(()=>assertAssetSourceAllowed('free-licensed',sourceMode));}
 assert.throws(()=>assertAssetSourceAllowed('hybrid-free','unknown'),/E_ASSET_SOURCE_DISALLOWED/);
});

test('real local CC0 staging registers decoded bytes and rejects a second visual style family',async t=>{
 const {service}=await setup(t),draft=await source(service,'staging-gates-test'),intakes=new ReviewIntake(service),catalog=await new AssetCatalog().load(),farm=catalog.list({query:'farm',kind:'sprite',limit:1})[0],space=catalog.list({query:'space',kind:'sprite',limit:1})[0],tools=new IntakeCreatorTools(service,intakes,draft,{catalog});
 const staged=await tools.stageAssets({catalogAssetIds:[farm.id]});assert.equal(staged.staged.length,1);const current=await service.read('staging-gates-test'),asset=current.project.assets.find(entry=>entry.id===farm.id);assert.match(asset.hash,/^sha256:[a-f0-9]{64}$/);const provenance=JSON.parse(asset.provenance);assert.equal(provenance.origin,'local-cc0');assert.equal(provenance.sourceHash,farm.sha256);
 await assert.rejects(tools.stageAssets({catalogAssetIds:[space.id]}),/E_ASSET_STYLE_FAMILY/);assert.equal((await service.read('staging-gates-test')).project.assets.length,1);
});

test('Gemini multi-turn tool responses retain their own names when providers omit call IDs and strip unsupported schema keys',async t=>{
 const {service}=await setup(t),draft=await source(service,'gemini-tools-test'),intakes=new ReviewIntake(service),png=(await readFile('fixtures/native/ding-dang-assets/cat_0.png')).toString('base64'),requests=[];let tools;
 const replies=[['run_qa',{}],['apply_operations',{operations:[],summary:'Repair'}],['run_qa',{}],['finish_build',{title:'Gemini Garden',summary:'Built and checked.'}]];
 const fetchImpl=async(_url,init)=>{requests.push(JSON.parse(init.body));const [name,args]=replies[requests.length-1];return new globalThis.Response(JSON.stringify({modelVersion:'gemini-test',candidates:[{content:{parts:[{functionCall:{name,args}}]},finishReason:'STOP'}],usageMetadata:{promptTokenCount:10,candidatesTokenCount:10}}),{status:200,headers:{'Content-Type':'application/json'}});};
 const agent=new IntakeCreatorAgent(service,intakes,draft,{config:{provider:'gemini',endpoint:'https://generativelanguage.googleapis.com/v1beta/models',model:'gemini-test',apiKey:key,vision:true},fetchImpl,toolsFactory:options=>(tools=new RepairTools(options,png))}),result=await agent.run();assert.equal(result.title,'Gemini Garden');assert.equal(tools.calls.length,4);assert.deepEqual(result.usage,{promptTokens:40,completionTokens:40,totalTokens:80});
 const responses=requests.slice(1).map(request=>request.contents.flatMap(content=>content.parts).filter(part=>part.functionResponse).at(-1).functionResponse.name);assert.deepEqual(responses,['run_qa','apply_operations','run_qa']);
 assert.equal(JSON.stringify(requests[0].tools).includes('additionalProperties'),false);
});

test('OpenAI tool call IDs stay within 40 chars, malformed prior args do not crash, and stale QA or orphaned builds are handled safely',async t=>{
 const {service}=await setup(t),draft=await source(service,'safety-guards-test'),intakes=new ReviewIntake(service);
 // 1. OpenAI tool_call_id length + malformed JSON recovery
 const longOpenAiId='call_123456789012345678901234';
 const requests=[];let turn=0;
 const fetchImpl=async(_url,init)=>{
  requests.push(JSON.parse(init.body));turn++;
  if(turn===1)return completion([{id:longOpenAiId,type:'function',function:{name:'inspect_draft',arguments:'{bad json'}}]);
  return completion([toolCall('finish_build',{title:'Safe Build',summary:'Recovered cleanly.'},'call_999999999999999999999999')]);
 };
 const png=(await readFile('fixtures/native/ding-dang-assets/cat_0.png')).toString('base64');
 const agent=new IntakeCreatorAgent(service,intakes,draft,{config:{provider:'openai',endpoint:'https://api.openai.com/v1/chat/completions',model:'gpt-6.2-sol',apiKey:key,vision:true},fetchImpl,toolsFactory:options=>new RepairTools(options,png)});
 const done=await agent.run();assert.equal(done.title,'Safe Build');
 const sentToolId=requests[1].messages.find(m=>m.role==='tool').tool_call_id;
 assert.equal(sentToolId,longOpenAiId);assert.ok(sentToolId.length<=40);

 // 2. Real IntakeCreatorTools invalidates lastQa on edit and keeps remotePacks when kind='sprite'
 const mockFetcher={search:async()=>({online:true,assets:[],remotePacks:[{sourceUrl:'https://kenney.nl/assets/racing-pack',provider:'kenney',license:'CC0-1.0',licenseVerified:false,isRemotePack:true}],fallbackLocalMatches:[]})};
 const realTools=new IntakeCreatorTools(service,intakes,draft,{fetcher:mockFetcher});
 const listed=await realTools.listAssets({query:'car',kind:'sprite',includeRemote:true});
 assert.equal(listed.remotePacks.length,1);assert.equal(listed.remotePacks[0].sourceUrl,'https://kenney.nl/assets/racing-pack');
 await realTools.applyOperations({operations:[{kind:'createScene',scene:{id:'scene.end',label:'End',role:'end-card'}}],summary:'Add end scene'});
 const rev1=(await service.read(draft.projectId)).revisionId;
 realTools.lastQa={target:'standalone-browser-draft',revisionId:rev1,report:{ok:true,warnings:[]}};
 await realTools.applyOperations({operations:[{kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}}],summary:'Mutate after QA'});
 assert.equal(realTools.lastQa,null);
 await assert.rejects(realTools.finishBuild({title:'Stale',summary:'Should fail'}),/E_CREATOR_INCOMPLETE|E_CREATIVE_QA_REQUIRED/);

 // 3. Server-restart orphan recovery marks failed without spending BYOK tokens
 let invoked=0;
 const orphanIntakes=new ReviewIntake(service,{connection:{read:async()=>active,fetch:async()=>{invoked++;throw Error('should not call provider');}}});
 const orphan=await orphanIntakes.create({projectId:'orphan-recovery-test',name:'Orphan',brief:'Test crash recovery.',studio:'Test',rights:'CC0',mechanic:'custom',assetSource:'free-licensed'});
 await orphanIntakes.updateBuild(orphan.id,{status:'building',phase:'authoring',stepLabel:'Authoring',turn:3,maxTurns:12});
 await orphanIntakes.recover(orphan.id);
 const recovered=await orphanIntakes.read(orphan.id);
 assert.equal(recovered.status,'failed');assert.equal(recovered.build.error,'E_BUILD_INTERRUPTED');assert.equal(invoked,0);

 // 4. Structured E_NATIVE_* detail surfaces in tool errors sent back to the model
 const detailRequests=[];let detailTurn=0;
 const detailDraft=await source(service,'detail-feedback-test');
 const detailFetch=async(_url,init)=>{
  detailRequests.push(JSON.parse(init.body));detailTurn++;
  if(detailTurn===1)return completion([toolCall('apply_operations',{operations:[{kind:'createComponent',component:{id:'bad.box',contract:'native.rectangle.v1',parameters:{width:-10}}}],summary:'Bad width'},'call_detail_1')]);
  return completion([toolCall('finish_build',{title:'Fixed',summary:'Used error detail'},'call_detail_2')]);
 };
 const detailTools=new IntakeCreatorTools(service,intakes,detailDraft);
 detailTools.finishBuild=async args=>{detailTools.finished={...finished,title:args.title,summary:args.summary};return detailTools.finished;};
 const detailAgent=new IntakeCreatorAgent(service,intakes,detailDraft,{config:{provider:'openai',endpoint:'https://api.openai.com/v1/chat/completions',model:'gpt-6.2-sol',apiKey:key,vision:true},fetchImpl:detailFetch,toolsFactory:()=>detailTools});
 await detailAgent.run();
 const toolFeedback=JSON.parse(detailRequests[1].messages.find(m=>m.role==='tool').content);
 assert.equal(toolFeedback.error,'E_NATIVE_PROPERTY');
 assert.equal(toolFeedback.detail.componentId,'bad.box');
 assert.equal(toolFeedback.detail.key,'width');

 // 5. OpenAI-compatible text-only provider (e.g. DeepSeek) omits image_url payloads cleanly and uses max_tokens
 const dsRequests=[];let dsTurn=0;
 const dsDraft=await source(service,'deepseek-compat-test');
 const dsFetch=async(url,init)=>{
  dsRequests.push({url,body:JSON.parse(init.body)});dsTurn++;
  if(dsTurn===1)return completion([toolCall('run_qa',{},'call_ds_1')]);
  return completion([toolCall('finish_build',{title:'DeepSeek Build',summary:'Built with OpenAI-compatible endpoint.'},'call_ds_2')]);
 };
 const dsIntakes=new ReviewIntake(service,{
  connection:{read:async()=>({provider:'openai-compatible',providerLabel:'DeepSeek',endpoint:'https://api.deepseek.com/v1',model:'deepseek-chat',modelLabel:'DeepSeek Chat',apiKey:key,vision:false,verified:true}),fetch:dsFetch},
  agentFactory:options=>new IntakeCreatorAgent(service,dsIntakes,options.intake,{...options,toolsFactory:toolOptions=>new RepairTools(toolOptions,png)}),
 });
 await dsIntakes.submit(dsDraft.id,{mode:'auto'});
 const dsReady=await waitStatus(dsIntakes,dsDraft.id,'ready');
 assert.equal(dsReady.title,'DeepSeek Build');
 assert.equal(dsRequests[0].url,'https://api.deepseek.com/v1/chat/completions');
 assert.equal(dsRequests[0].body.max_tokens,4096);
 assert.equal(dsRequests[0].body.max_completion_tokens,undefined);
 assert.ok(dsRequests.every(req=>!JSON.stringify(req.body.messages).includes('image_url')));
});
