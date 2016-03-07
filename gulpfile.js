var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    base64 = require('gulp-base64');

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

gulp.task('style', function() {
    return gulp.src('./source/css/*.css')
        .pipe(base64({
            extensions: ['png'],
            maxImageSize: 20*1024
        }))
        .pipe(concat('mded.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist'));
});

gulp.watch('./source/js/*.js', ['scripts']).on('change', function(event) {
	console.log(event.type.toUpperCase() + ':: ' + event.path);
});

gulp.watch('./source/css/*.*', ['style']).on('change', function(event) {
    console.log(event.type.toUpperCase() + ':: ' + event.path);
});

gulp.task('default', ['scripts', 'style']);