import {createHash} from 'node:crypto';
import {Buffer} from 'node:buffer';
import {isDeepStrictEqual} from 'node:util';
import {canonical} from '../../../../packages/creative-project/src/canonical.ts';
import {validateAssetPolicy} from '../asset-policy.mjs';
import {component} from '../document.mjs';
import {assertValue,fieldLimits,layout,record,standardText} from '../review-fields.mjs';
import {salvageRecipe} from '../salvage-recipe.mjs';
import {isAudioMime} from '../media-validate.mjs';

const moments=[
 {id:'opening',label:'Opening'},
 {id:'first-catch',label:'First core catch'},
 {id:'end-card',label:'End card'},
 {id:'timeout',label:'Timeout'},
];
const timeoutCaptionId='salvage.timeout.caption';
const timeoutLayoutId='salvage.timeout.layout';
const timeoutBindingId='salvage.timeout.caption.show';
const targetDefinitions=[
 {id:'opening',label:'Opening instruction',moment:'opening',componentIds:['salvage.instruction'],fields:[['instruction','Instruction'],['hint-delay','Time before opening hint (s)']]},
 {id:'first-catch',label:'First station repair',moment:'first-catch',componentIds:['salvage.station.stage.1','salvage.instruction'],fields:[['reveal-duration','Reveal duration (s)'],['message','Reward message']]},
 {id:'cta',label:'Install button',moment:'end-card',componentIds:['salvage.cta'],fields:[['text','Button wording'],['payoff-hold','Time to enjoy the restored station before showing the button (s)']]},
 {id:'ending',label:'Final payoff',moment:'end-card',componentIds:['salvage.reward.title','salvage.reward.caption'],fields:[['payoff-hold','Hold before install button (s)']]},
];
const playfieldLayout=Object.freeze({x:345,y:-155,scaleX:.78,scaleY:.78});
const lanes=Object.freeze([52,134,216,298]);
const check=(value,code)=>{if(!value)throw Error(code);};
const message=binding=>binding?.actions.find(action=>action.kind==='set'&&action.variableId==='salvage.message');
const payoff=binding=>binding?.condition?.all?.find(part=>part.variableId==='salvage.payoff'&&part.op==='gte');

function condition(binding,variableId,op,value){
 const parts=[binding.condition,...binding.condition?.all??[],...binding.condition?.any??[]].filter(Boolean);
 return parts.some(part=>part.variableId===variableId&&part.op===op&&part.value===value);
}
function setsPhase(binding,value){return binding?.actions.some(action=>action.kind==='set'&&action.variableId==='salvage.phase'&&action.value===value);}
function audioCue(index,binding){
 const actions=binding?.actions.filter(action=>action.kind==='playAudio')??[];
 if(actions.length!==1)return {unresolved:actions.length?'multiple-cues':'missing-cue'};
 const behavior=index.behavior(actions[0].behaviorId),target=behavior&&index.component(behavior.componentId);
 const assetId=target?.assetSlots[0]?.assetId,asset=assetId&&index.asset(assetId);
 if(behavior?.kind!=='audio'||!target||!isAudioMime(asset?.mime))return {unresolved:'invalid-cue'};
 return {behaviorId:behavior.id,componentId:target.id,assetId,assetHash:asset.hash};
}
function outcome(index,{bindingId,eventKind,eventReference,phase}){
 const binding=index.binding(bindingId),event=binding&&index.event(binding.eventId);
 if(!binding||event?.kind!==eventKind||event[eventReference.key]!==eventReference.value||!setsPhase(binding,phase))return {unresolved:'invalid-binding'};
 const duplicate=index.bindingsForEvent(event.id).filter(other=>other.id!==binding.id&&isDeepStrictEqual(other.condition,binding.condition)&&setsPhase(other,phase));
 if(duplicate.length)return {unresolved:'ambiguous-binding'};
 return {bindingId,eventId:event.id,cue:audioCue(index,binding)};
}
export function resolveSalvageRoles(index){
 const unresolved=[],rules=index.behavior('salvage.rules');
 if(rules?.kind!=='drag'||rules.componentId!=='salvage.ship')return {status:'unsupported',module:null,unresolved:['module']};
 const win=outcome(index,{bindingId:'salvage.restore.3',eventKind:'variableChange',eventReference:{key:'variableId',value:'salvage.catches'},phase:'payoff'});
 if(!condition(index.binding('salvage.restore.3')??{},'salvage.catches','eq',3))win.unresolved??='invalid-condition';
 const loss=outcome(index,{bindingId:'salvage.deadline.cta',eventKind:'timer',eventReference:{key:'behaviorId',value:'salvage.deadline'},phase:'cta'});
 const cta=index.component('salvage.cta'),label=index.component('salvage.cta.label'),click=index.binding('salvage.cta.click'),event=click&&index.event(click.eventId);
 const primaryCta=cta?.contract==='native.button.v1'&&label?.parentId===cta.id&&label.contract==='native.text.v1'&&event?.kind==='click'&&event.componentId===cta.id&&click.actions.some(action=>action.kind==='store')
  ?{componentId:cta.id,labelId:label.id,bindingId:click.id}:{unresolved:'invalid-cta'};
 const panel=index.component('salvage.panel'),hand=index.behavior('salvage.hand'),payoffFinish=index.binding('salvage.payoff.finish');
 const outcomePanel=panel?.contract==='native.rectangle.v1'?{componentId:panel.id}:{unresolved:'missing-panel'};
 const hintTiming=hand?.kind==='tutorial-hand'?{behaviorId:hand.id}:{unresolved:'missing-hint'};
 const payoffTiming=payoff(payoffFinish)?{bindingId:'salvage.payoff.finish'}:{unresolved:'missing-payoff'};
 const roles={winEvent:win,timeoutEvent:loss,primaryCta,outcomePanel,rewardCue:win.cue??{unresolved:win.unresolved??'invalid-cue'},hintTiming,payoffTiming};
 for(const [role,value]of Object.entries(roles))if(value.unresolved)unresolved.push(role+':'+value.unresolved);
 if(index.component(timeoutCaptionId))roles.timeoutCaption={componentId:timeoutCaptionId};
 if(win.bindingId&&win.bindingId===loss.bindingId)unresolved.push('outcomes:shared-binding');
 return {status:unresolved.length?'unresolved':'resolved',module:'star-salvage',version:1,roles,unresolved};
}

