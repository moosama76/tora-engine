import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import {emptyProject,applyOperations} from './document.mjs';
import {NativeAgentTools} from './agent-tools.mjs';
import {registerSource} from './assets.mjs';

const create=(id,contract,x,y,width,height,extra={})=>({
 kind:'createComponent',
 component:{
  id,contract,
  transform:extra.transform??[1,0,0,1,x,y],
  parameters:{width,height,...extra.parameters},
  ...Object.fromEntries(Object.entries(extra).filter(([key])=>key!=='parameters'&&key!=='transform')),
 },
});
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
const variable=(id,initial)=>({kind:'putVariable',variable:{id,label:id,type:typeof initial,initial}});
const binding=(id,event,actions,condition)=>({kind:'putBinding',binding:{id,event,actions,...(condition?{condition}:{})}});
const image=(id,assetId,x,y,width,height,extra={})=>create(id,'native.image.v1',x,y,width,height,{...extra,assetSlots:[{slotId:'source',assetId}],parameters:{smoothing:true,fit:'contain',...extra.parameters}});
const sprite=(id,assetId,x,y,width,height,extra={})=>create(id,'native.sprite.v1',x,y,width,height,{...extra,assetSlots:[{slotId:'source',assetId}],parameters:{fit:'contain',frameCount:4,frameColumns:4,frameRate:0,...extra.parameters}});
const text=(id,value,x,y,width,height,extra={})=>create(id,'native.text.v1',x,y,width,height,{...extra,parameters:{text:value,fontFamily:'sans-serif',fontWeight:'900',fontSize:20,align:'center',color:'#183b44',wrap:false,...extra.parameters}});
const group=(id,x=0,y=0,width=390,height=700,extra={})=>create(id,'native.group.v1',x,y,width,height,extra);
const rectangle=(id,x,y,width,height,fill,extra={})=>create(id,'native.rectangle.v1',x,y,width,height,{...extra,parameters:{fill,stroke:'#183b44',strokeWidth:0,...extra.parameters}});
const button=(id,x,y,width,height,fill,extra={})=>create(id,'native.button.v1',x,y,width,height,{...extra,parameters:{fill,hoverFill:fill,pressedFill:fill,disabledFill:'#d2e2de',stroke:'#183b44',strokeWidth:3,radius:14,...extra.parameters}});
const mesh3d=(id,parentId,parameters,extra={})=>create(id,'native.mesh3d.v1',0,0,0,0,{...extra,parentId,parameters});
const layout=(id,x,y,scaleX,scaleY=scaleX)=>behavior(id+'.landscape',id,'responsive-layout',{x,y,scaleX,scaleY});
const press=(id)=>behavior(id+'.press',id,'press-feedback',{scaleDown:.92,springBackSeconds:.16,liftShadow:true});

async function loadGameAssets(visualPlanPath,audioPlanPath){
 const plan=JSON.parse(await readFile(resolve(visualPlanPath),'utf8'));
 const audioPlan=JSON.parse(await readFile(resolve(audioPlanPath),'utf8'));
 const visualRecords=await Promise.all(plan.files.map(async entry=>{
  const data=await readFile(entry.file);
  return {
   id:entry.id,hash:entry.sha256,mime:entry.mime??'image/png',bytes:data.length,data:data.toString('base64'),
   rights:`${plan.source.author}; ${plan.source.license}; ${plan.source.sourceUrl}; attribution required: no`,
   provenance:JSON.stringify({sourceId:plan.source.id,sourceFile:entry.file,sourceSha256:entry.sha256,license:plan.source.license,processing:entry.processing?.kind}),
  };
 }));
 const audioRecords=await Promise.all(audioPlan.files.map(async entry=>{
  const data=await readFile(entry.file);
  return {
   id:entry.id,hash:entry.sha256,mime:entry.mime,bytes:data.length,data:data.toString('base64'),
   rights:entry.rights,
   provenance:JSON.stringify(entry.provenance),
  };
 }));
 return {records:[...visualRecords,...audioRecords],plan,audioPlan};
}

function assetOperations(assets){
 return assets.map(asset=>{const record={...asset};delete record.data;return {kind:'registerAsset',asset:record};});
}

function finishProject(id,name,operations,storeUrl){
 operations.forEach((operation,index)=>{if(operation.kind==='createComponent')operation.component.order=index;});
 const base=emptyProject({id,name});
 if(storeUrl)base.base.storeUrl=storeUrl;
 let project=base;
 for(let start=0;start<operations.length;start+=240)project=applyOperations(project,operations.slice(start,start+240)).project;
 return {project};
}

function audioRig(owner,cues){
 const ops=[];
 for(const cue of cues){
  const compId=`${owner}.${cue.name}.audio`;
  ops.push(
   create(compId,'native.group.v1',0,0,1,1,{assetSlots:[{slotId:'source',assetId:cue.assetId}]}),
   behavior(`${owner}.${cue.name}`,compId,'audio',{
    bus:cue.bus,loop:Boolean(cue.loop),volume:cue.volume,frequency:cue.frequency??440,
    seconds:cue.seconds??.2,cooldownMs:cue.cooldownMs??40,pitchJitter:cue.pitchJitter??0,
    pitchStep:0,role:cue.role,allowSynthFallback:false,
   }),
  );
 }
 return ops;
}

function sceneBackground(prefix,color,sceneId){
 return [
  group(prefix+'.background',0,0,390,700,sceneId?{sceneId}:{}),
  layout(prefix+'.background',0,0,700/390,390/700),
  rectangle(prefix+'.background.fill',0,0,390,700,color,{parentId:prefix+'.background',...(sceneId?{sceneId}:{})}),
 ];
}

const STAR_PATH=[
 ['M',15,1],['L',19.3,9.7],['L',29,11.1],['L',22,17.9],['L',23.7,27.6],
 ['L',15,23],['L',6.3,27.6],['L',8,17.9],['L',1,11.1],['L',10.7,9.7],['Z'],
];
const GAP_DIAMOND_PATH=[
 ['M',29,14],['L',55,27],['L',29,40],['L',3,27],['Z'],
];

