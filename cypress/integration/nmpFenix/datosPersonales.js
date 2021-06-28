

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop limit exceeded')) {
      return false
    }
  })
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  describe('Ingresar al Simulador', () => {
    
      it('Realizar simulación',function(){
        var min = 5000;
        var max = 150000;
        var x = Math.random()*(max - min)+min;
        x = Math.round(x);
        min = 220;
        max = 150000;
        var y = Math.random()*(max - min)+min;
        y = Math.round(y);
        cy.visit('/simulador')
        cy.get('#montoSolicitado').type(x)
        cy.get('#cuota').type(y)
        cy.get('[type="button"]',{ timeout: 2000 }).contains('A la quincena').click()
        cy.get('[type="button"]',{ timeout: 6000 }).contains('Simular ahora').click()
        cy.wait(2000)
         //Pantalla tabla de Amortización 
        cy.contains('Quiero solicitarlo',{ timeout: 7000 }).click()
        cy.wait(8000)
        cy.get('button[type="button"]').eq(1).click()
      })
      it('Validar Datos de pantalla Acerca de ti',function(){
        //Pantalla Acerca de ti
        cy.wait(13000)
        cy.get('span[class="ant-steps-icon"]').eq(0).should('have.text', '1')
        cy.get('span[class="ant-steps-icon"]').eq(1).should('have.text', '2')
        cy.get('span[class="ant-steps-icon"]').eq(2).should('have.text', '3')
        cy.get('span[class="ant-steps-icon"]').eq(3).should('have.text', '4')
        cy.get('div[class="ant-steps-item-title"]').eq(0).should('have.text', 'Acerca de ti')
        cy.get('div[class="ant-steps-item-title"]').eq(1).should('have.text', 'Oferta')
        cy.get('div[class="ant-steps-item-title"]').eq(2).should('have.text', 'Completa tu expediente')
        cy.get('div[class="ant-steps-item-title"]').eq(3).should('have.text', 'Firma de contrato')
        cy.get('h2[class="ant-typography"]').should('have.text', 'Datos Personales')
        cy.get('.svg-icon.primary').eq(0).should('exist').and('be.not.disabled')
        
      })
      it('Validaciones sección Celular',function(){
        cy.wait(15000)
        cy.get('div[class="ant-card-body"]').eq(0).should('have.text', 'Tu solicitud de préstamo tendrá una vigencia de 30 días naturales. Si transcurrido este tiempo no la has completado tendrás que volver a iniciar tu solicitud con una nueva simulación sujeta a cambios.')
        cy.get('div[class="ant-col ant-col-24"').eq(1).should('have.text', 'Llena los siguientes datos básicos para iniciar')
        cy.get('#phone').should('exist').and('be.not.disabled')
        cy.get('.ant-typography.ml-2.mr-2').should('have.text', '+52')
        cy.get('#email').should('exist').and('be.not.disabled')
        cy.get('.ant-checkbox-input').should('exist').and('be.not.disabled')
        cy.get('.ant-checkbox-input').should('not.be.checked')
        cy.get('#btnSubmit').should('exist').and('be.disabled')
      })
      it('Validaciones Letras y caracteres especiales',function(){
        cy.get('#phone').type('AZXSWEDCVF')
        cy.get('#phone').should('have.value','' )
        cy.get('#phone').type('/&%&/%')
        cy.get('#phone').should('have.value','' )
      })
      
    it('Validaciones Campo Correo',function(){
      cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/credit/looking-by-telephone?*', { fixtures: 'codigo.json' }).as('looking-by-telephone')
         cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/client/validate-cel?*', { fixtures: 'validate.json' }).as('validate-cel')
      cy.fixture('variables.json').as('varDates')
      cy.get('@varDates').then((varDates) =>{
          cy.get('#phone').type(varDates.celularOK)
          cy.wait('@looking-by-telephone')
          cy.get('#email').type(varDates.correoFail)
          //Validar se habilite el botón 
          cy.get('#btnSubmit').should('not.be.disabled')
          cy.get('#btnSubmit').click()
          cy.get('[role="alert"]').should('have.text', 'El formato del correo es inválido, debe contener "@" & ".com"')
        })
      cy.get('#btnSubmit').click()
    })
    it('Validar deshabilite botón al limpiar campo Celular',function(){
      cy.get('#phone').clear()
      cy.get('#btnSubmit').should('be.disabled')
    })
    it('Validaciones Celular Longitud',function(){
        cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/credit/looking-by-telephone?*', { fixtures: 'codigo.json' }).as('looking-by-telephone')
         cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/client/validate-cel?*', { fixtures: 'validate.json' }).as('validate-cel')
        cy.fixture('variables.json').as('varDates')
        cy.get('@varDates').then((varDates) =>{
            cy.get('#phone').type(varDates.celularmax)
            
            .then((result) => {
            const { value } = result[0];
            var c=value.length
            expect(c==10,'Aqui esperamos una longitud máxima de 10').to.equal(true);
            cy.wait('@looking-by-telephone')
        })
        cy.get('#phone').clear()
        cy.get('@varDates').then((varDates) =>{
          cy.get('#phone').type(varDates.celularmin)
        })
        //Validar no se habilite el botón 
        cy.get('#btnSubmit').should('be.disabled')
      })
    })
     
})