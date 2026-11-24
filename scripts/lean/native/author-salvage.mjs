import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import {NativeAgentTools} from './agent-tools.mjs';
import {composeNativeConcept} from './concept.mjs';

const assetRoot=resolve(import.meta.dirname,'../../../assets/kenney-space-salvage');

export async function createSalvageConcept(planFile=resolve(assetRoot,'plan.json')){
 const plan=JSON.parse(await readFile(planFile,'utf8'));
 const assets=await Promise.all(plan.assets.map(async record=>{
  const {file,...asset}=record;
  return {...asset,data:(await readFile(resolve(dirname(planFile),file))).toString('base64')};
 }));
 const concept={
  format:'tora-creative-concept-2',id:'star-salvage',
  product:{
   name:'Star Salvage',storeUrl:'https://play.google.com/store/apps/details?id=com.playablelab.starsalvage',
   gameplayTruth:'Drag a rescue ship to catch three falling Star Cores, dodge meteors, and restore a warp station.',
   differentiator:'Every caught core installs a lasting station part, from thrusters to the final warp jump.',
  },
  audience:{segment:'Players who enjoy quick arcade dodging and visible collectible upgrades.',motivation:'Turn precise catches into a fully restored station and a spectacular warp launch.'},
  experience:{
   fantasy:'Rescue a stranded warp station from a meteor field.',mechanic:'star-salvage',
   interactionRationale:'Dragging the ship under falling cores directly charges and rebuilds the station while meteors create fair dodge choices.',
   instruction:'Drag to catch',goal:3,
   arc:[
    {phase:'first-seconds',seconds:2,description:'A rescue ship waits beneath a safe falling Star Core.'},
    {phase:'agency',seconds:5,description:'Catch cores to restore the station thrusters and shield ring.'},
    {phase:'escalation',seconds:11,description:'Dodge recoverable meteor hits and complete the warp station.'},
    {phase:'payoff',seconds:2.2,description:'The restored station bursts into a full warp celebration.'},
    {phase:'cta',seconds:3,description:'Launch now!'},
   ],
   ctaLabel:'LAUNCH NOW',storeContinuity:'Continue catching Star Cores, restoring ships, and launching warp rescues in the advertised product.',
  },
  hypothesis:{statement:'Immediate drag control and lasting station upgrades make three catches feel like a complete rescue mission.',risk:'A meteor hit or missed core needs fast recovery, fair lanes, and another clear catch opportunity.'},
  presentation:{title:'STAR SALVAGE',subtitle:'Rebuild the station. Launch the rescue.',rewardCopy:'Station online!',palette:{background:'#0d1629',primary:'#1b2b4b',accent:'#ffd166',text:'#f4f8ff'}},
  salvage:{
   assets,sprites:plan.sprites,coreVariants:plan.coreVariants,hazardVariants:plan.hazardVariants,bay:plan.bay,audio:plan.audio,
   seed:plan.seed??9173,rewardRecipe:plan.rewardRecipe,firstHintSeconds:plan.firstHintSeconds,
  },
 };
 const effects={
  'product.gameplayTruth':'catch-rule','product.differentiator':'world-transformation',
  'audience.motivation':'world-transformation','experience.fantasy':'world-transformation',
  'experience.interactionRationale':'catch-rule','hypothesis.statement':'world-transformation',
  'hypothesis.risk':'recovery','experience.storeContinuity':'continuity',
 };
 concept.requirements=Object.entries(effects).map(([source,effect])=>({source,effect,claim:source.split('.').reduce((value,key)=>value[key],concept)}));
 return concept;
}

async function main(){
 const output=resolve(process.argv[2]??'reports/star-salvage');
 const projectId=process.argv[3]??'star-salvage-v2';
 const concept=await createSalvageConcept(),composition=composeNativeConcept(concept),tools=new NativeAgentTools();
 const created=await tools.run({command:'compose',id:projectId,concept});
 await mkdir(output,{recursive:true});
 await writeFile(resolve(output,'concept.json'),JSON.stringify(concept,null,2)+'\n');
 await tools.run({command:'export',id:projectId,output:resolve(output,'playable.html')});
 await tools.run({command:'export',id:projectId,format:'project',output:resolve(output,'editable-project.tora.json')});
 const standalone=await tools.service.export(projectId,{revisionId:created.expected.revisionId,target:'standalone-browser-draft'});
 await writeFile(resolve(output,'manifest.json'),JSON.stringify(standalone.manifest,null,2)+'\n');
 const unity=await tools.service.export(projectId,{revisionId:created.expected.revisionId,target:'unity-ads-ua-playable'});
 await writeFile(resolve(output,'index.html'),unity.html);
 await writeFile(resolve(output,'unity-manifest.json'),JSON.stringify(unity.manifest,null,2)+'\n');
 await writeFile(resolve(output,'composition.json'),JSON.stringify({...created,assetPolicy:composition.assetPolicy,rewardRecipe:composition.recipe,assetPlan:'Kenney Space Shooter Redux visuals and verified CC0 arcade-pop audio. Original media and licensing receipts remain available in the repository.',destinationStatus:'Demonstration destination. Product ownership and store continuity require owner validation.'},null,2)+'\n');
 process.stdout.write(JSON.stringify({projectId,output,status:created.status})+'\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
