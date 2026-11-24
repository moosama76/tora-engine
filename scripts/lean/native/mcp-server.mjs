/** Local MCP stdio adapter, legacy protocol 2025-11-25. stdout is protocol only. */
import process from 'node:process';
import {Buffer} from 'node:buffer';
import {readFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ProjectStore} from '../project-store.mjs';
import {EditorState} from '../editor-state.mjs';
import {NativeService} from './service.mjs';
import {NativeAgentTools} from './agent-tools.mjs';
import {capabilities} from './contracts.mjs';
import {NativeReview} from './review.mjs';
import {reviewRoutingFlags} from './review-resolver.mjs';
import {ReviewIntake} from './review-intake.mjs';
import {targets} from './network-targets.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../..');
const store=new ProjectStore(resolve(process.env.TORA_PROJECT_STORE??resolve(root,'.tora/native-projects')));
const service=new NativeService(store,new EditorState(store)),agent=new NativeAgentTools(service);
const review=new NativeReview(service,{deterministic:reviewRoutingFlags().deterministic}),intakes=new ReviewIntake(service);
const string={type:'string'},boolean={type:'boolean'},strings={type:'array',items:string};
const expected={type:'object',properties:{revisionId:string,contentHash:string},required:['revisionId','contentHash'],additionalProperties:false};
const tools=[];
function define(name,description,properties={},required=[],readOnly=false){tools.push({name:'tora_'+name,description,inputSchema:{type:'object',properties,required,additionalProperties:false},annotations:{readOnlyHint:readOnly,destructiveHint:!readOnly,openWorldHint:false}});}
define('brief','Read current production instructions and authoring documentation before creating or modifying a playable. Returns full source text; no model calls.',{},[],true);
define('capabilities','Discover supported visual and behavior contracts. Supply names for a compact subset; omit for the full registry.',{names:strings},[],true);
define('compose','Compose an editable playable from a structured creative concept and prepared artwork. Read tora_brief and discover creative-concept capabilities first. Returns creative review status and requirement trace.',{id:string,name:string,concept:{type:'object'}},['id','concept']);
define('create','Create an empty editable native project. Read tora_brief first.',{id:string,name:string,androidUrl:string},['id','name']);
define('inspect','Inspect current state and revision identity. Narrow with ids/search; full explicitly returns the complete project.',{id:string,revisionId:string,ids:strings,fields:strings,search:string,full:boolean},['id'],true);
define('edit','Preview and commit native operations against expected revision. Scope lists every intended changed ID. Outside-scope changes return PREVIEW without committing.',{id:string,expected,operations:{type:'array',items:{type:'object'}},scope:strings,previewOnly:boolean,previewDigest:string},['id','expected','operations','scope']);
define('upload_asset','Register PNG/JPEG, PCM WAV, MP3, or Tora 3D mesh bytes (base64) with rights declaration using the native decoder and revision validation.',{id:string,expected,asset:{type:'object',properties:{id:string,mime:{type:'string',enum:['image/png','image/jpeg','audio/wav','audio/mpeg','model/tora-mesh']},data:string,rights:string},required:['id','mime','data','rights'],additionalProperties:false}},['id','expected','asset']);
define('render','Write an HTML scene preview to output. Open it in a browser for visual inspection; this tool does not capture screenshots.',{id:string,revisionId:string,sceneId:string,output:string},['id','output']);
define('qa','Run deterministic static, acoustic, four-viewport layout and primary-interaction QA on a native revision. Returns exact defects and writes labeled screenshots. A pass is engineering verification, not creative, device, or network acceptance.',{id:string,revisionId:string,output:string,target:{type:'string',enum:[...targets]}},['id']);
define('export','Write standalone playable HTML or an editable project bundle. HTML exports must pass Creative QA; project format exports the current working head. Passing QA is not visual, device, or network approval.',{id:string,revisionId:string,output:string,format:{type:'string',enum:['project']},target:{type:'string',enum:[...targets]}},['id','output']);
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
 return typeof value===schema.type&&(!schema.enum||schema.enum.includes(value));
}
let initialized=false,ready=false,briefRead=false;
async function call(name,args){
 const tool=tools.find(t=>t.name===name);if(!tool)throw Error('E_MCP_UNKNOWN_TOOL');if(!valid(args,tool.inputSchema))throw Error('E_MCP_ARGUMENT');
 if(name==='tora_brief'){
  const resolvePlayableBrief=async()=>{
   if(process.env.TORA_PLAYABLE_BRIEF){
    const explicit=resolve(process.env.TORA_PLAYABLE_BRIEF);
    return {name:'playable',path:explicit,text:await readFile(explicit,'utf8')};
   }
   for(const candidate of [resolve(homedir(),'.codex/PLAYABLE_AI_MASTER.md'),resolve(root,'docs/PLAYABLE_BRIEF.md')]){
    try{return {name:'playable',path:candidate,text:await readFile(candidate,'utf8')};}
    catch(err){if(err.code!=='ENOENT')throw err;}
   }
   throw Error('E_MCP_BRIEF_UNAVAILABLE');
  };
  const files=[
   ['production',resolve(root,'PRODUCTION_MASTER.md')],
   ['winEffectsAndCta',resolve(root,'skills/tora-playables/references/win-effects-and-cta.md')],
   ['uiFundamentals',resolve(root,'skills/tora-ui-fundamentals/SKILL.md')],
   ['authoring',resolve(root,'docs/TORA_CREATION_API.md')],
   ['agentTools',resolve(root,'docs/NATIVE_AGENT_TOOLS.md')],
  ];
  let documents;
  try{
   const [playable,...rest]=await Promise.all([resolvePlayableBrief(),...files.map(async([docName,path])=>({name:docName,path,text:await readFile(path,'utf8')}))]);
   documents=[rest[0],playable,...rest.slice(1)];
  }catch{throw Error('E_MCP_BRIEF_UNAVAILABLE');}
  briefRead=true;return {documents,store:store.root,instructions:'Apply these briefs. Establish one coherent visual style and an asset plan before implementation. Use the retained, authorized studio assets for studio intake. For sourced packs use free third-party libraries with verified commercial-use license evidence, author, source URL, and source hashes. Keep visual assets within one style family; audio may use a separate compatible pack. Asset creation and image generation are outside this authoring workflow. Inspect packaged screenshots and footage; tests do not establish visual quality. Use connected browser tools to inspect actual exported output.'};
 }
 if(name==='tora_capabilities')return args.names?agent.run({command:'contracts',names:args.names}):capabilities();
 if(!['tora_inspect'].includes(name)&&!briefRead)throw Error('E_MCP_READ_BRIEF_FIRST');
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
 if(name==='tora_upload_asset'){const current=await service.read(args.id);if(current.revisionId!==args.expected.revisionId||current.contentHash!==args.expected.contentHash)throw Error('E_NATIVE_STALE');const r=await service.upload(args.id,args);return {status:'UPLOADED',asset:r.asset,expected:{revisionId:r.revisionId,contentHash:r.contentHash}};}
 if(name==='tora_export'&&args.format==='project'&&args.revisionId)throw Error('E_MCP_PROJECT_EXPORT_HEAD_ONLY');
 return agent.run({...args,command:name.slice(5)});
}
const error=(id,code,message)=>({jsonrpc:'2.0',id,error:{code,message}});
export async function dispatch(request){
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
  const code=/^E_[A-Z_]+$/.test(e.message)?e.message:'E_MCP_FAILED';
  const payload={status:'REJECTED',code,...(e.detail?{detail:e.detail}:{}),...(e.creativeQa?{creativeQa:e.creativeQa}:{})};
  return {jsonrpc:'2.0',id,result:{isError:true,content:[{type:'text',text:JSON.stringify(payload)}]}};
 }
}
async function main(){
 // Bound each newline-delimited message before decoding; process serially to preserve writes.
 let pending=Buffer.alloc(0);
 for await(const chunk of process.stdin){pending=Buffer.concat([pending,chunk]);let newline;
  while((newline=pending.indexOf(10))!==-1){const line=pending.subarray(0,newline);pending=pending.subarray(newline+1);if(line.length>1048576)throw Error('E_MCP_INPUT_LIMIT');if(!line.length)continue;let request,response;try{request=JSON.parse(line.toString('utf8'));}catch{response=error(null,-32700,'Parse error');}response??=await dispatch(request);if(response)process.stdout.write(JSON.stringify(response)+'\n');}
  if(pending.length>1048576)throw Error('E_MCP_INPUT_LIMIT');
 }
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await main().catch(()=>{process.stderr.write('Tora MCP transport failed\n');process.exitCode=1;});
