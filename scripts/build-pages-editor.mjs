import {mkdir, writeFile, cp, rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import process from 'node:process';
import {reviewRuntimeBundle} from './lean/native/compiler.mjs';
import {DEMO_PROJECTS, DEMO_ALIASES, buildDemoSeed} from './lean/native/demos.mjs';
import {networkTargets} from './lean/native/network-targets.mjs';

const root = resolve(import.meta.dirname, '..');
const out = resolve(process.argv[2] ?? resolve(root, 'dist/pages-editor'));

await rm(out, {recursive: true, force: true});
await mkdir(resolve(out, 'seeds'), {recursive: true});

const seeds = [];
for (const demo of DEMO_PROJECTS) {
  const seed = await buildDemoSeed(demo.id, root);
  seeds.push(seed);
  await writeFile(resolve(out, 'seeds', `${demo.id}.json`), JSON.stringify({
    id: seed.id,
    meta: seed.meta,
    doc: seed.doc,
    render: seed.render,
    metadata: seed.metadata,
    exportedHtml: seed.unityHtml,
    applovinHtml: seed.applovinHtml,
    standaloneHtml: seed.standaloneHtml,
    bundleText: seed.bundleText,
  }));
}

const demosManifest = {
  defaultProject: DEMO_PROJECTS[0].id,
  aliases: DEMO_ALIASES,
  demos: seeds.map(seed => ({
    ...seed.meta,
    revisionId: seed.doc.revisionId,
    installed: true,
    seedFile: `seeds/${seed.id}.json`,
  })),
};

await cp(resolve(root, 'scripts/lean/editor/brand'), resolve(out, 'brand'), {recursive: true});
await cp(resolve(root, 'scripts/lean/editor/review-editor.css'), resolve(out, 'review-editor.css'));
await cp(resolve(root, 'scripts/lean/editor/review-editor.js'), resolve(out, 'review-editor.js'));
await writeFile(resolve(out, 'review-runtime.js'), await reviewRuntimeBundle());
await writeFile(resolve(out, 'demos.json'), JSON.stringify(demosManifest, null, 2) + '\n');

const cacheBust = encodeURIComponent(seeds.map(s => s.doc.revisionId.slice(0, 8)).join('-'));
const hostedEntry = `/* global document,location,URL,URLSearchParams,fetch,localStorage,crypto */
const base = new URL('./', import.meta.url);
const manifest = await fetch(new URL('demos.json?v=${cacheBust}', base), {cache: 'no-store'}).then(r => {
  if (!r.ok) throw Error('Could not load Tora demo catalog.');
  return r.json();
});

const query = new URLSearchParams(location.search);
const requested = query.get('project') || manifest.defaultProject;
const resolvedId = manifest.aliases?.[requested] || requested;
const activeDemo = manifest.demos.find(d => d.id === resolvedId) || manifest.demos[0];

const seed = await fetch(new URL(activeDemo.seedFile + '?v=' + encodeURIComponent(activeDemo.revisionId), base), {cache: 'no-store'}).then(r => {
  if (!r.ok) throw Error('Could not load ' + activeDemo.name + '.');
  return r.json();
});

const storageKey = 'tora.hosted.review:' + seed.id;
let state;
try {
  state = JSON.parse(localStorage.getItem(storageKey) || 'null');
} catch {
  state = null;
}
if (!state || state.revisionId !== seed.metadata.expected.revisionId) {
  state = {
    revisionId: seed.metadata.expected.revisionId,
    storeUrl: seed.metadata.storeUrl ?? '',
    accepted: Boolean(seed.metadata.accepted),
    requests: [],
  };
}
const persist = () => {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* ignore */ }
};

const currentMetadata = () => ({
  ...seed.metadata,
  storeUrl: state.storeUrl,
  accepted: state.accepted,
  requests: state.requests,
});

globalThis.toraHostedReview = {
  async request(path, body) {
    const url = new URL(path, location.origin);
    const p = url.pathname;
    if (!body) {
      if (p.endsWith('/api/creation/capabilities')) return {networkTargets: ${JSON.stringify(networkTargets)}};
      if (p.endsWith('/api/demos')) return {demos: manifest.demos};
      if (p.endsWith('/review/connection')) return {configured: false, supportedProviders: []};
      if (p.endsWith('/review')) {
        if (url.searchParams.get('bundle') === '1') return {text: seed.bundleText};
        return currentMetadata();
      }
      if (p.endsWith('/render')) return seed.render;
      return seed.doc;
    }
    if (p.endsWith('/api/demos/open')) {
      const id = manifest.aliases?.[body.id] || body.id;
      const demo = manifest.demos.find(d => d.id === id);
      if (!demo) throw Error('E_NATIVE_NOT_FOUND');
      return {projectId: demo.id, name: demo.name, created: false, editorUrl: '?project=' + encodeURIComponent(demo.id)};
    }
    if (p.endsWith('/review')) {
      if (body.action === 'store') {
        state.storeUrl = body.url;
        persist();
        return currentMetadata();
      }
      if (body.action === 'request') {
        const req = {
          id: body.requestId || crypto.randomUUID(),
          expected: seed.metadata.expected,
          notes: body.notes || [],
          status: 'waiting',
          createdAt: Date.now(),
        };
        state.requests = [...state.requests.filter(r => r.id !== body.replacesRequestId), req];
        persist();
        return req;
      }
      if (body.action === 'discard') {
        state.requests = state.requests.map(r => r.id === body.requestId ? {...r, status: 'discarded'} : r);
        persist();
        return currentMetadata();
      }
      return currentMetadata();
    }
    if (p.endsWith('/export')) {
      if (body.target === 'standalone-browser-draft') return {html: seed.standaloneHtml || seed.exportedHtml};
      if (body.target === 'applovin-growth-playable') return {html: seed.applovinHtml || seed.exportedHtml};
      return {html: seed.exportedHtml};
    }
    if (p.endsWith('/accept')) {
      state.accepted = true;
      persist();
      return {accepted: true};
    }
    throw Error('This action requires the local Tora editor server.');
  },
};

if (query.get('project') !== seed.id) {
  query.set('project', seed.id);
  globalThis.history.replaceState(null, '', '?' + query);
}

const {openReview} = await import('./review-editor.js?v=${cacheBust}');
await openReview(seed.id, currentMetadata());

const newLink = document.getElementById('review-new-link');
if (newLink) newLink.hidden = true;

const nav = document.querySelector('.review-header nav');
if (nav) {
  const back = document.createElement('a');
  back.className = 'review-button';
  back.href = '../';
  back.textContent = '← Tora';
  nav.prepend(back);
}
`;

await writeFile(resolve(out, 'hosted-entry.js'), hostedEntry);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0068E6">
<title>Tora Editor — Live Playable Studio</title>
<link rel="icon" href="./brand/mark.svg?v=orig-1" type="image/svg+xml">
<link rel="stylesheet" href="./review-editor.css?v=${cacheBust}">
</head>
<body class="tora-review">
<script type="module" src="./hosted-entry.js?v=${cacheBust}"></script>
</body>
</html>
`;
await writeFile(resolve(out, 'index.html'), html);
globalThis.console.log(`Built multi-demo Tora review editor (${seeds.map(s => s.id).join(', ')}) for static hosting: ${out}`);
