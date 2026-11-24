import {isDeepStrictEqual} from 'node:util';
import {component} from '../document.mjs';
import {assertValue,fieldLimits,layout,record,standardText} from '../review-fields.mjs';
import {isAudioMime} from '../media-validate.mjs';

const moments=[
 {id:'opening',label:'Opening'},
 {id:'first-harvest',label:'First harvest'},
 {id:'end-card',label:'End card'},
 {id:'timeout',label:'Timeout'},
];
const targetDefinitions=[
 {id:'opening',label:'Opening instruction',moment:'opening',componentIds:['harvest.instruction'],
  fields:[['instruction','Instruction'],['hint-delay','Time before opening hint (s)']]},
 {id:'first-harvest',label:'First orchard restoration',moment:'first-harvest',componentIds:['harvest.world.stage.1','harvest.instruction'],
  fields:[['reveal-duration','Reveal duration (s)'],['message','Reward message']]},
 {id:'cta',label:'Install button',moment:'end-card',componentIds:['harvest.cta'],
  fields:[['text','Button wording'],['payoff-hold','Time to enjoy the farm before showing the button (s)']]},
 {id:'ending',label:'Final payoff',moment:'end-card',componentIds:['harvest.reward.title','harvest.reward.detail'],
  fields:[['payoff-hold','Hold before install button (s)']]},
];
const message=binding=>binding?.actions.find(action=>action.kind==='set'&&action.variableId==='harvest.message');
const payoff=binding=>binding?.condition?.all?.find(part=>part.variableId==='harvest.payoff'&&part.op==='gte');
const timeoutCaptionId='harvest.timeout.caption';
const timeoutLayoutId='harvest.timeout.layout';
const timeoutBindingId='harvest.timeout.caption.show';
const endingCues={match:'short clear confirmation cue',repair:'short restoration cue',complete:'current completion cue'};
const openingHint=condition=>condition?.any?.[0]?.all?.find(part=>part.variableId==='harvest.idle')??condition;

function condition(binding,variableId,op,value){
 const parts=[binding.condition,...binding.condition?.all??[],...binding.condition?.any??[]].filter(Boolean);
 return parts.some(part=>part.variableId===variableId&&part.op===op&&part.value===value)||
  binding.condition?.all?.some(group=>group.all?.some(part=>part.variableId===variableId&&part.op===op&&part.value===value));
}
function setsPhase(binding,value){
 return binding?.actions.some(action=>action.kind==='set'&&action.variableId==='harvest.phase'&&action.value===value);
}
function audioCue(index,binding){
 const actions=binding?.actions.filter(action=>action.kind==='playAudio')??[];
 if(actions.length!==1)return {unresolved:actions.length?'multiple-cues':'missing-cue'};
 const behavior=index.behavior(actions[0].behaviorId),component=behavior&&index.component(behavior.componentId);
 const assetId=component?.assetSlots[0]?.assetId,asset=assetId&&index.asset(assetId);
 if(behavior?.kind!=='audio'||!component||!isAudioMime(asset?.mime))return {unresolved:'invalid-cue'};
 return {behaviorId:behavior.id,componentId:component.id,assetId,assetHash:asset.hash};
}
function outcome(index,{bindingId,eventKind,eventReference,phase}){
 const binding=index.binding(bindingId),event=binding&&index.event(binding.eventId);
 if(!binding||event?.kind!==eventKind||event[eventReference.key]!==eventReference.value||!setsPhase(binding,phase))return {unresolved:'invalid-binding'};
 const duplicate=index.bindingsForEvent(event.id).filter(other=>other.id!==binding.id&&
  isDeepStrictEqual(other.condition,binding.condition)&&setsPhase(other,phase));
 if(duplicate.length)return {unresolved:'ambiguous-binding'};
 return {bindingId,eventId:event.id,cue:audioCue(index,binding)};
}
export function resolveHarvestRoles(index){
 const unresolved=[];
 const board=index.behavior('harvest.rules');
 if(board?.kind!=='match-board'||board.componentId!=='harvest.board')return {status:'unsupported',module:null,unresolved:['module']};
 const win=outcome(index,{bindingId:'harvest.restore.3',eventKind:'variableChange',eventReference:{key:'variableId',value:'harvest.moves'},phase:'payoff'});
 if(!condition(index.binding('harvest.restore.3')??{},'harvest.moves','eq',3))win.unresolved??='invalid-condition';
 const loss=outcome(index,{bindingId:'harvest.deadline.cta',eventKind:'timer',eventReference:{key:'behaviorId',value:'harvest.deadline'},phase:'cta'});
 const cta=index.component('harvest.cta'),ctaLabel=index.component('harvest.cta.label'),ctaBinding=index.binding('harvest.cta.click');
 const ctaEvent=ctaBinding&&index.event(ctaBinding.eventId);
 const primaryCta=cta?.contract==='native.button.v1'&&ctaLabel?.parentId===cta.id&&ctaLabel.contract==='native.text.v1'&&
  ctaEvent?.kind==='click'&&ctaEvent.componentId===cta.id&&ctaBinding.actions.some(action=>action.kind==='store')
  ?{componentId:cta.id,labelId:ctaLabel.id,bindingId:ctaBinding.id}:{unresolved:'invalid-cta'};
 const panel=index.component('harvest.board.lock');
 const outcomePanel=panel?{componentId:panel.id}:{unresolved:'missing-panel'};
 const roles={winEvent:win,timeoutEvent:loss,primaryCta,outcomePanel,rewardCue:win.cue??{unresolved:win.unresolved??'invalid-cue'}};
 for(const [role,value] of Object.entries(roles))if(value.unresolved)unresolved.push(role+':'+value.unresolved);
 if(index.component(timeoutCaptionId))roles.timeoutCaption={componentId:timeoutCaptionId};
 if(win.bindingId&&win.bindingId===loss.bindingId)unresolved.push('outcomes:shared-binding');
 return {status:unresolved.length?'unresolved':'resolved',module:'harvest-restore',version:1,roles,unresolved};
}

