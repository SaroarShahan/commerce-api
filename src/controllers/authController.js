
exports.signup = async (req, res, next) => {
    try {
        res.status(201).json({
            status: "success",
            message: "User signed up successfully",
        });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
        });
    } catch (error) {
        next(error);
    }
}