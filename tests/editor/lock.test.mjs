import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import process from 'node:process';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';

test('EditorState cross-platform lockfile serializes separate processes without flock on PATH',async t=>{
 const root=await mkdtemp(resolve('reports/lock-proc-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root);
 const stateDir=resolve(root,'.state');
 const history=new EditorState(store);
 history.directory=stateDir;
 const service=new NativeService(store,history);
 const created=await service.create({id:'lock-test',name:'Lock test'});

 const workerCode=`
  import {ProjectStore} from './scripts/lean/project-store.mjs';
  import {EditorState} from './scripts/lean/editor-state.mjs';
  import {NativeService} from './scripts/lean/native/service.mjs';
  const [root,stateDir,rev,hash,label]=process.argv.slice(1);
  const store=new ProjectStore(root);
  const history=new EditorState(store);
  history.directory=stateDir;
  const service=new NativeService(store,history);
  const env={format:'tora-transaction-1',expected:{revisionId:rev,contentHash:hash},operations:[{kind:'createComponent',component:{id:label,contract:'native.group.v1'}}]};
  try{
   const preview=await service.preview('lock-test',env);
   await service.transact('lock-test',{...env,previewDigest:preview.previewDigest});
   process.stdout.write('OK\\n');
  }catch(err){
   process.stdout.write('ERR:'+err.message+'\\n');
  }
 `;
 const runWorker=label=>new Promise((done,fail)=>{
  const child=spawn(process.execPath,['--input-type=module','-e',workerCode,root,stateDir,created.revisionId,created.contentHash,label],{
   env:{...process.env,PATH:''},
   stdio:['ignore','pipe','pipe'],
  });
  let out='',err='';
  child.stdout.on('data',d=>out+=d);
  child.stderr.on('data',d=>err+=d);
  child.once('error',fail);
  child.once('exit',code=>done({code,out:out.trim(),err:err.trim()}));
 });
 const results=await Promise.all([runWorker('worker.a'),runWorker('worker.b')]);
 assert.deepEqual(results.map(r=>r.code),[0,0],JSON.stringify(results));
 assert.equal(results.filter(r=>r.out==='OK').length,1,JSON.stringify(results));
 assert.equal(results.filter(r=>r.out==='ERR:E_NATIVE_STALE').length,1,JSON.stringify(results));
});

test('EditorState reclaims stale locks and times out on live lock contention',async t=>{
 const root=await mkdtemp(resolve('reports/lock-stale-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 const store=new ProjectStore(root);
 const history=new EditorState(store,{lockTimeoutMs:180,staleLockMs:5000});
 history.directory=resolve(root,'.state');
 const service=new NativeService(store,history);
 const created=await service.create({id:'stale-test',name:'Stale lock test'});
 const lockPath=(await history.file('stale-test'))+'.lock';

 // 1. Live lock owned by current PID blocks concurrent acquisition until lockTimeoutMs.
 await writeFile(lockPath,JSON.stringify({pid:process.pid,acquiredAt:Date.now(),token:'live-holder'}));
 await assert.rejects(
  history.commitRevision('stale-test',created.revisionId,async state=>({state,value:'never'})),
  /E_EDITOR_LOCK_BUSY/,
 );

 // 2. Stale lock (expired acquiredAt) is reclaimed cleanly.
 await writeFile(lockPath,JSON.stringify({pid:process.pid,acquiredAt:Date.now()-60_000,token:'expired-holder'}));
 const value=await history.commitRevision('stale-test',created.revisionId,async state=>({state,value:'reclaimed'}));
 assert.equal(value,'reclaimed');

 // 3. Dead-PID lock older than 100ms is reclaimed cleanly.
 await writeFile(lockPath,JSON.stringify({pid:999_999_999,acquiredAt:Date.now()-500,token:'dead-holder'}));
 const deadReclaimed=await history.commitRevision('stale-test',created.revisionId,async state=>({state,value:'dead-reclaimed'}));
 assert.equal(deadReclaimed,'dead-reclaimed');
});
