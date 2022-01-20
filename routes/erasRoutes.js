const express = require("express");
const eraController = require("../controllers/eraController");

const router = express.Router();

router
  .route("/")
  .get(eraController.getAllEraQuotes)
  .post(eraController.createEraQuote);

router
  .route("/:id")
  .get(eraController.getEraQuotes)
  .patch(eraController.updateEraQuotes)
  .delete(eraController.deleteEraQuotes);

router.route("/:eraId/:id").get(eraController.getEraQuote);

module.exports = router;
