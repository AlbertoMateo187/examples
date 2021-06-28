Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop limit exceeded')) {
      return false
    }
  })
  describe('Validar Pantalla Comencemos tu solicitud', () => {
      let montoSol="20000"
      let pago="2000"
      beforeEach(() => {
        cy.visit('/simulador')
        cy.get('#montoSolicitado').type(montoSol)
        cy.get('#cuota').type(pago)
        cy.get('[type="button"]').contains('A la quincena').click()
        cy.wait(2000)
        cy.get('[type="button"]').contains('Simular').click()
        cy.wait(7000)
        cy.get(':nth-child(5) > .ant-btn').click()
        cy.wait(2000)
      })
      it('Validar Íconos y Títulos',function(){
        cy.get('.stepper-icon').should('have.length', 4)
        cy.get('div[class="stepper-title"]').eq(0).should('have.text', 'Acerca de ti')
        cy.get('div[class="stepper-title"]').eq(1).should('have.text', 'Oferta')
        cy.get('div[class="stepper-title"]').eq(2).should('have.text', 'Completa tu expediente')
        cy.get('div[class="stepper-title"]').eq(3).should('have.text', 'Firma de contrato')
        cy.get('h3[class="ant-typography"]').should('have.text', 'Comencemos tu solicitud')
        cy.get('span[class="ant-typography"]').eq(0).should('have.text', 'En poco tiempo lograrás tus sueños')
        cy.get('[type="button"]').should('have.text', 'Iniciar mi solicitud').and('be.not.disabled')
        cy.get('.svg-icon.primary').should('exist')
      })
    })