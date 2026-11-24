/** Bounded chat-completions transport. Does not execute tools or log credentials. */
import {Buffer} from 'node:buffer';
import {URL} from 'node:url';
export class PlanError extends Error{constructor(code){super(code);this.code=code;}}
function secretIn(value,key){if(typeof value==='string')return value.includes(key);if(value&&typeof value==='object')return Object.values(value).some(v=>secretIn(v,key));return false;}
function reject(code){throw new PlanError(code);}
async function boundedJson(response,limit,secret){
 if(Number(response.headers.get('content-length'))>limit){await response.body?.cancel();reject('E_MODEL_RESPONSE_LIMIT');}
 const reader=response.body?.getReader();if(!reader)reject('E_MODEL_RESPONSE');let size=0;const chunks=[];
 try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit)reject('E_MODEL_RESPONSE_LIMIT');chunks.push(value);}}
 finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
 let raw;try{raw=new globalThis.TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks));}catch{reject('E_MODEL_RESPONSE');}
 if(raw.includes(secret))reject('E_MODEL_SECRET_IN_RESPONSE');
 let value;try{value=JSON.parse(raw);}catch{reject('E_MODEL_RESPONSE');}if(secretIn(value,secret))reject('E_MODEL_SECRET_IN_RESPONSE');return value;
}
function usageOf(value,config){
 if(!value||typeof value!=='object')return null;
 const input=value.prompt_tokens,output=value.completion_tokens,cacheReported=value.prompt_cache_hit_tokens??value.prompt_tokens_details?.cached_tokens,cached=cacheReported??0;
 if(![input,output,cached].every(x=>Number.isSafeInteger(x)&&x>=0)||cached>input)return null;
 return {inputTokens:input,outputTokens:output,cachedInputTokens:cacheReported===undefined?null:cached,estimatedUsd:((input-cached)*config.inputUsdPerMillion+cached*config.cachedInputUsdPerMillion+output*config.outputUsdPerMillion)/1e6,costBasis:cacheReported===undefined?'cache usage not reported; all input conservatively priced as uncached':config.cachePriceConfigured?'configured-input-cache-output-rates':'configured-input-output-rates; cached input conservatively priced as uncached'};
}
const notRetryable=new Set(['E_PLAN_UNSUPPORTED','E_MODEL_TOOLS','E_MODEL_SECRET_IN_RESPONSE','E_MODEL_RESPONSE_LIMIT','E_MODEL_USAGE_LIMIT']);
async function httpFailure(response,config,call){
 const {status}=response;
 call.httpStatus=status;
 call.retryable=status===429||status>=500;
 if(!config.orcaFreeTier){
  await response.body?.cancel();
  return 'E_MODEL_HTTP';
 }
 if(status===501)call.retryable=false;
 if(status===400||status===429){
  const payload=await boundedJson(response,8192,config.apiKey).catch(()=>undefined);
  const error=payload?.error;
  const details=error?.code==='free_rate_limited'?error.metadata:undefined;
  if(status===400&&details?.reason==='err_free_prompt_cap')return 'E_MODEL_FREE_PROMPT_LIMIT';
  if(status===429&&details?.reason==='err_free_access_denied'){
   call.retryable=false;
   return 'E_MODEL_FREE_ACCESS';
  }
  if(status===429){
   const retryAfter=response.headers.get('Retry-After');
   const seconds=details?.retry_after_seconds??(/^\d+$/.test(retryAfter??'')?Number(retryAfter):undefined);
   if(Number.isSafeInteger(seconds)&&seconds>=0)call.retryAfterSeconds=seconds;
   if(details?.reason==='err_free_rate'&&call.retryAfterSeconds===undefined)return 'E_MODEL_FREE_CAPACITY';
  }
 }else{
  await response.body?.cancel().catch(()=>{});
 }
 if(status===401)return 'E_MODEL_AUTH';
 if(status===403)return 'E_MODEL_FORBIDDEN';
 if(status===402)return 'E_MODEL_QUOTA';
 if(status===404||status===410)return 'E_MODEL_UNAVAILABLE';
 if(status===429)return 'E_MODEL_RATE_LIMIT';
 if(status===408||status===504)return 'E_MODEL_TIMEOUT';
 return status>=500&&status!==501?'E_MODEL_UPSTREAM':'E_MODEL_REQUEST';
}
export async function requestChatCompletion({config,request,fetchImpl=globalThis.fetch,call={}}){
 if(secretIn(request,config.apiKey))reject('E_MODEL_SECRET_IN_PROMPT');
 let response;
 try{
  response=await fetchImpl(config.endpoint,{method:'POST',redirect:'error',signal:globalThis.AbortSignal.timeout(config.timeoutMs),
   headers:{'Content-Type':'application/json',Authorization:'Bearer '+config.apiKey},body:JSON.stringify(request)});
 }catch(error){reject(error.name==='TimeoutError'||error.name==='AbortError'?'E_MODEL_TIMEOUT':'E_MODEL_TRANSPORT');}
 if(!response.ok){
  const failure=new PlanError(await httpFailure(response,config,call));
  if(call.retryAfterSeconds!==undefined)failure.retryAfterSeconds=call.retryAfterSeconds;
  throw failure;
 }
 let envelope;
 try{envelope=await boundedJson(response,config.maximumResponseBytes,config.apiKey);}
 catch(error){
  if(error.name==='TimeoutError'||error.name==='AbortError')reject('E_MODEL_TIMEOUT');
  if(error instanceof TypeError)reject('E_MODEL_TRANSPORT');
  throw error;
 }
 if(!envelope||typeof envelope!=='object'||Array.isArray(envelope))reject('E_MODEL_RESPONSE');
 if(config.orcaFreeTier&&envelope.error)reject('E_MODEL_UPSTREAM');
 return envelope;
}
export async function requestCreativePlan({config,messages,projectId,ownedAssetIds=[],telemetry,fetchImpl=globalThis.fetch,validateResponse}){
 if(typeof validateResponse!=='function')reject('E_MODEL_RESPONSE');
 if(config.mode!=='live'||!config.billableCallsEnabled)reject('E_MODEL_NOT_CONFIGURED');
 if(!Number.isInteger(config.maximumAttempts)||config.maximumAttempts<1||config.maximumAttempts>2||!Number.isInteger(config.maximumRetries)||config.maximumRetries<0||config.maximumRetries>1||config.maximumAttempts!==config.maximumRetries+1)reject('E_MODEL_LIMIT_CONFIG');
 for(const [value,min,max]of [[config.maximumInputTokens,8192,131072],[config.maximumOutputTokens,512,8192],[config.maximumResponseBytes,1024,262144],[config.timeoutMs,100,120000]])if(!Number.isInteger(value)||value<min||value>max)reject('E_MODEL_LIMIT_CONFIG');
 for(const value of [config.inputUsdPerMillion,config.outputUsdPerMillion,config.cachedInputUsdPerMillion])if(!Number.isFinite(value)||value<0||value>1000)reject('E_MODEL_LIMIT_CONFIG');
 if(!Number.isFinite(config.maximumSpendUsd)||config.maximumSpendUsd<=0||config.maximumSpendUsd>100)reject('E_MODEL_LIMIT_CONFIG');
 const reserve=(config.maximumInputTokens*config.inputUsdPerMillion+config.maximumOutputTokens*config.outputUsdPerMillion)/1e6;
 telemetry.providerOrigin=new URL(config.endpoint).origin;telemetry.requestedModel=config.model;telemetry.pricing={inputUsdPerMillion:config.inputUsdPerMillion,outputUsdPerMillion:config.outputUsdPerMillion,cachedInputUsdPerMillion:config.cachedInputUsdPerMillion,basis:'Configured rates, not verified provider billing'};telemetry.limits={inputTokens:config.maximumInputTokens,outputTokens:config.maximumOutputTokens,responseBytes:config.maximumResponseBytes,timeoutMs:config.timeoutMs};telemetry.endpointClass=config.endpointClass;telemetry.protocol=config.protocol;telemetry.calls=[];telemetry.maximumSpendUsd=config.maximumSpendUsd;telemetry.maximumRetries=config.maximumRetries;telemetry.reservedUpperBoundUsd=0;telemetry.estimatedReportedUsageUsd=null;
 if(secretIn(messages,config.apiKey))reject('E_MODEL_SECRET_IN_PROMPT');
 const deadline=Date.now()+config.timeoutMs;
 for(let attempt=0;attempt<config.maximumAttempts;attempt++){
  // UTF-8 message bytes upper-bound byte-tokenizers, with 4096 reserved for framing.
  // Provider-hidden/system overhead and configured rates remain provider trust assumptions.
  if(Buffer.byteLength(JSON.stringify(messages),'utf8')+4096>config.maximumInputTokens)reject('E_MODEL_INPUT_LIMIT');
  if(telemetry.reservedUpperBoundUsd+reserve>config.maximumSpendUsd+1e-12)reject('E_MODEL_BUDGET');
  const remaining=deadline-Date.now();if(remaining<=0)reject('E_MODEL_TIMEOUT');
  const started=Date.now(),call={attempt:attempt+1,status:'STARTED',usage:null};telemetry.calls.push(call);telemetry.reservedUpperBoundUsd+=reserve;
  try{
   const request={model:config.model,messages,max_tokens:config.maximumOutputTokens,response_format:{type:'json_object'},stream:false,
    ...(config.disableThinking?{thinking:{type:'disabled'}}:{})};
   const envelope=await requestChatCompletion({config:{...config,timeoutMs:remaining},request,fetchImpl,call});
   call.usage=usageOf(envelope.usage,config);if(call.usage)telemetry.estimatedReportedUsageUsd=(telemetry.estimatedReportedUsageUsd??0)+call.usage.estimatedUsd;
   if(call.usage&&(call.usage.inputTokens>config.maximumInputTokens||call.usage.outputTokens>config.maximumOutputTokens))reject('E_MODEL_USAGE_LIMIT');
   if(typeof envelope.model==='string'&&envelope.model.length<=128&&Array.from(envelope.model).every(c=>c.codePointAt(0)>=32&&c.codePointAt(0)!==127))call.reportedModel=envelope.model;
   const choice=envelope.choices?.[0];if(choice?.message?.tool_calls?.length||choice?.finish_reason==='tool_calls')reject('E_MODEL_TOOLS');
   if(choice?.finish_reason!=='stop'||typeof choice?.message?.content!=='string'||!choice.message.content.trim())reject('E_MODEL_INCOMPLETE');
   const plan=validateResponse(choice.message.content,{projectId,ownedAssetIds});if(secretIn(plan,config.apiKey))reject('E_MODEL_SECRET_IN_RESPONSE');call.status='VALIDATED';return plan;
  }catch(error){
   const code=error instanceof PlanError?error.code:error.name==='AbortError'||error.name==='TimeoutError'?'E_MODEL_TIMEOUT':'E_MODEL_RESPONSE';call.status='REJECTED';call.error=code;
   if(attempt+1>=config.maximumAttempts||notRetryable.has(code)||call.retryable===false||Date.now()>=deadline){
    const failure=new PlanError(code);
    if(call.retryAfterSeconds!==undefined)failure.retryAfterSeconds=call.retryAfterSeconds;
    throw failure;
   }
  }finally{call.durationMs=Date.now()-started;}
 }
 reject('E_MODEL_ATTEMPTS');
}
