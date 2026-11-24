import test from 'node:test';
import assert from 'node:assert/strict';
import {mountNative,layoutStandardText} from '../../scripts/lean/native/runtime.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
function harness(operations,{edit=false,audioContext,baseSize,globals={},contextMethods={}}={}){const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};let callback;set('requestAnimationFrame',fn=>{callback=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){}});set('devicePixelRatio',1);if(audioContext)set('AudioContext',audioContext);for(const [key,value]of Object.entries(globals))set(key,value);const listeners=new Map(),ctx=new Proxy({globalAlpha:1,...contextMethods},{get:(o,k)=>k in o?o[k]:()=>{}}),canvas={clientWidth:390,clientHeight:700,getContext:()=>ctx,addEventListener(type,listener){listeners.set(type,listener);},removeEventListener(type){listeners.delete(type);},setPointerCapture(){},getBoundingClientRect(){return {left:0,top:0,width:this.clientWidth,height:this.clientHeight};}};const p=applyOperations(emptyProject({id:'runtime-test',name:'Runtime'}),operations).project;if(baseSize)Object.assign(p.base,baseSize);const runtime=mountNative(p,canvas,{edit});let now=100;const advance=(seconds,step=1000/60)=>{for(let t=0;t<seconds*1000;t+=step){now+=step;callback(now);}};const event=(type,x,y,pointerId=1,isTrusted=true)=>listeners.get(type)?.({clientX:x,clientY:y,pointerId,isTrusted});return {runtime,advance,event,resize(width,height){canvas.clientWidth=width;canvas.clientHeight=height;},close(){runtime.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}};}
const base=[{kind:'createComponent',component:{id:'controller',contract:'native.group.v1'}},{kind:'putVariable',variable:{id:'score',label:'Score',type:'number',initial:0}}];
test('edit mode and inactive scene inspection never run scene entry or timers',()=>{const h=harness([...base,{kind:'createScene',scene:{id:'scene.end',label:'End',role:'end-card'}},{kind:'putBehavior',behavior:{id:'timer',componentId:'controller',kind:'timer',parameters:{seconds:.1,repeat:true}}},{kind:'putBinding',binding:{id:'enter',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'add',variableId:'score',value:1}]}},{kind:'putBinding',binding:{id:'timer.binding',event:{kind:'timer',behaviorId:'timer'},actions:[{kind:'add',variableId:'score',value:10}]}}],{edit:true});try{h.advance(5);h.runtime.inspectScene('scene.end');h.advance(5);assert.equal(h.runtime.state().time,0);assert.equal(h.runtime.state().variables.score,0);assert.equal(h.runtime.state().scene,'scene.end');}finally{h.close();}});
test('ordered actions finish before scene transition; entry executes once and replay resets',()=>{const h=harness([...base,{kind:'createScene',scene:{id:'scene.end',label:'End',role:'end-card'}},{kind:'putBinding',binding:{id:'enter',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'set',variableId:'score',value:2},{kind:'changeScene',sceneId:'scene.end'},{kind:'add',variableId:'score',value:3}]}},{kind:'putBinding',binding:{id:'end.enter',event:{kind:'sceneEnter',sceneId:'scene.end'},actions:[{kind:'add',variableId:'score',value:7}]}}]);try{h.advance(1);assert.equal(h.runtime.state().variables.score,12);h.advance(1);assert.equal(h.runtime.state().variables.score,12);h.runtime.restart();assert.equal(h.runtime.state().variables.score,0);h.advance(.1);assert.equal(h.runtime.state().variables.score,12);}finally{h.close();}});
test('fixed-step pause/resume and catch-up cap prevent a suspension jump',()=>{const h=harness(base);try{h.advance(1);const before=h.runtime.state().time;h.runtime.pause(true);h.advance(30,1000);assert.equal(h.runtime.state().time,before);h.runtime.pause(false);h.advance(.1);assert.ok(h.runtime.state().time-before<.11);const t=h.runtime.state().time;h.advance(10,10000);assert.ok(h.runtime.state().time-t<.09);}finally{h.close();}});
test('pathological variable event chains terminate with diagnostics',()=>{const h=harness([...base,{kind:'putBinding',binding:{id:'start',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'add',variableId:'score',value:1}]}},{kind:'putBinding',binding:{id:'loop',event:{kind:'variableChange',variableId:'score'},actions:[{kind:'add',variableId:'score',value:1}]}}]);try{h.advance(.1);assert.ok(h.runtime.state().diagnostics.some(d=>d.includes('budget')));assert.ok(h.runtime.state().variables.score<=257);h.advance(.1);assert.ok(h.runtime.state().variables.score<=257);}finally{h.close();}});
test('contact begins once and prototype child colliders use runtime instances',()=>{const h=harness([...base,{kind:'createComponent',component:{id:'catcher',contract:'native.rectangle.v1',parameters:{width:80,height:80}}},{kind:'createComponent',component:{id:'proto',contract:'native.group.v1',prototype:true,parameters:{width:20,height:20}}},{kind:'createComponent',component:{id:'proto.child',contract:'native.ellipse.v1',parentId:'proto',parameters:{width:20,height:20}}},{kind:'putBehavior',behavior:{id:'catcher.collider',componentId:'catcher',kind:'collider',parameters:{shape:'box'}}},{kind:'putBehavior',behavior:{id:'child.collider',componentId:'proto.child',kind:'collider',parameters:{shape:'circle'}}},{kind:'putBinding',binding:{id:'spawn',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'spawn',prototypeId:'proto',x:0,y:0}]}},{kind:'putBinding',binding:{id:'catch',event:{kind:'contactBegin',componentId:'proto.child',otherId:'catcher'},actions:[{kind:'add',variableId:'score',value:1}]}}]);try{h.advance(1);assert.equal(h.runtime.state().variables.score,1);assert.equal(h.runtime.state().instances.length,1);h.advance(1);assert.equal(h.runtime.state().variables.score,1);assert.equal(h.runtime.state().diagnostics.length,0);}finally{h.close();}});
test('boundary despawn removes an instance, retains its authored prototype, and replays from initial state',()=>{const h=harness([...base,{kind:'createComponent',component:{id:'falling',contract:'native.group.v1',prototype:true,parameters:{width:20,height:20}}},{kind:'putBehavior',behavior:{id:'motion',componentId:'falling',kind:'motion',parameters:{vx:0,vy:100,gravity:0}}},{kind:'putBinding',binding:{id:'spawn',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'spawn',prototypeId:'falling',x:10,y:690}]}},{kind:'putBinding',binding:{id:'exit',event:{kind:'boundaryExit',componentId:'falling'},actions:[{kind:'add',variableId:'score',value:1},{kind:'despawn'}]}}]);try{h.advance(1);assert.equal(h.runtime.state().instances.length,0);assert.equal(h.runtime.state().variables.score,1);h.runtime.restart();assert.equal(h.runtime.state().variables.score,0);h.advance(1);assert.equal(h.runtime.state().variables.score,1);}finally{h.close();}});
test('inherited clipping and visibility also constrain collider contacts',()=>{const ops=visible=>[...base,{kind:'createComponent',component:{id:'clip',contract:'native.group.v1',parameters:{width:20,height:20,clip:true,visible}}},{kind:'createComponent',component:{id:'clipped',contract:'native.rectangle.v1',parentId:'clip',transform:[1,0,0,1,50,50],parameters:{width:10,height:10}}},{kind:'createComponent',component:{id:'other',contract:'native.rectangle.v1',transform:[1,0,0,1,50,50],parameters:{width:10,height:10}}},...['clipped','other'].map(id=>({kind:'putBehavior',behavior:{id:id+'.collider',componentId:id,kind:'collider',parameters:{shape:'box'}}})),{kind:'putBinding',binding:{id:'overlap',event:{kind:'contactBegin',componentId:'clipped',otherId:'other'},actions:[{kind:'add',variableId:'score',value:1}]}}];for(const visible of [true,false]){const h=harness(ops(visible));try{h.advance(.2);assert.equal(h.runtime.state().variables.score,0);}finally{h.close();}}});