/** Mini Golf — Airy sunlit Country-Club Resort end card (open full-bleed 3D course + floating ivory scorecard crest + emerald glossy CTA dock). */
function golfClubhouseEndScene({sceneId,title,subtitle,cta,win,stageOps,emblemAsset,emblemFlag=false}){
 const headerWrap=sceneId+'.header.wrap',headerInner=sceneId+'.header.inner';
 const dockWrap=sceneId+'.dock.wrap',dockInner=sceneId+'.dock.inner';
 const emblemWrap=sceneId+'.emblem.wrap',ctaWrap=sceneId+'.cta.wrap',ctaId=sceneId+'.cta';
 const confettiId=sceneId+'.confetti',confettiTimerId=sceneId+'.confetti.timer';
 const starOps=[],starActions=[];
 if(win){
  [[143,52,1],[195,43,1.24],[247,52,1]].forEach(([sx,sy,targetScale],idx)=>{
   const wrapId=`${sceneId}.star.${idx+1}.wrap`,starId=`${sceneId}.star.${idx+1}`,popId=`${sceneId}.star.${idx+1}.pop`;
   starOps.push(
    group(wrapId,sx,sy,0,0,{sceneId,parentId:headerInner}),
    create(starId,'native.path.v1',-15,-15,30,30,{sceneId,parentId:wrapId,parameters:{commands:STAR_PATH,fill:'#ffd23f',stroke:'#144f3b',strokeWidth:2.2}}),
    behavior(popId,wrapId,'animation',{property:'scale',from:.25,to:targetScale,seconds:.58,delay:.14+idx*.13,loop:false,easing:'ease-out'}),
   );
   starActions.push({kind:'animate',behaviorId:popId});
  });
 }
 return [
  {kind:'createScene',scene:{id:sceneId,label:title,role:'end-card'}},
  ...sceneBackground(sceneId,'#b8e2ed',sceneId),
  ...stageOps,
  // Top Floating Ivory Country-Club Scorecard Crest (open live 3D fairway stays unobstructed in the center!)
  group(headerWrap,0,0,390,700,{sceneId}),
  layout(headerWrap,342,10,.82,.82),
  group(headerInner,0,0,390,700,{sceneId,parentId:headerWrap}),
  rectangle(sceneId+'.crest',34,60,322,114,'#fffdf4f7',{sceneId,parentId:headerInner,parameters:{stroke:'#d69260',strokeWidth:3.5,radius:22}}),
  ...starOps,
  text(sceneId+'.title',title,46,80,298,34,{sceneId,parentId:headerInner,parameters:{fontSize:22,color:'#144f3b'}}),
  rectangle(sceneId+'.score.pill',58,120,274,36,'#e6f4ec',{sceneId,parentId:headerInner,parameters:{stroke:'#26865e',strokeWidth:2,radius:18}}),
  text(sceneId+'.subtitle',subtitle,58,120,274,36,{sceneId,parentId:headerInner,parameters:{fontSize:14,fontWeight:'700',color:'#144f3b'}}),
  behavior(sceneId+'.header.fade',headerInner,'animation',{property:'opacity',from:0,to:1,seconds:.55,loop:false,easing:'ease-out'}),
  behavior(sceneId+'.header.glide',headerInner,'animation',{property:'y',from:-16,to:0,seconds:.6,loop:false,easing:'ease-out'}),
  // Bottom Floating Ivory Dock + Clubhouse Emblem + Forest-Emerald Glossy CTA
  group(dockWrap,0,0,390,700,{sceneId}),
  layout(dockWrap,342,-226,.82,.82),
  group(dockInner,0,0,390,700,{sceneId,parentId:dockWrap}),
  group(emblemWrap,195,508,0,0,{sceneId,parentId:dockInner}),
  create(sceneId+'.emblem.ring','native.ellipse.v1',-40,-40,80,80,{sceneId,parentId:emblemWrap,parameters:{fill:'#1f7a58',stroke:'#fffdf4',strokeWidth:3.5}}),
  image(sceneId+'.emblem.art',emblemAsset,-32,-28,64,56,{sceneId,parentId:emblemWrap,parameters:{smoothing:true,fit:'contain'}}),
  ...(emblemFlag?[image(sceneId+'.emblem.flag','golf.flag',9,-30,22,30,{sceneId,parentId:emblemWrap,parameters:{smoothing:true,fit:'contain'}})]:[]),
  behavior(sceneId+'.emblem.bob',emblemWrap,'animation',{property:'y',from:505,to:511,seconds:2.6,loop:true,easing:'ease-in-out'}),
  rectangle(sceneId+'.dock.card',44,554,302,96,'#fffdf4ee',{sceneId,parentId:dockInner,parameters:{stroke:'#d69260',strokeWidth:2.5,radius:26}}),
  group(ctaWrap,195,602,0,0,{sceneId,parentId:dockInner}),
  button(ctaId,-132,-35,264,70,'#1c9e68',{sceneId,parentId:ctaWrap,parameters:{presentation:'shiny-cta',hoverFill:'#25b87a',pressedFill:'#147a4f',stroke:'#ffd23f',strokeWidth:3,radius:20}}),
  text(ctaId+'.label',cta,0,0,264,70,{sceneId,parentId:ctaId,parameters:{fontSize:20,color:'#fffdf4'}}),
  press(ctaId),
  behavior(sceneId+'.cta.pulse',ctaWrap,'animation',{property:'scale',from:.985,to:1.028,seconds:2.2,loop:true,easing:'ease-in-out'}),
  behavior(sceneId+'.dock.fade',dockInner,'animation',{property:'opacity',from:0,to:1,seconds:.6,delay:.08,loop:false,easing:'ease-out'}),
  behavior(sceneId+'.dock.glide',dockInner,'animation',{property:'y',from:20,to:0,seconds:.65,delay:.08,loop:false,easing:'ease-out'}),
  // Gentle full-screen resort celebration ribbons & stars
  ...(win?[
   behavior(confettiId,dockWrap,'emitter',{shape:'confetti',coverage:'screen',count:52,color:'#ffd23f',color2:'#24b47e',color3:'#ff7b6b',speed:82,lifetime:3.8,gravity:42,spread:360}),
   behavior(confettiTimerId,dockWrap,'timer',{seconds:2.8,repeat:true}),
   binding(sceneId+'.confetti.loop',{kind:'timer',behaviorId:confettiTimerId},[{kind:'emit',behaviorId:confettiId}]),
  ]:[]),
  binding(sceneId+'.enter',{kind:'sceneEnter',sceneId},[
   ...(win?[{kind:'emit',behaviorId:confettiId},...starActions]:[]),
   {kind:'animate',behaviorId:sceneId+'.header.fade'},
   {kind:'animate',behaviorId:sceneId+'.header.glide'},
   {kind:'animate',behaviorId:sceneId+'.dock.fade'},
   {kind:'animate',behaviorId:sceneId+'.dock.glide'},
   {kind:'animate',behaviorId:sceneId+'.emblem.bob'},
   {kind:'animate',behaviorId:sceneId+'.cta.pulse'},
   {kind:'playAudio',behaviorId:`golf.${win?'win':'loss'}`},
  ]),
  binding(sceneId+'.store',{kind:'click',componentId:ctaId},[{kind:'store'}]),
 ];
}

/* ============================================================================
 * 1. TORA-AUTHORED 3D MINI GOLF CHALLENGE (Exact 3D Three.js WebGL2 diorama)
 * ========================================================================== */
