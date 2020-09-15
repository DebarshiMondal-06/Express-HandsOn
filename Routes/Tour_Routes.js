const express = require('express');
const { get_monthly_plan, get_tour_stats, get_all_tours, create_tours, get_tour, delete_a_tour, update_tour, best_5_middleware } = require('../Controllers/TourController.js');
const Tour = require('../models/Tour_models.js');
const Tour_Router = express.Router();
const authController = require('../Controllers/authController');
const reviewRouter = require('../Routes/Review_Routes');

Tour_Router.route('/best-5-tours').get(best_5_middleware, get_all_tours);

Tour_Router.route('/tour-stats').get(get_tour_stats);
Tour_Router.route('/monthly-plan/:year').get(authController.protect, authController.restrict('admin'), get_monthly_plan);


Tour_Router.route('/')
      .get(get_all_tours)
      .post(authController.protect, authController.restrict('admin'), create_tours);

Tour_Router.route('/:id')
      .get(get_tour)
      .patch(authController.protect, authController.restrict('admin'), update_tour)
      .delete(authController.protect, authController.restrict('admin'), delete_a_tour);


// Review Router.........................................
Tour_Router.use('/:tourId/reviews', reviewRouter);

module.exports = Tour_Router;




