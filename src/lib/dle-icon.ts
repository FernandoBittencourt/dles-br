import type { Dle } from './types';

export type DleIconKind = 'logo' | 'favicon';

/** Favicons conhecidos por host (antes dos genéricos). */
const SITE_FAVICONS: Record<string, string[]> = {
  'term.ooo': ['/icon.png'],
  'www.gabtoschi.com': [
    '/letreco/favicon.ico',
    '/letreco/icons/32x32.png',
    '/letreco/icons/192x192.png',
  ],
  'letra.games': ['/favicon.ico'],
  'worldle.teuteuf.fr': ['/logo192.png', '/img/favicon.144x144.png'],
  'codedoku.app': ['/favicon-32x32.png', '/apple-touch-icon.png', '/favicon.ico'],
  'sudoku.com': ['/favicon-32x32.png', '/apple-touch-icon.png', '/favicon-96x96.png'],
  'drible.ee': ['/favicon.ico', '/favicon.png', '/apple-touch-icon.png'],
};

export function getDleInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?';
}

/** Candidatos em ordem — tentamos no browser até um carregar. */
export function getFaviconCandidates(gameUrl: string): string[] {
  const url = new URL(gameUrl);
  const { origin, hostname, pathname } = url;
  const dir =
    pathname.endsWith('/') ? pathname : pathname.replace(/\/[^/]*$/, '/') || '/';

  const candidates: string[] = [];

  for (const path of SITE_FAVICONS[hostname] ?? []) {
    candidates.push(`${origin}${path}`);
  }

  if (dir !== '/') {
    candidates.push(
      `${origin}${dir}favicon.ico`,
      `${origin}${dir}icons/32x32.png`,
      `${origin}${dir}favicon-32x32.png`,
    );
  }

  candidates.push(
    `${origin}/favicon.ico`,
    `${origin}/favicon-32x32.png`,
    `${origin}/favicon.png`,
    `${origin}/apple-touch-icon.png`,
    `${origin}/icon.png`,
  );

  candidates.push(`https://icons.duckduckgo.com/ip3/${hostname}.ico`);

  return [...new Set(candidates)];
}

export function getFaviconUrl(gameUrl: string): string {
  return getFaviconCandidates(gameUrl)[0];
}

/** Logo do criador (`icon`) ou favicon do site quando não houver autorização explícita. */
export function resolveDleIcon(dle: Pick<Dle, 'url' | 'icon'>): {
  src: string;
  kind: DleIconKind;
  faviconCandidates?: string[];
} {
  const icon = dle.icon?.trim();
  if (icon) {
    return { src: icon, kind: 'logo' };
  }

  const faviconCandidates = getFaviconCandidates(dle.url);
  return { src: faviconCandidates[0], kind: 'favicon', faviconCandidates };
}

/** Separador seguro para data-attribute (URLs não contêm |). */
export function encodeFaviconCandidates(candidates: string[]): string {
  return candidates.join('|');
}

export function decodeFaviconCandidates(value: string | undefined): string[] {
  if (!value) return [];
  return value.split('|').filter(Boolean);
}
