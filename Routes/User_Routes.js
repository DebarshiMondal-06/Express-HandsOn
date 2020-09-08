const express = require('express');
const UserController = require('../Controllers/UserController');
const authController = require('../Controllers/authController');

const User_Router = express.Router();


User_Router.post('/signup', authController.signup);
User_Router.post('/login', authController.login);

// Rest like architecture......................
User_Router.route('/')
      .get(UserController.get_all_users)
      .post(UserController.create_user); //Mounting Routes.....................

User_Router.route('/:id')
      .get(UserController.get_user)
      .delete(UserController.delete_user)
      .patch(UserController.update_user);


module.exports = User_Router;