// catchAsync
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// export
module.exports = catchAsync;
