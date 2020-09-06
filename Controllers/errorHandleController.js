const AppError = require("../appError");

// const dbError = (err) => {
//       const message = `Invalid Id : ${err.value}`;
//       return new AppError(message, 404);
// };


const getDevError = (error, res) => {
      res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            stack: error.stack
      });
}

const getProdError = (error, res) => {
      res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
      });
}


module.exports.errorfunction = (error, req, res, next) => {
      error.status = error.status || 'error';
      error.statusCode = error.statusCode || 500;

      if (process.env.NODE_ENV === "development") {
            getDevError(error, res);
      }
      else if (process.env.NODE_ENV === "production") {
            getProdError(error, res);
      }
}

