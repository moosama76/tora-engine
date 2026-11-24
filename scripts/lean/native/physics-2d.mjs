const length=(x,y)=>Math.hypot(x,y);
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const radius=body=>Math.max(1,Math.min(body.width,body.height)/2);

function boxVertices(body){
 const cos=Math.cos(body.angle??0),sin=Math.sin(body.angle??0),hw=body.width/2,hh=body.height/2;
 return [[-hw,-hh],[hw,-hh],[hw,hh],[-hw,hh]].map(([lx,ly])=>({x:body.x+lx*cos-ly*sin,y:body.y+lx*sin+ly*cos}));
}

function boxBoxContact(a,b){
 const vertsA=boxVertices(a),vertsB=boxVertices(b);
 const axes=[a.angle??0,(a.angle??0)+Math.PI/2,b.angle??0,(b.angle??0)+Math.PI/2];
 let minOverlap=Infinity,bestNx=1,bestNy=0;
 for(const theta of axes){
  const ax=Math.cos(theta),ay=Math.sin(theta);
  let aMin=Infinity,aMax=-Infinity,bMin=Infinity,bMax=-Infinity;
  for(const v of vertsA){const p=v.x*ax+v.y*ay;if(p<aMin)aMin=p;if(p>aMax)aMax=p;}
  for(const v of vertsB){const p=v.x*ax+v.y*ay;if(p<bMin)bMin=p;if(p>bMax)bMax=p;}
  const overlap=Math.min(aMax,bMax)-Math.max(aMin,bMin);
  if(overlap<=0)return null;
  if(overlap<minOverlap){minOverlap=overlap;bestNx=ax;bestNy=ay;}
 }
 if((a.x-b.x)*bestNx+(a.y-b.y)*bestNy<0){bestNx=-bestNx;bestNy=-bestNy;}
 return {nx:bestNx,ny:bestNy,penetration:minOverlap};
}

function circleBoxContact(circle,box){
 const r=radius(circle),angle=-(box.angle??0),cos=Math.cos(angle),sin=Math.sin(angle);
 const dx=circle.x-box.x,dy=circle.y-box.y,lx=dx*cos-dy*sin,ly=dx*sin+dy*cos,hw=box.width/2,hh=box.height/2;
 const qx=clamp(lx,-hw,hw),qy=clamp(ly,-hh,hh);let ox=lx-qx,oy=ly-qy,distance=length(ox,oy),penetration;
 if(distance>=r)return null;
 if(distance<.0001){
  const faces=[{d:hw-Math.abs(lx),x:lx>=0?1:-1,y:0},{d:hh-Math.abs(ly),x:0,y:ly>=0?1:-1}].sort((a,b)=>a.d-b.d);
  ox=faces[0].x;oy=faces[0].y;penetration=r+faces[0].d;
 }else{ox/=distance;oy/=distance;penetration=r-distance;}
 const ca=Math.cos(box.angle??0),sa=Math.sin(box.angle??0);
 return {nx:ox*ca-oy*sa,ny:ox*sa+oy*ca,penetration};
}

function collide(body,other,onEvent){
 if(body.captured||other.captured)return;
 let nx=body.x-other.x,ny=body.y-other.y,penetration;
 if(body.shape==='circle'&&other.shape==='circle'){
  const distance=length(nx,ny),overlap=radius(body)+radius(other)-distance;
  if(overlap<=0)return;
  penetration=overlap;
  if(distance>.0001){nx/=distance;ny/=distance;}else{nx=1;ny=0;}
 }else if(body.shape==='circle'&&other.shape==='box'){
  const contact=circleBoxContact(body,other);if(!contact)return;
  nx=contact.nx;ny=contact.ny;penetration=contact.penetration;
 }else if(body.shape==='box'&&other.shape==='circle'){
  const contact=circleBoxContact(other,body);if(!contact)return;
  nx=-contact.nx;ny=-contact.ny;penetration=contact.penetration;
 }else if(body.shape==='box'&&other.shape==='box'){
  const contact=boxBoxContact(body,other);if(!contact)return;
  nx=contact.nx;ny=contact.ny;penetration=contact.penetration;
 }else return;
 const inverseBody=body.mode==='dynamic'?1:0,inverseOther=other.mode==='dynamic'?1:0,total=inverseBody+inverseOther;
 if(!total)return;
 body.x+=nx*penetration*inverseBody/total;body.y+=ny*penetration*inverseBody/total;
 if(other.mode==='dynamic'){other.x-=nx*penetration*inverseOther/total;other.y-=ny*penetration*inverseOther/total;}
 const rvx=body.vx-(other.vx??0),rvy=body.vy-(other.vy??0),normalSpeed=rvx*nx+rvy*ny;
 if(normalSpeed>=0)return;
 const restitution=Math.max(body.restitution??0,other.restitution??0),impulse=-(1+restitution)*normalSpeed/total;
 body.vx+=nx*impulse*inverseBody;body.vy+=ny*impulse*inverseBody;
 if(other.mode==='dynamic'){other.vx-=nx*impulse*inverseOther;other.vy-=ny*impulse*inverseOther;}
 body.atRest=false;body.restElapsed=0;
 if(other.mode==='dynamic'){other.atRest=false;other.restElapsed=0;}
 if(Math.abs(normalSpeed)>4){
  onEvent('bodyBounce',body,other,{speed:Math.abs(normalSpeed)});
  if(other.mode==='dynamic')onEvent('bodyBounce',other,body,{speed:Math.abs(normalSpeed)});
 }
}

