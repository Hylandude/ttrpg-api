const DiceHelper = function () {
	this.rollADice = rollADice;
	this.rollXDice = rollXDice;
};

const rollADice = (type) => {
	let max = parseInt(type.split("d")[1]) + 1;
	return Math.floor(Math.random() * (max - 1) + 1);
};

const rollXDice = (type) => {
	let diceData = type.split("d");
	let max = parseInt(diceData[1]) + 1;
	let amount = parseInt(diceData[1]);
	let total = 0;
	for (let i = 0; i < amount; i++) {
		total += Math.floor(Math.random() * (max - 1) + 1);
	}
	return total;
};

exports.DiceHelper = new DiceHelper();
