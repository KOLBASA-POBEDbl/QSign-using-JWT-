const gulp = require ('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require ('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');


gulp.task('scss', () => {
    return gulp
    .src('public/styles/dev/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions','> 1%','ie 8', 'ie 7'], {cascsde: true}))
    .pipe(cssnano())
    .pipe(gulp.dest('public/styles/dist'));
});

gulp.task('scripts', () =>
    gulp
    .src('public/scripts/dev/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/dist//'))
);

gulp.task('default', gulp.series('scss', 'scripts'),() =>{
    gulp.watch('site/styles/dev/**/*.scss', ['scss']);
    gulp.watch('public/scripts/dev/**/*.js', ['scripts']);
});