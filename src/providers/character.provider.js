const Character = require("../../models/mongo/character");
const { paramsCleaner } = require("../helpers/paramsCleaner");

const CharacterProvider = function () {
	this.create = create;
	this.findOne = findOne;
	this.search = search;
	this.update = update;
	this.destroy = destroy;
};

const create = (characterParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			characterParams = paramsCleaner(characterParams, "Character");
			let character = new Character(characterParams);
			await character.save();
			return resolve(character);
		} catch (e) {
			return reject(e);
		}
	});
};

const findOne = (characterId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let character = await Character.findById(characterId).exec();
			if (!character) return reject(`Character:${characterId} not found`);
			return resolve(character);
		} catch (e) {
			return reject(e);
		}
	});
};

const search = (searchParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!searchParams.playerId) return reject("Missing playerId");
			let characterQuery = {
				playerId: searchParams.playerId,
			};

			if (searchParams.name)
				characterQuery.name = { $regex: new RegExp(searchParams.name, "i") };
			if (searchParams.summary)
				characterQuery.summary = { $regex: new RegExp(searchParams.name, "i") };

			let characters = await Character.find(characterQuery).lean().exec();
			return resolve(characters);
		} catch (e) {
			return reject(e);
		}
	});
};

const update = (characterId, characterParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			let character = await Character.findById(characterId).exec();
			if (!character) return reject(`Character:${characterId} not found`);

			characterParams = paramsCleaner(characterParams, "Character");
			delete characterParams.playerId;

			await Character.findOneAndUpdate(
				{ _id: character._id },
				characterParams
			).exec();
			character = await Character.findById(characterId).exec();

			return resolve(character);
		} catch (e) {
			return reject(e);
		}
	});
};

const destroy = (characterId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let character = await Character.findById(characterId).exec();
			if (!character) return reject(`Character:${characterId} not found`);

			await Character.deleteOne({ _id: character._id });
			return resolve(character);
		} catch (e) {
			return reject(e);
		}
	});
};

exports.CharacterProvider = new CharacterProvider();
