// angular help to setup route
// https://github.com/angular/angular-phonecat/compare/step-6...step-7
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/home1', {
        templateUrl: 'public/partials/home1.html',
        controller: 'homeOneCtrl'
      }).
      when('/home2', {
        templateUrl: 'public/partials/home2.html',
        controller: 'homeTwoCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);