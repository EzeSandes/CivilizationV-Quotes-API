const express = require("express");
const greatWorkController = require("../controllers/greatWorksController");

const router = express.Router();

/// MIDDLEWARES
router.use(greatWorkController.searchGreatWorksQuotes);
///

router
  .route("/")
  .get(greatWorkController.getAllGreatWorksQuotes)
  .post(greatWorkController.createGreatWorkQuote);

router
  .route("/:id")
  .get(greatWorkController.getGreatWorkQuote)
  .patch(greatWorkController.updateGreatWorkQuote)
  .delete(greatWorkController.deleteGreatWorkQuote);

module.exports = router;
