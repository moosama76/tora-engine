import test from 'node:test';
import process from 'node:process';
import assert from 'node:assert/strict';
import {mountNative} from '../../scripts/lean/native/runtime.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {stepPhysics,predictTrajectory} from '../../scripts/lean/native/physics-2d.mjs';
import {stepPhysics3d,predictTrajectory3d,ground3d} from '../../scripts/lean/native/physics-3d.mjs';
import {validateMp3,validateToraMesh} from '../../scripts/lean/native/media-validate.mjs';
import {analyzeAudio} from '../../scripts/lean/native/audio-analysis.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import {Buffer} from 'node:buffer';
import {chromium} from 'playwright';
import {createGolfProof} from '../../scripts/lean/native/author-primitive-proofs.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {runCreativeQa} from '../../scripts/lean/native/creative-qa.mjs';
import {reviewOperations,reviewTargets} from '../../scripts/lean/native/review-targets.mjs';
import {createProjectIndex} from '../../scripts/lean/native/project-index.mjs';
import {resolveProjectRoles} from '../../scripts/lean/native/modules/index.mjs';

const bodyParameters={mode:'dynamic',shape:'circle',restitution:.82,friction:1.2,linearDamping:.25,gravity:0,maxSpeed:900,restSpeed:12,restDelaySeconds:.25,wallBounce:true,spinToRotation:false};
const aimParameters={dragMode:'anywhere',minPullPx:14,maxPullPx:160,minSpeed:60,maxSpeed:850,invert:true,onlyWhenAtRest:true,showTrajectory:true,trajectoryDots:8,trajectoryBounces:1,trajectoryColor:'#fff9ec'};
function harness(operations){const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};let callback;set('requestAnimationFrame',fn=>{callback=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){}});set('devicePixelRatio',1);const listeners=new Map(),ctx=new Proxy({globalAlpha:1,measureText:text=>({width:String(text).length*10})},{get:(o,k)=>k in o?o[k]:()=>{}}),canvas={clientWidth:390,clientHeight:700,getContext:()=>ctx,addEventListener(type,listener){listeners.set(type,listener);},removeEventListener(type){listeners.delete(type);},setPointerCapture(){},getBoundingClientRect(){return {left:0,top:0,width:390,height:700};}};const {project}=applyOperations(emptyProject({id:'physics-primitives',name:'Physics primitives'}),operations),runtime=mountNative(project,canvas);let now=100;return {runtime,advance(seconds){for(let n=0;n<Math.ceil(seconds*60);n++){now+=1000/60;callback(now);}},event(type,x,y,pointerId=1){listeners.get(type)?.({clientX:x,clientY:y,pointerId,isTrusted:true});},close(){runtime.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}};}
const component=(id,extra={})=>({kind:'createComponent',component:{id,contract:'native.ellipse.v1',parameters:{width:20,height:20},...extra}});
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
const base=[{kind:'createComponent',component:{id:'controller',contract:'native.group.v1'}},{kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}},{kind:'putVariable',variable:{id:'power',label:'Power',type:'number',initial:0}}];

test('circle banks against a rotated box and a fast shot cannot tunnel through it',()=>{
 const ball={id:'ball',mode:'dynamic',shape:'circle',x:50,y:100,vx:900,vy:0,width:16,height:16,restitution:.9,friction:0,linearDamping:0,gravity:0,maxSpeed:2000,restSpeed:1,restDelaySeconds:.1,wallBounce:false};
 const wall={id:'wall',mode:'static',shape:'box',x:160,y:100,vx:0,vy:0,width:8,height:100,angle:Math.PI/7,restitution:.9};
 const bounces=[];stepPhysics({bodies:[ball,wall],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60,onEvent:(kind,source,other)=>{if(kind==='bodyBounce')bounces.push([source.id,other?.id]);}});
 for(let n=0;n<30;n++)stepPhysics({bodies:[ball,wall],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60,onEvent:(kind,source,other)=>{if(kind==='bodyBounce')bounces.push([source.id,other?.id]);}});
 assert.ok(ball.vx<0);assert.ok(Math.abs(ball.vy)>0);assert.ok(bounces.some(([,other])=>other==='wall'));
 const points=predictTrajectory({body:{...ball,x:50,y:100,vx:600,vy:0},bodies:[{...ball,x:50,y:100,vx:600,vy:0},wall],bounds:{left:0,top:0,right:390,bottom:700},dots:8,bounces:1});
 assert.ok(points.length>=3&&points.length<=8);assert.ok(points.every(point=>Number.isFinite(point.x)&&Number.isFinite(point.y)));
});

