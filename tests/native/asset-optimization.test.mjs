/* global URL,fetch */
import test from 'node:test';
import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {deflateSync} from 'node:zlib';
import {mkdtemp, readFile, rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {crc32} from '../../scripts/lean/native/zip.mjs';
import {readOriginal, registerSource} from '../../scripts/lean/native/assets.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {nativeApi} from '../../scripts/lean/native/api.mjs';
import {createServer} from 'node:http';

function chunk(type, data) {
  const kind = Buffer.from(type), body = Buffer.concat([kind, data]), out = Buffer.alloc(body.length + 8);
  out.writeUInt32BE(data.length, 0); body.copy(out, 4); out.writeUInt32BE(crc32(body), body.length + 4);
  return out;
}
function studioPng(side = 768) {
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(side, 0); ihdr.writeUInt32BE(side, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((side * 4 + 1) * side);
  let seed = 0x12345678;
  for (let y = 0; y < side; y++) for (let x = 0; x < side; x++) {
    const offset = y * (side * 4 + 1) + 1 + x * 4;
    for (let channel = 0; channel < 3; channel++) { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; raw[offset + channel] = seed & 255; }
    raw[offset + 3] = 255;
  }
  const gamma = Buffer.alloc(4); gamma.writeUInt32BE(45455);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('gAMA', gamma), chunk('IDAT', deflateSync(raw, {level: 6})), chunk('IEND', Buffer.alloc(0))]);
}
function stereoWav(seconds = 12) {
  const rate = 48000, frames = rate * seconds, bytes = Buffer.alloc(44 + frames * 4);
  bytes.write('RIFF', 0); bytes.writeUInt32LE(36 + frames * 4, 4); bytes.write('WAVE', 8); bytes.write('fmt ', 12);
  bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(2, 22); bytes.writeUInt32LE(rate, 24); bytes.writeUInt32LE(rate * 4, 28); bytes.writeUInt16LE(4, 32); bytes.writeUInt16LE(16, 34); bytes.write('data', 36); bytes.writeUInt32LE(frames * 4, 40);
  for (let frame = 0; frame < frames; frame++) { const sample = Math.round(Math.sin(frame / 20) * 14000); bytes.writeInt16LE(sample, 44 + frame * 4); bytes.writeInt16LE(sample, 46 + frame * 4); }
  return bytes;
}

