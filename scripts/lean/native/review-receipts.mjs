const safeInteger=value=>Number.isSafeInteger(value)&&value>=0;

export function createReviewReceipt(requestId,expected,now=Date.now()){
 return {
  format:'tora-review-receipt-1',requestId,baseline:expected,route:'unresolved',submittedAt:now,
  candidateId:null,disposition:'submitted',providerCalls:[],providerUsage:{inputTokens:0,outputTokens:0,cachedInputTokens:0},
  tools:[],repairs:0,clarifications:0,verificationRuns:[],cache:{buildHits:0,buildMisses:0,verifyHits:0,verifyMisses:0},
  timing:{queueMs:null,providerMs:0,previewMs:0,compilationMs:0,playbackMs:0,endToEndMs:null},rateLimitWaitMs:0,
 };
}

function usageTotals(receipt){
 const reported=receipt.providerCalls.map(call=>call.usage).filter(Boolean);
 for(const key of ['inputTokens','outputTokens','cachedInputTokens']){
  receipt.providerUsage[key]=reported.length===receipt.providerCalls.length&&reported.every(usage=>safeInteger(usage[key]))
   ?reported.reduce((sum,usage)=>sum+usage[key],0):null;
 }
}

export function applyReviewReceiptEvent(receipt,event,now=Date.now()){
 if(!receipt)return;
 const duration=safeInteger(event.durationMs)?event.durationMs:0;
 switch(event.type){
  case 'route':
   receipt.route=event.route;
   receipt.timing.queueMs??=Math.max(0,now-receipt.submittedAt);
   break;
  case 'provider-start':
   receipt.providerCalls.push({model:event.model,status:'attempted',durationMs:0,usage:null,
    ...(event.phase?{phase:event.phase}:{})});
   usageTotals(receipt);
   break;
  case 'provider-success':{
   const call=receipt.providerCalls.at(-1);
   if(call)Object.assign(call,{status:'completed',durationMs:duration,usage:event.usage??null});
   receipt.timing.providerMs+=duration;
   usageTotals(receipt);
   break;
  }
  case 'provider-error':{
   const call=receipt.providerCalls.at(-1);
   if(call)Object.assign(call,{status:'failed',durationMs:duration,error:event.code,usage:null});
   receipt.timing.providerMs+=duration;
   if(safeInteger(event.retryAfterSeconds))receipt.rateLimitWaitMs+=event.retryAfterSeconds*1000;
   usageTotals(receipt);
   break;
  }
  case 'tool':
   receipt.tools.push({name:event.name,status:event.status,responseBytes:event.responseBytes??null,durationMs:duration});
   if(event.name==='preview'&&event.status==='completed')receipt.timing.previewMs+=duration;
   break;
  case 'compilation':
   receipt.timing.compilationMs+=duration;
   break;
  case 'playback':
   receipt.timing.playbackMs+=duration;
   receipt.verificationRuns.push({kind:event.kind,outcomes:event.outcomes??[],status:event.status,durationMs:duration});
   break;
  case 'cache':
   receipt.cache??={buildHits:0,buildMisses:0,verifyHits:0,verifyMisses:0};
   if(event.stage==='build')receipt.cache[event.hit?'buildHits':'buildMisses']++;
   else receipt.cache[event.hit?'verifyHits':'verifyMisses']++;
   break;
  case 'repair':receipt.repairs++;break;
  case 'clarification':receipt.clarifications++;break;
  case 'final':{
   const candidateAlreadyTimed=receipt.candidateId!==null&&receipt.timing.endToEndMs!==null;
   receipt.disposition=event.disposition;
   receipt.candidateId=event.candidateId??receipt.candidateId;
   if(!candidateAlreadyTimed||!['promoted','discarded'].includes(event.disposition))
    receipt.timing.endToEndMs=Math.max(0,now-receipt.submittedAt);
   break;
  }
 }
 return receipt;
}
