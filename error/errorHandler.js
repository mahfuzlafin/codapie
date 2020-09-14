// import
const AppError = require('../error/AppError');

// import
// handleCastErrorDB
// sendErrorDev
// sendErrorProd
// globalErrorHandler
// export

// handleCastErrorDB
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// sendErrorDev
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errorName: err.name,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// sendErrorProd
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// globalErrorHandler
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    // CastError
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};

// export
module.exports = globalErrorHandler;
