/** Local MCP stdio adapter, legacy protocol 2025-11-25. stdout is protocol only. */
import process from 'node:process';
import {Buffer} from 'node:buffer';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ProjectStore} from '../project-store.mjs';
import {EditorState} from '../editor-state.mjs';
import {NativeService} from './service.mjs';
import {NativeAgentTools} from './agent-tools.mjs';
import {availablePacks,capabilities,capabilitiesForPacks,capabilitySummary,compactCapabilities} from './contracts.mjs';
import {NativeReview} from './review.mjs';
import {reviewRoutingFlags} from './review-resolver.mjs';
import {ReviewIntake} from './review-intake.mjs';
import {targets} from './network-targets.mjs';
import {readOriginal,readUploadFile} from './assets.mjs';
import {AssetCatalog} from './asset-catalog.mjs';
import {RemoteCc0Fetcher} from './remote-cc0-fetcher.mjs';
import {stageVerifiedCc0Assets} from './cc0-staging.mjs';
import {prepAssets,resolvePreparedProvenance} from './asset-prep.mjs';
import {mapWithConcurrency} from './concurrency.mjs';
import {closeSharedBrowser,getSharedBrowser} from './browser-pool.mjs';
import {PACKAGE_ROOT,defaultStoreRoot,resolveWorkspaceRoot} from '../runtime-paths.mjs';

const string={type:'string'},boolean={type:'boolean'},integer={type:'integer'},strings={type:'array',items:string};
const expected={type:'object',properties:{revisionId:string,contentHash:string},required:['revisionId','contentHash'],additionalProperties:false};
const assetSchema={type:'object',properties:{id:string,mime:{type:'string',enum:['image/png','image/jpeg','audio/wav','audio/mpeg','model/tora-mesh']},data:string,sourceHash:string,rights:string,optimize:{type:'string',enum:['auto','lossless','none']},preserveResolution:boolean},required:['id','mime','rights'],additionalProperties:false};
const sliceGridSchema={type:'object',properties:{cols:integer,rows:integer,margin:integer,spacing:integer,trimCells:boolean,skipEmpty:boolean,maxFrames:integer,outputMode:{type:'string',enum:['frames','strip']}},required:['cols','rows'],additionalProperties:false};
const prepItemSchema={type:'object',properties:{filePath:string,sourceId:string,outputPrefix:string,rights:string,styleFamily:string,crop:{type:'array',items:integer},trim:boolean,alphaThreshold:integer,paddingPx:integer,resize:{type:'array',items:integer},maxSide:integer,allowDeform:boolean,sliceGrid:sliceGridSchema},additionalProperties:false};
const stageCc0ItemSchema={type:'object',properties:{sourceId:string,assetId:string,optimize:{type:'string',enum:['auto','lossless','none']},preserveResolution:boolean},required:['sourceId'],additionalProperties:false};

