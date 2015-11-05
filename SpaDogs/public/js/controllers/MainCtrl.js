var mainModule = angular.module('MainCtrl', [])

mainModule.controller('MainController', function($scope) {
	
	$scope.pageClass = 'page-home';
	
	$scope.myInterval = 0;
	$scope.noWrapSlides = false;
	var slides = $scope.slides = [];
	$scope.addSlide = function() {
		var newWidth = 600 + slides.length + 1;
			slides.push({
				image: '//placekitten.com/' + newWidth + '/300',
				text: ['More','Extra','Lots of'][slides.length % 3] + ' ' +
						['Cats', 'Kittys', 'Felines'][slides.length % 3]
			});
	};
	for (var i=0; i<3; i++) {
	$scope.addSlide();
	}
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