const express = require('express');
const reviewController = require('../Controllers/ReviewController');
const authController = require('../Controllers/authController');
const ReviewRouter = express.Router({ mergeParams: true });


ReviewRouter.
    route('/')
    .get(reviewController.get_all_review)
    .post(authController.protect, reviewController.create_review);


module.exports = ReviewRouter;