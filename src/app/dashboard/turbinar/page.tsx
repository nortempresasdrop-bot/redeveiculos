'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
}

export default function TurbinarPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', user.user.id)
        .eq('status', 'published');

      setVehicles(data || []);
      setLoading(false);
    }

    fetchVehicles();
  }, []);

  async function handleBoost(vehicleId: string) {
    toast.success('Boost ativado por 7 dias!');
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Turbinar Anúncio</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">O que é Turbinar?</h2>
        <p className="text-blue-800">
          Coloque seu veículo em destaque por 7 dias por apenas R$ 5,99
        </p>
      </div>

      {vehicles.length === 0 ? (
        <p>Nenhum veículo publicado</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-2">
                {vehicle.year} {vehicle.brand} {vehicle.model}
              </h3>
              <p className="text-gray-600 mb-4">{vehicle.title}</p>
              <button
                onClick={() => handleBoost(vehicle.id)}
                className="w-full bg-secondary text-white py-2 rounded hover:bg-blue-600"
              >
                Turbinar por R$ 5,99
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
