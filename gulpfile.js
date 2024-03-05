const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const replace = require('gulp-replace');

gulp.task('default', ['transformJs', 'movingCss', 'movingImages']);
gulp.task('transformJs', () =>
    gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(replace(/\.less/g, '.css'))
        .pipe(gulp.dest('lib'))
);
gulp.task('transformLess', () =>
    gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('lib'))
);

gulp.task('movingCss', ['transformLess'], () => {
    gulp.src('src/**/*.css')
        .pipe(gulp.dest('lib'))
});

gulp.task('movingImages', () =>
    gulp.src('src/**/images/*')
        .pipe(gulp.dest('lib'))
);

gulp.task('watch', () => {
    gulp.watch('src/**/*.*', ['default']);
})
