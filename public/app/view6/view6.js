'use strict';

angular.module('myAppRename.view6', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view6', {
            templateUrl: 'app/view6/view6.html'
        });
    }])
    .controller('View6Ctrl', function ($scope, $http) {
        $scope.test = function(test){
            console.log("Result "+test);
        }
    });
