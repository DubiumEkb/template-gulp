import fs from "fs";
import fonter from "gulp-fonter";

// Функция для динамического импорта модуля gulp-ttf2woff2
const ttf2woff2Import = async () => {
	return await import("gulp-ttf2woff2");
};

const otf2ttf = () => {
	// Ищем файлы шрифтов *.otf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.otf`)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "FONTS",
						message: "Error: <%= error.message %>",
					})
				)
			)
			// Конвертируем в *.ttf
			.pipe(
				fonter({
					formats: ["ttf"],
				})
			)
			// Выгружаем в исходную папку
			.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
	);
};

const ttf2woff = async () => {
	const ttf2woff2 = await ttf2woff2Import();

	// Ищем файлы шрифтов *.ttf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.ttf`)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "FONTS",
						message: "Error: <%= error.message %>",
					})
				)
			)
			// Конвертируем в *.woff
			.pipe(
				fonter({
					formats: ["woff"],
				})
			)
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
			// Ищем файлы шрифтов *.ttf для конвертации в *.woff2
			.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
			// Конвертируем в *.woff2
			.pipe(ttf2woff2.default()) // Используем .default() для ES-модуля
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
	);
};

const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	const fontsFile = `${app.path.srcFolder}/scss/components/_fonts.scss`;

	// Проверяем, существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
		if (fontsFiles) {
			// Проверяем, существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, то создаем его
				fs.writeFile(fontsFile, "", cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					const fontFileName = fontsFiles[i].split(".")[0];
					if (newFileOnly !== fontFileName) {
						let fontName =
							fontFileName.split("-")[0] || fontFileName;
						let fontWeight =
							fontFileName.split("-")[1] || fontFileName;

						// Определяем вес шрифта
						fontWeight = getFontWeight(fontWeight);

						fs.appendFile(
							fontsFile,
							`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
							cb
						);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log(
					"Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!"
				);
			}
		} else {
			fs.writeFile(
				fontsFile,
				'// When you add fonts to the "/src/fonts/" folder, you have to delete this file so that gulp creates it with all the data!',
				cb
			);
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
};

const getFontWeight = (fontWeight) => {
	const weights = {
		thin: 100,
		extralight: 200,
		light: 300,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		heavy: 800,
		black: 900,
	};
	return weights[fontWeight.toLowerCase()] || 400;
};

function cb() {}

export { otf2ttf, ttf2woff, fontsStyle };
