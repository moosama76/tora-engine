import process from 'node:process';
import {Buffer} from 'node:buffer';
import {URL} from 'node:url';
import {PlanError,requestChatCompletion} from '../model-client.mjs';

const providers=new Set(['orca','openai','anthropic','gemini','openai-compatible']);
const imageTypes=new Set(['image/png','image/jpeg','image/webp']);
const clean=value=>typeof value==='string'?value.trim():'';

const MODEL_ID_RE=/^[a-zA-Z0-9][a-zA-Z0-9._:-]{1,95}$/;
const DISALLOWED_MODEL_FRAGMENT=/(?:embed|embedding|whisper|tts|transcribe|realtime|audio-preview|native-audio|moderation|dall-e|imagen|veo|sora|lyria|aqa|bison|gecko|instruct|davinci|babbage|curie|ada|-image(?:$|-)|-search(?:$|-)|-live(?:$|-)|robotics|computer-use)/i;

const GEMINI_CAPABILITIES=Object.freeze({tools:true,json:true,vision:true,audio:'native',video:'native-and-keyframes'});
const MULTIMODAL_QA_CAPABILITIES=Object.freeze({tools:true,json:true,vision:true,audio:'tora-analyzed',video:'keyframes'});

export const VERIFIED_PLAYABLE_PROVIDERS=Object.freeze([
 Object.freeze({
  id:'gemini',
  label:'Google Gemini',
  keyUrl:'https://aistudio.google.com/apikey',
  keyPlaceholder:'AIza...',
  defaultModel:'gemini-4-hydrogen',
  audioSummary:'Native audio + Tora acoustic QA',
  videoSummary:'Native video + keyframes',
  summary:'Handles everything natively: vision, audio, video frames, and multi-turn playable tools.',
  defaultCapabilities:GEMINI_CAPABILITIES,
  models:Object.freeze([
   Object.freeze({
    id:'gemini-4-hydrogen',
    label:'Gemini 4 Hydrogen',
    badge:'Recommended',
    contextTokens:1_000_000,
    capabilities:GEMINI_CAPABILITIES,
   }),
   Object.freeze({
    id:'gemini-4-carbon',
    label:'Gemini 4 Carbon',
    badge:'Flagship',
    contextTokens:1_000_000,
    capabilities:GEMINI_CAPABILITIES,
   }),
   Object.freeze({
    id:'gemini-4-neon',
    label:'Gemini 4 Neon',
    badge:'Frontier',
    contextTokens:1_000_000,
    capabilities:GEMINI_CAPABILITIES,
   }),
   Object.freeze({
    id:'gemini-3.8-flash',
    label:'Gemini 3.8 Flash',
    badge:'Fast',
    contextTokens:1_000_000,
    capabilities:GEMINI_CAPABILITIES,
   }),
  ]),
 }),
 Object.freeze({
  id:'openai',
  label:'OpenAI',
  keyUrl:'https://platform.openai.com/api-keys',
  keyPlaceholder:'sk-...',
  defaultModel:'gpt-6.2-sol',
  audioSummary:'Tora acoustic QA + WAV catalog',
  videoSummary:'Extracted video keyframes',
  summary:'Strong tool calling and vision for scenes and video frames; sounds verified via Tora acoustic analysis.',
  defaultCapabilities:MULTIMODAL_QA_CAPABILITIES,
  models:Object.freeze([
   Object.freeze({
    id:'gpt-6.2-sol',
    label:'GPT-6.2 Sol',
    badge:'Recommended',
    contextTokens:1_000_000,
    capabilities:MULTIMODAL_QA_CAPABILITIES,
   }),
   Object.freeze({
    id:'gpt-6.2-astra',
    label:'GPT-6.2 Astra',
    badge:'Flagship',
    contextTokens:1_050_000,
    capabilities:MULTIMODAL_QA_CAPABILITIES,
   }),
   Object.freeze({
    id:'gpt-6.1-terra',
    label:'GPT-6.1 Terra',
    badge:'Fast',
    contextTokens:1_000_000,
    capabilities:MULTIMODAL_QA_CAPABILITIES,
   }),
  ]),
 }),
 Object.freeze({
  id:'anthropic',
  label:'Anthropic Claude',
  keyUrl:'https://console.anthropic.com/settings/keys',
  keyPlaceholder:'sk-ant-...',
  defaultModel:'claude-opus-5-5',
  audioSummary:'Tora acoustic QA + WAV catalog',
  videoSummary:'Extracted video keyframes',
  summary:'Precise multi-turn scene editing and vision for visuals and video frames; sounds verified via Tora acoustic analysis.',
  defaultCapabilities:MULTIMODAL_QA_CAPABILITIES,
  models:Object.freeze([
   Object.freeze({
    id:'claude-opus-5-5',
    label:'Claude Opus 5.5',
    badge:'Recommended',
    contextTokens:1_000_000,
    capabilities:MULTIMODAL_QA_CAPABILITIES,
   }),
   Object.freeze({
    id:'claude-sonnet-5-5',
    label:'Claude Sonnet 5.5',
    badge:'Fast',
    contextTokens:1_000_000,
    capabilities:MULTIMODAL_QA_CAPABILITIES,
   }),
   Object.freeze({
    id:'claude-fable-5-2',
    label:'Claude Fable 5.2',
    badge:'Deep reasoning',
    contextTokens:1_000_000,
    capabilities:MULTIMODAL_QA_CAPABILITIES,
   }),
  ]),
 }),
]);

