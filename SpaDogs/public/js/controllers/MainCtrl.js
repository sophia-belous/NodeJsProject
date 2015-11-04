var mainModule = angular.module('MainCtrl', [])

mainModule.controller('MainController', function($scope) {

	$scope.tagline = 'Main Controller for Home Page';
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	var slides = $scope.slides = [];
	$scope.addSlide = function() {
		var newWidth = 600 + slides.length + 1;
			slides.push({
				image: '//placekitten.com/' + newWidth + '/300',
				text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
						['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
			});
	};
	for (var i=0; i<4; i++) {
	$scope.addSlide();
	}
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