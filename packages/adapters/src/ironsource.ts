import type {NetworkBridge} from "./index.js";

interface Dapi {
  isReady?(): boolean;
  isViewable(): boolean;
  getAudioVolume?(): number;
  addEventListener(name: string, listener: (...args: unknown[]) => void): void;
  removeEventListener(name: string, listener: (...args: unknown[]) => void): void;
  openStoreUrl(): void;
}
export function createIronSourceBridge(options: {timeoutMs?: number; pollMs?: number; onResize?: () => void} = {}): NetworkBridge {
  const visibility = new Set<(visible: boolean) => void>(), closing = new Set<() => void>(), volumes = new Set<(volume: number) => void>();
  const registered: Array<[string, (...args: unknown[]) => void]> = [];
  let host: Dapi | undefined, ready = false, visible = false, closed = false, destroyed = false, operation: Promise<void> | undefined;
  let resolveInit: (() => void) | undefined, rejectInit: ((error: Error) => void) | undefined;
  let deadline: ReturnType<typeof setTimeout> | undefined, poll: ReturnType<typeof setTimeout> | undefined;
  const stopped = () => closed || destroyed;
  function cleanup() {
    clearTimeout(deadline); clearTimeout(poll);
    for (const [name, listener] of registered.splice(0)) {
      try { host?.removeEventListener(name, listener); } catch { /* Best-effort host teardown. */ }
    }
  }
  function terminate(error: unknown) {
    if (stopped()) return;
    closed = true; ready = false; visible = false; cleanup();
    rejectInit?.(error instanceof Error ? error : Error(String(error))); resolveInit = undefined; rejectInit = undefined;
    for (const listener of [...closing]) listener();
  }
  const normalizeVolume = (value: unknown) => {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return undefined;
    return Math.min(1, value > 1 ? value / 100 : value);
  };
  const parseViewable = (value: unknown) => {
    if (typeof value === "boolean") return value;
    if (value && typeof value === "object" && typeof (value as {isViewable?: unknown}).isViewable === "boolean") {
      return (value as {isViewable: boolean}).isViewable;
    }
    return undefined;
  };
  const onReady = () => {
    if (ready || stopped() || !host || host.isReady?.() === false) return;
    try {
      visible = host.isViewable();
      const rawVolume = host.getAudioVolume?.();
      const volume = rawVolume === undefined ? undefined : normalizeVolume(rawVolume);
      if (typeof visible !== "boolean" || (rawVolume !== undefined && volume === undefined)) throw Error("Invalid DAPI initial state");
      ready = true; clearTimeout(deadline); clearTimeout(poll); resolveInit?.(); resolveInit = undefined; rejectInit = undefined;
      if (volume !== undefined) for (const listener of [...volumes]) listener(volume);
      for (const listener of [...visibility]) listener(visible);
    } catch (error) { terminate(error); }
  };
  const onVisible = (value: unknown) => {
    if (stopped()) return;
    const parsed = parseViewable(value);
    if (parsed === undefined) { terminate(Error("Invalid DAPI visibility")); return; }
    visible = parsed; for (const listener of [...visibility]) listener(parsed);
  };
  const onVolume = (value: unknown) => {
    if (stopped()) return;
    const normalized = normalizeVolume(value);
    if (normalized === undefined) { terminate(Error("Invalid DAPI volume")); return; }
    for (const listener of [...volumes]) listener(normalized);
  };
  const onResize = () => { if (ready && !stopped()) options.onResize?.(); };
  function attach() {
    if (stopped()) return;
    host = (window as Window & {dapi?: Dapi}).dapi;
    if (!host) { poll = setTimeout(attach, options.pollMs ?? 25); return; }
    try {
      for (const [name, listener] of [["ready", onReady], ["viewableChange", onVisible], ["audioVolumeChange", onVolume], ["adResized", onResize]] as const) {
        registered.push([name, listener]); host.addEventListener(name, listener);
      }
      onReady();
    } catch (error) { terminate(error); }
  }
  return {
    init() {
      if (operation) return operation;
      operation = new Promise<void>((resolve, reject) => { resolveInit = resolve; rejectInit = reject; });
      if (stopped()) { rejectInit?.(Error("DAPI bridge closed")); return operation; }
      deadline = setTimeout(() => terminate(Error("DAPI readiness timed out")), options.timeoutMs ?? 5000);
      attach(); return operation;
    },
    isReady: () => ready && !stopped(), isVisible: () => ready && visible && !stopped(), isClosed: stopped,
    onVisibilityChanged(listener) { if (!stopped()) visibility.add(listener); return () => visibility.delete(listener); },
    onClosed(listener) { if (!stopped()) closing.add(listener); return () => closing.delete(listener); },
    onVolumeChanged(listener) { if (!stopped()) volumes.add(listener); return () => volumes.delete(listener); },
    openStore() { if (!ready || !visible || stopped() || typeof host?.openStoreUrl !== "function") throw Error("DAPI store host unavailable"); host.openStoreUrl(); },
    destroy() { if (destroyed) return; destroyed = true; ready = false; visible = false; cleanup(); rejectInit?.(Error("DAPI bridge destroyed")); visibility.clear(); closing.clear(); volumes.clear(); },
  };
}
