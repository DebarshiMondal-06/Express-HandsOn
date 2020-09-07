const express = require('express');
const { get_all_users, create_user, get_user, delete_user, update_user } = require('../Controllers/UserController');
const User_Router = express.Router();




User_Router.route('/')
      .get(get_all_users)
      .post(create_user); //Mounting Routes.....................

User_Router.route('/:id')
      .get(get_user)
      .delete(delete_user)
      .patch(update_user);


module.exports = User_Router;