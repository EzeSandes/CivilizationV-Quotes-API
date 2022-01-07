const Tech = require("../models/quoteModel");

exports.getAllTechQuotes = async (req, res) => {
  try {
    const techQuotes = await Tech.find({ "category.type": "technology" });

    res.status(200).json({
      status: "success",
      results: techQuotes.length,
      data: {
        quotes: techQuotes,
      },
    });
  } catch (err) {
    console.log(`⛔ERROR⛔`, err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTechQuote = async (req, res) => {
  try {
    const techQuote = await Tech.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        quote: techQuote,
      },
    });
  } catch (err) {
    console.log(`⛔ERROR⛔`, err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
