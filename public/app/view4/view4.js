'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html'
        });
    }])

    .controller('View4Ctrl', function ($scope, $http, $route) {
        $scope.addUser = function(username, password) {

            var details = {
                "username": username,
                "password": password,
                "authority": "ADMIN"
            }


            $http
                .post("localhost:8080/", details)
                .succes(function (data, status) {
                    $scope.status = status;
                })
                .error(function (data, status) {
                    $scope.error = status;
                });
        }
});
