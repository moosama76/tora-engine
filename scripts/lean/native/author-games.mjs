import process from 'node:process';
import {Buffer} from 'node:buffer';
/** Reproducible public-HTTP authoring clients. This file contains artwork/data, never runtime branches. */
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL,URL} from 'node:url';
export class AuthoringClient{
 constructor(origin){this.origin=origin;}
 async request(path,body){const response=await globalThis.fetch(this.origin+path,body?{method:'POST',headers:{'Content-Type':'application/json',Origin:this.origin},body:JSON.stringify(body)}:{}),data=await response.json();if(!response.ok)throw Error(response.status+' '+data.error+' '+path);return data;}
 async create(id,name){this.id=id;await this.request('/api/creation/capabilities');this.current=await this.request('/api/projects',{id,name,kind:'native-scene'});if(this.current.project.components.length)throw Error('Creation was not empty');return this.current;}
 expected(){return {revisionId:this.current.revisionId,contentHash:this.current.contentHash};}
 async transaction(operations){const envelope={format:'tora-transaction-1',expected:this.expected(),operations},preview=await this.request('/api/projects/'+this.id+'/transactions/preview',envelope);this.current=await this.request('/api/projects/'+this.id+'/transactions',{...envelope,previewDigest:preview.previewDigest});return this.current;}
 async export(){return this.request('/api/projects/'+this.id+'/export',{revisionId:this.current.revisionId,target:'standalone-browser-draft'});}
}
function art(){const operations=[],counts=new Map();const add=(id,kind,x,y,width,height,parameters={},parentId,sceneId='scene.play',extra={})=>{const key=parentId??sceneId,order=counts.get(key)??0;counts.set(key,order+1);operations.push({kind:'createComponent',component:{id,label:id.split('.').slice(-2).join(' '),contract:'native.'+kind+'.v1',sceneId,...(parentId?{parentId}:{}),order,transform:[1,0,0,1,x,y],parameters:{width,height,...parameters},...extra}});return id;};
 const rect=(id,x,y,w,h,fill,radius=0,parent,scene,extra={})=>add(id,'rectangle',x,y,w,h,{fill,radius,...extra},parent,scene);
 const ellipse=(id,x,y,w,h,fill,parent,scene,extra={})=>add(id,'ellipse',x,y,w,h,{fill,...extra},parent,scene);
 const text=(id,value,x,y,w,h,size=22,color='#ffffff',parent,scene,extra={})=>add(id,'text',x,y,w,h,{text:value,fontSize:size,color,...extra},parent,scene);
 const group=(id,x,y,w,h,parent,scene,extra)=>add(id,'group',x,y,w,h,{},parent,scene,extra);
 const path=(id,x,y,w,h,fill,commands,parent,scene,extra={})=>add(id,'path',x,y,w,h,{fill,commands,...extra},parent,scene);
 const behavior=(id,componentId,kind,parameters)=>{operations.push({kind:'putBehavior',behavior:{id,componentId,kind,parameters:kind==='audio'?{loop:false,volume:.09,...parameters}:parameters}});return id;};
 const binding=(id,event,actions,condition)=>operations.push({kind:'putBinding',binding:{id,event,actions,...(condition?{condition}:{})}});
 const variable=(id,label,initial)=>operations.push({kind:'putVariable',variable:{id,label,type:typeof initial,initial}});
 const scene=(id,label,role)=>{if(!operations.some(o=>o.kind==='createScene'&&o.scene.id===id))operations.push({kind:'createScene',scene:{id,label,role}});};
 return {operations,add,rect,ellipse,text,group,path,behavior,binding,variable,scene};}
