import test from 'node:test';
import assert from 'node:assert/strict';
import {mountNative} from '../../scripts/lean/native/runtime.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {createRng,findNearestByTeam} from '../../scripts/lean/native/instance-steering.mjs';
import {limits} from '../../scripts/lean/native/contracts.mjs';

function harness(operations){
 const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};let callback;set('requestAnimationFrame',fn=>{callback=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){}});set('devicePixelRatio',1);
 const listeners=new Map(),ctx=new Proxy({globalAlpha:1,measureText:text=>({width:String(text).length*10})},{get:(o,k)=>k in o?o[k]:()=>{}}),canvas={clientWidth:390,clientHeight:700,getContext:()=>ctx,addEventListener(type,listener){listeners.set(type,listener);},removeEventListener(type){listeners.delete(type);},setPointerCapture(){},getBoundingClientRect(){return {left:0,top:0,width:390,height:700};}};
 const {project}=applyOperations(emptyProject({id:'instance-targeting',name:'Instance targeting'}),operations),runtime=mountNative(project,canvas);let now=100;
 return {runtime,advance(seconds){for(let n=0;n<Math.ceil(seconds*60);n++){now+=1000/60;callback(now);}},event(type,x,y,pointerId=1){listeners.get(type)?.({clientX:x,clientY:y,pointerId,isTrusted:true});},close(){runtime.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}};
}
const component=(id,extra={})=>({kind:'createComponent',component:{id,contract:'native.group.v1',parameters:{width:40,height:40},...extra}});
const rect=(id,extra={})=>({kind:'createComponent',component:{id,contract:'native.rectangle.v1',parameters:{width:40,height:40},...extra}});
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
const binding=(id,event,actions,condition)=>({kind:'putBinding',binding:{id,event,actions,...(condition?{condition}:{})}});
const variable=(id,initial=0)=>({kind:'putVariable',variable:{id,label:id,type:'number',initial}});
const body={mode:'dynamic',shape:'circle',restitution:.8,friction:0,linearDamping:0,gravity:0,maxSpeed:1000,restSpeed:1,restDelaySeconds:.1,wallBounce:false,spinToRotation:false};
const state=(id,team='enemy',hp=3)=>behavior(id+'.state',id,'instance-state',{hp,maxHp:hp,value:0,tag:id,team});

test('seeded random and nearest-team search are deterministic',()=>{
 const a=createRng(42),b=createRng(42);assert.deepEqual(Array.from({length:8},()=>a.next()),Array.from({length:8},()=>b.next()));a.reset();b.reset();assert.equal(a.next(),b.next());
 const nearest=findNearestByTeam({x:0,y:0},[{id:'b',x:10,y:0,team:'enemy'},{id:'a',x:10,y:0,team:'enemy'},{id:'c',x:1,y:0,team:'player'}],'enemy');assert.equal(nearest.id,'a');
 assert.equal(limits.variables,128);assert.equal(limits.components,512);assert.equal(limits.gameplay+limits.eventBindings,1024);
});

test('multi-hit enemy HP, child meter, depletion, and symmetric bullet cleanup do not double-hit',()=>{
 const enemy=component('enemy',{prototype:true}),hp=rect('enemy.hp',{parentId:'enemy',parameters:{width:40,height:6}}),bullet=rect('bullet',{prototype:true});
 const ops=[variable('score'),enemy,hp,bullet,state('enemy','enemy',3),behavior('enemy.meter','enemy.hp','value-meter',{instanceField:'hp',min:0,max:1,axis:'x',direction:'positive',smoothingSeconds:0}),behavior('enemy.collider','enemy','collider',{shape:'circle'}),behavior('bullet.collider','bullet','collider',{shape:'circle'}),
  binding('spawn',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'spawn',prototypeId:'enemy',x:100,y:100},{kind:'spawn',prototypeId:'bullet',x:100,y:100},{kind:'spawn',prototypeId:'bullet',x:100,y:100},{kind:'spawn',prototypeId:'bullet',x:100,y:100}]),
  binding('damage',{kind:'contactBegin',componentId:'bullet',otherId:'enemy'},[{kind:'modifyInstanceState',target:'other',componentId:'enemy',field:'hp',op:'sub',value:1},{kind:'despawn',target:'self'}],{instanceTarget:'other',instanceField:'hp',op:'gt',value:0}),
  binding('depleted',{kind:'instanceDepleted',componentId:'enemy'},[{kind:'add',variableId:'score',value:1}])];
 const h=harness(ops);try{h.advance(.1);const result=h.runtime.state(),instance=result.instances.find(item=>item.prototypeId==='enemy');assert.equal(result.variables.score,1);assert.equal(result.instances.length,1);assert.equal(instance.hp,0);assert.equal(instance.maxHp,3);assert.equal(result.components['instance.1:enemy.hp'].transform[0],0);assert.deepEqual(result.diagnostics,[]);}finally{h.close();}
});

