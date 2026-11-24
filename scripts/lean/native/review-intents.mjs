import {check,exact} from './document.mjs';
import {reviewOperations,reviewTargets} from './review-targets.mjs';
import {catalogAudio} from './review-agent-tools.mjs';
import {resolveProjectRoles} from './project-index.mjs';
import {loadCatalogSync} from './catalog-cache.mjs';
import {getModule,matchTimingField,timingFieldEntries} from './modules/index.mjs';
import {isAudioMime} from './media-validate.mjs';

export const authoringIntentFormat='tora-authoring-intent-1';
export const harvestOutcomeCueChoices=Object.freeze([{
 catalogId:'kenney-music-jingles/audio/victory.wav',label:'Kenney NES victory',outcome:'win',tone:'celebratory',
}]);
export function eligibleOutcomeCueChoices(project,catalog){
 const present=new Set(project.assets.map(asset=>asset.hash)),primary=harvestOutcomeCueChoices[0].catalogId;
 return catalog.audioFiles.filter(({catalogId,file})=>(file.audioMeta?.role==='win'||catalogId===primary)&&file.audioMeta?.valence==='positive'&&!present.has(file.sha256))
  .map(({catalogId,file,source})=>({catalogId,label:source.id+' · '+file.path,outcome:'win',tone:file.audioMeta.valence}))
  .sort((a,b)=>Number(b.catalogId===primary)-Number(a.catalogId===primary)||a.catalogId.localeCompare(b.catalogId));
}

const baseIntent=(noteId,action,targetRole,args,constraints,requiredChecks)=>({
 format:authoringIntentFormat,noteId,action,targetRole,arguments:args,constraints,requiredChecks,
});
const textIntent=text=>baseIntent('1','replaceText','primaryCta',{text},{literal:true},['package','diff-1']);
const timingIntent=(field,seconds)=>baseIntent('1','setTiming','reviewTiming',{field,seconds},{absolute:true},['package','diff-1']);
const captionIntent=()=>baseIntent('1','alignCaption','timeoutCaption',{alignment:'center'},{preserveText:true},['package','diff-1','landscape-loss']);
const artworkIntent=(target,assetId)=>baseIntent('1','replaceSharedArtwork','sharedArtwork',{target,assetId},{allUses:true},['package','diff-1']);

export function transferOutcomeCueIntent(noteId='1',replacementCatalogId=harvestOutcomeCueChoices[0].catalogId){
 return baseIntent(noteId,'transferOutcomeCue','outcomeCues',
  {sourceOutcome:'win',destinationOutcome:'loss',replacementCatalogId},
  {replacementMustBeNew:true,preserveOrdinaryCues:true},['win-audio','loss-audio']);
}

