export default function Home() {
  return (
    <html lang="pt-BR">
      <head>
        <title>Rede Veículos</title>
        <meta name="description" content="Plataforma de anúncios de veículos" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
          {/* Header */}
          <header style={{ background: '#1f2937', color: 'white', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>🚗 Rede Veículos</h1>
              <nav style={{ display: 'flex', gap: '16px' }}>
                <a href="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = '#374151'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  Login
                </a>
                <a href="/redenovo" style={{ background: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'} onMouseOut={(e) => e.currentTarget.style.background = '#3b82f6'}>
                  Cadastro
                </a>
              </nav>
            </div>
          </header>

          {/* Hero Section */}
          <section style={{ background: 'linear-gradient(to right, #1f2937, #1e3a8a)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 16px 0', lineHeight: '1.2' }}>
                Encontre o Veículo Perfeito
              </h2>
              <p style={{ fontSize: '18px', margin: '0 0 32px 0', color: '#e5e7eb', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Plataforma confiável para compra e venda de veículos
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/redenovo" style={{ background: '#3b82f6', color: 'white', padding: '12px 32px', borderRadius: '6px', textDecoration: 'none', fontWeight: '500', fontSize: '16px', transition: 'background 0.3s', display: 'inline-block' }} onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'} onMouseOut={(e) => e.currentTarget.style.background = '#3b82f6'}>
                  Começar Agora
                </a>
                <a href="/login" style={{ background: 'white', color: '#1e3a8a', padding: '12px 32px', borderRadius: '6px', textDecoration: 'none', fontWeight: '500', fontSize: '16px', transition: 'background 0.3s', display: 'inline-block' }} onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                  Já tenho conta
                </a>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px', width: '100%' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px', margin: '0 0 48px 0' }}>
              Por que escolher a Rede Veículos?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { icon: '🔒', title: 'Seguro', desc: 'Plataforma verificada com proteção de dados' },
                { icon: '⚡', title: 'Rápido', desc: 'Anuncie seu veículo em minutos' },
                { icon: '💰', title: 'Acessível', desc: 'Planos para todos os orçamentos' },
              ].map((feature, i) => (
                <div key={i} style={{ background: '#f3f4f6', padding: '32px', borderRadius: '8px', textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1f2937' }}>
                    {feature.title}
                  </h4>
                  <p style={{ color: '#666666', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ background: '#3b82f6', color: 'white', padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
                Pronto para vender seu veículo?
              </h2>
              <p style={{ fontSize: '18px', margin: '0 0 24px 0', color: '#e5e7eb' }}>
                Crie sua conta gratuitamente e comece a anunciar
              </p>
              <a href="/redenovo" style={{ background: 'white', color: '#3b82f6', padding: '12px 32px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                Cadastre-se Agora
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: '#1f2937', color: 'white', padding: '32px 24px', textAlign: 'center', marginTop: 'auto' }}>
            <p style={{ margin: '0 0 8px 0' }}>
              &copy; 2024 Rede Veículos. Todos os direitos reservados.
            </p>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>
              Plataforma SaaS para anúncios de veículos
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
