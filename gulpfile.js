var gulp = require("gulp"),
    sass = require("gulp-ruby-sass")
    notify = require("gulp-notify")
    gutil = require("gulp-util"),
    w3cjs = require("gulp-w3cjs"),
    csslint = require("gulp-csslint"),
    rename = require("gulp-rename")
    minifyHTML = require("gulp-minify-html");

gulp.task("csslint", function()
{
    gulp.src("src/css/**/*.css")
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task("styles", function()
{
    return gulp.src("sass/**/*.scss")
    .pipe(sass({ style: "compressed" }).on("error", gutil.log))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("src/css"))
    .pipe(notify({ message: "Styles Task Complete" }));
});

gulp.task("htmlcheck", function()
{
    return gulp.src("html/**/*.html")
    .pipe(minifyHTML())
    .pipe(w3cjs())
    .pipe(gulp.dest("src/"))
    .pipe(notify({ message: "HTML Task Complete"}));
});

gulp.task("watch", function()
{
    gulp.watch("sass/**/*.scss", ["styles"]);
    // Should probably be moved to the deploy task once we move to a template
    gulp.watch("html/**/*.html", ["htmlcheck"]);
    gulp.watch("src/css/**/*.css", ["csslint"]);
});