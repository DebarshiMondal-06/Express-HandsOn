const express = require('express');
const app = express();

const Tour_Router = require('./Routes/Tour_Routes');
const User_Router = require('./Routes/User_Routes');
app.use(express.json());


// Routes Mounting .................................
app.use('/api/v1/tours', Tour_Router);
app.use('/api/v1/users', User_Router);

// Error for no correct URL...................................
app.all('*', (req, res, next) => {
      // res.status(404).json({
      //       Status: "Fail",
      //       body: `No such ${req.OriginalUrl} request to proceed!`
      // })

      const err = new Error(`No such ${req.OriginalUrl} request to proceed!`);
      err.status = 'fail';
      err.statusCode = 404;

      next(err); //err here simpify assumes an error and sends it to global error middleware.........

});


// Global error middleware........................
app.use((error, req, res, next) => {
      error.status = error.status || 'error';
      error.statusCode = error.statusCode || 500;

      res.status(error.statusCode).json({
            status: error.status,
            message: error.message
      });
});


module.exports = app;
