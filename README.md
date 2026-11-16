# Lojinha

Projeto de treino de CI/CD: API de produtos (Node.js + Express + PostgreSQL) e um frontend estático que consome essa API.

```
api/   → API REST (porta 3001)
web/   → página HTML/CSS/JS + testes E2E com Cypress (porta 5173)
```

## API

```bash
cd api
npm install
cp .env.example .env   # preencha DATABASE_URL e DIRECT_URL (Neon)
npm run migrate        # cria a tabela e insere os produtos (idempotente)
npm start
```

| Comando | O que faz | Precisa de banco |
|---|---|---|
| `npm start` | Sobe a API em `PORT` (padrão 3001) | sim |
| `npm run migrate` | Cria a tabela `produtos` e insere os produtos iniciais | sim (`DIRECT_URL`) |
| `npm test` | Testes unitários de `formatarPreco` | não |
| `npm run test:integration` | Roda o migrate e testa `GET /produtos` no banco real | sim |
| `npm run lint` | ESLint | não |

As variáveis são lidas do `.env` (via `node --env-file-if-exists`) ou do ambiente, o que permite que o CI as injete como secrets.

No Neon, `DATABASE_URL` é a connection string **pooled** (host com `-pooler`) e `DIRECT_URL` é a **direta**.

### Endpoints

- `GET /produtos` → `[{ "id": 1, "nome": "Caderno", "preco": "R$ 19,90" }, ...]`
- `GET /health` → `200 {"ok": true}` ou `503 {"ok": false}`

## Frontend

```bash
cd web
npm install
npm start              # serve a página em http://localhost:5173
npm run test:e2e       # sobe o servidor estático e roda o Cypress (a API precisa estar no ar)
```
