const GreatWork = require("../models/quoteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.searchGreatWorksQuotes = (req, res, next) => {
  req.categoryType = "great work";
  next();
};

exports.getAllGreatWorksQuotes = catchAsync(async (req, res, next) => {
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
  // 1) I have to check if the ID provided belongs to a technology quote
  const greatWorkQuote = await GreatWork.findById(req.params.id, "category");

  if (!greatWorkQuote || greatWorkQuote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide an ID of a great work quote.", 400)
    );

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
});

exports.deleteGreatWorkQuote = catchAsync(async (req, res, next) => {
  const quote = await GreatWork.findById(req.params.id, "category");

  if (!quote || quote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide an ID of a great work quote.", 404)
    );

  await GreatWork.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
