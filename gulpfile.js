// main
const gulp = require('gulp')
const { path } = require('./gulp/config/path')
const { plugins } = require('./gulp/config/plugins')

// global Variables
global.app = {
	isBuild: process.argv.includes("--build"),
	isDev: !process.argv.includes("--build"),
	path: path,
	gulp: gulp,
	plugins: plugins,
}

// tasks
const { otf2ttf, ttf2woff, fontsStyle } = require('./gulp/tasks/fonts')
const { ftp } = require('./gulp/tasks/ftp')
const { html } = require('./gulp/tasks/html')
const { images } = require('./gulp/tasks/images')
const { reset } = require('./gulp/tasks/reset')
const { scripts } = require('./gulp/tasks/scripts')
const { scss } = require('./gulp/tasks/scss')
const { server } = require('./gulp/tasks/server')
const { svgSpriteBuild } = require("./gulp/tasks/svgSprite")
const { zip } = require('./gulp/tasks/zip')

// Watcher
const watcher = () => {
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.scripts, scripts)
	gulp.watch(path.watch.images, images)
}

// Watcher tp FTP
const watcherToFTP = () => {
	gulp.watch(path.watch.html, gulp.series(html, ftp))
	gulp.watch(path.watch.scss, gulp.series(scss, ftp))
	gulp.watch(path.watch.scripts, gulp.series(scripts, ftp))
	gulp.watch(path.watch.images, gulp.series(images, ftp))
}

// Fonts converter
const fonts = gulp.series(otf2ttf, ttf2woff, fontsStyle)

// mainTasks
const mainTasks = gulp.series(
	fonts,
	gulp.parallel(html, scss, scripts, images),
)

// Launch options
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const devToFTP = gulp.series(reset, mainTasks, gulp.parallel(watcherToFTP, server))
const build = gulp.series(reset, mainTasks)
const buildToZIP = gulp.series(reset, mainTasks, zip)
const buildToFTP = gulp.series(reset, mainTasks, ftp)

// Build sprite.svg
exports.svgSpriteBuild = svgSpriteBuild

// Development
exports.dev = dev

// Development to FTP
exports.devToFTP = devToFTP

// Build project
exports.build = build

// Build to ZIP
exports.buildToZIP = buildToZIP

// Build to FTP
exports.buildToFTP = buildToFTP

exports.default = dev