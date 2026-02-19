import { supabaseAdmin } from '@/lib/supabase';
import { validateWebhookSignature } from '@/lib/mercadopago';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-signature') || '';
    const requestId = req.headers.get('x-request-id') || '';

    // Validar assinatura
    const isValid = validateWebhookSignature(
      body,
      signature,
      process.env.MERCADOPAGO_WEBHOOK_SECRET!
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const data = JSON.parse(body);

    // Processar webhook
    if (data.type === 'payment') {
      const paymentId = data.data.id;

      // Buscar transação
      const { data: transaction, error: txError } = await supabaseAdmin
        .from('transactions')
        .select('*')
        .eq('mp_payment_id', paymentId)
        .single();

      if (txError || !transaction) {
        return NextResponse.json(
          { error: 'Transaction not found' },
          { status: 404 }
        );
      }

      // Atualizar status da transação
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', transaction.id);

      // Se for assinatura, ativar
      if (transaction.type === 'subscription') {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'active',
            last_payment_at: new Date().toISOString(),
            expires_at: expiresAt.toISOString(),
          })
          .eq('mp_payment_id', paymentId);
      }

      // Se for boost, criar highlight
      if (transaction.type === 'boost') {
        // Lógica para criar highlight
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