test('raw studio uploads retain originals, emit receipts, and compile verified delivery assets', async t => {
  const root = await mkdtemp(resolve('reports/asset-optimization-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const store = new ProjectStore(root), service = new NativeService(store, new EditorState(store)), expected = value => ({revisionId: value.revisionId, contentHash: value.contentHash});
  const created = await service.create({id: 'asset-opt', name: 'Asset optimization'});
  const png = studioPng(); assert.ok(png.length > 1_000_000 && png.length < 8_000_000);
  const image = await service.upload('asset-opt', {expected: expected(created), asset: {id: 'hero', mime: 'image/png', data: png.toString('base64'), rights: 'Synthetic deterministic integration fixture'}});
  assert.ok(image.asset.bytes <= 700_000);
  assert.equal(image.asset.optimization.originalBytes, png.length);
  assert.equal(image.asset.optimization.originalMime, 'image/png');
  assert.deepEqual(Object.keys(created.project.assets), []);
  const current = await service.read('asset-opt');
  assert.deepEqual(Object.keys(current.project.assets[0]).sort(), ['bytes', 'hash', 'id', 'mime', 'provenance', 'rights']);
  assert.deepEqual(await readOriginal(resolve(root, 'asset-opt'), image.asset.optimization.originalHash), png);
  const receipt = JSON.parse(await readFile(resolve(root, 'asset-opt/sources/assets', image.asset.hash.slice(7) + '.json'), 'utf8'));
  assert.equal(receipt.bytes, image.asset.bytes); assert.equal(receipt.optimization.originalBytes, png.length);

  const wav = stereoWav(); assert.ok(wav.length > 2_000_000);
  const audio = await service.upload('asset-opt', {expected: expected(current), asset: {id: 'music', mime: 'audio/wav', data: wav.toString('base64'), rights: 'Synthetic deterministic integration fixture'}});
  assert.ok(audio.asset.bytes <= 700_000); assert.ok(['audio/mpeg', 'audio/wav'].includes(audio.asset.mime));
  assert.deepEqual(await readOriginal(resolve(root, 'asset-opt'), audio.asset.optimization.originalHash), wav);
  const latest = await service.read('asset-opt');
  for (const target of ['meta-audience-playable', 'tiktok-ads-playable']) {
    const artifact = await service.build('asset-opt', latest.project, target);
    assert.ok(artifact.manifest.bytes <= (target === 'meta-audience-playable' ? 2_000_000 : 5_000_000));
    assert.ok(artifact.manifest.assetHashes.includes(image.asset.hash));
    assert.ok(artifact.manifest.assetHashes.includes(audio.asset.hash));
  }

  const originalAgain = await service.upload('asset-opt', {expected: expected(latest), asset: {id: 'hero-copy', mime: 'image/png', sourceHash: image.asset.optimization.originalHash, optimize: 'auto', rights: 'Same fixture'}});
  assert.equal(originalAgain.asset.hash, image.asset.hash);
});

test('optimization none retains exact small files and rejects oversized delivery', async t => {
  const root = await mkdtemp(resolve('reports/asset-optimization-none-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const fixture = await readFile('fixtures/native/ding-dang-assets/cat_0.png');
  const record = await registerSource(root, {id: 'hero', mime: 'image/png', data: fixture.toString('base64'), rights: 'Fixture', optimize: 'none'});
  assert.equal(record.optimization.originalBytes, fixture.length);
  assert.deepEqual(await readFile(resolve(root, 'sources/assets', record.hash.slice(7))), fixture);
  await assert.rejects(registerSource(root, {id: 'large', mime: 'image/png', data: studioPng().toString('base64'), rights: 'Fixture', optimize: 'none'}), /E_NATIVE_ASSET_SIZE/);
});

test('HTTP project and intake routes accept raw assets beyond 700 KB', async t => {
  const root = await mkdtemp(resolve('reports/asset-optimization-http-')), store = new ProjectStore(root), service = new NativeService(store, new EditorState(store));
  await service.create({id: 'http-opt', name: 'HTTP optimization'});
  const route = nativeApi(service), server = createServer((request, response) => route(request, response, new URL(request.url, 'http://localhost'), server.address().port));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); await rm(root, {recursive: true, force: true}); });
  const origin = `http://127.0.0.1:${server.address().port}`, post = async (path, body) => {
    const response = await fetch(origin + path, {method: 'POST', headers: {'Content-Type': 'application/json', Origin: origin}, body: JSON.stringify(body)});
    const result = await response.json(); return {response, result};
  };
  const current = await service.read('http-opt'), png = studioPng();
  const uploaded = await post('/api/projects/http-opt/assets', {expected: {revisionId: current.revisionId, contentHash: current.contentHash}, asset: {id: 'hero', mime: 'image/png', data: png.toString('base64'), rights: 'Deterministic test fixture'}});
  assert.equal(uploaded.response.status, 201, JSON.stringify(uploaded.result)); assert.ok(uploaded.result.asset.bytes <= 700_000);
  const intake = await post('/api/review-intakes', {projectId: 'http-intake', name: 'HTTP intake', brief: 'Optimize a raw upload.', studio: 'Test', rights: 'Deterministic test fixture', mechanic: 'custom'});
  assert.equal(intake.response.status, 201, JSON.stringify(intake.result));
  const received = await post(`/api/review-intakes/${intake.result.id}/assets`, {name: 'hero.png', mime: 'image/png', data: png.toString('base64')});
  assert.equal(received.response.status, 201, JSON.stringify(received.result)); assert.ok(received.result.assets[0].bytes <= 700_000);
  assert.equal(received.result.assets[0].optimization.originalBytes, png.length);
});

test('oversized MP3 uploads optimize cleanly without wavparse failure', async t => {
  const root = await mkdtemp(resolve('reports/asset-optimization-mp3-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const sample = await readFile('assets/kenney-harvest/audio/ambient.mp3');
  let offset = 0;
  if (sample.subarray(0, 3).toString('ascii') === 'ID3') {
    const tagSize = ((sample[6] & 0x7f) << 21) | ((sample[7] & 0x7f) << 14) | ((sample[8] & 0x7f) << 7) | (sample[9] & 0x7f);
    offset = 10 + tagSize + (sample[5] & 0x10 ? 10 : 0);
  }
  const end = sample.length >= offset + 128 && sample.subarray(sample.length - 128, sample.length - 125).toString('ascii') === 'TAG' ? sample.length - 128 : sample.length;
  const frames = sample.subarray(offset, end);
  const repeats = Math.ceil(280_000 / frames.length);
  const largeMp3 = Buffer.concat(Array.from({length: repeats}, () => frames));
  assert.ok(largeMp3.length > 250_000 && largeMp3.length < 700_000);
  const record = await registerSource(root, {id: 'long-track', mime: 'audio/mpeg', data: largeMp3.toString('base64'), rights: 'CC0 fixture'});
  assert.equal(record.mime, 'audio/mpeg');
  assert.ok(record.bytes <= 700_000);
  assert.equal(record.optimization.originalBytes, largeMp3.length);
});
