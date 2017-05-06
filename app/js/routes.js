(function () {
'use strict';

angular.module('TaskListApp')

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "views/taskList.html",
            controller: "HomeController"
        })
        .when("/addItem",{
            templateUrl: "views/addItem.html",
            controller: "TaskListItemController"
        })
        .when('/addItem/edit/:id',{
            templateUrl: 'views/addItem.html',
            controller: 'TaskListItemController',
            controllerAs: 'myTaskCtrl'
        })
        .otherwise({
            redirectTo: "/"
        })
});

})();
