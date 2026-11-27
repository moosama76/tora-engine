/** Cross-platform resolver and SHA-256 verified downloader for Tora's unified native Rust binary. */
import {Buffer} from 'node:buffer';
import {createHash,randomUUID} from 'node:crypto';
import {existsSync,readFileSync} from 'node:fs';
import {chmod,mkdir,readFile,rename,rm,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import process from 'node:process';
import {IS_SOURCE_CHECKOUT,PACKAGE_ROOT,resolveUserCacheDir} from '../runtime-paths.mjs';

const require=createRequire(import.meta.url);

export const PLATFORM_TARGETS=Object.freeze({
 'darwin:arm64':Object.freeze({target:'darwin-arm64',pkg:'@tora-editor/native-darwin-arm64',bin:'playable',rustTarget:'aarch64-apple-darwin'}),
 'darwin:x64':Object.freeze({target:'darwin-x64',pkg:'@tora-editor/native-darwin-x64',bin:'playable',rustTarget:'x86_64-apple-darwin'}),
 'linux:x64':Object.freeze({target:'linux-x64-gnu',pkg:'@tora-editor/native-linux-x64-gnu',bin:'playable',rustTarget:'x86_64-unknown-linux-gnu'}),
 'linux:arm64':Object.freeze({target:'linux-arm64-gnu',pkg:'@tora-editor/native-linux-arm64-gnu',bin:'playable',rustTarget:'aarch64-unknown-linux-gnu'}),
 'win32:x64':Object.freeze({target:'win32-x64-msvc',pkg:'@tora-editor/native-win32-x64-msvc',bin:'playable.exe',rustTarget:'x86_64-pc-windows-msvc'}),
});

export function packageVersion(packageRoot=PACKAGE_ROOT){
 try{
  const parsed=JSON.parse(readFileSync(resolve(packageRoot,'package.json'),'utf8'));
  return typeof parsed.version==='string'&&parsed.version?parsed.version:'0.1.0';
 }catch{
  return '0.1.0';
 }
}

export function platformTarget(platform=process.platform,arch=process.arch){
 return PLATFORM_TARGETS[`${platform}:${arch}`]??null;
}

function unifiedPrefix(kind){
 if(kind==='cli')return [];
 if(kind==='inspect'||kind==='optimize'||kind==='prep')return ['assets',kind];
 throw Error('E_NATIVE_BIN_KIND');
}

export function resolveNativeTool(kind='cli',{
 platform=process.platform,
 arch=process.arch,
 env=process.env,
 version=packageVersion(),
 packageRoot=PACKAGE_ROOT,
 cacheDir=resolveUserCacheDir(env),
 allowCheckoutFallback=IS_SOURCE_CHECKOUT,
}={}){
 const binName=platform==='win32'?'playable.exe':'playable';
 const prefixArgs=unifiedPrefix(kind);

 if(typeof env.TORA_NATIVE_BIN==='string'&&env.TORA_NATIVE_BIN.trim().length>0){
  const explicit=resolve(env.TORA_NATIVE_BIN.trim());
  if(!existsSync(explicit))throw Error('E_NATIVE_BIN_NOT_FOUND');
  return {command:explicit,prefixArgs,mode:'unified',source:'env-bin'};
 }

 if(typeof env.TORA_NATIVE_BIN_DIR==='string'&&env.TORA_NATIVE_BIN_DIR.trim().length>0){
  const candidate=resolve(env.TORA_NATIVE_BIN_DIR.trim(),binName);
  if(existsSync(candidate))return {command:candidate,prefixArgs,mode:'unified',source:'env-dir'};
 }

 const info=platformTarget(platform,arch);
 if(info){
  try{
   const resolved=require.resolve(`${info.pkg}/bin/${info.bin}`);
   if(existsSync(resolved))return {command:resolved,prefixArgs,mode:'unified',source:'optional-dep'};
  }catch{
   /* Optional platform package not installed. */
  }
  const cached=resolve(cacheDir,'bin',version,info.target,info.bin);
  if(existsSync(cached))return {command:cached,prefixArgs,mode:'unified',source:'cache'};
 }

 if(allowCheckoutFallback){
  for(const profile of ['release','debug']){
   const candidate=resolve(packageRoot,'target',profile,binName);
   if(existsSync(candidate))return {command:candidate,prefixArgs,mode:'unified',source:`checkout-${profile}`};
  }
  if(kind==='inspect'||kind==='optimize'){
   const legacyName=kind==='inspect'
    ?(platform==='win32'?'inspect_native.exe':'inspect_native')
    :(platform==='win32'?'optimize_native.exe':'optimize_native');
   const legacy=resolve(packageRoot,'target/debug/examples',legacyName);
   if(existsSync(legacy))return {command:legacy,prefixArgs:[],mode:'legacy',source:'checkout-example'};
  }
 }

 return null;
}

export function requireNativeTool(kind='cli',options={}){
 const found=resolveNativeTool(kind,options);
 if(!found)throw Error('E_NATIVE_BIN_UNAVAILABLE');
 return found;
}

export function hasNativeBinary(kind='inspect',options={}){
 try{return Boolean(resolveNativeTool(kind,options));}catch{return false;}
}

export async function loadReleaseManifest(manifestPath=resolve(PACKAGE_ROOT,'crates/packer/trusted/release-manifest.json')){
 try{
  return JSON.parse(await readFile(manifestPath,'utf8'));
 }catch{
  return null;
 }
}

export async function ensureNativeBinary({
 allowDownload=true,
 manifest,
 manifestPath,
 releaseBaseUrl,
 version=packageVersion(),
 fetchImpl=globalThis.fetch,
 platform=process.platform,
 arch=process.arch,
 env=process.env,
 packageRoot=PACKAGE_ROOT,
 cacheDir=resolveUserCacheDir(env),
}={}){
 const existing=resolveNativeTool('cli',{platform,arch,env,version,packageRoot,cacheDir});
 if(existing)return {...existing,downloaded:false};
 if(!allowDownload)throw Error('E_NATIVE_BIN_UNAVAILABLE');
 const info=platformTarget(platform,arch);
 if(!info)throw Error('E_NATIVE_BIN_UNSUPPORTED_PLATFORM');
 const resolvedManifest=manifest??await loadReleaseManifest(manifestPath);
 const entry=resolvedManifest?.targets?.[info.target];
 const expectedSha=entry?.sha256;
 if(typeof expectedSha!=='string'||!/^sha256:[a-f0-9]{64}$/.test(expectedSha)){
  throw Error('E_NATIVE_BIN_MANIFEST');
 }
 const url=entry.url??(releaseBaseUrl
  ?`${releaseBaseUrl.replace(/\/+$/,'')}/v${version}/${entry.filename??`${info.target}-${info.bin}`}`
  :`https://github.com/moosama76/tora-engine/releases/download/v${version}/${entry.filename??`${info.target}-${info.bin}`}`);
 if(!url.startsWith('https://')&&!url.startsWith('http://127.0.0.1:'))throw Error('E_NATIVE_BIN_ORIGIN');
 const response=await fetchImpl(url);
 if(!response?.ok)throw Error('E_NATIVE_BIN_DOWNLOAD');
 const bytes=Buffer.from(await response.arrayBuffer());
 const actualSha='sha256:'+createHash('sha256').update(bytes).digest('hex');
 if(actualSha!==expectedSha)throw Error('E_NATIVE_BIN_CHECKSUM');

 const destDir=resolve(cacheDir,'bin',version,info.target);
 await mkdir(destDir,{recursive:true});
 const destPath=resolve(destDir,info.bin);
 const tmpPath=resolve(destDir,`.${info.bin}.${randomUUID()}.tmp`);
 try{
  await writeFile(tmpPath,bytes,{flag:'wx'});
  if(platform!=='win32')await chmod(tmpPath,0o755);
  await rename(tmpPath,destPath);
 }finally{
  await rm(tmpPath,{force:true});
 }
 return {command:destPath,prefixArgs:[],mode:'unified',source:'cache',downloaded:true,sha256:actualSha};
}
