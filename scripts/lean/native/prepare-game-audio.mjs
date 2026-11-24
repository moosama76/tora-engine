import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {Buffer} from 'node:buffer';
import process from 'node:process';
import {analyzeAudio} from './audio-analysis.mjs';

/**
 * Prepare compressed, 100% unique CC0 MP3 audio packs for Tiny Harvest, Traffic Tycoon, and Mini Golf.
 * - Zero shared music or SFX across the 3 showcase playables.
 * - Zero sax honks or oscillator synthesis; authentic CC0 third-party recordings only.
 * - Longer (~1.9–2.3s) rising celebratory win fanfares for all 3 games.
 */

const root=resolve(import.meta.dirname,'../../..');
const hash=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');
const RATE=22050;

function decodeToPcmFloat(filePath){
 const raw=execFileSync('gst-launch-1.0',['-q','filesrc',`location=${resolve(root,filePath)}`,'!','decodebin','!','audioconvert','!','audioresample','!',`audio/x-raw,channels=1,rate=${RATE},format=S16LE`,'!','fdsink','fd=1'],{maxBuffer:40*1024*1024,stdio:['ignore','pipe','pipe']});
 const samples=new Float64Array(raw.length/2);
 for(let i=0;i<samples.length;i++)samples[i]=raw.readInt16LE(i*2)/32768;
 return samples;
}

function trimSilence(samples,threshold=0.004,padSamples=Math.round(RATE*0.012)){
 let first=0,last=samples.length-1;
 while(first<samples.length&&Math.abs(samples[first])<threshold)first++;
 while(last>first&&Math.abs(samples[last])<threshold)last--;
 first=Math.max(0,first-padSamples);
 last=Math.min(samples.length-1,last+padSamples);
 return samples.subarray(first,last+1);
}

function crossfadeJoin(clips,overlapSec=0.045){
 if(clips.length===1)return Float64Array.from(clips[0]);
 const overlap=Math.max(1,Math.round(RATE*overlapSec));
 let total=clips[0].length;
 for(let i=1;i<clips.length;i++)total+=clips[i].length-Math.min(overlap,clips[i-1].length,clips[i].length);
 const out=new Float64Array(total);
 out.set(clips[0],0);
 let cursor=clips[0].length;
 for(let i=1;i<clips.length;i++){
  const prevLen=clips[i-1].length,next=clips[i],ov=Math.min(overlap,prevLen,next.length);
  const start=cursor-ov;
  for(let j=0;j<ov;j++){
   const t=j/ov,fadeOut=Math.cos(t*Math.PI*0.5),fadeIn=Math.sin(t*Math.PI*0.5);
   out[start+j]=out[start+j]*fadeOut+next[j]*fadeIn;
  }
  out.set(next.subarray(ov),cursor);
  cursor=start+next.length;
 }
 return out;
}

function masterPcm(samples,{startSec=0,maxDurationSec,fadeInSec,fadeOutSec,fadeSec=0.015,ceiling=0.87,loopFadeSec=0,softDrive=1}={}){
 let data=startSec>0?samples.subarray(Math.min(samples.length,Math.round(startSec*RATE))):samples;
 if(maxDurationSec&&data.length>Math.ceil(maxDurationSec*RATE)){
  data=data.subarray(0,Math.ceil(maxDurationSec*RATE));
 }
 let peak=0;
 for(let i=0;i<data.length;i++)peak=Math.max(peak,Math.abs(data[i]));
 const gain=peak>0?Math.min(4.0,ceiling/peak):1;
 const fadeIn=Math.round(RATE*(loopFadeSec||fadeInSec||fadeSec));
 const fadeOut=Math.round(RATE*(loopFadeSec||fadeOutSec||fadeSec));
 const pcm16=Buffer.alloc(data.length*2);
 for(let i=0;i<data.length;i++){
  let env=1;
  if(fadeIn>0&&i<fadeIn)env*=i/fadeIn;
  if(fadeOut>0&&i>=data.length-fadeOut)env*=(data.length-1-i)/fadeOut;
  let v=data[i]*gain*env;
  if(softDrive>1)v=Math.tanh(v*softDrive)/Math.tanh(softDrive)*ceiling;
  v=Math.max(-0.95,Math.min(0.95,v));
  pcm16.writeInt16LE(Math.round(v*(v<0?32768:32767)),i*2);
 }
 return pcm16;
}