function golf3dHoleScene({sceneId,holeNum,title,isStart,tee,cup,budget,ramp,walls,extraProps=[],nextSceneId,showTutorial}){
 const prefix=isStart?'':`h${holeNum}.`;
 const sceneOpt=isStart?{}:{sceneId};
 const stageWrap=prefix+'stage.wrap';
 const stageId=prefix+'stage3d';
 const ballId=prefix+'ball';
 const cupId=prefix+'cup';
 const hudId=prefix+'hud';
 const powerFillId=prefix+'power.fill';
 const holdTimerId=prefix+'hold.timer';
 const deadlineId=prefix+'deadline';
 const floorAt=(x,z)=>{if(!ramp)return 0;if(z>=1)return 0;if(z<=-1)return 1.1;return (1-z)*.55;};

 const ops=[];
 if(!isStart)ops.push({kind:'createScene',scene:{id:sceneId,label:`Hole ${holeNum}`,role:'interactive'}});
 ops.push(
  // Full-bleed responsive 3D stage (undistorted aspect in both 390x700 portrait and 700x390 landscape!)
  group(stageWrap,0,0,390,700,sceneOpt),
  layout(stageWrap,0,0,700/390,390/700),
  create(stageId,'native.stage3d.v1',0,0,390,700,{
   ...sceneOpt,parentId:stageWrap,
   assetSlots:[{slotId:'source',assetId:'golf.colormap'}],
   parameters:{
    skyColor:'#b8e2ed',hemiSkyColor:'#fff9dd',hemiGroundColor:'#527b75',hemiIntensity:1.8,
    sunColor:'#fff0cf',sunIntensity:2.1,sunX:-9,sunY:18,sunZ:8,
    cameraX:10,cameraY:18,cameraZ:21,cameraFov:39,
    landscapeCameraX:13,landscapeCameraY:15,landscapeCameraZ:18,landscapeCameraFov:22.6199,
    lookAtX:0,lookAtY:.15,lookAtZ:0,followTargetId:ballId,followZFactor:.12,introLift:2,
   },
  }),
  // Continuous fairway with circular cup cutout, cedar rails, plinth & optional Hole 3 uphill ramp
  mesh3d(prefix+'fairway',stageId,{primitive:'fairway',fairwayRamp:ramp,cupX:cup.x,cupZ:cup.z,cupRadius:.23,useTexture:true},{...sceneOpt,assetSlots:[{slotId:'source',assetId:'mesh.open'}]}),
  // Sunlit miniature diorama garden (14 trees) + castle + side supports verbatim from original scene.ts
  mesh3d(prefix+'garden',stageId,{primitive:'garden'},sceneOpt),
  mesh3d(prefix+'castle.r',stageId,{primitive:'mesh',x:4,y:-.5,z:4,sx:1.7,sy:1.7,sz:1.7,useTexture:true},{...sceneOpt,assetSlots:[{slotId:'source',assetId:'mesh.castle'}]}),
  mesh3d(prefix+'sup.n',stageId,{primitive:'mesh',x:-3.7,y:-.6,z:-5,sx:1.8,sy:1.8,sz:1.8,useTexture:true},{...sceneOpt,assetSlots:[{slotId:'source',assetId:'mesh.support'}]}),
  mesh3d(prefix+'sup.s',stageId,{primitive:'mesh',x:-3.7,y:-.6,z:5,sx:1.8,sy:1.8,sz:1.8,useTexture:true},{...sceneOpt,assetSlots:[{slotId:'source',assetId:'mesh.support'}]}),
 );

 // Hole-specific background diorama props (e.g. Hole 2 left structure-gate & castle)
 for(const prop of extraProps){
  ops.push(mesh3d(prefix+prop.id,stageId,{primitive:'mesh',x:prop.x,y:prop.y,z:prop.z,sx:prop.s,sy:prop.s,sz:prop.s,useTexture:true},{...sceneOpt,assetSlots:[{slotId:'source',assetId:prop.mesh}]}));
 }

 // Course obstacles: angled cedar bank walls OR Hole 2 red-and-cream moving gate
 for(const w of walls){
  const wid=prefix+w.id;
  if(w.moving){
   ops.push(
    mesh3d(wid,stageId,{primitive:'group',x:w.x,y:0,z:w.z},sceneOpt),
    mesh3d(wid+'.bar',wid,{primitive:'box',x:0,y:.24,z:0,sx:2.1,sy:.32,sz:.28,color:'#ee6b61'},sceneOpt),
    mesh3d(wid+'.cap',wid,{primitive:'box',x:0,y:.42,z:0,sx:2.12,sy:.06,sz:.3,color:'#ffe8bc'},sceneOpt),
    ...[-.8,-.4,0,.4,.8].map((sx,idx)=>mesh3d(`${wid}.s${idx}`,wid,{primitive:'box',x:sx,y:.28,z:.145,sx:.13,sy:.3,sz:.015,color:'#fff3d5'},sceneOpt)),
    behavior(wid+'.body',wid,'physics-3d',{mode:'kinematic',radius:.11,hx:w.hx,hz:w.hz,angle:0,friction:0,restitution:.72,maxSpeed:9,boundsX:3,boundsZ:7,ramp,restSpeed:.07,restDelaySeconds:.25}),
    behavior(wid+'.osc',wid,'oscillate-3d',{axis:'x',amplitude:1.55,angularSpeed:1.7,phase:0}),
   );
  }else{
   const gy=floorAt(w.x,w.z);
   ops.push(
    mesh3d(wid,stageId,{primitive:'group',x:w.x,y:gy,z:w.z,ry:-w.angle},sceneOpt),
    mesh3d(wid+'.mesh',wid,{primitive:'mesh',x:0,y:-.126654,z:0,sx:w.hx*2,sy:2.5,sz:w.hz*2,useTexture:true},{...sceneOpt,assetSlots:[{slotId:'source',assetId:'mesh.obstacle-block'}]}),
    mesh3d(wid+'.box',wid,{primitive:'box',x:0,y:.13,z:0,sx:w.hx*2,sy:.26,sz:w.hz*2,color:'#dc9562'},sceneOpt),
    mesh3d(wid+'.top',wid,{primitive:'box',x:0,y:.275,z:0,sx:w.hx*2,sy:.03,sz:w.hz*2,color:'#f4c58b'},sceneOpt),
    behavior(wid+'.body',wid,'physics-3d',{mode:'static',radius:.11,hx:w.hx,hz:w.hz,angle:w.angle,friction:0,restitution:.72,maxSpeed:9,boundsX:3,boundsZ:7,ramp,restSpeed:.07,restDelaySeconds:.25}),
   );
  }
 }

 // Recessed 3D cup + waving red pennant + 3D confetti burst + golf ball + drop shadow
 ops.push(
  mesh3d(cupId,stageId,{primitive:'cup',x:cup.x,y:cup.y,z:cup.z,cupRadius:.23,confetti:true},sceneOpt),
  mesh3d(prefix+'flag',cupId,{primitive:'mesh',x:0,y:.02,z:0,sx:2.5,sy:2.5,sz:2.5,useTexture:true,waveFlag:true},{...sceneOpt,assetSlots:[{slotId:'source',assetId:'mesh.flag-red'}]}),
  behavior(cupId+'.capture',cupId,'capture-zone-3d',{radius:.23,maxCaptureSpeed:3.1,heightTolerance:.16,holdSeconds:1.45}),
  mesh3d(ballId,stageId,{primitive:'mesh',x:tee.x,y:tee.y,z:tee.z,sx:3.16,sy:3.16,sz:3.16,color:'#fffaf1',useTexture:false},{...sceneOpt,assetSlots:[{slotId:'source',assetId:'mesh.ball-blue'}]}),
  mesh3d(prefix+'shadow',stageId,{primitive:'ring',x:tee.x,y:.008,z:tee.z,rx:-Math.PI/2,innerRadius:0,radiusTop:.15,color:'#224846',unlit:true,opacity:.25,dropShadowOf:ballId},sceneOpt),
  behavior(ballId+'.body',ballId,'physics-3d',{mode:'dynamic',radius:.11,hx:.11,hz:.11,angle:0,friction:1.05,restitution:.72,maxSpeed:9,boundsX:3,boundsZ:7,ramp,rampHeight:1.1,restSpeed:.07,restDelaySeconds:.25}),
  behavior(ballId+'.aim',ballId,'aim-launch-3d',{stageId,dragMode:'anywhere',dragScale:2.8,minPullPx:10,maxSpeed:9,minSpeed:.35,hitRadiusPx:120,showTrajectory:true,trajectoryDots:15,powerVariableId:'power'}),

  // Compact sunlit cream HUD (clear of all ad-SDK safe areas in portrait & landscape)
  group(hudId,58,12,274,78,sceneOpt),
  layout(hudId,62,12,.86,.86),
  rectangle(hudId+'.panel',0,0,274,78,'#fff9ecf0',{...sceneOpt,parentId:hudId,parameters:{stroke:'#183b44',strokeWidth:3,radius:18}}),
  text(hudId+'.hole',`HOLE ${holeNum}/3 · ${title}`,12,10,162,26,{...sceneOpt,parentId:hudId,parameters:{align:'left',fontSize:13,color:'#183b44'}}),
  text(hudId+'.shots',`{{hole.strokes}}/${budget} SHOTS`,176,10,86,26,{...sceneOpt,parentId:hudId,parameters:{align:'right',fontSize:13,color:'#246a49'}}),
  text(hudId+'.power','POWER',12,44,60,24,{...sceneOpt,parentId:hudId,parameters:{align:'left',fontSize:12,fontWeight:'700',color:'#4b6470'}}),
  rectangle(prefix+'power.track',76,50,184,12,'#d8ebe7',{...sceneOpt,parentId:hudId,parameters:{radius:6}}),
  rectangle(powerFillId,76,50,184,12,'#ff9f1c',{...sceneOpt,parentId:hudId,parameters:{radius:6}}),
  behavior(prefix+'power.meter',powerFillId,'value-meter',{variableId:'power',min:0,max:1,axis:'x',direction:'positive',smoothingSeconds:.04}),
  behavior(holdTimerId,hudId,'timer',{seconds:.1,repeat:true}),
  behavior(deadlineId,hudId,'timer',{seconds:32,repeat:false}),
 );

 if(showTutorial){
  ops.push(
   behavior('hole1.tutorial',hudId,'tutorial-hand',{targetId:ballId,mode:'drag',idleDelaySeconds:.35,hideOnFirstInput:true}),
  );
 }

 // Hole gameplay event bindings
 ops.push(
  binding(prefix+'enter',{kind:'sceneEnter',sceneId},[
   {kind:'set',variableId:'hole.num',value:holeNum},
   {kind:'set',variableId:'hole.strokes',value:0},
   {kind:'set',variableId:'hole.cleared',value:false},
   {kind:'set',variableId:'hole.hold',value:0},
   {kind:'playAudio',behaviorId:'golf.ambient'},
  ]),
  binding(prefix+'shot',{kind:'launch',componentId:ballId},[
   {kind:'add',variableId:'strokes',value:1},
   {kind:'add',variableId:'hole.strokes',value:1},
   {kind:'playAudio',behaviorId:'golf.strike'},
  ]),
  binding(prefix+'bounce',{kind:'bodyBounce',componentId:ballId},[
   {kind:'playAudio',behaviorId:'golf.bank'},
   {kind:'floatingText',text:'NICE BANK!',componentId:ballId,color:'#fff9ec',fontSize:20,risePx:38,seconds:.85},
  ]),
  ...(ramp?[binding(prefix+'jump',{kind:'bodyJump',componentId:ballId},[
   {kind:'floatingText',text:'TAKE FLIGHT!',componentId:ballId,color:'#ffd23f',fontSize:22,risePx:44,seconds:.9},
  ])]:[]),
  binding(prefix+'cup.sink',{kind:'zoneCapture',componentId:ballId,otherId:cupId},[
   {kind:'set',variableId:'hole.cleared',value:true},
   {kind:'set',variableId:'hole.hold',value:0},
   {kind:'playAudio',behaviorId:'golf.cup'},
   {kind:'floatingText',text:'IN THE CUP!',componentId:cupId,color:'#fff9ec',fontSize:24,risePx:48,seconds:1.1},
   {kind:'screenFlash',color:'#fff9ec',opacity:.22,seconds:.22},
  ]),
  binding(prefix+'hold.tick',{kind:'timer',behaviorId:holdTimerId},[
   {kind:'add',variableId:'hole.hold',value:.1},
  ],{all:[{variableId:'hole.num',op:'eq',value:holeNum},{variableId:'hole.cleared',op:'eq',value:true}]}),
  binding(prefix+'hold.done',{kind:'variableChange',variableId:'hole.hold'},[
   {kind:'changeScene',sceneId:nextSceneId},
  ],{all:[{variableId:'hole.num',op:'eq',value:holeNum},{variableId:'hole.cleared',op:'eq',value:true},{variableId:'hole.hold',op:'gte',value:1.4}]}),
  binding(prefix+'budget.out',{kind:'bodyRest',componentId:ballId},[
   {kind:'changeScene',sceneId:'scene.timeout'},
  ],{all:[{variableId:'hole.num',op:'eq',value:holeNum},{variableId:'hole.cleared',op:'eq',value:false},{variableId:'hole.strokes',op:'gte',value:budget}]}),
  binding(prefix+'timeout',{kind:'timer',behaviorId:deadlineId},[
   {kind:'changeScene',sceneId:'scene.timeout'},
  ],{all:[{variableId:'hole.num',op:'eq',value:holeNum},{variableId:'hole.cleared',op:'eq',value:false}]}),
 );
 return ops;
}

