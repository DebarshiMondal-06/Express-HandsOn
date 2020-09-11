const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

app.use(cookieParser());
app.use(express.json());

const Tour_Router = require('./Routes/Tour_Routes');
const User_Router = require('./Routes/User_Routes');

const AppError = require('./Classes/appError.js');
const { errorfunction } = require('./Controllers/errorHandleController.js');

const limiter = rateLimit({
      max: 10,
      windowMs: 60 * 60 * 1000,
      message: 'Too many Request from this IP! Please try again in an hour!'
});
app.use('/api', limiter);

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
