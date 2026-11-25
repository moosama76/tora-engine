export function segmentsIntersect(a,b,c,d){
 const cross=(p,q,r)=>(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x),ab1=cross(a,b,c),ab2=cross(a,b,d),cd1=cross(c,d,a),cd2=cross(c,d,b),epsilon=1e-8;
 if(Math.abs(ab1)<epsilon&&Math.abs(ab2)<epsilon&&Math.abs(cd1)<epsilon&&Math.abs(cd2)<epsilon)return Math.max(Math.min(a.x,b.x),Math.min(c.x,d.x))<=Math.min(Math.max(a.x,b.x),Math.max(c.x,d.x))+epsilon&&Math.max(Math.min(a.y,b.y),Math.min(c.y,d.y))<=Math.min(Math.max(a.y,b.y),Math.max(c.y,d.y))+epsilon;
 return (ab1>0)!==(ab2>0)&&(cd1>0)!==(cd2>0);
}
function pointInPolygon(point,polygon){
 let inside=false;
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
  const a=polygon[i],b=polygon[j];
  if((a.y>point.y)!==(b.y>point.y)&&point.x<(b.x-a.x)*(point.y-a.y)/(b.y-a.y)+a.x)inside=!inside;
 }
 return inside;
}
export function segmentHitsPolygon(a,b,polygon){
 if(polygon.length>=3&&(pointInPolygon(a,polygon)||pointInPolygon(b,polygon)))return true;
 for(let index=0;index<polygon.length;index++)if(segmentsIntersect(a,b,polygon[index],polygon[(index+1)%polygon.length]))return true;
 return false;
}
export function createStrokeStore(parameters){
 const config=parameters;let strokes=[],active=null,serial=0;
 const bounded=stroke=>({...stroke,points:stroke.points.map(point=>({...point}))});
 return {begin(point){const stroke={id:++serial,points:[{...point}],age:0,hitIds:new Set()};active=stroke;strokes.push(stroke);if(strokes.length>config.maxStrokes)strokes.shift();return stroke;},add(point){if(!active||active.points.length>=config.maxPoints)return false;const previous=active.points[active.points.length-1];if(Math.hypot(point.x-previous.x,point.y-previous.y)<config.minSegmentPx)return false;active.points.push({...point});return true;},end(){const stroke=active;active=null;return stroke?bounded(stroke):undefined;},cancel(){if(active)strokes=strokes.filter(stroke=>stroke!==active);active=null;},clear(){active=null;strokes=[];},tick(dt){for(const stroke of strokes)stroke.age+=dt;strokes=strokes.filter(stroke=>stroke===active||stroke.age<.18||config.mode!=='slice-blade');},get active(){return active;},get strokes(){return strokes;}};
}
export function strokeWalls(stroke,width){
 const walls=[];for(let index=1;index<stroke.points.length;index++){const a=stroke.points[index-1],b=stroke.points[index],length=Math.hypot(b.x-a.x,b.y-a.y);if(length<.001)continue;walls.push({id:`stroke-${stroke.id}-${index}`,strokeId:stroke.id,mode:'static',shape:'box',x:(a.x+b.x)/2,y:(a.y+b.y)/2,width:length,height:Math.max(2,width),angle:Math.atan2(b.y-a.y,b.x-a.x),restitution:.8});}return walls;
}
