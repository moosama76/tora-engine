import {createHash} from 'node:crypto';
import {readFile,mkdir,writeFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL,URL} from 'node:url';
import {Buffer} from 'node:buffer';
import {setTimeout} from 'node:timers';
import process from 'node:process';
import {loadCatalog} from './catalog-cache.mjs';
import {moduleForProject} from './modules/index.mjs';
import {isAudioMime} from './media-validate.mjs';
import {getNetworkTarget} from './network-targets.mjs';

export const CREATIVE_QA_FORMAT='tora-creative-qa-1';
export const INTERACTION_LIMIT_MS=150;
export const MIN_TOUCH_PX=44;
export const DEFAULT_VIEWPORTS=Object.freeze([
 Object.freeze({width:320,height:568}),
 Object.freeze({width:390,height:844}),
 Object.freeze({width:768,height:1024}),
 Object.freeze({width:844,height:390}),
]);

const stateOrder=['opening','after-first-input','end-card','timeout'];
const pixelGlyphs=new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?.:,+-/\' ']);
const layoutBlockers=new Set(['stage-overflow','parent-clip-crop','text-overflow','text-illegible','touch-target-small','interactive-overlap','sdk-safe-area-collision','panel-off-center','panel-edge-cramped','backdrop-incomplete','panel-content-overlap','duplicate-visible-copy','header-off-center']);
const roleWords={
 win:['win','won','winner','success','successful','victory','victorious','complete','completed','completion','goal','payoff'],
 loss:['loss','lose','lost','failure','failed','fail','gameover','timeout','deadline'],
 reward:['reward','award','prize'],
 reject:['reject','rejected','invalid','mistake','error','wrong'],
 match:['match','matched','clear','cleared'],
 tap:['tap','click','press','select'],
 ambient:['ambient','ambience','background'],
};
const valences={
 win:new Set(['celebratory','positive']),reward:new Set(['celebratory','positive']),
 loss:new Set(['negative']),reject:new Set(['negative']),
 match:new Set(['positive','neutral']),tap:new Set(['positive','neutral']),
};
const canonical=value=>{
 if(typeof value==='number'&&!Number.isFinite(value))return null;
 if(Array.isArray(value))return value.map(canonical);
 if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).filter(key=>value[key]!==undefined).sort().map(key=>[key,canonical(value[key])]));
 return value;
};
const hash=value=>'sha256:'+createHash('sha256').update(value).digest('hex');
export const CREATIVE_QA_CHECKER_VERSION='tora-creative-qa-1:'+hash(await readFile(new URL(import.meta.url)));
const delay=ms=>new Promise(resolveDelay=>setTimeout(resolveDelay,ms));
const sortedViewport=(a,b)=>a.width-b.width||a.height-b.height;
const viewportKey=viewport=>viewport?`${viewport.width}x${viewport.height}`:'';
const issueSort=(a,b)=>a.defectKind.localeCompare(b.defectKind)||(a.componentId??'').localeCompare(b.componentId??'')||viewportKey(a.viewport).localeCompare(viewportKey(b.viewport))||(a.detail??'').localeCompare(b.detail??'');
const artifactSort=(a,b)=>a.state.localeCompare(b.state)||viewportKey(a.viewport).localeCompare(viewportKey(b.viewport));

function normalizeViewport(viewport){
 if(!viewport)return null;
 return {width:viewport.width,height:viewport.height};
}
function issue(severity,defectKind,componentId,remediation,{viewport=null,detail,metrics,relatedComponentIds}={}){
 return {
  severity,defectKind,componentId:componentId??null,viewport:normalizeViewport(viewport),remediation,
  ...(detail?{detail}:{}),...(metrics?{metrics}:{}),...(relatedComponentIds?.length?{relatedComponentIds:[...relatedComponentIds].sort()}:{}),
 };
}
function summarize(states,screenshots,blockers,warnings){
 const viewports=[...new Map([...states,...screenshots].map(row=>[viewportKey(row.viewport),row.viewport]).filter(([,viewport])=>viewport)).values()].sort(sortedViewport);
 const checkedStates=[...new Set(states.filter(row=>row.status==='checked').map(row=>row.state))].sort((a,b)=>stateOrder.indexOf(a)-stateOrder.indexOf(b));
 const skippedStates=[...new Set(states.filter(row=>row.status!=='checked').map(row=>row.state))].sort((a,b)=>stateOrder.indexOf(a)-stateOrder.indexOf(b));
 return {blockers:blockers.length,warnings:warnings.length,viewports,checkedStates,skippedStates};
}
export function formatCreativeQaReport({scope='static',blockers=[],warnings=[],checks={},interactions=[],states=[],screenshots=[]}={}){
 const normalizedBlockers=blockers.map(row=>({...row,componentId:row.componentId??null,viewport:normalizeViewport(row.viewport)})).sort(issueSort);
 const normalizedWarnings=warnings.map(row=>({...row,componentId:row.componentId??null,viewport:normalizeViewport(row.viewport)})).sort(issueSort);
 const normalizedStates=states.map(row=>({...row,viewport:normalizeViewport(row.viewport)})).sort((a,b)=>viewportKey(a.viewport).localeCompare(viewportKey(b.viewport))||stateOrder.indexOf(a.state)-stateOrder.indexOf(b.state));
 const normalizedScreenshots=screenshots.map(row=>({...row,viewport:normalizeViewport(row.viewport)})).sort(artifactSort);
 return canonical({
  format:CREATIVE_QA_FORMAT,ok:normalizedBlockers.length===0,scope,
  summary:summarize(normalizedStates,normalizedScreenshots,normalizedBlockers,normalizedWarnings),
  blockers:normalizedBlockers,warnings:normalizedWarnings,checks,
  interactions:[...interactions].sort((a,b)=>viewportKey(a.viewport).localeCompare(viewportKey(b.viewport))),
  states:normalizedStates,screenshots:normalizedScreenshots,
 });
}
export const formatQaReport=formatCreativeQaReport;
export function formatCreativeQaReportJson(report){return JSON.stringify(canonical(report),null,2)+'\n';}
export async function writeCreativeQaReport(report,outputDir){
 if(!outputDir)throw Error('A deterministic output directory is required');
 await mkdir(outputDir,{recursive:true});
 const path=resolve(outputDir,'report.json');
 await writeFile(path,formatCreativeQaReportJson(report));
 return path;
}

