app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home1', {
                templateUrl: 'partials/home1.html'
      }).
      when('/home2', {
        templateUrl: 'partials/home2.html'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);