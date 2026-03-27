/**
 * Index central — charge le contenu unique par zone×service.
 * Import statique de tous les fichiers zone pour le SSG Next.js.
 */
import type { ZoneContentFile, ZoneServiceContent } from "./types";

// ── Zones limitrophes (0-6km) ─────────────────────────────────
import creil from "./creil.json";
import nogentSurOise from "./nogent-sur-oise.json";
import montataire from "./montataire.json";
import villersSaintPaul from "./villers-saint-paul.json";
import thiverny from "./thiverny.json";
import saintMaximin from "./saint-maximin.json";
import brenouille from "./brenouille.json";

// ── Zones proches (5-15km) ────────────────────────────────────
import saintLeuDesserent from "./saint-leu-desserent.json";
import lamorlaye from "./lamorlaye.json";
import gouvieux from "./gouvieux.json";
import chantilly from "./chantilly.json";
import liancourt from "./liancourt.json";
import pontSainteMaxence from "./pont-sainte-maxence.json";
import senlis from "./senlis.json";
import chambly from "./chambly.json";
import clermont from "./clermont.json";

// ── Zones étendues (15-45km) ──────────────────────────────────
import verberie from "./verberie.json";
import meru from "./meru.json";
import compiegne from "./compiegne.json";
import beauvais from "./beauvais.json";
import noyon from "./noyon.json";

// Use 'as' assertion since JSON imagePosition is string, not literal union
const allZoneContent: Record<string, ZoneContentFile> = {
  "creil": creil,
  "nogent-sur-oise": nogentSurOise,
  "montataire": montataire,
  "villers-saint-paul": villersSaintPaul,
  "thiverny": thiverny,
  "saint-maximin": saintMaximin,
  "brenouille": brenouille,
  "saint-leu-desserent": saintLeuDesserent,
  "lamorlaye": lamorlaye,
  "gouvieux": gouvieux,
  "chantilly": chantilly,
  "liancourt": liancourt,
  "pont-sainte-maxence": pontSainteMaxence,
  "senlis": senlis,
  "chambly": chambly,
  "clermont": clermont,
  "verberie": verberie,
  "meru": meru,
  "compiegne": compiegne,
  "beauvais": beauvais,
  "noyon": noyon,
};

/**
 * Récupère le contenu unique pour une combinaison zone×service.
 * Retourne null si pas de contenu spécifique (fallback au contenu générique).
 */
export function getZoneServiceContent(
  zoneSlug: string,
  serviceSlug: string
): ZoneServiceContent | null {
  const zoneContent = allZoneContent[zoneSlug];
  if (!zoneContent) return null;

  const serviceContent = zoneContent[serviceSlug];
  if (!serviceContent) return null;

  return serviceContent;
}

export type { ZoneServiceContent, ZoneServiceAlternatingFeature, ZoneServiceRecentCase } from "./types";
