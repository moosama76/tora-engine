import {assertStorePath} from './store-path.mjs';
import {mkdir,mkdtemp,writeFile,readFile,rename,rm,rmdir,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {randomUUID,createHash} from 'node:crypto';
import {projectBundle,readProjectBundle} from './project-bundle.mjs';
import {lowerAssets,registerSource} from './assets.mjs';
const run=promisify(execFile),root=resolve(import.meta.dirname,'../../..');
export async function exportProjectFile(service,id){const current=await service.read(id),assets=await lowerAssets(resolve(service.store.root,id),current.project.assets);return projectBundle(current.project,Object.fromEntries(assets.map(a=>[a.hash,a.data])));}
export async function importProjectFile(service,text,{copy=false}={}){
 await assertStorePath(service.store.root);await mkdir(service.store.root,{recursive:true});const stage=await mkdtemp(resolve(service.store.root,'.import-'));let reserved;
 try{
 const decodeImage=async(bytes,mime)=>{const decoder=resolve(root,'target/debug/examples/inspect_native');try{await access(decoder);}catch{await run('cargo',['build','--locked','-p','asset-pipeline','--example','inspect_native'],{cwd:root});}await writeFile(resolve(stage,'image'),bytes);const result=JSON.parse((await run(decoder,[stage,'image'],{timeout:10000})).stdout)[0];if(result.source_mime!==mime)throw Error('E_NATIVE_ASSET_MIME');};
 const bundle=await readProjectBundle(text,{decodeImage});if(copy)bundle.project.projectId=bundle.project.projectId.slice(0,32)+'-import-'+randomUUID().slice(0,8);const id=bundle.project.projectId,target=resolve(service.store.root,id);
 const journal=resolve(service.history.directory,createHash('sha256').update(service.store.root+'\0'+id).digest('hex')+'.json');try{await access(journal);throw Error('E_PROJECT_EXISTS');}catch(e){if(e.code!=='ENOENT')throw e;}
 const folder=resolve(stage,id);await mkdir(folder);await mkdir(resolve(folder,'revisions'));await writeFile(resolve(folder,'workspace.json'),JSON.stringify({format:'tora-local-workspace-1',id,kind:'native-scene',status:'DRAFT',activeRevision:'initial'}));for(const asset of bundle.project.assets)await registerSource(folder,{id:asset.id,mime:asset.mime,rights:asset.rights,data:bundle.assets[asset.hash]});await writeFile(resolve(folder,'project.json'),JSON.stringify(bundle.project));
 // Reserving the ID prevents concurrent creators from being overwritten.
 try{await mkdir(target);reserved=target;}catch(e){if(e.code==='EEXIST')throw Error('E_PROJECT_EXISTS',{cause:e});throw e;}await rename(folder,target);reserved=undefined;return {status:'IMPORTED',projectId:id,accepted:false};
 }finally{if(reserved)await rmdir(reserved);await rm(stage,{recursive:true,force:true});}
}
export async function importProjectPath(service,file,options){const {stat}=await import('node:fs/promises');if((await stat(file)).size>64*1024*1024)throw Error('E_BUNDLE_SIZE');return importProjectFile(service,await readFile(file,'utf8'),options);}
