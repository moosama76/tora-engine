import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Buffer} from 'node:buffer';
import {analyzeWav,WAV_ANALYSIS_LIMITS} from '../../scripts/lean/native/audio-analysis.mjs';
import {validateAssetPolicy,validateAudioMetadata} from '../../scripts/lean/native/asset-policy.mjs';

function chunk(type,data){
 const body=Buffer.from(data),result=Buffer.alloc(8+body.length+(body.length%2));
 result.write(type,0,'ascii');result.writeUInt32LE(body.length,4);body.copy(result,8);
 return result;
}
function makeWav(samples,{channels=1,sampleRate=8000,bitsPerSample=16,extraChunks=[]}={}){
 assert.equal(samples.length%channels,0);
 const bytesPerSample=bitsPerSample/8,data=Buffer.alloc(samples.length*bytesPerSample);
 samples.forEach((sample,index)=>{
  if(bitsPerSample===8)data.writeUInt8(sample,index);
  else data.writeInt16LE(sample,index*2);
 });
 const format=Buffer.alloc(16);
 format.writeUInt16LE(1,0);format.writeUInt16LE(channels,2);format.writeUInt32LE(sampleRate,4);
 format.writeUInt32LE(sampleRate*channels*bytesPerSample,8);format.writeUInt16LE(channels*bytesPerSample,12);format.writeUInt16LE(bitsPerSample,14);
 const body=Buffer.concat([Buffer.from('WAVE'),chunk('fmt ',format),...extraChunks.map(part=>chunk(part.type,part.data)),chunk('data',data)]);
 const result=Buffer.concat([Buffer.from('RIFF'),Buffer.alloc(4),body]);result.writeUInt32LE(result.length-8,4);
 return result;
}
function errorCode(code,input){
 assert.throws(()=>analyzeWav(input),error=>{
  assert.equal(error.message,code);assert.equal(error.code,code);return true;
 });
}
function close(actual,expected,epsilon=.000001){
 assert.ok(Math.abs(actual-expected)<=epsilon,`${actual} differs from ${expected}`);
}
const catalog=JSON.parse(readFileSync('assets/free-assets/catalog.json','utf8'));
const audioFiles=catalog.sources.flatMap(source=>source.files.filter(file=>file.mime==='audio/wav').map(file=>({source,file})));
const acousticFields=['channels','sampleRate','bitsPerSample','frameCount','durationSec','peakDbfs','rmsDbfs','silenceThresholdDbfs','leadingSilenceSec','trailingSilenceSec','activeStartSec','activeEndSec','trimmedDurationSec','dcOffset','clippedSamples','clipping','loopSeamDelta','loopSeamClick'];

test('16-bit mono analysis is deterministic and computes level, duration, RMS and DC from samples',()=>{
 const bytes=makeWav([0,16384,-16384,8192,-8192]),original=Buffer.from(bytes);
 const first=analyzeWav(bytes),second=analyzeWav(new Uint8Array(bytes));
 assert.deepEqual(first,second);assert.deepEqual(bytes,original);assert.ok(Object.isFrozen(first));
 assert.equal(first.channels,1);assert.equal(first.sampleRate,8000);assert.equal(first.bitsPerSample,16);
 assert.equal(first.frameCount,5);assert.equal(first.durationSec,.000625);
 assert.equal(first.peakDbfs,-6.0206);assert.equal(first.rmsDbfs,-9.0309);assert.equal(first.dcOffset,0);
 assert.equal(first.leadingSilenceSec,.000125);assert.equal(first.trailingSilenceSec,0);assert.equal(first.trimmedDurationSec,.0005);
 assert.equal(first.clippedSamples,0);assert.equal(first.clipping,false);assert.equal(first.loopSeamClick,false);
});

test('digital silence has infinite negative dBFS and unambiguous whole-file trim information',()=>{
 const result=analyzeWav(makeWav(new Array(16).fill(0)));
 assert.equal(result.peakDbfs,-Infinity);assert.equal(result.rmsDbfs,-Infinity);
 assert.equal(result.durationSec,.002);assert.equal(result.leadingSilenceSec,.002);assert.equal(result.trailingSilenceSec,0);
 assert.equal(result.activeStartSec,.002);assert.equal(result.activeEndSec,.002);assert.equal(result.trimmedDurationSec,0);
 assert.equal(result.dcOffset,0);assert.equal(result.clippedSamples,0);assert.equal(result.loopSeamDelta,0);assert.equal(result.loopSeamClick,false);
});

