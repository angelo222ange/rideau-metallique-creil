import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://lioai.app.n8n.cloud/webhook/drm-contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Préparer les données au format attendu par n8n
    const webhookData = {
      headers: Object.fromEntries(request.headers),
      params: {},
      query: {},
      body: {
        nom: body.nom || '',
        telephone: body.telephone || '',
        email: body.email || '',
        adresse: body.adresse || '',
        prestation: body.prestation || '',
        message: body.message || '',
        source: body.source || '',
        formulaire: body.formulaire || '',
        brand: body.brand || '',
        city: body.city || '',
        sitePhone: body.sitePhone || '',
        siteEmail: body.siteEmail || '',
        submittedAt: body.submittedAt || new Date().toISOString(),
        pageUrl: body.pageUrl || '',
        userAgent: body.userAgent || '',
      },
      webhookUrl: WEBHOOK_URL,
      executionMode: 'production',
    };

    // Envoyer au webhook n8n
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData.body),
    });

    if (!response.ok) {
      console.error('Erreur webhook n8n:', response.status, response.statusText);
      throw new Error('Erreur lors de l\'envoi au webhook');
    }

    return NextResponse.json(
      { success: true, message: 'Formulaire envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi du formulaire' },
      { status: 500 }
    );
  }
}
