import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import process from 'node:process';
import {preparePngSource} from './asset-policy.mjs';

const root=resolve(import.meta.dirname,'../../..');
const assetRoot='assets/kenney-space-salvage';
const sourceRoot=assetRoot+'/source/space-shooter-redux';
const archiveFile=assetRoot+'/source/SpaceShooterRedux.zip';
const catalogFile=resolve(root,'assets/free-assets/catalog.json');
const hash=bytes=>'sha256:'+createHash('sha256').update(bytes).digest('hex');
const curated=[
 ['salvage-backdrop','Backgrounds/darkPurple.png'],
 ['salvage-ship','PNG/playerShip1_blue.png'],
 ['salvage-thruster','PNG/Effects/fire03.png'],
 ['salvage-shield-1','PNG/Effects/shield1.png'],
 ['salvage-shield-2','PNG/Effects/shield2.png'],
 ['salvage-shield-3','PNG/Effects/shield3.png'],
 ['salvage-core','PNG/Power-ups/powerupYellow_star.png'],
 ['salvage-core-alt','PNG/Power-ups/star_gold.png'],
 ['salvage-hazard','PNG/Meteors/meteorBrown_med1.png'],
 ['salvage-hazard-alt','PNG/Meteors/meteorGrey_big1.png'],
 ['salvage-bay','PNG/ufoBlue.png'],
 ['salvage-engine','PNG/Parts/engine2.png'],
 ['salvage-cockpit','PNG/Parts/cockpitBlue_2.png'],
 ['salvage-wing','PNG/Parts/wingBlue_0.png'],
 ['salvage-spark','PNG/Effects/star2.png'],
 ['salvage-numeral-3','PNG/UI/numeral3.png'],
];
const audio=[
 ['ambient','arcade-pop-ambient'],
 ['catch','arcade-pop-match'],
 ['repair','arcade-pop-reward'],
 ['complete','arcade-pop-win'],
 ['loss','arcade-pop-loss'],
 ['reject','arcade-pop-reject'],
];
const catalog=JSON.parse(await readFile(catalogFile,'utf8'));
const source={
 id:'kenney-space-shooter-redux',author:'Kenney',license:'CC0-1.0',
 sourceUrl:'https://opengameart.org/content/space-shooter-redux',
 licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',
 styleFamily:'kenney-space-shooter-redux',licenseFile:sourceRoot+'/License.txt',
 licenseSha256:hash(await readFile(resolve(root,sourceRoot,'License.txt'))),
 archive:{url:'https://opengameart.org/sites/default/files/SpaceShooterRedux.zip',sha256:hash(await readFile(resolve(root,archiveFile)))},
 files:[],
};
const plan={
 format:'tora-star-salvage-plan-1',seed:9173,firstHintSeconds:.8,
 rewardRecipe:{id:'salvage-reward-1',variant:'seeded'},
 sprites:{ship:'salvage-ship',core:'salvage-core',hazard:'salvage-hazard',backdrop:'salvage-backdrop'},
 coreVariants:['salvage-core','salvage-core-alt'],hazardVariants:['salvage-hazard','salvage-hazard-alt'],
 bay:[
  {id:'bay-station',assetId:'salvage-bay',unlockAt:0},
  {id:'bay-thrusters',assetId:'salvage-engine',unlockAt:1},
  {id:'bay-shield',assetId:'salvage-shield-2',unlockAt:2},
  {id:'bay-core',assetId:'salvage-shield-3',unlockAt:3},
 ],
 audio:Object.fromEntries(audio.map(([role])=>[role,'salvage-audio-'+role])),assets:[],
};
for(const [id,path] of curated){
 const sourceFile=sourceRoot+'/'+path,bytes=await readFile(resolve(root,sourceFile)),prepared=preparePngSource(bytes);
 const imported=assetRoot+'/imported/'+path;
 await mkdir(dirname(resolve(root,imported)),{recursive:true});
 await writeFile(resolve(root,imported),prepared);
 const sha256=hash(prepared);
 source.files.push({path,file:imported,mime:'image/png',sha256,processing:{kind:'png-strip-color-metadata',sourceFile,sourceSha256:hash(bytes)}});
 plan.assets.push({id,file:imported.slice(assetRoot.length+1),mime:'image/png',rights:'Kenney Space Shooter Redux, CC0-1.0. https://opengameart.org/content/space-shooter-redux',provenance:{
  origin:'third-party-free',sourceId:source.id,sourceFile:path,sourceHash:sha256,author:source.author,license:source.license,sourceUrl:source.sourceUrl,styleFamily:source.styleFamily,
 }});
}
const catalogFiles=catalog.sources.flatMap(entry=>entry.files.map(file=>({file,source:entry})));
for(const [role,catalogId] of audio){
 const match=catalogFiles.find(({file})=>file.id===catalogId);
 if(!match)throw Error('Missing verified audio catalog entry: '+catalogId);
 const {file,source:audioSource}=match,bytes=await readFile(resolve(root,file.file));
 if(hash(bytes)!==file.sha256)throw Error('Audio hash mismatch: '+catalogId);
 const output=assetRoot+'/audio/'+role+'.wav';
 await mkdir(dirname(resolve(root,output)),{recursive:true});
 await writeFile(resolve(root,output),bytes);
 plan.assets.push({id:'salvage-audio-'+role,file:output.slice(assetRoot.length+1),mime:'audio/wav',rights:audioSource.author+', CC0-1.0. '+audioSource.sourceUrl,provenance:{
  origin:'third-party-free',sourceId:audioSource.id,sourceFile:file.path,sourceHash:file.sha256,author:audioSource.author,license:audioSource.license,sourceUrl:audioSource.sourceUrl,styleFamily:audioSource.styleFamily,
 }});
}
catalog.sources=[...catalog.sources.filter(entry=>entry.id!==source.id),source];
await writeFile(catalogFile,JSON.stringify(catalog,null,2)+'\n');
await writeFile(resolve(root,assetRoot,'plan.json'),JSON.stringify(plan,null,2)+'\n');
process.stdout.write(`Prepared ${source.files.length} verified Redux PNGs and ${audio.length} unchanged arcade-pop WAVs.\n`);
