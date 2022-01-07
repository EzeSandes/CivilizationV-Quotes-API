const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quote = require("./../models/quoteModel");

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
const quotes = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/civ5Quotes-simple.json`,
    "utf-8"
  )
);

// IMPORT DATA

const importData = async () => {
  try {
    await Quote.create(quotes);

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

    console.log("Data succesfully deleted!");
    process.exit();
  } catch (err) {
    console.log(`ERROR ⛔⛔`, err);
  }
};

if (process.argv[2] === "--import") importData();

if (process.argv[2] === "--delete") deleteData();
