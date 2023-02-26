const { CharacterProvider } = require("../providers/character.provider");

const CharacterController = function () {
	this.create = create;
	this.show = show;
	this.search = search;
	this.update = update;
	this.destroy = destroy;
};

const create = async (req, res) => {
	try {
		let character = await CharacterProvider.create(req.body);
		character = character.toObject();
		delete character.__v;

		return res.json({
			success: true,
			resource: character,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const show = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing character id",
			});
		}
		let character = await CharacterProvider.findOne(req.params.id);
		character = character.toObject();
		delete character.__v;

		return res.json({
			success: true,
			resource: character,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const search = async (req, res) => {
	try {
		if (!req.query.playerId) {
			return res.json({
				success: false,
				message: "Missing playerId",
			});
		}

		let characters = await CharacterProvider.search(req.query);
		for (let p of characters) {
			delete p.__v;
		}
		return res.json({
			success: true,
			resource: characters,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const update = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing character id",
			});
		}
		let character = await CharacterProvider.update(req.params.id, req.body);
		character = character.toObject();
		delete character.__v;
		return res.json({
			success: true,
			resource: character,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const destroy = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing character id",
			});
		}
		let character = await CharacterProvider.destroy(req.params.id, req.body);
		character = character.toObject();
		delete character.__v;
		return res.json({
			success: true,
			resource: character,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

exports.CharacterController = new CharacterController();
