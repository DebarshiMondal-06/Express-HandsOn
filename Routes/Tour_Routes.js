const express = require('express');
const { get_all_tours, create_tours, get_tour, delete_a_tour } = require('../Controllers/Tour_controller.js');
const Tour_Router = express.Router();





Tour_Router.route('/')
      .get(get_all_tours)
      .post(create_tours);

Tour_Router.route('/:id')
      .get(get_tour)
      .delete(delete_a_tour);



module.exports = Tour_Router;