function literalTextIntent(note){
 if(note.target!=='cta'||note.moment!=='end-card'||note.fields.length!==1||note.fields[0]!=='text')return null;
 const match=/^(?:change|set|update) the (?:selected )?(?:cta|install button)(?: wording| text| label)? to (["“'])(.*)(["”'])[.!?]?$/i.exec(note.note);
 if(!match)return null;
 const closing={'"':'"',"'":"'",'“':'”'}[match[1]];
 if(match[3]!==closing||match[2].includes(closing))return null;
 return textIntent(match[2]);
}

function permits(note,target,moment,field){
 return (note.moment===moment||note.moment==='live')&&
  (note.target===null||note.target===target&&note.fields.includes(field));
}

function literalTimingIntent(note){
 if(note.fields.length!==1)return null;
 const descriptor=matchTimingField({field:note.fields[0],target:note.target,moment:note.moment});
 if(!descriptor||!permits(note,note.target,descriptor.moment,descriptor.field))return null;
 const match=new RegExp('^set (?:the )?'+descriptor.label+' to ([0-9]+(?:\\.[0-9]+)?) (?:seconds?|s)[.!]?$','i').exec(note.note);
 return match?timingIntent(descriptor.field,Number(match[1])):null;
}

export function interpretationOptions(request,index,project){
 const notes=request.notes??[request],resolution=resolveProjectRoles(index);
 if(notes.length!==1||resolution.status!=='resolved')return [];
 const note=notes[0],options=[],targets=reviewTargets(project).targets;
 const supported=(target,field)=>targets.some(item=>item.id===target&&item.fields.some(value=>value.id===field));
 if(permits(note,'cta','end-card','text'))options.push(textIntent(''));
 for(const {field,targets:allowedTargets,moment} of timingFieldEntries(resolution.module)){
  const matchedTarget=allowedTargets.find(target=>supported(target,field)&&permits(note,target,moment,field));
  if(matchedTarget){
   const bounds=targets.find(item=>item.id===matchedTarget).fields.find(value=>value.id===field);
   options.push(timingIntent(field,bounds.value));
  }
 }
 if(supported('timeout-card','caption-alignment')&&permits(note,'timeout-card','timeout','caption-alignment'))options.push(captionIntent());
 for(const target of targets.filter(target=>target.imageChoices?.length&&supported(target.id,'shared-art')&&permits(note,target.id,target.moment,'shared-art'))){
  const option=artworkIntent(target.id,target.imageChoices[0]);option.constraints={...option.constraints,allowedAssetIds:[...target.imageChoices]};options.push(option);
 }
 if(canTransferOutcomeCue(index)&&supported('ending','win-cue')&&
    (permits(note,'ending','end-card','win-cue')||note.target===null&&note.moment==='timeout')){
  const choices=eligibleOutcomeCueChoices(project,loadCatalogSync());
  options.push(...choices.map(choice=>transferOutcomeCueIntent('1',choice.catalogId)));
 }
 return options;
}

export function canTransferOutcomeCue(index){
 const resolution=resolveProjectRoles(index);
 return resolution.module&&resolution.module!=='tora-native-primitives'?getModule(resolution.module).canTransferOutcomeCue(index,resolution):false;
}

export function deterministicIntent(request){
 const notes=request.notes??[request];
 if(notes.length!==1)return null;
 const note=notes[0];
 if(note.intent!==undefined){
  const intent=note.intent;
  check(exact(intent,['format','noteId','action','targetRole','arguments','constraints','requiredChecks'])&&
   intent.format===authoringIntentFormat&&intent.noteId==='1','E_REVIEW_INTENT');
  if(intent.action==='transferOutcomeCue'){
   check(note.target==='ending'&&note.moment==='end-card'&&note.fields.length===1&&note.fields[0]==='win-cue','E_REVIEW_SCOPE');
   validateTransferIntent(intent);return transferOutcomeCueIntent('1',intent.arguments.replacementCatalogId);
  }
  if(intent.action==='replaceText'){
   check(note.target==='cta'&&note.moment==='end-card'&&note.fields.length===1&&note.fields[0]==='text','E_REVIEW_SCOPE');
   check(intent.targetRole==='primaryCta'&&exact(intent.arguments,['text'])&&typeof intent.arguments.text==='string'&&
    exact(intent.constraints,['literal'])&&intent.constraints.literal===true&&intent.requiredChecks?.join(',')==='package,diff-1','E_REVIEW_INTENT');
   return textIntent(intent.arguments.text);
  }
  if(intent.action==='setTiming'){
   const field=intent.arguments?.field,descriptor=matchTimingField({field,target:note.target,moment:note.moment});
   check(descriptor&&note.fields.length===1&&note.fields[0]===field,'E_REVIEW_SCOPE');
   check(intent.targetRole==='reviewTiming'&&exact(intent.arguments,['field','seconds'])&&Number.isFinite(intent.arguments.seconds)&&
    exact(intent.constraints,['absolute'])&&intent.constraints.absolute===true&&intent.requiredChecks?.join(',')==='package,diff-1','E_REVIEW_INTENT');
   return timingIntent(field,intent.arguments.seconds);
  }
  if(intent.action==='alignCaption'){
   check(note.target==='timeout-card'&&note.moment==='timeout'&&note.fields.length===1&&note.fields[0]==='caption-alignment','E_REVIEW_SCOPE');
   check(intent.targetRole==='timeoutCaption'&&exact(intent.arguments,['alignment'])&&intent.arguments.alignment==='center'&&
    exact(intent.constraints,['preserveText'])&&intent.constraints.preserveText===true&&intent.requiredChecks?.join(',')==='package,diff-1,landscape-loss','E_REVIEW_INTENT');
   return captionIntent();
  }
  check(intent.action==='replaceSharedArtwork'&&note.target===intent.arguments?.target&&note.moment==='opening'&&note.fields.length===1&&note.fields[0]==='shared-art','E_REVIEW_SCOPE');
  check(intent.targetRole==='sharedArtwork'&&exact(intent.arguments,['target','assetId'])&&typeof intent.arguments.assetId==='string'&&
   exact(intent.constraints,['allUses'])&&intent.constraints.allUses===true&&intent.requiredChecks?.join(',')==='package,diff-1','E_REVIEW_INTENT');
  return artworkIntent(note.target,intent.arguments.assetId);
 }
 if(note.target==='timeout-card'&&note.fields.length===1&&permits(note,'timeout-card','timeout','caption-alignment')&&
  /^center the (?:existing )?(?:loss|timeout) (?:caption|message)(?: vertically)? (?:in|within) the (?:end-card )?panel[.!]?$/i.test(note.note))return captionIntent();
 if(/^(?:crop-|core-art$|hazard-art$)/.test(note.target??'')&&note.fields.length===1&&permits(note,note.target,'opening','shared-art')){
  const asset=/^replace all uses with "([a-z][a-z0-9_.-]{0,95})"[.!]?$/i.exec(note.note);
  if(asset)return artworkIntent(note.target,asset[1]);
 }
 return literalTextIntent(note)??literalTimingIntent(note);
}

export function deterministicIntents(request){
 const notes=request.notes??[request];
 if(notes.length===1){
  const intent=deterministicIntent(request);
  return intent?[intent]:null;
 }
 const intents=notes.map((note,index)=>{
  const intent=literalTextIntent(note)??literalTimingIntent(note);
  const noteId=String(index+1);
  return intent&&{...intent,noteId,requiredChecks:['package','diff-'+noteId]};
 });
 return intents.every(Boolean)?intents:null;
}

function validateTransferIntent(intent){
 check(intent.targetRole==='outcomeCues'&&exact(intent.arguments,['sourceOutcome','destinationOutcome','replacementCatalogId'])&&
  intent.arguments.sourceOutcome==='win'&&intent.arguments.destinationOutcome==='loss'&&
  exact(intent.constraints,['replacementMustBeNew','preserveOrdinaryCues'])&&intent.constraints.replacementMustBeNew===true&&
  intent.constraints.preserveOrdinaryCues===true&&Array.isArray(intent.requiredChecks)&&
  intent.requiredChecks.length===2&&intent.requiredChecks[0]==='win-audio'&&intent.requiredChecks[1]==='loss-audio','E_REVIEW_INTENT');
}

async function transferOutcomeCue(project,intent,index){
 validateTransferIntent(intent);
 const resolution=resolveProjectRoles(index);
 check(resolution.status==='resolved','E_REVIEW_ROLE_UNRESOLVED');
 const {winEvent,timeoutEvent,rewardCue}=resolution.roles;
 check(!winEvent.cue.unresolved&&timeoutEvent.cue?.unresolved==='missing-cue','E_REVIEW_OUTCOME_AUDIO_AMBIGUOUS');
 const catalog=await catalogAudio(),replacement=eligibleOutcomeCueChoices(project,{audioFiles:catalog}).find(choice=>choice.catalogId===intent.arguments.replacementCatalogId);
 check(replacement,'E_REVIEW_ASSET_CHOICE');
 const cue=catalog.find(item=>item.catalogId===replacement.catalogId);
 check(isAudioMime(cue?.file.mime),'E_REVIEW_ASSET_CHOICE');
 check(!project.assets.some(asset=>asset.hash===cue.file.sha256),'E_REVIEW_WIN_AUDIO_MUST_BE_NEW');
 check(cue.file.sha256!==rewardCue.assetHash,'E_REVIEW_WIN_AUDIO_MUST_BE_NEW');
 const assetId=getModule(resolution.module).outcomeAssetId;
 check(!project.assets.some(asset=>asset.id===assetId),'E_REVIEW_ASSET_CHOICE');
 const componentId=winEvent.bindingId+'.cue',behaviorId=componentId+'.play';
 return {noteId:intent.noteId,imports:[{catalogId:cue.catalogId,assetId}],operations:[
  {kind:'setBindingAudio',bindingId:timeoutEvent.bindingId,assetId:rewardCue.assetId},
  {kind:'setBindingAudio',bindingId:winEvent.bindingId,assetId,replaceBehaviorId:rewardCue.behaviorId},
 ],scope:[assetId,timeoutEvent.bindingId,winEvent.bindingId,componentId,behaviorId]};
}

export async function compileDeterministicIntent(project,intent,index,noteTarget){
 check(intent.format===authoringIntentFormat&&/^[1-9][0-9]*$/.test(intent.noteId),'E_REVIEW_INTENT');
 if(intent.action==='alignCaption'){
  check(intent.targetRole==='timeoutCaption'&&exact(intent.arguments,['alignment'])&&intent.arguments.alignment==='center'&&
   exact(intent.constraints,['preserveText'])&&intent.constraints.preserveText===true,'E_REVIEW_INTENT');
  const changes={'caption-alignment':'center'};
  reviewOperations(project,'timeout-card',['caption-alignment'],changes);
  return {edit:{noteId:intent.noteId,target:'timeout-card',changes}};
 }
 if(intent.action==='replaceSharedArtwork'){
  check(intent.targetRole==='sharedArtwork'&&exact(intent.arguments,['target','assetId'])&&
   exact(intent.constraints,['allUses','allowedAssetIds'])&&intent.constraints.allUses===true&&
   (intent.constraints.allowedAssetIds===undefined||Array.isArray(intent.constraints.allowedAssetIds)&&intent.constraints.allowedAssetIds.includes(intent.arguments.assetId)),'E_REVIEW_INTENT');
  const {target,assetId}=intent.arguments;
  const changes={'shared-art':assetId};
  reviewOperations(project,target,['shared-art'],changes);
  return {edit:{noteId:intent.noteId,target,changes}};
 }
 if(intent.action==='setTiming'){
  check(intent.targetRole==='reviewTiming'&&exact(intent.arguments,['field','seconds'])&&
   exact(intent.constraints,['absolute'])&&intent.constraints.absolute===true&&
   Array.isArray(intent.requiredChecks)&&intent.requiredChecks.join(',')==='package,diff-'+intent.noteId,'E_REVIEW_INTENT');
  const {field,seconds}=intent.arguments,resolution=resolveProjectRoles(index);
  check(resolution.status==='resolved','E_REVIEW_ROLE_UNRESOLVED');
  const descriptor=matchTimingField({field,target:noteTarget??undefined,moduleId:resolution.module});
  check(descriptor,'E_REVIEW_SCOPE');
  const target=noteTarget&&descriptor.targets.includes(noteTarget)?noteTarget:descriptor.target;
  check(reviewTargets(project).targets.some(item=>item.id===target&&item.fields.some(value=>value.id===field)),'E_REVIEW_SCOPE');
  reviewOperations(project,target,[field],{[field]:seconds});
  return {edit:{noteId:intent.noteId,target,changes:{[field]:seconds}}};
 }
 if(intent.action==='replaceText'){
  check(intent.targetRole==='primaryCta'&&exact(intent.arguments,['text'])&&exact(intent.constraints,['literal'])&&
   intent.constraints.literal===true&&Array.isArray(intent.requiredChecks)&&intent.requiredChecks.join(',')==='package,diff-'+intent.noteId,'E_REVIEW_INTENT');
  const resolution=resolveProjectRoles(index);
  check(resolution.status==='resolved','E_REVIEW_ROLE_UNRESOLVED');
  const target=resolution.roles.primaryCta;
  const result=reviewOperations(project,'cta',['text'],{text:intent.arguments.text});
  return {edit:{noteId:intent.noteId,target:'cta',changes:{text:intent.arguments.text}},expected:result.expected,
   authorizedRecords:[target.labelId]};
 }
 check(intent.action==='transferOutcomeCue','E_REVIEW_INTENT');
 return {edit:await transferOutcomeCue(project,intent,index)};
}
