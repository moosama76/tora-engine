import test from 'node:test';
import assert from 'node:assert/strict';
import {mountNative} from '../../scripts/lean/native/runtime.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {stepPhysics} from '../../scripts/lean/native/physics-2d.mjs';
import {createEraseMask} from '../../scripts/lean/native/erase-mask.mjs';
import {segmentsIntersect,segmentHitsPolygon} from '../../scripts/lean/native/draw-stroke.mjs';

function harness(operations){
 const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};let callback;set('requestAnimationFrame',fn=>{callback=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){}});set('devicePixelRatio',1);
 const listeners=new Map(),ctx=new Proxy({globalAlpha:1,measureText:text=>({width:String(text).length*10})},{get:(o,k)=>k in o?o[k]:()=>{}}),canvas={clientWidth:390,clientHeight:700,getContext:()=>ctx,addEventListener(type,listener){listeners.set(type,listener);},removeEventListener(type){listeners.delete(type);},setPointerCapture(){},getBoundingClientRect(){return {left:0,top:0,width:390,height:700};}};
 const {project}=applyOperations(emptyProject({id:'canvas-primitives',name:'Canvas primitives'}),operations),runtime=mountNative(project,canvas);let now=100;
 return {runtime,advance(seconds){for(let n=0;n<Math.ceil(seconds*60);n++){now+=1000/60;callback(now);}},event(type,x,y,pointerId=1){listeners.get(type)?.({clientX:x,clientY:y,pointerId,isTrusted:true});},close(){runtime.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}};
}
const group=(id='field',extra={})=>({kind:'createComponent',component:{id,contract:'native.group.v1',parameters:{width:390,height:700},...extra}});
const rect=(id,x=0,y=0,extra={})=>({kind:'createComponent',component:{id,contract:'native.rectangle.v1',transform:[1,0,0,1,x,y],parameters:{width:40,height:40},...extra}});
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
const binding=(id,event,actions)=>({kind:'putBinding',binding:{id,event,actions}});
const variable=(id,initial=0)=>({kind:'putVariable',variable:{id,label:id,type:'number',initial}});
const body={mode:'dynamic',shape:'circle',restitution:.8,friction:0,linearDamping:0,gravity:0,maxSpeed:900,restSpeed:1,restDelaySeconds:.1,wallBounce:false,spinToRotation:false};
const draw=(mode='physics-wall',extra={})=>behavior('field.draw','field',mode==='path-trace'?'draw-stroke':'draw-stroke',{mode,maxPoints:64,minSegmentPx:8,maxStrokes:4,strokeWidth:12,color:'#ffffff',...extra});

test('mask coverage is continuous, completes once, and resets without canvas readbacks',()=>{
 let progress=0,complete=0;const mask=createEraseMask({mode:'erase',brushRadiusPx:32,gridSize:12,targetPercent:40},{width:200,height:100,onProgress:value=>progress=value,onComplete:()=>complete++});mask.stampSegment({x:0,y:50},{x:200,y:50});assert.ok(progress>=40);assert.equal(complete,1);mask.stampSegment({x:200,y:50},{x:0,y:50});assert.equal(complete,1);mask.reset();assert.equal(mask.progress,0);
 assert.equal(segmentsIntersect({x:0,y:0},{x:10,y:10},{x:0,y:10},{x:10,y:0}),true);
});

test('erase-mask gestures update progress and resetMask restores the overlay',()=>{
 const h=harness([group(),rect('frost',50,50,{parameters:{width:200,height:120}}),rect('reset',250,500,{parameters:{width:100,height:70}}),variable('progress'),behavior('frost.mask','frost','erase-mask',{mode:'erase',brushRadiusPx:48,gridSize:12,targetPercent:20,progressVariableId:'progress',maskColor:'#dceeff'}),binding('complete',{kind:'maskComplete',componentId:'frost'},[{kind:'set',variableId:'progress',value:100}]),binding('reset.action',{kind:'click',componentId:'reset'},[{kind:'resetMask',componentId:'frost'}])]);
 try{h.event('pointerdown',70,100);h.event('pointermove',210,100);h.event('pointerup',210,100);assert.ok(h.runtime.state().canvas.masks.frost.progress>=20);assert.equal(h.runtime.state().variables.progress,100);h.event('pointerdown',300,535);h.event('pointerup',300,535);assert.equal(h.runtime.state().canvas.masks.frost.progress,0);}finally{h.close();}
});

test('drawn physics walls deflect a real body and clearStrokes removes them',()=>{
 const h=harness([group(),rect('ball',50,50),rect('reset',250,500,{parameters:{width:100,height:70}}),behavior('ball.body','ball','physics-body',body),draw(),binding('launch',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'setVelocity',componentId:'ball',vx:0,vy:160}]),binding('clear',{kind:'click',componentId:'reset'},[{kind:'clearStrokes',componentId:'field'}])]);
 try{h.event('pointerdown',0,150);h.event('pointermove',200,150);h.event('pointerup',200,150);assert.ok(h.runtime.state().canvas.walls>0);h.advance(.4);assert.ok(h.runtime.state().physics.bodies.find(body=>body.id==='ball').vy<0);h.event('pointerdown',300,535);h.event('pointerup',300,535);assert.equal(h.runtime.state().canvas.walls,0);}finally{h.close();}
});

