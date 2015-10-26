angular.module('AdminCtrl', []).controller('AdminController', function($scope, Auth) {

	$scope.user = {};
	$scope.tagline = 'Admin Controller for Admin Page';	
	
	$scope.login = Auth.login($scope.user);	
	$scope.logout = Auth.logout();
});