const draggable=[...base,{kind:'createComponent',component:{id:'draggable',contract:'native.rectangle.v1',transform:[1,0,0,1,100,100],parameters:{width:80,height:80}}},{kind:'putBehavior',behavior:{id:'draggable.drag',componentId:'draggable',kind:'drag',parameters:{axis:'both'}}}];
test('an unrelated pointer cancellation cannot clear the owned drag',()=>{const h=harness(draggable);try{h.event('pointerdown',120,120,7);assert.equal(h.runtime.state().input.dragging,true);h.event('pointercancel',200,200,8);assert.equal(h.runtime.state().input.dragging,true);assert.equal(h.runtime.state().input.pointerId,7);h.event('pointerdown',120,120,8);assert.equal(h.runtime.state().input.pointerId,7);}finally{h.close();}});
test('despawning the dragged instance clears its drag before later pointer movement',()=>{const h=harness([...base,{kind:'createComponent',component:{id:'proto',contract:'native.group.v1',prototype:true}},{kind:'createComponent',component:{id:'proto.child',contract:'native.rectangle.v1',parentId:'proto',parameters:{width:40,height:40}}},{kind:'putBehavior',behavior:{id:'proto.drag',componentId:'proto',kind:'drag',parameters:{axis:'both'}}},{kind:'putBinding',binding:{id:'spawn',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'spawn',prototypeId:'proto',x:0,y:0}]}},{kind:'putBinding',binding:{id:'remove',event:{kind:'click',componentId:'proto'},actions:[{kind:'despawn'}]}}]);try{h.advance(.02);assert.equal(h.runtime.state().instances.length,1);h.event('pointerdown',20,20,7);assert.equal(h.runtime.state().instances.length,0);assert.equal(h.runtime.state().input.dragging,false);assert.doesNotThrow(()=>h.event('pointermove',60,60,7));}finally{h.close();}});
test('first-interaction feedback plays after an asynchronous audio unlock',async()=>{class Audio{constructor(){this.state='suspended';this.currentTime=0;this.destination={};}resume(){return Promise.resolve().then(()=>{this.state='running';});}suspend(){this.state='suspended';return Promise.resolve();}close(){this.state='closed';return Promise.resolve();}createOscillator(){return {frequency:{},connect(){},start(){},stop(){}};}createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}};}}const h=harness([...base,{kind:'createComponent',component:{id:'button',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}},{kind:'putBehavior',behavior:{id:'button.sound',componentId:'button',kind:'audio',parameters:{loop:false,volume:.1,frequency:660,seconds:.1}}},{kind:'putBinding',binding:{id:'button.feedback',event:{kind:'click',componentId:'button'},actions:[{kind:'playAudio',behaviorId:'button.sound'}]}}],{audioContext:Audio});try{h.event('pointerdown',120,120,1);for(let i=0;i<10&&h.runtime.state().audio.voices===0;i++)await Promise.resolve();assert.equal(h.runtime.state().audio.state,'running');assert.equal(h.runtime.state().audio.voices,1);}finally{h.close();}});


test('pause cancels the active drag and rejects new gameplay input',()=>{const h=harness(draggable);try{h.event('pointerdown',120,120,7);h.runtime.pause(true);assert.equal(h.runtime.state().input.dragging,false);assert.doesNotThrow(()=>h.event('pointermove',180,180,7));h.event('pointerdown',120,120,8);assert.equal(h.runtime.state().input.pressed,null);}finally{h.close();}});
test('restart invalidates feedback still waiting for audio unlock',async()=>{let release;class Audio{constructor(){this.state='suspended';this.currentTime=0;this.destination={};}resume(){return new Promise(resolve=>{release=()=>{this.state='running';resolve();};});}suspend(){return Promise.resolve();}close(){return Promise.resolve();}createOscillator(){return {frequency:{},connect(){},start(){},stop(){}};}createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}};}}const h=harness([...base,{kind:'createComponent',component:{id:'button',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}},{kind:'putBehavior',behavior:{id:'button.sound',componentId:'button',kind:'audio',parameters:{loop:false,volume:.1,frequency:660,seconds:.1}}},{kind:'putBinding',binding:{id:'button.feedback',event:{kind:'click',componentId:'button'},actions:[{kind:'playAudio',behaviorId:'button.sound'}]}}],{audioContext:Audio});try{h.event('pointerdown',120,120,1);await Promise.resolve();h.runtime.restart();release();for(let i=0;i<10;i++)await Promise.resolve();assert.equal(h.runtime.state().audio.voices,0);assert.deepEqual(h.runtime.state().diagnostics,[]);}finally{h.close();}});

test('runtime property changes reject invalid values and disabled controls stop receiving clicks',()=>{
 const button={kind:'createComponent',component:{id:'button',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}};
 const binding={kind:'putBinding',binding:{id:'disable',event:{kind:'click',componentId:'button'},actions:[{kind:'add',variableId:'score',value:1},{kind:'setComponent',componentId:'button',key:'enabled',value:false}]}};
 const h=harness([...base,button,binding]);
 try{h.event('pointerdown',120,120);h.event('pointerup',120,120);h.advance(.1);h.event('pointerdown',120,120);assert.equal(h.runtime.state().variables.score,1);assert.equal(h.runtime.state().components.button.parameters.enabled,false);h.runtime.restart();assert.equal(h.runtime.state().components.button,undefined);h.advance(.1);h.event('pointerdown',120,120);assert.equal(h.runtime.state().variables.score,1);}finally{h.close();}
 const invalid=globalThis.structuredClone(binding);invalid.binding.actions=[{kind:'setComponent',componentId:'button',key:'opacity',value:2}];
 assert.throws(()=>applyOperations(emptyProject({id:'bad-properties',name:'Bad'}),[button,invalid]),/E_NATIVE_PROPERTY/);
 invalid.binding.actions=[{kind:'setComponent',componentId:'button',key:'__proto__',value:'oops'}];
 assert.throws(()=>applyOperations(emptyProject({id:'bad-properties',name:'Bad'}),[button,invalid]),/E_NATIVE_PROPERTY/);
});

test('adjacent invalid match preserves board, valid match moves tiles, resetMatch restores the authored puzzle',()=>{
 const cells=[['sun','leaf','sun'],['leaf','sun','drop'],['drop','drop','leaf']];
 const ops=[...base];
 for(let row=0;row<3;row++)for(let column=0;column<3;column++){
  const id='tile.'+row+'.'+column;
  ops.push({kind:'createComponent',component:{id,contract:'native.button.v1',parentId:'controller',transform:[1,0,0,1,column*60,row*60],parameters:{width:50,height:50}}},{kind:'putBehavior',behavior:{id:id+'.match',componentId:id,kind:'match-tile',parameters:{row,column,group:cells[row][column]}}});
 }
 ops.push({kind:'putBinding',binding:{id:'invalid',event:{kind:'invalidMatch',componentId:'controller'},actions:[{kind:'add',variableId:'score',value:-1}]}},{kind:'putBinding',binding:{id:'valid',event:{kind:'validMatch',componentId:'controller'},actions:[{kind:'add',variableId:'score',value:10}]}},{kind:'createComponent',component:{id:'reset',contract:'native.button.v1',transform:[1,0,0,1,250,250],parameters:{width:100,height:80}}},{kind:'putBinding',binding:{id:'reset.board',event:{kind:'click',componentId:'reset'},actions:[{kind:'resetMatch',componentId:'controller'}]}});
 const h=harness(ops),click=(x,y)=>{h.event('pointerdown',x,y);h.event('pointerup',x,y);h.advance(.02);};
 try{
  click(20,20);click(80,20);assert.equal(h.runtime.state().variables.score,-1);
  assert.equal(h.runtime.state().match.cells.find(c=>c.id==='tile.0.0').column,0);
  click(80,20);click(80,80);assert.equal(h.runtime.state().variables.score,9);
  assert.equal(h.runtime.state().match.cells.find(c=>c.id==='tile.0.1').row,1);
  click(270,270);assert.equal(h.runtime.state().match.cells.find(c=>c.id==='tile.0.1').row,0);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('animation delay and independent axes retain authored transforms across repeated feedback',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'button',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'stretch',componentId:'button',kind:'animation',parameters:{property:'scaleX',from:.5,to:1,seconds:.2,delay:.2,easing:'linear',loop:false}}},
  {kind:'putBehavior',behavior:{id:'turn',componentId:'button',kind:'animation',parameters:{property:'rotation',from:0,to:90,seconds:.2,delay:.2,easing:'linear',loop:false}}},
  {kind:'putBinding',binding:{id:'feedback',event:{kind:'click',componentId:'button'},actions:[{kind:'animate',behaviorId:'stretch'},{kind:'animate',behaviorId:'turn'}]}}
 ]);
 try{
  h.event('pointerdown',120,120);h.event('pointerup',120,120);h.advance(.1);assert.equal(h.runtime.state().components.button,undefined);
  h.advance(.5);const matrix=h.runtime.state().components.button.transform;assert.ok(Math.abs(matrix[0])<1e-8);assert.ok(Math.abs(matrix[1]-1)<1e-8);assert.ok(Math.abs(matrix[2]+1)<1e-8);assert.equal(matrix[4],100);
  assert.equal(h.runtime.state().animations,0);assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('voice feedback ducks the music bus and restores it when the voice ends',async()=>{
 const sources=[],gains=[];
 class Audio{
  constructor(){this.state='running';this.currentTime=0;this.destination={};}
  close(){return Promise.resolve();}
  createOscillator(){const source={frequency:{},connect(){},start(){},stop(){}};sources.push(source);return source;}
  createGain(){const gain={gain:{setValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(value){gain.level=value;}},connect(){}};gains.push(gain);return gain;}
 }
 const h=harness([...base,
  {kind:'createComponent',component:{id:'button',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'music',componentId:'button',kind:'audio',parameters:{bus:'music',volume:.4,frequency:300,seconds:2,loop:false}}},
  {kind:'putBehavior',behavior:{id:'voice',componentId:'button',kind:'audio',parameters:{bus:'voice',volume:.2,frequency:600,seconds:1,loop:false}}},
  {kind:'putBinding',binding:{id:'mix',event:{kind:'click',componentId:'button'},actions:[{kind:'playAudio',behaviorId:'music'},{kind:'playAudio',behaviorId:'voice'}]}}
 ],{audioContext:Audio});
 try{
  h.event('pointerdown',120,120);await Promise.resolve();
  assert.equal(sources.length,2);assert.equal(gains[0].level,.1);
  sources[1].onended();assert.equal(gains[0].level,.4);
  h.runtime.restart();assert.equal(h.runtime.state().audio.voices,0);
 }finally{h.close();}
});

test('matching is isolated by board and an identical-group swap never earns a reward',()=>{
 const ops=[...base],boards=[{id:'left',x:0,cells:[['sun','sun','sun'],['leaf','drop','leaf']]},{id:'right',x:200,cells:[['sun','leaf','sun'],['leaf','sun','drop']]}];
 for(const board of boards){
  ops.push({kind:'createComponent',component:{id:board.id,contract:'native.group.v1',transform:[1,0,0,1,board.x,0]}});
  for(let row=0;row<2;row++)for(let column=0;column<3;column++){
   const id=board.id+'.'+row+'.'+column;
   ops.push({kind:'createComponent',component:{id,contract:'native.button.v1',parentId:board.id,transform:[1,0,0,1,column*55,row*55],parameters:{width:45,height:45}}},{kind:'putBehavior',behavior:{id:id+'.tile',componentId:id,kind:'match-tile',parameters:{row,column,group:board.cells[row][column]}}});
  }
  ops.push({kind:'putBinding',binding:{id:board.id+'.valid',event:{kind:'validMatch',componentId:board.id},actions:[{kind:'add',variableId:'score',value:10}]}},{kind:'putBinding',binding:{id:board.id+'.invalid',event:{kind:'invalidMatch',componentId:board.id},actions:[{kind:'add',variableId:'score',value:-1}]}});
 }
 const h=harness(ops),click=(x,y)=>{h.event('pointerdown',x,y);h.event('pointerup',x,y);h.advance(.02);};
 try{
  click(15,15);click(70,15);assert.equal(h.runtime.state().variables.score,-1);
  click(215,15);click(270,15);assert.equal(h.runtime.state().variables.score,-2);
  click(15,15);click(270,15);assert.equal(h.runtime.state().variables.score,-2);
 }finally{h.close();}
});

test('pending audio unlock cannot exceed the voice cap when concurrent feedback resumes',async()=>{
 let release;const sources=[];
 class Audio{
  constructor(){this.state='suspended';this.currentTime=0;this.destination={};}
  resume(){return new Promise(resolve=>{release=()=>{this.state='running';resolve();};});}
  close(){return Promise.resolve();}
  createOscillator(){const source={frequency:{},connect(){},start(){},stop(){}};sources.push(source);return source;}
  createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}};}
 }
 const ops=[...base,{kind:'createComponent',component:{id:'button',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}},{kind:'putBehavior',behavior:{id:'sound',componentId:'button',kind:'audio',parameters:{loop:false,volume:.1,frequency:500,seconds:.2,cooldownMs:0}}}];
 for(let n=0;n<2;n++)ops.push({kind:'putBinding',binding:{id:'feedback.'+n,event:{kind:'click',componentId:'button'},actions:Array.from({length:20},()=>({kind:'playAudio',behaviorId:'sound'}))}});
 const h=harness(ops,{audioContext:Audio});
 try{h.event('pointerdown',120,120);await Promise.resolve();release();for(let i=0;i<10;i++)await Promise.resolve();assert.equal(sources.length,32);assert.equal(h.runtime.state().audio.voices,32);}finally{h.close();}
});

