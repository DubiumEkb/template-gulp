const replace = require('gulp-replace')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const sync = require("browser-sync")
const newer = require('gulp-newer')
const ifPlugin = require('gulp-if')

const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	sync: sync,
	newer: newer,
	if: ifPlugin,
}

module.exports = { plugins }