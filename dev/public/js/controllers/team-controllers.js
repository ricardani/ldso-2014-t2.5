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
					$( ".modal-backdrop" ).remove();
					$( "#AddPlayerModal" ).modal('hide');
					var temp = {
						id: data[0].id,
						name: $scope.TeamInfo.name
					};
					$scope.players.push(temp);
				}
			})
			.error(function (data, status, headers, config) {
				$rootScope.alert = 'error';
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

	$http({url: '/api/get-teamPlayers', method: 'GET', params: {'teamID': $scope.teamID}})
        .success(function (data, status, headers, config) {
            $scope.players = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
		
	$http({url: '/api/get-teamStaff', method: 'GET', params: {'teamID': $scope.teamID}})
        .success(function (data, status, headers, config) {
            $scope.staff = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
});

teamControllers.controller('LeaveTeam', function ($scope, $window, $location, $http) {
	 $scope.leaveTeam = function () {
		
		$http({url: '/api/leave-team', method: 'POST', params: {'teamID': $scope.teamID}})
		.success(function (data, status, headers, config) {
			console.log(data);
			if (data.name === 'error') {
				
			} else {
				$( ".modal-backdrop" ).remove();
				$( "#LeaveTeam" ).modal('hide');
				$location.path('/teamStats/teams');
			}
		})
		.error(function (data, status, headers, config) {
			
		});
		
});


teamControllers.controller('EditName', function ($scope, $window, $location, $http) {
	 $scope.submit1 = function() {

		$http({url: '/api/update-teamname', method: 'POST', params: {'name': $scope.input1, 'teamid': $scope.teamID}})
        .success(function (data, status, headers, config) {
			console.log("Update team name with : " + $scope.input1 + " -> " + $scope.teamID);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
				window.location.reload();
      };
	
});

teamControllers.directive('fileModel', ['$parse', function ($parse) {
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


teamControllers.controller('myCtrl', ['$scope', '$http', function($scope, $http){
    
	$scope.uploadFile = function() {
		var str = $scope.myFile.name.split(".");
		var extension = str[str.length -1];
		var img = $scope.teamID + "." + extension;
		$http({url: '/api/update-teamimg', method: 'POST', params: {'img': img, 'teamid': $scope.teamID}})
        .success(function (data, status, headers, config) {
			console.log("Update team img with : " + img + " -> " + $scope.teamID);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
		
    };
    
}]);