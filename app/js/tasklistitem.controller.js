app.controller("TaskListItemController", ["$scope", "$routeParams", "$location", "TaskService", function($scope, $routeParams, $location, TaskService){
console.log(" 111 Item Id  " +  $routeParams.id)
    if(!$routeParams.id) {
        $scope.taskItem = {id: 0, completed: false, itemName: "", date: new Date()};
    }else{
      console.log("i am here " + TaskService.findById($routeParams.id));
        $scope.taskItem = _.clone();
    }

    $scope.save = function(){
        TaskService.save( $scope.taskItem );
        $location.path("/");
    };
}]);
