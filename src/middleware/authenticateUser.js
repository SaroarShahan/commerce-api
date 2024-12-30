const catchAsync = require('./catchAsync');
const { AppError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');
const User = require('../db/models/user');

exports.authenticateUser = catchAsync(async (req, res, next) => {
  const { headers } = req;

  let token = '';

  if (headers.authorization && headers.authorization.startsWith('Bearer')) {
    token = headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorized access', 401));
  }

  const decodedToken = isTokenValid({ token });

  const user = await User.findByPk(decodedToken.id);

  if (!user) {
    return next(new AppError('User no longer exists', 400));
  }

  req.user = {
    id: user.id,
    role: user.role,
  };

  return next();
});
