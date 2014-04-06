var gulp = require("gulp"),
    sass = require("gulp-ruby-sass")
    notify = require("gulp-notify")
    gutil = require("gulp-util");

gulp.task('default', function()
{
    // place code for your default task here
});

gulp.task("styles", function()
{
    return gulp.src("sass/**/*.scss")
    .pipe(sass({ style: "compressed" }).on("error", gutil.log))
    .pipe(gulp.dest("src/css"))
    .pipe(notify({ message: "Styles task complete" }));
});

gulp.task("watch", function()
{
    gulp.watch("sass/**/*.scss", ["styles"]);
});