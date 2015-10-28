var mainModule = angular.module('MainCtrl', [])

mainModule.controller('MainController', function($scope) {

	$scope.tagline = 'Main Controller for Home Page';
});

mainModule.controller('PetsController', function($scope, Animal) {

	$scope.tagline = 'Pets Controller for Pets Page';	
	
	Animal.get(function(res) {
		$scope.animals = res;
	});
});