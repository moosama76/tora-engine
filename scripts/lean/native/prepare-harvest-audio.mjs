import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {Buffer} from 'node:buffer';
import process from 'node:process';

// Format conversion of downloaded CC0 audio only. No oscillators or composed content.
const root=resolve(import.meta.dirname,'../../..');
const folder=resolve(root,'assets/kenney-harvest');
const hash=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');
const sources=[
 {id:'kenney-interface-sounds',author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/interface-sounds',styleFamily:'kenney-interface-sounds',licenseFile:'assets/kenney-harvest/source/interface-sounds/License.txt',archive:{url:'https://opengameart.org/sites/default/files/kenney_interfaceSounds.zip',file:'assets/kenney-harvest/source/interface-sounds.zip'}},
 {id:'kenney-music-jingles',author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/music-jingles',styleFamily:'kenney-music-jingles',licenseFile:'assets/kenney-harvest/source/music-jingles/license.txt',archive:{url:'https://opengameart.org/sites/default/files/jingleSounds_Kenney.zip',file:'assets/kenney-harvest/source/music-jingles.zip'}},
 {id:'zane-little-flowerbed-fields',author:'Zane Little Music',license:'CC0-1.0',sourceUrl:'https://opengameart.org/content/flowerbed-fields-loop',styleFamily:'zane-little-chiptune',licenseFile:'assets/kenney-harvest/source/flowerbed-fields/source-page.html',archive:{url:'https://opengameart.org/sites/default/files/flowerbed_fields.ogg',file:'assets/kenney-harvest/source/flowerbed-fields/flowerbed_fields.ogg'}},
];
const cues=[
 {id:'audio-match',role:'match',sourceId:sources[0].id,input:'source/interface-sounds/Audio/confirmation_001.ogg',duration:.65},
 {id:'audio-reject',role:'reject',sourceId:sources[0].id,input:'source/interface-sounds/Audio/error_004.ogg',duration:.3},
 {id:'audio-repair',role:'repair',sourceId:sources[1].id,input:'source/music-jingles/OGG/jingles_NES/jingles_NES09.ogg',duration:1.4},
 {id:'audio-complete',role:'complete',sourceId:sources[1].id,input:'source/music-jingles/OGG/jingles_NES/jingles_NES00.ogg',duration:3},
 {id:'audio-victory',role:'victory',sourceId:sources[1].id,input:'source/music-jingles/OGG/jingles_NES/jingles_NES03.ogg',catalogOnly:true},
 {id:'audio-ambient',role:'ambient',sourceId:sources[2].id,input:'source/flowerbed-fields/flowerbed_fields.ogg',duration:16},
];
const browser=await chromium.launch();
const report=[];
try {
 const page=await browser.newPage();
 await mkdir(resolve(folder,'audio'),{recursive:true});
 for(const cue of cues){
  const input=await readFile(resolve(folder,cue.input));
  const converted=await page.evaluate(async({base64,duration})=>{
   const bytes=Uint8Array.from(globalThis.atob(base64),c=>c.charCodeAt(0));
   const decoder=new globalThis.OfflineAudioContext(1,1,16000);
   const decoded=await decoder.decodeAudioData(bytes.buffer);
   const seconds=Math.min(decoded.duration,duration??decoded.duration);
   const context=new globalThis.OfflineAudioContext(1,Math.ceil(seconds*16000),16000);
   const source=context.createBufferSource();source.buffer=decoded;source.connect(context.destination);source.start();
   const pcm=(await context.startRendering()).getChannelData(0);
   const output=new Uint8Array(44+pcm.length*2),view=new DataView(output.buffer);
   const text=(at,value)=>{for(let i=0;i<value.length;i++)output[at+i]=value.charCodeAt(i);};
   text(0,'RIFF');view.setUint32(4,output.length-8,true);text(8,'WAVEfmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,16000,true);view.setUint32(28,32000,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,pcm.length*2,true);
   // Source excerpt boundary fades prevent a hard cut; no notes or layers added.
   const fade=duration?320:0;let peak=0,clipped=0;
   for(let i=0;i<pcm.length;i++){
    const gain=fade?Math.min(1,i/fade,(pcm.length-1-i)/fade):1;
    const sample=Math.max(-1,Math.min(1,pcm[i]*gain));
    peak=Math.max(peak,Math.abs(sample));if(Math.abs(pcm[i]*gain)>1)clipped++;
    view.setInt16(44+i*2,Math.round(sample*(sample<0?32768:32767)),true);
   }
   let encoded='';for(let i=0;i<output.length;i+=8192)encoded+=String.fromCharCode(...output.subarray(i,i+8192));
   return {base64:globalThis.btoa(encoded),sourceDuration:decoded.duration,duration:pcm.length/16000,peak,clipped};
  },{base64:input.toString('base64'),duration:cue.duration});
  const bytes=Buffer.from(converted.base64,'base64');
  const file='audio/'+cue.role+'.wav';await writeFile(resolve(folder,file),bytes);
  report.push({...cue,file,sha256:hash(bytes),sourceSha256:hash(input),sourceDuration:converted.sourceDuration,duration:converted.duration,peak:converted.peak,clipped:converted.clipped});
 }
 const catalogFile=resolve(root,'assets/free-assets/catalog.json');
 const catalog=JSON.parse(await readFile(catalogFile,'utf8'));
 for(const record of sources){
  const {archive,...source}=record;
  source.licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/';
  source.licenseSha256=hash(await readFile(resolve(root,record.licenseFile)));
  source.archive={url:archive.url,sha256:hash(await readFile(resolve(root,archive.file)))};
  source.files=report.filter(cue=>cue.sourceId===source.id).map(cue=>({
   path:cue.file,file:'assets/kenney-harvest/'+cue.file,mime:'audio/wav',sha256:cue.sha256,
   processing:{kind:'audio-transcode',sourceFile:'assets/kenney-harvest/'+cue.input,sourceSha256:cue.sourceSha256,tool:'Web Audio OfflineAudioContext',arguments:['decodeAudioData','mono','16000 Hz','16-bit PCM',...(cue.duration?[`first ${cue.duration} seconds`,'20ms source boundary fades']:['full source duration'])]},
  }));
  catalog.sources=catalog.sources.filter(old=>old.id!==source.id);catalog.sources.push(source);
 }
 await writeFile(catalogFile,JSON.stringify(catalog,null,2)+'\n');
 const planFile=resolve(folder,'plan.json'),plan=JSON.parse(await readFile(planFile));
 plan.assets=plan.assets.filter(asset=>!asset.id.startsWith('audio-'));
 plan.audio={};
 for(const cue of report.filter(item=>!item.catalogOnly)){
  const source=sources.find(source=>source.id===cue.sourceId);
  const provenance={origin:'third-party-free',sourceId:source.id,sourceFile:cue.file,sourceHash:cue.sha256,author:source.author,license:source.license,sourceUrl:source.sourceUrl,styleFamily:source.styleFamily};
  plan.assets.push({id:cue.id,file:cue.file,mime:'audio/wav',rights:`${source.author}, CC0-1.0. ${source.sourceUrl}`,provenance});plan.audio[cue.role]=cue.id;
 }
 await writeFile(planFile,JSON.stringify(plan,null,2)+'\n');
 await writeFile(resolve(folder,'audio-conversion.json'),JSON.stringify({method:'Sourced audio format conversion only',browser:browser.version(),script:'scripts/lean/native/prepare-harvest-audio.mjs',cues:report},null,2)+'\n');
 process.stdout.write(JSON.stringify(report.map(({role,duration,clipped})=>({role,duration,clipped})))+'\n');
} finally {await browser.close();}
