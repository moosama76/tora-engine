import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import process from 'node:process';
import {randomUUID} from 'node:crypto';
import {mkdtemp,rm,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {URL} from 'node:url';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {nativeApi} from '../../scripts/lean/native/api.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
import {ReviewConnection} from '../../scripts/lean/native/review-connection.mjs';

test('verify the key before saving, retain a valid key after a rejected replacement, and finish submitted feedback after disconnect',async t=>{
 const previousInterpretation=process.env.TORA_REVIEW_INTERPRETATION;process.env.TORA_REVIEW_INTERPRETATION='0';
 t.after(()=>{if(previousInterpretation===undefined)delete process.env.TORA_REVIEW_INTERPRETATION;else process.env.TORA_REVIEW_INTERPRETATION=previousInterpretation;});
 const root=await mkdtemp(resolve('reports/review-connection-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root);
 const history=new EditorState(store);
 history.directory=resolve(root,'.history');
 const service=new NativeService(store,history);
 const id='connection-harvest';
 const {expected}=await new NativeAgentTools(service).run({command:'compose',id,concept:await createHarvestConcept()});
 const started=Promise.withResolvers(),release=Promise.withResolvers();
 let checks=0,calls=0;
 const key='local-test-fixture';
 const provider=async(url,options)=>{
  if(url.endsWith('/models')){
   checks++;
   return new globalThis.Response(null,{status:options.headers.Authorization==='Bearer '+key?200:401});
  }
  assert.equal(url,'https://api.orcarouter.ai/v1/chat/completions');
  assert.equal(options.headers.Authorization,'Bearer '+key);
  const payload=JSON.parse(options.body);
  assert.equal(payload.model,'deepseek/deepseek-v4-flash-free');
  assert.equal(payload.thinking.type,'enabled');
  calls++;
  started.resolve();
  await release.promise;
  if(calls===1){
   const input={edits:[{noteId:'1',operations:[{kind:'setParameter',id:'harvest.cta.label',key:'text',value:'Play now'}],scope:['harvest.cta.label']}]};
   return globalThis.Response.json({choices:[{finish_reason:'tool_calls',message:{tool_calls:[{
    id:'preview-cta',type:'function',function:{name:'preview',arguments:JSON.stringify(input)},
   }]}}]});
  }
  const {previewDigest}=JSON.parse(payload.messages.at(-1).content);
  assert.ok(previewDigest);
  if(calls===2)return globalThis.Response.json({choices:[{finish_reason:'tool_calls',message:{tool_calls:[{
   id:'exercise-cta',type:'function',function:{name:'exercise',arguments:JSON.stringify({previewDigest})},
  }]}}]});
  const proposal={previewDigest,noteResults:[{noteId:'1',records:['harvest.cta.label'],verification:['diff-1','package']}]};
  return globalThis.Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(proposal)}}]});
 };
 const connection=new ReviewConnection(root,{environment:{},fetchImpl:provider});
 const route=nativeApi(service,connection);
 const server=createServer((req,res)=>route(req,res,new URL(req.url,'http://localhost'),server.address().port));
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(async()=>{release.resolve();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));});
 const origin='http://127.0.0.1:'+server.address().port;
 const post=(path,body,{source=origin,signal}={})=>globalThis.fetch(origin+path,{method:'POST',headers:{Origin:source,'Content-Type':'application/json'},body:JSON.stringify(body),signal});
 const auth='/api/review/connection',path='/api/projects/'+id+'/review';
 const read=async()=>(await globalThis.fetch(origin+path)).json();
 assert.equal((await read()).feedbackModel,undefined);
 const first={action:'request',expected,requestId:randomUUID(),notes:[{target:null,moment:'live',fields:[],note:'Adjust the button.'}]};
 assert.equal((await (await post(path,first)).json()).status,'waiting');
 assert.equal((await post(auth,{apiKey:key},{source:'https://example.org'})).status,403);
 assert.equal((await post(auth,{apiKey:'bad\nvalue'})).status,400);
 assert.equal(checks,0);
 assert.deepEqual(await (await post(auth,{apiKey:' '+key+' '})).json(),{configured:true});
 const rejected=await post(auth,{apiKey:'invalid-key'});
 assert.equal(rejected.status,401);
 assert.deepEqual(await rejected.json(),{error:'E_MODEL_AUTH'});
 assert.equal(checks,2);
 assert.equal((await stat(resolve(root,'.orcarouter.key'))).mode&0o777,0o600);
 assert.equal(await new ReviewConnection(root,{environment:{}}).key(),key);

 const request={action:'request',expected,requestId:randomUUID(),replacesRequestId:first.requestId,notes:[{target:null,moment:'live',fields:[],note:'Change the install button to Play now.'}]};
 const abort=new globalThis.AbortController();
 const disconnected=post(path,request,{signal:abort.signal}).catch(error=>error.name);
 await started.promise;
 try {
  assert.deepEqual((await read()).requests.map(r=>r.status),['superseded','resolving']);
  abort.abort();
  assert.equal(await disconnected,'AbortError');
 } finally {release.resolve();}
 const timeout=Date.now()+15000;
 let state;
 do {
  state=await read();
  if(state.requests.at(-1).status!=='resolving')break;
  await new Promise(resolve=>globalThis.setTimeout(resolve,25));
 }while(Date.now()<timeout);
 assert.deepEqual(state.requests.map(r=>r.status),['superseded','candidate']);
 assert.deepEqual(state.expected,expected);
 assert.equal(state.passesUsed,1);
 assert.equal((await (await post(path,request)).json()).status,'candidate');
 assert.equal(calls,3);
 assert.ok(!JSON.stringify(state).includes(key));
});
