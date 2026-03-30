"use client";

import { useState } from "react";
import Image from "next/image";

interface RideauType {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const rideauTypes: RideauType[] = [
  {
    id: "lames-pleines",
    label: "Lames pleines",
    title: "Rideau a lames pleines",
    description:
      "Le rideau a lames pleines offre une securite maximale pour votre commerce. Fabrique en acier galvanise, il protege integralement votre vitrine et constitue une barriere anti-effraction efficace. Ideal pour les commerces de centre-ville et zones sensibles.",
    image: "/images/gallery/rideau-metallique-fond-lame-pleine-france.webp",
    features: [
      "Securite maximale contre les effractions",
      "Isolation thermique et phonique",
      "Acier galvanise haute resistance",
      "Duree de vie superieure a 15 ans",
    ],
  },
  {
    id: "grille",
    label: "Grille metallique",
    title: "Grille metallique articulee",
    description:
      "La grille metallique articulee (type Cobra) combine securite et visibilite. Elle permet de proteger votre commerce tout en laissant voir votre vitrine. Parfaite pour les galeries commerciales, restaurants et boutiques de pret-a-porter.",
    image: "/images/gallery/grille-cobra-rideau-metallique.webp",
    features: [
      "Visibilite de la vitrine conservee",
      "Ventilation naturelle du local",
      "Dissuasion anti-intrusion efficace",
      "Design esthetique et discret",
    ],
  },
  {
    id: "micro-perfore",
    label: "Micro-perfore",
    title: "Rideau micro-perfore",
    description:
      "Le rideau micro-perfore est le compromis ideal entre securite et esthetique. Ses micro-perforations laissent filtrer la lumiere et la visibilite tout en assurant une protection robuste. Tres demande par les bijouteries, pharmacies et boutiques haut de gamme.",
    image: "/images/gallery/lame-micro-perforee-rideau-metallique.webp",
    features: [
      "Visibilite partielle de la vitrine",
      "Eclairage nocturne de la devanture",
      "Protection renforcee",
      "Esthetique moderne et soignee",
    ],
  },
  {
    id: "motorisation",
    label: "Motorisation",
    title: "Motorisation de rideau metallique",
    description:
      "La motorisation transforme votre rideau manuel en rideau automatique. Moteurs centraux (ACM) ou tubulaires (Somfy, Nice, Came) selon vos besoins. Commande par cle, telecommande ou smartphone. Un investissement rentabilise en confort et securite.",
    image: "/images/gallery/Moteur-ACM-76-rideau-metallique.webp",
    features: [
      "Ouverture/fermeture en 15 secondes",
      "Commande telecommande ou smartphone",
      "Moteurs Somfy, Nice, Came, ACM",
      "Securite anti-chute integree",
    ],
  },
];

export function TypesRideauxTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const active = rideauTypes[activeTab];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label justify-center">
            <span className="w-2 h-2 bg-primary-500 rounded-full" />
            Nos produits
          </span>
          <h2 className="section-title">Types de rideaux metalliques</h2>
          <p className="section-subtitle mx-auto text-center mt-3">
            Decouvrez les differents types de rideaux metalliques que nous
            installons, reparons et entretenons.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {rideauTypes.map((type, index) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === index
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={active.image}
              alt={active.title}
              title={active.title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {active.title}
            </h3>
            <div className="w-10 h-1 bg-primary-500 rounded-full mb-5" />
            <p className="text-gray-600 leading-relaxed mb-8">
              {active.description}
            </p>

            <ul className="space-y-3">
              {active.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