test('silence trimming locates the active interval and preserves trailing silence duration',()=>{
 const result=analyzeWav(makeWav([0,0,64,0,0,0]));
 assert.equal(result.silenceThresholdDbfs,-60);
 assert.equal(result.leadingSilenceSec,.00025);assert.equal(result.trailingSilenceSec,.000375);
 assert.equal(result.activeStartSec,.00025);assert.equal(result.activeEndSec,.000375);assert.equal(result.trimmedDurationSec,.000125);
});

test('unsigned 8-bit PCM measures full-scale endpoints and clipping',()=>{
 const result=analyzeWav(makeWav([128,255,0,128],{bitsPerSample:8}));
 assert.equal(result.bitsPerSample,8);assert.equal(result.peakDbfs,0);assert.equal(result.rmsDbfs,-3.044229);
 assert.equal(result.dcOffset,-.001953);assert.equal(result.clippedSamples,2);assert.equal(result.clipping,true);
});

test('16-bit clipping counts each full-scale sample, including asymmetric positive full scale',()=>{
 const result=analyzeWav(makeWav([32767,-32768,100,32767]));
 assert.equal(result.peakDbfs,0);assert.equal(result.clippedSamples,3);assert.equal(result.clipping,true);
});

test('DC offset is measured in normalized full-scale units without creating a seam click',()=>{
 const result=analyzeWav(makeWav(new Array(32).fill(8192)));
 assert.equal(result.dcOffset,.25);assert.equal(result.peakDbfs,-12.0412);assert.equal(result.rmsDbfs,-12.0412);
 assert.equal(result.loopSeamDelta,0);assert.equal(result.loopSeamClick,false);
});

test('stereo duration is frame-based and acoustic accumulation includes both channels',()=>{
 const result=analyzeWav(makeWav([16384,-16384,8192,-8192],{channels:2,sampleRate:16000}));
 assert.equal(result.channels,2);assert.equal(result.frameCount,2);assert.equal(result.durationSec,.000125);
 assert.equal(result.peakDbfs,-6.0206);assert.equal(result.rmsDbfs,-8.0618);assert.equal(result.dcOffset,0);
 const clipped=analyzeWav(makeWav([32767,-32768,0,0],{channels:2}));
 assert.equal(clipped.frameCount,2);assert.equal(clipped.clippedSamples,2);
});

test('loop-seam detection rejects a discontinuity but accepts a periodic waveform',()=>{
 const discontinuous=analyzeWav(makeWav([...new Array(64).fill(8192),...new Array(64).fill(-8192)]));
 assert.equal(discontinuous.loopSeamDelta,.5);assert.equal(discontinuous.loopSeamClick,true);
 const periodicSamples=Array.from({length:256},(_,index)=>Math.round(Math.sin(index/64*Math.PI*2)*12000));
 const periodic=analyzeWav(makeWav(periodicSamples));
 assert.equal(periodic.loopSeamClick,false);assert.ok(periodic.loopSeamDelta<.1);
});

test('PCM boundary rates, stereo 8-bit and padded ancillary chunks are supported',()=>{
 for(const sampleRate of [8000,48000]){
  const result=analyzeWav(makeWav([128,128,160,160],{channels:2,sampleRate,bitsPerSample:8,extraChunks:[{type:'LIST',data:Buffer.from([1,2,3])}]}));
  assert.equal(result.sampleRate,sampleRate);assert.equal(result.channels,2);assert.equal(result.bitsPerSample,8);assert.equal(result.frameCount,2);
 }
});

