import test from 'node:test';
import assert from 'node:assert/strict';
import {sceneDocument,moveVisuals,groupVisuals,removeVisuals,multiplyMatrix,inverseMatrix,visualProjection} from '../../scripts/lean/scene-document.mjs';
const scenes=[{id:'scene.main'},{id:'scene.other'}];
const object=(id,parentId,matrix=[1,0,0,1,0,0])=>({id,parentId,sceneId:'scene.main',type:'group',properties:{},matrix});
const equalMatrix=(actual,expected)=>actual.forEach((value,index)=>assert.ok(Math.abs(value-expected[index])<1e-9,`${actual} != ${expected}`));
test('projection validates ownership, cycles, duplicates and membership',()=>{
 assert.throws(()=>sceneDocument([object('a','missing')],scenes),/UNKNOWN_PARENT/);
 assert.throws(()=>sceneDocument([object('a','b'),object('b','a')],scenes),/CYCLE/);
 assert.throws(()=>sceneDocument([object('a'),object('a')],scenes),/DUPLICATE/);
 assert.throws(()=>sceneDocument([object('a'),{...object('b','a'),sceneId:'scene.other'}],scenes),/MEMBERSHIP/);
});
test('multi-move normalizes ancestor selections and adjusts insertion offsets',()=>{
 const source=[object('a'),object('child','a'),object('b'),object('c'),object('d')];
 const moved=moveVisuals(source,scenes,['b','child','a'],{parentId:'scene.main',beforeId:'d'});
 assert.deepEqual(sceneDocument(moved,scenes).children('scene.main').map(entry=>entry.id),['c','a','b','d']);
 assert.equal(moved.find(entry=>entry.id==='child').parentId,'a');
 assert.deepEqual(source.map(entry=>entry.id),['a','child','b','c','d']);
 assert.throws(()=>moveVisuals(source,scenes,['a'],{parentId:'child'}),/CYCLE/);
});
test('reparent and ungroup preserve affine world transforms including skew',()=>{
 const source=[object('parent',undefined,[0,2,-3,0,11,17]),object('child','parent',[1,.2,.4,1,9,13]),object('target',undefined,[2,1,0,3,100,20])];
 const world=sceneDocument(source,scenes).world('child');
 const moved=moveVisuals(source,scenes,['child'],{parentId:'target'});
 equalMatrix(sceneDocument(moved,scenes).world('child'),world);
 const ungrouped=removeVisuals(moved,scenes,['target'],{retainChildren:true});
 equalMatrix(sceneDocument(ungrouped,scenes).world('child'),world);
 equalMatrix(multiplyMatrix(source[0].matrix,inverseMatrix(source[0].matrix)),[1,0,0,1,0,0]);
 assert.throws(()=>inverseMatrix([1,1,1,1,0,0]),/SINGULAR/);
});
test('group and ungroup preserve sibling order and worlds',()=>{
 const source=[object('a'),object('b'),object('c')],group=object('group');
 const grouped=groupVisuals(source,scenes,['b','a'],group);
 assert.deepEqual(sceneDocument(grouped,scenes).children('group').map(entry=>entry.id),['a','b']);
 const restored=removeVisuals(grouped,scenes,['group'],{retainChildren:true});
 assert.deepEqual(restored.map(entry=>entry.id),['a','b','c']);
 for(const entry of restored)equalMatrix(sceneDocument(restored,scenes).world(entry.id),sceneDocument(source,scenes).world(entry.id));
});
test('cross-scene movement updates descendants and deletion removes only selected subtrees',()=>{
 const source=[object('a'),object('child','a'),object('b')];
 const moved=moveVisuals(source,scenes,['a'],{parentId:'scene.other'});
 assert.ok(moved.filter(entry=>entry.id!=='b').every(entry=>entry.sceneId==='scene.other'));
 assert.deepEqual(removeVisuals(moved,scenes,['a','child']).map(entry=>entry.id),['b']);
});
test('legacy visual ownership is projected without rewriting snapshots; v2 remains strict',()=>{
 const legacy=[object('label','controller')],before=JSON.stringify(legacy),projected=visualProjection(legacy);
 assert.equal(projected[0].parentId,undefined);
 assert.equal(sceneDocument(projected,scenes).objects.length,1);
 assert.equal(JSON.stringify(legacy),before);
 assert.throws(()=>sceneDocument(visualProjection([{...legacy[0],sceneDocumentVersion:2}]),scenes),/UNKNOWN_PARENT/);
});
test('same-scene reparenting preserves shared lifecycle membership for descendants',()=>{
 const source=[{...object('panel'),sceneIds:['scene.main','scene.other']},{...object('button','panel'),sceneIds:['scene.main','scene.other']},{...object('label','button'),sceneIds:['scene.main','scene.other']}];
 const moved=moveVisuals(source,scenes,['button'],{parentId:'scene.main'});
 assert.deepEqual(moved.find(entry=>entry.id==='button').sceneIds,['scene.main','scene.other']);
 assert.deepEqual(moved.find(entry=>entry.id==='label').sceneIds,['scene.main','scene.other']);
});
