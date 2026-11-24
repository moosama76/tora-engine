import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from 'playwright';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
import {composeNativeConcept,validateCreativeConcept,conceptHash} from '../../scripts/lean/native/concept.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {compileNative,runtimeBundle} from '../../scripts/lean/native/compiler.mjs';
import {playableHTML} from '../../scripts/lean/native/html.mjs';

async function artifact(){
 const concept=await createHarvestConcept();
 const composition=composeNativeConcept(concept);
 const project=applyOperations(emptyProject({id:'harvest-browser',name:'Harvest'}),composition.operations).project;
 const assets=project.assets.map(asset=>({...asset,data:composition.assets.find(source=>source.id===asset.id).data}));
 const compiled=await compileNative(project,{assets});
 const folder=await mkdtemp(resolve('reports/harvest-browser-'));
 const file=resolve(folder,'playable.html');
 await writeFile(file,compiled.html);
 return {file,concept,composition,project};
}
function position(tileId,landscape=false){
 const [row,column]=tileId.split('.').slice(-2).map(Number);
 const x=35+column*64+2+29,y=345+row*64+2+29;
 return landscape?{x:72+341.25+x*.95,y:-270+y*.95}:{x,y};
}
async function swipe(page,move,landscape=false){
 const from=position(move.from,landscape),to=position(move.to,landscape);
 await page.mouse.move(from.x,from.y);await page.mouse.down();
 await page.mouse.move(to.x,to.y,{steps:6});await page.mouse.up();
}
const state=page=>page.evaluate(()=>globalThis.toraRuntime.state());
const board=async page=>(await state(page)).match.boards['harvest.board'];

test('harvest uses licensed assets and a reusable five-by-five board',async()=>{
 const concept=await createHarvestConcept();
 const composition=composeNativeConcept(concept);
 assert.ok(composition.operations.length<=256);
 assert.equal(composition.assetPolicy.length,concept.harvest.assets.length);
 assert.ok(composition.assetPolicy.every(receipt=>receipt.origin==='third-party-free'));
 const generated=globalThis.structuredClone(concept);
 generated.harvest.assets[0].provenance.origin='generated';
 assert.throws(()=>composeNativeConcept(generated),/E_CONCEPT_SCHEMA/);
 const missing=globalThis.structuredClone(concept);
 missing.harvest.world=missing.harvest.world.filter(object=>object.unlockAt!==2);
 assert.throws(()=>composeNativeConcept(missing),/E_CONCEPT_WORLD_TRANSFORMATION/);
});

test('versioned Harvest reward recipe is repeatable and changes only the payoff treatment',async()=>{
 const input=await createHarvestConcept();
 input.harvest.rewardRecipe={id:'harvest-reward-1',variant:'crisp'};
 const crisp=composeNativeConcept(input);
 input.harvest.rewardRecipe.variant='bloom';
 const bloom=composeNativeConcept(input);
 assert.deepEqual(composeNativeConcept(input),bloom);
 assert.deepEqual(crisp.assets,bloom.assets);
 const changed=crisp.operations.filter((op,index)=>JSON.stringify(op)!==JSON.stringify(bloom.operations[index]));
 assert.deepEqual(changed.map(op=>op.behavior.id),['harvest.world.stage.3.reveal','harvest.celebration','harvest.audio.complete.play']);
 input.harvest.rewardRecipe.variant='seeded';
 const seeded=composeNativeConcept(input);
 assert.deepEqual(composeNativeConcept(input),seeded);
 assert.equal(seeded.recipe.seed,input.harvest.seed);
 assert.equal(seeded.recipe.reviewStatus,'pending');
});

test('essential Harvest UI fits common iOS and Android viewport sizes',async t=>{
 const concept=await createHarvestConcept(),composition=composeNativeConcept(concept);
 const project=applyOperations(emptyProject({id:'harvest-viewports',name:'Harvest viewports'}),composition.operations).project;
 const required=[
  'harvest.brand','harvest.progress','harvest.instruction','harvest.board.shell','harvest.board.lock',
  'harvest.reward.title','harvest.reward.detail','harvest.cta','harvest.cta.label',
 ];
 assert.equal(project.components.some(component=>component.id==='harvest.replay'),false);
 for(const id of ['harvest.board.lock','harvest.reward.title','harvest.reward.detail','harvest.cta'])
  project.components.find(component=>component.id===id).parameters.visible=true;
 const assets=project.assets.map(asset=>({...asset,data:composition.assets.find(source=>source.id===asset.id).data}));
 const html=playableHTML({...project,assets},await runtimeBundle(),{edit:true});
 const folder=await mkdtemp(resolve('reports/harvest-viewports-')),file=resolve(folder,'index.html');
 t.after(()=>rm(folder,{recursive:true,force:true}));
 await writeFile(file,html);
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:700}});
  await page.goto('file://'+file);
  await page.waitForFunction(()=>globalThis.toraRuntime);
  for(const [name,width,height]of [
   ['iPhone SE portrait',375,667],['iPhone SE landscape',667,375],
   ['iPhone 14 portrait',390,844],['iPhone 14 landscape',844,390],
   ['iPhone Pro Max portrait',430,932],['iPhone Pro Max landscape',932,430],
   ['compact Android portrait',360,640],['compact Android landscape',640,360],
   ['tall Android portrait',360,800],['tall Android landscape',800,360],
   ['Pixel portrait',412,915],['Pixel landscape',915,412],
  ]){
   await page.setViewportSize({width,height});
   const audit=await page.evaluate(ids=>globalThis.toraRuntime.auditViewport(ids),required);
   assert.deepEqual(audit.missing,[],name+' missing UI');
   assert.deepEqual(audit.issues,[],name+' clipped UI');
   assert.equal(audit.viewport.landscape,width>height,name+' orientation');
   assert.equal(audit.ok,true,name);
  }
 }finally{await browser.close();}
});

