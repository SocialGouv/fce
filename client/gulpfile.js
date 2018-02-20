"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var filelog = require("gulp-filelog");

var SCSS_GLOB = "src/**/scss/*.scss";

gulp.task("sass", function() {
  return gulp
    .src(SCSS_GLOB, { base: "." })
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["node_modules"],
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(
      rename(function(path) {
        path.dirname += "/..";
      })
    )
    .pipe(filelog())
    .pipe(gulp.dest("."));
});

gulp.task("sass:watch", function() {
  gulp.watch(SCSS_GLOB, ["sass"]);
});

gulp.task("default", ["sass", "sass:watch"]);
