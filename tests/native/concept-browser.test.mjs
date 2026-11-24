import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from 'playwright';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {nativeConcept} from '../helpers/native-concept.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';

for(const mechanic of ['tap-collect','drag-catch'])test(`exported ${mechanic} concept reaches its goal and replays`,async()=>{const root=await mkdtemp(resolve('reports/native-concept-')),concept=nativeConcept(mechanic),composition=composeNativeConcept(concept),project=applyOperations(emptyProject({id:'concept-'+mechanic,name:'Concept'}),composition.operations).project,result=await compileNative(project),file=resolve(root,'playable.html');await writeFile(file,result.html);const browser=await chromium.launch();try{const context=await browser.newContext({viewport:{width:390,height:700},isMobile:true,hasTouch:true}),page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));await page.goto('file://'+file);await page.waitForFunction(()=>globalThis.toraRuntime);if(mechanic==='tap-collect'){for(let i=0;i<3;i++)await page.touchscreen.tap(195,365);}else{const cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:195,y:545,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:70,y:545,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}await page.waitForFunction(()=>globalThis.toraRuntime.state().scene==='scene.success',undefined,{timeout:15000});assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.score),3);await page.evaluate(()=>globalThis.toraRuntime.restart());await page.waitForFunction(()=>globalThis.toraRuntime.state().scene==='scene.play');const state=await page.evaluate(()=>globalThis.toraRuntime.state());assert.equal(state.variables.score,0);assert.deepEqual(state.diagnostics,[]);assert.deepEqual(errors,[]);await context.close();}finally{await browser.close();}});

test('sourced match-restore composition requires valid matches and preserves chosen repairs through payoff and CTA',async t=>{
 const root=await mkdtemp(resolve('reports/native-match-restore-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const {strategicConcept}=await import('../helpers/native-concept.mjs');
 const store=new ProjectStore(resolve(root,'store')),service=new NativeService(store,new EditorState(store)),tool=new NativeAgentTools(service),input=strategicConcept();
 await tool.run({command:'compose',id:'match-restore-proof',name:'Match restore proof',concept:input});
 const current=await tool.run({command:'inspect',id:'match-restore-proof',full:true}),artifact=await service.export('match-restore-proof',{revisionId:current.expected.revisionId,target:'standalone-browser-draft'}),file=resolve(root,'playable.html');
 await writeFile(file,artifact.html);
 const browser=await chromium.launch();
 try{
  const context=await browser.newContext({viewport:{width:390,height:700},isMobile:true,hasTouch:true}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const match=async(target,second=false)=>{await target.touchscreen.tap(195,second?545:459);await target.touchscreen.tap(195,second?631:545);await target.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='repair');};
  await page.goto('file://'+file);await page.waitForFunction(()=>globalThis.toraRuntime);
  await page.screenshot({path:resolve(root,'01-opening.png')});
  await page.touchscreen.tap(109,459);await page.touchscreen.tap(195,459);
  assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.repairs),0);
  assert.match(await page.evaluate(()=>globalThis.toraRuntime.state().variables.message),/Try another/);
  await match(page);await page.screenshot({path:resolve(root,'02-choice.png')});
  await page.touchscreen.tap(285,500);
  assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().components['world.pond'].assetId),'art-pond-after');
  await match(page,true);await page.touchscreen.tap(95,500);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='payoff');
  await page.waitForTimeout(120);assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.phase),'payoff');
  await page.waitForTimeout(1200);
  const payoffArt=await page.screenshot({clip:{x:0,y:100,width:390,height:250}});
  await page.screenshot({path:resolve(root,'03-payoff.png')});
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='cta',undefined,{timeout:7000});
  const ctaArt=await page.screenshot({clip:{x:0,y:100,width:390,height:250}});
  assert.ok(payoffArt.equals(ctaArt),'Both restored areas must persist unchanged into the CTA');
  await page.screenshot({path:resolve(root,'04-cta.png')});
  await page.evaluate(()=>globalThis.toraRuntime.restart());await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='first-seconds');
  const reset=await page.evaluate(()=>globalThis.toraRuntime.state());assert.equal(reset.variables.repairs,0);assert.equal(reset.components['world.pond']?.assetId,undefined);
  await page.close();
  const artwork=new Map([...input.restoration.areas.flatMap(area=>[area.before,area.after]),...Object.values(input.restoration.audio??{})].map(asset=>[asset.id,asset.data]));
  const assets=current.project.assets.map(asset=>({...asset,data:artwork.get(asset.id)}));
  const hideText=current.project.components.filter(component=>component.contract==='native.text.v1').map(component=>({kind:'setParameter',id:component.id,key:'visible',value:false}));
  const hiddenProject=applyOperations(current.project,hideText).project,hidden=await compileNative(hiddenProject,{assets}),hiddenFile=resolve(root,'copy-hidden.html');await writeFile(hiddenFile,hidden.html);
  const silent=await context.newPage();silent.on('pageerror',error=>errors.push(error.message));
  await silent.addInitScript(()=>Object.defineProperty(globalThis,'AudioContext',{configurable:true,value:class{constructor(){throw Error('Audio unavailable');}}}));
  await silent.goto('file://'+hiddenFile);await silent.waitForFunction(()=>globalThis.toraRuntime);
  await match(silent);await silent.touchscreen.tap(95,500);await match(silent,true);await silent.touchscreen.tap(285,500);
  await silent.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='payoff');await silent.waitForTimeout(1400);
  await silent.screenshot({path:resolve(root,'05-copy-hidden-payoff.png')});
  await silent.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='cta',undefined,{timeout:7000});
  await silent.screenshot({path:resolve(root,'06-copy-hidden-cta.png')});
  assert.equal(await silent.evaluate(()=>globalThis.toraRuntime.state().audio.state),'locked');assert.deepEqual(await silent.evaluate(()=>globalThis.toraRuntime.state().diagnostics),[]);assert.deepEqual(errors,[]);
  await context.close();
 }finally{await browser.close();}
});

