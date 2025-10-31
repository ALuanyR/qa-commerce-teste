/// <reference types="cypress" />

describe('Testes da Funcionalidade Vitrine', () => {
    
    beforeEach(() => {
        cy.visit('/')
    })
    
    it('Deve buscar um produto por nome', () => {
        cy.contains('Moletom com capuz').click()
        cy.get('.btn-secondary').should('exist')
    });

    it('Deve clicar no primeiro produto da lista', () => {
        cy.get('.card-img-top').first().click()
        cy.url().should('include','product.html')
    });

    it('Deve clicar no último produto da lista', () => {
        cy.get('.card-img-top').last().click()
        cy.url().should('include','product.html')
        cy.get('legend').should('contain','Moletom com capuz "Const"' )
    });

    it('Deve clicar no terceiro produto da lista', () => {
        cy.get('.card-img-top').eq(2).click()
        cy.get('legend').should('contain','Ecobag "Na minha máquina funciona"')
    });

    it('Deve clicar no quinto produto da lista', () => {
        cy.get('.card-img-top').eq(4).click()
        cy.get('legend').should('contain','Garrafa "Testar é o único lugar onde falhar é realmente uma vitória!"')
    });

    it('Deve buscar um produto usando massa de dados', () => {
        cy.fixture('produto-unico').then(item => {
            cy.contains(item.produto).click()
            cy.get('#product-description').should('contain',item.descricao)
        })
    });

    it('Deve buscar vários produtos de uma lista de massa de dados', () => {
        cy.fixture('multiplos-produtos').then(item => { 
            item.forEach(prod => {
                cy.contains(prod.produto).click()
                cy.get('#product-description').should('contain', prod.descricao)
                cy.get('.btn-secondary').click()
        

            })
        })
    });

});