const Dnd5eSheetController =
	require("../../src/controllers/dnd5eSheet.controller").Dnd5eSheetController;

module.exports = (router) => {
	//CRUD
	router.post("/dnd5eSheet", Dnd5eSheetController.create);
	router.get("/dnd5eSheet/:id", Dnd5eSheetController.show);
	router.patch("/dnd5eSheet/:id", Dnd5eSheetController.update);
	router.delete("/dnd5eSheet/:id", Dnd5eSheetController.destroy);

	//Actions
	router.put("/dnd5eSheet/:id/deathSave", Dnd5eSheetController.rollDeathSave);
	router.put("/dnd5eSheet/:id/beAttacked", Dnd5eSheetController.beAttacked);
	router.put(
		"/dnd5eSheet/:id/convertWallet",
		Dnd5eSheetController.convertWallet
	);
	router.put("/dnd5eSheet/:id/skillCheck", Dnd5eSheetController.skillCheck);
	router.put("/dnd5eSheet/:id/savingThrow", Dnd5eSheetController.savingThrow);
	router.put("/dnd5eSheet/:id/useHitDice", Dnd5eSheetController.useHitDice);
	router.put(
		"/dnd5eSheet/:id/rollInitiative",
		Dnd5eSheetController.rollInitiative
	);

	return router;
};
