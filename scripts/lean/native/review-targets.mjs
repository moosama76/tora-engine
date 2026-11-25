import {moduleForProject} from './modules/index.mjs';
import {assertValue,fieldLimits,record} from './review-fields.mjs';

const primitiveBehaviors=new Set(['erase-mask','draw-stroke','physics-joint','instance-state','steer','drop-zone','swipe-input','hold-charge','physics-body','aim-launch','capture-zone','oscillate','physics-3d','oscillate-3d','aim-launch-3d','capture-zone-3d','path-network','path-agent','path-gate','value-meter','camera-follow']);
const primitiveProject=project=>project.gameplay.some(behavior=>primitiveBehaviors.has(behavior.kind));
function primaryCta(project){
 let fallback=null;
 for(const binding of project.eventBindings){
  if(!binding.actions.some(action=>action.kind==='store'))continue;
  const event=project.events.find(item=>item.id===binding.eventId),button=event?.kind==='click'?record(project,'components',event.componentId):undefined;
  const label=button&&project.components.find(component=>component.parentId===button.id&&component.contract==='native.text.v1');
  if(button?.contract==='native.button.v1'&&label){
   const hit={componentId:button.id,labelId:label.id};
   if(!/fail|loss|timeout/i.test(button.sceneId))return hit;
   fallback??=hit;
  }
 }
 return fallback;
}
export function reviewTargets(project){
 const {descriptor,index,resolution}=moduleForProject(project);
 if(descriptor)return descriptor.reviewTargets(project,resolution,index);
 if(!primitiveProject(project))return {moments:[],targets:[]};
 const cta=primaryCta(project),moments=[{id:'opening',label:'Opening'},{id:'first-input',label:'First input'},{id:'end-card',label:'End card'},{id:'timeout',label:'Timeout'}];
 return {module:'tora-native-primitives',moments,targets:cta?[{id:'cta',label:'Install button',moment:'end-card',componentIds:[cta.componentId],fields:[{id:'text',label:'Button wording',value:record(project,'components',cta.labelId).parameters.text,...fieldLimits.text}]}]:[]};
}
export function reviewOperations(project,targetId,fields,changes,baseline=project){
 const {descriptor,index,resolution}=moduleForProject(baseline);
 if(descriptor)return descriptor.reviewOperations(project,targetId,fields,changes,baseline,resolution,index);
 if(!primitiveProject(baseline)||targetId!=='cta'||!fields.includes('text')||Object.keys(changes).length!==1)throw Error('E_REVIEW_SCOPE');
 assertValue('text',changes.text);const cta=primaryCta(baseline);if(!cta)throw Error('E_REVIEW_ROLE_UNRESOLVED');
 const expected=globalThis.structuredClone(project),label=record(expected,'components',cta.labelId);label.parameters.text=changes.text;
 return {operations:[{kind:'setParameter',id:label.id,key:'text',value:changes.text}],expected};
}
export {assertValue,pixelText,fieldLimits} from './review-fields.mjs';
