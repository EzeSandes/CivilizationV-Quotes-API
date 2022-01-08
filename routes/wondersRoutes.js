const express = require("express");
const wonderController = require("../controllers/wonderController");

const router = express.Router();

/// MIDDLEWARES
router.use(wonderController.searchWonderQuotes);
///

router
  .route("/")
  .get(wonderController.getAllWonderQuotes)
  .post(wonderController.createWonderQuote);

router
  .route("/:id")
  .get(wonderController.getWonderQuote)
  .delete(wonderController.deleteWonderQuote)
  .patch(wonderController.updateWonderQuote);

module.exports = router;
