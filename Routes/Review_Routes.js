const express = require('express');
const reviewController = require('../Controllers/ReviewController');
const ReviewRouter = express.Router();


ReviewRouter.
    route('/')
    .get(reviewController.get_all_review)
    .post(reviewController.create_review);


module.exports = ReviewRouter;