angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider	
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/details', {
			templateUrl: 'views/details.html',
			controller: 'DetailsController'
		});
	$locationProvider.html5Mode(true);
}]);