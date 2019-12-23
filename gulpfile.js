const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', () => {
    return gulp.src('src/styles/**/style.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe(rename({
        suffix: ".min.purged"
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('img', () => 
    gulp.src('src/images/**/*')
    .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({})
    ]))
    .pipe(gulp.dest('public/images'))
);

gulp.task('watch', () => {
    gulp.watch(['src/styles/*.sass', 'views/*.pug'], gulp.series('sass'));
    gulp.watch('src/images/*', gulp.series('img'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
});