test('random, bulk count and jitter reproduce exactly across restart',()=>{
 const ops=[variable('roll'),component('spawner',{transform:[1,0,0,1,175,300]}),component('particle',{prototype:true}),binding('spawn',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'random',variableId:'roll',min:1,max:5,integer:true},{kind:'spawnAt',prototypeId:'particle',targetComponentId:'spawner',offsetX:0,offsetY:0,count:4,jitterX:30,jitterY:20}])],h=harness(ops);
 try{h.advance(.03);const first=h.runtime.state();h.runtime.restart();h.advance(.03);const second=h.runtime.state();assert.equal(second.variables.roll,first.variables.roll);assert.deepEqual(second.instances.map(i=>[i.id,i.x,i.y]),first.instances.map(i=>[i.id,i.x,i.y]));assert.equal(second.instances.length,4);assert.ok(second.instances.every(i=>Math.abs(i.x-175)<=30&&Math.abs(i.y-300)<=20));}finally{h.close();}
});

test('steer chases and flees nearest team while launchToward aims at team and pointer',()=>{
 const enemy=component('enemy',{transform:[1,0,0,1,220,180]}),chaser=component('chaser',{transform:[1,0,0,1,20,180]}),flee=component('flee',{transform:[1,0,0,1,100,300]}),turret=rect('turret',{transform:[1,0,0,1,20,500]}),button=rect('button',{transform:[1,0,0,1,300,550],parameters:{width:70,height:70}});
 const steer=(id,mode)=>behavior(id+'.steer',id,'steer',{mode,targetMode:'nearest-team',team:'enemy',speed:100,turnRateDegPerSec:1440,maxRangePx:0,orientToVelocity:true});
 const h=harness([variable('shots'),enemy,chaser,flee,turret,button,state('enemy'),steer('chaser','chase'),steer('flee','flee'),behavior('turret.body','turret','physics-body',body),binding('launch',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'launchToward',componentId:'turret',targetMode:'nearest-team',team:'enemy',speed:100}]),binding('pointer',{kind:'click',componentId:'button'},[{kind:'launchToward',componentId:'turret',targetMode:'pointer',speed:100}])]);
 try{h.advance(.5);let state=h.runtime.state();assert.ok(state.components.chaser.transform[4]>20);assert.ok(state.components.flee.transform[4]<100);assert.ok(state.physics.bodies.find(b=>b.id==='turret').vx>40&&state.physics.bodies.find(b=>b.id==='turret').vy<0,JSON.stringify(state.physics));h.event('pointerdown',335,585);h.event('pointerup',335,585);state=h.runtime.state();assert.ok(state.physics.bodies.find(b=>b.id==='turret').vy>0);assert.deepEqual(state.diagnostics,[]);}finally{h.close();}
});

test('instance conditions and compute unary/clamp forms validate and execute',()=>{
 const enemy=component('enemy',{transform:[1,0,0,1,0,0]}),bullet=rect('bullet',{transform:[1,0,0,1,0,0]}),h=harness([variable('score',5),variable('damage',1.7),enemy,bullet,state('enemy','enemy',2),behavior('enemy.collider','enemy','collider',{shape:'box'}),behavior('bullet.collider','bullet','collider',{shape:'box'}),binding('hit',{kind:'contactBegin',componentId:'bullet',otherId:'enemy'},[{kind:'compute',variableId:'damage',op:'floor'},{kind:'modifyInstanceState',target:'other',componentId:'enemy',field:'hp',op:'sub',variableId:'damage'},{kind:'compute',variableId:'score',op:'clamp',min:0,max:2}],{instanceTarget:'other',instanceField:'hp',op:'gt',value:1}),binding('gone',{kind:'instanceDepleted',componentId:'enemy'},[{kind:'setComponent',componentId:'enemy',key:'visible',value:false}])]);
 try{h.advance(.05);const state=h.runtime.state();assert.equal(state.instances.length,0);assert.equal(state.components.enemy,undefined);assert.equal(state.variables.damage,1);assert.equal(state.variables.score,2);assert.deepEqual(state.diagnostics,[]);}finally{h.close();}
});

test('seeded integer RNG includes upper bound and operand exclusivity is enforced',()=>{
 const rng=createRng(7),seen=new Set(Array.from({length:120},()=>rng.between(1,3,true)));
 assert.deepEqual([...seen].sort(),[1,2,3]);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-steer',name:'Bad steer'}),[component('a'),behavior('a.steer','a','steer',{mode:'chase',targetMode:'component',speed:100,turnRateDegPerSec:360,maxRangePx:0})]),/E_NATIVE_REFERENCE/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-launch',name:'Bad launch'}),[rect('a'),behavior('a.body','a','physics-body',body),binding('bad',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'launchToward',componentId:'a',targetMode:'angle-variable',angleVariableId:'missing',speed:1}])]),/E_NATIVE_PHYSICS/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-vel',name:'Bad vel'}),[variable('vx',10),rect('a'),behavior('a.body','a','physics-body',body),binding('bad',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'setVelocity',componentId:'a',vx:10,vxVariableId:'vx',vy:0}])]),/E_NATIVE_ACTION/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-mod',name:'Bad mod'}),[rect('a'),state('a'),binding('bad',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'modifyInstanceState',target:'component',componentId:'a',field:'hp',op:'sub'}])]),/E_NATIVE_ACTION/);
});
