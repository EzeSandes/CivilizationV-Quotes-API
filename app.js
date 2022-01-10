const express = require("express");
const techRoutes = require("./routes/technologyRoutes");
const wondersRoutes = require("./routes/wondersRoutes");
const allQuotesRoutes = require("./routes/allQuotesRoutes");
const greatWorksRoutes = require("./routes/greatWorksRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

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
app.use("/api/v1/all_quotes", allQuotesRoutes);

app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);

  // res.status(404).json({
  //   status: "fail",
  //   message: err.message,
  // });

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
