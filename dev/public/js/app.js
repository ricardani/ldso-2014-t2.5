/*'use strict';*/

/* App Module */

var ldsoAPP = angular.module('ldsoAPP', [
    'ngRoute',
    'loginControllers',
    'team_statsServices',
    'menuControllers',
    'playersControllers',
    'teamOverviewControllers',
    'playerControllers',
	'teamControllers',
	'staffControllers',
	'profileControllers',
    'workoutControllers',
    'ui-rangeSlider'
]);

ldsoAPP.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login/:login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            }).
            when('/teamStats', {
                templateUrl: 'partials/menu.html',
                controller: ''
            }).
            when('/teamStats/:menu', {
                templateUrl: 'partials/menu.html',
                controller: 'MenuCtrl'
            }).
            when('/teamStats/player/:playerID', {
                templateUrl: 'partials/menu.html',
                controller: 'MenuPlayerCtrl'
            }).
            when('/teamStats/my_team/:teamID', {
                templateUrl: 'partials/menu.html',
                controller: 'MenuTeamCtrl'
            }).
            when('/teamStats/workout_plan', {
                templateUrl: 'partials/workout_plan.html',
                controller: 'MenuWorkoutCtrl'
            }).
            otherwise({
                redirectTo: '/login/login'
            });
    }]);


ldsoAPP.filter('rangeFilterAge', function() {
    return function( items, rangeInfo ) {
        var filtered = [];
        var min = parseInt(rangeInfo.userMin);
        var max = parseInt(rangeInfo.userMax);
        // If time is with the range
        angular.forEach(items, function(item) {
            if( item.age >= min && item.age <= max ) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});