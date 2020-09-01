const express = require('express');
const { get_monthly_plan, get_tour_stats, get_all_tours, create_tours, get_tour, delete_a_tour, update_tour, best_5_middleware } = require('../Controllers/Tour_controller.js');
const Tour = require('../models/Tour_models.js');
const Tour_Router = express.Router();


Tour_Router.route('/best-5-tours').get(best_5_middleware, get_all_tours);

Tour_Router.route('/tour-stats').get(get_tour_stats);
Tour_Router.route('/monthly-plan/:year').get(get_monthly_plan);


Tour_Router.route('/')
      .get(get_all_tours)
      .post(create_tours);

Tour_Router.route('/:id')
      .get(get_tour)
      .patch(update_tour)
      .delete(delete_a_tour);



module.exports = Tour_Router;



