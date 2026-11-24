import assert from 'node:assert/strict';
import {mkdir,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL,URL} from 'node:url';
import {build} from 'esbuild';
import {chromium} from 'playwright';
import process from 'node:process';
import {hash} from './compiler.mjs';
import {starSalvageModule,resolveSalvageRoles} from './modules/star-salvage.mjs';
import {createProjectIndex} from './project-index.mjs';

export const SALVAGE_OUTCOME_CHECKER_VERSION='tora-salvage-outcome-audio-1:'+hash(await readFile(new URL(import.meta.url))+await readFile(new URL('./audio-analysis.mjs',import.meta.url))+await readFile(new URL('./modules/star-salvage.mjs',import.meta.url)));
const outcomeTimeoutMs=30_000;
const state=page=>page.evaluate(()=>globalThis.toraRuntime.state());
const project=page=>page.evaluate(()=>JSON.parse(globalThis.document.getElementById('project').textContent));

function tracePlayback(){
 const {AudioBufferSourceNode,BaseAudioContext,GainNode,btoa,document,performance}=globalThis;
 const audioAssets=new Map(),decoded=new WeakMap(),gains=new WeakMap(),started=[];
 globalThis.salvageAudioEvidence=started;
 const decode=BaseAudioContext.prototype.decodeAudioData;
 BaseAudioContext.prototype.decodeAudioData=function(input,success,failure){
  if(!audioAssets.size){
   const current=JSON.parse(document.getElementById('project').textContent);
   for(const asset of current.assets.filter(asset=>asset.mime==='audio/wav'||asset.mime==='audio/mpeg'))audioAssets.set(asset.data,{assetId:asset.id,assetHash:asset.hash});
  }
  const bytes=new Uint8Array(input);let binary='';
  for(let offset=0;offset<bytes.length;offset+=8192)binary+=String.fromCharCode(...bytes.subarray(offset,offset+8192));
  const asset=audioAssets.get(btoa(binary)),tag=buffer=>{if(asset)decoded.set(buffer,asset);return buffer;};
  const result=decode.call(this,input,success&&(buffer=>success(tag(buffer))),failure);
  return result?.then(tag);
 };
 const connect=AudioBufferSourceNode.prototype.connect;
 AudioBufferSourceNode.prototype.connect=function(destination,...options){
  if(destination instanceof GainNode)gains.set(this,destination);
  return connect.call(this,destination,...options);
 };
 const start=AudioBufferSourceNode.prototype.start;
 AudioBufferSourceNode.prototype.start=function(...args){
  const result=start.apply(this,args),asset=decoded.get(this.buffer);
  if(!asset)throw Error('Could not identify the packaged audio buffer');
  const {variables}=globalThis.toraRuntime.state();
  const entry={...asset,loop:this.loop,level:gains.get(this)?.gain.value??0,at:performance.now(),contextState:this.context.state,phase:variables['salvage.phase'],catches:variables['salvage.catches'],hits:variables['salvage.hits']};
  started.push(entry);this.addEventListener('ended',()=>{entry.endedAt=performance.now();},{once:true});return result;
 };
}
function installIdleClock(){
 const requestFrame=globalThis.requestAnimationFrame.bind(globalThis);
 let accelerate=false,offset=0,lastTimestamp;
 globalThis.setSalvageIdleAcceleration=enabled=>{accelerate=enabled;};
 globalThis.requestAnimationFrame=callback=>requestFrame(timestamp=>{
  if(accelerate&&timestamp!==lastTimestamp)offset+=65;
  lastTimestamp=timestamp;callback(timestamp+offset);
 });
}
function stagePoint(page,x,y,playfield=false){
 const {width,height}=page.viewportSize(),landscape=width>height;
 const [stageWidth,stageHeight]=landscape?[700,390]:[390,700],scale=Math.min(width/stageWidth,height/stageHeight);
 const px=playfield&&landscape?345+x*.78:x,py=playfield&&landscape?-155+y*.78:y;
 return {x:(width-stageWidth*scale)/2+px*scale,y:(height-stageHeight*scale)/2+py*scale};
}
async function shipPoint(page){
 const transform=await page.evaluate(()=>globalThis.toraRuntime.state().components['salvage.ship']?.transform??JSON.parse(globalThis.document.getElementById('project').textContent).components.find(item=>item.id==='salvage.ship').transform);
 return stagePoint(page,transform[4]+32,transform[5]+32,true);
}
async function replay(page){
 await page.evaluate(()=>globalThis.toraRuntime.restart());
 await page.waitForFunction(()=>globalThis.toraRuntime.state().variables['salvage.phase']==='first-seconds'&&globalThis.toraRuntime.state().variables['salvage.catches']===0&&globalThis.toraRuntime.state().variables['salvage.hits']===0);
 assert.equal((await state(page)).components['salvage.ship']?.parameters.visible,undefined);
}
async function hostScript(artifact){
 if(artifact.manifest.target!=='unity-ads-ua-playable')return null;
 const host=await build({entryPoints:[new URL('../../../packages/test-harness/src/mraid-host.ts',import.meta.url).pathname],bundle:true,format:'iife',globalName:'MraidHost',write:false,platform:'browser'});
 return host.outputFiles[0].text+';MraidHost.installMraidHost({version:"3.0",state:"default",visible:true});';
}
function expectedCue(current,outcome){
 const resolution=resolveSalvageRoles(createProjectIndex(current)),cue=outcome==='win'?resolution.roles.rewardCue:resolution.roles.timeoutEvent.cue;
 assert.equal(resolution.status,'resolved');assert.ok(cue?.componentId,'Missing authored '+outcome+' cue');
 const component=current.components.find(item=>item.id===cue.componentId),behavior=current.gameplay.find(item=>item.id===cue.behaviorId&&item.kind==='audio');
 assert.ok(component&&behavior,'Missing authored '+outcome+' cue');
 return {componentId:cue.componentId,assetId:component.assetSlots[0].assetId,volume:behavior.parameters.volume};
}
function assertCue(evidence,current,outcome){
 const expected=expectedCue(current,outcome),cue=evidence.started.find(item=>item.assetId===expected.assetId&&(outcome==='win'?item.catches===3&&item.phase==='payoff':item.phase==='cta'&&item.catches<3));
 assert.ok(cue,'Packaged '+outcome+' cue did not play');assert.ok(Math.abs(cue.level-expected.volume)<1e-6);assert.equal(cue.contextState,'running');assert.ok(Number.isFinite(cue.endedAt)&&cue.endedAt>cue.at);
 evidence.outcomeCue=cue;evidence.outcomeAt=cue.at;
}

