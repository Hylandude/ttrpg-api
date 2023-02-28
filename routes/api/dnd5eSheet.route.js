const Dnd5eSheetController =
	require("../../src/controllers/dnd5eSheet.controller").Dnd5eSheetController;

module.exports = (router) => {
	router.post("/dnd5eSheet", Dnd5eSheetController.create);
	router.get("/dnd5eSheet/:id", Dnd5eSheetController.show);
	router.patch("/dnd5eSheet/:id", Dnd5eSheetController.update);
	router.delete("/dnd5eSheet/:id", Dnd5eSheetController.destroy);

	return router;
};
