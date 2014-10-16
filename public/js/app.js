/*'use strict';*/

/* App Module */

var ldsoAPP = angular.module('ldsoAPP', [
    'ngRoute',
    'ldsoControllers'

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
            when('/menu', {
                templateUrl: 'partials/menu.html',
                controller: 'PlayerCtrl'
            }).
            otherwise({
                redirectTo: '/login/login'
            });
    }]);
