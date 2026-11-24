import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {Buffer} from 'node:buffer';
import {setTimeout} from 'node:timers';
import {
 CREATIVE_QA_FORMAT,DEFAULT_VIEWPORTS,runStaticPreflight,formatCreativeQaReport,
 formatCreativeQaReportJson,runBrowserQa,runCli,
} from '../../scripts/lean/native/creative-qa.mjs';

const safeAnalysis={durationSec:.5,peakDbfs:-6,rmsDbfs:-18,clipping:false,clippedSamples:0,leadingSilenceSec:0,trailingSilenceSec:0,trimmedDurationSec:.5};
const safeWav=()=>safeAnalysis;
function project(){
 return {
  base:{width:390,height:700,startScene:'scene.play'},
  scenes:[{id:'scene.play',label:'Play',role:'interactive'}],
  components:[],assets:[],gameplay:[],events:[],eventBindings:[],variables:[],
 };
}
function audioProject(routes){
 const result=project();
 for(const route of routes){
  const assetId=route.assetId??`asset.${route.id}`;
  result.components.push({id:`component.${route.id}`,contract:'native.group.v1',sceneId:'scene.play',transform:[1,0,0,1,0,0],parameters:{width:1,height:1,visible:false},assetSlots:[{slotId:'source',assetId}]});
  if(!result.assets.some(asset=>asset.id===assetId))result.assets.push({id:assetId,mime:'audio/wav',data:Buffer.from([route.byte??1]).toString('base64'),hash:route.hash??`sha256:${assetId.padEnd(64,'0').slice(0,64)}`,...(route.provenance?{provenance:route.provenance}:{})});
  result.gameplay.push({id:route.id,componentId:`component.${route.id}`,kind:'audio',parameters:{volume:.1,...route.parameters}});
 }
 return result;
}
function kinds(report,severity='blockers'){return report[severity].map(defect=>defect.defectKind);}
async function temporaryDirectory(t){
 const directory=await mkdtemp(resolve('reports/creative-qa-test-'));
 t.after(()=>rm(directory,{recursive:true,force:true}));
 return directory;
}
function interactiveProject(){
 const result=project();
 result.components.push({id:'generic.primary',contract:'native.button.v1',sceneId:'scene.play',order:0,transform:[1,0,0,1,100,250],parameters:{width:160,height:80,visible:true,enabled:true}});
 result.events.push({id:'generic.primary.click',kind:'click',componentId:'generic.primary'});
 result.eventBindings.push({id:'generic.primary.feedback',eventId:'generic.primary.click',actions:[{kind:'add',variableId:'score',value:1}]});
 result.variables.push({id:'score',type:'number',initial:0});
 return result;
}
function mockBrowser({mode='state',audit=true,supportedStates=[],layoutDefect}={}){
 const sessions=[];
 const adapter={
  async createSession(){
   let score=0,viewport=DEFAULT_VIEWPORTS[0];
   const session={
    async setViewport(value){viewport=value;},
    async load(){score=0;},
    async screenshot(){return Buffer.from(`${viewport.width}x${viewport.height}:${score}`);},
    async auditLayout(){return audit?{defects:layoutDefect?[layoutDefect]:[],missing:[]}:null;},
    async getState(){return {score:mode==='visual'?0:score,time:100};},
    async getPrimaryTarget(){return {componentId:'generic.primary',x:100,y:100};},
    async click(){
     if(mode==='timeout'){const error=Error('Pointer action timed out');error.name='TimeoutError';throw error;}
     if(mode==='zero')return;
     if(mode==='late')await new Promise(resolveDelay=>setTimeout(resolveDelay,170));
     score++;
    },
    async enterState(state){return supportedStates.includes(state);},
    async close(){session.closed=true;},
   };
   sessions.push(session);return session;
  },
 };
 return {adapter,sessions};
}

test('missing audio assets and disallowed oscillator fallback are separate blockers',async()=>{
 const fixture=audioProject([{id:'audio.tap',assetId:'asset.absent',parameters:{allowSynthFallback:false}}]);
 fixture.assets=[];
 const report=await runStaticPreflight(fixture,{catalog:null});
 assert.deepEqual(kinds(report),['audio-asset-missing','audio-synth-fallback-disallowed']);
 for(const defect of report.blockers){
  assert.equal(defect.componentId,'component.audio.tap');assert.equal(defect.viewport,null);assert.ok(defect.remediation);
 }
 fixture.gameplay[0].parameters.allowSynthFallback=true;
 const allowed=await runStaticPreflight(fixture,{catalog:null});
 assert.deepEqual(kinds(allowed),['audio-asset-missing']);
});

