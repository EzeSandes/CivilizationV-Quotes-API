const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
  quote: {
    type: String,
    required: [true, "A quote must have a quote"],
  },
  author: {
    type: String,
    required: [true, "A quote must have an author"],
  },
  category: {
    type: {
      type: String,
      enum: {
        values: ["technology", "wonder", "great work"],
        message: "A category type only can be: technology, wonder, great work.",
      },
    },
    name: {
      type: String,
      required: [true, "Category must have a name"],
    },
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

/////// QUERY MEDDLEWARE

quoteSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

quoteSchema.post(/^find/, function (doc, next) {
  console.log(`Query took: ${Date.now() - this.start} milliseconds`);
  next();
});

///////

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
