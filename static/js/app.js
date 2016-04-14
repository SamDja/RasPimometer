var raspimometer = angular.module('raspimometer', [
  'ngRoute',
  'termoModule'
]);

raspimometer.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'static/partial/home.html',
    controller: 'termoController'
  })
  .when ('/error', {
    templateUrl: 'static/partial/error.html'
  })
  .otherwise({
    redirectTo: '/error'
  });

    $locationProvider.html5Mode(true);
}]);
