import {randomUUID} from 'node:crypto';
import {constants} from 'node:fs';
import {mkdir,open,rename,rm} from 'node:fs/promises';
import {join} from 'node:path';
import process from 'node:process';
import {check} from './document.mjs';
import {assertStorePath} from './store-path.mjs';
import {modelListRequest,modelVerificationRequest,publicPlayableProviders,verifiedPlayableModel} from './review-provider.mjs';

const legacyKeyFile='.orcarouter.key';
const verifiedFile='.tora-connection.json';
const validKey=key=>typeof key==='string'&&/^[!-~]{8,4096}$/.test(key);
const keyHint=key=>typeof key==='string'&&key.length>=4?'…'+key.slice(-4):'';

function mapHttpFailure(status){
 const failures={
  401:'E_MODEL_AUTH',
  402:'E_MODEL_QUOTA',
  403:'E_MODEL_FORBIDDEN',
  404:'E_MODEL_UNAVAILABLE',
  408:'E_MODEL_TIMEOUT',
  429:'E_MODEL_RATE_LIMIT',
  504:'E_MODEL_TIMEOUT',
 };
 return failures[status]??(status>=500?'E_MODEL_UPSTREAM':'E_MODEL_REQUEST');
}

// Keep credentials beside project directories with 0600 permissions so individual
// project bundles and review journals can be shared without exposing secrets.
export class ReviewConnection{
 constructor(storeRoot,{fetchImpl=globalThis.fetch,environment=process.env}={}){
  this.root=storeRoot;
  this.fetch=fetchImpl;
  this.environment=environment;
 }

