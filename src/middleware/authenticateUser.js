const catchAsync = require('./catchAsync');
const { AppError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

exports.authenticateUser = catchAsync(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return next(new AppError('Unauthorized access', 401));
  }

  const { id, role } = isTokenValid({ token });
  req.user = { id, role };

  next();
});
