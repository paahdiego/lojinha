import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { listarProdutos } from './produtos.js';
import { verificarSaude } from './health.js';
import { openapi } from './openapi.js';

export const app = express();

app.use(cors());

app.get('/produtos', listarProdutos);
app.get('/health', verificarSaude);

app.get('/openapi.json', (req, res) => res.json(openapi));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});
