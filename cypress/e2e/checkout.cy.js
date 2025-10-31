/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import checkoutPage from "../support/page-objects/checkout.page";

//const { intersectionWith } = require("cypress/types/lodash");

describe("Testes de funcionalidade Checkout", () => {
  beforeEach(() => {
    cy.visit("checkout.html");
  });

  it("Deve fazer checkout completo com sucesso", () => {
    var email = `teste${Date.now()}@gmail.com`;

    cy.get("#first-name").type("Luany");
    cy.get("#last-name").type("Rudic dos Santos");
    cy.get("#address").type("Avenida Paulista");
    cy.get("#number").type("230");
    cy.get("#cep").type("09440120");
    cy.get("#phone").type("11-951488515");
    cy.get("#email").type(email);
    cy.get("#create-account").check();
    cy.get("#password").type("Teste@123");
    cy.get("#confirm-password").type("Teste@123");
    cy.get("#payment-boleto").click();
    cy.get("#terms").check();
    cy.get(".btn").click();
    cy.get("h1").should("contain", "STATUS DO PEDIDO");
    cy.get("h4").should("contain", "Obrigado pelo seu pedido Luany.");
  });

  it("Deve fazer checkout com sucesso - Usando Faker - sem otimização", () => {
    var nome = faker.person.firstName();
    var sobrenome = faker.person.lastName();

    cy.get("#first-name").type(nome);
    cy.get("#last-name").type(sobrenome);
    cy.get("#address").type(faker.location.street());
    cy.get("#number").type(faker.string.numeric(3));
    cy.get("#cep").type(faker.string.numeric(8));
    cy.get("#phone").type("11-951488515");
    cy.get("#email").type(faker.internet.email());
    cy.get("#create-account").check();
    cy.get("#password").type("Teste@123");
    cy.get("#confirm-password").type("Teste@123");
    cy.get("#payment-boleto").click();
    cy.get("#terms").check();
    cy.get(".btn").click();
    cy.get("h1").should("contain", "STATUS DO PEDIDO");
    cy.get("h4").should("contain", "Obrigado pelo seu pedido " + nome);
  });

  it("Deve fazer checkout com sucesso - Usando Pages ", () => {
    checkoutPage.preencherFomulario(
      "Luany",
      "Rudic",
      "Dourados",
      "10",
      "12345678",
      "11-912345678",
      "teste@test.com"
    );
    checkoutPage.radioBoleto.click();
    checkoutPage.checkTermos.check();
    checkoutPage.botaoFinalizar.click();
    cy.get("h1").should("contain", "STATUS DO PEDIDO");
  });

  it("Deve fazer checkout com sucesso com Cartão - Usando Pages ", () => {
    checkoutPage.preencherFomulario(
      "Luany",
      "Rudic",
      "Dourados",
      "10",
      "12345678",
      "11-912345678",
      "teste@test.com"
    );
    checkoutPage.pagamentoCartao("12345678910", "12/2030", "321");
    checkoutPage.finalizarPedido();
    cy.get("h1").should("contain", "STATUS DO PEDIDO");
  });

  it("Deve fazer checkout com sucesso com Cartão, criando conta - Usando Pages ", () => {
    var email = faker.internet.email();
    checkoutPage.preencherFomulario(
      "Luany",
      "Rudic",
      "Dourados",
      "10",
      "12345678",
      "11-912345678",
      email
    );
    checkoutPage.criarConta("Teste@123", "Teste@123");
    checkoutPage.pagamentoCartao("12345678910", "12/2030", "321");
    checkoutPage.finalizarPedido();
    cy.get("h1").should("contain", "STATUS DO PEDIDO");
  });
});