test('identical win and loss asset hashes are blocked even on different components',async()=>{
 const shared='sha256:'+'a'.repeat(64);
 const report=await runStaticPreflight(audioProject([
  {id:'audio.success',assetId:'asset.shared',hash:shared},
  {id:'audio.failure',assetId:'asset.shared',hash:shared},
 ]),{catalog:null,analyzeWav:safeWav});
 const defect=report.blockers.find(row=>row.defectKind==='audio-win-loss-duplicate');
 assert.ok(defect);assert.match(defect.metrics.assetHash,/^sha256:[a-f0-9]{64}$/);assert.notEqual(defect.metrics.assetHash,shared);
 assert.deepEqual(defect.relatedComponentIds,['component.audio.failure','component.audio.success']);
});

test('catalog role and valence checks use event and binding outcome semantics',async()=>{
 const catalog={sources:[{id:'pack',files:[
  {path:'loss.wav',sha256:'sha256:'+'b'.repeat(64),audioMeta:{roles:['loss'],valence:'negative'}},
  {path:'win.wav',sha256:'sha256:'+'c'.repeat(64),audioMeta:{roles:['win'],valence:'negative'}},
 ]}]};
 const fixture=audioProject([
  {id:'cue.one',assetId:'asset.loss',hash:'sha256:'+'b'.repeat(64),provenance:{sourceId:'pack',sourceFile:'loss.wav'}},
  {id:'cue.two',assetId:'asset.win',hash:'sha256:'+'c'.repeat(64),provenance:{sourceId:'pack',sourceFile:'win.wav'}},
 ]);
 fixture.scenes.push({id:'scene.victory',label:'Victory',role:'end-card'});
 fixture.events.push({id:'victory.enter',kind:'sceneEnter',sceneId:'scene.victory'});
 fixture.eventBindings.push(
  {id:'victory.sound.one',eventId:'victory.enter',actions:[{kind:'playAudio',behaviorId:'cue.one'}]},
  {id:'victory.sound.two',eventId:'victory.enter',actions:[{kind:'playAudio',behaviorId:'cue.two'}]},
 );
 const report=await runStaticPreflight(fixture,{catalog,analyzeWav:safeWav});
 const role=report.blockers.find(row=>row.defectKind==='audio-role-mismatch');
 const valence=report.blockers.find(row=>row.defectKind==='audio-valence-mismatch'&&row.componentId==='component.cue.two');
 assert.equal(role.componentId,'component.cue.one');assert.equal(role.metrics.expectedRole,'win');
 assert.equal(valence.componentId,'component.cue.two');assert.deepEqual(valence.metrics.catalogValence,'negative');
});

test('legacy complete IDs yield to timeout bindings while explicit and ambient roles remain authoritative',async()=>{
 const catalog={sources:[{id:'pack',files:[
  {path:'complete.wav',sha256:'sha256:'+'d'.repeat(64),audioMeta:{roles:['loss'],valence:'negative'}},
  {path:'ambient.wav',sha256:'sha256:'+'e'.repeat(64),audioMeta:{roles:['ambient'],valence:'neutral'}},
  {path:'forced.wav',sha256:'sha256:'+'f'.repeat(64),audioMeta:{roles:['win'],valence:'positive'}},
 ]}]};
 const fixture=audioProject([
  {id:'harvest.audio.complete.play',assetId:'asset.complete',byte:1,hash:'sha256:'+'d'.repeat(64),provenance:{sourceId:'pack',sourceFile:'complete.wav'}},
  {id:'audio.ambient',assetId:'asset.ambient',byte:2,hash:'sha256:'+'e'.repeat(64),provenance:{sourceId:'pack',sourceFile:'ambient.wav'}},
  {id:'explicit.complete',assetId:'asset.forced',byte:3,hash:'sha256:'+'f'.repeat(64),provenance:{sourceId:'pack',sourceFile:'forced.wav'},parameters:{role:'win'}},
 ]);
 fixture.events.push({id:'harvest.deadline.tick',kind:'timer'});
 fixture.eventBindings.push({id:'harvest.deadline.cta',eventId:'harvest.deadline.tick',actions:fixture.gameplay.map(behavior=>({kind:'playAudio',behaviorId:behavior.id}))});
 const report=await runStaticPreflight(fixture,{catalog,analyzeWav:safeWav});
 assert.deepEqual(report.blockers,[],JSON.stringify(report.blockers));
});

