/**
 * Données hyper-locales par zone pour différencier le contenu des pages subcity.
 * Chaque zone a des quartiers, landmarks, types de commerces et problématiques spécifiques.
 * CONTENU 100% UNIQUE — ne jamais copier entre sites DRM.
 */

export interface ZoneLocalInfo {
  quartiers: string[];
  landmarks: string[];
  commerces: string;
  problematiques: string;
  description: string;
}

export const zoneLocalData: Record<string, ZoneLocalInfo> = {
  // ── Ville principale ────────────────────────────────────────────────────
  "creil": {
    quartiers: ["Centre-ville", "Les Cavées", "Les Hauts de Creil", "Le Moulin", "Gournay", "Les Marais", "Plateau Rouher"],
    landmarks: ["Gare de Creil", "Île Saint-Maurice", "Église Saint-Médard", "Parc Séré de Rivières", "Zone commerciale Creil-Saint-Maximin"],
    commerces: "commerces de centre-ville le long de la rue de la République, boulangeries, boucheries halal, pharmacies, tabacs-presse, restaurants et kebabs du quartier gare, zone commerciale Creil-Saint-Maximin avec grandes enseignes et magasins spécialisés",
    problematiques: "Creil connaît une forte densité de commerces de proximité dans son centre-ville piéton. Les rideaux métalliques des boutiques de la rue de la République et des rues adjacentes subissent une usure accélérée due à la fréquentation quotidienne intense. Le climat continental de la Picardie avec ses hivers rigoureux provoque gel et condensation sur les mécanismes. Les commerces de la zone Creil-Saint-Maximin nécessitent des rideaux de grande dimension adaptés aux surfaces commerciales modernes.",
    description: "Creil, ville de plus de 36 000 habitants au bord de l'Oise, constitue le poumon économique du sud de l'Oise. Son centre-ville concentre plusieurs centaines de commerces entre la gare SNCF et l'île Saint-Maurice. La zone commerciale Creil-Saint-Maximin attire des enseignes régionales qui requièrent des fermetures métalliques robustes et fiables pour sécuriser leurs locaux.",
  },

  // ── Communes limitrophes ───────────────────────────────────────────────
  "nogent-sur-oise": {
    quartiers: ["Centre-ville", "Les Obiers", "Les Rochers", "Le Marais", "Quartier de la Gare"],
    landmarks: ["Château de Nogent", "Parc Marcel Dassault", "Église Notre-Dame", "Médiathèque André Malraux", "Bords de l'Oise"],
    commerces: "petits commerces du centre-ville, boulangeries artisanales, salons de coiffure, garages automobiles, restaurants de quartier, commerces alimentaires de proximité",
    problematiques: "Nogent-sur-Oise est une ville résidentielle et commerciale où les petits commerces du centre historique disposent de rideaux métalliques anciens nécessitant des rénovations fréquentes. La proximité de l'Oise génère une humidité importante qui accélère la corrosion des éléments métalliques. Les commerces proches de la gare subissent des sollicitations intensives en raison du flux pendulaire quotidien.",
    description: "Nogent-sur-Oise, commune limitrophe de Creil avec plus de 20 000 habitants, possède un tissu commercial varié entre son centre historique dominé par le château et ses quartiers résidentiels. Les commerçants locaux comptent sur des fermetures métalliques fiables pour protéger leurs établissements dans cette ville traversée par l'Oise.",
  },

  "montataire": {
    quartiers: ["Centre-ville", "Les Martinets", "Les Forges", "Quartier de la Gare", "La Pêcherie"],
    landmarks: ["Château de Montataire", "Parc André Malraux", "Médiathèque François Mitterrand", "Zone industrielle des Forges", "Bords du Thérain"],
    commerces: "commerces du centre-bourg, boulangeries, épiceries, garages et ateliers de la zone industrielle des Forges, restaurants ouvriers, commerces alimentaires",
    problematiques: "Montataire conserve un fort passé industriel avec ses anciennes forges et usines reconverties. La zone industrielle des Forges accueille des ateliers et entrepôts dont les rideaux métalliques de grande envergure nécessitent un entretien régulier. Les poussières industrielles résiduelles et l'humidité du Thérain encrassent les mécanismes des rideaux. Les commerces du centre-bourg possèdent des devantures anciennes avec des systèmes de fermeture vieillissants.",
    description: "Montataire, ancienne cité industrielle de l'Oise, compte environ 14 000 habitants. Marquée par son héritage sidérurgique, la ville possède une zone industrielle active et un centre-bourg commerçant. Les professionnels locaux ont besoin de rideaux métalliques résistants, adaptés aussi bien aux locaux industriels qu'aux commerces de proximité.",
  },

  "villers-saint-paul": {
    quartiers: ["Centre-ville", "Les Terriers", "Le Marais", "Les Sablons"],
    landmarks: ["Église Saint-Paul", "Parc communal", "Zone d'activités des Terriers", "Bords de l'Oise"],
    commerces: "commerces de première nécessité, boulangerie, pharmacie, tabac-presse, zone d'activités avec entreprises artisanales et PME, restaurants",
    problematiques: "Villers-Saint-Paul est une commune de transition entre zones résidentielles et zones d'activités. La zone des Terriers accueille des entreprises artisanales qui utilisent des rideaux métalliques industriels sollicités quotidiennement. Le vent qui balaye la vallée de l'Oise fragilise les mécanismes extérieurs et provoque des blocages récurrents pendant les mois d'hiver.",
    description: "Villers-Saint-Paul, située à 4 km de Creil sur la rive gauche de l'Oise, est une commune résidentielle et industrielle d'environ 6 000 habitants. Sa zone d'activités économiques concentre artisans et PME qui nécessitent des solutions de fermeture métallique adaptées à un usage intensif.",
  },

  "thiverny": {
    quartiers: ["Village", "Les Hauts de Thiverny", "La Vallée"],
    landmarks: ["Église Saint-Vaast", "Carrières de pierre", "Vallée du Thérain"],
    commerces: "quelques commerces de proximité, épicerie, boulangerie, artisans du bâtiment",
    problematiques: "Thiverny est une petite commune rurale où les quelques commerces et artisans locaux disposent de rideaux métalliques souvent anciens et peu entretenus. L'accès parfois difficile par des routes étroites nécessite des techniciens connaissant bien le secteur. L'humidité de la vallée du Thérain accentue les problèmes de rouille et de grippage.",
    description: "Thiverny, petit bourg de la vallée du Thérain à 4 km de Creil, conserve un caractère rural avec ses anciennes carrières de pierre. Les artisans et commerçants locaux font appel à des spécialistes du rideau métallique capables d'intervenir rapidement dans cette commune à taille humaine.",
  },

  "saint-maximin": {
    quartiers: ["Centre-bourg", "Zone commerciale", "Les Bois"],
    landmarks: ["Zone commerciale Creil-Saint-Maximin", "Abbaye royale du Moncel", "Forêt de Halatte"],
    commerces: "grande zone commerciale avec Auchan, Brico Dépôt, enseignes nationales, restaurants de chaîne, magasins de meubles, concessions automobiles, commerce de gros",
    problematiques: "Saint-Maximin est dominé par l'immense zone commerciale partagée avec Creil, l'une des plus grandes du sud de l'Oise. Les grandes surfaces et magasins spécialisés possèdent des rideaux métalliques de très grande dimension, souvent motorisés, nécessitant une maintenance technique pointue. Les horaires étendus d'ouverture sollicitent intensivement les mécanismes. Les entrepôts logistiques à l'arrière des enseignes utilisent des rideaux industriels coupe-feu conformes aux normes ERP.",
    description: "Saint-Maximin accueille la zone commerciale Creil-Saint-Maximin, pôle d'attractivité majeur de l'Oise avec ses dizaines d'enseignes nationales. Cette concentration commerciale génère un besoin constant en installation, maintenance et dépannage de rideaux métalliques de toutes dimensions.",
  },

  "brenouille": {
    quartiers: ["Centre-bourg", "Les Longues Raies", "La Croix Blanche"],
    landmarks: ["Église Saint-Lucien", "Marais de Brenouille", "Base de loisirs"],
    commerces: "commerces de village, boulangerie, bar-tabac, artisans locaux, petites entreprises en bordure de la RN 31",
    problematiques: "Brenouille est un bourg paisible à la lisière de la zone urbaine de Creil. Les quelques commerces et ateliers artisanaux disposent de rideaux métalliques qui subissent les effets du vent dans cette zone dégagée de la vallée de l'Oise. La proximité de la RN 31 génère des vibrations qui peuvent désaligner les rails des fermetures métalliques au fil du temps.",
    description: "Brenouille, commune de 2 500 habitants à 6 km de Creil, bénéficie d'un cadre verdoyant entre marais et plaine agricole. Ses commerces et artisans de proximité nécessitent des rideaux métalliques fiables pour sécuriser leurs locaux.",
  },

  // ── Communes proches (5-15 km) ─────────────────────────────────────────
  "saint-leu-desserent": {
    quartiers: ["Centre-bourg", "Le Bac", "Les Carrières", "Les Coteaux"],
    landmarks: ["Prieuré de Saint-Leu-d'Esserent", "Carrières de pierre de taille", "Port fluvial", "Bords de l'Oise"],
    commerces: "commerces du bourg historique, restaurants au bord de l'eau, artisans de la pierre, boulangeries, brocanteurs, galeries d'art",
    problematiques: "Saint-Leu-d'Esserent est un bourg pittoresque au patrimoine architectural remarquable. Les commerces installés dans des bâtiments historiques doivent composer avec des ouvertures aux dimensions non standards, nécessitant des rideaux métalliques sur-mesure. La poussière de calcaire issue des anciennes carrières peut encrasser les mécanismes. L'humidité des bords de l'Oise favorise la corrosion.",
    description: "Saint-Leu-d'Esserent, célèbre pour son prieuré classé et ses carrières de pierre ayant servi à bâtir les cathédrales d'Île-de-France, est un bourg chargé d'histoire à 7 km de Creil. Ses commerçants et restaurateurs des bords de l'Oise ont besoin de fermetures métalliques à la fois sécurisantes et respectueuses du cadre patrimonial.",
  },

  "lamorlaye": {
    quartiers: ["Centre-ville", "Le Lys", "Les Aigles", "La Borde"],
    landmarks: ["Hippodrome du Lys", "Forêt de Chantilly", "Château de Lamorlaye", "Golf du Lys"],
    commerces: "commerces haut de gamme du centre-ville, épiceries fines, restaurants gastronomiques, agences immobilières, boutiques de décoration, selleries et commerces équestres",
    problematiques: "Lamorlaye est une commune résidentielle aisée en bordure de la forêt de Chantilly. Les commerces du centre-ville, souvent haut de gamme, exigent des rideaux métalliques esthétiques et discrets, micro-perforés ou à lames polycarbonate, qui préservent la visibilité des vitrines. Les établissements liés au monde équestre nécessitent des portes sectionnelles adaptées aux grandes ouvertures.",
    description: "Lamorlaye, commune élégante de 9 000 habitants en lisière de la forêt de Chantilly, accueille l'hippodrome du Lys et de nombreux centres d'entraînement équestre. Ses commerces raffinés et ses établissements sportifs demandent des solutions de fermeture métallique alliant sécurité, esthétisme et discrétion.",
  },

  "gouvieux": {
    quartiers: ["Centre-bourg", "Chaumont", "Toutevoie", "Les Cascades"],
    landmarks: ["Château de la Tour", "Grandes Écuries de Chantilly", "Forêt de Chantilly", "Hippodrome de Chantilly"],
    commerces: "commerces de proximité, restaurants, hôtels-restaurants, domaines événementiels, centres équestres, galeries",
    problematiques: "Gouvieux est une commune résidentielle bordant la forêt de Chantilly et les installations hippiques. Les hôtels-restaurants et domaines événementiels possèdent des fermetures métalliques de grande dimension pour leurs espaces de stockage et de service. Le taux d'humidité élevé en forêt accentue les problèmes de corrosion sur les mécanismes extérieurs.",
    description: "Gouvieux, commune résidentielle de 10 000 habitants aux portes de Chantilly, se distingue par son cadre forestier exceptionnel et ses activités hippiques. Les professionnels de l'hôtellerie et de l'événementiel local comptent sur des rideaux métalliques performants pour sécuriser leurs établissements.",
  },

  "chantilly": {
    quartiers: ["Centre-ville", "Quartier de la Gare", "Les Aigles", "Bois Saint-Denis"],
    landmarks: ["Château de Chantilly", "Musée Condé", "Grandes Écuries", "Hippodrome", "Forêt de Chantilly"],
    commerces: "boutiques de luxe et souvenirs du centre-ville, pâtisseries renommées, restaurants gastronomiques, hôtels de charme, galeries d'art, chocolatiers, commerces touristiques, antiquaires",
    problematiques: "Chantilly est une ville touristique de premier plan avec un flux de visiteurs international. Les commerces du centre historique sont installés dans des bâtiments patrimoniaux aux façades protégées, imposant des rideaux métalliques sur-mesure avec intégration architecturale discrète. Les pâtisseries et restaurants gastronomiques nécessitent des fermetures conformes aux normes d'hygiène alimentaire. La haute saison touristique impose une fiabilité absolue.",
    description: "Chantilly, joyau du patrimoine français avec son château, ses grandes écuries et son hippodrome, attire plus de 400 000 visiteurs par an. Les commerçants de cette ville élégante de 11 000 habitants exigent des rideaux métalliques haut de gamme, parfaitement intégrés au cadre architectural classé.",
  },

  "liancourt": {
    quartiers: ["Centre-ville", "La Faïencerie", "Le Parc", "Les Beaux Monts"],
    landmarks: ["Château de Liancourt", "Musée de la Faïence", "Lycée Roberval", "Parc du Château"],
    commerces: "commerces de centre-bourg, boulangeries, pharmacies, supermarchés de proximité, garages automobiles, commerces de bouche, restaurants",
    problematiques: "Liancourt est un bourg actif dont le centre-ville concentre des commerces de proximité avec des rideaux métalliques soumis à une utilisation quotidienne. Les hivers de l'Oise avec gel fréquent provoquent des blocages des mécanismes. Les supermarchés et garages nécessitent des portes de grande dimension avec motorisation fiable.",
    description: "Liancourt, ville de 7 500 habitants connue pour son patrimoine faïencier et le lycée Roberval, possède un centre-bourg commerçant dynamique à 12 km de Creil. Les professionnels locaux font confiance à des spécialistes du rideau métallique pour assurer la sécurité de leurs commerces.",
  },

  "pont-sainte-maxence": {
    quartiers: ["Centre-ville", "Le Pont", "Quartier de la Gare", "Les Terriers", "Sarron"],
    landmarks: ["Pont sur l'Oise", "Abbaye du Moncel", "Forêt de Halatte", "Zone industrielle"],
    commerces: "commerces de centre-ville, marchés forains, zone d'activités avec entreprises de logistique, menuiseries industrielles, restaurants, supermarchés",
    problematiques: "Pont-Sainte-Maxence, carrefour routier entre Creil et Compiègne, supporte un trafic important qui génère vibrations et pollution accélérant l'usure des mécanismes de rideaux métalliques. La zone industrielle nécessite des rideaux et portes sectionnelles résistantes à un usage intensif logistique. Les crues de l'Oise peuvent affecter les commerces en rez-de-chaussée.",
    description: "Pont-Sainte-Maxence, ville de 13 000 habitants au passage historique de l'Oise, combine activité commerciale de centre-ville et zone industrielle dynamique à 12 km de Creil.",
  },

  "senlis": {
    quartiers: ["Centre historique", "Villevert", "Les Arènes", "Quartier de la Gare", "Saint-Vincent"],
    landmarks: ["Cathédrale Notre-Dame", "Arènes gallo-romaines", "Remparts médiévaux", "Musée d'Art et d'Archéologie", "Forêt d'Halatte"],
    commerces: "boutiques de luxe et antiquaires du centre historique, restaurants gastronomiques, galeries d'art, pâtisseries artisanales, commerces touristiques, hôtels de charme, librairies, caves à vin, artisans d'art",
    problematiques: "Senlis est une cité médiévale classée dont le centre historique impose des contraintes architecturales strictes pour l'installation de rideaux métalliques. Les Architectes des Bâtiments de France veillent à l'intégration visuelle des fermetures dans les façades en pierre de taille. Les rues pavées étroites compliquent l'accès des véhicules d'intervention. Les boutiques de luxe exigent des solutions haut de gamme, micro-perforées ou transparentes.",
    description: "Senlis, cité royale de 16 000 habitants ceinte de remparts médiévaux, est l'une des villes les plus remarquables du patrimoine picard. Son centre historique regorge de boutiques haut de gamme et galeries qui exigent des rideaux métalliques sur-mesure, intégrés avec discrétion dans les façades classées.",
  },

  "chambly": {
    quartiers: ["Centre-ville", "Le Mesnil", "La Fossette", "Zone industrielle"],
    landmarks: ["Église Notre-Dame", "Espace Lucien Jean", "Zone d'activités du Mesnil", "Bords de l'Esches"],
    commerces: "commerces de centre-bourg, supermarchés, zone d'activités avec PME et artisans, boulangeries, restaurants, commerces de services",
    problematiques: "Chambly est une commune en croissance démographique dont la zone d'activités du Mesnil accueille des entreprises artisanales et industrielles nécessitant des rideaux métalliques de grande dimension. Le vent qui s'engouffre dans la vallée de l'Esches peut provoquer des déformations sur les rideaux insuffisamment maintenus.",
    description: "Chambly, commune dynamique de 10 500 habitants à 14 km de Creil, connaît un essor commercial et industriel porté par sa zone d'activités du Mesnil.",
  },

  "clermont": {
    quartiers: ["Centre-ville", "Le Chatellier", "Quartier de la Gare", "Les Sables"],
    landmarks: ["Donjon de Clermont", "Hôtel de ville Renaissance", "Église Saint-Samson", "Parc du Chatellier"],
    commerces: "commerces de centre-ville, marché hebdomadaire, sous-préfecture avec services administratifs, boulangeries, pharmacies, restaurants, tabacs-presse, commerces de prêt-à-porter",
    problematiques: "Clermont, sous-préfecture de l'Oise, possède un centre-ville commerçant actif autour de son marché hebdomadaire. Les commerces installés dans des immeubles anciens du centre historique doivent adapter leurs fermetures métalliques aux contraintes des bâtiments patrimoniaux.",
    description: "Clermont, sous-préfecture de l'Oise avec 11 000 habitants, domine la plaine environnante depuis son donjon médiéval. Son centre-ville commerçant animé rassemble des boutiques et services de proximité.",
  },

  // ── Communes étendues (15-30 km) ───────────────────────────────────────
  "verberie": {
    quartiers: ["Centre-bourg", "Les Grands Prés", "La Croix Noire"],
    landmarks: ["Bords de l'Oise", "Forêt de Compiègne", "Château d'Aramont", "Zone artisanale"],
    commerces: "commerces de village, boulangerie, supérette, artisans, restaurants en bord d'Oise",
    problematiques: "Verberie est une commune rurale en bordure de la forêt de Compiègne dont les quelques commerces et artisans nécessitent un service de dépannage réactif malgré l'éloignement des grands centres urbains. Les conditions forestières engendrent des problèmes spécifiques sur les mécanismes.",
    description: "Verberie, bourg de 3 500 habitants entre Creil et Compiègne, offre un cadre de vie agréable au confluent de l'Oise et de la forêt de Compiègne.",
  },

  "meru": {
    quartiers: ["Centre-ville", "Le Clos des Vignes", "Les Marais", "Zone industrielle"],
    landmarks: ["Musée de la Nacre et de la Tabletterie", "Église Saint-Lucien", "Zone industrielle du Clos des Vignes"],
    commerces: "commerces de centre-ville, zone industrielle avec manufactures et ateliers, supermarchés, commerces de bouche, services de proximité",
    problematiques: "Méru conserve un tissu industriel hérité de son passé de tabletterie et de nacre. Les ateliers et manufactures de la zone industrielle utilisent des rideaux métalliques de grande envergure, souvent anciens et nécessitant une modernisation.",
    description: "Méru, ville de 15 000 habitants au nord-ouest de Creil, perpétue sa tradition industrielle héritée de la tabletterie et de l'artisanat de la nacre.",
  },

  "compiegne": {
    quartiers: ["Centre-ville", "Royallieu", "Jaux-Venette", "La Clairière", "Le Clos des Roses", "Quartier de la Gare"],
    landmarks: ["Palais de Compiègne", "Forêt de Compiègne", "Clairière de l'Armistice", "Théâtre Impérial", "Technopole"],
    commerces: "commerces du centre-ville historique, zone commerciale Jaux-Venette, boutiques autour du Palais, restaurants gastronomiques, hôtels, brasseries, commerces de la Technopole",
    problematiques: "Compiègne combine un centre historique aux façades classées et des zones commerciales modernes. Le centre-ville impose des rideaux métalliques intégrés aux façades en pierre, tandis que la zone Jaux-Venette nécessite des fermetures industrielles haute performance. Le flux touristique lié au Palais génère une activité commerciale saisonnière intense.",
    description: "Compiègne, ville de 41 000 habitants au riche patrimoine impérial, est le second pôle économique de l'Oise après Beauvais. Entre son centre historique, sa zone commerciale de Jaux-Venette et sa technopole, les professionnels compiégnois exigent des rideaux métalliques adaptés à chaque contexte.",
  },

  "beauvais": {
    quartiers: ["Centre-ville", "Saint-Jean", "Argentine", "Saint-Lucien", "Marissel", "Voisinlieu", "Zone Marcel Dassault"],
    landmarks: ["Cathédrale Saint-Pierre", "Manufacture nationale de tapisserie", "Aéroport de Beauvais-Tillé", "Zone commerciale Allonne-Beauvais"],
    commerces: "commerces du centre piétonnier, zone commerciale avec grandes enseignes, boutiques de la rue de la Manufacture, restaurants, cafés, services de la préfecture, commerces liés à l'aéroport, zone industrielle Marcel Dassault",
    problematiques: "Beauvais, préfecture de l'Oise, présente une diversité de besoins en rideaux métalliques. Le centre-ville piétonnier impose des contraintes esthétiques fortes. La zone commerciale en périphérie nécessite des rideaux de grande dimension. L'aéroport Beauvais-Tillé fonctionne en horaires décalés. La zone industrielle Marcel Dassault requiert des portes sectionnelles et rideaux coupe-feu aux normes.",
    description: "Beauvais, préfecture de l'Oise et ses 57 000 habitants, est le premier pôle économique du département. Sa cathédrale gothique, son aéroport international et ses zones commerciales et industrielles créent un marché diversifié pour les spécialistes du rideau métallique.",
  },

  "noyon": {
    quartiers: ["Centre-ville", "Quartier de l'Évêché", "Mont Saint-Siméon", "Les Larris"],
    landmarks: ["Cathédrale Notre-Dame", "Musée Jean Calvin", "Musée du Noyonnais", "Canal du Nord"],
    commerces: "commerces de centre-ville, marché couvert, restaurants, services publics, artisans, commerces liés au canal du Nord et à la logistique",
    problematiques: "Noyon, cité épiscopale historique, possède un centre-ville où les commerces sont installés dans des bâtiments anciens aux dimensions atypiques. Les rideaux métalliques doivent être fabriqués sur-mesure. Le développement logistique autour du canal du Nord génère de nouveaux besoins en fermetures industrielles sécurisées.",
    description: "Noyon, ville de 14 000 habitants riche de 2000 ans d'histoire, est un pôle commercial et logistique du nord de l'Oise.",
  },
};
