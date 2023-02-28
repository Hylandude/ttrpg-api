const Dnd5eSheet = require("../../models/mongo/dnd5eSheet");
const { paramsCleaner } = require("../helpers/paramsCleaner");

const Dnd5eSheetProvider = function () {
	this.create = create;
	this.findOne = findOne;
	this.update = update;
	this.destroy = destroy;
};

const create = (dnd5eSheetParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log("CREATING");
			dnd5eSheetParams = paramsCleaner(dnd5eSheetParams, "Dnd5eSheet");
			console.log(JSON.stringify(dnd5eSheetParams));
			let dnd5eSheet = new Dnd5eSheet(dnd5eSheetParams);
			await dnd5eSheet.save();
			return resolve(dnd5eSheet);
		} catch (e) {
			return reject(e);
		}
	});
};

const findOne = (dnd5eSheetId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let dnd5eSheet = await Dnd5eSheet.findById(dnd5eSheetId).exec();
			if (!dnd5eSheet) return reject(`Dnd5eSheet:${dnd5eSheetId} not found`);
			return resolve(dnd5eSheet);
		} catch (e) {
			return reject(e);
		}
	});
};

const update = (dnd5eSheetId, dnd5eSheetParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			let dnd5eSheet = await Dnd5eSheet.findById(dnd5eSheetId).exec();
			if (!dnd5eSheet) return reject(`Dnd5eSheet:${dnd5eSheetId} not found`);

			dnd5eSheetParams = paramsCleaner(dnd5eSheetParams, "Dnd5eSheet");
			delete dnd5eSheetParams.characterId;
			console.log(dnd5eSheetParams);
			await Dnd5eSheet.findOneAndUpdate(
				{ _id: dnd5eSheet._id },
				dnd5eSheetParams
			).exec();
			dnd5eSheet = await Dnd5eSheet.findById(dnd5eSheetId).exec();

			return resolve(dnd5eSheet);
		} catch (e) {
			return reject(e);
		}
	});
};

const destroy = (dnd5eSheetId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let dnd5eSheet = await Dnd5eSheet.findById(dnd5eSheetId).exec();
			if (!dnd5eSheet) return reject(`Dnd5eSheet:${dnd5eSheetId} not found`);

			await Dnd5eSheet.deleteOne({ _id: dnd5eSheet._id });
			return resolve(dnd5eSheet);
		} catch (e) {
			return reject(e);
		}
	});
};

exports.Dnd5eSheetProvider = new Dnd5eSheetProvider();
