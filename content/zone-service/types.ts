/**
 * Types pour le contenu unique par zone × service.
 * Chaque zone a du contenu spécifique par service qui référence
 * ses quartiers, landmarks, commerces et problématiques locales.
 */

export interface ZoneServiceAlternatingFeature {
  title: string;      // Avec <strong> pour SEO
  content: string;    // HTML avec <p>, <strong>, <a href> pour liens internes
  image: string;
  imageAlt: string;
  imagePosition: string;
}

export interface ZoneServiceRecentCase {
  date: string;       // ex: "mars 2026"
  lieu: string;       // ex: "rue de la République, quartier Centre-ville"
  probleme: string;   // ex: "rideau bloqué en position semi-ouverte"
  solution: string;   // ex: "remplacement de l'axe d'enroulement"
  duree: string;      // ex: "1h30"
}

export interface ZoneServiceFAQ {
  question: string;
  answer: string;    // HTML avec <strong>, liens
}

export interface ZoneServiceReview {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface ZoneServiceContent {
  /** Paragraphe intro unique pour cette zone×service (~150-200 mots) */
  zoneIntro: string;
  /** 2-3 features alternées uniques référençant les données locales */
  zoneFeatures: ZoneServiceAlternatingFeature[];
  /** 1-2 cas d'interventions récentes dans cette zone */
  recentCases: ZoneServiceRecentCase[];
  /** Contexte tarifs spécifique à la zone (optionnel) */
  tarifContext?: string;
  /** FAQ 100% uniques pour cette zone×service (5-8 questions) */
  faq?: ZoneServiceFAQ[];
  /** Avis 100% uniques pour cette zone×service (3-5 avis) */
  reviews?: ZoneServiceReview[];
}

export type ZoneServiceMap = Record<string, ZoneServiceContent>;

/** Un fichier zone complet = contenu par service */
export interface ZoneContentFile {
  [serviceSlug: string]: ZoneServiceContent;
}
