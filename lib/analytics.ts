import { track as vercelTrack } from '@vercel/analytics'

// Custom events go to Vercel Web Analytics (requires a Pro or Enterprise plan;
// on other plans the call is a harmless no-op). Never pass personal data here.
export function track(event: string, params?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return
  vercelTrack(event, params)
}
