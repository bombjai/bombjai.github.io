app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home1', {
        templateUrl: 'public/partials/home1.html'
      }).
      when('/home2', {
        templateUrl: 'public/partials/home2.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);