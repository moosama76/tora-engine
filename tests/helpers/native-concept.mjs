import {URL} from 'node:url';
import {readFileSync} from 'node:fs';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
const artwork=(id,file)=>({id,mime:'image/png',data:readFileSync(new URL('../../fixtures/native/restoration/'+file,import.meta.url)).toString('base64'),rights:'Original procedurally drawn Tora acceptance-test artwork; no third-party material.'});
const restoration=()=>({binding:{event:'validMatch',choice:'repairArea',persistent:true},areas:[{id:'flowerbed',label:'Flowerbed',before:artwork('art-flowerbed-before','flowerbed-before.png'),after:artwork('art-flowerbed-after','flowerbed-after.png')},{id:'pond',label:'Pond',before:artwork('art-pond-before','pond-before.png'),after:artwork('art-pond-after','pond-after.png')}]});
export function nativeConcept(mechanic='tap-collect'){const value={format:'tora-creative-concept-1',id:'garden-'+mechanic,product:{name:'Garden Quest',storeUrl:'https://play.google.com/store/apps/details?id=com.playablelab.garden',gameplayTruth:'Players restore a garden by matching tiles and choosing which areas to repair.',differentiator:'Every completed puzzle creates a visible, permanent garden transformation.'},audience:{segment:'Adults who play relaxing puzzle games and enjoy visible collection progress.',motivation:'Create a beautiful space through low-pressure decisions and see lasting results.'},experience:{fantasy:'Restore a neglected garden through a small act of care.',mechanic,interactionRationale:mechanic==='match-restore'?'A valid match earns a repair choice, making the puzzle visibly restore the garden.':mechanic==='tap-collect'?'Collecting sunlight expresses the restoration loop with immediate agency.':'Catching falling seeds expresses the restoration loop through direct movement.',instruction:mechanic==='match-restore'?'Swap adjacent tiles to match three':mechanic==='tap-collect'?'Tap to collect sunlight':'Drag to catch seeds',goal:3,arc:[{phase:'first-seconds',seconds:2,description:mechanic==='match-restore'?'A neglected garden needs your help.':'Show the garden need and one obvious interaction.'},{phase:'agency',seconds:4,description:'Let the player complete the first useful action immediately.'},{phase:'escalation',seconds:8,description:mechanic==='match-restore'?'Choose an area to repair.':'Repeat the action with visible progress toward restoration.'},{phase:'payoff',seconds:4,description:'Show the restored space and acknowledge the player contribution.'},{phase:'cta',seconds:2,description:mechanic==='match-restore'?'Continue your garden restoration journey.':'Offer the full garden restoration journey.'}],ctaLabel:'RESTORE YOUR GARDEN',storeContinuity:'The installed game continues the same puzzle-driven garden restoration fantasy.'},hypothesis:{statement:'Players motivated by creative transformation will respond to an immediate restoration action followed by visible progress.',risk:'A generic collection interaction may underperform if the transformation is not visually explicit.'},presentation:{title:'GARDEN QUEST',subtitle:'Bring the garden back to life',rewardCopy:'YOUR GARDEN IS GROWING!',palette:{background:'#173e49',primary:'#4f9d76',accent:'#ffd166',text:'#fff0ce'}}};if(mechanic==='match-restore')value.restoration=restoration();return value;}

