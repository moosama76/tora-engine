import assert from 'node:assert/strict';
import test from 'node:test';
import {feedbackModel,configuredReviewAgent,configuredReviewInterpreter,orcaReviewAgent,orcaReviewInterpreter,paidFeedbackModel} from '../../scripts/lean/native/review-resolver.mjs';

const key='review-agent-private-fixture-key';
const tools=[{type:'function',function:{name:'inspect',description:'Read a project record',parameters:{type:'object'}}}];
const respond=(finish_reason,message)=>new globalThis.Response(JSON.stringify({choices:[{finish_reason,message}]}));
const final=answer=>respond('stop',{reasoning_content:'Check the evidence.',content:JSON.stringify(answer)});
const inspect=(name='inspect',args=JSON.stringify({id:'win'}))=>respond('tool_calls',{
 reasoning_content:'Find the win binding.',content:null,
 tool_calls:[{id:'tool-1',type:'function',function:{name,arguments:args}}],
});
const options={input:{notes:[{id:'1',note:'Review the win cue'}]},tools,callTool:()=>({records:['win']}),
 checkpoint:()=>{},validateFinal:value=>value};

test('free review resumes after a provider rate limit with reasoning and tool evidence',async()=>{
 let progress,calls=0;
 const replies=[inspect(),new globalThis.Response(null,{status:429,headers:{'Retry-After':'12'}}),final({previewDigest:'abc'})];
 const agent=orcaReviewAgent(key,async(url,request)=>{
  assert.equal(url,'https://api.orcarouter.ai/v1/chat/completions');
  assert.equal(request.headers.Authorization,`Bearer ${key}`);
  assert.equal(request.redirect,'error');
  const payload=JSON.parse(request.body);
  assert.equal(payload.model,feedbackModel);
  assert.equal(payload.thinking.type,'enabled');
  assert.equal(payload.include_reasoning,true);
  assert.deepEqual(payload.tools,tools);
  if(replies.length<3){
   assert.equal(payload.messages[2].reasoning_content,'Find the win binding.');
   assert.deepEqual(payload.messages[3],{role:'tool',tool_call_id:'tool-1',content:'{"records":["win"]}'});
  }
  return replies.shift();
 });
 const run={...options,checkpoint:state=>{progress=state;},callTool:(name,args)=>{
  calls++;
  assert.equal(name,'inspect');
  assert.deepEqual(args,{id:'win'});
  return {records:['win']};
 }};
 await assert.rejects(agent(run),error=>error.code==='E_MODEL_RATE_LIMIT'&&error.retryAfterSeconds===12);
 assert.equal(progress.turns,1);
 assert.deepEqual(await agent({...run,progress}),{previewDigest:'abc'});
 assert.equal(calls,1);
 assert.equal(progress.turns,2);
 assert.deepEqual(await agent({...run,progress}),{previewDigest:'abc'});
 assert.equal(replies.length,0);
});

test('a clarification answer resumes the saved transcript on the explicitly selected paid model',async()=>{
 let progress,calls=0;
 const agent=orcaReviewAgent(key,async(_url,{body})=>{
  const request=JSON.parse(body);
  assert.equal(request.model,paidFeedbackModel);
  if(++calls===1)return final({question:'Do you mean the timeout cue?'});
  assert.deepEqual(JSON.parse(request.messages.at(-1).content),{clarificationAnswer:'Yes, the timeout cue'});
  assert.equal(request.messages.at(-2).reasoning_content,'Check the evidence.');
  return final({previewDigest:'abc'});
 });
 const run={...options,paid:true,checkpoint:state=>{progress=state;}};
 assert.deepEqual(await agent(run),{question:'Do you mean the timeout cue?'});
 assert.deepEqual(await agent({...run,progress,answer:'Yes, the timeout cue'}),{previewDigest:'abc'});
 assert.equal(progress.turns,2);
});

test('a checkpointed assistant tool call resumes without repeating the provider turn',async()=>{
 let progress,calls=0,inspections=0;
 const replies=[inspect(),final({previewDigest:'abc'})];
 const agent=orcaReviewAgent(key,async()=>{calls++;return replies.shift();});
 const run={...options,callTool:()=>{inspections++;return {records:['win']};}};
 await assert.rejects(agent({...run,checkpoint:state=>{
  progress=state;
  if(state.pending)throw Error('Simulated interruption after checkpoint');
 }}),/Simulated interruption/);
 assert.equal(calls,1);
 assert.equal(inspections,0);
 assert.deepEqual(await agent({...run,progress}),{previewDigest:'abc'});
 assert.equal(calls,2);
 assert.equal(inspections,1);
});

