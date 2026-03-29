/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURATION DU SITE - DRM CREIL
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const siteConfig = {
  // ─────────────────────────────────────────────────────────────────────────
  // INFORMATIONS ENTREPRISE
  // ─────────────────────────────────────────────────────────────────────────
  name: "DRM Creil",
  fullName: "Dépannage Rideau Métallique Creil",
  domain: "depannage-rideau-metallique-creil.fr",
  url: "https://depannage-rideau-metallique-creil.fr",

  // ─────────────────────────────────────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────────────────────────────────────
  phone: "03 44 67 12 00",
  phoneLink: "tel:+33344671200",
  email: "contact@depannage-rideau-metallique-creil.fr",

  // ─────────────────────────────────────────────────────────────────────────
  // LOCALISATION (aligné fiche Google / NAP)
  // ─────────────────────────────────────────────────────────────────────────
  city: "Creil",
  postalCode: "60100",
  department: "Oise",
  departmentCode: "60",
  region: "Hauts-de-France",
  /** Adresse complète — À DÉFINIR par Angelo */
  address: "3 rue de Verdun, 60100 Creil",
  streetAddress: "3 rue de Verdun",

  geo: {
    lat: 49.2583,
    lng: 2.4833,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HORAIRES
  // ─────────────────────────────────────────────────────────────────────────
  openingHours: "24h/24, 7j/7",
  openingHoursSchema: ["Mo-Su 00:00-23:59"],

  // ─────────────────────────────────────────────────────────────────────────
  // RÉSEAUX SOCIAUX
  // ─────────────────────────────────────────────────────────────────────────
  social: {
    facebook: "",
    instagram: "",
    google: "",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AVIS GOOGLE
  // ─────────────────────────────────────────────────────────────────────────
  reviews: {
    rating: 4.8,
    count: 94,
    googleUrl: "",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EXPÉRIENCE & STATS
  // ─────────────────────────────────────────────────────────────────────────
  experience: "12+",
  interventions: "3500+",

  // ─────────────────────────────────────────────────────────────────────────
  // DESIGN - COULEURS
  // Palette Vert Forêt / Picardie — Creil, vallée de l'Oise
  // Inspirée des forêts de Chantilly et du patrimoine industriel
  // ─────────────────────────────────────────────────────────────────────────
  colors: {
    primary: {
      50:  '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#1B7A4E',  // Couleur principale - Vert Forêt Picardie
      700: '#155E3B',
      800: '#10452B',
      900: '#0B2E1D',
    },
    secondary: {
      terracotta: '#B45309',  // CTA urgence, boutons action — brique industrielle
      ocre: '#D97706',        // Accents chaleureux
      sable: '#FAFAF5',       // Backgrounds clairs
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// ZONES D'INTERVENTION
// Creil + 20 communes environnantes dans l'Oise (rayon ~30km)
// ─────────────────────────────────────────────────────────────────────────
export const zones = [
  // Ville principale
  { name: "Creil", slug: "creil", postalCode: "60100", isMain: true },

  // ── Communes limitrophes (< 5 km) ──────────────────────────────────────
  { name: "Nogent-sur-Oise", slug: "nogent-sur-oise", postalCode: "60180", distance: "2 km" },
  { name: "Montataire", slug: "montataire", postalCode: "60160", distance: "3 km" },
  { name: "Villers-Saint-Paul", slug: "villers-saint-paul", postalCode: "60870", distance: "4 km" },
  { name: "Thiverny", slug: "thiverny", postalCode: "60160", distance: "4 km" },
  { name: "Saint-Maximin", slug: "saint-maximin", postalCode: "60740", distance: "5 km" },
  { name: "Brenouille", slug: "brenouille", postalCode: "60870", distance: "6 km" },

  // ── Communes proches (5-15 km) ─────────────────────────────────────────
  { name: "Saint-Leu-d'Esserent", slug: "saint-leu-desserent", postalCode: "60340", distance: "7 km" },
  { name: "Lamorlaye", slug: "lamorlaye", postalCode: "60260", distance: "8 km" },
  { name: "Gouvieux", slug: "gouvieux", postalCode: "60270", distance: "8 km" },
  { name: "Chantilly", slug: "chantilly", postalCode: "60500", distance: "10 km" },
  { name: "Liancourt", slug: "liancourt", postalCode: "60140", distance: "12 km" },
  { name: "Pont-Sainte-Maxence", slug: "pont-sainte-maxence", postalCode: "60700", distance: "12 km" },
  { name: "Senlis", slug: "senlis", postalCode: "60300", distance: "13 km" },
  { name: "Chambly", slug: "chambly", postalCode: "60230", distance: "14 km" },
  { name: "Clermont", slug: "clermont", postalCode: "60600", distance: "15 km" },

  // ── Communes étendues (15-30 km) ───────────────────────────────────────
  { name: "Verberie", slug: "verberie", postalCode: "60410", distance: "20 km" },
  { name: "Méru", slug: "meru", postalCode: "60110", distance: "22 km" },
  { name: "Compiègne", slug: "compiegne", postalCode: "60200", distance: "28 km" },
  { name: "Beauvais", slug: "beauvais", postalCode: "60000", distance: "32 km" },
  { name: "Noyon", slug: "noyon", postalCode: "60400", distance: "45 km" },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────
export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Zones", href: "/zones" },
  { label: "Avis", href: "/avis" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// SERVICES - 7 services avec pages + pages localisées SubCity
// ─────────────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "depannage",
    slug: "depannage",
    name: "Dépannage",
    shortDesc: "Intervention urgence 24h/24",
    longDesc: "Dépannage et réparation de rideaux métalliques en urgence à Creil et dans l'Oise. Déblocage, réparation moteur, lames, serrure.",
    icon: "wrench",
    image: "/images/gallery/depannage-rideau-metallique-DRM-reparation.webp",
    hasPage: true,
  },
  {
    id: "installation",
    slug: "installation",
    name: "Installation",
    shortDesc: "Pose de rideaux métalliques",
    longDesc: "Installation complète de rideaux métalliques pour commerces et locaux professionnels à Creil et ses environs.",
    icon: "hammer",
    image: "/images/gallery/installation-rideau-metallique-drm.webp",
    hasPage: true,
  },
  {
    id: "fabrication",
    slug: "fabrication",
    name: "Fabrication Sur-Mesure",
    shortDesc: "Rideaux métalliques sur-mesure",
    longDesc: "Fabrication de rideaux métalliques sur-mesure à Creil. Acier galvanisé, aluminium, inox.",
    icon: "factory",
    image: "/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp",
    hasPage: true,
  },
  {
    id: "entretien",
    slug: "entretien",
    name: "Entretien",
    shortDesc: "Maintenance préventive",
    longDesc: "Contrats d'entretien et maintenance préventive pour rideaux métalliques à Creil et dans l'Oise.",
    icon: "settings",
    image: "/images/gallery/entretien-rideau-metallique-rideau-de-fer.webp",
    hasPage: true,
  },
  {
    id: "motorisation",
    slug: "motorisation",
    name: "Motorisation",
    shortDesc: "Automatisation de votre rideau",
    longDesc: "Motorisation et automatisation de rideaux métalliques existants ou neufs à Creil et dans le département de l'Oise.",
    icon: "zap",
    image: "/images/gallery/moteur-tubulaire-rideau-metallique-drm.webp",
    hasPage: true,
  },
  {
    id: "deblocage",
    slug: "deblocage",
    name: "Déblocage",
    shortDesc: "Déblocage en urgence",
    longDesc: "Déblocage de rideaux métalliques bloqués en urgence à Creil. Intervention rapide 24h/24, 7j/7.",
    icon: "unlock",
    image: "/images/gallery/depannage-rideau-metallique-drm-france-rm.webp",
    hasPage: true,
  },
  {
    id: "reparation",
    slug: "reparation",
    name: "Réparation",
    shortDesc: "Remise en état complète",
    longDesc: "Réparation de rideaux métalliques à Creil. Lames, moteur, axe, serrure : tous composants.",
    icon: "tool",
    image: "/images/gallery/realisation-drm-rideau-metallique-lame-pleine.webp",
    hasPage: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────
// TYPES DE RIDEAUX
// ─────────────────────────────────────────────────────────────────────────
export const rideauTypes = [
  { name: "Rideau à lames pleines", slug: "lames-pleines" },
  { name: "Rideau à lames micro-perforées", slug: "micro-perfore" },
  { name: "Rideau à tubes ondulés", slug: "tubes-ondules" },
  { name: "Grille métallique", slug: "grille" },
  { name: "Rideau coupe-feu", slug: "coupe-feu" },
  { name: "Porte de garage", slug: "porte-garage" },
] as const;

// Type exports
export type SiteConfig = typeof siteConfig;
export type Zone = typeof zones[number];
export type NavItem = typeof navigation[number];
export type Service = typeof services[number];