const colors={night:'#173e49',teal:'#226674',sky:'#a9dfda',cream:'#fff0ce',yellow:'#ffd166',red:'#eb6847',ink:'#18343c',skin:'#f6bd8b'};
const burst=[[0,43],[9,39],[15,25],[19,36],[32,33],[24,22],[43,16],[30,12],[43,0],[43,16],[56,12],[47,22],[66,33],[54,36],[58,25],[69,39],[78,43],[69,47],[63,61],[54,50],[50,64],[43,53],[36,64],[32,50],[23,61],[15,47],[9,43],[0,43]].map(([x,y],i)=>i?['L',x,y]:['M',x,y]);
function endCards(a,title='CITY HEROES!',subtitle='Every rescue makes a difference.',theme='rescue'){
 const rays=burst.map(([command,x,y])=>[command,x*346/86,y*346/86]);
 for(const [id,heading,copy]of [['scene.success',title,subtitle],['scene.failure','ONE MORE TRY?',theme==='rescue'?'The city still needs its heroes.':'Bring back a little sunshine.']]){
  const s=id.endsWith('success')?'success':'failure',root=s+'.world';
  a.scene(id,s==='success'?'Success':'Try again','end-card');
  a.group(root,0,0,390,700,undefined,id);
  a.rect(s+'.background',0,0,390,700,colors.night,0,root,id);
  a.rect(s+'.background.band',0,0,390,180,'#1c4a56',0,root,id);
  a.ellipse(s+'.halo',28,72,334,334,'#245e69',root,id,{opacity:.9});
  a.path(s+'.rays',22,66,346,346,s==='success'?colors.yellow:colors.sky,rays,root,id,{opacity:.24});
  a.group(s+'.medal',135,142,120,120,root,id);
  a.ellipse(s+'.medal.disc',0,0,120,120,colors.yellow, s+'.medal',id);
  a.ellipse(s+'.medal.ring',9,9,102,102,s==='success'?'#ffe3a0':'#a9dfda',s+'.medal',id);
  a.text(s+'.medal.star',s==='success'?'★':'↻',0,0,120,120,74,colors.night,s+'.medal',id);
  a.text(s+'.title',heading,15,290,360,50,35,colors.cream,root,id);
  a.text(s+'.message',copy,20,347,350,50,17,colors.sky,root,id);
  a.text(s+'.score',theme==='rescue'?'{{score}} / 8':'{{score}} / 6',20,407,350,35,17,colors.yellow,root,id);
  a.add(s+'.cta','button',45,472,300,82,{presentation:'shiny-cta',fill:colors.yellow,stroke:colors.ink,strokeWidth:3,radius:18},root,id);
  a.text(s+'.cta.label',theme==='rescue'?'BECOME A HERO':'KEEP SHINING',0,0,300,82,20,colors.night,s+'.cta',id);
  a.behavior(s+'.cta.press',s+'.cta','press-feedback',{scaleDown:.94,springBackSeconds:.16,liftShadow:true});
  a.behavior(s+'.cta.pulse',s+'.cta','animation',{property:'y',from:469,to:475,seconds:.95,loop:true,easing:'ease-in-out'});
  a.binding(s+'.store',{kind:'click',componentId:s+'.cta'},[{kind:'store'}]);
  a.behavior(s+'.celebrate',s+'.medal','emitter',s==='success'?{shape:'confetti',coverage:'screen',count:60,color:colors.yellow,color2:'#4ecdc4',color3:'#ff6b6b',speed:180,lifetime:2.2,gravity:70}:{count:20,color:colors.sky,speed:70});
  a.behavior(s+'.sound',s+'.medal','audio',{frequency:s==='success'?1046:196,seconds:s==='success'?.65:.3,volume:.12,bus:'stinger',role:s==='success'?'win':'loss'});a.operations.push({kind:'replaceAsset',id:s+'.medal',assetId:s==='success'?'asset.win':'asset.loss'});
  a.behavior(s+'.medal.pulse',s+'.medal','animation',{property:'scale',from:1,to:1.07,seconds:1.6,loop:true});
  a.behavior(s+'.rays.pulse',s+'.rays','animation',{property:'opacity',from:.12,to:.42,seconds:2.2,loop:true});
  a.binding(s+'.entry',{kind:'sceneEnter',sceneId:id},[{kind:'animate',behaviorId:s+'.medal.pulse'},{kind:'animate',behaviorId:s+'.rays.pulse'},{kind:'animate',behaviorId:s+'.cta.pulse'},{kind:'emit',behaviorId:s+'.celebrate'},{kind:'playAudio',behaviorId:s+'.sound'}]);
 }
}
function firefighter(a,id,x,parent){const c=colors;a.group(id,x,15,50,78,parent);a.ellipse(id+'.shadow',1,65,48,9,'#123b46',id);a.rect(id+'.arm.left',1,32,7,25,c.yellow,3,id);a.rect(id+'.arm.right',42,32,7,25,c.yellow,3,id);a.rect(id+'.coat',8,30,34,30,c.yellow,9,id);a.rect(id+'.stripe',8,44,34,6,c.cream,0,id);a.rect(id+'.belt',8,52,34,4,c.ink,0,id);a.rect(id+'.left.boot',6,59,14,12,c.ink,4,id);a.rect(id+'.right.boot',29,59,14,12,c.ink,4,id);a.ellipse(id+'.face',10,12,30,29,c.skin,id);a.ellipse(id+'.helmet',4,3,42,22,c.red,id);a.rect(id+'.helmet.brim',1,18,48,7,c.red,3,id);a.rect(id+'.helmet.badge',21,6,9,12,c.yellow,3,id);a.ellipse(id+'.eye.left',17,27,3,4,c.ink,id);a.ellipse(id+'.eye.right',31,27,3,4,c.ink,id);a.group(id+'.moustache',15,33,22,8,id);a.ellipse(id+'.moustache.left',0,0,13,7,c.ink,id+'.moustache');a.ellipse(id+'.moustache.right',9,0,13,7,c.ink,id+'.moustache');a.ellipse(id+'.hand.left',-2,33,12,12,c.skin,id);a.ellipse(id+'.hand.right',40,33,12,12,c.skin,id);}
export function dingDangOperations(){const a=art(),c=colors;
 a.variable('score','Rescue points',0);a.variable('mistakes','Mistakes',0);
 a.scene('scene.success','Success','end-card');a.scene('scene.failure','Try again','end-card');
 a.group('world',0,0,390,700);
 // The sky is a dedicated parallax lane: gradient bands, a procedural sun, and drifting clouds.
 a.group('sky',0,0,390,700,'world');
 a.rect('sky.band.0',0,0,390,260,'#b9e9e1',0,'sky');a.rect('sky.band.1',0,260,390,220,'#a3ded7',0,'sky');a.rect('sky.band.2',0,480,390,220,'#8fd0ca',0,'sky');
 a.group('sun',292,105,86,86,'sky');
 a.path('sun.burst',0,0,86,86,'#ffe9ad',burst,'sun');
 a.ellipse('sun.glow',0,0,86,86,'#ffe9ad','sun',undefined,{opacity:.55});a.ellipse('sun.disc',12,12,62,62,c.yellow,'sun');
 for(const [n,x,y,w,h]of [[0,12,46,124,46],[1,252,174,116,42],[2,118,236,96,36]]){const id='cloud.'+n;a.group(id,x,y,w,h,'sky');a.ellipse(id+'.a',0,14,w*.58,h*.68,c.cream,id,undefined,{opacity:.92});a.ellipse(id+'.b',w*.28,0,w*.5,h*.9,c.cream,id);a.ellipse(id+'.c',w*.54,16,w*.46,h*.6,'#e8fbf7',id,undefined,{opacity:.9});}
 // Backdrop blocks sit in their own skyline group so the building reads as the focal frame.
 a.group('skyline',0,0,390,700,'world');
 a.path('skyline.hills',0,210,390,220,'#75b8b8',[['M',0,80],['L',70,26],['L',150,62],['L',238,20],['L',320,58],['L',390,32],['L',390,220],['L',0,220],['Z']],'skyline',undefined,{opacity:.55});
 for(const [n,x,y,w]of [[0,0,150,70],[1,280,170,75],[2,330,130,60]]){const id='skyline.'+n;a.group(id,x,y,w,420,'skyline');a.rect(id+'.body',0,0,w,420,'#86c6c4',8,id);for(let i=0;i<3;i++)a.rect(id+'.window.'+i,12,25+i*48,12,22,'#a9dfda',3,id);}
 a.group('building',25,207,330,350,'world');
 a.rect('building.shadow',10,25,330,330,'#1b4b59',10,'building');a.rect('building.facade',0,13,330,330,'#3a8591',8,'building');a.rect('building.roof',-10,0,350,20,c.night,6,'building');
 a.rect('building.band',0,58,330,13,'#2a626e',0,'building');a.rect('building.band.lower',0,268,330,13,'#2a626e',0,'building');
 a.group('building.sign',96,16,138,42,'building');a.rect('building.sign.board',0,0,138,42,c.cream,8,'building.sign');a.text('building.sign.text','STATION 8',0,0,138,42,18,c.night,'building.sign','scene.play',{fontWeight:'900',align:'center'});
 a.group('building.door',137,282,56,60,'building');a.rect('building.door.frame',0,0,56,60,c.night,7,'building.door');a.rect('building.door.leaf',5,5,46,55,'#235b68',5,'building.door');a.ellipse('building.door.knob',38,29,6,6,c.yellow,'building.door');a.rect('building.door.transom',7,8,42,10,'#9dd5ce',3,'building.door');
 a.group('windows',0,0,330,350,'building');
 for(let row=0;row<2;row++)for(let col=0;col<3;col++){const id='window.'+row+'.'+col,x=30+col*97,y=72+row*114;a.group(id,x,y,76,72,'windows');a.rect(id+'.frame',0,0,76,72,'#9dd5ce',5,id);a.rect(id+'.glass',6,6,64,60,c.night,3,id);a.rect(id+'.cross',35,6,5,60,'#408993',0,id);a.rect(id+'.sill',-5,65,86,9,c.cream,3,id);}
 a.group('building.antenna',270,-48,24,56,'building');a.rect('building.antenna.mast',10,10,3,46,c.night,1,'building.antenna');a.ellipse('building.antenna.light',5,0,13,13,c.yellow,'building.antenna');a.ellipse('building.antenna.glow',0,-5,23,23,'#ffe9ad','building.antenna',undefined,{opacity:.5});
 // Layered fire frames: two silhouettes per flame cross-fade to imply real frame animation.
 a.group('blaze',35,245,280,96,'building');
 for(let i=0;i<4;i++){const id='fire.'+i,x=i*66,y=(i%2)*10;a.group(id,x,y,55,82,'blaze');a.ellipse(id+'.glow',-8,22,70,62,'#ffb26b',id,undefined,{opacity:.3});a.path(id+'.frame.a',0,0,55,82,i%2?'#eb6847':'#f07a45',[['M',0,82],['Q',-3,43,22,0],['Q',20,31,37,39],['Q',55,62,48,82],['Z']],id);a.path(id+'.frame.b',2,3,51,79,i%2?'#ffb95b':'#eb6847',[['M',0,79],['Q',1,45,17,8],['Q',22,33,31,41],['Q',48,58,43,79],['Z']],id,undefined,{opacity:.7});a.ellipse(id+'.core',17,49,23,31,c.yellow,id,undefined,{opacity:.85});}
 a.group('smoke',18,-78,244,82,'blaze');
 for(let i=0;i<4;i++)a.ellipse('smoke.'+i,i===0?0:i*61,5+(i%2)*14,58,42,i%2?'#769693':'#8eaca3','smoke',undefined,{opacity:.72});
 // Street: sidewalks, road, crosswalk, and two lamp pools of light.
 a.group('street',0,547,390,153,'world');
 a.rect('street.curb',0,0,390,16,c.cream,0,'street');a.rect('street.road',0,16,390,137,c.night,0,'street');a.rect('street.gutter',0,16,390,6,'#1d4a57',0,'street');
 for(let i=0;i<5;i++)a.rect('street.mark.'+i,i*75+10,92,45,4,'#41626a',2,'street');
 for(const [side,x]of [['left',8],['right',322]]){const id='street.lamp.'+side;a.group(id,x,-42,60,92,'street');a.rect(id+'.pole',26,8,5,84,c.night,2,id);a.rect(id+'.arm',26,8,20,5,c.night,2,id);a.ellipse(id+'.pool',0,68,60,20,'#ffe9ad',id,undefined,{opacity:.24});a.ellipse(id+'.bulb',39,7,12,12,c.yellow,id);}
 // The rescue crew, trampoline aura, and held trampoline share one parent.
 a.group('team',116,550,158,100,'world');
 a.group('team.aura',15,-20,128,70,'team');a.ellipse('team.aura.outer',0,0,128,70,'#ffe9ad','team.aura',undefined,{opacity:.18});a.ellipse('team.aura.inner',19,11,90,48,c.yellow,'team.aura',undefined,{opacity:.14});
 firefighter(a,'ding',0,'team');firefighter(a,'dang',108,'team');
 a.group('trampoline',40,10,88,24,'team');a.rect('trampoline.mesh',5,5,78,8,c.sky,4,'trampoline');a.rect('trampoline.rim',0,0,88,7,c.red,3,'trampoline');a.rect('trampoline.frame',5,13,78,6,c.cream,3,'trampoline');a.rect('trampoline.spring.left',0,7,8,12,c.cream,2,'trampoline');a.rect('trampoline.spring.right',80,7,8,12,c.cream,2,'trampoline');
 // HUD and instruction lane.
 a.group('hud',0,0,390,700,'world');
 a.rect('hud.header',0,0,390,145,c.night,0,'hud');a.rect('hud.header.strip',0,139,390,6,c.yellow,0,'hud');a.text('hud.title','DING & DANG',60,28,270,50,35,c.cream,'hud');
 a.rect('hud.counter',20,104,166,34,'#2e6470',12,'hud');a.text('hud.saved','POINTS  {{score}} / 8',20,104,166,34,16,c.yellow,'hud');a.rect('hud.lives',203,104,166,34,'#2e6470',12,'hud');a.text('hud.missed','MISSED  {{mistakes}} / 3',203,104,166,34,14,c.cream,'hud');
 a.rect('hud.instruction.panel',18,151,258,38,c.cream,14,'hud');a.text('hud.instruction','DRAG TO CATCH',22,151,250,38,13,c.night,'hud');
 a.group('hud.live',20,58,24,24,'hud');for(let i=0;i<3;i++)a.ellipse('hud.live.'+i,1+i*8,1+(i%2)*5,5,5,i===2?c.yellow:c.sky,'hud.live',undefined,{opacity:.75});
 // Foreground atmosphere provides slow particles and twinkles without touching gameplay.
 a.group('atmosphere',0,0,390,700,'world');a.group('atmosphere.anchor',188,352,14,14,'atmosphere');
 for(let i=0;i<3;i++){const id='atmosphere.spark.'+i,x=[74,286,210][i],y=[312,356,224][i];a.path(id,x,y,14,14,colors.cream,[['M',7,0],['L',9,5],['L',14,7],['L',9,9],['L',7,14],['L',5,9],['L',0,7],['L',5,5],['Z']],'atmosphere',undefined,{opacity:.5});}
 // Music is asset-backed; the sky itself owns the looping player.
 a.operations.push({kind:'replaceAsset',id:'sky.band.0',assetId:'asset.music'});a.behavior('city.music','sky.band.0','audio',{frequency:220,seconds:1,loop:true,volume:.04,bus:'music',role:'ambient'});a.binding('city.start.music',{kind:'click',componentId:'team'},[{kind:'playAudio',behaviorId:'city.music'}]);
 // Interaction and effect behaviors.
 a.behavior('team.drag','team','drag',{axis:'x'});a.behavior('team.tutorial','hud','tutorial-hand',{targetId:'team',mode:'drag',idleDelaySeconds:1.5,hideOnFirstInput:true});a.behavior('trampoline.collider','trampoline','collider',{shape:'box'});
 a.operations.push({kind:'replaceAsset',id:'trampoline',assetId:'asset.reward'},{kind:'replaceAsset',id:'team.aura',assetId:'asset.reject'});
 a.behavior('rescue.particles','trampoline','emitter',{count:42,color:c.yellow,speed:165});a.behavior('rescue.sparkle','trampoline','emitter',{count:24,color:c.cream,speed:235});a.behavior('rescue.sound','trampoline','audio',{frequency:740,seconds:.17,bus:'sfx',role:'reward',pitchJitter:.08});a.behavior('mistake.sound','team.aura','audio',{frequency:150,seconds:.22,bus:'sfx',role:'reject'});a.behavior('rescue.bounce','trampoline','animation',{property:'scale',from:1.16,to:1,seconds:.3,loop:false});a.behavior('rescue.aura','team.aura','animation',{property:'scale',from:1,to:1.16,seconds:.34,loop:false});
 // Prototypes are authored templates with a single root parent per family.
 a.behavior('mistake.particles','prototype.hazard','emitter',{count:20,color:c.red,speed:105});
 for(const [id,kind]of [['resident','person'],['cat','cat'],['hazard','hazard']]){a.group('prototype.'+id,10,260,28,42,undefined,'scene.play',{prototype:true});const parent='prototype.'+id;if(kind==='person'){a.rect(parent+'.body',3,18,22,22,'#f49c7a',7,parent);a.ellipse(parent+'.head',3,0,22,23,c.skin,parent);a.ellipse(parent+'.hair',2,-2,24,12,c.ink,parent);a.ellipse(parent+'.eye.left',8,12,3,3,c.ink,parent);a.ellipse(parent+'.eye.right',17,12,3,3,c.ink,parent);a.rect(parent+'.scarf',0,20,28,5,c.yellow,2,parent);}else if(kind==='cat'){a.ellipse(parent+'.body',1,12,27,26,c.cream,parent);a.path(parent+'.ears',0,-2,28,22,c.cream,[['M',0,20],['L',1,0],['L',12,9],['L',24,0],['L',28,20],['Z']],parent);a.ellipse(parent+'.eye.left',6,17,4,4,c.ink,parent);a.ellipse(parent+'.eye.right',18,17,4,4,c.ink,parent);a.ellipse(parent+'.nose',12,24,5,4,c.red,parent);a.path(parent+'.tail',21,22,14,20,c.cream,[['M',0,18],['Q',17,16,8,0]],parent,undefined,{stroke:c.cream,strokeWidth:4,fill:c.cream});}else{a.ellipse(parent+'.warning',-8,-5,44,44,'#ed7251',parent);a.path(parent+'.flame',0,0,28,35,c.yellow,[['M',0,35],['Q',-2,18,14,0],['Q',12,17,24,17],['Q',32,28,28,35],['Z']],parent);a.text(parent+'.alert','!',4,14,20,23,21,c.night,parent);}
  a.behavior(parent+'.motion',parent,'motion',{vx:0,vy:42,gravity:id==='hazard'?115:88});a.behavior(parent+'.collider',parent,'collider',{shape:'box'});
  const catchActions=id==='hazard'?[{kind:'add',variableId:'mistakes',value:1},{kind:'emit',behaviorId:'mistake.particles'},{kind:'playAudio',behaviorId:'mistake.sound'},{kind:'cameraShake',intensity:8,seconds:.25},{kind:'screenFlash',color:c.red,opacity:.22,seconds:.2},{kind:'despawn'}]:[{kind:'add',variableId:'score',value:id==='cat'?2:1},{kind:'emit',behaviorId:'rescue.particles'},{kind:'emit',behaviorId:'rescue.sparkle'},{kind:'playAudio',behaviorId:'rescue.sound'},{kind:'animate',behaviorId:'rescue.bounce'},{kind:'animate',behaviorId:'rescue.aura'},{kind:'floatingText',text:id==='cat'?'+2 CAT!':'+1 SAVED!',componentId:'trampoline',color:c.yellow,fontSize:20,risePx:44,seconds:.7},{kind:'despawn'}];a.binding(parent+'.catch',{kind:'contactBegin',componentId:parent,otherId:'trampoline'},catchActions);a.binding(parent+'.miss',{kind:'boundaryExit',componentId:parent},id==='hazard'?[{kind:'despawn'}]:[{kind:'add',variableId:'mistakes',value:1},{kind:'playAudio',behaviorId:'mistake.sound'},{kind:'cameraShake',intensity:5,seconds:.18},{kind:'despawn'}]);}
 // Authored schedules retain the tuned 28-second rescue loop.
 const schedule=[['resident',58,1.3],['cat',266,3.4],['hazard',165,5.2],['resident',162,6.4],['resident',58,8.5],['cat',266,10.6],['hazard',58,12.4],['resident',162,13.6],['cat',60,15.7],['resident',266,17.8],['resident',162,19.6],['cat',58,21.5]];
 for(const [i,[type,x,seconds]]of schedule.entries()){a.behavior('schedule.'+i,'sky.band.0','timer',{seconds,repeat:false});a.binding('spawn.'+i,{kind:'timer',behaviorId:'schedule.'+i},[{kind:'spawn',prototypeId:'prototype.'+type,x,y:265}]);}
 a.behavior('deadline','sky.band.0','timer',{seconds:28,repeat:false});a.binding('deadline.failure',{kind:'timer',behaviorId:'deadline'},[{kind:'changeScene',sceneId:'scene.failure'}]);a.binding('goal',{kind:'variableChange',variableId:'score'},[{kind:'changeScene',sceneId:'scene.success'}],{variableId:'score',op:'gte',value:8});a.binding('loss',{kind:'variableChange',variableId:'mistakes'},[{kind:'changeScene',sceneId:'scene.failure'}],{variableId:'mistakes',op:'gte',value:3});
 // Ambient frame animation is started once per scene entry by a single reviewed binding.
 const ambient=[];
 const anim=(id,componentId,property,from,to,seconds,loop=true)=>ambient.push((a.behavior(id,componentId,'animation',{property,from,to,seconds,loop}),{kind:'animate',behaviorId:id}));
 anim('ambient.sun.burst','sun.burst','opacity',.35,.8,2.4);anim('ambient.sun.bob','sun.disc','y',12,6,2.8);
 for(let i=0;i<3;i++){const cloud='cloud.'+i;anim('ambient.cloud.'+i,cloud,'x',i===0?12:i===1?252:118,i===0?40:i===1?230:105,26+i*5);}
 for(let i=0;i<4;i++){const f='fire.'+i,dir=i%2?1:-1;
  anim('ambient.fire.'+i+'.a','fire.'+i+'.frame.a','opacity',.62,1,.28+i*.05);anim('ambient.fire.'+i+'.b','fire.'+i+'.frame.b','opacity',.92,.38,.34+i*.04);anim('ambient.fire.'+i+'.core','fire.'+i+'.core','opacity',.55,1,.22+i*.03);
  anim('ambient.fire.'+i+'.a.x',f+'.frame.a','x',0,dir*4,.38+i*.04);anim('ambient.fire.'+i+'.a.y',f+'.frame.a','y',0,-8-i,.32+i*.03);anim('ambient.fire.'+i+'.a.scale',f+'.frame.a','scale',.9,1.1,.5+i*.05);
  anim('ambient.fire.'+i+'.b.x',f+'.frame.b','x',2,2-dir*4,.45+i*.05);anim('ambient.fire.'+i+'.b.y',f+'.frame.b','y',3,-5-i,.38+i*.02);
  anim('ambient.fire.'+i+'.core.x',f+'.core','x',17,17+dir*3,.3+i*.04);anim('ambient.fire.'+i+'.core.y',f+'.core','y',49,42-i,.28+i*.02);anim('ambient.fire.'+i+'.glow.scale',f+'.glow','scale',.78,1.18,.55+i*.04);
  anim('ambient.smoke.'+i,'smoke.'+i,'y',5+(i%2)*14,-26+(i%2)*10,5.6+i*.9);anim('ambient.smoke.'+i+'.x','smoke.'+i,'x',[0,61,122,183][i],[0,61,122,183][i]+(i%2?8:-8),5.6+i*.9);}
 for(const [id,phase]of [['ding',1],['dang',-1]]){
  anim('ambient.'+id+'.arm.left',id+'.arm.left','y',32,32+phase*8,.48);anim('ambient.'+id+'.arm.right',id+'.arm.right','y',32,32-phase*8,.48);
  anim('ambient.'+id+'.hand.left',id+'.hand.left','y',33,33+phase*8,.48);anim('ambient.'+id+'.hand.right',id+'.hand.right','y',33,33-phase*8,.48);
  anim('ambient.'+id+'.boot.left.y',id+'.left.boot','y',59,59-phase*9,.48);anim('ambient.'+id+'.boot.left.x',id+'.left.boot','x',6,6-phase*5,.48);
  anim('ambient.'+id+'.boot.right.y',id+'.right.boot','y',59,59+phase*6,.48);anim('ambient.'+id+'.boot.right.x',id+'.right.boot','x',29,29+phase*5,.48);
 }
 anim('ambient.ding','ding','y',15,12.5,.48);anim('ambient.dang','dang','y',15,17.5,.48);anim('ambient.ding.x','ding','x',0,3,.96);anim('ambient.dang.x','dang','x',108,105,.96);anim('ambient.trampoline','trampoline','scale',.98,1.02,1.1);anim('ambient.strip','hud.header.strip','opacity',.55,1,1.8);anim('ambient.antenna','building.antenna.glow','opacity',.18,.75,1.25);
 for(let i=0;i<3;i++)anim('ambient.spark.'+i,'atmosphere.spark.'+i,'opacity',.15,.8,1.5+i*.7);
 for(const [i,seconds]of [[0,3.4],[2,4.6],[5,5.3]])anim('ambient.window.'+i,'window.'+Math.floor(i/3)+'.'+(i%3)+'.glass','opacity',.72,1,seconds);
 anim('ambient.lamp.left','street.lamp.left.bulb','opacity',.45,1,2.3);anim('ambient.lamp.right','street.lamp.right.bulb','opacity',.45,1,2.7);
 for(let i=0;i<ambient.length;i+=30)a.binding('scene.ambient.'+i,{kind:'sceneEnter',sceneId:'scene.play'},ambient.slice(i,i+30));
 a.behavior('atmosphere.embers','atmosphere.anchor','emitter',{count:4,color:'#ffb95b',speed:58});a.behavior('atmosphere.timer','atmosphere.anchor','timer',{seconds:1.1,repeat:true});a.binding('atmosphere.emit',{kind:'timer',behaviorId:'atmosphere.timer'},[{kind:'emit',behaviorId:'atmosphere.embers'}]);
 a.behavior('blaze.embers','blaze','emitter',{count:7,color:'#ffb95b',speed:82});a.behavior('blaze.timer','blaze','timer',{seconds:.65,repeat:true});a.binding('blaze.emit',{kind:'timer',behaviorId:'blaze.timer'},[{kind:'emit',behaviorId:'blaze.embers'}]);
 endCards(a);return a.operations;}
