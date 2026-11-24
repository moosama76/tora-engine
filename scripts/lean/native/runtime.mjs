/* global Image,atob,navigator,window,document,devicePixelRatio,requestAnimationFrame,cancelAnimationFrame,Path2D */
import {multiplyMatrix,inverseMatrix,identityMatrix} from '../scene-document.mjs';
import {createMatchBoard} from './match-board.mjs';
import {stepPhysics,predictTrajectory} from './physics-2d.mjs';
/* 3d:start */
import {stepPhysics3d,predictTrajectory3d,ground3d} from './physics-3d.mjs';
import {createStage3dManager} from './stage-3d.mjs';
/* 3d:end */
import {createPathNetwork} from './path-network.mjs';
import {drawPixelText,measurePixelText} from './pixel-text.mjs';
import {drawPixelConfetti,drawPixelCta,drawShinyCta,drawVectorConfetti,pixelConfetti,screenConfetti,screenVectorConfetti,vectorConfetti} from './presentation.mjs';
import {createUnityAdsBridge} from '../../../packages/adapters/src/unity.ts';
import {createAppLovinBridge} from '../../../packages/adapters/src/applovin.ts';
export function createNetworkBridge(network){
 if(network==='standalone')return undefined;
 if(network==='unity-ads-ua-playable')return createUnityAdsBridge();
 if(network==='applovin-growth-playable')return createAppLovinBridge();
 throw Error('E_NATIVE_TARGET');
}
export function computeSafeArea(stage){
 const zones=[
  {id:'sdk-top-left',left:0,top:0,right:Math.min(48,stage.width),bottom:Math.min(48,stage.height)},
  {id:'sdk-top-right',left:Math.max(0,stage.width-56),top:0,right:stage.width,bottom:Math.min(56,stage.height)},
  {id:'sdk-bottom-left',left:0,top:Math.max(0,stage.height-28),right:Math.min(48,stage.width),bottom:stage.height},
 ];
 return {left:Math.min(48,stage.width),top:Math.min(56,stage.height),right:Math.max(0,stage.width-56),bottom:Math.max(0,stage.height-28),zones};
}
function measuredTextWidth(ctx,value){const width=ctx.measureText?.(value)?.width,size=/(\d+(?:\.\d+)?)px/.exec(ctx.font||'');return Number.isFinite(width)?width:[...value].length*(size?Number(size[1]):16)*.6;}
function standardTextLines(ctx,text,p,fontSize){
 ctx.font=p.fontWeight+' '+fontSize+'px '+p.fontFamily;
 const availableWidth=Math.max(0,p.width-2*(p.padding??4)),lines=[];
 for(const paragraph of String(text).split('\n')){
  if(p.wrap===false){lines.push(paragraph);continue;}
  const words=paragraph.trim()?paragraph.trim().split(/\s+/):[''];
  let line;
  for(const word of words){
   const candidate=line?line+' '+word:word;
   if(measuredTextWidth(ctx,candidate)<=availableWidth){line=candidate;continue;}
   if(line)lines.push(line);
   if(measuredTextWidth(ctx,word)<=availableWidth){line=word;continue;}
   let part='';
   for(const char of word){
    if(part&&measuredTextWidth(ctx,part+char)>availableWidth){lines.push(part);part=char;}
    else part+=char;
   }
   line=part;
  }
  lines.push(line);
 }
 return lines;
}
export function layoutStandardText(ctx,text,p){
 const padding=p.padding??4,availableWidth=Math.max(0,p.width-2*padding),availableHeight=Math.max(0,p.height-2*padding),minimum=Math.min(p.fontSize,p.minFontSize??12);
 let fontSize=p.fontSize,lines=standardTextLines(ctx,text,p,fontSize),measure;
 const calculate=()=>{
  ctx.font=p.fontWeight+' '+fontSize+'px '+p.fontFamily;
  const renderedWidth=Math.max(0,...lines.map(line=>measuredTextWidth(ctx,line))),lineBox=fontSize*(p.lineHeight??1.2),truncated=lines.length>16;
  if(truncated)lines=lines.slice(0,16);
  const renderedHeight=lines.length*lineBox;
  return {lines,fontSize,scale:fontSize/p.fontSize,renderedWidth,renderedHeight,availableWidth,availableHeight,padding,lineHeight:lineBox,overflowsWidth:renderedWidth>availableWidth+.01,overflowsHeight:truncated||renderedHeight>availableHeight+.01,unsupportedChars:[]};
 };
 measure=calculate();
 if(p.autoFit!==false)while((measure.overflowsWidth||measure.overflowsHeight)&&fontSize>minimum){fontSize=Math.max(minimum,fontSize-1);lines=standardTextLines(ctx,text,p,fontSize);measure=calculate();}
 return measure;
}
function drawStandardText(ctx,text,p){
 const metrics=layoutStandardText(ctx,text,p),padding=metrics.padding;
 ctx.fillStyle=p.color;ctx.font=p.fontWeight+' '+metrics.fontSize+'px '+p.fontFamily;ctx.textAlign=p.align;ctx.textBaseline='middle';
 const x=p.align==='left'?padding:p.align==='right'?p.width-padding:p.width/2,top=(p.height-metrics.renderedHeight)/2;
 metrics.lines.forEach((line,index)=>ctx.fillText(line,x,top+(index+.5)*metrics.lineHeight));
 return metrics;
}
/** One runtime for all native projects. Author data never supplies executable functions. */
export function mountNative(project,canvas,{edit=false,sceneId=project.base.startScene,onSelect=()=>{},network='standalone'/* review:start */,review=false/* review:end */}={}){
 const bridge=createNetworkBridge(network);
 const ctx=canvas.getContext('2d'),byId=new Map(project.components.map(c=>[c.id,c])),assets=new Map(project.assets.map(a=>[a.id,a])),images=new Map(),eventDefinitions=new Map(project.events.map(e=>[e.id,e]));
 const responsiveLayouts=new Map(project.gameplay.filter(behavior=>behavior.kind==='responsive-layout').map(behavior=>[behavior.componentId,behavior.parameters]));
 const reducedMotion=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
 let paintedLandscape,ctaAppearances=new Map(),previousCtaAppearances=ctaAppearances;
 function viewport(){
  const landscape=responsiveLayouts.size>0&&canvas.clientWidth>canvas.clientHeight;
  return {width:landscape?Math.max(project.base.width,project.base.height):project.base.width,height:landscape?Math.min(project.base.width,project.base.height):project.base.height,landscape};
 }
 function refreshOrientation(){
  if(paintedLandscape!==viewport().landscape){cancelInput();render();}
 }
 for(const a of project.assets)if(a.mime.startsWith('image/')){const img=new Image();img.src='data:'+a.mime+';base64,'+a.data;images.set(a.id,img);}
 let scene=sceneId,variables={},instances=[],particles=[],animations=[],queue=[],contacts=new Set(),time=0,ambientTime=0,serial=0,acc=0,last=0,paused=false,frameEvents=0,frameActions=0,halted=false,diagnostics=[],audio,audioUnlock,drag,hover,pressed,pressPointerId,raf,transition,selected,paint=[],pendingStore,floatingTexts=[],screenFlashes=[],shake,tutorialInputAt=0,tutorialHadInput=false,activeTutorialHands=0,started=network==='standalone',networkReady=network==='standalone',networkVisible=network==='standalone',closed=false,destroyed=false;
 const overrides=new Map(),timers=new Map(),runtimeNodes=new Map(),spriteMotion=new Map(),audioSources=new Set(),decodedAudio=new Map(),loopingAudio=new Set(),pendingLoopAudio=new Map(),audioVoices=new Map(),audioCooldowns=new Map(),audioPitchCounts=new Map(),pressStates=new Map(),matchCells=new Map();let audioEpoch=0,blockedAudio=0,matchSelected,matchGesture;
 const matchBoards=new Map(),matchArtwork=new Map(),physicsBodies=new Map(),pathNetworks=new Map(),oscillations=new Map(),meterStates=new Map(),cameraStates=new Map();let aiming,currentRenderScale=1,currentRenderDpr=1;
 /* 3d:start */
 const bodies3d=new Map(),oscillations3d=new Map(),projected3d=new Map();let aiming3d,stage3dMgr;
 if(project.components.some(c=>c.contract==='native.stage3d.v1'))stage3dMgr=createStage3dManager(project,assets,()=>{if(!destroyed)Promise.resolve().then(()=>{if(!destroyed)render();});});
 /* 3d:end */
 const object=id=>runtimeNodes.get(id)??byId.get(id);
 const stopAudio=()=>{audioEpoch++;loopingAudio.clear();pendingLoopAudio.clear();audioCooldowns.clear();audioPitchCounts.clear();for(const source of audioSources)try{source.stop();}catch{/* A completed voice may already be stopped. */}audioSources.clear();audioVoices.clear();};
 const cancelAim=pointerId=>{if(!aiming||(pointerId!==undefined&&aiming.pointerId!==pointerId))return false;const id=aiming.pointerId;if(aiming.behavior.parameters.powerVariableId)variables[aiming.behavior.parameters.powerVariableId]=0;aiming=undefined;try{if(canvas.hasPointerCapture?.(id))canvas.releasePointerCapture?.(id);}catch{/* Capture may already have been released by the host. */}return true;};
 /* 3d:start */
 const cancelAim3d=pointerId=>{if(!aiming3d||(pointerId!==undefined&&aiming3d.pointerId!==pointerId))return false;const id=aiming3d.pointerId;if(aiming3d.behavior.parameters.powerVariableId)variables[aiming3d.behavior.parameters.powerVariableId]=0;stage3dMgr?.getStage(byId.get(aiming3d.stageId))?.setGuide([]);aiming3d=undefined;try{if(canvas.hasPointerCapture?.(id))canvas.releasePointerCapture?.(id);}catch{/* Capture may already have been released by the host. */}return true;};
 /* 3d:end */
 const cancelDrag=pointerId=>{if(!drag||(pointerId!==undefined&&drag.pointerId!==pointerId))return false;const id=drag.pointerId;drag=undefined;try{if(canvas.hasPointerCapture?.(id))canvas.releasePointerCapture?.(id);}catch{/* Capture may already have been released by the host. */}return true;};
 const finishPointer=e=>{if(pendingStore?.pointerId===e.pointerId)pendingStore=undefined;for(const press of pressStates.values())if(press.pointerId===e.pointerId&&press.held){press.held=false;press.releasedAt=time;}const owned=cancelDrag(e.pointerId);if(pressPointerId===e.pointerId){pressed=undefined;pressPointerId=undefined;return true;}return owned;};
 const despawn=id=>{if(drag&&runtimeNodes.get(drag.targetId)?.instanceId===id)cancelDrag();if(aiming&&runtimeNodes.get(aiming.targetId)?.instanceId===id)cancelAim();const removed=[];instances=instances.filter(i=>i.id!==id);for(const [key,c]of runtimeNodes)if(c.instanceId===id){removed.push(key);runtimeNodes.delete(key);overrides.delete(key);spriteMotion.delete(key);physicsBodies.delete(key);oscillations.delete(key);meterStates.delete(key);for(const network of pathNetworks.values())network.removeAgent(key);for(const timerKey of timers.keys())if(timerKey.endsWith(':'+key))timers.delete(timerKey);}animations=animations.filter(a=>!removed.includes(a.targetId));};
 const prototypeOwner=c=>{while(c){if(c.prototype)return c.id;c=object(c.parentId);}return undefined;};
 const state=()=>({viewport:viewport(),components:Object.fromEntries([...overrides].map(([id,value])=>[id,{...value,parameters:{...value.parameters}}])),mode:edit?'edit':'play',scene,variables:{...variables},time,instances:instances.map(i=>({id:i.id,prototypeId:i.prototypeId,x:i.transform[4],y:i.transform[5]})),particles:particles.length,animations:animations.length,contacts:contacts.size,spriteFrames:Object.fromEntries([...spriteMotion].map(([key,value])=>[key,value.frame??0])),input:{dragging:Boolean(drag),pointerId:drag?.pointerId??null,pressed:pressed??null},feedback:{presses:pressStates.size,floatingTexts:floatingTexts.length,flashes:screenFlashes.length,shaking:Boolean(shake),tutorialHands:activeTutorialHands},match:{boards:Object.fromEntries([...matchBoards].map(([id,board])=>[id,board.snapshot()])),selected:matchSelected??null,cells:[...matchCells].map(([id,cell])=>({id,...cell}))},physics:physicsSnapshot(),/* 3d:start */physics3d:physics3dSnapshot(),/* 3d:end */paths:Object.fromEntries([...pathNetworks].map(([id,network])=>[id,network.snapshot()])),audio:{state:audio?.state??'locked',voices:audioSources.size,blocked:blockedAudio},network:{target:network,ready:networkReady,visible:networkVisible,started,closed},diagnostics:[...diagnostics]});
 const running=()=>!edit&&!paused&&!document.hidden&&networkReady&&networkVisible&&started&&!closed;
 const cancelInput=()=>{pendingStore=undefined;cancelAim();/* 3d:start */cancelAim3d();/* 3d:end */cancelDrag();matchGesture=undefined;for(const board of matchBoards.values())board.cancelSelection();if(matchBoards.size)matchSelected=undefined;pressed=undefined;pressPointerId=undefined;pressStates.clear();};
 const diagnose=message=>{halted=true;diagnostics.push(message);diagnostics=diagnostics.slice(-16);queue=[];};
 const props=c=>({...c.parameters,...(c.prototypeId?overrides.get(c.prototypeId)?.parameters:{}),...overrides.get(c.runtimeId??c.id)?.parameters});
 function pressTransform(c,matrix){
  const press=pressStates.get(c.id);
  if(!press||reducedMotion?.matches)return matrix;
  const result=[...matrix],elapsed=press.held?0:time-(press.releasedAt??time),progress=press.held?0:Math.min(1,elapsed/press.behavior.springBackSeconds),scale=press.held?press.behavior.scaleDown:press.behavior.scaleDown+(1-press.behavior.scaleDown)*(1-(1-progress)**3),p=props(c);
  result[4]+=(1-scale)*(result[0]*p.width+result[2]*p.height)/2;
  result[5]+=(1-scale)*(result[1]*p.width+result[3]*p.height)/2;
  for(let axis=0;axis<4;axis++)result[axis]*=scale;
  return result;
 }
 function transform(c){
  const authored=c.transform,current=overrides.get(c.runtimeId??c.id)?.transform??authored;
  const layout=responsiveLayouts.get(c.prototypeId??c.id);
  if(!layout)return pressTransform(c,current);
  const stage=viewport(),result=[...current];
  if(stage.landscape){
   result[4]+=layout.x-authored[4];
   result[5]+=layout.y-authored[5];
   result[0]*=layout.scaleX;
   result[1]*=layout.scaleX;
   result[2]*=layout.scaleY;
   result[3]*=layout.scaleY;
  }
  const anchor=layout.anchor??'none';
  if(anchor==='none'&&!layout.respectSafeArea)return pressTransform(c,result);
  const safe=layout.respectSafeArea?computeSafeArea(stage):{left:0,top:0,right:stage.width,bottom:stage.height},p=props(c),mx=layout.marginX??0,my=layout.marginY??0;
  const width=Math.abs(result[0])*p.width+Math.abs(result[2])*p.height,height=Math.abs(result[1])*p.width+Math.abs(result[3])*p.height;
  if(anchor!=='none'){
   result[4]=anchor.endsWith('left')?safe.left+mx:anchor.endsWith('right')?safe.right-width-mx:(safe.left+safe.right-width)/2;
   result[5]=anchor.startsWith('top')?safe.top+my:anchor.startsWith('bottom')?safe.bottom-height-my:(safe.top+safe.bottom-height)/2;
  }else{
   result[4]=Math.max(safe.left+mx,Math.min(safe.right-width-mx,result[4]));
   result[5]=Math.max(safe.top+my,Math.min(safe.bottom-height-my,result[5]));
  }
  return pressTransform(c,result);
 }
 const children=id=>(runtimeNodes.has(id)?[...runtimeNodes.values()]:[...project.components,...instances]).filter(c=>c.parentId===id&&!c.prototype).sort((a,b)=>a.order-b.order||(a.id<b.id?-1:a.id>b.id?1:0));
 const roots=()=>project.components.filter(c=>c.sceneId===scene&&!c.parentId&&!c.prototype).sort((a,b)=>a.order-b.order||(a.id<b.id?-1:a.id>b.id?1:0));
 const emit=e=>{if(queue.length>=256){diagnose('Event queue budget exhausted');return;}queue.push(e);};
 function condition(c){if(!c)return true;if(c.all)return c.all.every(condition);if(c.any)return c.any.some(condition);const a=variables[c.variableId],b=c.compareVariableId?variables[c.compareVariableId]:c.value;return {eq:()=>a===b,ne:()=>a!==b,lt:()=>a<b,lte:()=>a<=b,gt:()=>a>b,gte:()=>a>=b}[c.op]();}
 function resetMatch(componentId){matchSelected=undefined;matchGesture=undefined;if(!componentId)matchCells.clear();for(const b of project.gameplay)if(b.kind==='match-tile'){const c=byId.get(b.componentId);if(componentId&&c.id!==componentId&&!isDescendant(c,componentId))continue;overrides.delete(c.id);matchCells.set(c.id,{row:b.parameters.row,column:b.parameters.column,group:b.parameters.group,sceneId:c.sceneId,boardId:c.parentId??c.sceneId});}}
 function initializeMatchBoards(){
  for(const behavior of project.gameplay.filter(item=>item.kind==='match-board')){
   if(matchBoards.has(behavior.componentId))continue;
   const boardId=behavior.componentId,parameters=behavior.parameters;
   const slots=project.gameplay.filter(item=>item.kind==='match-tile'&&byId.get(item.componentId).parentId===boardId).sort((a,b)=>a.parameters.row-b.parameters.row||a.parameters.column-b.parameters.column).map(item=>({id:item.componentId,...item.parameters}));
   const palette=new Map();
   for(const slot of slots)if(!palette.has(slot.group)){
    const component=byId.get(slot.id);
    palette.set(slot.group,{fill:component.parameters.fill,children:children(slot.id).filter(child=>['native.image.v1','native.text.v1'].includes(child.contract))});
   }
   matchArtwork.set(boardId,palette);
   const rowHeight=byId.get(slots[parameters.columns].id).transform[5]-byId.get(slots[0].id).transform[5];
   const paintSlot=(index,group,{from=index,progress=0,offsetRows=0,scale=1,opacity=1})=>{
    const slot=slots[index],component=byId.get(slot.id),source=byId.get(slots[from].id),art=palette.get(group),matrix=[...component.transform];
    matrix[4]+=(source.transform[4]-component.transform[4])*progress;
    matrix[5]+=(source.transform[5]-component.transform[5]+offsetRows*rowHeight)*progress;
    matrix[4]+=(1-scale)*(matrix[0]*component.parameters.width+matrix[2]*component.parameters.height)/2;
    matrix[5]+=(1-scale)*(matrix[1]*component.parameters.width+matrix[3]*component.parameters.height)/2;
    for(let axis=0;axis<4;axis++)matrix[axis]*=scale;
    overrides.set(slot.id,{...overrides.get(slot.id),transform:matrix,parameters:{...overrides.get(slot.id)?.parameters,fill:art.fill,opacity}});
    matchCells.get(slot.id).group=group;
    const targets=children(slot.id).filter(child=>['native.image.v1','native.text.v1'].includes(child.contract));
    targets.forEach((child,childIndex)=>{
     const sample=art.children[childIndex];
     if(!sample||sample.contract!==child.contract)return;
     const previous=overrides.get(child.id)??{transform:[...child.transform],parameters:{}};
     if(child.contract==='native.image.v1')previous.assetId=sample.assetSlots[0]?.assetId;
     else previous.parameters.text=sample.parameters.text;
     overrides.set(child.id,previous);
    });
   };
   const board=createMatchBoard({...parameters,slots,paint:paintSlot,onEvent:kind=>{matchSelected=undefined;emit({kind,componentId:boardId});}});
   matchBoards.set(boardId,board);
  }
 }
 function resetBoards(componentId){
  initializeMatchBoards();
  for(const [boardId,board]of matchBoards)if(!componentId||componentId===boardId||isDescendant(byId.get(boardId),componentId))board.reset();
 }
 function targetsFor(source){return prototypeOwner(source)?[...runtimeNodes.values()].filter(i=>i.prototypeId===source.id):[source];}
 function setWorldCenter(c,x,y){
  const p=props(c),current=overrides.get(c.id)??{transform:[...c.transform],parameters:{}},matrix=[...current.transform],parent=c.parentId?world(object(c.parentId)):identityMatrix(),local=point(inverseMatrix(parent),x,y);
  matrix[4]=local.x-(matrix[0]*p.width+matrix[2]*p.height)/2;matrix[5]=local.y-(matrix[1]*p.width+matrix[3]*p.height)/2;
  overrides.set(c.id,{...current,transform:matrix});if(c.prototypeId)c.transform=[...matrix];
 }
 function setComponentHeading(c,angle,flip=false){
  const current=overrides.get(c.id)??{transform:[...c.transform],parameters:{}},authored=byId.get(c.prototypeId??c.id)?.transform??c.transform;
  const sx=Math.hypot(authored[0],authored[1])*(flip?-1:1),sy=Math.hypot(authored[2],authored[3]);
  const total=angle+(flip?0:Math.atan2(authored[1],authored[0])),cos=Math.cos(total),sin=Math.sin(total),matrix=[...current.transform];
  matrix[0]=cos*sx;matrix[1]=sin*sx;matrix[2]=-sin*sy;matrix[3]=cos*sy;overrides.set(c.id,{...current,transform:matrix});
 }
 function physicsState(c,behavior){
  let body=physicsBodies.get(c.id);if(body)return body;
  const matrix=world(c),p=props(c),center=point(matrix,p.width/2,p.height/2);
  body={id:c.id,sourceId:behavior.componentId,instanceId:c.instanceId,x:center.x,y:center.y,vx:0,vy:0,width:Math.hypot(matrix[0],matrix[1])*p.width,height:Math.hypot(matrix[2],matrix[3])*p.height,angle:Math.atan2(matrix[1],matrix[0]),restElapsed:0,atRest:true,...behavior.parameters};
  physicsBodies.set(c.id,body);return body;
 }
 function collectPhysics(){
  const active=new Set(),bodies=[];
  for(const behavior of project.gameplay.filter(item=>item.kind==='physics-body')){
   const source=byId.get(behavior.componentId);if(source.sceneId!==scene)continue;
   for(const c of targetsFor(source)){
    if(!visible(c))continue;if(bodies.length>=64){diagnose('Physics body budget exhausted');break;}
    const body=physicsState(c,behavior),matrix=world(c),p=props(c),center=point(matrix,p.width/2,p.height/2);
    active.add(c.id);
    body.width=Math.hypot(matrix[0],matrix[1])*p.width;body.height=Math.hypot(matrix[2],matrix[3])*p.height;
    if(body.mode!=='dynamic'){
     const velocity=oscillations.get(c.id),parent=c.parentId?world(object(c.parentId)):identityMatrix(),lvx=velocity?.vx??0,lvy=velocity?.vy??0;
     body.x=center.x;body.y=center.y;body.angle=Math.atan2(matrix[1],matrix[0]);
     body.vx=parent[0]*lvx+parent[2]*lvy;body.vy=parent[1]*lvx+parent[3]*lvy;
    }else if(body.atRest){
     body.x=center.x;body.y=center.y;
    }
    bodies.push(body);
   }
  }
  for(const id of physicsBodies.keys())if(!active.has(id)&&!runtimeNodes.has(id))physicsBodies.delete(id);
  const zones=[];
  for(const behavior of project.gameplay.filter(item=>item.kind==='capture-zone')){
   const source=byId.get(behavior.componentId);if(source.sceneId!==scene)continue;
   for(const c of targetsFor(source))if(visible(c)){const matrix=world(c),p=props(c),center=point(matrix,p.width/2,p.height/2),scale=Math.max(.1,Math.min(Math.hypot(matrix[0],matrix[1]),Math.hypot(matrix[2],matrix[3])));zones.push({id:c.id,sourceId:source.id,instanceId:c.instanceId,x:center.x,y:center.y,...behavior.parameters,radius:behavior.parameters.radius*scale});}
  }
  return {bodies,zones};
 }
 function tickPhysics(dt){
  const {bodies,zones}=collectPhysics(),stage=viewport();
  stepPhysics({bodies,zones,bounds:{left:0,top:0,right:stage.width,bottom:stage.height},dt,onEvent:(kind,body,other)=>{
   const payload={kind,componentId:body.sourceId,instanceId:body.instanceId};if(other)payload.otherId=other.sourceId;emit(payload);
   if(kind==='zoneCapture'){
    const target=object(body.id),zone=byId.get(other.sourceId);
    if(other.hideCaptured&&target){const current=overrides.get(target.id)??{transform:[...target.transform],parameters:{}};current.parameters.visible=false;overrides.set(target.id,current);}
    if(other.stopBody&&zone&&target)setWorldCenter(target,other.x,other.y);
   }
  }});
  for(const body of bodies){
   const c=object(body.id);if(!c||body.mode!=='dynamic')continue;
   if(body.spinToRotation)setComponentHeading(c,body.angle??0);
   setWorldCenter(c,body.x,body.y);
  }
 }
 function tickOscillations(){
  for(const behavior of project.gameplay.filter(item=>item.kind==='oscillate')){
   const source=byId.get(behavior.componentId);if(source.sceneId!==scene)continue;
   for(const c of targetsFor(source)){
    let state=oscillations.get(c.id);if(!state){state={base:[...transform(c)],vx:0,vy:0};oscillations.set(c.id,state);}
    const p=behavior.parameters,angle=(time/p.periodSeconds+p.phase)*Math.PI*2,offset=Math.sin(angle)*p.amplitude,velocity=Math.cos(angle)*p.amplitude*Math.PI*2/p.periodSeconds,current=overrides.get(c.id)??{parameters:{}},matrix=[...state.base];
    if(p.axis==='x'){matrix[4]+=offset;state.vx=velocity;state.vy=0;}else{matrix[5]+=offset;state.vy=velocity;state.vx=0;}
    overrides.set(c.id,{...current,transform:matrix});oscillations.set(c.id,state);
   }
  }
 }
 function initializePathNetworks(){
  pathNetworks.clear();
  for(const behavior of project.gameplay.filter(item=>item.kind==='path-network')){
   const gates=project.gameplay.filter(item=>item.kind==='path-gate'&&item.parameters.networkBehaviorId===behavior.id);
   const network=createPathNetwork({id:behavior.id,nodes:behavior.parameters.nodes,edges:behavior.parameters.edges,gates,onEvent:(kind,event)=>{
    const c=object(event.componentId),source=c?.prototypeId??event.componentId;emit({kind,componentId:source,instanceId:c?.instanceId,...(event.nodeId?{nodeId:event.nodeId}:{})});
   }});
   pathNetworks.set(behavior.id,network);
  }
 }
 function syncPaths(dt,step=true){
  let count=0;
  for(const behavior of project.gameplay.filter(item=>item.kind==='path-agent')){
   const source=byId.get(behavior.componentId),network=pathNetworks.get(behavior.parameters.networkBehaviorId);if(source.sceneId!==scene||!network)continue;
   for(const c of targetsFor(source)){
    if(++count>64){diagnose('Path agent budget exhausted');break;}
    let agent=network.getAgent(c.id);
    if(!agent)agent=network.addAgent({...behavior.parameters,id:c.id,startNode:c.pathStartNode??behavior.parameters.startNode,targetNode:c.pathTargetNode??behavior.parameters.targetNode});
    agent.speedMultiplier=Math.max(0,Number(behavior.parameters.speedMultiplierVariableId?variables[behavior.parameters.speedMultiplierVariableId]:1));
   }
  }
  if(step)for(const [behaviorId,network]of pathNetworks){const owner=project.gameplay.find(b=>b.id===behaviorId);if(byId.get(owner.componentId).sceneId===scene)network.tick(dt);}
  for(const behavior of project.gameplay.filter(item=>item.kind==='path-agent')){
   const source=byId.get(behavior.componentId),network=pathNetworks.get(behavior.parameters.networkBehaviorId);if(source.sceneId!==scene||!network)continue;
   for(const c of targetsFor(source)){
    const agent=network.getAgent(c.id);if(!agent)continue;
    if(agent.orientToPath==='rotate')setComponentHeading(c,agent.heading);
    else if(agent.orientToPath==='flip-x')setComponentHeading(c,0,agent.flipX);
    else if(agent.orientToPath==='iso-4'){const current=overrides.get(c.id)??{transform:[...c.transform],parameters:{}};current.pathFrame=agent.frame;overrides.set(c.id,current);}
    const worldPoint=c.parentId?point(world(object(c.parentId)),agent.x,agent.y):agent;
    setWorldCenter(c,worldPoint.x,worldPoint.y);
   }
  }
 }
 function tickMetersAndCamera(dt){
  const activeMeters=new Set();
  for(const behavior of project.gameplay.filter(item=>item.kind==='value-meter')){
   const source=byId.get(behavior.componentId);if(source.sceneId!==scene)continue;
   for(const c of targetsFor(source)){
    const p=behavior.parameters,initialRaw=Number(variables[p.variableId]);
    let state=meterStates.get(c.id);if(!state){state={base:[...transform(c)],value:Number.isFinite(initialRaw)?Math.max(p.min,Math.min(p.max,initialRaw)):p.min};meterStates.set(c.id,state);}activeMeters.add(c.id);
    const target=Math.max(p.min,Math.min(p.max,initialRaw)),blend=p.smoothingSeconds?1-Math.exp(-dt/p.smoothingSeconds):1;
    state.value+=((Number.isFinite(target)?target:p.min)-state.value)*blend;
    const ratio=Math.max(0,Math.min(1,(state.value-p.min)/(p.max-p.min))),matrix=[...state.base],current=overrides.get(c.id)??{parameters:{}},size=p.axis==='x'?props(c).width:props(c).height;
    if(p.axis==='x'){matrix[0]*=ratio;matrix[1]*=ratio;}else{matrix[2]*=ratio;matrix[3]*=ratio;}
    if(p.direction==='negative'){const shift=size*(1-ratio);if(p.axis==='x'){matrix[4]+=state.base[0]*shift;matrix[5]+=state.base[1]*shift;}else{matrix[4]+=state.base[2]*shift;matrix[5]+=state.base[3]*shift;}}
    overrides.set(c.id,{...current,transform:matrix});
   }
  }
  for(const id of meterStates.keys())if(!activeMeters.has(id))meterStates.delete(id);
  for(const behavior of project.gameplay.filter(item=>item.kind==='camera-follow')){
   const owner=byId.get(behavior.componentId),target=object(behavior.parameters.targetId);if(owner.sceneId!==scene||!target)continue;
   let state=cameraStates.get(owner.id);if(!state){state={base:[...owner.transform],x:behavior.parameters.minX,y:behavior.parameters.minY};cameraStates.set(owner.id,state);}
   const relative=(c,root)=>{const chain=[];for(let current=c;current&&current.id!==root.id;current=object(current.parentId))chain.unshift(current);return chain.reduce((matrix,item)=>multiplyMatrix(matrix,transform(item)),identityMatrix());};
   const matrix=isDescendant(target,owner.id)?relative(target,owner):world(target),p=props(target),center=point(matrix,p.width/2,p.height/2),stage=viewport(),config=behavior.parameters;
   const maxX=Math.max(config.minX,config.maxX-stage.width/config.zoom),maxY=Math.max(config.minY,config.maxY-stage.height/config.zoom),tx=Math.max(config.minX,Math.min(maxX,center.x-stage.width/(2*config.zoom))),ty=Math.max(config.minY,Math.min(maxY,center.y-stage.height/(2*config.zoom))),blend=1-Math.exp(-config.smoothing*dt);
   state.x+=(tx-state.x)*blend;state.y+=(ty-state.y)*blend;
   const current=overrides.get(owner.id)??{parameters:{}},next=[...state.base];next[0]*=config.zoom;next[1]*=config.zoom;next[2]*=config.zoom;next[3]*=config.zoom;next[4]-=state.x*config.zoom;next[5]-=state.y*config.zoom;overrides.set(owner.id,{...current,transform:next});
  }
 }
 function physicsSnapshot(){return {bodies:[...physicsBodies.values()].map(body=>({id:body.id,sourceId:body.sourceId,x:body.x,y:body.y,vx:body.vx,vy:body.vy,atRest:Boolean(body.atRest),captured:Boolean(body.captured)})),aiming:aiming?{componentId:aiming.sourceId,pointerId:aiming.pointerId,power:aiming.power}:null};}
 /* 3d:start */
 function findStage3dOf(c){let cur=c;while(cur){if(cur.contract==='native.stage3d.v1')return cur;cur=cur.parentId?object(cur.parentId):undefined;}return undefined;}
 function body3dState(c,behavior){
  let body=bodies3d.get(c.id);if(body)return body;
  const p=props(c),stageComp=findStage3dOf(c);
  body={id:c.id,sourceId:behavior.componentId,stageId:stageComp?.id,x:p.x??0,y:p.y??0,z:p.z??0,vx:0,vy:0,vz:0,spin:0,atRest:true,captured:false,captureElapsed:0,airborne:false,restElapsed:0,movingTime:0,lastSafe:{x:p.x??0,y:p.y??0,z:p.z??0},...behavior.parameters};
  bodies3d.set(c.id,body);return body;
 }
 function collect3d(){
  const bodies=[],walls=[],zones=[];
  if(!stage3dMgr)return {bodies,walls,zones};
  for(const behavior of project.gameplay.filter(item=>item.kind==='physics-3d')){
   const source=byId.get(behavior.componentId);if(!source||source.sceneId!==scene||!visible(source))continue;
   const body=body3dState(source,behavior);
   if(body.mode==='dynamic')bodies.push(body);
   else walls.push(body);
  }
  for(const behavior of project.gameplay.filter(item=>item.kind==='capture-zone-3d')){
   const source=byId.get(behavior.componentId);if(!source||source.sceneId!==scene||!visible(source))continue;
   const p=props(source);
   zones.push({id:source.id,sourceId:source.id,x:p.x??0,y:p.y??0,z:p.z??0,...behavior.parameters});
  }
  return {bodies,walls,zones};
 }
 function tick3d(dt){
  if(!stage3dMgr)return;
  for(const behavior of project.gameplay.filter(item=>item.kind==='oscillate-3d')){
   const source=byId.get(behavior.componentId);if(!source||source.sceneId!==scene)continue;
   let st=oscillations3d.get(source.id);if(!st){const p=props(source);st={x:p.x??0,y:p.y??0,z:p.z??0};oscillations3d.set(source.id,st);}
   const bp=behavior.parameters,arg=time*bp.angularSpeed+bp.phase,offset=Math.sin(arg)*bp.amplitude,vel=Math.cos(arg)*bp.amplitude*bp.angularSpeed;
   const body=bodies3d.get(source.id)??(project.gameplay.find(b=>b.kind==='physics-3d'&&b.componentId===source.id)?body3dState(source,project.gameplay.find(b=>b.kind==='physics-3d'&&b.componentId===source.id)):undefined);
   const nx=st.x+(bp.axis==='x'?offset:0),ny=st.y+(bp.axis==='y'?offset:0),nz=st.z+(bp.axis==='z'?offset:0);
   if(body){body.x=nx;body.y=ny;body.z=nz;body.vx=bp.axis==='x'?vel:0;body.vy=bp.axis==='y'?vel:0;body.vz=bp.axis==='z'?vel:0;}
   else{const o=overrides.get(source.id)??{transform:[...source.transform],parameters:{}};o.parameters.x=nx;o.parameters.y=ny;o.parameters.z=nz;overrides.set(source.id,o);}
  }
  const {bodies,walls,zones}=collect3d();
  stepPhysics3d({bodies,walls,zones,dt,onEvent:(kind,body,other)=>{
   const payload={kind,componentId:body.sourceId};if(other)payload.otherId=other.sourceId;emit(payload);
  }});
  for(const body of bodies)if(body.captured)body.captureElapsed=(body.captureElapsed??0)+dt;
 }
 function project3dToStage(compId){
  if(!stage3dMgr)return null;
  const c=object(compId);if(!c||c.contract!=='native.mesh3d.v1')return null;
  const stageComp=findStage3dOf(c);if(!stageComp)return null;
  const entry=stage3dMgr.getStage(stageComp);if(!entry||!entry.lastWidth||!entry.lastHeight)return null;
  const body=bodies3d.get(c.id),p=props(c);
  const local=entry.project({x:body?body.x:(p.x??0),y:body?body.y:(p.y??0),z:body?body.z:(p.z??0)},entry.lastWidth,entry.lastHeight);
  return point(world(stageComp),local.x,local.y);
 }
 function aim3dVelocity(){
  if(!aiming3d||!stage3dMgr)return {vx:0,vz:0,power:0,pull:0};
  const stageComp=byId.get(aiming3d.stageId),entry=stage3dMgr.getStage(stageComp),body=bodies3d.get(aiming3d.targetId),bp=aiming3d.behavior.parameters;
  if(!entry||!body||!entry.lastWidth||!entry.lastHeight)return {vx:0,vz:0,power:0,pull:0};
  const inv=inverseMatrix(world(stageComp));
  const sLocal=point(inv,aiming3d.start.x,aiming3d.start.y),cLocal=point(inv,aiming3d.current.x,aiming3d.current.y);
  const pull=Math.hypot(aiming3d.current.x-aiming3d.start.x,aiming3d.current.y-aiming3d.start.y);
  const a=entry.unproject(sLocal.x,sLocal.y,entry.lastWidth,entry.lastHeight,body.y);
  const b=entry.unproject(cLocal.x,cLocal.y,entry.lastWidth,entry.lastHeight,body.y);
  if(!a||!b)return {vx:0,vz:0,power:0,pull};
  let vx=(a.x-b.x)*bp.dragScale,vz=(a.z-b.z)*bp.dragScale;
  const speed=Math.hypot(vx,vz);
  if(speed>bp.maxSpeed){vx*=bp.maxSpeed/speed;vz*=bp.maxSpeed/speed;}
  return {vx,vz,power:Math.min(1,Math.hypot(vx,vz)/Math.max(.001,bp.maxSpeed)),pull};
 }
 function updateAim3d(p){
  if(!aiming3d||!stage3dMgr)return;
  aiming3d.current=p;
  const launch=aim3dVelocity(),bp=aiming3d.behavior.parameters;
  aiming3d.power=launch.power;
  if(bp.powerVariableId)variables[bp.powerVariableId]=launch.power;
  const stageComp=byId.get(aiming3d.stageId),entry=stage3dMgr.getStage(stageComp),body=bodies3d.get(aiming3d.targetId);
  if(entry&&body&&bp.showTrajectory&&launch.pull>=bp.minPullPx){
   const {walls,zones}=collect3d();
   entry.setGuide(predictTrajectory3d({body,walls,zones,vx:launch.vx,vz:launch.vz,dots:bp.trajectoryDots}));
  }else entry?.setGuide([]);
 }
 function physics3dSnapshot(){
  return {
   bodies:[...bodies3d.values()].map(b=>({id:b.id,sourceId:b.sourceId,x:b.x,y:b.y,z:b.z,vx:b.vx,vy:b.vy,vz:b.vz,atRest:Boolean(b.atRest),captured:Boolean(b.captured),airborne:Boolean(b.airborne)})),
   aiming:aiming3d?{componentId:aiming3d.sourceId,pointerId:aiming3d.pointerId,power:aiming3d.power}:null,
   projected:Object.fromEntries(projected3d),
  };
 }
 /* 3d:end */
 function reset(){cancelInput();ctaAppearances.clear();floatingTexts=[];screenFlashes=[];shake=undefined;tutorialInputAt=0;tutorialHadInput=false;activeTutorialHands=0;variables=Object.fromEntries(project.variables.map(v=>[v.id,v.initial]));stopAudio();blockedAudio=0;runtimeNodes.clear();spriteMotion.clear();physicsBodies.clear();oscillations.clear();/* 3d:start */bodies3d.clear();oscillations3d.clear();projected3d.clear();stage3dMgr?.reset();/* 3d:end */meterStates.clear();cameraStates.clear();aiming=undefined;instances=[];particles=[];animations=[];overrides.clear();resetMatch();timers.clear();contacts.clear();queue=[];time=0;ambientTime=0;serial=0;halted=false;acc=0;scene=project.base.startScene;pressed=undefined;pressPointerId=undefined;hover=undefined;transition=undefined;if(!edit){resetBoards();initializePathNetworks();/* 3d:start */collect3d();/* 3d:end */syncPaths(0,false);tickMetersAndCamera(0);emit({kind:'sceneEnter',sceneId:scene});}}
 function flushPendingMusic(){
  if(!audio||audio.state!=='running'||!pendingLoopAudio.size)return;
  const queued=[...pendingLoopAudio.values()];
  pendingLoopAudio.clear();
  for(const b of queued)void sound(b);
 }
 function unlockAudio(fromGesture=false){if(!audio)return Promise.resolve(undefined);if(audio.state==='running'){Promise.resolve().then(flushPendingMusic);return Promise.resolve(audio);}if(!audioUnlock||fromGesture){const context=audio,attempt=Promise.resolve().then(()=>context.resume()).then(()=>{if(context.state==='running'){flushPendingMusic();return context;}return undefined;}).catch(()=>undefined).finally(()=>{if(audioUnlock===attempt)audioUnlock=undefined;});audioUnlock=attempt;}return audioUnlock;}
 function updateAudioMix(){const voices=[...audioVoices.values()],speaking=voices.some(voice=>voice.bus==='voice'),stinger=voices.some(voice=>voice.bus==='stinger'),duck=stinger?.2:speaking?.25:1;for(const voice of voices){if(voice.bus!=='music')continue;const volume=voice.volume*duck;if(voice.gain.gain.setTargetAtTime)voice.gain.gain.setTargetAtTime(volume,audio.currentTime,.04);}}
 function connectVoice(source,gain,b){const bus=b.parameters.bus??'sfx';source.connect(gain);gain.connect(audio.destination);audioSources.add(source);audioVoices.set(source,{gain,bus,volume:b.parameters.volume});source.onended=()=>{audioSources.delete(source);audioVoices.delete(source);if(b.parameters.loop)loopingAudio.delete(b.id);updateAudioMix();};updateAudioMix();}
 async function sound(b){
  if(audioSources.size>=32)return;
  if(!audio){if(b.parameters.loop)pendingLoopAudio.set(b.id,b);return;}
  const context=audio,epoch=audioEpoch,cooldown=b.parameters.cooldownMs??45,now=context.currentTime;
  if(cooldown>0&&now-(audioCooldowns.get(b.id)??-Infinity)<cooldown/1000)return;
  if(b.parameters.loop&&loopingAudio.has(b.id))return;
  const target=byId.get(b.componentId),asset=assets.get(target?.assetSlots[0]?.assetId),isSampled=asset?.mime==='audio/wav'||asset?.mime==='audio/mpeg';
  if(!isSampled&&b.parameters.allowSynthFallback===false){blockedAudio++;return;}
  audioCooldowns.set(b.id,now);
  if(context.state!=='running'&&!await unlockAudio()){if(b.parameters.loop)pendingLoopAudio.set(b.id,b);return;}
  if(audio!==context||context.state!=='running'||epoch!==audioEpoch||audioSources.size>=32)return;
  const count=audioPitchCounts.get(b.id)??0,pattern=[0,-.5,.5,-1,1],jitter=(b.parameters.pitchJitter??0)*pattern[count%pattern.length],combo=Number(variables[b.parameters.pitchVariableId]??0),pitch=Math.max(-12,Math.min(12,jitter+combo*(b.parameters.pitchStep??0))),playbackRate=2**(pitch/12);
  audioPitchCounts.set(b.id,count+1);
  if(isSampled){
   if(b.parameters.loop)loopingAudio.add(b.id);
   try{
    let buffer=decodedAudio.get(asset.hash);
    if(!buffer){const bin=atob(asset.data),raw=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)raw[i]=bin.charCodeAt(i);buffer=await new Promise((resolve,reject)=>{
     const pending=context.decodeAudioData(raw.buffer,resolve,reject);
     if(pending&&typeof pending.then==='function')pending.then(resolve,reject);
    });decodedAudio.set(asset.hash,buffer);}
    if(audio!==context||context.state!=='running'||epoch!==audioEpoch||audioSources.size>=32){if(b.parameters.loop&&epoch===audioEpoch)loopingAudio.delete(b.id);return;}
    const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffer;source.loop=b.parameters.loop;if(source.playbackRate)source.playbackRate.value=playbackRate;gain.gain.value=b.parameters.volume;connectVoice(source,gain,b);source.start();
   }catch{loopingAudio.delete(b.id);diagnose('Audio decode failed');}
   return;
  }
  const o=context.createOscillator(),g=context.createGain();o.frequency.value=b.parameters.frequency*playbackRate;o.type='sine';g.gain.setValueAtTime(b.parameters.volume,context.currentTime);g.gain.exponentialRampToValueAtTime(.001,context.currentTime+b.parameters.seconds);connectVoice(o,g,b);o.start();o.stop(context.currentTime+b.parameters.seconds);
 }
 function hasMatch(boardId,changed){const cells=[...matchCells.values()].filter(cell=>cell.boardId===boardId),at=(row,column)=>cells.find(cell=>cell.row===row&&cell.column===column)?.group;for(let row=0;row<16;row++)for(let column=0;column<14;column++){const group=at(row,column);if(group&&group===at(row,column+1)&&group===at(row,column+2)&&changed.some(c=>c.row===row&&c.column>=column&&c.column<=column+2))return true;}for(let column=0;column<16;column++)for(let row=0;row<14;row++){const group=at(row,column);if(group&&group===at(row+1,column)&&group===at(row+2,column)&&changed.some(c=>c.column===column&&c.row>=row&&c.row<=row+2))return true;}return false;}
 function selectMatchTile(c){const cell=matchCells.get(c.id);if(!cell||cell.sceneId!==scene||!props(c).enabled||!visible(c))return;const board=matchBoards.get(c.parentId);if(board){matchSelected=board.select(c.id);return;}if(matchSelected===c.id){matchSelected=undefined;return;}const prior=matchCells.get(matchSelected);if(!prior||prior.sceneId!==scene||prior.boardId!==cell.boardId){matchSelected=c.id;return;}const first=byId.get(matchSelected);if(Math.abs(prior.row-cell.row)+Math.abs(prior.column-cell.column)!==1){matchSelected=c.id;return;}if(prior.group===cell.group){matchSelected=undefined;emit({kind:'invalidMatch',componentId:c.parentId??c.id});return;}const row=prior.row,column=prior.column,otherRow=cell.row,otherColumn=cell.column,firstTransform=[...transform(first)],secondTransform=[...transform(c)];prior.row=otherRow;prior.column=otherColumn;cell.row=row;cell.column=column;if(hasMatch(cell.boardId,[prior,cell])){const move=(target,position)=>{const current=overrides.get(target.id)??{transform:[...transform(target)],parameters:{}};current.transform=[...current.transform];current.transform[4]=position[4];current.transform[5]=position[5];overrides.set(target.id,current);};move(first,secondTransform);move(c,firstTransform);matchSelected=undefined;emit({kind:'validMatch',componentId:c.parentId??c.id});}else{prior.row=row;prior.column=column;cell.row=otherRow;cell.column=otherColumn;matchSelected=undefined;emit({kind:'invalidMatch',componentId:c.parentId??c.id});}}

 function spawnPrototype(prototypeId,x,y,path){
  if(instances.length>=128){diagnose('Instance budget exhausted');return;}
  const proto=byId.get(prototypeId),size=id=>1+project.components.filter(c=>c.parentId===id).reduce((sum,c)=>sum+size(c.id),0);
  if(runtimeNodes.size+size(proto.id)>4096){diagnose('Runtime node budget exhausted');return;}
  const rootId='instance.'+(++serial);
  function cloneNode(source,parentId){const id=source.id===proto.id?rootId:rootId+':'+source.id,node={...source,id,runtimeId:id,instanceId:rootId,prototypeId:source.id,prototype:false,parentId,transform:[...source.transform],spawnTime:time};runtimeNodes.set(id,node);for(const child of project.components.filter(c=>c.parentId===source.id))cloneNode(child,id);return node;}
  const root=cloneNode(proto,undefined);root.transform[4]=x;root.transform[5]=y;if(path){root.pathStartNode=path.startNode;root.pathTargetNode=path.targetNode;root.parentId=project.gameplay.find(b=>b.id===path.networkBehaviorId)?.componentId;}instances.push(root);if(path)syncPaths(0,false);return root;
 }
 function action(a,event,bindingCondition){if(++frameActions>1024){diagnose('Action budget exhausted');return;}if(a.kind==='add'||a.kind==='set'){const old=variables[a.variableId],value=a.kind==='add'?old+a.value:a.value;if(typeof value==='number'&&(!Number.isFinite(value)||Math.abs(value)>1e12)){diagnose('Variable range exceeded');return;}variables[a.variableId]=value;if(old!==value)emit({kind:'variableChange',variableId:a.variableId,instanceId:event.instanceId});}
 else if(a.kind==='setComponent'||a.kind==='setAsset'){const c=object(a.componentId),o=overrides.get(c.id)??{transform:[...c.transform],parameters:{}};if(a.kind==='setComponent')o.parameters[a.key]=a.value;else o.assetId=a.assetId;overrides.set(c.id,o);}
 else if(a.kind==='resetMatch'){resetMatch(a.componentId);resetBoards(a.componentId);}
 else if(a.kind==='copyMatchAsset'){
  const last=matchBoards.get(a.boardId)?.snapshot().lastMatch,target=byId.get(a.componentId),sample=last&&matchArtwork.get(a.boardId)?.get(last.group)?.children.find(child=>child.contract==='native.image.v1');
  if(last&&sample){
   const source=byId.get(last.from),center=point(world(source),source.parameters.width/2,source.parameters.height/2),parent=target.parentId?world(byId.get(target.parentId)):identityMatrix(),position=point(inverseMatrix(parent),center.x,center.y);
   const current=overrides.get(target.id)??{transform:[...target.transform],parameters:{}};
   current.transform=[...current.transform];current.transform[4]=position.x-target.parameters.width/2;current.transform[5]=position.y-target.parameters.height/2;current.assetId=sample.assetSlots[0]?.assetId;
   overrides.set(target.id,current);
  }
 }
 else if(a.kind==='hintMatch'){matchSelected=undefined;matchBoards.get(a.componentId)?.showHint();}
 else if(a.kind==='spawn')spawnPrototype(a.prototypeId,a.x,a.y);
 else if(a.kind==='spawnAt'){const target=(event.instanceId?[...runtimeNodes.values()].find(node=>node.instanceId===event.instanceId&&node.prototypeId===a.targetComponentId):undefined)??object(a.targetComponentId);if(target){const p=props(target),center=point(world(target),p.width/2,p.height/2),proto=byId.get(a.prototypeId);spawnPrototype(a.prototypeId,center.x+a.offsetX-proto.parameters.width/2,center.y+a.offsetY-proto.parameters.height/2);}}
 else if(a.kind==='spawnOnPath')spawnPrototype(a.prototypeId,0,0,{startNode:a.startNode,targetNode:a.targetNode,networkBehaviorId:a.networkBehaviorId});
 else if(['setVelocity','applyImpulse','stopBody'].includes(a.kind)){
  const source=byId.get(a.componentId),targets=event.instanceId?[...runtimeNodes.values()].filter(c=>c.instanceId===event.instanceId&&c.prototypeId===source.id):targetsFor(source),behavior=project.gameplay.find(b=>b.kind==='physics-body'&&b.componentId===source.id);
  for(const c of targets){const body=physicsState(c,behavior);if(a.kind==='setVelocity'){body.vx=a.vx;body.vy=a.vy;}else if(a.kind==='applyImpulse'){body.vx+=a.ix;body.vy+=a.iy;}else{body.vx=0;body.vy=0;body.atRest=true;}body.captured=false;body.exited=false;body.restElapsed=0;if(a.kind!=='stopBody')body.atRest=false;}
 }
 else if(a.kind==='setPosition'){
  const source=byId.get(a.componentId),targets=event.instanceId?[...runtimeNodes.values()].filter(c=>c.instanceId===event.instanceId&&c.prototypeId===source.id):targetsFor(source),behavior=project.gameplay.find(b=>b.kind==='physics-body'&&b.componentId===source.id);
  for(const c of targets){const body=physicsState(c,behavior);body.x=a.x;body.y=a.y;body.vx=0;body.vy=0;body.captured=false;body.exited=false;body.atRest=true;setWorldCenter(c,a.x,a.y);}
 }
 else if(a.kind==='setPathEdge')pathNetworks.get(a.behaviorId)?.setEdge(a.edgeId,a.enabled,a.cost);
 else if(a.kind==='setPathGate')pathNetworks.get(project.gameplay.find(b=>b.id===a.behaviorId)?.parameters.networkBehaviorId)?.setGate(a.behaviorId,a.mode,a.holdSeconds);
 else if(a.kind==='setPathTarget'){
  const source=byId.get(a.componentId),behavior=project.gameplay.find(b=>b.kind==='path-agent'&&b.componentId===source.id),network=pathNetworks.get(behavior.parameters.networkBehaviorId);
  for(const c of event.instanceId?[...runtimeNodes.values()].filter(c=>c.instanceId===event.instanceId&&c.prototypeId===source.id):targetsFor(source)){c.pathTargetNode=a.targetNode;network?.setTarget(c.id,a.targetNode);}
 }
 else if(a.kind==='compute'){
  const left=Number(variables[a.variableId]),right=a.operandVariableId!==undefined?Number(variables[a.operandVariableId]):a.value;if(a.op==='div'&&right===0){diagnose('Division by zero');return;}let value=({add:()=>left+right,sub:()=>left-right,mul:()=>left*right,div:()=>right===0?left:left/right,min:()=>Math.min(left,right),max:()=>Math.max(left,right),set:()=>right})[a.op]();
  if(a.round)value=Math.round(value);if(!Number.isFinite(value)||Math.abs(value)>1e12){diagnose('Variable range exceeded');return;}const old=variables[a.variableId];variables[a.variableId]=value;if(old!==value)emit({kind:'variableChange',variableId:a.variableId,instanceId:event.instanceId});
 }
 else if(a.kind==='despawn'){despawn(event.instanceId);}
 else if(a.kind==='changeScene')transition=a.sceneId;
 else if(a.kind==='restart')transition='__restart';
 else if(a.kind==='cameraShake'){if(!reducedMotion?.matches)shake={intensity:a.intensity,seconds:a.seconds,elapsed:0};}
 else if(a.kind==='screenFlash'){screenFlashes.push({color:a.color,opacity:a.opacity,seconds:a.seconds,elapsed:0});if(screenFlashes.length>8)screenFlashes.shift();}
 else if(a.kind==='floatingText'){
  const authored=byId.get(a.componentId),source=event.instanceId?[...runtimeNodes.values()].find(node=>node.instanceId===event.instanceId&&node.prototypeId===a.componentId)??authored:object(a.componentId)??authored,target=source?.sceneId===scene?source:authored;
  if(target){
   let center;
   /* 3d:start */
   if(target.contract==='native.mesh3d.v1')center=project3dToStage(target.id);
   /* 3d:end */
   if(!center){const p=props(target);center=point(world(target),p.width/2,p.height/2);}
   floatingTexts.push({x:center.x,y:center.y,text:a.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,(_,id)=>String(variables[id]??'')),color:a.color,fontSize:a.fontSize,risePx:a.risePx,seconds:a.seconds,elapsed:0});if(floatingTexts.length>32)floatingTexts.shift();
  }
 }
 else if(a.kind==='store'){
  if(event.kind==='click'&&event.pointerId!==undefined&&!pendingStore){
   pendingStore={pointerId:event.pointerId,targetId:event.targetId,condition:bindingCondition};
   canvas.setPointerCapture?.(event.pointerId);
  }
 }
 else if(a.behaviorId){const b=project.gameplay.find(b=>b.id===a.behaviorId);if(a.kind==='playAudio')void sound(b);else if(a.kind==='animate'){const source=byId.get(b.componentId),targets=prototypeOwner(source)?[...runtimeNodes.values()].filter(c=>c.prototypeId===source.id&&(!event.instanceId||c.instanceId===event.instanceId)):[source];for(const target of targets){const key=b.id+':'+target.id;animations=animations.filter(x=>x.id!==key);const parameters={...b.parameters};if(parameters.fromCurrent)parameters.from=parameters.property==='opacity'?props(target).opacity:transform(target)[parameters.property==='x'?4:5];animations.push({...b,parameters,id:key,behaviorId:b.id,targetId:target.id,elapsed:0,baseTransform:[...target.transform]});}}else if(a.kind==='stopAnimation')animations=animations.filter(x=>x.behaviorId!==b.id);else if(a.kind==='emit')emitParticles(b,event);}
 }
 function emitParticles(behavior,event){
  const p=behavior.parameters,isPixelConfetti=p.shape==='pixel-confetti',isVectorConfetti=p.shape==='confetti',isConfetti=isPixelConfetti||isVectorConfetti;
  if(isConfetti&&reducedMotion?.matches)return;
  if(particles.length+p.count>256){diagnose('Particle budget exhausted');return;}
  if(isPixelConfetti&&p.coverage==='screen'){particles.push(...screenConfetti(p));return;}
  if(isVectorConfetti&&p.coverage==='screen'){particles.push(...screenVectorConfetti(p));return;}
  const source=byId.get(behavior.componentId);
  const c=event.instanceId?[...runtimeNodes.values()].find(node=>node.instanceId===event.instanceId&&node.prototypeId===source.id)??source:source;
  let matrix=transform(c),clipId;
  for(let parent=object(c.parentId);parent;parent=object(parent.parentId)){
   if(isConfetti&&parent.contract==='native.group.v1'&&props(parent).clip){clipId=parent.id;break;}
   matrix=multiplyMatrix(transform(parent),matrix);
  }
  const dimensions=props(c);
  const position=p.origin==='anchor'?point(matrix,0,0):
   isConfetti||p.origin==='center'?point(matrix,dimensions.width/2,dimensions.height/2):
   {x:matrix[4]+c.parameters.width/2,y:matrix[5]+c.parameters.height/2};
  if(isPixelConfetti){particles.push(...pixelConfetti(p,position,clipId));return;}
  if(isVectorConfetti){particles.push(...vectorConfetti(p,position,clipId));return;}
  for(let n=0;n<p.count;n++){
   const angle=(p.spread??360)===360?n*2.399963:-Math.PI/2+((n+.5)/p.count-.5)*(p.spread??360)*Math.PI/180;
   const speed=p.speed*(.5+(n%7)/14);
   particles.push({...position,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:p.lifetime??.7,gravity:p.gravity??250,color:p.color,shape:p.shape??'circle'});
  }
 }
 function process(){while(queue.length&&!halted&&frameEvents<256&&frameActions<1024){const e=queue.shift();frameEvents++;if(['contactBegin','boundaryExit'].includes(e.kind)&&e.instanceId&&!runtimeNodes.has(e.instanceId))continue;for(const b of project.eventBindings){if(Object.entries(eventDefinitions.get(b.eventId)).every(([k,v])=>k==='id'||e[k]===v)&&condition(b.condition)){for(const a of b.actions){if(frameActions>=1024||halted)break;action(a,e,b.condition);}if(transition)break;}}if(transition){const next=transition;transition=undefined;if(next==='__restart')reset();else if(next!==scene){const previous=scene;stopAudio();scene=next;matchSelected=undefined;instances=[];particles=[];floatingTexts=[];screenFlashes=[];shake=undefined;tutorialHadInput=false;activeTutorialHands=0;runtimeNodes.clear();physicsBodies.clear();oscillations.clear();/* 3d:start */bodies3d.clear();oscillations3d.clear();projected3d.clear();stage3dMgr?.reset();/* 3d:end */meterStates.clear();cameraStates.clear();aiming=undefined;initializePathNetworks();queue=queue.filter(e=>e.kind==='variableChange');overrides.clear();matchGesture=undefined;for(const board of matchBoards.values())board.reset();contacts.clear();timers.clear();animations=[];cancelInput();ctaAppearances.clear();pressed=undefined;pressPointerId=undefined;/* 3d:start */collect3d();/* 3d:end */syncPaths(0,false);tickMetersAndCamera(0);emit({kind:'sceneExit',sceneId:previous});emit({kind:'sceneEnter',sceneId:scene});}}}if(queue.length)diagnose('Event/action budget exhausted');}
 function world(c){return multiplyMatrix(c.parentId?world(object(c.parentId)):identityMatrix(),transform(c));}
 const point=(m,x,y)=>({x:m[0]*x+m[2]*y+m[4],y:m[1]*x+m[3]*y+m[5]});
 function geometry(c,m){const p=props(c),corners=[[0,0],[p.width,0],[p.width,p.height],[0,p.height]].map(([x,y])=>point(m,x,y));return {left:Math.min(...corners.map(p=>p.x)),right:Math.max(...corners.map(p=>p.x)),top:Math.min(...corners.map(p=>p.y)),bottom:Math.max(...corners.map(p=>p.y))};}
 function visible(c){return props(c).visible&&props(c).opacity>0&&(!c.parentId||visible(object(c.parentId)));}
 function collisionPolygon(c,shape){const p=props(c),m=world(c),radius=Math.min(p.width,p.height)/2;let polygon=shape==='circle'?Array.from({length:32},(_,i)=>point(m,p.width/2+Math.cos(i*Math.PI/16)*radius,p.height/2+Math.sin(i*Math.PI/16)*radius)):[[0,0],[p.width,0],[p.width,p.height],[0,p.height]].map(([x,y])=>point(m,x,y));let ancestor=c.parentId?object(c.parentId):undefined;while(ancestor){const v=props(ancestor);if(ancestor.contract==='native.group.v1'&&v.clip){const cm=world(ancestor),clip=[[0,0],[v.width,0],[v.width,v.height],[0,v.height]].map(([x,y])=>point(cm,x,y));let area=0;for(let i=0;i<4;i++)area+=clip[i].x*clip[(i+1)%4].y-clip[(i+1)%4].x*clip[i].y;const sign=area>=0?1:-1;for(let i=0;i<4&&polygon.length;i++){const a=clip[i],b=clip[(i+1)%4],side=p=>sign*((b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x)),input=polygon;polygon=[];let previous=input[input.length-1],pd=side(previous);for(const current of input){const d=side(current);if((d>=0)!==(pd>=0)){const t=pd/(pd-d);polygon.push({x:previous.x+(current.x-previous.x)*t,y:previous.y+(current.y-previous.y)*t});}if(d>=0)polygon.push(current);previous=current;pd=d;}}}ancestor=ancestor.parentId?object(ancestor.parentId):undefined;}return polygon;}
 function polygonsOverlap(a,b){if(a.length<3||b.length<3)return false;for(const polygon of [a,b])for(let i=0;i<polygon.length;i++){const p=polygon[i],q=polygon[(i+1)%polygon.length],nx=p.y-q.y,ny=q.x-p.x;let amin=Infinity,amax=-Infinity,bmin=Infinity,bmax=-Infinity;for(const v of a){const n=v.x*nx+v.y*ny;amin=Math.min(amin,n);amax=Math.max(amax,n);}for(const v of b){const n=v.x*nx+v.y*ny;bmin=Math.min(bmin,n);bmax=Math.max(bmax,n);}if(amax<bmin||bmax<amin)return false;}return true;}
 function tick(dt){const stage=viewport();time+=dt;tickOscillations();
 for(const [id,press]of pressStates)if(!press.held&&time-(press.releasedAt??time)>=press.behavior.springBackSeconds)pressStates.delete(id);
 if(shake){shake.elapsed+=dt;if(shake.elapsed>=shake.seconds)shake=undefined;}
 for(const flash of screenFlashes)flash.elapsed+=dt;screenFlashes=screenFlashes.filter(flash=>flash.elapsed<flash.seconds);
 for(const floating of floatingTexts)floating.elapsed+=dt;floatingTexts=floatingTexts.filter(floating=>floating.elapsed<floating.seconds);
 for(const [id,board]of matchBoards)if(byId.get(id).sceneId===scene&&visible(byId.get(id)))board.tick(dt);for(const b of project.gameplay){const source=byId.get(b.componentId);if(source.sceneId!==scene)continue;const targets=prototypeOwner(source)?[...runtimeNodes.values()].filter(i=>i.prototypeId===source.id):[source];for(const c of targets){const key=b.id+':'+c.id;if(b.kind==='motion'){const old=overrides.get(c.id)??{transform:[...c.transform],parameters:{}},v=old.velocity??{x:b.parameters.vx,y:b.parameters.vy};v.y+=b.parameters.gravity*dt;old.transform[4]+=v.x*dt;old.transform[5]+=v.y*dt;old.velocity=v;overrides.set(c.id,old);if(c.prototypeId)c.transform=old.transform;const location=world(c);if(location[5]>stage.height||location[4]<-300||location[4]>stage.width+300){if(!old.exited){old.exited=true;emit({kind:'boundaryExit',componentId:source.id,instanceId:c.instanceId});}}}else if(b.kind==='timer'){const t=(timers.get(key)??0)+dt;timers.set(key,t);if(t>=b.parameters.seconds&&t-dt<b.parameters.seconds){emit({kind:'timer',behaviorId:b.id,componentId:source.id});if(b.parameters.repeat)timers.set(key,t-b.parameters.seconds);}}}}
 tickPhysics(dt);/* 3d:start */tick3d(dt);/* 3d:end */syncPaths(dt);tickMetersAndCamera(dt);
 const colliders=[];for(const b of project.gameplay.filter(b=>b.kind==='collider')){const c=byId.get(b.componentId);if(c.sceneId!==scene)continue;for(const target of prototypeOwner(c)?[...runtimeNodes.values()].filter(i=>i.prototypeId===c.id):[c])if(visible(target)){if(colliders.length>=256){diagnose('Collider budget exhausted');break;}colliders.push({b,c:target,box:geometry(target,world(target)),polygon:collisionPolygon(target,b.parameters.shape)});}}
 const next=new Set();let pairCount=0;collisionLoop:for(let a=0;a<colliders.length;a++)for(let b=a+1;b<colliders.length;b++){const x=colliders[a],y=colliders[b];if(x.c.instanceId&&x.c.instanceId===y.c.instanceId)continue;const A=x.box,B=y.box;let overlap=A.left<B.right&&A.right>B.left&&A.top<B.bottom&&A.bottom>B.top;if(overlap){if(++pairCount>4096){diagnose('Collision budget exhausted');break collisionLoop;}overlap=polygonsOverlap(x.polygon,y.polygon);}if(!overlap)continue;const key=[x.c.id,y.c.id].sort().join('|');next.add(key);if(!contacts.has(key))for(const [first,other]of [[x,y],[y,x]])emit({kind:'contactBegin',componentId:first.c.prototypeId??first.c.id,otherId:other.c.prototypeId??other.c.id,instanceId:first.c.instanceId??other.c.instanceId});}contacts=next;
 for(const a of animations){
  a.elapsed+=dt;
  const p=a.parameters,delay=p.delay??0,elapsed=a.elapsed-delay;
  if(elapsed<0)continue;
  const rawT=elapsed/p.seconds,t=p.loop?(rawT%1):Math.min(1,rawT),easing=p.easing??'ease-out';
  let progress=t;
  if(p.loop&&easing==='ease-in-out')progress=.5-.5*Math.cos(t*Math.PI*2);
  else if(easing==='ease-out')progress=1-(1-t)**3;
  else if(easing==='ease-in')progress=t**3;
  else if(easing==='ease-in-out')progress=t<.5?4*t**3:1-(-2*t+2)**3/2;
  else if(easing==='back-out')progress=1+2.70158*(t-1)**3+1.70158*(t-1)**2;
  const v=p.from+(p.to-p.from)*progress,c=object(a.targetId??a.componentId);
  if(!c)continue;
  const o=overrides.get(c.id)??{transform:[...c.transform],parameters:{}},base=a.baseTransform??c.transform;
  if(p.property==='opacity')o.parameters.opacity=Math.max(0,Math.min(1,v));
  else if(['scale','scaleX','scaleY','rotation'].includes(p.property)){
   o.animationAxes??={scale:1,scaleX:1,scaleY:1,rotation:0};
   o.animationAxes[p.property]=v;
   const axes=o.animationAxes,radians=axes.rotation*Math.PI/180,cos=Math.cos(radians),sin=Math.sin(radians),sx=axes.scale*axes.scaleX,sy=axes.scale*axes.scaleY;
   o.transform[0]=(base[0]*cos+base[2]*sin)*sx;
   o.transform[1]=(base[1]*cos+base[3]*sin)*sx;
   o.transform[2]=(-base[0]*sin+base[2]*cos)*sy;
   o.transform[3]=(-base[1]*sin+base[3]*cos)*sy;
  }else o.transform[p.property==='x'?4:5]=v;
  overrides.set(c.id,o);
  if(p.loop&&elapsed>=p.seconds)a.elapsed=delay+(elapsed%p.seconds);
 }
 animations=animations.filter(a=>object(a.targetId??a.componentId)&&(a.elapsed<a.parameters.seconds+(a.parameters.delay??0)||a.parameters.loop));
 for(const p of particles){
  if(p.shape==='pixel-confetti'||p.shape==='confetti'){p.age+=dt;continue;}
  p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.gravity*dt;
 }
 particles=particles.filter(p=>p.life>(p.age??0));process();}
 function path(c,p){ctx.beginPath();if(c.contract==='native.ellipse.v1')ctx.ellipse(p.width/2,p.height/2,p.width/2,p.height/2,0,0,Math.PI*2);else if(c.contract==='native.path.v1'){for(const [command,...v]of p.commands)({M:()=>ctx.moveTo(...v),L:()=>ctx.lineTo(...v),C:()=>ctx.bezierCurveTo(...v),Q:()=>ctx.quadraticCurveTo(...v),Z:()=>ctx.closePath()})[command]();}else{
  const radius=Math.min(p.radius??0,p.width/2,p.height/2);
  if(typeof ctx.roundRect==='function')ctx.roundRect(0,0,p.width,p.height,radius);
  else{
   ctx.moveTo(radius,0);
   ctx.arcTo(p.width,0,p.width,p.height,radius);
   ctx.arcTo(p.width,p.height,0,p.height,radius);
   ctx.arcTo(0,p.height,0,0,radius);
   ctx.arcTo(0,0,p.width,0,radius);
   ctx.closePath();
  }
 }}
 function spriteFrame(c,p,m){const pathFrame=overrides.get(c.id)?.pathFrame;if(pathFrame!==undefined)return Math.min(p.frameCount-1,pathFrame);if(edit||!p.frameRate)return 0;if(c.contract!=='native.walk-sprite.v1')return Math.floor(Math.max(0,time-(c.spawnTime??0))*p.frameRate)%p.frameCount;const key=c.runtimeId??c.id,prior=spriteMotion.get(key);if(!prior){spriteMotion.set(key,{x:m[4],y:m[5],phase:0,lastMove:-Infinity,frame:0});return 0;}const moved=Math.hypot(m[4]-prior.x,m[5]-prior.y)>.3;if(moved){const gap=time-prior.lastMove;prior.phase=Number.isFinite(gap)&&gap<.25?prior.phase+Math.min(gap,.12)*p.frameRate:0;prior.lastMove=time;}prior.x=m[4];prior.y=m[5];if(time-prior.lastMove>.11)prior.phase=0;prior.frame=Math.floor(prior.phase)%p.frameCount;return prior.frame;}
 function drawObject(c,parent=identityMatrix(),clips=[],instance){if(c.contract==='native.mesh3d.v1')return;const p=props(c);if(!p.visible||p.opacity<=0)return;const m=multiplyMatrix(parent,transform(c));ctx.save();ctx.transform(...transform(c));ctx.globalAlpha*=p.opacity;const press=pressStates.get(c.id);if(press?.behavior.liftShadow){ctx.shadowColor='#00000055';ctx.shadowBlur=8;ctx.shadowOffsetY=4;}let nextClips=clips;if(c.contract==='native.group.v1'&&p.clip){ctx.beginPath();ctx.rect(0,0,p.width,p.height);ctx.clip();nextClips=[...clips,{matrix:m,width:p.width,height:p.height}];}
 if(!['native.group.v1','native.text.v1','native.image.v1','native.sprite.v1','native.walk-sprite.v1','native.stage3d.v1','native.mesh3d.v1'].includes(c.contract)){
  const button=c.contract==='native.button.v1',isPressed=pressed===c.id;
  const fill=button?(!p.enabled?p.disabledFill:isPressed?p.pressedFill:hover===c.id?p.hoverFill:p.fill):p.fill;
  if(button&&(p.presentation==='pixel-cta'||p.presentation==='shiny-cta')){
   const appeared=previousCtaAppearances.get(c.id)??ambientTime;
   ctaAppearances.set(c.id,appeared);
   const age=!edit&&!reducedMotion?.matches?ambientTime-appeared:-1;
   if(p.presentation==='shiny-cta')drawShinyCta(ctx,p,fill,isPressed,age);
   else drawPixelCta(ctx,p,fill,isPressed,age);
  }else{
   if(p.pixelFrame){ctx.save();ctx.translate(3,4);path(c,p);ctx.fillStyle='#3c293366';ctx.fill();ctx.restore();}
   path(c,p);ctx.fillStyle=fill;ctx.fill();
   if(p.pixelFrame&&!(p.radius>0)){ctx.fillStyle='#ffffff22';ctx.fillRect(2,2,Math.max(0,p.width-4),2);ctx.fillRect(2,2,2,Math.max(0,p.height-4));}
   if(p.strokeWidth){ctx.strokeStyle=p.stroke;ctx.lineWidth=p.strokeWidth;ctx.stroke();}
  }
  if(matchSelected===c.id){path(c,p);ctx.strokeStyle='#ffffff';ctx.lineWidth=5;ctx.stroke();}
 }
 let textMetrics;
 if(c.contract==='native.text.v1'){
  const text=p.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,(_,id)=>String(variables[id]??''));
  if(p.pixelPanel){ctx.fillStyle='#3c293366';ctx.fillRect(3,4,p.width,p.height);ctx.fillStyle=p.panelFill;ctx.fillRect(0,0,p.width,p.height);ctx.strokeStyle=p.panelStroke??p.color;ctx.lineWidth=2;ctx.strokeRect(1,1,p.width-2,p.height-2);ctx.fillStyle='#ffffff22';ctx.fillRect(3,3,Math.max(0,p.width-6),2);}
  const pixelMetrics=p.fontFamily==='pixel'?measurePixelText(text,p):undefined;
  if(pixelMetrics&&!pixelMetrics.unsupportedChars.length)textMetrics=drawPixelText(ctx,text,p);
  else textMetrics=drawStandardText(ctx,text,pixelMetrics?{...p,fontFamily:'sans-serif',fontWeight:'700'}:p);
 }
 if(['native.image.v1','native.sprite.v1','native.walk-sprite.v1'].includes(c.contract)){const img=images.get(overrides.get(c.id)?.assetId??c.assetSlots[0]?.assetId);if(img?.complete&&img.naturalWidth){ctx.save();ctx.beginPath();ctx.rect(0,0,p.width,p.height);ctx.clip();const sprite=c.contract!=='native.image.v1',columns=sprite?Math.min(p.frameColumns,p.frameCount):1,rows=sprite?Math.ceil(p.frameCount/columns):1,sw=img.width/columns,sh=img.height/rows,frame=sprite?spriteFrame(c,p,m):0,sx=frame%columns*sw,sy=Math.floor(frame/columns)*sh,scale=p.fit==='cover'?Math.max(p.width/sw,p.height/sh):Math.min(p.width/sw,p.height/sh),w=p.fit==='stretch'?p.width:sw*scale,h=p.fit==='stretch'?p.height:sh*scale;ctx.imageSmoothingEnabled=p.smoothing??true;ctx.drawImage(img,sx,sy,sw,sh,(p.width-w)/2,(p.height-h)/2,w,h);ctx.restore();}}
 /* 3d:start */
 if(c.contract==='native.stage3d.v1'&&stage3dMgr){
  const sx=Math.hypot(m[0],m[1]),sy=Math.hypot(m[2],m[3]);
  const entry=stage3dMgr.renderStage(c,ctx,p.width*sx*currentRenderScale*currentRenderDpr,p.height*sy*currentRenderScale*currentRenderDpr,p.width,p.height,{time,ambientTime,propsOf:props,bodies3d,aimLocked:Boolean(aiming3d),groundFn:ground3d,worldWidth:p.width*sx,worldHeight:p.height*sy});
  for(const [bid,body]of bodies3d)if(body.stageId===c.id&&body.mode==='dynamic'){
   const local=entry.project({x:body.x,y:body.y,z:body.z},p.width,p.height);
   projected3d.set(bid,point(m,local.x,local.y));
  }
 }
 /* 3d:end */
 paint.push({c,m,clips:nextClips,instance:instance??c.prototypeId,textMetrics});for(const child of children(c.id))drawObject(child,m,nextClips,instance??c.prototypeId);if(p.clip&&c.contract==='native.group.v1')drawConfetti(c.id);ctx.restore();}
 function drawConfetti(clipId,screen){
  if(reducedMotion?.matches)return;
  for(const particle of particles){
   if((particle.shape!=='pixel-confetti'&&particle.shape!=='confetti')||particle.clipId!==clipId||Boolean(particle.screen)!==Boolean(screen))continue;
   ctx.save();
   if(particle.shape==='confetti')drawVectorConfetti(ctx,particle,screen);
   else drawPixelConfetti(ctx,particle,screen);
   ctx.restore();
  }
 }
 function drawTutorialHand(x,y,mode,phase){
  ctx.save();ctx.translate(x,y);ctx.globalAlpha=.92;ctx.lineWidth=2;ctx.lineJoin='round';
  if(mode==='tap'){ctx.strokeStyle='#fff0bd';ctx.globalAlpha=.7*(1-phase);ctx.beginPath();ctx.arc(0,0,12+phase*12,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=.92;}
  ctx.fillStyle='#fff0bd';ctx.strokeStyle='#193b46';ctx.beginPath();ctx.moveTo(-7,10);ctx.lineTo(-9,-1);ctx.quadraticCurveTo(-9,-5,-5,-5);ctx.lineTo(-3,-3);ctx.lineTo(-3,-17);ctx.quadraticCurveTo(-3,-22,1,-22);ctx.quadraticCurveTo(5,-22,5,-17);ctx.lineTo(5,-6);ctx.quadraticCurveTo(9,-9,11,-5);ctx.quadraticCurveTo(15,-7,16,-2);ctx.lineTo(14,9);ctx.quadraticCurveTo(12,18,3,18);ctx.lineTo(-1,18);ctx.quadraticCurveTo(-5,17,-7,10);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
 }
 function drawGameFeedback(){
  activeTutorialHands=0;
  if(!edit)for(const behavior of project.gameplay.filter(item=>item.kind==='tutorial-hand')){
   const owner=byId.get(behavior.componentId),target=object(behavior.parameters.targetId);
   if(!owner||owner.sceneId!==scene||!target||target.sceneId!==scene||!visible(target))continue;
   if(behavior.parameters.hideOnFirstInput&&tutorialHadInput)continue;
   const hintClock=started?time:ambientTime;
   if(hintClock-tutorialInputAt<behavior.parameters.idleDelaySeconds)continue;
   activeTutorialHands++;
   const destination=behavior.parameters.destinationId?object(behavior.parameters.destinationId):undefined,p=props(target);
   let start;
   /* 3d:start */
   if(target.contract==='native.mesh3d.v1')start=project3dToStage(target.id);
   /* 3d:end */
   if(!start)start=point(world(target),p.width/2,p.height/2);
   const cycle=(hintClock%1.2)/1.2,phase=reducedMotion?.matches?0:cycle*cycle*(3-2*cycle);
   let x=start.x,y=start.y;
   if(behavior.parameters.mode!=='tap'){
    const end=destination?point(world(destination),props(destination).width/2,props(destination).height/2):{x:start.x-36,y:start.y+48};x=start.x+(end.x-start.x)*phase;y=start.y+(end.y-start.y)*phase;
   }
   drawTutorialHand(x+8,y+22,behavior.parameters.mode,phase);
  }
  for(const floating of floatingTexts){
   const progress=Math.min(1,floating.elapsed/floating.seconds);ctx.save();ctx.globalAlpha=1-progress;ctx.fillStyle=floating.color;ctx.strokeStyle='#193b46';ctx.lineWidth=3;ctx.font='900 '+floating.fontSize+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const y=floating.y-(reducedMotion?.matches?0:floating.risePx*progress);ctx.strokeText(floating.text,floating.x,y);ctx.fillText(floating.text,floating.x,y);ctx.restore();
  }
  for(const flash of screenFlashes){const progress=Math.min(1,flash.elapsed/flash.seconds),stage=viewport();ctx.save();ctx.globalAlpha=flash.opacity*(1-progress);ctx.fillStyle=flash.color;ctx.fillRect(0,0,stage.width,stage.height);ctx.restore();}
 }
 function drawAim(){
  if(!aiming)return;const body=physicsBodies.get(aiming.targetId),p=aiming.behavior.parameters;if(!body)return;
  const dx=aiming.current.x-aiming.start.x,dy=aiming.current.y-aiming.start.y,pull=Math.hypot(dx,dy),clamped=Math.min(p.maxPullPx,pull),scale=pull>.001?clamped/pull:0;
  ctx.save();ctx.lineCap='round';
  const ringR=Math.max(12,Math.min(body.width,body.height)*.62);
  ctx.strokeStyle='#173a2f66';ctx.lineWidth=3.5;ctx.beginPath();ctx.arc(body.x,body.y,ringR,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle=p.trajectoryColor;ctx.lineWidth=2;ctx.beginPath();ctx.arc(body.x,body.y,ringR,0,Math.PI*2);ctx.stroke();
  if(p.showTrajectory&&pull>=p.minPullPx){const launch=aimVelocity(),{bodies,zones}=collectPhysics(),stage=viewport(),points=predictTrajectory({body:{...body,vx:launch.vx,vy:launch.vy,atRest:false},bodies,zones,bounds:{left:0,top:0,right:stage.width,bottom:stage.height},dots:p.trajectoryDots,bounces:p.trajectoryBounces});points.forEach((dot,index)=>{const alpha=.96-.52*(index/Math.max(1,points.length)),r=Math.max(2.2,4.5-index*.22);ctx.globalAlpha=alpha;ctx.fillStyle='#173a2f88';ctx.beginPath();ctx.arc(dot.x,dot.y,r+1.3,0,Math.PI*2);ctx.fill();ctx.fillStyle=p.trajectoryColor;ctx.beginPath();ctx.arc(dot.x,dot.y,r,0,Math.PI*2);ctx.fill();});}
  if(pull>=4){const tx=body.x+dx*scale,ty=body.y+dy*scale;ctx.globalAlpha=.9;ctx.strokeStyle='#173a2f66';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(body.x,body.y);ctx.lineTo(tx,ty);ctx.stroke();ctx.strokeStyle=p.trajectoryColor;ctx.lineWidth=2.6;ctx.beginPath();ctx.moveTo(body.x,body.y);ctx.lineTo(tx,ty);ctx.stroke();ctx.fillStyle='#173a2f88';ctx.beginPath();ctx.arc(tx,ty,5.2,0,Math.PI*2);ctx.fill();ctx.fillStyle=p.trajectoryColor;ctx.beginPath();ctx.arc(tx,ty,3.6,0,Math.PI*2);ctx.fill();}ctx.restore();
 }
 function stageBackdropColor(stage){
  for(const root of roots()){
   const list=root.contract==='native.group.v1'?children(root.id):[root];
   for(const c of list){
    if(c.contract==='native.stage3d.v1'&&visible(c)&&props(c).skyColor)return props(c).skyColor;
    if(c.contract!=='native.rectangle.v1'||!visible(c))continue;
    const p=props(c);
    if(p.opacity<.95||!p.fill||p.fill==='transparent')continue;
    if(/(?:^|\.)(background|backdrop|bg)(?:\.fill)?$/.test(c.id)||(p.width>=stage.width*.9&&p.height>=stage.height*.9))return p.fill;
   }
  }
  return '#102a34';
 }
 function render(){previousCtaAppearances=ctaAppearances;ctaAppearances=new Map();const stage=viewport();if(paintedLandscape!==undefined&&paintedLandscape!==stage.landscape)cancelInput();paintedLandscape=stage.landscape;const dpr=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=stageBackdropColor(stage);ctx.fillRect(0,0,w,h);const scale=Math.min(w/stage.width,h/stage.height),ox=(w-stage.width*scale)/2,oy=(h-stage.height*scale)/2;currentRenderScale=scale||1;currentRenderDpr=dpr;ctx.translate(ox,oy);ctx.scale(scale,scale);if(shake){const progress=Math.min(1,shake.elapsed/shake.seconds),strength=shake.intensity*(1-progress);ctx.translate(Math.sin(shake.elapsed*95)*strength,Math.cos(shake.elapsed*113)*strength);}ctx.save();ctx.beginPath();ctx.rect(0,0,stage.width,stage.height);ctx.clip();paint=[];for(const c of roots())drawObject(c);for(const c of instances)if(!c.parentId)drawObject(c,identityMatrix(),[],c.prototypeId);drawAim();if(edit&&selected){let prototype=byId.get(selected);while(prototype?.parentId)prototype=byId.get(prototype.parentId);if(prototype?.prototype)drawObject(prototype);}drawConfetti();ctx.save();for(const p of particles){if(p.shape==='pixel-confetti'||p.shape==='confetti')continue;const fade=Math.min(1,p.life*2),radius=1.5+2.5*fade;ctx.globalAlpha=fade;ctx.globalCompositeOperation=p.shape==='square'?'source-over':'lighter';ctx.fillStyle=p.color;if(p.shape==='square'){const size=Math.max(2,Math.round(radius*1.6));ctx.fillRect(Math.round(p.x-size/2),Math.round(p.y-size/2),size,size);continue;}ctx.globalCompositeOperation='lighter';ctx.shadowColor=p.color;ctx.shadowBlur=particles.length<=16?6:0;ctx.strokeStyle=p.color;ctx.lineWidth=1.5+fade;ctx.beginPath();ctx.moveTo(p.x-p.vx*.025,p.y-p.vy*.025);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fill();}ctx.restore();drawGameFeedback();if(edit&&selected){const rows=paint.filter(r=>r.c.contract!=='native.group.v1'&&(r.c.id===selected||isDescendant(r.c,selected)));if(rows.length){const boxes=rows.map(r=>geometry(r.c,r.m)),l=Math.min(...boxes.map(b=>b.left)),t=Math.min(...boxes.map(b=>b.top));ctx.strokeStyle='#55e6ef';ctx.lineWidth=2/scale;ctx.strokeRect(l,t,Math.max(...boxes.map(b=>b.right))-l,Math.max(...boxes.map(b=>b.bottom))-t);}}ctx.restore();if(scale>0)drawConfetti(undefined,{x:-ox/scale,y:-oy/scale,width:w/scale,height:h/scale});}
 function auditViewport(ids){
  const required=Array.isArray(ids)?[...new Set(ids)]:undefined;
  render();
  const stage=viewport(),found=new Set(),issues=[];
  for(const row of paint){
   const id=row.c.prototypeId??row.c.id;
   if(row.c.contract==='native.group.v1'||(required&&!required.includes(id)))continue;
   found.add(id);
   const bounds=geometry(row.c,row.m),stroke=(props(row.c).strokeWidth??0)/2;
   bounds.left-=stroke;bounds.right+=stroke;bounds.top-=stroke;bounds.bottom+=stroke;
   const overflow={left:Math.max(0,-bounds.left),right:Math.max(0,bounds.right-stage.width),top:Math.max(0,-bounds.top),bottom:Math.max(0,bounds.bottom-stage.height)};
   if(Object.values(overflow).some(value=>value>.01))issues.push({id,contract:row.c.contract,bounds,overflow});
  }
  const missing=required?required.filter(id=>!found.has(id)):[];
  return {ok:issues.length===0&&missing.length===0,viewport:{...stage,canvasWidth:canvas.clientWidth,canvasHeight:canvas.clientHeight},issues,missing};
 }
 function auditSceneLayout({ids,interactiveIds,network='standalone',minTouchPx=44}={}){
  const required=Array.isArray(ids)?[...new Set(ids)]:undefined;
  render();
  const stage=viewport(),scale=Math.min(canvas.clientWidth/stage.width,canvas.clientHeight/stage.height),safe=computeSafeArea(stage,network),defects=[],found=new Set();
  const selected=row=>!required||required.includes(row.c.prototypeId??row.c.id);
  const rows=paint.filter(selected),automatic=new Set(project.events.filter(event=>event.kind==='click').map(event=>event.componentId));
  for(const behavior of project.gameplay)if(['drag','match-tile','aim-launch','aim-launch-3d'].includes(behavior.kind))automatic.add(behavior.componentId);
  const interactive=new Set(interactiveIds??automatic),anywhereAim=new Set(project.gameplay.filter(b=>(b.kind==='aim-launch'||b.kind==='aim-launch-3d')&&b.parameters.dragMode==='anywhere').map(b=>b.componentId)),isInteractive=row=>interactive.has(row.c.prototypeId??row.c.id);
  const add=(kind,severity,id,detail,metrics,otherId)=>defects.push({kind,severity,id,...(otherId?{otherId}:{}),detail,metrics});
  const clippedBounds=clip=>{const corners=[[0,0],[clip.width,0],[clip.width,clip.height],[0,clip.height]].map(([x,y])=>point(clip.matrix,x,y));return {left:Math.min(...corners.map(p=>p.x)),right:Math.max(...corners.map(p=>p.x)),top:Math.min(...corners.map(p=>p.y)),bottom:Math.max(...corners.map(p=>p.y))};};
  for(const row of rows){
   const id=row.c.prototypeId??row.c.id;found.add(id);
   const bounds=geometry(row.c,row.m),stroke=(props(row.c).strokeWidth??0)/2;
   bounds.left-=stroke;bounds.right+=stroke;bounds.top-=stroke;bounds.bottom+=stroke;
   const structural=row.c.contract==='native.group.v1'&&!props(row.c).clip;
   const isFullBleedBackdrop=(row.c.contract==='native.image.v1'&&row.clips.length===0&&props(row.c).fit==='cover'&&bounds.left<=0&&bounds.top<=0&&bounds.right>=stage.width&&bounds.bottom>=stage.height)||(row.c.contract==='native.stage3d.v1'&&bounds.left<=0&&bounds.top<=0&&bounds.right>=stage.width&&bounds.bottom>=stage.height);
   const fullBleed=(row.c.contract==='native.rectangle.v1'&&stroke===0&&bounds.left<=0&&bounds.top<=0&&bounds.right>=stage.width&&bounds.bottom>=stage.height)||isFullBleedBackdrop;
   if(!structural){
    const overflow={left:Math.max(0,-bounds.left),right:Math.max(0,bounds.right-stage.width),top:Math.max(0,-bounds.top),bottom:Math.max(0,bounds.bottom-stage.height)};
    if(!fullBleed&&!inCameraWorld(row.c)&&Object.values(overflow).some(value=>value>.01))add('stage-overflow','blocker',id,'Component extends beyond the active stage.',{bounds,overflow});
    if(row.c.contract==='native.image.v1'&&row.clips.length===0){
     const bw=bounds.right-bounds.left,bh=bounds.bottom-bounds.top;
     const backdropRole=/(?:^|\.)(backdrop|background|bg)$/.test(id)||(props(row.c).fit==='cover'&&!row.c.parentId&&bounds.left<=1&&bounds.top<=1&&(bw>=stage.width*.4||bh>=stage.height*.4));
     if(backdropRole&&(bounds.left>.5||bounds.top>.5||bounds.right<stage.width-.5||bounds.bottom<stage.height-.5)){
      add('backdrop-incomplete','blocker',id,'Backdrop image does not cover the full active stage, leaving a visible seam.',{bounds,stage:{width:stage.width,height:stage.height}});
     }
    }
    for(const clip of row.clips){
     const boundary=clippedBounds(clip),crop={left:Math.max(0,boundary.left-bounds.left),right:Math.max(0,bounds.right-boundary.right),top:Math.max(0,boundary.top-bounds.top),bottom:Math.max(0,bounds.bottom-boundary.bottom)};
     if(Object.values(crop).some(value=>value>.01))add('parent-clip-crop','blocker',id,'Component is cropped by an ancestor clipping group.',{bounds,clip:boundary,crop});
    }
   }
   if(row.textMetrics){
    const metrics=row.textMetrics;
    if(metrics.overflowsWidth||metrics.overflowsHeight)add('text-overflow','blocker',id,'Text does not fit its component after wrapping and auto-fit.',metrics);
    const renderedFontSize=metrics.fontSize??metrics.scale*8;
    if(renderedFontSize<12)add('text-illegible',renderedFontSize<8?'blocker':'warning',id,'Rendered text is below the recommended legible size.',{renderedFontSize,...metrics});
    const textProps=props(row.c);
    if(textProps.pixelPanel&&textProps.align!=='center'){
     const innerWidth=Math.max(0,textProps.width-2*(textProps.padding===undefined?8:textProps.padding));
     if(innerWidth-(metrics.renderedWidth??0)>12)add('panel-off-center','blocker',id,'Text inside a framed pixel panel is not horizontally centered.',{align:textProps.align,innerWidth,renderedWidth:metrics.renderedWidth??0});
    }
   }
   if(isInteractive(row)&&!anywhereAim.has(id)&&(row.c.contract!=='native.group.v1'||bounds.right>bounds.left&&bounds.bottom>bounds.top)){
    const width=(bounds.right-bounds.left)*scale,height=(bounds.bottom-bounds.top)*scale;
    if(width<minTouchPx-.01||height<minTouchPx-.01)add('touch-target-small','blocker',id,'Interactive target is smaller than the required physical touch size.',{width,height,minTouchPx,scale});
   }
   if(isInteractive(row)||row.c.contract==='native.text.v1')for(const zone of safe.zones){
    const width=Math.min(bounds.right,zone.right)-Math.max(bounds.left,zone.left),height=Math.min(bounds.bottom,zone.bottom)-Math.max(bounds.top,zone.top);
    if(width>.01&&height>.01)add('sdk-safe-area-collision','blocker',id,'Component intersects a reserved ad-SDK overlay zone.',{bounds,zone,intersection:{width,height},network});
   }
  }
  const interactiveRows=rows.filter(row=>isInteractive(row)&&row.c.contract!=='native.group.v1');
  for(let first=0;first<interactiveRows.length;first++)for(let second=first+1;second<interactiveRows.length;second++){
   const a=interactiveRows[first],b=interactiveRows[second],aid=a.c.prototypeId??a.c.id,bid=b.c.prototypeId??b.c.id;
   if(aid===bid||isDescendant(a.c,b.c.id)||isDescendant(b.c,a.c.id))continue;
   const A=geometry(a.c,a.m),B=geometry(b.c,b.m),width=Math.min(A.right,B.right)-Math.max(A.left,B.left),height=Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top);
   if(width>1&&height>1)add('interactive-overlap','blocker',aid,'Interactive targets overlap.',{intersection:{width,height},first:A,second:B},bid);
  }
  const isOpaqueFill=fill=>{
   if(!fill||fill==='transparent')return false;
   const hex=/^#([0-9a-f]{4}|[0-9a-f]{8})$/i.exec(fill);
   if(hex)return hex[1].length===4?hex[1][3].toLowerCase()==='f':hex[1].slice(6).toLowerCase()==='ff';
   const rgba=/^rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\s*\)$/i.exec(fill);
   return rgba?Number(rgba[1])>=.95:true;
  };
  const occluders=[];
  rows.forEach((row,rowIndex)=>{
   if(row.c.contract==='native.rectangle.v1'&&!isInteractive(row)&&(props(row.c).opacity??1)>=.95&&isOpaqueFill(props(row.c).fill)){
    occluders.push({rowIndex,row,order:row.c.order??0,bounds:geometry(row.c,row.m)});
   }
  });
  const visibleRows=rows.filter((row,rowIndex)=>{
   const b=geometry(row.c,row.m),ord=row.c.order??0;
   return !occluders.some(occ=>occ.rowIndex>rowIndex&&occ.order>ord&&occ.row.c.id!==row.c.id&&!isDescendant(occ.row.c,row.c.id)&&!isDescendant(row.c,occ.row.c.id)&&occ.bounds.left<=b.left+1&&occ.bounds.right>=b.right-1&&occ.bounds.top<=b.top+1&&occ.bounds.bottom>=b.bottom-1);
  });
  const panels=visibleRows.map((row,rowIndex)=>({row,rowIndex})).filter(({row})=>{
   if(row.c.contract!=='native.rectangle.v1')return false;
   const b=geometry(row.c,row.m),pw=b.right-b.left,ph=b.bottom-b.top;
   const fullWidthBg=(props(row.c).strokeWidth??0)===0&&b.left<=0&&b.right>=stage.width;
   return !fullWidthBg&&pw>=180&&ph>=140&&!isInteractive(row);
  }).map(({row,rowIndex})=>({id:row.c.prototypeId??row.c.id,row,rowIndex,bounds:geometry(row.c,row.m)}));
  const enclosingPanel=(row,rowIndex,b,requireAfter=false)=>{
   const id=row.c.prototypeId??row.c.id,cx=(b.left+b.right)/2,cy=(b.top+b.bottom)/2,ord=row.c.order??0;
   return panels.filter(p=>p.id!==id&&(!requireAfter||p.rowIndex<rowIndex||(p.row.c.order??0)===ord)&&b.right-b.left<=p.bounds.right-p.bounds.left+4&&b.bottom-b.top<=p.bounds.bottom-p.bounds.top+4&&cx>=p.bounds.left&&cx<=p.bounds.right&&cy>=p.bounds.top&&cy<=p.bounds.bottom)
    .sort((a,c)=>((a.bounds.right-a.bounds.left)*(a.bounds.bottom-a.bounds.top))-((c.bounds.right-c.bounds.left)*(c.bounds.bottom-c.bounds.top))||(c.rowIndex-a.rowIndex))[0];
  };
  const byPanel=new Map(),contentByPanel=new Map();
  if(panels.length){
   visibleRows.forEach((row,rowIndex)=>{
    const id=row.c.prototypeId??row.c.id,b=geometry(row.c,row.m),cx=(b.left+b.right)/2,cy=(b.top+b.bottom)/2;
    const isBtn=row.c.contract==='native.button.v1'&&!matchCells.has(row.c.id);
    const parent=row.c.parentId?object(row.c.parentId):undefined;
    const isCenteredText=row.c.contract==='native.text.v1'&&props(row.c).align==='center'&&parent?.contract!=='native.button.v1';
    if(isBtn||isCenteredText){
     const enclosing=enclosingPanel(row,rowIndex,b,false);
     if(enclosing){
      if(!byPanel.has(enclosing.id))byPanel.set(enclosing.id,{panel:enclosing,items:[]});
      byPanel.get(enclosing.id).items.push({id,bounds:b,cx,cy,isBtn});
     }
    }
    if(['native.text.v1','native.image.v1','native.button.v1'].includes(row.c.contract)&&parent?.contract!=='native.button.v1'){
     const enclosing=enclosingPanel(row,rowIndex,b,true);
     if(enclosing){
      if(!contentByPanel.has(enclosing.id))contentByPanel.set(enclosing.id,{panel:enclosing,content:[]});
      contentByPanel.get(enclosing.id).content.push({row,id,bounds:b});
     }
    }
   });
   for(const {panel,items}of byPanel.values()){
    if(!items.some(item=>item.isBtn))continue;
    const pb=panel.bounds,panelCx=(pb.left+pb.right)/2;
    for(const item of items){
     const margins={left:item.bounds.left-pb.left,right:pb.right-item.bounds.right,top:item.bounds.top-pb.top,bottom:pb.bottom-item.bounds.bottom};
     const minMargin=Math.min(margins.left,margins.right,margins.top,margins.bottom);
     if(minMargin<10||minMargin*scale<8)add('panel-edge-cramped','blocker',item.id,'Element sits too close to its enclosing panel edge.',{panelId:panel.id,margins,scale,minStagePx:10,minCssPx:8},panel.id);
    }
    const grouped=[];
    for(const item of items){
     const rowGroup=grouped.find(g=>Math.abs(g.cy-item.cy)<=16&&g.isBtn===item.isBtn);
     if(rowGroup)rowGroup.items.push(item);else grouped.push({cy:item.cy,isBtn:item.isBtn,items:[item]});
    }
    for(const group of grouped){
     const left=Math.min(...group.items.map(i=>i.bounds.left)),right=Math.max(...group.items.map(i=>i.bounds.right));
     const groupCx=(left+right)/2,offsetX=groupCx-panelCx;
     if(Math.abs(offsetX)>3)add('panel-off-center','blocker',group.items[0].id,'Element is not horizontally centered inside its enclosing panel.',{panelId:panel.id,offsetX,groupCenterX:groupCx,panelCenterX:panelCx,scale},panel.id);
    }
   }
   for(const {panel,content}of contentByPanel.values()){
    const hasUi=byPanel.has(panel.id);
    for(let first=0;first<content.length;first++)for(let second=first+1;second<content.length;second++){
     const a=content[first],b=content[second];
     if(a.id===b.id||isDescendant(a.row.c,b.row.c.id)||isDescendant(b.row.c,a.row.c.id))continue;
     const bothImages=a.row.c.contract==='native.image.v1'&&b.row.c.contract==='native.image.v1';
     if(bothImages&&(!hasUi||(a.row.c.parentId&&a.row.c.parentId===b.row.c.parentId)))continue;
     const width=Math.min(a.bounds.right,b.bounds.right)-Math.max(a.bounds.left,b.bounds.left),height=Math.min(a.bounds.bottom,b.bounds.bottom)-Math.max(a.bounds.top,b.bounds.top);
     if(width>2&&height>2)add('panel-content-overlap','blocker',a.id,'Panel elements overlap each other.',{panelId:panel.id,intersection:{width,height},first:a.bounds,second:b.bounds},b.id);
    }
   }
  }
  const visibleTexts=visibleRows.filter(row=>{
   if(row.c.contract!=='native.text.v1')return false;
   const parent=row.c.parentId?object(row.c.parentId):undefined;
   return parent?.contract!=='native.button.v1';
  }).map(row=>{
   const raw=String(props(row.c).text??'').replace(/\{\{([a-z0-9_.-]+)\}\}/g,(_,key)=>String(variables[key]??'')).trim();
   return {row,id:row.c.prototypeId??row.c.id,bounds:geometry(row.c,row.m),raw,norm:raw.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()};
  }).filter(item=>item.raw.length>0);
  const uiPanels=panels.filter(panel=>byPanel.get(panel.id)?.items.some(item=>item.isBtn)||contentByPanel.get(panel.id)?.content.some(item=>item.row.c.contract==='native.button.v1'));
  for(const panel of uiPanels){
   const pb=panel.bounds,panelCx=(pb.left+pb.right)/2,panelW=pb.right-pb.left;
   for(const t of visibleTexts){
    if(props(t.row.c).align!=='center')continue;
    if(t.bounds.bottom>pb.top+6||pb.top-t.bounds.bottom>48)continue;
    const tw=t.bounds.right-t.bounds.left,tcx=(t.bounds.left+t.bounds.right)/2;
    const overlap=Math.min(t.bounds.right,pb.right)-Math.max(t.bounds.left,pb.left);
    if(((tcx>=pb.left&&tcx<=pb.right)||overlap>=tw*.6)&&tw<=panelW+60&&Math.abs(tcx-panelCx)>4){
     add('header-off-center','blocker',t.id,'Centered text above a panel is not horizontally aligned with the panel below it.',{panelId:panel.id,offsetX:tcx-panelCx,textCenterX:tcx,panelCenterX:panelCx,scale},panel.id);
    }
   }
  }
  for(let first=0;first<visibleTexts.length;first++)for(let second=first+1;second<visibleTexts.length;second++){
   const a=visibleTexts[first],b=visibleTexts[second];
   if(a.id===b.id||isDescendant(a.row.c,b.row.c.id)||isDescendant(b.row.c,a.row.c.id))continue;
   const width=Math.min(a.bounds.right,b.bounds.right)-Math.max(a.bounds.left,b.bounds.left),height=Math.min(a.bounds.bottom,b.bounds.bottom)-Math.max(a.bounds.top,b.bounds.top);
   if(width>2&&height>2)add('panel-content-overlap','blocker',a.id,'Visible text elements overlap.',{intersection:{width,height},first:a.bounds,second:b.bounds},b.id);
   if(a.norm&&b.norm){
    const [shortText,longText]=a.norm.length<=b.norm.length?[a.norm,b.norm]:[b.norm,a.norm];
    if((shortText===longText&&shortText.length>=6)||(shortText.length>=12&&longText.includes(shortText))){
     add('duplicate-visible-copy','blocker',a.id,'Duplicate visible copy appears in multiple text elements simultaneously.',{first:a.raw,second:b.raw},b.id);
    }
   }
  }
  const copyTexts=visibleTexts.filter(item=>!/^[\d\s/.,:%+\-x]+$/i.test(item.raw));
  const wordCount=copyTexts.reduce((sum,item)=>sum+(item.norm?item.norm.split(' ').filter(Boolean).length:0),0);
  const charCount=copyTexts.reduce((sum,item)=>sum+item.raw.replace(/\s+/g,' ').length,0);
  if(wordCount>20||charCount>130||copyTexts.length>5){
   add('text-clutter-heavy','blocker',copyTexts[0]?.id??null,'Too much visible copy on one screen; keep playable ads visual and concise.',{blocks:copyTexts.length,wordCount,charCount,texts:copyTexts.map(item=>item.raw)});
  }else if(wordCount>12||copyTexts.length>4){
   add('text-clutter-heavy','warning',copyTexts[0]?.id??null,'Screen copy is getting dense; consider trimming narration so gameplay carries the experience.',{blocks:copyTexts.length,wordCount,charCount,texts:copyTexts.map(item=>item.raw)});
  }
  const missing=required?required.filter(id=>{if(found.has(id))return false;const component=object(id);if(component?.contract==='native.mesh3d.v1')return false;return !component||visible(component);}):[];
  return {ok:!defects.some(defect=>defect.severity==='blocker')&&missing.length===0,viewport:{...stage,canvasWidth:canvas.clientWidth,canvasHeight:canvas.clientHeight,scale},defects,missing,interactive:interactiveRows.map(row=>({id:row.c.prototypeId??row.c.id,bounds:geometry(row.c,row.m)})),safeArea:safe};
 }
 function isDescendant(c,id){while(c.parentId){if(c.parentId===id)return true;c=object(c.parentId);}return false;}
 function inCameraWorld(c){for(let current=c;current;current=current.parentId?object(current.parentId):undefined)if(project.gameplay.some(b=>b.kind==='camera-follow'&&b.componentId===(current.prototypeId??current.id)))return true;return false;}
 function locate(e){
  const stage=viewport(),r=canvas.getBoundingClientRect(),scale=Math.min(r.width/stage.width,r.height/stage.height);
  return {x:(e.clientX-r.left-(r.width-stage.width*scale)/2)/scale,y:(e.clientY-r.top-(r.height-stage.height*scale)/2)/scale};
 }
 function inside(row,p){try{for(const clip of row.clips){const q=point(inverseMatrix(clip.matrix),p.x,p.y);if(q.x<0||q.y<0||q.x>clip.width||q.y>clip.height)return false;}const q=point(inverseMatrix(row.m),p.x,p.y),v=props(row.c);if(row.c.contract==='native.path.v1'){const path=new Path2D();for(const [cmd,...args]of v.commands)({M:()=>path.moveTo(...args),L:()=>path.lineTo(...args),C:()=>path.bezierCurveTo(...args),Q:()=>path.quadraticCurveTo(...args),Z:()=>path.closePath()})[cmd]();ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.lineWidth=v.strokeWidth;const hit=ctx.isPointInPath(path,q.x,q.y)||(v.strokeWidth>0&&ctx.isPointInStroke(path,q.x,q.y));ctx.restore();return hit;}if(row.c.contract==='native.ellipse.v1')return ((q.x-v.width/2)/(v.width/2))**2+((q.y-v.height/2)/(v.height/2))**2<=1;return q.x>=0&&q.y>=0&&q.x<=v.width&&q.y<=v.height;}catch{return false;}}
 function hit(p){return [...paint].reverse().find(r=>r.c.contract!=='native.group.v1'&&r.c.sceneId===scene&&object(r.c.id)&&visible(r.c)&&inside(r,p));}
 function ancestors(c){const a=[];while(c){a.push(c);c=object(c.parentId);}return a;}
 function aimVelocity(){
  if(!aiming)return {vx:0,vy:0,power:0,pull:0};const p=aiming.behavior.parameters,dx=aiming.current.x-aiming.start.x,dy=aiming.current.y-aiming.start.y,pull=Math.hypot(dx,dy),power=Math.max(0,Math.min(1,(pull-p.minPullPx)/Math.max(1,p.maxPullPx-p.minPullPx))),speed=p.minSpeed+(p.maxSpeed-p.minSpeed)*power,direction=p.invert?-1:1;
  return {vx:pull?dx/pull*speed*direction:0,vy:pull?dy/pull*speed*direction:0,power,pull};
 }
 function updateAim(p){if(!aiming)return;aiming.current=p;const launch=aimVelocity();aiming.power=launch.power;if(aiming.behavior.parameters.powerVariableId)variables[aiming.behavior.parameters.powerVariableId]=launch.power;}
 function ensureAudio(fromGesture=false){try{const Audio=globalThis.AudioContext??globalThis.webkitAudioContext;if(Audio&&!audio){audio=new Audio();audio.addEventListener?.('statechange',()=>{if(audio?.state==='running')flushPendingMusic();});}void unlockAudio(fromGesture);}catch{/* Muted interaction remains playable when audio is unavailable. */}}
 const down=e=>{refreshOrientation();const p=locate(e),row=hit(p);if(!row&&edit)return;if(edit){if(row){selected=row.c.id;onSelect(row.c.prototypeId??row.c.id);}return;}if(!e.isTrusted||(e.button!==undefined&&e.button!==0)||e.isPrimary===false||paused||closed||(drag&&drag.pointerId!==e.pointerId)||(aiming&&aiming.pointerId!==e.pointerId)/* 3d:start */||(aiming3d&&aiming3d.pointerId!==e.pointerId)/* 3d:end */||(bridge&&(!networkReady||!networkVisible)))return;const firstStart=!started;tutorialInputAt=time;tutorialHadInput=true;started=true;ensureAudio(true);if(firstStart&&!halted){frameEvents=frameActions=0;process();}const chain=row?ancestors(row.c):[];
 /* 3d:start */
 const aim3d=stage3dMgr&&!chain.some(c=>c.contract==='native.button.v1')?project.gameplay.find(b=>b.kind==='aim-launch-3d'&&byId.get(b.componentId)?.sceneId===scene):undefined;
 if(aim3d){
  const source=byId.get(aim3d.componentId),phys=project.gameplay.find(b=>b.kind==='physics-3d'&&b.componentId===source.id);
  const body=phys?body3dState(source,phys):undefined;
  const proj=project3dToStage(source.id);
  const nearBall=aim3d.parameters.dragMode==='anywhere'||(proj&&Math.hypot(p.x-proj.x,p.y-proj.y)<=aim3d.parameters.hitRadiusPx);
  if(body&&body.atRest&&!body.captured&&nearBall){
   aiming3d={behavior:aim3d,targetId:source.id,sourceId:source.id,stageId:aim3d.parameters.stageId,pointerId:e.pointerId,start:p,current:p,power:0};
   updateAim3d(p);canvas.setPointerCapture?.(e.pointerId);return;
  }
 }
 /* 3d:end */
 const aimBehavior=project.gameplay.find(b=>b.kind==='aim-launch'&&byId.get(b.componentId).sceneId===scene&&(b.parameters.dragMode==='anywhere'&&!chain.some(c=>c.contract==='native.button.v1')||chain.some(c=>(c.prototypeId??c.id)===b.componentId)));
 if(aimBehavior){
  const source=byId.get(aimBehavior.componentId),target=chain.find(c=>(c.prototypeId??c.id)===source.id)??targetsFor(source).find(c=>visible(c)),body=target&&physicsState(target,project.gameplay.find(b=>b.kind==='physics-body'&&b.componentId===source.id));
  if(body&&(!aimBehavior.parameters.onlyWhenAtRest||body.atRest)){aiming={behavior:aimBehavior,targetId:target.id,sourceId:source.id,pointerId:e.pointerId,start:p,current:p,power:0};updateAim(p);canvas.setPointerCapture?.(e.pointerId);render();return;}
 }
 for(const c of chain){const feedback=project.gameplay.find(b=>b.kind==='press-feedback'&&b.componentId===(c.prototypeId??c.id));if(feedback&&(c.contract!=='native.button.v1'||props(c).enabled))pressStates.set(c.id,{behavior:feedback.parameters,pointerId:e.pointerId,held:true});}const matchTile=chain.find(c=>matchCells.get(c.id)?.sceneId===scene);if(matchTile){
 const board=matchBoards.get(matchTile.parentId);
 if(board?.snapshot().busy)return;
 selectMatchTile(matchTile);
 if(board&&!board.snapshot().busy){
  matchGesture={pointerId:e.pointerId,boardId:matchTile.parentId,tileId:matchTile.id,start:p};
  canvas.setPointerCapture?.(e.pointerId);
 }
}pressed=chain.find(c=>c.contract==='native.button.v1'&&props(c).enabled)?.id;pressPointerId=pressed?e.pointerId:undefined;const b=project.gameplay.find(b=>b.kind==='drag'&&chain.some(c=>(c.prototypeId??c.id)===b.componentId));if(b){const c=chain.find(c=>(c.prototypeId??c.id)===b.componentId);drag={b,targetId:c.id,start:p,m:[...transform(c)],pointerId:e.pointerId};canvas.setPointerCapture(e.pointerId);}frameEvents=frameActions=0;halted=false;for(const c of chain)if(c.contract!=='native.button.v1'||props(c).enabled)emit({kind:'click',componentId:c.prototypeId??c.id,instanceId:c.instanceId,targetId:c.id,pointerId:e.pointerId});process();render();};
 function swipeMatch(e,p){
  if(!matchGesture||matchGesture.pointerId!==e.pointerId)return false;
  if(!e.isTrusted||!running())return true;
  const gesture=matchGesture,board=matchBoards.get(gesture.boardId);
  if(board.snapshot().busy){matchGesture=undefined;return true;}
  const inverse=inverseMatrix(world(byId.get(gesture.boardId))),start=point(inverse,gesture.start.x,gesture.start.y),current=point(inverse,p.x,p.y);
  const dx=current.x-start.x,dy=current.y-start.y,tile=byId.get(gesture.tileId);
  if(Math.max(Math.abs(dx),Math.abs(dy))<Math.min(tile.parameters.width,tile.parameters.height)*.35)return true;
  const cell=matchCells.get(tile.id),horizontal=Math.abs(dx)>Math.abs(dy);
  const row=cell.row+(horizontal?0:Math.sign(dy)),column=cell.column+(horizontal?Math.sign(dx):0);
  const destination=[...matchCells].find(([,value])=>value.boardId===gesture.boardId&&value.row===row&&value.column===column);
  if(destination&&board.swap(tile.id,destination[0])){matchSelected=undefined;render();}
  matchGesture=undefined;
  return true;
 }
 const move=e=>{
  if(paused)return;
  refreshOrientation();
  const stage=viewport(),p=locate(e);
  /* 3d:start */
  if(aiming3d?.pointerId===e.pointerId){if(e.isTrusted&&running())updateAim3d(p);return;}
  /* 3d:end */
  if(aiming?.pointerId===e.pointerId){if(e.isTrusted&&running())updateAim(p);render();return;}
  const row=hit(p);
  hover=row?ancestors(row.c).find(c=>c.contract==='native.button.v1')?.id:undefined;
  if(swipeMatch(e,p))return;
  if(!drag||drag.pointerId!==e.pointerId)return;
  const c=object(drag.targetId);
  if(!c){cancelDrag();return;}
  const parent=c.parentId?world(object(c.parentId)):identityMatrix(),inverse=inverseMatrix(parent);
  const start=point(inverse,drag.start.x,drag.start.y),now=point(inverse,p.x,p.y);
  const matrix=[...drag.m],axis=drag.b.parameters.axis;
  if(axis!=='y'){
   let x=drag.m[4]+now.x-start.x;
   if(Number.isFinite(drag.b.parameters.minX))x=Math.max(drag.b.parameters.minX,x);
   if(Number.isFinite(drag.b.parameters.maxX))x=Math.min(drag.b.parameters.maxX,x);
   matrix[4]=x;
  }
  if(axis!=='x'){
   let y=drag.m[5]+now.y-start.y;
   if(Number.isFinite(drag.b.parameters.minY))y=Math.max(drag.b.parameters.minY,y);
   if(Number.isFinite(drag.b.parameters.maxY))y=Math.min(drag.b.parameters.maxY,y);
   matrix[5]=y;
  }
  if(!c.parentId){
   if(axis!=='y')matrix[4]=Math.max(0,Math.min(stage.width-c.parameters.width,matrix[4]));
  }else{
   const bounds=geometry(c,multiplyMatrix(parent,matrix));
   let correction=0;
   if(bounds.left<0||bounds.right-bounds.left>stage.width)correction=-bounds.left;
   else if(bounds.right>stage.width)correction=stage.width-bounds.right;
   const xInfluence=axis==='y'?0:parent[0],yInfluence=axis==='x'?0:parent[2];
   if(Math.abs(xInfluence)>=Math.abs(yInfluence)&&Math.abs(xInfluence)>1e-8)matrix[4]+=correction/xInfluence;
   else if(Math.abs(yInfluence)>1e-8)matrix[5]+=correction/yInfluence;
  }
  const previous=overrides.get(c.id)??{parameters:{}};
  overrides.set(c.id,{...previous,transform:matrix});
 };

 const up=e=>{
  refreshOrientation();
  const p=locate(e),store=pendingStore;
  /* 3d:start */
  if(aiming3d?.pointerId===e.pointerId){
   const gesture=aiming3d,launch=aim3dVelocity(),body=bodies3d.get(gesture.targetId);
   stage3dMgr?.getStage(byId.get(gesture.stageId))?.setGuide([]);
   aiming3d=undefined;
   if(gesture.behavior.parameters.powerVariableId)variables[gesture.behavior.parameters.powerVariableId]=0;
   const speed=Math.hypot(launch.vx,launch.vz);
   if(e.isTrusted)ensureAudio(true);
   if(body&&e.isTrusted&&running()&&launch.pull>=gesture.behavior.parameters.minPullPx&&speed>=gesture.behavior.parameters.minSpeed){
    body.vx=launch.vx;body.vy=0;body.vz=launch.vz;body.atRest=false;body.restElapsed=0;body.movingTime=0;body.captured=false;body.lastSafe={x:body.x,y:body.y,z:body.z};
    emit({kind:'launch',componentId:gesture.sourceId});
   }
   finishPointer(e);process();return;
  }
  /* 3d:end */
  if(aiming?.pointerId===e.pointerId){
   const gesture=aiming,launch=aimVelocity(),body=physicsBodies.get(gesture.targetId);aiming=undefined;
   if(gesture.behavior.parameters.powerVariableId)variables[gesture.behavior.parameters.powerVariableId]=0;
   if(body&&e.isTrusted&&running()&&launch.pull>=gesture.behavior.parameters.minPullPx){body.vx=launch.vx;body.vy=launch.vy;body.atRest=false;body.restElapsed=0;body.captured=false;body.exited=false;emit({kind:'launch',componentId:gesture.sourceId,instanceId:body.instanceId});}
   finishPointer(e);process();render();return;
  }
  swipeMatch(e,p);
  if(matchGesture?.pointerId===e.pointerId)matchGesture=undefined;
  finishPointer(e);
  if(/* review:start */review||/* review:end */store?.pointerId!==e.pointerId||!e.isTrusted||!running()||
   (navigator.userActivation&&navigator.userActivation.isActive!==true)||!condition(store.condition))return;
  const row=hit(p);
  if(!row||!ancestors(row.c).some(c=>c.id===store.targetId&&(c.contract!=='native.button.v1'||props(c).enabled)))return;
  if(bridge)bridge.openStore(project.base.storeUrl);
  else window.open(project.base.storeUrl,'_blank','noopener');
 };
 const cancelPointer=e=>{/* 3d:start */if(aiming3d?.pointerId===e.pointerId)cancelAim3d(e.pointerId);/* 3d:end */if(aiming?.pointerId===e.pointerId){if(aiming.behavior.parameters.powerVariableId)variables[aiming.behavior.parameters.powerVariableId]=0;aiming=undefined;}if(matchGesture?.pointerId===e.pointerId)matchGesture=undefined;finishPointer(e);};
 const onClickUnlock=e=>{if(e?.isTrusted&&!edit&&!paused&&!closed)ensureAudio(true);};
 const onResize=()=>{if(!destroyed)render();};
 const resizeObserver=typeof globalThis.ResizeObserver==='function'?new globalThis.ResizeObserver(onResize):undefined;
 try{resizeObserver?.observe?.(canvas);}catch{/* Non-Element canvas mocks in unit tests do not support ResizeObserver. */}
 const visibility=()=>{acc=0;last=0;if(document.hidden)cancelInput();if(audio){if(document.hidden)void audio.suspend().catch(()=>{});else if(!paused&&started)void unlockAudio();}};document.addEventListener('visibilitychange',visibility);globalThis.addEventListener?.('resize',onResize);canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',cancelPointer);canvas.addEventListener('lostpointercapture',cancelPointer);canvas.addEventListener('click',onClickUnlock);
 const unsubscribeVisibility=bridge?.onVisibilityChanged(value=>{networkVisible=value;acc=0;last=0;if(!value)cancelInput();if(audio){if(!value)void audio.suspend().catch(()=>{});else if(!paused&&started)void unlockAudio();}});
 const unsubscribeClosed=bridge?.onClosed(()=>{closed=true;acc=0;last=0;cancelInput();stopAudio();});
 /* review:start */
 let reviewStop,reviewTick;
 /* review:end */
 function frame(now){const liveVisual=!edit&&!paused&&!document.hidden&&networkReady&&networkVisible&&!closed;if(liveVisual&&last)ambientTime+=Math.min((now-last)/1000,5/60);if(running()){frameEvents=frameActions=0;halted=false;if(last)acc+=Math.min((now-last)/1000,5/60);for(let n=0;n<5&&acc>=1/60;n++){/* review:start */reviewTick?.();/* review:end */tick(1/60);acc-=1/60;}process();
 /* review:start */
 if(reviewStop?.()){
  paused=true;reviewStop=undefined;reviewTick=undefined;
 }
 /* review:end */
 }else acc=0;last=now;render();raf=requestAnimationFrame(frame);}reset();if(edit)scene=sceneId;render();raf=requestAnimationFrame(frame);
 if(bridge)void bridge.init().then(()=>{if(destroyed)return;networkReady=true;networkVisible=bridge.isVisible();acc=0;last=0;}).catch(()=>{if(destroyed)return;closed=true;cancelInput();stopAudio();});
 /* review:start */
 // Only the local editor bundle includes synthetic replay and hit testing.
 const reviewTools=review?{
  freezeReview(){
   paused=true;reviewStop=undefined;reviewTick=undefined;acc=0;last=0;cancelAim();cancelDrag();matchGesture=undefined;void audio?.suspend().catch(()=>{});render();
  },
  seekReview(moment,{motion=false,trustedEvent}={}){
   paused=true;reviewStop=undefined;reviewTick=undefined;reset();
   const board=matchBoards.get('harvest.board');
   const audition=motion&&trustedEvent instanceof globalThis.Event&&trustedEvent.isTrusted;
   const step=()=>{
    const context=audio;
    audio=undefined;
    try{frameEvents=frameActions=0;halted=false;tick(1/60);process();}finally{audio=context;}
   };
   const play=()=>{
    if(audition){
     try{
      const Audio=globalThis.AudioContext??globalThis.webkitAudioContext;
      if(Audio)audio??=new Audio();
      void unlockAudio();
     }catch{/* The review can still play when audio is unavailable. */}
    }
    acc=0;last=0;paused=false;render();
   };
   if(byId.has('salvage.ship')&&Object.hasOwn(variables,'salvage.phase')){
    if(!['opening','first-catch','end-card','timeout'].includes(moment))throw Error('Review moment unavailable');
    const ship=byId.get('salvage.ship');
    const align=visible=>{
     const core=instances.filter(instance=>instance.prototypeId.startsWith('salvage.core')).sort((a,b)=>b.transform[5]-a.transform[5])[0];
     const previous=overrides.get(ship.id),matrix=[...(previous?.transform??ship.transform)];
     matrix[4]=visible&&core?Math.max(20,Math.min(306,core.transform[4]-8)):20;
     overrides.set(ship.id,{...previous,transform:matrix,parameters:{...previous?.parameters,visible}});
    };
    let salvageCtaAt,caughtAt;
    const salvageCtaSettled=()=>{
     if(variables['salvage.phase']!=='cta')return false;
     salvageCtaAt??=time;return time-salvageCtaAt>=.65;
    };
    if(moment==='opening'){
     if(motion){reviewStop=()=>time>=4;play();return;}
     render();return;
    }
    if(moment==='timeout'){
     const deadline=project.gameplay.find(behavior=>behavior.id==='salvage.deadline')?.parameters.seconds;
     if(!Number.isFinite(deadline))throw Error('Timeout replay unavailable');
     align(false);
     if(motion){
      while(time<deadline-.25&&variables['salvage.phase']!=='cta'){align(false);step();}
      if(variables['salvage.phase']==='cta')throw Error('Timeout replay unavailable');
      reviewTick=()=>{if(variables['salvage.phase']!=='cta')align(false);};
      reviewStop=()=>salvageCtaSettled()||time>=deadline+1;play();return;
     }
     for(let n=0;variables['salvage.phase']!=='cta'&&n<3600;n++){align(false);step();}
     if(variables['salvage.phase']!=='cta')throw Error('Timeout card unavailable');
     render();return;
    }
    const target=moment==='first-catch'?1:3;
    if(motion){
     for(let n=0;variables['salvage.catches']<target-1&&n<3600;n++){align(true);step();}
     if(variables['salvage.catches']!==target-1)throw Error('Review replay unavailable');
     reviewTick=()=>{if(variables['salvage.catches']<target)align(true);};
     reviewStop=()=>{
      if(target===1&&variables['salvage.catches']>=1){caughtAt??=time;return time-caughtAt>=1;}
      return target===3&&salvageCtaSettled()||time>=20;
     };
     play();return;
    }
    for(let n=0;variables['salvage.catches']<target&&n<3600;n++){align(true);step();}
    if(variables['salvage.catches']!==target)throw Error('Review catch unavailable');
    if(target===1)for(let n=0;n<84;n++)step();
    else{
     for(let n=0;variables['salvage.phase']!=='cta'&&n<300;n++)step();
     if(variables['salvage.phase']!=='cta')throw Error('End card unavailable');
    }
    render();return;
   }
   if(!board){
    if(!['opening','first-input','end-card','timeout'].includes(moment))throw Error('Review moment unavailable');
    if(moment==='opening'){if(motion){reviewStop=()=>time>=4;play();}else render();return;}
    const aim=project.gameplay.find(behavior=>behavior.kind==='aim-launch'&&byId.get(behavior.componentId).sceneId===scene);
    /* 3d:start */
    const aim3dReview=project.gameplay.find(behavior=>behavior.kind==='aim-launch-3d'&&byId.get(behavior.componentId).sceneId===scene);
    /* 3d:end */
    const primary=project.events.find(event=>event.kind==='click'&&byId.get(event.componentId)?.sceneId===scene&&project.eventBindings.some(binding=>binding.eventId===event.id));
    const firstInput=()=>{
     /* 3d:start */
     if(aim3dReview){
      const source=byId.get(aim3dReview.componentId),phys=project.gameplay.find(b=>b.kind==='physics-3d'&&b.componentId===source.id),body=body3dState(source,phys),zone=project.gameplay.find(b=>b.kind==='capture-zone-3d'&&byId.get(b.componentId).sceneId===scene);
      let vx=0,vz=-aim3dReview.parameters.maxSpeed*.45;
      if(zone){const zc=byId.get(zone.componentId),zp=props(zc),dx=(zp.x??0)-body.x,dz=(zp.z??0)-body.z,len=Math.hypot(dx,dz)||1;vx=dx/len*aim3dReview.parameters.maxSpeed*.55;vz=dz/len*aim3dReview.parameters.maxSpeed*.55;}
      body.vx=vx;body.vy=0;body.vz=vz;body.atRest=false;body.restElapsed=0;body.movingTime=0;body.lastSafe={x:body.x,y:body.y,z:body.z};emit({kind:'launch',componentId:source.id});
      process();return;
     }
     /* 3d:end */
     if(aim){
      const source=byId.get(aim.componentId),target=targetsFor(source)[0],body=physicsState(target,project.gameplay.find(b=>b.kind==='physics-body'&&b.componentId===source.id)),zone=project.gameplay.find(b=>b.kind==='capture-zone'&&byId.get(b.componentId).sceneId===scene);
      let vx=aim.parameters.maxSpeed*.45,vy=0;
      if(zone){const zc=byId.get(zone.componentId),center=point(world(zc),props(zc).width/2,props(zc).height/2),dx=center.x-body.x,dy=center.y-body.y,length=Math.hypot(dx,dy)||1;vx=dx/length*aim.parameters.maxSpeed*.45;vy=dy/length*aim.parameters.maxSpeed*.45;}
      body.vx=vx;body.vy=vy;body.atRest=false;body.restElapsed=0;emit({kind:'launch',componentId:source.id,instanceId:target.instanceId});
     }else if(primary)emit({kind:'click',componentId:primary.componentId,targetId:primary.componentId});
     else throw Error('Review primary input unavailable');
     process();
    };
    if(moment==='first-input'){firstInput();if(motion){reviewStop=()=>time>=2;play();}else{for(let n=0;n<60;n++)step();render();}return;}
    if(moment==='end-card')firstInput();
    const deadline=moment==='timeout'?Math.min(60,Math.max(1,project.gameplay.find(b=>b.kind==='timer')?.parameters.seconds??10)):60;
    const endScene=()=>project.scenes.find(item=>item.id===scene)?.role==='end-card';
    const preferredEnd=()=>moment==='timeout'
     ?(project.scenes.find(item=>item.role==='end-card'&&/fail|loss|timeout/i.test(item.id))??project.scenes.find(item=>item.role==='end-card'))
     :(project.scenes.find(item=>item.role==='end-card'&&!/fail|loss|timeout/i.test(item.id))??project.scenes.find(item=>item.role==='end-card'));
    if(motion){
     reviewStop=()=>endScene()&&time>=1||time>=deadline+1;play();return;
    }
    for(let n=0;n<deadline*60&&!endScene();n++)step();
    if(!endScene()||(moment==='timeout'&&!/fail|loss|timeout/i.test(scene))||(moment==='end-card'&&/fail|loss|timeout/i.test(scene))){
     const fallback=preferredEnd();if(!fallback)throw Error('End card unavailable');scene=fallback.id;aiming=undefined;cancelInput();emit({kind:'sceneEnter',sceneId:scene});process();
    }
    for(let n=0;n<45;n++)step();render();return;
   }
   let ctaAt;
   const ctaRevealSettled=()=>{
    if(variables['harvest.phase']!=='cta')return false;
    ctaAt??=time;
    return time-ctaAt>=.65;
   };
   if(moment==='opening'&&motion){
    reviewStop=()=>time>=7;
    acc=0;last=0;paused=false;
   }
   if(moment==='timeout'){
    if(!board)throw Error('Review moment unavailable');
    if(motion){
     const deadline=project.gameplay.find(behavior=>behavior.id==='harvest.deadline')?.parameters.seconds;
     if(!Number.isFinite(deadline))throw Error('Timeout replay unavailable');
     while(time<deadline-.25&&variables['harvest.phase']!=='cta')step();
     if(variables['harvest.phase']==='cta')throw Error('Timeout replay unavailable');
     reviewStop=()=>ctaRevealSettled()||time>=deadline+1;
     play();return;
    }
    for(let n=0;variables['harvest.phase']!=='cta'&&n<3600;n++)step();
    if(variables['harvest.phase']!=='cta')throw Error('Timeout card unavailable');
   }else if(moment!=='opening'){
    if(!board||!['first-harvest','end-card'].includes(moment))throw Error('Review moment unavailable');
    const count=moment==='first-harvest'?1:3;
    for(let match=0;match<count;match++){
     const move=board.snapshot().legalMoves[0];
     if(!move||!board.swap(move.from,move.to))throw Error('Review move unavailable');
     if(motion&&match===count-1){
      const until=time+(count===1?3:8);
      reviewStop=()=>time>=until||(count===3&&ctaRevealSettled());
      play();return;
     }
     for(let frames=0;board.snapshot().busy&&frames<240;frames++)step();
     if(board.snapshot().busy)throw Error('Review replay did not settle');
    }
    if(count===1){for(let n=0;n<84;n++)step();}
    else{
     for(let n=0;variables['harvest.phase']!=='cta'&&n<300;n++)step();
     if(variables['harvest.phase']!=='cta')throw Error('End card unavailable');
    }
   }
   render();
  },
  pickReview(clientX,clientY){
   const row=hit(locate({clientX,clientY}));
   return row?ancestors(row.c).map(c=>c.prototypeId??c.id):[];
  },
  reviewBounds(ids){
   const stage=viewport(),w=canvas.clientWidth,h=canvas.clientHeight;
   const scale=Math.min(w/stage.width,h/stage.height);
   return paint.filter(row=>ids.includes(row.c.id)).map(row=>{
    const b=geometry(row.c,row.m);
    return {left:(w-stage.width*scale)/2+b.left*scale,top:(h-stage.height*scale)/2+b.top*scale,width:(b.right-b.left)*scale,height:(b.bottom-b.top)*scale};
   });
  },
 }:undefined;
 /* review:end */
 return {/* review:start */...reviewTools,/* review:end */state,auditViewport,auditSceneLayout,restart:()=>{/* review:start */reviewStop=undefined;reviewTick=undefined;/* review:end */reset();render();},select:id=>{selected=id;},inspectScene:id=>{if(edit&&project.scenes.some(s=>s.id===id)){scene=id;selected=undefined;}},pause:value=>{paused=value;acc=0;last=0;if(value)cancelInput();if(audio){if(value)void audio.suspend().catch(()=>{});else if(started)void unlockAudio();}},destroy:()=>{destroyed=true;cancelAnimationFrame(raf);cancelInput();stopAudio();/* 3d:start */stage3dMgr?.dispose();/* 3d:end */unsubscribeVisibility?.();unsubscribeClosed?.();bridge?.destroy();resizeObserver?.disconnect?.();document.removeEventListener('visibilitychange',visibility);globalThis.removeEventListener?.('resize',onResize);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',cancelPointer);canvas.removeEventListener('lostpointercapture',cancelPointer);canvas.removeEventListener('click',onClickUnlock);void audio?.close().catch(()=>{});}};
}
