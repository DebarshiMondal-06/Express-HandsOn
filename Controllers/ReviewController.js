const Review = require('../models/Review_model');
const AppError = require('../Classes/appError');
const factoryDelete = require('../Controllers/handlerFunction');

exports.create_review = async (req, res, next) => {
    try {
        if (!req.body.forTour) req.body.forTour = req.params.tourId;
        if (!req.body.whichUser) req.body.whichUser = req.user.id;

        const createNew = await Review.create(req.body);
        res.status(200).json({
            status: 'Success',
            result: createNew
        });
    } catch (error) {
        return next(new AppError(`${error}`, 500));
    }
}

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

exports.deleteReview = factoryDelete.deleteOne(Review);