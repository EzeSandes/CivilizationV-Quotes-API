const Wonder = require("../models/quoteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.searchWonderQuotes = (req, res, next) => {
  req.categoryType = "wonder";
  next();
};

exports.getAllWonderQuotes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Wonder, req.query, req.categoryType)
    .sort()
    .limitFields()
    .paginate();

  // Only here, Query is executed.
  const wondersQuotes = await features.query;

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
  // 1) I have to check if the ID provided belongs to a wonder quote
  const wonderQuote = await Wonder.findOneAndUpdate(
    { _id: req.params.id, "category.type": { $eq: req.categoryType } },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // 2) If it is not => send error.
  if (!wonderQuote)
    return next(
      new AppError("Please, provide a valid ID of a wonder quote.", 400)
    );

  res.status(200).json({
    status: "success",
    data: {
      quote: wonderQuote,
    },
  });
});

exports.deleteWonderQuote = catchAsync(async (req, res, next) => {
  const quote = await Wonder.findOneAndDelete({
    _id: req.params.id,
    "category.type": { $eq: req.categoryType },
  });

  if (!quote)
    return next(
      new AppError("Please, provide a valid ID of a wonder quote.", 404)
    );

  res.status(204).json({
    status: "success",
    data: null,
  });
});
