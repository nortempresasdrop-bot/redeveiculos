'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  status: string;
  owner_id: string;
}

export default function VeiculosAdminPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      const { data } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      setVehicles(data || []);
      setLoading(false);
    }

    fetchVehicles();
  }, []);

  async function approveVehicle(id: string) {
    const { error } = await supabase
      .from('vehicles')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      toast.success('Veículo aprovado!');
      setVehicles(vehicles.map((v) => (v.id === id ? { ...v, status: 'published' } : v)));
    }
  }

  async function rejectVehicle(id: string) {
    const { error } = await supabase
      .from('vehicles')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (!error) {
      toast.success('Veículo rejeitado!');
      setVehicles(vehicles.map((v) => (v.id === id ? { ...v, status: 'rejected' } : v)));
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Veículos</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Veículo</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {vehicle.year} {vehicle.brand} {vehicle.model}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded text-sm bg-yellow-100 text-yellow-800">
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  {vehicle.status === 'pending_review' && (
                    <>
                      <button
                        onClick={() => approveVehicle(vehicle.id)}
                        className="text-green-600 hover:underline"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => rejectVehicle(vehicle.id)}
                        className="text-red-600 hover:underline"
                      >
                        Rejeitar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
