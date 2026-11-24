import type {Mraid2} from "@playable/adapters/applovin";
export interface HostOptions {state?:string;visible?:boolean;absent?:boolean;manualFrames?:boolean;stateThrows?:boolean;visibleThrows?:boolean;version?:string}
/** Explicit test injection. This module is never imported by a shipping entry. */
export function installMraidHost(options:HostOptions={}){
  let state=options.state??"loading",visible=options.visible??false,gesture=0,gestureAt=0,openFailure=false;
  const listeners=new Map<string,Set<(...args:unknown[])=>void>>();
  const calls:Array<{name:string;args?:unknown[];trusted?:boolean;at:number}>=[];
  const record=(name:string,args?:unknown[],trusted?:boolean)=>{calls.push({name,at:performance.now(),...(args?{args}:{}),...(trusted!==undefined?{trusted}:{})});if(calls.length>1000)throw Error("Unbounded host calls");};
  const mraid:Mraid2&{getVersion():string}={getVersion(){if(state==="loading")throw Error("Premature MRAID version query");record("getVersion");return options.version??"2.0";},getState(){record("getState");if(options.stateThrows)throw Error("Injected getState failure");return state;},isViewable(){record("isViewable");if(state==="loading")throw Error("Premature MRAID query");if(options.visibleThrows)throw Error("Injected isViewable failure");return visible;},addEventListener(name,fn){if(state==="loading"&&name!=="ready")throw Error("Premature MRAID subscription");record(`add:${name}`);if(!listeners.has(name))listeners.set(name,new Set());listeners.get(name)!.add(fn);},removeEventListener(name,fn){record(`remove:${name}`);listeners.get(name)?.delete(fn);},open(url){record("open",[url],gesture>0&&performance.now()-gestureAt<1000);if(state==="loading"||state==="hidden"||!visible)throw Error("Premature/hidden open");if(openFailure)throw Error("Injected open failure");}};
  const emit=(name:string,...args:unknown[])=>{for(const fn of [...(listeners.get(name)??[])])fn(...args);};
  const frames=new Map<number,FrameRequestCallback>();let frameId=0,time=0;
  if(options.manualFrames){window.requestAnimationFrame=fn=>{frames.set(++frameId,fn);return frameId;};window.cancelAnimationFrame=id=>frames.delete(id);}
  document.addEventListener("click",event=>{gesture=event.isTrusted?gesture+1:0;gestureAt=performance.now();},true);
  const controls={
    install(){Object.assign(window,{mraid});},
    ready(value=false){state="default";visible=value;emit("ready");},
    visible(value:boolean){visible=value;emit("viewableChange",value);},
    close(){state="hidden";visible=false;emit("stateChange","hidden");},
    resize(){emit("sizeChange",320,480);},
    failOpen(value:boolean){openFailure=value;},
    advance(count:number,step=50){for(let i=0;i<count;i++){const pending=[...frames.entries()];frames.clear();time+=step;for(const [,fn]of pending)fn(time);}},
    snapshot(){return{state,visible,calls:[...calls],listeners:[...listeners.values()].reduce((n,s)=>n+s.size,0),pendingFrames:frames.size};},
  };
  if(!options.absent)controls.install();Object.assign(window,{__mraidTest:controls});return controls;
}
