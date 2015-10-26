angular.module('SignupCtrl', []).controller('SignupController', function($scope, Auth) {

	$scope.tagline = 'Signup Controller for Signup Page';	
	$scope.user = {
		username: '',
		password: ''
	};
	$scope.signup = function() {
		Auth.signup($scope.user);
	};
});