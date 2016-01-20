var app = angular.module('appDirectives', []);

app.directive('myNavScroll', function($window){
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			angular.element($window).bind("scroll", function() {
				if (!$scope.scrollPosition) {
					$scope.scrollPosition = 0;
				}
				if (this.pageYOffset > 150) {
					$scope.boolChangeClass = true;
				} else {
					$scope.boolChangeClass = false;
				}
				$scope.scrollPosition = this.pageYOffset;
				$scope.$apply();
			});
		}
	};	
});

app.directive('commentList', function() {
	return {
		restrict: 'E',
		scope: {
			title: '='
		},
		templateUrl: 'views/faq/commentList.html',
		controller: 'CommentsController'
	};
});