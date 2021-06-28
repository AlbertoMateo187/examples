describe('Cuentas', function(){
    var a=1;
    it('Igualdad',function(){
        expect(1==2,'Ambos terminos tienen que ser iguales y no lo son').to.equal(true);
    })
    it('No igualdad',function(){
        expect(1==2).to.equal(false);
    })
    it('Validar Resta',function(){
        expect(1-2,'Aqui se espera un 0').to.equal(0);
    })
    it('Validar Resta no este bien',function(){
        expect(1-1).to.not.equal(1);
    })
    it('Tiene que ser verdadero',function(){
        expect(2==2).to.be.true;
    })
    it('Tiene que ser verdadero',function(){
        expect(2==1).to.be.false;
    })
    it('La variable existe',function(){
        expect(a).to.exist;
    })
    it('Es menor a 10',function(){
        expect(a).to.be.lessThan(10);
    })
    it('Es mayor a 10',function(){
        expect(25).to.be.greaterThan(10);
    })
})