const express = require("express");
const allQuotesController = require("../controllers/allQuotesController");

const router = express.Router();

router
  .route("/")
  .get(allQuotesController.getAllQuotes)
  .post(allQuotesController.createQuote);

router
  .route("/:id")
  .get(allQuotesController.getQuote)
  .patch(allQuotesController.updateQuote)
  .delete(allQuotesController.deleteQuote);

module.exports = router;
