declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

/** Privacy friendly events. Does nothing unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. */
export function track(event: string, props?: Record<string, string>) {
  if (typeof window !== "undefined" && window.plausible) window.plausible(event, props ? { props } : undefined);
}
