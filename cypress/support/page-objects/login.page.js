class LoginPage {

    //Elementos da página
    
    get campoEmail() {
        return cy.get('#email')
    }

    get campoSenha() {
        return cy.get('#password')
    }
    
    get botaoEntrar() {
        return cy.get('.btn')
    }

    //Funções da página
    visitarUrl() {
        cy.visit('login.html')
    }

    fazerLogin(email, senha) {
        this.visitarUrl()
        this.campoEmail.type(email)
        this.campoSenha.type(senha)
        this.botaoEntrar.click()

    }

}

export default new LoginPage();