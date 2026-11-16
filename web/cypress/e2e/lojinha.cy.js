describe('Lojinha', () => {
  it('exibe os três produtos vindos do backend', () => {
    cy.visit('/');

    cy.get('[data-cy=produtos] li').should('have.length', 3);

    const esperados = [
      ['Caderno:', 'R$ 19,90'],
      ['Caneta:', 'R$ 4,50'],
      ['Mochila:', 'R$ 89,90'],
    ];

    cy.get('[data-cy=produtos] li').each((item, i) => {
      cy.wrap(item).find('.nome').should('have.text', esperados[i][0]);
      cy.wrap(item).find('.preco').should('have.text', esperados[i][1]);
    });
  });
});

describe('Lojinha com backend indisponível', () => {
  it('mostra mensagem de erro quando a API falha', () => {
    cy.intercept('GET', 'http://localhost:3001/produtos', { forceNetworkError: true });
    cy.visit('/');

    cy.get('#mensagem').should('contain.text', 'Não foi possível carregar os produtos');
    cy.get('[data-cy=produtos] li').should('have.length', 0);
  });
});
