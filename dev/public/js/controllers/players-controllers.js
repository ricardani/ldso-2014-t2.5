var playersControllers = angular.module('playersControllers', []);

playersControllers.controller('UserTeamsCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-teams', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.teams = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-players', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.players = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

});

playersControllers.controller('SlidersCtrl', function ($scope, $rootScope) {

    $rootScope.sliderConfig = {
        min:  0,
        max:  50,
        step: 1,
        userMin: 0,
        userMax: 50
    };

});