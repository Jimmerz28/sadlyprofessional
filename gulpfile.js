var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    gutil = require("gulp-util"),
    w3cjs = require("gulp-w3cjs"),
    csslint = require("gulp-csslint"),
    rename = require("gulp-rename"),
    minifyHTML = require("gulp-minify-html"),
    changed = require("gulp-changed"),
    imagemin = require("gulp-imagemin"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish")
    jade = require("gulp-jade");

var paths =
{
    dist: "dist",
    src: "src",
    fonts: "./fonts/**/*.{svg,eot,woff,ttf}",
    styles: "./sass/**/*.sass",
    images: "./images/**/*.{svg,png,jpg}",
    scripts: "./js/**/*.js",
    templates: "./templates/**/*.jade"
};

gulp.task("build", ["imagemin", "csslint", "htmlvalidation", "copyfonts"], function(){});

gulp.task("copyfonts", function()
{
    return gulp.src("./fonts/*", {cwd: paths.src})
    .pipe(gulp.dest("./fonts", {cwd: paths.dist}));
});

gulp.task("csslint", ["styles"], function()
{
    return gulp.src("./css/*.css", {cwd: paths.dist})
    .pipe(csslint())
    .pipe(csslint.reporter());
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
    .pipe(gulp.dest("./css", {cwd: paths.dist}));
});

gulp.task("htmlvalidation", function()
{
    return gulp.src("./html/**/*.html", {cwd: paths.src})
    .pipe(minifyHTML())
    .pipe(w3cjs())
    .pipe(gulp.dest("./", {cwd: paths.dist}));
});

gulp.task("htmlminification", function()
{
    return gulp.src("./html/**/*.html", {cwd: paths.src})
    .pipe(minifyHTML())
    .pipe(gulp.dest("./", {cwd: paths.dist}));
});

gulp.task("jadeTransform", function()
{
    return gulp.src(paths.templates, {cwd: paths.src})
    .pipe(jade())
    .pipe(gulp.dest("./", {cwd: paths.dist}));
});

gulp.task("gulpvalidate", function()
{
    return gulp.src("./gulpfile.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task("watch", function()
{
    gulp.watch("./sass/**/*.scss", {cwd: paths.src, read: false}, ["styles"]);
    // Should probably be moved to the deploy task once we move to a template
    gulp.watch("./html/**/*.html", {cwd: paths.src, read: false}, ["htmlminification"]);
    gulp.watch("./images/**/*", {cwd: paths.src, read: false}, ["imagemin"]);
    gulp.watch("./gulpfile.js", ["gulpvalidate"]);
});
