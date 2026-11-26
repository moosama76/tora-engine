export function createDropOccupancy(){
 const occupants=new Map(),itemZone=new Map();
 const release=itemId=>{const zoneId=itemZone.get(itemId);if(zoneId!==undefined){occupants.get(zoneId)?.delete(itemId);if(occupants.get(zoneId)?.size===0)occupants.delete(zoneId);}itemZone.delete(itemId);};
 const place=(itemId,zoneId)=>{release(itemId);if(zoneId===undefined||zoneId===null)return;if(!occupants.has(zoneId))occupants.set(zoneId,new Set());occupants.get(zoneId).add(itemId);itemZone.set(itemId,zoneId);};
 return {occupants,itemZone,release,place,clear(){occupants.clear();itemZone.clear();},items(zoneId){return [...(occupants.get(zoneId)??[])].sort();},zoneOf(itemId){return itemZone.get(itemId);},snapshot(){return {itemZone:Object.fromEntries(itemZone)}}};
}

export function resolveDropZone({itemId,tag='',zones,occupancy}){
 const candidates=zones.filter(zone=>zone.id!==itemId&&((zone.acceptTags?.length??0)===0||zone.acceptTags?.includes(tag)));
 candidates.sort((a,b)=>Number(b.itemTarget)-Number(a.itemTarget)||b.paintOrder-a.paintOrder||a.distance-b.distance||a.id.localeCompare(b.id));
 for(const zone of candidates){
  const items=occupancy.items(zone.id).filter(id=>id!==itemId),full=zone.capacity>0&&items.length>=zone.capacity;
  if(zone.snapMode==='reject')return {kind:'reject',zone,occupantId:items[0]};
  if(!full)return {kind:'accept',zone};
  if(zone.onOccupied==='emit')return {kind:'emit',zone,occupantId:items[0]};
  if(zone.onOccupied==='swap'&&items.length)return {kind:'swap',zone,occupantId:items[0]};
  return {kind:'reject',zone,occupantId:items[0]};
 }
 return null;
}

export function classifySwipe(start,end,minDistancePx=28,previousAt=-Infinity,now=0,cooldownMs=80){
 if(now-previousAt<cooldownMs)return null;
 const dx=end.x-start.x,dy=end.y-start.y;
 if(Math.max(Math.abs(dx),Math.abs(dy))<minDistancePx)return null;
 return Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
}

export function createHoldCharge(parameters,value){
 let current=value,direction=1;
 return {tick(dt){if(parameters.pingPong){current+=direction*parameters.ratePerSecond*dt;if(current>=parameters.max){current=parameters.max;direction=-1;}else if(current<=parameters.min){current=parameters.min;direction=1;}}else current=Math.max(parameters.min,Math.min(parameters.max,current+parameters.ratePerSecond*dt));return current;}};
}

export function createGestureTweens(){
 const active=new Map();
 return {to(id,from,to,seconds=.18,onDone){active.set(id,{from:{...from},to:{...to},seconds:Math.max(.02,seconds),elapsed:0,onDone});},cancel(id){active.delete(id);},clear(){active.clear();},tick(dt,apply){for(const [id,tween]of active){tween.elapsed+=dt;const t=Math.min(1,tween.elapsed/tween.seconds),eased=1-(1-t)**3;apply(id,{x:tween.from.x+(tween.to.x-tween.from.x)*eased,y:tween.from.y+(tween.to.y-tween.from.y)*eased});if(t===1){active.delete(id);tween.onDone?.();}}}};
}

export function computeJoystickVector(origin,current,radiusPx=56,deadZone=.12){
 const radius=Math.max(1,radiusPx),dx=current.x-origin.x,dy=current.y-origin.y,distance=Math.hypot(dx,dy),clamped=Math.min(distance,radius),raw=clamped/radius;
 const ux=distance>1e-6?dx/distance:0,uy=distance>1e-6?dy/distance:0,knobX=origin.x+ux*clamped,knobY=origin.y+uy*clamped;
 if(raw<=deadZone)return {nx:0,ny:0,magnitude:0,angle:0,knobX,knobY};
 const scaled=(raw-deadZone)/Math.max(1e-6,1-deadZone);
 return {nx:ux*scaled,ny:uy*scaled,magnitude:scaled,angle:Math.atan2(uy,ux)*180/Math.PI,knobX,knobY};
}