test('mix hierarchy rejects every inversion of music <= sfx <= stinger',async()=>{
 const report=await runStaticPreflight(audioProject([
  {id:'music',parameters:{bus:'music',volume:.5}},
  {id:'effect',parameters:{bus:'sfx',volume:.4}},
  {id:'outcome',parameters:{bus:'stinger',volume:.3}},
 ]),{catalog:null,analyzeWav:safeWav});
 const defects=report.blockers.filter(row=>row.defectKind==='audio-mix-hierarchy');
 assert.equal(defects.length,3);
 assert.ok(defects.every(row=>row.remediation.includes('music <= sfx <= stinger')));
});

test('WAV analysis receives bytes and reports clipping, silence, and excessive trim',async()=>{
 const seen=[];
 const report=await runStaticPreflight(audioProject([
  {id:'clipped',byte:1},{id:'silent',byte:2},{id:'padded',byte:3},
 ]),{catalog:null,analyzeWav:bytes=>{
  seen.push([...bytes]);
  if(bytes[0]===1)return {...safeAnalysis,clipping:true,clippedSamples:4,peakDbfs:0};
  if(bytes[0]===2)return {...safeAnalysis,rmsDbfs:-Infinity,peakDbfs:-Infinity,trimmedDurationSec:0};
  return {...safeAnalysis,leadingSilenceSec:.4,trailingSilenceSec:.5};
 }});
 assert.deepEqual(seen.sort(),[[1],[2],[3]]);
 assert.ok(kinds(report).includes('audio-clipping'));assert.ok(kinds(report).includes('audio-silence'));
 assert.ok(kinds(report,'warnings').includes('audio-leading-silence'));assert.ok(kinds(report,'warnings').includes('audio-trailing-silence'));
});

test('falling pitch contour on a win event is blocked even without catalog metadata',async()=>{
 const report=await runStaticPreflight(audioProject([{id:'audio.win',byte:1}]),{
  catalog:null,analyzeWav:()=>({...safeAnalysis,pitchContour:'falling',startHz:333,endHz:260}),
 });
 assert.ok(kinds(report).includes('audio-contour-mismatch'));
});

test('pixel text rejects unsupported static and dynamically assigned glyphs but ignores interpolation syntax',()=>{
 const fixture=project();
 fixture.components.push({id:'label',contract:'native.text.v1',sceneId:'scene.play',parameters:{fontFamily:'pixel',text:'HELLO {{score}} ✦ @'}});
 fixture.eventBindings.push({id:'copy',eventId:'event',actions:[{kind:'setComponent',componentId:'label',key:'text',value:'OK #'}]});
 return runStaticPreflight(fixture,{catalog:null}).then(report=>{
  const defects=report.blockers.filter(row=>row.defectKind==='pixel-text-unsupported-character');
  assert.equal(defects.length,2);
  assert.deepEqual(defects.find(row=>row.metrics.unsupported.includes('#')).metrics.unsupported,['#']);
  assert.deepEqual(defects.find(row=>row.metrics.unsupported.includes('✦')).metrics.unsupported,['@','✦']);
 });
});

test('report formatting is deterministic and every defect retains the integration fields',()=>{
 const first=formatCreativeQaReport({blockers:[{severity:'blocker',defectKind:'z-defect',componentId:'z',remediation:'Fix Z'},{severity:'blocker',defectKind:'a-defect',componentId:null,remediation:'Fix A'}]});
 const second=formatCreativeQaReport({blockers:[{remediation:'Fix A',componentId:undefined,defectKind:'a-defect',severity:'blocker'},{remediation:'Fix Z',componentId:'z',defectKind:'z-defect',severity:'blocker'}]});
 assert.equal(formatCreativeQaReportJson(first),formatCreativeQaReportJson(second));
 assert.equal(first.format,CREATIVE_QA_FORMAT);assert.equal(first.ok,false);
 assert.deepEqual(kinds(first),['a-defect','z-defect']);
 for(const defect of first.blockers)assert.deepEqual(Object.keys(defect).sort(),['componentId','defectKind','remediation','severity','viewport']);
});

