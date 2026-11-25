import {createProjectIndex} from '../project-index.mjs';
import {harvestRestoreModule} from './harvest-restore.mjs';
import {starSalvageModule} from './star-salvage.mjs';
import {tapCollectModule} from './tap-collect.mjs';

export const modules=Object.freeze([harvestRestoreModule,starSalvageModule,tapCollectModule]);
export function getModule(id){
 const descriptor=modules.find(module=>module.id===id);
 if(!descriptor)throw Error('E_MODULE_UNKNOWN');
 return descriptor;
}
export function detectModule(index){
 return modules.find(module=>module.matches(index))??null;
}
export function resolveProjectRoles(index){
 const descriptor=detectModule(index);
 if(descriptor)return descriptor.resolveRoles(index);
 const primitiveKinds=new Set(['erase-mask','draw-stroke','physics-joint','instance-state','steer','drop-zone','swipe-input','hold-charge','physics-body','aim-launch','capture-zone','oscillate','physics-3d','oscillate-3d','aim-launch-3d','capture-zone-3d','path-network','path-agent','path-gate','value-meter','camera-follow']);
 if(index.records('gameplay').some(behavior=>primitiveKinds.has(behavior.kind))){
  let fallback=null;
  for(const binding of index.records('eventBindings')){
   if(!binding.actions.some(action=>action.kind==='store'))continue;
   const event=index.event(binding.eventId),button=event?.kind==='click'?index.component(event.componentId):undefined,label=button&&index.records('components').find(component=>component.parentId===button.id&&component.contract==='native.text.v1');
   if(button?.contract==='native.button.v1'&&label){
    const hit={status:'resolved',module:'tora-native-primitives',version:1,roles:{primaryCta:{componentId:button.id,labelId:label.id,bindingId:binding.id}},unresolved:[]};
    if(!/fail|loss|timeout/i.test(button.sceneId))return hit;
    fallback??=hit;
   }
  }
  if(fallback)return fallback;
  return {status:'unresolved',module:'tora-native-primitives',unresolved:['primaryCta']};
 }
 return {status:'unsupported',module:null,unresolved:['module']};
}
export function moduleForProject(project){
 const index=createProjectIndex(project),descriptor=detectModule(index);
 return {descriptor,index,resolution:descriptor?descriptor.resolveRoles(index):null};
}
export function timingFieldEntries(moduleId){
 if(moduleId==='tora-native-primitives')return [];
 const selected=moduleId?[getModule(moduleId)]:modules;
 return selected.flatMap(module=>Object.entries(module.timingFields()).map(([field,spec])=>({
  moduleId:module.id,field,target:spec.target,targets:spec.targets??[spec.target],moment:spec.moment,label:spec.label,
 })));
}
export function matchTimingField({field,target,moment,moduleId}={}){
 return timingFieldEntries(moduleId).find(entry=>
  (!field||entry.field===field)&&
  (!target||entry.targets.includes(target))&&
  (!moment||moment==='live'||entry.moment===moment)
 )??null;
}
export {harvestRestoreModule,starSalvageModule,tapCollectModule};
export {resolveHarvestRoles} from './harvest-restore.mjs';
