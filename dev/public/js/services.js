var team_statsServices = angular.module('team_statsServices', []);

/*appServices.factory('Players', ['$resource',
    function($resource){
        return $resource('', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    }]);*/

team_statsServices.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});

team_statsServices.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});