test('malformed RIFF, chunk, format and sample-data layouts have stable error codes',()=>{
 const valid=makeWav([1,2,3,4]);
 errorCode('E_AUDIO_WAV_INPUT',[]);errorCode('E_AUDIO_WAV_INPUT',null);
 errorCode('E_AUDIO_WAV_MALFORMED',new Uint8Array());errorCode('E_AUDIO_WAV_MALFORMED',Buffer.alloc(44));
 const cases=[];
 let bytes=Buffer.from(valid);bytes.writeUInt32LE(bytes.length,4);cases.push(bytes);
 bytes=Buffer.from(valid);bytes.write('fmt ',12,'ascii');cases.push(Buffer.concat([bytes,Buffer.alloc(4)]));
 bytes=Buffer.from(valid);bytes.write('JUNK',12,'ascii');cases.push(bytes);
 bytes=Buffer.from(valid);bytes.write('JUNK',36,'ascii');cases.push(bytes);
 bytes=Buffer.from(valid);bytes.writeUInt32LE(8,16);cases.push(bytes);
 bytes=Buffer.from(valid);bytes.writeUInt32LE(6,28);cases.push(bytes);
 bytes=Buffer.from(valid);bytes.writeUInt16LE(1,32);cases.push(bytes);
 bytes=Buffer.from(valid);bytes.writeUInt32LE(3,40);cases.push(bytes);
 bytes=Buffer.from(valid);bytes.writeUInt32LE(10,40);cases.push(bytes);
 cases.push(makeWav([]));
 bytes=Buffer.concat([valid,chunk('data',Buffer.from([0,0]))]);bytes.writeUInt32LE(bytes.length-8,4);cases.push(bytes);
 bytes=Buffer.concat([valid,Buffer.alloc(4)]);bytes.writeUInt32LE(bytes.length-8,4);cases.push(bytes);
 for(const input of cases)errorCode('E_AUDIO_WAV_MALFORMED',input);
 errorCode('E_AUDIO_WAV_LIMIT',Buffer.alloc(WAV_ANALYSIS_LIMITS.maxBytes+1));
});

test('unsupported PCM encodings, channel counts and rates have distinct stable errors',()=>{
 const valid=makeWav([1,2,3,4]);
 for(const [offset,value] of [[20,3],[20,0xfffe],[22,0],[22,3],[34,24],[34,32]]){
  const bytes=Buffer.from(valid);bytes.writeUInt16LE(value,offset);errorCode('E_AUDIO_WAV_UNSUPPORTED',bytes);
 }
 for(const sampleRate of [0,7999,48001,96000]){
  const bytes=Buffer.from(valid);bytes.writeUInt32LE(sampleRate,24);errorCode('E_AUDIO_WAV_UNSUPPORTED',bytes);
 }
});

test('all 20 catalog WAV entries exactly match fresh acoustic analysis',()=>{
 assert.equal(audioFiles.length,20);
 for(const {file} of audioFiles){
  const actual=analyzeWav(readFileSync(file.file));
  for(const field of acousticFields){
   if(typeof actual[field]==='number')close(file.audioMeta[field],actual[field]);
   else assert.equal(file.audioMeta[field],actual[field],`${file.path} ${field}`);
  }
  assert.equal(file.audioMeta.auditionStatus,'analyzed');
  assert.doesNotThrow(()=>validateAudioMetadata(file.audioMeta,readFileSync(file.file)));
 }
});

test('catalog semantics distinguish matching, rejection, repair, loss, victory and ambience',()=>{
 const byPath=Object.fromEntries(audioFiles.map(({file})=>[file.path,file.audioMeta]));
 assert.deepEqual(Object.keys(byPath).sort(),[
  ...['ambient','loss','match','reject','reward','tap','win'].map(role=>`arcade-pop/${role}.wav`),
  'audio/ambient.wav','audio/complete.wav','audio/match.wav','audio/reject.wav','audio/repair.wav','audio/victory.wav',
  ...['ambient','loss','match','reject','reward','tap','win'].map(role=>`casual-warm/${role}.wav`),
 ]);
 assert.equal(byPath['audio/match.wav'].role,'match');assert.equal(byPath['audio/match.wav'].valence,'positive');
 assert.equal(byPath['audio/reject.wav'].role,'reject');assert.equal(byPath['audio/reject.wav'].valence,'negative');
 assert.equal(byPath['audio/repair.wav'].role,'repair');assert.equal(byPath['audio/repair.wav'].valence,'positive');
 assert.equal(byPath['audio/complete.wav'].role,'loss');assert.equal(byPath['audio/complete.wav'].valence,'negative');
 assert.ok(byPath['audio/complete.wav'].styleTags.includes('timeout'));assert.ok(byPath['audio/complete.wav'].styleTags.includes('failure'));
 assert.ok(!byPath['audio/complete.wav'].styleTags.includes('win'));
 assert.equal(byPath['audio/victory.wav'].role,'victory');assert.equal(byPath['audio/victory.wav'].valence,'positive');
 assert.equal(byPath['audio/ambient.wav'].role,'ambient');assert.equal(byPath['audio/ambient.wav'].valence,'neutral');assert.equal(byPath['audio/ambient.wav'].loopable,true);
 for(const family of ['arcade-pop','casual-warm']){
  for(const role of ['ambient','loss','match','reject','reward','tap','win'])assert.equal(byPath[`${family}/${role}.wav`].role,role);
  assert.equal(byPath[`${family}/win.wav`].valence,'positive');assert.equal(byPath[`${family}/loss.wav`].valence,'negative');
 }
 for(const [path,metadata] of Object.entries(byPath))if(!/(^|\/)ambient\.wav$/.test(path))assert.equal(metadata.loopable,false);
});

