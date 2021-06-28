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
      it('Flujo para ingresar a la pantalla de subir Identificación',function(){
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
        //Pantalla de Documentos
        cy.get('button[type="button"]').eq(1).click()
        cy.wait(8000)
        //Pantalla de Número Celular
        cy.fixture('variables.json').as('varDates')
        cy.get('@varDates').then((varDates) =>{
          cy.get('#phone').type(varDates.celularOK)
          a=varDates.celularOK
          })
        cy.wait('@looking-by-telephone')
        cy.get('#btnSubmit').click()
        cy.wait('@validate-cel')
        //Pantalla de código 
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
        cy.getCookies()
  //.should("have.length", 1)
  .then((cookies) => {
    expect(cookies[0]).to.have.property('value')

   cy.log(cookies);
  });
      })
      
      it('Validar elementos de la pantalla',function(){
        cy.get('.ant-btn.ant-btn-block.big-button.clicked').should('have.text', 'Tomar Foto')
        cy.get('.ant-btn.ant-btn-block.big-button.false').eq(0).should('have.text', 'Subir Archivo')
        cy.get('.ant-btn.ant-btn-block.big-button.false').eq(1).should('have.text', 'Capturar Datos')
        cy.get('.ant-checkbox-input').should('exist').and('be.not.disabled')
        cy.get('.ant-checkbox-input').should('not.be.checked')
        cy.contains('Aceptar y continuar')
        cy.get('button[type="button"]').eq(5).should('be.disabled')
        
      })
      
      it('Validar activación del botón Aceptar',function(){
        //Tomar foto
        cy.get('.ant-checkbox-input').click()
        cy.get('.ant-checkbox-input').should('be.checked')
        cy.get('button[type="button"]').eq(4).should('not.be.disabled')
        //pestaña subir archivo
        cy.get('.ant-btn.ant-btn-block.big-button.false').eq(0).click()
        cy.get('h3').should('have.text', 'Tus fotos se perderán')
        cy.contains('Continuar')
        cy.get('#submit').should('be.not.disabled')
        cy.get('#cancel').should('have.text', 'Cancelar').and('be.not.disabled')
        cy.get('#submit').click()
        cy.get('.ant-checkbox-input').should('not.be.checked')
        cy.get('button[type="button"]').eq(5).should('be.disabled')
        cy.get('.ant-checkbox-input').click()
        cy.get('.ant-checkbox-input').should('be.checked')
        cy.get('button[type="button"]').eq(4).should('not.be.disabled')
        //Pestaña Capturar datos
        cy.setCookie('estado', 'Fenix_Crear_Usuario')
        cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
        cy.setCookie('expiresIn','3600')
        cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
        cy.setCookie('commonname','Srvapifnxdev')
        cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
        cy.setCookie('uid','Srvapifnxdev')
        cy.get('.ant-btn.ant-btn-block.big-button.false').eq(1).click()
        cy.get('h3').should('have.text', 'Tus fotos se perderán')
        cy.contains('Continuar')
        cy.get('#submit').should('be.not.disabled')
        cy.get('#cancel').should('have.text', 'Cancelar').and('be.not.disabled')
        cy.get('#submit').click()
        cy.get('.ant-checkbox-input').should('not.be.checked')
        cy.get('button[type="button"]').eq(7).should('be.disabled')
        cy.get('.ant-checkbox-input').click()
        cy.get('.ant-checkbox-input').should('be.checked')
        cy.get('button[type="button"]').eq(4).should('not.be.disabled')
      })
      it('Validar formulario Captura de datos',function(){
        cy.setCookie('estado', 'Fenix_Crear_Usuario')
        cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM4NTYwODIwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzg3MDQ4MjAwMCwicHJuIjpudWxsLCJqdGkiOiJiYzhlZjA4Mi05NmNmLTQxNTEtYjYzMC00ZTg1MjU4ZGMyYTEiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.TVxprnoXcVxIdipo5J9_i5pPiZRlrwF5FC7cfnEs_XlqgZr6p_goJ74BsEm5IiaQBtFbI7cxeMNap0QPzL9fUpx9qE3Lj2gJI7hYsTib--JCmWx2bgqS9lwnqYpRwg76B8hmLQ-FfJo3FLllAtIBd8XdKZhLOh0vyPKEq4H6xC8')
        cy.setCookie('expiresIn','3600')
        cy.setCookie('folioJourney','11056406-741c-41e0-86cd-0746a99f077a')
        cy.setCookie('commonname','Srvapifnxdev')
        cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
        cy.setCookie('uid','Srvapifnxdev')
        cy.get('.ant-checkbox-input').click()
        cy.get('.mdc-floating-label').eq(0).should('have.text','Primer Nombre')
        cy.get('.mdc-floating-label').eq(1).should('have.text','Segundo nombre(Opcional)')
        cy.get('.mdc-floating-label').eq(2).should('have.text','Apellido Paterno')
        cy.get('.mdc-floating-label').eq(3).should('have.text','Apellido Materno')
        cy.get('.mdc-floating-label').eq(4).should('have.text','Entidad de nac.')
        cy.get('.mdc-floating-label').eq(5).should('have.text','CURP')
        cy.get('.mdc-floating-label').eq(6).should('have.text','RFC')
        //cy.get('.mdc-text-field__input').eq(6).should('be.disabled')
        cy.get('.mdc-floating-label').eq(7).should('have.text','Homoclave (Opcional)')
        cy.get('.mdc-text-field__icon > .ant-btn > .svg-icon > svg').should('exist')
        cy.get('label[class="label"]').eq(0).should('have.text','Nacionalidad')
        cy.get('label[class="label"]').eq(1).should('have.text','Pais de nacimiento')
        cy.get('label[class="label"]').eq(2).should('have.text','Escolaridad')
        cy.get('label[class="label"]').eq(3).should('have.text','Estado civil')
        cy.get('label[class="label"]').eq(5).should('have.text','Genero')
        cy.get('label[class="label"]').eq(4).should('have.text','Fecha de nacimiento')
        

      })
      it('Llenar Formulario',function(){
        
        cy.setCookie('estado', 'Fenix_Crear_Usuario')
        cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
        cy.setCookie('expiresIn','3600')
        cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
        cy.setCookie('commonname','Srvapifnxdev')
        cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
        cy.setCookie('uid','Srvapifnxdev')
        cy.fixture('variables.json').as('varDates')
        cy.get('@varDates').then((varDates) =>{
          cy.get('.mdc-text-field__input').eq(0).click().type(varDates.Nombre1)
          cy.get('.mdc-text-field__input').eq(1).click().type(varDates.Nombre2)
          cy.get('.mdc-text-field__input').eq(2).click().type(varDates.Paterno)
          cy.get('.mdc-text-field__input').eq(3).click().type(varDates.Materno)
        })
        //Seleccionar Nacionalidad
        cy.get('.ant-select-selector').eq(0).click()
        cy.get('.ant-select-selector').eq(0).type('{uparrow}')
        cy.contains('MEXICANA').click()
        //Seleccionar País
        cy.get('.ant-select-selector').eq(1).click()
        cy.get('.ant-select-selector').eq(1).type('Méx')
        cy.contains('México').click()
        //Seleccionar Entidad de nacimiento
        cy.get('.ant-select-selector').eq(2).click()
        cy.contains('JALISCO').click()
        //Seleccionar Escolaridad
        cy.get('.ant-select-selector').eq(3).click()
        cy.contains('PROFESIONAL').click()

        cy.get('.ant-select-selector').eq(4).click()
        cy.contains('Soltero/a').click()
        cy.get('.ant-select-selector').eq(5).click()
        cy.contains('FEMENINO').click()

        cy.get('@varDates').then((varDates) =>{
          cy.wait(2000)
         cy.get('.mdc-text-field__input').eq(4).click().type(varDates.CURP)
          //cy.get('.mdc-text-field__input').eq(5).should('have.text','RAYC560408')
          cy.get('.mdc-text-field__input').eq(6).click().type(varDates.Homoclave)
          
          cy.get('.ant-picker.ant-picker-large').click()
          cy.contains('2021').click()
         for(var a=0;a<=5;a++){
            cy.get('.ant-picker-super-prev-icon').click()
          }
         cy.contains('1962').click()
         cy.contains('may.').click()
         cy.get('.ant-picker-cell-inner').eq(3).click()
         cy.wait(4000)
        })
        it('Enviar formulario',function(){
        cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/personal-data/upload-id-manual?', { fixtures: 'ident.json'  }).as('load-identification')
        cy.get('.ant-checkbox-input').click()
        cy.contains('Aceptar y continuar').click()
        cy.wait(35000)
        cy.get('.ant-checkbox-input').click()
        cy.contains('Siguiente').click()
        cy.wait('@load-identification')
        cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/datos-personales/subir-comprobante-domicilio')
        })

      })
})