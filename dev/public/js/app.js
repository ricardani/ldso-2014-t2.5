/*'use strict';*/

/* App Module */

var ldsoAPP = angular.module('ldsoAPP', [
    'ngRoute',
    'team_statsControllers',
    'team_statsServices'

   /* 'phonecatControllers',
    'phonecatFilters',
    'phonecatServices'*/
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
                controller: 'PlayerCtrl'
            }).
            when('/teamStats/:menu', {
                templateUrl: 'partials/menu.html',
                controller: 'PlayerCtrl'
            }).
            when('/teamStats/:menu/:teamID', {
                templateUrl: 'partials/menu.html',
                controller: 'PlayerCtrl'
            }).
            otherwise({
                redirectTo: '/login/login'
            });
    }]);
