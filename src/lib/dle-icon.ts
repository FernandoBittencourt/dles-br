import type { Dle } from './types';

export type DleIconKind = 'logo' | 'favicon';

export function getDleInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?';
}

export function getFaviconUrl(gameUrl: string): string {
  const { origin } = new URL(gameUrl);
  return `${origin}/favicon.ico`;
}

/** Logo do criador (`icon`) ou favicon do site quando não houver autorização explícita. */
export function resolveDleIcon(dle: Pick<Dle, 'url' | 'icon'>): {
  src: string;
  kind: DleIconKind;
} {
  const icon = dle.icon?.trim();
  if (icon) {
    return { src: icon, kind: 'logo' };
  }
  return { src: getFaviconUrl(dle.url), kind: 'favicon' };
}
