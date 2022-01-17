const GreatWork = require("../models/quoteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.searchGreatWorksQuotes = (req, res, next) => {
  req.categoryType = "great work";
  next();
};

exports.getAllGreatWorksQuotes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(GreatWork, req.query, req.categoryType)
    .sort()
    .limitFields()
    .paginate();

  const greatWorksQuotes = await features.query;

  res.status(200).json({
    status: "success",
    results: greatWorksQuotes.length,
    data: {
      quotes: greatWorksQuotes,
    },
  });
});

exports.getGreatWorkQuote = catchAsync(async (req, res, next) => {
  const greatWorkQuote = await GreatWork.findById(req.params.id);

  if (!greatWorkQuote || greatWorkQuote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide an ID of a great work quote.", 404)
    );

  res.status(200).json({
    status: "success",
    data: {
      quote: greatWorkQuote,
    },
  });
});

exports.createGreatWorkQuote = catchAsync(async (req, res, next) => {
  req.body.category.type = req.categoryType;

  const newGreatWorkQuote = await GreatWork.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      quote: newGreatWorkQuote,
    },
  });
});

exports.updateGreatWorkQuote = catchAsync(async (req, res, next) => {
  // 1) I have to check if the ID provided belongs to a great work quote
  const greatWorkQuote = await GreatWork.findOneAndUpdate(
    { _id: req.params.id, "category.type": { $eq: req.categoryType } },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // 2) If it is not => send error.
  if (!greatWorkQuote)
    return next(
      new AppError("Please, provide an ID of a great work quote.", 400)
    );

  res.status(200).json({
    status: "success",
    data: {
      quote: greatWorkQuote,
    },
  });
});

exports.deleteGreatWorkQuote = catchAsync(async (req, res, next) => {
  const quote = await GreatWork.findOneAndDelete({
    _id: req.params.id,
    "category.type": { $eq: req.categoryType },
  });

  if (!quote)
    return next(
      new AppError("Please, provide an ID of a great work quote.", 404)
    );

  res.status(204).json({
    status: "success",
    data: null,
  });
});
