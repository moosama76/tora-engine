import { isStoreDestination } from "@playable/adapters";
import type { NetworkBridge } from "./index.js";

/** The MRAID 3 subset used by the Unity Ads User Acquisition channel. */
export interface UnityMraid {
  getVersion(): string;
  getState(): string;
  isViewable(): boolean;
  addEventListener(name: string, listener: (...args: unknown[]) => void): void;
  removeEventListener(name: string, listener: (...args: unknown[]) => void): void;
  open(url: string): void;
}

/** UA's documented Android/otherwise-iOS rule includes desktop-style iPad user agents. */
export function unityStoreDestination(store: { androidUrl?: string; iosUrl?: string }, userAgent: string) {
  const android = /android/i.test(userAgent);
  const url = android ? store.androidUrl : store.iosUrl;
  const prefix = android ? "https://play.google.com/" : "https://apps.apple.com/";
  return url && isStoreDestination(url) && url.startsWith(prefix)
    ? { url, reason: "" }
    : { url: undefined, reason: `Install unavailable: no valid ${android ? "Android" : "iOS"} destination` };
}

/** Host-injected UA MRAID only: no Exchange script tag, host mock or navigation fallback. */
export function createUnityAdsBridge(options: {
  getHost?: () => UnityMraid | undefined;
  timeoutMs?: number;
  pollMs?: number;
  onResize?: () => void;
} = {}): NetworkBridge {
  const timeoutMs = options.timeoutMs ?? 5000, pollMs = options.pollMs ?? 25;
  if (![timeoutMs, pollMs].every((value) => Number.isFinite(value) && value >= 1 && value <= 60_000)) throw Error("Invalid Unity host deadline/poll interval");
  const getHost = options.getHost ?? (() => (window as Window & { mraid?: UnityMraid }).mraid);
  const visibility = new Set<(visible: boolean) => void>(), closing = new Set<() => void>();
  const registered: Array<[string, (...args: unknown[]) => void]> = [];
  // Keep the captured host under a stable API name in the shipped member calls.
  const host: { mraid?: UnityMraid } = {};
  let ready = false, visible = false, closed = false, destroyed = false;
  let attached = false, initializing = false, pendingVisibility: boolean | undefined;
  let operation: Promise<void> | undefined, resolveInit: (() => void) | undefined, rejectInit: ((reason: Error) => void) | undefined;
  let deadline: ReturnType<typeof setTimeout> | undefined, poll: ReturnType<typeof setTimeout> | undefined;
  const stopped = () => closed || destroyed;
  function cleanup() {
    clearTimeout(deadline); clearTimeout(poll);
    for (const [name, fn] of registered.splice(0)) {
      try { host.mraid?.removeEventListener(name, fn); } catch { /* Continue teardown if the host throws. */ }
    }
  }
  function reject(reason: unknown) {
    rejectInit?.(reason instanceof Error ? reason : Error(String(reason)));
    resolveInit = undefined; rejectInit = undefined;
  }
  function terminate(reason: unknown) {
    if (stopped()) return;
    const notify = ready;
    closed = true; ready = false; visible = false;
    cleanup(); reject(reason);
    // Init rejection lets the player present its disabled fallback. Once initialized,
    // host failure is a close event and must tear down active gameplay immediately.
    if (notify) for (const listener of [...closing]) listener();
    visibility.clear(); closing.clear();
  }
  function subscribe(name: string, fn: (...args: unknown[]) => void): boolean {
    registered.push([name, fn]);
    host.mraid!.addEventListener(name, fn);
    return subscriptionActive(name, fn);
  }
  function subscriptionActive(name: string, fn: (...args: unknown[]) => void): boolean {
    if (stopped()) {
      // Reentrant teardown may happen before a hostile host actually registers the callback.
      try { host.mraid!.removeEventListener(name, fn); } catch { /* Best effort after teardown. */ }
      return false;
    }
    return true;
  }
  function onVisible(value: unknown) {
    if (stopped()) return;
    if (typeof value !== "boolean") { terminate(Error("Invalid Unity viewability event")); return; }
    if (!ready) { pendingVisibility = value; return; }
    if (visible === value) return;
    visible = value;
    for (const listener of [...visibility]) { if (stopped()) break; listener(visible); }
  }
  const onState = (value: unknown) => { if (value === "hidden") terminate(Error("Unity host closed")); };
  const onSize = () => { if (ready && !stopped()) options.onResize?.(); };
  function onReady() {
    if (!attached || ready || initializing || stopped()) return;
    initializing = true;
    try {
      const state = host.mraid!.getState();
      if (stopped() || state === "loading") return;
      if (state === "hidden") throw Error("Unity host closed before ready");
      if (!["default", "expanded", "resized"].includes(state)) throw Error("Invalid Unity host state");
      const version = host.mraid!.getVersion();
      if (stopped()) return;
      if (version !== "3.0") throw Error("Unity Ads UA requires MRAID 3.0");
      for (const [name, fn] of [["viewableChange", onVisible], ["stateChange", onState], ["sizeChange", onSize]] as const) {
        if (!subscribe(name, fn)) return;
      }
      const initial = host.mraid!.isViewable();
      if (stopped()) return;
      if (typeof initial !== "boolean") throw Error("Invalid Unity initial viewability");
      visible = pendingVisibility ?? initial;
      ready = true;
      clearTimeout(deadline); clearTimeout(poll);
      resolveInit?.(); resolveInit = undefined; rejectInit = undefined;
      for (const listener of [...visibility]) { if (stopped()) break; listener(visible); }
    } catch (error) { terminate(error); }
    finally { initializing = false; }
  }
  function attach() {
    if (stopped()) return;
    try {
      const available = getHost();
      if (stopped()) return;
      if (!available) { poll = setTimeout(attach, pollMs); return; }
      host.mraid = available;
      registered.push(["ready", onReady]);
      host.mraid.addEventListener("ready", onReady);
      if (!subscriptionActive("ready", onReady)) return;
      attached = true;
      onReady();
    } catch (error) { terminate(error); }
  }
  return {
    init() {
      if (operation) return operation;
      operation = new Promise<void>((resolve, reject) => { resolveInit = resolve; rejectInit = reject; });
      if (stopped()) { reject(Error("Unity bridge destroyed")); return operation; }
      deadline = setTimeout(() => terminate(Error("Unity MRAID readiness timed out")), timeoutMs);
      attach();
      return operation;
    },
    isReady: () => ready && !stopped(),
    isVisible: () => ready && visible && !stopped(),
    isClosed: stopped,
    onVisibilityChanged(listener) { if (!stopped()) visibility.add(listener); return () => visibility.delete(listener); },
    onClosed(listener) { if (!stopped()) closing.add(listener); return () => closing.delete(listener); },
    openStore(url) {
      if (!ready || !visible || stopped() || !isStoreDestination(url)) throw Error("Unity store request not permitted");
      host.mraid!.open(url);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true; ready = false; visible = false;
      cleanup(); reject(Error("Unity bridge destroyed"));
      visibility.clear(); closing.clear();
    },
  };
}