test('slice-blade hits a collider and severs a breakable distance rope once',()=>{
 const joint={kind:'distance',anchorComponentId:'anchor',lengthPx:100,breakable:true,drawRope:true,ropeColor:'#ffffff',ropeWidth:2},h=harness([group(),rect('anchor',0,0),rect('target',70,70),variable('score'),behavior('target.collider','target','collider',{shape:'box'}),behavior('target.body','target','physics-body',body),behavior('target.joint','target','physics-joint',joint),draw('slice-blade'),binding('slice',{kind:'sliceHit',componentId:'target'},[{kind:'add',variableId:'score',value:1}]),binding('break',{kind:'jointBreak',behaviorId:'target.joint',componentId:'target'},[{kind:'add',variableId:'score',value:2}])]);
 try{h.advance(.03);h.event('pointerdown',20,20);h.event('pointermove',120,120);h.event('pointerup',120,120);assert.equal(h.runtime.state().variables.score,3);assert.equal(h.runtime.state().canvas.joints,0);h.runtime.restart();assert.equal(h.runtime.state().variables.score,0);assert.equal(h.runtime.state().canvas.strokes.field??0,0);}finally{h.close();}
});

test('path-trace follows the polyline and emits pathArrive',()=>{
 const h=harness([group(),rect('follower',0,0),variable('arrived'),draw('path-trace',{followComponentId:'follower',followSpeed:150}),binding('arrive',{kind:'pathArrive',componentId:'follower'},[{kind:'set',variableId:'arrived',value:1}])]);
 try{h.event('pointerdown',0,0);h.event('pointermove',100,0);h.event('pointerup',100,0);h.advance(1);assert.equal(h.runtime.state().variables.arrived,1);assert.ok(h.runtime.state().components.follower.transform[4]>=75);}finally{h.close();}
});

test('mass weights impulses, collision groups filter pairs, and distance projection is stable',()=>{
 const light={id:'light',mode:'dynamic',shape:'circle',x:40,y:100,vx:100,vy:0,width:20,height:20,mass:1,restitution:1,friction:0,linearDamping:0,gravity:0,maxSpeed:1000,restSpeed:1,restDelaySeconds:.1},heavy={...light,id:'heavy',x:60,y:100,vx:0,mass:2};stepPhysics({bodies:[light,heavy],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60});assert.ok(Math.abs(light.vx+100/3)<1e-8&&Math.abs(heavy.vx-200/3)<1e-8);
 const filtered={...light,id:'filtered',x:40,vx:100,ignoreGroup:'projectile'},projectile={...heavy,id:'projectile',x:50,vx:0,mass:1,collisionGroup:'projectile'};stepPhysics({bodies:[filtered,projectile],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60});assert.equal(projectile.vx,0);
 const ropeBody={...light,id:'rope',x:200,y:0,vx:100,mass:1},anchor={...light,id:'anchor',mode:'static',x:0,y:0,vx:0};stepPhysics({bodies:[ropeBody,anchor],joints:[{bodyId:'rope',anchorId:'anchor',lengthPx:50}],bounds:{left:-500,top:-500,right:500,bottom:500},dt:1/60});assert.ok(Math.hypot(ropeBody.x,ropeBody.y)<=50.0001);assert.ok(ropeBody.vx<=.0001);
});

test('reveal masks composite the source only into stamped regions',()=>{
 const calls=[],source={complete:true,naturalWidth:100};let composite;
 const context=new Proxy({}, {get:(object,key)=>key in object?object[key]:(...args)=>{if(key==='drawImage')calls.push({composite,args});},set:(object,key,value)=>{object[key]=value;if(key==='globalCompositeOperation')composite=value;return true;}});
 const mask=createEraseMask({mode:'reveal',brushRadiusPx:24,gridSize:12,targetPercent:50},{width:100,height:100,source,canvasFactory:()=>({width:100,height:100,getContext:()=>context})});
 mask.stampSegment({x:20,y:50},{x:60,y:50});assert.ok(calls.some(call=>call.composite==='source-in'&&call.args[0]===source));assert.ok(mask.progress>0);
});

test('non-square mask coverage, interior slice hit, wall eviction, and default ignoreGroup none behave cleanly',()=>{
 const wide=createEraseMask({mode:'erase',brushRadiusPx:30,gridSize:12,targetPercent:90},{width:300,height:60});
 wide.stampSegment({x:0,y:30},{x:300,y:30});assert.equal(wide.progress,100);
 assert.equal(segmentHitsPolygon({x:40,y:40},{x:60,y:60},[{x:0,y:0},{x:100,y:0},{x:100,y:100},{x:0,y:100}]),true);
 const a={id:'a',mode:'dynamic',shape:'circle',x:40,y:100,vx:100,vy:0,width:20,height:20,mass:1,restitution:1,friction:0,linearDamping:0,gravity:0,maxSpeed:1000,restSpeed:1,restDelaySeconds:.1,collisionGroup:'all',ignoreGroup:'none'},b={...a,id:'b',x:60,vx:0};
 stepPhysics({bodies:[a,b],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60});assert.ok(b.vx>99);
 const c={...a,id:'c',x:40,vx:100,ignoreGroup:'all'},d={...a,id:'d',x:60,vx:0};
 stepPhysics({bodies:[c,d],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60});assert.equal(d.vx,0);
 const h=harness([group(),rect('target',80,80),variable('hits'),behavior('target.collider','target','collider',{shape:'box'}),draw('physics-wall',{maxStrokes:1}),binding('slice',{kind:'sliceHit',componentId:'target'},[{kind:'add',variableId:'hits',value:1}])]);
 try{
  h.event('pointerdown',60,100);h.event('pointermove',140,100);h.event('pointerup',140,100);
  const firstWalls=h.runtime.state().canvas.walls;assert.ok(firstWalls>0);assert.equal(h.runtime.state().variables.hits,0);
  h.event('pointerdown',60,200);h.event('pointermove',140,200);h.event('pointerup',140,200);
  assert.equal(h.runtime.state().canvas.walls,firstWalls);
 }finally{h.close();}
});
