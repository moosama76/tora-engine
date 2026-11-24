import test from 'node:test';
import process from 'node:process';
import assert from 'node:assert/strict';
import {createPathNetwork} from '../../scripts/lean/native/path-network.mjs';
import {mountNative} from '../../scripts/lean/native/runtime.mjs';
import {emptyProject,applyOperations} from '../../scripts/lean/native/document.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import {createTrafficProof} from '../../scripts/lean/native/author-primitive-proofs.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {runCreativeQa} from '../../scripts/lean/native/creative-qa.mjs';

const nodes=[{id:'a',x:0,y:0},{id:'b',x:100,y:0},{id:'c',x:200,y:0},{id:'d',x:100,y:100}];
const edges=[{id:'ab',from:'a',to:'b',bidirectional:true},{id:'bc',from:'b',to:'c',bidirectional:true},{id:'ad',from:'a',to:'d',bidirectional:true},{id:'dc',from:'d',to:'c',bidirectional:true}];
const agentParameters={networkBehaviorId:'roads.network',startNode:'a',targetNode:'c',speed:90,spacing:34,cornerRadius:14,orientToPath:'rotate',loop:'none',active:true};
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
function network(gates=[]){return createPathNetwork({id:'roads.network',nodes,edges,gates});}
function harness(operations){const prior=new Map(),set=(key,value)=>{prior.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};let callback;set('requestAnimationFrame',fn=>{callback=fn;return 1;});set('cancelAnimationFrame',()=>{});set('document',{hidden:false,addEventListener(){},removeEventListener(){}});set('devicePixelRatio',1);const listeners=new Map(),ctx=new Proxy({globalAlpha:1,measureText:text=>({width:String(text).length*10})},{get:(o,k)=>k in o?o[k]:()=>{}}),canvas={clientWidth:390,clientHeight:700,getContext:()=>ctx,addEventListener(type,listener){listeners.set(type,listener);},removeEventListener(type){listeners.delete(type);},setPointerCapture(){},getBoundingClientRect(){return {left:0,top:0,width:390,height:700};}};const {project}=applyOperations(emptyProject({id:'path-primitives',name:'Path primitives'}),operations),runtime=mountNative(project,canvas);let now=100;return {runtime,advance(seconds){for(let n=0;n<Math.ceil(seconds*60);n++){now+=1000/60;callback(now);}},event(type,x,y){listeners.get(type)?.({clientX:x,clientY:y,pointerId:1,isTrusted:true});},close(){runtime.destroy();for(const [key,descriptor]of prior)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}};}

test('Dijkstra uses deterministic lexical routes and live edge changes replan without teleporting',()=>{
 const paths=network(),agent=paths.addAgent({...agentParameters,id:'car'});assert.deepEqual(agent.route,['a','b','c']);
 for(let n=0;n<30;n++)paths.tick(1/60);const x=agent.x;assert.ok(x>0);assert.equal(paths.setEdge('bc',false),true);assert.deepEqual(agent.route,['a','b','a','d','c']);assert.equal(agent.x,x);
 for(let n=0;n<180;n++)paths.tick(1/60);assert.ok(agent.y>0);assert.ok(paths.snapshot().agents[0].route.includes('d'));
 const again=network(),other=again.addAgent({...agentParameters,id:'car'});assert.deepEqual(other.route,agent.route.length?['a','b','c']:other.route);
});

test('headway spacing queues agents and closed gates emit pathBlocked before opening',()=>{
 const events=[],paths=createPathNetwork({id:'roads.network',nodes,edges:edges.slice(0,2),gates:[{id:'signal',parameters:{networkBehaviorId:'roads.network',nodeId:'b',mode:'closed',openSeconds:3,closedSeconds:2,holdSeconds:0,phaseOffsetSeconds:0}}],onEvent:(kind,event)=>events.push({kind,...event})});
 const first=paths.addAgent({...agentParameters,id:'car.a'}),second=paths.addAgent({...agentParameters,id:'car.b'});
 for(let n=0;n<120;n++)paths.tick(1/60);
 assert.ok(first.x-second.x>=33.9);assert.ok(events.some(event=>event.kind==='pathBlocked'));
 paths.setGate('signal','open',0);for(let n=0;n<180;n++)paths.tick(1/60);
 assert.equal(first.active,false);assert.equal(second.active,false);assert.ok(events.some(event=>event.kind==='pathArrive'&&event.nodeId==='c'));
});

