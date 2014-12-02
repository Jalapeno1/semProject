'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'app/view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])
  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/test/allMovies/test'
    })
      .success(function (data, status, headers, config) {
        $scope.collection = data;
      }).
      error(function (data, status, headers, config) {
        if (status == 401) {
          $scope.error = "You are not authenticated to request these data";
          return;
        }
        $scope.error = data;
      });

      $scope.deleteMovie = function(Id){
        console.log(Id);
        var urlStr = '/test/movie/test/' + Id + '/'
        console.log(urlStr);

        $http({
          method: 'DELETE',
          url: urlStr
        }).
            success(function (data, status) {
              $scope.status = status;
            }).
            error(function (data, status, error) {
              $scope.error = status;
            });
      }
  }]);