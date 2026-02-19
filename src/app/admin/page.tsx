'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    totalTransactions: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const { count: users } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      const { count: vehicles } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact' });

      const { count: transactions } = await supabase
        .from('transactions')
        .select('*', { count: 'exact' });

      const { data: revenue } = await supabase
        .from('transactions')
        .select('amount_cents')
        .eq('status', 'completed');

      const totalRevenue = (revenue || []).reduce(
        (sum, t) => sum + t.amount_cents,
        0
      );

      setStats({
        totalUsers: users || 0,
        totalVehicles: vehicles || 0,
        totalTransactions: transactions || 0,
        revenue: totalRevenue,
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Total de Usuários</h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Total de Veículos</h3>
          <p className="text-3xl font-bold text-secondary mt-2">
            {stats.totalVehicles}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Transações</h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {stats.totalTransactions}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Receita Total</h3>
          <p className="text-3xl font-bold text-accent mt-2">
            R$ {(stats.revenue / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