test('rapid input sees newly shown controls before the next animation frame',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'old.board',contract:'native.group.v1'}},
  {kind:'createComponent',component:{id:'old.tile',parentId:'old.board',contract:'native.button.v1',parameters:{width:80,height:80}}},
  {kind:'createComponent',component:{id:'new.board',contract:'native.group.v1',parameters:{visible:false}}},
  {kind:'createComponent',component:{id:'new.tile',parentId:'new.board',contract:'native.button.v1',parameters:{width:80,height:80}}},
  {kind:'createComponent',component:{id:'choose',contract:'native.button.v1',transform:[1,0,0,1,200,200],parameters:{width:80,height:80}}},
  {kind:'putBinding',binding:{id:'show',event:{kind:'click',componentId:'choose'},actions:[{kind:'setComponent',componentId:'old.board',key:'visible',value:false},{kind:'setComponent',componentId:'new.board',key:'visible',value:true}]}},
  {kind:'putBinding',binding:{id:'old.clicked',event:{kind:'click',componentId:'old.tile'},actions:[{kind:'add',variableId:'score',value:-10}]}},
  {kind:'putBinding',binding:{id:'new.clicked',event:{kind:'click',componentId:'new.tile'},actions:[{kind:'add',variableId:'score',value:1}]}}
 ]);
 try{
  h.event('pointerdown',220,220);h.event('pointerup',220,220);
  h.event('pointerdown',20,20);h.event('pointerup',20,20);
  assert.equal(h.runtime.state().variables.score,1);
  h.runtime.restart();
  h.event('pointerdown',20,20);h.event('pointerup',20,20);
  assert.equal(h.runtime.state().variables.score,-10);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

const responsiveGroup=[
 {kind:'createComponent',component:{id:'layout',contract:'native.group.v1',transform:[1,0,0,1,10,20]}},
 {kind:'putBehavior',behavior:{id:'layout.landscape',componentId:'layout',kind:'responsive-layout',parameters:{x:400,y:80,scaleX:.5,scaleY:2}}},
];
test('responsive groups preserve progress and update input geometry on rotation before the next frame',()=>{
 const h=harness([...base,...responsiveGroup,
  {kind:'createComponent',component:{id:'tile',parentId:'layout',contract:'native.button.v1',transform:[1,0,0,1,20,10],parameters:{width:100,height:40}}},
  {kind:'putBinding',binding:{id:'tile.clicked',event:{kind:'click',componentId:'tile'},actions:[{kind:'add',variableId:'score',value:1}]}}
 ]);
 const click=(x,y)=>{h.event('pointerdown',x,y);h.event('pointerup',x,y);};
 try{
  click(40,40);assert.equal(h.runtime.state().variables.score,1);
  h.resize(844,390);assert.deepEqual(h.runtime.state().viewport,{width:700,height:390,landscape:true});
  click(72+420,120);assert.equal(h.runtime.state().variables.score,2);
  click(40,40);assert.equal(h.runtime.state().variables.score,2);
  h.resize(390,700);click(40,40);assert.equal(h.runtime.state().variables.score,3);
  assert.deepEqual(h.runtime.state().viewport,{width:390,height:700,landscape:false});
  assert.deepEqual(h.runtime.state().components,{});
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('viewport audit reports clipped and unpainted required UI',()=>{
 const h=harness([...base,...responsiveGroup,
  {kind:'createComponent',component:{id:'tile',parentId:'layout',contract:'native.button.v1',transform:[1,0,0,1,20,10],parameters:{width:100,height:40}}},
  {kind:'createComponent',component:{id:'clipped',contract:'native.rectangle.v1',transform:[1,0,0,1,690,20],parameters:{width:20,height:40}}},
 ]);
 try{
  h.resize(844,390);
  const audit=h.runtime.auditViewport(['tile','clipped','absent']);
  assert.equal(audit.ok,false);
  assert.deepEqual(audit.viewport,{width:700,height:390,landscape:true,canvasWidth:844,canvasHeight:390});
  assert.deepEqual(audit.issues.map(issue=>issue.id),['clipped']);
  assert.equal(audit.issues[0].overflow.right,10);
  assert.deepEqual(audit.missing,['absent']);
  assert.deepEqual(h.runtime.auditViewport(['tile']).ok,true);
 }finally{h.close();}
});

test('projects without responsive groups retain their original logical viewport in landscape',()=>{
 const h=harness(base);
 try{h.resize(844,390);h.advance(.1);assert.deepEqual(h.runtime.state().viewport,{width:390,height:700,landscape:false});}finally{h.close();}
});

test('responsive layouts accept prototype roots and reject ambiguous movement, prototype ownership and duplicate layouts',()=>{
 const project=()=>emptyProject({id:'invalid-layout',name:'Layout'});
 for(const kind of ['drag','motion']){
  const parameters=kind==='drag'?{axis:'both'}:{vx:1,vy:0,gravity:0};
  assert.throws(()=>applyOperations(project(),[...responsiveGroup,{kind:'putBehavior',behavior:{id:'moving',componentId:'layout',kind,parameters}}]),/E_NATIVE_LAYOUT/);
 }
 assert.throws(()=>applyOperations(project(),[{...responsiveGroup[0],component:{...responsiveGroup[0].component,contract:'native.rectangle.v1'}},responsiveGroup[1]]),/E_NATIVE_LAYOUT/);
 const prototypeRoot=[{...responsiveGroup[0],component:{...responsiveGroup[0].component,prototype:true}},responsiveGroup[1]];
 assert.doesNotThrow(()=>applyOperations(project(),prototypeRoot));
 assert.throws(()=>applyOperations(project(),[...prototypeRoot,
  {kind:'createComponent',component:{id:'nested',parentId:'layout',contract:'native.group.v1',transform:[1,0,0,1,0,0]}},
  {kind:'putBehavior',behavior:{id:'nested.landscape',componentId:'nested',kind:'responsive-layout',parameters:{x:400,y:80,scaleX:.5,scaleY:2}}},
 ]),/E_NATIVE_LAYOUT/);
 assert.throws(()=>applyOperations(project(),[...responsiveGroup,{...responsiveGroup[1],behavior:{...responsiveGroup[1].behavior,id:'layout.duplicate'}}]),/E_NATIVE_LAYOUT/);
});

test('motion boundary events use the active responsive stage height',()=>{
 const h=harness([...base,...responsiveGroup,
  {kind:'createComponent',component:{id:'falling',contract:'native.rectangle.v1',transform:[1,0,0,1,20,380],parameters:{width:20,height:20}}},
  {kind:'putBehavior',behavior:{id:'falling.motion',componentId:'falling',kind:'motion',parameters:{vx:0,vy:60,gravity:0}}},
  {kind:'putBinding',binding:{id:'falling.exit',event:{kind:'boundaryExit',componentId:'falling'},actions:[{kind:'add',variableId:'score',value:1}]}}
 ]);
 try{
  h.resize(700,390);h.advance(.5);
  assert.equal(h.runtime.state().variables.score,1);
  h.runtime.restart();h.resize(390,700);h.advance(.5);
  assert.equal(h.runtime.state().variables.score,0);
 }finally{h.close();}
});

test('drag clamps against the active landscape stage width',()=>{
 const h=harness([...draggable,...responsiveGroup]);
 try{
  h.resize(700,390);h.event('pointerdown',120,120);h.event('pointermove',690,120);
  assert.equal(h.runtime.state().components.draggable.transform[4],620);
  h.event('pointerup',690,120);h.runtime.restart();h.resize(390,700);
  h.event('pointerdown',120,120);h.event('pointermove',690,120);
  assert.equal(h.runtime.state().components.draggable.transform[4],310);
 }finally{h.close();}
});

test('dragged children clamp in stage space through a scaled responsive parent',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'layout',contract:'native.group.v1'}},
  {kind:'putBehavior',behavior:{id:'landscape',componentId:'layout',kind:'responsive-layout',parameters:{x:385,y:40,scaleX:.8,scaleY:.8}}},
  {kind:'createComponent',component:{id:'drag.child',parentId:'layout',contract:'native.rectangle.v1',transform:[1,0,0,1,20,20],parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'drag.behavior',componentId:'drag.child',kind:'drag',parameters:{axis:'x'}}}
 ]);
 try{
  h.resize(700,390);h.event('pointerdown',420,70);h.event('pointermove',690,70);
  let matrix=h.runtime.state().components['drag.child'].transform;
  assert.ok(Math.abs(385+.8*(matrix[4]+100)-700)<1e-8);
  assert.equal(matrix[5],20);
  h.event('pointermove',-100,70);
  matrix=h.runtime.state().components['drag.child'].transform;
  assert.ok(Math.abs(385+.8*matrix[4])<1e-8);
  assert.equal(matrix[5],20);
 }finally{h.close();}
});