test('kinematic wall velocity, rolling rest, and speed-gated cup capture are deterministic',()=>{
 const events=[],ball={id:'ball',mode:'dynamic',shape:'circle',x:60,y:100,vx:20,vy:0,width:20,height:20,restitution:.8,friction:40,linearDamping:0,gravity:0,maxSpeed:900,restSpeed:12,restDelaySeconds:.1,wallBounce:false};
 const gate={id:'gate',mode:'kinematic',shape:'box',x:65,y:100,vx:-100,vy:0,width:10,height:100,restitution:.8};
 stepPhysics({bodies:[ball,gate],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60,onEvent:(kind,source,other)=>events.push([kind,source.id,other?.id])});
 assert.ok(ball.vx<0);assert.ok(events.some(event=>event[0]==='bodyBounce'));
 for(let n=0;n<360;n++)stepPhysics({bodies:[ball],bounds:{left:-1000,top:-1000,right:1000,bottom:1000},dt:1/60,onEvent:(kind,source)=>events.push([kind,source.id])});
 assert.ok(events.some(event=>event[0]==='bodyRest'));assert.equal(ball.atRest,true);
 const cup={id:'cup',x:120,y:100,radius:18,maxCaptureSpeed:100,pullStrength:0,stopBody:true},fast={...ball,id:'fast',x:100,y:100,vx:200,vy:0,atRest:false,captured:false};
 stepPhysics({bodies:[fast],zones:[cup],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60});assert.equal(fast.captured,false);
 const slow={...fast,id:'slow',vx:60};stepPhysics({bodies:[slow],zones:[cup],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60,onEvent:(kind,source,other)=>events.push([kind,source.id,other.id])});
 assert.equal(slow.captured,true);assert.equal(slow.x,120);assert.ok(events.some(event=>event[0]==='zoneCapture'&&event[1]==='slow'));
});

test('aim-launch captures pullback input, updates power, launches once, and supports position/stop actions',()=>{
 const h=harness([...base,component('ball',{transform:[1,0,0,1,90,340]}),behavior('ball.body','ball','physics-body',bodyParameters),behavior('ball.aim','ball','aim-launch',{...aimParameters,powerVariableId:'power'}),
  {kind:'putBinding',binding:{id:'launched',event:{kind:'launch',componentId:'ball'},actions:[{kind:'add',variableId:'score',value:1}]}},
  {kind:'createComponent',component:{id:'reset',contract:'native.button.v1',transform:[1,0,0,1,250,550],parameters:{width:100,height:80}}},
  {kind:'putBinding',binding:{id:'reset.ball',event:{kind:'click',componentId:'reset'},actions:[{kind:'setPosition',componentId:'ball',x:200,y:200},{kind:'stopBody',componentId:'ball'}]}}]);
 try{
  h.advance(.02);h.event('pointerdown',100,350);h.event('pointermove',30,390);const aiming=h.runtime.state();
  assert.equal(aiming.physics.aiming.componentId,'ball');assert.ok(aiming.variables.power>0&&aiming.variables.power<1);
  h.event('pointerup',30,390);let state=h.runtime.state();assert.equal(state.variables.score,1);assert.equal(state.variables.power,0);assert.ok(state.physics.bodies.find(body=>body.id==='ball').vx>0);
  h.advance(.02);h.event('pointerdown',300,590);h.event('pointerup',300,590);state=h.runtime.state();const ball=state.physics.bodies.find(body=>body.id==='ball');assert.equal(ball.x,200);assert.equal(ball.y,200);assert.equal(ball.vx,0);assert.equal(ball.atRest,true);assert.deepEqual(state.diagnostics,[]);
 }finally{h.close();}
});

