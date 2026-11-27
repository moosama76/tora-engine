import process from 'node:process';
import {Buffer} from 'node:buffer';
import {parseAuthoringJson} from '../../../packages/creative-project/src/strict-json.ts';
import {capabilities,capabilitiesForPacks,capabilitySummary,compactCapabilities,limits} from './contracts.mjs';
import {buildInspectTree,NativeAgentTools} from './agent-tools.mjs';
import {check,exact} from './document.mjs';
import {NativeReview} from './review.mjs';
import {ReviewConnection} from './review-connection.mjs';
import {configuredReviewAgent,configuredReviewInterpreter,reviewRoutingFlags} from './review-resolver.mjs';
import {reviewProviderConfig} from './review-provider.mjs';
import {ReviewIntake} from './review-intake.mjs';
import {reviewRuntimeBundle} from './compiler.mjs';
import {composeFromFreePack,freePackPreview,listFreePacks} from './chat-compose.mjs';
import {listDemosWithStatus,materializeDemo} from './demos.mjs';
import {AssetCatalog} from './asset-catalog.mjs';
import {RemoteCc0Fetcher} from './remote-cc0-fetcher.mjs';
import {stageVerifiedCc0Assets} from './cc0-staging.mjs';
import {prepAssets} from './asset-prep.mjs';
import {PACKAGE_ROOT} from '../runtime-paths.mjs';

