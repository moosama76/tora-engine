const check=(value,code)=>{if(!value)throw Error(code);};
export const identityMatrix=()=>[1,0,0,1,0,0];
export function validateMatrix(matrix){check(Array.isArray(matrix)&&matrix.length===6&&matrix.every(Number.isFinite),'E_SCENE_MATRIX');return matrix;}
export function multiplyMatrix(left,right){validateMatrix(left);validateMatrix(right);return [left[0]*right[0]+left[2]*right[1],left[1]*right[0]+left[3]*right[1],left[0]*right[2]+left[2]*right[3],left[1]*right[2]+left[3]*right[3],left[0]*right[4]+left[2]*right[5]+left[4],left[1]*right[4]+left[3]*right[5]+left[5]];}
export function inverseMatrix(matrix){validateMatrix(matrix);const determinant=matrix[0]*matrix[3]-matrix[1]*matrix[2];check(Math.abs(determinant)>1e-12,'E_SCENE_SINGULAR_TRANSFORM');return [matrix[3]/determinant,-matrix[1]/determinant,-matrix[2]/determinant,matrix[0]/determinant,(matrix[2]*matrix[5]-matrix[3]*matrix[4])/determinant,(matrix[1]*matrix[4]-matrix[0]*matrix[5])/determinant];}
export function localMatrix(object){const properties=object.properties??{},angle=Number(properties.rotation??0)*Math.PI/180,cosine=Math.cos(angle),sine=Math.sin(angle),scaleX=Number(properties['scale-x']??1),scaleY=Number(properties['scale-y']??1),matrix=[cosine*scaleX,sine*scaleX,-sine*scaleY,cosine*scaleY,Number(properties.x??0),Number(properties.y??0)];return object.matrix?multiplyMatrix(object.matrix,matrix):matrix;}
export function setLocalMatrix(object,matrix){object.matrix=validateMatrix(matrix);Object.assign(object.properties,{x:0,y:0,'scale-x':1,'scale-y':1,rotation:0});}
export function visualProjection(objects){const ids=new Set(objects.map(object=>object.id));return objects.map(object=>object.sceneDocumentVersion===2||!object.parentId||ids.has(object.parentId)?object:{...object,parentId:undefined});}
export function sceneDocument(objects,scenes){
 const byId=new Map(objects.map(object=>[object.id,object])),sceneIds=new Set(scenes.map(scene=>scene.id));
 check(byId.size===objects.length,'E_SCENE_DUPLICATE');
 for(const object of objects){check(sceneIds.has(object.sceneId),'E_SCENE_UNKNOWN_SCENE');const parent=byId.get(object.parentId);check(!object.parentId||parent,'E_SCENE_UNKNOWN_PARENT');check(!parent||parent.sceneId===object.sceneId,'E_SCENE_MEMBERSHIP');validateMatrix(localMatrix(object));const visited=new Set([object.id]);let ancestor=parent;while(ancestor){check(!visited.has(ancestor.id),'E_SCENE_CYCLE');visited.add(ancestor.id);ancestor=byId.get(ancestor.parentId);}}
 const children=parentId=>objects.filter(object=>(object.parentId??object.sceneId)===parentId);
 const ordered=[];const visit=parentId=>{for(const object of children(parentId)){ordered.push(object);visit(object.id);}};for(const scene of scenes)visit(scene.id);
 const world=id=>{const object=byId.get(id);if(!object){check(sceneIds.has(id),'E_SCENE_UNKNOWN_OBJECT');return identityMatrix();}return multiplyMatrix(object.parentId?world(object.parentId):identityMatrix(),localMatrix(object));};
 const roots=ids=>{const selected=new Set(ids);check(ids.length>0&&ids.every(id=>byId.has(id)),'E_SCENE_SELECTION');return ordered.filter(object=>{if(!selected.has(object.id))return false;let parent=byId.get(object.parentId);while(parent){if(selected.has(parent.id))return false;parent=byId.get(parent.parentId);}return true;});};
 return {objects:ordered,byId,children,world,roots};
}
export function moveVisuals(objects,scenes,ids,destination,{preserveWorld=true}={}){
 const document=sceneDocument(objects,scenes),roots=document.roots(ids),moving=new Set(roots.map(object=>object.id)),parent=document.byId.get(destination.parentId),sceneId=parent?.sceneId??destination.parentId;
 check(parent?['group','panel','button'].includes(parent.type):scenes.some(scene=>scene.id===sceneId),'E_MOVE_INCOMPATIBLE_PARENT');
 let ancestor=parent;while(ancestor){check(!moving.has(ancestor.id),'E_MOVE_CYCLE');ancestor=document.byId.get(ancestor.parentId);}
 const siblings=document.children(destination.parentId),before=destination.beforeId;
 check(before===undefined||siblings.some(object=>object.id===before),'E_MOVE_ORDER');
 const target=siblings.filter(object=>!moving.has(object.id));let index=before===undefined?target.length:target.findIndex(object=>object.id===before);
 if(index<0){const original=siblings.findIndex(object=>object.id===before);index=siblings.slice(0,original).filter(object=>!moving.has(object.id)).length;}
 target.splice(index,0,...roots);
 const result=globalThis.structuredClone(objects),byId=new Map(result.map(object=>[object.id,object]));
 for(const root of roots){const object=byId.get(root.id),changed=(root.parentId??root.sceneId)!==destination.parentId;if(changed&&preserveWorld)setLocalMatrix(object,multiplyMatrix(inverseMatrix(document.world(destination.parentId)),document.world(root.id)));object.parentId=parent?.id;const update=entry=>{if(entry.sceneId!==sceneId)entry.sceneIds=parent?.sceneIds??[sceneId];entry.sceneId=sceneId;for(const child of document.children(entry.id))update(byId.get(child.id));};if(changed)update(object);}
 const siblingIndex=new Map(target.map((object,index)=>[object.id,index]));result.sort((left,right)=>siblingIndex.has(left.id)&&siblingIndex.has(right.id)?siblingIndex.get(left.id)-siblingIndex.get(right.id):0);
 const output=[];const visit=parentId=>{const children=result.filter(object=>(object.parentId??object.sceneId)===parentId);if(parentId===destination.parentId)children.sort((left,right)=>siblingIndex.get(left.id)-siblingIndex.get(right.id));for(const child of children){output.push(child);visit(child.id);}};for(const scene of scenes)visit(scene.id);
 return sceneDocument(output,scenes).objects;
}
export function groupVisuals(objects,scenes,ids,group){
 const document=sceneDocument(objects,scenes),roots=document.roots(ids);check(!document.byId.has(group.id),'E_GROUP_ID');check(roots.every(object=>object.sceneId===roots[0].sceneId),'E_MOVE_SCENE_OWNERSHIP');
 const lineage=object=>{const result=[];let parent=document.byId.get(object.parentId);while(parent){result.push(parent.id);parent=document.byId.get(parent.parentId);}return [...result,object.sceneId];};
 const parentId=lineage(roots[0]).find(id=>roots.every(object=>lineage(object).includes(id)));
 const branches=roots.map(object=>{while(object.parentId&&object.parentId!==parentId)object=document.byId.get(object.parentId);return object;});
 const siblings=document.children(parentId),index=Math.max(...branches.map(object=>siblings.indexOf(object))),beforeId=siblings[index+1]?.id;
 const created={...globalThis.structuredClone(group),parentId:document.byId.has(parentId)?parentId:undefined,sceneId:roots[0].sceneId,sceneIds:roots[0].sceneIds,matrix:identityMatrix()};
 let result=moveVisuals([...objects,created],scenes,[created.id],{parentId,beforeId});
 result=moveVisuals(result,scenes,roots.map(object=>object.id),{parentId:created.id});return result;
}
export function removeVisuals(objects,scenes,ids,{retainChildren=false}={}){
 const document=sceneDocument(objects,scenes),roots=document.roots(ids);let result=globalThis.structuredClone(objects);const removed=new Set();
 for(const root of roots){if(retainChildren){const children=document.children(root.id);if(children.length)result=moveVisuals(result,scenes,children.map(child=>child.id),{parentId:root.parentId??root.sceneId,beforeId:root.id});removed.add(root.id);}else{const visit=id=>{removed.add(id);for(const child of document.children(id))visit(child.id);};visit(root.id);}}
 return sceneDocument(result.filter(object=>!removed.has(object.id)),scenes).objects;
}