test('only listed tools are called and failed final validation gets two repairs',async()=>{
 let progress,calls=0;
 const agent=orcaReviewAgent(key,async(_url,{body})=>{
  if(++calls===1)return inspect('unlisted');
  const request=JSON.parse(body);
  if(calls===2)assert.deepEqual(JSON.parse(request.messages.at(-1).content),{error:'E_MODEL_TOOLS'});
  else assert.match(request.messages.at(-1).content,/E_REVIEW_EVIDENCE/);
  return final({previewDigest:'abc'});
 });
 await assert.rejects(agent({...options,checkpoint:state=>{progress=state;},
  callTool:()=>assert.fail('An unlisted tool executed'),validateFinal:()=>{throw Error('E_REVIEW_EVIDENCE');}}),/E_REVIEW_EVIDENCE/);
 assert.equal(calls,4);
 assert.equal(progress.repairs,2);
});

test('provider steps stop at the per-request limit',async()=>{
 let calls=0;
 const agent=orcaReviewAgent(key,async()=>{calls++;return inspect();});
 await assert.rejects(agent(options),/E_REVIEW_AGENT_LIMIT/);
 assert.equal(calls,8);
});

test('after discovery the model drafts an edit from collected evidence and Tora runs the preview and checks',async()=>{
 const tool=(name)=>({type:'function',function:{name,description:`Run ${name}`,parameters:{type:'object'}}});
 const definitions=[...tools,tool('preview'),tool('exercise')];
 let calls=0,previews=0;
 const agent=orcaReviewAgent(key,async(_url,{body})=>{
  const request=JSON.parse(body);
  calls++;
  const authoringOnly=calls===4||calls===6;
  assert.deepEqual(request.tools,authoringOnly?undefined:definitions);
  if(calls===5)assert.match(request.messages.at(-1).content,/E_REVIEW_SCOPE/);
  if(authoringOnly){
   const {evidence}=JSON.parse(request.messages.at(-1).content);
   assert.ok(evidence.some(entry=>entry.tool==='inspect'));
   return final({preview:{edits:[{noteId:'1',scope:['title']}] }});
  }
  return inspect();
 });
 assert.deepEqual(await agent({...options,tools:definitions,callTool(name){
  if(name==='preview'){
   if(!previews++)throw Error('E_REVIEW_SCOPE');
   return {previewDigest:'abc',notes:{1:['title']}};
  }
  if(name==='exercise')return {previewDigest:'abc',checks:[{id:'package'}]};
  return {records:['win']};
 }}),{previewDigest:'abc',noteResults:[{noteId:'1',records:['title'],verification:['package']}]});
 assert.equal(calls,6);
});

test('prompts and parsed provider credentials are rejected before transmission or tool execution',async()=>{
 const agent=orcaReviewAgent(key,async()=>assert.fail('The key must not go in a prompt'));
 await assert.rejects(agent({...options,input:{notes:[key]}}),/E_MODEL_SECRET_IN_PROMPT/);
 const escaped=`{"id":"\\u0072${key.slice(1)}"}`;
 const leakingAgent=orcaReviewAgent(key,async()=>inspect('inspect',escaped));
 await assert.rejects(leakingAgent({...options,callTool:()=>assert.fail('The tool must not receive the key')}),/E_MODEL_SECRET_IN_RESPONSE/);
});

const textIntent={format:'tora-authoring-intent-1',noteId:'1',action:'replaceText',targetRole:'primaryCta',
 arguments:{text:''},constraints:{literal:true},requiredChecks:['package','diff-1']};
const timingIntent={format:'tora-authoring-intent-1',noteId:'1',action:'setTiming',targetRole:'opening',
 arguments:{field:'hint-delay',seconds:0},constraints:{},requiredChecks:['package','diff-1']};

test('the interpreter makes one tool-free free-route call and preserves the literal CTA text',async()=>{
 const verdict={intent:{...textIntent,arguments:{text:'Play now!'}}};
 const input={notes:[{id:'1',note:'At the end, please make the install button say Play now!'}]};
 const receipt=[];
 let calls=0;
 const interpret=orcaReviewInterpreter(key,async(_url,{body})=>{
  calls++;
  const request=JSON.parse(body);
  assert.equal(request.model,feedbackModel);
  assert.equal(request.tools,undefined);
  assert.equal(request.thinking.type,'enabled');
  assert.deepEqual(JSON.parse(request.messages[1].content),{feedback:input,allowedIntents:[textIntent]});
  return final(verdict);
 });
 assert.deepEqual(await interpret({input,options:[textIntent],onReceipt:event=>receipt.push(event)}),verdict);
 assert.equal(calls,1);
 assert.deepEqual(receipt.map(event=>[event.type,event.phase]),[
  ['provider-start','interpretation'],['provider-success','interpretation'],
 ]);
});