test('oscillating gates and physics events compose with declarative bindings and reset cleanly',()=>{
 const h=harness([...base,component('ball',{transform:[1,0,0,1,30,340]}),behavior('ball.body','ball','physics-body',{...bodyParameters,wallBounce:false}),
  {kind:'createComponent',component:{id:'gate',contract:'native.rectangle.v1',transform:[1,0,0,1,145,300],parameters:{width:12,height:100}}},behavior('gate.body','gate','physics-body',{...bodyParameters,mode:'kinematic',shape:'box'}),behavior('gate.oscillate','gate','oscillate',{axis:'x',amplitude:20,periodSeconds:2,phase:0}),
  {kind:'putBinding',binding:{id:'shoot',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'setVelocity',componentId:'ball',vx:600,vy:0}]}},
  {kind:'putBinding',binding:{id:'bank',event:{kind:'bodyBounce',componentId:'ball',otherId:'gate'},actions:[{kind:'add',variableId:'score',value:1}]}}]);
 try{h.advance(.6);const state=h.runtime.state();assert.ok(state.variables.score>=1);assert.ok(state.physics.bodies.find(body=>body.id==='ball').vx<0);h.runtime.restart();assert.equal(h.runtime.state().variables.score,0);assert.equal(h.runtime.state().physics.aiming,null);}finally{h.close();}
});

test('physics semantic validation rejects motion conflicts and invalid aim relationships',()=>{
 assert.throws(()=>applyOperations(emptyProject({id:'invalid-physics',name:'Invalid physics'}),[component('ball'),behavior('ball.body','ball','physics-body',bodyParameters),behavior('ball.motion','ball','motion',{vx:0,vy:0,gravity:0})]),/E_NATIVE_PHYSICS/);
 assert.throws(()=>applyOperations(emptyProject({id:'invalid-aim',name:'Invalid aim'}),[component('ball'),behavior('ball.aim','ball','aim-launch',aimParameters)]),/E_NATIVE_PHYSICS/);
});

test('dynamic box bodies collide symmetrically with circles and boxes, respect maxSpeed clamping, and clear aim on pause',()=>{
 const box={id:'box',mode:'dynamic',shape:'box',x:40,y:100,vx:1500,vy:0,width:24,height:24,restitution:.85,friction:0,linearDamping:0,gravity:0,maxSpeed:500,restSpeed:1,restDelaySeconds:.1,wallBounce:false};
 const peg={id:'peg',mode:'static',shape:'circle',x:90,y:100,vx:0,vy:0,width:24,height:24,restitution:.85};
 const wall={id:'wall',mode:'static',shape:'box',x:10,y:100,vx:0,vy:0,width:12,height:100,angle:0,restitution:.85};
 const hits=[];
 for(let n=0;n<30;n++)stepPhysics({bodies:[box,peg,wall],bounds:{left:0,top:0,right:390,bottom:700},dt:1/60,onEvent:(kind,source,other)=>{if(kind==='bodyBounce')hits.push([source.id,other?.id]);}});
 assert.ok(Math.hypot(box.vx,box.vy)<=500.01);
 assert.ok(hits.some(([,other])=>other==='peg'));
 assert.ok(hits.some(([,other])=>other==='wall'));
 const h=harness([...base,component('ball',{transform:[1,0,0,1,90,340]}),behavior('ball.body','ball','physics-body',bodyParameters),behavior('ball.aim','ball','aim-launch',{...aimParameters,powerVariableId:'power'})]);
 try{
  h.advance(.02);h.event('pointerdown',100,350);h.event('pointermove',30,390);
  assert.ok(h.runtime.state().physics.aiming);assert.ok(h.runtime.state().variables.power>0);
  h.runtime.pause(true);
  assert.equal(h.runtime.state().physics.aiming,null);assert.equal(h.runtime.state().variables.power,0);
 }finally{h.close();}
});