function endingFields(project,resolution){
 const panel=record(project,'components','salvage.panel'),cta=record(project,'components','salvage.cta');
 const winAudio=record(project,'components',resolution.roles?.rewardCue?.componentId);
 if(!panel||!cta||!layout(project,'salvage.playfield.layout')||!record(project,'eventBindings','salvage.cta.show'))return [];
 const descriptions={};
 for(const [cue,description]of Object.entries({catch:'short core collection cue',repair:'short station restoration cue',complete:'current warp completion cue'})){
  const assetId=record(project,'components','salvage.audio.'+cue)?.assetSlots[0]?.assetId;
  if(assetId&&project.assets.some(asset=>asset.id===assetId&&isAudioMime(asset.mime)))descriptions[assetId]=description;
 }
 return [
  {id:'timeout-caption',label:'Centered text on the timeout end card',value:record(project,'components',timeoutCaptionId)?.parameters?.text??'',...standardText},
  ...(winAudio?[{id:'win-cue',label:'Sound played when the third core restores the station',value:winAudio.assetSlots[0]?.assetId,choices:Object.keys(descriptions),descriptions}]:[]),
 ];
}
function values(project){
 return {
  instruction:record(project,'variables','salvage.message')?.initial,
  'hint-delay':record(project,'gameplay','salvage.hand')?.parameters.idleDelaySeconds,
  'reveal-duration':record(project,'gameplay','salvage.station.stage.1.reveal')?.parameters.seconds,
  message:message(record(project,'eventBindings','salvage.restore.1'))?.value,
  text:record(project,'components','salvage.cta.label')?.parameters.text,
  'payoff-hold':payoff(record(project,'eventBindings','salvage.payoff.finish'))?.value,
 };
}
function sharedArtTargets(project){
 const targets=[];
 for(const [prefix,label]of [['core','Star Core'],['hazard','Meteor']]){
  const proto=record(project,'components','salvage.'+prefix+'.image'),assetId=proto?.assetSlots[0]?.assetId;
  if(!assetId)continue;
  const uses=project.components.filter(item=>item.assetSlots.some(slot=>slot.assetId===assetId));
  if(uses.some(item=>item.assetSlots.length!==1||item.assetSlots[0].slotId!=='source'))continue;
  const otherAssets=new Set(project.components.filter(item=>item.id.startsWith('salvage.'+(prefix==='core'?'hazard':'core'))).flatMap(item=>item.assetSlots.map(slot=>slot.assetId)));
  const imageChoices=project.assets.filter(asset=>asset.mime.startsWith('image/')&&!otherAssets.has(asset.id)).map(asset=>asset.id);
  targets.push({id:prefix+'-art',label:label+' artwork',moment:'opening',componentIds:uses.map(item=>item.id),uses:uses.map(item=>item.id),imageChoices,
   fields:[{id:'shared-art',label:'Replace all '+uses.length+' uses of this source asset',confirm:true,value:assetId}]});
 }
 return targets;
}
function reviewTargets(project,resolution){
 const current=values(project);
 if(!record(project,'gameplay','salvage.rules')||!message(record(project,'eventBindings','salvage.music.start'))||Object.values(current).some(value=>value===undefined)||targetDefinitions.some(target=>target.componentIds.some(id=>!record(project,'components',id))))
  return {module:'star-salvage',moments:[],targets:[]};
 const targets=targetDefinitions.map(target=>({...target,fields:target.fields.map(([id,label])=>({id,label,value:current[id],...fieldLimits[id]}))}));
 const ending=endingFields(project,resolution);
 targets.find(target=>target.id==='ending').fields.push(...ending);
 if(ending.length)targets.push({id:'timeout-card',label:'Timeout end card',moment:'timeout',componentIds:['salvage.panel',timeoutCaptionId],fields:[
  ...ending.filter(field=>field.id!=='win-cue'),
  ...(record(project,'components',timeoutCaptionId)?[{id:'caption-alignment',label:'Caption alignment within the panel',choices:['center']}]:[]),
 ]});
 return {module:'star-salvage',moments,targets:[...targets,...sharedArtTargets(project)],
  momentRules:{phaseVariable:'salvage.phase',progressVariable:'salvage.catches',goal:3,progressMoment:'first-catch'}};
}
function reviewOperations(project,targetId,fields,changes,baseline,resolution){
 if(!changes||typeof changes!=='object'||Array.isArray(changes))throw Error('E_REVIEW_ARGUMENT');
 const keys=Object.keys(changes);
 if(!keys.length||keys.some(key=>!fields.includes(key)))throw Error('E_REVIEW_SCOPE');
 const operations=[],expected=globalThis.structuredClone(project);
 function update(collection,id,kind,key,change){const next=record(expected,collection,id);if(!next)throw Error('E_REVIEW_ROLE_UNRESOLVED');change(next);operations.push({kind,[key]:globalThis.structuredClone(next)});}
 const binding=(id,change)=>update('eventBindings',id,'putBinding','binding',change);
 for(const field of keys){
  const value=changes[field];
  if(field==='shared-art'){
   const target=sharedArtTargets(baseline).find(item=>item.id===targetId);
   if(!target?.imageChoices.includes(value))throw Error('E_REVIEW_ASSET_CHOICE');
   for(const id of target.uses){record(expected,'components',id).assetSlots=[{slotId:'source',assetId:value}];operations.push({kind:'replaceAsset',id,assetId:value});}
   continue;
  }
  if(field==='win-cue'){
   const cue=endingFields(baseline,resolution).find(item=>item.id===field),id=resolution.roles?.rewardCue?.componentId;
   if(!cue?.choices.includes(value))throw Error('E_REVIEW_ASSET_CHOICE');
   if(!id)throw Error('E_REVIEW_ROLE_UNRESOLVED');
   record(expected,'components',id).assetSlots=[{slotId:'source',assetId:value}];operations.push({kind:'replaceAsset',id,assetId:value});continue;
  }
  assertValue(field,value);
  switch(field){
   case 'timeout-caption':{
    const existing=record(expected,'components',timeoutCaptionId);
    if(existing){existing.parameters.text=value;operations.push({kind:'setParameter',id:timeoutCaptionId,key:'text',value});break;}
    const title=record(expected,'components','salvage.reward.title'),panel=record(expected,'components','salvage.panel'),button=record(expected,'components','salvage.cta');
    if(!title||!panel||!button)throw Error('E_REVIEW_ROLE_UNRESOLVED');
    const group=component({id:timeoutLayoutId,label:'Timeout caption layout',contract:'native.group.v1',parentId:'salvage.playfield.layout',sceneId:title.sceneId,order:title.order});
    const caption=component({...title,id:timeoutCaptionId,label:'Timeout caption',parentId:group.id,transform:[1,0,0,1,title.transform[4],(panel.transform[5]+button.transform[5]-title.parameters.height)/2],parameters:{...title.parameters,text:value,visible:false,fontSize:22}});
    const show={id:timeoutBindingId,eventId:record(expected,'eventBindings','salvage.cta.show').eventId,condition:{all:[{variableId:'salvage.phase',op:'eq',value:'cta'},{variableId:'salvage.catches',op:'lt',value:3}]},actions:[{kind:'setComponent',componentId:timeoutCaptionId,key:'visible',value:true}]};
    expected.components.push(group,caption);expected.eventBindings.push(show);
    operations.push({kind:'createComponent',component:group},{kind:'createComponent',component:caption},{kind:'putBinding',binding:show});break;
   }
   case 'caption-alignment':{
    const caption=record(expected,'components',timeoutCaptionId),panel=record(expected,'components','salvage.panel'),button=record(expected,'components','salvage.cta'),title=record(expected,'components','salvage.reward.title'),group=caption&&record(expected,'components',caption.parentId);
    if(targetId!=='timeout-card'||!caption||!panel||!button||group?.id!==timeoutLayoutId||caption.parentId!==group.id||group.parentId!=='salvage.playfield.layout'||![caption,panel,group,button].every(item=>item.transform.slice(0,4).join(',')==='1,0,0,1'))throw Error('E_REVIEW_ROLE_UNRESOLVED');
    const top=title&&title.transform[5]+title.parameters.height<button.transform[5]?Math.max(panel.transform[5],title.transform[5]+title.parameters.height):panel.transform[5];
    const transform=[...caption.transform];transform[4]=panel.transform[4]+(panel.parameters.width-caption.parameters.width)/2-group.transform[4];transform[5]=(top+button.transform[5]-caption.parameters.height)/2-group.transform[5];
    if(transform.some((entry,index)=>Math.abs(entry-caption.transform[index])>.001))operations.push({kind:'setTransform',id:caption.id,transform});
    if(caption.parameters.align!=='center')operations.push({kind:'setParameter',id:caption.id,key:'align',value:'center'});
    caption.transform=transform;caption.parameters.align='center';break;
   }
   case 'text':{
    const label=record(expected,'components',resolution.roles?.primaryCta?.labelId);
    if(!label)throw Error('E_REVIEW_ROLE_UNRESOLVED');
    label.parameters.text=value;operations.push({kind:'setParameter',id:label.id,key:'text',value});break;
   }
   case 'instruction':
    update('variables','salvage.message','putVariable','variable',entry=>{entry.initial=value;});
    binding('salvage.music.start',entry=>{message(entry).value=value;});break;
   case 'hint-delay':update('gameplay','salvage.hand','putBehavior','behavior',entry=>{entry.parameters.idleDelaySeconds=value;});break;
   case 'reveal-duration':update('gameplay','salvage.station.stage.1.reveal','putBehavior','behavior',entry=>{entry.parameters.seconds=value;});break;
   case 'message':binding('salvage.restore.1',entry=>{message(entry).value=value;});break;
   case 'payoff-hold':binding('salvage.payoff.finish',entry=>{payoff(entry).value=value;});break;
   default:throw Error('E_REVIEW_SCOPE');
  }
 }
 return {operations,expected};
}

