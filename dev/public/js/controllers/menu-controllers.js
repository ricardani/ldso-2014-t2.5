var menuControllers = angular.module('menuControllers', []);

menuControllers.controller('UserInfoCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-userinfo', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.firstname = data[0].firstname;
            $scope.lastname = data[0].lastname;
            $scope.img = data[0].img;
        }).error(function (data, status, headers, config) {
            // Erase the token
            delete $window.sessionStorage.token;
            $location.path('/login/login');
        });

});

menuControllers.controller('MenuCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {

        $scope.menu = $routeParams.menu;

        if($routeParams.menu == 'profile'){

        }else if($routeParams.menu == 'players'){

        }
    }]);

menuControllers.controller('MenuPlayerCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {

        $scope.menu = 'player';

        $scope.playerID = $routeParams.playerID;
    }]);
	
menuControllers.controller('MenuTeamCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {

        $scope.menu = 'my_team';

        $scope.teamID = $routeParams.teamID;
    }]);

menuControllers.controller('MenuWorkoutCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {

        $scope.menu = 'workout';

    }]);