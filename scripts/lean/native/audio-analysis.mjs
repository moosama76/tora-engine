import {Buffer} from 'node:buffer';
import {execFileSync} from 'node:child_process';
import {isAudioMime,validateMp3} from './media-validate.mjs';
export {isAudioMime,validateMp3};

export const WAV_ANALYSIS_LIMITS=Object.freeze({
 maxBytes:700000,
 maxDurationSec:120,
 minSampleRate:8000,
 maxSampleRate:48000,
 silenceThresholdDbfs:-60,
});
const malformed='E_AUDIO_WAV_MALFORMED';
const unsupported='E_AUDIO_WAV_UNSUPPORTED';
function check(value,code=malformed){
 if(!value){const error=Error(code);error.code=code;throw error;}
}
function rounded(value){
 if(!Number.isFinite(value))return value;
 const result=Number(value.toFixed(6));
 return Object.is(result,-0)?0:result;
}
function dbfs(value){return value===0?-Infinity:20*Math.log10(value);}
function sampleAt(bytes,offset,bits){
 if(bits===8)return (bytes[offset]-128)/128;
 return bytes.readInt16LE(offset)/32768;
}

export function analyzeWav(input){
 check(input instanceof Uint8Array,'E_AUDIO_WAV_INPUT');
 const bytes=Buffer.from(input.buffer,input.byteOffset,input.byteLength);
 check(bytes.length>=44&&bytes.length<=WAV_ANALYSIS_LIMITS.maxBytes,bytes.length>WAV_ANALYSIS_LIMITS.maxBytes?'E_AUDIO_WAV_LIMIT':malformed);
 check(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WAVE'&&bytes.readUInt32LE(4)+8===bytes.length);
 let offset=12,format,dataOffset=0,dataSize=0,seenData=false;
 while(offset+8<=bytes.length){
  const type=bytes.toString('ascii',offset,offset+4),size=bytes.readUInt32LE(offset+4);
  check(offset+8+size<=bytes.length);
  if(type==='fmt '){
   check(size>=16);
   check(bytes.readUInt16LE(offset+8)===1,unsupported);
   const channels=bytes.readUInt16LE(offset+10),sampleRate=bytes.readUInt32LE(offset+12),bitsPerSample=bytes.readUInt16LE(offset+22);
   const blockAlign=channels*bitsPerSample/8;
   check([1,2].includes(channels)&&[8,16].includes(bitsPerSample),unsupported);
   check(sampleRate>=WAV_ANALYSIS_LIMITS.minSampleRate&&sampleRate<=WAV_ANALYSIS_LIMITS.maxSampleRate,unsupported);
   check(Number.isInteger(blockAlign)&&bytes.readUInt16LE(offset+20)===blockAlign&&bytes.readUInt32LE(offset+16)===sampleRate*blockAlign);
   format={channels,sampleRate,bitsPerSample,blockAlign};
  }
  if(type==='data'){
   check(size>0&&!seenData);seenData=true;dataOffset=offset+8;dataSize=size;
  }
  offset+=8+size+(size%2);
 }
 check(format&&seenData&&offset===bytes.length&&dataSize%format.blockAlign===0);
 const {channels,sampleRate,bitsPerSample,blockAlign}=format;
 const frameCount=dataSize/blockAlign;
 check(frameCount>0&&frameCount/sampleRate<=WAV_ANALYSIS_LIMITS.maxDurationSec,frameCount/sampleRate>WAV_ANALYSIS_LIMITS.maxDurationSec?'E_AUDIO_WAV_LIMIT':malformed);
 const sampleCount=frameCount*channels,samples=new Float64Array(sampleCount);
 const bytesPerSample=bitsPerSample/8,silenceThreshold=10**(WAV_ANALYSIS_LIMITS.silenceThresholdDbfs/20);
 let peak=0,sum=0,sumSquares=0,clippedSamples=0;
 for(let frame=0;frame<frameCount;frame++){
  for(let channel=0;channel<channels;channel++){
   const at=dataOffset+frame*blockAlign+channel*bytesPerSample,index=frame*channels+channel;
   const sample=sampleAt(bytes,at,bitsPerSample);samples[index]=sample;
   const absolute=Math.abs(sample);peak=Math.max(peak,absolute);sum+=sample;sumSquares+=sample*sample;
   const raw=bitsPerSample===8?bytes[at]:bytes.readInt16LE(at);
   if(raw===(bitsPerSample===8?0:-32768)||raw===(bitsPerSample===8?255:32767))clippedSamples++;
  }
 }
 let firstActive=-1,lastActive=-1;
 for(let frame=0;frame<frameCount;frame++){
  let active=false;
  for(let channel=0;channel<channels;channel++)active||=Math.abs(samples[frame*channels+channel])>silenceThreshold;
  if(active){if(firstActive<0)firstActive=frame;lastActive=frame;}
 }
 const silent=firstActive<0,leadingFrames=silent?frameCount:firstActive,trailingFrames=silent?0:frameCount-lastActive-1;
 const activeEnd=silent?frameCount:lastActive+1;
 let loopSeamDelta=0;
 const deltas=[];
 if(frameCount>1){
  for(let channel=0;channel<channels;channel++){
   loopSeamDelta=Math.max(loopSeamDelta,Math.abs(samples[channel]-samples[(frameCount-1)*channels+channel]));
   for(let frame=1;frame<frameCount;frame++)deltas.push(Math.abs(samples[frame*channels+channel]-samples[(frame-1)*channels+channel]));
  }
 }
 deltas.sort((a,b)=>a-b);
 const typicalDelta=deltas.length?deltas[Math.floor((deltas.length-1)*.95)]:0;
 const loopSeamClick=frameCount>1&&loopSeamDelta>Math.max(.1,typicalDelta*4);
 const estimatePitch=(startFrame,endFrame)=>{
  const length=endFrame-startFrame;
  const minLag=Math.max(4,Math.floor(sampleRate/2000)),maxLag=Math.min(Math.floor(length/2),Math.ceil(sampleRate/80));
  if(length<minLag*3||maxLag<=minLag)return null;
  const windowLen=Math.min(length,Math.floor(sampleRate*.18)),base=startFrame+Math.floor((length-windowLen)/2);
  const mono=new Float64Array(windowLen);
  let energy=0;
  for(let i=0;i<windowLen;i++){let v=0;for(let ch=0;ch<channels;ch++)v+=samples[(base+i)*channels+ch];v/=channels;mono[i]=v;energy+=v*v;}
  if(energy<1e-6)return null;
  let bestLag=0,bestCorr=0;
  for(let lag=minLag;lag<=maxLag;lag++){
   let sum=0,e1=0,e2=0;
   for(let i=0;i<windowLen-lag;i++){const a=mono[i],b=mono[i+lag];sum+=a*b;e1+=a*a;e2+=b*b;}
   const denom=Math.sqrt(e1*e2);
   if(denom>0){const corr=sum/denom;if(corr>bestCorr){bestCorr=corr;bestLag=lag;}}
  }
  return bestCorr>=.45&&bestLag>0?rounded(sampleRate/bestLag):null;
 };
 let startHz=null,endHz=null,pitchContour='indeterminate';
 if(!silent){
  const activeFrames=lastActive-firstActive+1;
  if(activeFrames>=Math.floor(sampleRate*.18)){
   const slice=Math.floor(activeFrames/3);
   startHz=estimatePitch(firstActive,firstActive+slice);
   endHz=estimatePitch(lastActive-slice+1,lastActive+1);
   if(startHz&&endHz){
    const ratio=endHz/startHz;
    pitchContour=ratio>=1.08?'rising':ratio<=.92?'falling':'flat';
   }
  }
 }
 return Object.freeze({
  channels,sampleRate,bitsPerSample,frameCount,
  durationSec:rounded(frameCount/sampleRate),
  peakDbfs:rounded(dbfs(peak)),
  rmsDbfs:rounded(dbfs(Math.sqrt(sumSquares/sampleCount))),
  silenceThresholdDbfs:WAV_ANALYSIS_LIMITS.silenceThresholdDbfs,
  leadingSilenceSec:rounded(leadingFrames/sampleRate),
  trailingSilenceSec:rounded(trailingFrames/sampleRate),
  activeStartSec:rounded(leadingFrames/sampleRate),
  activeEndSec:rounded(activeEnd/sampleRate),
  trimmedDurationSec:rounded(silent?0:(lastActive-firstActive+1)/sampleRate),
  dcOffset:rounded(sum/sampleCount),
  clippedSamples,
  clipping:clippedSamples>0,
  loopSeamDelta:rounded(loopSeamDelta),
  loopSeamClick,
  startHz,
  endHz,
  pitchContour,
 });
}

/** Decode bounded MP3 bytes to 16kHz 16-bit mono PCM WAV via GStreamer for acoustic inspection. */
export function decodeMp3ToWav(input,rate=16000){
 check(input instanceof Uint8Array,'E_AUDIO_MP3_INPUT');
 const bytes=Buffer.from(input.buffer,input.byteOffset,input.byteLength);
 validateMp3(bytes,'E_AUDIO_MP3_MALFORMED');
 let pcm;
 try{
  pcm=execFileSync('gst-launch-1.0',['-q','fdsrc','fd=0','!','mpegaudioparse','!','avdec_mp3','!','audioconvert','!','audioresample','!',`audio/x-raw,channels=1,rate=${rate},format=S16LE`,'!','fdsink','fd=1'],{input:bytes,maxBuffer:20*1024*1024,stdio:['pipe','pipe','pipe']});
 }catch{
  check(false,'E_AUDIO_MP3_DECODE');
 }
 check(pcm&&pcm.length>0&&pcm.length%2===0,'E_AUDIO_MP3_DECODE');
 const out=Buffer.alloc(44+pcm.length);
 out.write('RIFF',0,'ascii');out.writeUInt32LE(36+pcm.length,4);out.write('WAVEfmt ',8,'ascii');
 out.writeUInt32LE(16,16);out.writeUInt16LE(1,20);out.writeUInt16LE(1,22);
 out.writeUInt32LE(rate,24);out.writeUInt32LE(rate*2,28);out.writeUInt16LE(2,32);out.writeUInt16LE(16,34);
 out.write('data',36,'ascii');out.writeUInt32LE(pcm.length,40);pcm.copy(out,44);
 return out;
}

/** Unified acoustic analyzer for both PCM WAV and compressed MP3 audio assets. */
export function analyzeAudio(input,mime='audio/wav'){
 if(mime==='audio/mpeg')return analyzeWav(decodeMp3ToWav(input));
 return analyzeWav(input);
}
