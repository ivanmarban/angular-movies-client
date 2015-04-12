var moviesApp = angular.module('ng-movies-client', ['ngRoute']);

moviesApp.config(function($routeProvider, $httpProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})
		.when('/movie-list', {
			templateUrl: 'partials/movie-list.html',
			controller: 'MoviesCtrl'
		})
		.when('/movie-creation', {
			templateUrl: 'partials/movie-creation.html',
			controller: 'NewMovieCtrl'
		})
		.when('/movie-detail/:id', {
			templateUrl: 'partials/movie-detail.html',
			controller: 'UpdateMovieCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

moviesApp.provider('showErrorsConfig', function() {
	var _showSuccess;
	_showSuccess = false;
	this.showSuccess = function(showSuccess) {
		return _showSuccess = showSuccess;
	};
	this.$get = function() {
		return {
			showSuccess: _showSuccess
		};
	};
});