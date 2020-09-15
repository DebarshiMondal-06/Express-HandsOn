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

exports.get_all_review = async (req, res, next) => {
    try {
        let filter = {};
        if (req.params.tourId) filter = { forTour: req.params.tourId };
        const createNew = await Review.find(filter);
        res.status(200).json({
            status: 'Success',
            result: createNew
        });
    } catch (error) {
        return next(new AppError(`${error}`, 500));
    }
}

exports.update_review = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);