function encodeMp3(pcm16,bitrateKbps){
 const wav=Buffer.alloc(44+pcm16.length);
 wav.write('RIFF',0,'ascii');wav.writeUInt32LE(36+pcm16.length,4);wav.write('WAVEfmt ',8,'ascii');
 wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);
 wav.writeUInt32LE(RATE,24);wav.writeUInt32LE(RATE*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);
 wav.write('data',36,'ascii');wav.writeUInt32LE(pcm16.length,40);pcm16.copy(wav,44);
 return execFileSync('gst-launch-1.0',['-q','fdsrc','fd=0','!','wavparse','!','audioconvert','!','lamemp3enc','target=bitrate','cbr=true',`bitrate=${bitrateKbps}`,'!','fdsink','fd=1'],{input:wav,maxBuffer:20*1024*1024,stdio:['pipe','pipe','pipe']});
}

async function ensureTrafficMusicSource(){
 const outRel='assets/tora-traffic/source/now-this-is-a-waterpark.ogg';
 const outAbs=resolve(root,outRel);
 await mkdir(resolve(root,'assets/tora-traffic/source'),{recursive:true});
 const ogg=execFileSync('unzip',['-p',resolve(root,'assets/free-audio/arcade-pop/source/pop-punk-chiptune.zip'),'3xBlast - Now This Is A Waterpark! (Looped).ogg'],{maxBuffer:20*1024*1024});
 await writeFile(outAbs,ogg);
 return outRel;
}

const trafficMusicSource=await ensureTrafficMusicSource();

// 1. Tiny Harvest (cozy farm chiptune + longer 2.0s rising NES victory fanfare)
const harvestCues=[
 {
  id:'audio-ambient',role:'ambient',outFile:'assets/kenney-harvest/audio/ambient.mp3',catalogPath:'audio/ambient.mp3',
  sourceId:'zane-little-flowerbed-fields',inputs:['assets/kenney-harvest/source/flowerbed-fields/flowerbed_fields.ogg'],
  maxDurationSec:16,loopFadeSec:0.03,bitrate:32,valence:'neutral',energy:'low',loopable:true,tags:['chiptune','cozy','music','loop'],
 },
 {
  id:'audio-match',role:'match',outFile:'assets/kenney-harvest/audio/match.mp3',catalogPath:'audio/match.mp3',
  sourceId:'kenney-interface-sounds',inputs:['assets/kenney-harvest/source/interface-sounds/Audio/confirmation_001.ogg'],
  bitrate:48,valence:'positive',energy:'medium',loopable:false,tags:['interface','match','short-cue'],
 },
 {
  id:'audio-reject',role:'reject',outFile:'assets/kenney-harvest/audio/reject.mp3',catalogPath:'audio/reject.mp3',
  sourceId:'kenney-interface-sounds',inputs:['assets/kenney-harvest/source/interface-sounds/Audio/error_004.ogg'],
  bitrate:48,valence:'negative',energy:'medium',loopable:false,tags:['interface','reject','short-cue'],
 },
 {
  id:'audio-victory',role:'complete',catalogRole:'victory',outFile:'assets/kenney-harvest/audio/victory.mp3',catalogPath:'audio/victory.mp3',
  sourceId:'mintodog-cozy-puzzle-jingle',
  author:'MintoDog',license:'CC0-1.0',sourceUrl:'https://opengameart.org/content/cozy-puzzle-jingle-result',
  inputs:['assets/free-audio/victory-cc0/cozy-puzzle-jingle-result/preview_cozy_puzzle_jingle_result.ogg'],
  maxDurationSec:3.75,fadeInSec:0.01,fadeOutSec:0.22,bitrate:48,valence:'positive',energy:'high',loopable:false,tags:['cozy','harp','fanfare','victory','win'],
 },
 {
  id:'audio-complete',role:'loss',catalogRole:'loss',outFile:'assets/kenney-harvest/audio/complete.mp3',catalogPath:'audio/complete.mp3',
  sourceId:'kenney-music-jingles',inputs:['assets/kenney-harvest/source/music-jingles/OGG/jingles_NES/jingles_NES00.ogg'],
  bitrate:48,valence:'negative',energy:'medium',loopable:false,tags:['nes','timeout','failure'],
 },
];