function semanticText(value){
 return String(value??'').replace(/([a-z])([A-Z])/g,'$1 $2').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
function normalizeRole(value){
 const text=semanticText(value);
 if(!text)return undefined;
 for(const [role,words]of Object.entries(roleWords))if(words.some(word=>new RegExp(`\\b${word}\\b`).test(text)))return role;
 return undefined;
}
function audioContext(project,behavior){
 const bindings=(project.eventBindings??[]).filter(binding=>binding.actions?.some(action=>action.kind==='playAudio'&&action.behaviorId===behavior.id));
 const events=new Map((project.events??[]).map(event=>[event.id,event]));
 const scenes=new Map((project.scenes??[]).map(scene=>[scene.id,scene]));
 const explicitRole=normalizeRole([behavior.parameters?.role,behavior.parameters?.semanticRole,behavior.parameters?.cue].filter(Boolean).join(' '));
 const ownRole=normalizeRole([behavior.id,behavior.label,behavior.componentId].filter(Boolean).join(' '));
 const bindingParts=[];
 for(const binding of bindings){
  const event=events.get(binding.eventId);
  bindingParts.push(binding.id,event?.id,event?.kind,event?.sceneId,event?.componentId,event?.variableId);
  const scene=scenes.get(event?.sceneId);bindingParts.push(scene?.label,scene?.role);
  for(const action of binding.actions??[]){
   if(action.kind==='changeScene'){
    bindingParts.push(action.sceneId);const target=scenes.get(action.sceneId);bindingParts.push(target?.label,target?.role);
   }
   if(['set','add'].includes(action.kind))bindingParts.push(action.variableId);
  }
 }
 const bindingRole=normalizeRole(bindingParts.filter(Boolean).join(' '));
 return {bindings,role:explicitRole??(ownRole==='ambient'?ownRole:bindingRole??ownRole),text:[...bindingParts].filter(Boolean).join(' ')};
}
function catalogIndex(catalog){
 const bySource=new Map(),byHash=new Map();
 if(!catalog)return {bySource,byHash};
 const add=(file,source)=>{
  const metadata=file?.audioMeta??file?.metadata?.audio;
  if(!metadata)return;
  if(source?.id&&file.path)bySource.set(`${source.id}:${file.path}`,metadata);
  if(file.sha256)byHash.set(file.sha256,metadata);
  if(file.hash)byHash.set(file.hash,metadata);
 };
 for(const source of catalog.sources??[])for(const file of source.files??[])add(file,source);
 for(const file of Array.isArray(catalog)?catalog:[])add(file,file);
 return {bySource,byHash};
}
function audioAsset(project,behavior){
 const component=(project.components??[]).find(row=>row.id===behavior.componentId);
 const assetId=component?.assetSlots?.[0]?.assetId;
 const asset=(project.assets??[]).find(row=>row.id===assetId);
 return {component,asset,valid:isAudioMime(asset?.mime)};
}
async function defaultBytes(asset){return asset?.data?Buffer.from(asset.data,'base64'):undefined;}
async function loadAnalyzer(){
 const module=await import('./audio-analysis.mjs');
 if(typeof module.analyzeAudio==='function')return module.analyzeAudio;
 if(typeof module.analyzeWav!=='function')throw Error('audio-analysis.mjs does not export analyzeWav(bytes)');
 return module.analyzeWav;
}
function missingModule(error){
 return error?.code==='ERR_MODULE_NOT_FOUND'&&String(error.message).includes('audio-analysis.mjs');
}
function unsupportedPixelCharacters(text){
 const staticText=String(text??'').replace(/\{\{[a-z0-9_.-]+\}\}/gi,'');
 return [...new Set([...staticText].filter(character=>character!=='\n'&&character!=='\r'&&!pixelGlyphs.has(character.toUpperCase())))].sort();
}
function addTextDefects(blockers,component,text){
 const unsupported=unsupportedPixelCharacters(text);
 if(!unsupported.length)return;
 blockers.push(issue('blocker','pixel-text-unsupported-character',component.id,'Use supported pixel glyphs or select a standard font with the required character coverage.',{
  detail:`Unsupported pixel text: ${unsupported.map(character=>JSON.stringify(character)).join(', ')}`,metrics:{unsupported},
 }));
}
function acousticDefects(asset,analysis,behaviorIds,roles=[]){
 const blockers=[],warnings=[],componentId=behaviorIds[0]?.componentId??null;
 if(analysis.clipping===true||analysis.clipped===true||analysis.clippedSamples>0||(analysis.clipping===undefined&&analysis.clipped===undefined&&analysis.clippedSamples===undefined&&Number.isFinite(analysis.peakDbfs)&&analysis.peakDbfs>=0)){
  blockers.push(issue('blocker','audio-clipping',componentId,'Reduce source gain and replace the WAV with a non-clipping master.',{detail:`${asset.id} contains clipped or full-scale samples.`,metrics:{assetId:asset.id,peakDbfs:analysis.peakDbfs,clippedSamples:analysis.clippedSamples}}));
 }
 const silenceThreshold=Number.isFinite(analysis.silenceThresholdDbfs)?analysis.silenceThresholdDbfs:-60;
 if(analysis.silent===true||analysis.isSilent===true||analysis.rmsDbfs===-Infinity||analysis.peakDbfs===-Infinity||analysis.trimmedDurationSec===0||(Number.isFinite(analysis.rmsDbfs)&&analysis.rmsDbfs<=silenceThreshold)){
  blockers.push(issue('blocker','audio-silence',componentId,'Replace the silent WAV with an audible, semantically appropriate cue.',{detail:`${asset.id} is silent at the analysis threshold.`,metrics:{assetId:asset.id,rmsDbfs:analysis.rmsDbfs,silenceThresholdDbfs:silenceThreshold}}));
 }
 if(roles.includes('win')&&analysis.pitchContour==='falling'){
  blockers.push(issue('blocker','audio-contour-mismatch',componentId,'Replace the descending-pitch cue on the win event with a rising celebratory fanfare.',{detail:`${asset.id} has a falling pitch contour (${analysis.startHz} Hz -> ${analysis.endHz} Hz) on a win event.`,metrics:{assetId:asset.id,pitchContour:analysis.pitchContour,startHz:analysis.startHz,endHz:analysis.endHz}}));
 }
 if(roles.includes('loss')&&analysis.pitchContour==='rising'){
  warnings.push(issue('warning','audio-contour-mismatch',componentId,'Verify whether this rising-pitch cue fits a loss or timeout outcome.',{detail:`${asset.id} has a rising pitch contour (${analysis.startHz} Hz -> ${analysis.endHz} Hz) on a loss event.`,metrics:{assetId:asset.id,pitchContour:analysis.pitchContour,startHz:analysis.startHz,endHz:analysis.endHz}}));
 }
 for(const [field,kind]of [['leadingSilenceSec','audio-leading-silence'],['trailingSilenceSec','audio-trailing-silence']])if(Number.isFinite(analysis[field])&&analysis[field]>.25){
  warnings.push(issue('warning',kind,componentId,'Trim excessive silence while preserving the intended attack and release.',{detail:`${asset.id} has ${analysis[field]} seconds of ${field==='leadingSilenceSec'?'leading':'trailing'} silence.`,metrics:{assetId:asset.id,seconds:analysis[field]}}));
 }
 return {blockers,warnings};
}

export async function runStaticPreflight(projectOrOptions,suppliedOptions={}){
 const wrapped=projectOrOptions&&typeof projectOrOptions==='object'&&Object.hasOwn(projectOrOptions,'project');
 const project=wrapped?projectOrOptions.project:projectOrOptions;
 const options=wrapped?projectOrOptions:suppliedOptions;
 if(!project||typeof project!=='object')throw Error('A native creative project is required');
 const blockers=[],warnings=[],components=project.components??[],assets=project.assets??[],audio=(project.gameplay??[]).filter(behavior=>behavior.kind==='audio');
 const catalog=options.catalog===undefined?await loadCatalog():options.catalog;
 const catalogLookup=catalogIndex(catalog),bytesFor=options.assetBytes??defaultBytes;
 const routes=audio.map(behavior=>({behavior,...audioAsset(project,behavior),...audioContext(project,behavior)}));
 for(const route of routes){
  const {behavior,asset,valid,role}=route;
  if(!valid){
   blockers.push(issue('blocker','audio-asset-missing',behavior.componentId,'Bind the audio behavior to an existing audio/wav or audio/mpeg project asset.',{detail:`${behavior.id} has no usable audio asset; the runtime cannot play the intended cue.`,metrics:{behaviorId:behavior.id}}));
   if(behavior.parameters?.allowSynthFallback!==true){
    blockers.push(issue('blocker','audio-synth-fallback-disallowed',behavior.componentId,'Provide the missing audio asset; do not ship the raw oscillator fallback.',{detail:`${behavior.id} would use synthesis and allowSynthFallback is not enabled.`,metrics:{behaviorId:behavior.id}}));
   }
   continue;
  }
  const provenance=typeof asset.provenance==='object'?asset.provenance:undefined;
  const metadata=(provenance?.sourceId&&provenance.sourceFile?catalogLookup.bySource.get(`${provenance.sourceId}:${provenance.sourceFile}`):undefined)??catalogLookup.byHash.get(asset.hash);
  if(metadata&&role){
   const roles=(metadata.roles??(metadata.role?[metadata.role]:[])).map(normalizeRole).filter(Boolean);
   if(roles.length&&!roles.includes(role)){
    blockers.push(issue('blocker','audio-role-mismatch',behavior.componentId,'Choose a catalog cue whose verified semantic role matches the triggering event.',{detail:`${behavior.id} is triggered as ${role}, but ${asset.id} is cataloged as ${roles.join(', ')}.`,metrics:{behaviorId:behavior.id,assetId:asset.id,expectedRole:role,catalogRoles:roles}}));
   }
   const expectedValences=valences[role];
   if(expectedValences&&metadata.valence&&!expectedValences.has(semanticText(metadata.valence))){
    blockers.push(issue('blocker','audio-valence-mismatch',behavior.componentId,'Choose a cue with valence appropriate to the gameplay outcome.',{detail:`${behavior.id} expects ${[...expectedValences].join(' or ')} valence, not ${metadata.valence}.`,metrics:{behaviorId:behavior.id,assetId:asset.id,expectedValence:[...expectedValences],catalogValence:metadata.valence}}));
   }
  }
 }
 const wins=routes.filter(route=>route.role==='win'&&route.valid),losses=routes.filter(route=>route.role==='loss'&&route.valid);
 const duplicateKeys=new Set();
 for(const win of wins)for(const loss of losses){
  const winHash=win.asset.data?hash(Buffer.from(win.asset.data,'base64')):win.asset.hash,lossHash=loss.asset.data?hash(Buffer.from(loss.asset.data,'base64')):loss.asset.hash;
  if(!winHash||winHash!==lossHash)continue;
  const key=`${win.behavior.id}:${loss.behavior.id}`;
  if(duplicateKeys.has(key))continue;
  duplicateKeys.add(key);
  blockers.push(issue('blocker','audio-win-loss-duplicate',win.behavior.componentId,'Assign distinct, outcome-appropriate assets to win and loss events.',{detail:`${win.behavior.id} and ${loss.behavior.id} use the same audio hash.`,relatedComponentIds:[win.behavior.componentId,loss.behavior.componentId],metrics:{assetHash:winHash,winBehaviorId:win.behavior.id,lossBehaviorId:loss.behavior.id}}));
 }
 const busRank={music:0,sfx:1,stinger:2};
 const mixes=routes.filter(route=>Object.hasOwn(busRank,route.behavior.parameters?.bus??'sfx')).map(route=>({...route,bus:route.behavior.parameters?.bus??'sfx',volume:route.behavior.parameters?.volume??.09}));
 for(const lower of mixes)for(const higher of mixes){
  if(busRank[lower.bus]>=busRank[higher.bus]||!(lower.volume>higher.volume))continue;
  blockers.push(issue('blocker','audio-mix-hierarchy',lower.behavior.componentId,'Adjust bus volumes so music <= sfx <= stinger at every simultaneous cue pairing.',{detail:`${lower.behavior.id} (${lower.bus}=${lower.volume}) is louder than ${higher.behavior.id} (${higher.bus}=${higher.volume}).`,relatedComponentIds:[lower.behavior.componentId,higher.behavior.componentId],metrics:{lowerBehaviorId:lower.behavior.id,higherBehaviorId:higher.behavior.id,lowerBus:lower.bus,higherBus:higher.bus,lowerVolume:lower.volume,higherVolume:higher.volume}}));
 }
 const pixelComponents=components.filter(component=>component.contract==='native.text.v1'&&component.parameters?.fontFamily==='pixel');
 for(const component of pixelComponents){
  addTextDefects(blockers,component,component.parameters?.text);
  for(const binding of project.eventBindings??[])for(const action of binding.actions??[])if(action.kind==='setComponent'&&action.componentId===component.id&&action.key==='text')addTextDefects(blockers,component,action.value);
 }
 const isPixelArt=pixelComponents.length>0||components.some(component=>component.contract==='native.image.v1'&&component.parameters?.smoothing===false);
 if(!isPixelArt){
  for(const behavior of (project.gameplay??[]).filter(item=>item.kind==='emitter'&&item.parameters?.shape==='pixel-confetti')){
   blockers.push(issue('blocker','particle-style-clash',behavior.componentId,'Use smooth vector particle shapes (circle or square) instead of pixel-confetti when the playable uses non-pixel art.',{detail:`${behavior.id} emits pixel-confetti in a non-pixel visual style.`,metrics:{behaviorId:behavior.id,shape:behavior.parameters.shape}}));
  }
 }
 const eventsById=new Map((project.events??[]).map(event=>[event.id,event]));
 const hasStoreAction=(project.eventBindings??[]).some(binding=>binding.actions?.some(action=>action.kind==='store'));
 const replayBlocked=new Set();
 for(const binding of project.eventBindings??[]){
  const event=eventsById.get(binding.eventId);
  if(event?.kind==='click'&&binding.actions?.some(action=>action.kind==='restart')){
   const cid=event.componentId??null;
   if(cid&&replayBlocked.has(cid))continue;
   if(cid)replayBlocked.add(cid);
   blockers.push(issue('blocker','end-card-replay-button',cid,'Remove Play Again / Replay buttons from playable ad end cards; lead players to the primary Store CTA instead. Keep runtime.restart() for host or review resets only.',{detail:`${binding.id} wires a player click on ${cid??'a component'} to restart.`,metrics:{bindingId:binding.id,componentId:cid}}));
  }
 }
 if(hasStoreAction){
  for(const component of components){
   if(component.contract!=='native.button.v1'||replayBlocked.has(component.id))continue;
   const label=components.find(item=>item.parentId===component.id&&item.contract==='native.text.v1')?.parameters?.text??'';
   if(/^\s*(?:play\s+again|try\s+again|replay|restart)\s*$/i.test(String(label))){
    replayBlocked.add(component.id);
    blockers.push(issue('blocker','end-card-replay-button',component.id,'Remove Play Again / Replay buttons from playable ad end cards; lead players to the primary Store CTA instead.',{detail:`Button ${component.id} uses replay copy "${label}" on a playable ad with a Store CTA.`,metrics:{componentId:component.id,label}}));
   }
  }
 }
 function imageDimensions(bytes,mime){
  if(!bytes||bytes.length<24)return null;
  if(mime==='image/png'&&bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47){
   const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
   return {width:view.getUint32(16,false),height:view.getUint32(20,false)};
  }
  if(mime==='image/jpeg'&&bytes[0]===0xff&&bytes[1]===0xd8){
   let i=2;
   while(i+9<bytes.length){
    if(bytes[i]!==0xff){i++;continue;}
    const marker=bytes[i+1];
    if(marker===0xc0||marker===0xc1||marker===0xc2){
     const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
     return {height:view.getUint16(i+5,false),width:view.getUint16(i+7,false)};
    }
    const len=(bytes[i+2]<<8)|bytes[i+3];
    if(len<2)break;
    i+=2+len;
   }
  }
  return null;
 }
 const scenesById=new Map((project.scenes??[]).map(scene=>[scene.id,scene]));
 const endCardSceneIds=new Set((project.scenes??[]).filter(scene=>scene.role==='end-card').map(scene=>scene.id));
 const winEndCardSceneIds=new Set((project.scenes??[]).filter(scene=>scene.role==='end-card'&&!/fail|loss|timeout/i.test(scene.id)).map(scene=>scene.id));
 const loopingAnimTargets=new Set((project.gameplay??[]).filter(b=>b.kind==='animation'&&b.parameters?.loop).map(b=>b.componentId));
 const componentsById=new Map(components.map(c=>[c.id,c]));
 const hasLoopingAnimation=comp=>{
  for(let cur=comp;cur;cur=cur.parentId?componentsById.get(cur.parentId):undefined)if(loopingAnimTargets.has(cur.id))return true;
  return false;
 };
 const ctaComponentIds=new Set();
 if(hasStoreAction){
  for(const binding of project.eventBindings??[]){
   if(!binding.actions?.some(action=>action.kind==='store'))continue;
   const event=eventsById.get(binding.eventId);
   const cta=event?.componentId?componentsById.get(event.componentId):undefined;
   if(!cta||cta.contract!=='native.button.v1')continue;
   ctaComponentIds.add(cta.id);
   for(let cur=cta.parentId?componentsById.get(cta.parentId):undefined;cur;cur=cur.parentId?componentsById.get(cur.parentId):undefined){
    if(cur.contract==='native.group.v1')ctaComponentIds.add(cur.id);
   }
   const presentation=cta.parameters?.presentation??'flat';
   const isShiny=presentation==='shiny-cta'||presentation==='pixel-cta';
   const isAnimated=hasLoopingAnimation(cta);
   if(!isShiny||!isAnimated){
    const missing=[];
    if(!isShiny)missing.push('shiny presentation ("shiny-cta" or "pixel-cta")');
    if(!isAnimated)missing.push('looping pulse/float animation');
    blockers.push(issue('blocker','end-card-cta-static',cta.id,'Make the primary Store CTA button both shiny and animated (presentation: "shiny-cta" or "pixel-cta", plus a looping pulse or float animation).',{detail:`Store CTA button ${cta.id} is missing ${missing.join(' and ')}.`,metrics:{componentId:cta.id,presentation,isShiny,isAnimated}}));
   }
  }
 }
 // Enforce full-screen celebratory particles AND entertaining visual richness on win end cards
 const emittersById=new Map((project.gameplay??[]).filter(b=>b.kind==='emitter').map(b=>[b.id,b]));
 const winSceneHasFullscreenConfetti=new Set();
 let hasPayoffTrigger=false,payoffHasFullscreenConfetti=false;
 for(const binding of project.eventBindings??[]){
  const event=eventsById.get(binding.eventId);
  const emitActions=(binding.actions??[]).filter(a=>a.kind==='emit'&&emittersById.has(a.behaviorId));
  const isWinSceneEnter=event?.kind==='sceneEnter'&&winEndCardSceneIds.has(event.sceneId);
  const isPayoffTrigger=(binding.actions??[]).some(a=>a.kind==='set'&&/phase$/.test(a.variableId)&&a.value==='payoff')||(event?.kind==='variableChange'&&/phase$/.test(event.variableId)&&binding.condition?.op==='eq'&&binding.condition?.value==='payoff');
  if(!isWinSceneEnter&&!isPayoffTrigger)continue;
  if(isPayoffTrigger)hasPayoffTrigger=true;
  const hasFullscreen=emitActions.some(a=>{
   const p=emittersById.get(a.behaviorId)?.parameters;
   return p?.coverage==='screen'&&(p.shape==='confetti'||p.shape==='pixel-confetti');
  });
  if(isWinSceneEnter&&hasFullscreen)winSceneHasFullscreenConfetti.add(event.sceneId);
  if(isPayoffTrigger&&hasFullscreen)payoffHasFullscreenConfetti=true;
  if(emitActions.length&&!hasFullscreen){
   const firstEmitter=emittersById.get(emitActions[0].behaviorId);
   blockers.push(issue('blocker','end-card-particles-not-fullscreen',firstEmitter?.componentId??null,'Use full-screen celebratory confetti (coverage: "screen", shape: "confetti" or "pixel-confetti") so win particles cover the entire screen.',{detail:`Win celebration binding ${binding.id} emits localized particles without full-screen coverage.`,metrics:{bindingId:binding.id,emitterId:firstEmitter?.id??null}}));
  }
 }
 if(hasStoreAction){
  const alreadyBlockedEmitter=blockers.some(b=>b.defectKind==='end-card-particles-not-fullscreen');
  if(hasPayoffTrigger&&!payoffHasFullscreenConfetti&&!alreadyBlockedEmitter){
   blockers.push(issue('blocker','end-card-particles-not-fullscreen',null,'Add a full-screen celebratory confetti emitter (coverage: "screen", shape: "confetti" or "pixel-confetti") to the win payoff.',{detail:'Win payoff has no full-screen celebratory confetti emitter.'}));
  }
  const showcaseContracts=new Set(['native.image.v1','native.sprite.v1','native.walk-sprite.v1','native.path.v1','native.ellipse.v1','native.stage3d.v1']);
  for(const sceneId of winEndCardSceneIds){
   if(!winSceneHasFullscreenConfetti.has(sceneId)&&!alreadyBlockedEmitter){
    blockers.push(issue('blocker','end-card-particles-not-fullscreen',null,'Add a full-screen celebratory confetti emitter (coverage: "screen", shape: "confetti" or "pixel-confetti") triggered on win end-card sceneEnter.',{detail:`Win end-card scene ${sceneId} has no full-screen celebratory confetti emitter.`,metrics:{sceneId}}));
   }
   const sceneComps=components.filter(c=>c.sceneId===sceneId&&!c.prototype&&c.parameters?.visible!==false);
   const sceneCompIds=new Set(sceneComps.map(c=>c.id));
   const hasVisualShowcase=sceneComps.some(c=>showcaseContracts.has(c.contract));
   const hasSceneMotion=sceneComps.some(c=>c.contract==='native.stage3d.v1')||(project.gameplay??[]).some(b=>{
    if(!sceneCompIds.has(b.componentId))return false;
    if(b.kind==='path-agent')return true;
    return b.kind==='animation'&&!ctaComponentIds.has(b.componentId);
   });
   if(!hasVisualShowcase||!hasSceneMotion){
    const missing=[];
    if(!hasVisualShowcase)missing.push('hero artwork, emblem/stars, or live diorama');
    if(!hasSceneMotion)missing.push('celebratory animation or live motion beyond the CTA');
    blockers.push(issue('blocker','end-card-too-basic',null,'Upgrade the win end card with game-specific hero artwork or live diorama plus celebratory animations (stars, sunburst, hero bob, or live world motion) so it feels entertaining rather than a plain text box.',{detail:`Win end-card scene ${sceneId} is too basic (missing ${missing.join(' and ')}).`,metrics:{sceneId,hasVisualShowcase,hasSceneMotion}}));
   }
  }
 }
 // Enforce crisp end-card hero imagery (reject >2.0x upscaled low-resolution images on non-pixel end cards)
 const assetsById=new Map(assets.map(a=>[a.id,a]));
 for(const component of components){
  if(component.contract!=='native.image.v1'||component.parameters?.smoothing===false)continue;
  const onEndCard=endCardSceneIds.has(component.sceneId)||scenesById.get(component.sceneId)?.role==='end-card';
  if(!onEndCard)continue;
  const assetId=component.assetSlots?.[0]?.assetId;
  const asset=assetId?assetsById.get(assetId):undefined;
  if(!asset||!asset.mime?.startsWith('image/'))continue;
  const rawBytes=await bytesFor(asset,project);
  const dims=imageDimensions(rawBytes,asset.mime);
  if(!dims||dims.width<=0||dims.height<=0)continue;
  const renderW=Number(component.parameters?.width??0),renderH=Number(component.parameters?.height??0);
  const scaleX=renderW/dims.width,scaleY=renderH/dims.height;
  if(scaleX>2.0||scaleY>2.0){
   blockers.push(issue('blocker','end-card-hero-low-res',component.id,'Replace the upscaled low-resolution end-card image with crisp high-resolution artwork (>= 50% of rendered size).',{detail:`End-card image ${component.id} upscales ${dims.width}x${dims.height}px artwork to ${renderW}x${renderH}px (${Math.max(scaleX,scaleY).toFixed(1)}x).`,metrics:{componentId:component.id,assetId,intrinsicWidth:dims.width,intrinsicHeight:dims.height,renderWidth:renderW,renderHeight:renderH}}));
  }
 }
 const wavAssets=assets.filter(asset=>isAudioMime(asset.mime)),assetRoutes=new Map();
 for(const route of routes)if(route.valid){
  if(!assetRoutes.has(route.asset.id))assetRoutes.set(route.asset.id,[]);
  assetRoutes.get(route.asset.id).push({componentId:route.behavior.componentId,behaviorId:route.behavior.id,role:route.role});
 }
 let analyzeWav=options.analyzeWav??options.audioAnalysis?.analyzeAudio??options.audioAnalysis?.analyzeWav,analyzerStatus=wavAssets.length?'pending':'not-applicable';
 if(wavAssets.length&&!analyzeWav){
  try{analyzeWav=await loadAnalyzer();analyzerStatus='available';}catch(error){
   if(!missingModule(error))throw error;
   analyzerStatus='unavailable';
  }
 }else if(analyzeWav)analyzerStatus='available';
 for(const asset of [...wavAssets].sort((a,b)=>a.id.localeCompare(b.id))){
  const routeRows=assetRoutes.get(asset.id)??[{componentId:null,behaviorId:null}],bytes=await bytesFor(asset,project);
  if(!bytes){
   warnings.push(issue('warning','wav-analysis-unavailable',routeRows[0].componentId,'Supply audio bytes to the preflight API so acoustic checks can run.',{detail:`No bytes were available for ${asset.id}.`,metrics:{assetId:asset.id}}));
   continue;
  }
  if(!analyzeWav){
   warnings.push(issue('warning','wav-analysis-unavailable',routeRows[0].componentId,'Install audio-analysis.mjs with an exported analyzeWav(bytes) function.',{detail:`Acoustic analysis is unavailable for ${asset.id}.`,metrics:{assetId:asset.id}}));
   continue;
  }
  try{
   const analysis=await analyzeWav(bytes instanceof Uint8Array?bytes:new Uint8Array(bytes),asset.mime);
   const defects=acousticDefects(asset,analysis,routeRows,routeRows.map(row=>row.role).filter(Boolean));
   blockers.push(...defects.blockers);warnings.push(...defects.warnings);
  }catch(error){
   blockers.push(issue('blocker','audio-analysis-failed',routeRows[0].componentId,'Replace malformed or unsupported audio bytes with a bounded WAV or MP3 accepted by the asset pipeline.',{detail:`${asset.id}: ${error.message}`,metrics:{assetId:asset.id,code:error.code??null}}));
  }
 }
 return formatCreativeQaReport({scope:'static',blockers,warnings,checks:{audioBindings:audio.length,wavAssets:wavAssets.length,wavAnalysis:analyzerStatus,pixelTextComponents:pixelComponents.length,catalogMetadata:Boolean(catalog)}});
}
export const staticPreflight=runStaticPreflight;
export const preflight=runStaticPreflight;

export function projectFromHtml(html){
 const match=String(html).match(/<script\b[^>]*\bid=["']project["'][^>]*>([\s\S]*?)<\/script>/i);
 if(!match)return undefined;
 return JSON.parse(match[1]);
}
function meaningfulState(state){
 if(!state||typeof state!=='object')return state;
 const copy={...state};delete copy.time;delete copy.input;
 return copy;
}
function stateChanged(before,after){return JSON.stringify(canonical(meaningfulState(before)))!==JSON.stringify(canonical(meaningfulState(after)));}

async function openPlaywrightSession({html,htmlPath,project,primaryComponentId,network,browser:sharedBrowser}){
 const {chromium}=await import('playwright');
 const browser=sharedBrowser??await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:DEFAULT_VIEWPORTS[0]});
 const page=await context.newPage();
 let hostInit;
 const networkTarget=getNetworkTarget(network);
 if(networkTarget&&networkTarget.hostKind!=='browser'){
  const {build}=await import('esbuild');
  if(networkTarget.hostKind==='mraid'){
   const host=await build({entryPoints:[new URL('../../../packages/test-harness/src/mraid-host.ts',import.meta.url).pathname],bundle:true,format:'iife',globalName:'MraidHost',write:false,platform:'browser'});
   hostInit=host.outputFiles[0].text+`;MraidHost.installMraidHost({version:${JSON.stringify(networkTarget.mraidVersion)},state:"default",visible:true});`;
  }else{
   const installer={dapi:'installIronSourceHost',meta:'installMetaHost','google-exitapi':'installGoogleExitApiHost',mintegral:'installMintegralHost',tiktok:'installTikTokHost'}[networkTarget.hostKind];
   if(!installer)throw Error('E_NATIVE_UNSUPPORTED_TARGET');
   const host=await build({entryPoints:[new URL('../../../packages/test-harness/src/vendor-hosts.ts',import.meta.url).pathname],bundle:true,format:'iife',globalName:'VendorHost',write:false,platform:'browser'});
   hostInit=host.outputFiles[0].text+`;VendorHost.${installer}();`;
  }
  await page.addInitScript(hostInit);
 }
 if(networkTarget?.hostKind==='google-exitapi'||networkTarget?.hostKind==='tiktok'){
  const scriptUrl=networkTarget.hostKind==='google-exitapi'?'https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js':'https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/Playable/sdk/Playable-sdk.js';
  await context.route(scriptUrl,route=>route.fulfill({status:200,contentType:'application/javascript',body:'/* declared vendor host supplied by the QA mock */'}));
 }
 const url=htmlPath?pathToFileURL(resolve(htmlPath)).href:undefined;
 let closed=false;
 return {
  async setViewport(viewport){await page.setViewportSize(viewport);},
  async load(){
   await page.evaluate(()=>globalThis.toraRuntime?.destroy?.()).catch(()=>{});
   if(url)await page.goto(url,{waitUntil:'load'});else{if(hostInit)await page.evaluate(hostInit);await page.setContent(html,{waitUntil:'load'});}
   await page.waitForFunction(()=>globalThis.toraRuntime);
   await page.evaluate(async()=>{await globalThis.document.fonts?.ready;await new Promise(resolveFrame=>globalThis.requestAnimationFrame(()=>globalThis.requestAnimationFrame(resolveFrame)));});
  },
  async screenshot(){return page.screenshot({type:'png'});},
  async auditLayout(args){
   return page.evaluate(options=>{
    if(typeof globalThis.toraRuntime?.auditSceneLayout!=='function')return null;
    return globalThis.toraRuntime.auditSceneLayout(options);
   },args);
  },
  async getState(){return page.evaluate(()=>globalThis.toraRuntime?.state?.()??null);},
  async getPrimaryTarget(){
   return page.evaluate(({authored,preferred})=>{
    const embedded=globalThis.document.getElementById('project');
    const current=authored??(embedded?JSON.parse(embedded.textContent):undefined);
    const canvas=globalThis.document.querySelector('canvas');
    if(!current||!canvas)return null;
    const byId=new Map(current.components.map(component=>[component.id,component]));
    const bindings=new Map(current.eventBindings.map(binding=>[binding.eventId,binding]));
    const multiply=(a,b)=>[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];
    const clickEvents=current.events.filter(event=>event.kind==='click'&&byId.has(event.componentId));
    const eligible=event=>{
     const component=byId.get(event.componentId);
     return component.sceneId===current.base.startScene&&!component.prototype&&component.parameters?.visible!==false&&component.parameters?.enabled!==false;
    };
    let candidates=clickEvents.filter(event=>!preferred||event.componentId===preferred).filter(eligible).filter(event=>{
     const component=byId.get(event.componentId);
     return component.contract!=='native.group.v1'||component.parameters?.width>0&&component.parameters?.height>0;
    });
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='match-tile'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id+'.primary',componentId:behavior.componentId})).filter(eligible);
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='aim-launch'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'aim-launch',componentId:behavior.componentId})).filter(eligible);
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='aim-launch-3d'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'aim-launch-3d',componentId:behavior.componentId})).filter(eligible);
    const liveInstances=globalThis.toraRuntime?.state?.()?.instances??[];
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='drag'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'drag',componentId:behavior.componentId,parameters:behavior.parameters})).filter(eligible);
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='drag'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'drag',componentId:behavior.componentId,parameters:behavior.parameters,fromInstance:true})).filter(entry=>{const c=byId.get(entry.componentId);return c.sceneId===current.base.startScene&&c.prototype&&c.parameters?.visible!==false&&liveInstances.some(instance=>instance.prototypeId===c.id);});
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='swipe-input'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'swipe',componentId:behavior.componentId})).filter(eligible);
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='virtual-joystick'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'joystick',componentId:behavior.componentId})).filter(eligible);
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='hold-charge'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'hold',componentId:behavior.componentId})).filter(eligible);
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='draw-stroke'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'draw',componentId:behavior.componentId})).filter(eligible);
    if(!candidates.length&&!preferred)candidates=current.gameplay.filter(behavior=>behavior.kind==='erase-mask'&&byId.has(behavior.componentId)).map(behavior=>({id:behavior.id,kind:'erase',componentId:behavior.componentId})).filter(eligible);
    candidates=candidates.sort((a,b)=>{
     const first=byId.get(a.componentId),second=byId.get(b.componentId);
     const aBinding=bindings.get(a.id),bBinding=bindings.get(b.id),aStore=aBinding?(aBinding.actions??[]).every(action=>['store','restart'].includes(action.kind)):false;
     const bStore=bBinding?(bBinding.actions??[]).every(action=>['store','restart'].includes(action.kind)):false;
     return Number(aStore)-Number(bStore)||Number(second.contract==='native.button.v1')-Number(first.contract==='native.button.v1')||current.components.indexOf(first)-current.components.indexOf(second)||a.id.localeCompare(b.id);
    });
    const component=byId.get(candidates[0]?.componentId);
    if(!component)return null;
    const responsive=new Map(current.gameplay.filter(behavior=>behavior.kind==='responsive-layout').map(behavior=>[behavior.componentId,behavior.parameters]));
    const rect=canvas.getBoundingClientRect(),landscape=responsive.size>0&&rect.width>rect.height;
    const stage={width:landscape?Math.max(current.base.width,current.base.height):current.base.width,height:landscape?Math.min(current.base.width,current.base.height):current.base.height};
    const scale=Math.min(rect.width/stage.width,rect.height/stage.height),offsetX=(rect.width-stage.width*scale)/2,offsetY=(rect.height-stage.height*scale)/2;
    if(candidates[0]?.kind==='aim-launch-3d'){
     const projected=globalThis.toraRuntime?.state?.()?.physics3d?.projected?.[component.id];
     const pt=projected??{x:stage.width*.5,y:stage.height*.62};
     return {componentId:component.id,interaction:'aim-launch',x:rect.left+offsetX+pt.x*scale,y:rect.top+offsetY+pt.y*scale};
    }
    const local=target=>{
     const authoredTransform=target.transform??[1,0,0,1,0,0],layout=responsive.get(target.id);
     if(!layout||!landscape)return authoredTransform;
     const result=[...authoredTransform];result[4]+=layout.x-authoredTransform[4];result[5]+=layout.y-authoredTransform[5];result[0]*=layout.scaleX;result[1]*=layout.scaleX;result[2]*=layout.scaleY;result[3]*=layout.scaleY;return result;
    };
    const world=target=>target.parentId?multiply(world(byId.get(target.parentId)),local(target)):local(target);
    const matrix=world(component),width=component.parameters.width,height=component.parameters.height;
    const screen=pt=>({x:rect.left+offsetX+pt.x*scale,y:rect.top+offsetY+pt.y*scale});
    const liveMatches=candidates[0]?.fromInstance?liveInstances.filter(instance=>instance.prototypeId===component.id):[];
    const center=liveMatches.length?{x:liveMatches[0].x+width/2,y:liveMatches[0].y+height/2}:{x:matrix[0]*width/2+matrix[2]*height/2+matrix[4],y:matrix[1]*width/2+matrix[3]*height/2+matrix[5]};
    const start=screen(center),kind=candidates[0]?.kind;
    if(kind==='drag'){
     if(liveMatches.length>1&&current.gameplay.some(behavior=>behavior.kind==='drop-zone'&&behavior.componentId===component.id)){
      const end=screen({x:liveMatches[1].x+width/2,y:liveMatches[1].y+height/2});
      return {componentId:component.id,interaction:'drag-drop',...start,endX:end.x,endY:end.y};
     }
     const zones=current.gameplay.filter(behavior=>behavior.kind==='drop-zone'&&byId.has(behavior.componentId)&&behavior.componentId!==component.id).filter(eligible).filter(behavior=>(behavior.parameters.acceptTags?.length??0)===0||behavior.parameters.acceptTags.includes(candidates[0].parameters.tag??''));
     zones.sort((a,b)=>Number(current.gameplay.some(item=>item.kind==='drag'&&item.componentId===b.componentId))-Number(current.gameplay.some(item=>item.kind==='drag'&&item.componentId===a.componentId)));
     const destination=byId.get(zones[0]?.componentId);
     if(destination){
      const m=world(destination),w=destination.parameters.width,h=destination.parameters.height,end=screen({x:m[0]*w/2+m[2]*h/2+m[4],y:m[1]*w/2+m[3]*h/2+m[5]});
      return {componentId:component.id,interaction:'drag-drop',...start,endX:end.x,endY:end.y};
     }
     const axis=candidates[0].parameters?.axis??'both';
     return {componentId:component.id,interaction:'drag-drop',...start,endX:axis==='y'?start.x:start.x+60*scale,endY:axis==='y'?start.y+60*scale:start.y};
    }
    if(kind==='swipe')return {componentId:component.id,interaction:'swipe',...start,endX:start.x+60*scale,endY:start.y};
    if(kind==='joystick')return {componentId:component.id,interaction:'drag-drop',...start,endX:start.x+42*scale,endY:start.y-24*scale};
    if(kind==='hold')return {componentId:component.id,interaction:'hold',...start};
    if(kind==='draw'||kind==='erase'){
     const from=screen({x:matrix[0]*width*.25+matrix[2]*height*.5+matrix[4],y:matrix[1]*width*.25+matrix[3]*height*.5+matrix[5]});
     const to=screen({x:matrix[0]*width*.75+matrix[2]*height*.5+matrix[4],y:matrix[1]*width*.75+matrix[3]*height*.5+matrix[5]});
     return {componentId:component.id,interaction:kind,x:from.x,y:from.y,endX:to.x,endY:to.y};
    }
    return {componentId:component.id,interaction:kind==='aim-launch'?'aim-launch':'click',...start};
   },{authored:project??null,preferred:primaryComponentId??null});
  },
  async prepareClick(target){if(target.interaction==='aim-launch')await page.mouse.move(target.x,target.y);},
  async click(target){
   if(target.interaction==='aim-launch'){await page.mouse.down();await page.mouse.move(target.x-64,target.y+28);await page.mouse.up();}
   else if(target.interaction==='drag-drop'){await page.mouse.move(target.x,target.y);await page.mouse.down();await page.mouse.move(target.endX,target.endY,{steps:3});await page.mouse.up();}
   else if(target.interaction==='swipe'){await page.mouse.move(target.x,target.y);await page.mouse.down();await page.mouse.move(target.endX,target.endY,{steps:3});await page.mouse.up();}
   else if(target.interaction==='hold'){await page.mouse.move(target.x,target.y);await page.mouse.down();await page.waitForTimeout(55);await page.mouse.up();}
   else if(target.interaction==='draw'||target.interaction==='erase'){await page.mouse.move(target.x,target.y);await page.mouse.down();await page.mouse.move(target.endX,target.endY,{steps:3});await page.mouse.up();}
   else await page.mouse.click(target.x,target.y);
  },
  async enterEndCard(){
   const current=project??await page.evaluate(()=>{const el=globalThis.document.getElementById('project');return el?JSON.parse(el.textContent):null;});
   if(!current)return {available:false};
   const endScenes=(current.scenes??[]).filter(scene=>scene.role==='end-card');
   const {descriptor}=moduleForProject(current);
   if(descriptor?.qa?.playToEndCard)return descriptor.qa.playToEndCard(page,current);
   if(endScenes.length){
    const target=await this.getPrimaryTarget();
    if(target){
     for(let tap=0;tap<12;tap++){
      await page.mouse.click(target.x,target.y);
      const sceneNow=await page.evaluate(()=>globalThis.toraRuntime?.state?.()?.scene);
      if(endScenes.some(scene=>scene.id===sceneNow))return {available:true,mode:'real-play'};
     }
    }
    const winEndScene=endScenes.find(scene=>!/fail|loss|timeout/i.test(scene.id))??endScenes[0];
    const ok=await page.evaluate(sceneId=>{
     const canvas=globalThis.document.querySelector('canvas'),embedded=globalThis.document.getElementById('project');
     if(!canvas||!embedded||typeof globalThis.ToraNative?.mountNative!=='function')return false;
     globalThis.toraRuntime?.destroy?.();
     globalThis.toraRuntime=globalThis.ToraNative.mountNative(JSON.parse(embedded.textContent),canvas,{edit:true,sceneId});
     return true;
    },winEndScene.id);
    if(ok){
     await page.evaluate(()=>new Promise(resolveFrame=>globalThis.requestAnimationFrame(()=>globalThis.requestAnimationFrame(resolveFrame))));
     return {available:true,mode:'edit-layout'};
    }
   }
   return {available:false};
  },
  async enterTimeout(){
   const current=project??await page.evaluate(()=>{const el=globalThis.document.getElementById('project');return el?JSON.parse(el.textContent):null;});
   if(!current)return {available:false};
   const {descriptor}=moduleForProject(current);
   const phaseVariable=descriptor?.qa?.phaseVariable??current.variables?.find(variable=>/(?:^|\.)phase$/.test(variable.id))?.id;
   const deadlineBehavior=(current.gameplay??[]).find(behavior=>behavior.kind==='timer'&&behavior.id===descriptor?.qa?.deadlineBehaviorId)??
    (current.gameplay??[]).find(behavior=>behavior.kind==='timer'&&/deadline|timeout/i.test(behavior.id));
   if(deadlineBehavior&&phaseVariable){
    const deadlineSec=Number(deadlineBehavior.parameters?.seconds??20);
    const timeoutPage=await context.newPage();
    try{
     await timeoutPage.setViewportSize({width:16,height:16});
     if(hostInit)await timeoutPage.addInitScript(hostInit);
     await timeoutPage.addInitScript(phase=>{
      const orig=globalThis.requestAnimationFrame.bind(globalThis);
      let queued=null,now=0,manual=true;
      globalThis.requestAnimationFrame=cb=>{if(manual){queued=cb;return 1;}return orig(cb);};
      globalThis.__pumpTimeout=steps=>{
       let settled=0;
       for(let i=0;i<steps&&queued;i++){
        const cb=queued;queued=null;now+=80;cb(now);
        if(globalThis.toraRuntime?.state?.()?.variables?.[phase]==='cta'&&++settled>=4)break;
       }
       manual=false;if(queued){const cb=queued;queued=null;orig(cb);}
      };
     },phaseVariable);
     if(url)await timeoutPage.goto(url,{waitUntil:'load'});
     else{await timeoutPage.goto('about:blank');await timeoutPage.setContent(html,{waitUntil:'load'});}
     await timeoutPage.waitForFunction(()=>globalThis.toraRuntime);
     await timeoutPage.mouse.click(8,8);
     if(descriptor?.qa?.prepareTimeout)await descriptor.qa.prepareTimeout(timeoutPage,current);
     await timeoutPage.waitForFunction(()=>globalThis.toraRuntime&&typeof globalThis.__pumpTimeout==='function');
     const reached=await timeoutPage.evaluate(({steps,phase})=>{globalThis.__pumpTimeout(steps);return globalThis.toraRuntime?.state?.()?.variables?.[phase]==='cta';},{steps:Math.ceil((deadlineSec+1.5)/.08),phase:phaseVariable});
     const timeoutState=await timeoutPage.evaluate(()=>globalThis.toraRuntime?.state?.());
     if(descriptor?.qa?.validateTimeout&&!descriptor.qa.validateTimeout(timeoutState))throw Error('E_CREATIVE_TIMEOUT_OUTCOME');
     if(!reached){await timeoutPage.close();return {available:false};}
     return {
     available:true,mode:'real-timeout',
      async setViewport(vp){await timeoutPage.setViewportSize(vp);await timeoutPage.evaluate(()=>new Promise(r=>globalThis.requestAnimationFrame(()=>globalThis.requestAnimationFrame(r))));},
      async screenshot(){return timeoutPage.screenshot({type:'png'});},
      async getState(){return timeoutPage.evaluate(()=>globalThis.toraRuntime?.state?.()??null);},
      async auditLayout(args){return timeoutPage.evaluate(opts=>globalThis.toraRuntime?.auditSceneLayout?.(opts)??null,args);},
      async close(){await timeoutPage.close();},
     };
    }catch(error){await timeoutPage.close().catch(()=>{});if(descriptor?.qa?.prepareTimeout)throw error;return {available:false};}
   }
   const failScene=(current.scenes??[]).find(scene=>scene.role==='end-card'&&/fail|loss|timeout/i.test(scene.id));
   if(failScene){
    const ok=await page.evaluate(sceneId=>{
     const canvas=globalThis.document.querySelector('canvas'),embedded=globalThis.document.getElementById('project');
     if(!canvas||!embedded||typeof globalThis.ToraNative?.mountNative!=='function')return false;
     globalThis.toraRuntime?.destroy?.();
     globalThis.toraRuntime=globalThis.ToraNative.mountNative(JSON.parse(embedded.textContent),canvas,{edit:true,sceneId});
     return true;
    },failScene.id);
    if(ok){
     await page.evaluate(()=>new Promise(resolveFrame=>globalThis.requestAnimationFrame(()=>globalThis.requestAnimationFrame(resolveFrame))));
     return {available:true,mode:'edit-layout'};
    }
   }
   return {available:false};
  },
  async enterState(state,stateHook){
   if(typeof stateHook!=='string')throw Error('The Playwright state hook must be a global function name');
   return page.evaluate(async({name,moment})=>{
    const path=name.replace(/^globalThis\./,'').split('.');
    let owner=globalThis;
    for(const key of path)owner=owner?.[key];
    if(typeof owner!=='function')return false;
    const result=await Reflect.apply(owner,undefined,[moment,globalThis.toraRuntime]);
    return result!==false&&result?.available!==false&&result?.supported!==false;
   },{name:stateHook,moment:state});
  },
  async close(){if(closed)return;closed=true;await context.close();if(!sharedBrowser)await browser.close();},
 };
}
async function createSession(adapter,options){
 if(!adapter)return openPlaywrightSession(options);
 if(typeof adapter==='function')return adapter(options);
 if(typeof adapter.createSession==='function')return adapter.createSession(options);
 if(typeof adapter.setViewport==='function')return adapter;
 throw Error('browserAdapter must be a session, factory, or createSession provider');
}
function layoutRemediation(kind){
 return ({
  'stage-overflow':'Move or resize the component so its transformed bounds remain inside the stage.',
  'parent-clip-crop':'Resize the child or clipping parent so no visible content is cut off.',
  'text-overflow':'Enable wrapping or auto-fit and enlarge the text container without reducing legibility.',
  'text-illegible':'Increase the effective text size and contrast to a readable phone presentation.',
  'touch-target-small':'Provide at least a 44 by 44 CSS-pixel interactive hit area.',
  'interactive-overlap':'Separate interactive hit areas or change stacking so each target is unambiguous.',
  'sdk-safe-area-collision':'Move the component clear of the network close, mute, timer, and ad-info zones.',
  'panel-off-center':'Align the element horizontally to the center of its enclosing panel across all viewports.',
  'panel-edge-cramped':'Increase inner margin between the element and its enclosing panel borders across all viewports.',
  'backdrop-incomplete':'Size the backdrop image to cover the entire active stage in both portrait and landscape with no visible seam.',
  'panel-content-overlap':'Separate overlapping text, images, or controls so no visible UI content collides.',
  'duplicate-visible-copy':'Hide redundant banners or remove repeated text so the same message never appears twice on screen.',
  'text-clutter-heavy':'Cut narration and tutorial prose; playable ads are an experience, not a tutorial. Keep screens to concise visual cues and short punchy labels.',
  'particle-style-clash':'Match particle shape to the playable art direction (use circle/square for vector art; reserve pixel-confetti for pixel art).',
  'header-off-center':'Align centered banner or instruction text horizontally with the panel directly below it in both portrait and landscape.',
 })[kind]??'Repair the reported layout defect and rerun the viewport audit.';
}
function addLayoutReport(audit,viewport,state,blockers,warnings){
 if(!audit){
  warnings.push(issue('warning','layout-audit-unavailable',null,'Expose toraRuntime.auditSceneLayout() so clipping, text, hit-area, overlap, and safe-zone checks can run.',{viewport,detail:`No layout audit API was available for ${state}.`}));
  return;
 }
 for(const defect of audit.defects??[]){
  const severity=defect.severity==='blocker'||layoutBlockers.has(defect.kind)?'blocker':'warning';
  const target=severity==='blocker'?blockers:warnings;
  target.push(issue(severity,defect.kind,defect.id??defect.componentId,layoutRemediation(defect.kind),{viewport,detail:defect.detail??`${defect.kind} reported during ${state}.`,metrics:{...(defect.metrics??{}),state,otherId:defect.otherId}}));
 }
 for(const id of audit.missing??[])blockers.push(issue('blocker','layout-component-missing',id,'Ensure the audited component is visible and present in the current scene.',{viewport,detail:`${id} was missing during ${state}.`,metrics:{state}}));
}
async function interact(session,viewport,target,openingState,blockers){
 const result={viewport:normalizeViewport(viewport),componentId:target.componentId,within150Ms:false,deltaType:null,maxResponseMs:INTERACTION_LIMIT_MS};
 const beforeState=openingState??await session.getState(),beforeScreenshot=hash(await session.screenshot());
 if(typeof session.prepareClick==='function')await session.prepareClick(target);
 const deadline=Date.now()+INTERACTION_LIMIT_MS;
 try{await session.click(target);}catch(error){
  const timedOut=error?.name==='TimeoutError'||error?.code==='ETIMEDOUT'||error?.timedOut===true;
  const kind=timedOut?'interaction-timeout':'interaction-error';
  blockers.push(issue('blocker',kind,target.componentId,'Restore a trusted pointer path to the primary target and ensure its click binding executes promptly.',{viewport,detail:error.message,metrics:{limitMs:INTERACTION_LIMIT_MS}}));
  result.error=kind;return result;
 }
 if(Date.now()>deadline){
  blockers.push(issue('blocker','interaction-timeout',target.componentId,'Produce immediate state or visual feedback within 150 ms of pointer input.',{viewport,detail:'The primary pointer action completed after the 150 ms response budget.',metrics:{limitMs:INTERACTION_LIMIT_MS}}));
  result.error='interaction-timeout';return result;
 }
 try{
  while(true){
   const afterState=await session.getState(),stateDelta=stateChanged(beforeState,afterState);
   if(stateDelta){
    if(Date.now()<=deadline){result.within150Ms=true;result.deltaType='state';return result;}
    blockers.push(issue('blocker','interaction-timeout',target.componentId,'Produce immediate state or visual feedback within 150 ms of pointer input.',{viewport,detail:'The first observable response arrived after the 150 ms response budget.',metrics:{limitMs:INTERACTION_LIMIT_MS}}));
    result.error='interaction-timeout';return result;
   }
   const screenshotDelta=hash(await session.screenshot())!==beforeScreenshot;
   if(screenshotDelta){
    if(Date.now()<=deadline){result.within150Ms=true;result.deltaType='screenshot';return result;}
    blockers.push(issue('blocker','interaction-timeout',target.componentId,'Produce immediate state or visual feedback within 150 ms of pointer input.',{viewport,detail:'The first observable response arrived after the 150 ms response budget.',metrics:{limitMs:INTERACTION_LIMIT_MS}}));
    result.error='interaction-timeout';return result;
   }
   if(Date.now()>=deadline)break;
   await delay(Math.min(16,Math.max(1,deadline-Date.now())));
  }
 }catch(error){
  blockers.push(issue('blocker','interaction-error',target.componentId,'Keep runtime state and screenshot inspection available after primary input.',{viewport,detail:error.message,metrics:{limitMs:INTERACTION_LIMIT_MS}}));
  result.error='interaction-error';return result;
 }
 blockers.push(issue('blocker','interaction-zero-delta',target.componentId,'Add an immediate functional state change or visible feedback to the primary click binding.',{viewport,detail:'No state or PNG screenshot delta was observed within 150 ms.',metrics:{limitMs:INTERACTION_LIMIT_MS}}));
 result.error='interaction-zero-delta';return result;
}

