const mongoose = require("mongoose");

const eraQuoteSchema = mongoose.Schema({
  quotes: [
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
    enum: {
      values: [
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
      message:
        "Era can be only: Ancient, Classical, Medieval, Renaissance, Industrial, Modern, Future, Atomic, Information",
    },
    required: [true, "An era quote must have era name"],
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

///////

const eraQuote = mongoose.model("eraQuote", eraQuoteSchema);

module.exports = eraQuote;