test('motion children exit when their world anchor crosses the responsive stage',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'layout',contract:'native.group.v1'}},
  {kind:'putBehavior',behavior:{id:'landscape',componentId:'layout',kind:'responsive-layout',parameters:{x:385,y:40,scaleX:.8,scaleY:.8}}},
  {kind:'createComponent',component:{id:'moving.child',parentId:'layout',contract:'native.rectangle.v1',transform:[1,0,0,1,20,430],parameters:{width:20,height:20}}},
  {kind:'putBehavior',behavior:{id:'moving.behavior',componentId:'moving.child',kind:'motion',parameters:{vx:0,vy:60,gravity:0}}},
  {kind:'putBinding',binding:{id:'moving.exit',event:{kind:'boundaryExit',componentId:'moving.child'},actions:[{kind:'add',variableId:'score',value:1}]}}
 ]);
 try{
  h.resize(700,390);h.advance(.04);assert.equal(h.runtime.state().variables.score,0);
  h.advance(.3);assert.equal(h.runtime.state().variables.score,1);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('an authored landscape base remains landscape when responsive layout activates',()=>{
 const h=harness([...base,...responsiveGroup],{baseSize:{width:700,height:390}});
 try{
  h.resize(844,390);assert.deepEqual(h.runtime.state().viewport,{width:700,height:390,landscape:true});
  h.resize(390,700);assert.deepEqual(h.runtime.state().viewport,{width:700,height:390,landscape:false});
 }finally{h.close();}
});

test('older canvas contexts draw rounded controls using arcTo',()=>{
 const corners=[];
 const h=harness([...base,{kind:'createComponent',component:{id:'rounded',contract:'native.button.v1',parameters:{width:100,height:80,radius:20}}}],{contextMethods:{roundRect:undefined,arcTo(...values){corners.push(values);}}});
 try{
  assert.deepEqual(corners.slice(0,4),[[100,0,100,80,20],[100,80,0,80,20],[0,80,0,0,20],[0,0,100,0,20]]);
  h.event('pointerdown',30,30);h.event('pointerup',30,30);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('prefixed Web Audio unlocks feedback when AudioContext is absent',()=>{
 let constructed=0;
 class Audio{
  constructor(){constructed++;this.state='running';this.currentTime=0;this.destination={};}
  close(){return Promise.resolve();}
  createOscillator(){return {frequency:{},connect(){},start(){},stop(){}};}
  createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}};}
 }
 const h=harness([...base,
  {kind:'createComponent',component:{id:'button',contract:'native.button.v1',parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'feedback',componentId:'button',kind:'audio',parameters:{loop:false,volume:.1,frequency:600,seconds:.1}}},
  {kind:'putBinding',binding:{id:'play',event:{kind:'click',componentId:'button'},actions:[{kind:'playAudio',behaviorId:'feedback'}]}}
 ],{globals:{AudioContext:undefined,webkitAudioContext:Audio}});
 try{h.event('pointerdown',30,30);assert.equal(constructed,1);assert.equal(h.runtime.state().audio.voices,1);}finally{h.close();}
});

test('store fallback requires trusted input and honors an explicit inactive user activation',()=>{
 for(const activation of [undefined,{isActive:false},{isActive:true}]){
  const opened=[];
  const h=harness([...base,
   {kind:'createComponent',component:{id:'button',contract:'native.button.v1',parameters:{width:100,height:80}}},
   {kind:'putBehavior',behavior:{id:'clock',componentId:'controller',kind:'timer',parameters:{seconds:.1,repeat:false}}},
   {kind:'putBinding',binding:{id:'click.store',event:{kind:'click',componentId:'button'},actions:[{kind:'store'}]}},
   {kind:'putBinding',binding:{id:'timer.store',event:{kind:'timer',behaviorId:'clock'},actions:[{kind:'store'}]}}
  ],{globals:{navigator:{userActivation:activation},window:{open(...args){opened.push(args);}}}});
  try{
   h.event('pointerdown',30,30,1,false);assert.equal(opened.length,0);
   h.advance(.2);assert.equal(opened.length,0);
   h.event('pointerdown',30,30);
   h.event('pointercancel',30,30);
   h.event('pointerup',30,30);
   h.event('pointerdown',30,30);
   h.event('pointerup',150,150);
   h.event('pointerdown',30,30);
   h.event('pointerup',30,30,2);
   assert.equal(opened.length,0);
   h.event('pointerup',30,30);
   assert.equal(opened.length,activation?.isActive===false?0:1);
   if(opened.length)assert.equal(opened[0][0],'https://play.google.com/store/apps/details?id=com.example.game');
  }finally{h.close();}
 }
});

test('native browser output compiles for Safari 13 without unsupported syntax overrides',async()=>{
 const {runtimeBundle}=await import('../../scripts/lean/native/compiler.mjs');
 const {transform}=await import('esbuild');
 const source=await runtimeBundle();
 const result=await transform(source,{target:['es2019','safari13']});
 assert.ok(result.code.length>0);
});

test('callback-only WAV decoding plays feedback and rejects stale replay completion',async()=>{
 for(const restart of [false,true]){
  let finishDecode;
  class Audio{
   constructor(){this.state='running';this.currentTime=0;this.destination={};}
   close(){return Promise.resolve();}
   decodeAudioData(bytes,success){
    assert.equal(typeof success,'function');
    finishDecode=()=>success({duration:.2});
   }
   createBufferSource(){return {connect(){},start(){},stop(){}};}
   createGain(){return {gain:{value:0},connect(){}};}
  }
  const h=harness([...base,
   {kind:'registerAsset',asset:{id:'wave',hash:'sha256:'+'1'.repeat(64),mime:'audio/wav',bytes:44,rights:'Original test audio'}},
   {kind:'createComponent',component:{id:'button',contract:'native.button.v1',parameters:{width:100,height:80},assetSlots:[{slotId:'source',assetId:'wave'}]}},
   {kind:'putBehavior',behavior:{id:'cue',componentId:'button',kind:'audio',parameters:{loop:false,volume:.1,frequency:600,seconds:.2}}},
   {kind:'putBinding',binding:{id:'cue.play',event:{kind:'click',componentId:'button'},actions:[{kind:'playAudio',behaviorId:'cue'}]}}
  ],{audioContext:Audio,globals:{atob:()=>''}});
  try{
   h.event('pointerdown',30,30);
   if(restart)h.runtime.restart();
   finishDecode();
   for(let index=0;index<10;index++)await Promise.resolve();
   assert.equal(h.runtime.state().audio.voices,restart?0:1);
   assert.deepEqual(h.runtime.state().diagnostics,[]);
  }finally{h.close();}
 }
});

function harvestBoard(){
 const groups=['carrot','corn','tomato','eggplant','pumpkin'],operations=[...base,
  {kind:'createComponent',component:{id:'board',contract:'native.group.v1',transform:[1,0,0,1,20,100]}},
  {kind:'putBehavior',behavior:{id:'board.rules',componentId:'board',kind:'match-board',parameters:{rows:5,columns:5,seed:17}}},
  {kind:'putVariable',variable:{id:'clears',label:'Clears',type:'number',initial:0}},
  {kind:'putBinding',binding:{id:'board.reward',event:{kind:'validMatch',componentId:'board'},actions:[{kind:'add',variableId:'score',value:1}]}},
  {kind:'putBinding',binding:{id:'board.clear',event:{kind:'matchClear',componentId:'board'},actions:[{kind:'add',variableId:'clears',value:1}]}}
 ];
 for(let row=0;row<5;row++)for(let column=0;column<5;column++){
  let group=groups[(row*2+column)%5];
  if(row===0&&column===2||row===1&&column===1)group='carrot';
  const id='crop.'+row+'.'+column;
  operations.push({kind:'createComponent',component:{id,parentId:'board',contract:'native.button.v1',transform:[1,0,0,1,column*55,row*55],parameters:{width:48,height:48,fill:['#ff9922','#ffee33','#ee3333','#773399','#ff7722'][groups.indexOf(group)]}}},{kind:'putBehavior',behavior:{id:id+'.type',componentId:id,kind:'match-tile',parameters:{row,column,group}}});
 }
 return operations;
}
test('match boards animate a real swap, clear and gravity before rewarding one player move',()=>{
 const h=harness(harvestBoard()),click=(x,y)=>{h.event('pointerdown',x,y);h.event('pointerup',x,y);};
 try{
  const initial=h.runtime.state().match.boards.board.groups;
  click(99,124);click(99,179);
  assert.equal(h.runtime.state().match.boards.board.phase,'swap');
  assert.equal(h.runtime.state().variables.score,0);
  click(44,124);click(99,124);
  h.advance(.09);assert.equal(h.runtime.state().match.boards.board.phase,'swap');
  h.advance(.1);assert.equal(h.runtime.state().match.boards.board.phase,'clear');
  assert.ok(h.runtime.state().match.boards.board.cleared>=3);
  h.advance(.2);assert.equal(h.runtime.state().match.boards.board.phase,'fall');
  h.advance(3);
  const settled=h.runtime.state().match.boards.board;
  assert.equal(settled.phase,'idle');assert.equal(settled.moves,1);assert.equal(h.runtime.state().variables.score,1);
  assert.notDeepEqual(settled.groups,initial);assert.ok(settled.legalMoves.length);
  assert.ok(h.runtime.state().variables.clears<=4);
  const move=settled.legalMoves[0];
  for(const id of [move.from,move.to]){const cell=h.runtime.state().match.cells.find(cell=>cell.id===id);click(44+cell.column*55,124+cell.row*55);}
  h.advance(3);assert.equal(h.runtime.state().variables.score,2);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('swipe controls settle once and replay returns the identical seeded board',()=>{
 const h=harness(harvestBoard());
 try{
  const initial=h.runtime.state().match.boards.board.groups;
  h.event('pointerdown',99,124,4);h.event('pointermove',99,179,4);h.event('pointerup',99,179,4);
  assert.equal(h.runtime.state().match.boards.board.phase,'swap');
  h.advance(3);const first=h.runtime.state().match.boards.board.groups;
  assert.equal(h.runtime.state().variables.score,1);
  h.runtime.restart();assert.deepEqual(h.runtime.state().match.boards.board.groups,initial);
  h.event('pointerdown',99,124,4);h.event('pointermove',99,179,4);h.event('pointerup',99,179,4);
  h.advance(3);assert.deepEqual(h.runtime.state().match.boards.board.groups,first);
  assert.equal(h.runtime.state().variables.score,1);
 }finally{h.close();}
});

test('a rejected swap returns to its original board and cannot award progress',()=>{
 const h=harness([...harvestBoard(),{kind:'putVariable',variable:{id:'mistakes',label:'Mistakes',type:'number',initial:0}},{kind:'putBinding',binding:{id:'rejected',event:{kind:'invalidMatch',componentId:'board'},actions:[{kind:'add',variableId:'mistakes',value:1}]}}]);
 try{
  const initial=h.runtime.state().match.boards.board.groups;
  const legal=h.runtime.state().match.boards.board.legalMoves;
  let pair;
  for(let row=0;row<5&&!pair;row++)for(let column=0;column<4&&!pair;column++){
   const from='crop.'+row+'.'+column,to='crop.'+row+'.'+(column+1);
   if(!legal.some(move=>move.from===from&&move.to===to))pair=[{row,column},{row,column:column+1}];
  }
  for(const cell of pair){h.event('pointerdown',44+cell.column*55,124+cell.row*55);h.event('pointerup',44+cell.column*55,124+cell.row*55);}
  h.advance(.19);assert.equal(h.runtime.state().match.boards.board.phase,'reverse');
  h.advance(.2);assert.equal(h.runtime.state().match.boards.board.phase,'idle');
  assert.deepEqual(h.runtime.state().match.boards.board.groups,initial);
  assert.equal(h.runtime.state().variables.mistakes,1);assert.equal(h.runtime.state().variables.score,0);
 }finally{h.close();}
});

test('paused and reset match boards do not complete stale gestures or reward unfinished moves',()=>{
 const h=harness(harvestBoard());
 try{
  h.event('pointerdown',99,124,4);h.runtime.pause(true);h.event('pointermove',99,179,4);h.event('pointerup',99,179,4);
  h.advance(2);h.runtime.pause(false);assert.equal(h.runtime.state().match.boards.board.phase,'idle');
  h.event('pointerdown',99,124);h.event('pointerup',99,124);h.event('pointerdown',99,179);h.event('pointerup',99,179);
  h.advance(.1);h.runtime.restart();h.advance(2);
  assert.equal(h.runtime.state().variables.score,0);assert.equal(h.runtime.state().match.boards.board.phase,'idle');
 }finally{h.close();}
});

test('seeded board normalization and one hundred moves stay solvable and bounded',async()=>{
 const {createMatchBoard}=await import('../../scripts/lean/native/match-board.mjs');
 const slots=Array.from({length:25},(_,cell)=>({id:'slot.'+cell,row:Math.floor(cell/5),column:cell%5,group:cell===23?'corn':cell===24?'pumpkin':'carrot'}));
 const create=()=>createMatchBoard({rows:5,columns:5,seed:59,slots,paint(){},onEvent(){}});
 const first=create(),second=create();first.reset();second.reset();
 const noTriples=groups=>{
  for(let row=0;row<5;row++)for(let column=0;column<5;column++){
   const cell=row*5+column;
   if(column<3)assert.ok(groups[cell]!==groups[cell+1]||groups[cell]!==groups[cell+2]);
   if(row<3)assert.ok(groups[cell]!==groups[cell+5]||groups[cell]!==groups[cell+10]);
  }
 };
 noTriples(first.snapshot().groups);
 for(let move=0;move<100;move++){
  const choice=first.snapshot().legalMoves[0];assert.ok(choice);
  first.swap(choice.from,choice.to);second.swap(choice.from,choice.to);
  let frames=0;
  while(first.snapshot().busy&&frames++<150){first.tick(1/60);second.tick(1/60);}
  assert.ok(frames<150);assert.equal(first.snapshot().moves,move+1);
  noTriples(first.snapshot().groups);assert.ok(first.snapshot().legalMoves.length);
  assert.deepEqual(first.snapshot().groups,second.snapshot().groups);
 }
});

test('match hints highlight a legal pair without earning progress and clear on pause',()=>{
 const h=harness([...harvestBoard(),
  {kind:'createComponent',component:{id:'hint',contract:'native.button.v1',transform:[1,0,0,1,200,500],parameters:{width:100,height:60}}},
  {kind:'putBinding',binding:{id:'show.hint',event:{kind:'click',componentId:'hint'},actions:[{kind:'hintMatch',componentId:'board'}]}}
 ]);
 try{
  h.event('pointerdown',220,520);h.event('pointerup',220,520);
  assert.equal(h.runtime.state().match.boards.board.hint.length,2);
  h.advance(.1);assert.equal(h.runtime.state().variables.score,0);
  h.runtime.pause(true);assert.deepEqual(h.runtime.state().match.boards.board.hint,[]);
  h.runtime.pause(false);h.advance(1);assert.equal(h.runtime.state().variables.score,0);
 }finally{h.close();}
});

test('built-in pixel text renders lowercase and dynamic-safe glyphs without browser fonts',()=>{
 const draw=text=>{
  const rectangles=[],labels=[];
  const h=harness([...base,{kind:'createComponent',component:{id:'label',contract:'native.text.v1',parameters:{width:300,height:52,text,fontSize:26,fontFamily:'pixel',color:'#ffe6ab',pixelPanel:true,panelFill:'#3c2933',panelStroke:'#ffe6ab'}}}],{contextMethods:{fillRect(...args){if(this.fillStyle==='#ffe6ab')rectangles.push(args);},fillText(...args){labels.push(args);}}});
  try{return {rectangles,labels};}finally{h.close();}
 };
 const upper=draw('FARM RESTORED!'),lower=draw('farm restored!');
 assert.ok(upper.rectangles.length>40);assert.deepEqual(lower.rectangles,upper.rectangles);assert.deepEqual(upper.labels,[]);
});

test('square emitters use crisp particles rather than glowing circles',()=>{
 const rectangles=[],circles=[];
 const h=harness([...base,
  {kind:'putBehavior',behavior:{id:'confetti',componentId:'controller',kind:'emitter',parameters:{count:8,color:'#ffe6ab',speed:100,shape:'square'}}},
  {kind:'putBinding',binding:{id:'celebrate',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'emit',behaviorId:'confetti'}]}}
 ],{contextMethods:{fillRect(...args){if(this.fillStyle==='#ffe6ab')rectangles.push(args);},arc(...args){circles.push(args);}}});
 try{rectangles.length=0;h.advance(.02);assert.equal(h.runtime.state().particles,8);assert.ok(rectangles.length>=8);assert.deepEqual(circles,[]);}finally{h.close();}
});

test('pixel artwork disables image interpolation while older image parameters keep smoothing',()=>{
 class Image{constructor(){this.complete=true;this.naturalWidth=16;this.width=16;this.height=16;}}
 for(const smoothing of [false,undefined]){
  const samples=[],parameters={width:96,height:96,...(smoothing===undefined?{}:{smoothing})};
  const h=harness([...base,
   {kind:'registerAsset',asset:{id:'pixel-art',hash:'sha256:'+'a'.repeat(64),mime:'image/png',bytes:1,rights:'Original test asset'}},
   {kind:'createComponent',component:{id:'image',contract:'native.image.v1',parameters,assetSlots:[{slotId:'source',assetId:'pixel-art'}]}}
  ],{globals:{Image},contextMethods:{drawImage(){samples.push(this.imageSmoothingEnabled);}}});
  try{assert.equal(samples[0],smoothing===false?false:true);}finally{h.close();}
 }
});

test('match reward artwork starts at the cleared crop and animates from its current position',()=>{
 class Image{constructor(){this.complete=true;this.naturalWidth=16;this.width=16;this.height=16;}}
 const operations=harvestBoard(),groups=['carrot','corn','tomato','eggplant','pumpkin'];
 for(const group of groups)operations.push({kind:'registerAsset',asset:{id:'art.'+group,hash:'sha256:'+'a'.repeat(64),mime:'image/png',bytes:1,rights:'Original test asset'}});
 for(const operation of [...operations])if(operation.kind==='putBehavior'&&operation.behavior.kind==='match-tile'){
  const tile=operation.behavior;
  operations.push({kind:'createComponent',component:{id:tile.componentId+'.art',parentId:tile.componentId,contract:'native.image.v1',parameters:{width:48,height:48,smoothing:false},assetSlots:[{slotId:'source',assetId:'art.'+tile.parameters.group}]}});
 }
 operations.push(
  {kind:'createComponent',component:{id:'world',contract:'native.group.v1',transform:[1,0,0,1,300,10]}},
  {kind:'createComponent',component:{id:'flight',parentId:'world',contract:'native.image.v1',parameters:{width:20,height:20,visible:false},assetSlots:[{slotId:'source',assetId:'art.corn'}]}},
  {kind:'putBinding',binding:{id:'reward.art',event:{kind:'matchClear',componentId:'board'},actions:[{kind:'copyMatchAsset',componentId:'flight',boardId:'board'},{kind:'setComponent',componentId:'flight',key:'visible',value:true}]}},
  {kind:'putBehavior',behavior:{id:'flight.x',componentId:'flight',kind:'animation',parameters:{property:'x',from:0,fromCurrent:true,to:0,seconds:1,loop:false,easing:'linear'}}},
  {kind:'createComponent',component:{id:'fly',contract:'native.button.v1',transform:[1,0,0,1,260,500],parameters:{width:100,height:60}}},
  {kind:'putBinding',binding:{id:'fly.action',event:{kind:'click',componentId:'fly'},actions:[{kind:'animate',behaviorId:'flight.x'}]}}
 );
 const h=harness(operations,{globals:{Image}});
 try{
  h.event('pointerdown',99,124);h.event('pointerup',99,124);h.event('pointerdown',99,179);h.event('pointerup',99,179);
  h.advance(.18);
  let flight=h.runtime.state().components.flight;
  assert.equal(flight.assetId,'art.carrot');assert.equal(flight.transform[4],-266);assert.equal(flight.transform[5],104);
  h.event('pointerdown',280,520);h.event('pointerup',280,520);h.advance(.2);
  flight=h.runtime.state().components.flight;assert.ok(flight.transform[4]>-266&&flight.transform[4]<-150);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('an active match settles across rotation and landscape input continues the same board',()=>{
 const h=harness([...harvestBoard(),
  {kind:'createComponent',component:{id:'board.layout',contract:'native.group.v1'}},
  {kind:'putBehavior',behavior:{id:'board.landscape',componentId:'board.layout',kind:'responsive-layout',parameters:{x:350,y:0,scaleX:.8,scaleY:.8}}},
  {kind:'reparentComponent',id:'board',parentId:'board.layout'}
 ]);
 try{
  h.event('pointerdown',99,124);h.event('pointermove',99,179);h.event('pointerup',99,179);h.advance(.05);
  h.resize(700,390);h.advance(3);assert.equal(h.runtime.state().variables.score,1);
  const choice=h.runtime.state().match.boards.board.legalMoves[0];
  for(const id of [choice.from,choice.to]){
   const cell=h.runtime.state().match.cells.find(cell=>cell.id===id),x=350+.8*(44+cell.column*55),y=.8*(124+cell.row*55);
   h.event('pointerdown',x,y);h.event('pointerup',x,y);
  }
  h.advance(3);assert.equal(h.runtime.state().variables.score,2);
  assert.deepEqual(h.runtime.state().diagnostics,[]);
 }finally{h.close();}
});

test('incomplete or overlapping match-board cells fail document validation',()=>{
 const incomplete=harvestBoard().filter(operation=>operation.behavior?.id!=='crop.4.4.type');
 assert.throws(()=>applyOperations(emptyProject({id:'bad-board',name:'Bad'}),incomplete),/E_NATIVE_MATCH_BOARD/);
 const overlap=harvestBoard(),tile=overlap.find(operation=>operation.behavior?.id==='crop.4.4.type');
 tile.behavior.parameters.column=3;
 assert.throws(()=>applyOperations(emptyProject({id:'bad-board',name:'Bad'}),overlap),/E_NATIVE_MATCH_BOARD/);
});

test('standard text wraps and auto-fits without horizontal compression',()=>{
 const ctx={font:'',measureText(text){return {width:text.length*Number(/(\d+(?:\.\d+)?)px/.exec(this.font)[1])*.6};}};
 const p={width:120,height:70,fontSize:24,minFontSize:12,fontWeight:'700',fontFamily:'sans-serif',padding:4,lineHeight:1.2,wrap:true,autoFit:true};
 const fitted=layoutStandardText(ctx,'A long instruction that wraps cleanly',p);
 assert.ok(fitted.lines.length>1);assert.ok(fitted.fontSize<=24);assert.equal(fitted.overflowsWidth,false);assert.equal(fitted.overflowsHeight,false);
 const overflow=layoutStandardText(ctx,'Uncompressible',{...p,width:40,height:20,autoFit:false,wrap:false});
 assert.equal(overflow.overflowsWidth,true);assert.equal(overflow.overflowsHeight,true);
});

test('scene layout audit reports text, parent clip, touch, overlap and SDK defects',()=>{
 const operations=[...base,
  {kind:'createComponent',component:{id:'clip',contract:'native.group.v1',transform:[1,0,0,1,100,100],parameters:{width:40,height:40,clip:true}}},
  {kind:'createComponent',component:{id:'cropped',parentId:'clip',contract:'native.button.v1',transform:[1,0,0,1,30,0],parameters:{width:30,height:50}}},
  {kind:'createComponent',component:{id:'small',contract:'native.button.v1',transform:[1,0,0,1,200,100],parameters:{width:30,height:30}}},
  {kind:'createComponent',component:{id:'overlap',contract:'native.button.v1',transform:[1,0,0,1,215,100],parameters:{width:30,height:30}}},
  {kind:'createComponent',component:{id:'label',contract:'native.text.v1',transform:[1,0,0,1,100,250],parameters:{width:90,height:40,text:'This label cannot fit on one line',fontSize:24,wrap:false,autoFit:false}}},
  {kind:'createComponent',component:{id:'pixel.label',contract:'native.text.v1',transform:[1,0,0,1,100,310],parameters:{width:40,height:24,text:'OVERFLOWING PIXEL TEXT',fontFamily:'pixel',fontSize:16,wrap:false,autoFit:false}}},
  {kind:'createComponent',component:{id:'close',contract:'native.button.v1',transform:[1,0,0,1,340,0],parameters:{width:50,height:50}}},
  ...['cropped','small','overlap','close'].map(id=>({kind:'putEvent',event:{id:id+'.event',kind:'click',componentId:id}})),
 ];
 const h=harness(operations);
 try{
  const audit=h.runtime.auditSceneLayout();
  assert.equal(audit.ok,false);
  for(const kind of ['parent-clip-crop','text-overflow','touch-target-small','interactive-overlap','sdk-safe-area-collision'])assert.ok(audit.defects.some(defect=>defect.kind===kind),kind);
  assert.ok(audit.defects.some(defect=>defect.kind==='text-overflow'&&defect.id==='pixel.label'),'pixel text overflow must be audited');
  assert.equal(audit.viewport.scale,1);
 }finally{h.close();}
});

test('scene layout audit blocks off-center and edge-cramped elements inside panels across viewports',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'panel',contract:'native.rectangle.v1',transform:[1,0,0,1,25,300],parameters:{width:340,height:320,fill:'#222222',strokeWidth:2}}},
  {kind:'createComponent',component:{id:'btn.shifted',contract:'native.button.v1',transform:[1,0,0,1,35,440],parameters:{width:220,height:60}}},
  {kind:'createComponent',component:{id:'btn.cramped',contract:'native.button.v1',transform:[1,0,0,1,95,556],parameters:{width:200,height:60}}},
  {kind:'putEvent',event:{id:'btn.shifted.click',kind:'click',componentId:'btn.shifted'}},
  {kind:'putEvent',event:{id:'btn.cramped.click',kind:'click',componentId:'btn.cramped'}},
 ]);
 try{
  const audit=h.runtime.auditSceneLayout({minTouchPx:1});
  assert.equal(audit.ok,false);
  assert.ok(audit.defects.some(d=>d.kind==='panel-off-center'&&d.id==='btn.shifted'),'shifted button must fail panel-off-center');
  assert.ok(audit.defects.some(d=>d.kind==='panel-edge-cramped'&&d.id==='btn.cramped'),'bottom-hugging button must fail panel-edge-cramped');
 }finally{h.close();}
});

