/** Working revision journal shared by native HTTP and MCP clients. */
import {open,readFile,stat,unlink,writeFile,mkdir,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import process from 'node:process';
import {setTimeout as delay} from 'node:timers/promises';

const sharedQueues=new Map();

function isPidAlive(pid){
 if(!Number.isInteger(pid)||pid<=0)return false;
 try{process.kill(pid,0);return true;}catch(error){return error.code==='EPERM';}
}

export class EditorState{
 constructor(store,{lockTimeoutMs=15000,staleLockMs=30000}={}){
  this.queues=sharedQueues;
  this.store=store;
  this.lockTimeoutMs=lockTimeoutMs;
  this.staleLockMs=staleLockMs;
  this.directory=resolve(import.meta.dirname,'../../.tora/editor-state');
 }
 async readRevisionJournal(id){
  let state;
  try{state=JSON.parse(await readFile(await this.file(id),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
  if(state&&(state.format!=='tora-revision-journal-1'||state.projectId!==id||!Number.isInteger(state.index)||!Array.isArray(state.history)||!state.history[state.index]||!Array.isArray(state.accepted)))throw Error('E_EDITOR_SAVED_STATE');
  return state??{format:'tora-revision-journal-1',projectId:id,index:0,history:['initial'],accepted:[]};
 }
 async acquireFileLock(lockPath){
  const token=randomUUID(),deadline=Date.now()+this.lockTimeoutMs;
  for(;;){
   try{
    const handle=await open(lockPath,'wx');
    try{await handle.writeFile(JSON.stringify({pid:process.pid,acquiredAt:Date.now(),token}));}
    finally{await handle.close();}
    return token;
   }catch(error){
    if(error.code!=='EEXIST')throw error;
    const reclaimed=await this.tryReclaimStaleLock(lockPath);
    if(reclaimed)continue;
    if(Date.now()>=deadline)throw Error('E_EDITOR_LOCK_BUSY',{cause:error});
    await delay(10+Math.floor(Math.random()*25));
   }
  }
 }
 async tryReclaimStaleLock(lockPath){
  let info;
  try{info=await stat(lockPath);}catch(error){return error.code==='ENOENT';}
  let parsed;
  try{parsed=JSON.parse(await readFile(lockPath,'utf8'));}catch{parsed=null;}
  const age=Date.now()-(Number.isFinite(parsed?.acquiredAt)?parsed.acquiredAt:info.mtimeMs);
  const deadOwner=parsed&&Number.isInteger(parsed.pid)&&parsed.pid!==process.pid&&!isPidAlive(parsed.pid);
  // Grace window of 100ms avoids racing a sibling process currently writing its lock JSON.
  const stale=age>this.staleLockMs||(deadOwner&&age>100);
  if(!stale)return false;
  try{
   const current=await stat(lockPath);
   if(current.mtimeMs!==info.mtimeMs||current.size!==info.size)return false;
   await unlink(lockPath);
   return true;
  }catch(error){
   return error.code==='ENOENT';
  }
 }
 async releaseFileLock(lockPath,token){
  try{
   const parsed=JSON.parse(await readFile(lockPath,'utf8'));
   if(parsed?.token&&parsed.token!==token)return;
  }catch(error){
   if(error.code==='ENOENT')return;
  }
  await unlink(lockPath).catch(()=>{});
 }
 async commitRevision(id,expected,build){
  return this.lock(id,async()=>{
   // HTTP and stdio MCP are usually separate processes. Hold an exclusive cross-platform
   // lockfile across the head check and atomic journal write.
   const lockPath=(await this.file(id))+'.lock';
   const token=await this.acquireFileLock(lockPath);
   try{
    const state=await this.readRevisionJournal(id);
    if(state.history[state.index]!==expected)throw Error('E_NATIVE_STALE');
    const result=await build(state);
    await this.write(id,result.state);
    return result.value;
   }finally{
    await this.releaseFileLock(lockPath,token);
   }
  });
 }
 async file(id){await this.store.open(id);await mkdir(this.directory,{recursive:true});return resolve(this.directory,createHash('sha256').update(this.store.root+'\0'+id).digest('hex')+'.json');}
 async write(id,state){const path=await this.file(id),temp=path+'.'+randomUUID()+'.tmp';await writeFile(temp,JSON.stringify(state));await rename(temp,path);}
 async lock(id,fn){id=this.store.root+'\0'+id;const prior=this.queues.get(id)??Promise.resolve();let release;const done=new Promise(r=>release=r);this.queues.set(id,done);await prior;try{return await fn();}finally{release();if(this.queues.get(id)===done)this.queues.delete(id);}}
}
