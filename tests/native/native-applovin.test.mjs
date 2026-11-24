/* global toraRuntime,__mraidTest */
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {build} from 'esbuild';
import {chromium} from 'playwright';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {applyOperations,emptyProject} from '../../scripts/lean/native/document.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {runCreativeQa} from '../../scripts/lean/native/creative-qa.mjs';
import {nativeConcept,strategicConcept} from '../helpers/native-concept.mjs';

async function artifact(root,concept=nativeConcept(),filename='index.html'){
 const composition=composeNativeConcept(concept),project=applyOperations(emptyProject({id:'applovin-native',name:'AppLovin native'}),composition.operations).project;
 const result=await compileNative(project,{assets:composition.assets.length?composition.assets:project.assets,target:'applovin-growth-playable'}),file=resolve(root,filename);await writeFile(file,result.html);return {file,result};
}
test('native AppLovin export passes static, MRAID 2 lifecycle, CTA, and Creative QA checks',async t=>{
 const root=await mkdtemp(resolve('reports/native-applovin-'));t.after(()=>rm(root,{recursive:true,force:true}));const {file,result}=await artifact(root);
 assert.equal(result.manifest.target,'applovin-growth-playable');assert.equal(result.manifest.networkAcceptance,false);assert.ok(result.manifest.bytes<5_000_000);
 const profile=JSON.parse(await readFile('network-rules/applovin-growth-playable.json','utf8')),checked=spawnSync('cargo',['run','-q','-p','playable-cli','--','artifact','check',file,'--network','applovin-growth-playable','--confirm-reviewed',profile.reviewedAt,'--json'],{encoding:'utf8'});
 assert.equal(checked.status,0,checked.stderr||checked.stdout);const report=JSON.parse(checked.stdout);assert.equal(report.status,'STATIC_PASS');assert.equal(report.facts.profileId,'applovin-growth-playable');assert.equal(report.facts.orientation,'responsive');
 const unityProfile=JSON.parse(await readFile('network-rules/unity-ads-ua-playable.json','utf8')),cross=spawnSync('cargo',['run','-q','-p','playable-cli','--','artifact','check',file,'--network','unity-ads-ua-playable','--confirm-reviewed',unityProfile.reviewedAt,'--json'],{encoding:'utf8'});assert.equal(cross.status,5,cross.stderr||cross.stdout);
 const qaArtifact=await artifact(root,strategicConcept(),'qa.html'),qa=await runCreativeQa({html:qaArtifact.result.html,outputDir:resolve(root,'qa'),network:'applovin-growth-playable'});assert.equal(qa.ok,true,JSON.stringify(qa.blockers));
 const browser=await chromium.launch();
 try{
  const context=await browser.newContext({viewport:{width:390,height:700},isMobile:true,hasTouch:true}),page=await context.newPage(),errors=[],requests=[];
  page.on('pageerror',error=>errors.push(error.message));page.on('request',request=>{if(/^https?:/.test(request.url()))requests.push(request.url());});
  const host=(await build({entryPoints:[resolve('packages/test-harness/src/mraid-host.ts')],bundle:true,format:'iife',globalName:'MraidHost',write:false,platform:'browser'})).outputFiles[0].text;
  await page.addInitScript(host+';MraidHost.installMraidHost({version:"2.0"});');await page.goto('file://'+file);await page.waitForFunction(()=>globalThis.toraRuntime);
  await page.touchscreen.tap(195,365);assert.equal(await page.evaluate(()=>toraRuntime.state().variables.score),0);
  await page.evaluate(()=>__mraidTest.ready(false));await page.waitForFunction(()=>toraRuntime.state().network.ready);await page.touchscreen.tap(195,365);assert.equal(await page.evaluate(()=>toraRuntime.state().variables.score),0);
  await page.evaluate(()=>__mraidTest.visible(true));assert.equal(await page.evaluate(()=>toraRuntime.state().network.started),false);
  for(let tap=0;tap<3;tap++)await page.touchscreen.tap(195,365);await page.waitForFunction(()=>toraRuntime.state().scene==='scene.success');await page.touchscreen.tap(195,452);
  const snapshot=await page.evaluate(()=>__mraidTest.snapshot()),opens=snapshot.calls.filter(call=>call.name==='open');assert.equal(opens.length,1);assert.equal(opens[0].trusted,true);assert.deepEqual(opens[0].args,['https://play.google.com/store/apps/details?id=com.playablelab.garden']);
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);await context.close();
 }finally{await browser.close();}
});