export function tapScoreOperations(){const a=art(),c=colors;a.variable('score','Score',0);a.variable('mistakes','Misses',0);a.group('world',0,0,390,700);a.rect('tap.background',0,0,390,700,'#183e49',0,'world');a.ellipse('tap.halo',35,215,320,320,'#245e69','world');a.text('tap.kicker','A DIFFERENT TORA PLAYABLE',60,50,270,28,12,c.sky,'world');a.text('tap.title','GOLDEN HOUR',20,91,350,50,33,c.cream,'world');a.text('tap.instructions','TAP THE SUN · COLLECT 6 SPARKS',20,165,350,35,14,c.sky,'world');a.text('tap.counter','{{score}} / 6 SPARKS',20,550,350,40,23,c.yellow,'world');a.add('tap.target','button',115,290,160,160,{fill:c.yellow,radius:80},'world');a.text('tap.sun','✦',0,0,160,160,110,c.night,'tap.target');a.operations.push({kind:'replaceAsset',id:'tap.target',assetId:'asset.tap'});a.behavior('tap.particles','tap.target','emitter',{count:32,color:c.yellow,speed:160});a.behavior('tap.audio','tap.target','audio',{frequency:880,seconds:.15,bus:'sfx',role:'tap',pitchVariableId:'score',pitchStep:1.5});a.behavior('tap.press','tap.target','press-feedback',{scaleDown:.92,springBackSeconds:.18,liftShadow:true});a.behavior('tap.tutorial','world','tutorial-hand',{targetId:'tap.target',mode:'tap',idleDelaySeconds:1.2,hideOnFirstInput:true});a.behavior('tap.pulse','tap.target','animation',{property:'scale',from:.9,to:1,seconds:.2,loop:false});a.binding('tap.click',{kind:'click',componentId:'tap.target'},[{kind:'add',variableId:'score',value:1},{kind:'emit',behaviorId:'tap.particles'},{kind:'playAudio',behaviorId:'tap.audio'},{kind:'animate',behaviorId:'tap.pulse'},{kind:'floatingText',text:'+1 SPARK!',componentId:'tap.target',color:c.cream,fontSize:22,risePx:48,seconds:.65},{kind:'screenFlash',color:c.yellow,opacity:.14,seconds:.16}]);a.binding('tap.goal',{kind:'variableChange',variableId:'score'},[{kind:'changeScene',sceneId:'scene.success'}],{variableId:'score',op:'gte',value:6});endCards(a,'GOLDEN MOMENT','Six sparks. One brighter day.','sun');return a.operations;}
export function musicAsset(){const rate=16000,seconds=6,n=rate*seconds,bytes=Buffer.alloc(44+n*2);bytes.write('RIFF',0);bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate*2,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(n*2,40);const notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23,261.63,329.63,392,523.25];for(let i=0;i<n;i++){const t=i/rate,beat=t%.5,f=notes[Math.floor(t/.5)],envelope=Math.sin(Math.PI*beat/.5)*Math.exp(-beat*5);const sample=(Math.sin(t*f*Math.PI*2)*.5+Math.sin(t*f*2*Math.PI*2)*.13+Math.sin(t*130.815*Math.PI*2)*.18)*envelope;bytes.writeInt16LE(Math.round(sample*16000),44+i*2);}return {id:'asset.music',mime:'audio/wav',data:bytes.toString('base64'),rights:'Original six-second synthesized melody authored by Tora for this project; no third-party samples.'};}
async function curatedAudioAsset(id,role){
 const receipt=JSON.parse(await readFile(new URL('../../../assets/free-audio/casual-warm/audio-conversion.json',import.meta.url),'utf8'));
 const cue=receipt.cues.find(row=>row.role===role);if(!cue)throw Error('Missing curated audio cue: '+role);
 const bytes=await readFile(new URL('../../../'+cue.outputFile,import.meta.url));
 return {id,mime:'audio/wav',data:bytes.toString('base64'),rights:`CC0 ${cue.sourceId}; converted from ${cue.sourceFile}; ${cue.outputSha256}; receipt assets/free-audio/casual-warm/audio-conversion.json.`};
}
export async function authorGame(origin,id,kind){
 const client=new AuthoringClient(origin);await client.create(id,kind==='rescue'?'Ding & Dang · City Rescue Deluxe':'Golden Hour · Tap to score');
 await client.transaction([{kind:'setStore',url:'https://play.google.com/store/apps/details?id=com.playablelab.garden'}]);
 const cues=kind==='rescue'?{'asset.music':'ambient','asset.reward':'reward','asset.reject':'reject','asset.win':'win','asset.loss':'loss'}:{'asset.tap':'tap','asset.win':'win','asset.loss':'loss'};
 for(const [assetId,role]of Object.entries(cues)){const asset=await curatedAudioAsset(assetId,role);client.current=await client.request('/api/projects/'+id+'/assets',{expected:client.expected(),asset});}
 const operations=kind==='rescue'?dingDangOperations():tapScoreOperations();for(let i=0;i<operations.length;i+=256)await client.transaction(operations.slice(i,i+256));const artifact=await client.export();return {client,artifact,editorUrl:origin+'/?project='+id};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const origin=process.argv[2]??'http://127.0.0.1:8001',id=process.argv[3]??'ding-dang-native',kind=process.argv[4]??'rescue',output=resolve(process.argv[5]??'reports/native-authoring/'+id);const result=await authorGame(origin,id,kind);await mkdir(output,{recursive:true});await writeFile(resolve(output,'playable.html'),result.artifact.html);await writeFile(resolve(output,'manifest.json'),JSON.stringify(result.artifact.manifest,null,2));globalThis.console.log(JSON.stringify({editorUrl:result.editorUrl,manifest:result.artifact.manifest},null,2));}
