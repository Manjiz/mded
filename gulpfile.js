var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src([
    		'./source/js/Markdown.Converter.js',
    		'./source/js/Markdown.Sanitizer.js',
    		'./source/js/Markdown.Editor.js',
    		'./source/js/Mded.js'
    	])
        .pipe(concat('mded.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.watch('./source/js/*.js', ['scripts']).on('change', function(event) {
	console.log(event.type.toUpperCase() + ':: ' + event.path);
});

gulp.task('default', ['scripts']);