const connectionErrors={
 E_REVIEW_KEY_FORMAT:400,E_REVIEW_KEY_SAVE:500,E_MODEL_AUTH:401,E_MODEL_FORBIDDEN:403,
 E_MODEL_QUOTA:402,E_MODEL_UNAVAILABLE:422,E_MODEL_UNSUPPORTED_CAPABILITY:422,
 E_MODEL_RATE_LIMIT:429,E_MODEL_TIMEOUT:504,E_MODEL_TRANSPORT:502,
 E_MODEL_UPSTREAM:502,E_MODEL_REQUEST:502,
};
export function nativeApi(service,connection=new ReviewConnection(service.store.root),{agentFactory,catalog,remoteFetcher}={}){
 const intakes=new ReviewIntake(service,{connection,agentFactory});
 const assetCatalog=catalog??new AssetCatalog({root:PACKAGE_ROOT});
 const cc0Fetcher=remoteFetcher??new RemoteCc0Fetcher({workspaceRoot:service.store.workspaceRoot,catalog:assetCatalog});
 const providerForConnection=async()=>{
  if(process.env.TORA_REVIEW_PROVIDER){
   const config=reviewProviderConfig();
   return {
    config,
    info:config?{
     provider:config.provider,
     providerLabel:config.provider,
     model:config.model,
     modelLabel:config.model,
     vision:Boolean(config.vision),
     verified:config.provider!=='orca'&&config.provider!=='openai-compatible',
    }:undefined,
   };
  }
  const active=await connection.read();
  if(!active)return {config:undefined,info:undefined};
  const config=reviewProviderConfig({
   provider:active.provider,
   model:active.model,
   endpoint:active.endpoint,
   apiKey:active.apiKey,
   vision:active.vision,
  });
  return {
   config,
   info:{
    provider:active.provider,
    providerLabel:active.providerLabel,
    model:active.model,
    modelLabel:active.modelLabel,
    capabilities:active.capabilities,
    audioSummary:active.audioSummary,
    videoSummary:active.videoSummary,
    verified:Boolean(active.verified),
    legacy:Boolean(active.legacy),
   },
  };
 };
 const reviewForConnection=async()=>{
  const {config:provider,info:connectionInfo}=await providerForConnection();
  const routing=reviewRoutingFlags();
  return new NativeReview(service,{
   agent:configuredReviewAgent(provider,connection.fetch),
   interpreter:routing.interpretation?configuredReviewInterpreter(provider,connection.fetch):undefined,
   deterministic:routing.deterministic,
   connectionInfo,
  });
 };
 return async(req,res,url,port)=>{
 const match=/^\/api\/projects\/([a-z][a-z0-9-]{1,47})(?:\/(transactions\/preview|transactions|history|accept|export|render|review|stage-cc0|assets(?:\/[a-z][a-z0-9_.-]{0,95})?))?$/.exec(url.pathname);
 const intake=/^\/api\/review-intakes(?:\/([a-f0-9-]{36})(?:\/(submit|assets|references|cancel|retry)(?:\/([a-z0-9_.-]+))?)?)?$/.exec(url.pathname);
 const previewMatch=/^\/api\/catalog\/preview\/([a-z0-9-]+)$/.exec(url.pathname);
 const connectionRoute=url.pathname==='/api/review/connection';
 const catalogRoute=url.pathname==='/api/catalog/packs';
 const assetsCatalogRoute=url.pathname==='/api/assets/catalog';
 const assetsFetchRoute=url.pathname==='/api/assets/fetch-cc0';
 const assetsPrepRoute=url.pathname==='/api/assets/prep';
 const fromChatRoute=url.pathname==='/api/projects/from-chat';
 const demosRoute=url.pathname==='/api/demos';
 const demosOpenRoute=url.pathname==='/api/demos/open';
 const top=connectionRoute||catalogRoute||assetsCatalogRoute||assetsFetchRoute||assetsPrepRoute||fromChatRoute||demosRoute||demosOpenRoute||['/api/open','/api/creation/capabilities','/api/projects'].includes(url.pathname);
 if(!match&&!intake&&!previewMatch&&!top&&url.pathname!=='/review-runtime.js')return false;
 const json=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(value));};
 try{check(req.headers.host==='127.0.0.1:'+port,'E_NATIVE_ORIGIN');
 if(url.pathname==='/review-runtime.js'){
  check(req.method==='GET','E_NATIVE_METHOD');
  res.setHeader('Content-Type','text/javascript');res.end(await reviewRuntimeBundle());return true;
 }
 if(catalogRoute){
  check(req.method==='GET','E_NATIVE_METHOD');
  json(200,await listFreePacks());return true;
 }
 if(assetsCatalogRoute){
  check(req.method==='GET','E_NATIVE_METHOD');
  const limitParam=url.searchParams.get('limit');
  const limit=limitParam!==null?Number(limitParam):40;
  check(Number.isInteger(limit)&&limit>=1&&limit<=100,'E_NATIVE_ARGUMENT');
  const result=await cc0Fetcher.search({
   query:url.searchParams.get('query')??'',
   kind:url.searchParams.get('kind')??undefined,
   styleFamily:url.searchParams.get('styleFamily')??undefined,
   includeRemote:url.searchParams.get('includeRemote')==='1'||url.searchParams.get('includeRemote')==='true',
   limit,
  });
  json(200,{summary:assetCatalog.summary(),online:result.online,...(result.warning?{warning:result.warning}:{}),assets:result.assets,cachedRemoteCount:result.cachedRemoteMatches?.length??0,remotePacks:result.remotePacks});
  return true;
 }
 if(demosRoute){
  check(req.method==='GET','E_NATIVE_METHOD');
  json(200,{demos:await listDemosWithStatus(service)});return true;
 }
 if(previewMatch){
  check(req.method==='GET','E_NATIVE_METHOD');
  const file=await freePackPreview(previewMatch[1]);
  res.writeHead(200,{'Content-Type':file.mime,'X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=3600'});
  res.end(file.bytes);return true;
 }
 if(connectionRoute&&req.method==='GET'){
  json(200,await connection.status());return true;
 }
 if(intake&&req.method==='GET'){
  const [,id,route,assetId]=intake;
  if((route==='assets'||route==='references')&&assetId){
   const asset=route==='references'?await intakes.referenceAsset(id,assetId):await intakes.asset(id,assetId);
   res.writeHead(200,{'Content-Type':asset.mime,'X-Content-Type-Options':'nosniff'});res.end(asset.bytes);
  }else{
   check(id&&!route,'E_NATIVE_METHOD');json(200,await intakes.read(id));
  }
  return true;
 }
 if(match?.[2]==='review'&&req.method==='GET'){
  const review=await reviewForConnection();
  const candidate=url.searchParams.get('candidate');
  json(200,candidate?await review.candidate(match[1],candidate):url.searchParams.get('bundle')==='1'?await review.bundle(match[1]):await review.read(match[1]));
  return true;
 }
 if(req.method==='GET'){if(url.pathname==='/api/open'){const id=url.searchParams.get('project'),opened=await service.store.open(id);if(opened.project.base.kind!=='native-scene')return false;const result=await service.read(id);json(200,{...result,projectId:id,inputKind:'native-scene-document'});return true;}if(url.pathname==='/api/creation/capabilities'){const summary=url.searchParams.get('summary'),format=url.searchParams.get('format'),packsParam=url.searchParams.get('packs'),namesParam=url.searchParams.get('names');if(summary==='1'||summary==='true'){json(200,capabilitySummary());return true;}check(format===null||format==='full'||format==='compact','E_NATIVE_ARGUMENT');const packs=packsParam?packsParam.split(',').filter(Boolean):undefined,names=namesParam?namesParam.split(',').filter(Boolean):undefined;if(format==='compact'){json(200,compactCapabilities({packs,names}));return true;}if(names){const tools=new NativeAgentTools(service);json(200,await tools.run({command:'contracts',packs,names}));return true;}json(200,packs?capabilitiesForPacks(packs):capabilities());return true;}else if(url.pathname==='/api/projects'){const projects=await service.store.list();for(const p of projects)if(p.kind==='native-scene'){const r=await service.read(p.id);p.workingRevision=r.revisionId;}json(200,{projects});}else if(match?.[2]==='render')json(200,await service.render(match[1],url.searchParams.get('revision')));else if(match?.[2]?.startsWith('assets/')){const r=await service.read(match[1]),asset=r.project.assets.find(a=>a.id===match[2].slice(7));check(asset,'E_NATIVE_NOT_FOUND');json(200,asset);}else if(match&&!match[2]){const current=await service.read(match[1],url.searchParams.get('revision')??undefined);const tree=url.searchParams.get('tree');json(200,tree==='1'||tree==='true'?buildInspectTree(match[1],current,url.searchParams.get('sceneId')??undefined):current);}else check(false,'E_NATIVE_METHOD');return true;}
 check(req.method==='POST','E_NATIVE_METHOD');check(req.headers.origin==='http://127.0.0.1:'+port,'E_NATIVE_ORIGIN');check(req.headers['content-type']==='application/json','E_NATIVE_CONTENT_TYPE');req.setTimeout(10000,()=>req.destroy());let bytes=0;const chunks=[];const assetUpload=match?.[2]==='assets'||intake?.[2]==='assets',maxBytes=connectionRoute?8192:assetUpload?12*1024*1024:limits.transactionBytes;for await(const chunk of req){bytes+=chunk.length;check(bytes<=maxBytes,'E_NATIVE_SIZE');chunks.push(chunk);}req.setTimeout(0);const body=parseAuthoringJson(Buffer.concat(chunks).toString(),{bytes:maxBytes,nodes:limits.nodes,depth:limits.depth,allowNull:match?.[2]==='review'});
 if(connectionRoute){
  if(body.action==='disconnect'){
   check(exact(body,['action']),'E_NATIVE_ARGUMENT');
   json(200,await connection.disconnect());
   return true;
  }
  if(body.action==='models'){
   check(exact(body,['action','provider','apiKey','endpoint','preset']),'E_NATIVE_ARGUMENT');
   json(200,await connection.listModels({provider:body.provider,apiKey:body.apiKey,endpoint:body.endpoint,preset:body.preset}));
   return true;
  }
  if(Object.hasOwn(body,'provider')||Object.hasOwn(body,'model')){
   check(exact(body,['provider','model','apiKey','endpoint','preset','vision']),'E_NATIVE_ARGUMENT');
   json(200,await connection.save({provider:body.provider,model:body.model,apiKey:body.apiKey,endpoint:body.endpoint,preset:body.preset,vision:body.vision}));
   return true;
  }
  check(exact(body,['apiKey']),'E_NATIVE_ARGUMENT');
  json(200,await connection.save(body.apiKey));
  return true;
 }
 if(fromChatRoute){
  const {config:providerConfig}=await providerForConnection();
  json(201,await composeFromFreePack(service,body,{providerConfig,fetchImpl:connection.fetch}));
  return true;
 }
 if(assetsFetchRoute){
  check(exact(body,['sourceUrl','packId','fileFilter'])&&typeof body.sourceUrl==='string','E_NATIVE_ARGUMENT');
  json(200,await cc0Fetcher.fetchPackWithFallback({sourceUrl:body.sourceUrl,packId:body.packId,fileFilter:body.fileFilter}));
  return true;
 }
 if(assetsPrepRoute){
  check(exact(body,['items'])&&Array.isArray(body.items),'E_NATIVE_ARGUMENT');
  json(200,await prepAssets({workspaceRoot:service.store.workspaceRoot,items:body.items,catalog:assetCatalog,remoteFetcher:cc0Fetcher}));
  return true;
 }
 if(demosOpenRoute){
  check(exact(body,['id']),'E_NATIVE_ARGUMENT');
  json(200,await materializeDemo(service,body.id));
  return true;
 }
 if(intake){
  const [,id,route,assetId]=intake;
  check(!assetId,'E_NATIVE_METHOD');
  if(!id)json(201,await intakes.create(body));
  else if(route==='assets')json(201,await intakes.upload(id,body));
  else if(route==='submit')json(200,await intakes.submit(id,body));
  else if(route==='cancel'&&exact(body,[]))json(200,await intakes.cancel(id));
  else if(route==='retry'&&exact(body,[]))json(200,await intakes.retry(id));
  else check(false,'E_NATIVE_METHOD');
  return true;
 }
 if(url.pathname==='/api/projects'){check(body.kind===undefined||body.kind==='native-scene','E_NATIVE_KIND');json(201,await service.create(body));return true;}
 check(match,'E_NATIVE_NOT_FOUND');const [,id,route]=match;const fields={history:['expected','action'],accept:['revisionId','contentHash'],export:['revisionId','target']}[route];if(fields)check(exact(body,fields)&&fields.every(key=>Object.hasOwn(body,key)),'E_NATIVE_ARGUMENT');
 if(route==='assets')check((exact(body,['expected','asset'])&&Object.hasOwn(body,'expected')&&Object.hasOwn(body,'asset'))||(exact(body,['expected','assets'])&&Object.hasOwn(body,'expected')&&Object.hasOwn(body,'assets')),'E_NATIVE_ARGUMENT');
 if(route==='stage-cc0')check(exact(body,['expected','items'])&&Object.hasOwn(body,'expected')&&Array.isArray(body.items),'E_NATIVE_ARGUMENT');
 if(route==='review'){
  const review=await reviewForConnection();
  const saved=await review.post(id,body);
  // Once a batch is received, processing belongs to the server, even if the tab closes.
  const start=body.action==='request'&&saved.status==='waiting'&&(review.configured||review.hasDeterministicIntent(saved));
  json(200,start?await review.resolve(id,saved.id):saved);
 }
 else if(route==='transactions/preview'){const {project,...preview}=await service.preview(id,body);void project;json(200,preview);}
 else if(route==='transactions')json(201,await service.transact(id,body));
 else if(route==='assets')json(201,Array.isArray(body.assets)?await service.uploadBatch(id,body):await service.upload(id,body));
 else if(route==='stage-cc0')json(201,await stageVerifiedCc0Assets({service,projectId:id,expected:body.expected,items:body.items,catalog:assetCatalog,remoteFetcher:cc0Fetcher}));
 else if(route==='history')json(200,await service.navigate(id,body));
 else if(route==='accept')json(200,await service.accept(id,body));
 else if(route==='export')json(200,await service.export(id,body));
 else check(false,'E_NATIVE_METHOD');return true;
 }catch(e){const code=/^E_[A-Z0-9_]+$/.test(e.message)?e.message:e.code==='EEXIST'?'E_NATIVE_EXISTS':e.code==='ENOENT'?'E_NATIVE_NOT_FOUND':'E_NATIVE_FAILED';const status=code.includes('STALE')||code.endsWith('EXISTS')?409:code.includes('ORIGIN')?403:code.includes('SIZE')||code.includes('LIMIT')?413:code.includes('NOT_FOUND')?404:code.startsWith('E_V2_')||code.includes('ENVELOPE')||code.includes('ARGUMENT')||code.includes('JSON')||code.includes('METHOD')||code.includes('CONTENT_TYPE')?400:422;json((connectionRoute&&connectionErrors[code])||status,{error:code,...(e.detail?{detail:e.detail}:{})});return true;}
 };}
