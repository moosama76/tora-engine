import test from 'node:test';
import assert from 'node:assert/strict';
import {mountNative} from '../../scripts/lean/native/runtime.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {createDropOccupancy,resolveDropZone,classifySwipe} from '../../scripts/lean/native/interaction-gestures.mjs';

function harness(operations){
 const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};let callback;
 set('requestAnimationFrame',fn=>{callback=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){}});set('devicePixelRatio',1);
 const listeners=new Map(),ctx=new Proxy({globalAlpha:1,measureText:text=>({width:String(text).length*10})},{get:(o,k)=>k in o?o[k]:()=>{}}),canvas={clientWidth:390,clientHeight:700,getContext:()=>ctx,addEventListener(type,listener){listeners.set(type,listener);},removeEventListener(type){listeners.delete(type);},setPointerCapture(){},getBoundingClientRect(){return {left:0,top:0,width:390,height:700};}};
 const {project}=applyOperations(emptyProject({id:'drag-gestures',name:'Drag gestures'}),operations),runtime=mountNative(project,canvas);let now=100;
 return {runtime,advance(seconds){for(let n=0;n<Math.ceil(seconds*60);n++){now+=1000/60;callback(now);}},event(type,x,y,pointerId=1){listeners.get(type)?.({clientX:x,clientY:y,pointerId,isTrusted:true});},close(){runtime.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}};
}
const rect=(id,x=0,y=0,extra={})=>({kind:'createComponent',component:{id,contract:'native.rectangle.v1',transform:[1,0,0,1,x,y],parameters:{width:60,height:60},...extra}});
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
const binding=(id,event,actions)=>({kind:'putBinding',binding:{id,event,actions}});
const drag=(id,tag='crop')=>behavior(id+'.drag',id,'drag',{axis:'both',snapBack:true,snapBackSeconds:.1,bringToFront:true,tag});
const zone=(id,onOccupied='reject',capacity=1)=>behavior(id+'.zone',id,'drop-zone',{acceptTags:[],snapMode:'center',capacity,onOccupied,radiusPx:0,highlightColor:'#ffffff'});
const base=[{kind:'createComponent',component:{id:'controller',contract:'native.group.v1'}},{kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}},{kind:'putVariable',variable:{id:'charge',label:'Charge',type:'number',initial:0}}];

test('drop candidates prioritize item targets and swipe classification is deterministic',()=>{
 const occupancy=createDropOccupancy();occupancy.place('old','slot');
 const result=resolveDropZone({itemId:'new',tag:'crop',occupancy,zones:[{id:'slot',itemTarget:false,paintOrder:1,distance:1,capacity:1,onOccupied:'swap',acceptTags:[]},{id:'crop-a',itemTarget:true,paintOrder:0,distance:20,capacity:0,onOccupied:'reject',acceptTags:['crop']}]});
 assert.equal(result.zone.id,'crop-a');assert.equal(result.kind,'accept');
 assert.equal(classifySwipe({x:0,y:0},{x:60,y:4}), 'right');assert.equal(classifySwipe({x:0,y:0},{x:0,y:60},28,0,40,80),null);
});

test('item-on-item drop merges once at the midpoint and restart reproduces the result',()=>{
 const crop=rect('crop',0,0,{prototype:true}),upgraded=rect('upgraded',0,0,{prototype:true});
 const h=harness([...base,rect('slot',40,40),zone('slot','reject',0),crop,upgraded,drag('crop'),zone('crop','emit'),binding('spawn',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'spawn',prototypeId:'crop',x:50,y:50},{kind:'spawn',prototypeId:'crop',x:220,y:50}]),binding('merge',{kind:'dragDrop',componentId:'crop',otherId:'crop'},[{kind:'add',variableId:'score',value:1},{kind:'spawnAt',prototypeId:'upgraded',targetComponentId:'crop',offsetX:0,offsetY:0,at:'midpoint'},{kind:'despawn',target:'both'}])]);
 try{
  h.advance(.03);assert.equal(h.runtime.state().instances.length,2);
  h.event('pointerdown',250,80);h.event('pointermove',80,80);h.event('pointerup',80,80);
  let state=h.runtime.state();assert.equal(state.variables.score,1);assert.equal(state.instances.length,1);assert.equal(state.instances[0].prototypeId,'upgraded');assert.equal(state.instances[0].x,50);assert.equal(state.instances[0].y,50);assert.equal(state.input.occupancy.itemZone['instance.1'],undefined);assert.equal(state.input.occupancy.itemZone['instance.2'],undefined);assert.equal(state.input.occupancy.itemZone['instance.3'],'slot');
  h.runtime.restart();h.advance(.03);h.event('pointerdown',250,80);h.event('pointermove',80,80);h.event('pointerup',80,80);state=h.runtime.state();assert.equal(state.variables.score,1);assert.equal(state.instances[0].id,'instance.3');assert.deepEqual(state.diagnostics,[]);
 }finally{h.close();}
});

