const mongoose = require("mongoose");

const characterSchema = {
	name: { type: String, required: true, trim: true },
	age: {
		type: Number,
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
	},
	gender: { type: String, trim: true },
	height: Number,
	weight: Number,
	eyeColor: { type: String, trim: true },
	skinTone: { type: String, trim: true },
	hairColor: { type: String, trim: true },
	hasHorns: Boolean,
	birthday: {
		isTraditional: { type: Boolean, required: true, default: true },
		date: Date,
		customDate: String,
	},
	summary: String,
	dnd5eSheet: { type: mongoose.Schema.Types.ObjectId, ref: "dnd5eSheet" },
	player: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Player",
		required: true,
	},
};
const options = { timestamps: true };
const schema = new mongoose.Schema(characterSchema, options);

const ttrpgDB = mongoose.connection.useDb(process.env.MONGO_DB_NAME);
module.exports = ttrpgDB.model("Character", schema);
