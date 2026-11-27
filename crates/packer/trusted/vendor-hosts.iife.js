"use strict";
var VendorHost = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/test-harness/src/vendor-hosts.ts
  var vendor_hosts_exports = {};
  __export(vendor_hosts_exports, {
    installGoogleExitApiHost: () => installGoogleExitApiHost,
    installIronSourceHost: () => installIronSourceHost,
    installMetaHost: () => installMetaHost,
    installMintegralHost: () => installMintegralHost,
    installTikTokHost: () => installTikTokHost
  });
  function telemetry() {
    const calls = [];
    let trustedAt = -Infinity;
    document.addEventListener("click", (event) => {
      if (event.isTrusted) trustedAt = performance.now();
    }, true);
    const record = (name) => {
      calls.push({ name, trusted: performance.now() - trustedAt < 1e3, at: performance.now() });
      if (calls.length > 1e3) throw Error("Unbounded vendor host calls");
    };
    return { record, snapshot: () => calls.map((call) => ({ ...call })) };
  }
  function installIronSourceHost() {
    const events = /* @__PURE__ */ new Map(), calls = telemetry();
    let ready = true, visible = true, volume = 1;
    const emit = (name, ...args) => {
      for (const listener of [...events.get(name) ?? []]) listener(...args);
    };
    const dapi = {
      isReady: () => ready,
      isViewable: () => visible,
      getAudioVolume: () => volume,
      addEventListener(name, listener) {
        if (!events.has(name)) events.set(name, /* @__PURE__ */ new Set());
        events.get(name).add(listener);
      },
      removeEventListener(name, listener) {
        events.get(name)?.delete(listener);
      },
      openStoreUrl() {
        calls.record("openStoreUrl");
        if (!ready || !visible) throw Error("DAPI not viewable");
      }
    };
    const controls = {
      ready(value = true) {
        ready = value;
        if (value) emit("ready");
      },
      visible(value, asObject = false) {
        visible = value;
        emit("viewableChange", asObject ? { isViewable: value } : value);
      },
      volume(value) {
        volume = value;
        emit("audioVolumeChange", value);
      },
      resize() {
        emit("adResized");
      },
      snapshot: calls.snapshot
    };
    Object.assign(window, { dapi, __ironsourceTest: controls });
    return controls;
  }
  function installMetaHost() {
    const calls = telemetry();
    const FbPlayableAd = { onCTAClick() {
      calls.record("onCTAClick");
    } };
    const controls = { snapshot: calls.snapshot };
    Object.assign(window, { FbPlayableAd, __metaTest: controls });
    return controls;
  }
  function installGoogleExitApiHost() {
    const calls = telemetry();
    const ExitApi = { exit() {
      calls.record("exit");
    } };
    const controls = { snapshot: calls.snapshot };
    Object.assign(window, { ExitApi, __googleTest: controls });
    return controls;
  }
  function installMintegralHost() {
    const calls = telemetry(), creative = window;
    let started = false, closed = false;
    const start = () => {
      if (closed) return;
      started = true;
      calls.record("gameStart");
      creative.gameStart?.();
    };
    const close = () => {
      closed = true;
      calls.record("gameClose");
      creative.gameClose?.();
    };
    const host = {
      gameReady() {
        calls.record("gameReady");
        queueMicrotask(start);
      },
      install() {
        calls.record("install");
        if (!started || closed) throw Error("Mintegral not started");
      },
      gameEnd() {
        calls.record("gameEnd");
      },
      gameRetry() {
        calls.record("gameRetry");
      }
    };
    const controls = { start, close, snapshot: () => ({ started, closed, calls: calls.snapshot() }) };
    Object.assign(window, host, { __mintegralTest: controls });
    return controls;
  }
  function installTikTokHost() {
    const calls = telemetry();
    const openAppStore = () => calls.record("openAppStore");
    const controls = { snapshot: calls.snapshot };
    Object.assign(window, { openAppStore, playableSDK: { openAppStore }, __tiktokTest: controls });
    return controls;
  }
  return __toCommonJS(vendor_hosts_exports);
})();
