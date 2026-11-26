const advisoryNote='Static structure and mock-host lifecycle checks only. Verify the exact artifact in the network official preview tool and on physical iOS and Android devices before launch; this is not official network acceptance.';

export const networkTargets=Object.freeze([
 Object.freeze({
  id:'standalone-browser-draft',label:'Browser Draft',shortLabel:'Browser',filenameSuffix:'draft',
  maxBytes:null,sizeComparator:null,packaging:'single-html',requiresStoreUrl:false,hostKind:'browser',mraidVersion:null,
  ruleVerificationStatus:'not-applicable',advisoryNote:'Local browser preview only; not an ad-network qualified export.',
 }),
 Object.freeze({
  id:'unity-ads-ua-playable',label:'Unity Ads',shortLabel:'Unity',filenameSuffix:'unity',
  maxBytes:5_000_000,sizeComparator:'<',packaging:'single-html',requiresStoreUrl:true,hostKind:'mraid',mraidVersion:'3.0',
  ruleVerificationStatus:'verified',advisoryNote,officialPreviewLabel:'Unity Ads Creative Testing tool',
 }),
 Object.freeze({
  id:'applovin-growth-playable',label:'AppLovin',shortLabel:'AppLovin',filenameSuffix:'applovin',
  maxBytes:5_000_000,sizeComparator:'<=',packaging:'single-html',requiresStoreUrl:true,hostKind:'mraid',mraidVersion:'2.0',
  ruleVerificationStatus:'verified',advisoryNote,officialPreviewLabel:'AppLovin Playable Preview',officialPreviewUrl:'https://p.applov.in/playablePreview?create=1',
 }),
 Object.freeze({
  id:'ironsource-levelplay-playable',label:'ironSource / LevelPlay',shortLabel:'ironSource',filenameSuffix:'ironsource',
  maxBytes:5_000_000,sizeComparator:'<=',packaging:'single-html',requiresStoreUrl:false,hostKind:'dapi',mraidVersion:null,
  ruleVerificationStatus:'verified',advisoryNote,officialPreviewLabel:'ironSource / LevelPlay official test tool',officialPreviewUrl:'https://developers.is.com/ironsource-mobile/general/playable-ads/',
 }),
 Object.freeze({
  id:'meta-audience-playable',label:'Meta (Facebook & Instagram)',shortLabel:'Meta',filenameSuffix:'meta',
  maxBytes:2_000_000,sizeComparator:'<=',packaging:'single-html',requiresStoreUrl:false,hostKind:'meta',mraidVersion:null,
  ruleVerificationStatus:'verified',advisoryNote,officialPreviewLabel:'Meta Ads Manager playable preview',officialPreviewUrl:'https://www.facebook.com/business/ads/playable-ads',
 }),
 Object.freeze({
  id:'google-ads-app-playable',label:'Google Ads (App)',shortLabel:'Google Ads',filenameSuffix:'google',
  maxBytes:5_000_000,sizeComparator:'<=',packaging:'zip',requiresStoreUrl:false,hostKind:'google-exitapi',mraidVersion:null,
  ruleVerificationStatus:'verified',advisoryNote,officialPreviewLabel:'Google Ads HTML5 validation and App campaign preview',officialPreviewUrl:'https://support.google.com/google-ads/answer/1722124',
 }),
 Object.freeze({
  id:'mintegral-appgrowth-zip',label:'Mintegral',shortLabel:'Mintegral',filenameSuffix:'mintegral',
  maxBytes:5_000_000,sizeComparator:'<=',packaging:'zip',requiresStoreUrl:false,hostKind:'mintegral',mraidVersion:null,
  ruleVerificationStatus:'verified',advisoryNote,officialPreviewLabel:'Playturbo / Mintegral playable tester',officialPreviewUrl:'https://www.playturbo.com/review',
 }),
 Object.freeze({
  id:'tiktok-ads-playable',label:'TikTok',shortLabel:'TikTok',filenameSuffix:'tiktok',
  maxBytes:5_000_000,sizeComparator:'<=',packaging:'zip',requiresStoreUrl:false,hostKind:'tiktok',mraidVersion:null,
  ruleVerificationStatus:'verified',advisoryNote,officialPreviewLabel:'TikTok Ads Manager playable preview',officialPreviewUrl:'https://ads.tiktok.com/business/help/article/playable-ads',
 }),
]);

export const targets=Object.freeze(networkTargets.map(target=>target.id));
export const networkTargetIds=Object.freeze(networkTargets.filter(target=>target.hostKind!=='browser').map(target=>target.id));
export const getNetworkTarget=id=>networkTargets.find(target=>target.id===id);
export function assertNetworkTarget(id){
 const target=getNetworkTarget(id);
 if(!target)throw Error('E_NATIVE_UNSUPPORTED_TARGET');
 return target;
}
export function acceptsTargetBytes(target,bytes){
 if(target.maxBytes===null)return true;
 return target.sizeComparator==='<'?bytes<target.maxBytes:bytes<=target.maxBytes;
}
