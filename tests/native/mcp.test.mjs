import test from 'node:test';
import process from 'node:process';
import {Buffer} from 'node:buffer';
import {setTimeout,clearTimeout} from 'node:timers';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {mkdtemp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {strategicConcept} from '../helpers/native-concept.mjs';

async function client(t){
 await mkdir('reports',{recursive:true});const root=await mkdtemp(resolve('reports/tora-mcp-test-'));
 const brief=resolve(root,'playable.md');await writeFile(brief,'Playable test brief: preserve rewarding feedback.');
 const child=spawn(process.execPath,[resolve('scripts/lean/native/mcp-server.mjs')],{cwd:tmpdir(),env:{...process.env,TORA_PROJECT_STORE:resolve(root,'store'),TORA_PLAYABLE_BRIEF:brief},stdio:['pipe','pipe','pipe']});
 let serial=0,stderr='';const pending=new Map();child.stderr.on('data',chunk=>stderr+=chunk);
 const lines=createInterface({input:child.stdout});
 lines.on('line',line=>{let response;try{response=JSON.parse(line);}catch(error){for(const p of pending.values())p.reject(error);return;}const p=pending.get(response.id);if(p){pending.delete(response.id);clearTimeout(p.timer);p.resolve(response);}});
 child.on('exit',code=>{for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('MCP exited '+code+': '+stderr));}pending.clear();});
 t.after(async()=>{child.kill();lines.close();await rm(root,{recursive:true,force:true});});
 const request=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial,timer=setTimeout(()=>{pending.delete(id);reject(Error('MCP timeout '+method+': '+stderr));},90000);pending.set(id,{resolve,reject,timer});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
 const init=await request('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'tora-test',version:'1.0'}});assert.equal(init.result.protocolVersion,'2025-11-25');
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const call=(name,args={})=>request('tools/call',{name,arguments:args});
 const value=response=>{assert.equal(response.error,undefined,JSON.stringify(response));assert.notEqual(response.result.isError,true,JSON.stringify(response));return response.result.structuredContent??JSON.parse(response.result.content.find(c=>c.type==='text').text);};
 const blocked=await call('tora_create',{id:'before-brief',name:'Must be rejected'});assert.equal(blocked.result.isError,true);assert.match(JSON.stringify(blocked.result),/E_MCP_READ_BRIEF_FIRST/);
 const blockedCompose=await call('tora_compose',{id:'compose-before-brief',concept:{}});assert.equal(blockedCompose.result.isError,true);assert.match(JSON.stringify(blockedCompose.result),/E_MCP_READ_BRIEF_FIRST/);
 const loaded=await call('tora_brief');assert.notEqual(loaded.result.isError,true,JSON.stringify(loaded));
 return {root,brief,request,call,value};
}

test('MCP exposes current briefs and discoverable native tools from any working directory',async t=>{
 const c=await client(t),listed=await c.request('tools/list');assert.equal(listed.error,undefined);
 const names=listed.result.tools.map(x=>x.name);for(const name of ['tora_brief','tora_capabilities','tora_compose','tora_create','tora_inspect','tora_edit','tora_upload_asset','tora_render','tora_qa','tora_export','tora_history'])assert.ok(names.includes(name),name);
 const brief=await c.call('tora_brief');assert.notEqual(brief.result.isError,true);const text=JSON.stringify(brief.result);assert.ok(text.includes('preserve rewarding feedback'));assert.ok(text.includes('Mandatory visual-method selection'));
 const winGuidance=resolve('skills/tora-playables/references/win-effects-and-cta.md');
 assert.deepEqual(c.value(brief).documents.find(document=>document.name==='winEffectsAndCta'),{
  name:'winEffectsAndCta',path:winGuidance,text:await readFile(winGuidance,'utf8'),
 });
 await writeFile(c.brief,'Updated live playable brief.');assert.ok(JSON.stringify((await c.call('tora_brief')).result).includes('Updated live playable brief.'));
 const cap=c.value(await c.call('tora_capabilities',{names:['native.image.v1']}));assert.ok(JSON.stringify(cap).includes('native.image.v1'));
});

