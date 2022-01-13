const svgSprite = require("gulp-svg-sprite");

const svgSpriteBuild = () => {
	return app.gulp
		.src(`${app.path.src.svgSprite}`)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "SVG",
					message: "Error: <%= error.message %>",
				}),
			),
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: `../sprite.svg`,
						example: false,
					},
				},
			}),
		)
		.pipe(app.gulp.dest(`${app.path.build.images}`))
}

module.exports = { svgSpriteBuild }