import fs from "fs";
import fsPromises from "fs/promises"; // Подключаем модуль fs/promises для работы с асинхронными функциями
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2"; // Обычный импорт, без асинхронного вызова
import mkdirp from "mkdirp";

// Конвертация шрифтов из .otf в .ttf
const otf2ttf = async () => {
	// Создаем папку dist/fonts, если она не существует
	mkdirp(app.path.build.fonts);
	console.log(`Папка ${app.path.build.fonts} успешно создана.`);

	return app.gulp
		.src(`${app.path.srcFolder}/fonts/*.otf`)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "FONTS",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(
			fonter({
				formats: ["ttf"],
			})
		)
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

// Конвертация шрифтов из .ttf в .woff и .woff2
const ttf2woff = async () => {
	mkdirp(app.path.build.fonts);
	console.log(`Папка ${app.path.build.fonts} успешно создана.`);

	return app.gulp
		.src(`${app.path.srcFolder}/fonts/*.ttf`)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "FONTS",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(
			fonter({
				formats: ["woff"],
			})
		)
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

// Генерация файла _fonts.scss с описанием шрифтов
const fontsStyle = async () => {
	const fontsFile = `${app.path.srcFolder}/scss/components/_fonts.scss`;
	const fontsDir = `${app.path.srcFolder}/fonts`;

	try {
		console.log("Чтение содержимого папки с шрифтами...");
		const fontsFiles = await fsPromises.readdir(fontsDir);
		console.log("Список файлов в папке с шрифтами:", fontsFiles);

		if (fontsFiles.length > 0) {
			const fileExists = await fsPromises
				.stat(fontsFile)
				.catch(() => false);
			let fileContent = "";

			if (fileExists) {
				fileContent = await fsPromises.readFile(fontsFile, "utf-8");
				console.log("Содержимое файла _fonts.scss:", fileContent);
			}

			if (!fileExists || fileContent.trim() === "") {
				if (!fileExists) {
					console.log(
						"Файл _fonts.scss не существует. Создаю его..."
					);
					await fsPromises.writeFile(fontsFile, "");
				}

				let newFileOnly;
				const fontPromises = fontsFiles.map(async (fontFileName) => {
					const fontName = fontFileName.split(".")[0];
					if (newFileOnly !== fontName) {
						let fontWeight = fontName.split("-")[1] || fontName;
						fontWeight = getFontWeight(fontWeight);

						console.log(
							`Добавляю шрифт: ${fontName} с весом ${fontWeight}`
						);

						await fsPromises.appendFile(
							fontsFile,
							`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`
						);
						newFileOnly = fontFileName;
					}
				});

				await Promise.all(fontPromises);
				console.log("Шрифты добавлены в файл _fonts.scss.");
			} else {
				console.log("Файл _fonts.scss уже содержит данные.");
			}
		} else {
			console.log("В папке шрифтов нет файлов.");
		}
	} catch (err) {
		console.error("Error processing fonts:", err);
	}

	return app.gulp.src(`${app.path.srcFolder}`);
};

// Функция для получения значения веса шрифта
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
