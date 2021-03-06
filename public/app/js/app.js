'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngSanitize']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'app/partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/search/:query', {templateUrl: 'app/partials/partial1.html', controller: MyCtrl1});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
