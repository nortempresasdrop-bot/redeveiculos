'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🚗 Rede Veículos</h1>
          <nav className="space-x-4">
            <Link href="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
            <Link
              href="/redenovo"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Cadastro
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">
            Encontre o Veículo Perfeito
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Plataforma confiável para compra e venda de veículos
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/redenovo"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Começar Agora
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Por que escolher a Rede Veículos?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-bold mb-2">Seguro</h4>
            <p className="text-gray-600">
              Plataforma verificada com proteção de dados
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold mb-2">Rápido</h4>
            <p className="text-gray-600">
              Anuncie seu veículo em minutos
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-xl font-bold mb-2">Acessível</h4>
            <p className="text-gray-600">
              Planos para todos os orçamentos
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para vender seu veículo?
          </h2>
          <p className="text-lg mb-8">
            Crie sua conta gratuitamente e comece a anunciar
          </p>
          <Link
            href="/redenovo"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Cadastre-se Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Rede Veículos. Todos os direitos reservados.</p>
          <p className="text-gray-400 text-sm mt-2">
            Plataforma SaaS para anúncios de veículos
          </p>
        </div>
      </footer>
    </div>
  );
}
