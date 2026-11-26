import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {build} from 'esbuild';
import {chromium} from 'playwright';
import {composeNativeConcept} from '../../scripts/lean/native/concept.mjs';
import {emptyProject, applyOperations} from '../../scripts/lean/native/document.mjs';
import {compileNative} from '../../scripts/lean/native/compiler.mjs';
import {nativeConcept} from '../helpers/native-concept.mjs';

const cases = [
  {target: 'ironsource-levelplay-playable', install: 'installIronSourceHost', control: '__ironsourceTest', cta: 'openStoreUrl'},
  {target: 'meta-audience-playable', install: 'installMetaHost', control: '__metaTest', cta: 'onCTAClick'},
  {target: 'google-ads-app-playable', install: 'installGoogleExitApiHost', control: '__googleTest', cta: 'exit', external: 'https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js'},
  {target: 'mintegral-appgrowth-zip', install: 'installMintegralHost', control: '__mintegralTest', cta: 'install'},
  {target: 'tiktok-ads-playable', install: 'installTikTokHost', control: '__tiktokTest', cta: 'openAppStore', external: 'https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/Playable/sdk/Playable-sdk.js'},
];

test('vendor adapters gate lifecycle and invoke only deliberate trusted CTAs', async t => {
  const root = await mkdtemp(resolve('reports/native-vendor-networks-')); t.after(() => rm(root, {recursive: true, force: true}));
  const composition = composeNativeConcept(nativeConcept()), project = applyOperations(emptyProject({id: 'vendor-native', name: 'Vendor native'}), composition.operations).project;
  const host = (await build({entryPoints: [resolve('packages/test-harness/src/vendor-hosts.ts')], bundle: true, format: 'iife', globalName: 'VendorHost', write: false, platform: 'browser'})).outputFiles[0].text;
  const browser = await chromium.launch();
  try {
    for (const item of cases) {
      const artifact = await compileNative(project, {target: item.target}), directory = resolve(root, item.target);
      await mkdir(directory, {recursive: true}); const file = resolve(directory, 'index.html'); await writeFile(file, artifact.html);
      const context = await browser.newContext({viewport: {width: 390, height: 700}, isMobile: true, hasTouch: true}), page = await context.newPage(), errors = [], requests = [];
      page.on('pageerror', error => errors.push(error.message)); page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
      await page.addInitScript(host + `;VendorHost.${item.install}();`);
      if (item.external) await page.route(item.external, route => route.fulfill({status: 200, contentType: 'application/javascript', body: ''}));
      await page.goto('file://' + file);
      await page.waitForFunction(() => globalThis.toraRuntime?.state().network.ready && globalThis.toraRuntime.state().network.visible);
      for (let tap = 0; tap < 3; tap++) await page.touchscreen.tap(195, 365);
      await page.waitForFunction(() => globalThis.toraRuntime.state().scene === 'scene.success');
      let snapshot = await page.evaluate(control => ({state: globalThis.toraRuntime.state(), host: globalThis[control].snapshot()}), item.control);
      const beforeCalls = item.target === 'mintegral-appgrowth-zip' ? snapshot.host.calls : snapshot.host;
      assert.equal(beforeCalls.filter(call => call.name === item.cta).length, 0, item.target);
      if (item.target === 'mintegral-appgrowth-zip') assert.equal(snapshot.host.calls.filter(call => call.name === 'gameEnd').length, 1);
      if (item.target === 'ironsource-levelplay-playable') {
        await page.evaluate(() => globalThis.__ironsourceTest.volume(0)); assert.equal((await page.evaluate(() => globalThis.toraRuntime.state())).network.hostVolume, 0);
        await page.evaluate(() => globalThis.__ironsourceTest.volume(50)); assert.equal((await page.evaluate(() => globalThis.toraRuntime.state())).network.hostVolume, 0.5);
        await page.evaluate(() => globalThis.__ironsourceTest.volume(100)); assert.equal((await page.evaluate(() => globalThis.toraRuntime.state())).network.hostVolume, 1);
        await page.evaluate(() => globalThis.__ironsourceTest.visible(false, true)); const paused = await page.evaluate(() => globalThis.toraRuntime.state().time);
        await page.waitForTimeout(100); assert.equal((await page.evaluate(() => globalThis.toraRuntime.state().time)), paused);
        await page.evaluate(() => globalThis.__ironsourceTest.visible(true, true));
      }
      await page.touchscreen.tap(195, 452);
      snapshot = await page.evaluate(control => ({state: globalThis.toraRuntime.state(), host: globalThis[control].snapshot()}), item.control);
      const calls = item.target === 'mintegral-appgrowth-zip' ? snapshot.host.calls : snapshot.host;
      const cta = calls.filter(call => call.name === item.cta); assert.equal(cta.length, 1, item.target); assert.equal(cta[0].trusted, true, item.target);
      assert.deepEqual(snapshot.state.diagnostics, [], item.target); assert.deepEqual(errors, [], item.target); assert.deepEqual(requests, item.external ? [item.external] : [], item.target);
      if (item.target === 'mintegral-appgrowth-zip') {
        await page.evaluate(() => globalThis.toraRuntime.restart());
        snapshot = await page.evaluate(() => ({state: globalThis.toraRuntime.state(), host: globalThis.__mintegralTest.snapshot()}));
        assert.equal(snapshot.host.calls.filter(call => call.name === 'gameRetry').length, 1);
        await page.evaluate(() => globalThis.__mintegralTest.close()); assert.equal((await page.evaluate(() => globalThis.toraRuntime.state())).network.closed, true);
      }
      await context.close();
    }
  } finally { await browser.close(); }
});

