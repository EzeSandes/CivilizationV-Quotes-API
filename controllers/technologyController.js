const Tech = require("../models/quoteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.searchTechQuotes = (req, res, next) => {
  req.categoryType = "technology";
  next();
};

exports.getAllTechQuotes = catchAsync(async (req, res, next) => {
  const techQuotes = await Tech.find({ "category.type": req.categoryType });

  res.status(200).json({
    status: "success",
    results: techQuotes.length,
    data: {
      quotes: techQuotes,
    },
  });
});

exports.getTechQuote = catchAsync(async (req, res, next) => {
  const techQuote = await Tech.findById(req.params.id);

  if (!techQuote || techQuote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide an ID of a technology quote.", 404)
    );

  res.status(200).json({
    status: "success",
    data: {
      quote: techQuote,
    },
  });
});

exports.createTechQuote = catchAsync(async (req, res, next) => {
  req.body.category.type = req.categoryType;
  const newTechQuote = await Tech.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      quote: newTechQuote,
    },
  });
});

exports.updateTechQuote = catchAsync(async (req, res, next) => {
  // 1) I have to check if the ID provided belongs to a technology quote
  const techQuote = await Tech.findOneAndUpdate(
    {
      _id: req.params.id,
      "category.type": { $eq: req.categoryType },
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // 2) If it is not => send error.
  if (!techQuote)
    return next(
      new AppError("Please, provide an ID of a technology quote.", 400)
    );

  res.status(200).json({
    status: "success",
    data: {
      quote: techQuote,
    },
  });
});

exports.deleteTechQuote = catchAsync(async (req, res, next) => {
  const quote = await Tech.findOneAndDelete({
    _id: req.params.id,
    "category.type": { $eq: req.categoryType },
  });

  if (!quote)
    return next(
      new AppError("Please, provide an ID of a technology quote.", 404)
    );

  res.status(204).json({
    status: "success",
    data: null,
  });
});