test('strategic restoration rejects wrong swaps, keeps both repairs, times payoff and resets on replay',async()=>{
 const {strategicConcept}=await import('../helpers/native-concept.mjs');
 const input=strategicConcept(),composition=composeNativeConcept(input);
 const project=applyOperations(emptyProject({id:'strategic-browser',name:'Strategy'}),composition.operations).project;
 const assets=project.assets.map(asset=>({...asset,data:composition.assets.find(source=>source.id===asset.id).data}));
 const {html}=await compileNative(project,{assets}),root=await mkdtemp(resolve('reports/native-strategy-')),file=resolve(root,'playable.html');
 await writeFile(file,html);
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:700}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));await page.goto('file://'+file);
  await page.mouse.click(109,459);await page.mouse.click(195,459);
  assert.match(await page.evaluate(()=>globalThis.toraRuntime.state().variables.message),/Try another/);
  assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.repairs),0);
  await page.mouse.click(195,459);await page.mouse.click(195,545);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='repair');
  await page.mouse.click(95,500);
  let state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.repairs,1);assert.equal(state.variables['repaired.flowerbed'],true);
  assert.equal(state.components['world.flowerbed'].assetId,'art-flowerbed-after');
  await page.mouse.click(195,545);await page.mouse.click(195,631);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='repair');
  await page.mouse.click(95,500);
  assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.repairs),1);
  await page.mouse.click(285,500);
  state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.repairs,2);assert.equal(state.variables.phase,'payoff');
  assert.equal(state.components['world.flowerbed'].assetId,'art-flowerbed-after');
  assert.equal(state.components['world.pond'].assetId,'art-pond-after');
  await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.phase),'payoff');
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='cta',undefined,{timeout:6000});
  await page.evaluate(()=>globalThis.toraRuntime.restart());state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.repairs,0);assert.equal(state.variables.phase,'first-seconds');assert.equal(state.components['world.flowerbed']?.assetId,undefined);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='cta',undefined,{timeout:16000});
  assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.repairs),0);
  assert.deepEqual(await page.evaluate(()=>globalThis.toraRuntime.state().diagnostics),[]);assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});

test('legacy three-area restoration completes every persistent repair',async()=>{
 const input=nativeConcept('match-restore');
 const third=globalThis.structuredClone(input.restoration.areas[0]);
 third.id='arbor';third.label='Arbor';
 third.before.id='art-arbor-before';third.after.id='art-arbor-after';
 input.restoration.areas.push(third);
 const composition=composeNativeConcept(input);
 const project=applyOperations(emptyProject({id:'legacy-three-areas',name:'Legacy garden'}),composition.operations).project;
 const assets=project.assets.map(asset=>({...asset,data:composition.assets.find(source=>source.id===asset.id).data}));
 const {html}=await compileNative(project,{assets});
 const root=await mkdtemp(resolve('reports/native-three-areas-'));
 const file=resolve(root,'playable.html');
 await writeFile(file,html);
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:700}});
  await page.goto('file://'+file);
  for(let index=0;index<3;index++){
   await page.mouse.click(195,index===0?459:545);
   await page.mouse.click(195,index===0?545:631);
   await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='repair');
   await page.mouse.click(69+index*126,500);
   const state=await page.evaluate(()=>globalThis.toraRuntime.state());
   assert.equal(state.variables.repairs,index+1);
   assert.equal(state.variables['repaired.'+input.restoration.areas[index].id],true);
   assert.equal(state.variables.phase,index===2?'payoff':'escalation');
   assert.deepEqual(state.diagnostics,[]);
  }
 }finally{await browser.close();}
});

test('restoration reflows into landscape during play without losing repairs or input',async()=>{
 const {strategicConcept}=await import('../helpers/native-concept.mjs');
 const composition=composeNativeConcept(strategicConcept());
 const project=applyOperations(emptyProject({id:'landscape-strategy',name:'Landscape'}),composition.operations).project;
 const assets=project.assets.map(asset=>({...asset,data:composition.assets.find(source=>source.id===asset.id).data}));
 const {html}=await compileNative(project,{assets});
 const root=await mkdtemp(resolve('reports/native-landscape-'));
 const file=resolve(root,'playable.html');
 await writeFile(file,html);
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:700}});
  await page.goto('file://'+file);
  await page.mouse.click(195,459);await page.mouse.click(195,545);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='repair');
  await page.mouse.click(95,500);
  await page.setViewportSize({width:844,height:390});
  await page.waitForTimeout(100);
  let state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.phase,'escalation');
  assert.equal(state.variables.repairs,1);
  assert.equal(state.components['world.flowerbed'].assetId,'art-flowerbed-after');
  // A 700x390 logical landscape stage is centered in the 844x390 viewport.
  await page.mouse.click(617,215);await page.mouse.click(617,301);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='repair');
  await page.mouse.click(689,192);
  state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.repairs,2);
  assert.equal(state.variables.phase,'payoff');
  assert.equal(state.components['world.pond'].assetId,'art-pond-after');
  await page.mouse.click(613,249);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables.phase==='cta');
  await page.evaluate(()=>globalThis.toraRuntime.restart());
  state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.repairs,0);
  assert.equal(state.variables.phase,'first-seconds');
  assert.equal(state.components['world.flowerbed']?.assetId,undefined);
  assert.deepEqual(state.diagnostics,[]);
 }finally{await browser.close();}
});
