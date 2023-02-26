const mongoose = require("mongoose");

const characterSchema = {
	name: { type: String, required: true, trim: true },
	age: {
		type: Number,
		get: (value) => Math.round(value),
		set: (value) => Math.round(value),
	},
	gender: { type: String, trim: true, lowercase: true },
	height: { type: Number, default: 0 }, //fuck imperial system this is a value in meters
	weight: { type: Number, default: 0 }, //I'm not implementing unit conversion, you want it? Fork the project n do it yourself
	eyeColor: { type: String, trim: true, lowercase: true },
	skinTone: { type: String, trim: true, lowercase: true },
	hairColor: { type: String, trim: true, lowercase: true },
	hasHorns: { type: Boolean, default: false },
	birthday: {
		isTraditional: { type: Boolean, required: true, default: true },
		date: Date,
		customDate: String,
	},
	summary: String,
	dnd5eSheet: { type: mongoose.Schema.Types.ObjectId, ref: "dnd5eSheet" },
	playerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Player",
		required: true,
	},
};
const options = { timestamps: true };
const schema = new mongoose.Schema(characterSchema, options);

const ttrpgDB = mongoose.connection.useDb(process.env.MONGO_DB_NAME);
module.exports = ttrpgDB.model("Character", schema);
