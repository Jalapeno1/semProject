'use strict';

angular.module('myAppRename.view5', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'app/view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $http, $timeout) {


        $http({
            method: 'GET',
            //url: '/test/allMovies/test'
            url: 'http://www.omdbapi.com/?t={{xxx}}&y=&plot=short&r=json',
            dataType: 'json'

        }).
            success(function (data, status, headers, config) {

                $scope.posts = data;
                //$scope.posts = jQuery.parseJSON(data);


            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

    });