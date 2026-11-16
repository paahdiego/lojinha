import { pool } from './db.js';
import { formatarPreco } from './preco.js';

export async function listarProdutos(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT id, nome, preco FROM produtos ORDER BY id',
    );
    res.json(
      rows.map((p) => ({ id: p.id, nome: p.nome, preco: formatarPreco(p.preco) })),
    );
  } catch (err) {
    next(err);
  }
}
