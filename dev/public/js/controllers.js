/* Controllers */

var team_statsControllers = angular.module('team_statsControllers', []);

team_statsControllers.controller('LoginCtrl', ['$scope','$routeParams','$rootScope', '$window', '$location',
    function($scope, $routeParams, $rootScope, $window, $location) {
        $scope.login = $routeParams.login;

        if($rootScope.alert == 'success'){

            $("#alerts").append('<div class="alert alert-success alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                '<strong>Sucesso!</strong> O registo foi um sucesso!' +
                '</div>');

            $rootScope.alert = '';

        }else if($rootScope.alert == 'error'){

            $("#alerts").append('<div class="alert alert-danger alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                '<strong>Erro!</strong> O registo falhou! Por favor tente mais tarde.  '+
                '</div>');

            $rootScope.alert = '';
        }

        if ($window.sessionStorage.token) {
            //$location.path('#/teamStats/home');
            $scope.isLoggedIn = "yes";
        }



    }]);

team_statsControllers.controller('PlayerCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {

        $scope.menu = $routeParams.menu;

        if($routeParams.menu == 'profile'){

        }else if($routeParams.menu == 'players'){
            $http.get('/players').success(function (data) {
                $scope.players = data;
            });
        }
    }]);


function checkPassword() {
    if (document.registerForm.password.value != document.registerForm.passwordConfirm.value) {
        //alert ('The passwords do not match!');
        return false;
    }
    return true;
};


team_statsControllers.controller('UserRegister', function ($scope, $http, $window, $location, $rootScope) {

    $scope.submitRegister = function () {

        if (checkPassword()) {

            $http
                .post('/register-user', $scope.register)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    if (data.name === 'error') {

                        if (data.routine = "_bt_check_unique") {
                            $("#alerts").append('<div class="alert alert-danger alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                                '<strong>Erro!</strong> O email já está a ser utilizado! ' +
                                '</div>');
                        } else {
                            $("#alerts").append('<div class="alert alert-danger alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                                '<strong>Erro!</strong> O registo falhou! Por favor tente mais tarde.  ' +
                                '</div>');
                        }

                        $rootScope.alert = 'error';


                    } else {
                        $window.sessionStorage.token = data.token;
                        $rootScope.alert = 'success';
                        $location.path('/login/login');
                    }


                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;

                    // Handle login errors here
                    $rootScope.alert = 'error';
                    $location.path('/login/register');
                });
        }else{
            $("#alerts").append('<div class="alert alert-warning alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                '<strong>Aviso!</strong> As passwords tem de coincidir!'+
                '</div>');
        }
    };
});

/*
team_statsControllers.controller('UserCtrl', function ($scope, $http, $window) {
    $scope.user = {username: 'john.doe', password: 'foobar'};
    $scope.message = '';
    $scope.submit = function () {
        $http
            .post('/authenticate', $scope.user)
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $scope.message = 'Welcome';
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;

                // Handle login errors here
                $scope.message = 'Error: Invalid user or password';
            });
    };
});*/

team_statsControllers.controller('UserCtrl2', function ($scope, $http) {

    $scope.get = function () {
        $http({url: '/api/restricted', method: 'GET'})
            .success(function (data, status, headers, config) {
                console.log(data.name); // Should log 'foo'
            });
    };
});

team_statsControllers.controller('AuthenticateCtrl', function ($scope, $http, $window, $location) {

    $scope.login = function () {
        $http
            .post('/authenticate', $scope.user)
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $location.path('/teamStats/home');
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;

                // Handle login errors here
                $("#alerts").append('<div class="alert alert-danger alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                    '<strong>Erro!</strong> Email ou Password não são válidos!' +
                    '</div>');
            });
    };
});

team_statsControllers.controller('LoggedInCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-userinfo', method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.firstname = data[0].firstname;
            $scope.lastname = data[0].lastname;
        });

    $scope.login = function () {

        if ($window.sessionStorage.token) {
            $location.path('/teamStats/home');
        }else{
            $location.path('/login/login');
        }

    };

    $scope.quit = function () {

        delete $window.sessionStorage.token;
        $location.path('#/login/login');

    };
});