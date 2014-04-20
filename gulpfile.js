var gulp = require("gulp"),
    sass = require("gulp-ruby-sass")
    notify = require("gulp-notify")
    gutil = require("gulp-util"),
    w3cjs = require("gulp-w3cjs"),
    csslint = require("gulp-csslint"),
    rename = require("gulp-rename"),
    minifyHTML = require("gulp-minify-html"),
    changed = require("gulp-changed"),
    imagemin = require("gulp-imagemin");

var paths =
{
    dist: "dist",
    src: "src"
}

gulp.task("build", ["imagemin","csslint","htmlcheck","copyfonts"], function(){});

gulp.task("copyfonts", function()
{
    return gulp.src("./fonts/*", {cwd: paths.src})
    .pipe(gulp.dest("./fonts", {cwd: paths.dist}));
});

gulp.task("csslint", ["styles"], function()
{
    return gulp.src("./css/**/*.css", {cwd: paths.dist})
    .pipe(csslint())
    .pipe(csslint.reporter())
});

gulp.task("imagemin", function()
{
    return gulp.src("./images/**/*", {cwd: paths.src})
    .pipe(changed("./images", {cwd: paths.dist}))
    .pipe(imagemin())
    .pipe(gulp.dest("./images", {cwd: paths.dist}));
});

gulp.task("styles", function()
{
    return gulp.src("./sass/**/*.scss", {cwd: paths.src})
    .pipe(sass({ style: "compressed" }).on("error", gutil.log))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./css", {cwd: paths.dist}))
    .pipe(notify({ message: "Styles Task Complete!" }));
});

gulp.task("htmlcheck", function()
{
    return gulp.src("./html/**/*.html", {cwd: paths.src})
    .pipe(minifyHTML())
    .pipe(w3cjs())
    .pipe(gulp.dest("./", {cwd: paths.dist}))
    .pipe(notify({ message: "HTML Task Complete!"}));
});

gulp.task("watch", function()
{
    gulp.watch("./sass/**/*.scss", {cwd: paths.src, read: false}, ["csslint"]);
    // Should probably be moved to the deploy task once we move to a template
    gulp.watch("./html/**/*.html", {cwd: paths.src, read: false}, ["htmlcheck"]);
    gulp.watch("./images/**/*", {cwd: paths.src, read: false}, ["imagemin"]);
});