// REQUIRE DEPENDENCIES
// ============================================================
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const annotate = require('gulp-ng-annotate');


// DECLARE FILE PATHS
// ============================================================
const paths = {
  jsSource: ['./public/**/*.js'], //where you find the js files
  //** every single folder, and find * every single js file
  sassSource: ['./public/styles/**/*.scss']
  //sassSource:['main.scss']
};
// DEFINE TASKS
// ============================================================
gulp.task('js', function () {
  return gulp.src(paths.jsSource) //this is the source of the files i'll manipulate.
  .pipe(annotate())
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./public/dist'))
})

gulp.task('sass', function () {
  return gulp.src(paths.sassSource)
    .pipe(sass()) //this line converts scss to css
    .pipe(concat('style.css')) //concats into this file, stye.css
    .pipe(gulp.dest('./public/styles/css')); //in here, we tell it the file where to live
});
// WATCH TASK
// ============================================================
gulp.task('watch', function() {
  gulp.watch(paths.jsSource, ['js']); //watch all files
  gulp.watch(paths.sassSource, ['sass']);
});
// DEFAULT TASK - first thing to run when gulp is called
// ============================================================
gulp.task('default', ['watch', 'js', 'sass']);
