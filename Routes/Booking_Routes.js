const express = require('express');
const BookingRouter = express.Router();
const bookingController = require('../Controllers/bookingController');
const authController = require('../Controllers/authController');


BookingRouter.get('/checkout/:tourID',
  authController.protect,
  bookingController.getCheckout
);


module.exports = BookingRouter;