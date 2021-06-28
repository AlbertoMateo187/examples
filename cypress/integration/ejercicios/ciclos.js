

describe('Ingresar al Simulador', () => {
          it('Flujo para ingresar a la pantalla de subir Identificación',function(){
            cy.visit('https://www.chedraui.com.mx/Departamentos/Vinos-y-Licores/c/MC22?siteName=Sitio+de+Chedraui&isAlcoholRestricted=false')
            cy.get('a').each((ele)=>cy.log(ele.text()))
          })

})