test('spawnOnPath, shortcut unlock, target changes, and gate actions stay editable JSON operations',()=>{
 const base=[
  {kind:'createComponent',component:{id:'roads',contract:'native.group.v1',parameters:{width:390,height:700}}},behavior('roads.network','roads','path-network',{nodes,edges}),
  behavior('roads.signal','roads','path-gate',{networkBehaviorId:'roads.network',nodeId:'b',mode:'open',openSeconds:3,closedSeconds:2,holdSeconds:1,phaseOffsetSeconds:0}),
  {kind:'createComponent',component:{id:'car',contract:'native.ellipse.v1',prototype:true,parameters:{width:20,height:20}}},behavior('car.agent','car','path-agent',agentParameters),
  {kind:'createComponent',component:{id:'shortcut',contract:'native.button.v1',transform:[1,0,0,1,220,500],parameters:{width:140,height:80}}},
  {kind:'putVariable',variable:{id:'deliveries',label:'Deliveries',type:'number',initial:0}},
  {kind:'putBinding',binding:{id:'spawn.car',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'spawnOnPath',prototypeId:'car',networkBehaviorId:'roads.network',startNode:'a',targetNode:'c'}]}},
  {kind:'putBinding',binding:{id:'open.shortcut',event:{kind:'click',componentId:'shortcut'},actions:[{kind:'setPathEdge',behaviorId:'roads.network',edgeId:'bc',enabled:false},{kind:'setPathGate',behaviorId:'roads.signal',mode:'open',holdSeconds:0},{kind:'setPathTarget',componentId:'car',targetNode:'d'}]}},
  {kind:'putBinding',binding:{id:'delivered',event:{kind:'pathArrive',componentId:'car'},actions:[{kind:'add',variableId:'deliveries',value:1}]}},
 ];
 const h=harness(base);try{h.advance(.5);let state=h.runtime.state();assert.equal(state.instances.length,1);assert.equal(Object.values(state.paths)[0].activeAgents,1);h.event('pointerdown',280,540);h.event('pointerup',280,540);h.advance(2);state=h.runtime.state();assert.ok(Object.values(state.paths)[0].agents[0].route.includes('d'));assert.equal(state.diagnostics.length,0);}finally{h.close();}
});

test('variable comparisons, bounded compute, smooth value meters, and camera-follow compose',()=>{
 const operations=[
  {kind:'createComponent',component:{id:'world',contract:'native.group.v1',parameters:{width:800,height:700}}},
  {kind:'createComponent',component:{id:'hero',contract:'native.ellipse.v1',parentId:'world',transform:[1,0,0,1,590,340],parameters:{width:20,height:20}}},behavior('world.camera','world','camera-follow',{targetId:'hero',minX:0,maxX:800,minY:0,maxY:700,smoothing:30,zoom:1}),
  {kind:'createComponent',component:{id:'meter',contract:'native.rectangle.v1',transform:[1,0,0,1,20,100],parameters:{width:100,height:20}}},behavior('meter.value','meter','value-meter',{variableId:'cash',min:0,max:100,axis:'x',direction:'positive',smoothingSeconds:0}),
  {kind:'createComponent',component:{id:'upgrade',contract:'native.button.v1',transform:[1,0,0,1,100,500],parameters:{width:160,height:80}}},
  {kind:'putVariable',variable:{id:'cash',label:'Cash',type:'number',initial:100}},{kind:'putVariable',variable:{id:'cost',label:'Cost',type:'number',initial:50}},
  {kind:'putBinding',binding:{id:'buy',event:{kind:'click',componentId:'upgrade'},condition:{variableId:'cash',op:'gte',compareVariableId:'cost'},actions:[{kind:'compute',variableId:'cash',op:'sub',value:0,operandVariableId:'cost',round:true}]}},
 ];
 const h=harness(operations);try{h.event('pointerdown',180,540);h.event('pointerup',180,540);h.advance(.1);const state=h.runtime.state();assert.equal(state.variables.cash,50);assert.ok(Math.abs(state.components.meter.transform[0]-.5)<1e-8);assert.ok(state.components.world.transform[4]<0);const audit=h.runtime.auditSceneLayout({minTouchPx:1});assert.ok(!audit.defects.some(defect=>defect.kind==='stage-overflow'&&defect.id==='hero'));h.event('pointerdown',180,540);h.event('pointerup',180,540);assert.equal(h.runtime.state().variables.cash,0);}finally{h.close();}
});

