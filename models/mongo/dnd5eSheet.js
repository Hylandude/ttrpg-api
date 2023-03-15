const mongoose = require("mongoose");
const { rollADice } = require("../../src/helpers/rollADice.js").DiceHelper;

const round = (value) => Math.round(value);

const abilityScoreModifier = (score) => Math.floor((score - 10) / 2);

const proficiencyExperticeMultiplier = (skill) =>
	skill.isProficient ? (skill.isExpert ? 2 : 1) : 0;

const getSkillBonus = (skill, proficiencyBonus, modifier) =>
	modifier + proficiencyBonus * proficiencyExperticeMultiplier(skill);

const cappedSum = (a, b, cap) => (a + b > cap ? cap : a + b);

const cappedSubstract = (a, b, cap) => (a - b < cap ? cap : a - b);

const getFractional = (a) => ((a * 10) % 10) / 10;

const dnd5eSheetSchema = {
	characterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Character",
		required: true,
	},
	inspiration: { type: Boolean, default: false, required: true },
	additionalInitiativeBonus: {
		type: Number,
		default: 0,
		required: true,
		get: round,
		set: round,
	},
	proficiencyBonus: {
		type: Number,
		required: true,
		default: 0,
		get: round,
		set: round,
	},
	savingThrows: {
		strength: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		dexterity: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		constitution: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		inteligence: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		wisdom: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		charisma: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
	},
	abilityScores: {
		strength: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: round,
			set: round,
		},
		dexterity: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: round,
			set: round,
		},
		constitution: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: round,
			set: round,
		},
		inteligence: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: round,
			set: round,
		},
		wisdom: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: round,
			set: round,
		},
		charisma: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: round,
			set: round,
		},
	},
	skills: {
		acrobatics: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		animalHandling: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		arcana: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		athletics: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		deception: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		history: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		insight: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		intimidation: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		investigation: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		medicine: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		nature: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		perception: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		persuation: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		performance: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		religion: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		sleightOfHand: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		stealth: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
		survival: {
			isProficient: { type: Boolean, default: false, required: true },
			isExpert: { type: Boolean, default: false, required: true },
		},
	},
	speed: {
		type: Number,
		default: 30,
		min: 0,
		get: round,
		set: round,
		required: true,
	},
	armorClass: {
		type: Number,
		required: true,
		default: 0,
		get: round,
		set: round,
	},
	hitPointMaximum: {
		type: Number,
		default: 0,
		min: 0,
		get: round,
		set: round,
		required: true,
	},
	hitPointCurrent: {
		type: Number,
		default: 0,
		min: 0,
		get: round,
		set: round,
		required: true,
	},
	temporaryHP: {
		type: Number,
		default: 0,
		min: 0,
		get: round,
		set: round,
		required: true,
	},
	hitDice: {
		diceType: {
			type: String,
			trim: true,
			lowercase: true,
			enum: ["d2", "d4", "d6", "d8", "d10", "d12", "d20"],
			required: true,
		},
		total: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
			get: round,
			set: round,
		},
		current: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
			get: round,
			set: round,
		},
	},
	alignment: String,
	classes: [
		{
			className: String,
			subClass: String,
		},
	],
	background: String,
	personalityTraits: [String],
	ideals: [String],
	bonds: [String],
	flaws: [String],
	level: {
		type: Number,
		required: true,
		default: 1,
		min: 1,
		max: 20,
		get: round,
		set: round,
	},
	experiencePoints: {
		type: Number,
		default: 0,
		min: 0,
		get: round,
		set: round,
	},
	deathSaves: {
		success: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 3,
			get: round,
			set: round,
		},
		failure: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 3,
			get: round,
			set: round,
		},
	},
	inventory: {
		backpack: [{ item: String, quantity: Number }],
		wallet: {
			copper: {
				type: Number,
				required: true,
				default: 0,
				min: 0,
			},
			silver: {
				type: Number,
				required: true,
				default: 0,
				min: 0,
			},
			electrum: {
				type: Number,
				required: true,
				default: 0,
				min: 0,
			},
			gold: {
				type: Number,
				required: true,
				default: 0,
				min: 0,
			},
			platinum: {
				type: Number,
				required: true,
				default: 0,
				min: 0,
			},
		},
	},
	features: [{ name: String, text: String }],
	creatureType: {
		size: { type: String, default: "medium" },
		species: { type: String, default: "humanoid" },
	},
};

