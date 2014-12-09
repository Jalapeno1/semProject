xdescribe('myAppRename.factories', function () {

  beforeEach(module('myAppRename.factories'));

  xdescribe('InfoFactory', function () {
    var infoFactory;
    beforeEach(inject(function (_InfoFactory_) {
      infoFactory = _InfoFactory_;
    }));

    it('Should be Hello World from a Factory', function () {
      expect(infoFactory.getInfo()).toBe("Hello World from a Factory");
    });
  });


  xdescribe('XXXFactory', function () {

  });
});