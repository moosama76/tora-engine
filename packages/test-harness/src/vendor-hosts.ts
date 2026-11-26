type Call = {name: string; trusted?: boolean; at: number};
function telemetry() {
  const calls: Call[] = [];
  let trustedAt = -Infinity;
  document.addEventListener("click", event => { if (event.isTrusted) trustedAt = performance.now(); }, true);
  const record = (name: string) => {
    calls.push({name, trusted: performance.now() - trustedAt < 1000, at: performance.now()});
    if (calls.length > 1000) throw Error("Unbounded vendor host calls");
  };
  return {record, snapshot: () => calls.map(call => ({...call}))};
}

export function installIronSourceHost() {
  const events = new Map<string, Set<(...args: unknown[]) => void>>(), calls = telemetry();
  let ready = true, visible = true, volume = 1;
  const emit = (name: string, ...args: unknown[]) => { for (const listener of [...(events.get(name) ?? [])]) listener(...args); };
  const dapi = {
    isReady: () => ready,
    isViewable: () => visible,
    getAudioVolume: () => volume,
    addEventListener(name: string, listener: (...args: unknown[]) => void) { if (!events.has(name)) events.set(name, new Set()); events.get(name)!.add(listener); },
    removeEventListener(name: string, listener: (...args: unknown[]) => void) { events.get(name)?.delete(listener); },
    openStoreUrl() { calls.record("openStoreUrl"); if (!ready || !visible) throw Error("DAPI not viewable"); },
  };
  const controls = {
    ready(value = true) { ready = value; if (value) emit("ready"); },
    visible(value: boolean, asObject = false) { visible = value; emit("viewableChange", asObject ? {isViewable: value} : value); },
    volume(value: number) { volume = value; emit("audioVolumeChange", value); },
    resize() { emit("adResized"); },
    snapshot: calls.snapshot,
  };
  Object.assign(window, {dapi, __ironsourceTest: controls});
  return controls;
}

export function installMetaHost() {
  const calls = telemetry();
  const FbPlayableAd = {onCTAClick() { calls.record("onCTAClick"); }};
  const controls = {snapshot: calls.snapshot};
  Object.assign(window, {FbPlayableAd, __metaTest: controls});
  return controls;
}

export function installGoogleExitApiHost() {
  const calls = telemetry();
  const ExitApi = {exit() { calls.record("exit"); }};
  const controls = {snapshot: calls.snapshot};
  Object.assign(window, {ExitApi, __googleTest: controls});
  return controls;
}

export function installMintegralHost() {
  const calls = telemetry(), creative = window as Window & {gameStart?(): void; gameClose?(): void};
  let started = false, closed = false;
  const start = () => { if (closed) return; started = true; calls.record("gameStart"); creative.gameStart?.(); };
  const close = () => { closed = true; calls.record("gameClose"); creative.gameClose?.(); };
  const host = {
    gameReady() { calls.record("gameReady"); queueMicrotask(start); },
    install() { calls.record("install"); if (!started || closed) throw Error("Mintegral not started"); },
    gameEnd() { calls.record("gameEnd"); },
    gameRetry() { calls.record("gameRetry"); },
  };
  const controls = {start, close, snapshot: () => ({started, closed, calls: calls.snapshot()})};
  Object.assign(window, host, {__mintegralTest: controls});
  return controls;
}

export function installTikTokHost() {
  const calls = telemetry();
  const openAppStore = () => calls.record("openAppStore");
  const controls = {snapshot: calls.snapshot};
  Object.assign(window, {openAppStore, playableSDK: {openAppStore}, __tiktokTest: controls});
  return controls;
}
