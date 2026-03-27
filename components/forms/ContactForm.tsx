'use client';

import { useState, FormEvent } from 'react';
import { siteConfig } from '@/config/site';

interface ContactFormData {
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  prestation: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '',
    telephone: '',
    email: '',
    adresse: '',
    prestation: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: `${siteConfig.domain}-contact-form`,
          formulaire: `Demande de devis gratuit ${siteConfig.city}`,
          brand: siteConfig.fullName,
          city: siteConfig.city,
          sitePhone: siteConfig.phone,
          siteEmail: siteConfig.email,
          submittedAt: new Date().toISOString(),
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      setStatus({
        type: 'success',
        message: 'Merci ! Votre demande a été envoyée. Nous vous recontactons rapidement.',
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        telephone: '',
        email: '',
        adresse: '',
        prestation: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer ou nous appeler directement.',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-secondary-sable p-8 md:p-10" style={{ borderRadius: '2px' }}>
      <h2 className="font-display text-2xl text-gray-900 mb-6">Demande de devis</h2>

      {status.type === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm">
          <p className="text-green-800 text-sm">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
          <p className="text-red-800 text-sm">{status.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Nom *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              required
              value={formData.nom}
              onChange={handleChange}
              disabled={status.type === 'loading'}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:ring-1 focus:ring-secondary-terracotta focus:border-secondary-terracotta transition-all disabled:opacity-50"
              style={{ borderRadius: '2px' }}
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Téléphone *
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              required
              value={formData.telephone}
              onChange={handleChange}
              disabled={status.type === 'loading'}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:ring-1 focus:ring-secondary-terracotta focus:border-secondary-terracotta transition-all disabled:opacity-50"
              style={{ borderRadius: '2px' }}
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status.type === 'loading'}
            className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:ring-1 focus:ring-secondary-terracotta focus:border-secondary-terracotta transition-all disabled:opacity-50"
            style={{ borderRadius: '2px' }}
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label htmlFor="adresse" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Adresse *
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            required
            value={formData.adresse}
            onChange={handleChange}
            disabled={status.type === 'loading'}
            className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:ring-1 focus:ring-secondary-terracotta focus:border-secondary-terracotta transition-all disabled:opacity-50"
            style={{ borderRadius: '2px' }}
            placeholder="Adresse du local"
          />
        </div>
        <div>
          <label htmlFor="prestation" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Intervention *
          </label>
          <select
            id="prestation"
            name="prestation"
            required
            value={formData.prestation}
            onChange={handleChange}
            disabled={status.type === 'loading'}
            className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:ring-1 focus:ring-secondary-terracotta focus:border-secondary-terracotta transition-all disabled:opacity-50"
            style={{ borderRadius: '2px' }}
          >
            <option value="">Sélectionnez...</option>
            <option value="depannage">Dépannage urgence</option>
            <option value="installation">Installation</option>
            <option value="fabrication">Fabrication sur-mesure</option>
            <option value="motorisation">Motorisation</option>
            <option value="entretien">Entretien / Contrat</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            disabled={status.type === 'loading'}
            className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:ring-1 focus:ring-secondary-terracotta focus:border-secondary-terracotta transition-all disabled:opacity-50"
            style={{ borderRadius: '2px' }}
            placeholder="Décrivez votre besoin..."
          />
        </div>
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.type === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </button>
        <p className="text-xs text-gray-400 text-center">
          Urgence ? Appelez le{' '}
          <a href={siteConfig.phoneLink} className="text-secondary-terracotta font-bold">
            {siteConfig.phone}
          </a>
        </p>
      </form>
    </div>
  );
}
