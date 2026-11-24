/** One JSON request on stdin, one compact JSON response on stdout. */
import process from 'node:process';
import {Buffer} from 'node:buffer';
import {resolve} from 'node:path';
import {ProjectStore} from '../project-store.mjs';
import {EditorState} from '../editor-state.mjs';
import {NativeService} from './service.mjs';
import {NativeAgentTools} from './agent-tools.mjs';
try{
 const chunks=[];let bytes=0;for await(const chunk of process.stdin){bytes+=chunk.length;if(bytes>1048576)throw Error('E_AGENT_INPUT_LIMIT');chunks.push(chunk);}
 const input=JSON.parse(Buffer.concat(chunks).toString('utf8'));const store=new ProjectStore(resolve(process.env.TORA_PROJECT_STORE??'.tora/native-projects'));
 const result=await new NativeAgentTools(new NativeService(store,new EditorState(store))).run(input);globalThis.console.log(JSON.stringify(result));
}catch(error){const code=/^E_[A-Z_]+$/.test(error.message)?error.message:'E_AGENT_FAILED';globalThis.console.error(JSON.stringify({status:'REJECTED',code}));process.exitCode=1;}
