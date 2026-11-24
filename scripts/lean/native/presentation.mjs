const turn = Math.PI * 2;
const randomUnit = (index, salt) => ((Math.imul(index + 1, 0x9e3779b9) ^ Math.imul(salt, 0x85ebca6b)) >>> 0) / 4294967296;

export function pixelConfetti(parameters, position, clipId) {
 const colors = [parameters.color, parameters.color2, parameters.color3].filter(Boolean);
 const spread = (parameters.spread ?? 360) * Math.PI / 180;
 const heading = (parameters.direction ?? -90) * Math.PI / 180;
 return Array.from({length:parameters.count}, (_,index) => {
  const angle = heading + ((index + .2 + randomUnit(index,1)*.6) / parameters.count - .5) * spread;
  const speed = parameters.speed * (.42 + .65 * randomUnit(index,2));
  return {
   ...position, clipId, shape:'pixel-confetti', age:-.12 * randomUnit(index,3),
   vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, gravity:parameters.gravity??250,
   life:(parameters.lifetime??.7)*(.6 + .4 * randomUnit(index,4)),
   color:colors[index % colors.length], size:3 + Math.floor(3 * randomUnit(index,5)),
   angle:turn*randomUnit(index,6), spin:(randomUnit(index,7)-.5)*12,
  };
 });
}

export function screenConfetti(parameters) {
 const cols = Math.min(12, Math.ceil(Math.sqrt(parameters.count)));
 const rows = Math.ceil(parameters.count / cols);
 const speed = parameters.speed;
 return pixelConfetti(parameters).map((particle,index)=>({
  ...particle, screen:true,
  x:(index % cols + .15 + .7*randomUnit(index,8)) / cols,
  y:(Math.floor(index / cols) + .15 + .7*randomUnit(index,9)) / rows,
  vx:speed * (randomUnit(index,10)-.5) * .7,
  vy:speed * (.3 + .5*randomUnit(index,11)),
  size:particle.size+1,
 }));
}

const wrap = (value, length) => ((value % length) + length) % length;

export function drawPixelConfetti(ctx, particle, screen) {
 const {x,y,vx,vy,age,life,gravity,size,angle,spin,color} = particle;
 if(age<0)return;
 const dx = vx * age;
 const dy = vy * age + gravity * age * age / 2;
 const left = Math.round(screen ? screen.x+wrap(x*screen.width+dx,screen.width) : x+dx);
 const top = Math.round(screen ? screen.y+wrap(y*screen.height+dy,screen.height) : y+dy);
 const direction = Math.round((angle + spin * age) / (Math.PI/4)) & 3;
 ctx.globalAlpha *= Math.min(1, (life - age) * 4);
 ctx.fillStyle = '#3c293388';
 if(direction===0)ctx.fillRect(left-size+1,top+1,size*2+1,size+1);
 else if(direction===2)ctx.fillRect(left+1,top-size+1,size+1,size*2+1);
 else for(let step=-1;step<=1;step++){
  ctx.fillRect(left+step*size+1,top+step*size*(direction===1?1:-1)+1,size+1,size+1);
 }
 ctx.fillStyle = color;
 if(direction===0)ctx.fillRect(left-size,top,size*2,size);
 else if(direction===2)ctx.fillRect(left,top-size,size,size*2);
 else for(let step=-1;step<=1;step++){
  ctx.fillRect(left+step*size,top+step*size*(direction===1?1:-1),size,size);
 }
}

export function vectorConfetti(parameters, position, clipId) {
 const colors = [parameters.color, parameters.color2, parameters.color3, '#ff6b6b', '#4ecdc4', '#fff3b0'].filter(Boolean);
 const spread = (parameters.spread ?? 360) * Math.PI / 180;
 const heading = (parameters.direction ?? -90) * Math.PI / 180;
 return Array.from({length:parameters.count}, (_,index) => {
  const angle = heading + ((index + .2 + randomUnit(index,11)*.6) / parameters.count - .5) * spread;
  const speed = parameters.speed * (.45 + .65 * randomUnit(index,12));
  return {
   ...position, clipId, shape:'confetti', age:-.15 * randomUnit(index,13),
   vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, gravity:parameters.gravity??140,
   life:(parameters.lifetime??2.6)*(.75 + .35 * randomUnit(index,14)),
   color:colors[index % colors.length],
   size:5 + Math.floor(5 * randomUnit(index,15)),
   kind:index % 5 === 0 ? 'star' : 'ribbon',
   angle:turn*randomUnit(index,16),
   spin:(randomUnit(index,17)-.5)*5.5,
   flutter:1.6 + 2.2 * randomUnit(index,18),
   phase:turn*randomUnit(index,19),
  };
 });
}

