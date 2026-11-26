import test from 'node:test';
import assert from 'node:assert/strict';
import {mountNative} from '../../scripts/lean/native/runtime.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {computeJoystickVector} from '../../scripts/lean/native/interaction-gestures.mjs';
import {resolveWallSlide3d} from '../../scripts/lean/native/physics-3d.mjs';

function harness(operations){
 const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};
 let callback;set('requestAnimationFrame',fn=>{callback=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){},createElement(){return {width:1,height:1,getContext:()=>null,addEventListener(){},removeEventListener(){}};}});set('devicePixelRatio',1);
 const listeners=new Map(),ctx=new Proxy({globalAlpha:1,measureText:text=>({width:String(text).length*10})},{get:(o,k)=>k in o?o[k]:()=>{}});
 const canvas={clientWidth:390,clientHeight:700,getContext:()=>ctx,addEventListener(type,listener){listeners.set(type,listener);},removeEventListener(type){listeners.delete(type);},setPointerCapture(){},releasePointerCapture(){},hasPointerCapture(){return false;},getBoundingClientRect(){return {left:0,top:0,width:390,height:700};}};
 const {project}=applyOperations(emptyProject({id:'fps-joystick-test',name:'FPS Joystick Test'}),operations),runtime=mountNative(project,canvas);let now=100;
 return {
  runtime,
  advance(seconds){for(let n=0;n<Math.ceil(seconds*60);n++){now+=1000/60;callback(now);}},
  event(type,x,y,pointerId=1,isPrimary=pointerId===1){listeners.get(type)?.({clientX:x,clientY:y,pointerId,isPrimary,isTrusted:true,button:0});},
  close(){runtime.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];},
 };
}
const comp=(id,contract,parameters={},extra={})=>({kind:'createComponent',component:{id,contract,parameters,...extra}});
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
const binding=(id,event,actions,condition)=>({kind:'putBinding',binding:{id,event,actions,...(condition?{condition}:{})}});
const variable=(id,initial=0)=>({kind:'putVariable',variable:{id,label:id,type:'number',initial}});

test('computeJoystickVector applies deadzone, clamps to radius, and resolves wall sliding',()=>{
 const inside=computeJoystickVector({x:100,y:100},{x:104,y:100},50,.12);
 assert.equal(inside.magnitude,0);assert.equal(inside.nx,0);assert.equal(inside.ny,0);
 const full=computeJoystickVector({x:100,y:100},{x:220,y:100},50,.12);
 assert.equal(full.magnitude,1);assert.equal(full.nx,1);assert.equal(full.ny,0);assert.equal(full.knobX,150);
 const slid=resolveWallSlide3d(0,.2,.5,[{x:0,z:0,hx:1,hz:.5,angle:0}],10,10);
 assert.ok(slid.z>=.99,JSON.stringify(slid));
 const clamped=resolveWallSlide3d(25,-25,.5,[],10,10);
 assert.equal(clamped.x,9.5);assert.equal(clamped.z,-9.5);
});

