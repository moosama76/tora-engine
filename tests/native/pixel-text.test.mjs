import test from 'node:test';
import assert from 'node:assert/strict';
import {drawPixelText,measurePixelText,wrapPixelLines} from '../../scripts/lean/native/pixel-text.mjs';

test('pixel text wraps greedily, preserves explicit newlines, and splits overlong words',()=>{
 assert.deepEqual(wrapPixelLines('aa aa\na',35),['AA AA','A']);
 assert.deepEqual(wrapPixelLines('aaaaaaa',35),['AAAAAA','A']);
 const unwrapped=measurePixelText('AA AA A',{width:35,height:40,padding:0,fontSize:8,wrap:false,autoFit:false});
 assert.deepEqual(unwrapped.lines,['AA AA A']);assert.equal(unwrapped.renderedWidth,37);assert.equal(unwrapped.overflowsWidth,true);
 const bounded=measurePixelText(Array(18).fill('A').join('\n'),{width:20,height:200,padding:0,fontSize:8,autoFit:false});
 assert.equal(bounded.lines.length,16);assert.equal(bounded.overflowsHeight,true);
});

test('pixel text autofits to an integer scale and reports the actual font size',()=>{
 const fitted=measurePixelText('AAA',{width:40,height:30,padding:0,fontSize:24,wrap:false});
 assert.equal(fitted.scale,2);assert.equal(fitted.fontSize,16);assert.equal(fitted.renderedWidth,34);assert.equal(fitted.overflowsWidth,false);
 const overflow=measurePixelText('AAA',{width:20,height:30,padding:0,fontSize:24,wrap:false});
 assert.equal(overflow.scale,2);assert.equal(overflow.fontSize,16);assert.equal(overflow.overflowsWidth,true);
 const fixed=measurePixelText('AAA',{width:40,height:30,padding:0,fontSize:24,wrap:false,autoFit:false});
 assert.equal(fixed.scale,3);assert.equal(fixed.fontSize,24);assert.equal(fixed.overflowsWidth,true);
 const minimum=measurePixelText('AAA',{width:40,height:30,padding:0,fontSize:32,wrap:false,minFontSize:20});
 assert.equal(minimum.scale,3);assert.equal(minimum.fontSize,24);assert.equal(minimum.overflowsWidth,true);
});

test('pixel text metrics include line height, padding, and legacy panel insets',()=>{
 const measured=measurePixelText('A\nA',{width:20,height:30,padding:0,fontSize:8,wrap:false,autoFit:false,lineHeight:1.5});
 assert.equal(measured.renderedHeight,19);
 const legacy=measurePixelText('A',{width:24,height:20,fontSize:16,pixelPanel:true,wrap:false,autoFit:false});
 assert.equal(legacy.overflowsWidth,true);
 const padded=measurePixelText('A',{width:24,height:20,padding:2,fontSize:16,pixelPanel:true,wrap:false,autoFit:false});
 assert.equal(padded.overflowsWidth,false);assert.equal(padded.overflowsHeight,false);
});

test('pixel text reports unsupported glyphs without replacing them in metrics',()=>{
 const measured=measurePixelText('Aé🙂é',{width:200,height:40,padding:0,fontSize:16,wrap:false,autoFit:false});
 assert.deepEqual(measured.lines,['AÉ🙂É']);assert.deepEqual(measured.unsupportedChars,['É','🙂']);assert.equal(measured.renderedWidth,46);
});

test('pixel text drawing matches measured lines, scale, and centered bounds',()=>{
 const rectangles=[],ctx={fillStyle:'',fillRect(...args){rectangles.push(args);}},p={width:40,height:30,padding:0,fontSize:16,wrap:false,autoFit:false,color:'#ffe6ab'};
 const measured=measurePixelText('A',p),returned=drawPixelText(ctx,'A',p);
 assert.deepEqual(returned,measured);
 assert.equal(measured.scale,2);assert.equal(measured.renderedWidth,10);assert.equal(measured.renderedHeight,14);assert.equal(ctx.fillStyle,p.color);
 const rows=['01110','10001','10001','11111','10001','10001','10001'],expected=[],left=(p.width-measured.renderedWidth)/2,top=(p.height-measured.renderedHeight)/2;
 rows.forEach((row,y)=>{for(let x=0;x<row.length;x++)if(row[x]==='1')expected.push([left+x*measured.scale,top+y*measured.scale,measured.scale,measured.scale]);});
 assert.deepEqual(rectangles,expected);
});
