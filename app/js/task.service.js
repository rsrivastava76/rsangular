(function () {
"use strict";

angular.module('TaskListApp')
.service('TaskService', TaskService);


MenuService.$inject = ['$http', 'ApiPath'];
function TaskService($http, ApiPath) {

app.service("TaskService", function($http){
    var taskService = {};
    taskService.taskItems = [];
    $http.get("http://localhost:3000/items")
        .success(function(data){
            console.log("Test data " + data);
            taskService.taskItems = data;
            for(var item in taskService.taskItems){
                taskService.taskItems[item].date = new Date(taskService.taskItems[item].date);
            }
        })
        .error(function(data,status){
            alert("Things went wrong!");
        });

        taskService.findById = function(itemId){
          console.log("Item Id  " + itemId);
            $http.get("http://localhost:3000/items/"+itemId)
                .success(function(data){
                  console.log(" Item Id data  " + data );
                  taskService.taskItems = data;
                  for(var item in taskService.taskItems){
                      taskService.taskItems[item].date = new Date(taskService.taskItems[item].date);
                  }

                  //return data;
                })
                .error(function(data, status){
                    console.log("erroor  " + status );
                });
        };
/*
    taskService.findById = function(id){
        for(var item in taskService.taskItems){
            if(taskService.taskItems[item].id === id) {
                console.log(taskService.taskItems[item]);
                return taskService.taskItems[item];
            }
        }
    };
*/
    taskService.getNewId = function(){
        if(taskService.newId){
            taskService.newId++;
            return taskService.newId;
        }else{
            var maxId = _.max(taskService.taskItems, function(entry){ return entry.id;})
            taskService.newId = maxId.id + 1;
            return taskService.newId;
        }
    };

    taskService.markCompleted = function(entry){
        entry.completed = !entry.completed;
    };

    taskService.removeItem = function(entry){
        $http.delete("http://localhost:3000/item/"+entry._id)
            .success(function(data){
              console.log(entry._id + "test ==" + data.status);
                if(data.status){
                    var index = taskService.taskItems.indexOf(entry);
                    taskService.taskItems.splice(index, 1);
                }
            })
            .error(function(data, status){

            });
    };

    taskService.save = function(entry) {

        var updatedItem = taskService.findById(entry.id);
        if(updatedItem){
          console.log("Update == " + entry.id);
            $http.put("http://localhost:3000/item/"+entry.id, entry)
                .success(function(data){
                    if(data.status == 1) {
                        updatedItem.completed = entry.completed;
                        updatedItem.itemName = entry.itemName;
                        updatedItem.date = entry.date;
                    }
                })
                .error(function(data, status){

                })
        }else {
            $http.post("http://localhost:3000/item/", entry)
                .success(function(data){
                    entry.id = data.newId;
                })
                .error(function(data, status){

                });
            taskService.taskItems.push(entry);
        }
    };
    return taskService;
});