test('swipes resolve crops and automatically restore the persistent farm through rotation and replay',async()=>{
 const {file,concept}=await artifact();
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:700}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('file://'+file);
  const initial=await board(page);
  assert.equal(initial.groups.length,25);assert.ok(initial.legalMoves.length>0);
  const legal=new Set(initial.legalMoves.flatMap(move=>[move.from+'|'+move.to,move.to+'|'+move.from]));
  let wrong;
  for(let row=0;row<5&&!wrong;row++)for(let column=0;column<4;column++){
   const from='harvest.tile.'+row+'.'+column,to='harvest.tile.'+row+'.'+(column+1);
   if(!legal.has(from+'|'+to)){wrong={from,to};break;}
  }
  await swipe(page,wrong);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables['harvest.message']==='Try another swap');
  assert.deepEqual((await board(page)).groups,initial.groups);
  assert.equal((await state(page)).variables['harvest.moves'],0);
  for(let move=1;move<=3;move++){
   const landscape=move>1;
   if(move===2){await page.setViewportSize({width:844,height:390});await page.waitForTimeout(100);}
   const before=await board(page);
   await swipe(page,before.legalMoves[0],landscape);
   await page.waitForFunction(expected=>globalThis.toraRuntime.state().variables['harvest.moves']===expected,move,{timeout:15000});
   const current=await state(page),resolved=current.match.boards['harvest.board'];
   assert.equal(resolved.moves,move);
   assert.ok(resolved.cleared>=move*3);
   assert.equal(current.components['harvest.world.stage.'+move].parameters.visible,true);
   assert.equal(current.components['harvest.flight'].assetId,concept.harvest.tiles[resolved.lastMatch.group]);
   assert.equal(resolved.phase,'idle');
   for(let stage=1;stage<=move;stage++)assert.equal(current.components['harvest.world.stage.'+stage].parameters.visible,true);
  }
  assert.equal((await state(page)).variables['harvest.phase'],'payoff');
  await page.waitForTimeout(600);
  assert.equal((await state(page)).variables['harvest.phase'],'payoff');
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables['harvest.phase']==='cta');
  const complete=await state(page);
  assert.notEqual(complete.components['harvest.puzzle.layout']?.parameters.visible,false);
  assert.equal(complete.components['harvest.board.lock'].parameters.visible,true);
  await page.waitForTimeout(600);
  assert.equal((await state(page)).components['harvest.reward.title'].parameters.visible,true);
  assert.equal((await state(page)).components['harvest.reward.detail'].parameters.visible,true);
  const locked=await board(page);
  const lockedCell=position('harvest.tile.0.0',true);
  await page.mouse.click(lockedCell.x,lockedCell.y);
  await page.waitForTimeout(100);
  assert.equal((await board(page)).selected,null);
  assert.equal((await board(page)).moves,locked.moves);
  await page.evaluate(()=>globalThis.toraRuntime.restart());
  const restarted=await state(page);
  assert.equal(restarted.variables['harvest.moves'],0);
  assert.deepEqual(restarted.match.boards['harvest.board'].groups,initial.groups);
  assert.deepEqual(restarted.diagnostics,[]);assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});

test('idle harvest reaches CTA with the original farm and zero invented rewards',async()=>{
 const {file}=await artifact();
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:700}});
  await page.goto('file://'+file);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables['harvest.phase']==='cta',undefined,{timeout:23000});
  const current=await state(page);
  assert.equal(current.variables['harvest.moves'],0);
  assert.equal(current.components['harvest.board.lock'].parameters.visible,true);
  assert.notEqual(current.components['harvest.puzzle.layout']?.parameters.visible,false);
  assert.equal(current.components['harvest.world.stage.1']?.parameters.visible,undefined);
  assert.deepEqual(current.diagnostics,[]);
 }finally{await browser.close();}
});


test('new v2 composition requires sourced visuals and audio while historical concept hashes remain readable',async()=>{
 const {strategicConcept}=await import('../helpers/native-concept.mjs');
 const source=strategicConcept();
 const unverified=globalThis.structuredClone(source);
 delete unverified.restoration.areas[0].before.provenance;
 assert.doesNotThrow(()=>validateCreativeConcept(unverified));
 assert.match(conceptHash(unverified),/^sha256:/);
 assert.throws(()=>composeNativeConcept(unverified),/E_ASSET_POLICY_PROVENANCE/);
 const silent=globalThis.structuredClone(source);delete silent.restoration.audio;
 assert.doesNotThrow(()=>validateCreativeConcept(silent));
 assert.throws(()=>composeNativeConcept(silent),/E_CONCEPT_AUDIO_REQUIRED/);
});
