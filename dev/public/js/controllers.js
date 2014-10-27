/* Controllers */

var ldsoControllers = angular.module('ldsoControllers', []);

ldsoControllers.controller('LoginCtrl', ['$scope','$routeParams',
    function($scope, $routeParams) {
        $scope.login = $routeParams.login;
    }]);

ldsoControllers.controller('PlayerCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {

        $scope.menu = $routeParams.menu;

        if($routeParams.menu == 'profile'){

        }else if($routeParams.menu == 'players'){
            var currentLocation = window.location;
            var path;
            if (currentLocation.port == '') {
                path = currentLocation.hostname;
            } else{
                path = currentLocation.hostname + ":" + currentLocation.port;
            };
            $http.get('/players').success(function (data) {
                $scope.players = data;
            });
        }

    }]);