export async function createMiniGolfProject(){
 const {records:assets}=await loadGameAssets('assets/tora-golf/plan.json','assets/tora-golf/audio-plan.json');
 const ops=[
  ...assetOperations(assets),
  group('end.audio'),
   ...audioRig('golf',[
   {name:'ambient',assetId:'golf.audio.ambient',bus:'music',loop:true,volume:.09,role:'ambient',cooldownMs:0},
   {name:'strike',assetId:'golf.audio.strike',bus:'sfx',volume:.16,role:'tap',cooldownMs:40,pitchJitter:.04},
   {name:'bank',assetId:'golf.audio.bank',bus:'sfx',volume:.14,role:'tap',cooldownMs:35,pitchJitter:.05},
   {name:'cup',assetId:'golf.audio.cup',bus:'sfx',volume:.18,role:'reward',cooldownMs:80},
   {name:'win',assetId:'golf.audio.win',bus:'stinger',volume:.26,role:'win',cooldownMs:100},
   {name:'loss',assetId:'golf.audio.loss',bus:'stinger',volume:.2,role:'loss',cooldownMs:100},
  ]),
  variable('hole.num',1),
  variable('strokes',0),
  variable('hole.strokes',0),
  variable('hole.cleared',false),
  variable('hole.hold',0),
  variable('power',0),

  // Hole 1: The Perfect Curve (verbatim coordinates & angled bank wall)
  ...golf3dHoleScene({
   sceneId:'scene.play',holeNum:1,title:'CURVE',isStart:true,
   tee:{x:-1.7,y:.11,z:4.7},cup:{x:1.45,y:0,z:-4.8},budget:3,ramp:false,
   walls:[{id:'bank',x:0,z:.25,hx:.9,hz:.13,angle:-.36}],
   nextSceneId:'scene.hole2',showTutorial:true,
  }),
  // Hole 2: The Moving Gate (verbatim moving gate + structure-gate + castle)
  ...golf3dHoleScene({
   sceneId:'scene.hole2',holeNum:2,title:'GATE',isStart:false,
   tee:{x:0,y:.11,z:4.8},cup:{x:0,y:0,z:-4.8},budget:4,ramp:false,
   walls:[{id:'gate',x:0,z:0,hx:1.05,hz:.14,angle:0,moving:true}],
   extraProps:[
    {id:'sgate',mesh:'mesh.structure-gate',x:-4.3,y:-.4,z:-2,s:1.7},
    {id:'castle.l',mesh:'mesh.castle',x:-4.25,y:-.4,z:-4,s:2},
   ],
   nextSceneId:'scene.hole3',showTutorial:false,
  }),
  // Hole 3: The Final Ramp (verbatim uphill 0 -> 1.1m ramp launch + twin angled banks)
  ...golf3dHoleScene({
   sceneId:'scene.hole3',holeNum:3,title:'RAMP',isStart:false,
   tee:{x:0,y:.11,z:4.8},cup:{x:0,y:1.1,z:-4.8},budget:5,ramp:true,
   walls:[
    {id:'bank.l',x:-1.8,z:1,hx:.35,hz:.13,angle:.35},
    {id:'bank.r',x:1.8,z:1,hx:.35,hz:.13,angle:-.35},
   ],
   nextSceneId:'scene.win',showTutorial:false,
  }),

  ...golfClubhouseEndScene({
   sceneId:'scene.win',title:'COURSE CLEARED!',subtitle:'3 HOLES · {{strokes}} SHOTS',cta:'PLAY MINI GOLF',
   win:true,emblemAsset:'golf.castle',emblemFlag:true,
   stageOps:[
    group('win.stage.wrap',0,0,390,700,{sceneId:'scene.win'}),
    layout('win.stage.wrap',0,0,700/390,390/700),
    create('win.stage3d','native.stage3d.v1',0,0,390,700,{
     sceneId:'scene.win',parentId:'win.stage.wrap',
     assetSlots:[{slotId:'source',assetId:'golf.colormap'}],
     parameters:{
      skyColor:'#b8e2ed',hemiSkyColor:'#fff9dd',hemiGroundColor:'#527b75',hemiIntensity:1.85,
      sunColor:'#fff0cf',sunIntensity:2.15,sunX:-9,sunY:18,sunZ:8,
      cameraX:9.5,cameraY:16,cameraZ:18.5,cameraFov:38,
      landscapeCameraX:12.5,landscapeCameraY:14.5,landscapeCameraZ:18,landscapeCameraFov:24,
      lookAtX:0,lookAtY:.15,lookAtZ:-1.2,introLift:0,
     },
    }),
    mesh3d('win.fairway','win.stage3d',{primitive:'fairway',fairwayRamp:false,cupX:0,cupZ:-4.8,cupRadius:.23,useTexture:true},{sceneId:'scene.win',assetSlots:[{slotId:'source',assetId:'mesh.open'}]}),
    mesh3d('win.garden','win.stage3d',{primitive:'garden'},{sceneId:'scene.win'}),
    mesh3d('win.castle','win.stage3d',{primitive:'mesh',x:4,y:-.5,z:4,sx:1.7,sy:1.7,sz:1.7,useTexture:true},{sceneId:'scene.win',assetSlots:[{slotId:'source',assetId:'mesh.castle'}]}),
    mesh3d('win.sgate','win.stage3d',{primitive:'mesh',x:-4.2,y:-.4,z:-2,sx:1.7,sy:1.7,sz:1.7,useTexture:true},{sceneId:'scene.win',assetSlots:[{slotId:'source',assetId:'mesh.structure-gate'}]}),
    mesh3d('win.cup','win.stage3d',{primitive:'cup',x:0,y:0,z:-4.8,cupRadius:.23},{sceneId:'scene.win'}),
    mesh3d('win.flag','win.cup',{primitive:'mesh',x:0,y:.02,z:0,sx:2.7,sy:2.7,sz:2.7,useTexture:true,waveFlag:true},{sceneId:'scene.win',assetSlots:[{slotId:'source',assetId:'mesh.flag-red'}]}),
   ],
  }),
  ...golfClubhouseEndScene({
   sceneId:'scene.timeout',title:'PAR AWAITS',subtitle:'MASTER ALL 3 COURSES',cta:'PLAY MINI GOLF',
   win:false,emblemAsset:'golf.windmill',emblemFlag:false,
   stageOps:[
    group('to.stage.wrap',0,0,390,700,{sceneId:'scene.timeout'}),
    layout('to.stage.wrap',0,0,700/390,390/700),
    create('to.stage3d','native.stage3d.v1',0,0,390,700,{
     sceneId:'scene.timeout',parentId:'to.stage.wrap',
     assetSlots:[{slotId:'source',assetId:'golf.colormap'}],
     parameters:{
      skyColor:'#b8e2ed',hemiSkyColor:'#fff9dd',hemiGroundColor:'#527b75',hemiIntensity:1.85,
      sunColor:'#fff0cf',sunIntensity:2.15,sunX:-9,sunY:18,sunZ:8,
      cameraX:9.5,cameraY:16,cameraZ:18.5,cameraFov:38,
      landscapeCameraX:12.5,landscapeCameraY:14.5,landscapeCameraZ:18,landscapeCameraFov:24,
      lookAtX:0,lookAtY:.15,lookAtZ:-1.2,introLift:0,
     },
    }),
    mesh3d('to.fairway','to.stage3d',{primitive:'fairway',fairwayRamp:false,cupX:0,cupZ:-4.8,cupRadius:.23,useTexture:true},{sceneId:'scene.timeout',assetSlots:[{slotId:'source',assetId:'mesh.open'}]}),
    mesh3d('to.garden','to.stage3d',{primitive:'garden'},{sceneId:'scene.timeout'}),
    mesh3d('to.cup','to.stage3d',{primitive:'cup',x:0,y:0,z:-4.8,cupRadius:.23},{sceneId:'scene.timeout'}),
    mesh3d('to.flag','to.cup',{primitive:'mesh',x:0,y:.02,z:0,sx:2.5,sy:2.5,sz:2.5,useTexture:true,waveFlag:true},{sceneId:'scene.timeout',assetSlots:[{slotId:'source',assetId:'mesh.flag-red'}]}),
   ],
  }),
 ];
 const {project}=finishProject('mini-golf','Mini Golf',ops,'https://play.google.com/store/apps/details?id=com.playablelab.minigolf');
 project.creativeBrief.goal='Mini Golf — 3D WebGL2 miniature golf challenge with real 3D fairway, angled bank walls, moving gate, uphill ramp jump, and instant putt physics.';
 return {project,assets};
}

/* ============================================================================
 * 2. REDESIGNED TRAFFIC TYCOON — WATERFRONT METROPOLIS ROAD BUILDER
 * ========================================================================== */
function waterfrontBackdrop(prefix,sceneId){
 const opt=sceneId?{sceneId}:{};
 const wrap=prefix+'.backdrop';
 return [
  group(wrap,0,0,390,700,opt),
  layout(wrap,0,0,700/390,390/700),
  rectangle(prefix+'.bg',0,0,390,700,'#c8eaf2',{...opt,parentId:wrap}),
  // Seamless soft sunlit coastal clouds & ambient water shimmer (zero hard edge bands on ultrawide screens!)
  create(prefix+'.glow','native.ellipse.v1',6,190,378,270,{...opt,parentId:wrap,parameters:{fill:'#e2f6f288'}}),
  create(prefix+'.cloud1.a','native.ellipse.v1',24,104,74,26,{...opt,parentId:wrap,parameters:{fill:'#ffffffa8'}}),
  create(prefix+'.cloud1.b','native.ellipse.v1',46,94,54,24,{...opt,parentId:wrap,parameters:{fill:'#ffffffc4'}}),
  create(prefix+'.cloud2.a','native.ellipse.v1',278,122,82,24,{...opt,parentId:wrap,parameters:{fill:'#ffffff9c'}}),
  create(prefix+'.cloud2.b','native.ellipse.v1',302,112,52,22,{...opt,parentId:wrap,parameters:{fill:'#ffffffbc'}}),
  create(prefix+'.cloud3.a','native.ellipse.v1',140,498,110,24,{...opt,parentId:wrap,parameters:{fill:'#a2d8e858'}}),
 ];
}

