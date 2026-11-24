const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const distance=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);

export function createPathNetwork({id,nodes,edges,gates=[],onEvent=()=>{}}){
 const nodeMap=new Map(nodes.map(node=>[node.id,{...node}]));
 const edgeMap=new Map(edges.map(edge=>[edge.id,{speedScale:1,enabled:true,bidirectional:false,cost:0,...edge}]));
 const gateMap=new Map(gates.map(gate=>[gate.id,{...gate}]));
 const agents=new Map(),agentsById=agents;
 let elapsed=0,tickIndex=0;
 const node=id=>nodeMap.get(id);
 const gateAt=nodeId=>[...gateMap.values()].find(gate=>gate.parameters.nodeId===nodeId);
 const gateOpen=gate=>{
  const p=gate.parameters;if(p.mode==='open')return true;if(p.mode==='closed')return false;
  const period=p.openSeconds+p.closedSeconds,phase=(elapsed+p.phaseOffsetSeconds)%period;
  return phase<p.openSeconds;
 };
 const outgoing=nodeId=>[...edgeMap.values()].filter(edge=>edge.enabled&&(edge.from===nodeId||edge.bidirectional&&edge.to===nodeId)).sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0);
 const edgeBetween=(from,to)=>[...edgeMap.values()].find(edge=>edge.enabled&&(edge.from===from&&edge.to===to||edge.bidirectional&&edge.from===to&&edge.to===from));
 function route(from,to){
  if(from===to)return [from];
  const distances=new Map([[from,0]]),previous=new Map(),open=new Set([from]);
  while(open.size){
   const current=[...open].sort((a,b)=>(distances.get(a)-distances.get(b))||(a<b?-1:a>b?1:0))[0];open.delete(current);
   if(current===to)break;
   for(const edge of outgoing(current)){
    const next=edge.from===current?edge.to:edge.from,gate=gateAt(next),p=node(next);
    const penalty=gate?gate.parameters.holdSeconds*90+(gateOpen(gate)?0:gate.parameters.closedSeconds*90):0;
    const cost=distances.get(current)+distance(node(current),p)/edge.speedScale+edge.cost+(p.cost??0)+penalty;
    if(cost>=(distances.get(next)??Infinity))continue;
    distances.set(next,cost);previous.set(next,current);open.add(next);
   }
  }
  if(!distances.has(to))return [];
  const result=[to];let current=to;while(current!==from){current=previous.get(current);result.unshift(current);}return result;
 }
 function replan(agent){
  const hasSeg=agent.route.length>=2&&agent.segment<agent.route.length-1;
  if(!hasSeg){
   const current=agent.route[Math.min(agent.segment,agent.route.length-1)]??agent.startNode;
   const fresh=route(current,agent.target);
   agent.route=fresh.length?fresh:[current];agent.segment=0;agent.distance=0;agent.arrived=false;
   agent.active=agent.route.length>=2;return;
  }
  const from=agent.route[agent.segment],next=agent.route[agent.segment+1],segLength=distance(node(from),node(next));
  if(agent.arrived||agent.distance>=segLength-.0001){
   const fresh=route(next,agent.target);
   agent.route=fresh.length?fresh:[next];agent.segment=0;agent.distance=0;agent.arrived=false;
   agent.active=agent.route.length>=2;return;
  }
  const tail=route(next,agent.target);
  agent.route=tail.length?[from,...tail]:[from,next];
  agent.segment=0;
 }
 function addAgent(parameters){
  const initial=route(parameters.startNode,parameters.targetNode),start=node(parameters.startNode);
  const nextPos=initial.length>=2?node(initial[1]):start;
  const heading=initial.length>=2?Math.atan2(nextPos.y-start.y,nextPos.x-start.x):0;
  const direction=Math.floor((((heading%(Math.PI*2))+Math.PI*2+1e-6)%(Math.PI*2))/(Math.PI/2))%4;
  const agent={...parameters,loop:parameters.loop??'none',originNode:parameters.startNode,destinationNode:parameters.targetNode,target:parameters.targetNode,networkId:id,route:initial.length?initial:[parameters.startNode],segment:0,distance:0,x:start.x,y:start.y,heading,frame:[0,1,2,3][direction],flipX:Math.cos(heading)<0,hold:0,arrived:false,active:parameters.active&&initial.length>=2,blockedTicks:0,blockedEmitted:false,speedMultiplier:1};
  agents.set(agent.id,agent);return agent;
 }
 function complete(agent){
  emit('pathArrive',agent,agent.target);
  if(agent.loop==='none'){agent.active=false;return;}
  const from=agent.target;
  const to=agent.loop==='ping-pong'?(from===agent.destinationNode?agent.originNode:agent.destinationNode):(from===agent.originNode?agent.destinationNode:agent.originNode);
  agent.startNode=from;agent.target=to;agent.route=route(from,to);agent.segment=0;agent.distance=0;agent.arrived=false;
  if(agent.route.length<2)agent.active=false;
 }
 function emit(kind,agent,nodeId){onEvent(kind,{componentId:agent.id,nodeId});}
 function arrive(agent,dt){
  const next=agent.route[agent.segment+1],gate=gateAt(next);
  if(gate&&!gateOpen(gate)){agent.blockedTicks++;if(agent.blockedTicks>=30&&!agent.blockedEmitted){agent.blockedEmitted=true;emit('pathBlocked',agent,next);}return;}
  if(!agent.arrived){
   agent.arrived=true;
   if(agent.segment+1===agent.route.length-1){if(next===agent.target)complete(agent);else{agent.active=false;if(!agent.blockedEmitted){agent.blockedEmitted=true;emit('pathBlocked',agent,next);}}return;}
   agent.hold=Math.max(node(next).holdSeconds??0,gate?.parameters.holdSeconds??0);
  }
  if(agent.hold>0){agent.hold=Math.max(0,agent.hold-dt);agent.blockedTicks++;if(agent.blockedTicks>=30&&!agent.blockedEmitted){agent.blockedEmitted=true;emit('pathBlocked',agent,next);}return;}
  agent.segment++;agent.distance=0;agent.arrived=false;agent.blockedTicks=0;agent.blockedEmitted=false;
 }
 function headway(agent,desired){
  if(agent.spacing<=0)return desired;
  const from=agent.route[agent.segment],to=agent.route[agent.segment+1],segLength=distance(node(from),node(to)),remaining=segLength-agent.distance;let allowed=desired;
  for(const other of agentsById.values()){
   if(other.id===agent.id||!other.active||other.route.length<2||other.segment>=other.route.length-1)continue;
   const otherFrom=other.route[other.segment],otherTo=other.route[other.segment+1];let gap=Infinity;
   if(otherFrom===from&&otherTo===to&&(other.distance>agent.distance||other.distance===agent.distance&&other.id<agent.id))gap=other.distance-agent.distance;
   else if(otherFrom===to)gap=remaining+other.distance;
   else if(otherTo===to&&otherFrom!==from){
    const otherRem=distance(node(otherFrom),node(otherTo))-other.distance;
    if(otherRem<agent.spacing&&(otherRem<remaining||otherRem===remaining&&other.id<agent.id))gap=remaining;
   }
   if(gap<Infinity)allowed=Math.min(allowed,Math.max(0,gap-agent.spacing));
  }
  return allowed;
 }
 function position(agent){
  const from=node(agent.route[agent.segment]),to=node(agent.route[agent.segment+1]),segLength=distance(from,to),t=clamp(agent.distance/Math.max(.0001,segLength),0,1);
  let x=from.x+(to.x-from.x)*t,y=from.y+(to.y-from.y)*t,heading=Math.atan2(to.y-from.y,to.x-from.x);
  const radius=Math.min(agent.cornerRadius,segLength/3),nextId=agent.route[agent.segment+2];
  if(radius>0&&nextId){
   const next=node(nextId),nextLength=distance(to,next),r=Math.min(radius,nextLength/3);
   if(agent.distance>segLength-radius){
    const start={x:to.x-(to.x-from.x)/segLength*radius,y:to.y-(to.y-from.y)/segLength*radius},end={x:to.x+(next.x-to.x)/nextLength*r,y:to.y+(next.y-to.y)/nextLength*r};
    const q=clamp((agent.distance-(segLength-radius))/(radius*2),0,.5),u=1-q;
    x=u*u*start.x+2*u*q*to.x+q*q*end.x;y=u*u*start.y+2*u*q*to.y+q*q*end.y;
    const dx=2*u*(to.x-start.x)+2*q*(end.x-to.x),dy=2*u*(to.y-start.y)+2*q*(end.y-to.y);if(Math.abs(dx)+Math.abs(dy)>.001)heading=Math.atan2(dy,dx);
   }
  }
  return {x,y,heading};
 }
 function tick(dt){
  elapsed+=dt;tickIndex++;
  const ordered=[...agents.values()].sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0),offset=ordered.length?tickIndex%ordered.length:0;
  const rotation=[...ordered.slice(offset),...ordered.slice(0,offset)];
  for(const agent of rotation){
   if(!agent.active||agent.route.length<2||agent.segment>=agent.route.length-1)continue;
   const fromId=agent.route[agent.segment],toId=agent.route[agent.segment+1],segLength=distance(node(fromId),node(toId));
   if(agent.distance>=segLength-.0001){arrive(agent,dt);if(!agent.active||agent.route.length<2||agent.segment>=agent.route.length-1)continue;}
   const activeFrom=agent.route[agent.segment],activeTo=agent.route[agent.segment+1],activeLen=distance(node(activeFrom),node(activeTo));
   const remaining=activeLen-agent.distance,edgeScale=edgeBetween(activeFrom,activeTo)?.speedScale??1;
   const desired=Math.min(remaining,agent.speed*edgeScale*Math.max(0,agent.speedMultiplier)*dt),movement=headway(agent,desired);
   if(movement<=.0001){agent.blockedTicks++;if(agent.blockedTicks>=30&&!agent.blockedEmitted){agent.blockedEmitted=true;emit('pathBlocked',agent,activeTo);}}
   else{agent.distance+=movement;agent.blockedTicks=0;agent.blockedEmitted=false;}
   const current=position(agent);agent.x=current.x;agent.y=current.y;agent.heading=current.heading;
   const direction=Math.floor((((agent.heading%(Math.PI*2))+Math.PI*2+1e-6)%(Math.PI*2))/(Math.PI/2))%4;agent.frame=[0,1,2,3][direction];agent.flipX=Math.cos(agent.heading)<0;
  }
 }
 function snapshot(){return {id,nodeCount:nodeMap.size,edgeCount:edgeMap.size,activeAgents:[...agents.values()].filter(agent=>agent.active).length,queuedAgents:[...agents.values()].filter(agent=>agent.active&&agent.blockedTicks>0).length,agents:[...agents.values()].map(agent=>({id:agent.id,x:agent.x,y:agent.y,heading:agent.heading,frame:agent.frame??0,flipX:Boolean(agent.flipX),active:agent.active,targetNode:agent.target,route:[...agent.route],segment:agent.segment,distance:agent.distance,blocked:agent.blockedTicks>0}))};}
 return {addAgent,removeAgent:id=>agents.delete(id),getAgent:id=>agents.get(id),setTarget:(agentId,target)=>{const agent=agents.get(agentId);if(!agent||!node(target))return false;agent.target=target;agent.destinationNode=target;agent.active=true;replan(agent);return true;},setEdge:(edgeId,enabled,cost)=>{const edge=edgeMap.get(edgeId);if(!edge)return false;edge.enabled=enabled;if(cost!==undefined)edge.cost=cost;for(const agent of agents.values())replan(agent);return true;},setGate:(gateId,mode,holdSeconds)=>{const gate=gateMap.get(gateId);if(!gate)return false;gate.parameters={...gate.parameters,mode,holdSeconds};for(const agent of agents.values())replan(agent);return true;},tick,snapshot};
}
