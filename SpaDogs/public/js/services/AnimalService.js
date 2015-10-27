angular.module('AnimalService', []).factory('Animal', ['$http', function($http) {
	return {
		get: function(success) {
			return $http.get('/api/animals').success(success);
		},
		
		create: function(animalData) {
			return $http.post('/api/animals', animalData);
		},
		
		update: function(id, animalData) {
			return $http.put('/api/animals'+ id, animalData);
		},
		
		delete: function(id) {
			return $http.delete('/api/animals' + id);
		}
	}
}]);