export const tools=[];
function define(name,description,properties={},required=[],readOnly=false){tools.push({name:'tora_'+name,description,inputSchema:{type:'object',properties,required,additionalProperties:false},annotations:{readOnlyHint:readOnly,destructiveHint:!readOnly,openWorldHint:false}});}
define('brief','Read current production instructions and core authoring documentation. Load domain guides with packs or legacy full references with full:true. Pass alreadyRead:[{name,sha256}] on re-reads to omit unchanged docs.',{packs:strings,full:boolean,alreadyRead:{type:'array',items:{type:'object',properties:{name:string,sha256:string},required:['name','sha256'],additionalProperties:false}}},[],true);
define('capabilities','Discover supported contracts. Use packs for domains, names for exact descriptors, summary for the pack index, format:"compact" for concise schema with units, or omit all for the full registry.',{names:strings,packs:strings,summary:boolean,format:{type:'string',enum:['full','compact']}},[],true);
define('compose','Compose an editable playable from a structured creative concept and prepared artwork. Read tora_brief and discover creative-concept capabilities first. Returns creative review status and requirement trace.',{id:string,name:string,concept:{type:'object'}},['id','concept']);
define('create','Create an empty editable native project. Read tora_brief first.',{id:string,name:string,androidUrl:string},['id','name']);
define('inspect','Inspect current state and revision identity. Use tree:true for a compact scene outline, narrow with ids/search, or full:true for the complete project.',{id:string,revisionId:string,ids:strings,fields:strings,search:string,full:boolean,tree:boolean,sceneId:string},['id'],true);
define('edit','Preview and commit native operations against expected revision. Supply operations or commitPreviewDigest (not both). Scope lists intended changed IDs; scopeCreates:true auto-allows brand-new records whose pre-existing targets are in scope.',{id:string,expected,operations:{type:'array',items:{type:'object'}},scope:strings,previewOnly:boolean,previewDigest:string,commitPreviewDigest:string,scopeCreates:boolean},['id','expected','scope']);
define('list_assets','Search verified local and cached CC0 assets with dimensions and style families. Set includeRemote:true to also search allowlisted Kenney/OpenGameArt CC0 packs.',{query:string,kind:{type:'string',enum:['sprite','audio','mesh']},styleFamily:string,includeRemote:boolean,limit:integer},[],true);
define('fetch_cc0_pack','Fetch, license-verify, and cache one allowlisted Kenney or OpenGameArt CC0 pack into the active workspace cache.',{sourceUrl:string,packId:string,fileFilter:string},['sourceUrl']);
define('stage_cc0_assets','Stage up to 32 verified local or cached remote CC0 assets into a project in one atomic revision with server-enforced provenance and single visual style family.',{id:string,expected,items:{type:'array',items:stageCc0ItemSchema}},['id','expected','items']);
define('prep_assets','Faithfully prepare PNG/JPEG assets mechanically (crop, trim transparent padding, aspect-safe resize, or grid slice) into .tora/prepared-assets with hash-bound provenance receipts for tora_upload_assets.',{items:{type:'array',items:prepItemSchema}},['items']);
define('upload_asset','Upload and optimize PNG/JPEG/WAV/MP3 up to 8 MiB, or register a Tora mesh. Supply base64 data, a workspace filePath, or sourceHash from a retained original. Auto is default; lossless/none and preserveResolution are optional.',{id:string,expected,filePath:string,asset:assetSchema},['id','expected','asset']);
define('upload_assets','Batch upload and optimize up to 32 PNG/JPEG/WAV/MP3/mesh assets in one atomic revision. Prefer workspace filePath (avoids the 12 MiB MCP frame limit) or supply base64 data / retained sourceHash.',{id:string,expected,items:{type:'array',items:{type:'object',properties:{filePath:string,asset:assetSchema},required:['asset'],additionalProperties:false}}},['id','expected','items']);
define('render','Write an HTML scene preview to output. Open it in a browser for visual inspection; this tool does not capture screenshots.',{id:string,revisionId:string,sceneId:string,output:string},['id','output']);
define('qa','Run deterministic static, acoustic, four-viewport layout, primary-interaction, and motion filmstrip QA on a native revision. Pass recordVideo:true for an opt-in WebM clip. A pass is engineering verification, not creative, device, or network acceptance.',{id:string,revisionId:string,output:string,target:{type:'string',enum:[...targets]},motionFilmstrip:boolean,recordVideo:boolean},['id']);
define('export','Write standalone HTML, any of seven ad-network HTML/ZIP artifacts, a batch of targets to outputDir, or an editable project bundle. Network exports must pass Creative QA; project format exports the current working head. Passing QA is not visual, device, or network approval.',{id:string,revisionId:string,output:string,format:{type:'string',enum:['project']},target:{type:'string',enum:[...targets]},targets:{type:'array',items:{type:'string',enum:[...targets]}},outputDir:string},['id']);
define('history','Save, undo or redo against expected revision.',{id:string,expected,action:{type:'string',enum:['save','undo','redo']}},['id','expected','action']);
define('review_claim','Claim an editor review request and read its authorized fields. Inspect the baseline and follow the selected scope.',{id:string,requestId:string},['id','requestId']);
define('review_propose','Submit one creative revision against the claimed review request. For a note list, key changes by scoped note ID and then by authorized field ID. For older single-note requests, key changes directly by field ID. Each unique proposalId (UUID) counts as one pass. Wait for creator review before another proposal.',{id:string,requestId:string,proposalId:string,changes:{type:'object'},summary:string},['id','requestId','proposalId','changes','summary']);
define('review_resolve','Run an enabled deterministic review intent through the shared native candidate service. Does not promote the candidate.',{id:string,requestId:string},['id','requestId']);
define('review_needs_scope','Explain why a claimed note needs a different or broader edit before attempting it.',{id:string,requestId:string,reason:string},['id','requestId','reason']);
define('intake_read','Read a local studio intake and list source asset IDs and the brief.',{id:string},['id'],true);
define('intake_claim','Claim a submitted studio intake. Use the Harvest Restore or Star Salvage concept contract selected by the intake and reference the retained asset IDs.',{id:string},['id']);
define('intake_build','Build the initial Harvest Restore or Star Salvage playable from an intake with its v2 concept. Omit harvest.assets or salvage.assets, which are resolved from the intake.',{id:string,concept:{type:'object'}},['id']);

