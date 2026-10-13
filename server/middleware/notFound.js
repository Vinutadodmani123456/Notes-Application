/**
 * 404 Not Found Middleware
 * Intercepts unhandled routes and returns a JSON response
 */
const notFound = (req, res, next) => {
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = notFound;
