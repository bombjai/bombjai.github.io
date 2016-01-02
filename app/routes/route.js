app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//var site_prefix = '/test';

$routeProvider.
  when('/home1', {
    //title: 'HOME Page',
    //controller: 'homepageCtrl',
    templateUrl: 'partials/home1.html'
  })


  .when('/home2', {
    //title: 'HOME 2 Page',
    //controller: 'homepageCtrl',
    templateUrl: 'partials/home2.html'
  })

      .otherwise({
        redirectTo: '/'
      });
 $locationProvider.html5Mode({ enable: true, requireBase: false});
}]);
