const Tech = require("../models/quoteModel");

exports.searchTechQuotes = (req, res, next) => {
  req.categoryType = "technology";
  next();
};

exports.getAllTechQuotes = async (req, res) => {
  try {
    const techQuotes = await Tech.find({ "category.type": req.categoryType });

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

    if (techQuote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a technology quote.");

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
      message: err.message,
    });
  }
};

exports.createTechQuote = async (req, res) => {
  try {
    req.body.category.type = "technology";
    const newTechQuote = await Tech.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        quote: newTechQuote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTechQuote = async (req, res) => {
  try {
    // // 1) I have to check if the ID provided belongs to a technology quote
    const techQuote = await Tech.findById(req.params.id, "category");

    if (techQuote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a technology quote.");

    // 2) If it is => update it and save it.
    const quoteUpdated = await Tech.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

exports.deleteTechQuote = async (req, res) => {
  try {
    await Tech.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
