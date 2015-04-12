var gulp = require('gulp');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn = require('opn');

var sourcePaths = {
	styles: ['app/css/**/*.css'],
	scripts: ['app/js/**/*.js'],
	partials: ['app/partials/**/*.html']
};

var server = {
	host: 'localhost',
	port: '3001'
}

gulp.task('webserver', function() {
	gulp.src('app/.')
		.pipe(webserver({
			host: server.host,
			port: server.port,
			livereload: true,
			directoryListing: false
		}));
});

gulp.task('openbrowser', function() {
	opn('http://' + server.host + ':' + server.port);
});

gulp.task('watch', function() {
	gulp.watch(sourcePaths.styles);
	gulp.watch(sourcePaths.scripts);
	gulp.watch(sourcePaths.partials);
});

gulp.task('default', ['webserver', 'watch', 'openbrowser']);