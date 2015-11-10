var mainModule = angular.module('MainCtrl', [])

mainModule.controller('MainController', function($scope) {
	
	$scope.pageClass = 'page-home';
	
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.slides = [
		{image:'/uploads/stylePhotos/1440x900_High_resolution_puppy_photograph_406345.jpg', text: 'More Cats'},
		{image:'/uploads/stylePhotos/white-dog-white-background.jpg', text: 'Extra Kittys'},
		{image:'/uploads/stylePhotos/Black-Dogs-Puppies-Wallpaper-HD.jpg', text: 'Lots of Felines'}
	];
});

mainModule.controller('PetsController', function($scope, $location, Animal) {
	
	$scope.pageClass = 'page-pets';

	$scope.tagline = 'Pets Controller for Pets Page';	
	
	Animal.get(function(res) {
		$scope.animals = res;
	});
	
	$scope.viewDetails = function(id) {
		$location.path('/pets/' + id);
	};
});

mainModule.controller('DetailsController', function($scope, $routeParams, Animal) {
	
	$scope.pageClass = 'page-pet-details';
	
	$scope.tagline = 'Details Controller for Pets Page';
		
	Animal.getOne($routeParams.animal_id, function(res) {
		$scope.animal = res;		
	});
});