const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const plumber = require('gulp-plumber');
const sourceMaps = require('gulp-sourcemaps');

const cssFiles = [
	'node_modules/normalize.css/normalize.css',
	'app/css/**/*.css'

];
const jsFiles = [
	'node_modules/jquery/dist/jquery.min.js',
	'app/js/**/*.js'
];

function sas() {
	return gulp.src('app/sass/**/*.scss')
		//.pipe(plumber())
		.pipe(sourceMaps.init())
 		.pipe(sass())
 		.pipe(sourceMaps.write())
 		.pipe(gulp.dest('app/css'))
 		.pipe(browserSync.stream());

};

function styles(){
	return gulp.src(cssFiles)
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
        	level: 2
        }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
};

function scripts(){
	return gulp.src('app/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
};

function watch(){
	browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 9000,
        //tunnel: true,//временный тунель к проекту
        //tunnel: 'dav-site-project',
        notify: false
    });

	gulp.watch('app/sass/**/*.scss', sas);
	gulp.watch('app/css/**/*.css', styles);
	gulp.watch('app/js/**/*.js', scripts);
	gulp.watch('./*.html').on('change', browserSync.reload);			
};

function img(){
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [imageminPngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
};

function clean(){
	return del(['dist/*']);
};
function clearcache(){
	return cache.clearAll(); //при переносе изображений скинуть кеш
};

gulp.task('styles', gulp.series(sas, styles));//соединение всех файлов css в один и минимификация, автопрефиксы
gulp.task('scripts', scripts);//соединение все файлов js в один и минимиффикация
gulp.task('watch', watch);//отслеживать изменения
gulp.task('build', gulp.series(clean, 
							gulp.parallel(styles, scripts, img)
						));//удаление и перезборка проекта
gulp.task('dev', gulp.series('build', 'watch'));//перезборка и слежение
gulp.task('img', img);
gulp.task('clearcache', clearcache);