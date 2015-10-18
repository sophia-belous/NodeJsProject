angular.module('AnimalService', []).factory('Animal', ['$http', function() {
	return {
		get: function() {
			return $http.get('/api/animals');
		},
		
		create: function(animalData) {
			return $http.post('/api/animals', animalData);
		},
		
		delete: function(id) {
			return $http.delete('/api/animals' + id);
		}
	}
}]);