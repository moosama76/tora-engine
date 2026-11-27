/** Lazy, crash-recovering Playwright Chromium manager for local authoring/QA. */
import {setTimeout,clearTimeout} from 'node:timers';

const IDLE_MS=5*60*1000;
let browser=null,launching=null,idleTimer=null;

function scheduleIdleClose(){
 if(idleTimer)clearTimeout(idleTimer);
 idleTimer=setTimeout(()=>{void closeSharedBrowser();},IDLE_MS);
 idleTimer.unref?.();
}

export async function getSharedBrowser(launcher){
 if(browser?.isConnected?.()){
  scheduleIdleClose();
  return browser;
 }
 browser=null;
 if(!launching){
  launching=(async()=>{
   const launch=launcher??(async()=>{
    const {chromium}=await import('playwright');
    return chromium.launch({headless:true});
   });
   const instance=await launch();
   instance.on?.('disconnected',()=>{if(browser===instance)browser=null;});
   browser=instance;
   scheduleIdleClose();
   return instance;
  })().finally(()=>{launching=null;});
 }
 return launching;
}

export async function closeSharedBrowser(){
 if(idleTimer){clearTimeout(idleTimer);idleTimer=null;}
 const pending=launching,current=browser;
 browser=null;
 if(pending){
  try{const launched=await pending;if(launched&&launched!==current)await launched.close?.();}catch{/* ignore */}
 }
 if(current){
  await current.close?.().catch(()=>{});
 }
}
