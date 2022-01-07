const express = require("express");
const allQuotesController = require("../controllers/allQuotesController");

const router = express.Router();

router.route("/").get(allQuotesController.getAllQuotes);

module.exports = router;
