
(function() {
"use strict";

angular.module('TaskListApp', ['ngRoute'])
.constant('ApiPath', 'http://localhost:3000')
.directive("tbTaskItem", function(){
    return{
        restrict: "E",
        templateUrl: "views/taskItem.html"
    }
});

})();
