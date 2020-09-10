const User = require('../models/User_models');
const AppError = require('../Classes/appError');

// Filtering Req. Key name....................
const filterObj = (obj, ...allowedfields) => {
      // console.log(allowedfields);
      const newObj = {};
      Object.keys(obj).forEach((el) => {
            if (allowedfields.includes(el)) {
                  newObj[el] = obj[el];
            }
      });
      return newObj;
}

exports.get_all_users = async (req, res) => {
      const getAllUser = await User.find();

      res.status(200).json({
            status: 'success',
            size: getAllUser.length,
            result: getAllUser
      });
}

exports.updateMe = async (req, res, next) => {
      try {
            const { email, name } = req.body;
            if (!email || !name) {
                  return next(new AppError(`Email and name is required for Updation`, 404));
            }

            const fitlerBody = filterObj(req.body, "email", "name");
            const findUser = await User.findByIdAndUpdate(req.user._id, fitlerBody, {
                  new: true,
                  runValidators: true
            });
            res.status(200).json({
                  message: "Success",
                  result: findUser
            });
      } catch (error) {
            return next(new AppError(`${error}`, 401));
      }
}

exports.create_user = (req, res) => {
      res.status(500).json({
            status: 'error',
            message: "Server error not reachabele"
      });
}
exports.get_user = (req, res) => {
      res.status(500).json({
            status: 'error',
            message: "Server error not reachabele"

      });
}
exports.delete_user = (req, res) => {
      res.status(500).json({
            status: 'error',
            message: "Server error not reachabele"

      });
}
exports.update_user = (req, res) => {
      res.status(500).json({
            status: 'error',
            message: "Server error not reachabele"
      });
}
