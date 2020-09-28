const User = require('../models/User_models');
const AppError = require('../Classes/appError');
const factory = require('../Controllers/handlerFunction');

// Filtering Req. Key name....................
const filterObj = (obj, ...allowedfields) => {
      // console.log(obj);
      const newObj = {};
      Object.keys(obj).forEach((el) => { // returns an array Object.keys............................
            if (allowedfields.includes(el)) {
                  Object.assign(newObj, obj);
            }
      });
      return newObj;
}
exports.updateMe = async (req, res, next) => {
      try {
            const { email, name } = req.body;
            if (!email || !name) {
                  return next(new AppError(`Email and name is required for Updation`, 404));
            }
            const fitlerBody = filterObj(req.body, "email", "name");
            const findUser = await User.findByIdAndUpdate(req.user.id, fitlerBody, {
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

exports.get_me = (req, res, next) => {
      req.params.id = req.user.id;
      next();
};



exports.get_all_users = factory.getall(User);
exports.get_user = factory.getOne(User);
exports.update_user = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
