var workoutControllers = angular.module('workoutControllers', []);

workoutControllers.controller('WorkoutMainCtrl', function ($scope) {

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

});


