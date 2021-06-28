

/*
describe('Capturar horas', function(){
    beforeEach(() => {
        cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/simulador')
      })
      
    

  it('Valida monto Máximo',function(){
    cy.wait(900)
    cy.get('#montoSolicitado').type('200000');
    cy.get('[role="alert"]').contains('El valór máximo es 150000');
  })
  it('Validar monto Mínimo',function(){
    cy.wait(900)
    cy.get('#montoSolicitado').type('200');
    cy.get('[role="alert"]').contains('El valór mínimo es 5000');
    cy.get('#montoSolicitado').clear();
    

  })
  it('Solicitar prestamo Pagar',function(){
    cy.wait(900)
    cy.get('#montoSolicitado').type('20000');
    cy.get('#cuota').type('200');
    cy.get('[role="alert"]').contains('El valór mínimo es 220'); 
  })
  
  it('Simulación Quincenal',function(){
    cy.wait(900)
    cy.get('#montoSolicitado').type('20000');
    cy.get('#cuota').type('2000');
    cy.get('[type="button"]').contains('A la quincena').click();
    cy.contains('button', 'Simular').should('be.enabled').click()
    cy.get('[type="button"]').contains('Simular').click();
    cy.wait(1400)
  })
  })*/
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
      //beforeEach(function(){
        //cy.visit(url);
    //})
    /*
    it('Ingresar al Simulador', () => {
        cy.visit(url)
     })
      it('Debe mostrar el formulario del simulador', () => {
        cy.contains('¿Cuánto necesitas?')
        cy.contains('¿Cuánto puedes pagar?')
        cy.contains('Al mes')
        cy.contains('A la quincena')
        cy.contains('Simular ahora')
      })
      it('Error en el monto mínimo de cuanto necesitas', () => {
        
        cy.get('#montoSolicitado').type('1')
        cy.contains('El valór mínimo es 5000')
      })
      it('Error en el monto máximo de cuanto necesitas', () => {
        
        cy.get('#montoSolicitado').type('150001')
        cy.contains('El valór máximo es 15000')
      })
      it('Error en el monto mínimo de Cuanto puedes pagar', () => {
        
        cy.get('#montoSolicitado').type('15000')
        cy.get('#cuota').type('219.99')
        cy.contains('El valór mínimo es 220')
      })
      it('Error en el tipo de valor Ingresado', () => {
        
        cy.get('#montoSolicitado').type('30000').clear()
        //cy.get('#cuota').type('QAXS')
        cy.contains('Solo estan permitido los valores numéricos')
        cy.get('#montoSolicitado').type('30000')
        cy.get('#cuota').type('2300').clear()
        cy.contains('Solo estan permitido los valores numéricos')
      })
      it('Simulación Mensual',function(){
        cy.get('#montoSolicitado').type('20000');
        cy.get('#cuota').type('2000');
        cy.get('[type="button"]').contains('Simular').click();
      })
      it('Simulación Quincenal',function(){
        cy.wait(900)
        cy.get('#montoSolicitado').type('20000');
        cy.get('#cuota').type('2000');
        cy.get('[type="button"]').contains('A la quincena').click();
        cy.get('[type="button"]').contains('Simular').click();
      })
      */
      it('Validar Cantidad Solicitada en Simulación Mensual',function(){
        cy.visit(url);
        cy.get('#montoSolicitado').type(montoSol);
        cy.get('#cuota').type(pago);
        cy.get('[type="button"]').contains('Simular').click();
        cy.wait(6000)
        cy.get('[class="ant-typography text-primary"]').then(($monto)=> {
            montoPres=$monto.text()
            cy.log(montoPres)
            montoPres=montoPres.replace(/,/g, "");
            montoPres=montoPres.replace(/[$.]/g,'');
            expect(montoPres).to.equal(montoSol)
        }) 
        //Validar presencia de botones
        cy.get(':nth-child(5) > .ant-btn > span').should('exist')
        cy.get(':nth-child(6) > .ant-btn > span').should('exist')
        cy.get(':nth-child(9) > .ant-btn > span').should('exist')
         cy.get(':nth-child(10) > .ant-btn > span').should('exist')
         //Validar Tablas
         cy.get('.center > :nth-child(4)').should('exist')
         cy.get('.center > :nth-child(7)').should('exist')
         //Validar opción Ver Mas
         cy.contains('Ver más').should('exist')
         //Validar Montos Tabla Comparativa
         cy.get('.ant-col-xs-24 > .ant-row > :nth-child(4)').then(($pagMensual)=>{
        cy.get('.ant-col-xs-24 > .ant-row > :nth-child(5)').then(($pagMensualC)=>{
            var pagMensual=$pagMensual.text()  
            pagMensual=pagMensual.replace(/,/g, "");
            pagMensual=pagMensual.replace(/[$.]/g,'');
            var pagMensualC=$pagMensualC.text()  
            pagMensualC=pagMensualC.replace(/,/g, "");
            pagMensualC=pagMensualC.replace(/[$.]/g,'');
            //expect(pagMensual>pagMensualC).to.be.true;
            var Compe=parseInt(pagMensualC, 10)
            var Monte=parseInt(pagMensual, 10)
            expect(Monte,'EL pago mensual es menor en Monte').to.be.lessThan(Compe);
         })
        })
         
         cy.get('.ant-col-xs-24 > .ant-row > :nth-child(8)').then(($plazoM)=>{
         cy.get('.ant-col-xs-24 > .ant-row > :nth-child(9)').then(($plazoC)=>{
            var plazoM=$plazoM.text();
            var plazoC=$plazoC.text();
             cy.log(plazoM,plazoC)
            expect(plazoM).contains(plazoC)
            expect(plazoM,'EL plazo es el mismo').equal(plazoC)
            

         })
        })
         
         cy.get('.cerulean-bottom').then(($plazoM)=>{
         cy.get(':nth-child(13) > .ant-typography > strong').then(($plazoC)=>{
            var plazoM=$plazoM.text();
            var plazoC=$plazoC.text();
             plazoM=plazoM.replace(/,/g, "");
             plazoC=plazoC.replace(/,/g, "");
            plazoM=plazoM.replace(/[$.]/g,'');
            plazoC=plazoC.replace(/[$.]/g,'');
            cy.log(plazoM,plazoC)
            var Compe=parseInt(plazoC, 10)
            var Monte=parseInt(plazoM, 10)
            expect(Monte,'EL pago total es menor en Monte').to.be.lessThan(Compe);
         })
        })
    })
})
  