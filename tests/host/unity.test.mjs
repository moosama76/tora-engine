import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { build } from "esbuild";

const built = await build({ entryPoints: ["packages/adapters/src/unity.ts"], bundle: true, platform: "node", format: "esm", write: false });
const { createUnityAdsBridge, unityStoreDestination } = await import(`data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text).toString("base64")}`);
const android = "https://play.google.com/store/apps/details?id=com.playablelab.merge", ios = "https://apps.apple.com/app/id123456789";
function host(state = "loading", visible = false) {
  const listeners = new Map(), calls = [];
  const mraid = {
    getVersion() { assert.notEqual(state, "loading"); calls.push("getVersion"); return "3.0"; },
    getState() { calls.push("getState"); return state; },
    isViewable() { assert.notEqual(state, "loading"); calls.push("isViewable"); return visible; },
    addEventListener(name, fn) { calls.push(`add:${name}`); if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn); },
    removeEventListener(name, fn) { calls.push(`remove:${name}`); listeners.get(name)?.delete(fn); },
    open(url) { calls.push(["open", url]); },
  };
  return { mraid, calls, count: () => [...listeners.values()].reduce((n, set) => n + set.size, 0),
    emit(name, ...args) { if (name === "ready") state = "default"; if (name === "viewableChange") visible = args[0]; for (const fn of [...(listeners.get(name) ?? [])]) fn(...args); },
  };
}

test("Unity waits for ready, subscribes once, queries initial visibility and gates stores", async () => {
  const h = host(), b = createUnityAdsBridge({ getHost: () => h.mraid });
  const initial = b.init(); assert.equal(b.init(), initial);
  assert.deepEqual(h.calls, ["add:ready", "getState"]);
  assert.throws(() => b.openStore(android));
  h.emit("ready"); await initial;
  assert.equal(b.isReady(), true); assert.equal(b.isVisible(), false);
  assert.ok(h.calls.indexOf("add:viewableChange") < h.calls.indexOf("isViewable"));
  h.emit("viewableChange", true); b.openStore(android);
  assert.deepEqual(h.calls.at(-1), ["open", android]);
  h.emit("viewableChange", false); assert.throws(() => b.openStore(android));
  h.emit("ready"); assert.equal(h.count(), 4);
  b.destroy(); b.destroy(); assert.equal(h.count(), 0);
});

test("already-ready visible Unity host starts without another ready/viewable event", async () => {
  const h = host("default", true), b = createUnityAdsBridge({ getHost: () => h.mraid });
  await b.init(); assert.equal(b.isVisible(), true);
  assert.equal(h.calls.filter((v) => v === "isViewable").length, 1);
  assert.ok(!h.calls.includes("add:exposureChange")); b.destroy();
});

test("Unity rejects old MRAID versions, malformed hosts and query failures", async () => {
  for (const override of [
    { getVersion: () => "2.0" }, { getVersion: undefined }, { isViewable: () => "true" },
    { getState: () => "invalid" }, { getVersion() { throw Error("version fault"); } },
    { getState() { throw Error("state fault"); } }, { isViewable() { throw Error("visibility fault"); } },
  ]) {
    const h = host("default", true); Object.assign(h.mraid, override);
    const b = createUnityAdsBridge({ getHost: () => h.mraid });
    await assert.rejects(b.init()); assert.equal(b.isReady(), false); assert.equal(h.count(), 0); b.destroy();
  }
});

test("late Unity host injection and absent host settle within the configured deadline", async () => {
  const h = host("default", true); let current;
  const late = createUnityAdsBridge({ getHost: () => current, pollMs: 1, timeoutMs: 1000 });
  const p = late.init(); current = h.mraid; await p; assert.equal(h.count(), 4); late.destroy();
  const absent = createUnityAdsBridge({ getHost: () => undefined, timeoutMs: 5 }); let prematureClose = 0;
  absent.onClosed(() => prematureClose++);
  await assert.rejects(absent.init(), /timed out/); assert.equal(absent.isClosed(), true); assert.equal(prematureClose, 0); absent.destroy();
});

test("destroy settles pending Unity init immediately and cached init remains terminal", async () => {
  const h = host(), b = createUnityAdsBridge({ getHost: () => h.mraid });
  const p = b.init(); b.destroy(); await assert.rejects(p, /destroyed/);
  assert.equal(b.init(), p); assert.equal(h.count(), 0);
});

