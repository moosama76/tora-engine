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
