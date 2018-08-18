'use strict';

var gulp          = require('gulp'),
    concatCss     = require('gulp-concat-css'),
    cleanCSS      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    connect       = require('gulp-connect'),
    prefix        = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglifyjs'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant');
    // browserSync   = require('browser-sync').create()


// gulp.task('browser-sync', ['styles', 'scripts'], function() {
// 		browserSync.init({
// 				server: {
// 						baseDir: "./src"
// 				},
// 				notify: false
// 		});
// });

// server connect 
gulp.task('connect', function(){
   connect.server ({
     root: 'src',
     livereload: true
   });
});

// css
gulp.task('css', function(){
	return gulp.src ([
    'src/css/*.css'    
    ])
   .pipe(concatCss('bundle.css'))
   .pipe(prefix(' last 15 version'))
   .pipe(rename('bundle.min.css'))
   .pipe(cleanCSS(''))
   .pipe(gulp.dest('build/css'))
   .pipe(connect.reload())
});

// script 
gulp.task('scripts', function(){
 return gulp.src([
  'src/libs/jquery/jquery-1.11.2.min.js'
  ])
  .pipe(concat('bundle.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));

});

// html (Если пользуетесь плагином gulp hammle)
gulp.task('html', function(){
  gulp.src('src/index.html')
  .pipe(gulp.dest('build'))
  .pipe(connect.reload());
});

//image-png
gulp.task('img',function(){
  return gulp.src([
    'src/img/**/*'
    ])
    .pipe(imagemin({
     interlaced : true,
     progressive : true,
     svgoPlugins : [{removeViewBox: false}],
     une: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
  
});

// watch
gulp.task('watch', function(){
   gulp.watch('src/css/*.css', ['css']);
   gulp.watch('src/js/*.js', ['js']);
   gulp.watch('src/index.html', ['html']);
});

// default
gulp.task('default',['connect', 'html', 'img' ,'css', 'watch']);