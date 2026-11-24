import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import process from 'node:process';
import {buildEditor} from '../../scripts/build-editor.mjs';
import {startEditor} from '../../scripts/serve-editor.mjs';
test('default editor service and generated shell are Tora, not the removed form editor',async()=>{
 const output=await mkdtemp(resolve(tmpdir(),'tora-editor-build-'));await buildEditor(output);
 assert.match(await readFile(resolve(output,'index.html'),'utf8'),/Tora — Playable editor/);
 const service=await startEditor({port:0});try{const response=await globalThis.fetch(service.url),html=await response.text();assert.equal(response.status,200);assert.match(html,/tora-review/);assert.match(html,/entry\.js/);assert.doesNotMatch(html,/dropzone/);}finally{await service.close();}
});

test('native CLI serves project routes with no shell or Graphene launcher on PATH',async t=>{
 const child=spawn(process.execPath,['scripts/serve-editor.mjs'],{
  env:{...process.env,PATH:'',EDITOR_PORT:'0'},
  stdio:['ignore','pipe','pipe'],
 });
 const exited=once(child,'exit');
 t.after(async()=>{child.kill();await exited;});
 const url=await new Promise((resolve,reject)=>{
  let output='';
  child.stderr.on('data',chunk=>{output+=chunk;});
  child.stdout.on('data',chunk=>{
   output+=chunk;
   const address=output.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
   if(address)resolve(address);
  });
  child.once('error',reject);
  child.once('exit',code=>reject(new Error('Native launcher exited '+code+': '+output)));
 });
 const response=await globalThis.fetch(url+'/api/creation/capabilities');
 assert.equal(response.status,200);
 assert.ok((await response.json()).operations.includes('createScene'));
});
