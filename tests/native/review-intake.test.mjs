import test from 'node:test';
import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {mkdtemp, rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {ReviewIntake} from '../../scripts/lean/native/review-intake.mjs';
import {createHarvestConcept} from '../../scripts/lean/native/author-harvest.mjs';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';

test('studio intake preserves originals, resolves references and publishes one checked first build', async t => {
  const root = await mkdtemp(resolve('reports/review-intake-'));
  t.after(() => rm(root, {recursive:true,force:true}));
  const store = new ProjectStore(root);
  const service = new NativeService(store, new EditorState(store));
  const intake = new ReviewIntake(service);
  const fixture = await createHarvestConcept();
  const {name,storeUrl} = fixture.product;
  const source = {
    projectId:'studio-harvest-fixture', name, storeUrl, studio:'Fixture supplier',
    brief:'Show three harvests restoring one farm.',
    rights:'Kenney CC0-1.0 assets supplied as an intake fixture.'
  };
  const draft = await intake.create(source);
  assert.equal(draft.status, 'draft');
  assert.deepEqual(await store.list(), []);
  await assert.rejects(intake.submit(draft.id), /E_INTAKE_HARVEST_MEDIA/);
  await assert.rejects(intake.claim(draft.id), /E_INTAKE_STALE/);
  await assert.rejects(intake.create({...source, referenceUrl:'file:///etc/passwd'}), /E_INTAKE_ARGUMENT/);
  await assert.rejects(intake.upload(draft.id, {name:'fake.png',mime:'image/png',data:'aGVsbG8='}), /E_NATIVE_ASSET_DECODE/);

  const uploaded = new Map();
  for (const sourceAsset of fixture.harvest.assets) {
    const input = {name:sourceAsset.id,mime:sourceAsset.mime,data:sourceAsset.data};
    const state = await intake.upload(draft.id, input);
    const asset = state.assets.find(asset => asset.name === input.name);
    uploaded.set(input.name, asset.id);
    assert.deepEqual(await intake.upload(draft.id, input), state);
    assert.deepEqual(await intake.asset(draft.id, asset.id), {mime:input.mime,bytes:Buffer.from(input.data,'base64')});
  }
  assert.equal((await intake.submit(draft.id)).status, 'queued');
  const otherClient = new ReviewIntake(new NativeService(store, new EditorState(store)));
  assert.equal((await otherClient.claim(draft.id)).status, 'claimed');
  const isolated = await intake.create({...source,projectId:'isolated-intake'});
  const foreignAsset = fixture.harvest.assets[0];
  const isolatedState = await intake.upload(isolated.id, {name:'isolated.png',mime:foreignAsset.mime,data:foreignAsset.data});
  const [isolatedEntry] = isolatedState.assets;
  await assert.rejects(intake.asset(draft.id, isolatedEntry.id), /E_INTAKE_NOT_FOUND/);
  const concept = globalThis.structuredClone(fixture);
  const byId = id => uploaded.get(id);
  delete concept.harvest.assets;
  for (const cue of Object.keys(concept.harvest.audio)) concept.harvest.audio[cue] = byId(concept.harvest.audio[cue]);
  for (const tile of Object.keys(concept.harvest.tiles)) concept.harvest.tiles[tile] = byId(concept.harvest.tiles[tile]);
  for (const object of concept.harvest.world) object.assetId = byId(object.assetId);
  concept.harvest.firstHintSeconds = 0.8;
  const altered = globalThis.structuredClone(concept);
  altered.harvest.tiles.carrot = isolatedEntry.id;
  await assert.rejects(otherClient.build(draft.id,{concept:altered}), /E_INTAKE_ASSET_REFERENCE/);
  assert.deepEqual(await store.list(), []);
  // Simulate losing the agent immediately after durable publication intent.
  otherClient.publish = () => {throw Error('disconnected');};
  await assert.rejects(otherClient.build(draft.id,{concept}), /disconnected/);
  assert.equal((await intake.read(draft.id)).publicationPending,true);
  const ready = await intake.build(draft.id,{});
  assert.equal(ready.status,'ready');
  assert.deepEqual(await intake.read(draft.id),ready);
  assert.deepEqual(await intake.build(draft.id,{concept}),ready);
  assert.ok(ready.artifact.bytes < 5_000_000);
  const saved = await service.read(source.projectId);
  assert.equal(saved.project.base.storeUrl, source.storeUrl);
  assert.equal(saved.project.eventBindings.find(binding => binding.id === 'harvest.hint.show').condition.any[0].all[1].value, 0.8);
  assert.equal(saved.project.gameplay.find(behavior => behavior.id === 'harvest.deadline').parameters.seconds, 19);
  const projectAssets = saved.project.assets;
  assert.ok(projectAssets.every(asset => {
    const receipt = JSON.parse(asset.provenance);
    return receipt.origin === 'studio-original' && receipt.studio === source.studio && receipt.sourceHash === asset.hash &&
      receipt.intakeId === draft.id && asset.rights === source.rights;
  }));
  const artifact = await service.export(source.projectId, {revisionId:saved.revisionId, target:'unity-ads-ua-playable'});
  assert.equal(ready.artifact.artifactHash, artifact.manifest.artifactHash);
  assert.equal(ready.artifact.bytes,Buffer.byteLength(artifact.html));

  const forged = globalThis.structuredClone(fixture);
  const asset = forged.harvest.assets[0];
  asset.provenance = {origin:'studio-original',studio:source.studio,intakeId:draft.id,sourceFile:asset.id,
    sourceHash:asset.provenance.sourceHash,styleFamily:source.projectId};
  assert.throws(() => composeNativeConcept(forged), /E_ASSET_POLICY_STUDIO_SOURCE/);
});
