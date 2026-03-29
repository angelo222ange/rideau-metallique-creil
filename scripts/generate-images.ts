/**
 * Générateur d'images via API Gemini pour le site DRM Creil.
 *
 * Usage: npx tsx scripts/generate-images.ts
 *
 * Lit la clé depuis .env (GEMINI_API_KEY) du blogengine.
 * Génère des images réalistes de rideaux métalliques contextualisées
 * pour chaque service et chaque zone stratégique.
 */

import fs from "fs";
import path from "path";

// Clé API Gemini
const API_KEY = process.env.GEMINI_API_KEY || "***REMOVED***";
const OUTPUT_DIR = path.join(__dirname, "../public/images/generated");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Prompts basés sur la connaissance exacte des produits DRM :
 * - Moteurs centraux : ACM, Came, BFT (platine/drapeau au-dessus du coffre, chaîne)
 * - Moteurs tubulaires : Somfy, Nice, Simu (intégrés dans l'axe, invisibles)
 * - Lames : P57 (57mm acier), P90, P140 double paroi
 * - Grilles : cobra (tubes formant motif), extensibles (accordéon), articulées
 */
const IMAGE_PROMPTS: Record<string, string> = {
  // ── SERVICES ──────────────────────────────────────────────
  "service-depannage-rideau":
    "Professional photograph of a locksmith technician wearing a blue polo shirt with white DRM letters on the back, repairing a commercial grey metal rolling shutter (rideau métallique) on a French town storefront. The shutter is stuck halfway open. The technician is crouched, using a wrench on the bottom guide rail. A tool bag is on the ground. The shop sign says 'Boulangerie'. Daytime, overcast sky, realistic northern French street with stone buildings.",

  "service-installation-pose":
    "Professional photograph of two technicians wearing blue polo shirts with white DRM letters on the back, installing a new galvanized steel rolling shutter on a French pharmacy storefront. One technician on a short ladder is mounting the steel guide rail (coulisse) to the wall. The new silver shutter lames (horizontal slats) are stacked nearby. The pharmacy has a green cross sign. Realistic, daytime, French town center.",

  "service-fabrication-atelier":
    "Professional photograph inside a metal workshop. Galvanized steel rolling shutter slats (lames) of 57mm width are being fed through a bending/forming machine. Stacks of finished slats on metal racks. A worker wears protective gloves and safety glasses. Industrial fluorescent lighting. Clean workshop with metal shavings on the floor.",

  "service-entretien-maintenance":
    "Professional photograph of a technician wearing a blue polo shirt with white DRM letters on the back, performing preventive maintenance on a commercial metal rolling shutter. He sprays lubricant on the vertical guide rail (coulisse en U) while the shutter is half-open. A clipboard with a checklist is visible. The shop front is a French tabac-presse. Daylight, realistic.",

  "service-motorisation-tubulaire":
    "Professional close-up photograph of a Somfy tubular motor (cylindrical shape, ~60mm diameter, ~500mm long) being inserted into the hollow steel axle tube of a rolling shutter. The technician's gloved hands guide the motor. Electrical wires (brown, blue, yellow-green) are visible. Inside a metal coffre (housing box) above a shop entrance. Well-lit, realistic.",

  "service-motorisation-centrale":
    "Professional photograph of an ACM central motor unit (rectangular grey metal housing ~300mm, with chain drive mechanism) mounted on a steel bracket (drapeau/platine) above a rolling shutter coffre. The motor drives the axle via a steel chain. An electrical control box is wired next to it. Industrial setting, close-up, realistic.",

  "service-deblocage-urgence":
    "Professional photograph of an emergency metal shutter repair situation. A French shop on a commercial street has its rolling metal shutter stuck in a half-open position at an angle. A locksmith technician wearing a blue polo shirt with white DRM letters on the back is using manual winding tools to free the mechanism. Early morning light, some urgency in the scene. Realistic.",

  "service-reparation-lames":
    "Professional photograph of a technician wearing a blue polo shirt with white DRM letters on the back, replacing damaged galvanized steel slats (lames) on a metal rolling shutter. Two old rusty/bent slats have been removed and lie on the ground. The technician clips a new shiny galvanized slat into place using special pliers. French shop context. Close-up on hands and slats. Realistic.",

  // ── TYPES DE RIDEAUX ──────────────────────────────────────
  "type-lames-pleines":
    "Professional photograph of a fully closed metal rolling shutter (rideau métallique à lames pleines) on a French boutique. The horizontal galvanized steel slats are tightly closed, completely opaque. A heavy-duty lock is visible at the bottom center. Clean grey metal finish. French town center facade with stone walls.",

  "type-micro-perforee":
    "Professional photograph of a micro-perforated metal rolling shutter on a French clothing boutique at night. The perforated aluminum slats allow the shop interior lighting to shine through, revealing the display inside. The perforation pattern is fine and regular. Street lighting reflects off the metal surface.",

  "type-grille-cobra":
    "Professional photograph of a cobra-style metal security grille on a French shop front. The grille is made of interlocking round steel tubes forming a diamond/cobra pattern. It allows full visibility into the shop while providing security. The grille is partially open, rolling upward. Daytime, French commercial street.",

  // ── VILLES / ZONES ────────────────────────────────────────
  "zone-creil-centre":
    "Photograph of the commercial center of Creil, Oise, France. A pedestrian shopping street with small shops (boulangerie, pharmacie, tabac). Typical northern French architecture with rendered facades. Some shops have closed metal rolling shutters. Overcast sky, flat terrain. The street is lively with a few pedestrians.",

  "zone-chantilly-boutiques":
    "Photograph of the elegant town center of Chantilly, Oise, France. Upscale boutiques and patisseries line a clean cobblestone street. Some shops have discreet micro-perforated rolling shutters that blend with the historic facades. Trees with autumn leaves. The Chateau de Chantilly towers are faintly visible in the background.",

  "zone-compiegne-palais":
    "Photograph of the historic commercial area near the Palais de Compiègne, Oise, France. French imperial-era stone buildings with arched windows. Ground-floor shops have metal rolling shutters, some open, some closed. A wide cobblestone square with elegant lamp posts.",

  "zone-senlis-medieval":
    "Photograph of a narrow medieval street in Senlis, Oise, France. Ancient stone buildings, cobblestone pavement. Small artisan shops and galleries with tasteful metal security grilles (grilles articulées) that blend with the historic stone facades. The Gothic cathedral spire is visible above the rooftops.",

  "zone-beauvais-cathedrale":
    "Photograph of the commercial district of Beauvais, Oise, France, with the massive Gothic Cathédrale Saint-Pierre visible in the background. A pedestrian shopping street with modern storefronts. Some shops have grey metal rolling shutters. Northern French urban atmosphere.",
};

async function generateImage(prompt: string, filename: string): Promise<boolean> {
  console.log(`🎨 ${filename}...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Generate a photorealistic image: ${prompt}` }]
          }],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
          }
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error(`  ❌ API ${response.status}: ${err.slice(0, 200)}`);
      return false;
    }

    const data = await response.json();
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData?.mimeType?.startsWith("image/")
    );

    if (imagePart?.inlineData?.data) {
      const buffer = Buffer.from(imagePart.inlineData.data, "base64");
      const filepath = path.join(OUTPUT_DIR, `${filename}.webp`);
      fs.writeFileSync(filepath, buffer);
      console.log(`  ✅ ${(buffer.length / 1024).toFixed(0)}KB → ${filepath}`);
      return true;
    } else {
      console.error(`  ❌ Pas d'image dans la réponse`);
      return false;
    }
  } catch (err) {
    console.error(`  ❌ Erreur:`, (err as Error).message);
    return false;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  DRM Creil — Génération d'images via Gemini");
  console.log("═══════════════════════════════════════════════\n");
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  const entries = Object.entries(IMAGE_PROMPTS);
  let success = 0;
  let failed = 0;

  for (const [key, prompt] of entries) {
    const outputPath = path.join(OUTPUT_DIR, `${key}.webp`);
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  ${key} — déjà généré, skip`);
      success++;
      continue;
    }

    const ok = await generateImage(prompt, key);
    if (ok) success++;
    else failed++;

    // Rate limit: 2s entre chaque requête
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n═══════════════════════════════════════════════`);
  console.log(`  ✅ ${success} réussies · ❌ ${failed} échouées`);
  console.log(`  📁 ${OUTPUT_DIR}`);
  console.log(`═══════════════════════════════════════════════`);
}

main().catch(console.error);
