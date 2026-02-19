'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  status: string;
  price_cents: number;
  views_count: number;
  created_at: string;
}

export default function VeiculosPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', user.user.id)
        .order('created_at', { ascending: false });

      if (!error) {
        setVehicles(data || []);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, []);

  async function deleteVehicle(id: string) {
    if (!confirm('Tem certeza?')) return;

    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (!error) {
      setVehicles(vehicles.filter((v) => v.id !== id));
      toast.success('Veículo deletado');
    } else {
      toast.error('Erro ao deletar');
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meus Veículos</h1>
        <Link
          href="/dashboard/veiculos/novo"
          className="bg-secondary text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          + Novo Veículo
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">Nenhum veículo cadastrado</p>
          <Link
            href="/dashboard/veiculos/novo"
            className="text-secondary font-medium"
          >
            Criar primeiro veículo
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Veículo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Visualizações
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">
                        {vehicle.year} {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-gray-600">{vehicle.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        vehicle.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : vehicle.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    R$ {(vehicle.price_cents / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{vehicle.views_count}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      href={`/dashboard/veiculos/${vehicle.id}/editar`}
                      className="text-secondary hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="text-red-600 hover:underline"
                    >
                      Deletar
                    </button>
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
