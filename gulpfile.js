'use strict';
////////////////////////////
/////////// REQUIRED PLUGIN
////////////////////////////
var gulp =  require("gulp"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    rubysass = require("gulp-ruby-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    cssnano = require('gulp-cssnano'),
    jade = require("gulp-jade"),
    plumber = require("gulp-plumber"),
    autoPrefixer = require("gulp-autoprefixer"),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create();


///////////////////////////
////////// JADE TASK
////////////////////////////
gulp.task('jade', function() {
  return gulp.src(['assets/markup/*.jade', '!assets/markup/snippets/'])
             .pipe(plumber())
             .pipe(jade({
                  // Your options in here.
                  pretty: true
             }))
             .pipe(gulp.dest("./"))
             .pipe(browserSync.stream());
});

////////////////////////////
/////////// SASS/SCSS TASK
////////////////////////////
// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


gulp.task("rubysass", function(){
    return rubysass("assets/styles/sass/4-templates/*.sass")
               .pipe(sourcemaps.init())
               .on("error", sass.logError)
               .pipe(autoPrefixer(autoprefixerOptions))
               .pipe(sourcemaps.write("./maps"))
               .pipe(gulp.dest("assets/styles/css/templates/"))
               .pipe(browserSync.stream());

});
////////////////////////////
/////////// SCRIPTS TASK
////////////////////////////
gulp.task("scripts", function(){
  return gulp.src("assets/scripts/**/*js")
             .pipe(plumber())
             .pipe(gulp.dest("assets/scripts"))
             .pipe(browserSync.stream());

});


/////////// WATCH TASK
////////////////////////////
//this will watch the the js file in the js folder, and then while watching, the scripts task will run.
gulp.task("watch", function(){
    browserSync.init({
        server: "./"
    });
    //watch the jade file
    gulp.watch("assets/markup/**/*jade", ["jade"]).on('change', browserSync.reload);
    gulp.watch("assets/styles/sass/**/*sass", ["rubysass"]);
    gulp.watch("assets/styles/sass/**/*scss", ["rubysass"]);
    gulp.watch("assets/scripts/**/*.js", ["scripts"]);

});


////////////////////////////
/////////// DEFAULT TASK
////////////////////////////
gulp.task("default", ["jade", "rubysass", "watch"]);