// 2. Traffic Tycoon (sunny upbeat 3xBlast groove + tactile road-snap + bright chime + joyful Fupi grand-piano victory fanfare)
const trafficCues=[
 {
  id:'traffic.audio.ambient',role:'ambient',outFile:'assets/tora-traffic/audio/ambient.mp3',
  author:'3xBlast',license:'CC0-1.0',sourceUrl:'https://opengameart.org/content/7-pop-punk-chiptune-tracks',sourceId:'3xblast-pop-punk-chiptune',
  inputs:[trafficMusicSource],maxDurationSec:16,loopFadeSec:0.03,bitrate:32,
 },
 {
  id:'traffic.audio.tap',role:'tap',outFile:'assets/tora-traffic/audio/tap.mp3',
  author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/interface-sounds',sourceId:'kenney-interface-sounds',
  inputs:['assets/kenney-harvest/source/interface-sounds/Audio/drop_002.ogg'],bitrate:48,
 },
 {
  id:'traffic.audio.reward',role:'reward',outFile:'assets/tora-traffic/audio/reward.mp3',
  author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/interface-sounds',sourceId:'kenney-interface-sounds',
  inputs:['assets/kenney-harvest/source/interface-sounds/Audio/maximize_006.ogg'],bitrate:48,
 },
 {
  id:'traffic.audio.win',role:'win',outFile:'assets/tora-traffic/audio/win.mp3',
  author:'Fupi',license:'CC0-1.0',sourceUrl:'https://opengameart.org/content/win-jingle',sourceId:'fupi-win-jingle',
  inputs:['assets/free-audio/victory-cc0/win-jingle/WinGrandPiano.ogg'],
  maxDurationSec:3.0,fadeInSec:0.008,fadeOutSec:0.14,bitrate:48,
 },
 {
  id:'traffic.audio.loss',role:'loss',outFile:'assets/tora-traffic/audio/loss.mp3',
  author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/music-jingles',sourceId:'kenney-music-jingles',
  inputs:['assets/kenney-harvest/source/music-jingles/OGG/jingles_PIZZA/jingles_PIZZA11.ogg'],bitrate:48,
 },
];

// 3. Mini Golf (sunny island ukulele theme + crisp golf strike/bank/cup SFX + sparkling Listener bells/chimes orchestral victory fanfare)
const golfCues=[
 {
  id:'golf.audio.ambient',role:'ambient',outFile:'assets/tora-golf/audio/ambient.mp3',
  author:'Tarush Singhal',license:'CC0-1.0',sourceUrl:'https://opengameart.org/content/happy-ukelele-island-surfing-theme',sourceId:'tarush-singhal-happy-ukelele',
  inputs:['assets/free-audio/cozy-warm/source/ukele.mp3'],maxDurationSec:16,loopFadeSec:0.03,bitrate:32,
 },
 {
  id:'golf.audio.strike',role:'tap',outFile:'assets/tora-golf/audio/strike.mp3',
  author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/interface-sounds',sourceId:'kenney-interface-sounds',
  inputs:['fixtures/mini-golf/audio/strike.ogg'],bitrate:48,
 },
 {
  id:'golf.audio.bank',role:'bank',outFile:'assets/tora-golf/audio/bank.mp3',
  author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/interface-sounds',sourceId:'kenney-interface-sounds',
  inputs:['fixtures/mini-golf/audio/bank.ogg'],bitrate:48,
 },
 {
  id:'golf.audio.cup',role:'reward',outFile:'assets/tora-golf/audio/cup.mp3',
  author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/interface-sounds',sourceId:'kenney-interface-sounds',
  inputs:['fixtures/mini-golf/audio/cup.ogg'],bitrate:48,
 },
 {
  id:'golf.audio.win',role:'win',outFile:'assets/tora-golf/audio/win.mp3',
  author:'Listener',license:'CC0-1.0',sourceUrl:'https://opengameart.org/content/win-sound-effect',sourceId:'listener-win-sound-effect',
  inputs:['assets/free-audio/victory-cc0/win-sound-effect/Win sound.wav'],
  trimClip:true,maxDurationSec:3.0,fadeInSec:0.008,fadeOutSec:0.18,ceiling:0.9,softDrive:1.8,bitrate:48,
 },
 {
  id:'golf.audio.loss',role:'loss',outFile:'assets/tora-golf/audio/loss.mp3',
  author:'Kenney',license:'CC0-1.0',sourceUrl:'https://kenney.nl/assets/music-jingles',sourceId:'kenney-music-jingles',
  inputs:['assets/kenney-harvest/source/music-jingles/OGG/jingles_STEEL/jingles_STEEL14.ogg'],bitrate:48,
 },
];

