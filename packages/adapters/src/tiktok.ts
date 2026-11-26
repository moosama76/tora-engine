import type {NetworkBridge} from "./index.js";

interface TikTokSdk { openAppStore?(): void }
export function createTikTokBridge(): NetworkBridge {
  const visibility = new Set<(visible: boolean) => void>();
  let ready = false, visible = false, destroyed = false;
  const onVisibility = () => {
    if (destroyed) return;
    visible = document.visibilityState !== "hidden";
    for (const listener of [...visibility]) listener(visible);
  };
  return {
    async init() {
      if (destroyed) throw Error("TikTok bridge destroyed");
      if (document.readyState === "loading") await new Promise<void>(resolve => document.addEventListener("DOMContentLoaded", () => resolve(), {once: true}));
      if (destroyed) throw Error("TikTok bridge destroyed");
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
      const host = window as Window & {openAppStore?: () => void; playableSDK?: TikTokSdk};
      const open = typeof host.openAppStore === "function" ? host.openAppStore.bind(host) : host.playableSDK?.openAppStore?.bind(host.playableSDK);
      if (!ready || !visible || destroyed || !open) throw Error("TikTok store host unavailable");
      open();
    },
    destroy() { destroyed = true; ready = false; visible = false; document.removeEventListener("visibilitychange", onVisibility); visibility.clear(); },
  };
}
