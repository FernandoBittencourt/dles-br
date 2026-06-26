export type DleCategory = 'palavras' | 'logica' | 'geografia' | 'cultura' | 'outros';

export interface Dle {
  id: string;
  name: string;
  url: string;
  description: string;
  category: DleCategory;
  featured: boolean;
  /** Logo em public/icons/, enviada pelo criador no PR. Sem isso, usamos o favicon do site. */
  icon?: string;
}

export const CATEGORY_LABELS: Record<DleCategory, string> = {
  palavras: 'Palavras',
  logica: 'Lógica',
  geografia: 'Geografia',
  cultura: 'Cultura',
  outros: 'Outros',
};