test('scene layout audit ignores hidden UI and non-clipping group origins but still reports absent visible UI',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'layout',contract:'native.group.v1',transform:[1,0,0,1,-200,-300],parameters:{width:0,height:0}}},
  {kind:'createComponent',component:{id:'visible',parentId:'layout',contract:'native.rectangle.v1',transform:[1,0,0,1,200,300],parameters:{width:80,height:80}}},
  {kind:'createComponent',component:{id:'hidden',contract:'native.button.v1',transform:[1,0,0,1,-50,-50],parameters:{width:80,height:80,visible:false}}},
 ]);
 try{
  const audit=h.runtime.auditSceneLayout({ids:['layout','visible','hidden','absent'],minTouchPx:1});
  assert.deepEqual(audit.missing,['absent']);assert.deepEqual(audit.defects,[]);
 }finally{h.close();}
});

test('responsive anchors clear conservative SDK safe-area insets in portrait',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'anchored',contract:'native.group.v1',parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'anchored.layout',componentId:'anchored',kind:'responsive-layout',parameters:{x:0,y:0,scaleX:1,scaleY:1,anchor:'top-right',respectSafeArea:true,marginX:10,marginY:10}}},
  {kind:'createComponent',component:{id:'anchored.button',parentId:'anchored',contract:'native.button.v1',parameters:{width:100,height:80}}},
  {kind:'putEvent',event:{id:'anchored.event',kind:'click',componentId:'anchored.button'}},
 ]);
 try{
  const audit=h.runtime.auditSceneLayout({minTouchPx:1}),button=audit.interactive.find(item=>item.id==='anchored.button');
  assert.equal(button.bounds.left,224);assert.equal(button.bounds.top,66);
  assert.equal(audit.defects.some(defect=>defect.kind==='sdk-safe-area-collision'),false);
 }finally{h.close();}
});

