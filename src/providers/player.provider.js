const Player = require("../../models/mongo/player");
const { paramsCleaner } = require("../helpers/paramsCleaner");

const PlayerProvider = function () {
	this.create = create;
	this.findOne = findOne;
	this.search = search;
	this.update = update;
	this.destroy = destroy;
};

const create = (playerParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			playerParams = paramsCleaner(playerParams, "Player");
			//TODO: api key creation logic
			//TODO: password hash logic
			playerParams.apiKey = "I'll grow up to be an api key!";
			let player = new Player(playerParams);
			await player.save();
			return resolve(player);
		} catch (e) {
			return reject(e);
		}
	});
};

const findOne = (playerId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let player = await Player.findById(playerId).exec();
			if (!player) return reject(`Player:${playerId} not found`);
			return resolve(player);
		} catch (e) {
			return reject(e);
		}
	});
};

const search = (searchParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			let playerQuery = {};
			if (searchParams.name) {
				playerQuery.name = { $regex: new RegExp(searchParams.name, "i") };
			}
			if (searchParams.email) {
				playerQuery.email = searchParams.email;
			}
			if (Object.keys(playerQuery).length == 0) return reject("Empty query");
			let players = await Player.find(playerQuery).lean().exec();
			return resolve(players);
		} catch (e) {
			return reject(e);
		}
	});
};

const update = (playerId, playerParams) => {
	return new Promise(async (resolve, reject) => {
		try {
			let player = await Player.findById(playerId).exec();
			if (!player) return reject(`Player:${playerId} not found`);

			playerParams = paramsCleaner(playerParams, "Player");
			delete playerParams.password;
			delete playerParams.apiKey;
			delete playerParams.characters;

			await Player.findOneAndUpdate({ _id: player._id }, playerParams).exec();
			player = await Player.findById(playerId).exec();

			return resolve(player);
		} catch (e) {
			return reject(e);
		}
	});
};

const destroy = (playerId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let player = await Player.findById(playerId).exec();
			if (!player) return reject(`Player:${playerId} not found`);

			await Player.deleteOne({ _id: player._id });
			return resolve(player);
		} catch (e) {
			return reject(e);
		}
	});
};

exports.PlayerProvider = new PlayerProvider();
