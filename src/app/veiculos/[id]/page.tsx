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
  price_cents: number;
  km: number;
  fuel: string;
  gearbox: string;
  color: string;
  city: string;
  state: string;
  description: string;
  owner: {
    whatsapp_number: string;
    name: string;
  };
}

export default function VeiculoPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchVehicle() {
      const { data } = await supabase
        .from('vehicles')
        .select('*, owner:profiles(whatsapp_number, name)')
        .eq('id', params.id)
        .eq('status', 'published')
        .single();

      setVehicle(data);
      setLoading(false);
    }

    fetchVehicle();
  }, [params.id]);

  async function handleSubmitLead(e: React.FormEvent) {
    e.preventDefault();

    if (!vehicle) return;

    const { error } = await supabase.from('leads').insert({
      vehicle_id: vehicle.id,
      owner_id: vehicle.owner.id,
      buyer_name: buyerName,
      buyer_phone: buyerPhone,
      buyer_email: buyerEmail,
      message,
      status: 'new',
      source: 'form',
    });

    if (!error) {
      toast.success('Lead enviado com sucesso!');
      setBuyerName('');
      setBuyerPhone('');
      setBuyerEmail('');
      setMessage('');
    } else {
      toast.error('Erro ao enviar lead');
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>;
  if (!vehicle) return <div className="p-8">Veículo não encontrado</div>;

  const whatsappUrl = `https://wa.me/${vehicle.owner.whatsapp_number.replace(/\D/g, '')}?text=Olá, vi o veículo ${vehicle.year} ${vehicle.brand} ${vehicle.model} no Rede Veículos. Tenho interesse!`;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-primary text-white py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Rede Veículos</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagem */}
          <div className="bg-gray-200 h-96 rounded-lg"></div>

          {/* Detalhes */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-gray-600 mb-4">{vehicle.title}</p>

            <div className="bg-secondary text-white p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-200">Preço</p>
              <p className="text-4xl font-bold">
                R$ {(vehicle.price_cents / 100).toFixed(2)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">KM</p>
                <p className="font-bold">{vehicle.km}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">Combustível</p>
                <p className="font-bold">{vehicle.fuel}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">Câmbio</p>
                <p className="font-bold">{vehicle.gearbox}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">Cor</p>
                <p className="font-bold">{vehicle.color}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white py-3 rounded-lg text-center font-medium hover:bg-green-600"
              >
                💬 Contatar via WhatsApp
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById('form-lead')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-blue-600"
              >
                📧 Enviar Mensagem
              </button>
            </div>

            <div className="text-sm text-gray-600">
              <p>📍 {vehicle.city}, {vehicle.state}</p>
              <p>👤 {vehicle.owner.name}</p>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-12 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Descrição</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{vehicle.description}</p>
        </div>

        {/* Formulário de Lead */}
        <div id="form-lead" className="mt-12 max-w-2xl bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Enviar Mensagem</h2>

          <form onSubmit={handleSubmitLead} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mensagem</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
