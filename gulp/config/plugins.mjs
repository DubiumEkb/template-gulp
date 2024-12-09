import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import sync from "browser-sync";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";

const plugins = {
	replace,
	plumber,
	notify,
	sync,
	newer,
	if: ifPlugin,
};

export { plugins };
