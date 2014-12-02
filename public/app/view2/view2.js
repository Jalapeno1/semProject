'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'app/view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])
  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http, $route, ngProgress) {
    $http({
      method: 'GET',
      url: '/test/allMovies/test'
    })
      .success(function (data, status, headers, config) {
          //$scope.collection = data;
          $scope.justMovies = data[0].moviesOwned;
      }).
      error(function (data, status, headers, config) {
        if (status == 401) {
          $scope.error = "You are not authenticated to request these data";
          return;
        }
        $scope.error = data;
      });

      // Deletes a movie from collection
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
      };

      // Updates user rating on a title
      $scope.updateRating = function(movieId, rating){
        var urlStr = '/test/addRating/test/'+ movieId +'/'+ rating +'/'
        console.log(urlStr);

        $http({
          method: 'POST',
          url: urlStr
        }).
          success(function (data, status) {
            $scope.status = status;
              $route.reload();
          }).
          error(function (data, status, error) {
            $scope.error = status;
          });
      };

      // Sorts movie collection alphabetically by default
      $scope.predicate = "title";

      // Handles dynamically changing detail windows
      $scope.open = function(item){
        if ($scope.isOpen(item)){
          $scope.opened = undefined;
        } else {
          $scope.opened = item;
        }
      };

      $scope.isOpen = function(item){
        return $scope.opened === item;
      };

      $scope.anyItemOpen = function() {
        return $scope.opened !== undefined;
      };
      // ---------------------------------------------
  }]);
