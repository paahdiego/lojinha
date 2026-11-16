import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';
import { pool } from '../src/db.js';

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://localhost:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

test('GET /produtos retorna os três produtos com preço formatado', async () => {
  const res = await fetch(`${baseUrl}/produtos`);

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), [
    { id: 1, nome: 'Caderno', preco: 'R$ 19,90' },
    { id: 2, nome: 'Caneta', preco: 'R$ 4,50' },
    { id: 3, nome: 'Mochila', preco: 'R$ 89,90' },
  ]);
});
