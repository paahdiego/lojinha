import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatarPreco } from '../src/preco.js';

test('formata 19.9 como R$ 19,90', () => {
  assert.equal(formatarPreco(19.9), 'R$ 19,90');
});

test('formata 4.5 como R$ 4,50', () => {
  assert.equal(formatarPreco(4.5), 'R$ 4,50');
});

test('aceita string vinda do PostgreSQL (NUMERIC)', () => {
  assert.equal(formatarPreco('89.90'), 'R$ 89,90');
});
