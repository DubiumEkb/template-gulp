const pathNode = require("path")
const rootFolder = pathNode.basename(pathNode.resolve())

const buildFolder = "./dist"
const srcFolder = "./src"

const path = {
	build: {
		scripts: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		fonts: `${buildFolder}/fonts/`,
	},
	src: {
		scripts: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		svgSprite: `${srcFolder}/svgSprite/*.svg`,
		scss: `${srcFolder}/scss/style.scss`,
		template_scss: `${srcFolder}/scss/template-style.scss`,
		html: `${srcFolder}/pages/*.html`,
	},
	watch: {
		scripts: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: "verstka",
}

module.exports = { path }
