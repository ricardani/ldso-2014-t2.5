var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('ProfileController', function ($scope, $http) {
	
    $http({url: '/api/get-userprofile', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.profile = data[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

		

	$scope.submit1 = function() {

		$http({url: '/api/update-profilename', method: 'POST', params: {'fname': $scope.input1, 'lname' : $scope.input2}})
        .success(function (data, status, headers, config) {
			console.log("Update user with : " + $scope.input1 + " " + $scope.input2);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
				window.location.reload();
      };
	  
	  $scope.submit2 = function() {

		$http({url: '/api/update-profileemail', method: 'POST', params: {'email': $scope.input3}})
        .success(function (data, status, headers, config) {
			console.log("Update email with: " + $scope.input3 );
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
				window.location.reload();
      };
		
	

});


