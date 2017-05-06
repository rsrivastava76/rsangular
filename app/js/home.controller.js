

app.controller("HomeController", ["$scope", "TaskService", function($scope, TaskService) {
    $scope.taskItems = TaskService.taskItems;
    $scope.removeItem = function(entry){
        TaskService.removeItem(entry);
    };

    $scope.markCompleted = function(entry){
        TaskService.markCompleted(entry);
    };
    $scope.$watch( function(){ return TaskService.taskItems; }, function(taskItems) {
        $scope.taskItems = taskItems;
    })

}]);
