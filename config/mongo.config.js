const mongoose = require("mongoose");
const debug = process.env.MONGO_DEBUG && process.env.MONGO_DEBUG == "true";
mongoose.set("debug", debug);
mongoose.set("strictQuery", true);

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}`;
const options = {
	dbName: process.env.MONGO_DB_NAME,
};

const connectMongo = function () {
	return new Promise(async (resolve, reject) => {
		try {
			await mongoose.connect(url, options);
			return resolve(mongoose);
		} catch (e) {
			console.log(e);
			return reject(e);
		}
	});
};

module.exports = connectMongo;
