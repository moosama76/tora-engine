/* global window, toraRuntime, __mraidTest */
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {build} from 'esbuild';
import {spawnSync} from 'node:child_process';
import {chromium} from 'playwright';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {nativeConcept} from '../helpers/native-concept.mjs';

async function artifact(root,target){
 const composition=composeNativeConcept(nativeConcept()),project=applyOperations(emptyProject({id:'unity-native',name:'Unity native'}),composition.operations).project;
 const result=await compileNative(project,{target}),file=resolve(root,target==='unity-ads-ua-playable'?'index.html':target+'.html');
 await writeFile(file,result.html);
 assert.equal(result.manifest.target,target);
 assert.equal(result.manifest.networkAcceptance,false);
 return file;
}
async function open(browser,file,unity){
 const context=await browser.newContext({viewport:{width:390,height:700},isMobile:true,hasTouch:true}),page=await context.newPage(),errors=[],requests=[],opens=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('request',request=>{if(/^https?:/.test(request.url()))requests.push(request.url());});
 if(unity){
  const host=(await build({entryPoints:[resolve('packages/test-harness/src/mraid-host.ts')],bundle:true,format:'iife',globalName:'MraidHost',write:false,platform:'browser'})).outputFiles[0].text;
  await page.addInitScript(host+';MraidHost.installMraidHost({version:"3.0"});');
 }else await page.addInitScript(()=>{globalThis.openCalls=[];window.open=(...args)=>{globalThis.openCalls.push(args);};});
 await page.goto('file://'+file);
 await page.waitForFunction(()=>globalThis.toraRuntime);
 if(!unity)page.on('popup',()=>opens.push('popup'));
 return {context,page,errors,requests,opens};
}
async function complete(page){for(let i=0;i<3;i++)await page.touchscreen.tap(195,365);await page.waitForFunction(()=>toraRuntime.state().scene==='scene.success');}

test('native Unity compiler output passes the closed-format static artifact checker',async()=>{
 const root=await mkdtemp(resolve('reports/native-unity-static-')),file=await artifact(root,'unity-ads-ua-playable');
 const profile=JSON.parse(await readFile('network-rules/unity-ads-ua-playable.json','utf8'));
 const checked=spawnSync('cargo',['run','-q','-p','playable-cli','--','artifact','check',file,'--network','unity-ads-ua-playable','--confirm-reviewed',profile.reviewedAt,'--json'],{encoding:'utf8'});
 assert.equal(checked.status,0,checked.stderr||checked.stdout);
 const report=JSON.parse(checked.stdout);
 assert.equal(report.status,'STATIC_PASS');
 assert.equal(report.facts.orientation,'responsive');
 assert.equal(report.networkAcceptance,'not yet verified');
 assert.equal(report.physicalDevices,'not yet verified');
});

test('native Unity export waits for its host and first interaction, pauses, replays and opens only its CTA',async()=>{
 const root=await mkdtemp(resolve('reports/native-unity-')),file=await artifact(root,'unity-ads-ua-playable'),browser=await chromium.launch();
 try{
  const {context,page,errors,requests}=await open(browser,file,true);
  const snapshot=()=>page.evaluate(()=>({runtime:toraRuntime.state(),host:__mraidTest.snapshot()}));
  await page.touchscreen.tap(195,365);
  assert.equal((await snapshot()).runtime.variables.score,0);
  await page.evaluate(()=>__mraidTest.ready(false));
  await page.waitForFunction(()=>toraRuntime.state().network.ready);
  await page.touchscreen.tap(195,365);
  assert.equal((await snapshot()).runtime.variables.score,0);
  await page.evaluate(()=>__mraidTest.visible(true));
  assert.equal((await snapshot()).runtime.network.started,false);
  assert.equal((await snapshot()).runtime.time,0);
  await complete(page);
  assert.ok((await snapshot()).runtime.time>0);
  await page.evaluate(()=>__mraidTest.visible(false));
  const hidden=(await snapshot()).runtime.time;
  await page.waitForTimeout(150);
  assert.equal((await snapshot()).runtime.time,hidden);
  await page.evaluate(()=>__mraidTest.visible(true));
  await page.evaluate(()=>globalThis.toraRuntime.restart());
  await page.waitForFunction(()=>toraRuntime.state().scene==='scene.play');
  assert.equal((await snapshot()).runtime.variables.score,0);
  await complete(page);
  await page.touchscreen.tap(195,452);
  const result=await snapshot();
  const storeCalls=result.host.calls.filter(call=>call.name==='open');
  assert.equal(storeCalls.length,1);
  assert.deepEqual(storeCalls[0].args,['https://play.google.com/store/apps/details?id=com.playablelab.garden']);
  assert.equal(storeCalls[0].trusted,true);
  assert.deepEqual(result.runtime.diagnostics,[]);
  assert.deepEqual(errors,[]);
  assert.deepEqual(requests,[]);
  await context.close();
 }finally{await browser.close();}
});

test('standalone export retains its navigation behavior without an MRAID host',async()=>{
 const root=await mkdtemp(resolve('reports/native-standalone-')),file=await artifact(root,'standalone-browser-draft'),browser=await chromium.launch();
 try{
  const {context,page,errors,requests}=await open(browser,file,false);
  await page.waitForFunction(()=>toraRuntime.state().network.started);
  await complete(page);
  await page.touchscreen.tap(195,452);
  assert.deepEqual(await page.evaluate(()=>globalThis.openCalls),[['https://play.google.com/store/apps/details?id=com.playablelab.garden','_blank','noopener']]);
  assert.deepEqual(errors,[]);
  assert.deepEqual(requests,[]);
  await context.close();
 }finally{await browser.close();}
});
