const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

// API route imports
const API_ROUTER_PATH = `${__dirname}/api`;
fs.readdirSync(API_ROUTER_PATH).forEach(function (file) {
	require(path.join(API_ROUTER_PATH, file))(router);
});

module.exports = router;