export async function exerciseSalvageOutcomeAudio(artifact,{outcomes=['win','loss'],evidenceDir,landscape=false,inspectOutcome,accelerateIdle=false,browser:sharedBrowser}={}){
 assert.ok(artifact?.html&&artifact.manifest?.artifactHash===hash(artifact.html));
 assert.ok(outcomes.length>0&&outcomes.every(outcome=>['win','loss'].includes(outcome)));
 const folder=await mkdtemp(join(tmpdir(),'tora-salvage-playback-')),file=join(folder,'index.html'),evidence={runs:[]};
 let browser,context;
 try{
  await writeFile(file,artifact.html);if(evidenceDir)await mkdir(evidenceDir,{recursive:true});
  browser=sharedBrowser??await chromium.launch();
  const viewport=landscape?{width:844,height:390}:{width:390,height:700};
  context=await browser.newContext({viewport,isMobile:true,hasTouch:true,...(evidenceDir?{recordVideo:{dir:evidenceDir,size:viewport}}:{})});
  const externalRequests=[];await context.route(/^https?:/,route=>{externalRequests.push(route.request().url());return route.abort();});
  const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(tracePlayback);const useIdleClock=accelerateIdle&&!evidenceDir&&outcomes.includes('loss');
  if(useIdleClock)await page.addInitScript(installIdleClock);
  const unityHost=await hostScript(artifact);if(unityHost)await page.addInitScript(unityHost);
  await page.goto(pathToFileURL(file).href);await page.waitForFunction(()=>globalThis.toraRuntime?.state().network.ready);
  assert.equal((await state(page)).variables['salvage.catches'],0);assert.deepEqual(await page.evaluate(()=>globalThis.salvageAudioEvidence),[]);
  const current=await project(page);
  for(const [index,outcome]of outcomes.entries()){
   if(index){await replay(page);await page.evaluate(()=>{globalThis.salvageAudioEvidence.length=0;});}
   if(outcome==='win'){
    const result=await starSalvageModule.qa.playToEndCard(page,current);assert.equal(result.available,true);
   }else{
    await starSalvageModule.qa.prepareTimeout(page,current);
    if(useIdleClock){await page.waitForFunction(()=>globalThis.toraRuntime.state().audio.state==='running');await page.evaluate(()=>globalThis.setSalvageIdleAcceleration(true));}
    await page.waitForFunction(()=>globalThis.toraRuntime.state().variables['salvage.phase']==='cta',undefined,{timeout:outcomeTimeoutMs});
    if(useIdleClock)await page.evaluate(()=>globalThis.setSalvageIdleAcceleration(false));
   }
   await page.waitForTimeout(450);
   await page.waitForFunction(assetId=>globalThis.salvageAudioEvidence.some(cue=>cue.assetId===assetId&&Number.isFinite(cue.endedAt)),expectedCue(current,outcome).assetId,{timeout:10000});
   const finished=await state(page);assert.equal(starSalvageModule.qa.validateTimeout(finished),outcome==='loss');
   assert.equal(finished.variables['salvage.catches'],outcome==='win'?3:0);assert.equal(finished.audio.state,'running');assert.deepEqual(finished.diagnostics,[]);
   const {started,now}=await page.evaluate(()=>({started:globalThis.salvageAudioEvidence,now:globalThis.performance.now()}));
   evidence[outcome]={catches:finished.variables['salvage.catches'],hits:finished.variables['salvage.hits'],started,outcomeAt:now};
   assertCue(evidence[outcome],current,outcome);
   if(inspectOutcome)evidence[outcome].layout=await inspectOutcome(page,outcome);
   evidence.runs.push({outcome,...evidence[outcome]});
   if(evidenceDir)await page.screenshot({path:join(evidenceDir,outcome+(outcomes.slice(0,index).includes(outcome)?'-replay-'+index:'')+'.png')});
  }
  if(outcomes.includes('win')&&outcomes.includes('loss'))assert.notEqual(evidence.win.outcomeCue.assetHash,evidence.loss.outcomeCue.assetHash);
  assert.deepEqual(errors,[]);assert.deepEqual(externalRequests,[]);evidence.errors=errors;evidence.externalRequests=externalRequests;
  if(evidenceDir)evidence.video=await page.video().path();
  return evidence;
 }finally{await context?.close();if(!sharedBrowser)await browser?.close();await rm(folder,{recursive:true,force:true});}
}

