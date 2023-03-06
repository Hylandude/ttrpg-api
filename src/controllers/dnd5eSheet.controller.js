const { Dnd5eSheetProvider } = require("../providers/dnd5eSheet.provider");
const { DiceHelper } = require("../helpers/rollADice");

const Dnd5eSheetController = function () {
	this.create = create;
	this.show = show;
	this.update = update;
	this.destroy = destroy;
	this.rollDeathSave = rollDeathSave;
	this.beAttacked = beAttacked;
};

const addCalculatedScores = function (dnd5eSheet) {
	let calculatedScores = {
		abilityScoreModifiers: dnd5eSheet.getAbilityScoreModifiers(),
		skillModifiers: dnd5eSheet.getSkillModifiers(),
		savingThrowModifiers: dnd5eSheet.getSavingThrowModifiers(),
		passiveWisdom: dnd5eSheet.getPassiveSkill("perception"),
		initiativeBonus: dnd5eSheet.getInitiativeBonus(),
	};

	dnd5eSheet = dnd5eSheet.toObject();
	delete dnd5eSheet.__v;

	return { ...dnd5eSheet, ...calculatedScores };
};

const create = async (req, res) => {
	try {
		let dnd5eSheet = addCalculatedScores(
			await Dnd5eSheetProvider.create(req.body)
		);

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
		let dnd5eSheet = addCalculatedScores(
			await Dnd5eSheetProvider.findOne(req.params.id)
		);

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

const rollDeathSave = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing dnd5eSheet id",
			});
		}
		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);
		let deathRoll = req.body.deathRoll
			? req.body.deathRoll
			: DiceHelper.rollADice("d20");
		console.log(deathRoll);

		let savePassed = dnd5eSheet.rollDeathSave(deathRoll);
		console.log(savePassed);
		await dnd5eSheet.save();

		dnd5eSheet = addCalculatedScores(dnd5eSheet);
		return res.json({
			success: true,
			resource: { savePassed: savePassed, dnd5eSheet },
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const beAttacked = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing dnd5eSheet id",
			});
		}

		let doCrit = false;
		if (!req.body.attackRoll) req.body.attackRoll = DiceHelper.rollADice("d20");
		if (req.body.attackRoll == 20) doCrit = true;
		req.body.attackRoll = req.body.attackBonus
			? req.body.attackRoll + req.body.attackBonus
			: req.body.attackRoll;

		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);
		console.log(req.body.attackRoll);
		let doesAttackHit = dnd5eSheet.checkAttackHits(req.body.attackRoll);

		if (req.body.damage) {
			let damage =
				typeof req.body.damage == "number"
					? req.body.damage
					: DiceHelper.rollXDice(req.body.damage);

			damage = req.body.damageBonus ? damage + req.body.damageBonus : damage;
			if (doesAttackHit) {
				if (doCrit) damage *= 2;
				dnd5eSheet.takeDamage(damage);
			}
			await dnd5eSheet.save();
		}

		dnd5eSheet = addCalculatedScores(dnd5eSheet);
		return res.json({
			success: true,
			resource: { attackHit: doesAttackHit, dnd5eSheet },
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
