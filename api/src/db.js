import pg from 'pg';

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});

// Sem este listener, uma conexão ociosa derrubada pelo banco
// (ex.: Neon suspendendo o compute) encerra o processo inteiro.
pool.on('error', (err) => {
  console.error('Erro em conexão ociosa do pool:', err.message);
});
