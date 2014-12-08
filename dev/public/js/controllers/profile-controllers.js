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


profileControllers.directive('fileModel', ['$parse', function ($parse) {
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


profileControllers.controller('myCtrl2', ['$scope', '$http', function($scope, $http){
    
		
    $http({url: '/api/get-userprofile', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.login = data[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
	
	$scope.uploadFile = function() {
	var str = $scope.myFile.name.split(".");
		var extension = str[str.length -1];
		var img = $scope.login.id + "." + extension;
		$http({url: '/api/update-profileImg', method: 'POST', params: {'img': img, 'id': $scope.login.id}})
        .success(function (data, status, headers, config) {
			console.log("Update login img with : " + img);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
		
    };
    
}]);


profileControllers.controller('ProfileTeamController', function ($scope, $http) {
	
    $http({url: '/api/get-teams', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.profile = data[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
		
});
