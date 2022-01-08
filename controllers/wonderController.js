const Wonder = require("../models/quoteModel");

exports.searchWonderQuotes = (req, res, next) => {
  req.categoryType = "wonder";
  next();
};

exports.getAllWonderQuotes = async (req, res) => {
  try {
    const wondersQuotes = await Wonder.find({
      "category.type": req.categoryType,
    });

    res.status(200).json({
      status: "success",
      results: wondersQuotes.length,
      data: {
        quotes: wondersQuotes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getWonderQuote = async (req, res) => {
  try {
    const wonderQuote = await Wonder.findById(req.params.id);

    if (!wonderQuote || wonderQuote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a wonder quote.");

    res.status(200).json({
      status: "success",
      data: {
        quotes: wonderQuote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createWonderQuote = async (req, res) => {
  try {
    req.body.category.type = req.categoryType;

    const newWonderQuote = await Wonder.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        quote: newWonderQuote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateWonderQuote = async (req, res) => {
  try {
    // 1) I have to check if the ID provided belongs to a technology quote
    const wonderQuote = await Wonder.findById(req.params.id, "category");

    if (!wonderQuote || wonderQuote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a wonder quote.");

    // 2) If it is => update it and save it.
    const quoteUpdated = await Wonder.findByIdAndUpdate(
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

exports.deleteWonderQuote = async (req, res) => {
  try {
    const quote = await Wonder.findById(req.params.id, "category");

    if (!quote || quote.category.type !== req.categoryType)
      throw new Error("Please, provide an ID of a wonder quote.");

    await Wonder.findByIdAndDelete(req.params.id);

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
