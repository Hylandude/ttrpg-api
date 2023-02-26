const {
	CharacterController,
} = require("../../src/controllers/character.controller");

module.exports = (router) => {
	router.post("/character", CharacterController.create);
	router.get("/character/:id", CharacterController.show);
	router.get("/character", CharacterController.search);
	router.patch("/character/:id", CharacterController.update);
	router.delete("/character/:id", CharacterController.destroy);

	return router;
};
