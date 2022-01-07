const Quote = require("../models/quoteModel");

exports.getAllQuotes = async (req, res) => {
  try {
    const allQuotes = await Quote.find();

    res.status(200).json({
      status: "success",
      results: allQuotes.length,
      data: {
        quotes: allQuotes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: `Quote not found: ${err}`,
    });
  }
};