function waveLanes(seed){
 let state=seed>>>0;
 const random=()=>{state+=0x6d2b79f5;let value=state;value=Math.imul(value^value>>>15,value|1);value^=value+Math.imul(value^value>>>7,value|61);return ((value^value>>>14)>>>0)/4294967296;};
 let previous=-1;
 return Array.from({length:6},(_,index)=>{
  let core=Math.floor(random()*4);if(core===previous)core=(core+1+Math.floor(random()*3))%4;previous=core;
  const offset=1+Math.floor(random()*3),hazard=(core+offset)%4;
  return {core:lanes[core],hazard:index%2?lanes[hazard]:undefined};
 });
}
function compose(concept,studioAssets){
 const operations=[],assets=[],assetPolicy=[],plan=concept.salvage,{treatment,receipt:recipe}=salvageRecipe(plan),palette=concept.presentation.palette;
 const arc=Object.fromEntries(concept.experience.arc.map(step=>[step.phase,step]));
 const add=(id,kind,x,y,width,height,parameters={},extra={})=>operations.push({kind:'createComponent',component:{id,label:id,order:operations.length,contract:'native.'+kind+'.v1',transform:[1,0,0,1,x,y],parameters:{width,height,...parameters},...extra}});
 const behavior=(id,componentId,kind,parameters)=>operations.push({kind:'putBehavior',behavior:{id,componentId,kind,parameters}});
 const bind=(id,event,actions,condition)=>operations.push({kind:'putBinding',binding:{id,event,actions,...(condition?{condition}:{})}});
 const property=(componentId,key,value)=>({kind:'setComponent',componentId,key,value});
 const set=(variableId,value)=>({kind:'set',variableId,value});
 const is=(variableId,value)=>({variableId,op:'eq',value});
 const variable=(id,type,initial)=>operations.push({kind:'putVariable',variable:{id,label:id,type,initial}});
 const assetById=new Map(plan.assets.map(asset=>[asset.id,asset]));
 check(assetById.size===plan.assets.length,'E_CONCEPT_ASSET_DUPLICATE');
 const styleFamily=plan.assets.find(asset=>asset.mime.startsWith('image/'))?.provenance.styleFamily;
 for(const source of plan.assets){
  let receipt;
  if(source.provenance.origin==='studio-original'){
   const original=studioAssets?.get(source.id);
   check(original&&canonical(original)===canonical(source),'E_ASSET_POLICY_STUDIO_SOURCE');
   check(source.provenance.styleFamily===styleFamily||isAudioMime(source.mime),'E_ASSET_POLICY_STYLE');receipt=source.provenance;
  }else receipt=validateAssetPolicy(source,{role:isAudioMime(source.mime)?'audio':'visual',styleFamily});
  assetPolicy.push({id:source.id,...receipt});
  const bytes=Buffer.from(source.data,'base64');check(bytes.length<=700000,'E_CONCEPT_ASSET_SIZE');
  const rights=source.rights+(receipt.attribution?'\n'+receipt.attribution:'');check(rights.length<=2048,'E_CONCEPT_ASSET_RIGHTS');
  assets.push({id:source.id,mime:source.mime,data:source.data,rights});
  operations.push({kind:'registerAsset',asset:{id:source.id,hash:'sha256:'+createHash('sha256').update(bytes).digest('hex'),mime:source.mime,bytes:bytes.length,rights,provenance:JSON.stringify(receipt)}});
 }
 const imageReference=id=>check(assetById.get(id)?.mime.startsWith('image/'),'E_CONCEPT_VISUAL_REFERENCE');
 Object.values(plan.sprites).forEach(imageReference);
 const coreVariants=plan.coreVariants??[plan.sprites.core],hazardVariants=plan.hazardVariants??[plan.sprites.hazard];
 check(coreVariants[0]===plan.sprites.core&&hazardVariants[0]===plan.sprites.hazard,'E_CONCEPT_VISUAL_REFERENCE');
 check(new Set(coreVariants).size===coreVariants.length&&new Set(hazardVariants).size===hazardVariants.length,'E_CONCEPT_VISUAL_REFERENCE');
 coreVariants.forEach(imageReference);hazardVariants.forEach(imageReference);
 check(plan.bay.length===4&&new Set(plan.bay.map(object=>object.id)).size===4,'E_CONCEPT_BAY_STATE');
 for(let stage=0;stage<=3;stage++)check(plan.bay.filter(object=>object.unlockAt===stage).length===1,'E_CONCEPT_BAY_STATE');
 for(const object of plan.bay)imageReference(object.assetId);
 for(const id of Object.values(plan.audio))check(isAudioMime(assetById.get(id)?.mime),'E_CONCEPT_AUDIO_REFERENCE');
 variable('salvage.catches','number',0);variable('salvage.phase','string','first-seconds');variable('salvage.message','string',concept.experience.instruction);
 variable('salvage.wave','number',0);variable('salvage.spawn.lock','boolean',false);variable('salvage.payoff','number',0);variable('salvage.hits','number',0);
 add('salvage.background','rectangle',0,0,700,700,{fill:palette.background,radius:0});
 add('salvage.backdrop','image',0,0,700,700,{fit:'cover'},{assetSlots:[{slotId:'source',assetId:plan.sprites.backdrop}]});
 add('salvage.station.layout','group',0,0,390,260);behavior('salvage.station.layout.responsive','salvage.station.layout','responsive-layout',{x:5,y:55,scaleX:.85,scaleY:.85});
 add('salvage.brand','text',60,14,186,34,{text:concept.presentation.title,fontSize:24,color:palette.text,align:'center',wrap:false},{parentId:'salvage.station.layout'});
 add('salvage.progress','text',254,14,76,34,{text:'{{salvage.catches}} / 3',fontSize:21,color:palette.accent,align:'center',wrap:false},{parentId:'salvage.station.layout'});
 const bayPositions=[{x:145,y:96,width:100,height:100},{x:173,y:188,width:44,height:32},{x:126,y:77,width:138,height:138},{x:112,y:63,width:166,height:166}];
 for(const object of plan.bay){
  const stage=object.unlockAt,stageId='salvage.station.stage.'+stage;
  if(!plan.bay.slice(0,plan.bay.indexOf(object)).some(item=>item.unlockAt===stage))add(stageId,'group',195,146,0,0,{visible:stage===0},{parentId:'salvage.station.layout'});
  const position=bayPositions[stage];
  add('salvage.bay.'+object.id,'image',position.x-195,position.y-146,position.width,position.height,{fit:'contain'},{parentId:stageId,assetSlots:[{slotId:'source',assetId:object.assetId}]});
  if(stage===3&&assetById.has('salvage-spark'))add('salvage.bay.beacon','image',-22,-22,44,44,{fit:'contain'},{parentId:stageId,assetSlots:[{slotId:'source',assetId:'salvage-spark'}]});
  if(stage)behavior(stageId+'.reveal',stageId,'animation',{property:'scale',from:stage===3?treatment.revealFrom:.82,to:1,seconds:stage===3?treatment.revealSeconds:.42,loop:false,easing:stage===3?treatment.easing:'back-out'});
 }
 add('salvage.playfield.layout','group',0,0,390,700);behavior('salvage.playfield.layout.responsive','salvage.playfield.layout','responsive-layout',playfieldLayout);
 add('salvage.playfield.background','rectangle',1,241,388,398,{fill:'#0d162999',stroke:'#31466d',strokeWidth:1,radius:0},{parentId:'salvage.playfield.layout'});
 add('salvage.instruction','text',15,246,360,38,{text:'{{salvage.message}}',fontSize:18,color:palette.text},{parentId:'salvage.playfield.layout'});
 add('salvage.rail','rectangle',20,632,350,3,{fill:'#6384b8',radius:0},{parentId:'salvage.playfield.layout'});
 add('salvage.ship','group',163,560,64,64,{},{parentId:'salvage.playfield.layout'});
 add('salvage.ship.thruster','image',24,49,16,28,{fit:'contain'},{parentId:'salvage.ship',assetSlots:[{slotId:'source',assetId:assetById.has('salvage-thruster')?'salvage-thruster':plan.sprites.ship}]});
 add('salvage.ship.image','image',0,0,64,64,{fit:'contain'},{parentId:'salvage.ship',assetSlots:[{slotId:'source',assetId:plan.sprites.ship}]});
 add('salvage.ship.shield','image',-6,-6,76,76,{fit:'contain',opacity:0},{parentId:'salvage.ship',assetSlots:[{slotId:'source',assetId:assetById.has('salvage-shield-1')?'salvage-shield-1':plan.sprites.ship}]});
 behavior('salvage.rules','salvage.ship','drag',{axis:'x',minX:20,maxX:306});
 behavior('salvage.ship.collider','salvage.ship','collider',{shape:'box'});
 behavior('salvage.ship.press','salvage.ship','press-feedback',{scaleDown:.94,springBackSeconds:.18,liftShadow:true});
 behavior('salvage.shield.flash','salvage.ship.shield','animation',{property:'opacity',from:.85,to:0,seconds:.45,loop:false,easing:'ease-out'});
 add('salvage.drag.destination','group',216,560,64,64,{visible:false},{parentId:'salvage.playfield.layout'});
 add('salvage.director','group',0,0,0,0);
 behavior('salvage.hand','salvage.director','tutorial-hand',{targetId:'salvage.ship',destinationId:'salvage.drag.destination',mode:'drag',idleDelaySeconds:plan.firstHintSeconds??.8,hideOnFirstInput:true});
 const prototypes={cores:[],hazards:[]};
 for(const [kind,variants]of [['core',coreVariants],['hazard',hazardVariants]])for(const [index,assetId]of variants.entries()){
  const id='salvage.'+kind+(index?'.alt.'+index:'');prototypes[kind+'s'].push(id);
  add(id,'group',0,0,48,48,{},{prototype:true});
  add(id+'.image','image',0,0,48,48,{fit:'contain'},{parentId:id,assetSlots:[{slotId:'source',assetId}]});
  behavior(id+'.motion',id,'motion',{vx:0,vy:kind==='core'?165:185,gravity:kind==='core'?28:20});
  behavior(id+'.collider',id,'collider',{shape:'circle'});
  behavior(id+'.responsive',id,'responsive-layout',playfieldLayout);
  behavior(id+'.burst',id,'emitter',{count:kind==='core'?18:14,color:kind==='core'?palette.accent:'#ff796c',speed:kind==='core'?145:110,lifetime:.65,gravity:80});
  bind(id+'.exit',{kind:'boundaryExit',componentId:id},[{kind:'despawn'}]);
 }
 const clearPlayfield=[...prototypes.cores,...prototypes.hazards].map(id=>property(id,'visible',false));
 behavior('salvage.spawn.timer','salvage.director','timer',{seconds:.95,repeat:true});
 const active={all:[{variableId:'salvage.phase',op:'ne',value:'payoff'},{variableId:'salvage.phase',op:'ne',value:'cta'}]};
 const waves=waveLanes(plan.seed);
 waves.forEach((wave,index)=>{
  const actions=[{kind:'spawn',prototypeId:prototypes.cores[index%prototypes.cores.length],x:wave.core,y:240}];
  if(wave.hazard!==undefined)actions.push({kind:'spawn',prototypeId:prototypes.hazards[index%prototypes.hazards.length],x:wave.hazard,y:220});
  actions.push(index===waves.length-1?set('salvage.wave',0):{kind:'add',variableId:'salvage.wave',value:1},set('salvage.spawn.lock',true));
  bind('salvage.wave.'+index,{kind:'timer',behaviorId:'salvage.spawn.timer'},actions,{all:[is('salvage.wave',index),is('salvage.spawn.lock',false),...active.all]});
 });
 for(const [cue,assetId]of Object.entries(plan.audio)){
  const target='salvage.audio.'+cue;add(target,'group',0,0,0,0,{},{assetSlots:[{slotId:'source',assetId}]});
  const role={complete:'win',loss:'loss',reject:'reject',ambient:'ambient'}[cue];
  behavior(target+'.play',target,'audio',{loop:cue==='ambient',volume:{ambient:.08,catch:.22,repair:.28,complete:treatment.gain,loss:.32,reject:.12}[cue],frequency:660,seconds:.2,bus:cue==='ambient'?'music':['complete','loss'].includes(cue)?'stinger':'sfx',...(cue==='catch'?{pitchVariableId:'salvage.catches',pitchStep:1.5}:{}),...(role?{role}:{})});
 }
 const sound=cue=>({kind:'playAudio',behaviorId:'salvage.audio.'+cue+'.play'});
 bind('salvage.music.start',{kind:'click',componentId:'salvage.ship'},[sound('ambient'),set('salvage.message',concept.experience.instruction),property('salvage.instruction','visible',false)],active);
 for(const id of prototypes.cores)bind(id+'.catch',{kind:'contactBegin',componentId:id,otherId:'salvage.ship'},[
  {kind:'add',variableId:'salvage.catches',value:1},property('salvage.instruction','visible',false),sound('catch'),{kind:'emit',behaviorId:id+'.burst'},
  {kind:'floatingText',text:'+1',componentId:id,color:palette.accent,fontSize:22,risePx:36,seconds:.7},{kind:'despawn'},
 ],{all:[{variableId:'salvage.catches',op:'lt',value:3},...active.all]});
 for(const id of prototypes.hazards)bind(id+'.hit',{kind:'contactBegin',componentId:id,otherId:'salvage.ship'},[
  {kind:'add',variableId:'salvage.hits',value:1},set('salvage.message','Dodge meteors!'),sound('reject'),
  property('salvage.ship.shield','opacity',.85),{kind:'animate',behaviorId:'salvage.shield.flash'},
  {kind:'emit',behaviorId:id+'.burst'},{kind:'floatingText',text:'HIT!',componentId:id,color:'#ff9b91',fontSize:22,risePx:32,seconds:.7},
  {kind:'cameraShake',intensity:4,seconds:.18},{kind:'screenFlash',color:'#ff394f',opacity:.2,seconds:.2},{kind:'despawn'},
 ],active);
 const milestones=['Thrusters online!','Shield online!',concept.presentation.rewardCopy];
 for(const stage of [1,2,3]){
  const station='salvage.station.stage.'+stage,actions=[
   property(station,'visible',true),{kind:'animate',behaviorId:station+'.reveal'},set('salvage.message',milestones[stage-1]),property('salvage.instruction','visible',false),
   set('salvage.phase',stage===3?'payoff':stage===1?'agency':'escalation'),sound(stage===3?'complete':plan.audio.repair?'repair':'catch'),
   ...(stage===3?[]:[{kind:'floatingText',text:'+1 PART',componentId:station,color:palette.accent,fontSize:20,risePx:34,seconds:.8}]),
   {kind:'cameraShake',intensity:stage===3?treatment.shakeIntensity:3,seconds:stage===3?.25:.12},
  ];
  if(stage===3)actions.push(property('salvage.ship','visible',false),property('salvage.rail','visible',false),...clearPlayfield,property('salvage.panel','visible',true),property('salvage.reward.title','visible',true),property('salvage.reward.caption','visible',true),{kind:'emit',behaviorId:'salvage.celebration'},{kind:'screenFlash',color:palette.accent,opacity:.18,seconds:.22});
  bind('salvage.restore.'+stage,{kind:'variableChange',variableId:'salvage.catches'},actions,{all:[is('salvage.catches',stage),{variableId:'salvage.phase',op:'ne',value:'cta'}]});
 }
 behavior('salvage.celebration','salvage.station.stage.3','emitter',{shape:'confetti',coverage:'screen',count:Math.min(128,treatment.particles*2),color:palette.accent,color2:'#4ecdc4',color3:'#fff3b0',speed:treatment.speed,lifetime:treatment.lifetime+.6,gravity:65,spread:360});
 add('salvage.panel','rectangle',35,310,320,280,{visible:false,fill:'#1b2b4bf5',stroke:palette.accent,strokeWidth:3,radius:22},{parentId:'salvage.playfield.layout'});
 add('salvage.reward.title','text',55,354,280,48,{visible:false,text:'WARP READY!',fontSize:30,color:palette.accent},{parentId:'salvage.playfield.layout'});
 add('salvage.reward.caption','text',55,410,280,36,{visible:false,text:concept.presentation.rewardCopy,fontSize:19,color:palette.text},{parentId:'salvage.playfield.layout'});
 add(timeoutLayoutId,'group',0,0,0,0,{},{parentId:'salvage.playfield.layout'});
 add(timeoutCaptionId,'text',55,410,280,42,{visible:false,text:'Catch 3 to launch',fontSize:21,color:palette.text},{parentId:timeoutLayoutId});
 add('salvage.cta','button',65,482,260,68,{visible:false,presentation:'shiny-cta',fill:palette.accent,hoverFill:'#ffe29a',pressedFill:'#e5a93c',stroke:'#0e2830',strokeWidth:3,radius:16},{parentId:'salvage.playfield.layout'});
 add('salvage.cta.label','text',8,0,244,68,{text:concept.experience.ctaLabel,fontSize:22,color:palette.background},{parentId:'salvage.cta'});
 behavior('salvage.cta.pulse','salvage.cta','animation',{property:'y',from:479,to:485,seconds:.95,loop:true,easing:'ease-in-out'});
 bind('salvage.cta.click',{kind:'click',componentId:'salvage.cta'},[{kind:'store'}],is('salvage.phase','cta'));
 bind('salvage.cta.show',{kind:'variableChange',variableId:'salvage.phase'},[property('salvage.instruction','visible',false),property('salvage.rail','visible',false),property('salvage.cta','visible',true),{kind:'animate',behaviorId:'salvage.cta.pulse'}],is('salvage.phase','cta'));
 behavior('salvage.clock','salvage.director','timer',{seconds:.1,repeat:true});
 bind('salvage.spawn.unlock',{kind:'timer',behaviorId:'salvage.clock'},[set('salvage.spawn.lock',false)]);
 bind('salvage.payoff.tick',{kind:'timer',behaviorId:'salvage.clock'},[{kind:'add',variableId:'salvage.payoff',value:.1}],is('salvage.phase','payoff'));
 bind('salvage.payoff.finish',{kind:'variableChange',variableId:'salvage.payoff'},[set('salvage.message',arc.cta.description),set('salvage.phase','cta')],{all:[is('salvage.phase','payoff'),{variableId:'salvage.payoff',op:'gte',value:arc.payoff.seconds}]});
 behavior('salvage.deadline','salvage.director','timer',{seconds:arc['first-seconds'].seconds+arc.agency.seconds+arc.escalation.seconds,repeat:false});
 bind('salvage.deadline.cta',{kind:'timer',behaviorId:'salvage.deadline'},[
  set('salvage.message','Time is up'),property('salvage.instruction','visible',false),property('salvage.ship','visible',false),property('salvage.rail','visible',false),...clearPlayfield,property('salvage.panel','visible',true),property('salvage.reward.title','text','TIME IS UP!'),property('salvage.reward.title','visible',true),
  property('salvage.reward.caption','visible',false),property(timeoutCaptionId,'visible',true),
  ...(plan.audio.loss?[sound('loss')]:[]),set('salvage.phase','cta'),
 ],{all:[{variableId:'salvage.phase',op:'ne',value:'payoff'},{variableId:'salvage.phase',op:'ne',value:'cta'}]});
 operations.push({kind:'setStore',url:concept.product.storeUrl});
 check(operations.length<=256,'E_CONCEPT_OPERATION_LIMIT');
 const effects={'catch-rule':['salvage.ship','salvage.rules','salvage.core.catch'],'world-transformation':['salvage.restore.1','salvage.restore.2','salvage.restore.3'],recovery:['salvage.hazard.hit','salvage.hand'],continuity:['salvage.cta','salvage.cta.click']};
 return {operations,assets,assetPolicy,recipe,requirements:concept.requirements.map(requirement=>({...requirement,records:effects[requirement.effect]}))};
}

