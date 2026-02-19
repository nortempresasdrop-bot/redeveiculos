'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.user.id)
        .single();

      setProfile(data);
      setWhatsapp(data?.whatsapp_number || '');
      setLoading(false);
    }

    fetchProfile();
  }, []);

  async function handleSave() {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ whatsapp_number: whatsapp })
      .eq('id', user.user.id);

    if (!error) {
      toast.success('Configurações salvas!');
    } else {
      toast.error('Erro ao salvar');
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Configurações</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            WhatsApp para Contato
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+55 11 98850-2098"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <p className="text-xs text-gray-500 mt-2">
            Este número será usado nos CTAs de contato
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-secondary text-white py-2 rounded hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
