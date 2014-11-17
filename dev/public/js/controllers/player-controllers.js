var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('PlayerPageCtrl', function ($scope, $window, $location, $http) {

    $http({url: '/api/get-playerInfo', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.playerInfo = data[0];
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerStaticBlocks', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.staticBlocks = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerStaticLines', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.staticLines = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicBlocks', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicBlocks = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicLines', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicLines = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicFields', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicFields = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $http({url: '/api/get-playerDynamicDates', method: 'GET', params: {'playerID': $scope.playerID}})
        .success(function (data, status, headers, config) {
            $scope.dynamicDates = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

});


playerControllers.controller('StaticBlockCtrl', function ($scope) {

    $scope.insertLine = function (blockID) {

        console.log("Inserir Linha no bloco : " + blockID);

    };

    $scope.deleteLine = function (lineID) {

        console.log("Remover Linha : " + lineID);

    };

    $scope.updateLine = function (lineID) {

        var lineValue = document.getElementById("lineID"+lineID).value;
        console.log("Update da linha : " + lineID + " -> " + lineValue);

        document.getElementById("inputLine"+lineID).className = "has-success";

    };

    $scope.insertBlock = function (PlayerID) {

        console.log("Inserir bloco static no jogador : " + PlayerID);

    };

    $scope.deleteBlock = function (blockID) {

        console.log("Remover bloco : " + blockID);

    };

});

playerControllers.controller('DynamiccBlockCtrl', function ($scope) {

    $scope.insertLine = function (blockID) {

        console.log("Inserir Linha no bloco : " + blockID);

    };

    $scope.deleteLine = function (lineID) {

        console.log("Remover Linha : " + lineID);

    };

    $scope.updateLine = function (lineID) {

        var lineValue = document.getElementById("lineID"+lineID).value;
        console.log("Update da linha : " + lineID + " -> " + lineValue);

        document.getElementById("inputLine"+lineID).className = "has-success";

    };

    $scope.insertBlock = function (PlayerID) {

        console.log("Inserir bloco dynamic no jogador : " + PlayerID);

    };

    $scope.deleteBlock = function (blockID) {

        console.log("Remover bloco : " + blockID);

    };

});

playerControllers.controller('PlayerInfoCtrl', function ($scope) {

    $scope.updateName = function (PlayerID) {

        var name = document.getElementById("playerName"+PlayerID).value;
        console.log("Update nome no ID : " + PlayerID + " -> " + name);
        $scope.playerInfo.name = name;

        document.getElementById("playerName").className = "has-success";

    };

    $scope.updatePhone = function (PlayerID) {

        var phone = document.getElementById("playerPhone"+PlayerID).value;
        console.log("Update contato no ID  : " + PlayerID + " -> " + phone);

        document.getElementById("playerPhone").className = "has-success";

    };

    $scope.updateBirth = function (PlayerID) {

        var birth = document.getElementById("playerBirth"+PlayerID).value;
        console.log("Update data nascimento no ID : " + PlayerID + " -> " + birth);

        document.getElementById("playerBirth").className = "has-success";

    };


});