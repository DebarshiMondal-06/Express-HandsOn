const Review = require('../models/Review_model');
const AppError = require('../Classes/appError');
const factory = require('../Controllers/handlerFunction');

// if (!req.body.forTour) req.body.forTour = req.params.tourId;
// if (!req.body.whichUser) req.body.whichUser = req.user.id;
exports.tourReview = (req, res, next) => {
    if (!req.body.forTour) req.body.forTour = req.params.tourId;
    if (!req.body.whichUser) req.body.whichUser = req.user.id;
    next();
}

exports.create_review = factory.createOne(Review);
exports.getOne_review = factory.getOne(Review);
exports.update_review = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.get_all_review = factory.getall(Review);