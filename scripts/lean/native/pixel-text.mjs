const glyphs={
 A:['01110','10001','10001','11111','10001','10001','10001'],
 B:['11110','10001','10001','11110','10001','10001','11110'],
 C:['01111','10000','10000','10000','10000','10000','01111'],
 D:['11110','10001','10001','10001','10001','10001','11110'],
 E:['11111','10000','10000','11110','10000','10000','11111'],
 F:['11111','10000','10000','11110','10000','10000','10000'],
 G:['01111','10000','10000','10111','10001','10001','01111'],
 H:['10001','10001','10001','11111','10001','10001','10001'],
 I:['11111','00100','00100','00100','00100','00100','11111'],
 J:['00111','00010','00010','00010','10010','10010','01100'],
 K:['10001','10010','10100','11000','10100','10010','10001'],
 L:['10000','10000','10000','10000','10000','10000','11111'],
 M:['10001','11011','10101','10101','10001','10001','10001'],
 N:['10001','11001','10101','10011','10001','10001','10001'],
 O:['01110','10001','10001','10001','10001','10001','01110'],
 P:['11110','10001','10001','11110','10000','10000','10000'],
 Q:['01110','10001','10001','10001','10101','10010','01101'],
 R:['11110','10001','10001','11110','10100','10010','10001'],
 S:['01111','10000','10000','01110','00001','00001','11110'],
 T:['11111','00100','00100','00100','00100','00100','00100'],
 U:['10001','10001','10001','10001','10001','10001','01110'],
 V:['10001','10001','10001','10001','10001','01010','00100'],
 W:['10001','10001','10001','10101','10101','10101','01010'],
 X:['10001','10001','01010','00100','01010','10001','10001'],
 Y:['10001','10001','01010','00100','00100','00100','00100'],
 Z:['11111','00001','00010','00100','01000','10000','11111'],
 '0':['01110','10001','10011','10101','11001','10001','01110'],
 '1':['00100','01100','00100','00100','00100','00100','01110'],
 '2':['01110','10001','00001','00010','00100','01000','11111'],
 '3':['11110','00001','00001','01110','00001','00001','11110'],
 '4':['00010','00110','01010','10010','11111','00010','00010'],
 '5':['11111','10000','10000','11110','00001','00001','11110'],
 '6':['01110','10000','10000','11110','10001','10001','01110'],
 '7':['11111','00001','00010','00100','01000','01000','01000'],
 '8':['01110','10001','10001','01110','10001','10001','01110'],
 '9':['01110','10001','10001','01111','00001','00001','01110'],
 '!':['00100','00100','00100','00100','00100','00000','00100'],
 '?':['01110','10001','00001','00010','00100','00000','00100'],
 '.':['00000','00000','00000','00000','00000','00110','00110'],
 ',':['00000','00000','00000','00000','00110','00110','00100'],
 ':':['00000','00110','00110','00000','00110','00110','00000'],
 '+':['00000','00100','00100','11111','00100','00100','00000'],
 '-':['00000','00000','00000','11111','00000','00000','00000'],
 '/':['00001','00010','00010','00100','01000','01000','10000'],
 "'":['00100','00100','00000','00000','00000','00000','00000'],
 ' ':['000','000','000','000','000','000','000'],
};

const lineWidth=line=>{let width=0;for(const char of line)width+=(glyphs[char]?.[0].length??5)+1;return Math.max(0,width-1);};
const splitWord=(word,limit)=>{
 const chunks=[];let chunk='';
 for(const char of word){
  if(chunk&&lineWidth(chunk+char)>limit){chunks.push(chunk);chunk='';}
  chunk+=char;
 }
 if(chunk)chunks.push(chunk);
 return chunks;
};

export function wrapPixelLines(text,availableWidth,scale=1){
 const limit=Math.max(1,Math.floor(availableWidth/Math.max(1,scale))),lines=[];
 for(const paragraph of String(text).toUpperCase().split('\n')){
  const words=paragraph.split(/\s+/).filter(Boolean);
  if(!words.length){lines.push('');continue;}
  let line='';
  for(const word of words){
   if(lineWidth(word)>limit){
    if(line){lines.push(line);}
    const chunks=splitWord(word,limit);
    lines.push(...chunks.slice(0,-1));line=chunks.at(-1)??'';
   }else{
    const candidate=line?line+' '+word:word;
    if(lineWidth(candidate)<=limit)line=candidate;
    else{if(line)lines.push(line);line=word;}
   }
  }
  if(line)lines.push(line);
 }
 return lines;
}

const insets=p=>{const padding=Math.max(0,p.padding??4),legacy=p.pixelPanel&&p.padding===undefined;return {x:legacy?8:padding,y:legacy?4:padding};};
const layout=(text,p,scale,availableWidth)=>{
 const allLines=p.wrap===false?String(text).toUpperCase().split('\n'):wrapPixelLines(text,availableWidth,scale),lines=allLines.slice(0,16);
 const lineAdvance=Math.round(scale*8*(p.lineHeight??1.2));
 return {allLines,lines,renderedWidth:Math.max(0,...lines.map(line=>lineWidth(line)*scale)),renderedHeight:(lines.length-1)*lineAdvance+7*scale};
};

export function measurePixelText(text,p){
 const inset=insets(p),availableWidth=Math.max(0,p.width-2*inset.x),availableHeight=Math.max(0,p.height-2*inset.y);
 const maxScale=Math.max(1,Math.floor(p.fontSize/8)),minScale=p.autoFit===false?maxScale:Math.min(maxScale,Math.max(1,Math.ceil((p.minFontSize??12)/8)));
 const unsupportedChars=[...new Set([...String(text).toUpperCase()].filter(char=>char!=='\n'&&!glyphs[char]))];
 let result;
 for(let scale=maxScale;scale>=minScale;scale--){
  const measured=layout(text,p,scale,availableWidth),overflowsWidth=measured.renderedWidth>availableWidth,overflowsHeight=measured.allLines.length>16||measured.renderedHeight>availableHeight;
  result={lines:measured.lines,scale,fontSize:scale*8,renderedWidth:measured.renderedWidth,renderedHeight:measured.renderedHeight,overflowsWidth,overflowsHeight,unsupportedChars};
  if(p.autoFit===false||!overflowsWidth&&!overflowsHeight)break;
 }
 return result;
}

export function drawPixelText(ctx,text,p){
 const measured=measurePixelText(text,p),{lines,scale}=measured,inset=insets(p),availableWidth=Math.max(0,p.width-2*inset.x),availableHeight=Math.max(0,p.height-2*inset.y);
 const lineAdvance=Math.round(measured.fontSize*(p.lineHeight??1.2)),top=inset.y+(availableHeight-measured.renderedHeight)/2;
 ctx.fillStyle=p.color;
 lines.forEach((line,lineIndex)=>{
  const renderedWidth=lineWidth(line)*scale,x=p.align==='left'?inset.x:p.align==='right'?p.width-renderedWidth-inset.x:inset.x+(availableWidth-renderedWidth)/2;
  let cursor=x;
  for(const char of line){
   const glyph=glyphs[char]??glyphs['?'];
   glyph.forEach((row,rowIndex)=>{for(let column=0;column<row.length;column++)if(row[column]==='1')ctx.fillRect(Math.round(cursor+column*scale),Math.round(top+lineIndex*lineAdvance+rowIndex*scale),scale,scale);});
   cursor+=(glyph[0].length+1)*scale;
  }
 });
 return measured;
}
