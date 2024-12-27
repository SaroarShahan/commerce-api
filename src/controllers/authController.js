const User = require('../db/models/user');

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

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      role,
    });

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
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Invalid email or password',
      });
    }

    res.status(200).json({
      status: true,
      message: 'User logged in successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
