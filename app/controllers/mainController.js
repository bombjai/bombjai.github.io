app.controller('homepageCtrl', ['$scope', function($scope) {
	$scope.firstName = 'BOmbjai';
	$scope.greeting = { text: 'Hello' };
	console.log($scope.greeting);
}]);


app.controller('homeOneCtrl', ['$scope', function($scope) {
	$scope.firstName = 'my FIRST PAGE ROUTE';
}]);


app.controller('homeTwoCtrl', ['$scope', function($scope) {
	$scope.firstName = 'SECOND PAGE IS GOOD';
}]);



app.controller("PaginationCtrl", ['$scope', 'Item', function($scope, Item) {

  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;
  $scope.total = Item.total();
  $scope.pagedItems = Item.get($scope.currentPage*$scope.itemsPerPage,
    $scope.itemsPerPage);

  $scope.loadMore = function() {
    $scope.currentPage++;
    var newItems = Item.get($scope.currentPage*$scope.itemsPerPage,
      $scope.itemsPerPage);
    $scope.pagedItems = $scope.pagedItems.concat(newItems);
  };

  $scope.nextPageDisabledClass = function() {
    return $scope.currentPage === $scope.pageCount()-1 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.total/$scope.itemsPerPage);
  };

}]);