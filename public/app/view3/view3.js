'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'app/view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

    .controller('View3Ctrl', function ($scope, $http) {
      $scope.addUser = function(username, password) {
        var details = {
          "username": username,
          "password": password,
          "authority": "USER"
        };

        $http
            .post("http://localhost:8080/login", details)
            .success(function (data, status) {
              $scope.status = status;
              $scope.messageToUser = {
                  message: "User: " + username + " successfully created!"
              };
              //$route.reload();

            })
            .error(function (data, status) {
              $scope.error = status;
              //$scope.messageToUser = "User: "+username+" already exist!";
            });
      };
    });