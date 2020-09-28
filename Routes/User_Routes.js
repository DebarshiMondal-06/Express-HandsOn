const express = require('express');
const UserController = require('../Controllers/UserController');
const authController = require('../Controllers/authController');
const User = require('../models/User_models');
const User_Router = express.Router();


User_Router.post('/signup', authController.signup);
User_Router.post('/login', authController.login);
// User_Router.get('/logout', authController.logout);
User_Router.post('/forgotPassword', authController.forgotpassword);
User_Router.patch('/resetPassword/:token', authController.resetPassowrd);


User_Router.use(authController.protect); //Auth Controller..........after this
User_Router.put('/UpdateMyPassword', authController.protect, authController.updatePassword);
User_Router.put('/updateMe', UserController.updateMe);
User_Router.get('/me', UserController.get_me, UserController.get_user);


User_Router.use(authController.restrict('admin'))
User_Router.route('/')
      .get(UserController.get_all_users);
User_Router.route('/:id')
      .get(UserController.get_user)
      .delete(UserController.deleteUser)
      .put(UserController.update_user);


module.exports = User_Router;