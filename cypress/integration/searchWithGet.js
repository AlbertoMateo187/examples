describe('formas de encontrar un elemento', function(){
    it('buscar en el buscador', function(){
        cy.visit('http://automationpractice.com/index.php');
        cy.get('.search_query.form-control.ac_input').type('hola');//buscar campo por Clase .
        cy.get('#search_query_top').type(' como te va'); //buscar campo por Id #
        cy.get('[name="search_query"]').type(' me va muy bien');//buscar por cualquier locator
        cy.get('[placeholder="Search"]').type(' y a ti que tal te va ');//buscar por cualquier locator
        cy.get('[placeholder="Search"]').clear();//borrar lo escrito en el campo
    })
})