'use strict';

angular.module('myAppRename.view5', ['ngRoute', 'ngProgress'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'app/view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $http, $route, ngProgress) {
        // Searches for a movie title
        $scope.getMovie = function(title, year, showIt){
            ngProgress.start();
            if(showIt==="undefined"){
                $scope.showBut = false
            } else {
                $scope.showBut = showIt
            }
            // Gets data from API
            $http({
                method: 'GET',
                url: 'http://www.omdbapi.com/?t=' + title +'&y=' + year + '&plot=long&r=json',
                dataType: 'json'
            }).
                success(function (data, status, headers, config) {
                    $scope.posts = data;
                    ngProgress.complete();
                }).
                error(function (data, status, headers, config) {
                    $scope.error = "Could not find Movie in Database. ERROR: "+data;
                    ngProgress.complete();

                });

        };
            // Adds found title to user's collection
            $scope.saveMovie = function(Id, Rating, Year, Title, Genre, Runtime, Plot, Poster){
                ngProgress.start();

                var urlJSON = {
                    "user": "test",
                    "id": Id,
                    "rating": Rating,
                    "year": Year,
                    "title": Title,
                    "genre": Genre,
                    "runtime": Runtime,
                    "plot": Plot,
                    "poster": Poster
                };

                $http
                    .post("/test/addTitle", urlJSON)
                    .success(function (data, status) {
                        $scope.status = status;
                        ngProgress.complete();
                        $route.reload();

                    })
                    .error(function (data, status, error) {
                        $scope.error = "Something went wrong. Could not add movie to Collection. ERROR: "+data;
                        ngProgress.complete();
                    });
            }
    });