test('occupied slots swap both positions and occupancy records',()=>{
 const ops=[...base,rect('slot-a',40,40),rect('slot-b',240,40),rect('item-a',50,50,{order:1}),rect('item-b',250,50,{order:1}),zone('slot-a','swap'),zone('slot-b','swap'),drag('item-a'),drag('item-b'),binding('dropped',{kind:'dragDrop',componentId:'item-a',otherId:'slot-b'},[{kind:'add',variableId:'score',value:1}])];
 const h=harness(ops);try{
  h.advance(.03);assert.equal(h.runtime.state().input.occupancy.itemZone['item-a'],'slot-a');assert.equal(h.runtime.state().input.occupancy.itemZone['item-b'],'slot-b');
  h.event('pointerdown',80,80);h.event('pointermove',270,80);h.event('pointerup',270,80);h.advance(.2);
  const state=h.runtime.state();assert.equal(state.variables.score,1);assert.equal(state.components['item-a'].transform[4],240);assert.equal(state.components['item-b'].transform[4],50);assert.equal(state.input.occupancy.itemZone['item-a'],'slot-b');assert.equal(state.input.occupancy.itemZone['item-b'],'slot-a');
 }finally{h.close();}
});

test('occupied emit leaves the drop in place, reject snaps back, and hiding releases occupancy',()=>{
 for(const mode of ['emit','reject']){
  const actions=mode==='emit'?[{kind:'add',variableId:'score',value:1},{kind:'setComponent',componentId:'item-a',key:'visible',value:false}]:[{kind:'add',variableId:'score',value:1}];
  const eventKind=mode==='emit'?'dragDrop':'dragReject',h=harness([...base,rect('slot',240,40),rect('item-a',50,50),rect('item-b',250,50),zone('slot',mode),drag('item-a'),drag('item-b'),binding('resolved',{kind:eventKind,componentId:'item-a',otherId:'slot'},actions)]);
  try{
   h.event('pointerdown',80,80);h.event('pointermove',270,80);h.event('pointerup',270,80);h.advance(.2);const state=h.runtime.state();
   assert.equal(state.variables.score,1);assert.equal(state.input.occupancy.itemZone['item-a'],undefined);
   if(mode==='emit'){assert.equal(state.components['item-a'].transform[4],240);assert.equal(state.components['item-a'].parameters.visible,false);}else assert.equal(state.components['item-a'].transform[4],50);
  }finally{h.close();}
 }
});

test('same-prototype contact and dual despawn score once, and contactEnd fires after separation',()=>{
 const proto=rect('same',0,0,{prototype:true}),h=harness([...base,proto,behavior('same.collider','same','collider',{shape:'box'}),binding('spawn',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'spawn',prototypeId:'same',x:0,y:0},{kind:'spawn',prototypeId:'same',x:0,y:0}]),binding('hit',{kind:'contactBegin',componentId:'same',otherId:'same'},[{kind:'add',variableId:'score',value:1},{kind:'despawn',target:'both'}])]);
 try{h.advance(.05);assert.equal(h.runtime.state().variables.score,1);assert.equal(h.runtime.state().instances.length,0);}finally{h.close();}
 const end=harness([...base,rect('moving',0,0,{order:1}),rect('static'),drag('moving'),behavior('moving.collider','moving','collider',{shape:'box'}),behavior('static.collider','static','collider',{shape:'box'}),binding('begin',{kind:'contactBegin',componentId:'moving',otherId:'static'},[{kind:'add',variableId:'score',value:1}]),binding('end',{kind:'contactEnd',componentId:'moving',otherId:'static'},[{kind:'add',variableId:'score',value:2}])]);
 try{end.advance(.03);end.event('pointerdown',30,30);end.event('pointermove',250,30);end.event('pointerup',250,30);end.advance(.03);assert.equal(end.runtime.state().variables.score,3);}finally{end.close();}
});

