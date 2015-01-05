var teamOverviewControllers = angular.module('teamOverviewControllers', []);

teamOverviewControllers.controller('TeamsOverviewCtrl', function ($scope, $http, $rootScope) {
	
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
		
	$http({url: '/api/get-userStaff', method: 'GET'})
		.success(function (data, status, headers, config) {
			if (data.name === 'error') {      
				$rootScope.alert = 'error';
			} else {
				$scope.userStaff = data;
				$rootScope.alert = 'success';
			}
		})
		.error(function (data, status, headers, config) {
			$rootScope.alert = 'error';
		});	
		
	$scope.addExistingStaff = function () {
		$scope.TeamInfo =
		{
			staffIDs : [],
			teamName : $scope.selectedTeam
		};
		for(var i = 0; i < $scope.userStaff.length ; ++i){
			if(document.getElementById($scope.userStaff[i].id).checked){
				$scope.TeamInfo.staffIDs.push($scope.userStaff[i]);
			}
		}
		$http.post('/api/insert-existing-staff', $scope.TeamInfo)
			.success(function (data, status, headers, config) {
				if (data.name === 'error') { 
					document.getElementById("modalheader").innerHTML = '<div class="alert alert-danger">Impossível adicionar esse staff nessa equipa!</div>';
					$rootScope.alert = 'error';
				} else {
					document.getElementById("modalheader").innerHTML = '<div class="alert alert-success">Staff adicionado com sucesso!</div>';
					$rootScope.alert = 'success';
				}
			})
			.error(function (data, status, headers, config) {
				$rootScope.alert = 'error';
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

teamOverviewControllers.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

teamOverviewControllers.controller ("AddTeamCrtl", function ($scope, $http, $window, $location, $rootScope){
	

	$scope.addTeam = function () {
		$http({url: '/api/insert-team', method: 'POST', params: {'name': $scope.name}})
        .success(function (data, status, headers, config) {
			console.log("Insert team name with: " + $scope.name );
			document.getElementById("alerts").innerHTML = '<div class="alert alert-success alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                '<strong>Sucesso!</strong> Equipa criada!' +
                '</div>';
			
        }).error(function (data, status, headers, config) {
			console.log("erro");
			document.getElementById("alerts").innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                '<strong>Erro!</strong> Nome de Equipa já existente!' +
                '</div>';
            
        });
    };

});