async function prepareTimeout(page){
 const points=await page.evaluate(()=>{
  const state=globalThis.toraRuntime?.state?.(),canvas=globalThis.document.querySelector('canvas'),embedded=globalThis.document.getElementById('project');
  if(!state||!canvas||!embedded)return null;
  const current=JSON.parse(embedded.textContent),ship=current.components.find(item=>item.id==='salvage.ship'),drag=current.gameplay.find(item=>item.id==='salvage.rules');
  const responsive=current.gameplay.find(item=>item.id==='salvage.playfield.layout.responsive')?.parameters,alternate=state.viewport.landscape&&responsive?responsive:{x:0,y:0,scaleX:1,scaleY:1};
  const rect=canvas.getBoundingClientRect(),scale=Math.min(rect.width/state.viewport.width,rect.height/state.viewport.height);
  const point=x=>({x:rect.left+(rect.width-state.viewport.width*scale)/2+(alternate.x+alternate.scaleX*(x+32))*scale,y:rect.top+(rect.height-state.viewport.height*scale)/2+(alternate.y+alternate.scaleY*(ship.transform[5]+32))*scale});
  return {from:point((state.components['salvage.ship']?.transform??ship.transform)[4]),to:point(drag.parameters.minX)};
 });
 if(!points)throw Error('E_SALVAGE_TIMEOUT_INPUT');
 await page.mouse.move(points.from.x,points.from.y);await page.mouse.down();await page.mouse.move(points.to.x,points.to.y,{steps:4});await page.mouse.up();
 const x=await page.evaluate(()=>globalThis.toraRuntime.state().components['salvage.ship'].transform[4]);
 if(x>30)throw Error('E_SALVAGE_TIMEOUT_CLAMP');
}
function validateTimeout(state){
 return state?.variables?.['salvage.phase']==='cta'&&state.variables['salvage.catches']<3&&state.components['salvage.reward.title']?.parameters?.text==='TIME IS UP!'&&state.components['salvage.timeout.caption']?.parameters?.visible===true;
}

