const Wonder = require("../models/quoteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.searchWonderQuotes = (req, res, next) => {
  req.categoryType = "wonder";
  next();
};

exports.getAllWonderQuotes = catchAsync(async (req, res, next) => {
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
});

exports.getWonderQuote = catchAsync(async (req, res, next) => {
  const wonderQuote = await Wonder.findById(req.params.id);

  if (!wonderQuote || wonderQuote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide a valid ID of a wonder quote.", 404)
    );

  res.status(200).json({
    status: "success",
    data: {
      quote: wonderQuote,
    },
  });
});

exports.createWonderQuote = catchAsync(async (req, res, next) => {
  req.body.category.type = req.categoryType;

  const newWonderQuote = await Wonder.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      quote: newWonderQuote,
    },
  });
});

exports.updateWonderQuote = catchAsync(async (req, res, next) => {
  // 1) I have to check if the ID provided belongs to a technology quote
  const wonderQuote = await Wonder.findById(req.params.id, "category");

  if (!wonderQuote || wonderQuote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide a valid ID of a wonder quote.", 400)
    );

  // 2) If it is => update it and save it.
  const quoteUpdated = await Wonder.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteWonderQuote = catchAsync(async (req, res, next) => {
  const quote = await Wonder.findById(req.params.id, "category");

  if (!quote || quote.category.type !== req.categoryType)
    return next(
      new AppError("Please, provide a valid ID of a wonder quote.", 404)
    );

  await Wonder.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
