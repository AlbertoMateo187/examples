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
    it('Flujo para ingresar a la pantalla Datos Adicionales',function(){
        cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/credit/looking-by-telephone?*', { fixtures: 'codigo.json' }).as('looking-by-telephone')
        cy.intercept('POST', 'https://dev1775-remoto-datos-personales.mybluemix.net/api/client/validate-cel?*', { fixtures: 'validate.json' }).as('validate-cel')
        cy.visit('/simulador')
        cy.get('#montoSolicitado').type(x)
        cy.get('#cuota').type(y)
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
        //cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/client/validate-curp?', { fixtures: 'getProcess.json' }).as('code-verification')
        min = 0;
        max = 9;
        x = Math.random()*(max - min)+min;
        cy.get('#field-0').type('4')
        cy.get('#field-1').type('4')
        cy.get('#field-2').type('4')
        cy.get('#field-3').type('4')
        cy.get('#field-4').type('4')
        cy.wait('@code-verification')
        cy.wait('@save-progress')
        cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/datos-personales/subir-identificacion')
        cy.getCookies()
            .then((cookies) => {
            expect(cookies[0]).to.have.property('value')
            })
        cy.setCookie('estado', 'Fenix_Crear_Usuario')
        cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
        cy.setCookie('expiresIn','3600')
        cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
        cy.setCookie('commonname','Srvapifnxdev')
        cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
        cy.setCookie('uid','Srvapifnxdev')
        cy.get('.ant-input-group > :nth-child(3)').click()
        cy.get('#submit').click()
        cy.wait(2000)
        cy.fixture('variables.json').as('varDates')
        cy.get('@varDates').then((varDates) =>{
            cy.get('.mdc-text-field__input').eq(0).click().type(varDates.Nombre1)
            cy.get('.mdc-text-field__input').eq(1).click().type(varDates.Nombre2)
            cy.get('.mdc-text-field__input').eq(2).click().type(varDates.Paterno)
            cy.get('.mdc-text-field__input').eq(3).click().type(varDates.Materno)
        })
        //Seleccionar Nacionalidad
        cy.get('.ant-select-selector').eq(0).click()
        cy.wait(3000)
        for(var a=0;a<21;a++){
            cy.get('.ant-select-selector').eq(0).type('{downarrow}')
        }
        cy.contains('MEXICANA').click()
        //Seleccionar País
        cy.get('.ant-select-selector').eq(1).click()
        cy.get('.ant-select-selector').eq(1).type('Méx')
        cy.contains('México').click()
        cy.wait(1000)
        //Seleccionar Entidad de nacimiento
        cy.get('.ant-select-selector').eq(2).click()
        cy.contains('DURANGO').click()
        cy.wait(1000)
        //Seleccionar Escolaridad
        cy.get('.ant-select-selector').eq(3).click()
        cy.contains('PROFESIONAL').click()
        cy.wait(1000)
        cy.get('.ant-select-selector').eq(4).click()
        cy.contains('Soltero/a').click()
        cy.get('.ant-select-selector').eq(5).click()
        cy.contains('FEMENINO').click()
        cy.get('@varDates').then((varDates) =>{
          cy.wait(2000)
            cy.get('.mdc-text-field__input').eq(4).click().type(varDates.CURP)
            //cy.wait('@code-verification')
            //cy.get('.mdc-text-field__input').eq(5).should('have.text','RAYC560408')
            cy.wait(6000)
            cy.get('.mdc-text-field__input').eq(6).click().type(varDates.Homoclave)
        })
        cy.get('.ant-picker.ant-picker-large').click()
        cy.contains('2021').click()
        for(var a=0;a<=5;a++){
            cy.get('.ant-picker-super-prev-icon').click()
        }
         cy.contains('1962').click()
         cy.contains('may.').click()
         cy.get('.ant-picker-cell-inner').eq(3).click()
         cy.wait(1000)
         cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/personal-data/upload-id-manual?', { fixtures: 'ident.json'  }).as('load-identification')
        cy.get('.ant-checkbox-input').click()
        cy.contains('Aceptar y continuar').click()
        cy.wait(9000)
        cy.get('.ant-checkbox-input').click()
        cy.contains('Siguiente').click()
        cy.wait('@load-identification')
        cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/datos-personales/subir-comprobante-domicilio')
        cy.setCookie('estado', 'Fenix_Crear_Usuario')
        cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
        cy.setCookie('expiresIn','3600')
        cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
        cy.setCookie('commonname','Srvapifnxdev')
        cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
        cy.setCookie('uid','Srvapifnxdev')
        cy.wait(10000)
        cy.get('.ant-input-group > :nth-child(3)').click()
        cy.get('#submit').click()
        cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/personal-data/address-save-manual-proccess?', { fixtures: 'ident.json'  }).as('load-identification')
        cy.fixture('variables.json').as('varDates')
        cy.setCookie('estado', 'Fenix_Crear_Usuario')
        cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
        cy.setCookie('expiresIn','3600')
        cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
        cy.setCookie('commonname','Srvapifnxdev')
        cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
        cy.setCookie('uid','Srvapifnxdev')
        cy.get('@varDates').then((varDates) =>{
            cy.wait(2000)
            cy.get('[type="text"]').type(varDates.calle)
            cy.get('[type="text"]').type(varDates.exterior)
            cy.wait(2000)
            cy.contains('Avenida Jaime Balmes').click()
            cy.wait(5000)
            cy.get('.ant-select-selector').eq(0).click()
            cy.get('.ant-select-selector').eq(0).type('Mex')
            cy.contains('México').click()
        })
        cy.get('.ant-select-selector').eq(2).click()
        cy.get('.ant-select-selector').eq(2).type('{downarrow}')
        cy.get('.ant-select-selector').eq(2).type('{enter}')
        cy.wait(1000)
        cy.get('.mdc-text-field__input').eq(6).type('Test1')
        cy.get('.mdc-text-field__input').eq(7).type('Test1')
        cy.contains('Aceptar y continuar').click()
        cy.wait(5000)
        cy.contains('Siguiente').click()
        cy.wait(2000)
        cy.wait('@load-identification')
        cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/datos-personales/datos-adicionales')
        })
        it('Validar presencia campos pantalla Datos Adicionales',function(){
            cy.setCookie('estado', 'Fenix_Crear_Usuario')
            cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
            cy.setCookie('expiresIn','3600')
            cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
            cy.setCookie('commonname','Srvapifnxdev')
            cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
            cy.setCookie('uid','Srvapifnxdev')
            cy.wait(3000)
            cy.get('p').should('have.text','Llena los siguientes datos adicionales para complementar tu información.')
            cy.get('.mdc-text-field').eq(0).should('have.text','Tiempo viviendo en el domicilio (años)')
            cy.get('.mdc-text-field').eq(1).should('have.text','Dependientes económicos')
            cy.get('.mdc-text-field').eq(2).should('have.text','Ingresos mensuales')
            cy.get('label[class="label"]').eq(0).should('have.text','Tipo vivienda')
            cy.get('label[class="label"]').eq(1).should('have.text','¿Para qué utilizarás tu crédito?')
            cy.get('label[class="label"]').eq(2).should('have.text','¿A que te dedicas?')
            cy.get('.ant-row > .ant-btn').should('exist').and('be.disabled')
            cy.contains('Siguiente')
        })
        it('Validar Tipos de datos pantalla Datos Adicionales',function(){
          cy.setCookie('estado', 'Fenix_Crear_Usuario')
          cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
          cy.setCookie('expiresIn','3600')
          cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
          cy.setCookie('commonname','Srvapifnxdev')
          cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
          cy.setCookie('uid','Srvapifnxdev')
          var a="Test"
          cy.get('#antiguedad').type(a)
          cy.get('#antiguedad').should('have.value','' )
          cy.get('#dependientesEconomicos').type(a)
          cy.get('#dependientesEconomicos').should('have.value','' )
          cy.get('#ingresosMensuales').type(a)
          cy.get('#ingresosMensuales').should('have.value','' )
          cy.wait(3000)

      })
      it('Ingresar valores en los campos de la  pantalla Datos Adicionales',function(){
          cy.intercept('POST','https://dev1775-remoto-datos-personales.mybluemix.net/api/personal-data/save-aditionalInformation?', { fixtures: 'ident.json'  }).as('load-identification')
          cy.intercept('POST','https://dev1775-remoto-oferta-fenix.mybluemix.net/api/credit/credit-history?', { fixtures: 'ident.json'  }).as('load-identification')
          
          cy.get('#antiguedad').type('5')
          cy.get('#dependientesEconomicos').type('3')
          cy.get('#ingresosMensuales').type('20000')
          cy.wait(3000)
          cy.get('.ant-select.input-invalid.ant-select-single.ant-select-show-arrow').eq(0).click()
          cy.contains('Familiar').click()
          cy.wait(1000)
          cy.get('.ant-select.input-invalid.ant-select-single.ant-select-show-arrow').eq(1).click()
          cy.contains('CON NEGOCIO').click()
          cy.wait(1000)
          cy.get('.ant-select.input-invalid.ant-select-single.ant-select-show-arrow').eq(0).click()
          cy.contains('Gastos escolares').click()
          //Validar se habilite el botón
          cy.get('.ant-row > .ant-btn').should('not.be.disabled')
          cy.get('.ant-row > .ant-btn').click()
          cy.wait(2000)
          cy.wait('@load-identification')
          cy.setCookie('estado', 'Fenix_Crear_Usuario')
          cy.setCookie('refreshToken','eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Im9yYWtleSJ9.eyJvcmFjbGUub2F1dGgudXNlcl9vcmlnaW5faWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkIjoiU3J2YXBpZm54ZGV2IiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsIm9yYWNsZS5vYXV0aC5ydC50dGMiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJvcmFjbGUub2F1dGguc3ZjX3BfbiI6Ik9BdXRoU2VydmljZVByb2ZpbGUiLCJpYXQiOjE2MjM3OTI2NTYwMDAsIm9yYWNsZS5vYXV0aC50a19jb250ZXh0IjoicmVmcmVzaF90b2tlbiIsImV4cCI6MTYyMzgwNzA1NjAwMCwicHJuIjpudWxsLCJqdGkiOiI5MGE2NTVmMC00M2UxLTRiMjctOGQyYS1iMzM2NzhmOThjYzMiLCJvcmFjbGUub2F1dGguY2xpZW50X29yaWdpbl9pZCI6ImZlbml4Iiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiVXNlclByb2ZpbGUubWUiLCJ1c2VyLnRlbmFudC5uYW1lIjoiRGVmYXVsdERvbWFpbiIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0.dPdwK8XVHFIDOuvjallVogAhG1J0DI9-3984zb915swcXsp50kx21GDz9q73Pgp_cJb4tGFROXlA73C_j4x9x7177eg6pcYtf04NoEdRZKujAM-eM3qiOqr_zhP-TWcx811PKVVFD7AOdwPG8krQejv6egeqMuxxUp6svgp6RSE')
          cy.setCookie('expiresIn','3600')
          cy.setCookie('folioJourney','4a03deed-ccd4-40a0-a17d-ec3a540e61b3')
          cy.setCookie('commonname','Srvapifnxdev')
          cy.setCookie('idEstado','u8D_AHoBah2Lk6YvsKaz')
          cy.setCookie('uid','Srvapifnxdev')
          cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/oferta/consulta-buro')
          cy.wait(2000)
          cy.get('button[type="button"]').eq(1).click()
          cy.get('button[type="button"]').eq(3).click()
          cy.get('button[type="button"]').eq(5).click()
          cy.get('#ultimosCuatroDigitos').type('7654')
          cy.get('.ant-checkbox-input').click()
          cy.contains('Autorizar y continuar').click()
          cy.wait('@load-identification')
          cy.visit('https://dev1775-prestamosimple-fenix.mybluemix.net/oferta/revisar-oferta')
          
          
      })
    })  