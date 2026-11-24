import {mkdtemp,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {ProjectStore} from '../project-store.mjs';
import {EditorState} from '../editor-state.mjs';
import {NativeService} from './service.mjs';
import {NativeReview} from './review.mjs';
import {NativeAgentTools} from './agent-tools.mjs';
import {createHarvestConcept} from './author-harvest.mjs';
import {authorProjectThroughService} from './author-primitive-proofs.mjs';

export const DEMO_ALIASES=Object.freeze({
 'tiny-harvest-win-cta':'tiny-harvest',
});

export const DEMO_PROJECTS=Object.freeze([
 Object.freeze({
  id:'tiny-harvest',
  name:'Tiny Harvest',
  genre:'Match-3 farm',
  tagline:'Swipe neighboring crops to harvest and restore a miniature farm.',
  defaultOrientation:'portrait',
  previewBackground:'#8bbc72',
 }),
 Object.freeze({
  id:'traffic-tycoon',
  name:'Traffic Tycoon',
  genre:'Road builder',
  tagline:'Tap glowing gaps to build the road and guide the car from Depot to Market.',
  defaultOrientation:'portrait',
  previewBackground:'#c8eaf2',
 }),
 Object.freeze({
  id:'mini-golf',
  name:'Mini Golf',
  genre:'3D WebGL2 golf',
  tagline:'Drag to aim in 3D, bank off cedar rails, time the moving gate, and launch the ramp.',
  defaultOrientation:'portrait',
  previewBackground:'#b8e2ed',
 }),
]);

export function resolveDemoId(rawId){
 if(typeof rawId!=='string')return null;
 const normalized=DEMO_ALIASES[rawId]??rawId;
 return DEMO_PROJECTS.some(demo=>demo.id===normalized)?normalized:null;
}

export function getDemoMetadata(rawId){
 const id=resolveDemoId(rawId);
 return id?DEMO_PROJECTS.find(demo=>demo.id===id)??null:null;
}

async function isPopulatedProject(service,projectId){
 try{
  const read=await service.read(projectId);
  return Boolean(read?.project?.components?.length);
 }catch{
  return false;
 }
}

async function removeProjectDir(service,projectId){
 await rm(resolve(service.store.root,projectId),{recursive:true,force:true});
 if(service.history?.directory){
  const journalName=createHash('sha256').update(service.store.root+'\0'+projectId).digest('hex');
  await rm(resolve(service.history.directory,journalName+'.json'),{force:true});
  await rm(resolve(service.history.directory,journalName+'.json.lock'),{force:true});
 }
}

export async function materializeDemo(service,rawId,{overwrite=false}={}){
 const meta=getDemoMetadata(rawId);
 if(!meta)throw Error('E_NATIVE_NOT_FOUND');
 const id=meta.id;
 const populated=await isPopulatedProject(service,id);
 if(populated&&!overwrite){
  return {
   id,projectId:id,name:meta.name,genre:meta.genre,tagline:meta.tagline,
   created:false,editorUrl:`/?project=${encodeURIComponent(id)}`,
  };
 }
 // Clean any empty draft or overwritten directory before authoring cleanly through NativeService
 await removeProjectDir(service,id);
 if(id==='tiny-harvest'){
  const agent=new NativeAgentTools(service);
  await agent.run({command:'compose',id,concept:await createHarvestConcept()});
 }else if(id==='traffic-tycoon'){
  await authorProjectThroughService(service,'traffic',id);
 }else if(id==='mini-golf'){
  await authorProjectThroughService(service,'golf',id);
 }
 return {
  id,projectId:id,name:meta.name,genre:meta.genre,tagline:meta.tagline,
  created:true,editorUrl:`/?project=${encodeURIComponent(id)}`,
 };
}

export async function listDemosWithStatus(service){
 const existing=new Set();
 try{
  const projects=await service.store.list();
  for(const p of projects)if(p.kind==='native-scene')existing.add(p.id);
 }catch{
  /* ignore */
 }
 const demos=[];
 for(const meta of DEMO_PROJECTS){
  const installed=existing.has(meta.id)&&await isPopulatedProject(service,meta.id);
  demos.push({...meta,installed});
 }
 return demos;
}

export async function buildDemoSeed(rawId,rootDir=resolve(import.meta.dirname,'../../..')){
 const meta=getDemoMetadata(rawId);
 if(!meta)throw Error(`Unknown demo project: ${rawId}`);
 const tmpDir=await mkdtemp(resolve(rootDir,'reports/demo-seed-'));
 const tmpStore=new ProjectStore(tmpDir);
 try{
  const service=new NativeService(tmpStore,new EditorState(tmpStore));
  await materializeDemo(service,meta.id,{overwrite:true});
  const rev=new NativeReview(service);
  const doc=await service.read(meta.id);
  const [render,metadata,bundle]=await Promise.all([
   service.render(meta.id,doc.revisionId),
   rev.read(meta.id),
   rev.bundle(meta.id),
  ]);
  const unity=await service.export(meta.id,{revisionId:doc.revisionId,target:'unity-ads-ua-playable'});
  const applovin=await service.export(meta.id,{revisionId:doc.revisionId,target:'applovin-growth-playable'});
  const standalone=await service.export(meta.id,{revisionId:doc.revisionId,target:'standalone-browser-draft'});
  const cleanMetadata={
   ...metadata,
   requests:[],
   passesUsed:0,
   feedbackModel:undefined,
   paidFeedbackModel:undefined,
  };
  return {
   id:meta.id,
   meta,
   doc,
   render,
   metadata:cleanMetadata,
   exportedHtml:unity.html,
   unityHtml:unity.html,
   unityManifest:unity.manifest,
   applovinHtml:applovin.html,
   applovinManifest:applovin.manifest,
   standaloneHtml:standalone.html,
   standaloneManifest:standalone.manifest,
   bundleText:bundle.text??JSON.stringify(bundle),
  };
 }finally{
  await rm(tmpDir,{recursive:true,force:true});
 }
}
