moviesApp.factory('dataFactory', ['$http', function($http) {

	var urlBase = 'http://localhost:3000/api/v1/';
	var dataFactory = {};

	dataFactory.getMovies = function() {
		return $http.get(urlBase + 'movies');
	};

	dataFactory.getMovie = function(id) {
		return $http.get(urlBase + 'movie/' + id);
	};

	dataFactory.insertMovie = function(movie) {
		return $http.post(urlBase + 'movie', movie);
	};

	dataFactory.updateMovie = function(movie) {
		return $http.put(urlBase + 'movie/' + movie.id, movie);
	};

	dataFactory.deleteMovie = function(id) {
		return $http.delete(urlBase + 'movie/' + id);
	};

	return dataFactory;

}]);