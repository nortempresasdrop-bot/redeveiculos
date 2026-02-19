import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rede Veículos - Plataforma de Anúncios',
  description: 'Plataforma SaaS para anúncios de veículos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
