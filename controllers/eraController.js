const Era = require("../models/eraModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAllEraQuotes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Era, req.query)
    .sort()
    .limitFields()
    .paginate();

  const eraQuotes = await features.query;

  res.status(200).json({
    status: "success",
    results: eraQuotes.length,
    data: {
      quotes: eraQuotes,
    },
  });
});

exports.getEraQuotes = catchAsync(async (req, res, next) => {
  const eraQuote = await Era.findById(req.params.id);

  if (!eraQuote) return next(new AppError("Please, provide a valid ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      quote: eraQuote,
    },
  });
});

exports.getEraQuote = catchAsync(async (req, res, next) => {
  const eraQuotes = await Era.findOne({
    _id: req.params.eraId,
    "quotes._id": req.params.id,
  }).select("quotes");

  if (!eraQuotes) return next(new AppError("Please, provide a valid ID", 404));

  /*
  MongoDB Id -> String to compare
  
  el._id == ObjectId ==> el._id.toString() converts ObjectId to String;
  el.id == String ready to compare with another string.
  
  el._id.toString() == el.id
  */
  const eraQuote = eraQuotes.quotes.find((el) => el.id === req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      quote: eraQuote,
    },
  });
});

exports.createEraQuote = catchAsync(async (req, res, next) => {
  const newQuote = await Era.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      quote: newQuote,
    },
  });
});

exports.updateEraQuotes = catchAsync(async (req, res, next) => {
  const eraQuote = await Era.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!eraQuote) return next(new AppError("Please, provide a valid ID", 400));

  res.status(200).json({
    status: "success",
    data: {
      quote: eraQuote,
    },
  });
});

exports.deleteEraQuotes = catchAsync(async (req, res, next) => {
  const doc = await Era.findByIdAndDelete(req.params.id);

  if (!doc) return next(new AppError("Please, provide a valid ID", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});
