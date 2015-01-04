var workoutControllers = angular.module('workoutControllers', []);

workoutControllers.controller('WorkoutMainCtrl', function ($scope, $http) {

    $scope.workoutPlan = {id: 0, title: '', material: '', objectives: '', exercises: [{id:0, description: '', duration: '', focus: ''}]};

    $scope.newWorkout = function () {
        $scope.workoutPlan = {id: 0, title: '', material: '', objectives: '', exercises: [{id:0, description: '', duration: '', focus: ''}]};
    }

    $scope.addLine = function () {
        $scope.workoutPlan.exercises.push({id:0, description: '', duration: '', focus: ''});
    }

    $scope.removeLine = function () {
        $scope.workoutPlan.exercises.pop();
    }

    $scope.insertWorkout = function () {

        $scope.workoutPlan.exercises =$scope.workoutPlan.exercises.filter(function(el) {
            return el.description !== "" || el.focus !== "" || el.duration !== "";
        });

        $http
            .post('/api/insert-workoutPlan', $scope.workoutPlan)
            .success(function (data, status, headers, config) {
                window.location.reload();
            })
            .error(function (data, status, headers, config) {
                console.log(data);
            });
    }
});

workoutControllers.controller('AllWorkouts', function ($scope, $http) {

    $http({url: '/api/get-allWorkouts', method: 'GET', params: {}})
        .success(function (data, status, headers, config) {
            $scope.workouts = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

    $scope.showWorkout = function (workout) {
        //console.log(workout);
        $http({url: '/api/get-workoutExercises', method: 'GET', params: {'workoutID' : workout.id}})
            .success(function (data, status, headers, config) {
                $scope.workoutPlan.id = workout.id;
                $scope.workoutPlan.title = workout.title;
                $scope.workoutPlan.material = workout.material;
                $scope.workoutPlan.objectives = workout.objectives;
                $scope.workoutPlan.exercises = data;
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
    }

    $scope.removeWorkout = function (workoutID) {

        $http({url: '/api/delete-workoutPlan', method: 'POST', params: {'workoutID': workoutID}})
            .success(function (data, status, headers, config) {
                $scope.workouts = $scope.workouts.filter(function(el) {
                    return el.id !== workoutID;
                });
                $( ".modal-backdrop" ).remove();

            }).error(function (data, status, headers, config) {
                console.log(data);
            });
    }

});


