'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { createPaymentPreference } from '@/lib/mercadopago';
import toast from 'react-hot-toast';

interface Plan {
  id: string;
  name: string;
  price_cents: number;
  vehicle_limit: number;
  included_highlights: number;
}

interface Subscription {
  id: string;
  status: string;
  expires_at: string;
  plan: Plan;
}

export default function AssinaturaPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Buscar planos
      const { data: plansData } = await supabase
        .from('plans')
        .select('*')
        .eq('active', true);

      setPlans(plansData || []);

      // Buscar assinatura ativa
      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*, plan:plans(*)')
        .eq('user_id', user.user.id)
        .eq('status', 'active')
        .single();

      setSubscription(subData);
      setLoading(false);
    }

    fetchData();
  }, []);

  async function handleUpgrade(planId: string) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    try {
      // Criar preferência de pagamento
      const preference = await createPaymentPreference(
        plan.name,
        plan.price_cents,
        `Assinatura ${plan.name}`,
        `subscription_${planId}_${user.user.id}`
      );

      // Salvar transação
      const { data: transaction } = await supabase
        .from('transactions')
        .insert({
          user_id: user.user.id,
          type: 'subscription',
          amount_cents: plan.price_cents,
          status: 'pending',
          mp_payment_id: preference.id,
        })
        .select()
        .single();

      // Criar/atualizar assinatura
      await supabase.from('subscriptions').upsert({
        user_id: user.user.id,
        plan_id: planId,
        status: 'pending',
        mp_preference_id: preference.id,
        mp_payment_id: preference.id,
      });

      // Redirecionar para Mercado Pago
      if (preference.init_point) {
        window.location.href = preference.init_point;
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao processar pagamento');
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Minha Assinatura</h1>

      {subscription && subscription.status === 'active' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-green-800 mb-2">
            Plano Ativo: {subscription.plan.name}
          </h2>
          <p className="text-green-700">
            Válido até:{' '}
            {new Date(subscription.expires_at).toLocaleDateString('pt-BR')}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow p-6 border-2 border-gray-200"
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-secondary mb-4">
              R$ {(plan.price_cents / 100).toFixed(2)}
              <span className="text-sm text-gray-600">/mês</span>
            </p>

            <ul className="space-y-2 mb-6 text-sm">
              <li>✓ {plan.vehicle_limit} veículos ativos</li>
              <li>✓ {plan.included_highlights} destaques inclusos</li>
              <li>✓ {plan.ads_quota} anúncios Google Ads</li>
            </ul>

            <button
              onClick={() => handleUpgrade(plan.id)}
              className="w-full bg-secondary text-white py-2 rounded hover:bg-blue-600"
            >
              Escolher Plano
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
