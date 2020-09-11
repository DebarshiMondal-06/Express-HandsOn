const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const AppError = require('./Classes/appError.js');
const { errorfunction } = require('./Controllers/errorHandleController.js');

// GLOBAL Middlewares for Express...................

// 1) for HTTP header 
app.use(helmet());


// 2) for Cookie sending
app.use(cookieParser());

// 3) For Parsing data on req.body......................
app.use(express.json());

// Data Santization against NoSQL query injection..........
app.use(mongoSanitize());


// Data Santization for XSS(for html code)..........
app.use(xss());

// Prevent paramete pollution............
app.use(hpp());

const limiter = rateLimit({
      max: 10,
      windowMs: 60 * 60 * 1000,
      message: 'Too many Request from this IP! Please try again in an hour!'
});
// For Rate limiting for APIs.
app.use('/api', limiter);



const Tour_Router = require('./Routes/Tour_Routes');
const User_Router = require('./Routes/User_Routes');
// Routes Mounting .................................
app.use('/api/v1/tours', Tour_Router);
app.use('/api/v1/users', User_Router);

// Error for no correct URL...................................
app.all('*', (req, res, next) => {
      // res.status(404).json({
      //       Status: "Fail",
      //       body: `No such ${req.OriginalUrl} request to proceed!`
      // })

      // const err = new Error(`No such ${req.OriginalUrl} request to proceed!`);
      // err.status = 'fail';
      // err.statusCode = 404;
      // next(err); //err here simpify assumes an error and sends it to global error middleware.........

      next(new AppError(`No such ${req.originalUrl} request to proceed!`, 404));
      // console.log(req);
});

// Global errorhandle middleware........................
app.use(errorfunction);

module.exports = app;
