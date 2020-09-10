const express = require('express');
const UserController = require('../Controllers/UserController');
const authController = require('../Controllers/authController');

const User_Router = express.Router();


User_Router.post('/signup', authController.signup);
User_Router.post('/login', authController.login);

User_Router.post('/forgotPassword', authController.forgotpassword);
User_Router.patch('/resetPassword/:token', authController.resetPassowrd);

User_Router.put('/updateMe', UserController.updateMe);

// Rest like architecture......................
User_Router.route('/')
      .get(authController.protect, UserController.get_all_users)
      .post(UserController.create_user); //Mounting Routes.....................

User_Router.route('/:id')
      .get(UserController.get_user)
      .delete(UserController.delete_user)
      .patch(UserController.update_user);


module.exports = User_Router;