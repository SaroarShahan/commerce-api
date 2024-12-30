const bcrypt = require('bcrypt');

const User = require('../db/models/user');

const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res, next) => {
  const { first_name, last_name, email, password, role } = req.body;

  try {
    if (!['1', '2'].includes(role)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid role',
      });
    }

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: 'Email already exists',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashPassword,
      role,
    });

    delete newUser.dataValues.password;
    delete newUser.dataValues.deletedAt;

    res.status(201).json({
      status: true,
      message: 'User signed up successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
      return res.status(401).json({
        status: false,
        message: 'Invalid email or password',
      });
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
  } catch (error) {
    next(error);
  }
};
