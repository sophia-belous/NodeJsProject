var mainModule = angular.module('MainCtrl', [])

mainModule.controller('MainController', function($scope) {

	$scope.tagline = 'Main Controller for Home Page';
});

mainModule.controller('PetsController', function($scope, $location, Animal) {

	$scope.tagline = 'Pets Controller for Pets Page';	
	
	Animal.get(function(res) {
		$scope.animals = res;
	});
	
	$scope.viewDetails = function(id) {
		$location.path('/pets/' + id);
	};
});

mainModule.controller('DetailsController', function($scope, $routeParams, Animal) {
	$scope.tagline = 'Details Controller for Pets Page';
		
	Animal.getOne($routeParams.animal_id, function(res) {
		$scope.animal = res;		
	});
});