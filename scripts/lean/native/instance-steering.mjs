export function seedFromText(text){
 let hash=2166136261;for(const char of String(text)){hash^=char.codePointAt(0);hash=Math.imul(hash,16777619);}return hash>>>0||1;
}
export function createRng(seed){
 const initial=seed>>>0||1;let state=initial;
 return {next(){state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;},between(min,max,integer=false){if(integer){const lo=Math.ceil(min),hi=Math.floor(max);return hi<lo?lo:Math.min(hi,lo+Math.floor((hi-lo+1)*this.next()));}return min+(max-min)*this.next();},reset(){state=initial;}};
}
export function findNearestByTeam(origin,nodes,team,maxRangePx=0,excludeId){
 let best=null,bestDistance=Infinity;
 for(const node of nodes){
  if(node.id===excludeId||node.team!==team)continue;
  const distance=Math.hypot(node.x-origin.x,node.y-origin.y);if(maxRangePx>0&&distance>maxRangePx)continue;
  if(distance<bestDistance||(distance===bestDistance&&node.id<best?.id)){best=node;bestDistance=distance;}
 }
 return best;
}
export function turnToward(current,target,maxDelta){
 let delta=((target-current+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;
 return current+Math.max(-maxDelta,Math.min(maxDelta,delta));
}
export function createInstanceSteering(seed){
 let rng=createRng(seed);const states=new Map(),headings=new Map();
 return {rng,states,headings,reset(){rng.reset();states.clear();headings.clear();},initialize(id,parameters){if(!states.has(id))states.set(id,{hp:parameters.hp,maxHp:parameters.maxHp,value:parameters.value,tag:parameters.tag??'',team:parameters.team});return states.get(id);},remove(id){states.delete(id);headings.delete(id);},snapshot(id){const state=states.get(id);return state?{...state}:undefined;}};
}