export async function runBrowserQa(options={}){
 const {outputDir,htmlPath,stateHook,browserAdapter,network='standalone',primaryComponentId}=options;
 if(!outputDir)throw Error('A deterministic output directory is required');
 if(!htmlPath&&typeof options.html!=='string'&&typeof options.htmlString!=='string')throw Error('Supply an HTML artifact path or HTML string');
 const html=typeof options.html==='string'?options.html:typeof options.htmlString==='string'?options.htmlString:await readFile(htmlPath,'utf8');
 const project=options.project??projectFromHtml(html),blockers=[],warnings=[],interactions=[],states=[],screenshots=[];
 const screenshotDir=resolve(outputDir,'screenshots');await mkdir(screenshotDir,{recursive:true});
 await Promise.all(DEFAULT_VIEWPORTS.flatMap(viewport=>stateOrder.map(state=>rm(resolve(screenshotDir,`${viewport.width}x${viewport.height}-${state}.png`),{force:true}))));
 const session=await createSession(browserAdapter,{html,htmlPath,project,network,primaryComponentId,stateHook,browser:options.browser});
 const capture=async(viewport,state)=>{
  const bytes=await session.screenshot(),filename=`${viewport.width}x${viewport.height}-${state}.png`;
  await writeFile(resolve(screenshotDir,filename),bytes);
  const entry={viewport:normalizeViewport(viewport),state,path:`screenshots/${filename}`,sha256:hash(bytes)};
  screenshots.push(entry);return entry;
 };
 const audit=async(viewport,state)=>{
  let result;
  try{
   const sceneId=(await session.getState())?.scene??project?.base?.startScene;
   const components=project?.components??[],byId=new Map(components.map(component=>[component.id,component]));
   const active=new Set(components.filter(component=>{
    if(component.sceneId!==sceneId)return false;
    for(let current=component;current;current=byId.get(current.parentId))if(current.prototype)return false;
    return true;
   }).map(component=>component.id));
   result=await session.auditLayout({ids:[...active],interactiveIds:[...new Set([...(project?.events??[]).filter(event=>event.kind==='click'&&active.has(event.componentId)).map(event=>event.componentId),...(project?.gameplay??[]).filter(behavior=>['aim-launch','drag','swipe-input','hold-charge','virtual-joystick','draw-stroke','erase-mask'].includes(behavior.kind)&&active.has(behavior.componentId)).map(behavior=>behavior.componentId)])],network,minTouchPx:MIN_TOUCH_PX});
  }catch(error){
   blockers.push(issue('blocker','layout-audit-failed',null,'Repair the runtime layout audit so every key state can be inspected.',{viewport,detail:`${state}: ${error.message}`,metrics:{state}}));return;
  }
  addLayoutReport(result,viewport,state,blockers,warnings);
 };
 try{
  const useAutoEndCard=!stateHook&&options.autoEndCard!==false&&!browserAdapter&&typeof session.enterEndCard==='function';
  for(const viewport of DEFAULT_VIEWPORTS){
   await session.setViewport(viewport);await session.load();
   await capture(viewport,'opening');states.push({viewport:normalizeViewport(viewport),state:'opening',status:'checked'});await audit(viewport,'opening');
   const openingState=await session.getState(),target=await session.getPrimaryTarget();
   if(!target){
    blockers.push(issue('blocker','primary-interaction-missing',primaryComponentId??null,'Declare a click event on an enabled component in the start scene and bind meaningful feedback to it.',{viewport,detail:'No generic primary target could be derived from project click events.'}));
    states.push({viewport:normalizeViewport(viewport),state:'after-first-input',status:'unavailable',reason:'primary-interaction-missing'});
   }else{
    interactions.push(await interact(session,viewport,target,openingState,blockers));
    states.push({viewport:normalizeViewport(viewport),state:'after-first-input',status:'checked',componentId:target.componentId});
    await capture(viewport,'after-first-input');await audit(viewport,'after-first-input');
   }
   for(const state of ['end-card','timeout']){
    if(!stateHook){
     if(useAutoEndCard)continue;
     states.push({viewport:normalizeViewport(viewport),state,status:'skipped',reason:'state-hook-not-supplied'});continue;
    }
    await session.load();
    let available;
    try{available=await session.enterState(state,stateHook);}catch(error){
     states.push({viewport:normalizeViewport(viewport),state,status:'failed',reason:'state-hook-error'});
     blockers.push(issue('blocker','state-hook-failed',null,'Repair the supplied generic state hook or declare the state unavailable.',{viewport,detail:`${state}: ${error.message}`,metrics:{state}}));continue;
    }
    if(!available){states.push({viewport:normalizeViewport(viewport),state,status:'unavailable',reason:'state-hook-unsupported'});continue;}
    states.push({viewport:normalizeViewport(viewport),state,status:'checked'});await capture(viewport,state);await audit(viewport,state);
   }
  }
  if(useAutoEndCard){
   await session.setViewport(DEFAULT_VIEWPORTS[1]);await session.load();
   let discovered;
   try{discovered=await session.enterEndCard();}catch(error){
    for(const viewport of DEFAULT_VIEWPORTS){
     states.push({viewport:normalizeViewport(viewport),state:'end-card',status:'failed',reason:'auto-end-card-error'});
     blockers.push(issue('blocker','state-hook-failed',null,'Repair the playable end-card progression or layout.',{viewport,detail:`end-card: ${error.message}`,metrics:{state:'end-card'}}));
    }
    discovered=null;
   }
   if(discovered&&!discovered.available){
    for(const viewport of DEFAULT_VIEWPORTS)states.push({viewport:normalizeViewport(viewport),state:'end-card',status:'unavailable',reason:'end-card-unreachable'});
   }else if(discovered?.available){
    for(const viewport of DEFAULT_VIEWPORTS){
     await session.setViewport(viewport);
     states.push({viewport:normalizeViewport(viewport),state:'end-card',status:'checked',mode:discovered.mode});
     await capture(viewport,'end-card');await audit(viewport,'end-card');
    }
   }
   if(typeof session.enterTimeout==='function'){
    await session.setViewport(DEFAULT_VIEWPORTS[1]);await session.load();
    let timedOut;
    try{timedOut=await session.enterTimeout();}catch(error){
     for(const viewport of DEFAULT_VIEWPORTS){
      states.push({viewport:normalizeViewport(viewport),state:'timeout',status:'failed',reason:'auto-timeout-error'});
      blockers.push(issue('blocker','state-hook-failed',null,'Repair the playable timeout progression or layout.',{viewport,detail:`timeout: ${error.message}`,metrics:{state:'timeout'}}));
     }
     timedOut=null;
    }
    if(timedOut&&!timedOut.available){
     for(const viewport of DEFAULT_VIEWPORTS)states.push({viewport:normalizeViewport(viewport),state:'timeout',status:'unavailable',reason:'timeout-unreachable'});
    }else if(timedOut?.available){
     const targetSession=timedOut.auditLayout?timedOut:session;
     try{
      for(const viewport of DEFAULT_VIEWPORTS){
       await targetSession.setViewport(viewport);
       states.push({viewport:normalizeViewport(viewport),state:'timeout',status:'checked',mode:timedOut.mode});
       const bytes=await targetSession.screenshot(),filename=`${viewport.width}x${viewport.height}-timeout.png`;
       await writeFile(resolve(screenshotDir,filename),bytes);
       screenshots.push({viewport:normalizeViewport(viewport),state:'timeout',path:`screenshots/${filename}`,sha256:hash(bytes)});
       const sceneId=(await targetSession.getState())?.scene??project?.base?.startScene;
       const components=project?.components??[],byId=new Map(components.map(c=>[c.id,c]));
       const active=new Set(components.filter(c=>{if(c.sceneId!==sceneId)return false;for(let cur=c;cur;cur=byId.get(cur.parentId))if(cur.prototype)return false;return true;}).map(c=>c.id));
       const res=await targetSession.auditLayout({ids:[...active],interactiveIds:[...new Set([...(project?.events??[]).filter(e=>e.kind==='click'&&active.has(e.componentId)).map(e=>e.componentId),...(project?.gameplay??[]).filter(behavior=>['aim-launch','drag','swipe-input','hold-charge','virtual-joystick','draw-stroke','erase-mask'].includes(behavior.kind)&&active.has(behavior.componentId)).map(behavior=>behavior.componentId)])],network,minTouchPx:MIN_TOUCH_PX});
       addLayoutReport(res,viewport,'timeout',blockers,warnings);
      }
     }finally{await timedOut.close?.();}
    }
   }
  }
 }finally{await session.close?.();}
 const report=formatCreativeQaReport({scope:'browser',blockers,warnings,interactions,states,screenshots,checks:{viewports:DEFAULT_VIEWPORTS,browserContexts:1,primaryInteraction:'project-click-events',interactionLimitMs:INTERACTION_LIMIT_MS,minTouchPx:MIN_TOUCH_PX,stateHook:stateHook?typeof stateHook:'not-supplied'}});
 await writeCreativeQaReport(report,outputDir);return report;
}
export const runBrowserAudit=runBrowserQa;
export const browserRunner=runBrowserQa;

