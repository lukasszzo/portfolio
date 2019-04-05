import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean-css';
import browserSync from 'browser-sync';
import del from 'del';

const sync=browserSync.create();
const reload=sync.reload;


gulp.task('sass',() => {
    return gulp.src('./src/sass/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:['last 2 versions']
    }))
    .pipe(clean())
    .pipe(gulp.dest('./dist/css'))
    .pipe(sync.stream());
});

function refresh(done){
    reload();
    done()
}

gulp.task('js',gulp.series(
    function js(){
        return  gulp.src('./src/js/*.js')
        .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
        },refresh));


gulp.task('static',gulp.series(
    function moveHtml(){
        return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
    },
    function moveImages(){
    return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./dist/img'));
    },
    refresh
));

gulp.task('clean', () => {
    return del('./dist')
});

gulp.task('build', gulp.series(['clean', 'sass', 'js', 'static']));

function server(){
    return sync.init({
        injectChanges:true,
        server: './dist'
    });
    done();
};

gulp.task('default',gulp.series(['build']));

gulp.task('watch',gulp.series(['default'],function watch(){
    gulp.watch('src/sass/main.scss', gulp.series(['sass']));
    gulp.watch('src/js/**/*.js', gulp.series(['js']));
    gulp.watch('src/**/*.html', gulp.series(['static']));
    return server();
}));

