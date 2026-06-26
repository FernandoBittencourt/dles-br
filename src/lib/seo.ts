export const SITE_NAME = 'dles.com.br';
export const SITE_URL = 'https://dles.com.br';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const DEFAULT_TITLE = 'dles.com.br · Hub de jogos diários em português';
export const DEFAULT_DESCRIPTION =
  'Termo, Letreco, Elos e mais: sorteio do dia e lista curada de dles em português para jogar no browser.';

export type JsonLd = Record<string, unknown>;

export function websiteJsonLd(description = DEFAULT_DESCRIPTION): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description,
    inLanguage: 'pt-BR',
  };
}

export function itemListJsonLd(
  items: { name: string; url: string }[],
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dles em português',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function webPageJsonLd(title: string, description: string, url: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };
}
