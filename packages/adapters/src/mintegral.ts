import type {NetworkBridge} from "./index.js";

interface MintegralWindow extends Window {
  gameReady?(): void;
  gameStart?(): void;
  gameClose?(): void;
  install?(): void;
  gameEnd?(): void;
  gameRetry?(): void;
}
export function createMintegralBridge(): NetworkBridge {
  const host = window as MintegralWindow, visibility = new Set<(visible: boolean) => void>(), closing = new Set<() => void>();
  const previousStart = host.gameStart, previousClose = host.gameClose;
  let ready = false, visible = false, closed = false, destroyed = false;
  const start = () => {
    if (closed || destroyed) return;
    const changed = !visible || !ready;
    ready = true; visible = true;
    if (changed) for (const listener of [...visibility]) listener(true);
  };
  const close = () => {
    if (closed || destroyed) return;
    ready = false; visible = false; closed = true;
    for (const listener of [...visibility]) listener(false);
    for (const listener of [...closing]) listener();
  };
  host.gameStart = start; host.gameClose = close;
  return {
    async init() {
      if (closed || destroyed) throw Error("Mintegral bridge closed");
      if (typeof host.gameReady !== "function") throw Error("Mintegral gameReady host unavailable");
      host.gameReady();
    },
    isReady: () => ready && !closed && !destroyed,
    isVisible: () => ready && visible && !closed && !destroyed,
    isClosed: () => closed || destroyed,
    onVisibilityChanged(listener) { if (!closed && !destroyed) visibility.add(listener); return () => visibility.delete(listener); },
    onClosed(listener) { if (!closed && !destroyed) closing.add(listener); return () => closing.delete(listener); },
    notifyGameEnd() { if (!closed && !destroyed) host.gameEnd?.(); },
    notifyGameRetry() { if (!closed && !destroyed) host.gameRetry?.(); },
    openStore() {
      if (!ready || !visible || closed || destroyed || typeof host.install !== "function") throw Error("Mintegral install host unavailable");
      host.install();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true; ready = false; visible = false;
      if (host.gameStart === start) { if (previousStart) host.gameStart = previousStart; else delete host.gameStart; }
      if (host.gameClose === close) { if (previousClose) host.gameClose = previousClose; else delete host.gameClose; }
      visibility.clear(); closing.clear();
    },
  };
}