/** Traffic Tycoon — Bold Urban Expressway Poster end card (Interstate Highway Sign + Cream Architectural Live-City Showcase + Asphalt Telemetry Strip + Tangerine-Gold Shiny CTA). */
function trafficPosterEndScene({sceneId,title,telemetry,cta,win,signFill,cityOps}){
 const signWrap=sceneId+'.sign.wrap',signInner=sceneId+'.sign.inner';
 const posterWrap=sceneId+'.poster.wrap',posterInner=sceneId+'.poster.inner';
 const ctaDock=sceneId+'.cta.dock',ctaInner=sceneId+'.cta.inner',ctaWrap=sceneId+'.cta.wrap',ctaId=sceneId+'.cta';
 const confettiId=sceneId+'.confetti',confettiTimerId=sceneId+'.confetti.timer';
 const starOps=[],starActions=[];
 if(win){
  [[146,52,.95],[195,46,1.18],[244,52,.95]].forEach(([sx,sy,targetScale],idx)=>{
   const wrapId=`${sceneId}.star.${idx+1}.wrap`,starId=`${sceneId}.star.${idx+1}`,popId=`${sceneId}.star.${idx+1}.pop`;
   starOps.push(
    group(wrapId,sx,sy,0,0,{sceneId,parentId:signInner}),
    create(starId,'native.path.v1',-15,-15,30,30,{sceneId,parentId:wrapId,parameters:{commands:STAR_PATH,fill:'#ffd23f',stroke:'#173545',strokeWidth:2.2}}),
    behavior(popId,wrapId,'animation',{property:'scale',from:.25,to:targetScale,seconds:.56,delay:.16+idx*.13,loop:false,easing:'ease-out'}),
   );
   starActions.push({kind:'animate',behaviorId:popId});
  });
 }
 return [
  {kind:'createScene',scene:{id:sceneId,label:title,role:'end-card'}},
  ...waterfrontBackdrop(sceneId,sceneId),
  // Top Classic Interstate Highway Sign Banner
  group(signWrap,0,0,390,700,{sceneId}),
  layout(signWrap,354,42,.8,.8),
  group(signInner,0,0,390,700,{sceneId,parentId:signWrap}),
  rectangle(sceneId+'.sign.outer',35,60,320,66,signFill,{sceneId,parentId:signInner,parameters:{stroke:'#173545',strokeWidth:3,radius:14}}),
  rectangle(sceneId+'.sign.trim',42,67,306,52,signFill,{sceneId,parentId:signInner,parameters:{stroke:'#ffffff',strokeWidth:2.5,radius:9}}),
  ...starOps,
  text(sceneId+'.title',title,46,72,298,42,{sceneId,parentId:signInner,parameters:{fontSize:21,color:'#ffffff'}}),
  behavior(sceneId+'.sign.fade',signInner,'animation',{property:'opacity',from:0,to:1,seconds:.5,loop:false,easing:'ease-out'}),
  behavior(sceneId+'.sign.glide',signInner,'animation',{property:'y',from:-16,to:0,seconds:.55,loop:false,easing:'ease-out'}),
  // Center Wide Cream Architectural Live-City Showcase Poster + Dark-Asphalt Telemetry Strip
  group(posterWrap,0,0,390,700,{sceneId}),
  layout(posterWrap,6,-102,.92,.92),
  group(posterInner,0,0,390,700,{sceneId,parentId:posterWrap}),
  rectangle(sceneId+'.poster.mat',18,146,354,326,'#fff9ec',{sceneId,parentId:posterInner,parameters:{stroke:'#173545',strokeWidth:4,radius:20}}),
  rectangle(sceneId+'.poster.sky',28,156,334,254,'#d6f0f4',{sceneId,parentId:posterInner,parameters:{radius:12}}),
  ...cityOps,
  rectangle(sceneId+'.telemetry.bar',28,418,334,42,'#1e2d3b',{sceneId,parentId:posterInner,parameters:{stroke:'#ffd23f',strokeWidth:2,radius:12}}),
  text(sceneId+'.subtitle',telemetry,34,422,322,34,{sceneId,parentId:posterInner,parameters:{fontSize:14,fontWeight:'700',color:'#ffd23f'}}),
  behavior(sceneId+'.poster.fade',posterInner,'animation',{property:'opacity',from:0,to:1,seconds:.58,delay:.06,loop:false,easing:'ease-out'}),
  behavior(sceneId+'.poster.glide',posterInner,'animation',{property:'y',from:18,to:0,seconds:.62,delay:.06,loop:false,easing:'ease-out'}),
  // Bottom Floating Tangerine-Gold Glossy Store CTA (independent of poster mat!)
  group(ctaDock,0,0,390,700,{sceneId}),
  layout(ctaDock,346,-218,.84,.84),
  group(ctaInner,0,0,390,700,{sceneId,parentId:ctaDock}),
  group(ctaWrap,195,556,0,0,{sceneId,parentId:ctaInner}),
  button(ctaId,-138,-36,276,72,'#ff9f1c',{sceneId,parentId:ctaWrap,parameters:{presentation:'shiny-cta',hoverFill:'#ffb84d',pressedFill:'#e08200',stroke:'#142733',strokeWidth:3.5,radius:18}}),
  text(ctaId+'.label',cta,0,0,276,72,{sceneId,parentId:ctaId,parameters:{fontSize:19,color:'#142733'}}),
  press(ctaId),
  behavior(sceneId+'.cta.pulse',ctaWrap,'animation',{property:'scale',from:.985,to:1.028,seconds:2.2,loop:true,easing:'ease-in-out'}),
  behavior(sceneId+'.cta.fade',ctaInner,'animation',{property:'opacity',from:0,to:1,seconds:.6,delay:.12,loop:false,easing:'ease-out'}),
  behavior(sceneId+'.cta.glide',ctaInner,'animation',{property:'y',from:20,to:0,seconds:.65,delay:.12,loop:false,easing:'ease-out'}),
  // Gentle full-screen metropolitan celebration confetti
  ...(win?[
   behavior(confettiId,ctaDock,'emitter',{shape:'confetti',coverage:'screen',count:52,color:'#ffd23f',color2:'#ff9f1c',color3:'#1ec28b',speed:82,lifetime:3.8,gravity:42,spread:360}),
   behavior(confettiTimerId,ctaDock,'timer',{seconds:2.8,repeat:true}),
   binding(sceneId+'.confetti.loop',{kind:'timer',behaviorId:confettiTimerId},[{kind:'emit',behaviorId:confettiId}]),
  ]:[]),
  binding(sceneId+'.enter',{kind:'sceneEnter',sceneId},[
   ...(win?[{kind:'emit',behaviorId:confettiId},...starActions]:[]),
   {kind:'animate',behaviorId:sceneId+'.sign.fade'},
   {kind:'animate',behaviorId:sceneId+'.sign.glide'},
   {kind:'animate',behaviorId:sceneId+'.poster.fade'},
   {kind:'animate',behaviorId:sceneId+'.poster.glide'},
   {kind:'animate',behaviorId:sceneId+'.cta.fade'},
   {kind:'animate',behaviorId:sceneId+'.cta.glide'},
   {kind:'animate',behaviorId:sceneId+'.cta.pulse'},
   {kind:'playAudio',behaviorId:`traffic.${win?'win':'loss'}`},
  ]),
  binding(sceneId+'.store',{kind:'click',componentId:ctaId},[{kind:'store'}]),
 ];
}

