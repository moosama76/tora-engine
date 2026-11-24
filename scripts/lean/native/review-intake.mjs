import {Buffer} from 'node:buffer';
import {randomUUID} from 'node:crypto';
import {link, mkdir, readdir, rename, unlink, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {URL} from 'node:url';
import {isStoreDestination} from '../../../packages/adapters/src/index.ts';
import {registerSource, safeFile} from './assets.mjs';
import {compileNative, hash} from './compiler.mjs';
import {composeNativeConcept} from './concept.mjs';
import {applyOperations, check, emptyProject, exact} from './document.mjs';
import {importProjectFile} from './local-bundle.mjs';
import {getModule} from './modules/index.mjs';
import {projectBundle} from './project-bundle.mjs';
import {contentHash} from './service.mjs';
import {assertStorePath} from './store-path.mjs';
import {reviewProviderConfig} from './review-provider.mjs';
import {IntakeCreatorAgent} from './intake-creator-agent.mjs';

const projectIdPattern = /^[a-z][a-z0-9-]{1,47}$/;
const intakeIdPattern = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/;
const assetIdPattern = /^studio-[a-f0-9]{32}$/;
const referenceIdPattern = /^ref-[a-f0-9]{32}$/;
const maxAssetCount = 64;
const maxReferenceCount = 16;
const maxPackBytes = 12_000_000;
const mediaTypes = ['image/png', 'image/jpeg', 'audio/wav', 'audio/mpeg'];
const referenceTypes = ['image/png', 'image/jpeg'];
const audioPacks = ['auto', 'casual-warm', 'arcade-pop'];
const assetSources = ['studio-assets', 'hybrid-free', 'free-licensed'];

function validText(value, limit, multiline = false) {
  return typeof value === 'string' && value.trim().length > 0 &&
    value.length <= limit && [...value].every(char =>
      (char >= ' ' && char !== '\u007f') || (multiline && ['\n','\r','\t'].includes(char)));
}

function referenceUrl(value) {
  if (value === undefined) return undefined;
  try {
    if (typeof value !== 'string' || value.length > 2048) return null;
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password) return url.href;
  } catch {
    // Report the same validation failure for malformed URLs and unsupported schemes.
  }
  return null;
}

