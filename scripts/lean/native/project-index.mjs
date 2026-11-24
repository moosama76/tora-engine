import {references} from './document.mjs';

export const projectIndexFormat='tora-project-index-1';
export const harvestRoleVersion=1;
const collections=['scenes','components','variables','gameplay','events','eventBindings','assets'];

export function createProjectIndex(project,contentHash){
 const byId=new Map(),byCollection=new Map(collections.map(name=>[name,new Map()])),reverse=new Map();
 const parents=new Map(),scenes=new Map(),bindingsByEvent=new Map();
 for(const collection of collections){
  for(const record of project[collection]){
   const entry={collection,record};
   byId.set(record.id,entry);
   byCollection.get(collection).set(record.id,record);
   if(collection==='components'){
    if(record.parentId)parents.set(record.id,record.parentId);
    scenes.set(record.id,record.sceneId);
   }
   if(collection==='eventBindings'){
    if(!bindingsByEvent.has(record.eventId))bindingsByEvent.set(record.eventId,[]);
    bindingsByEvent.get(record.eventId).push(record);
   }
  }
 }
 let referencesIndexed=false;
 return Object.freeze({
  format:projectIndexFormat,contentHash,
  record:id=>byId.get(id),
  entries:()=>byId.entries(),
  records:collection=>[...(byCollection.get(collection)?.values()??[])],
  referencedBy:id=>{
   if(!referencesIndexed){
    for(const {record} of byId.values()){
     for(const dependency of new Set([...references(record),record.parentId].filter(Boolean))){
      if(!reverse.has(dependency))reverse.set(dependency,[]);
      reverse.get(dependency).push(record.id);
     }
    }
    referencesIndexed=true;
   }
   return Object.freeze([...(reverse.get(id)??[])]);
  },
  parent:id=>parents.get(id),
  scene:id=>scenes.get(id),
  binding:id=>byCollection.get('eventBindings').get(id),
  bindingsForEvent:id=>[...(bindingsByEvent.get(id)??[])],
  event:id=>byCollection.get('events').get(id),
  behavior:id=>byCollection.get('gameplay').get(id),
  component:id=>byCollection.get('components').get(id),
  asset:id=>byCollection.get('assets').get(id),
 });
}

export class ProjectIndexCache{
 #indexes=new Map();
 get(project,contentHash){
  const key=projectIndexFormat+':'+contentHash;
  if(!this.#indexes.has(key)){
   if(this.#indexes.size>=8)this.#indexes.delete(this.#indexes.keys().next().value);
   this.#indexes.set(key,createProjectIndex(project,contentHash));
  }
  return this.#indexes.get(key);
 }
}

export {resolveHarvestRoles,resolveProjectRoles} from './modules/index.mjs';
