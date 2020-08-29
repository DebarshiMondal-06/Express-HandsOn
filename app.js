const express = require('express');
const app = express();

const Tour_Router = require('./Routes/Tour_Routes');
const User_Router = require('./Routes/User_Routes');
app.use(express.json());


// Routes Mounting .................................
app.use('/api/v1/tours', Tour_Router);
app.use('/api/v1/users', User_Router);

module.exports = app;
