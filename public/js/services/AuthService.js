angular.module('AuthService', []).factory('Auth', ['$http', '$location', function($http, $location) {
	return {				
		login: function(userData) {
			return $http.post('/login', {
				username: userData.username,
				password: userData.password				
			})
			.success(function(user) {
				$location.url('/admin');
			})
			.error(function() {
				$location.url('/login');
			});
		},
		logout: function() {
			return $http.post('/logout');
		},
		signup: function(userData) {
			return $http.post('/signup', {
				username: userData.username,
				password: userData.password				
			})
			.success(function(user) {
				$location.url('/admin');
			})
			.error(function() {
				$location.url('/signup');
			});
		}
		
	};
}]);