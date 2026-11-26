/** Build the complete Tora static website into dist/website:
 *  - Preserves the live site design (website/template.html + style.css + script.js)
 *  - 3 live Tora-authored playable demos (Traffic Tycoon, Mini Golf 3D, Tiny Harvest) + phone companions
 *  - Live 16:10 retina thumbnails, brand assets, and exact size manifest (assets/playable-sizes.json)
 *  - Bundled hosted live editor (editor/) so every "Open in Editor" and "Live Editor" link works */
import {build} from 'esbuild';
import {mkdir, writeFile, readFile, cp, rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Buffer} from 'node:buffer';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import process from 'node:process';
import {chromium} from 'playwright';
import {DEMO_PROJECTS, buildDemoSeed} from './lean/native/demos.mjs';
import {portfolioPreviewShell} from './portfolio-preview-shell.mjs';
import {buildPagesEditor} from './build-pages-editor.mjs';

const root = resolve(import.meta.dirname, '..');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const formatKb = bytes => bytes >= 1_000_000
  ? `${(bytes / 1_000_000).toFixed(2)} MB`
  : `${(bytes / 1000).toFixed(1)} KB`;

async function renderLandingPage(artifacts) {
  const template = await readFile(resolve(root, 'website/template.html'), 'utf8');
  const traffic = artifacts['traffic-tycoon'];
  const golf = artifacts['mini-golf'];
  const harvest = artifacts['tiny-harvest'];
  return template
    .replace('{{TRAFFIC_SIZE}}', traffic.sizeLabel)
    .replace('{{TRAFFIC_BYTES}}', traffic.htmlBytes.toLocaleString('en-US'))
    .replace('{{GOLF_SIZE}}', golf.sizeLabel)
    .replace('{{GOLF_BYTES}}', golf.htmlBytes.toLocaleString('en-US'))
    .replace('{{HARVEST_SIZE}}', harvest.sizeLabel)
    .replace('{{HARVEST_BYTES}}', harvest.htmlBytes.toLocaleString('en-US'));
}

