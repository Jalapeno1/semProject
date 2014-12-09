describe('myAppRename.view2 View2Ctrl', function() {
var scope, httpBackendMock, ctrl;
    var movieSchema = ({
        userName: "String",
        moviesOwned: [{
            id: "String",
            genre: "String",
            imdbRating: "String",
            runtime: "String",
            title: "String",
            year: "String",
            plot: "String",
            poster: "String",
            userRating: 5
        }]
    });

    beforeEach(module('myAppRename.view2', ['ngRoute']));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {

        httpBackendMock = $httpBackend;
        httpBackendMock.expectGET('test/allMovies/test').
            respond(movieSchema);
        scope = $rootScope.$new();
        ctrl = $controller('View2Ctrl', {$scope: scope});
    }))

    it('Should fetch moviesOwned by test user ', function(){
        expect(scope.moviesOwned).toBeUndefined();
        httpBackendMock.flush();
        expect(scope.moviesOwned.length).toEqual(1);

    })


    it('should ....', inject(function($controller) {
        //spec body
        var view2Ctrl = $controller('View2Ctrl');
        expect(view2Ctrl).toBeDefined();
    }));
});




