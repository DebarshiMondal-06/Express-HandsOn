const express = require('express');
const View_Router = express.Router();
const View_Controller = require('../Controllers/ViewController');
const authController = require('../Controllers/authController');
const bookingController = require('../Controllers/bookingController');

View_Router.get('/me', authController.protect, View_Controller.getAccount);


View_Router.use(authController.isLoggedIn);

View_Router.get('/', bookingController.createBookingCheckout, View_Controller.getOverview);
View_Router.get('/tours/:id', View_Controller.getTours);
View_Router.get('/signup', View_Controller.signupage);
View_Router.get('/login', View_Controller.loginpage);
View_Router.get('/logout', authController.logout, View_Controller.logoutpage);
View_Router.get('/my-tours', authController.protect, View_Controller.getMyTours);
View_Router.get('/forgot-password', View_Controller.forgotpage);
View_Router.get('/resetPasswordSent/:token', View_Controller.resetPassword);


module.exports = View_Router;