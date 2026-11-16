import pg from 'pg';

const client = new pg.Client({ connectionString: process.env.DIRECT_URL });

try {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS produtos (
      id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      nome  TEXT NOT NULL UNIQUE,
      preco NUMERIC(10, 2) NOT NULL
    )
  `);

  await client.query(`
    INSERT INTO produtos (nome, preco) VALUES
      ('Caderno', 19.90),
      ('Caneta', 4.50),
      ('Mochila', 89.90)
    ON CONFLICT (nome) DO NOTHING
  `);

  console.log('Migração concluída.');
} catch (err) {
  console.error('Falha na migração:', err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
