/// <reference types="cypress" />
import loginPage from "../support/page-objects/login.page"

describe('Teste da funcionalidade Login', () => {

  beforeEach(() => {
    cy.visit('login.html')
  });

  afterEach(() => {
    //cy.screenshot()
  });

  it('Deve fazer login com sucesso - Usando Pages', () => {
    loginPage.fazerLogin('admin@admin.com', 'admin')
    cy.url().should('include', 'dashboard.html');
  });

  it('Deve fazer login com sucesso - Usando Comandos customizados', () => {
    cy.login(Cypress.env('usuario'),Cypress.env('senha'))
    cy.url().should('include', 'dashboard.html');

  });

  it('Deve fazer logout com sucesso - Usando Comandos Customizados', () => {
    cy.login('admin@admin.com', 'admin')
    cy.get('#logout-button').click()
    cy.get('h1').should('contain','LOGIN')
  }); 

  it('Deve exibir uma mensagem de erro quando inserir usuário inexistente ', () => {
    cy.login('luany@teste.com', 'admin')
    cy.get('#error-container').should('contain.text','Email ou senha incorretos.')
  });

  it('Deve exibir uma mensagem de erro quando inserir senha inválida', () => {
    cy.login('admin@admin.com', 'senhaErrada')
    cy.get('#error-container').should('contain.text','Email ou senha incorretos.')
  });

  it('Deve exibir uma mensagem de erro ao clicar em Entrar sem preencher Email', () => {
    cy.login(' ', 'admin')
    cy.contains('Por favor, insira um email válido.').should('exist')
  });

  it('Deve exibir uma mensagem de erro ao clicar em Entrar sem preencher a senha', () => {
    cy.get('#email').type('admin@admin.com')
    cy.get('.btn').click()
    cy.contains('Por favor, insira a senha.').should('exist')
  });

})