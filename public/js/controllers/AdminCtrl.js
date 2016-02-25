var adminModule = angular.module('AdminCtrl', []);

adminModule.controller('AdminController', function($scope, Animal, Article, Photo, $location, $window) {
	angular.element('.main-parallax').removeClass("display-none");
	$scope.pageClass = 'page-admin';
	
	$scope.tagline = 'Admin Controller for Admin Page';	
	
	$scope.animal = {};
	$scope.article = {};
	$scope.photo = {};
	
	Animal.get(function(res) {
		$scope.animals = res;
	});
	
	Article.get(function(res) {
		$scope.articles = res;
	});
	
	Photo.get(function(res) {
		$scope.photos = res;
	});
	
	$scope.addAnimal = function() {
		$location.path('/admin/create');		
	};
	
	$scope.addArticle  = function() {
		$location.path('/admin/create-article');		
	};
	
	$scope.addPhoto  = function() {
		$location.path('/admin/create-photo');		
	};
	
	$scope.editAnimal = function(id) {
		$location.path('/admin/edit-animal/' + id);
	};
	
	$scope.editArticle = function(id) {
		$location.path('/admin/edit-article/' + id);
	};
	
	$scope.editPhoto = function(id) {
		$location.path('/admin/edit-photo/' + id);
	};
	
	$scope.removeAnimal = function(id, index) {
		
		var deleteItem = $window.confirm('Are you sure?');
		
		if(deleteItem) {
			Animal.getOne(id, function(res) {
				var photos = res.photos;
								
				angular.forEach(photos, function(value, key) {
					var element = value;
					Animal.deletePhoto(element);
				});			
			});		
			Animal.delete(id);
			$scope.animals.splice(index, 1);
		}		
	};
	
	$scope.removeArticle = function(id, index) {
		
		var deleteItem = $window.confirm('Are you sure?');
		
		if(deleteItem) {
			Article.getOne(id, function(res) {
				var photo = res.photo[0];							
				Animal.deletePhoto(photo);		
			});		
			Article.delete(id);
			$scope.articles.splice(index, 1);
		}		
	};
	$scope.removePhoto = function(id, index) {
		
		var deleteItem = $window.confirm('Are you sure?');
		
		if(deleteItem) {
			Photo.getOne(id, function(res) {
				var photo = res.img;							
				Animal.deletePhoto(photo);		
			});	
			Photo.delete(id);
			$scope.photos.splice(index, 1);
		}		
	};		
});

adminModule.controller('EditController', function($scope, $routeParams, $location, Animal, Article, Photo) {
	angular.element('.main-parallax').removeClass("display-none");
	$scope.pageClass = 'page-admin-edit';
	
	if(!angular.isUndefinedOrNull($routeParams.animal_id)) {
		Animal.getOne($routeParams.animal_id, function(res) {
			$scope.animal = res;		
		});		
	} else if(!angular.isUndefinedOrNull($routeParams.article_id)) {
		Article.getOne($routeParams.article_id, function(res) {
			$scope.article = res;		
		});	
	} else {
		Photo.getOne($routeParams.photo_id, function(res) {
			$scope.photo = res;
		});
	}
	
	$scope.updateAnimal = function() {
		Animal.update($routeParams.animal_id, $scope.animal);
		$location.path('/admin');
	};
	
	$scope.updateArticle = function() {
		Article.update($routeParams.article_id, $scope.article);
		$location.path('/admin');
	};
	
	$scope.updatePhoto = function() {
		Photo.update($routeParams.photo_id, $scope.photo);
		$location.path('/admin');
	};
	
	$scope.cancel = function() {
		$location.path('/admin');
	};
});

adminModule.controller('CreateController', function($scope, $location, Animal, Article, Photo) {
	angular.element('.main-parallax').removeClass("display-none");
	$scope.pageClass = 'page-admin-create';
	
	$scope.animal = {};
	$scope.article = {};
	$scope.photo = {};
	$scope.createAnimal = function(photoFile) {
		Animal.uploadPhoto(photoFile).success(function (uploadResponse) {
			$scope.animal.photos = uploadResponse;
        	console.log(uploadResponse);
			Animal.create($scope.animal);
			$scope.animal= {};
			$location.path('/admin');
      	}).error(function (error) {
        	console.log(error);
      	});	
	};
	
	$scope.createArticle = function(photoFile) {
		Animal.uploadPhoto(photoFile).success(function (uploadResponse) {
			$scope.article.photo = uploadResponse;
        	console.log(uploadResponse);
			Article.create($scope.article);
			$scope.article= {};
			$location.path('/admin');
      	}).error(function (error) {
        	console.log(error);
      	});	
	};
	
	$scope.createPhoto = function(photoFile) {
		Animal.uploadPhoto(photoFile).success(function (uploadResponse) {
			$scope.photo.img = uploadResponse[0];
			Photo.create($scope.photo);
			$scope.photo = {};
			$location.path('/admin');
      	}).error(function (error) {
        	console.log(error);
      	});	
	};
});

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null 
};