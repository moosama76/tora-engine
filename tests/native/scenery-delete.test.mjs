import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {dingDangOperations} from '../../scripts/lean/native/author-games.mjs';
import {emptyProject,applyOperations,graph} from '../../scripts/lean/native/document.mjs';
import {mountNative} from '../../scripts/lean/native/runtime.mjs';

async function rescueAssets(){
 const receipt=JSON.parse(await readFile('assets/free-audio/casual-warm/audio-conversion.json','utf8'));
 return Promise.all(Object.entries({'asset.music':'ambient','asset.reward':'reward','asset.reject':'reject','asset.win':'win','asset.loss':'loss'}).map(async([id,role])=>{
  const cue=receipt.cues.find(row=>row.role===role),bytes=await readFile(cue.outputFile);
  return {id,mime:'audio/wav',data:bytes.toString('base64'),rights:`CC0 ${cue.sourceId}; ${cue.outputSha256}`,bytes:bytes.length,hash:'sha256:'+createHash('sha256').update(bytes).digest('hex')};
 }));
}
async function rescueProject(){
 let project=emptyProject({id:'scenery-delete-proof',name:'Scenery deletion proof'});
 project=applyOperations(project,(await rescueAssets()).map(({id,mime,rights,bytes,hash})=>({kind:'registerAsset',asset:{id,mime,rights,bytes,hash}}))).project;
 const operations=dingDangOperations();for(let i=0;i<operations.length;i+=256)project=applyOperations(project,operations.slice(i,i+256)).project;
 return project;
}
function removeScenery(project){return applyOperations(project,[{kind:'deleteComponent',ids:['team.aura','smoke','fire.0.glow','sun.glow','building.antenna.glow'],mode:'subtree'}]);}
function runCatch(project,type){
 const catcher=graph(project).world('trampoline');
 project=applyOperations(project,[{kind:'putBinding',binding:{id:'test.immediate.spawn',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'spawn',prototypeId:'prototype.'+type,x:catcher[4]+20,y:catcher[5]-20}]}}]).project;
 const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};let frame;
 set('requestAnimationFrame',fn=>{frame=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){}});set('devicePixelRatio',1);set('Path2D',class{constructor(){return new Proxy({},{get:()=>()=>{}});}});
 const context=new Proxy({globalAlpha:1},{get:(target,key)=>key in target?target[key]:()=>{}}),canvas={clientWidth:390,clientHeight:700,getContext:()=>context,addEventListener(){},removeEventListener(){}};let runtime;
 try{runtime=mountNative(project,canvas);for(let i=0;i<30;i++)frame(100+i*1000/60);return runtime.state();}finally{runtime?.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}
}

test('deleting optional rescue scenery preserves scoring, despawn and unrelated ambient actions',async()=>{
 const original=await rescueProject(),{project}=removeScenery(original);
 assert.equal(project.components.some(c=>c.id==='team.aura'),false);
 assert.equal(project.gameplay.some(b=>b.id==='rescue.aura'),false);
 for(const type of ['resident','cat']){
  const before=original.eventBindings.find(b=>b.id==='prototype.'+type+'.catch'),after=project.eventBindings.find(b=>b.id===before.id);
  assert.ok(after,'Catch binding survives deleting its optional aura effect');
  assert.equal(after.eventId,before.eventId);assert.deepEqual(after.actions,before.actions.filter(a=>a.behaviorId!=='rescue.aura'));
 }
 const ambient=original.eventBindings.find(b=>b.actions.some(a=>a.behaviorId==='ambient.antenna'));
 const preserved=project.eventBindings.find(b=>b.id===ambient.id);assert.ok(preserved,'Removing a glow must not discard unrelated scene-entry effects');
 assert.deepEqual(preserved.actions,ambient.actions.filter(a=>!a.behaviorId||project.gameplay.some(b=>b.id===a.behaviorId)));
 assert.deepEqual(project.eventBindings.find(b=>b.id==='goal').condition,original.eventBindings.find(b=>b.id==='goal').condition);
});

test('residents and cats still collide, score and despawn after deleting glow and smoke',async()=>{
 const original=await rescueProject(),edited=removeScenery(original).project;
 for(const [type,points]of [['resident',1],['cat',2]])for(const project of [original,edited]){const state=runCatch(project,type);assert.equal(state.variables.score,points,type+' awards score');assert.equal(state.variables.mistakes,0);assert.equal(state.instances.length,0,type+' despawns after catch');assert.deepEqual(state.diagnostics,[]);}
});

test('packaged rescue still catches through real pointer drag after scenery deletion',async()=>{
 const {mkdir,mkdtemp,writeFile}=await import('node:fs/promises'),{resolve}=await import('node:path'),{pathToFileURL}=await import('node:url'),{chromium}=await import('playwright'),{compileNative}=await import('../../scripts/lean/native/compiler.mjs');
 const project=removeScenery(await rescueProject()).project,assets=await rescueAssets(),artifact=await compileNative(project,{assets:project.assets.map(asset=>({...asset,data:assets.find(candidate=>candidate.id===asset.id).data}))});
 await mkdir('reports',{recursive:true});const output=await mkdtemp(resolve('reports/scenery-delete-')),file=resolve(output,'playable.html');await writeFile(file,artifact.html);
 const browser=await chromium.launch(),context=await browser.newContext({viewport:{width:650,height:840},recordVideo:{dir:resolve(output,'video'),size:{width:650,height:840}}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto(pathToFileURL(file).href);await page.waitForFunction(()=>globalThis.toraRuntime?.state().instances.length>0);
  const canvas=await page.locator('canvas').boundingBox(),scale=Math.min(canvas.width/390,canvas.height/700),offsetX=canvas.x+(canvas.width-390*scale)/2,offsetY=canvas.y+(canvas.height-700*scale)/2;
  const catcher=graph(project).world('trampoline');await page.mouse.move(offsetX+(catcher[4]+44)*scale,offsetY+(catcher[5]+12)*scale);await page.mouse.down();
  const deadline=Date.now()+8000;let caught;
  while(Date.now()<deadline){const state=await page.evaluate(()=>globalThis.toraRuntime.state());if(state.variables.score>=1){caught=state;break;}const resident=state.instances.find(i=>i.prototypeId==='prototype.resident');if(resident)await page.mouse.move(offsetX+(resident.x+14)*scale,offsetY+(catcher[5]+12)*scale);await page.waitForTimeout(50);}
  await page.mouse.up();assert.ok(caught,'Real pointer movement catches the scheduled resident');assert.equal(caught.variables.mistakes,0);assert.ok(!caught.instances.some(i=>i.prototypeId==='prototype.resident'));assert.deepEqual(caught.diagnostics,[]);assert.deepEqual(errors,[]);await page.screenshot({path:resolve(output,'caught-after-scenery-delete.png')});await writeFile(resolve(output,'result.json'),JSON.stringify({status:'PASS',artifactHash:artifact.manifest.artifactHash,state:caught,errors},null,2));globalThis.console.log('Scenery deletion browser evidence: '+output);
 }finally{await context.close();await browser.close();}
});