async function playToEndCard(page,project){
 const deadline=Date.now()+20000;
 const target=await page.evaluate(()=>{
  const state=globalThis.toraRuntime?.state?.(),canvas=globalThis.document.querySelector('canvas'),project=JSON.parse(globalThis.document.getElementById('project').textContent),ship=project.components.find(item=>item.id==='salvage.ship');
  if(!state||!canvas||!ship)return null;
  const responsive=project.gameplay.find(behavior=>behavior.id==='salvage.playfield.layout.responsive')?.parameters,alternate=state.viewport.landscape&&responsive?responsive:{x:0,y:0,scaleX:1,scaleY:1};
  const rect=canvas.getBoundingClientRect(),scale=Math.min(rect.width/state.viewport.width,rect.height/state.viewport.height);
  return {x:rect.left+(rect.width-state.viewport.width*scale)/2+(alternate.x+alternate.scaleX*(ship.transform[4]+32))*scale,y:rect.top+(rect.height-state.viewport.height*scale)/2+(alternate.y+alternate.scaleY*(ship.transform[5]+32))*scale};
 });
 if(!target)return {available:false};
 await page.mouse.move(target.x,target.y);await page.mouse.down();
 try{
  while(Date.now()<deadline){
   const status=await page.evaluate(({landscape})=>{
    const state=globalThis.toraRuntime?.state?.(),canvas=globalThis.document.querySelector('canvas'),project=JSON.parse(globalThis.document.getElementById('project').textContent);
    if(!state||!canvas)return {done:false};
    if(state.variables['salvage.phase']==='cta')return {done:true};
    const cores=state.instances.filter(instance=>instance.prototypeId.startsWith('salvage.core')).sort((a,b)=>b.y-a.y),core=cores[0];
    if(!core)return {done:false};
    const responsive=project.gameplay.find(behavior=>behavior.id===core.prototypeId+'.responsive')?.parameters;
    const alternate=landscape&&responsive?responsive:{x:0,y:0,scaleX:1,scaleY:1},rect=canvas.getBoundingClientRect(),stage=state.viewport,scale=Math.min(rect.width/stage.width,rect.height/stage.height);
    return {done:false,x:rect.left+(rect.width-stage.width*scale)/2+(alternate.x+alternate.scaleX*(core.x+24))*scale,y:rect.top+(rect.height-stage.height*scale)/2+(alternate.y+alternate.scaleY*(core.y+24))*scale};
   },{landscape:project.base.width<project.base.height&&target.x>0&&(await page.viewportSize()).width>(await page.viewportSize()).height});
   if(status.done)return {available:true,mode:'real-play'};
   if(status.x!==undefined){
    const current=await page.evaluate(()=>{const state=globalThis.toraRuntime.state(),canvas=globalThis.document.querySelector('canvas'),project=JSON.parse(globalThis.document.getElementById('project').textContent),ship=project.components.find(item=>item.id==='salvage.ship'),transform=state.components['salvage.ship']?.transform??ship.transform,responsive=project.gameplay.find(behavior=>behavior.id==='salvage.playfield.layout.responsive')?.parameters,alternate=state.viewport.landscape&&responsive?responsive:{x:0,y:0,scaleX:1,scaleY:1},rect=canvas.getBoundingClientRect(),scale=Math.min(rect.width/state.viewport.width,rect.height/state.viewport.height);return {x:rect.left+(rect.width-state.viewport.width*scale)/2+(alternate.x+alternate.scaleX*(transform[4]+32))*scale,y:rect.top+(rect.height-state.viewport.height*scale)/2+(alternate.y+alternate.scaleY*(transform[5]+32))*scale};});
    await page.mouse.move(status.x,current.y,{steps:2});
   }
   await page.waitForTimeout(45);
  }
 }finally{await page.mouse.up();}
 const phase=await page.evaluate(()=>globalThis.toraRuntime?.state?.()?.variables?.['salvage.phase']);
 if(phase==='payoff'){
  try{await page.waitForFunction(()=>globalThis.toraRuntime?.state?.()?.variables?.['salvage.phase']==='cta',undefined,{timeout:5000});return {available:true,mode:'real-play'};}catch{return {available:false};}
 }
 return {available:phase==='cta',mode:'real-play'};
}