const methods = {
	getAbilityScoreModifiers() {
		return {
			strength: abilityScoreModifier(this.abilityScores.strength),
			dexterity: abilityScoreModifier(this.abilityScores.dexterity),
			constitution: abilityScoreModifier(this.abilityScores.constitution),
			inteligence: abilityScoreModifier(this.abilityScores.inteligence),
			wisdom: abilityScoreModifier(this.abilityScores.wisdom),
			charisma: abilityScoreModifier(this.abilityScores.charisma),
		};
	},
	getSkillModifiers() {
		let modifiers = this.getAbilityScoreModifiers();
		return {
			acrobatics: getSkillBonus(
				this.skills.acrobatics,
				this.proficiencyBonus,
				modifiers.dexterity
			),
			animalHandling: getSkillBonus(
				this.skills.animalHandling,
				this.proficiencyBonus,
				modifiers.wisdom
			),
			arcana: getSkillBonus(
				this.skills.arcana,
				this.proficiencyBonus,
				modifiers.inteligence
			),
			athletics: getSkillBonus(
				this.skills.athletics,
				this.proficiencyBonus,
				modifiers.strength
			),
			deception: getSkillBonus(
				this.skills.deception,
				this.proficiencyBonus,
				modifiers.charisma
			),
			history: getSkillBonus(
				this.skills.history,
				this.proficiencyBonus,
				modifiers.inteligence
			),
			insight: getSkillBonus(
				this.skills.insight,
				this.proficiencyBonus,
				modifiers.inteligence
			),
			intimidation: getSkillBonus(
				this.skills.intimidation,
				this.proficiencyBonus,
				modifiers.charisma
			),
			investigation: getSkillBonus(
				this.skills.investigation,
				this.proficiencyBonus,
				modifiers.inteligence
			),
			medicine: getSkillBonus(
				this.skills.medicine,
				this.proficiencyBonus,
				modifiers.wisdom
			),
			nature: getSkillBonus(
				this.skills.nature,
				this.proficiencyBonus,
				modifiers.inteligence
			),
			perception: getSkillBonus(
				this.skills.perception,
				this.proficiencyBonus,
				modifiers.wisdom
			),
			performance: getSkillBonus(
				this.skills.performance,
				this.proficiencyBonus,
				modifiers.charisma
			),
			religion: getSkillBonus(
				this.skills.religion,
				this.proficiencyBonus,
				modifiers.inteligence
			),
			sleightOfHand: getSkillBonus(
				this.skills.sleightOfHand,
				this.proficiencyBonus,
				modifiers.dexterity
			),
			stealth: getSkillBonus(
				this.skills.stealth,
				this.proficiencyBonus,
				modifiers.dexterity
			),
			survival: getSkillBonus(
				this.skills.survival,
				this.proficiencyBonus,
				modifiers.wisdom
			),
		};
	},
	getSavingThrowModifiers() {
		let modifiers = this.getAbilityScoreModifiers();
		return {
			strength: getSkillBonus(
				this.savingThrows.strength,
				this.proficiencyBonus,
				modifiers.strength
			),
			dexterity: getSkillBonus(
				this.savingThrows.dexterity,
				this.proficiencyBonus,
				modifiers.dexterity
			),
			constitution: getSkillBonus(
				this.savingThrows.constitution,
				this.proficiencyBonus,
				modifiers.constitution
			),
			inteligence: getSkillBonus(
				this.savingThrows.inteligence,
				this.proficiencyBonus,
				modifiers.inteligence
			),
			wisdom: getSkillBonus(
				this.savingThrows.wisdom,
				this.proficiencyBonus,
				modifiers.wisdom
			),
			charisma: getSkillBonus(
				this.savingThrows.charisma,
				this.proficiencyBonus,
				modifiers.charisma
			),
		};
	},
	getPassiveSkill(skillName) {
		return 10 + this.getSkillModifiers()[skillName];
	},
	getInitiativeBonus() {
		return (
			this.getAbilityScoreModifiers()["dexterity"] +
			this.additionalInitiativeBonus
		);
	},
	rollDeathSave(roll) {
		if (
			this.hitPointCurrent != 0 ||
			this.deathSaves.success == 3 ||
			this.deathSaves.failure == 3
		)
			return;

		if (roll == 1) {
			this.deathSaves.failure = cappedSum(2, this.deathSaves.failure, 3);
			return roll >= 10;
		}
		if (roll == 20) {
			this.deathSaves.success = 0;
			this.deathSaves.failure = 0;
			this.hitPointCurrent = 1;
			return roll >= 10;
		}
		if (roll >= 10) {
			this.deathSaves.success++;
		} else {
			this.deathSaves.failure++;
		}
		return roll >= 10;
	},
	useHitDice() {
		if (
			this.hitDice.current == 0 ||
			this.hitPointCurrent == this.hitPointMaximum
		)
			return;
		let roll = rollADice(this.hitDice.type);
		this.hitDice.current--;
		this.hitPointCurrent = cappedSum(
			roll,
			this.hitPointCurrent,
			this.hitPointMaximum
		);
	},
	checkAttackHits(hit) {
		console.log(hit, this.armorClass <= hit);
		return this.armorClass <= hit;
	},
	rollInitiative() {
		return rollADice("d20") + this.getInitiativeBonus();
	},
	rollSavingThrow(type) {
		let modifiers = this.getSavingThrowModifiers();
		return rollADice("d20") + modifiers[type];
	},
	rollSkillCheck(skill) {
		let modifiers = this.getSkillModifiers();
		return rollADice("d20") + modifiers[skill];
	},
	takeDamage(dmg) {
		if (this.temporaryHP > 0) {
			let remainingDamage = dmg;
			if (dmg > this.temporaryHP) {
				remainingDamage = dmg - this.temporaryHP;
			}
			this.temporaryHP = cappedSubstract(this.temporaryHP, dmg, 0);
			dmg = dmg - remainingDamage;
		}
		this.hitPointCurrent = cappedSubstract(this.hitPointCurrent, dmg, 0);
	},
	convertMoney(conversionType, ignoreElectrum) {
		let { copper, silver, electrum, gold, platinum } = this.wallet;
		switch (conversionType) {
			case "toCopper":
				copper += silver * 10 + electrum * 50 + gold * 100 + platinum * 1000;
				silver = 0;
				electrum = 0;
				gold = 0;
				platinum = 0;
				break;
			case "toSilver":
				silver += copper / 10 + electrum * 5 + gold * 10 + platinum * 100;
				copper = 0;
				electrum = 0;
				gold = 0;
				platinum = 0;
				break;
			case "toElectrum":
				electrum += copper / 50 + silver / 5 + gold * 2 + platinum * 20;
				copper = 0;
				silver = 0;
				gold = 0;
				platinum = 0;
				break;
			case "toGold":
				gold += copper / 100 + silver / 10 + electrum / 2 + platinum * 10;
				copper = 0;
				silver = 0;
				electrum = 0;
				platinum = 0;
				break;
			case "toPlatinum":
				platinum += copper / 1000 + silver / 100 + electrum / 20 + gold / 10;
				copper = 0;
				silver = 0;
				electrum = 0;
				gold = 0;
				break;
			case "toHighest":
				platinum += copper / 1000 + silver / 100 + electrum / 20 + gold / 10;
				let fractionalPlatinum = getFractional(platinum);
				if (fractionalPlatinum) {
					gold = fractionalPlatinum * 10;
					fractionalGold = getFractional(gold);
					if (fractionalGold) {
						if (ignoreElectrum) {
							silver = fractionalGold * 10;
							fractionalSilver = getFractional(silver);
							if (fractionalSilver) {
								copper = fractionalSilver * 10;
							}
						} else {
							electrum = fractionalGold * 2;
							fractionalElectrum = getFractional(electrum);
							if (fractionalElectrum) {
								silver = fractionalElectrum * 5;
								fractionalSilver = getFractional(silver);
								if (fractionalSilver) {
									copper = fractionalSilver * 10;
								}
							}
						}
					}
				}
				break;
			default:
				return;
		}
		this.wallet = { copper, silver, electrum, gold, platinum };
	},
};

const options = { timestamps: true, methods };
const schema = new mongoose.Schema(dnd5eSheetSchema, options);

const ttrpgDB = mongoose.connection.useDb(process.env.MONGO_DB_NAME);
module.exports = ttrpgDB.model("dnd5eSheet", schema);
