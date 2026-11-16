import express from 'express';
import cors from 'cors';
import { listarProdutos } from './produtos.js';
import { verificarSaude } from './health.js';

export const app = express();

app.use(cors());

app.get('/produtos', listarProdutos);
app.get('/health', verificarSaude);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});
