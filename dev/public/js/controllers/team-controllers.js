var teamControllers = angular.module('teamControllers', []);

teamControllers.controller('AddPlayer', function ($scope, $http, $window, $location, $rootScope) {
		
    $scope.addPlayer = function () {
		$scope.TeamInfo =
		{
			name : $scope.player.name,
			birth : $scope.player.birth,
			phone : $scope.player.phone,
			teamID : $scope.teamID
		};
	
		$http.post('/api/insert-player', $scope.TeamInfo)
			.success(function (data, status, headers, config) {
				console.log(data);
				if (data.name === 'error') {      
					$rootScope.alert = 'error';
				} else {
					$rootScope.alert = 'success';
				}
			})
			.error(function (data, status, headers, config) {
			
				$rootScope.alert = 'error';
				$location.path('/teamStats/my_team');
			});
	};
});

teamControllers.controller('TeamPageCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-teamInfo', method: 'GET', params: {'teamID': $scope.teamID}})
        .success(function (data, status, headers, config) {
            $scope.teamInfo = data[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

	$http({url: '/api/get-players', method: 'GET', params: {'teamID': $scope.teamID}})
        .success(function (data, status, headers, config) {
            $scope.players = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
});
