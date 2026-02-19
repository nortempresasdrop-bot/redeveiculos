import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

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
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
