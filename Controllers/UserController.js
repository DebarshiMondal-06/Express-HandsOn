const User = require('../models/User_models');
const AppError = require('../Classes/appError');
const factory = require('../Controllers/handlerFunction');
const multer = require('multer');
const sharp = require('sharp');


// const multerStorage = multer.diskStorage({
//       destination: (req, file, cb) => {
//             cb(null, 'public/img/users');
//       },
//       filename: (req, file, cb) => {
//             const ext = file.mimetype.split('/')[1];
//             cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//       }
// }); // .*.*.*.*......default without rezing.............


// *************************    Image Uploading And Resizing *********************************
const multerStorage = multer.memoryStorage();  // Buffer.........
const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith('image')) {
            cb(null, true);
      }
      else {
            cb(new AppError('Not an image! Please upload only images', 501), false);
      }
};
const upload = multer({
      storage: multerStorage,
      fileFilter: multerFilter
});
exports.uploadUserPhoto = upload.single('photo');

exports.resizeImage = (req, res, next) => {
      if (!req.file) return next();
      req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

      sharp(req.file.buffer)
            .resize(400, 400)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/users/${req.file.filename}`);
      next();
};
// ends here image.....................




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
            if (req.file) fitlerBody.photo = req.file.filename;

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