function valid(value,schema){
 if(schema.type==='object'){if(!value||typeof value!=='object'||Array.isArray(value))return false;if(schema.required?.some(k=>!Object.hasOwn(value,k)))return false;if(schema.additionalProperties===false&&Object.keys(value).some(k=>!Object.hasOwn(schema.properties,k)))return false;return Object.entries(schema.properties??{}).every(([k,s])=>!Object.hasOwn(value,k)||valid(value[k],s));}
 if(schema.type==='array')return Array.isArray(value)&&value.every(v=>valid(v,schema.items));
 if(schema.type==='integer')return Number.isInteger(value);
 return typeof value===schema.type&&(!schema.enum||schema.enum.includes(value));
}

const error=(id,code,message)=>({jsonrpc:'2.0',id,error:{code,message}});

export function createMcpServer({
 workspaceRoot,
 storeRoot,
 browserProvider=getSharedBrowser,
 catalog,
 remoteFetcher,
}={}){
 const ws=resolveWorkspaceRoot(workspaceRoot);
 const resolvedStoreRoot=storeRoot?resolve(ws,storeRoot):defaultStoreRoot(ws);
 const store=new ProjectStore(resolvedStoreRoot,{workspaceRoot:ws});
 const service=new NativeService(store,new EditorState(store),{browserProvider});
 const agent=new NativeAgentTools(service);
 const review=new NativeReview(service,{deterministic:reviewRoutingFlags().deterministic});
 const intakes=new ReviewIntake(service);
 const assetCatalog=catalog??new AssetCatalog({root:PACKAGE_ROOT});
 const cc0Fetcher=remoteFetcher??new RemoteCc0Fetcher({workspaceRoot:ws,catalog:assetCatalog});

 let initialized=false,ready=false,briefRead=false;

 async function call(name,args){
  const tool=tools.find(t=>t.name===name);if(!tool)throw Error('E_MCP_UNKNOWN_TOOL');if(!valid(args,tool.inputSchema))throw Error('E_MCP_ARGUMENT');
  if(name==='tora_brief'){
   const resolvePlayableBrief=async()=>{
    if(process.env.TORA_PLAYABLE_BRIEF){
     const explicit=resolve(process.env.TORA_PLAYABLE_BRIEF);
     return {name:'playable',path:explicit,text:await readFile(explicit,'utf8')};
    }
    for(const candidate of [resolve(homedir(),'.codex/PLAYABLE_AI_MASTER.md'),resolve(PACKAGE_ROOT,'docs/PLAYABLE_BRIEF.md')]){
     try{return {name:'playable',path:candidate,text:await readFile(candidate,'utf8')};}
     catch(err){if(err.code!=='ENOENT')throw err;}
    }
    throw Error('E_MCP_BRIEF_UNAVAILABLE');
   };
   const requested=args.packs??[];
   if(new Set(requested).size!==requested.length||requested.some(id=>!availablePacks.some(pack=>pack.id===id)))throw Error('E_MCP_UNKNOWN_PACK');
   const domainPacks=requested.filter(id=>id!=='core');
   const files=[
    ['production',resolve(PACKAGE_ROOT,'PRODUCTION_MASTER.md')],
    ['winEffectsAndCta',resolve(PACKAGE_ROOT,'skills/tora-playables/references/win-effects-and-cta.md')],
    ['uiFundamentals',resolve(PACKAGE_ROOT,'skills/tora-ui-fundamentals/SKILL.md')],
    ['authoring',resolve(PACKAGE_ROOT,'docs/reference/CORE_AUTHORING.md')],
    ...domainPacks.map(id=>['pack:'+id,resolve(PACKAGE_ROOT,`docs/reference/packs/${id}.md`)]),
    ...(args.full?[['fullAuthoring',resolve(PACKAGE_ROOT,'docs/TORA_CREATION_API.md')],['agentTools',resolve(PACKAGE_ROOT,'docs/NATIVE_AGENT_TOOLS.md')]]:[]),
   ];
   let rawDocuments;
   try{
    const [playable,...rest]=await Promise.all([resolvePlayableBrief(),...files.map(async([docName,path])=>({name:docName,path,text:await readFile(path,'utf8')}))]);
    rawDocuments=[rest[0],playable,...rest.slice(1)];
   }catch{throw Error('E_MCP_BRIEF_UNAVAILABLE');}
   const known=new Map((args.alreadyRead??[]).map(entry=>[entry.name,entry.sha256]));
   const digests={};
   const documents=rawDocuments.map(doc=>{
    const sha256='sha256:'+createHash('sha256').update(doc.text,'utf8').digest('hex');
    digests[doc.name]=sha256;
    if(known.get(doc.name)===sha256)return {name:doc.name,path:doc.path,sha256,omitted:true};
    return doc;
   });
   briefRead=true;return {documents,digests,availablePacks:availablePacks.map(({id,description})=>({id,description})),store:store.root,workspace:ws,instructions:'Apply these briefs. Establish one coherent visual style and an asset plan before implementation. Use the retained, authorized studio assets for studio intake. For sourced packs use free third-party libraries with verified commercial-use license evidence, author, source URL, and source hashes. Keep visual assets within one style family; audio may use a separate compatible pack. Asset creation and image generation are outside this authoring workflow. Inspect packaged screenshots and footage; tests do not establish visual quality. Use connected browser tools to inspect actual exported output.'};
  }
  if(name==='tora_capabilities'){
   if(args.summary)return capabilitySummary();
   if(args.format==='compact'){
    if(args.names)return agent.run({command:'contracts',names:args.names,packs:args.packs,format:'compact'});
    return compactCapabilities({packs:args.packs});
   }
   if(args.packs){const scoped=capabilitiesForPacks(args.packs);if(!args.names)return scoped;}
   return args.names||args.packs?agent.run({command:'contracts',names:args.names,packs:args.packs}):capabilities();
  }
  if(name==='tora_list_assets'){
   const result=await cc0Fetcher.search({
    query:args.query??'',
    kind:args.kind,
    styleFamily:args.styleFamily,
    includeRemote:args.includeRemote===true,
    limit:args.limit??40,
   });
   return {
    summary:assetCatalog.summary(),
    online:result.online,
    ...(result.warning?{warning:result.warning}:{}),
    assets:result.assets,
    cachedRemoteCount:result.cachedRemoteMatches?.length??0,
    remotePacks:result.remotePacks,
   };
  }
  if(!['tora_inspect'].includes(name)&&!briefRead)throw Error('E_MCP_READ_BRIEF_FIRST');
  if(name==='tora_fetch_cc0_pack'){
   const receipt=await cc0Fetcher.fetchPackWithFallback({sourceUrl:args.sourceUrl,packId:args.packId,fileFilter:args.fileFilter});
   return {
    online:receipt.online!==false,
    ...(receipt.warning?{warning:receipt.warning}:{}),
    ...(receipt.error?{error:receipt.error}:{}),
    ...(receipt.sourceId?{sourceId:receipt.sourceId,provider:receipt.provider,packTitle:receipt.packTitle,author:receipt.author,license:receipt.license,sourceUrl:receipt.sourceUrl,cached:Boolean(receipt.cached)}:{}) ,
    files:(receipt.files??[]).map(({id,name:fileName,path,kind,mime,bytes,sha256,width,height,durationSec,styleFamily})=>({id,name:fileName,path,kind,mime,bytes,sha256,styleFamily,...(width!==undefined?{width,height}:{}),...(durationSec!==undefined?{durationSec}:{})})),
    ...(receipt.fallbackLocalMatches?{fallbackLocalMatches:receipt.fallbackLocalMatches}:{}),
   };
  }
  if(name==='tora_stage_cc0_assets'){
   const r=await stageVerifiedCc0Assets({service,projectId:args.id,expected:args.expected,items:args.items,catalog:assetCatalog,remoteFetcher:cc0Fetcher});
   return {status:'STAGED',assets:r.assets,expected:{revisionId:r.revisionId,contentHash:r.contentHash}};
  }
  if(name==='tora_prep_assets'){
   return prepAssets({workspaceRoot:ws,items:args.items,catalog:assetCatalog,remoteFetcher:cc0Fetcher});
  }
  if(name==='tora_review_claim')return review.claim(args.id,args.requestId);
  if(name==='tora_review_propose')return review.propose(args.id,args);
  if(name==='tora_review_resolve'){
   const result=await review.resolveDeterministic(args.id,args.requestId);
   if(!result)throw Error('E_REVIEW_INTENT_UNSUPPORTED');
   return result;
  }
  if(name==='tora_review_needs_scope')return review.needsScope(args.id,args.requestId,args.reason);
  if(name==='tora_intake_read')return intakes.read(args.id);
  if(name==='tora_intake_claim')return intakes.claim(args.id);
  if(name==='tora_intake_build')return intakes.build(args.id,args.concept?{concept:args.concept}:{});
  if(name==='tora_upload_asset'){
   const current=await service.read(args.id);if(current.revisionId!==args.expected.revisionId||current.contentHash!==args.expected.contentHash)throw Error('E_NATIVE_STALE');
   const asset={...args.asset},sources=[Boolean(args.filePath),Boolean(asset.data),Boolean(asset.sourceHash)];if(sources.filter(Boolean).length!==1)throw Error('E_MCP_ARGUMENT');
   let provenance;
   if(args.filePath){
    const bytes=await readUploadFile(ws,args.filePath);
    const prepared=await resolvePreparedProvenance(ws,args.filePath,bytes);
    if(prepared){
     provenance=prepared.provenance;
     if(prepared.rights&&!prepared.provenance.includes('"studio-original"'))asset.rights=prepared.rights;
    }
    asset.data=bytes.toString('base64');
   }
   if(asset.sourceHash){asset.data=(await readOriginal(resolve(store.root,args.id),asset.sourceHash)).toString('base64');delete asset.sourceHash;}
   const r=await service.upload(args.id,{...args,asset,...(provenance?{provenance}:{})});return {status:'UPLOADED',asset:r.asset,expected:{revisionId:r.revisionId,contentHash:r.contentHash}};
  }
  if(name==='tora_upload_assets'){
   if(!Array.isArray(args.items)||args.items.length<1||args.items.length>32)throw Error('E_MCP_ARGUMENT');
   const current=await service.read(args.id);if(current.revisionId!==args.expected.revisionId||current.contentHash!==args.expected.contentHash)throw Error('E_NATIVE_STALE');
   for(const item of args.items){
    const sources=[Boolean(item.filePath),Boolean(item.asset?.data),Boolean(item.asset?.sourceHash)];
    if(sources.filter(Boolean).length!==1)throw Error('E_MCP_ARGUMENT');
   }
   const assets=await mapWithConcurrency(args.items,4,async item=>{
    const asset={...item.asset};
    if(item.filePath){
     const bytes=await readUploadFile(ws,item.filePath);
     const prepared=await resolvePreparedProvenance(ws,item.filePath,bytes);
     if(prepared){
      asset.provenance=prepared.provenance;
      if(prepared.rights&&!prepared.provenance.includes('"studio-original"'))asset.rights=prepared.rights;
     }
     asset.data=bytes.toString('base64');
    }
    return asset;
   });
   const r=await service.uploadBatch(args.id,{expected:args.expected,assets});
   return {status:'UPLOADED',assets:r.assets,expected:{revisionId:r.revisionId,contentHash:r.contentHash}};
  }
  if(name==='tora_export'&&args.format==='project'&&args.revisionId)throw Error('E_MCP_PROJECT_EXPORT_HEAD_ONLY');
  if(name==='tora_export'){
   const isBatch=args.targets!==undefined;
   if(isBatch&&(args.output||args.target||args.format||!args.outputDir))throw Error('E_MCP_ARGUMENT');
   if(!isBatch&&(!args.output||args.outputDir))throw Error('E_MCP_ARGUMENT');
  }
  return agent.run({...args,command:name.slice(5)});
 }

 async function dispatch(request){
  if(!request||Array.isArray(request)||request.jsonrpc!=='2.0'||typeof request.method!=='string')return error(request?.id??null,-32600,'Invalid Request');
  const notification=!Object.hasOwn(request,'id');
  if(notification){if(request.method==='notifications/initialized'&&initialized)ready=true;return;}
  const {id,method}=request;
  if(method==='initialize'){if(initialized)return error(id,-32600,'Already initialized');if(!request.params?.protocolVersion)return error(id,-32602,'Missing protocolVersion');initialized=true;return {jsonrpc:'2.0',id,result:{protocolVersion:'2025-11-25',serverInfo:{name:'tora',version:'0.1.0'},capabilities:{tools:{}},instructions:'Use tora_brief before authoring. Follow current production rules and inspect actual visual output. Use tora_capabilities for supported contracts. This local service shares Tora native project storage; no HTTP endpoint is needed.'}};}
  if(method==='ping')return {jsonrpc:'2.0',id,result:{}};
  if(!ready)return error(id,-32000,'Initialize first');
  if(method==='tools/list')return {jsonrpc:'2.0',id,result:{tools}};
  if(method!=='tools/call')return error(id,-32601,'Method not found');
  try{
   const result=await call(request.params?.name,request.params?.arguments??{});
   const content=[];
   if(request.params.name==='tora_review_claim'){
    const {frame,frames,...details}=result;
    content.push({type:'text',text:JSON.stringify(details)});
    if(frame)content.push({type:'image',mimeType:'image/jpeg',data:frame});
    for(const {noteId,data} of frames??[]){
     content.push({type:'text',text:'Frozen frame for note '+noteId},{type:'image',mimeType:'image/jpeg',data});
    }
   }else content.push({type:'text',text:JSON.stringify(result)});
   return {jsonrpc:'2.0',id,result:{content}};
  }catch(e){
   const code=/^E_[A-Z0-9_]+$/.test(e.message)?e.message:'E_MCP_FAILED';
   const payload={status:'REJECTED',code,...(e.detail?{detail:e.detail}:{}),...(e.creativeQa?{creativeQa:e.creativeQa}:{})};
   return {jsonrpc:'2.0',id,result:{isError:true,content:[{type:'text',text:JSON.stringify(payload)}]}};
  }
 }

 return {dispatch,store,service,workspaceRoot:ws,close:closeSharedBrowser};
}

