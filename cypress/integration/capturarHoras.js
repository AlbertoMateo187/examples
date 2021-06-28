

describe('Capturar horas', function(){
  
let cvv
let tarjeta

it('Consultar Botón',function(){
  
  cy.visit('http://demo.guru99.com/payment-gateway/cardnumber.php')
  cy.get('.inner > :nth-child(4)').then(($btn) => {
    cvv = $btn.text()
  })
  cy.get('#three > .inner > :nth-child(3)').then(($btn2) => {
    tarjeta=$btn2.text()
 })
})
it('Consultar Botón',function(){
  cy.visit('http://demo.guru99.com/V4/index.php')
  cy.get('.dropdown').contains('Payment').click();
  cy.get('[name="quantity"]').select('4');
  cy.get('.button').click();
  var a=cvv.length
var codigo = cvv.slice(a-3, a);
cy.get('#cvv_code').type(codigo)
cy.get('#month').select('4');
cy.get('#year').select('2023');
  a=tarjeta.length
  var number= tarjeta.slice(a-16, a);
  cy.get('#card_nmuber').type(number)
  cy.get('.button').click();
})
it('Validar compra', function(){
  //cy.get('h2').contains('Payment successfull!')
})
})