test('MCP roundtrip preserves edits, revisions, preview and editable exports',async t=>{
 const c=await client(t),id='mcp-proof';const created=c.value(await c.call('tora_create',{id,name:'MCP proof'}));
 const operations=[{kind:'createComponent',component:{id:'label',contract:'native.text.v1',transform:[1,0,0,1,70,100],parameters:{text:'MCP roundtrip'}}},{kind:'createComponent',component:{id:'play',contract:'native.button.v1',transform:[1,0,0,1,80,250],parameters:{width:180,height:96}}},{kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}},{kind:'putBinding',binding:{id:'play.tap',event:{kind:'click',componentId:'play'},actions:[{kind:'add',variableId:'score',value:1}]}}];
 const preview=c.value(await c.call('tora_edit',{id,expected:created.expected,operations,scope:[],previewOnly:true}));assert.equal(preview.status,'PREVIEW');
 assert.deepEqual(c.value(await c.call('tora_inspect',{id})).expected,created.expected);
 const edited=c.value(await c.call('tora_edit',{id,expected:created.expected,operations,scope:['label','play','score','play.tap','play.tap.event']}));assert.equal(edited.status,'COMMITTED');
 const inspected=c.value(await c.call('tora_inspect',{id,full:true}));assert.equal(inspected.project.components.find(x=>x.id==='label').parameters.text,'MCP roundtrip');
 const stale=await c.call('tora_edit',{id,expected:created.expected,operations,scope:['label']});assert.equal(stale.result.isError,true);assert.match(JSON.stringify(stale.result),/E_NATIVE_STALE/);
 const render=resolve(c.root,'preview.html');c.value(await c.call('tora_render',{id,output:render}));assert.match(await readFile(render,'utf8'),/MCP roundtrip/);
 const html=resolve(c.root,'playable.html');c.value(await c.call('tora_export',{id,output:html}));assert.match(await readFile(html,'utf8'),/MCP roundtrip/);
 const bundle=resolve(c.root,'project.tora.json');c.value(await c.call('tora_export',{id,format:'project',output:bundle}));assert.ok(JSON.stringify(JSON.parse(await readFile(bundle,'utf8'))).includes('MCP roundtrip'));
 c.value(await c.call('tora_history',{id,expected:edited.expected,action:'undo'}));assert.equal(c.value(await c.call('tora_inspect',{id,full:true})).project.components.length,0);
});

test('MCP rejects unknown tools and invalid arguments without losing the session',async t=>{
 const c=await client(t);for(const [name,args]of [['tora_does_not_exist',{}],['tora_create',{}],['tora_create',{id:'bad/id',name:'Invalid'}]]){const response=await c.call(name,args);assert.ok(response.error||response.result?.isError,JSON.stringify(response));}
 const created=c.value(await c.call('tora_create',{id:'valid-after-errors',name:'Still healthy'}));assert.equal(created.status,'CREATED');
 const badEdit=await c.call('tora_edit',{id:'valid-after-errors',expected:created.expected,scope:['box'],operations:[{kind:'createComponent',component:{id:'box',contract:'native.rectangle.v1',parameters:{width:-10}}}]});
 assert.equal(badEdit.result.isError,true);
 const payload=JSON.parse(badEdit.result.content[0].text);
 assert.equal(payload.code,'E_NATIVE_PROPERTY');
 assert.equal(payload.detail.componentId,'box');
 assert.equal(payload.detail.key,'width');
});

