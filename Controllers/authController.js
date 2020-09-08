const User = require('../models/User_models');
const AppError = require('../Classes/appError');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword
		});
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN
		});
		res.status(404).json({
			status: "Success",
			U_token: token,
			result: user
		});
	} catch (error) {
		return next(new AppError(`${error}`, 404));
	}
}