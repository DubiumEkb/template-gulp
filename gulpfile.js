// main
import gulp from "gulp";
import { path } from "./gulp/config/path.mjs";
import { plugins } from "./gulp/config/plugins.mjs";

// global Variables
global.app = {
	isBuild: process.argv.includes("--build"),
	isDev: !process.argv.includes("--build"),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

// tasks
import { otf2ttf, ttf2woff, fontsStyle } from "./gulp/tasks/fonts.mjs";
import { ftp } from "./gulp/tasks/ftp.mjs";
import { html } from "./gulp/tasks/html.mjs";
import { images } from "./gulp/tasks/images.mjs";
import { reset } from "./gulp/tasks/reset.mjs";
import { scripts } from "./gulp/tasks/scripts.mjs";
import { scss } from "./gulp/tasks/scss.mjs";
import { server } from "./gulp/tasks/server.mjs";
import { svgSpriteBuild } from "./gulp/tasks/svgSprite.mjs";
import { zip } from "./gulp/tasks/zip.mjs";

// Watcher
const watcher = () => {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.scripts, scripts);
	gulp.watch(path.watch.images, images);
};

// Watcher to FTP
const watcherToFTP = () => {
	gulp.watch(path.watch.html, gulp.series(html, ftp));
	gulp.watch(path.watch.scss, gulp.series(scss, ftp));
	gulp.watch(path.watch.scripts, gulp.series(scripts, ftp));
	gulp.watch(path.watch.images, gulp.series(images, ftp));
};

// Fonts converter
const fonts = gulp.series(otf2ttf, ttf2woff, fontsStyle);

// mainTasks
const mainTasks = gulp.series(
	fonts,
	gulp.parallel(html, scss, scripts, images)
);

// Launch options
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const devToFTP = gulp.series(
	reset,
	mainTasks,
	gulp.parallel(watcherToFTP, server)
);
const build = gulp.series(reset, mainTasks);
const buildScripts = gulp.series(reset, scripts);
const buildImages = gulp.series(reset, images);
const buildToZIP = gulp.series(reset, mainTasks, zip);
const buildToFTP = gulp.series(reset, mainTasks, ftp);

// Build sprite.svg
export { svgSpriteBuild };

// Development
export { dev };

// Development to FTP
export { devToFTP };

// Build project
export { build };

// Build Scripts
export { buildScripts };

// Build Images
export { buildImages };

// Build to ZIP
export { buildToZIP };

// Build to FTP
export { buildToFTP };

export default dev;
