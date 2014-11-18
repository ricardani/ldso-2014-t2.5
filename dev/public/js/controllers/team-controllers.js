var teamControllers = angular.module('teamControllers', []);

teamControllers.controller('AddPlayer', function ($scope, $http, $window, $location, $rootScope) {
	  
    $scope.addPlayer = function () {
		$http.post('/api/insert-player', $scope.player)
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