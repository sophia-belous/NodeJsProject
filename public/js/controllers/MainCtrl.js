var mainModule = angular.module('MainCtrl', [])

mainModule.controller('MainController', function($scope) {
	
	
	
	$scope.pageClass = 'page-home';
	
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.slides = [
		{image:'/uploads/stylePhotos/weimaraner-puppies-adoption-41.jpg', textBig: 'Creatures!', textSmall: 'The Most Gracious', pageLocation: '/pets'},
		{image:'/uploads/stylePhotos/26fcbf8c1ba1a263753e20ffd83f0451.jpg', textBig: 'Companion!', textSmall: 'Find Your Best Friend', pageLocation: '/pets'},
		{image:'/uploads/stylePhotos/silver-labrador-puppy.jpg', textBig: 'Your Dog!', textSmall: 'Get To Know Everything About', pageLocation: '/about-labs'}
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

mainModule.controller('AboutLabsController', function($scope, $location) {
	
	$scope.pageClass = 'page-about-labs';
	
	$scope.articles = [
		{ title: 'title1', date: '01.13.2016', shortDesc: 'shortDesc1', description: 'description1', photo: '/uploads/stylePhotos/silver-labrador-puppy.jpg' },
		{ title: 'title2', date: '01.13.2016', shortDesc: 'shortDesc2', description: 'description2', photo: '/uploads/stylePhotos/silver-labrador-puppy.jpg' },
		{ title: 'title3', date: '01.13.2016', shortDesc: 'shortDesc3', description: 'description3', photo: '/uploads/stylePhotos/silver-labrador-puppy.jpg' }
	];
	$scope.viewDetails = function(id) {
		$location.path('/about-labs/' + id);
	};
});	

mainModule.controller('LabArticleController', function($scope, $routeParams) {
	
	$scope.pageClass = 'page-lab-article';
	
	$scope.article = { title: 'title1', date: '01.13.2016', shortDesc: 'shortDesc1', description: 'description1', photo: '/uploads/stylePhotos/silver-labrador-puppy.jpg' };

});