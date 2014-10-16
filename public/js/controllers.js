/* Controllers */

var ldsoControllers = angular.module('ldsoControllers', []);

ldsoControllers.controller('LoginCtrl', ['$scope','$routeParams',
    function($scope, $routeParams) {
        $scope.login = $routeParams.login;
    }]);

ldsoControllers.controller('PlayerCtrl', ['$scope', '$http',
    function($scope, $http) {

        $http.get('http://localhost:3000/api').success(function(data) {
            $scope.players = data;
        });

    }]);