test("synchronous teardown at host lookup, state, version, visibility and registration is safe", async () => {
  for (const point of ["lookup", "getState", "getVersion", "isViewable", "ready", "sizeChange"]) {
    const h = host("default", true); let b;
    if (["getState", "getVersion", "isViewable"].includes(point)) {
      const original = h.mraid[point]; h.mraid[point] = () => { b.destroy(); return original(); };
    }
    const original = h.mraid.addEventListener;
    h.mraid.addEventListener = (name, fn) => { if (name === point) b.destroy(); original(name, fn); if (name === "ready") fn(); };
    b = createUnityAdsBridge({ getHost: () => { if (point === "lookup") b.destroy(); return h.mraid; } });
    await assert.rejects(b.init()); assert.equal(h.count(), 0, point); assert.equal(b.isReady(), false); b.destroy();
  }
});

test("synchronous viewability during registration is preserved and malformed events close once", async () => {
  const h = host("default", true), original = h.mraid.addEventListener;
  h.mraid.addEventListener = (name, fn) => { original(name, fn); if (name === "viewableChange") fn(false); };
  const b = createUnityAdsBridge({ getHost: () => h.mraid }); let closed = 0;
  b.onClosed(() => closed++); await b.init(); assert.equal(b.isVisible(), false);
  h.emit("viewableChange", "false"); h.emit("stateChange", "hidden");
  assert.equal(closed, 1); assert.equal(h.count(), 0); assert.equal(b.isClosed(), true); b.destroy();
});

test("Unity resize and visibility notifications stop after unsubscribe/close", async () => {
  const h = host("default", true); let resized = 0, changed = 0;
  const b = createUnityAdsBridge({ getHost: () => h.mraid, onResize: () => resized++ });
  const off = b.onVisibilityChanged(() => changed++); await b.init(); assert.equal(changed, 1);
  h.emit("viewableChange", true); assert.equal(changed, 1);
  h.emit("sizeChange"); assert.equal(resized, 1); off();
  h.emit("viewableChange", false); assert.equal(changed, 1);
  h.emit("stateChange", "hidden"); h.emit("sizeChange"); assert.equal(resized, 1);
  assert.equal(h.count(), 0); b.destroy();
});

test("Unity host open errors propagate without alternate navigation", async () => {
  const h = host("default", true); h.mraid.open = () => { throw Error("host open fault"); };
  const b = createUnityAdsBridge({ getHost: () => h.mraid }); await b.init();
  assert.throws(() => b.openStore(android), /host open fault/);
  for (const url of ["javascript:alert(1)", "https://evil.invalid", "https://play.google.com/store/apps/details?id=com.example.game"]) assert.throws(() => b.openStore(url));
  b.destroy();
});

test("Unity store selection follows Android/otherwise-iOS and never crosses platforms", () => {
  for (const ua of ["iPhone", "Macintosh", "", "Unrecognized browser"]) assert.equal(unityStoreDestination({ androidUrl: android, iosUrl: ios }, ua).url, ios);
  assert.equal(unityStoreDestination({ androidUrl: android, iosUrl: ios }, "ANDROID").url, android);
  assert.equal(unityStoreDestination({ androidUrl: android }, "Macintosh").url, undefined);
  assert.equal(unityStoreDestination({ iosUrl: ios }, "Android").url, undefined);
  assert.equal(unityStoreDestination({ androidUrl: ios }, "Android").url, undefined);
});

test("Unity invalid scheduling options fail before starting host work", () => {
  for (const value of [0, -1, NaN, Infinity, 60_001]) {
    assert.throws(() => createUnityAdsBridge({ timeoutMs: value }));
    assert.throws(() => createUnityAdsBridge({ pollMs: value }));
  }
});

test("Unity keeps the initialized host identity for calls and listener cleanup", async () => {
  const original = host("default", true), replacement = host("default", true);
  let current = original.mraid;
  const bridge = createUnityAdsBridge({ getHost: () => current });
  await bridge.init(); current = replacement.mraid;
  bridge.openStore(android);
  assert.deepEqual(original.calls.at(-1), ["open", android]);
  assert.deepEqual(replacement.calls, []);
  bridge.destroy(); assert.equal(original.count(), 0);
});
