'use strict';

angular.module('myAppRename.view5', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'app/view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $http, $timeout) {
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
            url: '/test/allMovies/test'
            //url: 'http://www.omdbapi.com/?t=frozen&y=&plot=short&r=json'

        }).
            success(function (data, status, headers, config) {
                $scope.movie = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

    });