export async function createTrafficTycoonProject(){
 const {records:assets,plan}=await loadGameAssets('assets/tora-traffic/plan.json','assets/tora-traffic/audio-plan.json');
 const proj=plan.projection;
 const S=386/proj.canvasW;
 const MAP_H=Math.round(proj.canvasH*S);
 const MAP_Y=68;
 const tileCenter=(tx,ty,scale=S,mapY=MAP_Y)=>({
  x:Math.round((proj.originX+(tx-ty)*proj.halfW)*scale*10)/10,
  y:Math.round((mapY+(proj.originY+(tx+ty)*proj.halfH)*scale)*10)/10,
 });

 // S-curve Express Highway from Depot (1,4) -> Gap 1 (1,3) -> Curve (1,2) -> (2,2) -> Gap 2 (3,2) -> Curve (4,2) -> Gap 3 (4,1) -> Market (4,0)
 const makeHighway=(scale=S,mapY=MAP_Y)=>{
  const pDepot=tileCenter(1,4.15,scale,mapY);
  const pStop1=tileCenter(1,3.82,scale,mapY);
  const pGap1=tileCenter(1,3,scale,mapY);
  const pCorner1=tileCenter(1,2,scale,mapY);
  const pStop2=tileCenter(2.18,2,scale,mapY);
  const pGap2=tileCenter(3,2,scale,mapY);
  const pCorner2=tileCenter(4,2,scale,mapY);
  const pStop3=tileCenter(4,1.82,scale,mapY);
  const pGap3=tileCenter(4,1,scale,mapY);
  const pMarket=tileCenter(4,0,scale,mapY);
  return {
   pDepot,pGap1,pGap2,pGap3,pMarket,
   nodes:[
    {id:'depot',...pDepot},{id:'stop1',...pStop1},{id:'corner1',...pCorner1},
    {id:'stop2',...pStop2},{id:'corner2',...pCorner2},{id:'stop3',...pStop3},{id:'market',...pMarket},
   ],
   edges:[
    {id:'e.start',from:'depot',to:'stop1',enabled:true,bidirectional:false,speedScale:1.1},
    {id:'e.gap1',from:'stop1',to:'corner1',enabled:false,bidirectional:false,speedScale:1.25},
    {id:'e.mid',from:'corner1',to:'stop2',enabled:true,bidirectional:false,speedScale:1.25},
    {id:'e.gap2',from:'stop2',to:'corner2',enabled:false,bidirectional:false,speedScale:1.3},
    {id:'e.turn',from:'corner2',to:'stop3',enabled:true,bidirectional:false,speedScale:1.3},
    {id:'e.gap3',from:'stop3',to:'market',enabled:false,bidirectional:false,speedScale:1.45},
   ],
  };
 };
 const hw=makeHighway();
 // Live ambient waterfront boulevard along the turquoise harbor canal: (2,4) <-> (5,4)
 const makeWaterfront=(scale=S,mapY=MAP_Y)=>({
  start:tileCenter(2.1,4,scale,mapY),
  nodes:[{id:'wf.w',...tileCenter(2.1,4,scale,mapY)},{id:'wf.e',...tileCenter(5.15,4,scale,mapY)}],
  edges:[{id:'wf.e1',from:'wf.w',to:'wf.e',enabled:true,bidirectional:true,speedScale:1}],
 });
 const wf=makeWaterfront();

 const BACK_PROPS=[
  ['bldg.house','building.house',0,1,44,48,0,2],
  ['bldg.office','building.office',2,0,48,78,0,2],
  ['tree.n1','prop.tree',0,0,22,30,0,-2],
  ['tree.n2','prop.tree',2,1,22,30,0,-2],
  ['bldg.market','building.market',5,0,50,54,0,2],
  ['bldg.tower','building.tower',6,1,46,64,0,2],
  ['tree.w1','prop.tree',0,2,22,30,0,-2],
 ];
 const FORE_PROPS=[
  ['bldg.depot','building.depot',0,4,50,54,0,2],
  ['bldg.cafe','building.cafe',2,3,42,44,0,4],
  ['bldg.shop','building.shop',6,2,46,50,0,2],
  ['bldg.villa','building.villa',5,3,46,62,0,2],
  ['tree.s1','prop.tree',3,3,22,30,0,-2],
  ['tree.s2','prop.tree',5,2,22,30,0,-2],
  ['lamp.s1','prop.lamp',6,3,16,28,0,0],
 ];
 const placeProp=(id,asset,tx,ty,w,h,dx=0,dy=0,opts={},scale=S,mapY=MAP_Y)=>{
  const c=tileCenter(tx,ty,scale,mapY);
  const sw=Math.round(w*(scale/S)),sh=Math.round(h*(scale/S));
  return image(id,asset,Math.round(c.x-sw/2+dx*(scale/S)),Math.round(c.y-sh+14*(scale/S)+dy*(scale/S)),sw,sh,opts);
 };

 // ZERO opaque '+' button! Direct-tap invisible 58x58 hit target (>= 44 CSS px even at 320x568) paired with an open-center translucent pulsing golden blueprint diamond so the city, road, and taxi are 100% unobstructed!
 const buildPad=(gapId,pos,visibleInitial)=>{
  const anchorId=`${gapId}.anchor`,btnId=`${gapId}.btn`;
  return [
   group(anchorId,Math.round(pos.x),Math.round(pos.y),0,0,{parentId:'city',parameters:{visible:visibleInitial}}),
   button(btnId,-29,-29,58,58,'#ffd23f00',{
    parentId:anchorId,
    parameters:{visible:visibleInitial,hoverFill:'#ffd23f00',pressedFill:'#ffd23f00',stroke:'#ffd23f00',strokeWidth:0,radius:29},
   }),
   create(`${gapId}.outline`,'native.path.v1',0,0,58,58,{
    parentId:btnId,
    parameters:{commands:GAP_DIAMOND_PATH,fill:'#ffd23f24',stroke:'#ffd23f',strokeWidth:2.8},
   }),
   press(btnId),
   behavior(`${gapId}.pulse`,anchorId,'animation',{property:'scale',from:.95,to:1.06,seconds:1.5,loop:true,easing:'ease-in-out'}),
   behavior(`${gapId}.sparks`,btnId,'emitter',{count:22,color:'#ffd23f',speed:145,lifetime:.6,gravity:85,spread:360,shape:'square'}),
  ];
 };

 // Helper to build the live animated miniature waterfront city inside Traffic Tycoon's end-card showcase poster
 const buildPosterCity=(sceneId,prefix,complete)=>{
  const S_WIN=326/proj.canvasW,MAP_H_WIN=Math.round(proj.canvasH*S_WIN),MAP_Y_WIN=44;
  const hwWin=makeHighway(S_WIN,MAP_Y_WIN),wfWin=makeWaterfront(S_WIN,MAP_Y_WIN);
  const cityId=`${prefix}.city.bg`;
  return [
   group(cityId,32,168,326,232,{sceneId,parentId:`${sceneId}.poster.inner`}),
   image(`${prefix}.city.base`,'city.base',0,MAP_Y_WIN,326,MAP_H_WIN,{sceneId,parentId:cityId,parameters:{fit:'stretch'}}),
   ...(complete?[
    image(`${prefix}.city.g1`,'road.gap1',0,MAP_Y_WIN,326,MAP_H_WIN,{sceneId,parentId:cityId,parameters:{fit:'stretch'}}),
    image(`${prefix}.city.g2`,'road.gap2',0,MAP_Y_WIN,326,MAP_H_WIN,{sceneId,parentId:cityId,parameters:{fit:'stretch'}}),
    image(`${prefix}.city.g3`,'road.gap3',0,MAP_Y_WIN,326,MAP_H_WIN,{sceneId,parentId:cityId,parameters:{fit:'stretch'}}),
   ]:[]),
   ...BACK_PROPS.map(([id,a,tx,ty,w,h,dx,dy])=>placeProp(`${prefix}.${id}`,a,tx,ty,w,h,dx,dy,{sceneId,parentId:cityId},S_WIN,MAP_Y_WIN)),
   // Live ambient police cruiser patrolling the turquoise harbor waterfront
   behavior(`${prefix}.wf.net`,cityId,'path-network',{nodes:wfWin.nodes,edges:wfWin.edges}),
   sprite(`${prefix}.patrol`,'vehicle.police',Math.round(wfWin.start.x-15),Math.round(wfWin.start.y-13),30,26,{sceneId,parentId:cityId}),
   behavior(`${prefix}.patrol.agent`,`${prefix}.patrol`,'path-agent',{
    networkBehaviorId:`${prefix}.wf.net`,startNode:'wf.w',targetNode:'wf.e',
    speed:46,spacing:0,cornerRadius:10,orientToPath:'iso-4',loop:'ping-pong',active:true,
   }),
   ...(complete?[
    behavior(`${prefix}.roads.net`,cityId,'path-network',{
     nodes:hwWin.nodes,edges:hwWin.edges.map(e=>({...e,enabled:true,bidirectional:true,speedScale:1.1})),
    }),
    sprite(`${prefix}.taxi`,'vehicle.taxi',Math.round(hwWin.pDepot.x-15),Math.round(hwWin.pDepot.y-13),30,26,{sceneId,parentId:cityId}),
    behavior(`${prefix}.taxi.agent`,`${prefix}.taxi`,'path-agent',{
     networkBehaviorId:`${prefix}.roads.net`,startNode:'depot',targetNode:'market',
     speed:74,spacing:0,cornerRadius:10,orientToPath:'iso-4',loop:'ping-pong',active:true,
    }),
    sprite(`${prefix}.cargo`,'vehicle.cargo',Math.round(hwWin.pMarket.x-16),Math.round(hwWin.pMarket.y-14),32,28,{sceneId,parentId:cityId}),
    behavior(`${prefix}.cargo.agent`,`${prefix}.cargo`,'path-agent',{
     networkBehaviorId:`${prefix}.roads.net`,startNode:'market',targetNode:'depot',
     speed:60,spacing:0,cornerRadius:10,orientToPath:'iso-4',loop:'ping-pong',active:true,
    }),
   ]:[]),
   ...FORE_PROPS.map(([id,a,tx,ty,w,h,dx,dy])=>placeProp(`${prefix}.${id}`,a,tx,ty,w,h,dx,dy,{sceneId,parentId:cityId},S_WIN,MAP_Y_WIN)),
  ];
 };

 const ops=[
  ...assetOperations(assets),
  ...waterfrontBackdrop('play'),
  group('city',2,150,386,300),
  layout('city',8,22,1.01,1.01),
  group('hud',58,12,274,78),
  layout('hud',430,36,.82,.82),
  group('traffic.audio'),
  ...audioRig('traffic',[
   {name:'ambient',assetId:'traffic.audio.ambient',bus:'music',loop:true,volume:.08,role:'ambient',cooldownMs:0},
   {name:'tap',assetId:'traffic.audio.tap',bus:'sfx',volume:.16,role:'tap',cooldownMs:40,pitchJitter:.03},
   {name:'reward',assetId:'traffic.audio.reward',bus:'sfx',volume:.18,role:'reward',cooldownMs:60},
   {name:'win',assetId:'traffic.audio.win',bus:'stinger',volume:.24,role:'win',cooldownMs:100},
   {name:'loss',assetId:'traffic.audio.loss',bus:'stinger',volume:.2,role:'loss',cooldownMs:100},
  ]),

  // Layer 1: Isometric waterfront metropolis + 3 snap-in paved road patches
  image('map.base','city.base',0,MAP_Y,386,MAP_H,{parentId:'city',parameters:{fit:'stretch'}}),
  image('map.gap1','road.gap1',0,MAP_Y,386,MAP_H,{parentId:'city',parameters:{fit:'stretch',visible:false}}),
  image('map.gap2','road.gap2',0,MAP_Y,386,MAP_H,{parentId:'city',parameters:{fit:'stretch',visible:false}}),
  image('map.gap3','road.gap3',0,MAP_Y,386,MAP_H,{parentId:'city',parameters:{fit:'stretch',visible:false}}),

  // Layer 2: Back-row landmarks & skyline
  ...BACK_PROPS.map(([id,a,tx,ty,w,h,dx,dy])=>placeProp(id,a,tx,ty,w,h,dx,dy,{parentId:'city'})),
  rectangle('market.badge',266,74,78,24,'#0f764e',{parentId:'city',parameters:{stroke:'#fff9ec',strokeWidth:2,radius:10}}),
  text('market.badge.label','MARKET',266,74,78,24,{parentId:'city',parameters:{fontSize:12,color:'#fff9ec'}}),

  // Path networks: S-curve Express Highway + Live Waterfront Boulevard
  behavior('roads.network','city','path-network',{nodes:hw.nodes,edges:hw.edges}),
  behavior('waterfront.network','city','path-network',{nodes:wf.nodes,edges:wf.edges}),
  behavior('deadline','city','timer',{seconds:30,repeat:false}),

  // Layer 3: Live Vehicles — Hero Express Taxi + Ambient Waterfront Police Cruiser!
  sprite('car.delivery','vehicle.taxi',Math.round(hw.pDepot.x-18),Math.round(hw.pDepot.y-15),36,30,{parentId:'city'}),
  behavior('car.delivery.agent','car.delivery','path-agent',{
   networkBehaviorId:'roads.network',startNode:'depot',targetNode:'stop1',
   speed:108,spacing:0,cornerRadius:12,orientToPath:'iso-4',loop:'none',active:true,
  }),
  sprite('car.patrol','vehicle.police',Math.round(wf.start.x-17),Math.round(wf.start.y-14),34,28,{parentId:'city'}),
  behavior('car.patrol.agent','car.patrol','path-agent',{
   networkBehaviorId:'waterfront.network',startNode:'wf.w',targetNode:'wf.e',
   speed:52,spacing:0,cornerRadius:10,orientToPath:'iso-4',loop:'ping-pong',active:true,
  }),

  // Layer 4: Foreground Depot, shops, trees & streetlamps
  ...FORE_PROPS.map(([id,a,tx,ty,w,h,dx,dy])=>placeProp(id,a,tx,ty,w,h,dx,dy,{parentId:'city'})),
  rectangle('depot.badge',16,214,70,24,'#173545',{parentId:'city',parameters:{stroke:'#ffd23f',strokeWidth:2,radius:10}}),
  text('depot.badge.label','DEPOT',16,214,70,24,{parentId:'city',parameters:{fontSize:12,color:'#fff9ec'}}),

  // Layer 5: 3 sequential open-center glowing blueprint road-build hit zones (ZERO opaque '+' badge hiding the map!)
  ...buildPad('gap1',hw.pGap1,true),
  ...buildPad('gap2',hw.pGap2,false),
  ...buildPad('gap3',hw.pGap3,false),

  // Animated pointing hand hints on each active open blueprint slot
  behavior('hint.gap1','city','tutorial-hand',{targetId:'gap1.btn',mode:'tap',idleDelaySeconds:.3,hideOnFirstInput:true}),
  behavior('hint.gap2','city','tutorial-hand',{targetId:'gap2.btn',mode:'tap',idleDelaySeconds:.9,hideOnFirstInput:false}),
  behavior('hint.gap3','city','tutorial-hand',{targetId:'gap3.btn',mode:'tap',idleDelaySeconds:.9,hideOnFirstInput:false}),

  // Crisp top HUD (clear of all ad-SDK safe areas in portrait & landscape)
  rectangle('hud.panel',0,0,274,78,'#fff9ec',{parentId:'hud',parameters:{stroke:'#173545',strokeWidth:3,radius:18}}),
  text('hud.title','TRAFFIC TYCOON',14,10,174,26,{parentId:'hud',parameters:{align:'left',fontSize:17,color:'#173545'}}),
  text('hud.roads','{{roads}} / 3',192,10,68,26,{parentId:'hud',parameters:{align:'right',fontSize:17,color:'#0f764e'}}),
  rectangle('roads.track',14,48,246,16,'#d8ebe7',{parentId:'hud',parameters:{radius:8}}),
  rectangle('roads.fill',14,48,246,16,'#22a86b',{parentId:'hud',parameters:{radius:8}}),
  behavior('roads.meter','roads.fill','value-meter',{variableId:'roads',min:0,max:3,axis:'x',direction:'positive',smoothingSeconds:.16}),

  // Purposeful Road-Builder Status Toolbar docked cleanly BELOW the city (hides ZERO gameplay!)
  group('builder.bar',37,540,316,82),
  layout('builder.bar',416,138,.86,.86),
  rectangle('builder.shell',0,0,316,82,'#173545f2',{parentId:'builder.bar',parameters:{stroke:'#ffd23f',strokeWidth:2.5,radius:18}}),
  text('builder.guide','TAP GLOWING ROAD TO BUILD',12,10,292,24,{parentId:'builder.bar',parameters:{fontSize:13,color:'#fff9ec'}}),
  rectangle('seg.1',14,42,88,28,'#2c5366',{parentId:'builder.bar',parameters:{stroke:'#ffd23f',strokeWidth:2,radius:10}}),
  text('seg.1.lbl','1',14,42,88,28,{parentId:'builder.bar',parameters:{fontSize:14,color:'#ffd23f'}}),
  rectangle('seg.2',114,42,88,28,'#244354',{parentId:'builder.bar',parameters:{stroke:'#5d8294',strokeWidth:1.5,radius:10}}),
  text('seg.2.lbl','2',114,42,88,28,{parentId:'builder.bar',parameters:{fontSize:14,color:'#b7d4de'}}),
  rectangle('seg.3',214,42,88,28,'#244354',{parentId:'builder.bar',parameters:{stroke:'#5d8294',strokeWidth:1.5,radius:10}}),
  text('seg.3.lbl','3',214,42,88,28,{parentId:'builder.bar',parameters:{fontSize:14,color:'#b7d4de'}}),

  // Variables
  variable('roads',0),
  variable('gap1.built',false),
  variable('gap2.built',false),
  variable('gap3.built',false),

  // Scene enter: start music + smooth cosine-breathing outline on Gap 1
  binding('traffic.enter',{kind:'sceneEnter',sceneId:'scene.play'},[
   {kind:'playAudio',behaviorId:'traffic.ambient'},
   {kind:'animate',behaviorId:'gap1.pulse'},
  ]),

  // Step 1: Tap Gap 1 -> road snaps in -> car immediately drives across to Gap 2!
  binding('build.gap1',{kind:'click',componentId:'gap1.btn'},[
   {kind:'set',variableId:'gap1.built',value:true},
   {kind:'set',variableId:'roads',value:1},
   {kind:'setComponent',componentId:'map.gap1',key:'visible',value:true},
   {kind:'setComponent',componentId:'gap1.anchor',key:'visible',value:false},
   {kind:'setComponent',componentId:'gap1.btn',key:'visible',value:false},
   {kind:'stopAnimation',behaviorId:'gap1.pulse'},
   {kind:'setComponent',componentId:'seg.1',key:'fill',value:'#22a86b'},
   {kind:'setComponent',componentId:'seg.1.lbl',key:'color',value:'#fff9ec'},
   {kind:'setComponent',componentId:'seg.2',key:'stroke',value:'#ffd23f'},
   {kind:'setComponent',componentId:'seg.2.lbl',key:'color',value:'#ffd23f'},
   {kind:'setPathEdge',behaviorId:'roads.network',edgeId:'e.gap1',enabled:true},
   {kind:'setPathTarget',componentId:'car.delivery',targetNode:'stop2'},
   {kind:'setComponent',componentId:'gap2.anchor',key:'visible',value:true},
   {kind:'setComponent',componentId:'gap2.btn',key:'visible',value:true},
   {kind:'animate',behaviorId:'gap2.pulse'},
   {kind:'emit',behaviorId:'gap1.sparks'},
   {kind:'floatingText',text:'ROAD 1 / 3!',componentId:'gap1.btn',color:'#fff9ec',fontSize:20,risePx:40,seconds:.95},
   {kind:'playAudio',behaviorId:'traffic.tap'},
   {kind:'playAudio',behaviorId:'traffic.reward'},
  ],{variableId:'gap1.built',op:'eq',value:false}),

  // Step 2: Tap Gap 2 -> road snaps in -> car immediately drives across to Gap 3!
  binding('build.gap2',{kind:'click',componentId:'gap2.btn'},[
   {kind:'set',variableId:'gap2.built',value:true},
   {kind:'set',variableId:'roads',value:2},
   {kind:'setComponent',componentId:'map.gap2',key:'visible',value:true},
   {kind:'setComponent',componentId:'gap2.anchor',key:'visible',value:false},
   {kind:'setComponent',componentId:'gap2.btn',key:'visible',value:false},
   {kind:'stopAnimation',behaviorId:'gap2.pulse'},
   {kind:'setComponent',componentId:'seg.2',key:'fill',value:'#22a86b'},
   {kind:'setComponent',componentId:'seg.2.lbl',key:'color',value:'#fff9ec'},
   {kind:'setComponent',componentId:'seg.3',key:'stroke',value:'#ffd23f'},
   {kind:'setComponent',componentId:'seg.3.lbl',key:'color',value:'#ffd23f'},
   {kind:'setPathEdge',behaviorId:'roads.network',edgeId:'e.gap2',enabled:true},
   {kind:'setPathTarget',componentId:'car.delivery',targetNode:'stop3'},
   {kind:'setComponent',componentId:'gap3.anchor',key:'visible',value:true},
   {kind:'setComponent',componentId:'gap3.btn',key:'visible',value:true},
   {kind:'animate',behaviorId:'gap3.pulse'},
   {kind:'emit',behaviorId:'gap2.sparks'},
   {kind:'floatingText',text:'ROAD 2 / 3!',componentId:'gap2.btn',color:'#fff9ec',fontSize:20,risePx:40,seconds:.95},
   {kind:'playAudio',behaviorId:'traffic.tap'},
   {kind:'playAudio',behaviorId:'traffic.reward'},
  ],{variableId:'gap2.built',op:'eq',value:false}),

  // Step 3: Tap Gap 3 -> road snaps in -> car zooms all the way into MARKET!
  binding('build.gap3',{kind:'click',componentId:'gap3.btn'},[
   {kind:'set',variableId:'gap3.built',value:true},
   {kind:'set',variableId:'roads',value:3},
   {kind:'setComponent',componentId:'map.gap3',key:'visible',value:true},
   {kind:'setComponent',componentId:'gap3.anchor',key:'visible',value:false},
   {kind:'setComponent',componentId:'gap3.btn',key:'visible',value:false},
   {kind:'stopAnimation',behaviorId:'gap3.pulse'},
   {kind:'setComponent',componentId:'seg.3',key:'fill',value:'#22a86b'},
   {kind:'setComponent',componentId:'seg.3.lbl',key:'color',value:'#fff9ec'},
   {kind:'setComponent',componentId:'builder.guide',key:'text',value:'EXPRESSWAY COMPLETE!'},
   {kind:'setPathEdge',behaviorId:'roads.network',edgeId:'e.gap3',enabled:true},
   {kind:'setPathTarget',componentId:'car.delivery',targetNode:'market'},
   {kind:'emit',behaviorId:'gap3.sparks'},
   {kind:'floatingText',text:'ROAD COMPLETE!',componentId:'gap3.btn',color:'#ffd23f',fontSize:22,risePx:44,seconds:1},
   {kind:'playAudio',behaviorId:'traffic.tap'},
   {kind:'playAudio',behaviorId:'traffic.reward'},
  ],{variableId:'gap3.built',op:'eq',value:false}),

  // Smooth arrival into the Urban Expressway Poster end card!
  binding('traffic.arrived',{kind:'pathArrive',componentId:'car.delivery',nodeId:'market'},[
   {kind:'changeScene',sceneId:'scene.win'},
  ]),
  binding('traffic.timeout',{kind:'timer',behaviorId:'deadline'},[{kind:'changeScene',sceneId:'scene.timeout'}]),

  ...trafficPosterEndScene({
   sceneId:'scene.win',title:'EXPRESSWAY OPEN!',telemetry:'3 / 3 ROADS · EXPRESSWAY LIVE',cta:'PLAY TRAFFIC TYCOON',
   win:true,signFill:'#0f764e',cityOps:buildPosterCity('scene.win','win',true),
  }),
  ...trafficPosterEndScene({
   sceneId:'scene.timeout',title:'FINISH THE HIGHWAY',telemetry:'BUILD ALL 3 ROADS TO MARKET',cta:'PLAY TRAFFIC TYCOON',
   win:false,signFill:'#c97a16',cityOps:buildPosterCity('scene.timeout','to',false),
  }),
 ];
 const {project}=finishProject('traffic-tycoon','Traffic Tycoon',ops,'https://play.google.com/store/apps/details?id=com.playablelab.traffic');
 project.creativeBrief.goal='Traffic Tycoon — sunlit waterfront isometric road-builder playable with live harbor traffic, open blueprint road gaps, and an express delivery highway from Depot to Market.';
 return {project,assets};
}

