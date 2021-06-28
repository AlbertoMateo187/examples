Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop limit exceeded')) {
      return false
    }
  })
  describe('Ingresar al Simulador', () => {
      let url="https://dev1775-prestamosimple-fenix.mybluemix.net/simulador"
      let montoSol="20000"
      let pago="2000"
      let montoPres
      let c
      it('Validar Cantidad Solicitada en Simulación Mensual',function(){
        cy.visit(url);
        cy.get('#montoSolicitado').type(montoSol);
        cy.get('#cuota').type(pago)
        cy.get('[type="button"]').contains('Simular').click();
        cy.wait(7000)
        cy.get('[class="ant-typography text-primary"]').then(($monto)=> {
            montoPres=$monto.text()
            montoPres=montoPres.replace(/,/g, "");
            montoPres=montoPres.replace(/[$.]/g,'');
            expect(montoPres).to.equal(montoSol)
        }) 
    })
   
    it('Validar Tabla Comparativa',function(){
        cy.contains('Tabla comparativa')
        cy.contains('Pago mensual')
        cy.contains('Plazo')
        cy.contains('Préstamo Simple')
        cy.contains('Competencia')
        cy.contains('Ahorra')
        cy.contains('en tu Préstamo Simple de Financiera Monte de Piedad')
        cy.get(':nth-child(5) > .ant-btn > span').should('exist').and('be.not.disabled')
        cy.get(':nth-child(6) > .ant-btn > span').should('exist').and('be.not.disabled')
        cy.get('.ant-col-xs-24 > .ant-row > :nth-child(8)').then(($meses)=>{
            c=$meses.text()
            cy.log(c)
            c=c.slice(0, 2);
            cy.log(c)
        })
        })
        it('Validar Tabla Amortización',function(){
            cy.contains('Interés total')
            cy.contains('Interés total')
            cy.contains('Tasa anual*')
            cy.contains('Tabla de amortización')
            cy.contains('Mes')
            cy.contains('Monto')
            cy.contains('Capital')
            cy.contains('Interés')
            cy.contains('Pago') 
            cy.contains('Nuestra oferta está calculada con el CAT promedio de 63.2%*. Los datos mostrados se usan para fines informativos y de comparación exclusivamente, la tasa anual no incluye I.V.A. y puede variar dependiendo del proceso de evaluación.')
            cy.get(':nth-child(9) > .ant-btn > span').should('exist').and('be.not.disabled')
            cy.get(':nth-child(10) > .ant-btn > span').should('exist').and('be.not.disabled') 
              
        })
        it('Validar Ver más y Ver menos',function(){
            cy.contains('Ver más').should('exist').and('be.not.disabled')
            cy.get(':nth-child(3) > .ant-col > .ant-btn').click()
            cy.contains('Ver menos').should('exist').and('be.not.disabled')
            cy.get(':nth-child(3) > .ant-col > .ant-btn').click()
            cy.contains('Ver más').should('exist').and('be.not.disabled')
        })
        it('Validar cantidad de meses',function(){
            cy.get(':nth-child(3) > .ant-col > .ant-btn').click()
            cy.get('[data-row-key="'+c+'"] > :nth-child(1)').should('exist')
        })
})
  