function endingFields(project,resolution){
 const puzzle=layout(project,'harvest.puzzle.layout');
 const panel=record(project,'components','harvest.board.lock');
 const cta=record(project,'components','harvest.cta');
 const winAudio=record(project,'components',resolution.roles?.rewardCue?.componentId);
 if(!puzzle||!panel||!cta||!layout(project,'harvest.cta.layout')||!layout(project,'harvest.instruction.layout')||!record(project,'eventBindings','harvest.cta.show'))return [];
 const descriptions={};
 for(const [role,description] of Object.entries(endingCues)){
  const assetId=record(project,'components','harvest.audio.'+role)?.assetSlots[0]?.assetId;
  if(assetId&&project.assets.some(asset=>asset.id===assetId&&isAudioMime(asset.mime)))descriptions[assetId]=description;
 }
 const windowWidth=Math.max(project.base.width,project.base.height);
 const rightEdge=puzzle.parameters.x+puzzle.parameters.scaleX*(panel.transform[4]+panel.parameters.width);
 return [
  {id:'landscape-inset',label:'Right margin around the landscape end card (px)',value:windowWidth-rightEdge,...fieldLimits['landscape-inset'],viewportWidth:windowWidth,panelRight:rightEdge},
  {id:'timeout-caption',label:'Centered text on the timeout end card',value:record(project,'components',timeoutCaptionId)?.parameters?.text??'',...standardText},
  ...(winAudio?[{id:'win-cue',label:'Sound played when the last harvest completes',value:winAudio.assetSlots[0]?.assetId,
   choices:Object.keys(descriptions),descriptions}]:[]),
 ];
}
function values(project){
 const binding=id=>record(project,'eventBindings',id);
 return {
  instruction:record(project,'variables','harvest.message')?.initial,
  'hint-delay':openingHint(binding('harvest.hint.show')?.condition)?.value,
  'reveal-duration':record(project,'gameplay','harvest.world.stage.1.reveal')?.parameters.seconds,
  message:message(binding('harvest.restore.1'))?.value,
  text:record(project,'components','harvest.cta.label')?.parameters.text,
  'payoff-hold':payoff(binding('harvest.payoff.finish'))?.value,
 };
}
function sharedCropTargets(project){
 const crops=new Map();
 for(const behavior of project.gameplay){
  if(behavior.kind!=='match-tile')continue;
  const component=record(project,'components',behavior.componentId);
  if(component?.parentId!=='harvest.board')continue;
  const artwork=project.components.find(item=>item.parentId===component.id&&item.contract==='native.image.v1');
  if(!artwork?.assetSlots[0])continue;
  const group=behavior.parameters.group;
  const crop=crops.get(group)??{cells:[],assets:new Set()};
  crop.cells.push(component.id);crop.assets.add(artwork.assetSlots[0].assetId);crops.set(group,crop);
 }
 const usedForOtherCrops=new Set([...crops.values()].flatMap(crop=>[...crop.assets]));
 return [...crops].flatMap(([group,crop])=>{
  if(crop.assets.size!==1)return [];
  const [assetId]=crop.assets;
  if([...crops.values()].filter(item=>item.assets.has(assetId)).length!==1)return [];
  const uses=project.components.filter(item=>item.assetSlots.some(slot=>slot.assetId===assetId));
  if(uses.some(item=>item.assetSlots.length!==1||item.assetSlots[0].slotId!=='source'))return [];
  const imageChoices=project.assets.filter(asset=>asset.mime.startsWith('image/')&&!usedForOtherCrops.has(asset.id)).map(asset=>asset.id);
  if(!imageChoices.length)return [];
  return [{id:'crop-'+group,label:group[0].toUpperCase()+group.slice(1)+' artwork',cropGroup:group,moment:'opening',
   componentIds:crop.cells,uses:uses.map(item=>item.id),imageChoices,
   fields:[{id:'shared-art',label:'Replace all '+uses.length+' uses of this source asset',confirm:true,value:assetId}]}];
 });
}
function reviewTargets(project,resolution){
 const current=values(project);
 if(!record(project,'gameplay','harvest.rules')||!message(record(project,'eventBindings','harvest.music.start'))||
  Object.values(current).some(value=>value===undefined)||targetDefinitions.some(target=>target.componentIds.some(id=>!record(project,'components',id))))
  return {module:'harvest-restore',moments:[],targets:[]};
 const targets=targetDefinitions.map(target=>({...target,fields:target.fields.map(([id,label])=>({id,label,value:current[id],...fieldLimits[id]}))}));
 const ending=endingFields(project,resolution);
 targets.find(target=>target.id==='ending').fields.push(...ending);
 if(ending.length)targets.push({id:'timeout-card',label:'Timeout end card',moment:'timeout',
  componentIds:['harvest.board.lock',timeoutCaptionId],fields:[
   ...ending.filter(field=>field.id!=='win-cue'),
   ...(record(project,'components',timeoutCaptionId)?[{id:'caption-alignment',label:'Caption alignment within the panel',choices:['center']}]:[]),
  ]});
 return {module:'harvest-restore',moments,targets:[...targets,...sharedCropTargets(project)],
  momentRules:{phaseVariable:'harvest.phase',progressVariable:'harvest.moves',goal:3,progressMoment:'first-harvest'},
  picker:{cropGroups:true}};
}
function reviewOperations(project,targetId,fields,changes,baseline,resolution){
 if(!changes||typeof changes!=='object'||Array.isArray(changes))throw Error('E_REVIEW_ARGUMENT');
 const keys=Object.keys(changes);
 if(!keys.length||keys.some(key=>!fields.includes(key)))throw Error('E_REVIEW_SCOPE');
 const operations=[],expected=globalThis.structuredClone(project);
 function update(collection,id,kind,key,change){
  const next=record(expected,collection,id);change(next);operations.push({kind,[key]:globalThis.structuredClone(next)});
 }
 const binding=(id,change)=>update('eventBindings',id,'putBinding','binding',change);
 for(const field of keys){
  const value=changes[field];
  if(field==='shared-art'){
   const target=sharedCropTargets(baseline).find(item=>item.id===targetId);
   if(!target?.imageChoices.includes(value))throw Error('E_REVIEW_ASSET_CHOICE');
   for(const id of target.uses){
    record(expected,'components',id).assetSlots=[{slotId:'source',assetId:value}];
    operations.push({kind:'replaceAsset',id,assetId:value});
   }
   continue;
  }
  if(field==='win-cue'){
   const cue=endingFields(baseline,resolution).find(item=>item.id===field);
   if(!cue?.choices.includes(value))throw Error('E_REVIEW_ASSET_CHOICE');
   const id=resolution.roles?.rewardCue?.componentId;
   if(!id)throw Error('E_REVIEW_ROLE_UNRESOLVED');
   record(expected,'components',id).assetSlots=[{slotId:'source',assetId:value}];
   operations.push({kind:'replaceAsset',id,assetId:value});continue;
  }
  assertValue(field,value);
  switch(field){
   case 'landscape-inset':{
    const panel=record(expected,'components','harvest.board.lock'),stageWidth=Math.max(expected.base.width,expected.base.height);
    const puzzle=layout(expected,'harvest.puzzle.layout');
    const insetDelta=stageWidth-value-puzzle.parameters.x-puzzle.parameters.scaleX*(panel.transform[4]+panel.parameters.width);
    for(const id of ['harvest.puzzle.layout','harvest.cta.layout','harvest.instruction.layout'])update('gameplay',id+'.responsive','putBehavior','behavior',entry=>{entry.parameters.x+=insetDelta;});
    break;
   }
   case 'timeout-caption':{
    const existing=record(expected,'components',timeoutCaptionId);
    if(existing){existing.parameters.text=value;operations.push({kind:'setParameter',id:timeoutCaptionId,key:'text',value});break;}
    const title=record(expected,'components','harvest.reward.title'),panel=record(expected,'components','harvest.board.lock');
    const button=record(expected,'components','harvest.cta'),puzzleLayout=layout(expected,'harvest.puzzle.layout').parameters;
    const buttonLayout=layout(expected,'harvest.cta.layout').parameters;
    const landscapeButtonTop=buttonLayout.y+buttonLayout.scaleY*button.transform[5];
    const landscapeOffset=((landscapeButtonTop-puzzleLayout.y)/puzzleLayout.scaleY-button.transform[5])/2;
    const group=component({id:timeoutLayoutId,label:'Timeout caption layout',contract:'native.group.v1',parentId:title.parentId,sceneId:title.sceneId,order:title.order});
    const responsive={id:timeoutLayoutId+'.responsive',componentId:timeoutLayoutId,kind:'responsive-layout',parameters:{x:0,y:landscapeOffset,scaleX:1,scaleY:1}};
    const caption=component({...title,id:timeoutCaptionId,label:'Timeout caption',parentId:group.id,
     transform:[1,0,0,1,title.transform[4],(panel.transform[5]+button.transform[5]-title.parameters.height)/2],
     parameters:{...title.parameters,text:value,visible:false,fontSize:22}});
    const show={id:timeoutBindingId,eventId:record(expected,'eventBindings','harvest.cta.show').eventId,
     condition:{all:[{variableId:'harvest.phase',op:'eq',value:'cta'},{variableId:'harvest.moves',op:'lt',value:3}]},
     actions:[
      {kind:'setComponent',componentId:'harvest.reward.title',key:'visible',value:false},
      {kind:'setComponent',componentId:'harvest.reward.detail',key:'visible',value:false},
      {kind:'setComponent',componentId:timeoutCaptionId,key:'visible',value:true},
     ]};
    expected.components.push(group,caption);expected.gameplay.push(responsive);expected.eventBindings.push(show);
    operations.push({kind:'createComponent',component:group},{kind:'createComponent',component:caption},{kind:'putBehavior',behavior:responsive},{kind:'putBinding',binding:show});
    break;
   }
   case 'caption-alignment':{
    const caption=record(expected,'components',timeoutCaptionId),panel=record(expected,'components','harvest.board.lock');
    const button=record(expected,'components','harvest.cta'),group=caption&&record(expected,'components',caption.parentId);
    const alternate=group&&layout(expected,group.id),panelLayout=panel&&layout(expected,panel.parentId),buttonLayout=button&&layout(expected,button.parentId);
    const isTranslation=object=>object.transform.slice(0,4).join(',')==='1,0,0,1';
    if(targetId!=='timeout-card'||!caption||!panel||!group||!button||!panelLayout||!buttonLayout||
     group.parentId!==panel.parentId||panel.parentId!=='harvest.puzzle.layout'||button.parentId!=='harvest.cta.layout'||
     ![caption,panel,group,button].every(isTranslation)||alternate?.parameters.x!==group.transform[4]||
     alternate.parameters.scaleX!==1||alternate.parameters.scaleY!==1)throw Error('E_REVIEW_ROLE_UNRESOLVED');
    const x=panel.transform[4]+(panel.parameters.width-caption.parameters.width)/2-group.transform[4];
    const y=(panel.transform[5]+button.transform[5]-caption.parameters.height)/2-group.transform[5];
    const landscapeButtonTop=buttonLayout.parameters.y+buttonLayout.parameters.scaleY*button.transform[5];
    const landscapeButtonY=(landscapeButtonTop-panelLayout.parameters.y)/panelLayout.parameters.scaleY;
    const landscapeOffset=(panel.transform[5]+landscapeButtonY-caption.parameters.height)/2-y;
    const transform=[...caption.transform];transform[4]=x;transform[5]=y;
    if(Math.abs(x-caption.transform[4])>.001||Math.abs(y-caption.transform[5])>.001)operations.push({kind:'setTransform',id:caption.id,transform});
    if(caption.parameters.align!=='center')operations.push({kind:'setParameter',id:caption.id,key:'align',value:'center'});
    if(Math.abs(landscapeOffset-alternate.parameters.y)>.001)update('gameplay',alternate.id,'putBehavior','behavior',entry=>{entry.parameters.y=landscapeOffset;});
    caption.transform=transform;caption.parameters.align='center';break;
   }
   case 'text':{
    const label=record(expected,'components',resolution.roles?.primaryCta?.labelId);
    if(!label)throw Error('E_REVIEW_ROLE_UNRESOLVED');
    label.parameters.text=value;operations.push({kind:'setParameter',id:label.id,key:'text',value});break;
   }
   case 'instruction':
    update('variables','harvest.message','putVariable','variable',entry=>{entry.initial=value;});
    binding('harvest.music.start',entry=>{message(entry).value=value;});break;
   case 'hint-delay':
    binding('harvest.hint.show',entry=>{
     if(entry.condition.any){openingHint(entry.condition).value=value;return;}
     const previous=entry.condition;
     entry.condition={any:[{all:[{variableId:'harvest.moves',op:'eq',value:0},{...previous,value}]},{all:[{variableId:'harvest.moves',op:'gt',value:0},previous]}]};
    });break;
   case 'reveal-duration':update('gameplay','harvest.world.stage.1.reveal','putBehavior','behavior',entry=>{entry.parameters.seconds=value;});break;
   case 'message':binding('harvest.restore.1',entry=>{message(entry).value=value;});break;
   case 'payoff-hold':binding('harvest.payoff.finish',entry=>{payoff(entry).value=value;});break;
   default:throw Error('E_REVIEW_SCOPE');
  }
 }
 return {operations,expected};
}

