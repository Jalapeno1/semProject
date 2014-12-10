'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'app/view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])
  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http, $route) {

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
          $scope.error = "Could not Connect to Database. " + data;
      });

      // Deletes a movie from collection
      $scope.deleteMovie = function(Id){
        var urlStr = '/test/movie/test/' + Id + '/'

        $http({
          method: 'DELETE',
          url: urlStr
        }).
            success(function (data, status) {
              $scope.status = status;
              }).
            error(function (data, status, error) {
              $scope.error = "Could not Connect to Database.";
            });
      };

      // Updates user rating on a title
      $scope.updateRating = function(movieId, rating){
        var updateJSON = {
          "user": "test",
          "id": movieId,
          "userRating": rating
        };

        $http
            .post("/test/addRating", updateJSON)
            .success(function(data, status){
              $scope.status = status;
              $route.reload();
            })
            .error(function (data, status, error) {
              $scope.error = "Something went wrong, try again.";
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
