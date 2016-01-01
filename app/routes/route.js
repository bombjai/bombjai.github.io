app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  //var site_prefix = '/firefly';
$routeProvider.
  when('/home1', {
    controller: 'homepageCtrl',
    templateUrl: '../public/partials/home1.html'
  }).
  when('/home2', {
    controller: 'homepageCtrl',
    templateUrl: '../public/partials/home2.html'
  });

  //$locationProvider.html5Mode(true);
}]);