test('audio cooldown suppresses stacking and disabled synth fallback stays silent',()=>{
 const sources=[];
 class Audio{
  constructor(){this.state='running';this.currentTime=0;this.destination={};}
  close(){return Promise.resolve();}
  createOscillator(){const source={frequency:{},connect(){},start(){},stop(){}};sources.push(source);return source;}
  createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}};}
 }
 const h=harness([...base,
  {kind:'createComponent',component:{id:'button',contract:'native.button.v1',parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'cool',componentId:'button',kind:'audio',parameters:{loop:false,volume:.1,frequency:600,seconds:.1,cooldownMs:1000}}},
  {kind:'putBehavior',behavior:{id:'blocked',componentId:'button',kind:'audio',parameters:{loop:false,volume:.1,frequency:600,seconds:.1,allowSynthFallback:false}}},
  {kind:'putBinding',binding:{id:'sound',event:{kind:'click',componentId:'button'},actions:[{kind:'playAudio',behaviorId:'cool'},{kind:'playAudio',behaviorId:'blocked'}]}},
 ],{audioContext:Audio});
 try{
  h.event('pointerdown',30,30);h.event('pointerup',30,30);h.event('pointerdown',30,30);h.event('pointerup',30,30);
  assert.equal(sources.length,1);assert.equal(h.runtime.state().audio.voices,1);assert.equal(h.runtime.state().audio.blocked,2);
 }finally{h.close();}
});

