var staffControllers = angular.module('staffControllers', []);

staffControllers.controller('StaffPageCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-staff', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.staff = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
		
	$scope.results = [];
    $scope.input = "";
    $scope.doSearch = function() {
        var httpRequest = $http({url: '/api/get-staffs', method: 'GET', params: {'name': $scope.input}})
        .success(function (data, status, headers, config) {
            $scope.staff = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
		
		/*
		$http({
            method : 'GET',
			params: {'playerID': $scope.playerID}
            url : "/api/get-staff/" + $scope.input,
        }).success(function(data, status) {
            $scope.results = data;
        }).error(function(arg) {
            alert("error ");
        });*/
         
    };
    // run the search when the page loads.
    $scope.doSearch();
});

