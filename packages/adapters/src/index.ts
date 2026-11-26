/** Network-neutral host contract shared by all compiled vendor adapters. */
export type Unsubscribe = () => void;
export interface NetworkBridge {
  /** Resolves only when the host permits initialization; rejects on failure/close. */
  init(): Promise<void>;
  isReady(): boolean;
  isVisible(): boolean;
  isClosed(): boolean;
  onVisibilityChanged(listener: (visible: boolean) => void): Unsubscribe;
  onClosed(listener: () => void): Unsubscribe;
  onVolumeChanged?(listener: (volume: number) => void): Unsubscribe;
  notifyGameEnd?(): void;
  notifyGameRetry?(): void;
  openStore(url: string): void;
  destroy(): void;
}

/** Small destination guard, not a network profile or verification of a listing. */
export function isStoreDestination(url: string): boolean {
  if (/\s/.test(url) || url.length > 512) return false;
  const android = /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*){1,9}$/;
  const ios = /^https:\/\/apps\.apple\.com\/([a-z]{2}\/)?app\/([a-zA-Z0-9-]+\/)?id[1-9][0-9]{5,19}$/;
  return (android.test(url) && !/id=example\.|[.=]placeholder(\.|$)|id=com\.example(\.|$)/.test(url)) || ios.test(url);
}
