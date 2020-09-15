const express = require('express');
const reviewController = require('../Controllers/ReviewController');
const authController = require('../Controllers/authController');
const ReviewRouter = express.Router({ mergeParams: true });

ReviewRouter.use(authController.protect);

ReviewRouter
    .route('/')
    .get(reviewController.get_all_review)
    .post(authController.restrict('user'),
        reviewController.tourReview,
        reviewController.create_review);

ReviewRouter.use(authController.restrict('admin', 'user'));
ReviewRouter
    .route('/:id')
    .get(reviewController.getOne_review)
    .delete(reviewController.deleteReview)
    .put(reviewController.update_review);


    
module.exports = ReviewRouter;