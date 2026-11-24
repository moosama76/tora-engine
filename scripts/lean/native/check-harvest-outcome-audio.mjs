import assert from 'node:assert/strict';
import {mkdir, mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL, URL} from 'node:url';
import {build} from 'esbuild';
import {chromium} from 'playwright';
import {hash} from './compiler.mjs';
export const HARVEST_OUTCOME_CHECKER_VERSION='tora-outcome-audio-1:'+hash(await readFile(new URL(import.meta.url))+await readFile(new URL('./audio-analysis.mjs',import.meta.url)));

const boardId = 'harvest.board';
const movesKey = 'harvest.moves';
const outcomeTimeoutMs = 30_000;

function tracePlayback() {
 const {AudioBufferSourceNode,BaseAudioContext,GainNode,btoa,document,performance} = globalThis;
 const audioAssets = new Map();
 const decoded = new WeakMap();
 const gains = new WeakMap();
 const started = [];
 globalThis.harvestAudioEvidence = started;

 const decode = BaseAudioContext.prototype.decodeAudioData;
 BaseAudioContext.prototype.decodeAudioData = function (input, success, failure) {
  if (!audioAssets.size) {
   const project = JSON.parse(document.getElementById('project').textContent);
   for (const asset of project.assets.filter(asset => asset.mime === 'audio/wav' || asset.mime === 'audio/mpeg')) {
    audioAssets.set(asset.data, {assetId:asset.id, assetHash:asset.hash});
   }
  }
  const bytes = new Uint8Array(input);
  let binary = '';
  for (let offset=0;offset<bytes.length;offset+=8192) {
   binary += String.fromCharCode(...bytes.subarray(offset,offset+8192));
  }
  const asset = audioAssets.get(btoa(binary));
  const tag = buffer => {
   if (asset) decoded.set(buffer,asset);
   return buffer;
  };
  const result = decode.call(this,input,success && (buffer => success(tag(buffer))),failure);
  return result?.then(tag);
 };

 const connect = AudioBufferSourceNode.prototype.connect;
 AudioBufferSourceNode.prototype.connect = function (destination,...options) {
  if (destination instanceof GainNode) gains.set(this,destination);
  return connect.call(this,destination,...options);
 };

 const start = AudioBufferSourceNode.prototype.start;
 AudioBufferSourceNode.prototype.start = function (...args) {
  const result = start.apply(this,args);
  const asset = decoded.get(this.buffer);
  if (!asset) throw Error('Could not identify the packaged audio buffer');
  const {variables} = globalThis.toraRuntime.state();
  const entry = {
   ...asset, loop:this.loop, level:gains.get(this)?.gain.value ?? 0,
   at:performance.now(), contextState:this.context.state,
   phase:variables['harvest.phase'],moves:variables['harvest.moves'],
  };
  started.push(entry);
  this.addEventListener('ended',() => {entry.endedAt = performance.now();},{once:true});
  return result;
 };
}

function installIdleClock() {
 const requestFrame = globalThis.requestAnimationFrame.bind(globalThis);
 let accelerate = false;
 let offset = 0;
 let lastTimestamp;
 globalThis.setHarvestIdleAcceleration = enabled => { accelerate = enabled; };
 globalThis.requestAnimationFrame = callback => requestFrame(timestamp => {
  // Nudge the clock only while waiting for the loss timer. The runtime still
  // executes every fixed step, subject to its own five-step catch-up bound.
  if (accelerate && timestamp !== lastTimestamp) offset += 65;
  lastTimestamp = timestamp;
  callback(timestamp+offset);
 });
}

const state = page => page.evaluate(() => globalThis.toraRuntime.state());

function stagePoint(page,x,y) {
 const {width,height} = page.viewportSize();
 const [stageWidth,stageHeight] = width > height ? [700,390] : [390,700];
 const scale = Math.min(width/stageWidth,height/stageHeight);
 return {x:(width-stageWidth*scale)/2+x*scale,y:(height-stageHeight*scale)/2+y*scale};
}

function tilePoint(page,id) {
 const [row,column] = id.split('.').slice(-2).map(Number);
 const x = 35+column*64+2+29;
 const y = 345+row*64+2+29;
 const {width,height} = page.viewportSize();
 return width > height ? stagePoint(page,341.25+x*.95,-270+y*.95) : stagePoint(page,x,y);
}

async function tap(page,{x,y}) {
 await page.touchscreen.tap(x,y);
}