function humanizeModelId(providerId,modelId){
 if(providerId==='openai'){
  return modelId.replace(/^gpt-/i,'GPT-').replace(/-([a-z])/g,(_m,ch)=>' '+ch.toUpperCase());
 }
 if(providerId==='anthropic'){
  return modelId.replace(/^claude-/i,'Claude ').replace(/-(\d+)-(\d+)(?!\d)/,' $1.$2').replace(/-([a-z])/g,(_m,ch)=>' '+ch.toUpperCase());
 }
 return modelId.replace(/^gemini-/i,'Gemini ').replace(/-([a-z])/g,(_m,ch)=>' '+ch.toUpperCase());
}

export function isPlayableCapableModel(providerId,modelId){
 const id=clean(modelId);
 if(!MODEL_ID_RE.test(id)||DISALLOWED_MODEL_FRAGMENT.test(id))return false;
 if(providerId==='gemini'){
  const match=/^gemini-(\d+(?:\.\d+)?)-/.exec(id);
  if(!match)return false;
  return Number.parseFloat(match[1])>=2.5;
 }
 if(providerId==='openai'){
  if(/^(?:gpt-3\.5|gpt-4(?:$|-0|-32|-turbo|-vision)|o1-)/i.test(id))return false;
  return /^(?:gpt-(?:4o|4\.1|[5-9](?:\.\d+)?)(?:$|-)|o[3-9](?:$|-))/.test(id);
 }
 if(providerId==='anthropic'){
  return /^claude-(?:(?:opus|sonnet|fable)-(?:4(?:-\d+)?|[5-9](?:-\d+)?)|haiku-(?:[5-9](?:-\d+)?))(?:$|-)/.test(id);
 }
 return false;
}

export function verifiedPlayableModel(providerId,modelId,displayName){
 const provider=VERIFIED_PLAYABLE_PROVIDERS.find(item=>item.id===clean(providerId));
 if(!provider)return null;
 const selected=clean(modelId)||provider.defaultModel;
 const curated=provider.models.find(item=>item.id===selected);
 if(curated)return {provider,model:curated};
 if(!isPlayableCapableModel(provider.id,selected))return null;
 return {
  provider,
  model:{
   id:selected,
   label:clean(displayName)||humanizeModelId(provider.id,selected),
   badge:'Verified',
   contextTokens:null,
   capabilities:provider.defaultCapabilities,
  },
 };
}

export function publicPlayableProviders(){
 return VERIFIED_PLAYABLE_PROVIDERS.map(provider=>({
  id:provider.id,
  label:provider.label,
  keyUrl:provider.keyUrl,
  keyPlaceholder:provider.keyPlaceholder,
  defaultModel:provider.defaultModel,
  audioSummary:provider.audioSummary,
  videoSummary:provider.videoSummary,
  summary:provider.summary,
  models:provider.models.map(model=>({
   id:model.id,
   label:model.label,
   badge:model.badge,
   contextTokens:model.contextTokens,
   capabilities:{...model.capabilities},
  })),
 }));
}

