import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import {NativeAgentTools} from './agent-tools.mjs';
import {composeNativeConcept} from './concept.mjs';

const assetRoot=resolve(import.meta.dirname,'../../../assets/kenney-harvest');

// This client supplies a licensed asset plan. Scene and game construction belong
// to the public composer so both MCP and CLI callers receive the same module.
export async function createHarvestConcept(planFile=resolve(assetRoot,'plan.json')){
 const plan=JSON.parse(await readFile(planFile,'utf8'));
 const assets=await Promise.all(plan.assets.map(async record=>{
  const {file,...asset}=record;
  return {...asset,data:(await readFile(resolve(dirname(planFile),file))).toString('base64')};
 }));
 const concept={
  format:'tora-creative-concept-2',id:'tiny-harvest',
  product:{
   name:'Tiny Harvest',storeUrl:'https://play.google.com/store/apps/details?id=com.playablelab.garden',
   gameplayTruth:'Swipe neighboring crops to match three, harvest them, and restore a miniature farm.',
   differentiator:'Every successful harvest grows a lasting part of the same farm.',
  },
  audience:{segment:'Players who enjoy cozy farming and crop matching.',motivation:'Watch a neglected farm become a thriving little home through playful harvests.'},
  experience:{
   fantasy:'Bring a tiny farm back to life.',mechanic:'harvest-restore',
   interactionRationale:'Matching crops directly supplies the orchard, fields, and barn restoration.',
   instruction:'Swipe to match',goal:3,
   arc:[
    {phase:'first-seconds',seconds:2,description:'A quiet little farm is ready to grow.'},
    {phase:'agency',seconds:5,description:'Match crops to grow your farm.'},
    {phase:'escalation',seconds:12,description:'Every harvest brings something back.'},
    {phase:'payoff',seconds:2.2,description:'The orchard, fields, and barn now thrive together.'},
    {phase:'cta',seconds:3,description:'Keep growing!'},
   ],
   ctaLabel:'GROW YOUR FARM',storeContinuity:'Continue crop matching and farm restoration in the advertised product.',
  },
  hypothesis:{statement:'Harvests that visibly grow the same farm reward players seeking lasting creative progress.',risk:'A wrong swap or uncertain move needs gentle recovery and a visible hint.'},
  presentation:{title:'TINY HARVEST',subtitle:'',rewardCopy:'Well done!',palette:{background:'#8bbc72',primary:'#3c2933',accent:'#ffe6ab',text:'#3c2933'}},
  harvest:{assets,tiles:plan.tiles,world:plan.world,audio:plan.audio,seed:plan.seed??41},
 };
 // Existing concept strings are nonempty. The small header supplies the brand.
 concept.presentation.subtitle='A little farm to call your own';
 const effects={
  'product.gameplayTruth':'match-rule','product.differentiator':'world-transformation',
  'audience.motivation':'world-transformation','experience.fantasy':'world-transformation',
  'experience.interactionRationale':'match-rule','hypothesis.statement':'world-transformation',
  'hypothesis.risk':'recovery','experience.storeContinuity':'continuity',
 };
 concept.requirements=Object.entries(effects).map(([source,effect])=>({source,effect,claim:source.split('.').reduce((value,key)=>value[key],concept)}));
 return concept;
}

async function main(){
 const output=resolve(process.argv[2]??'reports/tiny-harvest');
 const projectId=process.argv[3]??'tiny-harvest-v2';
 const concept=await createHarvestConcept();
 const composition=composeNativeConcept(concept);
 const tools=new NativeAgentTools();
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
 await writeFile(resolve(output,'composition.json'),JSON.stringify({...created,assetPolicy:composition.assetPolicy,assetPlan:'Kenney Tiny Farm pixel sprites form one continuous farm and its matching crops. Original downloaded media and licensing receipts remain available in the repository.',destinationStatus:'Demonstration destination. Product ownership and store continuity require owner validation.'},null,2)+'\n');
 process.stdout.write(JSON.stringify({projectId,output,status:created.status})+'\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
