import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function createPaymentPreference(
  title: string,
  amount: number,
  description: string,
  externalReference: string
) {
  const preference = new Preference(client);

  const result = await preference.create({
    body: {
      items: [
        {
          title,
          quantity: 1,
          unit_price: amount / 100, // converter de centavos para reais
          description,
        },
      ],
      external_reference: externalReference,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/assinatura?status=success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/assinatura?status=failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/assinatura?status=pending`,
      },
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      auto_return: 'approved',
    },
  });

  return result;
}

export function validateWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  return hash === signature;
}