test('mock browser runner reuses one session, writes deterministic artifacts, and skips unsupported states honestly',async t=>{
 const output=await temporaryDirectory(t),{adapter,sessions}=mockBrowser();
 const html='<html><script type="application/json" id="project">'+JSON.stringify(interactiveProject())+'</script></html>';
 const report=await runBrowserQa({html,outputDir:output,browserAdapter:adapter});
 assert.equal(report.ok,true);assert.equal(sessions.length,1);assert.equal(sessions[0].closed,true);
 assert.equal(report.screenshots.length,8);assert.equal(report.interactions.length,4);
 assert.ok(report.interactions.every(row=>row.within150Ms&&row.deltaType==='state'&&row.componentId==='generic.primary'));
 assert.deepEqual(report.summary.checkedStates,['opening','after-first-input']);
 assert.deepEqual(report.summary.skippedStates,['end-card','timeout']);
 assert.ok(report.states.filter(row=>row.status==='skipped').every(row=>row.reason==='state-hook-not-supplied'));
 const disk=JSON.parse(await readFile(resolve(output,'report.json'),'utf8'));
 assert.deepEqual(disk,report);
 assert.equal((await readFile(resolve(output,'screenshots/320x568-opening.png'))).toString(),'320x568:0');
});

test('screenshot delta satisfies liveness when meaningful state remains unchanged',async t=>{
 const output=await temporaryDirectory(t),{adapter}=mockBrowser({mode:'visual'});
 const report=await runBrowserQa({html:'<html></html>',project:interactiveProject(),outputDir:output,browserAdapter:adapter});
 assert.equal(report.ok,true);
 assert.ok(report.interactions.every(row=>row.within150Ms&&row.deltaType==='screenshot'));
});

test('mock browser zero delta and action timeout remain blockers at every viewport',async t=>{
 for(const [mode,defectKind]of [['zero','interaction-zero-delta'],['timeout','interaction-timeout']]){
  const output=await temporaryDirectory(t),{adapter}=mockBrowser({mode});
  const report=await runBrowserQa({html:'<html></html>',project:interactiveProject(),outputDir:output,browserAdapter:adapter});
  const defects=report.blockers.filter(row=>row.defectKind===defectKind);
  assert.equal(defects.length,4);assert.equal(report.ok,false);
  assert.ok(defects.every(row=>row.componentId==='generic.primary'&&row.metrics.limitMs===150));
 }
});

test('a response arriving after 150 ms cannot pass merely because it eventually changes state',async t=>{
 const output=await temporaryDirectory(t),{adapter}=mockBrowser({mode:'late'});
 const report=await runBrowserQa({html:'<html></html>',project:interactiveProject(),outputDir:output,browserAdapter:adapter});
 const defects=report.blockers.filter(row=>row.defectKind==='interaction-timeout');
 assert.equal(defects.length,4);assert.ok(report.interactions.every(row=>!row.within150Ms));
});

test('browser layout audits only active-scene non-prototype components',async t=>{
 const output=await temporaryDirectory(t),fixture=interactiveProject(),audits=[];
 fixture.components.push(
  {id:'other.scene.button',contract:'native.button.v1',sceneId:'scene.other',parameters:{width:20,height:20,visible:true}},
  {id:'prototype.button',contract:'native.button.v1',sceneId:'scene.play',prototype:true,parameters:{width:20,height:20,visible:true}},
  {id:'prototype.button.child',contract:'native.text.v1',sceneId:'scene.play',parentId:'prototype.button',parameters:{width:20,height:20,visible:true,text:'Prototype'}},
 );
 fixture.events.push({id:'other.scene.click',kind:'click',componentId:'other.scene.button'});
 const {adapter}=mockBrowser(),original=adapter.createSession;
 adapter.createSession=async(...args)=>{
  const session=await original(...args),audit=session.auditLayout;
  session.auditLayout=async options=>{audits.push(options);return audit(options);};
  return session;
 };
 const report=await runBrowserQa({html:'<html></html>',project:fixture,outputDir:output,browserAdapter:adapter});
 assert.equal(report.ok,true);assert.ok(audits.length>0);
 for(const audit of audits){
  assert.deepEqual(audit.ids,['generic.primary']);assert.deepEqual(audit.interactiveIds,['generic.primary']);
 }
});

test('runtime layout defect severities cannot downgrade mandatory layout gates',async t=>{
 const output=await temporaryDirectory(t),{adapter}=mockBrowser({layoutDefect:{kind:'touch-target-small',severity:'warning',id:'generic.primary',detail:'24 px target'}});
 const report=await runBrowserQa({html:'<html></html>',project:interactiveProject(),outputDir:output,browserAdapter:adapter});
 const defects=report.blockers.filter(row=>row.defectKind==='touch-target-small');
 assert.equal(defects.length,8);assert.ok(defects.every(row=>row.componentId==='generic.primary'&&row.remediation.includes('44')));
});

