# Lojinha

Projeto de treino de CI/CD: API de produtos (Node.js + Express + PostgreSQL) e um frontend estático que consome essa API.

```
api/   → API REST (porta 3001)
web/   → página HTML/CSS/JS + testes E2E com Cypress (porta 5173)
```

## Subindo tudo com Docker Compose

```bash
docker compose up -d --build --wait
```

| Serviço | Endereço | O que é |
|---|---|---|
| `web` | http://localhost:5173 | Frontend (nginx) |
| `api` | http://localhost:3001 | API |
| | http://localhost:3001/docs | Swagger UI |
| | http://localhost:3001/openapi.json | Especificação OpenAPI |
| `db` | `localhost:55432` (postgres/postgres, banco `lojinha`) | PostgreSQL 16 |
| `migrate` | — | Roda o migrate uma vez e sai; a API só sobe depois dele |

Testes apontando para o banco do compose (variáveis do ambiente têm prioridade sobre o `.env`):

```bash
cd api
DATABASE_URL=postgres://postgres:postgres@localhost:55432/lojinha \
DIRECT_URL=postgres://postgres:postgres@localhost:55432/lojinha \
npm run test:integration

cd ../web && npx cypress run   # usa o frontend e a API do compose
```

Para parar: `docker compose down` (adicione `-v` para apagar os dados do banco).

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

No Neon, `DATABASE_URL` é a connection string **pooled** (host com `-pooler`) e `DIRECT_URL` é a **direta**. Troque `sslmode=require` por `sslmode=verify-full` para evitar o aviso de segurança do `pg`.

### Endpoints

Documentação interativa em `/docs` (Swagger UI).


- `GET /produtos` → `[{ "id": 1, "nome": "Caderno", "preco": "R$ 19,90" }, ...]`
- `GET /health` → `200 {"ok": true}` ou `503 {"ok": false}`

## Frontend

```bash
cd web
npm install
npm start              # serve a página em http://localhost:5173
npm run test:e2e       # sobe o servidor estático e roda o Cypress (a API precisa estar no ar)
```
