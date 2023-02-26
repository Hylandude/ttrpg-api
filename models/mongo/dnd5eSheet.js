const mongoose = require("mongoose");

const dnd5eSheetSchema = {
	character: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Character",
		required: true,
	},
	inspiration: { type: Boolean, default: false, required: true },
	proficiencyBonus: {
		type: Number,
		required: true,
		default: 0,
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
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
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
		dexterity: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
		constitution: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
		inteligence: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
		wisdom: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
		charisma: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 30,
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
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
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
		required: true,
	},
	hitPointMaximum: {
		type: Number,
		default: 0,
		min: 0,
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
		required: true,
	},
	temporaryHP: {
		type: Number,
		default: 0,
		min: 0,
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
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
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
	},
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
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
	},
	experiencePoints: {
		type: Number,
		default: 0,
		min: 0,
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
	},
	deathSaves: {
		success: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 3,
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
		failure: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 3,
			get: (value) => Math.round(value),
			set: (value) => Math.round(value),
		},
	},
	inventory: {
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
			copper: {
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
};
const options = { timestamps: true };
const schema = new mongoose.Schema(dnd5eSheetSchema, options);

const ttrpgDB = mongoose.connection.useDb(process.env.MONGO_DB_NAME);
module.exports = ttrpgDB.model("dnd5eSheet", schema);
