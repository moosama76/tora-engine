/** Build the 3 Tora-authored showcase playables (Tiny Harvest, Traffic Tycoon, Mini Golf),
 *  their phone-framed browser companions, live 16:10 retina thumbnails, and exact size manifest. */
import {build} from 'esbuild';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Buffer} from 'node:buffer';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import process from 'node:process';
import {chromium} from 'playwright';
import {DEMO_PROJECTS, buildDemoSeed} from './lean/native/demos.mjs';
import {portfolioPreviewShell} from './portfolio-preview-shell.mjs';

const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const formatKb = bytes => bytes >= 1_000_000
  ? `${(bytes / 1_000_000).toFixed(2)} MB`
  : `${(bytes / 1000).toFixed(1)} KB`;

export async function buildToraShowcase(out = resolve('dist/tora-showcase')) {
  const hostBundle = await build({
    entryPoints: ['packages/test-harness/src/mraid-host.ts'],
    bundle: true,
    minify: true,
    write: false,
    platform: 'browser',
    target: 'es2020',
    format: 'iife',
    globalName: 'portfolioHost',
  });
  const host = hostBundle.outputFiles[0].text + `;portfolioHost.installMraidHost({state:'default',visible:true,version:'3.0'});const open=window.mraid.open.bind(window.mraid);window.mraid.open=url=>{open(url);let note=document.getElementById('portfolio-intent');if(!note){note=document.createElement('div');note.id='portfolio-intent';note.setAttribute('role','status');note.style.cssText='position:fixed;bottom:12px;left:12px;right:12px;z-index:10000;padding:12px;border-radius:12px;background:#161616;color:white;text-align:center;font:14px system-ui;pointer-events:none';document.body.append(note);}note.textContent='Portfolio demo — no app or store opens.';};`;

  await mkdir(resolve(out, 'assets'), {recursive: true});
  const browser = await chromium.launch({headless: true});
  const artifacts = {};
  const rows = [];

  try {
    for (const demo of DEMO_PROJECTS) {
      const seed = await buildDemoSeed(demo.id);
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

      // Capture crisp 16:10 live gameplay thumbnail from the standalone playable build
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

  const sizesJson = {
    unit: 'Decimal units: KB = 1,000 bytes; MB = 1,000,000 bytes',
    measurement: 'Complete standalone Tora-authored Unity Ads playable HTML including all embedded CC0 art, 3D meshes, and compressed MP3 audio; browser companion separate.',
    artifacts,
  };
  await writeFile(resolve(out, 'assets/playable-sizes.json'), JSON.stringify(sizesJson, null, 2) + '\n');
  return rows;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const out = process.argv[2] ? resolve(process.argv[2]) : resolve('dist/tora-showcase');
  const rows = await buildToraShowcase(out);
  globalThis.console.log(JSON.stringify(rows.map(r => ({id: r.id, size: r.sizeLabel, htmlBytes: r.htmlBytes, thumbBytes: r.thumbnail.bytes})), null, 2));
}
