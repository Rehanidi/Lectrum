const gulp = require('gulp');
const { series, parallel, watch} = require('gulp');
const { src, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssMin = require('gulp-cssmin');
const cssImport = require("gulp-cssimport");
const imagemin = require('gulp-imagemin');
const htmlMin = require('gulp-htmlmin');
const clean = require('gulp-clean');
const svgSprite = require( 'gulp-svg-sprite' );
// const replace = require( 'gulp-replace' );

function minCSS(){
    return gulp.src('dist/styles/styles.css')
    .pipe(autoprefixer())
    .pipe(cssMin())
    .pipe(gulp.dest('dist/styles'));
}

function importCSS(){
    let options = {};
    return gulp.src('src/styles/styles.css')
    .pipe(cssImport(options))
    .pipe(gulp.dest('dist/styles'));
}

function htmlMinFcn (){
    return gulp.src('src/*.html')
    .pipe(htmlMin({
        removeEmptyElements: false,
        removeEmptyAttributes: false,
        sortClassName:true,
        sortAttributes: true
    }))
    .pipe(gulp.dest('dist'));
}

function cleanFcn(){
    return gulp.src('dist', {read: false})
    .pipe(clean())
    .pipe(gulp.src('dist'));
}

function fontTrans() {
    return gulp.src('src/fonts/*/*.*')
    .pipe(gulp.dest('dist/fonts'));
}

function minIMG () {
    return gulp.src('src/images/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 90, progressive: true}),
        imagemin.optipng({optimizationLevel: 2}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('dist/images'))
}

function sprites() {
	return gulp.src( 'src/images/sprites/**/*.svg')
		.pipe( svgSprite( {
			shape: {
				id: {
					separator: '-',
					generator: 'svg-%s' // Генерация класса для иконки svg-name-icon
				},
			},
			mode: {
				symbol: {
					dest: '',
					// sprite: `./images/sprites/sprite.svg`, // Генерация файла svg
					inline: true,
					render: {
						scss: {
							// template: './config/sprite/tmpl_scss.mustache', // Настройка стилей для спрайта
							dest: `./styles/_sprites/` // Генерация файла стилей для спрайта
						}
					}
				}
			},
			variables: { // Базовая настройка
				baseFz: 20,
				prefixStatic: 'svg-'
			}
			} ) )
		.pipe( gulp.dest( 'dist/images/sprites' ) );
}


function libraries() {
    return gulp.src('src/library/**/*.*')
    .pipe(gulp.dest('dist/library'));
}

exports.sprite = sprites;
exports.css = minCSS;
exports.html = htmlMinFcn;
exports.import = importCSS;
exports.font = fontTrans;
exports.img = minIMG;
exports.clean = cleanFcn;
exports.library = libraries;

exports.build = series(
    cleanFcn,
		parallel(htmlMinFcn, importCSS),
    fontTrans,
		sprites,
    minIMG,
		minCSS,
		libraries,
)
