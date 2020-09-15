const express = require('express');
const reviewController = require('../Controllers/ReviewController');
const authController = require('../Controllers/authController');
const ReviewRouter = express.Router({ mergeParams: true });


ReviewRouter
    .route('/')
    .get(reviewController.get_all_review)
    .post(authController.protect, reviewController.tourReview, reviewController.create_review);

ReviewRouter
    .route('/:id')
    .delete(reviewController.deleteReview)
    .put(reviewController.update_review);

module.exports = ReviewRouter;