test('the interpreter permits a numeric timing value with the provided field and rejects unsupported plans',async()=>{
 const timing={...timingIntent,arguments:{field:'hint-delay',seconds:1.25}};
 const input={notes:[{id:'1',note:'Show the hint at 1250 ms.'}]};
 const options=[timingIntent];
 const interpret=verdict=>orcaReviewInterpreter(key,async()=>final(verdict));
 assert.deepEqual(await interpret({intent:timing})({input,options}),{intent:timing});
 await assert.rejects(interpret({intent:{...timing,arguments:{field:'payoff-hold',seconds:1.25}}})({input,options}),/E_REVIEW_INTENT/);
 await assert.rejects(interpret({intent:{...timing,arguments:{field:'hint-delay',seconds:'1.25'}}})({input,options}),/E_REVIEW_INTENT/);
 await assert.rejects(interpret({intent:{...textIntent,arguments:{text:'Invented label'}}})({input,options:[textIntent]}),/E_REVIEW_INTENT/);
 assert.deepEqual(await interpret({question:'Which cue should play on loss?'})({input,options}),{question:'Which cue should play on loss?'});
 assert.deepEqual(await interpret({reason:'The transformation is outside the supplied options.'})({input,options}),
  {reason:'The transformation is outside the supplied options.'});
});

test('interpreter rate limits do not retry, and fallback can use a smaller explicit turn budget',async()=>{
 let reads=0;
 const interpreter=orcaReviewInterpreter(key,async()=>{
  reads++;
  return new globalThis.Response(null,{status:429,headers:{'Retry-After':'19'}});
 });
 await assert.rejects(interpreter({input:{note:'Change this.'},options:[textIntent]}),error=>
  error.code==='E_MODEL_RATE_LIMIT'&&error.retryAfterSeconds===19);
 assert.equal(reads,1);
 let attempts=0;
 const agent=orcaReviewAgent(key,async()=>{attempts++;return inspect();});
 await assert.rejects(agent({...options,turnBudget:2}),/E_REVIEW_AGENT_LIMIT/);
 assert.equal(attempts,2);
});

test('OpenAI-compatible review keeps tools, omits provider-specific thinking, and attaches images only when vision is explicit',async()=>{
 const config={provider:'openai-compatible',endpoint:'https://models.example.test/v1/chat/completions',apiKey:key,model:'creator-model',paidModel:'creator-model',vision:false};
 const input={notes:[{id:'1',note:'Review this frame'}],screenshots:[{mimeType:'image/png',data:'aGVsbG8='}]};
 const agent=configuredReviewAgent(config,async(url,request)=>{
  assert.equal(url,config.endpoint);assert.equal(request.headers.Authorization,`Bearer ${key}`);
  const payload=JSON.parse(request.body);assert.equal(payload.model,config.model);assert.equal(payload.thinking,undefined);assert.equal(payload.include_reasoning,undefined);
  const creator=payload.messages[1];assert.equal(JSON.parse(creator.content).screenshotsOmitted,1);assert.ok(!request.body.includes('aGVsbG8='));
  return final({previewDigest:'abc'});
 });
 assert.deepEqual(await agent({...options,input}),{previewDigest:'abc'});
 const vision=configuredReviewAgent({...config,vision:true},async(_url,request)=>{
  const creator=JSON.parse(request.body).messages[1];assert.equal(creator.content[1].type,'image_url');assert.match(creator.content[1].image_url.url,/^data:image\/png;base64,aGVsbG8=$/);
  return final({previewDigest:'abc'});
 });
 assert.deepEqual(await vision({...options,input}),{previewDigest:'abc'});
});

test('Anthropic interpretation uses native messages and normalizes its response',async()=>{
 const config={provider:'anthropic',endpoint:'https://api.anthropic.com/v1/messages',apiKey:key,model:'claude-test',paidModel:'claude-test',vision:false};
 const verdict={reason:'Unsupported without an allowed intent.'};
 const interpret=configuredReviewInterpreter(config,async(url,request)=>{
  assert.equal(url,config.endpoint);assert.equal(request.headers['x-api-key'],key);assert.equal(request.headers['anthropic-version'],'2023-06-01');assert.equal(request.headers.Authorization,undefined);
  const payload=JSON.parse(request.body);assert.equal(payload.model,config.model);assert.ok(payload.system);assert.equal(payload.messages[0].role,'user');assert.equal(payload.response_format,undefined);assert.equal(payload.thinking,undefined);
  return new globalThis.Response(JSON.stringify({id:'msg-1',model:'claude-test',stop_reason:'end_turn',content:[{type:'text',text:JSON.stringify(verdict)}],usage:{input_tokens:20,output_tokens:8}}));
 });
 assert.deepEqual(await interpret({input:{note:'Do something else'},options:[textIntent]}),verdict);
});

