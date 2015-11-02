angular.module('AnimalService', []).factory('Animal', ['$http', function($http) {
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
		}
	};
}]);