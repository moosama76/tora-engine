/* global document */
import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdtemp, mkdir, rm, stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createServer} from 'node:http';
import {URL} from 'node:url';
import {chromium} from 'playwright';
import {createEditorServer} from '../../scripts/lean/editor.mjs';
import {EditorState} from '../../scripts/lean/editor-state.mjs';
import {ProjectStore} from '../../scripts/lean/project-store.mjs';
import {nativeApi} from '../../scripts/lean/native/api.mjs';
import {NativeService} from '../../scripts/lean/native/service.mjs';
import {ReviewConnection} from '../../scripts/lean/native/review-connection.mjs';

test('verified BYOK capability gate allows only playable-ready APIs, verifies model access, and never leaks keys', async t => {
  const root = await mkdtemp(resolve('reports/byok-gate-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const store = new ProjectStore(root);
  const history = new EditorState(store);
  history.directory = resolve(root, '.history');
  const service = new NativeService(store, history);
  const calls = [];
  const fakeFetch = async (url, options) => {
    calls.push({url, headers: options.headers});
    if (url === 'https://generativelanguage.googleapis.com/v1beta/models/gemini-4-hydrogen') {
      return new globalThis.Response('{}', {status: options.headers['x-goog-api-key'] === 'gemini-good-key-123' ? 200 : 401});
    }
    if (url === 'https://generativelanguage.googleapis.com/v1beta/models?pageSize=200') {
      if (options.headers['x-goog-api-key'] !== 'gemini-good-key-123') return new globalThis.Response('{}', {status: 401});
      return globalThis.Response.json({
        models: [
          {name: 'models/gemini-4-argon', displayName: 'Gemini 4 Argon', inputTokenLimit: 1_000_000, supportedGenerationMethods: ['generateContent']},
          {name: 'models/gemini-4-hydrogen', displayName: 'Gemini 4 Hydrogen', inputTokenLimit: 1_000_000, supportedGenerationMethods: ['generateContent']},
          {name: 'models/text-embedding-004', displayName: 'Embedding', supportedGenerationMethods: ['embedContent']},
          {name: 'models/gemini-1.5-pro', displayName: 'Gemini 1.5 Pro', supportedGenerationMethods: ['generateContent']},
        ],
      });
    }
    if (url === 'https://api.openai.com/v1/models/gpt-6.2-sol') {
      return new globalThis.Response('{}', {status: options.headers.Authorization === 'Bearer openai-good-key-123' ? 200 : 404});
    }
    if (url === 'https://api.anthropic.com/v1/models/claude-opus-5-5') {
      assert.equal(options.headers['anthropic-version'], '2023-06-01');
      return new globalThis.Response('{}', {status: options.headers['x-api-key'] === 'claude-good-key-123' ? 200 : 401});
    }
    if (url === 'https://openrouter.ai/api/v1/models') {
      if (options.headers.Authorization !== 'Bearer openrouter-good-key-123') return new globalThis.Response('{}', {status: 401});
      return globalThis.Response.json({
        data: [
          {id: 'qwen/qwen3.8-max', name: 'Qwen 3.8 Max', context_length: 1_000_000},
          {id: 'moonshotai/kimi-k3.1-pro', name: 'Kimi K3.1 Pro', context_length: 1_000_000},
          {id: 'openai/text-embedding-3-small', name: 'Embedding'},
        ],
      });
    }
    if (url === 'https://api.deepseek.com/v1/models') {
      if (options.headers.Authorization !== 'Bearer deepseek-good-key-123') return new globalThis.Response('{}', {status: 401});
      return globalThis.Response.json({data: [{id: 'deepseek-chat'}, {id: 'deepseek-reasoner'}]});
    }
    return new globalThis.Response('{}', {status: 404});
  };

  const connection = new ReviewConnection(root, {environment: {}, fetchImpl: fakeFetch});
  const route = nativeApi(service, connection);
  const server = createServer((req, res) => route(req, res, new URL(req.url, 'http://localhost'), server.address().port));
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(done => server.close(done));
  });
  const origin = 'http://127.0.0.1:' + server.address().port;
  const get = path => globalThis.fetch(origin + path).then(r => r.json());
  const post = (path, body) => globalThis.fetch(origin + path, {
    method: 'POST',
    headers: {Origin: origin, 'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });

  const initial = await get('/api/review/connection');
  assert.equal(initial.configured, false);
  assert.deepEqual(initial.supportedProviders.map(p => p.id), ['gemini', 'openai', 'anthropic', 'openai-compatible']);
  assert.equal(initial.supportedProviders[0].defaultModel, 'gemini-4-hydrogen');
  assert.equal(initial.supportedProviders[1].defaultModel, 'gpt-6.2-sol');
  assert.equal(initial.supportedProviders[2].defaultModel, 'claude-opus-5-5');
  assert.deepEqual(initial.supportedProviders[3].presets.map(p => p.id), ['openrouter', 'deepseek', 'kimi', 'qwen', 'glm', 'custom']);

  // Weak / text-only / embedding / legacy APIs and missing/insecure custom endpoints must be blocked before calling upstream.
  for (const rejected of [
    {provider: 'orca', model: 'deepseek/deepseek-v4-flash-free', apiKey: 'test-key-12345'},
    {provider: 'openai-compatible', model: 'llama-3-8b', apiKey: 'test-key-12345'},
    {provider: 'openai-compatible', model: 'deepseek-chat', endpoint: 'http://remote.example/v1', apiKey: 'test-key-12345'},
    {provider: 'openai-compatible', model: 'text-embedding-3-small', endpoint: 'https://openrouter.ai/api/v1', apiKey: 'test-key-12345'},
    {provider: 'openai', model: 'gpt-3.5-turbo', apiKey: 'test-key-12345'},
    {provider: 'openai', model: 'text-embedding-3-large', apiKey: 'test-key-12345'},
    {provider: 'anthropic', model: 'claude-3-haiku', apiKey: 'test-key-12345'},
    {provider: 'gemini', model: 'gemini-1.5-pro', apiKey: 'test-key-12345'},
  ]) {
    const res = await post('/api/review/connection', rejected);
    assert.equal(res.status, 422, JSON.stringify(rejected));
    assert.deepEqual(await res.json(), {error: 'E_MODEL_UNSUPPORTED_CAPABILITY'});
  }
  assert.equal(calls.length, 0);

  // Live model discovery from key filters out embeddings and legacy models, keeping current/future playable-ready models.
  const discoveredRes = await post('/api/review/connection', {
    action: 'models', provider: 'gemini', apiKey: 'gemini-good-key-123',
  });
  assert.equal(discoveredRes.status, 200);
  const discovered = await discoveredRes.json();
  assert.deepEqual(discovered.models.map(m => m.id), ['gemini-4-hydrogen', 'gemini-4-argon']);

  // Save verified Gemini connection.
  const okGemini = await post('/api/review/connection', {
    provider: 'gemini', model: 'gemini-4-hydrogen', apiKey: 'gemini-good-key-123',
  });
  assert.equal(okGemini.status, 200);
  const geminiBody = await okGemini.json();
  assert.equal(geminiBody.configured, true);
  assert.equal(geminiBody.verified, true);
  assert.equal(geminiBody.provider, 'gemini');
  assert.equal(geminiBody.model, 'gemini-4-hydrogen');
  assert.equal(geminiBody.capabilities.audio, 'native');
  assert.equal((await stat(resolve(root, '.tora-connection.json'))).mode & 0o777, 0o600);
  assert.ok(!JSON.stringify(geminiBody).includes('gemini-good-key-123'));

  // Rejected replacement (404 model unavailable) must keep prior valid Gemini key intact.
  const badOpenAi = await post('/api/review/connection', {
    provider: 'openai', model: 'gpt-6.2-sol', apiKey: 'wrong-key-999',
  });
  assert.equal(badOpenAi.status, 422);
  assert.deepEqual(await badOpenAi.json(), {error: 'E_MODEL_UNAVAILABLE'});
  const afterFail = await get('/api/review/connection');
  assert.equal(afterFail.provider, 'gemini');
  assert.ok(!JSON.stringify(afterFail).includes('gemini-good-key-123'));

  // Switch to Anthropic Claude Opus 5.5.
  const okClaude = await post('/api/review/connection', {
    provider: 'anthropic', model: 'claude-opus-5-5', apiKey: 'claude-good-key-123',
  });
  assert.equal(okClaude.status, 200);
  assert.equal((await get('/api/review/connection')).model, 'claude-opus-5-5');

  // OpenAI-compatible live model discovery (OpenRouter) filters embeddings and saves verified DeepSeek / OpenRouter presets.
  const orModelsRes = await post('/api/review/connection', {
    action: 'models', provider: 'openai-compatible', preset: 'openrouter', endpoint: 'https://openrouter.ai/api/v1', apiKey: 'openrouter-good-key-123',
  });
  assert.equal(orModelsRes.status, 200);
  const orModels = await orModelsRes.json();
  assert.deepEqual(orModels.models.map(m => m.id), ['qwen/qwen3.8-max', 'moonshotai/kimi-k3.1-pro']);

  const okOpenRouter = await post('/api/review/connection', {
    provider: 'openai-compatible', preset: 'openrouter', endpoint: 'https://openrouter.ai/api/v1', model: 'qwen/qwen3.8-max', vision: true, apiKey: 'openrouter-good-key-123',
  });
  assert.equal(okOpenRouter.status, 200);
  const orBody = await okOpenRouter.json();
  assert.equal(orBody.provider, 'openai-compatible');
  assert.equal(orBody.providerLabel, 'OpenRouter');
  assert.equal(orBody.endpoint, 'https://openrouter.ai/api/v1');
  assert.equal(orBody.capabilities.vision, true);
  assert.ok(!JSON.stringify(orBody).includes('openrouter-good-key-123'));

  const okDeepSeek = await post('/api/review/connection', {
    provider: 'openai-compatible', preset: 'deepseek', endpoint: 'https://api.deepseek.com/v1', model: 'deepseek-chat', vision: false, apiKey: 'deepseek-good-key-123',
  });
  assert.equal(okDeepSeek.status, 200);
  const dsBody = await okDeepSeek.json();
  assert.equal(dsBody.providerLabel, 'DeepSeek');
  assert.equal(dsBody.capabilities.vision, false);
  assert.equal((await get('/api/review/connection')).model, 'deepseek-chat');

  // Disconnect clears saved key cleanly.
  const disc = await post('/api/review/connection', {action: 'disconnect'});
  assert.equal(disc.status, 200);
  assert.equal((await get('/api/review/connection')).configured, false);
});

test('chat-first New Playable and Chat Feedback Editor work end-to-end with free CC0 packs and instant edits', async t => {
  const root = await mkdtemp(resolve('reports/chat-editor-e2e-'));
  const shotDir = resolve('reports/chat-ui-visual');
  await mkdir(shotDir, {recursive: true});
  t.after(() => rm(root, {recursive: true, force: true}));

  const store = new ProjectStore(root);
  const server = await createEditorServer({store, port: 0});
  const origin = 'http://127.0.0.1:' + server.address().port;
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(done => server.close(done));
  });

  const packsRes = await globalThis.fetch(origin + '/api/catalog/packs');
  assert.equal(packsRes.status, 200);
  const packs = await packsRes.json();
  assert.equal(packs.visualPacks.length, 2);
  assert.equal(packs.audioPacks.length, 2);

  const thumbRes = await globalThis.fetch(origin + packs.visualPacks[0].previews[0]);
  assert.equal(thumbRes.status, 200);
  assert.equal(thumbRes.headers.get('content-type'), 'image/png');

  const browser = await chromium.launch({headless: true});
  t.after(() => browser.close());
  const errors = [];
  const context = await browser.newContext({viewport: {width: 1440, height: 900}});
  context.on('page', page => page.on('pageerror', err => errors.push(err.message)));
  const page = await context.newPage();

  // 1. Open New Playable chat creator — 3-degree slider, no separate sound drawer, no fixed playable styles, no Store URL form
  await page.goto(origin + '/?view=new', {waitUntil: 'networkidle'});
  await page.waitForSelector('#intake-prompt');
  const creatorText = await page.locator('.tora-creator-card').textContent();
  assert.match(creatorText, /never generates AI media/i);
  assert.match(creatorText, /My assets only/);
  assert.match(creatorText, /My assets \+ free assets/);
  assert.match(creatorText, /Free assets only/);
  assert.doesNotMatch(creatorText, /My sound files|Use free licensed sounds|Casual Warm|Arcade Pop|Tiny Farm|Space Arcade|Kenney/);
  assert.equal(await page.locator('[data-mechanic]').count(), 0);
  assert.equal(await page.locator('input[type="url"]').count(), 0);
  assert.equal(await page.locator('#intake-thread .tora-bubble-assistant').count(), 0);
  assert.equal(await page.locator('#asset-source-slider').inputValue(), '0');

  // Open '+' popover menu on degree 0 ("My assets only")
  await page.click('#intake-plus-btn');
  await page.waitForSelector('#intake-plus-menu:not([hidden])');
  await page.screenshot({path: resolve(shotDir, 'new-mine-plus.png')});
  await page.keyboard.press('Escape');

  // Verify degree 1 ("My assets + free assets") keeps rights check visible and updates slider
  await page.click('#source-stop-1');
  assert.equal(await page.locator('#asset-source-slider').inputValue(), '1');
  assert.equal(await page.locator('#intake-rights-wrap').isVisible(), true);
  await page.waitForTimeout(220);
  await page.screenshot({path: resolve(shotDir, 'new-hybrid.png')});

  // Verify sending without files on hybrid/mine explains real-assets-only policy conversationally
  await page.fill('#intake-prompt', 'Make a castle defense game');
  await page.click('#intake-send');
  await page.waitForSelector('#intake-thread button:has-text("Switch to Free assets only")');

  // Switch to degree 2 ("Free assets only") via the inline chat button — hides rights check!
  await page.click('#intake-thread button:has-text("Switch to Free assets only")');
  assert.equal(await page.locator('#asset-source-slider').inputValue(), '2');
  await page.waitForTimeout(200);
  assert.equal(await page.locator('#intake-rights-wrap').isVisible(), false);
  await page.screenshot({path: resolve(shotDir, 'new-free-packs.png')});

  // Open Verified BYOK API modal and inspect providers + OpenAI-Compatible presets (OpenRouter, DeepSeek, Kimi, Qwen, GLM)
  await page.click('#intake-api-pill');
  await page.waitForSelector('dialog.tora-modal[open]');
  const providerTexts = await page.locator('.tora-provider-card strong').allTextContents();
  assert.deepEqual(providerTexts, ['Google Gemini', 'OpenAI', 'Anthropic Claude', 'Custom / OpenRouter']);
  await page.locator('.tora-provider-card', {hasText: 'Custom / OpenRouter'}).click();
  await page.waitForSelector('#tora-compat-fields:not([hidden])');
  const presetTexts = await page.locator('.tora-preset-btn').allTextContents();
  assert.deepEqual(presetTexts, ['OpenRouter', 'DeepSeek', 'Kimi (Moonshot)', 'Qwen (Alibaba)', 'GLM (Z.ai)', 'Custom / Local']);
  await page.locator('.tora-preset-btn', {hasText: 'DeepSeek'}).click();
  assert.equal(await page.locator('#tora-api-endpoint').inputValue(), 'https://api.deepseek.com/v1');
  assert.equal(await page.locator('#tora-api-custom-model').inputValue(), 'deepseek-chat');
  assert.equal(await page.locator('#tora-api-vision').isChecked(), false);
  await page.screenshot({path: resolve(shotDir, 'api-modal.png')});
  await page.click('#tora-api-close');

  // Submit ANY open playable brief on degree 2 ("Free assets only")
  await page.fill('#intake-prompt', 'Medieval castle defense playable called Siege Gate');
  await page.click('#intake-send');
  await page.waitForSelector('#intake-thread .tora-intake-card', {timeout: 10000});
  const intakeId = await page.locator('#intake-thread .tora-intake-card').getAttribute('data-intake-id');
  const savedIntake = await globalThis.fetch(origin + '/api/review-intakes/' + intakeId).then(r => r.json());
  assert.equal(savedIntake.mechanic, 'custom');
  assert.equal(savedIntake.assetSource, 'free-licensed');
  assert.equal(savedIntake.audioPack, 'auto');
  assert.equal(savedIntake.status, 'queued');
  assert.equal(savedIntake.storeUrl, undefined);

  // Mobile screenshot of New Playable chat on degree 1
  const mobileCtx = await browser.newContext({viewport: {width: 390, height: 844}});
  mobileCtx.on('page', p => p.on('pageerror', err => errors.push(err.message)));
  const mobileNew = await mobileCtx.newPage();
  await mobileNew.goto(origin + '/?view=new', {waitUntil: 'networkidle'});
  await mobileNew.click('#source-stop-1');
  await mobileNew.waitForTimeout(250);
  await mobileNew.screenshot({path: resolve(shotDir, 'new-mobile.png')});

  // 2. Compose a playable via /api/projects/from-chat and verify the Chat Feedback Editor
  const createdRes = await globalThis.fetch(origin + '/api/projects/from-chat', {
    method: 'POST',
    headers: {Origin: origin, 'Content-Type': 'application/json'},
    body: JSON.stringify({prompt: 'Cozy farm game called Meadow Pop with a "PLAY FREE" button', packId: 'tiny-farm'}),
  });
  assert.equal(createdRes.status, 201);
  const {editorUrl: editorHref} = await createdRes.json();
  assert.match(editorHref, /^\/\?project=meadow-pop/);

  await page.goto(origin + editorHref, {waitUntil: 'networkidle'});
  await page.waitForFunction(() => document.getElementById('review-title')?.textContent && document.querySelector('#review-before canvas'));
  await page.waitForTimeout(300);
  assert.equal(await page.locator('#review-title').textContent(), 'Meadow Pop');
  assert.equal(await page.locator('#review-error').textContent(), '');

  // Use quick instant-edit chip to change CTA wording at $0 AI cost inside chat
  await page.click('#review-quick-chips button:first-child');
  await page.waitForSelector('#review-direct-text');
  await page.fill('#review-direct-text', 'GROW NOW');
  await page.click('.review-direct-apply');

  // Wait for candidate bubble and side-by-side Before/After comparison
  await page.waitForSelector('#review-after:not([hidden])', {timeout: 15000});
  await page.waitForSelector('#review-active button:has-text("Use this version")');
  await page.waitForTimeout(150);
  await page.screenshot({path: resolve(shotDir, 'editor-chat-compare.png')});

  // Promote candidate directly from Tora's chat bubble
  await page.click('#review-active button:has-text("Use this version")');
  await page.locator('#review-after').waitFor({state: 'hidden', timeout: 10000});
  await page.locator('#review-requests', {hasText: 'Applied'}).waitFor({timeout: 10000});

  // Store requirements follow the selected target; draft options remain independent.
  await page.click('#review-export-menu > summary');
  await page.waitForSelector('#review-store-url');
  assert.equal(await page.locator('#review-store-url').getAttribute('required'), '');
  assert.equal(await page.locator('#review-store-url').inputValue(), '');
  const targetOptions = await page.locator('#review-export-target option').allTextContents();
  assert.ok(targetOptions.some(text => /Unity Ads/i.test(text)));
  assert.ok(targetOptions.some(text => /AppLovin/i.test(text)));
  await page.selectOption('#review-export-target', 'meta-audience-playable');
  assert.equal(await page.locator('#review-store-url').getAttribute('required'), null);
  await page.selectOption('#review-export-target', 'applovin-growth-playable');
  assert.match(await page.locator('#review-export').textContent(), /AppLovin/);
  assert.match(await page.locator('#review-export-verification').textContent(), /AppLovin Playable Preview/);
  await page.screenshot({path: resolve(shotDir, 'export-panel.png')});
  await page.click('#review-export-menu > summary');

  // Open '+' popover inside editor chat
  await page.click('#review-plus-btn');
  await page.waitForSelector('#review-plus-menu:not([hidden])');
  await page.screenshot({path: resolve(shotDir, 'editor-chat-plus.png')});

  // Mobile screenshot of Chat Feedback Editor
  const mobileEd = await mobileCtx.newPage();
  await mobileEd.goto(origin + editorHref, {waitUntil: 'networkidle'});
  await mobileEd.waitForFunction(() => document.getElementById('review-title')?.textContent && document.querySelector('#review-before canvas'));
  await mobileEd.waitForTimeout(250);
  await mobileEd.screenshot({path: resolve(shotDir, 'editor-mobile.png')});

  await mobileCtx.close();
  await context.close();
  assert.deepEqual(errors, []);
});

test('connected BYOK Send builds asynchronously, shows live progress and completion card, and opens in Editor with AppLovin export', async t => {
  const root = await mkdtemp(resolve('reports/byok-send-e2e-'));
  const shotDir = resolve('reports/byok-send-e2e-shots');
  await mkdir(shotDir, {recursive: true});
  t.after(() => rm(root, {recursive: true, force: true}));

  const store = new ProjectStore(root);
  const service = new NativeService(store, new EditorState(store));
  const {composeFromFreePack} = await import('../../scripts/lean/native/chat-compose.mjs');

  let releaseBuild;
  const gate = new Promise(done => { releaseBuild = done; });
  const fakeFetch = async (url, options) => {
    if (url === 'https://api.openai.com/v1/models/gpt-6.2-sol') {
      return new globalThis.Response('{}', {status: options.headers.Authorization === 'Bearer sk-live-e2e-12345' ? 200 : 401});
    }
    return new globalThis.Response('{}', {status: 404});
  };

  const connection = new ReviewConnection(root, {environment: {}, fetchImpl: fakeFetch});
  await connection.save({provider: 'openai', model: 'gpt-6.2-sol', apiKey: 'sk-live-e2e-12345'});

  const composed = await composeFromFreePack(service, {prompt: 'Cozy orchard playable called Sunlit Orchard', packId: 'tiny-farm'});
  const agentFactory = ({onProgress}) => ({
    async run() {
      await onProgress({phase: 'assets', stepLabel: 'Sourcing licensed CC0 assets', turn: 2, maxTurns: 12, usage: {promptTokens: 3200, completionTokens: 900, totalTokens: 4100}});
      await gate;
      await onProgress({phase: 'qa', stepLabel: 'Testing 4 screen sizes & audio', turn: 5, maxTurns: 12, usage: {promptTokens: 9800, completionTokens: 2600, totalTokens: 12400}});
      return {
        title: 'Sunlit Orchard',
        summary: 'Responsive farm playable built with verified CC0 media.',
        projectId: composed.projectId,
        editorUrl: '/?project=' + composed.projectId,
        qa: {passed: true, blockerCount: 0, warningCount: 0, bytes: 184320},
        usage: {promptTokens: 9800, completionTokens: 2600, totalTokens: 12400},
        assetsSummary: {studioCount: 0, localCc0Count: 8, remoteCc0Count: 2, sources: [{sourceId: 'kenney-tiny-farm', count: 8}, {sourceId: 'remote-kenney', count: 2}]},
      };
    },
  });

  const server = await createEditorServer({store, port: 0, connection, agentFactory});
  t.after(async () => {
    releaseBuild?.();
    server.closeAllConnections();
    await new Promise(done => server.close(done));
  });
  const origin = 'http://127.0.0.1:' + server.address().port;

  const browser = await chromium.launch({headless: true});
  t.after(() => browser.close());
  const context = await browser.newContext({viewport: {width: 1280, height: 860}, acceptDownloads: true});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  await page.goto(origin + '/?view=new', {waitUntil: 'networkidle'});
  await page.waitForSelector('#intake-connection-hint[data-connected="true"]');
  assert.match(await page.locator('#intake-connection-hint').textContent(), /Builds with OpenAI · GPT-6\.2 Sol/);

  await page.click('#source-stop-2');
  await page.fill('#intake-prompt', 'Build a vibrant orchard playable called Sunlit Orchard');
  await page.click('#intake-send');

  // Live progress card renders immediately with milestones, token counter, cancel button, and auto-open toggle
  await page.waitForSelector('.tora-build-progress', {timeout: 10000});
  assert.equal(await page.locator('#intake-send').isDisabled(), true);
  assert.equal(await page.locator('.tora-build-progress .tora-auto-open input').count(), 1);
  assert.match(await page.locator('.tora-build-progress-head').textContent(), /4\.1k tokens/);
  await page.screenshot({path: resolve(shotDir, 'byok-building.png')});

  // Let the build finish; poller renders Completion Summary Card with token metric and re-enables Send
  releaseBuild();
  await page.waitForSelector('.tora-completion-card', {timeout: 10000});
  assert.equal(await page.locator('#intake-send').isDisabled(), false);
  assert.match(await page.locator('.tora-completion-card h2').textContent(), /Sunlit Orchard/);
  assert.match(await page.locator('.tora-qa-badge').textContent(), /QA Passed/);
  assert.match(await page.locator('.tora-completion-provenance').textContent(), /8 local CC0 \+ 2 live CC0/);
  assert.match(await page.locator('.tora-completion-metrics').textContent(), /Tokens · 12\.4k/);
  await page.screenshot({path: resolve(shotDir, 'byok-complete.png')});

  // Click Open in Editor -> lands directly in the playable editor and exports AppLovin HTML!
  await page.click('.tora-open-editor');
  await page.waitForFunction(() => document.getElementById('review-title')?.textContent && document.querySelector('#review-before canvas'), {timeout: 15000});
  await page.click('#review-export-menu > summary');
  await page.selectOption('#review-export-target', 'applovin-growth-playable');
  await page.fill('#review-store-url', 'https://play.google.com/store/apps/details?id=com.playablelab.orchard');
  const [download] = await Promise.all([
    page.waitForEvent('download', {timeout: 30000}),
    page.click('#review-export'),
  ]);
  assert.match(download.suggestedFilename(), /-applovin\.html$/);
  const downloadedPath = await download.path();
  const {readFile} = await import('node:fs/promises');
  const html = await readFile(downloadedPath, 'utf8');
  assert.ok(html.includes('"network":"applovin-growth-playable"'));
  await page.screenshot({path: resolve(shotDir, 'export-applovin.png')});

  await context.close();
  assert.deepEqual(errors, []);
});
