const Quote = require("../models/quoteModel");
// const AppError = require('../utils/appError');

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

exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) throw new Error("Please, provide a valid ID");

    res.status(200).json({
      status: "success",
      data: {
        quote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createQuote = async (req, res) => {
  try {
    const newQuote = await Quote.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        quote: newQuote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!quote) throw new Error("Please, provide a valid ID");

    res.status(200).json({
      status: "success",
      data: {
        quote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const doc = await Quote.findByIdAndDelete(req.params.id);

    if (!doc) throw new Error("Please, provide a valid ID");

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
