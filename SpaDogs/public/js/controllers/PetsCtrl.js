angular.module('PetsCtrl', []).controller('PetsController', function($scope, Animal) {

	$scope.tagline = 'Pets Controller for Pets Page';	
	
	Animal.get().success(function(res) {
		$scope.animals = res;
	});

});