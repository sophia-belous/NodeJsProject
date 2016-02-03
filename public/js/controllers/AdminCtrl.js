var adminModule = angular.module('AdminCtrl', []);

adminModule.controller('AdminController', function($scope, Animal, Article, $location, $window) {
	
	$scope.pageClass = 'page-admin';
	
	$scope.tagline = 'Admin Controller for Admin Page';	
	
	$scope.animal = {};
	$scope.article = {};
	
	Animal.get(function(res) {
		$scope.animals = res;
	});
	
	Article.get(function(res) {
		$scope.articles = res;
	});
	
	$scope.addAnimal = function() {
		$location.path('/admin/create');
		
	};
	
	$scope.addArticle  = function() {
		$location.path('/admin/create-article');		
	};
	
	$scope.editAnimal = function(id) {
		$location.path('/admin/edit-animal/' + id);
	};
	
	$scope.editArticle = function(id) {
		$location.path('/admin/edit-article/' + id);
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
	
	$scope.removeArticle = function(id) {
		
		var deleteItem = $window.confirm('Are you sure?');
		
		if(deleteItem) {
			Article.delete(id);
			Article.get(function(res) {
			$scope.articles = res;
			});
		}		
	};	
});

adminModule.controller('EditController', function($scope, $routeParams, $location, Animal, Article) {
	
	$scope.pageClass = 'page-admin-edit';
	
	if(!angular.isUndefinedOrNull($routeParams.animal_id)) {
		Animal.getOne($routeParams.animal_id, function(res) {
			$scope.animal = res;		
		});		
	} else {
		Article.getOne($routeParams.article_id, function(res) {
			$scope.article = res;		
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
	
	$scope.cancel = function() {
		$location.path('/admin');
	};
});

adminModule.controller('CreateController', function($scope, $location, Animal, Article) {
	
	$scope.pageClass = 'page-admin-create';
	
	$scope.animal = {};
	$scope.article = {};
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
});

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null 
}

adminModule.controller('TestController', function($scope, $location, Animal) {
	/*$scope.image;
	
	$scope.uploadImg = function(file) {
		Animal.uploadPhoto(file).success(function(uploadResponse) {
			$scope.image = uploadResponse[0];
			Animal.getPhoto($scope.image).success(function(response) {
				console.log(response);
				$scope.image = response;
			});
		}).error(function(error) {
			console.log(error);
			console.log('error');
		});
	};*/
		
});