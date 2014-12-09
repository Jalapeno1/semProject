'use strict';

xdescribe('myAppRename.view1 module', function() {

  beforeEach(module('myAppRename.view1'));

  xdescribe('view1 controller', function(){

      it('should ....', inject(function($controller) {
        //spec body
        var view1Ctrl = $controller('View1Ctrl');
        expect(view1Ctrl).toBeDefined();
      }));
    });
  });