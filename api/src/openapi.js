const Produto = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    nome: { type: 'string', example: 'Caderno' },
    preco: { type: 'string', description: 'Preço formatado em reais', example: 'R$ 19,90' },
  },
  required: ['id', 'nome', 'preco'],
};

export const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'API da Lojinha',
    version: '1.0.0',
    description: 'Consulta de produtos da Lojinha.',
  },
  paths: {
    '/produtos': {
      get: {
        summary: 'Lista os produtos ordenados por id',
        responses: {
          200: {
            description: 'Lista de produtos',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Produto' } },
              },
            },
          },
          500: {
            description: 'Erro ao consultar o banco',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Erro' },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        summary: 'Verifica a conexão com o banco',
        responses: {
          200: {
            description: 'Banco acessível',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Saude' }, example: { ok: true } } },
          },
          503: {
            description: 'Banco inacessível',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Saude' }, example: { ok: false } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Produto,
      Saude: {
        type: 'object',
        properties: { ok: { type: 'boolean' } },
        required: ['ok'],
      },
      Erro: {
        type: 'object',
        properties: { erro: { type: 'string', example: 'Erro interno do servidor' } },
      },
    },
  },
};