let defaultServer=null;
export async function dispatch(request){
 defaultServer??=createMcpServer();
 return defaultServer.dispatch(request);
}

export async function startMcpServer(options={}){
 const server=createMcpServer(options);
 const shutdown=()=>{void server.close().finally(()=>process.exit(0));};
 process.once('SIGINT',shutdown);
 process.once('SIGTERM',shutdown);
 let pending=Buffer.alloc(0);
 try{
  for await(const chunk of process.stdin){
   pending=Buffer.concat([pending,chunk]);
   let newline;
   while((newline=pending.indexOf(10))!==-1){
    const line=pending.subarray(0,newline);
    pending=pending.subarray(newline+1);
    if(line.length>12582912)throw Error('E_MCP_INPUT_LIMIT');
    if(!line.length)continue;
    let request,response;
    try{request=JSON.parse(line.toString('utf8'));}catch{response=error(null,-32700,'Parse error');}
    response??=await server.dispatch(request);
    if(response)process.stdout.write(JSON.stringify(response)+'\n');
   }
   if(pending.length>12582912)throw Error('E_MCP_INPUT_LIMIT');
  }
 }finally{
  await server.close();
 }
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 await startMcpServer().catch(()=>{process.stderr.write('Tora MCP transport failed\n');process.exitCode=1;});
}
