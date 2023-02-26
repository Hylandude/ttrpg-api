const { PlayerProvider } = require("../providers/player.provider");

const PlayerController = function () {
	this.create = create;
	this.show = show;
	this.search = search;
	this.update = update;
	this.destroy = destroy;
};

const create = async (req, res) => {
	try {
		let player = await PlayerProvider.create(req.body);
		player = player.toObject();
		delete player.__v;
		delete player.apiKey;
		delete player.password;

		return res.json({
			success: true,
			resource: player,
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
				message: "Missing player id",
			});
		}
		let player = await PlayerProvider.findOne(req.params.id);
		player = player.toObject();
		delete player.__v;
		delete player.apiKey;
		delete player.password;

		return res.json({
			success: true,
			resource: player,
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
		if (!req.query.name && !req.query.email) {
			return res.json({
				success: false,
				message: "Empty query",
			});
		}

		let players = await PlayerProvider.search(req.query);
		for (let p of players) {
			delete p.__v;
			delete p.apiKey;
			delete p.password;
		}
		return res.json({
			success: true,
			resource: players,
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
				message: "Missing player id",
			});
		}
		let player = await PlayerProvider.update(req.params.id, req.body);
		player = player.toObject();
		delete player.__v;
		delete player.apiKey;
		delete player.password;
		return res.json({
			success: true,
			resource: player,
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
				message: "Missing player id",
			});
		}
		let player = await PlayerProvider.destroy(req.params.id, req.body);
		player = player.toObject();
		delete player.__v;
		delete player.apiKey;
		delete player.password;
		return res.json({
			success: true,
			resource: player,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

exports.PlayerController = new PlayerController();
