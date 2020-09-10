const User = require('../models/User_models');
const AppError = require('../Classes/appError');
const jwt = require('jsonwebtoken');
const { removeListener } = require('../models/User_models');
const sendEmail = require('../Classes/emailMailer');


const getToken = async (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}

const verificationtoken = async (token, secret) => {
	return jwt.verify(token, secret);
}

exports.signup = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
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
		// const correct = ; // return true or false


		if (!loginuser || !await loginuser.correctPassword(C_password, loginuser.password)) {
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


exports.protect = async (req, res, next) => {
	try {
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
		const decode = await verificationtoken(verifyToken, process.env.JWT_SECRET);


		// 3.) Check if user still exists................................
		const CurrentUser = await User.findById(decode.id);           //finding single ID......
		if (!CurrentUser) {
			return next(new AppError(`User doesn't exists longer!`, 401));
		}

		// 4.) Check if user changed password after token created
		if (CurrentUser.changePasswordAfter(decode.iat)) {
			return next(new AppError(`User recently chnged password! Please login Again`, 401));
		}

		// Grant Access to Protected Route......................
		req.user = CurrentUser;
		next();

	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			return next(new AppError(`Invalid token, Please logined Again`, 401));
		}
		if (error.name === "TokenExpiredError") {
			return next(new AppError(`Token Expires, Please logined Again`, 401));
		}
		else {
			return next(new AppError(`${error}`, 404));
		}
	}
}

exports.restrict = (...roles) => { // Closure // We cannot pass arguments to a middleware function..... so for that we need an arbutarty method...  
	return (req, res, next) => { //middlware function........
		// roles is an array like ['admin'] 
		if (!roles.includes(req.user.role)) { //roles is accessed beacause of Closure (Lexial scoping)........
			return next(new AppError(`You are not authorized to do this actions`, 403));
		}
		console.log(req.user.role);
		next();
	}
}

exports.forgotpassword = async (req, res, next) => {
	try {
		// 1) get user based on posted Email 
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return next(new AppError(`There is no user with this email`, 404));
		}

		// 2) Generate random token... 
		const resetToken = await user.createPasswordResetToken();
		await user.save({ validateBeforeSave: false });


		// // 3) send it via email 
		// const ressetUrl = `${req.protocol}://`


	} catch (error) {
		return next(new AppError(`${error}`, 404));
	}
}
