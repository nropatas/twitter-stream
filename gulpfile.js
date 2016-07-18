'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat-css');
const cssnano = require('gulp-cssnano');
const server = require('gulp-develop-server');

gulp.task('concat', () => {
    return gulp.src('assets/css/*.css')
        .pipe(concat("style.css"))
        .pipe(gulp.dest('public/css'));
});

gulp.task('minify', ['concat'], () => {
    gulp.src('public/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('public/css'));
});

gulp.task('start', ['minify'], () => {
    server.listen({
        path: 'app.js'
    });
});

gulp.task('restart', ['minify'], () => {
    server.restart();
});

gulp.task('default', ['start'], () => {
    gulp.watch('**/*.js', ['restart']);
});
