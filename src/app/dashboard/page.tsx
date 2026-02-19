'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    activeVehicles: 0,
    newLeads: 0,
    totalLeads: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Veículos ativos
      const { count: vehicleCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact' })
        .eq('owner_id', user.user.id)
        .eq('status', 'published');

      // Leads novos
      const { count: newLeadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .eq('owner_id', user.user.id)
        .eq('status', 'new');

      // Total de leads
      const { count: totalLeadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .eq('owner_id', user.user.id);

      setStats({
        activeVehicles: vehicleCount || 0,
        newLeads: newLeadsCount || 0,
        totalLeads: totalLeadsCount || 0,
        conversionRate: totalLeadsCount ? ((newLeadsCount || 0) / totalLeadsCount) * 100 : 0,
      });

      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Veículos Ativos</h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.activeVehicles}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Leads Novos</h3>
          <p className="text-3xl font-bold text-secondary mt-2">
            {stats.newLeads}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Total de Leads</h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.totalLeads}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Taxa de Conversão</h3>
          <p className="text-3xl font-bold text-accent mt-2">
            {stats.conversionRate.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Próximas Ações</h2>
        <ul className="space-y-2">
          <li>✓ Adicionar novo veículo</li>
          <li>✓ Responder leads pendentes</li>
          <li>✓ Renovar assinatura</li>
        </ul>
      </div>
    </div>
  );
}
