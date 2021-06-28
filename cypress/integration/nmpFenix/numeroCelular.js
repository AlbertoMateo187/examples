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
describe('Realizo un request', function(){
    it('si accedo a mi perfil sin estar registrado, me redirecciona al login', function(){
 cy.visit('https://asfan.as.com/perfil/?backURL=https%3A%2F%2Fas.com%2F%3Fevent_log%3Dokdesc%26prod%3DREG&v=pf')
        //Campo de email del formulario de la pagina del login
        cy.get('#Email1')
    })
    it('Hago el request del login', function(){
        var resp=cy.request({
            method:"POST",
            url: 'https://asfan.as.com/conectar',
            form: true,
            body: {
                Email1: "user",
                Password:"password",
                send:"1"
            }
        }).then((resp)=> {
            expect(resp.status).to.eq(200)
        })
        cy.visit('https://asfan.as.com/perfil/?backURL=https%3A%2F%2Fas.com%2F%3Fevent_log%3Dokdesc%26prod%3DREG&v=pf')
        cy.get("div.ug_foto")
     })
    })      
