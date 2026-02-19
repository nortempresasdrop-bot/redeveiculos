'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function NovoVeiculoPage() {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price_cents: 0,
    km: 0,
    fuel: 'gasolina',
    gearbox: 'manual',
    color: '',
    city: '',
    state: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Não autenticado');

      const { error } = await supabase.from('vehicles').insert({
        owner_id: user.user.id,
        status: 'draft',
        ...formData,
      });

      if (error) throw error;

      toast.success('Veículo criado!');
      router.push('/dashboard/veiculos');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Novo Veículo</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Marca</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Modelo</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ano</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preço (R$)</label>
            <input
              type="number"
              value={formData.price_cents / 100}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price_cents: parseInt(e.target.value) * 100,
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">KM</label>
            <input
              type="number"
              value={formData.km}
              onChange={(e) =>
                setFormData({ ...formData, km: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Combustível</label>
            <select
              value={formData.fuel}
              onChange={(e) =>
                setFormData({ ...formData, fuel: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>gasolina</option>
              <option>diesel</option>
              <option>etanol</option>
              <option>hibrido</option>
              <option>eletrico</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Câmbio</label>
            <select
              value={formData.gearbox}
              onChange={(e) =>
                setFormData({ ...formData, gearbox: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>manual</option>
              <option>automatico</option>
              <option>cvt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cor</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cidade</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Veículo'}
        </button>
      </form>
    </div>
  );
}
