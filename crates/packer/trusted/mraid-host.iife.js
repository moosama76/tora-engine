"use strict";
var MraidHost = (() => {
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

  // packages/test-harness/src/mraid-host.ts
  var mraid_host_exports = {};
  __export(mraid_host_exports, {
    installMraidHost: () => installMraidHost
  });
  function installMraidHost(options = {}) {
    let state = options.state ?? "loading", visible = options.visible ?? false, gesture = 0, gestureAt = 0, openFailure = false;
    const listeners = /* @__PURE__ */ new Map();
    const calls = [];
    const record = (name, args, trusted) => {
      calls.push({ name, at: performance.now(), ...args ? { args } : {}, ...trusted !== void 0 ? { trusted } : {} });
      if (calls.length > 1e3) throw Error("Unbounded host calls");
    };
    const mraid = { getVersion() {
      if (state === "loading") throw Error("Premature MRAID version query");
      record("getVersion");
      return options.version ?? "2.0";
    }, getState() {
      record("getState");
      if (options.stateThrows) throw Error("Injected getState failure");
      return state;
    }, isViewable() {
      record("isViewable");
      if (state === "loading") throw Error("Premature MRAID query");
      if (options.visibleThrows) throw Error("Injected isViewable failure");
      return visible;
    }, addEventListener(name, fn) {
      if (state === "loading" && name !== "ready") throw Error("Premature MRAID subscription");
      record(`add:${name}`);
      if (!listeners.has(name)) listeners.set(name, /* @__PURE__ */ new Set());
      listeners.get(name).add(fn);
    }, removeEventListener(name, fn) {
      record(`remove:${name}`);
      listeners.get(name)?.delete(fn);
    }, open(url) {
      record("open", [url], gesture > 0 && performance.now() - gestureAt < 1e3);
      if (state === "loading" || state === "hidden" || !visible) throw Error("Premature/hidden open");
      if (openFailure) throw Error("Injected open failure");
    } };
    const emit = (name, ...args) => {
      for (const fn of [...listeners.get(name) ?? []]) fn(...args);
    };
    const frames = /* @__PURE__ */ new Map();
    let frameId = 0, time = 0;
    if (options.manualFrames) {
      window.requestAnimationFrame = (fn) => {
        frames.set(++frameId, fn);
        return frameId;
      };
      window.cancelAnimationFrame = (id) => frames.delete(id);
    }
    document.addEventListener("click", (event) => {
      gesture = event.isTrusted ? gesture + 1 : 0;
      gestureAt = performance.now();
    }, true);
    const controls = {
      install() {
        Object.assign(window, { mraid });
      },
      ready(value = false) {
        state = "default";
        visible = value;
        emit("ready");
      },
      visible(value) {
        visible = value;
        emit("viewableChange", value);
      },
      close() {
        state = "hidden";
        visible = false;
        emit("stateChange", "hidden");
      },
      resize() {
        emit("sizeChange", 320, 480);
      },
      failOpen(value) {
        openFailure = value;
      },
      advance(count, step = 50) {
        for (let i = 0; i < count; i++) {
          const pending = [...frames.entries()];
          frames.clear();
          time += step;
          for (const [, fn] of pending) fn(time);
        }
      },
      snapshot() {
        return { state, visible, calls: [...calls], listeners: [...listeners.values()].reduce((n, s) => n + s.size, 0), pendingFrames: frames.size };
      }
    };
    if (!options.absent) controls.install();
    Object.assign(window, { __mraidTest: controls });
    return controls;
  }
  return __toCommonJS(mraid_host_exports);
})();
