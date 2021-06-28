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
        cy.get('#montoSolicitado').type(montoSol);
        cy.get('#cuota').type(pago);
        cy.get('[type="button"]').contains('A la quincena').click();
        cy.wait(2000)
        cy.get('[type="button"]').contains('Simular').click();
        cy.wait(7000)
      })
      it('Validar Volver al simulador Encabezado',function(){
        cy.get('.ant-col-23 > .ant-btn').click()
        cy.get('.ant-typography').contains('Simula tu préstamo')
      })
      it('Validar Volver al simulador Tabla Comparativa',function(){
        cy.get(':nth-child(6) > .ant-btn > span').click()
        cy.get('.ant-typography').contains('Simula tu préstamo')
      })
      it('Validar Volver al simulador Tabla Amortización',function(){
        cy.get(':nth-child(10) > .ant-btn > span').click()
        cy.get('.ant-typography').contains('Simula tu préstamo')
      })
    })