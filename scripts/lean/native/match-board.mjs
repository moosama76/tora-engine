/** A bounded match-three board. Authored components remain the stable cell slots. */
export function createMatchBoard({rows,columns,seed,slots,paint,onEvent}){
 const original=slots.map(slot=>slot.group),palette=[...new Set(original)];
 let groups=[...original],randomState=seed,phase='idle',elapsed=0,selected,swapPair,clearing=[],drops=[],cascade=0,moves=0,cleared=0,hint,lastMatch;
 const index=(row,column)=>row*columns+column;
 const row=cell=>Math.floor(cell/columns);
 const column=cell=>cell%columns;
 const random=()=>{randomState=(Math.imul(randomState,1664525)+1013904223)>>>0;return randomState/4294967296;};
 function matches(values){
  const found=new Set();
  for(let r=0;r<rows;r++)for(let c=0;c<columns;c++){
   const cell=index(r,c),group=values[cell];
   if(c+2<columns&&group===values[cell+1]&&group===values[cell+2])for(let n=0;n<3;n++)found.add(cell+n);
   if(r+2<rows&&group===values[cell+columns]&&group===values[cell+columns*2])for(let n=0;n<3;n++)found.add(cell+columns*n);
  }
  return [...found];
 }
 function validSwap(first,second){
  if(groups[first]===groups[second])return false;
  const candidate=[...groups];
  [candidate[first],candidate[second]]=[candidate[second],candidate[first]];
  return matches(candidate).some(cell=>cell===first||cell===second);
 }
 function legalMoves(){
  const result=[];
  for(let cell=0;cell<groups.length;cell++){
   if(column(cell)+1<columns&&validSwap(cell,cell+1))result.push({from:slots[cell].id,to:slots[cell+1].id});
   if(row(cell)+1<rows&&validSwap(cell,cell+columns))result.push({from:slots[cell].id,to:slots[cell+columns].id});
  }
  return result;
 }
 function generate(){
  for(let attempt=0;attempt<64;attempt++){
   groups=[];
   for(let cell=0;cell<slots.length;cell++){
    const options=palette.filter(group=>!(column(cell)>=2&&groups[cell-1]===group&&groups[cell-2]===group)&&!(row(cell)>=2&&groups[cell-columns]===group&&groups[cell-columns*2]===group));
    groups.push(options[Math.floor(random()*options.length)]);
   }
   if(legalMoves().length)return;
  }
  // This pattern has no triples and guarantees the swap (0,1) -> (1,1).
  groups=slots.map((slot,cell)=>palette[(row(cell)*2+column(cell))%3]);
  groups[0]=palette[0];groups[1]=palette[1];groups[2]=palette[0];groups[columns+1]=palette[0];
 }
 function paintAll(){
  for(let cell=0;cell<slots.length;cell++)paint(cell,groups[cell],{});
 }
 function reset(){
  randomState=seed;groups=[...original];phase='idle';elapsed=0;selected=undefined;swapPair=undefined;clearing=[];drops=[];cascade=0;moves=0;cleared=0;hint=undefined;lastMatch=undefined;
  if(matches(groups).length||!legalMoves().length)generate();
  paintAll();
 }
 function swap(firstId,secondId){
  if(phase!=='idle')return false;
  const first=slots.findIndex(slot=>slot.id===firstId),second=slots.findIndex(slot=>slot.id===secondId);
  if(first<0||second<0||Math.abs(row(first)-row(second))+Math.abs(column(first)-column(second))!==1)return false;
  selected=undefined;hint=undefined;paintAll();swapPair=[first,second];phase='swap';elapsed=0;
  return true;
 }
 function select(id){
  if(phase!=='idle')return undefined;
  if(selected===id){selected=undefined;return undefined;}
  if(selected&&swap(selected,id))return undefined;
  selected=id;return selected;
 }
 function startClear(){
  clearing=matches(groups);
  cleared+=clearing.length;
  lastMatch={group:groups[clearing[0]],from:slots[clearing[0]].id,count:clearing.length};
  onEvent('matchClear');
  phase='clear';elapsed=0;
 }
 function fall(){
  const empty=new Set(clearing),next=[...groups];
  drops=[];
  for(let c=0;c<columns;c++){
   const survivors=[];
   for(let r=rows-1;r>=0;r--)if(!empty.has(index(r,c)))survivors.push(index(r,c));
   let missing=0;
   for(let r=rows-1;r>=0;r--){
    const cell=index(r,c),source=survivors[rows-1-r];
    if(source!==undefined){next[cell]=groups[source];drops.push({cell,from:source,offsetRows:0});}
    else{next[cell]=palette[Math.floor(random()*palette.length)];drops.push({cell,from:cell,offsetRows:-(r+1+(missing++))});}
   }
  }
  groups=next;phase='fall';elapsed=0;
 }
 function finish(){
  if(matches(groups).length&&cascade<3){cascade++;startClear();return;}
  if(matches(groups).length||!legalMoves().length)generate();
  paintAll();phase='idle';elapsed=0;swapPair=undefined;clearing=[];drops=[];moves++;
  onEvent('validMatch');
 }
 function tick(dt){
  if(phase==='idle'){
   if(hint){
    hint.elapsed+=dt;
    const scale=1+.065*Math.sin(Math.min(1,hint.elapsed/.8)*Math.PI*4);
    for(const id of hint.ids)paint(slots.findIndex(slot=>slot.id===id),groups[slots.findIndex(slot=>slot.id===id)],{scale});
    if(hint.elapsed>=.8){hint=undefined;paintAll();}
   }
   return;
  }
  elapsed+=dt;
  if(phase==='swap'||phase==='reverse'){
   const t=Math.min(1,elapsed/.14),progress=t*t*(3-2*t);
   const [first,second]=swapPair;
   paint(first,groups[first],{from:second,progress:phase==='swap'?progress:1-progress});
   paint(second,groups[second],{from:first,progress:phase==='swap'?progress:1-progress});
   if(t<1)return;
   if(phase==='reverse'){
    paintAll();phase='idle';swapPair=undefined;onEvent('invalidMatch');return;
   }
   if(!validSwap(first,second)){phase='reverse';elapsed=0;return;}
   [groups[first],groups[second]]=[groups[second],groups[first]];
   paintAll();startClear();return;
  }
  if(phase==='clear'){
   const t=Math.min(1,elapsed/.18),scale=t<.22?1+t*.45:Math.max(.05,1.1*(1-t)/.78);
   for(const cell of clearing)paint(cell,groups[cell],{scale,opacity:1-t});
   if(t===1)fall();
   return;
  }
  const t=Math.min(1,elapsed/.25),progress=1-(1-t)**3;
  for(const drop of drops)paint(drop.cell,groups[drop.cell],{from:drop.from,offsetRows:drop.offsetRows,progress:1-progress});
  if(t===1)finish();
 }
 function showHint(){
  if(phase!=='idle')return;
  selected=undefined;
  const move=legalMoves()[0];
  if(move)hint={ids:[move.from,move.to],elapsed:0};
 }
 function snapshot(){
  return {phase,busy:phase!=='idle',selected:selected??null,moves,cleared,groups:[...groups],legalMoves:phase==='idle'?legalMoves():[],hint:hint?.ids??[],lastMatch:lastMatch?{...lastMatch}:null};
 }
 return {reset,select,swap,tick,showHint,snapshot,cancelSelection:()=>{selected=undefined;if(hint){hint=undefined;paintAll();}}};
}