export function modelListRequest(providerId,apiKey){
 const provider=VERIFIED_PLAYABLE_PROVIDERS.find(item=>item.id===clean(providerId));
 if(!provider)throw new PlanError('E_MODEL_UNSUPPORTED_CAPABILITY');
 if(provider.id==='gemini'){
  return {
   url:'https://generativelanguage.googleapis.com/v1beta/models?pageSize=200',
   headers:{'x-goog-api-key':apiKey},
  };
 }
 if(provider.id==='openai'){
  return {
   url:'https://api.openai.com/v1/models',
   headers:{Authorization:'Bearer '+apiKey},
  };
 }
 return {
  url:'https://api.anthropic.com/v1/models?limit=100',
  headers:{'x-api-key':apiKey,'anthropic-version':'2023-06-01'},
 };
}

export function modelVerificationRequest(providerId,modelId,apiKey){
 const verified=verifiedPlayableModel(providerId,modelId);
 if(!verified)throw new PlanError('E_MODEL_UNSUPPORTED_CAPABILITY');
 const {provider,model}=verified;
 const encoded=encodeURIComponent(model.id);
 if(provider.id==='gemini'){
  return {
   url:`https://generativelanguage.googleapis.com/v1beta/models/${encoded}`,
   headers:{'x-goog-api-key':apiKey},
  };
 }
 if(provider.id==='openai'){
  return {
   url:`https://api.openai.com/v1/models/${encoded}`,
   headers:{Authorization:'Bearer '+apiKey},
  };
 }
 return {
  url:`https://api.anthropic.com/v1/models/${encoded}`,
  headers:{'x-api-key':apiKey,'anthropic-version':'2023-06-01'},
 };
}

export function orcaProviderConfig(apiKey=process.env.ORCAROUTER_API_KEY){
 const key=clean(apiKey);if(!key)return undefined;
 return {provider:'orca',endpoint:'https://api.orcarouter.ai/v1/chat/completions',apiKey:key,
  model:'deepseek/deepseek-v4-flash-free',paidModel:'deepseek/deepseek-v4-pro',vision:false,orcaFreeTier:true};
}

