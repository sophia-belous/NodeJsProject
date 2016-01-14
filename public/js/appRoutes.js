angular.module('appRoutes', []).config(function($routeProvider, $locationProvider, $httpProvider) {
	
	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
		var deferred = $q.defer();
		
		$http.get('/loggedin').success(function(user) {
			if (user !== '0')
				deferred.resolve();
			else {
				deferred.reject();
				$location.url('/login');
			}
		});
		return deferred.promise;
	};
	$routeProvider	
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/admin', {
			templateUrl: 'views/admin/admin.html',
			controller: 'AdminController',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.when('/admin/edit/:animal_id', {
			templateUrl: 'views/admin/edit.html',
			controller: 'EditController',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.when('/admin/create', {
			templateUrl: 'views/admin/create.html',
			controller: 'CreateController',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.when('/admin/edit-article/:article_id', {
			templateUrl: 'views/admin/editArticle.html',
			controller: 'EditController',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.when('/admin/create-article', {
			templateUrl: 'views/admin/createArticle.html',
			controller: 'CreateController',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'SignupController'
		})
		.when('/pets', {
			templateUrl: 'views/pets.html',
			controller: 'PetsController'
		})
		.when('/pets/:animal_id', {
			templateUrl: 'views/petDetails.html',
			controller: 'DetailsController'
		})
		.when('/about-labs', {
			templateUrl: 'views/aboutLabs.html',
			controller: 'AboutLabsController'
		})
		.when('/about-labs/:article_id', {
			templateUrl: 'views/labArticle.html',
			controller: 'LabArticleController'
		});
	$locationProvider.html5Mode(true);
	
	$httpProvider.interceptors.push(function($q, $location) {
		return {
			response: function(response) {
				return response;				
			},
			responseError: function(response) {
				if (response.status === 401)
					$location.url('/login');
				return $q.reject(response);
			}
		};
	});
});