export function screenVectorConfetti(parameters) {
 const cols = Math.min(14, Math.ceil(Math.sqrt(parameters.count)));
 const rows = Math.ceil(parameters.count / cols);
 const speed = parameters.speed;
 return vectorConfetti(parameters, {x:0,y:0}).map((particle,index)=>({
  ...particle, screen:true,
  x:(index % cols + .12 + .76*randomUnit(index,20)) / cols,
  y:(Math.floor(index / cols) + .08 + .84*randomUnit(index,21)) / rows,
  vx:speed * (randomUnit(index,22)-.5) * .65,
  vy:speed * (.38 + .55*randomUnit(index,23)),
  gravity:Math.min(parameters.gravity ?? 90, 90),
 }));
}

export function drawVectorConfetti(ctx, particle, screen) {
 const {x,y,vx,vy,age,life,gravity,size,angle,spin,flutter,phase,color,kind} = particle;
 if(age<0)return;
 const sway = Math.sin(age * flutter + phase) * 14;
 const dx = vx * age + sway;
 const dy = vy * age + gravity * age * age / 2;
 const px = screen ? screen.x + wrap(x * screen.width + dx, screen.width) : x + dx;
 const py = screen ? screen.y + wrap(y * screen.height + dy, screen.height) : y + dy;
 const fade = Math.min(1, age * 2.8, (life - age) * 2.2);
 if(fade <= 0) return;
 ctx.save();
 ctx.globalAlpha *= fade;
 ctx.translate(px, py);
 ctx.rotate(angle + spin * age);
 const tumble = Math.cos(age * flutter * 1.4 + phase);
 ctx.scale(1, Math.max(.22, Math.abs(tumble)));
 ctx.fillStyle = color;
 if(kind === 'star'){
  const r = size * .85;
  ctx.beginPath();
  for(let i=0;i<8;i++){
   const rad = i % 2 === 0 ? r : r * .38;
   const a = (i * Math.PI) / 4;
   if(i === 0) ctx.moveTo(Math.cos(a)*rad, Math.sin(a)*rad);
   else ctx.lineTo(Math.cos(a)*rad, Math.sin(a)*rad);
  }
  ctx.closePath();
  ctx.fill();
 }else{
  ctx.fillRect(-size * .7, -size * .34, size * 1.4, size * .68);
  ctx.fillStyle = '#ffffff55';
  ctx.fillRect(-size * .7, -size * .34, size * 1.4, size * .2);
 }
 ctx.restore();
}

