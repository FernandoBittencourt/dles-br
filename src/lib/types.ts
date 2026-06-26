export type DleCategory = 'palavras' | 'logica' | 'geografia' | 'cultura' | 'outros';

export interface Dle {
  id: string;
  name: string;
  url: string;
  description: string;
  category: DleCategory;
  featured: boolean;
}

export const CATEGORY_LABELS: Record<DleCategory, string> = {
  palavras: 'Palavras',
  logica: 'Lógica',
  geografia: 'Geografia',
  cultura: 'Cultura',
  outros: 'Outros',
};