async function followInstance(page,prefix,variable){
 const before=(await state(page)).variables[variable],deadline=Date.now()+15000;
 while(Date.now()<deadline){
  const target=await page.evaluate(prefix=>{
   const instances=globalThis.toraRuntime.state().instances.filter(item=>item.prototypeId.startsWith(prefix)).sort((a,b)=>b.y-a.y),item=instances[0];
   return item?{x:item.x+24,prototypeId:item.prototypeId}:null;
  },prefix);
  if(target){const ship=await shipPoint(page),point=stagePoint(page,target.x,592,true);await page.mouse.move(point.x,ship.y,{steps:2});}
  await page.waitForTimeout(35);
  if((await state(page)).variables[variable]>before)return;
 }
 throw Error('Did not contact '+prefix);
}
async function capturePackaged(artifact,output,browser){
 const evidenceDir=resolve(output,'evidence'),videoDir=resolve(output,'video');await mkdir(evidenceDir,{recursive:true});await mkdir(videoDir,{recursive:true});
 const folder=await mkdtemp(join(tmpdir(),'tora-salvage-check-')),file=join(folder,'index.html');await writeFile(file,artifact.html);
 const context=await browser.newContext({viewport:{width:390,height:700},isMobile:true,hasTouch:true,recordVideo:{dir:videoDir,size:{width:390,height:700}}});
 const externalRequests=[];await context.route(/^https?:/,route=>{externalRequests.push(route.request().url());return route.abort();});
 const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));await page.addInitScript(tracePlayback);
 const screen=async name=>page.screenshot({path:resolve(evidenceDir,name+'.png')});
 try{
  await page.goto(pathToFileURL(file).href);await page.waitForFunction(()=>globalThis.toraRuntime?.state().network.ready);await page.waitForTimeout(120);await screen('opening');
  const current=await project(page),from=await shipPoint(page);await page.mouse.move(from.x,from.y);await page.mouse.down();
  let point=stagePoint(page,-80,592,true);await page.mouse.move(point.x,from.y,{steps:3});
  assert.ok((await state(page)).components['salvage.ship'].transform[4]<=30);await screen('drag-clamp-left');
  point=stagePoint(page,500,592,true);await page.mouse.move(point.x,from.y,{steps:3});
  assert.ok((await state(page)).components['salvage.ship'].transform[4]>=300);await screen('drag-clamp-right');
  await followInstance(page,'salvage.core','salvage.catches');assert.equal((await state(page)).variables['salvage.catches'],1);await screen('first-catch');
  await followInstance(page,'salvage.hazard','salvage.hits');await screen('meteor-recovery');
  assert.ok((await state(page)).variables['salvage.hits']>=1);assert.equal((await state(page)).components['salvage.ship'].parameters.visible,undefined);
  while((await state(page)).variables['salvage.catches']<3)await followInstance(page,'salvage.core','salvage.catches');
  await page.mouse.up();assert.equal((await state(page)).variables['salvage.phase'],'payoff');await screen('warp-payoff');
  await page.waitForFunction(()=>globalThis.toraRuntime.state().variables['salvage.phase']==='cta');await page.waitForTimeout(400);await screen('win');
  const win=await state(page);assert.equal(win.components['salvage.ship'].parameters.visible,false);
  for(const viewport of [{width:320,height:568},{width:768,height:1024},{width:844,height:390}]){
   await page.setViewportSize(viewport);await page.waitForTimeout(100);await screen(viewport.width+'x'+viewport.height+'-win');
  }
  await replay(page);await screen('replay');await page.evaluate(()=>{globalThis.salvageAudioEvidence.length=0;});
  await starSalvageModule.qa.prepareTimeout(page,current);await page.waitForFunction(()=>globalThis.toraRuntime.state().variables['salvage.phase']==='cta',undefined,{timeout:outcomeTimeoutMs});await page.waitForTimeout(400);await screen('timeout');
  const loss=await state(page);assert.equal(starSalvageModule.qa.validateTimeout(loss),true);assert.equal(loss.variables['salvage.catches'],0);
  await page.waitForFunction(assetId=>globalThis.salvageAudioEvidence.some(cue=>cue.assetId===assetId&&Number.isFinite(cue.endedAt)),expectedCue(current,'loss').assetId,{timeout:10000});
  const started=await page.evaluate(()=>globalThis.salvageAudioEvidence),audio={loss:{started}};assertCue(audio.loss,current,'loss');
  for(const viewport of [{width:390,height:700},{width:320,height:568},{width:768,height:1024},{width:844,height:390}]){
   await page.setViewportSize(viewport);await page.waitForTimeout(100);await screen(viewport.width+'x'+viewport.height+'-timeout');
  }
  assert.deepEqual(loss.diagnostics,[]);assert.deepEqual(errors,[]);assert.deepEqual(externalRequests,[]);
  const observed={sourceRevision:artifact.manifest.sourceRevision,artifactHash:artifact.manifest.artifactHash,video:await page.video().path(),win,timeout:loss,audio,errors,externalRequests,checks:['real pointer drag and both clamps','first core catch and persistent station stage','meteor hit and recoverable shield feedback','third catch warp payoff','distinct timeout with zero catches','packaged replay reset','four viewport win and timeout inspection','actual decoded WAV identity and gain','no external requests, page errors or runtime diagnostics']};
  await writeFile(resolve(output,'observed-state.json'),JSON.stringify(observed,null,2)+'\n');return observed;
 }finally{await context.close();await rm(folder,{recursive:true,force:true});}
}

async function main(){
 const output=resolve(process.argv[2]??'reports/star-salvage'),manifest=JSON.parse(await readFile(resolve(output,'manifest.json'),'utf8')),html=await readFile(resolve(output,'playable.html'),'utf8');
 assert.equal(manifest.artifactHash,hash(html));const artifact={html,manifest},browser=await chromium.launch();
 try{
  await capturePackaged(artifact,output,browser);
  const evidence=await exerciseSalvageOutcomeAudio(artifact,{browser,evidenceDir:resolve(output,'outcome-evidence'),accelerateIdle:false});
  await writeFile(resolve(output,'outcome-audio.json'),JSON.stringify(evidence,null,2)+'\n');
 }finally{await browser.close();}
 process.stdout.write('Star Salvage packaged drag, catches, meteor recovery, outcomes, replay, audio and isolation checks passed.\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
