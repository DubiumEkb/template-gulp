const del = require("del");

const reset = () => {
	return del(app.path.clean)
}

module.exports = { reset }