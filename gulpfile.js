let project_foler = "dist";
let source_foler = "#src";

let patch = {
	build: {
		html: project_foler + "/",
		css: project_foler + "/css/",
		js: project_foler + "/js/",
		img: project_foler + "/images/",
		fonts: project_foler + "/fonts/",
	},
	src: {
		html: [source_foler + "/html/**/*.html", "!" + source_foler + "/html/**/_*.html"],
		css: source_foler + "/scss/main.scss",
		js: source_foler + "/js/main.js",
		img: source_foler + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_foler + "/fonts/src/*.ttf",
	},
	watch: {
		html: [source_foler + "/html/**/*.html", source_foler + "/modules/**/*.html"],
		css: [source_foler + "/scss/**/*.scss", source_foler + "/modules/**/*.scss"],
		js: [source_foler + "/js/**/*.js", source_foler + "/modules/**/*.js"],
		img: source_foler + "/images/**/*.{jpg,png,svg,gif,ico,webp}",		
	},
	clean: "./" + project_foler + "/"
}

const { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	webpHTML = require('gulp-webp-html'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gcmq = require('gulp-group-css-media-queries'),
	cleanCSS = require('gulp-clean-css'),
	rename = require("gulp-rename"),
	sourcemaps = require('gulp-sourcemaps'),
	webpcss = require("gulp-webpcss"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	newer = require('gulp-newer'),
	svgSprite = require('gulp-svg-sprite'),
	del = require('del'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter')
	;








// Определяем логику работы Browsersync
function browserSync() {
	browsersync.init({ // Инициализация Browsersync
		server: { baseDir: "./" + project_foler + "/" }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}



function html() {
	return src(patch.src.html)
	.pipe(fileinclude())
	// .pipe(webpHTML())
	.pipe(dest(patch.build.html)) // Выгружаем готовый файл в папку назначения	
	.pipe(browsersync.stream()) // Триггерим Browsersync для обновления страницы
}

function watchFiles() {
	gulp.watch(patch.watch.html, html);
	gulp.watch(patch.watch.css, css);
	gulp.watch(patch.watch.js, js);
	gulp.watch([patch.watch.img], images);
}

function css() {
	return src(patch.src.css) // Выбираем источник: "#src/sass/main.sass" или "#src/less/main.less"
	.pipe(sourcemaps.init())
	.pipe(
		sass({
			outputStyle: 'expanded'
		})
	) 	
	.pipe(gcmq())
	.pipe(
		autoprefixer({ 
			overrideBrowserslist: ['last 5 versions'],
			cascade: false 
		})
	) 
	.pipe(webpcss())
	.pipe(dest(patch.build.css))
	.pipe(cleanCSS())
	.pipe(
		rename({
			extname: ".min.css"
		})
	)
	.pipe(sourcemaps.write())	
	.pipe(dest(patch.build.css)) // Выгрузим результат в папку "app/css/"
	.pipe(browsersync.stream()) // Сделаем инъекцию в браузер
}


function libsjs() {
	return src(source_foler + "/js/libs.js")
	.pipe(fileinclude())
	.pipe(uglify())
	.pipe(dest(patch.build.js)) // Выгружаем готовый файл в папку назначения	
}

function libscss() {
	return src(source_foler + "/scss/libs.scss")	
	.pipe(
		sass({
			outputStyle: 'expanded'
		})
	) 		
	.pipe(dest(patch.build.css))
	.pipe(cleanCSS())
	.pipe(
		rename({
			extname: ".min.css"
		})
	)	
	.pipe(dest(patch.build.css))	
}

function js() {
	return src(patch.src.js)
	.pipe(fileinclude())
	.pipe(
		rename({
			extname: ".min.js"
		})
	)
	.pipe(uglify()) 	
	.pipe(dest(patch.build.js)) // Выгружаем готовый файл в папку назначения	
	.pipe(browsersync.stream()) // Триггерим Browsersync для обновления страницы
}


function images() {
	return src(patch.src.img) // Берём все изображения из папки источника
	.pipe(webp({
		quality: 70
	}))
    .pipe(dest(patch.build.img))
    .pipe(src(patch.src.img))
    .pipe(newer(patch.build.img)) // Проверяем, было ли изменено (сжато) изображение ранее
	.pipe(imagemin([
	    imagemin.gifsicle({interlaced: true}),
	    imagemin.mozjpeg({quality: 75, progressive: true}),
	    imagemin.optipng({optimizationLevel: 3}),
	    imagemin.svgo({
	        plugins: [
	            {removeViewBox: true},
	            {cleanupIDs: false}
	        ]
	    })
	]))
	.pipe(dest(patch.build.img)) // Выгружаем оптимизированные изображения в папку назначения
}

function cleanimg() {
	return del(patch.build.img, { force: true }) // Удаляем всё содержимое папки "#src/images/dest/"
}

gulp.task('svgSprite', function(){
	return gulp.src([source_foler + '/images/iconsprite/*.svg'])
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: '../icons/icons.svg',
				example: true
			}
		}
	}))
	.pipe(dest(patch.build.img))
})


let build = gulp.series(gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.cleanimg = cleanimg;
exports.images = images;
exports.libsjs = libsjs;
exports.libscss = libscss;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;  


