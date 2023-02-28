const { Dnd5eSheetProvider } = require("../providers/dnd5eSheet.provider");

const Dnd5eSheetController = function () {
	this.create = create;
	this.show = show;
	this.update = update;
	this.destroy = destroy;
};

const create = async (req, res) => {
	try {
		console.log("HERE");
		let dnd5eSheet = await Dnd5eSheetProvider.create(req.body);
		dnd5eSheet = dnd5eSheet.toObject();
		delete dnd5eSheet.__v;

		return res.json({
			success: true,
			resource: dnd5eSheet,
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
				message: "Missing dnd5eSheet id",
			});
		}
		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);

		let abilityScoreModifiers = dnd5eSheet.getAbilityScoreModifiers();
		let skillModifiers = dnd5eSheet.getSkillModifiers();
		let savingThrowModifiers = dnd5eSheet.getSavingThrowModifiers();
		let passiveWisdom = dnd5eSheet.getPassiveSkill("perception");
		let initiativeBonus = dnd5eSheet.getInitiativeBonus();

		dnd5eSheet = dnd5eSheet.toObject();
		delete dnd5eSheet.__v;
		dnd5eSheet.abilityScoreModifiers = abilityScoreModifiers;
		dnd5eSheet.skillModifiers = skillModifiers;
		dnd5eSheet.savingThrowModifiers = savingThrowModifiers;
		dnd5eSheet.passiveWisdom = passiveWisdom;
		dnd5eSheet.initiativeBonus = initiativeBonus;

		return res.json({
			success: true,
			resource: dnd5eSheet,
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
				message: "Missing dnd5eSheet id",
			});
		}
		let dnd5eSheet = await Dnd5eSheetProvider.update(req.params.id, req.body);
		dnd5eSheet = dnd5eSheet.toObject();
		delete dnd5eSheet.__v;
		return res.json({
			success: true,
			resource: dnd5eSheet,
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
				message: "Missing dnd5eSheet id",
			});
		}
		let dnd5eSheet = await Dnd5eSheetProvider.destroy(req.params.id, req.body);
		dnd5eSheet = dnd5eSheet.toObject();
		delete dnd5eSheet.__v;
		return res.json({
			success: true,
			resource: dnd5eSheet,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

exports.Dnd5eSheetController = new Dnd5eSheetController();
