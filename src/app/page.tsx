'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price_cents: number;
  city: string;
  km: number;
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(12);

      if (!error) {
        setVehicles(data || []);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rede Veículos</h1>
          <nav className="space-x-4">
            <Link href="/login" className="hover:text-secondary">
              Login
            </Link>
            <Link href="/redenovo" className="bg-secondary px-4 py-2 rounded">
              Cadastro
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Encontre o Veículo Perfeito
          </h2>
          <p className="text-lg mb-8">
            Plataforma confiável para compra e venda de veículos
          </p>
          <input
            type="text"
            placeholder="Buscar por marca, modelo..."
            className="w-full max-w-md px-4 py-3 rounded text-black"
          />
        </div>
      </section>

      {/* Veículos */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-2xl font-bold mb-8">Veículos em Destaque</h3>

        {loading ? (
          <p>Carregando...</p>
        ) : vehicles.length === 0 ? (
          <p>Nenhum veículo disponível</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/veiculos/${vehicle.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <h4 className="font-bold text-lg">
                  {vehicle.year} {vehicle.brand} {vehicle.model}
                </h4>
                <p className="text-gray-600">{vehicle.city}</p>
                <p className="text-secondary font-bold mt-2">
                  R$ {(vehicle.price_cents / 100).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{vehicle.km} km</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Rede Veículos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
