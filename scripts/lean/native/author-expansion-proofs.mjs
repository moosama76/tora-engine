import process from 'node:process';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {mkdir,writeFile} from 'node:fs/promises';
import {AssetCatalog} from './asset-catalog.mjs';
import {emptyProject,applyOperations} from './document.mjs';
import {compileNative} from './compiler.mjs';

async function proofAssets(requests){
 const catalog=new AssetCatalog();await catalog.load();const assets=[],records=[];
 for(const [id,sourceId,name,collection] of requests){
  const entry=[...catalog.entries.values()].find(asset=>asset.sourceId===sourceId&&asset.name===name&&(!collection||asset.tags.includes(collection)));if(!entry)throw Error('Missing proof asset '+sourceId+'/'+name);
  const bytes=await catalog.bytes(entry.id),record={id,hash:entry.sha256,mime:entry.mime,bytes:bytes.length,rights:entry.rights,provenance:JSON.stringify(entry.provenance)};records.push(record);assets.push({...record,data:bytes.toString('base64')});
 }
 return {assets,records};
}
const component=(id,contract,parameters={},extra={})=>({kind:'createComponent',component:{id,contract,parameters,...extra}});
const behavior=(id,componentId,kind,parameters)=>({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
const binding=(id,event,actions,condition)=>({kind:'putBinding',binding:{id,event,actions,...(condition?{condition}:{})}});
const image=(id,assetId,x,y,width=64,height=64,extra={})=>component(id,'native.image.v1',{width,height,fit:'contain',smoothing:false},{transform:[1,0,0,1,x,y],assetSlots:[{slotId:'source',assetId}],...extra});
const text=(id,value,x,y,width,height,fontSize=24,extra={})=>component(id,'native.text.v1',{text:value,width,height,fontSize,fontFamily:'pixel',color:'#fff0bd',align:'center'}, {transform:[1,0,0,1,x,y],...extra});
const group=(id,x=0,y=0,width=390,height=700,extra={})=>component(id,'native.group.v1',{width,height},{transform:[1,0,0,1,x,y],...extra});
const layout=(id,x,y,scaleX=1,scaleY=scaleX,anchor='none')=>behavior(id+'.layout',id,'responsive-layout',{x,y,scaleX,scaleY,anchor,respectSafeArea:false,marginX:16,marginY:16});
const drag=(id,tag='crop')=>behavior(id+'.drag',id,'drag',{axis:'both',snapBack:true,snapBackSeconds:.16,bringToFront:true,tag});
const zone=(id,onOccupied='emit',acceptTags=['crop'])=>behavior(id+'.zone',id,'drop-zone',{acceptTags,snapMode:'center',capacity:1,onOccupied,radiusPx:0,highlightColor:'#ffe66d'});
const emitter=(id,componentId,coverage='local')=>behavior(id,componentId,'emitter',{count:32,color:'#ffe66d',color2:'#95bf48',color3:'#fff0bd',speed:150,lifetime:.8,gravity:220,spread:360,shape:'pixel-confetti',coverage,origin:'center',direction:-90});
const audio=(id,componentId,role,bus='sfx',loop=false,volume=.3)=>behavior(id,componentId,'audio',{bus,loop,volume,frequency:660,seconds:.15,cooldownMs:45,pitchJitter:0,pitchStep:0,role,allowSynthFallback:false});

export async function createFarmMergeProof(){
 const {assets,records}=await proofAssets([
  ['farm.crop.1','kenney-tiny-farm','tile_0029.png'],['farm.crop.2','kenney-tiny-farm','tile_0020.png'],['farm.crop.3','kenney-tiny-farm','tile_0030.png'],['farm.crate.art','kenney-tiny-farm','tile_0047.png'],
  ['farm.ambient','tarush-singhal-happy-ukelele','ambient.wav','casual'],['farm.match','kenney-interface-sounds','match.wav','casual'],['farm.win','kenney-music-jingles','win.wav','casual'],
 ]);
 const ops=[group('farm.hud',0,0),group('farm.board',25,225,340,220),group('farm.end.hero',95,130,200,200,{sceneId:'scene.win'}),group('farm.end.ui',0,370,390,260,{sceneId:'scene.win'}),group('farm.audio',0,0,1,1,{parameters:{width:1,height:1,visible:false}}),
  layout('farm.hud',345,70,.85),layout('farm.board',44,102,.85),layout('farm.end.hero',75,95,1),layout('farm.end.ui',320,95,.82),
  group('farm.background',0,0,390,700,{order:-10}),layout('farm.background',0,0,700/390,390/700),component('farm.background.fill','native.rectangle.v1',{width:390,height:700,fill:'#254b3c',strokeWidth:0},{parentId:'farm.background'}),
  text('farm.title','FARM MERGE',60,52,270,52,32,{parentId:'farm.hud'}),text('farm.prompt','DRAG TO MERGE',75,110,240,34,18,{parentId:'farm.hud'}),text('farm.score','0 / 3',135,152,120,34,20,{parentId:'farm.hud'}),
  group('farm.end.back',0,0,390,700,{sceneId:'scene.win',order:-10}),layout('farm.end.back',0,0,700/390,390/700),component('farm.end.back.fill','native.rectangle.v1',{width:390,height:700,fill:'#254b3c',strokeWidth:0},{sceneId:'scene.win',parentId:'farm.end.back'}),
  image('farm.end.crop','farm.crop.3',0,0,200,200,{parentId:'farm.end.hero',sceneId:'scene.win'}),text('farm.end.title','BUMPER CROP',20,0,350,54,32,{parentId:'farm.end.ui',sceneId:'scene.win'}),
  component('farm.end.cta','native.button.v1',{width:260,height:78,fill:'#f2b544',hoverFill:'#ffe66d',pressedFill:'#d88b32',stroke:'#3c2933',strokeWidth:4,radius:8,presentation:'shiny-cta'},{parentId:'farm.end.ui',sceneId:'scene.win',transform:[1,0,0,1,65,92]}),
  text('farm.end.cta.label','GROW NOW',10,8,240,58,26,{parentId:'farm.end.cta',sceneId:'scene.win'}),
  behavior('farm.end.cta.float','farm.end.cta','animation',{property:'y',from:92,to:84,seconds:.8,loop:true,fromCurrent:false,delay:0,easing:'ease-in-out'}),
  behavior('farm.end.hero.bob','farm.end.hero','animation',{property:'y',from:130,to:118,seconds:1.1,loop:true,fromCurrent:false,delay:0,easing:'ease-in-out'}),
  binding('farm.end.enter',{kind:'sceneEnter',sceneId:'scene.win'},[{kind:'animate',behaviorId:'farm.end.hero.bob'},{kind:'animate',behaviorId:'farm.end.cta.float'},{kind:'emit',behaviorId:'farm.end.confetti'},{kind:'playAudio',behaviorId:'farm.win.sound'}]),
  binding('farm.end.store',{kind:'click',componentId:'farm.end.cta'},[{kind:'store'}]),emitter('farm.end.confetti','farm.end.hero','screen'),
 ];
 ops.push({kind:'createScene',scene:{id:'scene.win',label:'Harvest complete',role:'end-card'}});
 const slots=[];for(let row=0;row<2;row++)for(let column=0;column<3;column++){
  const id=`farm.slot.${row}.${column}`,x=column*120,y=row*120;slots.push(id);ops.push(component(id,'native.rectangle.v1',{width:100,height:100,fill:'#3c5d42',stroke:'#8ba35c',strokeWidth:4,radius:10},{parentId:'farm.board',transform:[1,0,0,1,x,y]}),zone(id,'swap',[]));
 }
 const cropIds=['farm.crop.a','farm.crop.b','farm.crop.c','farm.crop.d'];cropIds.forEach((id,index)=>{const slot=slots[index],slotComponent=ops.find(op=>op.component?.id===slot).component,[x,y]=[slotComponent.transform[4]+18,slotComponent.transform[5]+18];ops.push(image(id,'farm.crop.1',x,y,64,64,{parentId:'farm.board',order:2}),drag(id),zone(id,'emit'),emitter(id+'.burst',id));});
 ops.push(image('farm.crate','farm.crate.art',138,138,64,64,{parentId:'farm.board',order:2}),drag('farm.crate','crate'));
 ops.push(image('farm.tier2','farm.crop.2',0,0,64,64,{prototype:true}),drag('farm.tier2'),zone('farm.tier2','emit'),emitter('farm.tier2.burst','farm.tier2'),image('farm.tier3','farm.crop.3',0,0,64,64,{prototype:true}));
 for(let first=0;first<cropIds.length;first++)for(let second=0;second<cropIds.length;second++){
  if(first===second)continue;
  const a=cropIds[first],b=cropIds[second];ops.push(binding(`farm.merge.${first}.${second}`,{kind:'dragDrop',componentId:a,otherId:b},[{kind:'add',variableId:'farm.merges',value:1},{kind:'spawnAt',prototypeId:'farm.tier2',targetComponentId:a,offsetX:0,offsetY:0,at:'midpoint'},{kind:'setComponent',componentId:a,key:'visible',value:false},{kind:'setComponent',componentId:b,key:'visible',value:false},{kind:'emit',behaviorId:a+'.burst'},{kind:'playAudio',behaviorId:'farm.match.sound'}]));
 }
 ops.push(binding('farm.merge.final',{kind:'dragDrop',componentId:'farm.tier2',otherId:'farm.tier2'},[{kind:'add',variableId:'farm.merges',value:1},{kind:'spawnAt',prototypeId:'farm.tier3',targetComponentId:'farm.tier2',offsetX:0,offsetY:0,at:'midpoint'},{kind:'despawn',target:'both'},{kind:'emit',behaviorId:'farm.tier2.burst'},{kind:'changeScene',sceneId:'scene.win'}]));
 for(const [id,assetId,role,bus,loop,volume] of [['ambient','farm.ambient','ambient','music',true,.12],['match','farm.match','match','sfx',false,.35],['win','farm.win','win','stinger',false,.45]])ops.push(component('farm.audio.'+id,'native.group.v1',{width:1,height:1,visible:false},{parentId:'farm.audio',assetSlots:[{slotId:'source',assetId}]}),audio('farm.'+id+'.sound','farm.audio.'+id,role,bus,loop,volume));
 ops.push({kind:'putVariable',variable:{id:'farm.merges',label:'Merges',type:'number',initial:0}});
 for(const dragId of [...cropIds,'farm.crate'])ops.push(binding('farm.music.'+dragId,{kind:'dragStart',componentId:dragId},[{kind:'playAudio',behaviorId:'farm.ambient.sound'}]));
 const project=applyOperations(emptyProject({id:'farm-merge-proof',name:'Farm Merge',androidUrl:'https://play.google.com/store/apps/details?id=com.tora.farmmerge'}),[...records.map(asset=>({kind:'registerAsset',asset})),...ops]).project;
 project.components.find(c=>c.id==='farm.score').parameters.text='{{farm.merges}} / 3';
 return {project,assets};
}

export async function createStarBastionProof(){
 const {assets,records}=await proofAssets([
  ['star.background.art','kenney-space-shooter-redux','darkPurple.png'],['star.player.art','kenney-space-shooter-redux','playerShip1_blue.png'],['star.bolt.art','kenney-space-shooter-redux','fire03.png'],['star.enemy.art','kenney-space-shooter-redux','meteorBrown_med1.png'],['star.pickup.art','kenney-space-shooter-redux','powerupYellow_star.png'],
  ['star.ambient','3xblast-pop-punk-chiptune','ambient.wav','arcade'],['star.match','kenney-interface-sounds','match.wav','arcade'],['star.win','kenney-music-jingles','win.wav','arcade'],
 ]);
 const ops=[group('star.world',0,0),group('star.hud',0,0),group('star.fire.group',0,0),group('star.end.hero',135,120,120,160,{sceneId:'scene.win'}),group('star.end.ui',0,350,390,280,{sceneId:'scene.win'}),group('star.audio',0,0,1,1,{parameters:{width:1,height:1,visible:false}}),
  layout('star.world',25,0,.58),layout('star.hud',400,45,.8),layout('star.fire.group',352,-210,.8),layout('star.end.hero',75,95,1.2),layout('star.end.ui',330,90,.8),
  group('star.background',0,0,390,700,{order:-10}),layout('star.background',0,0,700/390,390/700),
  component('star.background.fill','native.rectangle.v1',{width:390,height:700,fill:'#3a2e3f',strokeWidth:0},{parentId:'star.background',order:-1}),
  image('star.background.image','star.background.art',0,0,390,700,{parentId:'star.background',order:0,parameters:{width:390,height:700,fit:'cover',smoothing:false}}),
  text('star.title','STAR BASTION',65,42,260,52,30,{parentId:'star.hud'}),text('star.prompt','TAP TO FIRE',85,102,220,34,18,{parentId:'star.hud'}),text('star.kills.label','{{star.kills}} / 1',135,142,120,34,20,{parentId:'star.hud'}),
  component('star.fire','native.button.v1',{width:170,height:64,fill:'#f2b544',hoverFill:'#ffe66d',pressedFill:'#d88b32',stroke:'#241b38',strokeWidth:4,radius:8,presentation:'shiny-cta'},{parentId:'star.fire.group',transform:[1,0,0,1,110,580]}),text('star.fire.label','FIRE',10,8,150,46,24,{parentId:'star.fire'}),
  group('star.spawner',145,235,100,40,{parentId:'star.world',parameters:{width:100,height:40,visible:false}}),image('star.player','star.player.art',145,490,90,90,{parentId:'star.world'}),
  behavior('star.player.state','star.player','instance-state',{hp:1,maxHp:1,value:0,tag:'player',team:'player'}),behavior('star.player.collider','star.player','collider',{shape:'circle'}),
  component('star.input','native.rectangle.v1',{width:350,height:300,fill:'#3a2e3f',strokeWidth:0,opacity:.01},{parentId:'star.world',transform:[1,0,0,1,20,200],order:-1}),behavior('star.world.timer','star.world','timer',{seconds:1.2,repeat:true}),
  image('star.bolt.prototype','star.bolt.art',0,0,28,28,{prototype:true}),behavior('star.bolt.body','star.bolt.prototype','physics-body',{mode:'dynamic',shape:'circle',restitution:0,friction:0,linearDamping:0,gravity:0,maxSpeed:900,restSpeed:1,restDelaySeconds:.1,wallBounce:false,spinToRotation:true}),behavior('star.bolt.collider','star.bolt.prototype','collider',{shape:'circle'}),
  component('star.enemy.prototype','native.group.v1',{width:80,height:80},{prototype:true}),image('star.enemy.image','star.enemy.art',0,0,80,80,{parentId:'star.enemy.prototype'}),component('star.enemy.hp','native.rectangle.v1',{width:80,height:8,fill:'#70e087',strokeWidth:0},{parentId:'star.enemy.prototype',transform:[1,0,0,1,0,-14]}),
  behavior('star.enemy.state','star.enemy.prototype','instance-state',{hp:2,maxHp:2,value:0,tag:'meteor',team:'enemy'}),behavior('star.enemy.meter','star.enemy.hp','value-meter',{instanceField:'hp',min:0,max:1,axis:'x',direction:'positive',smoothingSeconds:.05}),behavior('star.enemy.collider','star.enemy.prototype','collider',{shape:'circle'}),behavior('star.enemy.steer','star.enemy.prototype','steer',{mode:'chase',targetMode:'nearest-team',team:'player',speed:24,turnRateDegPerSec:180,maxRangePx:0,orientToVelocity:false}),
  image('star.pickup.prototype','star.pickup.art',0,0,44,44,{prototype:true}),behavior('star.pickup.state','star.pickup.prototype','instance-state',{hp:1,maxHp:1,value:0,tag:'pickup',team:'pickup'}),behavior('star.pickup.collider','star.pickup.prototype','collider',{shape:'circle'}),behavior('star.pickup.steer','star.pickup.prototype','steer',{mode:'chase',targetMode:'nearest-team',team:'player',speed:170,turnRateDegPerSec:720,maxRangePx:0,orientToVelocity:false}),
  binding('star.opening',{kind:'sceneEnter',sceneId:'scene.play'},[{kind:'spawnAt',prototypeId:'star.enemy.prototype',targetComponentId:'star.spawner',offsetX:0,offsetY:0,count:1,jitterX:45,jitterY:0},{kind:'playAudio',behaviorId:'star.ambient.sound'}]),
  binding('star.auto',{kind:'timer',behaviorId:'star.world.timer'},[{kind:'spawnAt',prototypeId:'star.bolt.prototype',targetComponentId:'star.player',offsetX:0,offsetY:0},{kind:'launchToward',componentId:'star.bolt.prototype',targetMode:'nearest-team',team:'enemy',speed:360}]),
  binding('star.fire.action',{kind:'click',componentId:'star.fire'},[{kind:'spawnAt',prototypeId:'star.bolt.prototype',targetComponentId:'star.player',offsetX:0,offsetY:0},{kind:'launchToward',componentId:'star.bolt.prototype',targetMode:'nearest-team',team:'enemy',speed:420},{kind:'playAudio',behaviorId:'star.match.sound'}]),
  binding('star.pointer.fire',{kind:'click',componentId:'star.input'},[{kind:'spawnAt',prototypeId:'star.bolt.prototype',targetComponentId:'star.player',offsetX:0,offsetY:0},{kind:'launchToward',componentId:'star.bolt.prototype',targetMode:'pointer',speed:420},{kind:'playAudio',behaviorId:'star.match.sound'}]),
  binding('star.hit',{kind:'contactBegin',componentId:'star.bolt.prototype',otherId:'star.enemy.prototype'},[{kind:'modifyInstanceState',target:'other',componentId:'star.enemy.prototype',field:'hp',op:'sub',value:1},{kind:'despawn',target:'self'},{kind:'playAudio',behaviorId:'star.match.sound'}],{instanceTarget:'other',instanceField:'hp',op:'gt',value:0}),
  binding('star.depleted',{kind:'instanceDepleted',componentId:'star.enemy.prototype'},[{kind:'add',variableId:'star.kills',value:1},{kind:'spawnAt',prototypeId:'star.pickup.prototype',targetComponentId:'star.enemy.prototype',offsetX:0,offsetY:0},{kind:'despawn',target:'self'}]),
  binding('star.collect',{kind:'contactBegin',componentId:'star.pickup.prototype',otherId:'star.player'},[{kind:'despawn',target:'self'},{kind:'changeScene',sceneId:'scene.win'}]),
  {kind:'createScene',scene:{id:'scene.win',label:'Sector saved',role:'end-card'}},
  group('star.end.back',0,0,390,700,{sceneId:'scene.win',order:-10}),layout('star.end.back',0,0,700/390,390/700),
  component('star.end.back.fill','native.rectangle.v1',{width:390,height:700,fill:'#3a2e3f',strokeWidth:0},{sceneId:'scene.win',parentId:'star.end.back',order:-1}),
  image('star.end.back.image','star.background.art',0,0,390,700,{sceneId:'scene.win',parentId:'star.end.back',order:0,parameters:{width:390,height:700,fit:'cover',smoothing:false}}),
  image('star.end.ship','star.player.art',0,0,120,120,{parentId:'star.end.hero',sceneId:'scene.win'}),text('star.end.title','SECTOR SAVED',20,0,350,54,30,{parentId:'star.end.ui',sceneId:'scene.win'}),
  component('star.end.cta','native.button.v1',{width:260,height:78,fill:'#f2b544',hoverFill:'#ffe66d',pressedFill:'#d88b32',stroke:'#241b38',strokeWidth:4,radius:8,presentation:'shiny-cta'},{parentId:'star.end.ui',sceneId:'scene.win',transform:[1,0,0,1,65,92]}),text('star.end.cta.label','LAUNCH NOW',10,8,240,58,24,{parentId:'star.end.cta',sceneId:'scene.win'}),
  behavior('star.end.hero.bob','star.end.hero','animation',{property:'y',from:120,to:105,seconds:1,loop:true,fromCurrent:false,delay:0,easing:'ease-in-out'}),behavior('star.end.cta.float','star.end.cta','animation',{property:'y',from:92,to:84,seconds:.8,loop:true,fromCurrent:false,delay:0,easing:'ease-in-out'}),emitter('star.end.confetti','star.end.hero','screen'),
  binding('star.end.enter',{kind:'sceneEnter',sceneId:'scene.win'},[{kind:'animate',behaviorId:'star.end.hero.bob'},{kind:'animate',behaviorId:'star.end.cta.float'},{kind:'emit',behaviorId:'star.end.confetti'},{kind:'playAudio',behaviorId:'star.win.sound'}]),binding('star.end.store',{kind:'click',componentId:'star.end.cta'},[{kind:'store'}]),
  {kind:'putVariable',variable:{id:'star.kills',label:'Kills',type:'number',initial:0}},
 ];
 for(const [id,assetId,role,bus,loop,volume] of [['ambient','star.ambient','ambient','music',true,.12],['match','star.match','match','sfx',false,.35],['win','star.win','win','stinger',false,.45]])ops.push(component('star.audio.'+id,'native.group.v1',{width:1,height:1,visible:false},{parentId:'star.audio',assetSlots:[{slotId:'source',assetId}]}),audio('star.'+id+'.sound','star.audio.'+id,role,bus,loop,volume));
 const project=applyOperations(emptyProject({id:'star-bastion-proof',name:'Star Bastion',androidUrl:'https://play.google.com/store/apps/details?id=com.tora.starbastion'}),[...records.map(asset=>({kind:'registerAsset',asset})),...ops]).project;return {project,assets};
}

export async function createFrostCleanProof(){
 const {assets,records}=await proofAssets([
  ['frost.crop','kenney-tiny-farm','tile_0020.png'],['frost.hero','kenney-tiny-farm','tile_0030.png'],['frost.ambient','tarush-singhal-happy-ukelele','ambient.wav','casual'],['frost.match','kenney-interface-sounds','match.wav','casual'],['frost.win','mintodog-cozy-puzzle-jingle','victory.mp3'],
 ]);
 const ops=[group('frost.world',0,0),group('frost.hud',0,0),group('frost.end.hero',95,130,200,200,{sceneId:'scene.win'}),group('frost.end.ui',0,370,390,260,{sceneId:'scene.win'}),group('frost.audio',0,0,1,1,{parameters:{width:1,height:1,visible:false}}),
  layout('frost.world',45,-80,.72),layout('frost.hud',330,75,.85),layout('frost.end.hero',75,95,1),layout('frost.end.ui',320,95,.82),
  group('frost.background',0,0,390,700,{order:-10}),layout('frost.background',0,0,700/390,390/700),component('frost.background.fill','native.rectangle.v1',{width:390,height:700,fill:'#254b3c',strokeWidth:0},{parentId:'frost.background'}),
  text('frost.title','FROST HARVEST',60,42,270,52,30,{parentId:'frost.hud'}),text('frost.prompt','CLEAN THE CROP',75,102,240,34,18,{parentId:'frost.hud'}),
  component('frost.frame','native.rectangle.v1',{width:240,height:240,fill:'#3c5d42',stroke:'#fff0bd',strokeWidth:5,radius:12},{parentId:'frost.world',transform:[1,0,0,1,75,230],order:0}),
  image('frost.crop.image','frost.crop',95,250,200,200,{parentId:'frost.world',order:1}),
  component('frost.cover','native.rectangle.v1',{width:200,height:200,fill:'#d7f2f0',stroke:'#8fc7c5',strokeWidth:4,radius:8},{parentId:'frost.world',transform:[1,0,0,1,95,250],order:2}),behavior('frost.cover.mask','frost.cover','erase-mask',{mode:'erase',brushRadiusPx:36,gridSize:24,targetPercent:65,progressVariableId:'frost.progress',maskColor:'#d7f2f0'}),
  {kind:'putVariable',variable:{id:'frost.progress',label:'Cleaned',type:'number',initial:0}},text('frost.progress.label','{{frost.progress}} / 65',115,490,160,38,22,{parentId:'frost.world'}),
  binding('frost.cleaned',{kind:'maskComplete',componentId:'frost.cover'},[{kind:'playAudio',behaviorId:'frost.match.sound'},{kind:'changeScene',sceneId:'scene.win'}]),
  {kind:'createScene',scene:{id:'scene.win',label:'Frost cleared',role:'end-card'}},
  group('frost.end.back',0,0,390,700,{sceneId:'scene.win',order:-10}),layout('frost.end.back',0,0,700/390,390/700),component('frost.end.back.fill','native.rectangle.v1',{width:390,height:700,fill:'#254b3c',strokeWidth:0},{sceneId:'scene.win',parentId:'frost.end.back'}),
  image('frost.end.crop','frost.hero',0,0,200,200,{parentId:'frost.end.hero',sceneId:'scene.win'}),text('frost.end.title','FRESH PICK',20,0,350,54,32,{parentId:'frost.end.ui',sceneId:'scene.win'}),
  component('frost.end.cta','native.button.v1',{width:260,height:78,fill:'#f2b544',hoverFill:'#ffe66d',pressedFill:'#d88b32',stroke:'#3c2933',strokeWidth:4,radius:8,presentation:'shiny-cta'},{parentId:'frost.end.ui',sceneId:'scene.win',transform:[1,0,0,1,65,92]}),text('frost.end.cta.label','HARVEST NOW',10,8,240,58,24,{parentId:'frost.end.cta',sceneId:'scene.win'}),
  behavior('frost.end.hero.bob','frost.end.hero','animation',{property:'y',from:130,to:118,seconds:1.1,loop:true,fromCurrent:false,delay:0,easing:'ease-in-out'}),behavior('frost.end.cta.float','frost.end.cta','animation',{property:'y',from:92,to:84,seconds:.8,loop:true,fromCurrent:false,delay:0,easing:'ease-in-out'}),emitter('frost.end.confetti','frost.end.hero','screen'),
  binding('frost.end.enter',{kind:'sceneEnter',sceneId:'scene.win'},[{kind:'animate',behaviorId:'frost.end.hero.bob'},{kind:'animate',behaviorId:'frost.end.cta.float'},{kind:'emit',behaviorId:'frost.end.confetti'},{kind:'playAudio',behaviorId:'frost.win.sound'}]),binding('frost.end.store',{kind:'click',componentId:'frost.end.cta'},[{kind:'store'}]),
 ];
 for(const [id,assetId,role,bus,loop,volume] of [['ambient','frost.ambient','ambient','music',true,.12],['match','frost.match','match','sfx',false,.35],['win','frost.win','win','stinger',false,.45]])ops.push(component('frost.audio.'+id,'native.group.v1',{width:1,height:1,visible:false},{parentId:'frost.audio',assetSlots:[{slotId:'source',assetId}]}),audio('frost.'+id+'.sound','frost.audio.'+id,role,bus,loop,volume));
 ops.push(binding('frost.music',{kind:'maskProgress',componentId:'frost.cover'},[{kind:'playAudio',behaviorId:'frost.ambient.sound'}]));
 const project=applyOperations(emptyProject({id:'frost-clean-proof',name:'Frost Harvest',androidUrl:'https://play.google.com/store/apps/details?id=com.tora.frostharvest'}),[...records.map(asset=>({kind:'registerAsset',asset})),...ops]).project;return {project,assets};
}

async function main(){
 const kind=process.argv[2]??'farm',output=resolve(process.argv[3]??'reports/native-expansion/'+kind);if(!['farm','star','frost'].includes(kind))throw Error('Unknown proof '+kind);
 const {project,assets}=await (kind==='farm'?createFarmMergeProof():kind==='star'?createStarBastionProof():createFrostCleanProof());await mkdir(output,{recursive:true});
 for(const target of ['standalone-browser-draft','unity-ads-ua-playable','applovin-growth-playable']){const artifact=await compileNative(project,{assets,target}),file=target==='standalone-browser-draft'?resolve(output,'standalone.html'):resolve(output,target,'index.html');await mkdir(dirname(file),{recursive:true});await writeFile(file,artifact.html);await writeFile(file.replace(/\.html$/,'.manifest.json'),JSON.stringify(artifact.manifest,null,2));}
 await writeFile(resolve(output,'project.json'),JSON.stringify(project,null,2));globalThis.console.log(output);
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
