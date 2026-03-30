import { siteConfig, zones, services } from "@/config/site";

/**
 * Context pour les remplacements dynamiques (zone, service)
 */
interface ReplaceContext {
  zone?: string;      // Nom de la zone (ex: "Paris 11e")
  zoneSlug?: string;  // Slug de la zone (ex: "paris-11")
  zonePostal?: string; // Code postal de la zone
  service?: string;   // Nom du service (ex: "Dépannage Urgence")
  serviceSlug?: string; // Slug du service (ex: "depannage")
}

/**
 * Remplace les variables dans le contenu
 * Variables supportées : {city}, {name}, {phone}, {email}, {department}, {region}, {zone}, {service}
 */
export function replaceVariables(text: string, context?: ReplaceContext): string {
  let result = text
    .replace(/{city}/g, siteConfig.city)
    .replace(/{name}/g, siteConfig.name)
    .replace(/{fullName}/g, siteConfig.fullName)
    .replace(/{phone}/g, siteConfig.phone)
    .replace(/{email}/g, siteConfig.email)
    .replace(/{department}/g, siteConfig.department)
    .replace(/{region}/g, siteConfig.region)
    .replace(/{postalCode}/g, siteConfig.postalCode)
    .replace(/{address}/g, siteConfig.address);

  // Variables contextuelles (zone et service)
  if (context?.zone) {
    result = result.replace(/{zone}/g, context.zone);
  }
  if (context?.zonePostal) {
    result = result.replace(/{zonePostal}/g, context.zonePostal);
  }
  if (context?.service) {
    result = result.replace(/{service}/g, context.service);
  }

  return result;
}

/**
 * Récupère une zone par son slug
 */
export function getZoneBySlug(slug: string) {
  return zones.find(z => z.slug === slug);
}

/**
 * Récupère un service par son slug
 */
export function getServiceBySlug(slug: string) {
  return services.find(s => s.slug === slug);
}

/**
 * Remplace les variables dans un objet (récursif)
 */
export function replaceVariablesInObject<T>(obj: T, context?: ReplaceContext): T {
  if (typeof obj === "string") {
    return replaceVariables(obj, context) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceVariablesInObject(item, context)) as T;
  }
  
  if (typeof obj === "object" && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceVariablesInObject(value, context);
    }
    return result as T;
  }
  
  return obj;
}

/**
 * Charge et parse le contenu d'une page avec remplacement des variables
 */
export function getPageContent<T>(content: T, context?: ReplaceContext): T {
  return replaceVariablesInObject(content, context);
}

/**
 * Hash simple d'un string pour obtenir un nombre déterministe
 * Utilisé pour varier le contenu par zone (anti-duplicate)
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Sélectionne un sous-ensemble d'éléments d'un pool basé sur le slug de zone.
 * Garantit que chaque zone obtient un ensemble différent (anti-duplicate content).
 * IMPORTANT : Le premier élément du pool est TOUJOURS conservé en première position
 * (ex: "Qui appeler pour [service] à [zone] ?" doit toujours être la 1ère FAQ).
 */
export function getZoneContent<T>(pool: T[], zoneSlug: string, count: number = 5): T[] {
  if (pool.length <= count) return pool;
  
  // Le premier élément est toujours conservé (question "Qui appeler...")
  const firstItem = pool[0];
  const remainingPool = pool.slice(1);
  
  const hash = hashString(zoneSlug);
  const startIndex = hash % remainingPool.length;
  const result: T[] = [firstItem];
  
  for (let i = 0; i < count - 1; i++) {
    result.push(remainingPool[(startIndex + i) % remainingPool.length]);
  }
  
  return result;
}

/**
 * Récupère les zones voisines pour une zone donnée (maillage interne SubCity)
 */
export function getNeighborZones(currentSlug: string, count: number = 8) {
  const currentIndex = zones.findIndex(z => z.slug === currentSlug);
  if (currentIndex === -1) return zones.slice(0, count);
  
  const neighbors = zones.filter(z => z.slug !== currentSlug);
  // Mélange basé sur le hash pour varier les voisins affichés
  const hash = hashString(currentSlug);
  const start = hash % neighbors.length;
  const result: typeof neighbors = [];
  
  for (let i = 0; i < Math.min(count, neighbors.length); i++) {
    result.push(neighbors[(start + i) % neighbors.length]);
  }
  
  return result;
}

// Export du type pour utilisation dans les pages
export type { ReplaceContext };
