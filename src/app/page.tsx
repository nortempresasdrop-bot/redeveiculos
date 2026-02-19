export default function Home() {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <header style={{ background: '#1f2937', color: 'white', padding: '20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>🚗 Rede Veículos</h1>
              <nav style={{ display: 'flex', gap: '20px' }}>
                <a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a>
                <a href="/redenovo" style={{ background: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none' }}>Cadastro</a>
              </nav>
            </div>
          </header>

          {/* Hero */}
          <section style={{ background: 'linear-gradient(to right, #1f2937, #1e3a8a)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Encontre o Veículo Perfeito</h2>
              <p style={{ fontSize: '18px', margin: '0 0 30px 0', color: '#e5e7eb' }}>Plataforma confiável para compra e venda de veículos</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <a href="/redenovo" style={{ background: '#3b82f6', color: 'white', padding: '12px 30px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Começar Agora</a>
                <a href="/login" style={{ background: 'white', color: '#1e3a8a', padding: '12px 30px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Já tenho conta</a>
              </div>
            </div>
          </section>

          {/* Features */}
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>Por que escolher a Rede Veículos?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div style={{ background: '#f3f4f6', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔒</div>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Seguro</h4>
                <p style={{ color: '#666', margin: 0 }}>Plataforma verificada com proteção de dados</p>
              </div>
              <div style={{ background: '#f3f4f6', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚡</div>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Rápido</h4>
                <p style={{ color: '#666', margin: 0 }}>Anuncie seu veículo em minutos</p>
              </div>
              <div style={{ background: '#f3f4f6', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>💰</div>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Acessível</h4>
                <p style={{ color: '#666', margin: 0 }}>Planos para todos os orçamentos</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: '#3b82f6', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 15px 0' }}>Pronto para vender seu veículo?</h2>
              <p style={{ fontSize: '18px', margin: '0 0 20px 0' }}>Crie sua conta gratuitamente e comece a anunciar</p>
              <a href="/redenovo" style={{ background: 'white', color: '#3b82f6', padding: '12px 30px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Cadastre-se Agora</a>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: '#1f2937', color: 'white', padding: '30px 20px', textAlign: 'center', marginTop: 'auto' }}>
            <p style={{ margin: 0 }}>&copy; 2024 Rede Veículos. Todos os direitos reservados.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
