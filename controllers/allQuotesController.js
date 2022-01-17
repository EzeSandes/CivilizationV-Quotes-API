const Quote = require("../models/quoteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllQuotes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Quote, req.query, req.categoryType)
    .sort()
    .limitFields()
    .paginate();

  const allQuotes = await features.query;

  res.status(200).json({
    status: "success",
    results: allQuotes.length,
    data: {
      quotes: allQuotes,
    },
  });
});

exports.getQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findById(req.params.id);

  // I immediately call the global error handling middleware
  if (!quote) return next(new AppError("Please, provide a valid ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      quote,
    },
  });
});

exports.createQuote = catchAsync(async (req, res, next) => {
  const newQuote = await Quote.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      quote: newQuote,
    },
  });
});

exports.updateQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!quote) return next(new AppError("Please, provide a valid ID", 400));

  res.status(200).json({
    status: "success",
    data: {
      quote,
    },
  });
});

exports.deleteQuote = catchAsync(async (req, res, next) => {
  const doc = await Quote.findByIdAndDelete(req.params.id);

  if (!doc) return next(new AppError("Please, provide a valid ID", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});
