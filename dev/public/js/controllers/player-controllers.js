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

playerControllers.controller('StaticBlockCtrl', function ($scope, $http) {

    $scope.insertLine = function (blockID) {

        var field = $("#staticLineField" + blockID).val().trim();
        var value = $("#staticLineValue" + blockID).val();

        if(field && field != ''){
            $http({url: '/api/insert-staticLine', method: 'POST', params: {'field': field, 'value' : value, 'blockID': blockID}})
                .success(function (data, status, headers, config) {
                    console.log("Inserir Linha no bloco : " + blockID + ' -> Field : ' + field + ' Value : ' + value);
                    var temp = {'id' : data[0].id, 'block' : blockID, 'field' : field, 'value' : value};
                    $scope.staticLines.push(temp);
                    $('#ModalStaticBlockInsertLine' + blockID).modal('toggle');
                    $("#staticLineField" + blockID).val("");
                    $("#staticLineValue" + blockID).val("");
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    console.log(data);
                });
        }

    };

    $scope.deleteLine = function (lineID) {

        $http({url: '/api/delete-staticLine', method: 'POST', params: {'lineID': lineID}})
            .success(function (data, status, headers, config) {
                console.log("Remover Linha : " + lineID);
                $('#ModalStaticBlockDeleteLine' + lineID).modal('toggle');

                $scope.staticLines = $scope.staticLines.filter(function (el) {
                    return el.id !== lineID;
                });

                $( ".modal-backdrop" ).remove();
            }).error(function (data, status, headers, config) {
                console.log(data);
            });

    };

    $scope.updateLine = function (lineID) {

        var lineValue = document.getElementById("lineID"+lineID).value;
        var originalLine = $.grep($scope.staticLines, function(e){ return e.id == lineID; });

        if(lineValue != originalLine[0].value) {

            $http({url: '/api/update-staticLine', method: 'POST', params: {'lineID': lineID, 'value' : lineValue}})
                .success(function (data, status, headers, config) {
                    console.log("Update da linha : " + lineID + " -> " + lineValue );
                    document.getElementById("inputLine" + lineID).className = "has-success";
                }).error(function (data, status, headers, config) {
                    document.getElementById("inputLine" + lineID).className = "has-error";
                    console.log(data);
                });
        }

    };

    $scope.insertBlock = function (PlayerID) {


        if ($scope.staticBlockTitle && $scope.staticBlockTitle.trim() != '') {

            $http({url: '/api/insert-staticBlock', method: 'POST', params: {'title': $scope.staticBlockTitle, 'playerID': PlayerID}})
                .success(function (data, status, headers, config) {
                    console.log("Inserir bloco static no jogador : " + PlayerID + " com o titulo: " + $scope.staticBlockTitle);
                    $scope.staticBlockName = '';
                    $('#ModalStaticBlockName').modal('toggle');

                    var temp = {'id' : data[0].id, 'title' : $scope.staticBlockTitle}
                    $scope.staticBlocks.push(temp);

                }).error(function (data, status, headers, config) {
                    console.log(data);
                });
        }

    };

    $scope.deleteBlock = function (blockID) {



        $http({url: '/api/delete-infoBlock', method: 'POST', params: {'blockID': blockID}})
            .success(function (data, status, headers, config) {
                console.log("Remover bloco : " + blockID);
                $('#ModalStaticBlockDelete'+blockID).modal('hide');

                $scope.staticBlocks = $scope.staticBlocks.filter(function (el) {
                    return el.id !== blockID;
                });

                $( ".modal-backdrop" ).remove();

            }).error(function (data, status, headers, config) {
                console.log(data);
            });




    };


});

playerControllers.controller('DynamiccBlockCtrl', function ($scope, $http) {

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

playerControllers.controller('PlayerInfoCtrl', function ($scope, $http) {

    $scope.updateName = function (PlayerID) {

        var name = (document.getElementById("playerName" + PlayerID).value).trim();

        if ($scope.playerInfo.name != name) {
            $http({url: '/api/update-playerName', method: 'POST', params: {'name': name, 'playerID': PlayerID}})
                .success(function (data, status, headers, config) {
                    console.log("Update nome no ID : " + PlayerID + " -> " + name);
                    document.getElementById("playerName").className = "has-success";
                    $scope.playerInfo.name = name;
                }).error(function (data, status, headers, config) {
                    document.getElementById("playerName").className = "has-error";
                    console.log(data);
                });
        }
    };

    $scope.updatePhone = function (PlayerID) {

        var phone = (document.getElementById("playerPhone"+PlayerID).value).trim();

        if ($scope.playerInfo.phone != phone) {
            $http({url: '/api/update-playerPhone', method: 'POST', params: {'phone': phone, 'playerID': PlayerID}})
                .success(function (data, status, headers, config) {
                    console.log("Update contato no ID  : " + PlayerID + " -> " + phone);
                    document.getElementById("playerPhone").className = "has-success";
                    $scope.playerInfo.phone = phone;
                }).error(function (data, status, headers, config) {
                    document.getElementById("playerPhone").className = "has-error";
                    console.log(data);
                });
        }
    };

    $scope.updateBirth = function (PlayerID) {

        var birth = document.getElementById("playerBirth"+PlayerID).value;

        $http({url: '/api/update-playerBirth', method: 'POST', params: {'birth': birth, 'playerID' : PlayerID}})
            .success(function (data, status, headers, config) {
                console.log("Update data nascimento no ID : " + PlayerID + " -> " + birth);
                document.getElementById("playerBirth").className = "has-success";
                $scope.playerInfo.birth_date = birth;
            }).error(function (data, status, headers, config) {
                document.getElementById("playerBirth").className = "has-error";
                console.log(data);
            });

    };


});