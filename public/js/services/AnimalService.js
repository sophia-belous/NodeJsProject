var AnimalService = angular.module('AnimalService', []);

AnimalService.factory('Animal', ['$http', function($http) {
	return {
		get: function(success) {
			return $http.get('/api/animals').success(success);
		},
		
		create: function(animalData) {
			return $http.post('/api/animals', animalData);
		},
		
		update: function(id ,animalData) {
			return $http.put('/api/animals/' + id, animalData);
		},
		
		delete: function(id) {
			return $http.delete('/api/animals/' + id);
		},
		
		getOne: function(id, success) {
			return $http.get('/api/animals/' + id).success(success);
		},
		uploadPhoto: function(photo) {
			var formData = new FormData();
			angular.forEach(photo, function(value, key) {
				formData.append('file', value);
			});		
			
			return $http.post('/api/uploads', formData, {
				headers: {'Content-type': undefined},
				transformRequest: angular.identity
			});
		},
		getPhoto: function(name) {
			return $http.get('/api/uploads/' + name);			
		},
		
		deletePhoto: function(name) {
			return $http.delete('/api/uploads/' + name);
		}
	};
}]);

AnimalService.factory('Article', ['$http', function($http) {
	return {
		get: function(success) {
			return $http.get('/api/articles').success(success);
		},
		
		create: function(animalData) {
			return $http.post('/api/articles', animalData);
		},
		
		update: function(id ,articleData) {
			return $http.put('/api/articles/' + id, articleData);
		},
		
		delete: function(id) {
			return $http.delete('/api/articles/' + id);
		},
		
		getOne: function(id, success) {
			return $http.get('/api/articles/' + id).success(success);
		}
	};
}]);

AnimalService.factory('Comment', function($http) {
	return {
		get: function(success) {
			return $http.get('/api/comments').success(success);
		},
		
		create: function(commentData) {
			return $http.post('/api/comments', commentData);
		},
		
		update: function(id ,commentData) {
			return $http.put('/api/comments/' + id, commentData);
		},
		
		delete: function(id) {
			return $http.delete('/api/comments/' + id);
		}
	};
});

AnimalService.factory('Photo', function($http) {
	return {
		get: function(success) {
			return $http.get('/api/photos').success(success);
		},
		
		create: function(photoData) {
			return $http.post('/api/photos', photoData);
		},
		
		update: function(id ,photoData) {
			return $http.put('/api/photos/' + id, photoData);
		},
		
		delete: function(id) {
			return $http.delete('/api/photos/' + id);
		},
		
		getOne: function(id, success) {
			return $http.get('/api/photos/' + id).success(success);
		}
	};	
});