test('stingers duck music to twenty percent and restore smoothly on completion',()=>{
 const sources=[],gains=[];
 class Audio{
  constructor(){this.state='running';this.currentTime=0;this.destination={};}
  close(){return Promise.resolve();}
  createOscillator(){const source={frequency:{},connect(){},start(){},stop(){}};sources.push(source);return source;}
  createGain(){const gain={gain:{setValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(value){gain.level=value;}},connect(){}};gains.push(gain);return gain;}
 }
 const h=harness([...base,
  {kind:'createComponent',component:{id:'button',contract:'native.button.v1',parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'music.stinger',componentId:'button',kind:'audio',parameters:{bus:'music',volume:.4,frequency:300,seconds:2,loop:false}}},
  {kind:'putBehavior',behavior:{id:'win.stinger',componentId:'button',kind:'audio',parameters:{bus:'stinger',volume:.2,frequency:600,seconds:1,loop:false}}},
  {kind:'putBinding',binding:{id:'mix.stinger',event:{kind:'click',componentId:'button'},actions:[{kind:'playAudio',behaviorId:'music.stinger'},{kind:'playAudio',behaviorId:'win.stinger'}]}},
 ],{audioContext:Audio});
 try{h.event('pointerdown',30,30);assert.ok(Math.abs(gains[0].level-.08)<1e-12);sources[1].onended();assert.equal(gains[0].level,.4);}finally{h.close();}
});

test('press feedback springs back and feedback actions remain bounded and resettable',()=>{
 const h=harness([...base,
  {kind:'createComponent',component:{id:'tactile',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}},
  {kind:'putBehavior',behavior:{id:'tactile.press',componentId:'tactile',kind:'press-feedback',parameters:{scaleDown:.92,springBackSeconds:.18,liftShadow:true}}},
  {kind:'putBinding',binding:{id:'tactile.feedback',event:{kind:'click',componentId:'tactile'},actions:[{kind:'cameraShake',intensity:8,seconds:.2},{kind:'screenFlash',color:'#ffffff',opacity:.2,seconds:.2},{kind:'floatingText',text:'+{{score}}',componentId:'tactile',color:'#ffffff',fontSize:24,risePx:40,seconds:.5}]}},
 ]);
 try{
  h.event('pointerdown',120,120);assert.equal(h.runtime.state().feedback.presses,1);assert.equal(h.runtime.state().feedback.shaking,true);assert.equal(h.runtime.state().feedback.flashes,1);assert.equal(h.runtime.state().feedback.floatingTexts,1);
  const pressed=h.runtime.auditSceneLayout({interactiveIds:['tactile'],minTouchPx:1}).interactive[0];assert.ok(Math.abs(pressed.bounds.right-pressed.bounds.left-92)<.01);
  h.event('pointerup',120,120);h.advance(1);assert.deepEqual(h.runtime.state().feedback,{presses:0,floatingTexts:0,flashes:0,shaking:false,tutorialHands:0});
  h.runtime.restart();assert.deepEqual(h.runtime.state().feedback,{presses:0,floatingTexts:0,flashes:0,shaking:false,tutorialHands:0});
 }finally{h.close();}
});

