const Review = require('../models/Review_model');
const AppError = require('../Classes/appError');

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
        const createNew = await Review.find();
        res.status(200).json({
            status: 'Success',
            result: createNew
        });
    } catch (error) {
        return next(new AppError(`${error}`, 500));
    }
}