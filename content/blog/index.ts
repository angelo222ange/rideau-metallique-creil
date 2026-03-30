// Articles generiques
import article1 from './signes-depannage-rideau-metallique-urgent.json';
import article2 from './guide-entretien-rideau-metallique-2026.json';
import article3 from './erreurs-installation-rideau-metallique.json';
import article4 from './lames-pleines-micro-perforees-comparatif.json';
import article5 from './rideau-metallique-rouille-causes-solutions.json';
import article6 from './normes-reglementations-rideau-metallique-2026.json';
import article7 from './prolonger-duree-vie-rideau-metallique.json';
import article8 from './bruit-rideau-metallique-causes-solutions.json';
import article9 from './grille-metallique-vs-rideau-lames-comparatif.json';
import article10 from './automatiser-rideau-metallique-domotique.json';
import article11 from './entretien-rideau-metallique-avant-hiver.json';
import article12 from './rideau-metallique-bloque-position-ouverte.json';
import article13 from './comparatif-marques-moteur-rideau-metallique.json';
import article14 from './subventions-aides-rideau-metallique-commerce.json';
import article15 from './rideau-metallique-electrique-vs-manuel-guide.json';
import article16 from './securite-incendie-rideau-metallique-commerce.json';
import article17 from './rideau-metallique-intelligent-connecte-2026.json';
import article18 from './fabricant-rideau-metallique-comment-choisir.json';
import article19 from './top-6-fabricants-rideaux-metalliques-france-2026.json';

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  summary: {
    title: string;
    points: string[];
  };
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export const blogArticles: BlogArticle[] = [
  article1, article2, article3, article4, article5,
  article6, article7, article8, article9, article10,
  article11, article12, article13, article14, article15,
  article16, article17, article18, article19,
] as BlogArticle[];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(a => a.slug === slug);
}
