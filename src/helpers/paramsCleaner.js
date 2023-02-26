const paramsCleaner = (params, modelName) => {
	const model = require(`../../models/mongo/${modelName.toLowerCase()}`);
	const cleanParams = {};
	for (let key in model.schema.paths) {
		cleanParams[key] = params[key];
	}
	return cleanParams;
};

exports.paramsCleaner = paramsCleaner;