export const starSalvageModule=Object.freeze({
 id:'star-salvage',version:1,supportsIntake:true,outcomeAssetId:'salvage.audio.victory.source',supportsLandscapeReview:true,outcomeKind:'salvage-outcome-audio',
 outcomeAudio:async()=>{const module=await import('../check-salvage.mjs');return {exercise:module.exerciseSalvageOutcomeAudio,checkerVersion:module.SALVAGE_OUTCOME_CHECKER_VERSION};},
 matches:index=>Boolean(index.behavior('salvage.rules')),
 resolveRoles:resolveSalvageRoles,reviewTargets,reviewOperations,compose,
 canTransferOutcomeCue:(index,resolution)=>resolution.status==='resolved'&&resolution.roles.timeoutEvent.cue?.unresolved==='missing-cue'&&!index.asset('salvage.audio.victory.source'),
 timingFields:()=>({
  'hint-delay':{target:'opening',targets:['opening'],moment:'opening',label:'opening hint delay'},
  'reveal-duration':{target:'first-catch',targets:['first-catch'],moment:'first-catch',label:'reveal duration'},
  'payoff-hold':{target:'ending',targets:['ending','cta'],moment:'end-card',label:'payoff hold'},
 }),
 intake:{
  validateMedia(assets,concept){
   const images=new Set(assets.filter(asset=>asset.mime.startsWith('image/')).map(asset=>asset.hash));
   if(images.size<4||!assets.some(asset=>isAudioMime(asset.mime)))throw Error('E_INTAKE_SALVAGE_MEDIA');
   if(concept){
    const sprites=Object.values(concept.salvage.sprites).map(id=>assets.find(asset=>asset.id===id));
    if(sprites.length!==4||sprites.some(asset=>!asset?.mime.startsWith('image/'))||new Set(sprites.map(asset=>asset.hash)).size!==4)throw Error('E_INTAKE_SALVAGE_MEDIA');
   }
  },
  validateConcept(concept){
   const audio=concept?.salvage?.audio,keys=Object.keys(concept?.salvage??{}).sort();
   const allowed=['assets','audio','bay','coreVariants','firstHintSeconds','hazardVariants','rewardRecipe','seed','sprites'];
   if(concept?.experience?.mechanic!=='star-salvage'||!concept.salvage||keys.some(key=>!allowed.includes(key)||key==='assets')||
    !['audio','bay','seed','sprites'].every(key=>keys.includes(key))||JSON.stringify(Object.keys(concept.salvage.sprites??{}).sort())!==JSON.stringify(['backdrop','core','hazard','ship'])||
    !Array.isArray(concept.salvage.bay)||concept.salvage.bay.length!==4||!audio||!['ambient','catch','complete','reject'].every(key=>typeof audio[key]==='string')||
    Object.keys(audio).some(key=>!['ambient','catch','complete','loss','reject','repair'].includes(key)))throw Error('E_INTAKE_ARGUMENT');
   return [...Object.values(concept.salvage.sprites),...(concept.salvage.coreVariants??[]),...(concept.salvage.hazardVariants??[]),...Object.values(audio),...concept.salvage.bay.map(object=>object?.assetId)];
  },
  hydrateConcept(concept,assets){return {...concept,salvage:{...concept.salvage,assets}};},
 },
 qa:{phaseVariable:'salvage.phase',progressVariable:'salvage.catches',goalValue:3,deadlineBehaviorId:'salvage.deadline',playToEndCard,prepareTimeout,validateTimeout},
});
