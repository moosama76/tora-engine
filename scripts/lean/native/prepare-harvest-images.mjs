import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import process from 'node:process';
import {preparePngSource} from './asset-policy.mjs';

// Import preparation only. Original pixels/IDAT and source files stay intact.
const root=resolve(import.meta.dirname,'../../..');
const catalogFile=resolve(root,'assets/free-assets/catalog.json');
const catalog=JSON.parse(await readFile(catalogFile,'utf8'));
const source=catalog.sources.find(source=>source.id==='kenney-tiny-farm');
const hash=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');
for(const file of source.files){
 const raw='assets/kenney-harvest/source/tiny-farm/'+file.path;
 const bytes=await readFile(resolve(root,raw));
 const prepared=preparePngSource(bytes);
 const imported='assets/kenney-harvest/imported/'+file.path;
 await mkdir(dirname(resolve(root,imported)),{recursive:true});
 await writeFile(resolve(root,imported),prepared);
 Object.assign(file,{file:imported,sha256:hash(prepared),processing:{kind:'png-strip-color-metadata',sourceFile:raw,sourceSha256:hash(bytes)}});
}
await writeFile(catalogFile,JSON.stringify(catalog,null,2)+'\n');
const planFile=resolve(root,'assets/kenney-harvest/plan.json');
const plan=JSON.parse(await readFile(planFile,'utf8'));
for(const asset of plan.assets){
 if(asset.provenance.sourceId!==source.id)continue;
 const file=source.files.find(file=>file.path===asset.provenance.sourceFile);
 asset.file=file.file.slice('assets/kenney-harvest/'.length);asset.provenance.sourceHash=file.sha256;
}
await writeFile(planFile,JSON.stringify(plan,null,2)+'\n');
process.stdout.write(`Prepared ${source.files.length} licensed PNGs with exact retained image bytes.\n`);