/** Exercise the exact built HTML. Outcome and sound identity come from the running package. */
export async function exerciseHarvestOutcomeAudio(artifact,{
 outcomes=['win','loss'],evidenceDir,landscape=false,inspectOutcome,accelerateIdle=false,browser:sharedBrowser,
}={}) {
 assert.ok(artifact?.html && artifact.manifest?.artifactHash === hash(artifact.html));
 assert.ok(outcomes.length>0 && outcomes.every(outcome => ['win','loss'].includes(outcome)));
 const folder = await mkdtemp(join(tmpdir(),'tora-harvest-playback-'));
 const file = join(folder,'index.html');
 const evidence = {runs:[]};
 let browser,context;
 try {
  await writeFile(file,artifact.html);
  if (evidenceDir) await mkdir(evidenceDir,{recursive:true});
  browser = sharedBrowser ?? await chromium.launch();
  const viewport = landscape ? {width:844,height:390} : {width:390,height:700};
  context = await browser.newContext({
   viewport,isMobile:true,hasTouch:true,
   ...(evidenceDir ? {recordVideo:{dir:evidenceDir,size:viewport}} : {}),
  });
  await context.route(/^https?:/,route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror',error => errors.push(error.message));
  await page.addInitScript(tracePlayback);
  const useIdleClock = accelerateIdle && !evidenceDir && outcomes.includes('loss');
  if (useIdleClock) await page.addInitScript(installIdleClock);
  if (artifact.manifest.target === 'unity-ads-ua-playable') {
   const host = await build({
    entryPoints:[new URL('../../../packages/test-harness/src/mraid-host.ts',import.meta.url).pathname],
    bundle:true,format:'iife',globalName:'MraidHost',write:false,platform:'browser',
   });
   await page.addInitScript(host.outputFiles[0].text+';MraidHost.installMraidHost({version:"3.0",state:"default",visible:true});');
  }
  await page.goto(pathToFileURL(file).href);
  await page.waitForFunction(() => globalThis.toraRuntime?.state().network.ready);
  assert.ok((await state(page)).match.boards[boardId]);
  assert.deepEqual(await page.evaluate(() => globalThis.harvestAudioEvidence),[]);
  for (const [index,outcome] of outcomes.entries()) {
   if (index) {
    // Reset runtime state cleanly between outcome audio verification passes.
    await page.evaluate(() => globalThis.toraRuntime.restart());
    await page.waitForFunction(() => globalThis.toraRuntime.state().variables['harvest.moves']===0 &&
     globalThis.toraRuntime.state().variables['harvest.phase']==='first-seconds');
    await page.evaluate(() => {globalThis.harvestAudioEvidence.length=0;});
   }
   if (outcome === 'win') {
    for (let moves=1;moves<=3;moves++) {
     const {from,to} = (await state(page)).match.boards[boardId].legalMoves[0];
     await tap(page,tilePoint(page,from));
     await tap(page,tilePoint(page,to));
     await page.waitForFunction(count => globalThis.toraRuntime.state().variables['harvest.moves']===count,moves);
    }
   } else {
    // Unlock audio with a real press while leaving the board unsolved.
    await tap(page,tilePoint(page,'harvest.tile.0.0'));
    if (useIdleClock) {
     await page.waitForFunction(() => globalThis.toraRuntime.state().audio.state==='running');
     await page.evaluate(() => globalThis.setHarvestIdleAcceleration(true));
    }
   }
   await page.waitForFunction(
    () => globalThis.toraRuntime.state().variables['harvest.phase']==='cta',
    undefined,{timeout:outcomeTimeoutMs},
   );
   if (useIdleClock && outcome==='loss') await page.evaluate(() => globalThis.setHarvestIdleAcceleration(false));
   await page.waitForTimeout(400);
   const finished = await state(page);
   assert.equal(finished.variables[movesKey],outcome==='win' ? 3 : 0);
   assert.equal(finished.audio.state,'running');
   assert.deepEqual(finished.diagnostics,[]);
   const {started,now} = await page.evaluate(() => ({started:globalThis.harvestAudioEvidence,now:globalThis.performance.now()}));
   const outcomeCue = started.find(cue => outcome==='win' ? cue.moves===3 : cue.phase==='cta');
   evidence[outcome] = {moves:finished.variables[movesKey],started,outcomeAt:outcomeCue?.at??now};
   if (inspectOutcome) evidence[outcome].layout = await inspectOutcome(page,outcome);
   evidence.runs.push({outcome,...evidence[outcome]});
   if (evidenceDir) {
    const replay = outcomes.slice(0,index).includes(outcome);
    await page.screenshot({path:join(evidenceDir,outcome+(replay?'-replay-'+index:'')+'.png')});
   }
  }
  assert.deepEqual(errors,[]);
  return evidence;
 } finally {
  await context?.close();
  if(!sharedBrowser)await browser?.close();
  await rm(folder,{recursive:true,force:true});
 }
}
