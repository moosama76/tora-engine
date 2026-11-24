export const record=(project,collection,id)=>project[collection].find(item=>item.id===id);
export const layout=(project,id)=>record(project,'gameplay',id+'.responsive');
export const pixelText=/^[A-Za-z0-9 !?.,:+/'-]+$/;
export const standardText={maxLength:36,pattern:pixelText.source};
export const fieldLimits={
 instruction:standardText,message:standardText,'timeout-caption':standardText,
 text:{maxLength:24,pattern:pixelText.source},
 'landscape-inset':{min:8,max:14},'hint-delay':{min:0.5,max:6},
 'reveal-duration':{min:0.15,max:1.25},'payoff-hold':{min:0.5,max:4},
 'feedback-duration':{min:0.1,max:0.6},'caption-alignment':{},
};
export function assertValue(field,value){
 const bounds=fieldLimits[field];
 if(!bounds)throw Error('E_REVIEW_SCOPE');
 if(field==='caption-alignment'){
  if(value!=='center')throw Error('E_REVIEW_VALUE');
  return;
 }
 if(bounds.min!==undefined){
  if(!Number.isFinite(value)||value<bounds.min||value>bounds.max)throw Error('E_REVIEW_VALUE');
  return;
 }
 if(typeof value!=='string'||!value.trim()||value.length>bounds.maxLength||!pixelText.test(value))throw Error('E_REVIEW_TEXT_FIT');
}
