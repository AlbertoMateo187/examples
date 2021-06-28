describe('Go to different sections',function(){
    beforeEach(function(){
        cy.visit('http://automationpractice.com/index.php');
    })
    it('Go to women section',function(){
        cy.get('.sf-with-ul').first().click();//seleccionar el primer elemento de la lista con mismo locator
    })
    it('Go to dress section',function(){
        cy.get('.sf-with-ul').eq(1).click();//seleccionar el elemento que queremos 
    })
})