test('path networks reject duplicate nodes, dangling edges, and invalid network references',()=>{
 const base=[{kind:'createComponent',component:{id:'roads',contract:'native.group.v1'}}];
 assert.throws(()=>applyOperations(emptyProject({id:'bad-path',name:'Bad path'}),[...base,behavior('roads.network','roads','path-network',{nodes:[nodes[0],nodes[0]],edges:[edges[0]]})]),/E_NATIVE_PATH/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-edge',name:'Bad edge'}),[...base,behavior('roads.network','roads','path-network',{nodes:[nodes[0],nodes[1]],edges:[{id:'bad',from:'a',to:'missing'}]})]),/E_NATIVE_PATH/);
 assert.throws(()=>applyOperations(emptyProject({id:'bad-agent',name:'Bad agent'}),[...base,behavior('car.agent','roads','path-agent',agentParameters)]),/E_NATIVE_PATH/);
});

test('mid-segment replan, post-arrival setTarget, edge speedScale, spawnAt instance targeting, and non-zero value-meter init stay exact',()=>{
 const fastNodes=[{id:'a',x:0,y:0},{id:'b',x:100,y:0},{id:'c',x:200,y:0},{id:'d',x:200,y:100},{id:'e',x:100,y:100}];
 const fastEdges=[{id:'ab',from:'a',to:'b',speedScale:2,bidirectional:true},{id:'bc',from:'b',to:'c',speedScale:1,bidirectional:true},{id:'cd',from:'c',to:'d',bidirectional:true},{id:'be',from:'b',to:'e',bidirectional:true},{id:'ed',from:'e',to:'d',bidirectional:true}];
 const paths=createPathNetwork({id:'fast.net',nodes:fastNodes,edges:fastEdges});
 const agent=paths.addAgent({...agentParameters,id:'truck',networkBehaviorId:'fast.net',startNode:'a',targetNode:'d',speed:100,spacing:0,loop:'none'});
 // Advance past node b onto segment 1 (b -> c), then trigger a mid-segment replan (must reset segment=0 without crashing).
 for(let n=0;n<45;n++)paths.tick(1/60);
 assert.equal(agent.segment,1);
 assert.equal(paths.setEdge('cd',false),true);
 assert.equal(agent.segment,0);
 for(let n=0;n<300;n++)paths.tick(1/60);
 assert.equal(agent.active,false);assert.ok(Math.hypot(agent.x-200,agent.y-100)<1);
 // Calling setTarget after arrival must start cleanly from d with distance=0 (no teleport!).
 assert.equal(paths.setTarget('truck','e'),true);
 assert.equal(agent.segment,0);assert.equal(agent.distance,0);
 paths.tick(1/60);
 assert.ok(Math.hypot(agent.x-200,agent.y-100)<5);

 // Runtime checks: value-meter starts from initial variable value (not min), compute omits value when operandVariableId is used,
 // spawnOnPath positions immediately on frame 0 and preserves authored +90deg prototype heading, and spawnAt resolves live event.instanceId.
 const ops=[
  {kind:'createComponent',component:{id:'city',contract:'native.group.v1',transform:[1,0,0,1,0,200],parameters:{width:390,height:400}}},
  behavior('city.net','city','path-network',{nodes:[{id:'a',x:50,y:100},{id:'b',x:250,y:100}],edges:[{id:'ab',from:'a',to:'b',bidirectional:true}]}),
  {kind:'createComponent',component:{id:'car',contract:'native.rectangle.v1',prototype:true,transform:[0,1,-1,0,0,0],parameters:{width:20,height:40}}},
  behavior('car.agent','car','path-agent',{networkBehaviorId:'city.net',startNode:'a',targetNode:'b',speed:100,spacing:0,cornerRadius:0,orientToPath:'rotate',loop:'none',active:true}),
  {kind:'createComponent',component:{id:'spark',contract:'native.ellipse.v1',prototype:true,parameters:{width:10,height:10}}},
  {kind:'createComponent',component:{id:'hp',contract:'native.rectangle.v1',transform:[1,0,0,1,20,20],parameters:{width:100,height:16}}},
  behavior('hp.meter','hp','value-meter',{variableId:'health',min:0,max:100,axis:'x',direction:'positive',smoothingSeconds:.5}),
  {kind:'putVariable',variable:{id:'health',label:'Health',type:'number',initial:80}},
  {kind:'putVariable',variable:{id:'damage',label:'Damage',type:'number',initial:30}},
  {kind:'putBinding',binding:{id:'spawn.car',event:{kind:'sceneEnter',sceneId:'scene.play'},actions:[{kind:'spawnOnPath',prototypeId:'car',networkBehaviorId:'city.net',startNode:'a',targetNode:'b'}]}},
  {kind:'putBinding',binding:{id:'on.arrive',event:{kind:'pathArrive',componentId:'car'},actions:[{kind:'compute',variableId:'health',op:'sub',operandVariableId:'damage',round:true},{kind:'spawnAt',prototypeId:'spark',targetComponentId:'car',offsetX:0,offsetY:0}]}},
 ];
 const h=harness(ops);
 try{
  // After the first simulation tick, car is already positioned near start node (50, 100) and rotated +90deg (heading=0 + base=90deg).
  h.advance(2/60);
  const early=h.runtime.state();
  assert.ok(Math.abs(early.components.hp.transform[0]-.8)<.01);
  const carInst=early.instances.find(item=>item.prototypeId==='car');
  assert.ok(carInst);
  const carT=early.components[carInst.id].transform;
  assert.ok(Math.abs(carT[0])<.05&&carT[1]>.95); // cos(90)=0, sin(90)=1 -> nose facing +X!
  h.advance(2.3);
  const done=h.runtime.state();
  assert.equal(done.variables.health,50);
  const spark=done.instances.find(item=>item.prototypeId==='spark');
  assert.ok(spark);
  // Spawned at live car arrival world position (250, 200+100=300), NOT prototype (0,0)!
  assert.ok(Math.abs(spark.x-(250-5))<3&&Math.abs(spark.y-(300-5))<3);
  assert.deepEqual(done.diagnostics,[]);
 }finally{h.close();}
});


test('iso-4 maps all four isometric diagonal headings [SE, SW, NW, NE] to frames [0, 1, 2, 3]',()=>{
 const isoNodes=[{id:'top',x:100,y:0},{id:'right',x:200,y:50},{id:'bottom',x:100,y:100},{id:'left',x:0,y:50}];
 const isoEdges=[{id:'tr',from:'top',to:'right'},{id:'rb',from:'right',to:'bottom'},{id:'bl',from:'bottom',to:'left'},{id:'lt',from:'left',to:'top'}];
 const paths=createPathNetwork({id:'iso.net',nodes:isoNodes,edges:isoEdges});
 const se=paths.addAgent({...agentParameters,id:'se',networkBehaviorId:'iso.net',startNode:'top',targetNode:'right',orientToPath:'iso-4'});
 const sw=paths.addAgent({...agentParameters,id:'sw',networkBehaviorId:'iso.net',startNode:'right',targetNode:'bottom',orientToPath:'iso-4'});
 const nw=paths.addAgent({...agentParameters,id:'nw',networkBehaviorId:'iso.net',startNode:'bottom',targetNode:'left',orientToPath:'iso-4'});
 const ne=paths.addAgent({...agentParameters,id:'ne',networkBehaviorId:'iso.net',startNode:'left',targetNode:'top',orientToPath:'iso-4'});
 assert.deepEqual([se.frame,sw.frame,nw.frame,ne.frame],[0,1,2,3]);
 paths.tick(1/60);
 assert.deepEqual([se.frame,sw.frame,nw.frame,ne.frame],[0,1,2,3]);
});

test('isometric Traffic Tycoon exports both targets, passes Creative QA, and builds all 3 road gaps to Market',async()=>{
 const {project,assets}=await createTrafficProof(),output='reports/native-primitives/traffic';await mkdir(output,{recursive:true});
 for(const target of ['standalone-browser-draft','unity-ads-ua-playable']){const artifact=await compileNative(project,{assets,target});assert.ok(artifact.manifest.bytes<500_000,`expected lean compressed HTML <500KB, got ${artifact.manifest.bytes}`);await writeFile(`${output}/${target==='standalone-browser-draft'?'standalone':'index'}.html`,artifact.html);if(target==='unity-ads-ua-playable')assert.equal(artifact.manifest.status,'ASSEMBLED_UNVERIFIED');}
 const browser=await chromium.launch({headless:true}),errors=[];
 try{
  const qa=await runCreativeQa({htmlPath:`${output}/standalone.html`,outputDir:`${output}/qa`,browser});assert.equal(qa.ok,true,JSON.stringify(qa.blockers));
  const page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',error=>errors.push(error.message));await page.goto(`file://${process.cwd()}/${output}/standalone.html`);await page.waitForFunction(()=>globalThis.toraRuntime);
  await page.waitForTimeout(450);await page.screenshot({path:`${output}/opening.png`});
  const clickButton=async id=>{
   const bounds=await page.evaluate(targetId=>globalThis.toraRuntime.auditSceneLayout().interactive.find(item=>item.id===targetId)?.bounds,id);
   assert.ok(bounds,`interactive pad ${id} must be visible`);
   await page.mouse.click((bounds.left+bounds.right)/2,72+(bounds.top+bounds.bottom)/2);
  };
  // Tap Gap 1 -> road snaps in, prompt hides, car drives toward Gap 2, Gap 2 pad appears
  await clickButton('gap1.btn');
  await page.waitForTimeout(300);await page.screenshot({path:`${output}/gap1-built.png`});
  let state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.roads,1);
  assert.equal(state.variables['gap1.built'],true);
  assert.equal(state.components['map.gap1'].parameters.visible,true);
  assert.equal(state.components['gap2.btn'].parameters.visible,true);
  // Tap Gap 2 -> road snaps in, car drives toward Gap 3, Gap 3 pad appears
  await clickButton('gap2.btn');
  await page.waitForTimeout(300);await page.screenshot({path:`${output}/gap2-built.png`});
  state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.roads,2);
  assert.equal(state.components['map.gap2'].parameters.visible,true);
  assert.equal(state.components['gap3.btn'].parameters.visible,true);
  // Tap Gap 3 -> road complete, car drives into Market -> scene.win!
  await clickButton('gap3.btn');
  await page.waitForFunction(()=>globalThis.toraRuntime.state().scene==='scene.win',undefined,{timeout:15000});
  await page.waitForTimeout(600);await page.screenshot({path:`${output}/end-card.png`});
  state=await page.evaluate(()=>globalThis.toraRuntime.state());
  assert.equal(state.variables.roads,3);
  assert.deepEqual(state.diagnostics,[]);await page.close();
 }finally{await browser.close();}
 assert.deepEqual(errors,[]);
});