test('tutorial hand honors hideOnFirstInput, reappears when false, and resets on replay',()=>{
 const make=hideOnFirstInput=>harness([...base,
  {kind:'createComponent',component:{id:'guide.target',contract:'native.button.v1',transform:[1,0,0,1,100,100],parameters:{width:100,height:80}}},
  {kind:'createComponent',component:{id:'guide.destination',contract:'native.rectangle.v1',transform:[1,0,0,1,250,100],parameters:{width:60,height:60}}},
  {kind:'putBehavior',behavior:{id:'guide',componentId:'controller',kind:'tutorial-hand',parameters:{targetId:'guide.target',destinationId:'guide.destination',mode:'drag',idleDelaySeconds:.5,hideOnFirstInput}}},
 ],{globals:{matchMedia:()=>({matches:true})}});
 const permanent=make(true);
 try{
  permanent.advance(.6);assert.equal(permanent.runtime.state().feedback.tutorialHands,1);
  permanent.event('pointerdown',120,120);permanent.event('pointerup',120,120);
  assert.equal(permanent.runtime.state().feedback.tutorialHands,0);
  permanent.advance(1.5);assert.equal(permanent.runtime.state().feedback.tutorialHands,0);
  permanent.runtime.restart();permanent.advance(.6);assert.equal(permanent.runtime.state().feedback.tutorialHands,1);
  assert.deepEqual(permanent.runtime.state().diagnostics,[]);
 }finally{permanent.close();}
 const recurring=make(false);
 try{
  recurring.advance(.6);assert.equal(recurring.runtime.state().feedback.tutorialHands,1);
  recurring.event('pointerdown',120,120);recurring.event('pointerup',120,120);
  assert.equal(recurring.runtime.state().feedback.tutorialHands,0);
  recurring.advance(.6);assert.equal(recurring.runtime.state().feedback.tutorialHands,1);
 }finally{recurring.close();}
});

test('auditSceneLayout blocks incomplete backdrops, overlapping panel content, off-center headers, duplicate copy and heavy text clutter',()=>{
 const h=harness([...base,
  {kind:'registerAsset',asset:{id:'bg.img',hash:'sha256:'+'a'.repeat(64),mime:'image/png',bytes:64,rights:'test'}},
  {kind:'createComponent',component:{id:'demo.backdrop',order:0,contract:'native.image.v1',transform:[1,0,0,1,0,0],parameters:{width:390,height:390,fit:'cover'},assetSlots:[{slotId:'source',assetId:'bg.img'}]}},
  {kind:'createComponent',component:{id:'demo.banner',order:1,contract:'native.text.v1',transform:[1,0,0,1,15,264],parameters:{width:300,height:32,text:'Time is up! Catch 3 cores to launch.'}}},
  {kind:'createComponent',component:{id:'demo.panel',order:2,contract:'native.rectangle.v1',transform:[1,0,0,1,35,300],parameters:{width:320,height:300,fill:'#1b2b4b',stroke:'#ffd166',strokeWidth:2}}},
  {kind:'createComponent',component:{id:'demo.title',order:3,contract:'native.text.v1',transform:[1,0,0,1,55,330],parameters:{width:280,height:40,text:'Catch 3 cores to launch'}}},
  {kind:'createComponent',component:{id:'demo.badge',order:4,contract:'native.image.v1',transform:[1,0,0,1,170,340],parameters:{width:48,height:48},assetSlots:[{slotId:'source',assetId:'bg.img'}]}},
  {kind:'createComponent',component:{id:'demo.pill',order:5,contract:'native.text.v1',transform:[1,0,0,1,60,60],parameters:{width:180,height:32,text:'BRAND',fontFamily:'pixel',fontSize:24,align:'left',wrap:false,pixelPanel:true}}},
  {kind:'createComponent',component:{id:'demo.wall',order:6,contract:'native.text.v1',transform:[1,0,0,1,55,390],parameters:{width:280,height:44,text:'Here is a long tutorial paragraph explaining every single rule in way too many unnecessary words.'}}},
  {kind:'createComponent',component:{id:'demo.cta',order:7,contract:'native.button.v1',transform:[1,0,0,1,65,480],parameters:{width:260,height:64}}},
  {kind:'createComponent',component:{id:'demo.cta.label',order:8,contract:'native.text.v1',parentId:'demo.cta',transform:[1,0,0,1,0,0],parameters:{width:260,height:64,text:'PLAY'}}},
 ],{width:390,height:700,globals:{Image:class{set src(_){}}}});
 try{
  const audit=h.runtime.auditSceneLayout({minTouchPx:1});
  const kinds=new Set(audit.defects.map(defect=>defect.kind));
  assert.ok(kinds.has('backdrop-incomplete'),JSON.stringify(audit.defects));
  assert.ok(kinds.has('panel-content-overlap'),JSON.stringify(audit.defects));
  assert.ok(kinds.has('header-off-center'),JSON.stringify(audit.defects));
  assert.ok(audit.defects.some(d=>d.kind==='panel-off-center'&&d.id==='demo.pill'),JSON.stringify(audit.defects));
  assert.ok(kinds.has('duplicate-visible-copy'),JSON.stringify(audit.defects));
  assert.ok(kinds.has('text-clutter-heavy'),JSON.stringify(audit.defects));
 }finally{h.close();}
});

test('star-salvage seekReview motion actively steers to catch and settle every moment cleanly',async()=>{
 const {createSalvageConcept}=await import('../../scripts/lean/native/author-salvage.mjs');
 const {composeNativeConcept}=await import('../../scripts/lean/native/concept.mjs');
 const {applyOperations,emptyProject}=await import('../../scripts/lean/native/document.mjs');
 const {mountNative}=await import('../../scripts/lean/native/runtime.mjs');
 const concept=await createSalvageConcept(),composition=composeNativeConcept(concept);
 const {project}=applyOperations(emptyProject({id:'salvage-seek',name:'Star Salvage'}),composition.operations);
 const ctx=new Proxy({globalAlpha:1,measureText:text=>({width:String(text).length*10})},{get:(o,k)=>k in o?o[k]:()=>{}});
 const canvas={clientWidth:390,clientHeight:700,width:390,height:700,getBoundingClientRect:()=>({left:0,top:0,width:390,height:700}),addEventListener(){},removeEventListener(){},getContext:()=>ctx};
 let queued;
 const origRaf=globalThis.requestAnimationFrame,origCancel=globalThis.cancelAnimationFrame,origDoc=globalThis.document,origImage=globalThis.Image,origDpr=globalThis.devicePixelRatio;
 globalThis.document={hidden:false,addEventListener(){},removeEventListener(){}};
 globalThis.Image=class{set src(_){}};
 globalThis.devicePixelRatio=1;
 globalThis.requestAnimationFrame=cb=>{queued=cb;return 1;};
 globalThis.cancelAnimationFrame=()=>{queued=undefined;};
 let runtime;
 try{
  runtime=mountNative(project,canvas,{review:true});
  const drive=(maxSeconds=12)=>{let now=0;for(let i=0;i<maxSeconds*60&&queued;i++){const cb=queued;queued=undefined;now+=1000/60;cb(now);}};
  runtime.seekReview('first-catch',{motion:true});drive(10);
  assert.ok(runtime.state().variables['salvage.catches']>=1);
  const t1=runtime.state().time;drive(1);assert.equal(runtime.state().time,t1);
  runtime.seekReview('end-card',{motion:true});drive(15);
  assert.equal(runtime.state().variables['salvage.catches'],3);assert.equal(runtime.state().variables['salvage.phase'],'cta');
  const t2=runtime.state().time;drive(1);assert.equal(runtime.state().time,t2);
  runtime.seekReview('timeout',{motion:true});drive(10);
  assert.equal(runtime.state().variables['salvage.catches'],0);assert.equal(runtime.state().variables['salvage.phase'],'cta');
  const t3=runtime.state().time;drive(1);assert.equal(runtime.state().time,t3);
  assert.deepEqual(runtime.state().diagnostics,[]);
 }finally{runtime?.destroy();globalThis.requestAnimationFrame=origRaf;globalThis.cancelAnimationFrame=origCancel;globalThis.document=origDoc;globalThis.Image=origImage;globalThis.devicePixelRatio=origDpr;}
});
