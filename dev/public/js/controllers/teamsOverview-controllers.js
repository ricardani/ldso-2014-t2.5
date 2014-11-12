var teamOverviewControllers = angular.module('teamOverviewControllers', []);

teamOverviewControllers.controller('TeamsOverviewCtrl', function ($scope, $http) {

    $http({url: '/api/get-teams', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.teams = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-teamsGames', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.games = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-teamsStatsBlock', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.blocks = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-teamsStatsLine', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.lines = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

});