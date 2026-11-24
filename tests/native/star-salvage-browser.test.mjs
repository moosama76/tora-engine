import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from 'playwright';
import {createSalvageConcept} from '../../scripts/lean/native/author-salvage.mjs';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {applyOperations,emptyProject} from '../../scripts/lean/native/document.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {runCreativeQa} from '../../scripts/lean/native/creative-qa.mjs';
import {exerciseSalvageOutcomeAudio} from '../../scripts/lean/native/check-salvage.mjs';

test('packaged Star Salvage passes real outcome audio, four-viewport QA and Unity network inspection',async t=>{
 const root=await mkdtemp(resolve('reports/salvage-browser-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const concept=await createSalvageConcept(),composition=composeNativeConcept(concept),{project}=applyOperations(emptyProject({id:'star-salvage-browser',name:'Star Salvage'}),composition.operations);
 const assets=project.assets.map(asset=>({...asset,data:composition.assets.find(source=>source.id===asset.id).data}));
 const standalone=await compileNative(project,{assets}),unity=await compileNative(project,{assets,target:'unity-ads-ua-playable'});
 const standaloneFile=resolve(root,'playable.html'),unityFile=resolve(root,'index.html');
 await writeFile(standaloneFile,standalone.html);await writeFile(unityFile,unity.html);
 const inspected=spawnSync('cargo',['run','--quiet','--locked','-p','playable-cli','--','artifact','check',unityFile,'--network','unity-ads-ua-playable','--confirm-reviewed','2026-11-20','--json'],{encoding:'utf8'});
 assert.equal(inspected.status,0,inspected.stderr+inspected.stdout);assert.equal(JSON.parse(inspected.stdout).status,'STATIC_PASS');
 const browser=await chromium.launch();t.after(()=>browser.close());
 const qa=await runCreativeQa({html:standalone.html,project,outputDir:resolve(root,'qa'),browser});
 assert.equal(qa.ok,true,JSON.stringify(qa.blockers));
 for(const viewport of qa.checks.browser.viewports){
  for(const state of ['opening','after-first-input','end-card','timeout'])assert.ok(qa.states.some(row=>row.status==='checked'&&row.state===state&&row.viewport.width===viewport.width&&row.viewport.height===viewport.height),JSON.stringify(viewport)+' '+state);
 }
 assert.ok(qa.interactions.every(interaction=>interaction.within150Ms));
 const timeoutShots=qa.screenshots.filter(row=>row.state==='timeout'),winShots=qa.screenshots.filter(row=>row.state==='end-card');
 assert.equal(timeoutShots.length,4);for(const shot of timeoutShots)assert.ok(!winShots.some(win=>win.sha256===shot.sha256),'Timeout image duplicates a win image');
 const evidence=await exerciseSalvageOutcomeAudio(unity,{browser,outcomes:['win','loss'],accelerateIdle:true,evidenceDir:resolve(root,'outcomes'),inspectOutcome:async(page,outcome)=>{
  const audit=await page.evaluate(()=>globalThis.toraRuntime.auditSceneLayout({ids:['salvage.panel','salvage.reward.title','salvage.cta'],interactiveIds:['salvage.cta'],network:'unity-ads-ua-playable',minTouchPx:44}));
  assert.deepEqual(audit.defects,[],outcome);assert.deepEqual(audit.missing,[],outcome);return audit;
 }});
 assert.equal(evidence.win.catches,3);assert.equal(evidence.loss.catches,0);assert.notEqual(evidence.win.outcomeCue.assetHash,evidence.loss.outcomeCue.assetHash);
 assert.ok(evidence.win.outcomeCue.endedAt>evidence.win.outcomeCue.at);assert.ok(evidence.loss.outcomeCue.endedAt>evidence.loss.outcomeCue.at);
 assert.deepEqual(evidence.errors,[]);assert.deepEqual(evidence.externalRequests,[]);
});
