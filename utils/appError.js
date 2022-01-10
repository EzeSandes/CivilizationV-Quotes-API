class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // 400 = fail; 500 = error

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