 async readSecureFile(filename){
  await assertStorePath(this.root);
  let file;
  try{
   file=await open(join(this.root,filename),constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
   const info=await file.stat();
   if(info.isFile()&&(info.mode&0o077)===0&&info.size<=8192){
    return await file.readFile('utf8');
   }
  }catch(error){
   if(!['ENOENT','EACCES','ELOOP'].includes(error.code))throw Error('E_REVIEW_KEY_READ',{cause:error});
  }finally{await file?.close();}
  return null;
 }

 async writeSecureFile(filename,contents){
  const temporary=join(this.root,'.conn-'+randomUUID()+'.tmp');
  let file;
  try{
   await assertStorePath(this.root);
   await mkdir(this.root,{recursive:true});
   file=await open(temporary,'wx',0o600);
   await file.writeFile(contents,'utf8');
   await file.close();
   file=undefined;
   await rename(temporary,join(this.root,filename));
  }catch{
   throw Error('E_REVIEW_KEY_SAVE');
  }finally{
   await file?.close();
   await rm(temporary,{force:true}).catch(()=>{});
  }
 }

 async readVerified(){
  const raw=await this.readSecureFile(verifiedFile);
  if(!raw)return null;
  try{
   const parsed=JSON.parse(raw);
   if(parsed?.format!=='tora-connection-1'||!validKey(parsed.apiKey))return null;
   const verified=verifiedPlayableModel(parsed.provider,parsed.model);
   if(!verified)return null;
   return {
    provider:verified.provider.id,
    providerLabel:verified.provider.label,
    model:verified.model.id,
    modelLabel:verified.model.label,
    capabilities:verified.model.capabilities,
    audioSummary:verified.provider.audioSummary,
    videoSummary:verified.provider.videoSummary,
    apiKey:parsed.apiKey,
    vision:true,
    verified:true,
   };
  }catch{
   return null;
  }
 }

 async key(){
  const saved=await this.readSecureFile(legacyKeyFile);
  if(saved&&validKey(saved))return saved;
  const fallback=this.environment.ORCAROUTER_API_KEY?.trim();
  return validKey(fallback)?fallback:null;
 }

 async read(){
  const verified=await this.readVerified();
  if(verified)return verified;
  const legacy=await this.key();
  if(!legacy)return null;
  return {
   provider:'orca',
   providerLabel:'OrcaRouter (legacy)',
   model:'deepseek/deepseek-v4-flash-free',
   modelLabel:'DeepSeek Flash (legacy)',
   capabilities:{tools:true,json:true,vision:false,audio:'tora-analyzed',video:'none'},
   audioSummary:'Tora acoustic QA + WAV catalog',
   videoSummary:'Text-only (no vision)',
   apiKey:legacy,
   vision:this.environment.TORA_REVIEW_VISION==='1',
   verified:false,
   legacy:true,
  };
 }

 async status(){
  const active=await this.read();
  const supportedProviders=publicPlayableProviders();
  if(!active){
   return {configured:false,supportedProviders};
  }
  return {
   configured:true,
   provider:active.provider,
   providerLabel:active.providerLabel,
   model:active.model,
   modelLabel:active.modelLabel,
   capabilities:active.capabilities,
   audioSummary:active.audioSummary,
   videoSummary:active.videoSummary,
   keyHint:keyHint(active.apiKey),
   verified:Boolean(active.verified),
   legacy:Boolean(active.legacy),
   supportedProviders,
  };
 }

 async fetchJson(url,headers){
  let response;
  try{
   response=await this.fetch(url,{
    headers,
    redirect:'error',
    signal:globalThis.AbortSignal.timeout(10000),
   });
  }catch(error){
   throw Error(['TimeoutError','AbortError'].includes(error.name)?'E_MODEL_TIMEOUT':'E_MODEL_TRANSPORT',{cause:error});
  }
  if(!response.ok){
   await response.body?.cancel().catch(()=>{});
   throw Error(mapHttpFailure(response.status));
  }
  try{
   return await response.json();
  }catch{
   throw Error('E_MODEL_UPSTREAM');
  }
 }

 async listModels({provider,apiKey}){
  const providerId=typeof provider==='string'?provider.trim():'';
  const key=typeof apiKey==='string'?apiKey.trim():'';
  check(validKey(key),'E_REVIEW_KEY_FORMAT');
  const req=modelListRequest(providerId,key);
  const payload=await this.fetchJson(req.url,req.headers);
  const rawItems=providerId==='gemini'
   ?(Array.isArray(payload?.models)?payload.models:[])
   :(Array.isArray(payload?.data)?payload.data:[]);
  const curatedOrder=new Map(
   (publicPlayableProviders().find(item=>item.id===providerId)?.models??[]).map((item,idx)=>[item.id,idx]),
  );
  const seen=new Set();
  const discovered=[];
  for(const item of rawItems){
   if(providerId==='gemini'){
    const methods=Array.isArray(item?.supportedGenerationMethods)?item.supportedGenerationMethods:[];
    if(methods.length&&!methods.includes('generateContent'))continue;
   }
   const rawId=providerId==='gemini'
    ?String(item?.name??'').replace(/^models\//,'')
    :String(item?.id??'');
   if(!rawId||seen.has(rawId))continue;
   const verified=verifiedPlayableModel(providerId,rawId,item?.displayName||item?.display_name);
   if(!verified)continue;
   seen.add(rawId);
   const contextTokens=verified.model.contextTokens
    ??(typeof item?.inputTokenLimit==='number'?item.inputTokenLimit:null);
   discovered.push({
    id:verified.model.id,
    label:verified.model.label,
    badge:curatedOrder.has(rawId)?verified.model.badge:'Live from key',
    contextTokens,
    capabilities:{...verified.model.capabilities},
   });
  }
  discovered.sort((a,b)=>{
   const rankA=curatedOrder.has(a.id)?curatedOrder.get(a.id):999;
   const rankB=curatedOrder.has(b.id)?curatedOrder.get(b.id):999;
   if(rankA!==rankB)return rankA-rankB;
   return b.id.localeCompare(a.id,undefined,{numeric:true});
  });
  return {provider:providerId,models:discovered};
 }

 async verifyFetch(url,headers){
  let response;
  try{
   response=await this.fetch(url,{
    headers,
    redirect:'error',
    signal:globalThis.AbortSignal.timeout(10000),
   });
  }catch(error){
   throw Error(['TimeoutError','AbortError'].includes(error.name)?'E_MODEL_TIMEOUT':'E_MODEL_TRANSPORT',{cause:error});
  }
  await response.body?.cancel().catch(()=>{});
  if(!response.ok)throw Error(mapHttpFailure(response.status));
 }

 async save(input){
  // Legacy single-string OrcaRouter connection retained for existing local automation/tests.
  if(typeof input==='string'){
   const key=input.trim();
   check(validKey(key),'E_REVIEW_KEY_FORMAT');
   await this.verifyFetch('https://api.orcarouter.ai/v1/models',{Authorization:'Bearer '+key});
   await this.writeSecureFile(legacyKeyFile,key);
   return {configured:true};
  }
  check(input&&typeof input==='object'&&!Array.isArray(input),'E_REVIEW_KEY_FORMAT');
  const provider=typeof input.provider==='string'?input.provider.trim():'';
  const model=typeof input.model==='string'?input.model.trim():'';
  const key=typeof input.apiKey==='string'?input.apiKey.trim():'';
  check(validKey(key),'E_REVIEW_KEY_FORMAT');
  const verified=verifiedPlayableModel(provider,model);
  if(!verified)throw Error('E_MODEL_UNSUPPORTED_CAPABILITY');
  const probe=modelVerificationRequest(verified.provider.id,verified.model.id,key);
  await this.verifyFetch(probe.url,probe.headers);
  await this.writeSecureFile(verifiedFile,JSON.stringify({
   format:'tora-connection-1',
   provider:verified.provider.id,
   model:verified.model.id,
   apiKey:key,
  }));
  return {
   configured:true,
   provider:verified.provider.id,
   providerLabel:verified.provider.label,
   model:verified.model.id,
   modelLabel:verified.model.label,
   capabilities:verified.model.capabilities,
   audioSummary:verified.provider.audioSummary,
   videoSummary:verified.provider.videoSummary,
   keyHint:keyHint(key),
   verified:true,
  };
 }

 async disconnect(){
  await assertStorePath(this.root);
  await Promise.all([
   rm(join(this.root,verifiedFile),{force:true}).catch(()=>{}),
   rm(join(this.root,legacyKeyFile),{force:true}).catch(()=>{}),
  ]);
  return {configured:false,supportedProviders:publicPlayableProviders()};
 }
}
