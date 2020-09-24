const express = require('express');
const View_Router = express.Router();
const View_Controller = require('../Controllers/ViewController');


View_Router.get('/', View_Controller.getOverview);
View_Router.get('/tours/:id', View_Controller.getTours);
View_Router.get('/login', View_Controller.loginpage);

module.exports = View_Router;