async function playToEndCard(page,project){
 const boardBehavior=(project.gameplay??[]).find(behavior=>behavior.kind==='match-board');
 if(!boardBehavior)return {available:false};
 const boardId=boardBehavior.componentId;
 for(let moveIndex=0;moveIndex<6;moveIndex++){
  const status=await page.evaluate(id=>{
   const rt=globalThis.toraRuntime,st=rt?.state?.();
   const board=st?.match?.boards?.[id];
   if(!board)return {done:false,missing:true};
   if(st.variables?.['harvest.phase']==='cta')return {done:true};
   if(st.variables?.['harvest.phase']==='payoff')return {payoff:true};
   return {done:false,busy:board.busy,move:board.legalMoves?.[0]??null};
  },boardId);
  if(status.done)return {available:true,mode:'real-play'};
  if(status.payoff){
   try{await page.waitForFunction(()=>globalThis.toraRuntime?.state?.()?.variables?.['harvest.phase']==='cta',{timeout:5500});return {available:true,mode:'real-play'};}
   catch{return {available:false};}
  }
  if(status.missing||!status.move)break;
  const coords=await page.evaluate(({from,to})=>{
   const rt=globalThis.toraRuntime,canvas=globalThis.document.querySelector('canvas');
   const audit=rt.auditSceneLayout({ids:[from,to],minTouchPx:1});
   const rect=canvas.getBoundingClientRect(),st=audit.viewport,sc=st.scale;
   const ox=(rect.width-st.width*sc)/2,oy=(rect.height-st.height*sc)/2;
   const center=id=>{const row=audit.interactive.find(item=>item.id===id);if(!row)return null;const b=row.bounds;return {x:rect.left+ox+(b.left+b.right)/2*sc,y:rect.top+oy+(b.top+b.bottom)/2*sc};};
   return {from:center(from),to:center(to)};
  },status.move);
  if(!coords.from||!coords.to)break;
  await page.mouse.click(coords.from.x,coords.from.y);
  await page.mouse.click(coords.to.x,coords.to.y);
  await page.waitForFunction(id=>{
   const st=globalThis.toraRuntime?.state?.();
   return st?.variables?.['harvest.phase']==='cta'||st?.variables?.['harvest.phase']==='payoff'||!st?.match?.boards?.[id]?.busy;
  },boardId,{timeout:3000}).catch(()=>{});
 }
 const finalPhase=await page.evaluate(()=>globalThis.toraRuntime?.state?.()?.variables?.['harvest.phase']);
 if(finalPhase==='payoff'){
  try{await page.waitForFunction(()=>globalThis.toraRuntime?.state?.()?.variables?.['harvest.phase']==='cta',{timeout:5500});return {available:true,mode:'real-play'};}
  catch{return {available:false};}
 }
 return {available:finalPhase==='cta',mode:'real-play'};
}

