const mongoose = require("mongoose");

const playerSchema = {
	name: { type: String, required: true, trim: true },
	apiKey: { type: String, required: true },
	charcaters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
};
const options = { timestamps: true };
const schema = new mongoose.Schema(playerSchema, options);

const ttrpgDB = mongoose.connection.useDb(process.env.MONGO_DB_NAME);
module.exports = ttrpgDB.model("Player", schema);
