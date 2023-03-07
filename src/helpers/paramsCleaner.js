const paramsCleaner = (params, modelName) => {
	modelName = modelName.toLowerCase();
	modelName = modelName == "dnd5esheet" ? "dnd5eSheet" : modelName;
	const model = require(`../../models/mongo/${modelName}`);

	const cleanParams = {};
	for (let key in model.schema.paths) {
		key = key.indexOf(".") >= 0 ? key.split(".")[0] : key;
		if (params[key]) cleanParams[key] = params[key];
	}
	return cleanParams;
};

exports.paramsCleaner = paramsCleaner;
