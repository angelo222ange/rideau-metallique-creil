# 📸 Guide des Images

Ce dossier contient toutes les images du site. Voici la structure et les spécifications pour chaque type d'image.

## 📁 Structure des dossiers

```
images/
├── hero/           → Images principales (bannières)
├── services/       → Images des services
├── types/          → Images par type de rideau
├── zones/          → Images par ville/zone
├── team/           → Photos de l'équipe
├── logos/          → Logo et favicon
├── icons/          → Icônes personnalisées
├── gallery/        → Galerie de réalisations
└── backgrounds/    → Fonds et textures
```

## 🖼️ Spécifications par dossier

### `/hero/` - Images principales
Images de bannière pour les pages principales.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `hero-home.webp` | 1920×1080 | Page d'accueil |
| `hero-depannage.webp` | 1920×800 | Page dépannage |
| `hero-installation.webp` | 1920×800 | Page installation |
| `hero-motorisation.webp` | 1920×800 | Page motorisation |
| `hero-contact.webp` | 1920×600 | Page contact |

### `/services/` - Images des services
Une image par service proposé.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `depannage.webp` | 800×600 | Service dépannage |
| `installation.webp` | 800×600 | Service installation |
| `motorisation.webp` | 800×600 | Service motorisation |
| `entretien.webp` | 800×600 | Service entretien |
| `reparation.webp` | 800×600 | Service réparation |
| `deblocage.webp` | 800×600 | Service déblocage |

### `/types/` - Images par type de rideau
Images illustrant chaque type de rideau métallique.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `lames-pleines.webp` | 800×600 | Rideau à lames pleines |
| `micro-perfore.webp` | 800×600 | Rideau micro-perforé |
| `tubes-ondules.webp` | 800×600 | Rideau tubes ondulés |
| `grille.webp` | 800×600 | Grille métallique |
| `coupe-feu.webp` | 800×600 | Rideau coupe-feu |
| `porte-garage.webp` | 800×600 | Porte de garage |

### `/zones/` - Images par zone
Images spécifiques à chaque ville/arrondissement (optionnel).

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `paris-1.webp` | 800×600 | Page Paris 1er |
| `paris-11.webp` | 800×600 | Page Paris 11e |
| `neuilly.webp` | 800×600 | Page Neuilly |
| ... | | |

### `/team/` - Photos d'équipe
Photos des techniciens/équipe.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `team-1.webp` | 400×400 | Photo technicien 1 |
| `team-2.webp` | 400×400 | Photo technicien 2 |
| `equipe.webp` | 1200×800 | Photo de groupe |
| `vehicule.webp` | 800×600 | Véhicule d'intervention |

### `/logos/` - Logos et favicon
Logo de l'entreprise en différents formats.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `logo.png` | 400×100 | Logo principal (header) |
| `logo-white.png` | 400×100 | Logo blanc (footer sombre) |
| `logo-icon.png` | 100×100 | Icône seule |
| `favicon.ico` | 32×32 | Favicon navigateur |
| `apple-touch-icon.png` | 180×180 | Icône iOS |
| `og-image.jpg` | 1200×630 | Image partage réseaux sociaux |

### `/icons/` - Icônes personnalisées
Icônes PNG personnalisées.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `icon-rideau.png` | 64×64 | Icône rideau métallique |
| `icon-moteur.png` | 64×64 | Icône moteur |
| `icon-phone.png` | 64×64 | Icône téléphone |
| `icon-clock.png` | 64×64 | Icône horaires |

### `/gallery/` - Galerie de réalisations
Photos de chantiers et réalisations.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `realisation-1.webp` | 800×600 | Photo installation |
| `realisation-2.webp` | 800×600 | Photo dépannage |
| `avant-apres-1.webp` | 1600×600 | Avant/après |

### `/backgrounds/` - Fonds et textures
Images de fond pour les sections.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `pattern-metal.png` | 200×200 | Motif métallique répétable |
| `texture-industrial.webp` | 1920×1080 | Texture industrielle |

## ⚙️ Recommandations techniques

### Format
- **WebP** : Format recommandé (meilleure compression)
- **PNG** : Pour les logos et icônes (fond transparent)
- **JPG** : Pour les photos sans transparence

### Optimisation
- Compresser les images avant upload
- Outils : [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/)
- Viser < 100KB par image si possible

### Nommage
- Utiliser des noms descriptifs en minuscules
- Séparer les mots par des tirets : `lames-pleines.webp`
- Éviter les accents et caractères spéciaux

## 🔄 Remplacement des images

Pour remplacer une image :
1. Garder exactement le même nom de fichier
2. Respecter les dimensions recommandées
3. Le site utilisera automatiquement la nouvelle image

## ⚠️ Images obligatoires

Ces images doivent être présentes pour éviter les erreurs :

- [ ] `logos/logo.png` - Logo principal
- [ ] `hero/hero-home.webp` - Bannière accueil
- [ ] `logos/og-image.jpg` - Image réseaux sociaux

Les autres images sont optionnelles (des placeholders peuvent être utilisés).

