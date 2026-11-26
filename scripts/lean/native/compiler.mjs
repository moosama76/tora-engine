import {playableHTML} from './html.mjs';
import {Buffer} from 'node:buffer';
import {URL} from 'node:url';
import {build} from 'esbuild';
import {nativeCompatibilityPlugin} from './compatibility.mjs';
import {readFile} from 'node:fs/promises';
import {canonical,projectContent} from '../../../packages/creative-project/src/canonical.ts';
import {createHash} from 'node:crypto';
import {validateDocument} from './document.mjs';
import {acceptsTargetBytes,assertNetworkTarget} from './network-targets.mjs';
import {createZip} from './zip.mjs';
export const hash=value=>'sha256:'+createHash('sha256').update(value).digest('hex');
let bundle,bundle3d,reviewBundle;
const compilerFlags={bundle:true,platform:'browser',target:['es2019','safari13'],format:'iife',globalName:'ToraNative',minify:true,charset:'ascii',legalComments:'none',sourcemap:false};
const compilerFlags3d={...compilerFlags,target:'es2020'};
const entryPoints=[new URL('./runtime.mjs',import.meta.url).pathname];
export async function runtimeBundle(){return bundle??=(await build({entryPoints,...compilerFlags,plugins:[nativeCompatibilityPlugin({include3d:false})],write:false})).outputFiles[0].text;}
export async function runtime3dBundle(){return bundle3d??=(await build({entryPoints,...compilerFlags3d,plugins:[nativeCompatibilityPlugin({include3d:true})],write:false})).outputFiles[0].text;}
export async function reviewRuntimeBundle(){return reviewBundle??=(await build({entryPoints,...compilerFlags3d,plugins:[nativeCompatibilityPlugin({includeReview:true,include3d:true})],write:false})).outputFiles[0].text;}
export const projectUses3d=project=>Boolean(project?.components?.some(c=>c.contract==='native.stage3d.v1'));
export async function compileNative(project,{assets=project.assets,target='standalone-browser-draft'}={}){
 validateDocument(project);const networkTarget=assertNetworkTarget(target);if(networkTarget.requiresStoreUrl&&!project.base.storeUrl)throw Error('E_NATIVE_STORE');const is3d=projectUses3d(project),expectedBundle=is3d?await runtime3dBundle():await runtimeBundle(),trustedFile=is3d?'../../../crates/packer/trusted/native-3d.js':'../../../crates/packer/trusted/native.js',runtime=target==='standalone-browser-draft'?expectedBundle:await readFile(new URL(trustedFile,import.meta.url),'utf8');
 if(target!=='standalone-browser-draft'&&expectedBundle!==runtime)throw Error('E_NATIVE_RUNTIME_STALE');
 const html=playableHTML({...project,assets},runtime,target==='standalone-browser-draft'?{}:{network:target}),htmlBytes=Buffer.from(html,'utf8');let archiveBytes,archiveFilename;
 if(networkTarget.packaging==='zip'){
  const id=project.projectId,entries=target==='mintegral-appgrowth-zip'?[{name:`${id}/${id}.html`,bytes:htmlBytes}]:[{name:'index.html',bytes:htmlBytes},...(target==='tiktok-ads-playable'?[{name:'config.json',bytes:Buffer.from('{"Playable_orientation":0}')}]:[])];
  archiveBytes=createZip(entries);archiveFilename=target==='mintegral-appgrowth-zip'?`${id}.zip`:`${id}-${networkTarget.filenameSuffix}.zip`;
 }
 const payload=archiveBytes??htmlBytes;if(!acceptsTargetBytes(networkTarget,payload.length))throw Error('E_UPLOAD_SIZE');
 const artifactHash=hash(payload);return {html,...(archiveBytes?{archiveBytes,archiveBase64:archiveBytes.toString('base64'),archiveFilename}:{}),manifest:{format:'tora-native-artifact-1',sourceRevision:project.revisionId,sourceContentHash:hash('tora-v2-hash/1\ndocument-content\n'+canonical(projectContent(project))),runtimeVersion:'1.0.0',runtimeHash:hash(runtime),artifactHash,assetHashes:project.assets.map(a=>a.hash),target,accepted:false,bytes:payload.length,packaging:networkTarget.packaging,...(archiveBytes?{archiveHash:artifactHash,archiveFilename,htmlBytes:htmlBytes.length}:{}),checks:['native-document-validation',...(target==='standalone-browser-draft'?[]:['trusted-runtime','inline-assets',...(archiveBytes?['deterministic-zip']:[])])],status:target==='standalone-browser-draft'?'DRAFT':'ASSEMBLED_UNVERIFIED',networkAcceptance:false}};
}
