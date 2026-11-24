import {mkdir,cp,writeFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import process from 'node:process';
import {reviewRuntimeBundle} from './lean/native/compiler.mjs';

const root=resolve(import.meta.dirname,'..');
const defaultOutput=resolve(root,'dist/editor');

export async function buildEditor(out=defaultOutput){
 const source=resolve(root,'scripts/lean/editor');
 const runtime=await reviewRuntimeBundle();
 if(resolve(out)===defaultOutput)await rm(defaultOutput,{recursive:true,force:true});
 await mkdir(out,{recursive:true});
 await Promise.all([
  ...['index.html','entry.js','review-editor.js','review-intake.js','review-editor.css','brand']
   .map(name=>cp(resolve(source,name),resolve(out,name),{recursive:true})),
  writeFile(resolve(out,'review-runtime.js'),runtime),
 ]);
 return out;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 await buildEditor();
 globalThis.console.log('Built Tora review assets. Start the local service with npm run dev:editor.');
}
