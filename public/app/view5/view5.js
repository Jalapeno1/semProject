'use strict';

angular.module('myAppRename.view5', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'app/view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $http) {

        $scope.getMovie = function(title, year){
            console.log(title, year);
            $http({
                method: 'GET',
                url: 'http://www.omdbapi.com/?t=' + title +'&y=' + year + '&plot=long&r=json',
                dataType: 'json'
            }).
                success(function (data, status, headers, config) {

                    $scope.posts = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });}

            $scope.saveMovie = function(Id, Rating, Year, Title, Genre, Runtime){

                console.log(Id, Title, Genre, Year, Runtime, Rating);
                var urlStr = '/test/addtitle/test/' + Id + '/' + Rating + '/' + Year + '/' + Title + '/' + Genre + '/' + Runtime +''
                console.log(urlStr);

                $http({
                    method: 'POST',
                    url: urlStr


                }).
                    success(function (data, status) {
                        $scope.status = status;


                    }).
                    error(function (data, status, error) {
                        $scope.error = status;

                    });
        }

    });
