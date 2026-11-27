/** Build lean, Node-22-safe publishable npm packages (@tora-engine/tora + 5 platform binary wrappers). */
import {build} from 'esbuild';
import {existsSync} from 'node:fs';
import {chmod,cp,mkdir,readdir,readFile,rm,stat,writeFile} from 'node:fs/promises';
import {dirname,relative,resolve} from 'node:path';
import process from 'node:process';
import {pathToFileURL} from 'node:url';
import {ROOT} from './workspace.mjs';
import {PLATFORM_TARGETS} from './lean/native/native-bin.mjs';

const MAX_STARTER_ASSET_BYTES=1_500_000;
const RUNTIME_TS_SOURCES=[
 'packages/creative-project/src/canonical.ts',
 'packages/creative-project/src/strict-json.ts',
 'packages/adapters/src/index.ts',
];
const STATIC_COPY_PATHS=[
 'bin/tora.mjs',
 'scripts/lean',
 'scripts/serve-editor.mjs',
 'packages/creative-project/src/native-structural.mjs',
 'packages/creative-project/project-v21.schema.json',
 'crates/packer/trusted',
 'network-rules',
 'PRODUCTION_MASTER.md',
 'LICENSE',
 'NOTICE',
 'README.md',
 'docs',
 'skills',
 'assets/free-assets/catalog.json',
];
const STARTER_CC0_FILES=[
 'assets/kenney-racing/plan.json',
 'assets/kenney-racing/imported',
 'assets/kenney-racing/source/racing-pack/extracted/License.txt',
 'assets/kenney-harvest/source/interface-sounds/License.txt',
 'assets/free-audio/arcade-pop/source/INFO.txt',
 'assets/free-audio/arcade-pop/audio/ambient.wav',
];

async function dirSize(path){
 const info=await stat(path);
 if(info.isFile())return info.size;
 let total=0;
 for(const entry of await readdir(path,{withFileTypes:true})){
  total+=await dirSize(resolve(path,entry.name));
 }
 return total;
}

async function rewriteRuntimeTsSpecifiers(dir){
 for(const entry of await readdir(dir,{withFileTypes:true})){
  const full=resolve(dir,entry.name);
  if(entry.isDirectory()){
   await rewriteRuntimeTsSpecifiers(full);
   continue;
  }
  if(!entry.name.endsWith('.mjs'))continue;
  const original=await readFile(full,'utf8');
  const updated=original
   .replaceAll('packages/creative-project/src/canonical.ts','packages/creative-project/src/canonical.mjs')
   .replaceAll('packages/creative-project/src/strict-json.ts','packages/creative-project/src/strict-json.mjs')
   .replaceAll('packages/adapters/src/index.ts','packages/adapters/src/index.mjs');
  if(updated!==original)await writeFile(full,updated,'utf8');
 }
}

async function copyStarterCc0(cliDir){
 let totalBytes=0;
 const copyOne=async rel=>{
  const src=resolve(ROOT,rel);
  if(!existsSync(src))throw Error(`Missing starter asset path: ${rel}`);
  const dst=resolve(cliDir,rel);
  await mkdir(dirname(dst),{recursive:true});
  await cp(src,dst,{recursive:true});
  totalBytes+=await dirSize(dst);
 };
 for(const rel of STARTER_CC0_FILES)await copyOne(rel);

 // Include compact CC0 UI SFX clips from kenney-interface-sounds while staying <= 1.5 MB total.
 const catalog=JSON.parse(await readFile(resolve(ROOT,'assets/free-assets/catalog.json'),'utf8'));
 const sfxSource=catalog.sources?.find(s=>s.id==='kenney-interface-sounds');
 for(const file of sfxSource?.files??[]){
  const src=resolve(ROOT,file.file);
  if(!existsSync(src))continue;
  const size=(await stat(src)).size;
  if(totalBytes+size>MAX_STARTER_ASSET_BYTES)continue;
  await copyOne(file.file);
 }
 if(totalBytes>MAX_STARTER_ASSET_BYTES){
  throw Error(`Starter CC0 bundle exceeds ${MAX_STARTER_ASSET_BYTES} bytes (${totalBytes})`);
 }
 return totalBytes;
}