async function readJson(path) {
  try {
    return JSON.parse(await safeFile(path));
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

// Make one complete record visible, even when the editor and MCP run in
// separate processes. Existing claims and publication intents survive retries.
async function writeRecord(path, value) {
  const temp = path + '.' + randomUUID() + '.tmp';
  await writeFile(temp, JSON.stringify(value), {flag: 'wx'});
  try {
    await link(temp, path);
    return true;
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    return false;
  } finally {
    await unlink(temp);
  }
}

export class ReviewIntake {
  constructor(service,{connection,agentFactory}={}) {
    this.service = service;
    this.connection = connection;
    this.agentFactory = agentFactory ?? (options => new IntakeCreatorAgent(service,this,options.intake,options));
    this.active = new Map();
    this.recovering = new Set();
    this.root = resolve(service.store.root, '.review-intakes');
  }

  folder(id) {
    check(typeof id === 'string' && intakeIdPattern.test(id), 'E_INTAKE_ARGUMENT');
    return resolve(this.root, id);
  }

  async create(input) {
    check(exact(input, ['projectId','name','brief','storeUrl','studio','rights','referenceUrl','mechanic','audioPack','assetSource']), 'E_INTAKE_ARGUMENT');
    const {projectId,name,brief,studio,rights,audioPack,assetSource} = input;
    const mechanic = input.mechanic ?? 'harvest-restore';
    const isCustom = mechanic === 'custom';
    const descriptor = isCustom ? null : getModule(mechanic);
    if (audioPack !== undefined) check(audioPacks.includes(audioPack), 'E_INTAKE_ARGUMENT');
    if (assetSource !== undefined) check(assetSources.includes(assetSource), 'E_INTAKE_ARGUMENT');
    check((isCustom || (descriptor.supportsIntake && descriptor.intake)) &&
      typeof projectId === 'string' && projectIdPattern.test(projectId) && projectId !== 'compose' &&
      validText(name, 80) && validText(brief, 2048, true) && validText(studio, 120) && validText(rights, 1024), 'E_INTAKE_ARGUMENT');
    const reference = referenceUrl(input.referenceUrl);
    const storeUrl = input.storeUrl;
    if (storeUrl !== undefined) {
      check(typeof storeUrl === 'string' && storeUrl.length <= 512 && isStoreDestination(storeUrl), 'E_INTAKE_ARGUMENT');
    } else {
      check(isCustom, 'E_INTAKE_ARGUMENT');
    }
    check(reference !== null, 'E_INTAKE_ARGUMENT');
    check(!(await this.service.store.list()).some(project => project.id === projectId), 'E_PROJECT_EXISTS');
    await assertStorePath(this.root);
    await mkdir(this.root, {recursive:true});
    const id = randomUUID();
    const folder = this.folder(id);
    await mkdir(folder);
    await mkdir(resolve(folder, 'assets'));
    await mkdir(resolve(folder, 'references'));
    const source = {
      id,projectId,name,brief,studio,rights,mechanic,
      ...(storeUrl ? {storeUrl} : {}),
      ...(audioPack ? {audioPack} : {}),
      ...(assetSource ? {assetSource} : {}),
      ...(reference ? {referenceUrl:reference} : {}),
    };
    await writeRecord(resolve(folder, 'intake.json'), source);
    return this.read(id);
  }

  async read(id) {
    const folder = this.folder(id);
    const source = await readJson(resolve(folder, 'intake.json'));
    check(source, 'E_INTAKE_NOT_FOUND');
    const assetFolder = resolve(folder, 'assets');
    await assertStorePath(assetFolder);
    const names = (await readdir(assetFolder)).filter(name => name.endsWith('.json') && assetIdPattern.test(name.slice(0, -5))).sort();
    const assets = await Promise.all(names.map(name => readJson(resolve(assetFolder, name))));
    let references = [];
    try {
      const refFolder = resolve(folder, 'references');
      await assertStorePath(refFolder);
      const refNames = (await readdir(refFolder)).filter(name => name.endsWith('.json') && referenceIdPattern.test(name.slice(0, -5))).sort();
      references = await Promise.all(refNames.map(name => readJson(resolve(refFolder, name))));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    const [submitted, claimed, intent, buildState] = await Promise.all(['submitted','claimed','publication','build'].map(name => readJson(resolve(folder, name + '.json'))));
    let artifact;
    if (intent) {
      try {
        const {project} = await this.service.store.open(source.projectId);
        if (project.base.kind === 'native-scene' && contentHash(project) === intent.contentHash) artifact = intent.artifact;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
    const status = artifact ? 'ready' : buildState?.status ?? (claimed ? 'claimed' : submitted ? 'queued' : 'draft');
    if (status === 'building' && !this.active.has(id) && !this.recovering.has(id) && this.connection) globalThis.queueMicrotask(() => this.recover(id).catch(() => {}));
    return {
      ...source, assets, ...(references.length ? {references} : {}), contactSheetPath:'/?intake=' + id,
      status,
      ...(buildState?.build ? {build:buildState.build} : {}),
      ...(buildState?.build?.title ? {title:buildState.build.title,summary:buildState.build.summary} : {}),
      ...(artifact ? {artifact} : intent ? {publicationPending:true} : {})
    };
  }

  async upload(id, input) {
    return this.service.history.lock('intake-' + id, async () => {
      const current = await this.read(id);
      check(exact(input, ['name','mime','data','kind','note']) && validText(input.name, 180) && !/[\\/]/u.test(input.name), 'E_INTAKE_ARGUMENT');
      const kind = input.kind ?? 'asset';
      check(['asset', 'reference'].includes(kind), 'E_INTAKE_ARGUMENT');
      const allowedMimes = kind === 'reference' ? referenceTypes : mediaTypes;
      check(allowedMimes.includes(input.mime) && typeof input.data === 'string' && input.data.length <= 933336, 'E_INTAKE_ARGUMENT');
      if (input.note !== undefined) check(validText(input.note, 240), 'E_INTAKE_ARGUMENT');
      const bytes = Buffer.from(input.data, 'base64');
      check(bytes.length > 0 && bytes.length <= 700000 && bytes.toString('base64') === input.data, 'E_INTAKE_ASSET_SIZE');
      const digest = hash(bytes);
      const folder = this.folder(id);
      if (kind === 'reference') {
        const refId = 'ref-' + hash(JSON.stringify([input.name, input.mime, digest])).slice(7, 39);
        const existingRefs = current.references ?? [];
        if (existingRefs.some(item => item.id === refId)) return current;
        check(current.status === 'draft', 'E_INTAKE_STALE');
        check(existingRefs.length < maxReferenceCount, 'E_INTAKE_ASSET_LIMIT');
        await mkdir(resolve(folder, 'references'), {recursive: true});
        const asset = await registerSource(folder, {id: refId, mime: input.mime, data: input.data, rights: current.rights});
        await writeRecord(resolve(folder, 'references', refId + '.json'), {
          id: refId, name: input.name, mime: asset.mime, hash: asset.hash, bytes: asset.bytes,
          ...(input.note ? {note: input.note} : {}),
        });
        return this.read(id);
      }
      const assetId = 'studio-' + hash(JSON.stringify([input.name, input.mime, digest])).slice(7, 39);
      if (current.assets.some(asset => asset.id === assetId)) return current;
      check(current.status === 'draft', 'E_INTAKE_STALE');
      check(current.assets.length < maxAssetCount &&
        current.assets.reduce((total, asset) => total + asset.bytes, 0) + bytes.length <= maxPackBytes, 'E_INTAKE_ASSET_LIMIT');
      const asset = await registerSource(folder, {id:assetId, mime:input.mime, data:input.data, rights:current.rights});
      await writeRecord(resolve(folder,'assets',assetId + '.json'), {id:assetId,name:input.name,mime:asset.mime,hash:asset.hash,bytes:asset.bytes});
      return this.read(id);
    });
  }

  async submit(id, input = {}) {
    check(exact(input,['mode']) && ['auto','byok','mcp'].includes(input.mode ?? 'auto'),'E_INTAKE_ARGUMENT');
    const mode = input.mode ?? 'auto';
    const provider = mode === 'mcp' ? null : await this.verifiedProvider();
    return this.service.history.lock('intake-' + id, async () => {
      const current = await this.read(id);
      if (current.status !== 'draft') {
        if (['failed','cancelled'].includes(current.status) && mode === 'mcp') {
          await writeRecord(resolve(this.folder(id), 'submitted.json'), {submitted:true});
          await this.updateBuild(id,{status:'queued',phase:'handoff',stepLabel:'Ready for $0 MCP handoff',error:undefined,finishedAt:undefined});
        }
        return this.read(id);
      }
      if (current.mechanic === 'custom') {
        if (current.assetSource !== 'free-licensed') {
          check(current.assets.length > 0 || (current.references?.length ?? 0) > 0, 'E_INTAKE_MEDIA_REQUIRED');
        }
      } else {
        const assetsForCheck = current.audioPack
          ? [...current.assets, {id: 'catalog-audio-pack', mime: 'audio/wav', hash: 'sha256:' + '0'.repeat(64)}]
          : current.assets;
        getModule(current.mechanic ?? 'harvest-restore').intake.validateMedia(assetsForCheck);
      }
      if (provider) return this.startByok(current,provider);
      await writeRecord(resolve(this.folder(id), 'submitted.json'), {submitted:true});
      return this.read(id);
    });
  }

  async verifiedProvider() {
    const active = await this.connection?.read();
    if (!active?.verified || !['gemini','openai','anthropic','openai-compatible'].includes(active.provider)) return null;
    return {
      config:reviewProviderConfig({provider:active.provider,model:active.model,endpoint:active.endpoint,apiKey:active.apiKey,vision:active.vision!==false}),
      info:{provider:active.provider,providerLabel:active.providerLabel,model:active.model,modelLabel:active.modelLabel},
      apiKey:active.apiKey,
    };
  }

  async updateBuild(id,{status,...patch}) {
    const path=resolve(this.folder(id),'build.json'),previous=await readJson(path)??{status:'draft',build:{events:[]}},now=new Date().toISOString();
    const build={...previous.build,...patch,updatedAt:now},events=[...(previous.build?.events??[])];
    if (patch.stepLabel && (events.at(-1)?.label!==patch.stepLabel||events.at(-1)?.phase!==patch.phase)) events.push({at:now,phase:patch.phase??previous.build?.phase??'building',label:patch.stepLabel});
    build.events=events.slice(-80);
    const value={status:status??previous.status,build},temporary=path+'.'+randomUUID()+'.tmp';
    await writeFile(temporary,JSON.stringify(value),{flag:'wx'});await rename(temporary,path);return value;
  }

  async startByok(current,provider) {
    if (this.active.has(current.id)) return current;
    const controller=new globalThis.AbortController();this.active.set(current.id,controller);
    const startedAt=new Date().toISOString();
    await this.updateBuild(current.id,{status:'building',phase:'brief',stepLabel:'Reading brief & uploads',turn:0,maxTurns:12,provider:provider.info.providerLabel,model:provider.info.modelLabel,startedAt,finishedAt:undefined,error:undefined,usage:undefined,draftProjectId:current.build?.draftProjectId});
    const agent=this.agentFactory({intake:current,config:provider.config,connectionInfo:provider.info,fetchImpl:this.connection.fetch,signal:controller.signal,onProgress:async patch=>{
      if(this.active.get(current.id)===controller)await this.updateBuild(current.id,patch);
    }});
    void agent.run().then(async finished=>{
      if(this.active.get(current.id)!==controller)return;
      await this.updateBuild(current.id,{status:'ready',phase:'ready',stepLabel:'Playable ready to review',finishedAt:new Date().toISOString(),title:finished.title,summary:finished.summary,qa:finished.qa,assetsSummary:finished.assetsSummary,...(finished.usage?{usage:finished.usage}:{}),draftProjectId:finished.projectId,error:undefined});
    }).catch(async error=>{
      if(this.active.get(current.id)!==controller)return;
      const cancelled=controller.signal.aborted||error.message==='E_BUILD_CANCELLED',code=/^E_[A-Z0-9_]+$/.test(error.message)?error.message:'E_CREATOR_BUILD_FAILED';
      await this.updateBuild(current.id,{status:cancelled?'cancelled':'failed',phase:cancelled?'cancelled':'failed',stepLabel:cancelled?'Build cancelled':'Build needs attention',finishedAt:new Date().toISOString(),error:cancelled?'E_BUILD_CANCELLED':code});
    }).catch(()=>{}).finally(()=>{if(this.active.get(current.id)===controller)this.active.delete(current.id);});
    return this.read(current.id);
  }

  async recover(id) {
    if (this.active.has(id)||this.recovering.has(id)) return;
    this.recovering.add(id);
    try{
      const current=await this.read(id);if(current.status!=='building')return;
      await this.updateBuild(id,{status:'failed',phase:'failed',error:'E_BUILD_INTERRUPTED',stepLabel:'Build interrupted by server restart — click Retry to continue',finishedAt:new Date().toISOString()});
    }finally{this.recovering.delete(id);}
  }

  async cancel(id) {
    const current=await this.read(id);if(current.status!=='building')return current;
    this.active.get(id)?.abort();this.active.delete(id);await this.updateBuild(id,{status:'cancelled',phase:'cancelled',stepLabel:'Build cancelled',finishedAt:new Date().toISOString(),error:'E_BUILD_CANCELLED'});return this.read(id);
  }

  async retry(id) {
    const current=await this.read(id);if(current.status==='ready'||current.status==='building')return current;
    check(['failed','cancelled'].includes(current.status),'E_INTAKE_STALE');const provider=await this.verifiedProvider();check(provider,'E_BYOK_NOT_CONFIGURED');return this.startByok(current,provider);
  }

  async claim(id) {
    const current = await this.read(id);
    check(current.status !== 'draft', 'E_INTAKE_STALE');
    if (current.status !== 'queued') return current;
    await writeRecord(resolve(this.folder(id), 'claimed.json'), {claimed:true});
    return this.read(id);
  }

  async sourceAsset(id, asset) {
    const bytes = await safeFile(resolve(this.folder(id), 'sources/assets', asset.hash.slice(7)));
    check(hash(bytes) === asset.hash && bytes.length === asset.bytes, 'E_INTAKE_ASSET_HASH');
    return {bytes,mime:asset.mime};
  }

  async asset(id, assetId) {
    const current = await this.read(id);
    const asset = current.assets.find(entry => entry.id === assetId);
    check(asset, 'E_INTAKE_NOT_FOUND');
    return this.sourceAsset(id, asset);
  }

  async referenceAsset(id, assetId) {
    const current = await this.read(id);
    const asset = (current.references ?? []).find(entry => entry.id === assetId);
    check(asset, 'E_INTAKE_NOT_FOUND');
    return this.sourceAsset(id, asset);
  }

  async build(id, input) {
    const current = await this.read(id);
    if (current.status === 'ready') return current;
    check(current.status === 'claimed', 'E_INTAKE_STALE');
    const publication = resolve(this.folder(id), 'publication.json');
    const savedIntent = await readJson(publication);
    if (savedIntent) return this.publish(current, savedIntent);
    const concept = input?.concept;
    const mechanic = current.mechanic ?? 'harvest-restore';
    const descriptor = getModule(mechanic);
    check(exact(input, ['concept']) && concept && concept.experience?.mechanic === mechanic, 'E_INTAKE_ARGUMENT');
    check(concept.product?.storeUrl === current.storeUrl && concept.product.name === current.name, 'E_INTAKE_PRODUCT');
    const selected = new Set(descriptor.intake.validateConcept(concept, current));
    const originals = new Map(current.assets.map(asset => [asset.id, asset]));
    check([...selected].every(assetId => originals.has(assetId)), 'E_INTAKE_ASSET_REFERENCE');
    const selectedAssets = [...selected].map(assetId => originals.get(assetId));
    descriptor.intake.validateMedia(selectedAssets, concept);
    const assets = await Promise.all([...selected].sort().map(async assetId => {
      const asset = originals.get(assetId);
      const {bytes} = await this.sourceAsset(id, asset);
      return {
        id:assetId, mime:asset.mime, data:bytes.toString('base64'), rights:current.rights,
        provenance:{origin:'studio-original',studio:current.studio,sourceFile:asset.name,
          sourceHash:asset.hash,intakeId:id,styleFamily:current.projectId}
      };
    }));
    const hydrated = descriptor.intake.hydrateConcept(concept, assets);
    const composition = composeNativeConcept(hydrated, {studioAssets:new Map(assets.map(asset => [asset.id, asset]))});
    const base = emptyProject({id:current.projectId,name:current.name,androidUrl:current.storeUrl});
    const {project} = applyOperations(base, composition.operations);
    const bytesById = new Map(assets.map(asset => [asset.id, asset.data]));
    const lowered = project.assets.map(asset => ({...asset,data:bytesById.get(asset.id)}));
    // The compiler enforces the upload limit on the actual Unity HTML.
    const {manifest} = await compileNative(project, {assets:lowered,target:'unity-ads-ua-playable'});
    const intent = {project,contentHash:contentHash(project),artifact:manifest};
    if (!(await writeRecord(publication, intent))) return this.publish(current, await readJson(publication));
    return this.publish(current, intent);
  }

  async publish(current, intent) {
    const {project} = intent;
    check(project.projectId === current.projectId && contentHash(project) === intent.contentHash, 'E_INTAKE_PUBLICATION');
    const byId = new Map(current.assets.map(asset => [asset.id, asset]));
    const data = await Promise.all(project.assets.map(async asset => {
      const original = byId.get(asset.id);
      check(original && original.hash === asset.hash && original.mime === asset.mime, 'E_INTAKE_ASSET_REFERENCE');
      const {bytes} = await this.sourceAsset(current.id, original);
      return [asset.hash, bytes.toString('base64')];
    }));
    const bundle = projectBundle(project, Object.fromEntries(data));
    try {
      await importProjectFile(this.service, bundle);
    } catch (error) {
      if (error.message !== 'E_PROJECT_EXISTS') throw error;
      // A completed import can win the race or outlive its originating agent.
      // Only that exact intake's prepared project may be reused.
      let saved;
      try {
        ({project:saved} = await this.service.store.open(current.projectId));
      } catch (openError) {
        if (openError.code === 'ENOENT') throw Error('E_INTAKE_PUBLICATION_PENDING', {cause:openError});
        throw openError;
      }
      check(saved.base.kind === 'native-scene' && contentHash(saved) === intent.contentHash, 'E_PROJECT_EXISTS');
    }
    return this.read(current.id);
  }
}
