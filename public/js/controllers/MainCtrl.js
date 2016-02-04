var mainModule = angular.module('MainCtrl', []);

mainModule.controller('MainController', function($scope, Animal) {	
	
	$scope.pageClass = 'page-home';
	$scope.animals= [];
	$scope.randomAnimal = {};
	
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.slides = [
		{image:'/uploads/stylePhotos/weimaraner-puppies-adoption-41.jpg', textBig: 'To Me!', textSmall: 'Ask A Question', pageLocation: '/questions'},
		{image:'/uploads/stylePhotos/26fcbf8c1ba1a263753e20ffd83f0451.jpg', textBig: 'Companion!', textSmall: 'Find Your Best Friend', pageLocation: '/pets'},
		{image:'/uploads/stylePhotos/silver-labrador-puppy.jpg', textBig: 'Your Dog!', textSmall: 'Get To Know Everything About', pageLocation: '/about-labs'}
	];
	
	Animal.get(function(res) {
		if(res.length < 1) return;
		var animals = res;
		var index = Math.floor(Math.random() * animals.length)
		$scope.randomAnimal = animals[index];

		Animal.getPhoto($scope.randomAnimal.photos[0]).success(function(response) {
			$scope.randomAnimal.photos[0] = response;
		});
	});
});

mainModule.controller('PetsController', function($scope, $location, Animal) {
	
	$scope.pageClass = 'page-pets';

	$scope.tagline = 'Pets Controller for Pets Page';	
	
	Animal.get(function(res) {
		$scope.animals = res;
		angular.forEach($scope.animals, function(value, key) {
			var element = value;
			Animal.getPhoto(element.photos[0]).success(function(response) {
				$scope.animals[key].photos[0] = response;
			});
		});
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
		
		angular.forEach($scope.animal.photos, function(value, key) {
			Animal.getPhoto(value).success(function(response) {
				$scope.animal.photos[key] = response;	
			});	
		});				
	});
});

mainModule.controller('AboutLabsController', function($scope, $location, Article, Animal) {
	
	$scope.pageClass = 'page-about-labs';
	
	Article.get(function(res) {		
		$scope.articles = res;	
		angular.forEach($scope.articles, function(value, key) {
			var element = value;
			Animal.getPhoto(element.photo[0]).success(function(response) {
				$scope.articles[key].photo[0] = response;	
			});	
		});	
	});
	
	
	
	$scope.viewDetails = function(id) {
		$location.path('/about-labs/' + id);
	};
});	

mainModule.controller('LabArticleController', function($scope, $routeParams, Article, Animal) {
	
	$scope.pageClass = 'page-lab-article';
	
	Article.getOne($routeParams.article_id, function(res) {
		$scope.article = res;		

		Animal.getPhoto($scope.article.photo[0]).success(function(response) {
			$scope.article.photo[0] = response;	
		});		
	});	
});

mainModule.controller('QuestionController', function($scope) {
	
	$scope.pageClass = 'page-questions';
});

mainModule.controller('CommentsController', function($scope, $location, $window, Comment) {
	
	$scope.pageClass = 'page-comments';
	$scope.comment = {};
	$scope.comments = [];
	
	Comment.get(function(res) {
		$scope.comments = res;
	});
	
	$scope.addComment = function() {		
		Comment.create($scope.comment);
		Comment.get(function(res) {
			$scope.comments = res;
		});
		$scope.comment = {};
	};
	
	$scope.removeComment = function(id, index) {
		
		var deleteItem = $window.confirm('Are you sure?');
		
		if(deleteItem) {
			Comment.delete(id);
			$scope.comments.splice(index, 1);
		}		
	};
});

mainModule.controller('GalleryController', function($scope, $location, $window, Photo, Animal) {
	$scope.pageClass = 'page-comments';
	$scope.photo = {};
	$scope.photos = [];
	
	Photo.get(function(res) {
		$scope.photos = res;
		angular.forEach($scope.photos, function(value, key) {
			var element = value;
			Animal.getPhoto(element.img).success(function(response) {
				$scope.photos[key].img = response;	
			});	
		});	
	});	
});