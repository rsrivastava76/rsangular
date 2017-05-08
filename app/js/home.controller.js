
(function () {
"use strict";

angular.module('TaskListApp')
.controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'TaskService', '$location'];
function HomeController($scope, TaskService, $location) {
    var $ctrl = this;

      TaskService.getAllItems()
        .then(function(response) {
          $ctrl.taskItems = response;
        })
        .catch(function(response) {
          //console.log(response);
        });

    $scope.removeItem = function(entry) {
      var task = TaskService.removeItem(entry);
      task.then(function(response){
      //  console.log(response);
        var index = $ctrl.taskItems.indexOf(entry);
        $ctrl.taskItems.splice(index, 1);
      });
    };

    $scope.markCompleted = function(entry){
      var task = TaskService.markCompleted(entry);
      task.then(function(response){
        entry.completed = !entry.completed;
      //  console.log(response);
      });
    };

    $scope.$watch( function(){ return TaskService.taskItems; }, function(taskItems) {
        $scope.taskItems = taskItems;
    })
}

})();