async function renderCue(cue){
 const clips=cue.inputs.map(input=>{
  const pcm=decodeToPcmFloat(input);
  return (cue.inputs.length>1||cue.trimClip)?trimSilence(pcm):pcm;
 });
 const joined=crossfadeJoin(clips,cue.overlapSec??0.04);
 const shortTransient=cue.inputs.length===1&&!cue.maxDurationSec&&!cue.trimClip&&joined.length<RATE*0.08;
 const pcm16=masterPcm(joined,{
  startSec:cue.startSec??0,
  maxDurationSec:cue.maxDurationSec,
  loopFadeSec:cue.loopFadeSec??0,
  fadeInSec:cue.fadeInSec,
  fadeOutSec:cue.fadeOutSec,
  ceiling:cue.ceiling??0.87,
  softDrive:cue.softDrive??1,
  fadeSec:shortTransient?0:(cue.inputs.length===1&&!cue.maxDurationSec?0.004:0.015),
 });
 const mp3=encodeMp3(pcm16,cue.bitrate);
 await mkdir(resolve(root,cue.outFile,'..'),{recursive:true});
 await writeFile(resolve(root,cue.outFile),mp3);
 const analysis=analyzeAudio(mp3,'audio/mpeg');
 const sourceHashes=await Promise.all(cue.inputs.map(async f=>hash(await readFile(resolve(root,f)))));
 return {
  ...cue,
  bytes:mp3.length,
  sha256:hash(mp3),
  sourceHashes,
  analysis,
 };
}

const harvestOut=await Promise.all(harvestCues.map(renderCue));
const trafficOut=await Promise.all(trafficCues.map(renderCue));
const golfOut=await Promise.all(golfCues.map(renderCue));

// Verify zero shared inputs or SHA-256 hashes across all 3 games!
const allGroups={harvest:harvestOut,traffic:trafficOut,golf:golfOut};
const seenInputs=new Map(),seenHashes=new Map();
for(const [game,list]of Object.entries(allGroups)){
 for(const item of list){
  for(const inp of item.inputs){
   if(seenInputs.has(inp)&&seenInputs.get(inp)!==game)throw Error(`Duplicate audio source ${inp} across ${seenInputs.get(inp)} and ${game}`);
   seenInputs.set(inp,game);
  }
  if(seenHashes.has(item.sha256))throw Error(`Duplicate MP3 hash ${item.sha256} for ${item.id}`);
  seenHashes.set(item.sha256,`${game}:${item.id}`);
  if(item.analysis.clipping)throw Error(`Clipping detected in ${game}:${item.id}`);
  if(['win','complete'].includes(item.role)){
   if(item.analysis.trimmedDurationSec<1.6)throw Error(`Win fanfare ${game}:${item.id} too short: ${item.analysis.trimmedDurationSec}s`);
   if(item.analysis.pitchContour==='falling')throw Error(`Win fanfare ${game}:${item.id} has falling contour!`);
  }
 }
}

// Update assets/free-assets/catalog.json (preserving ALL 20 legacy audio/wav entries untouched!)
const catalogFile=resolve(root,'assets/free-assets/catalog.json');
const catalog=JSON.parse(await readFile(catalogFile,'utf8'));
const mintoLicenseFile='assets/free-audio/victory-cc0/cozy-puzzle-jingle-result/source-page.html';
const mintoArchiveFile='assets/free-audio/victory-cc0/cozy-puzzle-jingle-result/preview_cozy_puzzle_jingle_result.ogg';
const mintoSourceMeta={
 id:'mintodog-cozy-puzzle-jingle',
 author:'MintoDog',
 license:'CC0-1.0',
 sourceUrl:'https://opengameart.org/content/cozy-puzzle-jingle-result',
 styleFamily:'cozy-acoustic-audio',
 licenseFile:mintoLicenseFile,
 licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',
 licenseSha256:hash(await readFile(resolve(root,mintoLicenseFile))),
 archive:{
  url:'https://opengameart.org/sites/default/files/preview_cozy_puzzle_jingle_result.ogg',
  sha256:hash(await readFile(resolve(root,mintoArchiveFile))),
 },
};
const existingMinto=catalog.sources.find(s=>s.id==='mintodog-cozy-puzzle-jingle');
if(existingMinto){
 Object.assign(existingMinto,mintoSourceMeta);
 delete existingMinto.title;
 delete existingMinto.attributionRequired;
 delete existingMinto.role;
}else{
 catalog.sources.push({...mintoSourceMeta,files:[]});
}
for(const item of harvestOut){
 const source=catalog.sources.find(s=>s.id===item.sourceId);
 if(!source)throw Error(`Missing catalog source ${item.sourceId}`);
 const metaFields={...item.analysis};
 delete metaFields.startHz;delete metaFields.endHz;delete metaFields.pitchContour;
 // Remove any stale victory.mp3 from kenney-music-jingles when moving victory.mp3 to MintoDog
 if(item.catalogPath==='audio/victory.mp3'){
  for(const s of catalog.sources)if(s.id!==item.sourceId)s.files=s.files.filter(f=>f.path!=='audio/victory.mp3');
 }
 const record={
  path:item.catalogPath,
  file:item.outFile,
  mime:'audio/mpeg',
  sha256:item.sha256,
  audioMeta:{
   role:item.catalogRole??item.role,
   valence:item.valence,
   energy:item.energy,
   styleTags:item.tags,
   loopable:item.loopable,
   auditionStatus:'analyzed',
   ...metaFields,
  },
  processing:{
   kind:'audio-transcode',
   sourceFile:item.inputs[0],
   sourceSha256:item.sourceHashes[0],
   tool:'GStreamer lamemp3enc',
   arguments:['mono',`${RATE} Hz`,'MP3',`${item.bitrate} kbps`,...(item.inputs.length>1?['phrase-join',...item.inputs]:[]),...(item.maxDurationSec?[`first ${item.maxDurationSec}s`,item.loopFadeSec?'30ms loop fade':'fade out']:['full duration'])],
  },
 };
 source.files=source.files.filter(f=>f.path!==item.catalogPath);
 source.files.push(record);
}
await writeFile(catalogFile,JSON.stringify(catalog,null,2)+'\n');

