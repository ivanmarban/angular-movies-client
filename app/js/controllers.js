moviesApp.controller('HeaderCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    }
  }
]);

moviesApp.controller('HomeCtrl', ['$scope',
  function($scope) {}
]);

moviesApp.controller('MoviesCtrl', ['$scope', 'dataFactory', '$location',
  function($scope, dataFactory, $location) {
    $scope.movies = {};
    getMovies();

    function getMovies() {
      dataFactory.getMovies()
        .success(function(movies) {
          $scope.movies = movies;
        })
        .error(function(error) {
          alert('Unable to load movie data');
        });
    }
    $scope.deleteMovie = function(id) {
      dataFactory.deleteMovie(id)
        .success(function() {
          getMovies();
        })
        .error(function(error) {
          alert('Unable to delete movie');
        });
    };
    $scope.updateMovie = function(id) {
      $location.path('/movie-detail/' + id);
    };
    $scope.go = function(path) {
      $location.path(path);
    };
  }
]);

moviesApp.controller('NewMovieCtrl', ['$scope', 'dataFactory', '$location',
  function($scope, dataFactory, $location) {
    $scope.createMovie = function() {
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.movieForm.$valid) {
        dataFactory.insertMovie($scope.movie)
          .success(function() {
            $location.path('/movie-list');
          })
          .error(function(error) {
            alert('Unable to create movie');
          });
      }
    };
    $scope.reset = function() {
      $scope.$broadcast('show-errors-reset');
      $scope.movie = {
        title: '',
        year: '',
        rated: '',
        runtime: '',
        genre: '',
        director: ''
      };
    }
    $scope.cancel = function() {
      $location.path('/movie-list');
    }
  }
]);

moviesApp.controller('UpdateMovieCtrl', ['$scope', 'dataFactory', '$location', '$routeParams',
  function($scope, dataFactory, $location, $routeParams) {
    dataFactory.getMovie($routeParams.id)
      .success(function(movie) {
        $scope.movie = movie;
      })
      .error(function(error) {
        alert('Unable to load movie data');
      });
    $scope.updateMovie = function() {
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.movieForm.$valid) {
        dataFactory.updateMovie($scope.movie)
          .success(function(movie) {
            $location.path('/movie-list');
          })
          .error(function(error) {
            alert('Unable to update movie');
          });
      }
    };
    $scope.cancel = function() {
      $location.path('/movie-list');
    }
  }
]);