const API_URL = 'http://localhost:3001/produtos';

async function buscarProdutos() {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) {
    throw new Error(`Falha HTTP ${resposta.status}`);
  }
  return resposta.json();
}

function renderizarProdutos(produtos) {
  const lista = document.getElementById('produtos');
  lista.replaceChildren();

  for (const produto of produtos) {
    const item = document.createElement('li');

    const nome = document.createElement('span');
    nome.className = 'nome';
    nome.textContent = `${produto.nome}:`;

    const preco = document.createElement('span');
    preco.className = 'preco';
    preco.textContent = produto.preco;

    item.append(nome, ' ', preco);
    lista.append(item);
  }
}

async function iniciar() {
  const mensagem = document.getElementById('mensagem');
  try {
    const produtos = await buscarProdutos();
    renderizarProdutos(produtos);
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = 'Não foi possível carregar os produtos. Tente novamente mais tarde.';
  }
}

iniciar();
