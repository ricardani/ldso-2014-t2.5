var teamControllers = angular.module('teamControllers', []);

teamControllers.controller('getTeamPlayers', function($scope, $window, $location, $http) {

	$http({url: '/api/get-teamPlayers', method: 'GET'})
		.success( function (data, status, headers, config) {
            $scope.team_players = data;
		}).error(function (data, status, headers, config) {
			console.log(data);
		});
});

teamControllers.controller('AddPlayer', function ($scope, $http, $window, $location, $rootScope) {

    $scope.addPlayer = function () {
            $http
                .post('api/add-player', $scope.player)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    if (data.name === 'error') {

                        

                        $rootScope.alert = 'error';


                    } else {
                        $rootScope.alert = 'success';
                    }


                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;

                    // Handle login errors here
                    $rootScope.alert = 'error';
                    $location.path('/login/register');
                });
        
    };
});

playerControllers.controller('TeamInfoCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-teamInfo', method: 'GET', params: {'teamID': $scope.teamID}})
        .success(function (data, status, headers, config) {
            $scope.playerInfo = data[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
});