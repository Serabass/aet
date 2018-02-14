var gulp = require('gulp');
var ts = require('gulp-typescript');
let tsConfigFileName = 'tsconfig.json';

gulp.task('default', ['compile', 'typings']);

gulp.task('compile', function () {
    var tsProject = ts.createProject(tsConfigFileName);
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('typings', function () {
    var tsProject = ts.createProject(tsConfigFileName);
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.dts.pipe(gulp.dest('dist'));
});
