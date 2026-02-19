'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profile?.role !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setUser(data.user);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/usuarios"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            👥 Usuários
          </Link>
          <Link
            href="/admin/veiculos"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            🚗 Veículos
          </Link>
          <Link
            href="/admin/transacoes"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            💳 Transações
          </Link>
          <Link
            href="/admin/auditoria"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            📋 Auditoria
          </Link>
        </nav>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
          }}
          className="mt-8 w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