export function drawPixelCta(ctx, p, fill, pressed, shineAge) {
 const {width:w,height:h} = p;
 if(w<=0||h<=0)return;
 const unit = Math.min(3, Math.floor(Math.min(w,h)/8));
 if(!unit){
  ctx.fillStyle = fill;
  ctx.fillRect(0,0,w,h);
  return;
 }
 const top = pressed ? unit*2 : 0;
 const faceBottom = h - (pressed ? unit : unit*3);
 const pulse = shineAge >= 0 ? .5 + .5 * Math.sin(shineAge * 4.0) : 0;
 // Warm golden pixel aura glow pulse
 if(p.enabled && !pressed && shineAge >= 0){
  ctx.save();
  ctx.shadowColor = '#ffd05a99';
  ctx.shadowBlur = 8 + pulse * 9;
  ctx.fillStyle = fill;
  ctx.fillRect(unit,top+unit,w-2*unit,h-top-2*unit);
  ctx.restore();
 }
 // The casing and face share the ordinary button's hit rectangle.
 ctx.fillStyle = p.stroke;
 ctx.fillRect(unit,0,w-2*unit,h);
 ctx.fillRect(0,unit,w,h-2*unit);
 ctx.fillStyle = fill;
 ctx.fillRect(unit,top+unit,w-2*unit,h-top-2*unit);
 ctx.fillStyle = '#431d1380';
 ctx.fillRect(unit,faceBottom,w-2*unit,h-unit-faceBottom);
 ctx.fillStyle = p.enabled ? '#fff4be' : '#ffffff55';
 ctx.fillRect(2*unit,top+unit,w-4*unit,pressed?unit:unit*2);
 ctx.fillStyle = '#ffffff55';
 ctx.fillRect(unit,top+3*unit,unit,Math.max(0,faceBottom-top-3*unit));
 ctx.fillStyle = '#521b2444';
 ctx.fillRect(w-2*unit,top+3*unit,unit,Math.max(0,faceBottom-top-3*unit));

 const cycleAge = shineAge >= 0 ? (shineAge % 1.9) : -1;
 const shineProgress = (cycleAge-.1)/.55;
 if(p.enabled&&!pressed&&shineProgress>=0&&shineProgress<1){
  ctx.save();
  ctx.beginPath();
  ctx.rect(2*unit,top+3*unit,w-4*unit,Math.max(0,faceBottom-top-3*unit));
  ctx.clip();
  const leading = Math.floor(((w+14*unit)*shineProgress-6*unit)/unit)*unit;
  for(let y=top+3*unit,row=0;y<faceBottom;y+=unit,row++){
   const x = leading-Math.floor(row/2)*unit;
   ctx.fillStyle = '#fff4be44';
   ctx.fillRect(x-2*unit,y,9*unit,unit);
   ctx.fillStyle = '#fffef0aa';
   ctx.fillRect(x,y,4*unit,unit);
  }
  ctx.restore();
 }
 // Twinkling pixel-cross specular glints on upper corners
 if(p.enabled&&!pressed&&shineAge>=0){
  const g1 = Math.max(0, Math.sin(shineAge * 4.2));
  const g2 = Math.max(0, Math.sin(shineAge * 4.2 + 2.2));
  const drawPixelStar = (cx, cy, g) => {
   if(g < .25) return;
   ctx.save();
   ctx.globalAlpha *= g * .95;
   ctx.fillStyle = '#fffef4';
   const arm = g > .65 ? unit * 2 : unit;
   ctx.fillRect(Math.round(cx - arm), Math.round(cy - unit/2), arm * 2 + unit, unit);
   ctx.fillRect(Math.round(cx - unit/2), Math.round(cy - arm), unit, arm * 2 + unit);
   ctx.restore();
  };
  drawPixelStar(5*unit, top+4*unit, g1);
  drawPixelStar(w-6*unit, top+5*unit, g2);
 }
}

function roundedPath(ctx, x, y, w, h, r) {
 const rad = Math.max(0, Math.min(r, w / 2, h / 2));
 ctx.beginPath();
 if(typeof ctx.roundRect === 'function') ctx.roundRect(x, y, w, h, rad);
 else {
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
 }
}

function drawFourPointGlint(ctx, x, y, r, alpha) {
 if(alpha <= .02 || r <= .5) return;
 ctx.save();
 ctx.translate(x, y);
 ctx.globalAlpha *= alpha;
 ctx.fillStyle = '#fffef0';
 ctx.beginPath();
 for(let i=0;i<8;i++){
  const rad = i % 2 === 0 ? r : r * .24;
  const a = (i * Math.PI) / 4;
  if(i === 0) ctx.moveTo(Math.cos(a)*rad, Math.sin(a)*rad);
  else ctx.lineTo(Math.cos(a)*rad, Math.sin(a)*rad);
 }
 ctx.closePath();
 ctx.fill();
 ctx.restore();
}

