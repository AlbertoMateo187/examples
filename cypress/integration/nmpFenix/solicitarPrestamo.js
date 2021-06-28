Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop limit exceeded')) {
      return false
    }
  })
  describe('Ingresar al Simulador', () => {
      let url="https://dev1775-prestamosimple-fenix.mybluemix.net/simulador"
      let montoSol="20000"
      let pago="2000"
      beforeEach(() => {
        cy.visit(url)
        cy.get('#montoSolicitado').type(montoSol)
        cy.get('#cuota').type(pago)
        cy.screenshot('test',{blackout:['#cuota']})
        cy.get('[type="button"]').contains('A la quincena').click()
        cy.wait(2000)
        cy.get('[type="button"]').contains('Simular').click()
        cy.wait(10000)
      })
      it('Validar Quiero Solicitarlo Tabla Comparativa',function(){
        cy.get(':nth-child(5) > .ant-btn').click()
        cy.get('.pt-4 > .ant-col-22 > [style="row-gap: 0px;"] > :nth-child(2)').contains('Comencemos tu solicitud')
      })
      it('Validar Quiero Solicitarlo Tabla Amortización',function(){
        cy.get(':nth-child(9) > .ant-btn').click()
        cy.get('.pt-4 > .ant-col-22 > [style="row-gap: 0px;"] > :nth-child(2)').contains('Comencemos tu solicitud')
      })
  })