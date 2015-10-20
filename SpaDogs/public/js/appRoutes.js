angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider	
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/pets', {
			templateUrl: 'views/pets.html',
			controller: 'PetsController'
		});
	$locationProvider.html5Mode(true);
}]);