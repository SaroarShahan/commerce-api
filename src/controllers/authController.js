const bcrypt = require('bcrypt');

const User = require('../db/models/user');

const { generateToken } = require('../utils/jwt');
const catchAsync = require('../middleware/catchAsync');
const { AppError } = require('../errors');

exports.signup = catchAsync(async (req, res, next) => {
  const { first_name, last_name, email, password, role } = req.body;

  if (!['1', '2'].includes(role)) {
    throw new AppError('Invalid role', 400);
  }

  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: hashPassword,
    role,
  });

  if (!newUser) {
    return next(new AppError('Failed to create the user', 400));
  }

  delete newUser.dataValues.password;
  delete newUser.dataValues.deletedAt;

  res.status(201).json({
    status: true,
    message: 'User signed up successfully',
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  const token = await generateToken({
    id: user.dataValues.id,
    role: user.dataValues.role,
  });

  res.status(200).json({
    status: true,
    message: 'User logged in successfully',
    data: { token },
  });
});
