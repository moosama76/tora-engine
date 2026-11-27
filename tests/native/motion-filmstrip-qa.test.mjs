import test from 'node:test';
import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {createHash} from 'node:crypto';
import {mkdir,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {NativeAgentTools} from '../../scripts/lean/native/agent-tools.mjs';
import {verifyImageSignature} from '../../scripts/lean/native/assets.mjs';
import {CREATIVE_QA_FORMAT,formatCreativeQaReport,runBrowserQa,runCreativeQa} from '../../scripts/lean/native/creative-qa.mjs';

const sha256=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');

async function buildAnimatedPlayable(t){
 const root=await mkdtemp(resolve('reports/motion-qa-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(resolve(root,'store'));
 const service=new NativeService(store,new EditorState(store));
 const agent=new NativeAgentTools(service);
 const id='motion-demo';
 const created=await agent.run({command:'create',id,name:'Motion Demo',androidUrl:'https://play.google.com/store/apps/details?id=com.tora.motion'});
 const edited=await agent.run({
  command:'edit',
  id,
  expected:created.expected,
  scope:['$project.base'],
  scopeCreates:true,
  operations:[
   {kind:'createScene',scene:{id:'play',label:'Play',role:'interactive'}},
   {kind:'createScene',scene:{id:'win',label:'Win',role:'end-card'}},
   {kind:'setStartScene',id:'play'},
   {kind:'createComponent',component:{id:'bg',label:'Background',contract:'native.rectangle.v1',sceneId:'play',order:0,transform:[1,0,0,1,0,0],parameters:{width:390,height:700,fill:'#16213e',stroke:'#16213e',strokeWidth:0,radius:0,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'hero',label:'Orb',contract:'native.ellipse.v1',sceneId:'play',order:1,transform:[1,0,0,1,145,220],parameters:{width:100,height:100,fill:'#f59e0b',stroke:'#fef08a',strokeWidth:4,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'go',label:'Play CTA',contract:'native.button.v1',sceneId:'play',order:2,transform:[1,0,0,1,95,460],parameters:{width:200,height:84,enabled:true,fill:'#2563eb',stroke:'#1d4ed8',strokeWidth:2,radius:16,hoverFill:'#3b82f6',pressedFill:'#1e40af',disabledFill:'#64748b',opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'go-label',label:'Launch Label',contract:'native.text.v1',sceneId:'play',parentId:'go',order:0,transform:[1,0,0,1,0,24],parameters:{width:200,height:36,text:'LAUNCH',fontSize:22,fontFamily:'sans-serif',fontWeight:'700',align:'center',color:'#ffffff',opacity:1,visible:true},assetSlots:[]}},
   {kind:'putBehavior',behavior:{id:'orb-anim',componentId:'hero',kind:'animation',parameters:{property:'y',from:220,to:110,seconds:.9,easing:'ease-out',loop:false}}},
   {kind:'putBehavior',behavior:{id:'orb-burst',componentId:'hero',kind:'emitter',parameters:{shape:'circle',coverage:'local',count:18,speed:180,spread:360,gravity:160,lifetime:.8,color:'#fde047',color2:'#fb923c'}}},
   {kind:'putVariable',variable:{id:'hits',label:'Hits',type:'number',initial:0}},
   {kind:'putEvent',event:{id:'ev-go',kind:'click',componentId:'go'}},
   {kind:'putBinding',binding:{id:'b-go',eventId:'ev-go',actions:[{kind:'add',variableId:'hits',value:1},{kind:'animate',behaviorId:'orb-anim'},{kind:'emit',behaviorId:'orb-burst'},{kind:'setComponent',componentId:'go-label',key:'text',value:'FIRED!'}]}},
   // Reachable end-card on 3rd tap so real-play end-card motion filmstrip triggers!
   {kind:'putBinding',binding:{id:'b-win',eventId:'ev-go',condition:{variableId:'hits',op:'gte',value:3},actions:[{kind:'changeScene',sceneId:'win'}]}},
   {kind:'createComponent',component:{id:'win-bg',label:'Win BG',contract:'native.rectangle.v1',sceneId:'win',order:0,transform:[1,0,0,1,0,0],parameters:{width:390,height:700,fill:'#1e1b4b',stroke:'#1e1b4b',strokeWidth:0,radius:0,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'win-card',label:'Win Card',contract:'native.group.v1',sceneId:'win',order:1,transform:[1,0,0,1,35,140],parameters:{width:320,height:400,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'win-panel',label:'Win Panel',contract:'native.rectangle.v1',sceneId:'win',parentId:'win-card',order:0,transform:[1,0,0,1,0,0],parameters:{width:320,height:400,fill:'#312e81',stroke:'#a5b4fc',strokeWidth:3,radius:22,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'win-badge',label:'Win Badge',contract:'native.ellipse.v1',sceneId:'win',parentId:'win-card',order:1,transform:[1,0,0,1,120,24],parameters:{width:80,height:80,fill:'#facc15',stroke:'#fef08a',strokeWidth:4,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'win-title',label:'Win Title',contract:'native.text.v1',sceneId:'win',parentId:'win-card',order:2,transform:[1,0,0,1,20,122],parameters:{width:280,height:54,text:'VICTORY!',color:'#fef08a',fontSize:32,fontFamily:'sans-serif',fontWeight:'900',align:'center',wrap:false,autoFit:true,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'win-sub',label:'Win Sub',contract:'native.text.v1',sceneId:'win',parentId:'win-card',order:3,transform:[1,0,0,1,20,184],parameters:{width:280,height:34,text:'Play full game now',color:'#e0e7ff',fontSize:16,fontFamily:'sans-serif',fontWeight:'600',align:'center',wrap:false,autoFit:true,opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'win-cta',label:'Install Button',contract:'native.button.v1',sceneId:'win',parentId:'win-card',order:4,transform:[1,0,0,1,50,260],parameters:{width:220,height:84,enabled:true,fill:'#16a34a',stroke:'#86efac',strokeWidth:3,radius:18,hoverFill:'#22c55e',pressedFill:'#15803d',disabledFill:'#64748b',presentation:'shiny-cta',opacity:1,visible:true},assetSlots:[]}},
   {kind:'createComponent',component:{id:'win-cta-label',label:'Install Label',contract:'native.text.v1',sceneId:'win',parentId:'win-cta',order:0,transform:[1,0,0,1,0,24],parameters:{width:220,height:36,text:'INSTALL',color:'#ffffff',fontSize:24,fontFamily:'sans-serif',fontWeight:'900',align:'center',opacity:1,visible:true},assetSlots:[]}},
   {kind:'putBehavior',behavior:{id:'win-badge-bob',componentId:'win-badge',kind:'animation',parameters:{property:'y',from:24,to:14,seconds:.6,easing:'ease-in-out',loop:true}}},
   {kind:'putBehavior',behavior:{id:'win-cta-pulse',componentId:'win-cta',kind:'animation',parameters:{property:'y',from:260,to:254,seconds:.7,easing:'ease-in-out',loop:true}}},
   {kind:'putBehavior',behavior:{id:'win-confetti',componentId:'win-bg',kind:'emitter',parameters:{shape:'confetti',coverage:'screen',count:36,speed:220,spread:360,gravity:180,lifetime:1.1,color:'#fde047',color2:'#38bdf8'}}},
   {kind:'putEvent',event:{id:'ev-win-enter',kind:'sceneEnter',sceneId:'win'}},
   {kind:'putBinding',binding:{id:'b-win-enter',eventId:'ev-win-enter',actions:[{kind:'emit',behaviorId:'win-confetti'},{kind:'animate',behaviorId:'win-badge-bob'},{kind:'animate',behaviorId:'win-cta-pulse'}]}},
   {kind:'putEvent',event:{id:'ev-install',kind:'click',componentId:'win-cta'}},
   {kind:'putBinding',binding:{id:'b-install',eventId:'ev-install',actions:[{kind:'store'}]}},
  ],
 });
 assert.equal(edited.status,'COMMITTED',JSON.stringify(edited));
 const head=await service.read(id);
 const artifact=await service.build(id,head.project,'standalone-browser-draft');
 return {root,store,service,agent,id,head,artifact};
}

test('runCreativeQa captures 8-frame interaction & 4-frame real-play end-card motion filmstrips, and opt-in WebM video',async t=>{
 const {root,artifact}=await buildAnimatedPlayable(t);

 // 1. Default run: captures interaction + real-play end-card filmstrips, NO video, 150ms SLA passes!
 const outDefault=resolve(root,'qa-default');
 const report=await runCreativeQa({html:artifact.html,outputDir:outDefault,network:'standalone'});
 assert.equal(report.ok,true,JSON.stringify(report.blockers));
 assert.equal(report.interactions.every(i=>i.within150Ms===true),true);
 assert.equal(report.video,undefined,'default QA must not record WebM');
 assert.ok(Array.isArray(report.motionFilmstrips)&&report.motionFilmstrips.length===2,JSON.stringify(report.motionFilmstrips));

 const interStrip=report.motionFilmstrips.find(s=>s.kind==='interaction');
 const endStrip=report.motionFilmstrips.find(s=>s.kind==='end-card');
 assert.ok(interStrip&&endStrip);
 assert.equal(interStrip.timestampsMs.length,8);
 assert.ok(interStrip.uniqueFrames>=2,`expected animated frames, got ${interStrip.uniqueFrames}`);
 assert.equal(interStrip.motionDetected,true);
 assert.equal(interStrip.triageOnly,true);
 const interPng=await readFile(resolve(outDefault,interStrip.path));
 const interDims=verifyImageSignature(interPng,'image/png');
 assert.equal(interDims.width,interStrip.width);
 assert.equal(interDims.height,interStrip.height);

 assert.equal(endStrip.timestampsMs.length,4);
 const endPng=await readFile(resolve(outDefault,endStrip.path));
 verifyImageSignature(endPng,'image/png');

 // 2. Opt-in WebM recording produces non-empty gameplay.webm!
 const outVideo=resolve(root,'qa-video');
 const videoReport=await runCreativeQa({html:artifact.html,outputDir:outVideo,network:'standalone',recordVideo:true});
 assert.equal(videoReport.ok,true,JSON.stringify(videoReport.blockers));
 assert.ok(videoReport.video&&videoReport.video.path==='screenshots/gameplay.webm');
 assert.equal(videoReport.video.triageOnly,true);
 const webmBytes=await readFile(resolve(outVideo,videoReport.video.path));
 assert.ok(webmBytes.length>1000,'gameplay.webm should be non-empty');
 assert.equal(sha256(webmBytes),videoReport.video.sha256);

 // 3. Alternating a default (non-video) run into the SAME outputDir preserves gameplay.webm!
 const secondDefault=await runCreativeQa({html:artifact.html,outputDir:outVideo,network:'standalone',recordVideo:false});
 assert.equal(secondDefault.ok,true);
 assert.equal(secondDefault.video,undefined);
 const stillThere=await readFile(resolve(outVideo,'screenshots/gameplay.webm'));
 assert.equal(stillThere.length,webmBytes.length);
});

test('QA receipt cache does not poison retries after video/filmstrip failure and isolates alternating video vs default runs',async t=>{
 const root=await mkdtemp(resolve('reports/motion-cache-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(resolve(root,'store'));
 let calls=0,failVideo=true,failFilmstrip=false;

 const pngBytes=await readFile('fixtures/native/ding-dang-assets/cat_0.png');
 const fakeWebm=Buffer.from([0x1a,0x45,0xdf,0xa3,0x01,0x02,0x03,0x04]);

 const qaRunner=async({outputDir,motionFilmstrip,recordVideo})=>{
  calls++;
  const shotsDir=resolve(outputDir,'screenshots');
  await mkdir(shotsDir,{recursive:true});
  await writeFile(resolve(shotsDir,'390x844-opening.png'),pngBytes);
  const warnings=[];
  const motionFilmstrips=[];
  if(motionFilmstrip){
   if(failFilmstrip){
    warnings.push({severity:'warning',defectKind:'motion-filmstrip-failed',componentId:null,viewport:{width:390,height:844},remediation:'Retry.'});
   }else{
    await writeFile(resolve(shotsDir,'filmstrip-interaction.png'),pngBytes);
    motionFilmstrips.push({kind:'interaction',path:'screenshots/filmstrip-interaction.png',width:64,height:64,sha256:sha256(pngBytes),viewport:{width:390,height:844},timestampsMs:[0,80],uniqueFrames:2,changedTransitions:1,postInputTransitions:1,motionDetected:true,triageOnly:true});
   }
  }
  let video=null;
  if(recordVideo){
   if(failVideo){
    warnings.push({severity:'warning',defectKind:'video-capture-failed',componentId:null,viewport:{width:390,height:844},remediation:'Retry.'});
   }else{
    await writeFile(resolve(shotsDir,'gameplay.webm'),fakeWebm);
    video={path:'screenshots/gameplay.webm',sha256:sha256(fakeWebm),bytes:fakeWebm.length,viewport:{width:390,height:844},triageOnly:true};
   }
  }
  const report=formatCreativeQaReport({
   scope:'static+browser',
   blockers:[],
   warnings,
   interactions:[{viewport:{width:390,height:844},componentId:'go',within150Ms:true,deltaType:'state',maxResponseMs:150}],
   states:[{viewport:{width:390,height:844},state:'opening',status:'checked'}],
   screenshots:[{viewport:{width:390,height:844},state:'opening',path:'screenshots/390x844-opening.png',sha256:sha256(pngBytes)}],
   motionFilmstrips,
   video,
   checks:{},
  });
  await writeFile(resolve(outputDir,'report.json'),JSON.stringify(report));
  return report;
 };

 const service=new NativeService(store,new EditorState(store),{qaRunner,useVerifyCache:true});
 const created=await service.create({id:'vid-cache',name:'Video Cache Test'});

 // 1. Failed video capture returns ok:true (export stays eligible) with warning, and does NOT poison cache!
 const sharedDir=resolve(root,'shared-qa');
 const first=await service.runQa('vid-cache',{revisionId:created.revisionId,target:'standalone-browser-draft',outputDir:sharedDir,recordVideo:true});
 assert.equal(first.ok,true);
 assert.equal(first.cacheHit,false);
 assert.equal(first.video,undefined);
 assert.ok(first.warnings.some(w=>w.defectKind==='video-capture-failed'));
 assert.equal(calls,1);

 // 2. Fix video capture and retry recordVideo:true -> MUST NOT hit poisoned cache; captures & caches gameplay.webm!
 failVideo=false;
 const second=await service.runQa('vid-cache',{revisionId:created.revisionId,target:'standalone-browser-draft',outputDir:sharedDir,recordVideo:true});
 assert.equal(second.ok,true);
 assert.equal(second.cacheHit,false);
 assert.equal(second.video?.path,'screenshots/gameplay.webm');
 assert.equal(calls,2);

 // 3. Alternating default (recordVideo:false) into the SAME sharedDir runs separately and caches under video=0.
 const thirdDefault=await service.runQa('vid-cache',{revisionId:created.revisionId,target:'standalone-browser-draft',outputDir:sharedDir,recordVideo:false});
 assert.equal(thirdDefault.ok,true);
 assert.equal(thirdDefault.video,undefined);
 assert.equal(calls,3);

 // 4. Retrying recordVideo:true into a NEW outputDir hits the valid video=1 cache and copies gameplay.webm!
 const copyDir=resolve(root,'copied-video-qa');
 const fourth=await service.runQa('vid-cache',{revisionId:created.revisionId,target:'standalone-browser-draft',outputDir:copyDir,recordVideo:true});
 assert.equal(fourth.cacheHit,true);
 assert.equal(fourth.video?.path,'screenshots/gameplay.webm');
 assert.equal(calls,3);
 assert.deepEqual(await readFile(resolve(copyDir,'screenshots/gameplay.webm')),fakeWebm);

 // 5. Filmstrip failure also does not poison cache.
 const created2=await service.create({id:'strip-cache',name:'Strip Cache Test'});
 failFilmstrip=true;
 const stripFail=await service.runQa('strip-cache',{revisionId:created2.revisionId,target:'standalone-browser-draft',motionFilmstrip:true});
 assert.equal(stripFail.ok,true);
 assert.ok(stripFail.warnings.some(w=>w.defectKind==='motion-filmstrip-failed'));
 failFilmstrip=false;
 const stripRetry=await service.runQa('strip-cache',{revisionId:created2.revisionId,target:'standalone-browser-draft',motionFilmstrip:true});
 assert.equal(stripRetry.cacheHit,false);
 assert.equal(stripRetry.motionFilmstrips?.length,1);
});

test('failing captureMotionFilmstrip downgrades to warning without blocking runBrowserQa',async t=>{
 const root=await mkdtemp(resolve('reports/motion-warn-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 let tick=0;
 const mockSession={
  async setViewport(){},
  async load(){tick=0;},
  async screenshot(){return Buffer.from('frame-'+tick);},
  async getState(){return {scene:'play',variables:{score:tick}};},
  async getPrimaryTarget(){return {componentId:'go',x:10,y:10};},
  async click(){tick++;},
  async auditLayout(){return {defects:[],missing:[]};},
  async captureMotionFilmstrip(){throw Error('simulated canvas crash');},
  async close(){},
 };
 const report=await runBrowserQa({html:'<html></html>',outputDir:root,browserAdapter:mockSession,motionFilmstrip:true});
 assert.equal(report.format,CREATIVE_QA_FORMAT);
 assert.equal(report.ok,true);
 assert.ok(report.warnings.some(w=>w.defectKind==='motion-filmstrip-failed'));
});
