exports.getAllUsers = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: [],
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
