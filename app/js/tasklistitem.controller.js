(function () {
"use strict";

angular.module('TaskListApp')
.controller('TaskListItemController', TaskListItemController);

TaskListItemController.$inject = ["$scope", "$routeParams", "$location", "TaskService"];
function TaskListItemController($scope, $routeParams, $location, TaskService){

    var $ctrl = this;

    if(!$routeParams.id) {
        $scope.taskItem = {id: 0, completed: false, itemName: "", date: new Date()};
    }else{
      TaskService.findById($routeParams.id)
        .then(function(response) {
          $scope.taskItem = response;
        })
        .catch(function(response) {
          //console.log(response);
        });
    }

    $scope.save = function(){

        var updatedItem = TaskService.findById($scope.taskItem._id);
        var task = TaskService.save( $scope.taskItem );

        task.then(function(response){
          if(updatedItem){
            updatedItem.completed = response.completed;
            updatedItem.itemName = response.itemName;
            updatedItem.date = response.date;
          } else {
            $scope.taskItem._id = response._id;
            $scope.taskItems = new Array();
            $scope.taskItems.push($scope.taskItem);
          }
          //console.log(response);
        });
        $location.path("/");
    };
}
})();
