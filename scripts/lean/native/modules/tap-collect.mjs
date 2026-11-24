import {assertValue,fieldLimits,record} from '../review-fields.mjs';

const moments=[{id:'opening',label:'Opening'},{id:'end-card',label:'End card'}];
function resolveRoles(index){
 const target=index.component('target'),feedback=index.binding('target.feedback');
 const event=feedback&&index.event(feedback.eventId);
 if(target?.contract!=='native.button.v1'||event?.kind!=='click'||event.componentId!==target.id||
  !feedback.actions.some(action=>action.kind==='add'&&action.variableId==='score'))
  return {status:'unsupported',module:null,unresolved:['module']};
 const cta=index.component('success.cta'),label=index.component('success.cta.label');
 const store=index.binding('success.store'),click=store&&index.event(store.eventId),pulse=index.behavior('feedback.pulse');
 const primaryCta=cta?.contract==='native.button.v1'&&label?.contract==='native.text.v1'&&label.parentId===cta.id&&
  click?.kind==='click'&&click.componentId===cta.id&&store.actions.some(action=>action.kind==='store')
  ?{componentId:cta.id,labelId:label.id,bindingId:store.id}:null;
 const feedbackTiming=pulse?.kind==='animation'&&pulse.componentId===target.id&&pulse.parameters.property==='scale'&&
  feedback.actions.some(action=>action.kind==='animate'&&action.behaviorId===pulse.id)?{behaviorId:pulse.id}:null;
 const roles={primaryCta,feedbackTiming},unresolved=Object.keys(roles).filter(key=>!roles[key]);
 return {status:unresolved.length?'unresolved':'resolved',module:'tap-collect',version:1,roles,unresolved};
}
function reviewTargets(project,resolution){
 if(resolution.status!=='resolved')return {module:'tap-collect',moments:[],targets:[]};
 const {primaryCta,feedbackTiming}=resolution.roles;
 return {module:'tap-collect',moments,targets:[
  {id:'cta',label:'Install button',moment:'end-card',componentIds:[primaryCta.componentId],
   fields:[{id:'text',label:'Button wording',value:record(project,'components',primaryCta.labelId).parameters.text,...fieldLimits.text}]},
  {id:'tap-feedback',label:'Tap feedback',moment:'opening',componentIds:['target'],
   fields:[{id:'feedback-duration',label:'Tap feedback duration (s)',value:record(project,'gameplay',feedbackTiming.behaviorId).parameters.seconds,...fieldLimits['feedback-duration']}]},
 ]};
}
function reviewOperations(project,targetId,fields,changes,baseline,resolution){
 if(!changes||typeof changes!=='object'||Array.isArray(changes))throw Error('E_REVIEW_ARGUMENT');
 const keys=Object.keys(changes);
 if(!keys.length||keys.some(key=>!fields.includes(key)))throw Error('E_REVIEW_SCOPE');
 const operations=[],expected=globalThis.structuredClone(project);
 for(const field of keys){
  assertValue(field,changes[field]);
  if(field==='text'){
   const label=record(expected,'components',resolution.roles?.primaryCta?.labelId);
   if(!label)throw Error('E_REVIEW_ROLE_UNRESOLVED');
   label.parameters.text=changes[field];operations.push({kind:'setParameter',id:label.id,key:'text',value:changes[field]});
  }else if(field==='feedback-duration'){
   if(targetId!=='tap-feedback'||!reviewTargets(baseline,resolution).targets.some(target=>target.id===targetId))throw Error('E_REVIEW_SCOPE');
   const pulse=record(expected,'gameplay','feedback.pulse');pulse.parameters.seconds=changes[field];
   operations.push({kind:'putBehavior',behavior:globalThis.structuredClone(pulse)});
  }else throw Error('E_REVIEW_SCOPE');
 }
 return {operations,expected};
}
export const tapCollectModule=Object.freeze({
 id:'tap-collect',version:1,supportsIntake:false,
 matches:index=>Boolean(index.component('target')||index.component('success.cta')),
 resolveRoles,reviewTargets,reviewOperations,canTransferOutcomeCue:()=>false,
 timingFields:()=>({'feedback-duration':{target:'tap-feedback',targets:['tap-feedback'],moment:'opening',label:'tap feedback duration'}}),
});
