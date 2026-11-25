/** Structural schema generated from the same property and behavior vocabulary as the editor. */
import {contracts,behaviors,limits} from './contracts.mjs';
const obj=(properties,optional=[])=>({type:'object',additionalProperties:false,properties,required:Object.keys(properties).filter(k=>!optional.includes(k))});
const str={type:'string',maxLength:512},id={type:'string',pattern:'^[a-z][a-z0-9_.-]{0,95}$'},num={type:'number',minimum:-9007199254740991,maximum:9007199254740991},scalar={oneOf:[num,{type:'boolean'},str]},array=(items,maxItems)=>({type:'array',items,maxItems});
const node=obj({id,x:{type:'number',minimum:-4096,maximum:4096},y:{type:'number',minimum:-4096,maximum:4096},holdSeconds:{type:'number',minimum:0,maximum:60},cost:{type:'number',minimum:0,maximum:1e6}},['holdSeconds','cost']);
const edge=obj({id,from:id,to:id,speedScale:{type:'number',minimum:.05,maximum:20},enabled:{type:'boolean'},bidirectional:{type:'boolean'},cost:{type:'number',minimum:0,maximum:1e6}},['speedScale','enabled','bidirectional','cost']);
function descriptor(d){
 if(d.type==='number')return {type:d.integer?'integer':'number',minimum:d.min,maximum:d.max};
 if(d.type==='color')return {type:'string',pattern:'^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$'};
 if(d.type==='text')return {type:'string',maxLength:d.maxLength};if(d.type==='enum')return {enum:d.options};if(d.type==='boolean')return {type:'boolean'};
 if(d.type==='string-list')return {...array({type:'string',maxLength:32},d.maxItems),minItems:d.minItems};
 if(d.type==='node-list')return {...array(node,d.maxItems),minItems:d.minItems};
 if(d.type==='edge-list')return {...array(edge,d.maxItems),minItems:d.minItems};
 return array({oneOf:Object.entries({M:3,L:3,C:7,Q:5,Z:1}).map(([cmd,n])=>({type:'array',prefixItems:[{const:cmd},...Array.from({length:n-1},()=>({type:'number',minimum:-4096,maximum:4096}))],minItems:n,maxItems:n,items:false}))},256);
}
const specs=values=>obj(Object.fromEntries(Object.entries(values).map(([k,d])=>[k,descriptor(d)])),Object.keys(values).filter(k=>values[k].optional));
const matrix={type:'array',items:num,minItems:6,maxItems:6};
const ref=name=>({$ref:'#/$defs/'+name});
const comparison={variableId:id,op:{enum:['eq','ne','lt','lte','gt','gte']}};
const instanceComparison={instanceTarget:{enum:['self','other']},instanceField:{enum:['hp','value','tag']},op:{enum:['eq','ne','lt','lte','gt','gte']}};
const condition={oneOf:[obj({...comparison,value:scalar}),obj({...comparison,compareVariableId:id}),obj({...instanceComparison,value:scalar}),obj({...instanceComparison,compareVariableId:id}),obj({all:{...array(ref('Condition'),8),minItems:1}}),obj({any:{...array(ref('Condition'),8),minItems:1}})]};
const event={oneOf:[
 ...['click','boundaryExit','validMatch','invalidMatch','matchClear','launch','bodyRest','bodyJump','pathBlocked','instanceDepleted','strokeStart','strokeEnd','sliceHit','maskProgress','maskComplete','pointerUp','dragStart','holdStart','holdRelease'].map(kind=>obj({kind:{const:kind},componentId:id})),
 ...['bodyBounce','zoneCapture','contactEnd','dragDrop','dragReject'].map(kind=>obj({kind:{const:kind},componentId:id,otherId:id},['otherId'])),
 obj({kind:{const:'swipe'},componentId:id,direction:{enum:['up','down','left','right']}},['direction']),
 obj({kind:{const:'pathArrive'},componentId:id,nodeId:id},['nodeId']),obj({kind:{const:'jointBreak'},componentId:id,behaviorId:id}),
 obj({kind:{const:'contactBegin'},componentId:id,otherId:id},['otherId']),
 ...['sceneEnter','sceneExit'].map(kind=>obj({kind:{const:kind},sceneId:id})),
 obj({kind:{const:'timer'},behaviorId:id}),obj({kind:{const:'variableChange'},variableId:id}),
]};
for(const variant of event.oneOf){variant.properties={id,...variant.properties};variant.required.unshift('id');}
const action={oneOf:[
 obj({kind:{const:'setComponent'},componentId:id,key:str,value:scalar,valueVariableId:id},['value','valueVariableId']),obj({kind:{const:'setAsset'},componentId:id,assetId:id}),obj({kind:{const:'copyMatchAsset'},componentId:id,boardId:id}),
 ...['resetMatch','hintMatch','clearStrokes','resetMask'].map(kind=>obj({kind:{const:kind},componentId:id})),
 ...['set','add'].map(kind=>obj({kind:{const:kind},variableId:id,value:kind==='add'?num:scalar})),
 obj({kind:{const:'spawn'},prototypeId:id,x:num,y:num}),obj({kind:{const:'spawnAt'},prototypeId:id,targetComponentId:id,offsetX:num,offsetY:num,at:{enum:['target','self','other','midpoint','pointer']},jitterX:{type:'number',minimum:0,maximum:1024},jitterY:{type:'number',minimum:0,maximum:1024},count:{type:'integer',minimum:1,maximum:16},countVariableId:id},['at','jitterX','jitterY','count','countVariableId']),
 obj({kind:{const:'moveToComponent'},componentId:id,targetComponentId:id,seconds:num,target:{enum:['self','other']}},['target']),obj({kind:{const:'returnToOrigin'},componentId:id,seconds:num}),
 obj({kind:{const:'spawnOnPath'},prototypeId:id,networkBehaviorId:id,startNode:id,targetNode:id}),
 obj({kind:{const:'setVelocity'},componentId:id,vx:num,vy:num,vxVariableId:id,vyVariableId:id},['vx','vy','vxVariableId','vyVariableId']),obj({kind:{const:'applyImpulse'},componentId:id,ix:num,iy:num,vxVariableId:id,vyVariableId:id},['ix','iy','vxVariableId','vyVariableId']),
 obj({kind:{const:'setPosition'},componentId:id,x:num,y:num,xVariableId:id,yVariableId:id},['x','y','xVariableId','yVariableId']),obj({kind:{const:'stopBody'},componentId:id}),
 obj({kind:{const:'setPathEdge'},behaviorId:id,edgeId:id,enabled:{type:'boolean'},cost:{type:'number',minimum:0,maximum:1e6}},['cost']),
 obj({kind:{const:'setPathTarget'},componentId:id,targetNode:id}),
 obj({kind:{const:'setPathGate'},behaviorId:id,mode:{enum:['open','closed','cycle']},holdSeconds:{type:'number',minimum:0,maximum:10}}),
 obj({kind:{const:'compute'},variableId:id,op:{enum:['add','sub','mul','div','min','max','set','mod','floor','ceil','abs','clamp']},value:num,operandVariableId:id,round:{type:'boolean'},min:num,max:num},['value','operandVariableId','round','min','max']),
 obj({kind:{const:'random'},variableId:id,min:num,max:num,integer:{type:'boolean'}},['integer']),
 obj({kind:{const:'modifyInstanceState'},target:{enum:['self','other','component']},componentId:id,field:{enum:['hp','value','tag']},op:{enum:['add','sub','set']},value:scalar,variableId:id},['componentId','value','variableId']),
 obj({kind:{const:'launchToward'},componentId:id,targetMode:{enum:['pointer','component','nearest-team','angle-variable']},targetComponentId:id,team:{enum:['neutral','player','enemy','hazard','pickup']},angleVariableId:id,speed:{type:'number',minimum:1,maximum:4000},speedVariableId:id,orientToVelocity:{type:'boolean'}},['targetComponentId','team','angleVariableId','speed','speedVariableId','orientToVelocity']),
 obj({kind:{const:'despawn'},target:{enum:['self','other','both']}},['target']),...['restart','store'].map(kind=>obj({kind:{const:kind}})),obj({kind:{const:'changeScene'},sceneId:id}),
 obj({kind:{const:'cameraShake'},intensity:num,seconds:num}),obj({kind:{const:'screenFlash'},color:descriptor({type:'color'}),opacity:num,seconds:num}),
 obj({kind:{const:'floatingText'},text:str,componentId:id,color:descriptor({type:'color'}),fontSize:num,risePx:num,seconds:num}),
 ...['animate','stopAnimation','emit','playAudio'].map(kind=>obj({kind:{const:kind},behaviorId:id})),
]};
export const nativeSchema={$schema:'https://json-schema.org/draft/2020-12/schema',$id:'urn:tora:creative-project:2.1.0',title:'Creative Project 2.1 native scene',...obj({schemaVersion:{const:'2.1.0'},projectId:id,revisionId:{type:'string',minLength:1,maxLength:128},generationOrigin:{const:'human-authored'},creativeBrief:obj({goal:{type:'string',minLength:1,maxLength:2048},language:{const:'en'}}),base:obj({kind:{const:'native-scene'},runtimeId:{const:'tora-native'},runtimeVersion:{const:'1.0.0'},width:{type:'number',minimum:240,maximum:2048},height:{type:'number',minimum:240,maximum:2048},startScene:id,storeUrl:{type:'string',pattern:'^https://(play\\.google\\.com/store/apps/details\\?id=[a-zA-Z0-9._-]+|apps\\.apple\\.com/[a-zA-Z0-9/._?=&-]+)$'}}),scenes:{...array(obj({id,label:{type:'string',maxLength:80},role:{enum:['interactive','end-card']}}),16),minItems:1},components:array({oneOf:Object.values(contracts).map(c=>obj({id,label:{type:'string',maxLength:80},contract:{const:c.id},sceneId:id,parentId:id,order:num,transform:matrix,parameters:specs(c.properties),assetSlots:array(obj({slotId:{const:'source'},assetId:id}),1),prototype:{type:'boolean'}},['parentId']))},limits.components),variables:array({oneOf:['number','boolean','string'].map(type=>obj({id,label:{type:'string',maxLength:80},type:{const:type},initial:type==='number'?num:type==='boolean'?{type}:str}))},limits.variables),gameplay:array({oneOf:Object.entries(behaviors).map(([kind,params])=>obj({id,componentId:id,kind:{const:kind},parameters:specs(params)}))},limits.gameplay),events:array(event,384),eventBindings:array(obj({id,eventId:id,condition:ref('Condition'),actions:{...array(action,32),minItems:1}},['condition']),limits.eventBindings),assets:array(obj({id,hash:{type:'string',pattern:'^sha256:[a-f0-9]{64}$'},mime:{enum:['image/png','image/jpeg','audio/wav','audio/mpeg','model/tora-mesh']},bytes:{type:'integer',minimum:1,maximum:1048576},rights:{type:'string',minLength:1,maxLength:2048},provenance:{type:'string',minLength:1,maxLength:2048}},['provenance']),256),tombstones:{...array(id,4096),uniqueItems:true}}),$defs:{Condition:condition}};