export const harvestRestoreModule=Object.freeze({
 id:'harvest-restore',version:1,supportsIntake:true,outcomeAssetId:'harvest.audio.victory.source',supportsLandscapeReview:true,outcomeKind:'harvest-outcome-audio',
 outcomeAudio:async()=>{const module=await import('../check-harvest-outcome-audio.mjs');return {exercise:module.exerciseHarvestOutcomeAudio,checkerVersion:module.HARVEST_OUTCOME_CHECKER_VERSION};},
 matches:index=>Boolean(index.behavior('harvest.rules')),
 resolveRoles:resolveHarvestRoles,reviewTargets,reviewOperations,
 canTransferOutcomeCue:(index,resolution)=>resolution.status==='resolved'&&resolution.roles.timeoutEvent.cue?.unresolved==='missing-cue'&&!index.asset('harvest.audio.victory.source'),
 timingFields:()=>({
  'hint-delay':{target:'opening',targets:['opening'],moment:'opening',label:'opening hint delay'},
  'reveal-duration':{target:'first-harvest',targets:['first-harvest'],moment:'first-harvest',label:'reveal duration'},
  'payoff-hold':{target:'ending',targets:['ending','cta'],moment:'end-card',label:'payoff hold'},
 }),
 intake:{
  validateMedia(assets,concept){
   const images=new Set(assets.filter(asset=>asset.mime.startsWith('image/')).map(asset=>asset.hash));
   if(images.size<5||!assets.some(asset=>isAudioMime(asset.mime)))throw Error('E_INTAKE_HARVEST_MEDIA');
   if(concept){
    const tiles=Object.values(concept.harvest.tiles).map(id=>assets.find(asset=>asset.id===id));
    if(tiles.length!==5||tiles.some(asset=>!asset?.mime.startsWith('image/'))||new Set(tiles.map(asset=>asset.hash)).size!==5)throw Error('E_INTAKE_HARVEST_MEDIA');
   }
  },
  validateConcept(concept){
   const audio=concept?.harvest?.audio;
   const supportedAudio=JSON.stringify(Object.keys(audio??{}).sort())===JSON.stringify(['ambient','complete','loss','match','reject'])||
    JSON.stringify(Object.keys(audio??{}).sort())===JSON.stringify(['ambient','complete','match','reject','repair']);
   if(concept?.experience?.mechanic!=='harvest-restore'||!concept.harvest||
    JSON.stringify(Object.keys(concept.harvest).sort())!==JSON.stringify(['audio','firstHintSeconds','seed','tiles','world'])||
    JSON.stringify(Object.keys(concept.harvest.tiles??{}).sort())!==JSON.stringify(['carrot','corn','eggplant','pumpkin','tomato'])||
    !supportedAudio||!Array.isArray(concept.harvest.world)||concept.harvest.world.length>64)throw Error('E_INTAKE_ARGUMENT');
   return [...Object.values(concept.harvest.tiles),...Object.values(audio),...concept.harvest.world.map(object=>object?.assetId)];
  },
  hydrateConcept(concept,assets){return {...concept,harvest:{...concept.harvest,assets}};},
 },
 qa:{phaseVariable:'harvest.phase',progressVariable:'harvest.moves',goalValue:3,deadlineBehaviorId:'harvest.deadline',playToEndCard},
});
