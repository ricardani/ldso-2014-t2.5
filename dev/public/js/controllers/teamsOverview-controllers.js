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
		

	$scope.submit = function() {

		$http({url: '/api/insert-teamstaff', method: 'POST', params: {'email': $scope.input1, 'name' : $scope.input2}})
        .success(function (data, status, headers, config) {
			console.log("Insert staff in team : " + $scope.input1 + " -> " + $scope.input2);
			document.getElementById("modalheader").innerHTML = '<div class="alert alert-success">Staff adicionado com sucesso!</div>';
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

      };
		
	

});

teamOverviewControllers.controller('CollapseDemoCtrl', function ($scope) {
  $scope.isCollapsed = false;
});

  teamOverviewControllers.controller("TabsParentController", function ($scope) {
 
    var setAllInactive = function() {
        angular.forEach($scope.teams, function(team) {
            team.active = false;
        });
    };
      
 
});

teamOverviewControllers.controller ("TabsChildController", function($scope, $log){
  
});
