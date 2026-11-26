import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {Buffer} from 'node:buffer';
import {createZip, readZip} from '../../scripts/lean/native/zip.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {emptyProject} from '../../scripts/lean/native/document.mjs';

const targets = ['ironsource-levelplay-playable', 'meta-audience-playable', 'google-ads-app-playable', 'mintegral-appgrowth-zip', 'tiktok-ads-playable'];
function project() {
  return emptyProject({id: 'network-proof', name: 'Network proof', androidUrl: 'https://play.google.com/store/apps/details?id=com.playablelab.game'});
}
function check(file, target, expected = 0) {
  const pack = JSON.parse(readFileSync(`network-rules/${target}.json`, 'utf8'));
  const result = spawnSync('cargo', ['run', '-q', '-p', 'playable-cli', '--', 'artifact', 'check', file, '--network', target, '--confirm-reviewed', pack.reviewedAt, '--json'], {encoding: 'utf8'});
  assert.equal(result.status, expected, result.stderr || result.stdout);
  return JSON.parse(result.stdout);
}
import {readFileSync} from 'node:fs';

test('deterministic ZIP writer/reader enforces bytes, paths, and CRC', () => {
  const input = [{name: 'z.txt', bytes: Buffer.from('last')}, {name: 'folder/a.txt', bytes: Buffer.from('first')}];
  const first = createZip(input), second = createZip([...input].reverse());
  assert.deepEqual(first, second);
  assert.deepEqual(readZip(first).map(entry => [entry.name, entry.bytes.toString()]), [['folder/a.txt', 'first'], ['z.txt', 'last']]);
  assert.equal(first.readUInt16LE(10), 0); assert.equal(first.readUInt16LE(12), 33);
  for (const name of ['../escape', '/absolute', 'a\\b', 'a//b']) assert.throws(() => createZip([{name, bytes: Buffer.from('x')}]), /E_ARTIFACT_PACKAGE/);
  const corrupt = Buffer.from(first); corrupt[corrupt.readUInt16LE(26) + 30] ^= 1;
  assert.throws(() => readZip(corrupt), /E_ARTIFACT_PACKAGE/);
});

test('all five new packages pass exact static checks deterministically', async t => {
  const root = await mkdtemp(resolve('reports/network-packages-')); t.after(() => rm(root, {recursive: true, force: true}));
  for (const target of targets) {
    const source = project(); source.base.storeUrl = '';
    const artifact = await compileNative(source, {target}), repeat = await compileNative(source, {target});
    assert.equal(artifact.html, repeat.html); assert.deepEqual(artifact.archiveBytes, repeat.archiveBytes);
    const filename = artifact.archiveFilename ?? 'index.html', file = resolve(root, target, filename);
    await mkdir(resolve(root, target), {recursive: true}); await writeFile(file, artifact.archiveBytes ?? artifact.html);
    const report = check(file, target); assert.equal(report.status, 'STATIC_PASS'); assert.equal(report.networkAcceptance, 'not yet verified');
    assert.equal(report.physicalDevices, 'not yet verified'); assert.equal(report.fileBytes, artifact.manifest.bytes);
    if (artifact.archiveBytes) assert.ok(readZip(artifact.archiveBytes).length >= 1);
  }
});

test('wrong package layouts and cross-profile labels fail closed', async t => {
  const root = await mkdtemp(resolve('reports/network-package-reject-')); t.after(() => rm(root, {recursive: true, force: true}));
  const missingStore = project(); missingStore.base.storeUrl = '';
  await assert.rejects(compileNative(missingStore, {target: 'unity-ads-ua-playable'}), /E_NATIVE_STORE/);
  const meta = await compileNative(project(), {target: 'meta-audience-playable'}), unity = resolve(root, 'index.html'); await writeFile(unity, meta.html);
  assert.equal(check(unity, 'unity-ads-ua-playable', 5).technicalStatus, 'FAIL');
  const tiktok = await compileNative(project(), {target: 'tiktok-ads-playable'}), missing = createZip([{name: 'index.html', bytes: Buffer.from(tiktok.html)}]), tiktokFile = resolve(root, 'missing.zip');
  await writeFile(tiktokFile, missing); assert.equal(check(tiktokFile, 'tiktok-ads-playable', 5).facts, null);
  const mintegral = await compileNative(project(), {target: 'mintegral-appgrowth-zip'}), wrongName = resolve(root, 'wrong.zip'); await writeFile(wrongName, mintegral.archiveBytes);
  assert.equal(check(wrongName, 'mintegral-appgrowth-zip', 5).facts, null);
  const htmlOnZip = resolve(root, 'index.html'); await writeFile(htmlOnZip, tiktok.html);
  assert.equal(check(htmlOnZip, 'tiktok-ads-playable', 5).technicalStatus, 'FAIL');
});