export const createGolfProof=createMiniGolfProject;
export const createTrafficProof=createTrafficTycoonProject;

export async function authorProjectThroughService(service,kind,projectId){
 const {project:original,assets}=kind==='golf'?await createMiniGolfProject():await createTrafficTycoonProject();
 const created=await service.create({id:projectId,name:original.creativeBrief.goal.split(' — ')[0],androidUrl:original.base.storeUrl});
 const operations=[];
 for(const asset of assets){
  const metadata=await registerSource(resolve(service.store.root,projectId),{id:asset.id,mime:asset.mime,data:asset.data,rights:asset.rights}),record={...metadata};delete record.optimization;
  operations.push({kind:'registerAsset',asset:{...record,rights:asset.rights,provenance:asset.provenance}});
 }
 const seen=new Set();
 for(const key of ['scenes','components','variables','gameplay','events','eventBindings']){
  for(const record of original[key]){
   if(key==='scenes'&&record.id==='scene.play')continue;
   if(seen.has(record.id))continue;seen.add(record.id);
   if(key==='scenes')operations.push({kind:'createScene',scene:record});
   else if(key==='components')operations.push({kind:'createComponent',component:record});
   else if(key==='variables')operations.push({kind:'putVariable',variable:record});
   else if(key==='gameplay')operations.push({kind:'putBehavior',behavior:record});
   else if(key==='events')operations.push({kind:'putEvent',event:record});
   else{
    const {eventId,...bindingRecord}=record;
    operations.push({kind:'putBinding',binding:{...bindingRecord,event:original.events.find(event=>event.id===eventId)}});
   }
  }
 }
 let expected={revisionId:created.revisionId,contentHash:created.contentHash},committed=created;
 const chunkSize=240;
 for(let start=0;start<operations.length;start+=chunkSize){
  const slice=operations.slice(start,start+chunkSize);
  const envelope={format:'tora-transaction-1',expected,operations:slice};
  const preview=await service.preview(projectId,envelope);
  committed=await service.transact(projectId,{...envelope,previewDigest:preview.previewDigest});
  expected={revisionId:committed.revisionId,contentHash:committed.contentHash};
 }
 return {projectId,revisionId:committed.revisionId,contentHash:committed.contentHash,operations};
}