test('asset policy integration validates audio metadata for every catalog source',()=>{
 for(const {source,file} of audioFiles){
  const asset={
   id:'catalog-audio',mime:file.mime,data:readFileSync(file.file).toString('base64'),rights:source.license,
   provenance:{origin:'third-party-free',sourceId:source.id,sourceFile:file.path,sourceHash:file.sha256,author:source.author,license:source.license,sourceUrl:source.sourceUrl,styleFamily:source.styleFamily},
  };
  assert.equal(validateAssetPolicy(asset,{role:'audio'}).sourceHash,file.sha256);
 }
});

test('audio policy rejects stale acoustic values and invalid or unverified semantics',()=>{
 const {file}=audioFiles[0],bytes=readFileSync(file.file),original=file.audioMeta;
 const changes=[
  meta=>{meta.durationSec+=.001;},meta=>{meta.peakDbfs+=.1;},meta=>{meta.rmsDbfs+=.1;},
  meta=>{meta.leadingSilenceSec+=.001;},meta=>{meta.trailingSilenceSec+=.001;},meta=>{meta.trimmedDurationSec+=.001;},
  meta=>{meta.dcOffset+=.001;},meta=>{meta.clippedSamples=1;},meta=>{meta.clipping=true;},
  meta=>{meta.loopSeamDelta=.5;},meta=>{meta.loopSeamClick=true;},meta=>{meta.frameCount++;},meta=>{meta.channels=2;},
  meta=>{meta.role='';},meta=>{meta.valence='excited';},meta=>{meta.energy='loud';},meta=>{meta.styleTags=[];},
  meta=>{meta.styleTags=['loop','loop'];},meta=>{meta.loopable='yes';},meta=>{meta.auditionStatus='human-auditioned';},
  meta=>{delete meta.rmsDbfs;},meta=>{meta.unverified=true;},
 ];
 for(const change of changes){
  const metadata=globalThis.structuredClone(original);change(metadata);
  assert.throws(()=>validateAudioMetadata(metadata,bytes),/E_ASSET_POLICY_AUDIO_META/);
 }
 assert.throws(()=>validateAudioMetadata(original,readFileSync(audioFiles[1].file.file)),/E_ASSET_POLICY_AUDIO_META/);
});

test('audio policy accepts values at the analyzer rounding precision and handles silent dBFS',()=>{
 const bytes=makeWav(new Array(16).fill(0)),actual=analyzeWav(bytes);
 const metadata={
  role:'ambient',valence:'neutral',energy:'low',styleTags:['test-tone'],loopable:false,auditionStatus:'analyzed',
  ...Object.fromEntries(acousticFields.map(field=>[field,actual[field]])),
 };
 assert.doesNotThrow(()=>validateAudioMetadata(metadata,bytes));
 const unrounded=analyzeWav(makeWav([0,1000,2000,1000]));
 const roundedMetadata={...metadata,...Object.fromEntries(acousticFields.map(field=>[field,unrounded[field]])),durationSec:4/8000};
 assert.doesNotThrow(()=>validateAudioMetadata(roundedMetadata,makeWav([0,1000,2000,1000])));
});
