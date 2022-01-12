// Aync functions returns Promises so, I can catch errors outside them.

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err)); // I need "next" to pass the error to the "Error middleware". (err) => next(err) == (next)
  };
};
