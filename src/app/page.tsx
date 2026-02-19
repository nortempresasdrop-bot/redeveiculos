export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🚗 Rede Veículos</h1>
      <p>Plataforma de anúncios de veículos</p>
      <a href="/login" style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Login
      </a>
      <a href="/redenovo" style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Cadastro
      </a>
    </div>
  );
}
