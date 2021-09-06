describe('Banner link', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('redirects to homepage when clicked', () => {
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Create a new recipe').click()
        cy.contains('Add a new recipe').should('be.visible')
        cy.contains('Recipe Manager').click()
        cy.contains('My Recipes').should('be.visible')
    })
})