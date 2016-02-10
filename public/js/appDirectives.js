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

app.directive('mySmoothScroll', function($window) {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			var t = this, h = document.documentElement;
			element = window;
				t.rAF = false;
				t.target = 0;
				t.scroll = 0;
				t.animate = function() {
					t.scroll += (t.target - t.scroll) * 0.1;
					
					if (Math.abs(t.scroll.toFixed(5) - t.target) <= 0.47131) {
						cancelAnimationFrame(t.rAF);
						t.rAF = false;
					}
					if (element == window) scrollTo(0, t.scroll);
					else element.scrollTop = t.scroll;
					
					if (t.rAF) t.rAF = requestAnimationFrame(t.animate);
				};
				
			angular.element($window).bind("scroll", function() {	
				if (t.rAF) return;
				
				t.target = (element == window) ? pageYOffset || h.scrollTop : element.scrollTop;
				t.scroll = t.target;				
			});
						
			angular.element($window).bind("mousewheel", function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				var scrollEnd = (element == window) ? h.scrollHeight - h.clientHeight : element.scrollHeight - element.clientHeight;
				
				t.target += (e.originalEvent.wheelDelta > 0) ? -70 : 70;
				if (t.target < 0) t.target = 0;
				if (t.target > scrollEnd) t.target = scrollEnd;
				if (!t.rAF) t.rAF = requestAnimationFrame(t.animate);
			});
			
		}
	};
});

app.directive('testDir', function() {
    return {
        restrict: 'A',
        list: function($scope, element, attrs) {
            
        }
    }           
 
});