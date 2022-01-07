const express = require("express");
const techController = require("../controllers/technologyController");

const router = express.Router();

/// MIDDLEWARES
router.use(techController.searchTechQuotes);
///

router
  .route("/")
  .get(techController.getAllTechQuotes)
  .post(techController.createTechQuote);

router
  .route("/:id")
  .get(techController.getTechQuote)
  .delete(techController.deleteTechQuote)
  .patch(techController.updateTechQuote);

module.exports = router;
