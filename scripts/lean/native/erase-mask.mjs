export function createEraseMask(parameters,{width,height,onProgress=()=>{},onComplete=()=>{},canvasFactory,source}={}){
 const config=parameters,gridSize=config.gridSize,cells=new Uint8Array(gridSize*gridSize);let covered=0,complete=false,lastPercent=-1,paintedImage=false;
 const safeW=Math.max(1,width),safeH=Math.max(1,height),scale=Math.min(1,512/Math.max(safeW,safeH)),canvas=canvasFactory?.()??(globalThis.document?.createElement?globalThis.document.createElement('canvas'):undefined);
 if(canvas){canvas.width=Math.max(1,Math.round(safeW*scale));canvas.height=Math.max(1,Math.round(safeH*scale));}
 const context=canvas?.getContext?.('2d'),color=config.maskColor??'#dceeff';
 const imageReady=()=>Boolean(source&&source.complete&&source.naturalWidth>0);
 const paint=()=>{if(!context)return;context.globalCompositeOperation='source-over';context.clearRect(0,0,canvas.width,canvas.height);if(config.mode==='erase'){if(imageReady()){context.drawImage(source,0,0,canvas.width,canvas.height);paintedImage=true;}else{context.fillStyle=color;context.fillRect(0,0,canvas.width,canvas.height);paintedImage=false;}}};paint();
 const report=()=>{if(complete)return;const percent=Math.round(covered/cells.length*100),rounded=Math.min(100,percent);if(rounded!==lastPercent){lastPercent=rounded;onProgress(rounded);}if(rounded>=config.targetPercent){complete=true;onComplete(rounded);}};
 const stamp=(x,y)=>{
  const gx=Math.max(0,Math.min(gridSize-1,Math.floor(x/safeW*gridSize))),gy=Math.max(0,Math.min(gridSize-1,Math.floor(y/safeH*gridSize))),rx=Math.max(0,Math.ceil(config.brushRadiusPx/safeW*gridSize)),ry=Math.max(0,Math.ceil(config.brushRadiusPx/safeH*gridSize));
  for(let yy=Math.max(0,gy-ry);yy<=Math.min(gridSize-1,gy+ry);yy++)for(let xx=Math.max(0,gx-rx);xx<=Math.min(gridSize-1,gx+rx);xx++){
   if(Math.hypot((xx+.5)/gridSize*safeW-x,(yy+.5)/gridSize*safeH-y)>config.brushRadiusPx)continue;const index=yy*gridSize+xx;if(!cells[index]){cells[index]=1;covered++;}
  }
  if(context){context.save();context.scale(scale,scale);context.globalCompositeOperation=config.mode==='erase'?'destination-out':'source-over';context.fillStyle=color;context.beginPath();context.arc(x,y,config.brushRadiusPx,0,Math.PI*2);context.fill();if(config.mode==='reveal'&&source){context.globalCompositeOperation='source-in';context.drawImage(source,0,0,safeW,safeH);}context.restore();}
  report();
 };
 return {canvas,stampSegment(a,b){const distance=Math.hypot(b.x-a.x,b.y-a.y),steps=Math.max(1,Math.ceil(distance/Math.max(1,config.brushRadiusPx*.45)));for(let index=0;index<=steps;index++)stamp(a.x+(b.x-a.x)*index/steps,a.y+(b.y-a.y)*index/steps);},reset(){cells.fill(0);covered=0;complete=false;lastPercent=-1;paint();report();},get progress(){return Math.round(covered/cells.length*100);},render(ctx){if(config.mode==='erase'&&covered===0&&!paintedImage&&imageReady())paint();if(canvas)ctx.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,width,height);else if(config.mode==='erase'&&this.progress<100){ctx.save();ctx.globalAlpha=1-this.progress/100;ctx.fillStyle=color;ctx.fillRect(0,0,width,height);ctx.restore();}}};
}