test('3D physics simulates bank walls, moving gates, uphill ramp launch, cup capture, and trajectory prediction',()=>{
 const bankWalls=[{id:'bank',x:0,z:.25,hx:.9,hz:.13,angle:-.36,vx:0,vz:0}];
 const cup=[{id:'cup',x:1.45,y:0,z:-4.8,radius:.34,heightTolerance:.24,maxCaptureSpeed:4.5}];
 const b1={id:'ball',mode:'dynamic',radius:.11,friction:1.05,restitution:.72,maxSpeed:9,restSpeed:.07,restDelaySeconds:.25,boundsX:3,boundsZ:7,ramp:false,rampHeight:1.1,x:-1.7,y:.11,z:4.7,vx:2.7,vy:0,vz:-4.2,atRest:false,captured:false,airborne:false,lastSafe:{x:-1.7,y:.11,z:4.7}};
 const dots=predictTrajectory3d({body:b1,walls:bankWalls,zones:cup,vx:2.7,vz:-4.2,dots:12});
 assert.ok(dots.length>=6&&dots.every(pt=>Number.isFinite(pt.x)&&Number.isFinite(pt.y)&&Number.isFinite(pt.z)));
 let bounced=false,captured=false;
 for(let n=0;n<600&&!b1.captured&&!b1.atRest;n++)stepPhysics3d({bodies:[b1],walls:bankWalls,zones:cup,dt:1/60,onEvent:kind=>{if(kind==='bodyBounce')bounced=true;if(kind==='zoneCapture')captured=true;}});
 assert.equal(bounced,true);assert.equal(captured,true);assert.equal(b1.captured,true);
 // Uphill ramp launch on Hole 3 elevates ball from y=0.11 onto y=1.21 upper green and captures cup
 assert.equal(ground3d({ramp:true,rampHeight:1.1,boundsX:3,boundsZ:7},0,2),0);
 assert.equal(ground3d({ramp:true,rampHeight:1.1,boundsX:3,boundsZ:7},0,0),.55);
 assert.equal(ground3d({ramp:true,rampHeight:1.1,boundsX:3,boundsZ:7},0,-2),1.1);
 const b3={id:'ball',mode:'dynamic',radius:.11,friction:1.05,restitution:.72,maxSpeed:9,restSpeed:.07,restDelaySeconds:.25,boundsX:3,boundsZ:7,ramp:true,rampHeight:1.1,x:0,y:.11,z:4.8,vx:0,vy:0,vz:-6.5,atRest:false,captured:false,airborne:false,lastSafe:{x:0,y:.11,z:4.8}};
 let jumped=false;
 for(let n=0;n<600&&!b3.captured&&!b3.atRest;n++)stepPhysics3d({bodies:[b3],walls:[],zones:[{id:'cup',x:0,y:1.1,z:-4.8,radius:.34,heightTolerance:.24,maxCaptureSpeed:4.5}],dt:1/60,onEvent:kind=>{if(kind==='bodyJump')jumped=true;}});
 assert.equal(jumped,true);assert.equal(b3.captured,true);assert.ok(b3.y>1.0);
});

test('compressed MP3 and binary TORA3DM1 mesh validators accept valid assets and reject corrupt bytes',async()=>{
 const {assets}=await createGolfProof();
 const mesh=assets.find(a=>a.mime==='model/tora-mesh');
 const mp3=assets.find(a=>a.mime==='audio/mpeg');
 assert.ok(mesh&&mp3);
 const meshBytes=Buffer.from(mesh.data,'base64');
 const mp3Bytes=Buffer.from(mp3.data,'base64');
 assert.doesNotThrow(()=>validateToraMesh(new Uint8Array(meshBytes)));
 assert.throws(()=>validateToraMesh(new Uint8Array([1,2,3,4,5,6,7,8])),/E_NATIVE_MESH_MALFORMED/);
 assert.doesNotThrow(()=>validateMp3(new Uint8Array(mp3Bytes)));
 assert.throws(()=>validateMp3(new Uint8Array([0,1,2,3,4,5])),/E_AUDIO_MP3_MALFORMED/);
 const analysis=await analyzeAudio(new Uint8Array(mp3Bytes),'audio/mpeg');
 assert.ok(analysis.durationSec>0&&Number.isFinite(analysis.peakDbfs));
});