export async function runCreativeQa(options={}){
 if(!options.outputDir)throw Error('A deterministic output directory is required');
 const html=typeof options.html==='string'?options.html:typeof options.htmlString==='string'?options.htmlString:options.htmlPath?await readFile(options.htmlPath,'utf8'):undefined;
 const project=options.project??(html?projectFromHtml(html):undefined);
 const staticReport=project?await runStaticPreflight(project,options):formatCreativeQaReport({scope:'static',warnings:[issue('warning','static-preflight-unavailable',null,'Supply the native project or embed it in the HTML artifact to enable static preflight.')],checks:{project:false}});
 const browserReport=await runBrowserQa({...options,html,project});
 const report=formatCreativeQaReport({scope:'static+browser',blockers:[...staticReport.blockers,...browserReport.blockers],warnings:[...staticReport.warnings,...browserReport.warnings],interactions:browserReport.interactions,states:browserReport.states,screenshots:browserReport.screenshots,checks:{static:staticReport.checks,browser:browserReport.checks}});
 await writeCreativeQaReport(report,options.outputDir);return report;
}

const usage='Usage: node scripts/lean/native/creative-qa.mjs <artifact.html> --output <directory> [--project <project.json>] [--catalog <catalog.json>] [--state-hook <globalFunction>] [--network <standalone|seven-network-profile-id>] [--static]';
function parseCli(argv){
 const result={};
 for(let index=0;index<argv.length;index++){
  const argument=argv[index];
  if(argument==='--static'){result.static=true;continue;}
  if(argument==='--help'||argument==='-h'){result.help=true;continue;}
  const names={'--html':'htmlPath','--project':'projectPath','--catalog':'catalogPath','--output':'outputDir','--state-hook':'stateHook','--network':'network'};
  const key=names[argument];
  if(!key){if(!argument.startsWith('-')&&!result.htmlPath){result.htmlPath=argument;continue;}throw Error(`Unknown argument: ${argument}`);}
  if(!argv[index+1])throw Error(`Missing value for ${argument}`);
  result[key]=argv[++index];
 }
 return result;
}
export async function runCli(argv=process.argv.slice(2),{log=globalThis.console.log,error=globalThis.console.error}={}){
 try{
  const args=parseCli(argv);
  if(args.help){log(usage);return 0;}
  if(!args.outputDir)throw Error(usage);
  if(!args.htmlPath&&!args.projectPath)throw Error(usage);
  const html=args.htmlPath?await readFile(args.htmlPath,'utf8'):undefined;
  const project=args.projectPath?JSON.parse(await readFile(args.projectPath,'utf8')):projectFromHtml(html);
  const catalog=args.catalogPath?JSON.parse(await readFile(args.catalogPath,'utf8')):undefined;
  let report;
  if(args.static){
   if(!project)throw Error('Static preflight requires a native project or embedded project JSON');
   report=await runStaticPreflight(project,{...(catalog!==undefined?{catalog}:{})});await writeCreativeQaReport(report,args.outputDir);
  }else report=await runCreativeQa({htmlPath:args.htmlPath,html,project,...(catalog!==undefined?{catalog}:{}),outputDir:args.outputDir,stateHook:args.stateHook,network:args.network??'standalone'});
  log(formatCreativeQaReportJson(report));return report.ok?0:1;
 }catch(failure){error(failure.message);return 2;}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)process.exitCode=await runCli();