test('a generic state hook captures only states it actually supports',async t=>{
 const output=await temporaryDirectory(t),{adapter}=mockBrowser({supportedStates:['end-card']});
 const report=await runBrowserQa({html:'<html></html>',project:interactiveProject(),outputDir:output,browserAdapter:adapter,stateHook:'globalThis.qaState'});
 assert.equal(report.screenshots.filter(row=>row.state==='end-card').length,4);
 assert.equal(report.screenshots.filter(row=>row.state==='timeout').length,0);
 assert.deepEqual(report.summary.checkedStates,['opening','after-first-input','end-card']);
 assert.deepEqual(report.summary.skippedStates,['timeout']);
 assert.ok(report.states.filter(row=>row.state==='timeout').every(row=>row.status==='unavailable'));
 const rerun=mockBrowser();
 await runBrowserQa({html:'<html></html>',project:interactiveProject(),outputDir:output,browserAdapter:rerun.adapter});
 await assert.rejects(readFile(resolve(output,'screenshots/320x568-end-card.png')),{code:'ENOENT'});
});

test('CLI returns nonzero for blockers and zero for a clean static project',async t=>{
 const output=await temporaryDirectory(t),bad=audioProject([{id:'audio.tap',assetId:'asset.missing'}]);bad.assets=[];
 const badPath=resolve(output,'bad.json'),goodPath=resolve(output,'good.json');
 await writeFile(badPath,JSON.stringify(bad));await writeFile(goodPath,JSON.stringify(project()));
 const quiet={log(){},error(){}};
 assert.equal(await runCli(['--project',badPath,'--output',resolve(output,'bad-report'),'--static'],quiet),1);
 assert.equal(await runCli(['--project',goodPath,'--output',resolve(output,'good-report'),'--static'],quiet),0);
 assert.equal(JSON.parse(await readFile(resolve(output,'bad-report/report.json'),'utf8')).ok,false);
});

test('static preflight blocks pixel-confetti in non-pixel visual styles and permits matched styles',async()=>{
 const vector=project();
 vector.components.push({id:'hero',contract:'native.image.v1',sceneId:'scene.play',parameters:{width:100,height:100,smoothing:true}});
 vector.gameplay.push({id:'burst',componentId:'hero',kind:'emitter',parameters:{shape:'pixel-confetti',count:24,color:'#ffd166',speed:120}});
 const blocked=await runStaticPreflight(vector,{catalog:null});
 assert.equal(blocked.ok,false);
 assert.ok(kinds(blocked).includes('particle-style-clash'));
 vector.gameplay[0].parameters.shape='circle';
 const matched=await runStaticPreflight(vector,{catalog:null});
 assert.ok(!kinds(matched).includes('particle-style-clash'));
 const pixel=project();
 pixel.components.push({id:'hero',contract:'native.image.v1',sceneId:'scene.play',parameters:{width:100,height:100,smoothing:false}});
 pixel.gameplay.push({id:'burst',componentId:'hero',kind:'emitter',parameters:{shape:'pixel-confetti',count:24,color:'#ffd166',speed:120}});
 assert.ok(!kinds(await runStaticPreflight(pixel,{catalog:null})).includes('particle-style-clash'));
});

test('static preflight blocks Play Again and restart buttons on playable ad end cards',async()=>{
 const withRestart=project();
 withRestart.components.push(
  {id:'cta',contract:'native.button.v1',sceneId:'scene.play',parameters:{width:260,height:64}},
  {id:'cta.label',parentId:'cta',contract:'native.text.v1',sceneId:'scene.play',parameters:{width:260,height:64,text:'INSTALL'}},
  {id:'replay',contract:'native.button.v1',sceneId:'scene.play',parameters:{width:180,height:56}},
  {id:'replay.label',parentId:'replay',contract:'native.text.v1',sceneId:'scene.play',parameters:{width:180,height:56,text:'PLAY AGAIN'}},
 );
 withRestart.events.push(
  {id:'cta.click',kind:'click',componentId:'cta'},
  {id:'replay.click',kind:'click',componentId:'replay'},
 );
 withRestart.eventBindings.push(
  {id:'cta.store',eventId:'cta.click',actions:[{kind:'store'}]},
  {id:'replay.restart',eventId:'replay.click',actions:[{kind:'restart'}]},
 );
 const blocked=await runStaticPreflight(withRestart,{catalog:null});
 assert.equal(blocked.ok,false);
 assert.ok(kinds(blocked).includes('end-card-replay-button'));

 const labelOnly=globalThis.structuredClone(withRestart);
 labelOnly.eventBindings=labelOnly.eventBindings.filter(binding=>binding.id!=='replay.restart');
 const blockedByLabel=await runStaticPreflight(labelOnly,{catalog:null});
 assert.equal(blockedByLabel.ok,false);
 assert.ok(kinds(blockedByLabel).includes('end-card-replay-button'));

 const clean=project();
 clean.components.push(
  {id:'cta',contract:'native.button.v1',sceneId:'scene.play',parameters:{width:260,height:64}},
  {id:'cta.label',parentId:'cta',contract:'native.text.v1',sceneId:'scene.play',parameters:{width:260,height:64,text:'INSTALL'}},
 );
 clean.events.push({id:'cta.click',kind:'click',componentId:'cta'});
 clean.eventBindings.push({id:'cta.store',eventId:'cta.click',actions:[{kind:'store'}]});
 assert.ok(!kinds(await runStaticPreflight(clean,{catalog:null})).includes('end-card-replay-button'));
});

