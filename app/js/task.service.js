(function () {
"use strict";

angular.module('TaskListApp')
.service('TaskService', TaskService);

TaskService.$inject = ['$http'];
function TaskService($http) {

  var taskService = this;

  taskService.getAllItems = function () {
    return $http.get("http://localhost:3000/items").then(function (response) {
      //console.log(response.data);
      return response.data;
    });
  };

  taskService.findById = function (itemId) {
    //console.log(itemId);
    return $http.get("http://localhost:3000/items/"+itemId).then(function (response) {
      //console.log(response.data);
      return response.data;
    });
  };

  taskService.removeItem = function (entry) {
    //console.log(entry._id);
    return $http.delete("http://localhost:3000/item/"+entry._id).then(function (response) {
      //console.log(response.data);
      return response.data;
    });
  };

  //ADD and update of Task
  taskService.save = function(entry) {
    //console.log("Item Id  " + entry._id);
    if(entry._id > '0') {
      return $http.put("http://localhost:3000/item/"+entry._id, {"completed": entry.completed, "taskName": entry.taskName},{}).then(function (response) {
        return response.data;
      });
    }else {
      return $http.post("http://localhost:3000/item/", entry).then(function (response) {
        return response.data;
      });
    }

  };

    // for update status
    taskService.markCompleted = function(entry) {
      if(entry._id > '0') {
        var completed = false;
        if (entry.completed == false ){
          completed = 'true';
        }
        return $http.put("http://localhost:3000/item/"+entry._id, {"completed": completed, "taskName": entry.taskName},{}).then(function (response) {
          //console.log(response.data);
          return response.data;
        });
      } else {
        return ("error while marking");
      }
    };
}
})();
