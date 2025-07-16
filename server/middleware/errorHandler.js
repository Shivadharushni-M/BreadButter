// Error handling middleware for Express
const errorHandler = (err, req, res, next) => {
  // Log the error for server-side tracking
  console.error(err.stack);

  // Determine the status code
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Generic error response
  res.status(statusCode).json(errorResponse);
};

// Custom error class for more detailed error handling
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Async error wrapper to handle async route errors
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { errorHandler };