async function author(kind,projectId,output){
 const tools=new NativeAgentTools();
 const {revisionId,operations}=await authorProjectThroughService(tools.service,kind,projectId);
 await mkdir(output,{recursive:true});
 await writeFile(resolve(output,'operations.json'),JSON.stringify(operations,null,2)+'\n');
 await tools.run({command:'export',id:projectId,format:'project',output:resolve(output,'editable-project.tora.json')});
 const standalone=await tools.service.export(projectId,{revisionId,target:'standalone-browser-draft'});
 await writeFile(resolve(output,'standalone.html'),standalone.html);
 await writeFile(resolve(output,'standalone-manifest.json'),JSON.stringify(standalone.manifest,null,2)+'\n');
 const unity=await tools.service.export(projectId,{revisionId,target:'unity-ads-ua-playable'});
 await writeFile(resolve(output,'index.html'),unity.html);
 await writeFile(resolve(output,'unity-manifest.json'),JSON.stringify(unity.manifest,null,2)+'\n');
 return {projectId,output,bytes:unity.manifest.bytes};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const kind=process.argv[2]??'golf';
 const result=await author(kind,process.argv[3]??(kind==='golf'?'mini-golf':'traffic-tycoon'),resolve(process.argv[4]??`reports/native-primitives/${kind}`));
 process.stdout.write(JSON.stringify(result)+'\n');
}
