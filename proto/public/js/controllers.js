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

        }else{
            $http.get('http://localhost:3000/api').success(function (data) {
                $scope.players = data;
            });
        }

    }]);
