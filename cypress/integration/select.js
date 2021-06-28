describe('Prueba de select',function(){
    beforeEach(function(){
        cy.visit('http://automationpractice.com/index.php?id_category=3&controller=category');
    })
    it('Orden by High Price',function(){
        cy.get('#selectProductSort').select('Price: Highest first');
    })
})
    