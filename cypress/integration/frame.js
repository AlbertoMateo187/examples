describe('Prueba para entrar en un frame',function(){
    
    it('Go to women section',function(){
        cy.visit('https://the-internet.herokuapp.com/tinymce');
        //cy.get(':nth-child(1) > .tox-mbtn__select-label').click();
        //cy.get('.tox-collection__item-label').click();
        cy.get('#mce_0_ifr').then(function($iframe){
            const iframeContent=$iframe.contents().find('body')

            cy.wrap(iframeContent)
            .clear()
            .type('hello')
        })
        cy.get(':nth-child(1) > .tox-mbtn__select-label').click();
        cy.get('.tox-collection__item-label').click();
        cy.get('h3').contains('WYSIWYG ');
    })
})