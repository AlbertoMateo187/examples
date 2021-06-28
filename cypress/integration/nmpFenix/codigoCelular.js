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
    var min = 5000;
    var max = 150000;
    var x = Math.random()*(max - min)+min;
    var a;
    x = Math.round(x);
    min = 220;
    max = 150000;
    var y = Math.random()*(max - min)+min;
    y = Math.round(y);
      it('Flujo para llegar al código',function(){
        cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/credit/looking-by-telephone?*', { fixtures: 'codigo.json' }).as('looking-by-telephone')
        cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/client/validate-cel?*', { fixtures: 'validate.json' }).as('validate-cel')
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
        cy.wait(13000)
        cy.fixture('variables.json').as('varDates')
        cy.get('@varDates').then((varDates) =>{
            cy.get('#phone').type(varDates.celularOK)
            a=varDates.celularOK
            cy.wait('@looking-by-telephone')
            cy.get('#btnSubmit').should('have.text', 'Aceptar y continuar')
            cy.get('#btnSubmit').click()
            cy.wait('@validate-cel')
        })
    })
        it('Validar Textos pantalla Código celular',function(){
            cy.get('span[class="ant-typography"]').eq(4).should('have.text', a)
            cy.get('span[class="ant-typography"]').eq(5).should('have.text', '¿No recibiste el código?')
            cy.get('.ant-typography.primary-color').should('have.text', 'Reenviar código')
        })
        it('Validar campos Código',function(){
            cy.get('#field-0').should('exist')
            cy.get('#field-1').should('exist')
            cy.get('#field-2').should('exist')
            cy.get('#field-3').should('exist')
            cy.get('#field-4').should('exist')
        })/*
        it('Validar tipos de Datos',function(){
            cy.get('#field-0').type('A')
            cy.get('#field-0').should('have.text','')
            cy.get('#field-1').type('A').should('have.text',' ')
            cy.get('#field-2').type('A').should('have.text',' ')
            cy.get('#field-3').type('A').should('have.text',' ')
            cy.get('#field-4').type('A').should('have.text',' ')
            cy.get('#field-0').type('/').should('have.text',' ')
            cy.get('#field-1').type('&').should('have.text',' ')
            cy.get('#field-2').type('(').should('have.text',' ')
            cy.get('#field-3').type('#').should('have.text',' ')
            cy.get('#field-4').type('?').should('have.text',' ')
        })*/
        it('Validar tipos de Datos',function(){
            cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/client/code-verification?*', { fixtures: 'codeVerification.json'  }).as('code-verification')
            cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/create-user/save-progress?', { fixtures: 'saveProgress' }).as('save-progress')
            cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/personal-data/get-id-proccess?', { fixtures: 'getProcess.json' }).as('get-id-process')
            cy.get('#field-0').type('5')
            cy.get('#field-1').type('5')
            cy.get('#field-2').type('5')
            cy.get('#field-3').type('5')
            cy.get('#field-4').type('5')
            cy.wait('@code-verification')
            cy.wait('@save-progress')
            cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/datos-personales/subir-identificacion')
        })
    })