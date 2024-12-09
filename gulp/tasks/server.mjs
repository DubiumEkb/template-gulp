import browserSync from "browser-sync";

const server = (done) => {
	app.plugins.sync.init({
		server: {
			baseDir: `${app.path.build.html}`,
		},
		notify: false,
		port: 3000,
	});
};

export { server };
