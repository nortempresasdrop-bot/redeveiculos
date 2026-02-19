'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Lead {
  id: string;
  buyer_name: string;
  buyer_phone: string;
  status: string;
  created_at: string;
  vehicle: {
    brand: string;
    model: string;
  };
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('new');

  useEffect(() => {
    async function fetchLeads() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      let query = supabase
        .from('leads')
        .select('*, vehicle:vehicles(brand, model)')
        .eq('owner_id', user.user.id);

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query.order('created_at', {
        ascending: false,
      });

      if (!error) {
        setLeads(data || []);
      }
      setLoading(false);
    }

    fetchLeads();
  }, [filter]);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Meus Leads</h1>

      <div className="mb-6 flex gap-2">
        {['new', 'contacted', 'negotiating', 'won', 'lost', 'all'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded ${
                filter === status
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              {status === 'all' ? 'Todos' : status}
            </button>
          )
        )}
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">Nenhum lead encontrado</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Veículo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{lead.buyer_name}</td>
                  <td className="px-6 py-4">{lead.buyer_phone}</td>
                  <td className="px-6 py-4">
                    {lead.vehicle?.brand} {lead.vehicle?.model}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-800">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
