'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount_cents: number;
  status: string;
  created_at: string;
}

export default function TransacoesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      setTransactions(data || []);
      setLoading(false);
    }

    fetchTransactions();
  }, []);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Transações</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Valor</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{tx.type}</td>
                <td className="px-6 py-4">R$ {(tx.amount_cents / 100).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      tx.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(tx.created_at).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
