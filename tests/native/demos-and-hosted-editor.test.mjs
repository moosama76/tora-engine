/* global location, URLSearchParams */
import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdtemp, readFile, rm, stat} from 'node:fs/promises';
import {extname, resolve} from 'node:path';
import {createServer} from 'node:http';
import {URL} from 'node:url';
import {chromium} from 'playwright';
import {createEditorServer} from '../../scripts/lean/editor.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {lowerAssets} from '../../scripts/lean/native/assets.mjs';
import {DEMO_PROJECTS, materializeDemo} from '../../scripts/lean/native/demos.mjs';
import {analyzeAudio} from '../../scripts/lean/native/audio-analysis.mjs';
import {Buffer} from 'node:buffer';
import {networkTargets} from '../../scripts/lean/native/network-targets.mjs';
import {readZip} from '../../scripts/lean/native/zip.mjs';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ttf': 'font/ttf',
};

async function startStaticDir(dir, prefix = '') {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    let rel = url.pathname;
    if (prefix) {
      if (!rel.startsWith(prefix)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      rel = rel.slice(prefix.length);
    }
    if (!rel || rel.endsWith('/')) rel += 'index.html';
    const target = resolve(dir, rel.replace(/^\/+/, ''));
    if (!target.startsWith(resolve(dir))) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    try {
      const data = await readFile(target);
      res.writeHead(200, {'Content-Type': MIME[extname(target)] ?? 'application/octet-stream'});
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    close: async () => {
      server.closeAllConnections();
      await new Promise(done => server.close(done));
    },
  };
}

test('local editor exposes all 3 Tora demos from intake, header menu, and direct ?project URLs', async t => {
  const root = await mkdtemp(resolve('reports/demo-editor-local-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const server = await createEditorServer({store: new ProjectStore(root), port: 0});
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(done => server.close(done));
  });
  const origin = `http://127.0.0.1:${server.address().port}`;

  const listed = await globalThis.fetch(`${origin}/api/demos`).then(r => r.json());
  assert.deepEqual(listed.demos.map(d => d.id), DEMO_PROJECTS.map(d => d.id));

  const browser = await chromium.launch({headless: true});
  t.after(() => browser.close());
  const errors = [];
  const page = await browser.newPage({viewport: {width: 1366, height: 860}});
  page.on('pageerror', err => errors.push(err.message));

  // 1. Open intake (/?view=new) and click Traffic Tycoon demo card
  await page.goto(`${origin}/?view=new`, {waitUntil: 'networkidle'});
  await page.waitForSelector('.tora-demo-card[data-demo-id="traffic-tycoon"]');
  const demoCards = await page.locator('.tora-demo-card').count();
  assert.equal(demoCards, 3);
  await page.click('.tora-demo-card[data-demo-id="traffic-tycoon"]');
  await page.waitForURL(/\?project=traffic-tycoon/);
  await page.waitForSelector('#review-before-toggle:not([disabled])');
  assert.match(await page.textContent('#review-title'), /Traffic Tycoon/i);

  // 2. Switch to Mini Golf from the header Demos menu
  await page.waitForSelector('#review-demos:not([hidden])');
  await page.click('#review-demos summary');
  await page.click('#review-demo-list button[data-demo-id="mini-golf"]');
  await page.waitForURL(/\?project=mini-golf/);
  await page.waitForSelector('#review-before-toggle:not([disabled])');
  assert.match(await page.textContent('#review-title'), /Mini Golf/i);

  // 3. Direct URL alias (?project=tiny-harvest-win-cta) auto-materializes Tiny Harvest
  await page.goto(`${origin}/?project=tiny-harvest-win-cta`, {waitUntil: 'load'});
  await page.waitForURL(/\?project=tiny-harvest$/);
  await page.waitForSelector('#review-before-toggle:not([disabled])');
  assert.match(await page.textContent('#review-title'), /Tiny Harvest/i);

  assert.deepEqual(errors, []);
});

test('hosted static editor serves all 3 demos via ?project and Demos menu with exports', async t => {
  const pagesDir = resolve('dist/pages-editor');
  const exists = await stat(resolve(pagesDir, 'demos.json')).then(() => true, () => false);
  if (!exists) {
    t.skip('Run node scripts/build-pages-editor.mjs first to build dist/pages-editor');
    return;
  }
  const host = await startStaticDir(pagesDir, '/tora/editor');
  t.after(() => host.close());

  const browser = await chromium.launch({headless: true});
  t.after(() => browser.close());
  const errors = [];
  const page = await browser.newPage({viewport: {width: 1366, height: 860}});
  page.on('pageerror', err => errors.push(err.message));

  for (const [queryId, expectedId, expectedTitle] of [
    ['tiny-harvest', 'tiny-harvest', /Tiny Harvest/i],
    ['traffic-tycoon', 'traffic-tycoon', /Traffic Tycoon/i],
    ['mini-golf', 'mini-golf', /Mini Golf/i],
    ['tiny-harvest-win-cta', 'tiny-harvest', /Tiny Harvest/i],
  ]) {
    await page.goto(`${host.origin}/tora/editor/?project=${queryId}`, {waitUntil: 'networkidle'});
    await page.waitForSelector('.review-header nav a[href="../"]');
    await page.waitForSelector('#review-before-toggle:not([disabled])');
    assert.equal(await page.evaluate(() => new URLSearchParams(location.search).get('project')), expectedId);
    assert.match(await page.textContent('#review-title'), expectedTitle);
    const hasBack = await page.locator('.review-header nav a[href="../"]').count();
    assert.equal(hasBack, 1);
    const newHidden = await page.locator('#review-new-link').isHidden();
    assert.equal(newHidden, true);
  }

  // Switch from Tiny Harvest to Traffic Tycoon inside the hosted Demos menu
  await page.click('#review-demos summary');
  await page.click('#review-demo-list button[data-demo-id="traffic-tycoon"]');
  await page.waitForURL(/\/tora\/editor\/\?project=traffic-tycoon/);
  await page.waitForSelector('#review-before canvas');
  assert.match(await page.textContent('#review-title'), /Traffic Tycoon/i);

  // Verify review moments work in hosted mode (End card + Timeout)
  await page.click('#review-moments button[data-moment="end-card"]');
  await page.click('#review-moments button[data-moment="timeout"]');
  await page.click('#review-moments button[data-moment="opening"]');

  const hostedArtifacts = await page.evaluate(async targets => {
    const output = {};
    for (const target of targets) output[target] = await globalThis.toraHostedReview.request('/api/projects/traffic-tycoon/export', {revisionId: 'seed', target});
    return output;
  }, networkTargets.filter(target => target.hostKind !== 'browser').map(target => target.id));
  for (const target of networkTargets.filter(target => target.hostKind !== 'browser')) {
    const artifact = hostedArtifacts[target.id]; assert.ok(artifact.html, target.id);
    if (target.packaging === 'zip') {
      assert.ok(artifact.archiveBase64, target.id); const entries = readZip(Buffer.from(artifact.archiveBase64, 'base64'));
      assert.ok(entries.some(entry => entry.name.endsWith('.html')), target.id);
      if (target.id === 'tiktok-ads-playable') assert.ok(entries.some(entry => entry.name === 'config.json'));
    }
  }
  assert.deepEqual(errors, []);
});

test('all 3 showcase playables use compressed unique MP3 audio and longer celebratory win fanfares', async t => {
  const root = await mkdtemp(resolve('reports/demo-audio-audit-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const store = new ProjectStore(root);
  const service = new NativeService(store, new EditorState(store));
  const seenAudioHashes = new Map();
  for (const demo of DEMO_PROJECTS) {
    await materializeDemo(service, demo.id, {overwrite: true});
    const {project} = await service.read(demo.id);
    const audioAssets = project.assets.filter(a => a.mime.startsWith('audio/'));
    assert.ok(audioAssets.length >= 5, `${demo.id} must have >=5 audio assets`);
    for (const asset of audioAssets) {
      assert.equal(asset.mime, 'audio/mpeg', `${demo.id}:${asset.id} must be compressed MP3`);
      assert.ok(!seenAudioHashes.has(asset.hash), `Duplicate audio hash between ${demo.id}:${asset.id} and ${seenAudioHashes.get(asset.hash)}`);
      seenAudioHashes.set(asset.hash, `${demo.id}:${asset.id}`);
    }
    const winMeta = audioAssets.find(a => /(?:win|victory)/i.test(a.id));
    assert.ok(winMeta, `${demo.id} must define a win/victory audio asset`);
    const [lowered] = await lowerAssets(resolve(root, demo.id), [winMeta]);
    const bytes = Buffer.from(lowered.data, 'base64');
    const analysis = await analyzeAudio(new Uint8Array(bytes), 'audio/mpeg');
    assert.ok(analysis.trimmedDurationSec >= 1.6, `${demo.id} win fanfare must be >= 1.6s, got ${analysis.trimmedDurationSec}`);
    assert.notEqual(analysis.pitchContour, 'falling', `${demo.id} win fanfare must not have a falling contour`);
    assert.ok(analysis.peakDbfs <= -0.4, `${demo.id} win fanfare must not clip`);
  }
});
