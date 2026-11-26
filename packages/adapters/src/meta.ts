import type {NetworkBridge} from "./index.js";

interface MetaHost { onCTAClick(): void }
export function createMetaBridge(): NetworkBridge {
  const visibility = new Set<(visible: boolean) => void>();
  let ready = false, visible = false, destroyed = false;
  const onVisibility = () => {
    if (destroyed) return;
    visible = document.visibilityState !== "hidden";
    for (const listener of [...visibility]) listener(visible);
  };
  return {
    async init() {
      if (destroyed) throw Error("Meta bridge destroyed");
      if (document.readyState === "loading") await new Promise<void>(resolve => document.addEventListener("DOMContentLoaded", () => resolve(), {once: true}));
      if (destroyed) throw Error("Meta bridge destroyed");
      document.addEventListener("visibilitychange", onVisibility);
      visible = document.visibilityState !== "hidden"; ready = true;
      onVisibility();
    },
    isReady: () => ready && !destroyed,
    isVisible: () => ready && visible && !destroyed,
    isClosed: () => destroyed,
    onVisibilityChanged(listener) { if (!destroyed) visibility.add(listener); return () => visibility.delete(listener); },
    onClosed() { return () => {}; },
    openStore() {
      const host = (window as Window & {FbPlayableAd?: MetaHost}).FbPlayableAd;
      if (!ready || !visible || destroyed || typeof host?.onCTAClick !== "function") throw Error("Meta CTA host unavailable");
      host.onCTAClick();
    },
    destroy() { destroyed = true; ready = false; visible = false; document.removeEventListener("visibilitychange", onVisibility); visibility.clear(); },
  };
}
