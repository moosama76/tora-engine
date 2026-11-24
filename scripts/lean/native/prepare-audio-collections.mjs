import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {Buffer} from 'node:buffer';
import process from 'node:process';
import {analyzeWav} from './audio-analysis.mjs';

const root=resolve(import.meta.dirname,'../../..');
const hash=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');
const licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/';
const kenney={
 interface:'kenney-interface-sounds',
 jingles:'kenney-music-jingles',
};
const familyDefinitions=[
 {
  id:'casual-warm',label:'Casual Warm',styleTags:['casual','warm','acoustic'],
  ambientSource:{
   id:'tarush-singhal-happy-ukelele',author:'Tarush Singhal',license:'CC0-1.0',
   sourceUrl:'https://opengameart.org/content/happy-ukelele-island-surfing-theme',styleFamily:'casual-warm',
   licenseFile:'assets/free-audio/cozy-warm/source/source-page.html',
   archive:{url:'https://opengameart.org/sites/default/files/ukele.mp3',file:'assets/free-audio/cozy-warm/source/ukele.mp3'},
  },
  cues:[
   {role:'ambient',sourceId:'tarush-singhal-happy-ukelele',input:'assets/free-audio/cozy-warm/source/ukele.mp3',duration:16,valence:'positive',energy:'low',loopable:true,tags:['ukulele','island','music','loop']},
   {role:'tap',sourceId:kenney.interface,input:'assets/kenney-harvest/source/interface-sounds/Audio/select_001.ogg',valence:'neutral',energy:'low',tags:['interface','select','short-cue']},
   {role:'match',sourceId:kenney.interface,input:'assets/kenney-harvest/source/interface-sounds/Audio/confirmation_002.ogg',valence:'positive',energy:'medium',tags:['interface','confirmation','short-cue']},
   {role:'reject',sourceId:kenney.interface,input:'assets/kenney-harvest/source/interface-sounds/Audio/error_003.ogg',valence:'negative',energy:'medium',tags:['interface','error','short-cue']},
   {role:'reward',sourceId:kenney.jingles,input:'assets/kenney-harvest/source/music-jingles/OGG/jingles_SAX/jingles_SAX09.ogg',valence:'positive',energy:'medium',tags:['sax','jingle','reward']},
   {role:'win',sourceId:kenney.jingles,input:'assets/kenney-harvest/source/music-jingles/OGG/jingles_SAX/jingles_SAX03.ogg',valence:'positive',energy:'high',tags:['sax','jingle','fanfare','success']},
   {role:'loss',sourceId:kenney.jingles,input:'assets/kenney-harvest/source/music-jingles/OGG/jingles_SAX/jingles_SAX00.ogg',valence:'negative',energy:'medium',tags:['sax','jingle','failure','timeout']},
  ],
 },
 {
  id:'arcade-pop',label:'Arcade Pop',styleTags:['arcade','pop-punk','chiptune'],
  ambientSource:{
   id:'3xblast-pop-punk-chiptune',author:'3xBlast',license:'CC0-1.0',
   sourceUrl:'https://opengameart.org/content/7-pop-punk-chiptune-tracks',styleFamily:'arcade-pop',
   licenseFile:'assets/free-audio/arcade-pop/source/INFO.txt',
   archive:{url:'https://opengameart.org/sites/default/files/3xblast_-_7_pop-punk_chiptune_tracks_0.zip',file:'assets/free-audio/arcade-pop/source/pop-punk-chiptune.zip'},
  },
  cues:[
   {role:'ambient',sourceId:'3xblast-pop-punk-chiptune',input:'assets/free-audio/arcade-pop/source/3xBlast - A Band of Jellyfish (Looped).ogg',duration:16,valence:'positive',energy:'high',loopable:true,tags:['chiptune','pop-punk','music','loop']},
   {role:'tap',sourceId:kenney.interface,input:'assets/kenney-harvest/source/interface-sounds/Audio/click_001.ogg',valence:'neutral',energy:'medium',tags:['interface','click','short-cue']},
   {role:'match',sourceId:kenney.interface,input:'assets/kenney-harvest/source/interface-sounds/Audio/confirmation_004.ogg',valence:'positive',energy:'high',tags:['interface','confirmation','short-cue']},
   {role:'reject',sourceId:kenney.interface,input:'assets/kenney-harvest/source/interface-sounds/Audio/error_008.ogg',valence:'negative',energy:'high',tags:['interface','error','short-cue']},
   {role:'reward',sourceId:kenney.jingles,input:'assets/kenney-harvest/source/music-jingles/OGG/jingles_PIZZA/jingles_PIZZA09.ogg',valence:'positive',energy:'high',tags:['chiptune','jingle','reward']},
   {role:'win',sourceId:kenney.jingles,input:'assets/kenney-harvest/source/music-jingles/OGG/jingles_PIZZA/jingles_PIZZA03.ogg',valence:'positive',energy:'high',tags:['chiptune','jingle','fanfare','success']},
   {role:'loss',sourceId:kenney.jingles,input:'assets/kenney-harvest/source/music-jingles/OGG/jingles_PIZZA/jingles_PIZZA00.ogg',valence:'negative',energy:'medium',tags:['chiptune','jingle','failure','timeout']},
  ],
 },
];
const catalogFile=resolve(root,'assets/free-assets/catalog.json');
const catalog=JSON.parse(await readFile(catalogFile,'utf8'));
const browser=await chromium.launch();
const receipts=[];
try{
 const page=await browser.newPage();
 for(const family of familyDefinitions){
  const outputFolder=resolve(root,'assets/free-audio',family.id,'audio');
  await mkdir(outputFolder,{recursive:true});
  const files=[];
  for(const cue of family.cues){
   const input=await readFile(resolve(root,cue.input));
   const converted=await page.evaluate(async({base64,duration})=>{
    const bytes=Uint8Array.from(globalThis.atob(base64),character=>character.charCodeAt(0));
    const decoder=new globalThis.OfflineAudioContext(1,1,16000);
    const decoded=await decoder.decodeAudioData(bytes.buffer);
    const seconds=Math.min(decoded.duration,duration??decoded.duration);
    const context=new globalThis.OfflineAudioContext(1,Math.ceil(seconds*16000),16000);
    const source=context.createBufferSource();source.buffer=decoded;source.connect(context.destination);source.start();
    const pcm=(await context.startRendering()).getChannelData(0);
    let sourcePeak=0;for(const sample of pcm)sourcePeak=Math.max(sourcePeak,Math.abs(sample));
    const gain=Math.min(1,0.891250938/sourcePeak),fade=duration?320:0;
    const output=new Uint8Array(44+pcm.length*2),view=new DataView(output.buffer);
    const text=(at,value)=>{for(let index=0;index<value.length;index++)output[at+index]=value.charCodeAt(index);};
    text(0,'RIFF');view.setUint32(4,output.length-8,true);text(8,'WAVEfmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,16000,true);view.setUint32(28,32000,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,pcm.length*2,true);
    for(let index=0;index<pcm.length;index++){
     const envelope=fade?Math.min(1,index/fade,(pcm.length-1-index)/fade):1;
     const sample=Math.max(-1,Math.min(1,pcm[index]*gain*envelope));
     view.setInt16(44+index*2,Math.round(sample*(sample<0?32768:32767)),true);
    }
    let encoded='';for(let index=0;index<output.length;index+=8192)encoded+=String.fromCharCode(...output.subarray(index,index+8192));
    return {base64:globalThis.btoa(encoded),sourceDuration:decoded.duration,sourcePeak,gain};
   },{base64:input.toString('base64'),duration:cue.duration});
   const bytes=Buffer.from(converted.base64,'base64'),audioMeta=analyzeWav(bytes);
   const id=`${family.id}-${cue.role}`,path=`${family.id}/${cue.role}.wav`,file=`assets/free-audio/${family.id}/audio/${cue.role}.wav`;
   await writeFile(resolve(root,file),bytes);
   const args=['decodeAudioData','mono','16000 Hz','16-bit PCM',...(cue.duration?[`first ${cue.duration} seconds`,'20ms source boundary fades']:['full source duration']),...(converted.gain<1?[`gain ${converted.gain} for -1 dBFS ceiling`]:[])];
   const record={
    id,path,file,mime:'audio/wav',sha256:hash(bytes),
    audioMeta:{role:cue.role,valence:cue.valence,energy:cue.energy,styleTags:[...new Set([...family.styleTags,...cue.tags])],loopable:cue.loopable??false,auditionStatus:'analyzed',...audioMeta},
    processing:{kind:'audio-transcode',sourceFile:cue.input,sourceSha256:hash(input),tool:'Web Audio OfflineAudioContext',arguments:args},
   };
   files.push(record);receipts.push({family:family.id,id,role:cue.role,sourceId:cue.sourceId,sourceFile:cue.input,sourceSha256:hash(input),outputFile:file,outputSha256:hash(bytes),sourceDuration:converted.sourceDuration,sourcePeak:converted.sourcePeak,gain:converted.gain,audioMeta:record.audioMeta});
  }
  const newSource=family.ambientSource,{archive,...sourceFields}=newSource;
  const ambientRecord={...sourceFields,licenseUrl,licenseSha256:hash(await readFile(resolve(root,newSource.licenseFile))),archive:{url:archive.url,sha256:hash(await readFile(resolve(root,archive.file)))},files:files.filter(file=>file.audioMeta.role==='ambient')};
  catalog.sources=catalog.sources.filter(source=>source.id!==newSource.id);catalog.sources.push(ambientRecord);
  for(const sourceId of [kenney.interface,kenney.jingles]){
   const source=catalog.sources.find(row=>row.id===sourceId);if(!source)throw Error(`Missing catalog source ${sourceId}`);
   const owned=new Set(files.filter(file=>file.audioMeta.role!=='ambient').map(file=>file.path));
   source.files=source.files.filter(file=>!owned.has(file.path));source.files.push(...files.filter(file=>file.processing.sourceFile.includes(sourceId===kenney.interface?'interface-sounds':'music-jingles')));
  }
  const receiptFile=resolve(root,'assets/free-audio',family.id,'audio-conversion.json');
  await writeFile(receiptFile,JSON.stringify({format:'tora-audio-conversion-1',method:'CC0 source decode, mono PCM conversion, boundary fades and optional -1 dBFS ceiling only',browser:browser.version(),script:'scripts/lean/native/prepare-audio-collections.mjs',family:family.id,cues:receipts.filter(receipt=>receipt.family===family.id)},null,2)+'\n');
 }
 catalog.audioCollections=familyDefinitions.map(family=>({id:family.id,label:family.label,auditionStatus:'analyzed',cues:Object.fromEntries(family.cues.map(cue=>[cue.role,`${family.id}-${cue.role}`]))}));
 await writeFile(catalogFile,JSON.stringify(catalog,null,2)+'\n');
 process.stdout.write(JSON.stringify(receipts.map(({family,id,audioMeta})=>({family,id,durationSec:audioMeta.durationSec,peakDbfs:audioMeta.peakDbfs,clipping:audioMeta.clipping})),null,2)+'\n');
}finally{await browser.close();}
