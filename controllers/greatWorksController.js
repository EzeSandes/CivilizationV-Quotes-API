const GreatWork = require("../models/quoteModel");

exports.searchGreatWorksQuotes = (req, res, next) => {
  req.categoryType = "great work";
  next();
};

exports.getAllGreatWorksQuotes = async (req, res) => {
  try {
    const greatWorksQuotes = await GreatWork.find({
      "category.type": req.categoryType,
    });

    res.status(200).json({
      status: "success",
      results: greatWorksQuotes.length,
      data: {
        quotes: greatWorksQuotes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getGreatWorkQuote = async (req, res) => {
  try {
    const greatWorkQuote = await GreatWork.findById(req.params.id);

    if (!greatWorkQuote || greatWorkQuote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a great work quote.");

    res.status(200).json({
      status: "success",
      data: {
        quote: greatWorkQuote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createGreatWorkQuote = async (req, res) => {
  try {
    req.body.category.type = req.categoryType;

    const newGreatWorkQuote = await GreatWork.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        quote: newGreatWorkQuote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateGreatWorkQuote = async (req, res) => {
  try {
    // 1) I have to check if the ID provided belongs to a technology quote
    const greatWorkQuote = await GreatWork.findById(req.params.id, "category");

    if (!greatWorkQuote || greatWorkQuote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a great work quote.");

    // 2) If it is => update it and save it.
    const quoteUpdated = await GreatWork.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        quote: quoteUpdated,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteGreatWorkQuote = async (req, res) => {
  try {
    const quote = await GreatWork.findById(req.params.id, "category");

    if (!quote || quote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a great work quote.");

    await GreatWork.findByIdAndDelete(req.params.id);

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
