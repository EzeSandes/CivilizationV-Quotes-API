const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

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

/*
const quoteEraSchema = mongoose.Schema({
  quote: [
    {
      quote: {
        type: String,
        required: [true, "A quote must have a quote"],
      },
      author: {
        type: String,
        required: [true, "A quote must have an author"],
      },
    },
  ],
  era: {
    type: String,
    enum: [
      "Ancient",
      "Classical",
      "Medieval",
      "Renaissance",
      "Industrial",
      "Modern",
      "Future",
      "Atomic",
      "Information",
    ],
  },
  expansionAdded: {
    type: String,
    enum: {
      values: ["Vanilla", "Gods&Kings", "Brave New World"],
      message: "Expansion only can be: Vanilla, Gods&Kings, Brave New World",
    },
    default: "Vanilla",
  },
});
*/

/*********************************  SERVER ******************************** */
/************************************************************************** */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
