import {isStoreDestination} from "@playable/adapters";
import type {NetworkBridge} from "./index.js";

export interface Mraid2 {
  getState(): string;
  isViewable(): boolean;
  addEventListener(name: string, listener: (...args: unknown[]) => void): void;
  removeEventListener(name: string, listener: (...args: unknown[]) => void): void;
  open(url: string): void;
}
/** AppLovin MRAID 2 only. Host injection is external; there is no permissive fallback/mock. */
export function createAppLovinBridge(options: {getHost?: () => Mraid2 | undefined; timeoutMs?: number; pollMs?: number; onResize?: () => void} = {}): NetworkBridge {
  const getHost=options.getHost ?? (()=>(window as Window & {mraid?:Mraid2}).mraid);
  let host:Mraid2|undefined,ready=false,visible=false,closed=false,destroyed=false,subscribed=false;
  let operation:Promise<void>|undefined,resolveInit:(()=>void)|undefined,rejectInit:((e:Error)=>void)|undefined;
  let deadline:ReturnType<typeof setTimeout>|undefined,poll:ReturnType<typeof setTimeout>|undefined;
  const visibility=new Set<(visible:boolean)=>void>(),closing=new Set<()=>void>();
  const registered:Array<[string,(...args:unknown[])=>void]>=[];
  function cleanup(){clearTimeout(deadline);clearTimeout(poll);for(const [name,fn]of registered.splice(0)){try{host?.removeEventListener(name,fn);}catch{/* A failing host must not prevent the remaining teardown. */}}}
  function subscribe(name:string,fn:(...args:unknown[])=>void){registered.push([name,fn]);host!.addEventListener(name,fn);if(closed||destroyed){try{host!.removeEventListener(name,fn);}catch{/* Late registration on a failing host: best-effort cleanup. */}return false;}return true;}
  function reject(cause:unknown){const error=cause instanceof Error?cause:Error(String(cause));rejectInit?.(error);resolveInit=undefined;rejectInit=undefined;}
  function terminate(cause:unknown,notify:boolean){if(closed||destroyed)return;closed=true;ready=false;visible=false;cleanup();reject(cause);if(notify)for(const fn of [...closing])fn();}
  function becomeReady(){
    if(!subscribed||ready||closed||destroyed)return;
    try{
      const state=host!.getState();if(closed||destroyed)return;if(state==="loading")return;
      if(state==="hidden"){terminate(Error("MRAID closed before ready"),true);return;}
      if(!["default","expanded","resized"].includes(state))throw Error("Invalid MRAID state");
      for(const [name,fn]of [["viewableChange",onVisible],["stateChange",onState],["sizeChange",onSize]] as const){if(!subscribe(name,fn))return;}
      const value=host!.isViewable();if(closed||destroyed)return;if(typeof value!=="boolean")throw Error("Invalid MRAID viewability");
      visible=value;ready=true;clearTimeout(deadline);clearTimeout(poll);resolveInit?.();resolveInit=undefined;rejectInit=undefined;
      for(const fn of [...visibility])fn(visible);
    }catch(e){terminate(e,ready);}
  }
  const onReady=()=>becomeReady();
  const onVisible=(value:unknown)=>{if(!ready||closed||destroyed)return;if(typeof value!=="boolean"){terminate(Error("Invalid MRAID visibility event"),true);return;}visible=value;for(const fn of [...visibility])fn(visible);};
  const onState=(value:unknown)=>{if(value==="hidden")terminate(Error("MRAID closed"),true);};
  const onSize=()=>{if(ready&&!closed&&!destroyed)options.onResize?.();};
  function attach(){
    if(closed||destroyed)return;
    try{
      host=getHost();if(closed||destroyed)return;if(!host){poll=setTimeout(attach,options.pollMs??50);return;}
      if(![host.getState,host.isViewable,host.addEventListener,host.removeEventListener,host.open].every(fn=>typeof fn==="function"))throw Error("Incomplete MRAID 2 interface");
      for(const [name,fn]of [["ready",onReady]] as const){
        if(!subscribe(name,fn))return;
      }
      subscribed=true;becomeReady();
    }catch(e){terminate(e,false);}
  }
  return {
    init(){if(operation)return operation;operation=new Promise<void>((resolve,reject)=>{resolveInit=resolve;rejectInit=reject;});if(closed||destroyed){reject(Error("MRAID bridge destroyed"));return operation;}deadline=setTimeout(()=>terminate(Error("MRAID readiness timed out"),false),options.timeoutMs??5000);attach();return operation;},
    isReady:()=>ready&&!closed&&!destroyed,isVisible:()=>visible&&ready&&!closed&&!destroyed,isClosed:()=>closed||destroyed,
    onVisibilityChanged(fn){if(!closed&&!destroyed)visibility.add(fn);return()=>visibility.delete(fn);},
    onClosed(fn){if(!closed&&!destroyed)closing.add(fn);return()=>closing.delete(fn);},
    openStore(url){if(!ready||!visible||closed||destroyed||!isStoreDestination(url))throw Error("MRAID store request not permitted");host!.open(url);},
    destroy(){if(destroyed)return;destroyed=true;ready=false;visible=false;cleanup();reject(Error("MRAID bridge destroyed"));visibility.clear();closing.clear();},
  };
}
