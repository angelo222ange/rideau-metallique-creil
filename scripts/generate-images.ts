/**
 * Générateur d'images via API Gemini pour le site DRM Creil.
 *
 * Usage: GEMINI_API_KEY=xxx npx tsx scripts/generate-images.ts
 *
 * Génère des images uniques pour chaque service et zone,
 * basées sur les descriptions du brain (types de rideaux, moteurs, etc.)
 */

import fs from "fs";
import path from "path";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY non définie. Usage: GEMINI_API_KEY=xxx npx tsx scripts/generate-images.ts");
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, "../public/images/generated");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Prompts pour chaque type d'image
const IMAGE_PROMPTS: Record<string, string> = {
  // Services
  "depannage": "Professional photograph of a French locksmith technician repairing a commercial metal rolling shutter on a small city street shop front. The technician wears dark blue work clothes, uses professional tools. The shop is a typical French bakery or pharmacy. Daylight, realistic style, no text or logos.",
  "installation": "Professional photograph showing the installation of a new silver metal rolling shutter on a French commercial storefront. Two technicians are mounting the guide rails. The shop facade is a typical French town center building with stone or rendered walls. Realistic, daytime.",
  "fabrication": "Professional photograph of a metal workshop where rolling shutters are being fabricated. Steel lames (slats) are stacked, a worker operates a bending machine. Industrial environment with overhead lighting. Realistic.",
  "entretien": "Professional photograph of a technician performing maintenance on a commercial metal rolling shutter. He is lubricating the guide rails with a spray can. The shutter is half-open revealing a French shop interior. Realistic, daytime.",
  "motorisation": "Professional close-up photograph of a tubular electric motor being installed inside the axle of a metal rolling shutter. Professional hands with tools, electrical connections visible. Clean, well-lit workshop environment.",
  "deblocage": "Professional photograph of a technician urgently unblocking a stuck metal rolling shutter on a French commercial street. The shutter is stuck halfway. The technician uses manual tools to free the mechanism. Early morning light, realistic.",
  "reparation": "Professional photograph of a technician replacing damaged slats (lames) on a metal rolling shutter. Old rusty slats are removed, new galvanized steel slats are being clipped in. French shop front context, realistic.",

  // Zones (villes)
  "creil-ville": "Aerial photograph of the city center of Creil, Oise, France. The Oise river, the train station area, and the commercial pedestrian streets are visible. Northern French architecture, overcast sky typical of Picardy.",
  "chantilly": "Photograph of the elegant town center of Chantilly, France, with its prestigious boutiques and the Chateau de Chantilly visible in the background. Autumn colors, French elegance.",
  "compiegne": "Photograph of the historic center of Compiègne, France, with the Palais de Compiègne visible. French imperial architecture, cobblestone streets, boutiques.",
  "beauvais": "Photograph of Beauvais city center with the famous Cathédrale Saint-Pierre visible in the background. French pedestrian shopping street, typical northern France architecture.",
  "senlis": "Photograph of the medieval streets of Senlis, France. Stone buildings, narrow cobblestone streets, the Cathédrale Notre-Dame tower visible above the rooftops. Charming French medieval town.",
};

async function generateImage(prompt: string, filename: string): Promise<void> {
  console.log(`🎨 Generating: ${filename}...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a high-quality image based on this description: ${prompt}`
            }]
          }],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
            responseMimeType: "image/webp",
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ API error for ${filename}: ${error}`);
      return;
    }

    const data = await response.json();

    // Extract image data from response
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData?.mimeType?.startsWith("image/")
    );

    if (imagePart?.inlineData?.data) {
      const buffer = Buffer.from(imagePart.inlineData.data, "base64");
      const filepath = path.join(OUTPUT_DIR, `${filename}.webp`);
      fs.writeFileSync(filepath, buffer);
      console.log(`✅ Saved: ${filepath} (${(buffer.length / 1024).toFixed(0)}KB)`);
    } else {
      console.error(`❌ No image in response for ${filename}`);
    }
  } catch (err) {
    console.error(`❌ Error generating ${filename}:`, err);
  }
}

async function main() {
  console.log("🚀 Génération d'images DRM Creil via Gemini API\n");
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  const entries = Object.entries(IMAGE_PROMPTS);

  for (const [key, prompt] of entries) {
    await generateImage(prompt, key);
    // Rate limiting: wait 2s between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n✅ Terminé. ${entries.length} images générées dans ${OUTPUT_DIR}`);
  console.log("\nPour utiliser ces images, déplacez-les dans public/images/gallery/ avec des noms SEO.");
}

main().catch(console.error);