test('MCP tora_brief falls back to in-repo docs/PLAYABLE_BRIEF.md on fresh machines with empty HOME',async t=>{
 await mkdir('reports',{recursive:true});const root=await mkdtemp(resolve('reports/tora-mcp-portable-'));
 const emptyHome=resolve(root,'empty-home');await mkdir(emptyHome,{recursive:true});
 const env={...process.env,HOME:emptyHome,USERPROFILE:emptyHome,TORA_PROJECT_STORE:resolve(root,'store')};
 delete env.TORA_PLAYABLE_BRIEF;
 const child=spawn(process.execPath,[resolve('scripts/lean/native/mcp-server.mjs')],{cwd:tmpdir(),env,stdio:['pipe','pipe','pipe']});
 let serial=0;const pending=new Map();const lines=createInterface({input:child.stdout});
 lines.on('line',line=>{const response=JSON.parse(line);const p=pending.get(response.id);if(p){pending.delete(response.id);p.resolve(response);}});
 t.after(async()=>{child.kill();lines.close();await rm(root,{recursive:true,force:true});});
 const req=(method,params={})=>new Promise(done=>{const id=++serial;pending.set(id,{resolve:done});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
 await req('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'portable',version:'1.0'}});
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const briefRes=await req('tools/call',{name:'tora_brief',arguments:{}});
 assert.notEqual(briefRes.result.isError,true,JSON.stringify(briefRes));
 const data=JSON.parse(briefRes.result.content[0].text);
 const playable=data.documents.find(doc=>doc.name==='playable');
 assert.equal(playable.path,resolve('docs/PLAYABLE_BRIEF.md'));
 assert.match(playable.text,/Cohesive Art Direction/);
});


test('MCP uploads and attaches real PNG artwork to an editable image object',async t=>{
 const c=await client(t),id='mcp-image';const created=c.value(await c.call('tora_create',{id,name:'Image proof'}));
 const data=(await readFile('fixtures/native/ding-dang-assets/cat_0.png')).toString('base64');
 const uploaded=c.value(await c.call('tora_upload_asset',{id,expected:created.expected,asset:{id:'asset.hero',mime:'image/png',data,rights:'Repository fixture used only for integration verification; see fixture provenance.'}}));
 assert.equal(uploaded.status,'UPLOADED');
 const edited=c.value(await c.call('tora_edit',{id,expected:uploaded.expected,scope:['hero'],operations:[{kind:'createComponent',component:{id:'hero',contract:'native.image.v1',assetSlots:[{slotId:'source',assetId:'asset.hero'}],parameters:{width:100,height:100}}}]}));
 assert.equal(edited.status,'COMMITTED');
 const output=resolve(c.root,'image.tora.json');c.value(await c.call('tora_export',{id,format:'project',output}));
 const text=await readFile(output,'utf8');assert.ok(text.includes(data));assert.ok(text.includes('asset.hero'));
});


test('MCP discovers the creative contract and composes an editable v2 restoration project',async t=>{
 const c=await client(t);
 const contract=c.value(await c.call('tora_capabilities',{names:['creative-concept']}))['creative-concept'];
 assert.ok(contract.properties.format.enum.includes('tora-creative-concept-2'));
 assert.ok(contract.properties.restoration.properties.tiles);
 const input=strategicConcept();
 const composed=c.value(await c.call('tora_compose',{id:'mcp-strategic',name:'Strategic restoration',concept:input}));
 assert.equal(composed.status,'COMPOSED');
 assert.equal(composed.creativeStatus,'REQUIRES_VISUAL_REVIEW');
 assert.equal(composed.conceptAccepted,false);assert.equal(composed.accepted,false);
 assert.equal(composed.requirements.length,8);
 const current=c.value(await c.call('tora_inspect',{id:'mcp-strategic',full:true}));
 assert.deepEqual(current.expected,composed.expected);
 assert.ok(current.project.components.some(component=>component.id==='world.flowerbed'));
 assert.ok(current.project.eventBindings.some(binding=>binding.id==='contact.finish'));
 const output=resolve(c.root,'restoration.tora.json');
 c.value(await c.call('tora_export',{id:'mcp-strategic',format:'project',output}));
 const bundle=await readFile(output,'utf8');
 assert.ok(bundle.includes(input.restoration.areas[0].after.data));
 const stale=globalThis.structuredClone(input);stale.product.gameplayTruth='Rescue a kitten.';
 const rejected=await c.call('tora_compose',{id:'mcp-stale-concept',concept:stale});
 assert.equal(rejected.result.isError,true);
 assert.match(JSON.stringify(rejected.result),/E_CONCEPT_REQUIREMENT_STALE/);
});

function isolateProviderKey(t) {
 const existing=process.env.ORCAROUTER_API_KEY;
 delete process.env.ORCAROUTER_API_KEY;
 t.after(()=>{ if (existing!==undefined) process.env.ORCAROUTER_API_KEY=existing; });
}

test('local editor and stdio MCP submit several Harvest notes as one scoped revision',async t=>{
 isolateProviderKey(t);
 const clientSession=await client(t);
 const {createHarvestConcept}=await import('../../scripts/lean/native/author-harvest.mjs');
 const {startEditor}=await import('../../scripts/serve-editor.mjs');
 const {randomUUID}=await import('node:crypto');
 const id='mcp-harvest-review';
 const editor=await startEditor({port:0,storeRoot:resolve(clientSession.root,'store')});
 t.after(()=>editor.close());
 const {expected}=clientSession.value(await clientSession.call('tora_compose',{id,concept:await createHarvestConcept()}));
 const endpoint=editor.url+'/api/projects/'+id+'/review';
 const {chromium}=await import('playwright');
 const browser=await chromium.launch();
 t.after(()=>browser.close());
 const page=await browser.newPage({viewport:{width:1360,height:900}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(editor.url+'/?project='+id);
 await page.waitForSelector('#review-note-text:not([disabled])');
 await page.getByRole('button',{name:'Opening',exact:true}).click();
 assert.equal(await page.getByLabel('Revision note').isVisible(),true);
 assert.equal(await page.locator('#review-target').inputValue(),'');
 await page.getByLabel('Revision note').fill('Make the first move easier to notice.');
 await page.locator('#review-plus-btn').click();
 await page.locator('#rev-menu-queue').click();
 assert.equal(await page.locator('#review-queued-notes li').count(),1);

 await page.locator('#review-note-toggle').click();
 await page.getByLabel('Feedback target').selectOption('opening');
 await page.locator('#review-fields summary').click();
 await page.getByRole('checkbox',{name:/^Time before opening hint \(s\)/}).uncheck();
 await page.getByLabel('Revision note').fill('Tell the player to match three crops.');
 await page.locator('#review-plus-btn').click();
 await page.locator('#rev-menu-queue').click();

 await page.getByRole('button',{name:'End card',exact:true}).click();
 await page.locator('#review-note-toggle').click();
 const canvas=await page.locator('#review-before canvas').boundingBox();
 await page.mouse.click(canvas.x+canvas.width*.5,canvas.y+canvas.height*.8);
 assert.equal(await page.locator('#review-target').inputValue(),'cta');
 const fieldOptions=page.locator('#review-field-options input[type="checkbox"]');
 if(!(await fieldOptions.first().isVisible()))await page.locator('#review-fields summary').click();
 assert.equal(await fieldOptions.count(),2);
 await fieldOptions.nth(1).uncheck();
 await page.getByLabel('Revision note').fill('Change install button to Play now.');
 assert.equal(await page.locator('#review-queued-notes li').count(),2);
 const sent=page.waitForResponse(response=>response.url()===endpoint&&response.request().method()==='POST',{timeout:5000});
 await page.locator('#review-submit').click();
 const response=await sent;
 assert.equal(response.ok(),true,await response.text());
 await page.getByText('Use MCP agent ($0)',{exact:true}).click();
 await page.getByRole('button',{name:'Copy MCP instruction'}).waitFor({timeout:5000});

 const initial=await (await globalThis.fetch(endpoint)).json();
 assert.equal(initial.requests.length,1);
 const [{id:requestId,notes}]=initial.requests;
 assert.deepEqual(notes.map(note=>note.target),[null,'opening','cta']);
 const claimed=await clientSession.call('tora_review_claim',{id,requestId});
 const claim=clientSession.value(claimed);
 assert.deepEqual(claim.notes.map(note=>[note.id,note.authorizedFields.map(field=>field.id)]),[['1',[]],['2',['instruction']],['3',['text']]]);
 assert.equal(claimed.result.content.filter(item=>item.type==='image'&&item.mimeType==='image/jpeg').length,3);
 const proposed=clientSession.value(await clientSession.call('tora_review_propose',{id,requestId,proposalId:randomUUID(),changes:{2:{instruction:'Match three crops'},3:{text:'Play now'}},summary:'Updated the opening instruction and install button copy.'}));
 assert.equal(proposed.status,'candidate',JSON.stringify(proposed));
 const candidate=await (await globalThis.fetch(endpoint+'?candidate='+requestId)).json();
 const component=candidate.project.components.find(record=>record.id==='harvest.cta.label');
 assert.equal(component.parameters.text,'Play now');
 assert.equal(candidate.project.variables.find(item=>item.id==='harvest.message').initial,'Match three crops');
 await page.getByRole('button',{name:'Compare Install button',exact:true}).click();
 const current=await (await globalThis.fetch(endpoint)).json();
 assert.deepEqual(current.expected,expected);
 assert.equal(current.passesUsed,1);
 await page.getByRole('button',{name:'Use this version',exact:true}).click();
 await page.getByRole('status').filter({hasText:'Version applied'}).waitFor();
 const promoted=await (await globalThis.fetch(endpoint)).json();
 assert.notEqual(promoted.expected.revisionId,expected.revisionId);
 assert.deepEqual(errors,[]);
});

test('review UI saves a plain note and retries the same revision after verified BYOK key setup',async t=>{
 isolateProviderKey(t);
 const previousInterpretation=process.env.TORA_REVIEW_INTERPRETATION;process.env.TORA_REVIEW_INTERPRETATION='0';
 t.after(()=>{if(previousInterpretation===undefined)delete process.env.TORA_REVIEW_INTERPRETATION;else process.env.TORA_REVIEW_INTERPRETATION=previousInterpretation;});
 const clientSession=await client(t);
 const {createHarvestConcept}=await import('../../scripts/lean/native/author-harvest.mjs');
 const {startEditor}=await import('../../scripts/serve-editor.mjs');
 const {chromium}=await import('playwright');
 const nativeFetch=globalThis.fetch;
 let authAttempts=0;
 let modelAttempts=0;
 t.mock.method(globalThis,'fetch',async (url,options)=>{
  if (!String(url).startsWith('https://api.openai.com/')) return nativeFetch(url,options);
  if (String(url).endsWith('/v1/models/gpt-6.2-sol')) {
   authAttempts++;
   return new globalThis.Response('{}',{status:options.headers.Authorization==='Bearer local-valid-test-key'?200:401});
  }
  modelAttempts++;
  const payload=JSON.parse(options.body);
  const tool=(name,args)=>globalThis.Response.json({choices:[{finish_reason:'tool_calls',message:{tool_calls:[{
   id:name,type:'function',function:{name,arguments:JSON.stringify(args)},
  }]}}]});
  if(modelAttempts===1){
   const creator=payload.messages[1].content;
   const input=JSON.parse(Array.isArray(creator)?creator[0].text:creator);
   assert.equal(input.notes[0].moment,'opening');
   assert.equal(input.notes[0].pinned,false);
   return tool('preview',{edits:[{noteId:'1',scope:['harvest.cta.label'],
    operations:[{kind:'setParameter',id:'harvest.cta.label',key:'text',value:'Play now'}],
   }]});
  }
  const {previewDigest}=JSON.parse(payload.messages.at(-1).content);
  if(modelAttempts===2)return tool('exercise',{previewDigest});
  return globalThis.Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify({
   previewDigest,noteResults:[{noteId:'1',records:['harvest.cta.label'],verification:['diff-1','package']}],
  })}}]});
 });
 const id='mcp-review-connection';
 const editor=await startEditor({port:0,storeRoot:resolve(clientSession.root,'store')});
 t.after(()=>editor.close());
 clientSession.value(await clientSession.call('tora_compose',{id,concept:await createHarvestConcept()}));
 const endpoint=editor.url+'/api/projects/'+id+'/review';
 const browser=await chromium.launch();
 t.after(()=>browser.close());
 const page=await browser.newPage({viewport:{width:1360,height:900}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(editor.url+'/?project='+id);
 await page.waitForSelector('#review-note-text:not([disabled])');
 await page.getByLabel('Revision note').fill('Change the install button label to Play now.');
 await page.locator('#review-submit').click();
 await page.getByRole('button',{name:'Connect verified API'}).click();
 await page.waitForSelector('dialog.tora-modal[open]');
 await page.locator('.tora-provider-card',{hasText:'OpenAI'}).click();
 const key=page.locator('#tora-api-key');
 const saved=await (await nativeFetch(endpoint)).json();
 assert.equal(saved.requests.length,1);
 assert.equal(saved.passesUsed,0);
 await key.fill('local-invalid-test-key');
 await page.locator('#tora-api-save').click();
 await page.locator('#tora-api-error').filter({hasText:'rejected that API key'}).waitFor();
 assert.equal(modelAttempts,0);
 await key.fill('local-valid-test-key');
 await page.locator('#tora-api-save').click();
 await page.getByText('Revision ready to compare',{exact:true}).waitFor();
 await page.locator('#review-after:not([hidden]) canvas').waitFor();
 assert.equal(await page.locator('#review-before').getAttribute('data-playing'),'false');
 assert.equal(await page.locator('#review-after').getAttribute('data-playing'),'false');
 await page.locator('#review-before-toggle').click();
 await page.locator('#review-before[data-playing="true"]').waitFor();
 assert.equal(await page.locator('#review-after').getAttribute('data-playing'),'false');
 await page.locator('#review-before-toggle').click();
 await page.locator('#review-before[data-playing="false"]').waitFor();
 await page.locator('#review-after-toggle').click();
 await page.locator('#review-after[data-playing="true"]').waitFor();
 assert.equal(await page.locator('#review-before').getAttribute('data-playing'),'false');
 await page.getByLabel('Screen orientation').selectOption('landscape');
 await page.locator('#review-after[data-playing="false"]').waitFor();
 assert.equal(await page.locator('#review-previews').evaluate(el=>el.ownerDocument.defaultView.getComputedStyle(el).flexDirection),'column');
 const beforeBox=await page.locator('#review-before').boundingBox(),afterBox=await page.locator('#review-after').boundingBox();
 assert.ok(afterBox.y>=beforeBox.y+beforeBox.height);
 assert.equal(await page.locator('#review-before').getAttribute('data-playing'),'false');
 assert.equal(await page.locator('#review-after').getAttribute('data-playing'),'false');
 const revised=await (await nativeFetch(endpoint)).json();
 assert.equal(revised.requests.length,1);
 assert.equal(revised.requests[0].id,saved.requests[0].id);
 assert.equal(revised.requests[0].status,'candidate');
 assert.equal(revised.passesUsed,1);
 assert.equal(authAttempts,2);
 assert.equal(modelAttempts,3);
 assert.equal(await key.inputValue(),'');
 assert.deepEqual(errors,[]);
});

test('flagged editor sound draft resolves through MCP without a provider',async t=>{
 isolateProviderKey(t);
 const previousFlag=process.env.TORA_DETERMINISTIC_REVIEW;
 process.env.TORA_DETERMINISTIC_REVIEW='1';
 t.after(()=>{if(previousFlag===undefined)delete process.env.TORA_DETERMINISTIC_REVIEW;else process.env.TORA_DETERMINISTIC_REVIEW=previousFlag;});
 const clientSession=await client(t);
 const {legacyHarvestOutcomeConcept}=await import('../helpers/native-concept.mjs');
 const {startEditor}=await import('../../scripts/serve-editor.mjs');
 const id='mcp-deterministic-sound';
 const editor=await startEditor({port:0,storeRoot:resolve(clientSession.root,'store')});
 t.after(()=>editor.close());
 clientSession.value(await clientSession.call('tora_compose',{id,concept:await legacyHarvestOutcomeConcept()}));
 const endpoint=editor.url+'/api/projects/'+id+'/review';
 const {chromium}=await import('playwright');
 const browser=await chromium.launch();
 t.after(()=>browser.close());
 const page=await browser.newPage({viewport:{width:1360,height:900}});
 const errors=[],submissions=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('request',request=>{if(request.url()===endpoint&&request.method()==='POST')submissions.push(JSON.parse(request.postData()));});
 await page.goto(editor.url+'/?project='+id);
 await page.waitForSelector('#review-note-text:not([disabled])');
 await page.locator('#review-note-toggle').click();
 await page.getByRole('button',{name:'End card',exact:true}).click();
 await page.getByLabel('Feedback target').selectOption('ending');
 await page.locator('#review-fields summary').click();
 await page.getByLabel('Explicit replacement win cue').selectOption('kenney-music-jingles/audio/victory.wav');
 await page.getByLabel('Revision note').fill('Move the current win jingle to loss and use a new celebratory cue for winning.');
 delete process.env.TORA_DETERMINISTIC_REVIEW;
 const sent=page.waitForResponse(response=>response.url()===endpoint&&response.request().method()==='POST');
 await page.locator('#review-submit').click();
 const response=await sent;
 assert.equal(response.ok(),true,await response.text());
 assert.equal((await response.json()).status,'candidate');
 assert.deepEqual(submissions[0].notes[0].fields,['win-cue']);
 process.env.TORA_DETERMINISTIC_REVIEW='1';
 const candidate=clientSession.value(await clientSession.call('tora_review_resolve',{id,requestId:submissions[0].requestId}));
 assert.equal(candidate.status,'candidate',JSON.stringify(candidate));
 assert.equal(candidate.receipt.route,'deterministic');
 assert.deepEqual(candidate.receipt.providerCalls,[]);
 assert.deepEqual(new Set(candidate.candidate.audioMoments),new Set(['end-card','timeout']));
 await page.locator('#review-after:not([hidden]) canvas').waitFor({timeout:10000});
 for(const label of ['Replay win','Replay loss']){
  await page.getByRole('button',{name:label,exact:true}).click();
  assert.equal(await page.locator('#review-after').getAttribute('data-playing'),'true');
 }
 assert.deepEqual(errors,[]);
});

test('MCP scopes brief and capability discovery by domain without breaking full compatibility',async t=>{
 const c=await client(t),compact=c.value(await c.call('tora_brief'));
 assert.ok(Buffer.byteLength(JSON.stringify(compact))<=31514);
 assert.ok(compact.documents.some(document=>document.name==='authoring'&&document.path.endsWith('CORE_AUTHORING.md')));
 assert.ok(!compact.documents.some(document=>document.name==='agentTools'));
 const scoped=c.value(await c.call('tora_brief',{packs:['core','match-board','3d']}));
 assert.deepEqual(scoped.documents.filter(document=>document.name.startsWith('pack:')).map(document=>document.name),['pack:match-board','pack:3d']);
 assert.equal(scoped.documents.filter(document=>document.name==='authoring').length,1);
 const full=c.value(await c.call('tora_brief',{full:true}));
 assert.ok(full.documents.some(document=>document.name==='fullAuthoring'));
 assert.ok(full.documents.some(document=>document.name==='agentTools'));
 const summary=c.value(await c.call('tora_capabilities',{summary:true}));
 assert.ok(Buffer.byteLength(JSON.stringify(summary))<2048);
 assert.ok(summary.packs.some(pack=>pack.id==='path-network'&&pack.members.includes('path-agent')));
 const pack=c.value(await c.call('tora_capabilities',{packs:['match-board']}));
 assert.ok(pack.behaviors['match-board']);assert.ok(pack.behaviors.drag);
 assert.equal(pack.behaviors['path-agent'],undefined);assert.equal(pack.contracts['native.stage3d.v1'],undefined);
 const pack3d=c.value(await c.call('tora_capabilities',{packs:['3d']}));
 assert.ok(pack3d.events.includes('launch')&&pack3d.events.includes('bodyBounce')&&pack3d.events.includes('zoneCapture'));
 const named=c.value(await c.call('tora_capabilities',{packs:['match-board'],names:['native.stage3d.v1']}));
 assert.ok(named.contracts['native.stage3d.v1']);
 const legacy=c.value(await c.call('tora_capabilities',{}));assert.ok(legacy.contracts['native.stage3d.v1']);
 const rejected=await c.call('tora_brief',{packs:['unknown']});assert.equal(rejected.result.isError,true);
});
