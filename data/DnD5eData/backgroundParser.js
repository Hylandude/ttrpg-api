const main = async function () {
	const backgroundData = require("./backgrounds5eTools.json").background;
	let allBackgrounds = {};
	for (background of backgroundData) {
		if (background.source.indexOf("UA") == 0) continue;
		if (background.source.indexOf("AL") == 0) continue;
		let name = background.name;
		allBackgrounds[name] = {
			skillProficiencies: {},
			languageProficiencies: {},
			toolProficiencies: {},
			startingEquipment: {
				alwaysGet: [],
				options: { a: [], b: [], c: [], d: [] },
				wallet: { copper: 0 },
			},
			features: [],
			personalityTraits: [],
			ideals: [],
			bonds: [],
			flaws: [],
		};

		//skill parsing
		if (background.skillProficiencies) {
			for (skill of background.skillProficiencies) {
				if (skill.choose) {
					allBackgrounds[name].skillProficiencies.choose = skill.choose;
					continue;
				}
				for (key in skill) {
					allBackgrounds[name].skillProficiencies[key] = true;
				}
			}
		}

		//language parsing
		if (background.languageProficiencies) {
			for (language of background.languageProficiencies) {
				if (language.anyStandard) {
					allBackgrounds[name].languageProficiencies.anyStandard =
						language.anyStandard;
					continue;
				}
				if (language.choose) {
					allBackgrounds[name].languageProficiencies.choose = language.choose;
					continue;
				}
				for (key in language) {
					allBackgrounds[name].languageProficiencies[key] = true;
				}
			}
		}

		//tool proficiencies
		if (background.toolProficiencies) {
			for (tool of background.toolProficiencies) {
				if (tool.choose) {
					allBackgrounds[name].toolProficiencies.choose = tool.choose;
					continue;
				}
				for (key in language) {
					allBackgrounds[name].toolProficiencies[key] = true;
				}
			}
		}

		//parse items
		if (background.startingEquipment) {
			for (equipment of background.startingEquipment) {
				if (equipment.a) {
					allBackgrounds[name].startingEquipment.options.a.push(equipment.a);
				}
				if (equipment.b) {
					allBackgrounds[name].startingEquipment.options.a.push(equipment.a);
				}
				if (equipment.c) {
					allBackgrounds[name].startingEquipment.options.a.push(equipment.a);
				}
				if (equipment.d) {
					allBackgrounds[name].startingEquipment.options.a.push(equipment.a);
				}
				if (equipment._) {
					for (item of equipment._) {
						if (typeof item == "string") {
							allBackgrounds[name].startingEquipment.alwaysGet.push({
								item: item.split("|")[0].trim(),
								quantity: 1,
							});
						} else {
							//gold
							if (item.item == "pouch|phb") {
								allBackgrounds[name].startingEquipment.wallet.copper +=
									item.containsValue;
								continue;
							}
							if (item.value) {
								allBackgrounds[name].startingEquipment.wallet.copper +=
									item.value;
								continue;
							}
							//others
							if (item.equipmentType) {
								//TODO: handle choose type on equipment type
								allBackgrounds[name].startingEquipment.alwaysGet.push({
									item: item.equipmentType,
									quantity: 1,
								});
							} else {
								allBackgrounds[name].startingEquipment.alwaysGet.push({
									item: item.special
										? item.special
										: item.item.split("|")[0].trim(),
									quantity: item.quantity || 1,
								});
							}
						}
					}
				}
			}
		}

		//feature and personality parsing
		if (background.entries) {
			for (entry of background.entries) {
				//featureds
				if (entry.data && entry.data.isFeature) {
					allBackgrounds[name].features.push({
						name: entry.name,
						value: entry.entries.join("\n"),
					});
					continue;
				}

				//personality traits
				if (entry.entries) {
					for (subEntry of entry.entries) {
						if (subEntry.colLabels) {
							switch (subEntry.colLabels[1]) {
								case "Personality Trait":
									allBackgrounds[name].personalityTraits = subEntry.rows.map(
										(e) => e[1]
									);
									break;
								case "Ideal":
									allBackgrounds[name].ideals = subEntry.rows.map((e) => e[1]);
									break;
								case "Bond":
									allBackgrounds[name].bonds = subEntry.rows.map((e) => e[1]);
									break;
								case "Flaw":
									allBackgrounds[name].flaws = subEntry.rows.map((e) => e[1]);
									break;
								default:
									continue;
							}
						}
					}
				}
			}
		}
	}

	const fs = require("fs");
	fs.writeFileSync("backgrounds.json", JSON.stringify(allBackgrounds, null, 2));
};

main();
