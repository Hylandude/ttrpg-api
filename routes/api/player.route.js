const { PlayerController } = require("../../src/controllers/player.controller");

module.exports = (router) => {
	router.post("/player", PlayerController.create);
	router.get("/player/:id", PlayerController.show);
	router.get("/player", PlayerController.search);
	router.patch("/player/:id", PlayerController.update);
	router.delete("/player/:id", PlayerController.destroy);

	return router;
};
