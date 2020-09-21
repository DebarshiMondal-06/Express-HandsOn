const express = require('express');
const View_Router = express.Router();
const View_Controller = require('../Controllers/ViewController');


View_Router.get('/', View_Controller.getOverview);
View_Router.get('/tours', View_Controller.getTours);

module.exports = View_Router;