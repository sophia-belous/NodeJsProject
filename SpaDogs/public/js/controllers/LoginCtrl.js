angular.module('LoginCtrl', []).controller('LoginController', function($scope, Auth) {

	$scope.tagline = 'Login Controller for Login Page';	
	$scope.user = {
		username: '',
		password: ''
	};
	
	$scope.login = function() {
		Auth.login($scope.user);
	};
	$scope.signup = function() {
		Auth.signup($scope.user);
	};
});