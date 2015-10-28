var adminModule = angular.module('AdminCtrl', []);

adminModule.controller('AdminController', function($scope, Animal, $location, $window) {
	
	$scope.tagline = 'Admin Controller for Admin Page';	
	
	$scope.animal = {};
	
	Animal.get(function(res) {
		$scope.animals = res;
	});
	
	/*$scope.createAnimal = function() {
		Animal.create($scope.animal);
		$scope.animals.push($scope.animal);
		$scope.animal= {};
	};*/
	
	$scope.addAnimal = function() {
		$location.path('/admin/create');
		
	};
	
	$scope.editAnimal = function(id) {
		$location.path('/admin/edit/' + id);
	};
	
	$scope.removeAnimal = function(id) {
		
		var deleteItem = $window.confirm('Are you sure?');
		
		if(deleteItem) {
			Animal.delete(id);
			Animal.get(function(res) {
			$scope.animals = res;
			});
		}		
	};	
});

adminModule.controller('DetailsController', function($scope, $routeParams, $location, Animal) {
	
	Animal.getOne($routeParams.animal_id, function(res) {
		$scope.animal = res;		
	});
	
	$scope.updateAnimal = function() {
		Animal.update($routeParams.animal_id, $scope.animal);
		$location.path('/admin');
	};
	
	$scope.cancel = function() {
		$location.path('/admin');
	};
});

adminModule.controller('CreateController', function($scope, $location, Animal) {
	$scope.animal = {};
	$scope.createAnimal = function() {
		Animal.create($scope.animal);
		//$scope.animals.push($scope.animal);
		$scope.animal= {};
		$location.path('/admin');
	};
});