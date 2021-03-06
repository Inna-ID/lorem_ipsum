const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const uglify = require('gulp-uglify')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
	return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(dest('dist'))
}

function scss() {
	return src('src/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist/css'))
}

function scripts() {
	return src('src/js/*.js')
	.pipe(uglify())
	.pipe(dest('dist/js'))
}

function images() {
	return src('src/img/**/*.*')
	.pipe(dest('dist/img'))
}

function clear() {
	return del('dist')
}

function serve() {
	sync.init({
		server: './dist',
		notify: false
	})

  watch('src/**/*.html', series(html)).on('change', sync.reload)
  watch('src/scss/**/*.scss', series(scss)).on('change', sync.reload)
  watch('src/js/*.js', series(scripts)).on('change', sync.reload)
  watch('src/img/*.*', series(images)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, scripts, images)
exports.default = series(clear, html, scss, scripts, images, serve)

exports.clear = clear