export async function buildToraWebsite(out = resolve(root, 'dist/website')) {
  const hostBundle = await build({
    entryPoints: [resolve(root, 'packages/test-harness/src/mraid-host.ts')],
    bundle: true,
    minify: true,
    write: false,
    platform: 'browser',
    target: 'es2020',
    format: 'iife',
    globalName: 'portfolioHost',
  });
  const host = hostBundle.outputFiles[0].text + `;portfolioHost.installMraidHost({state:'default',visible:true,version:'3.0'});const open=window.mraid.open.bind(window.mraid);window.mraid.open=url=>{open(url);let note=document.getElementById('portfolio-intent');if(!note){note=document.createElement('div');note.id='portfolio-intent';note.setAttribute('role','status');note.style.cssText='position:fixed;bottom:12px;left:12px;right:12px;z-index:10000;padding:12px;border-radius:12px;background:#161616;color:white;text-align:center;font:14px system-ui;pointer-events:none';document.body.append(note);}note.textContent='Portfolio demo — no app or store opens.';};`;

  await rm(out, {recursive: true, force: true});
  await mkdir(resolve(out, 'assets'), {recursive: true});
  await cp(resolve(root, 'scripts/lean/editor/brand'), resolve(out, 'assets'), {recursive: true});
  await cp(resolve(root, 'website/style.css'), resolve(out, 'style.css'));
  await cp(resolve(root, 'website/script.js'), resolve(out, 'script.js'));

  const browser = await chromium.launch({headless: true});
  const artifacts = {};
  const rows = [];
  const seeds = [];

  try {
    for (const demo of DEMO_PROJECTS) {
      const seed = await buildDemoSeed(demo.id, root);
      seeds.push(seed);
      const rawBytes = Buffer.from(seed.unityHtml, 'utf8');
      const playHtml = portfolioPreviewShell({
        title: demo.name,
        encodedHtml: rawBytes.toString('base64'),
        host,
        background: demo.previewBackground,
        orientation: demo.defaultOrientation,
        editorURL: '../editor/',
        projectId: demo.id,
      });

      const gameDir = resolve(out, demo.id);
      await mkdir(gameDir, {recursive: true});
      await writeFile(resolve(gameDir, 'index.html'), rawBytes);
      await writeFile(resolve(gameDir, 'play.html'), playHtml);

      const thumbPath = resolve(out, 'assets', `${demo.id}.png`);
      const page = await browser.newPage({viewport: {width: 800, height: 500}, deviceScaleFactor: 1.5});
      await page.setContent(seed.standaloneHtml, {waitUntil: 'load'});
      await page.waitForFunction(() => globalThis.toraRuntime);
      await page.waitForTimeout(demo.id === 'traffic-tycoon' ? 800 : 450);
      await page.screenshot({path: thumbPath, type: 'png'});
      await page.close();
      const thumbBytes = await readFile(thumbPath);

      const playBytes = Buffer.from(playHtml, 'utf8');
      const entry = {
        id: demo.id,
        title: demo.name,
        path: `${demo.id}/index.html`,
        htmlBytes: rawBytes.length,
        sha256: sha(rawBytes),
        sizeLabel: formatKb(rawBytes.length),
        browserCompanion: {
          path: `${demo.id}/play.html`,
          htmlBytes: playBytes.length,
          sha256: sha(playBytes),
        },
        editorUrl: `editor/?project=${encodeURIComponent(demo.id)}`,
        defaultOrientation: demo.defaultOrientation,
        defaultScreenSize: 'large',
        thumbnail: {
          path: `assets/${demo.id}.png`,
          bytes: thumbBytes.length,
          sha256: sha(thumbBytes),
        },
      };
      artifacts[demo.id] = entry;
      rows.push(entry);
    }
  } finally {
    await browser.close();
  }

  await buildPagesEditor(resolve(out, 'editor'), {seeds});

  const sizesJson = {
    unit: 'Decimal units: KB = 1,000 bytes; MB = 1,000,000 bytes',
    measurement: 'Complete standalone Tora-authored Unity Ads playable HTML including all embedded CC0 art, 3D meshes, and compressed MP3 audio; browser companion separate.',
    license: 'Apache-2.0',
    repository: 'https://github.com/moosama76/tora-engine',
    funding: 'https://github.com/sponsors/moosama76',
    networks: [
      {id: 'unity-ads-ua-playable', packaging: 'single-html', maxBytes: 5_000_000, comparator: '<'},
      {id: 'applovin-growth-playable', packaging: 'single-html', maxBytes: 5_000_000, comparator: '<='},
      {id: 'meta-audience-playable', packaging: 'single-html', maxBytes: 2_000_000, comparator: '<='},
      {id: 'google-ads-app-playable', packaging: 'zip', maxBytes: 5_000_000, comparator: '<='},
      {id: 'ironsource-levelplay-playable', packaging: 'single-html', maxBytes: 5_000_000, comparator: '<='},
      {id: 'mintegral-appgrowth-zip', packaging: 'zip', maxBytes: 5_000_000, comparator: '<='},
      {id: 'tiktok-ads-playable', packaging: 'zip', maxBytes: 5_000_000, comparator: '<='},
    ],
    verification: 'Static and mock-host engineering checks only; official network and physical-device acceptance not yet verified.',
    artifacts,
  };
  await writeFile(resolve(out, 'assets/playable-sizes.json'), JSON.stringify(sizesJson, null, 2) + '\n');
  await writeFile(resolve(out, 'index.html'), await renderLandingPage(artifacts));
  return rows;
}

export const buildToraShowcase = buildToraWebsite;

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const out = process.argv[2] ? resolve(process.argv[2]) : resolve(root, 'dist/website');
  const rows = await buildToraWebsite(out);
  globalThis.console.log(JSON.stringify({out, demos: rows.map(r => ({id: r.id, size: r.sizeLabel, htmlBytes: r.htmlBytes, thumbBytes: r.thumbnail.bytes}))}, null, 2));
}