function licensedArtwork(id,file){
 const source=JSON.parse(readFileSync(new URL('../../assets/free-assets/catalog.json',import.meta.url),'utf8')).sources.find(record=>record.id==='kenney-tiny-farm');
 const record=source.files.find(record=>record.path===file);
 return {id,mime:record.mime,data:readFileSync(new URL('../../'+record.file,import.meta.url)).toString('base64'),rights:'Kenney Tiny Farm, CC0-1.0. '+source.sourceUrl,provenance:{origin:'third-party-free',sourceId:source.id,sourceFile:record.path,sourceHash:record.sha256,author:source.author,license:source.license,sourceUrl:source.sourceUrl,styleFamily:source.styleFamily}};
}
function licensedAudio(id,path){
 const catalog=JSON.parse(readFileSync(new URL('../../assets/free-assets/catalog.json',import.meta.url),'utf8'));
 const source=catalog.sources.find(record=>record.files.some(file=>file.path===path));
 const record=source.files.find(file=>file.path===path);
 return {id,mime:record.mime,data:readFileSync(new URL('../../'+record.file,import.meta.url)).toString('base64'),rights:source.author+', '+source.license+'. '+source.sourceUrl,provenance:{origin:'third-party-free',sourceId:source.id,sourceFile:record.path,sourceHash:record.sha256,author:source.author,license:source.license,sourceUrl:source.sourceUrl,styleFamily:source.styleFamily}};
}
export function strategicConcept(){
 const value=nativeConcept('match-restore');
 value.format='tora-creative-concept-2';value.experience.goal=2;
 const sources=['product.gameplayTruth','product.differentiator','audience.motivation','experience.fantasy','experience.interactionRationale','hypothesis.statement','hypothesis.risk','experience.storeContinuity'];
 const effects=['match-rule','world-transformation','repair-choice','world-transformation','match-rule','world-transformation','recovery','continuity'];
 value.requirements=sources.map((source,index)=>({source,claim:source.split('.').reduce((record,key)=>record[key],value),effect:effects[index]}));
 value.restoration.areas=value.restoration.areas.map((area,index)=>({...area,before:licensedArtwork(area.before.id,index===0?'Tiles/tile_0014.png':'Tiles/tile_0060.png'),after:licensedArtwork(area.after.id,index===0?'Tiles/tile_0015.png':'Tiles/tile_0029.png')}));
 value.restoration.tiles=Object.fromEntries(['sun','leaf','drop'].map((group,index)=>[group,licensedArtwork('tile-'+group,['Tiles/tile_0008.png','Tiles/tile_0032.png','Tiles/tile_0044.png'][index])]));
 const plan=JSON.parse(readFileSync(new URL('../../assets/kenney-harvest/plan.json',import.meta.url),'utf8'));
 value.restoration.audio=Object.fromEntries(Object.entries({ambient:'ambient',impact:'match',payoff:'complete',reject:'reject',complete:'complete'}).map(([cue,role])=>{
  const record=plan.assets.find(record=>record.id===plan.audio[role]);
  const {file,...asset}=record;
  return [cue,{...asset,data:readFileSync(new URL('../../assets/kenney-harvest/'+file,import.meta.url)).toString('base64')}];
 }));
 value.restoration.audio.payoff=licensedAudio('audio-reward','casual-warm/reward.wav');
 return value;
}

export async function legacyHarvestOutcomeConcept(){
 const value=await createHarvestConcept();
 value.harvest.assets=value.harvest.assets.filter(asset=>asset.id!=='audio-victory');
 const catalog=JSON.parse(readFileSync(new URL('../../assets/free-assets/catalog.json',import.meta.url),'utf8'));
 const source=catalog.sources.find(record=>record.id==='kenney-music-jingles');
 const record=source.files.find(file=>file.path==='audio/repair.wav');
 const repair={id:'audio-repair',mime:record.mime,data:readFileSync(new URL('../../'+record.file,import.meta.url)).toString('base64'),rights:source.author+', '+source.license+'. '+source.sourceUrl,provenance:{origin:'third-party-free',sourceId:source.id,sourceFile:record.path,sourceHash:record.sha256,author:source.author,license:source.license,sourceUrl:source.sourceUrl,styleFamily:source.styleFamily}};
 value.harvest.assets.splice(value.harvest.assets.findIndex(asset=>asset.id==='audio-complete'),0,repair);
 value.harvest.audio={ambient:'audio-ambient',match:'audio-match',reject:'audio-reject',repair:'audio-repair',complete:'audio-complete'};
 return value;
}