/** Glossy 3D bevelled store CTA with continuous diagonal sheen sweep & twinkling glints. */
export function drawShinyCta(ctx, p, fill, pressed, age) {
 const {width:w,height:h} = p;
 if(w<=0||h<=0)return;
 const radius = Math.min(p.radius ?? 16, w / 2, h / 2);
 const lip = pressed ? 2 : 6;
 const topOffset = pressed ? 3 : 0;
 const pulse = age >= 0 ? .5 - .5 * Math.cos(age * 2.4) : 0;

 // Soft warm golden outer breathing glow
 if(p.enabled && !pressed && age >= 0){
  ctx.save();
  ctx.shadowColor = '#ffd23f99';
  ctx.shadowBlur = 10 + pulse * 12;
  roundedPath(ctx, 0, topOffset, w, h - topOffset, radius);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
 }

 // Raised 3D dark base / drop lip
 ctx.save();
 roundedPath(ctx, 0, topOffset + 2, w, Math.max(4, h - topOffset - 2), radius);
 ctx.fillStyle = '#0e2830';
 ctx.fill();
 ctx.restore();

 // Main glowing button face
 ctx.save();
 roundedPath(ctx, 0, topOffset, w, Math.max(4, h - lip), radius);
 ctx.fillStyle = fill;
 ctx.fill();

 // Clip glossy highlights & sweeping diagonal specular sheen inside the button face
 ctx.clip();

 // Top glass highlight sheen
 const sheenGrad = ctx.createLinearGradient?.(0, topOffset, 0, h - lip);
 if(sheenGrad?.addColorStop){
  sheenGrad.addColorStop(0, '#ffffffa8');
  sheenGrad.addColorStop(.42, '#ffffff26');
  sheenGrad.addColorStop(.45, '#00000000');
  sheenGrad.addColorStop(1, '#00000024');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, topOffset, w, h - lip);
 }

 // Bright crisp top inner specular bar
 ctx.fillStyle = '#fffef0bb';
 ctx.fillRect(radius * .55, topOffset + 3, Math.max(0, w - radius * 1.1), 3);

 // Smooth eased sweeping diagonal specular reflection every 2.4s
 if(p.enabled && !pressed && age >= 0){
  const sweep = ((age % 2.4) - .15) / .95;
  if(sweep > 0 && sweep < 1){
   const eased = sweep * sweep * (3 - 2 * sweep);
   const env = Math.sin(sweep * Math.PI);
   const cx = -w * .36 + (w * 1.72) * eased;
   ctx.save();
   ctx.globalAlpha *= env;
   ctx.translate(cx, topOffset);
   ctx.transform(1, 0, -.36, 1, 0, 0);
   const beamGrad = ctx.createLinearGradient?.(-48, 0, 48, 0);
   if(beamGrad?.addColorStop){
    beamGrad.addColorStop(0, '#ffffff00');
    beamGrad.addColorStop(.32, '#ffffff48');
    beamGrad.addColorStop(.5, '#fffef8cc');
    beamGrad.addColorStop(.68, '#ffffff48');
    beamGrad.addColorStop(1, '#ffffff00');
    ctx.fillStyle = beamGrad;
    ctx.fillRect(-48, 0, 96, h);
   }else{
    ctx.fillStyle = '#fffef8a8';
    ctx.fillRect(-14, 0, 28, h);
   }
   ctx.restore();
  }
 }
 ctx.restore();

 // Crisp outer stroke around the raised face
 if(p.strokeWidth){
  ctx.save();
  roundedPath(ctx, 0, topOffset, w, Math.max(4, h - lip), radius);
  ctx.strokeStyle = p.stroke;
  ctx.lineWidth = p.strokeWidth;
  ctx.stroke();
  ctx.restore();
 }

 // Smoothly blooming 4-point specular sparkles along the corners
 if(p.enabled && !pressed && age >= 0){
  const s1 = Math.max(0, Math.sin(age * 2.4)), g1 = s1 * s1;
  const s2 = Math.max(0, Math.sin(age * 2.4 + 2.1)), g2 = s2 * s2;
  const s3 = Math.max(0, Math.sin(age * 2.4 + 4.2)), g3 = s3 * s3;
  drawFourPointGlint(ctx, w * .12, topOffset + 9, 4 + g1 * 6, g1 * .92);
  drawFourPointGlint(ctx, w * .88, topOffset + 10, 3.8 + g2 * 5.5, g2 * .9);
  drawFourPointGlint(ctx, w * .76, Math.max(topOffset + 14, h - lip - 8), 3 + g3 * 4.2, g3 * .8);
 }
}
