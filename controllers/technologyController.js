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
  const techQuote = await Tech.findById(req.params.id, "category");

  if (!techQuote || techQuote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide an ID of a technology quote.", 400)
    );

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
});

exports.deleteTechQuote = catchAsync(async (req, res, next) => {
  const quote = await Tech.findById(req.params.id, "category");

  if (!quote || quote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide an ID of a technology quote.", 404)
    );

  await Tech.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
