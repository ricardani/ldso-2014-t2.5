var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('PlayerInfoCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-playerInfo', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.playerInfo = data[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerStaticBlocks', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.staticBlocks = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerStaticLines', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.staticLines = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicBlocks', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicBlocks = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicLines', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicLines = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicFields', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicFields = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicDates', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicDates = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

});