test('3D mini golf exports both targets, passes Creative QA, and plays all 3 holes to win',async()=>{
 const {project,assets}=await createGolfProof(),output='reports/native-primitives/golf';await mkdir(output,{recursive:true});
 assert.ok(project.components.some(c=>c.contract==='native.stage3d.v1'),'must author native.stage3d.v1');
 assert.ok(project.components.some(c=>c.contract==='native.mesh3d.v1'),'must author native.mesh3d.v1');
 assert.ok(project.assets.filter(a=>a.mime.startsWith('audio/')).every(a=>a.mime==='audio/mpeg'),'all golf audio must be compressed MP3');
 for(const target of ['standalone-browser-draft','unity-ads-ua-playable']){const artifact=await compileNative(project,{assets,target});assert.ok(artifact.manifest.bytes<1_200_000,`expected 3D HTML <1.2MB, got ${artifact.manifest.bytes}`);await writeFile(`${output}/${target==='standalone-browser-draft'?'standalone':'index'}.html`,artifact.html);if(target==='unity-ads-ua-playable')assert.equal(artifact.manifest.status,'ASSEMBLED_UNVERIFIED');}
 const browser=await chromium.launch({headless:true}),errors=[];
 try{
  const qa=await runCreativeQa({htmlPath:`${output}/standalone.html`,outputDir:`${output}/qa`,browser});assert.equal(qa.ok,true,JSON.stringify(qa.blockers));
  const page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',error=>errors.push(error.message));await page.goto(`file://${process.cwd()}/${output}/standalone.html`);await page.waitForFunction(()=>globalThis.toraRuntime);
  // Verify immediate non-black sunlit 3D frame on load (never starts blacked out)
  const initialGreen=await page.evaluate(()=>{const c=globalThis.document.querySelector('canvas'),ctx=c.getContext('2d');return Math.max(...[[.5,.56],[.42,.62],[.58,.62]].map(([fx,fy])=>ctx.getImageData(Math.round(c.width*fx),Math.round(c.height*fy),1,1).data[1]));});
  assert.ok(initialGreen>90,`Expected bright sunlit fairway on load, got green=${initialGreen}`);
  // Wait for camera intro ease (1.5s) to settle so screen-to-world projection matches exact steady camera
  await page.waitForTimeout(1600);
  await page.screenshot({path:`${output}/opening.png`});
  // Hole 1: pull down-left from center to bank off right rail into cup (2.7, -4.2)
  await page.mouse.move(200,422);await page.mouse.down();await page.mouse.move(146,441,{steps:5});await page.waitForTimeout(120);await page.screenshot({path:`${output}/aiming.png`});await page.mouse.up();
  await page.waitForTimeout(150);
  const hole1Audio=await page.evaluate(()=>globalThis.toraRuntime.state().audio);
  assert.equal(hole1Audio.state,'running','AudioContext must start running on Hole 1');
  assert.ok(hole1Audio.voices>=1,`Expected background music active on Hole 1, got ${JSON.stringify(hole1Audio)}`);
  await page.waitForFunction(()=>globalThis.toraRuntime.state().scene==='scene.hole2',undefined,{timeout:14000});
  await page.waitForTimeout(300);await page.screenshot({path:`${output}/hole2.png`});
  // Hole 2: shoot as the oscillating 3D gate approaches center moving right so it is wide open (~1.0s later) when the ball crosses z=0
  await page.waitForFunction(()=>{const b=globalThis.toraRuntime.state().physics3d.bodies.find(item=>item.id==='h2.gate');return b&&b.x>-.55&&b.x<-.1&&b.vx>0;},undefined,{timeout:6000});
  await page.mouse.move(200,422);await page.mouse.down();await page.mouse.move(175,456,{steps:5});await page.mouse.up();
  await page.waitForFunction(()=>globalThis.toraRuntime.state().scene==='scene.hole3',undefined,{timeout:14000});
  await page.waitForTimeout(300);await page.screenshot({path:`${output}/hole3.png`});
  // Hole 3: launch up the 3D uphill ramp onto elevated upper green (0, -6.5) into cup!
  await page.waitForTimeout(150);
  await page.mouse.move(200,422);await page.mouse.down();await page.mouse.move(166,468,{steps:5});await page.mouse.up();
  await page.waitForFunction(()=>globalThis.toraRuntime.state().scene==='scene.win',undefined,{timeout:14000});
  await page.waitForTimeout(600);await page.screenshot({path:`${output}/end-card.png`});
  assert.equal(await page.evaluate(()=>globalThis.toraRuntime.state().variables.strokes),3);
  assert.deepEqual(await page.evaluate(()=>globalThis.toraRuntime.state().diagnostics),[]);await page.close();
 }finally{await browser.close();}
 assert.deepEqual(errors,[]);
});


test('generic primitive review exposes all moments and scoped CTA operations',async()=>{
 const {project}=await createGolfProof(),metadata=reviewTargets(project);
 assert.deepEqual(metadata.moments.map(moment=>moment.id),['opening','first-input','end-card','timeout']);
 const resolution=resolveProjectRoles(createProjectIndex(project));assert.equal(resolution.status,'resolved');assert.equal(resolution.roles.primaryCta.labelId,'scene.win.cta.label');
 assert.equal(metadata.targets[0].id,'cta');
 const changed=reviewOperations(project,'cta',['text'],{text:'Tee off'});
 assert.equal(changed.expected.components.find(component=>component.id==='scene.win.cta.label').parameters.text,'Tee off');
 assert.deepEqual(changed.operations,[{kind:'setParameter',id:'scene.win.cta.label',key:'text',value:'Tee off'}]);
 assert.throws(()=>reviewOperations(project,'h2.gate.osc',['text'],{text:'No'}),/E_REVIEW_SCOPE/);
});