export async function buildCliPackage({
 outRoot=resolve(ROOT,'dist/packages'),
 binDir,
 version,
}={}){
 const rootPkg=JSON.parse(await readFile(resolve(ROOT,'package.json'),'utf8'));
 const pkgVersion=version??rootPkg.version??'0.1.0';
 const cliDir=resolve(outRoot,'tora');
 await rm(outRoot,{recursive:true,force:true});
 await mkdir(cliDir,{recursive:true});

 for(const rel of STATIC_COPY_PATHS){
  const src=resolve(ROOT,rel);
  if(!existsSync(src))throw Error(`Missing required CLI package file: ${rel}`);
  const dst=resolve(cliDir,rel);
  await mkdir(dirname(dst),{recursive:true});
  await cp(src,dst,{recursive:true});
 }

 const starterBytes=await copyStarterCc0(cliDir);

 // Compile the 3 runtime TS helper files to plain .mjs so Node 22+ works inside node_modules/.
 for(const tsRel of RUNTIME_TS_SOURCES){
  const outRel=tsRel.replace(/\.ts$/,'.mjs');
  const outPath=resolve(cliDir,outRel);
  await mkdir(dirname(outPath),{recursive:true});
  await build({
   absWorkingDir:ROOT,
   entryPoints:[tsRel],
   bundle:true,
   format:'esm',
   platform:'node',
   target:'node22',
   outfile:outPath,
  });
 }
 await rewriteRuntimeTsSpecifiers(resolve(cliDir,'scripts/lean'));
 await chmod(resolve(cliDir,'bin/tora.mjs'),0o755);

 const optionalDependencies=Object.fromEntries(
  Object.values(PLATFORM_TARGETS).map(t=>[t.pkg,pkgVersion]),
 );
 const ajvVersion=JSON.parse(await readFile(resolve(ROOT,'packages/creative-project/package.json'),'utf8')).dependencies.ajv;
 const playwrightVersion=rootPkg.devDependencies.playwright;

 const cliPackageJson={
  name:'@tora-engine/tora',
  version:pkgVersion,
  description:'Local MCP-first 2D & 3D HTML5 playable ad engine with Creative QA and 7 ad-network exporters.',
  license:rootPkg.license??'Apache-2.0',
  repository:rootPkg.repository,
  funding:rootPkg.funding,
  type:'module',
  bin:{tora:'./bin/tora.mjs'},
  files:[
   'bin',
   'scripts',
   'packages',
   'crates/packer/trusted',
   'network-rules',
   'docs',
   'skills',
   'assets',
   'PRODUCTION_MASTER.md',
   'LICENSE',
   'NOTICE',
   'README.md',
  ],
  dependencies:{
   ajv:ajvVersion,
   playwright:playwrightVersion,
  },
  optionalDependencies,
  engines:{node:'>=22.0.0'},
 };
 await writeFile(resolve(cliDir,'package.json'),JSON.stringify(cliPackageJson,null,2)+'\n','utf8');

 const platformDirs=[];
 for(const [pair,info]of Object.entries(PLATFORM_TARGETS)){
  const [osName,cpuName]=pair.split(':');
  const dir=resolve(outRoot,`native-${info.target}`);
  await mkdir(resolve(dir,'bin'),{recursive:true});
  const platPkg={
   name:info.pkg,
   version:pkgVersion,
   description:`Prebuilt Tora native Rust binary for ${info.target}.`,
   license:rootPkg.license??'Apache-2.0',
   repository:rootPkg.repository,
   os:[osName],
   cpu:[cpuName],
   ...(info.target.endsWith('-gnu')?{libc:['glibc']}:{}),
   files:['bin'],
  };
  await writeFile(resolve(dir,'package.json'),JSON.stringify(platPkg,null,2)+'\n','utf8');
  await cp(resolve(ROOT,'LICENSE'),resolve(dir,'LICENSE'));
  if(binDir){
   const candidates=[
    resolve(binDir,info.target,info.bin),
    resolve(binDir,`${info.target}-${info.bin}`),
   ];
   const found=candidates.find(p=>existsSync(p));
   if(found){
    const dst=resolve(dir,'bin',info.bin);
    await cp(found,dst);
    if(osName!=='win32')await chmod(dst,0o755);
   }
  }
  platformDirs.push({target:info.target,pkg:info.pkg,dir});
 }

 const totalCliBytes=await dirSize(cliDir);
 return {cliDir,platformDirs,version:pkgVersion,starterBytes,totalCliBytes};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const args=process.argv.slice(2);
 const binDirIdx=args.indexOf('--bin-dir');
 const binDir=binDirIdx!==-1?args[binDirIdx+1]:undefined;
 const outIdx=args.indexOf('--out');
 const outRoot=outIdx!==-1?resolve(args[outIdx+1]):resolve(ROOT,'dist/packages');
 const res=await buildCliPackage({outRoot,binDir});
 globalThis.console.log(`Built @tora-engine/tora v${res.version} in ${relative(ROOT,res.cliDir)} (${(res.totalCliBytes/1024/1024).toFixed(2)} MiB total, ${(res.starterBytes/1024).toFixed(1)} KiB offline starter CC0).`);
}