test('2D virtual joystick writes axis variables, drives a 2D target, and resets on release and restart',()=>{
 const h=harness([
  variable('jx'),variable('jy'),variable('jmag'),variable('starts'),variable('ends'),
  comp('pad','native.group.v1',{width:140,height:140},{transform:[1,0,0,1,20,520]}),
  comp('hero','native.rectangle.v1',{width:40,height:40},{transform:[1,0,0,1,175,330]}),
  behavior('pad.stick','pad','virtual-joystick',{mode:'fixed',radiusPx:50,deadZone:.1,axisXVariableId:'jx',axisYVariableId:'jy',magnitudeVariableId:'jmag',moveComponentId:'hero',moveSpeed:200,orientToMove:true}),
  binding('start',{kind:'joystickStart',componentId:'pad'},[{kind:'add',variableId:'starts',value:1}]),
  binding('end',{kind:'joystickEnd',componentId:'pad'},[{kind:'add',variableId:'ends',value:1}]),
 ]);
 try{
  h.event('pointerdown',90,590,1,true);h.event('pointermove',140,590,1,true);h.advance(.25);
  let st=h.runtime.state();
  assert.equal(st.variables.starts,1);assert.equal(st.variables.jx,1);assert.equal(st.variables.jmag,1);
  assert.ok(st.components.hero.transform[4]>210,JSON.stringify(st.components.hero));
  h.event('pointerup',140,590,1,true);
  st=h.runtime.state();assert.equal(st.variables.ends,1);assert.equal(st.variables.jx,0);assert.equal(st.variables.jmag,0);
  h.runtime.restart();assert.equal(h.runtime.state().variables.starts,0);assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('FPS 3D supports simultaneous joystick movement, drag-look, wall collision, steer-3d, spawnAt3d, and raycast3d hits/occlusion',()=>{
 const h=harness([
  variable('kills'),variable('hits'),variable('misses'),
  comp('stage','native.stage3d.v1',{width:390,height:700,cameraFov:66,landscapeCameraFov:52,introLift:0},{order:-10}),
  comp('pillar','native.mesh3d.v1',{primitive:'box',x:0,y:1.5,z:2,sx:2,sy:3,sz:1,color:'#445566'},{parentId:'stage'}),
  behavior('pillar.phys','pillar','physics-3d',{mode:'static',radius:.5,hx:1,hz:.5,angle:0,friction:1,restitution:.5,maxSpeed:1,boundsX:12,boundsZ:12,ramp:false,restSpeed:.1,restDelaySeconds:.25}),
  comp('gun','native.mesh3d.v1',{primitive:'box',x:0,y:0,z:-.5,sx:.3,sy:.3,sz:.5,attachToCamera:true,color:'#222222'},{parentId:'stage'}),
  comp('bot','native.mesh3d.v1',{primitive:'group',x:0,y:1.5,z:-4},{parentId:'stage',prototype:true}),
  comp('bot.body','native.mesh3d.v1',{primitive:'box',x:0,y:0,z:0,sx:1.4,sy:1.4,sz:1.4,color:'#ef5b4c'},{parentId:'bot'}),
  behavior('bot.state','bot','instance-state',{hp:2,maxHp:2,value:1,tag:'bot',team:'enemy'}),
  behavior('bot.steer','bot','steer-3d',{mode:'chase-camera',speed:2,stopDistance:2.5,faceCamera:true,boundsX:12,boundsZ:12}),
  comp('joy','native.group.v1',{width:130,height:130},{transform:[1,0,0,1,20,520]}),
  behavior('joy.stick','joy','virtual-joystick',{mode:'fixed',radiusPx:50,deadZone:.1}),
  behavior('fps','stage','fps-controller-3d',{x:0,y:1.6,z:6,yaw:0,pitch:0,minPitch:-.6,maxPitch:.6,moveSpeed:5,lookSensitivity:.01,playerRadius:.5,boundsX:10,boundsZ:10,joystickBehaviorId:'joy.stick',lookMode:'drag'}),
  comp('fire','native.button.v1',{width:120,height:60},{transform:[1,0,0,1,240,560]}),
  binding('spawn',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'spawnAt3d',prototypeId:'bot',x:0,y:1.5,z:-4,count:1}]),
  binding('shoot',{kind:'click',componentId:'fire'},[{kind:'raycast3d',stageId:'stage',mode:'crosshair',maxDistance:50,targetTeam:'enemy'}]),
  binding('hit',{kind:'raycastHit3d',componentId:'bot'},[{kind:'add',variableId:'hits',value:1},{kind:'modifyInstanceState',target:'self',componentId:'bot',field:'hp',op:'sub',value:1}]),
  binding('miss',{kind:'raycastMiss3d',componentId:'stage'},[{kind:'add',variableId:'misses',value:1}]),
  binding('kill',{kind:'instanceDepleted',componentId:'bot'},[{kind:'add',variableId:'kills',value:1},{kind:'despawn',target:'self'}]),
 ]);
 try{
  h.advance(.05);
  assert.equal(h.runtime.state().instances.length,1);
  // 1. Enemy at (0,1.5,-4) is occluded by pillar at (0,1.5,2) -> shot must MISS (also ignores camera-attached gun!)
  h.event('pointerdown',300,590,1,true);h.event('pointerup',300,590,1,true);
  assert.equal(h.runtime.state().variables.hits,0);
  assert.equal(h.runtime.state().variables.misses,1);

  // 2. Multi-touch: hold pointer 1 on joystick (strafe right past pillar) + pointer 2 drag-look slightly left + pointer 3 tap FIRE!
  h.event('pointerdown',85,585,1,true);h.event('pointermove',135,585,1,true);
  h.advance(.6); // strafe right ~3m -> x ~ 3.0, clear of pillar (hx=1)
  const afterMove=h.runtime.state();
  assert.ok(afterMove.physics3d.fps.stage.x>2.2,JSON.stringify(afterMove.physics3d.fps));
  assert.equal(afterMove.input.joysticks['joy.stick'].active,true);

  // Drag look with secondary pointer 2 while joystick pointer 1 stays held
  h.event('pointerdown',280,240,2,false);h.event('pointermove',230,240,2,false); // dx=-50 -> yaw += 0.5 rad (look left toward enemy!)
  assert.ok(h.runtime.state().physics3d.fps.stage.yaw>.45);
  assert.equal(h.runtime.state().input.joysticks['joy.stick'].active,true);
  h.event('pointerup',230,240,2,false);
  h.event('pointerup',135,585,1,true);
  assert.equal(h.runtime.state().input.joysticks['joy.stick'].active,false);

  // Align camera straight at the steered enemy and fire two hits to deplete HP -> despawn!
  const botId=h.runtime.state().instances[0].id;
  const botPos=h.runtime.state().components[botId]?.parameters;
  assert.ok(botPos&&botPos.z>-4,'steer-3d should have moved bot toward player: '+JSON.stringify(botPos));
  // Aim directly at bot by steering yaw via look drag
  const fpsNow=h.runtime.state().physics3d.fps.stage;
  const desiredYaw=Math.atan2(-(botPos.x-fpsNow.x),-(botPos.z-fpsNow.z));
  const dx=(fpsNow.yaw-desiredYaw)/.01;
  h.event('pointerdown',200,200,3,false);h.event('pointermove',200+dx,200,3,false);h.event('pointerup',200+dx,200,3,false);

  h.event('pointerdown',300,590,4,false);h.event('pointerup',300,590,4,false);
  assert.equal(h.runtime.state().variables.hits,1);
  assert.equal(h.runtime.state().instances.length,1);
  h.event('pointerdown',300,590,5,false);h.event('pointerup',300,590,5,false);
  assert.equal(h.runtime.state().variables.hits,2);
  assert.equal(h.runtime.state().variables.kills,1);
  assert.equal(h.runtime.state().instances.length,0);
  // Next shot misses now that drone is despawned
  h.event('pointerdown',300,590,6,false);h.event('pointerup',300,590,6,false);
  assert.equal(h.runtime.state().variables.misses,2);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('stationary FPS uses direct 1:1 delta aim joystick (bounded to forward arc) and stops when held still',()=>{
 const h=harness([
  variable('hits'),
  comp('stage','native.stage3d.v1',{width:390,height:700,cameraFov:75,landscapeCameraFov:52,introLift:0},{order:-10}),
  comp('target','native.mesh3d.v1',{primitive:'box',x:4,y:1.6,z:2,sx:1.5,sy:1.5,sz:1.5,color:'#ef5b4c'},{parentId:'stage'}),
  behavior('target.state','target','instance-state',{hp:1,maxHp:1,value:1,tag:'drone',team:'enemy'}),
  comp('joy','native.group.v1',{width:150,height:150},{transform:[1,0,0,1,20,510]}),
  behavior('joy.stick','joy','virtual-joystick',{mode:'fixed',radiusPx:54,deadZone:0}),
  behavior('fps','stage','fps-controller-3d',{x:0,y:1.6,z:6,yaw:0,pitch:0,minYaw:-.9,maxYaw:.9,minPitch:-.5,maxPitch:.5,moveSpeed:0,lookSensitivity:.01,aimJoystickBehaviorId:'joy.stick',aimMode:'delta',lookMode:'none'}),
  comp('fire','native.button.v1',{width:120,height:60},{transform:[1,0,0,1,240,560]}),
  binding('shoot',{kind:'click',componentId:'fire'},[{kind:'raycast3d',stageId:'stage',mode:'crosshair',maxDistance:50,targetTeam:'enemy'}]),
  binding('hit',{kind:'raycastHit3d',componentId:'target'},[{kind:'add',variableId:'hits',value:1}]),
 ]);
 try{
  // Drag right by 78.5px at 0.01 rad/px -> exact -PI/4 yaw onto target at (+4, 1.6, +2)
  h.event('pointerdown',95,585,1,true);h.event('pointermove',173.5,585,1,true);
  const afterDrag=h.runtime.state().physics3d.fps.stage;
  assert.equal(afterDrag.x,0);assert.equal(afterDrag.y,1.6);assert.equal(afterDrag.z,6);
  assert.ok(Math.abs(afterDrag.yaw+Math.PI/4)<.01,JSON.stringify(afterDrag));
  // Holding still for 0.5s MUST NOT drift or keep spinning!
  h.advance(.5);
  assert.equal(h.runtime.state().physics3d.fps.stage.yaw,afterDrag.yaw);
  // Fire with pointer 2 while still holding aim joystick -> scores HIT!
  h.event('pointerdown',300,590,2,false);h.event('pointerup',300,590,2,false);
  assert.equal(h.runtime.state().variables.hits,1);
  // Large rightward drag clamps cleanly to minYaw (-0.9) and upward drag clamps to maxPitch (+0.5)
  h.event('pointermove',400,400,1,true);
  assert.equal(h.runtime.state().physics3d.fps.stage.yaw,-.9);
  assert.equal(h.runtime.state().physics3d.fps.stage.pitch,.5);
  // Releasing keeps aim right where player left it
  h.event('pointerup',400,400,1,true);
  assert.equal(h.runtime.state().physics3d.fps.stage.yaw,-.9);
  assert.equal(h.runtime.state().physics3d.fps.stage.z,6);
 }finally{h.close();}
});

test('virtual-joystick, fps-controller-3d, raycast3d, and spawnAt3d reject invalid targets',()=>{
 assert.throws(()=>applyOperations(emptyProject({id:'bad-joy',name:'Bad joy'}),[comp('stage','native.stage3d.v1'),behavior('stage.joy','stage','virtual-joystick',{mode:'fixed',radiusPx:50,deadZone:.1})]),/E_NATIVE_PROPERTY/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-fps',name:'Bad fps'}),[comp('box','native.rectangle.v1'),behavior('box.fps','box','fps-controller-3d',{x:0,y:1.6,z:0,yaw:0,pitch:0,moveSpeed:5,lookSensitivity:.005})]),/E_NATIVE_PHYSICS/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-aim-joy',name:'Bad aim joy'}),[comp('stage','native.stage3d.v1'),behavior('stage.fps','stage','fps-controller-3d',{x:0,y:1.6,z:0,yaw:0,pitch:0,moveSpeed:0,lookSensitivity:.005,aimJoystickBehaviorId:'missing'})]),/E_NATIVE_REFERENCE/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-ray',name:'Bad ray'}),[comp('box','native.rectangle.v1'),binding('b',{kind:'click',componentId:'box'},[{kind:'raycast3d',stageId:'box'}])]),/E_NATIVE_PHYSICS/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-spawn3d',name:'Bad spawn3d'}),[comp('box','native.rectangle.v1',{},{prototype:true}),binding('b',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'spawnAt3d',prototypeId:'box',x:0,y:0,z:0}])]),/E_NATIVE_PROTOTYPE/);
});