test('Gemini interpretation uses generateContent without putting credentials in the URL',async()=>{
 const config={provider:'gemini',endpoint:'https://generativelanguage.googleapis.com/v1beta/models',apiKey:key,model:'gemini-test',paidModel:'gemini-test',vision:false};
 const verdict={question:'Which target should change?'};
 const interpret=configuredReviewInterpreter(config,async(url,request)=>{
  assert.equal(url,'https://generativelanguage.googleapis.com/v1beta/models/gemini-test:generateContent');assert.ok(!url.includes(key));assert.equal(request.headers['x-goog-api-key'],key);
  const payload=JSON.parse(request.body);assert.ok(payload.systemInstruction);assert.equal(payload.contents[0].role,'user');assert.equal(payload.generationConfig.responseMimeType,'application/json');
  return new globalThis.Response(JSON.stringify({modelVersion:'gemini-test',candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(verdict)}]}}],usageMetadata:{promptTokenCount:30,candidatesTokenCount:9}}));
 });
 assert.deepEqual(await interpret({input:{note:'Change it'},options:[textIntent]}),verdict);
});


test('interpreter performs one bounded repair and reports the actual call count',async()=>{
 const input={notes:[{id:'1',note:'Make the install button say Play now!'}]};
 const replies=[respond('stop',{content:'not valid json'}),final({intent:{...textIntent,arguments:{text:'Play now!'}}})];
 const receipt=[];
 let calls=0;
 const interpret=orcaReviewInterpreter(key,async(_url,{body})=>{
  calls++;
  const request=JSON.parse(body);
  if(calls===2)assert.match(request.messages.at(-1).content,/E_REVIEW_MODEL_RESPONSE.*allowedIntents/);
  return replies.shift();
 });
 const answer=await interpret({input,options:[textIntent],onReceipt:event=>receipt.push(event)});
 assert.deepEqual(answer,{intent:{...textIntent,arguments:{text:'Play now!'}}});
 assert.equal(answer.interpreterCalls,2);
 assert.equal(calls,2);
 assert.equal(receipt.filter(event=>event.type==='repair').length,1);
 assert.equal(receipt.filter(event=>event.type==='provider-start').length,2);
});

test('interpreter stops after two malformed responses and never retries provider or input failures',async()=>{
 let calls=0;
 const malformed=orcaReviewInterpreter(key,async()=>{calls++;return respond('stop',{content:'not valid json'});});
 await assert.rejects(malformed({input:{note:'Change it'},options:[textIntent]}),/E_REVIEW_MODEL_RESPONSE/);
 assert.equal(calls,2);
 for(const status of [401,402,429]){
  calls=0;
  const interpret=orcaReviewInterpreter(key,async()=>{calls++;return new globalThis.Response(null,{status});});
  await assert.rejects(interpret({input:{note:'Change it'},options:[textIntent]}));
  assert.equal(calls,1);
 }
 calls=0;
 const secret=orcaReviewInterpreter(key,async()=>{calls++;return final({reason:'unused'});});
 await assert.rejects(secret({input:{note:key},options:[textIntent]}),/E_MODEL_SECRET_IN_PROMPT/);
 assert.equal(calls,0);
 const oversized=orcaReviewInterpreter(key,async()=>{calls++;return final({reason:'unused'});});
 await assert.rejects(oversized({input:{note:'x'.repeat(13000)},options:[textIntent]}),/E_MODEL_INPUT_LIMIT/);
 assert.equal(calls,0);
});

test('interpreter validates caption and shared artwork only within the offered options',async()=>{
 const caption={format:'tora-authoring-intent-1',noteId:'1',action:'alignCaption',targetRole:'timeoutCaption',
  arguments:{alignment:'center'},constraints:{preserveText:true},requiredChecks:['package','diff-1','landscape-loss']};
 const artwork={format:'tora-authoring-intent-1',noteId:'1',action:'replaceSharedArtwork',targetRole:'sharedArtwork',
  arguments:{target:'crop-carrot',assetId:'crop-potato'},constraints:{allUses:true,allowedAssetIds:['crop-potato','crop-tomato']},requiredChecks:['package','diff-1']};
 for(const [option,intent] of [[caption,caption],[artwork,artwork],[artwork,{...artwork,arguments:{...artwork.arguments,assetId:'crop-tomato'}}]]){
  const interpret=orcaReviewInterpreter(key,async()=>final({intent}));
  assert.deepEqual(await interpret({input:{note:'Apply the offered revision'},options:[option]}),{intent});
 }
 const invalid=orcaReviewInterpreter(key,async()=>final({intent:{...artwork,arguments:{...artwork.arguments,assetId:'unlisted'}}}));
 await assert.rejects(invalid({input:{note:'Use unlisted artwork'},options:[artwork]}),/E_REVIEW_INTENT/);
});
