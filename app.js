const express = require("express");
const dotenv = require("dotenv");
const data = require("./dev-data/data/civ5Quotes-simple");

const app = express();

/*********************************  CONSTANTS ***************************** */
/************************************************************************** */

dotenv.config({ path: "./config.env" });

// Converted to an Array of Objects
const quotesData = JSON.parse(JSON.stringify(data));

/*********************************  MIDDLEWARES ***************************** */
/************************************************************************** */
app.use(express.json());

app.use((req, res, next) => {
  req.reqTime = Date.now();
  next();
});

/*********************************  ROUTES ******************************** */
/************************************************************************** */
app.get("/api/v1/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      quotes: quotesData,
    },
  });
});

app.get("/api/v1/technologies", (req, res) => {
  const quotes = quotesData.filter((el) => el.type.category === "Technology");

  console.log(`Requested time: ${Date.now() - req.reqTime}`);

  res.status(200).json({
    status: "success",
    results: quotes.length,
    data: {
      quotes,
    },
  });
});

app.get("/api/v1/technologies/:id", (req, res) => {
  const id = +req.params.id; // || Number(...)

  const quote = quotesData.find((el) => el.id === id);

  if (quote)
    res.status(200).json({
      status: "success",
      data: {
        quote,
      },
    });
  else res.status(404).end();
});

/*********************************  SERVER ******************************** */
/************************************************************************** */

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${PORT}`);
});
