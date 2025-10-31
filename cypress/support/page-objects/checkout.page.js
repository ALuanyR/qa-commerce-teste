class CheckoutPage {
  //Elementos da página

  get campoNome() {
    return cy.get("#first-name");
  }
  get campoSobrenome() {
    return cy.get("#last-name");
  }
  get campoEndereco() {
    return cy.get("#address");
  }
  get campoNumero() {
    return cy.get("#number");
  }
  get campoCep() {
    return cy.get("#cep");
  }
  get campoTelefone() {
    return cy.get("#phone");
  }
  get campoEmail() {
    return cy.get("#email");
  }
  get checkCriarConta() {
    return cy.get("#create-account");
  }
  get campoSenha() {
    return cy.get("#password");
  }
  get campoConfirmarSenha() {
    return cy.get("#confirm-password");
  }
  get radioBoleto() {
    return cy.get("#payment-boleto");
  }
  get radioPix() {
      return cy.get('#payment-pix');
  }
  get radioCartao() {
    return cy.get('#payment-card');
  }
  get campoNumeroCartao() {
    return cy.get('#card-number')
  }
  get campoValidade() {
    return  cy.get('#card-expiry')
  }
  get campoCvc() {
    return cy.get('#card-cvc')
  }
  get checkTermos() {
    return cy.get("#terms");
  }
  get botaoFinalizar() {
    return cy.get(".btn");
  }

  //Funções da Página

  preencherFomulario(nome, sobrenome, endereco, numero, cep, telefone, email) {
    this.campoNome.type(nome)
    this.campoSobrenome.type(sobrenome)
    this.campoEndereco.type(endereco)
    this.campoNumero.type(numero)
    this.campoCep.type(cep)
    this.campoTelefone.type(telefone)
    this.campoEmail.type(email)
  }

  pagamentoPix() {
    this.radioPix.click()
  }

  pagamentoBoleto() {
    this.radioBoleto.click()
}

 pagamentoCartao(numeroCartao, validade, cvc) {
    this.radioCartao.click()
    this.campoNumeroCartao.type(numeroCartao)
    this.campoValidade.type(validade)
    this.campoCvc.type(cvc)
}

finalizarPedido() {
    this.checkTermos.check()
    this.botaoFinalizar.click()
}

criarConta(senha,confirmarSenha) {
    this.checkCriarConta.check()
    this.campoSenha.type(senha)
    this.campoConfirmarSenha.type(confirmarSenha)

}

}
export default new CheckoutPage();
