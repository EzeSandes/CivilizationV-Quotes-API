const express = require("express");
const techRoutes = require("./routes/technologyRoutes");
const allQuotesRoutes = require("./routes/allQuotesRoutes");
const app = express();

/*********************************  ***************************** */
/************************************************************************** */

/********************************* MIDDLEWARES ***************************** */
/************************************************************************** */
app.use(express.json());

app.use((req, res, next) => {
  req.reqTime = Date.now();
  next();
});

/********************************* ROUTES ******************************** */
/************************************************************************** */

app.use("/api/v1/", allQuotesRoutes);
app.use("/api/v1/technologies", techRoutes);

module.exports = app;
