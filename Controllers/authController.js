const User = require('../models/User_models');
const AppError = require('../Classes/appError');
const jwt = require('jsonwebtoken');

const getToken = async (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}

exports.signup = async (req, res, next) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword
		});
		const token = await getToken(user._id);
		res.status(404).json({
			status: "Success",
			U_token: token,
			result: user
		});
	} catch (error) {
		return next(new AppError(`${error}`, 401));
	}
}


exports.login = async (req, res, next) => {
	try {
		const { email, C_password } = req.body;
		if (!email || !C_password) {
			return next(new AppError('Please provide Email and Password!', 404));
		}

		const loginuser = await User.findOne({ email }).select('+password');
		const correct = await loginuser.correctPassword(C_password, loginuser.password); // return true or false


		if (!loginuser || !correct) {
			return next(new AppError(`Incorrect email or password`, 401));
		}
		const token = await getToken(loginuser._id);
		res.status(200).json({
			status: "Success",
			U_token: token
		});
	} catch (error) {
		return next(new AppError(`${error}`, 404));
	}
}


exports.protect = (req, res, next) => {
	// 1) getting token and checks it there.............

	let verifyToken;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		verifyToken = req.headers.authorization.split(' ')[1];
		// console.log(verifyToken);
	}
	if (!verifyToken) {
		return next(new AppError(`Logined Failed! Please try again to get access.`, 401));
	}

	// 2.) Verification Token .........................................
	next();
}















