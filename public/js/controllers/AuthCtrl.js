var authApp = angular.module('AuthCtrl', []);

authApp.controller('LoginController', function($scope, Auth) {
	angular.element('.main-parallax').removeClass("display-none");
	$scope.pageClass = 'page-login';
	
	$scope.tagline = 'Login Controller for Login Page';	
	$scope.user = {
		username: '',
		password: ''
	};	
	$scope.login = function() {
		Auth.login($scope.user);
	};
	$scope.logout = function() {
		Auth.logout();
	};
});

authApp.controller('SignupController', function($scope, Auth) {
	angular.element('.main-parallax').removeClass("display-none");
	$scope.pageClass = 'page-signup';
	
	$scope.tagline = 'Signup Controller for Signup Page';	
	$scope.user = {
		username: '',
		password: ''
	};
	$scope.signup = function() {
		Auth.signup($scope.user);
	};
});