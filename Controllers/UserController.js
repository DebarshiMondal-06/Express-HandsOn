const User = require('../models/User_models');

exports.get_all_users = async (req, res) => {
      const getAllUser = await User.find();

      res.status(200).json({
            status: 'success',
            size: getAllUser.length,
            result: getAllUser
      });
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
