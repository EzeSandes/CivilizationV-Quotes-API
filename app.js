const express = require("express");
const techRoutes = require("./routes/technologyRoutes");
const wondersRoutes = require("./routes/wondersRoutes");
const allQuotesRoutes = require("./routes/allQuotesRoutes");
const greatWorksRoutes = require("./routes/greatWorksRoutes");
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

app.use("/api/v1/technologies", techRoutes);
app.use("/api/v1/wonders", wondersRoutes);
app.use("/api/v1/great_works", greatWorksRoutes);
app.use("/api/v1/", allQuotesRoutes);

module.exports = app;
