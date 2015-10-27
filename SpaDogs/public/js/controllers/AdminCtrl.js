angular.module('AdminCtrl', []).controller('AdminController', function($scope, Animal, $location) {
	
	$scope.tagline = 'Admin Controller for Admin Page';	
	
	$scope.animal = {};
	
	Animal.get(function(res) {
		$scope.animals = res;
	});
	
	$scope.createAnimal = function() {
		Animal.create($scope.animal);
		$scope.animals.push($scope.animal);
		$scope.animal= {};
	};
	
	$scope.addAnimal = function() {
		
	};
	
	$scope.editAnimal = function(id) {
		$location.path('/edit/' + id);
	};
	
	$scope.removeAnimal = function(id) {
	};
	
});