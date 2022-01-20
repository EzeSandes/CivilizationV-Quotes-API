const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quote = require("./../models/quoteModel");
const Era = require("./../models/eraModel");
const eraQuote = require("./../models/eraModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true, // ---> NO SOPORTADAS EN 6.0
    useFindAndModify: false, //---> NO SOPORTADAS EN 6.0
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB conection successful!"));

// Read Files -> Result will be a STRING
const techQuotes = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/civ5Quotes-technologies.json`,
    "utf-8"
  )
);

const eraQuotes = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/civ5Quotes-eras.json`, "utf-8")
);

const wonderQuotes = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/civ5Quotes-wonders.json`,
    "utf-8"
  )
);

const greatWorkQuotes = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/civ5Quotes-greatWorks.json`,
    "utf-8"
  )
);

const quotes = [...techQuotes, ...wonderQuotes, ...greatWorkQuotes];

// IMPORT DATA

const importData = async () => {
  try {
    await Quote.create(quotes);
    await Era.create(eraQuotes);

    console.log("Data succesfully loaded!");
  } catch (err) {
    console.log(`ERROR ⛔⛔`, err);
  }

  process.exit();
};

// DELETE ALL DATA

const deleteData = async () => {
  try {
    await Quote.deleteMany();
    await Era.deleteMany();

    console.log("Data succesfully deleted!");
    process.exit();
  } catch (err) {
    console.log(`ERROR ⛔⛔`, err);
  }
};

if (process.argv[2] === "--import") importData();

if (process.argv[2] === "--delete") deleteData();