function fakePngHeader(width,height){
 const buf=Buffer.alloc(24);
 buf.set([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a],0);
 buf.writeUInt32BE(13,8);
 buf.write('IHDR',12,'ascii');
 buf.writeUInt32BE(width,16);
 buf.writeUInt32BE(height,20);
 return buf.toString('base64');
}

test('static preflight blocks basic end cards, unshiny or unanimated CTAs, missing/non-fullscreen win confetti, and upscaled low-res end-card art',async()=>{
 const weak=project();
 weak.scenes.push({id:'scene.win',label:'Win',role:'end-card'});
 weak.assets.push({id:'hero.tiny',mime:'image/png',data:fakePngHeader(32,32),hash:'sha256:'+'1'.repeat(64)});
 weak.components.push(
  {id:'win.hero',contract:'native.image.v1',sceneId:'scene.win',parameters:{width:220,height:140,smoothing:true},assetSlots:[{slotId:'source',assetId:'hero.tiny'}]},
  {id:'win.cta',contract:'native.button.v1',sceneId:'scene.win',parameters:{width:240,height:56,presentation:'flat'}},
  {id:'win.cta.label',parentId:'win.cta',contract:'native.text.v1',sceneId:'scene.win',parameters:{width:240,height:56,text:'INSTALL'}},
 );
 weak.gameplay.push({id:'win.burst',componentId:'win.hero',kind:'emitter',parameters:{shape:'circle',coverage:'local',count:24,color:'#ffd166',speed:120}});
 weak.events.push(
  {id:'win.enter',kind:'sceneEnter',sceneId:'scene.win'},
  {id:'win.cta.click',kind:'click',componentId:'win.cta'},
 );
 weak.eventBindings.push(
  {id:'win.celebrate',eventId:'win.enter',actions:[{kind:'emit',behaviorId:'win.burst'}]},
  {id:'win.store',eventId:'win.cta.click',actions:[{kind:'store'}]},
 );
 const blocked=await runStaticPreflight(weak,{catalog:null});
 assert.equal(blocked.ok,false);
 assert.ok(kinds(blocked).includes('end-card-cta-static'));
 assert.ok(kinds(blocked).includes('end-card-particles-not-fullscreen'));
 assert.ok(kinds(blocked).includes('end-card-too-basic'));
 assert.ok(kinds(blocked).includes('end-card-hero-low-res'));

 // Shiny alone without looping animation is still blocked!
 weak.components.find(c=>c.id==='win.cta').parameters.presentation='shiny-cta';
 const shinyOnly=await runStaticPreflight(weak,{catalog:null});
 assert.ok(kinds(shinyOnly).includes('end-card-cta-static'));

 // Add looping CTA animation, celebratory hero motion, full-screen confetti, and high-res hero art
 weak.gameplay.push(
  {id:'win.cta.pulse',componentId:'win.cta',kind:'animation',parameters:{property:'y',from:460,to:466,seconds:1,loop:true}},
  {id:'win.hero.bob',componentId:'win.hero',kind:'animation',parameters:{property:'y',from:240,to:248,seconds:1.1,loop:true}},
 );
 weak.gameplay.find(b=>b.id==='win.burst').parameters={shape:'confetti',coverage:'screen',count:60,color:'#ffd166',speed:140};
 weak.assets[0].data=fakePngHeader(320,200);
 const fixed=await runStaticPreflight(weak,{catalog:null});
 assert.equal(fixed.ok,true,JSON.stringify(fixed.blockers));
});
