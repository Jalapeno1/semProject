'use strict';

angular.module('myAppRename.view6', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/test/allMovies/:user', {
            templateUrl: 'app/view6/view6.html',
            controller: 'View6Ctrl'
        });
    }])

    .controller('View6Ctrl', function ($scope, $http, $timeout) {
        $scope.predicate = "title";
        $scope.filterText ="";
        var tempFilterText ="",
            filterTextTimeout;
        $scope.$watch("search.$", function(val){
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

            tempFilterText = val;
            filterTextTimeout = $timeout(function(){
                $scope.filtetText = tempFilterText;

            }, 250); //delay 250 ms
        });

        $http({
            method: 'GET',
            //url: '/test/allMovies/test'
            url: 'http://www.omdbapi.com/?t=frozen&y=&plot=short&r=json'

        }).
            success(function (data, status, headers, config) {
                $scope.movie = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

    });