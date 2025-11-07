/**
 * Middleware to handle 404 Not Found routes
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // pass to errorHandler
};

/**
 * Global error handling middleware
 * Sends consistent JSON response
 */
export const errorHandler = (err, req, res, next) => {
  // If status code already set (e.g., 404), keep it; otherwise 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Include stack trace only in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
