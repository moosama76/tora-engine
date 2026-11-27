import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import process from 'node:process';
import {createEditorServer} from './lean/editor.mjs';
import {ProjectStore} from './lean/project-store.mjs';
import {hasNativeBinary} from './lean/native/native-bin.mjs';
import {resolveWorkspaceRoot} from './lean/runtime-paths.mjs';

export async function startEditor({port=Number(process.env.EDITOR_PORT??8001),storeRoot,workspaceRoot}={}){
 const ws=resolveWorkspaceRoot(workspaceRoot);
 const resolvedStore=resolve(ws,storeRoot??process.env.EDITOR_STORE??'.tora/native-projects');
 const server=await createEditorServer({store:new ProjectStore(resolvedStore,{workspaceRoot:ws}),port});
 return {url:'http://127.0.0.1:'+server.address().port,storeRoot:resolvedStore,workspaceRoot:ws,close:()=>new Promise(done=>{server.closeAllConnections();server.close(done);})};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const port=process.env.EDITOR_PORT??'8001',store=process.env.EDITOR_STORE??'.tora/native-projects';
 if(!/^\d+$/.test(port)||(Number(port)!==0&&Number(port)<1024)||Number(port)>65535)throw Error('EDITOR_PORT must be 0 or 1024–65535');
 if(!hasNativeBinary('inspect')){
  globalThis.console.warn('Warning: native media decoder not built yet. Run `npm run setup` or `tora init` before uploading PNG/JPEG assets.');
 }
 const {url}=await startEditor({port:Number(port),storeRoot:store});
 globalThis.console.log('Tora editor: '+url+'/?view=new');
 if(process.env.EDITOR_PROJECT)globalThis.console.log('Open project: '+url+'/?project='+encodeURIComponent(process.env.EDITOR_PROJECT));
}