export function reviewProviderConfig(options={}){
 const provider=options.provider??process.env.TORA_REVIEW_PROVIDER??'orca';
 if(!providers.has(provider))throw new PlanError('E_REVIEW_PROVIDER_CONFIG');
 if(provider==='orca'){
  const config=orcaProviderConfig(options.apiKey);
  return config?{...config,vision:options.vision===true||process.env.TORA_REVIEW_VISION==='1'}:undefined;
 }
 const names={openai:'OPENAI_API_KEY',anthropic:'ANTHROPIC_API_KEY',gemini:'GEMINI_API_KEY','openai-compatible':'TORA_REVIEW_API_KEY'};
 const apiKey=clean(options.apiKey??process.env[names[provider]]);if(!apiKey)return undefined;
 const model=clean(options.model??process.env.TORA_REVIEW_MODEL);
 const endpoint=clean(options.endpoint??process.env.TORA_REVIEW_ENDPOINT??({
  openai:'https://api.openai.com/v1/chat/completions',anthropic:'https://api.anthropic.com/v1/messages',gemini:'https://generativelanguage.googleapis.com/v1beta/models',
 })[provider]);
 if(!model||!endpoint||!/^https:\/\//.test(endpoint))throw new PlanError('E_REVIEW_PROVIDER_CONFIG');
 let parsed;try{parsed=new URL(endpoint);}catch{throw new PlanError('E_REVIEW_PROVIDER_CONFIG');}
 if(parsed.username||parsed.password||parsed.search||parsed.hash)throw new PlanError('E_REVIEW_PROVIDER_CONFIG');
 return {provider,endpoint,apiKey,model,paidModel:clean(options.paidModel??process.env.TORA_REVIEW_PAID_MODEL)||model,
  vision:options.vision===true||process.env.TORA_REVIEW_VISION==='1',orcaFreeTier:false};
}

function orcaRequest(config,request){return {endpoint:config.endpoint,headers:{'Content-Type':'application/json',Authorization:'Bearer '+config.apiKey},body:request};}
function openAiRequest(config,request){
 const body={...request};delete body.thinking;delete body.include_reasoning;
 if(/^(?:gpt-[5-9]|o[1-9])(?:$|[.-])/.test(String(body.model??''))&&body.max_tokens!==undefined){
  body.max_completion_tokens=body.max_tokens;
  delete body.max_tokens;
 }
 return {endpoint:config.endpoint,headers:{'Content-Type':'application/json',Authorization:'Bearer '+config.apiKey},body};
}
function safeToolArgs(raw){
 if(raw&&typeof raw==='object'&&!Array.isArray(raw))return raw;
 try{const parsed=JSON.parse(String(raw??'{}'));return parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed:{};}catch{return {};}
}
function geminiSchema(schema){
 if(!schema||typeof schema!=='object')return schema;
 const out={};
 for(const key of ['type','description','enum','required','nullable']){
  if(Object.hasOwn(schema,key))out[key]=schema[key];
 }
 if(schema.properties&&typeof schema.properties==='object'){
  out.properties=Object.fromEntries(Object.entries(schema.properties).map(([k,v])=>[k,geminiSchema(v)]));
 }
 if(schema.items&&typeof schema.items==='object')out.items=geminiSchema(schema.items);
 return out;
}
function anthropicContent(content,toolCalls){
 if(typeof content==='string'||content==null)return [...(content?[{type:'text',text:content}]:[]),...(toolCalls??[]).map(call=>({type:'tool_use',id:call.id,name:call.function.name,input:safeToolArgs(call.function.arguments)}))];
 return content.map(part=>{
  if(part.type==='text')return {type:'text',text:part.text};
  if(part.type==='image_url'){
   const match=/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(part.image_url?.url??'');
   if(!match)throw new PlanError('E_REVIEW_VISION_INPUT');
   return {type:'image',source:{type:'base64',media_type:match[1],data:match[2]}};
  }
  throw new PlanError('E_REVIEW_PROVIDER_CONFIG');
 });
}
function anthropicRequest(config,request){
 const system=request.messages.filter(message=>message.role==='system').map(message=>message.content).join('\n');
 const messages=[];
 for(const message of request.messages){
  if(message.role==='system')continue;
  const role=message.role==='assistant'?'assistant':'user';
  const content=message.role==='tool'?[{type:'tool_result',tool_use_id:message.tool_call_id,content:message.content}]:anthropicContent(message.content,message.tool_calls);
  const previous=messages.at(-1);
  if(previous?.role===role){const parts=Array.isArray(previous.content)?previous.content:[{type:'text',text:previous.content}];previous.content=[...parts,...content];}
  else messages.push({role,content});
 }
 return {endpoint:config.endpoint,headers:{'Content-Type':'application/json','x-api-key':config.apiKey,'anthropic-version':'2023-06-01'},body:{
  model:request.model,max_tokens:request.max_tokens,...(system?{system}:{}),messages,
  ...(request.tools?{tools:request.tools.map(tool=>({name:tool.function.name,description:tool.function.description,input_schema:tool.function.parameters}))}:{}),
 }};
}
function geminiParts(content,toolCalls){
 if(typeof content==='string'||content==null)return [...(content?[{text:content}]:[]),...(toolCalls??[]).map(call=>({functionCall:{name:call.function.name,args:safeToolArgs(call.function.arguments)}}))];
 return content.map(part=>{
  if(part.type==='text')return {text:part.text};
  if(part.type==='image_url'){
   const match=/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(part.image_url?.url??'');
   if(!match)throw new PlanError('E_REVIEW_VISION_INPUT');
   return {inlineData:{mimeType:match[1],data:match[2]}};
  }
  throw new PlanError('E_REVIEW_PROVIDER_CONFIG');
 });
}
function geminiRequest(config,request){
 const contents=[],toolNames=new Map();
 for(const message of request.messages){
  if(message.role==='system')continue;
  for(const call of message.tool_calls??[])toolNames.set(call.id,call.function.name);
  const role=message.role==='assistant'?'model':'user';
  let parts;
  if(message.role==='tool'){
   let response;try{response=JSON.parse(message.content);}catch{response={content:message.content};}
   const name=toolNames.get(message.tool_call_id);if(!name)throw new PlanError('E_MODEL_TOOLS');
   parts=[{functionResponse:{name,response:typeof response==='object'&&response&&!Array.isArray(response)?response:{result:response}}}];
  }else parts=geminiParts(message.content,message.tool_calls);
  const previous=contents.at(-1);if(previous?.role===role)previous.parts.push(...parts);else contents.push({role,parts});
 }
 const declarations=request.tools?.map(tool=>({name:tool.function.name,description:tool.function.description,parameters:geminiSchema(tool.function.parameters)}));
 const system=request.messages.filter(message=>message.role==='system').map(message=>message.content).join('\n');
 const base=endpointForGemini(config.endpoint,request.model);
 return {endpoint:base,headers:{'Content-Type':'application/json','x-goog-api-key':config.apiKey},body:{
  ...(system?{systemInstruction:{parts:[{text:system}]}}:{}),contents,
  ...(declarations?.length?{tools:[{functionDeclarations:declarations}]}:{}),
  generationConfig:{maxOutputTokens:request.max_tokens,...(declarations?.length?{}:{responseMimeType:'application/json'})},
 }};
}
function endpointForGemini(endpoint,model){
 if(endpoint.endsWith(':generateContent'))return endpoint;
 return endpoint.replace(/\/$/,'')+'/'+encodeURIComponent(model)+':generateContent';
}
function normalizeResponse(provider,envelope){
 if(provider!=='anthropic'&&provider!=='gemini')return envelope;
 if(provider==='anthropic'){
  const text=(envelope.content??[]).filter(part=>part.type==='text').map(part=>part.text).join('');
  const calls=(envelope.content??[]).filter(part=>part.type==='tool_use').map(part=>({id:part.id,type:'function',function:{name:part.name,arguments:JSON.stringify(part.input??{})}}));
  return {id:envelope.id,model:envelope.model,choices:[{finish_reason:envelope.stop_reason==='tool_use'?'tool_calls':envelope.stop_reason==='end_turn'?'stop':envelope.stop_reason==='max_tokens'?'length':'stop',message:{content:text||null,...(calls.length?{tool_calls:calls}:{})}}],usage:{prompt_tokens:envelope.usage?.input_tokens,completion_tokens:envelope.usage?.output_tokens}};
 }
 const candidate=envelope.candidates?.[0],parts=candidate?.content?.parts??[],text=parts.filter(part=>typeof part.text==='string').map(part=>part.text).join('');
 const calls=parts.filter(part=>part.functionCall).map((part,index)=>({id:part.functionCall.id??`gemini-${index}`,type:'function',function:{name:part.functionCall.name,arguments:JSON.stringify(part.functionCall.args??{})}}));
 return {model:envelope.modelVersion,choices:[{finish_reason:calls.length?'tool_calls':candidate?.finishReason==='STOP'?'stop':candidate?.finishReason==='MAX_TOKENS'?'length':'stop',message:{content:text||null,...(calls.length?{tool_calls:calls}:{})}}],usage:{prompt_tokens:envelope.usageMetadata?.promptTokenCount,completion_tokens:envelope.usageMetadata?.candidatesTokenCount}};
}
export async function requestReviewCompletion({config,request,fetchImpl=globalThis.fetch,call={}}){
 const adapted=config.provider==='anthropic'?anthropicRequest(config,request):config.provider==='gemini'?geminiRequest(config,request):config.provider==='orca'?orcaRequest(config,request):openAiRequest(config,request);
 const envelope=await requestChatCompletion({config:{...config,endpoint:adapted.endpoint,maximumResponseBytes:config.maximumResponseBytes??192000,timeoutMs:config.timeoutMs??45000},request:adapted.body,call,
  fetchImpl:async(_url,init)=>fetchImpl(adapted.endpoint,{...init,headers:adapted.headers,body:JSON.stringify(adapted.body)})});
 return normalizeResponse(config.provider,envelope);
}

export function reviewUserMessage(input,config){
 const screenshots=input?.screenshots??[],copy={...input};delete copy.screenshots;
 if(!Array.isArray(screenshots)||screenshots.length>4)throw new PlanError('E_REVIEW_VISION_INPUT');
 if(!config.vision){if(screenshots.length)copy.screenshotsOmitted=screenshots.length;return {role:'user',content:JSON.stringify(copy)};}
 let bytes=0;const images=screenshots.map(screenshot=>{
  if(!screenshot||!imageTypes.has(screenshot.mimeType)||typeof screenshot.data!=='string'||!/^[A-Za-z0-9+/=]+$/.test(screenshot.data))throw new PlanError('E_REVIEW_VISION_INPUT');
  const size=Buffer.byteLength(screenshot.data,'base64');bytes+=size;if(size>2_500_000||bytes>8_000_000||!size)throw new PlanError('E_REVIEW_VISION_INPUT');
  return {type:'image_url',image_url:{url:`data:${screenshot.mimeType};base64,${screenshot.data}`}};
 });
 return {role:'user',content:[{type:'text',text:JSON.stringify(copy)},...images]};
}
