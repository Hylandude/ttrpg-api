const { Dnd5eSheetProvider } = require("../providers/dnd5eSheet.provider");
const { DiceHelper } = require("../helpers/rollADice");

const Dnd5eSheetController = function () {
	this.create = create;
	this.show = show;
	this.update = update;
	this.destroy = destroy;
	this.rollDeathSave = rollDeathSave;
	this.beAttacked = beAttacked;
	this.convertWallet = convertWallet;
	this.skillCheck = skillCheck;
	this.savingThrow = savingThrow;
	this.useHitDice = useHitDice;
	this.rollInitiative = rollInitiative;
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

		let savePassed = dnd5eSheet.rollDeathSave(deathRoll);
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

		let isCrit = false;
		if (!req.body.attackRoll) req.body.attackRoll = DiceHelper.rollADice("d20");
		if (req.body.attackRoll == 20) isCrit = true;
		req.body.attackRoll = req.body.attackBonus
			? req.body.attackRoll + req.body.attackBonus
			: req.body.attackRoll;

		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);
		let doesAttackHit = dnd5eSheet.checkAttackHits(req.body.attackRoll);

		if (req.body.damage) {
			let damage =
				typeof req.body.damage == "number"
					? req.body.damage
					: DiceHelper.rollXDice(req.body.damage);

			damage = req.body.damageBonus ? damage + req.body.damageBonus : damage;
			if (doesAttackHit) {
				if (isCrit) damage *= 2;
				dnd5eSheet.takeDamage(damage);
			}
			await dnd5eSheet.save();
		}

		dnd5eSheet = addCalculatedScores(dnd5eSheet);
		return res.json({
			success: true,
			resource: { attackHit: { doesAttackHit, damage, isCrit }, dnd5eSheet },
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const convertWallet = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing dnd5eSheet id",
			});
		}

		if (!req.body.conversionType) {
			return res.json({
				success: false,
				message: "Missing conversion type",
			});
		}

		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);
		dnd5eSheet.convertMoney(req.body.conversionType, req.body.ignoreElectrum);
		await dnd5eSheet.save();
		dnd5eSheet = addCalculatedScores(dnd5eSheet);

		return res.json({
			success: true,
			resource: { wallet: dnd5eSheet.inventory.wallet, dnd5eSheet },
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const skillCheck = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing dnd5eSheet id",
			});
		}
		if (!req.body.skill) {
			return res.json({
				success: false,
				message: "Missing skill name",
			});
		}
		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);

		//camelCaseTheGivenString
		let skillName = req.body.skill
			.split(" ")
			.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
			.reduce((acc, val, i) => {
				return i == 1 ? acc.toLowerCase() + val : acc + val;
			});
		if (!dnd5eSheet.skills[skillName]) {
			return res.json({
				success: false,
				message: "Invalid skill name",
			});
		}

		let roll = dnd5eSheet.rollSkillCheck(skillName);
		let advantage = 0;
		let passesDC = false;
		if (req.body.advantage) {
			advantage = dnd5eSheet.rollSkillCheck(skillName);
		}
		if (req.body.DC) {
			passesDC = roll > req.body.DC || advantage > req.body.DC;
		}
		dnd5eSheet = addCalculatedScores(dnd5eSheet);

		return res.json({
			success: true,
			resource: { skillCheck: { roll, advantage, passesDC }, dnd5eSheet },
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const savingThrow = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing dnd5eSheet id",
			});
		}
		if (!req.body.savingThrow) {
			return res.json({
				success: false,
				message: "Missing saving throw name",
			});
		}
		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);

		let savingThrow = req.body.savingThrow.toLowerCase();
		if (!dnd5eSheet.skills[savingThrow]) {
			return res.json({
				success: false,
				message: "Invalid saving throw name",
			});
		}

		let roll = dnd5eSheet.rollSavingThrow(skillName);
		let advantage = 0;
		let passesDC = false;
		if (req.body.advantage) {
			advantage = dnd5eSheet.rollSavingThrow(skillName);
		}
		if (req.body.DC) {
			passesDC = roll > req.body.DC || advantage > req.body.DC;
		}
		dnd5eSheet = addCalculatedScores(dnd5eSheet);

		return res.json({
			success: true,
			resource: { savingThrow: { roll, advantage, passesDC }, dnd5eSheet },
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const useHitDice = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing dnd5eSheet id",
			});
		}

		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);

		let amount = req.body.amount || 1;
		amount = parseInt(amount);
		if (isNaN(amount)) {
			return res.json({
				success: false,
				message: "Invalid amount",
			});
		}

		if (req.body.untilHPFull) amount = dnd5eSheet.hitDice.current;
		amount =
			amount > dnd5eSheet.hitDice.current ? dnd5eSheet.hitDice.current : amount;

		for (
			let i = 0;
			i < amount || dnd5eSheet.hitPointCurrent == dnd5eSheet.hitPointMaximum;
			i++
		) {
			dnd5eSheet.useHitDice();
		}
		await dnd5eSheet.save();
		dnd5eSheet = addCalculatedScores(dnd5eSheet);

		return res.json({
			success: true,
			resource: { hitDice: { used: amount }, dnd5eSheet },
		});
	} catch (e) {
		console.log(e);
		return res.json({
			success: false,
			message: e.toString(),
		});
	}
};

const rollInitiative = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.json({
				success: false,
				message: "Missing dnd5eSheet id",
			});
		}

		let dnd5eSheet = await Dnd5eSheetProvider.findOne(req.params.id);

		let initiativeRoll = dnd5eSheet.rollInitiative();

		dnd5eSheet = addCalculatedScores(dnd5eSheet);

		return res.json({
			success: true,
			resource: { initiativeRoll, dnd5eSheet },
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