test('swipe, pointerUp, and hold-charge execute real pointer sequences and reset cleanly',()=>{
 const h=harness([...base,behavior('controller.swipe','controller','swipe-input',{dragMode:'anywhere',minDistancePx:28,cooldownMs:80}),behavior('controller.hold','controller','hold-charge',{dragMode:'anywhere',variableId:'charge',ratePerSecond:10,min:0,max:1,pingPong:false,resetOnRelease:true}),binding('swiped',{kind:'swipe',componentId:'controller',direction:'right'},[{kind:'add',variableId:'score',value:4}]),binding('started',{kind:'holdStart',componentId:'controller'},[{kind:'add',variableId:'score',value:1}]),binding('released',{kind:'holdRelease',componentId:'controller'},[{kind:'add',variableId:'score',value:2}]),binding('up',{kind:'pointerUp',componentId:'controller'},[{kind:'add',variableId:'score',value:8}])]);
 try{
  h.event('pointerdown',10,200);h.advance(.1);assert.ok(h.runtime.state().variables.charge>.4,JSON.stringify(h.runtime.state()));h.event('pointermove',70,200);h.event('pointerup',70,200);assert.equal(h.runtime.state().variables.score,15);assert.equal(h.runtime.state().variables.charge,0);
  h.runtime.restart();assert.equal(h.runtime.state().variables.score,0);assert.equal(h.runtime.state().variables.charge,0);assert.equal(h.runtime.state().input.holding,false);assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('hold-charge requires a numeric variable and an increasing range',()=>{
 assert.throws(()=>applyOperations(emptyProject({id:'bad-hold',name:'Bad hold'}),[...base,behavior('controller.hold','controller','hold-charge',{dragMode:'anywhere',variableId:'missing',ratePerSecond:1,min:0,max:1})]),/E_NATIVE_REFERENCE/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-range',name:'Bad range'}),[...base,behavior('controller.hold','controller','hold-charge',{dragMode:'anywhere',variableId:'charge',ratePerSecond:1,min:1,max:0})]),/E_NATIVE_REFERENCE/);
});

test('snapMode reject, outside-zone drops, pause, and moveToComponent preserve occupancy and targeting',()=>{
 const occupancy=createDropOccupancy();
 const rejected=resolveDropZone({itemId:'a',tag:'crop',occupancy,zones:[{id:'slot',itemTarget:false,paintOrder:1,distance:1,capacity:1,snapMode:'reject',onOccupied:'swap',acceptTags:[]}]});
 assert.equal(rejected.kind,'reject');
 const h=harness([...base,rect('slot-a',40,40),rect('dest',260,300),rect('item-a',50,50,{order:1}),zone('slot-a','swap'),drag('item-a'),binding('miss',{kind:'dragReject',componentId:'item-a'},[{kind:'add',variableId:'score',value:1}]),binding('move',{kind:'click',componentId:'dest'},[{kind:'moveToComponent',componentId:'item-a',targetComponentId:'dest',seconds:.1,target:'self'}])]);
 try{
  h.advance(.03);assert.equal(h.runtime.state().input.occupancy.itemZone['item-a'],'slot-a');
  h.runtime.pause(true);h.runtime.pause(false);
  assert.equal(h.runtime.state().input.occupancy.itemZone['item-a'],'slot-a');
  h.event('pointerdown',80,80);h.event('pointermove',200,200);h.event('pointerup',200,200);h.advance(.2);
  assert.equal(h.runtime.state().variables.score,1);
  assert.equal(h.runtime.state().input.occupancy.itemZone['item-a'],'slot-a');
  h.event('pointerdown',290,330);h.event('pointerup',290,330);h.advance(.2);
  assert.equal(h.runtime.state().components['item-a'].transform[4],260);
 }finally{h.close();}
});