// Update assets/kenney-harvest/plan.json to use the compressed MP3 audio + longer rising victory fanfare
const harvestPlanFile=resolve(root,'assets/kenney-harvest/plan.json');
const harvestPlan=JSON.parse(await readFile(harvestPlanFile,'utf8'));
harvestPlan.assets=harvestPlan.assets.filter(a=>!a.id.startsWith('audio-'));
harvestPlan.audio={};
for(const item of harvestOut){
 const source=catalog.sources.find(s=>s.id===item.sourceId);
 harvestPlan.assets.push({
  id:item.id,
  file:item.catalogPath,
  mime:'audio/mpeg',
  rights:`${source.author}, CC0-1.0. ${source.sourceUrl}`,
  provenance:{
   origin:'third-party-free',
   sourceId:source.id,
   sourceFile:item.catalogPath,
   sourceHash:item.sha256,
   author:source.author,
   license:source.license,
   sourceUrl:source.sourceUrl,
   styleFamily:source.styleFamily,
  },
 });
 harvestPlan.audio[item.role]=item.id;
}
await writeFile(harvestPlanFile,JSON.stringify(harvestPlan,null,2)+'\n');

// Write dedicated audio plans for Traffic Tycoon and Mini Golf
function writeGameAudioPlan(dest,list){
 const payload={
  format:'tora-game-audio-plan-1',
  files:list.map(item=>({
   id:item.id,
   role:item.role,
   file:item.outFile,
   mime:'audio/mpeg',
   bytes:item.bytes,
   sha256:item.sha256,
   durationSec:item.analysis.durationSec,
   trimmedDurationSec:item.analysis.trimmedDurationSec,
   pitchContour:item.analysis.pitchContour,
   rights:`${item.author}; ${item.license}; ${item.sourceUrl}; attribution required: no`,
   provenance:{
    sourceId:item.sourceId,
    sourceFiles:item.inputs,
    sourceHashes:item.sourceHashes,
    license:item.license,
    tool:'GStreamer lamemp3enc',
    bitrateKbps:item.bitrate,
   },
  })),
 };
 return writeFile(resolve(root,dest),JSON.stringify(payload,null,2)+'\n');
}
await writeGameAudioPlan('assets/tora-traffic/audio-plan.json',trafficOut);
await writeGameAudioPlan('assets/tora-golf/audio-plan.json',golfOut);

const summary=Object.fromEntries(Object.entries(allGroups).map(([game,list])=>[game,list.map(x=>({id:x.id,role:x.role,bytes:x.bytes,dur:Number(x.analysis.durationSec.toFixed(2)),trim:Number(x.analysis.trimmedDurationSec.toFixed(2)),contour:x.analysis.pitchContour,peak:Number(x.analysis.peakDbfs.toFixed(1))}))]));
process.stdout.write(JSON.stringify(summary,null,2)+'\n');
