const User = require('../models/User_models');
const AppError = require('../Classes/appError');


exports.signup = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.status(404).json({
			status: "Success",
			result: user
		});
	} catch (error) {
		return next(new AppError(`${error}`, 404));
	}
}