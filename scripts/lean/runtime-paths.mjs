/** Single-source resolution of immutable PACKAGE_ROOT vs mutable active WORKSPACE_ROOT. */
import {existsSync} from 'node:fs';
import {homedir} from 'node:os';
import {resolve,sep} from 'node:path';
import process from 'node:process';

export const PACKAGE_ROOT=resolve(import.meta.dirname,'../..');
export const IS_SOURCE_CHECKOUT=existsSync(resolve(PACKAGE_ROOT,'Cargo.toml'));

export function resolveWorkspaceRoot(explicitWorkspace){
 if(typeof explicitWorkspace==='string'&&explicitWorkspace.trim().length>0){
  return resolve(explicitWorkspace.trim());
 }
 if(typeof process.env.TORA_WORKSPACE_ROOT==='string'&&process.env.TORA_WORKSPACE_ROOT.trim().length>0){
  return resolve(process.env.TORA_WORKSPACE_ROOT.trim());
 }
 return IS_SOURCE_CHECKOUT?PACKAGE_ROOT:resolve(process.cwd());
}

export function allowedStoreRoots(workspaceRoot){
 const ws=resolveWorkspaceRoot(workspaceRoot);
 return [resolve(ws,'.tora'),resolve(ws,'reports')];
}

export function isAllowedStoreRoot(candidate,workspaceRoot){
 const resolved=resolve(candidate);
 return allowedStoreRoots(workspaceRoot).some(base=>resolved.startsWith(base+sep));
}

export function defaultStoreRoot(workspaceRoot){
 const ws=resolveWorkspaceRoot(workspaceRoot);
 const envStore=typeof process.env.TORA_PROJECT_STORE==='string'&&process.env.TORA_PROJECT_STORE.trim().length>0
  ?process.env.TORA_PROJECT_STORE.trim()
  :null;
 return envStore?resolve(ws,envStore):resolve(ws,'.tora/native-projects');
}

export function resolveEditorStateDir(workspaceRoot){
 return resolve(resolveWorkspaceRoot(workspaceRoot),'.tora/editor-state');
}

export function resolveRemoteCacheRoot(workspaceRoot){
 return resolve(resolveWorkspaceRoot(workspaceRoot),'.tora/remote-asset-cache');
}

export function resolvePreparedAssetsRoot(workspaceRoot){
 return resolve(resolveWorkspaceRoot(workspaceRoot),'.tora/prepared-assets');
}

export function resolveUserCacheDir(env=process.env){
 if(typeof env.TORA_CACHE_DIR==='string'&&env.TORA_CACHE_DIR.trim().length>0){
  return resolve(env.TORA_CACHE_DIR.trim());
 }
 if(process.platform==='win32'&&env.LOCALAPPDATA){
  return resolve(env.LOCALAPPDATA,'tora');
 }
 if(env.XDG_CACHE_HOME){
  return resolve(env.XDG_CACHE_HOME,'tora');
 }
 return resolve(homedir(),'.cache','tora');
}
