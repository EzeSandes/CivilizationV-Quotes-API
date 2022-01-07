const express = require("express");
const techController = require("../controllers/technologyController");

const router = express.Router();

router.route("/").get(techController.getAllTechQuotes);
router.route("/:id").get(techController.getTechQuote);

module.exports = router;