function capture(body,zones,dt,onEvent){
 if(body.mode!=='dynamic'||body.captured)return;
 for(const zone of zones){
  const dx=zone.x-body.x,dy=zone.y-body.y,distance=length(dx,dy);
  if(distance>=zone.radius*2.5)continue;
  if(distance>zone.radius&&distance>.001&&zone.pullStrength>0){
   const strength=zone.pullStrength*(1-distance/(zone.radius*2.5));body.vx+=dx/distance*strength*dt;body.vy+=dy/distance*strength*dt;
  }
  if(distance<zone.radius&&length(body.vx,body.vy)<=zone.maxCaptureSpeed){
   body.captured=true;body.atRest=true;body.vx=zone.stopBody?0:body.vx;body.vy=zone.stopBody?0:body.vy;
   if(zone.stopBody){body.x=zone.x;body.y=zone.y;}
   onEvent('zoneCapture',body,zone,{});return;
  }
 }
}

export function stepPhysics({bodies,zones=[],bounds,dt,onEvent=()=>{}}){
 const dynamic=bodies.filter(body=>body.mode==='dynamic'&&!body.captured);
 const fastest=dynamic.reduce((speed,body)=>Math.max(speed,length(body.vx,body.vy)),0);
 const smallest=dynamic.reduce((size,body)=>Math.min(size,radius(body)),24);
 const steps=Math.min(16,Math.max(1,Math.ceil(fastest*dt/(smallest*.45)))),h=dt/steps;
 for(let step=0;step<steps;step++){
  for(const body of dynamic){
   body.vy+=(body.gravity??0)*h;
   let speed=length(body.vx,body.vy);
   if(speed>body.maxSpeed){const cap=body.maxSpeed/speed;body.vx*=cap;body.vy*=cap;speed=body.maxSpeed;}
   body.x+=body.vx*h;body.y+=body.vy*h;
   const nextSpeed=Math.max(0,speed-(body.friction??0)*h),damping=Math.exp(-(body.linearDamping??0)*h);
   if(speed>.0001){const scale=nextSpeed/speed*damping;body.vx*=scale;body.vy*=scale;}
   if(body.spinToRotation)body.angle=(body.angle??0)+length(body.vx,body.vy)*h/radius(body)*(body.vx<0?-1:1);
  }
  for(let index=0;index<dynamic.length;index++){
   const body=dynamic[index];
   for(const other of bodies)if(other.id!==body.id&&other.mode!=='dynamic')collide(body,other,onEvent);
   for(let other=index+1;other<dynamic.length;other++)collide(dynamic[other],body,onEvent);
   const hx=body.shape==='box'?body.width/2:radius(body),hy=body.shape==='box'?body.height/2:radius(body);
   if(body.wallBounce){
    if(body.x-hx<bounds.left){body.x=bounds.left+hx;if(body.vx<0){onEvent('bodyBounce',body,null,{speed:Math.abs(body.vx)});body.vx=-body.vx*body.restitution;}}
    if(body.x+hx>bounds.right){body.x=bounds.right-hx;if(body.vx>0){onEvent('bodyBounce',body,null,{speed:Math.abs(body.vx)});body.vx=-body.vx*body.restitution;}}
    if(body.y-hy<bounds.top){body.y=bounds.top+hy;if(body.vy<0){onEvent('bodyBounce',body,null,{speed:Math.abs(body.vy)});body.vy=-body.vy*body.restitution;}}
    if(body.y+hy>bounds.bottom){body.y=bounds.bottom-hy;if(body.vy>0){onEvent('bodyBounce',body,null,{speed:Math.abs(body.vy)});body.vy=-body.vy*body.restitution;}}
   }else if(!body.exited&&(body.x+hx<bounds.left||body.x-hx>bounds.right||body.y+hy<bounds.top||body.y-hy>bounds.bottom)){
    body.exited=true;onEvent('boundaryExit',body,null,{});
   }
   capture(body,zones,h,onEvent);
  }
 }
 for(const body of dynamic){
  const speed=length(body.vx,body.vy);
  if(speed<body.restSpeed&&!body.captured){
   body.restElapsed=(body.restElapsed??0)+dt;
   if(body.restElapsed>=body.restDelaySeconds&&!body.atRest){body.atRest=true;body.vx=0;body.vy=0;onEvent('bodyRest',body,null,{});}
  }else if(speed>=body.restSpeed){body.restElapsed=0;body.atRest=false;}
 }
}

export function predictTrajectory({body,bodies,zones=[],bounds,dots=8,bounces=1}){
 const copy=source=>({...source});
 const simulated=copy(body),others=bodies.filter(item=>item.id!==body.id).map(copy),all=[simulated,...others],points=[];
 let bounceCount=0,finished=false;
 const onEvent=(kind,_body,_other,meta)=>{
  if(kind==='bodyBounce'&&meta.sourceId===body.id)bounceCount++;
  if(kind==='zoneCapture'&&meta.sourceId===body.id)finished=true;
 };
 for(let tick=0;tick<90&&points.length<dots&&!finished&&bounceCount<=bounces;tick++){
  stepPhysics({bodies:all,zones,bounds,dt:1/60,onEvent:(kind,source,other,meta)=>onEvent(kind,source,other,{...meta,sourceId:source.id})});
  if(tick%Math.max(1,Math.floor(90/dots))===0)points.push({x:simulated.x,y:simulated.y});
 }
 return points;
}
