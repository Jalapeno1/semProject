'use strict';

xdescribe('myAppRename.services', function () {

  beforeEach(module('myAppRename.services'));

  xdescribe('InfoService', function () {

    var infoService;
    beforeEach(inject(function (_InfoService_) {
      infoService = _InfoService_;
    }));

    it('Should be Hello World from a Service', function () {
      expect(infoService.getInfo()).toBe("Hello World from a Service");
    });
  });


  xdescribe('XXXService', function () {

  });
});