const Tour = require('../models/Tour_models');
const AppError = require('../Classes/appError');

exports.getOverview = async (req, res, next) => {
    try {
        const tour = await Tour.find();
        res.status(200).render('overview', {
            title: 'All Tours',
            result: tour
        });
    } catch (error) {
        return next(new AppError(`${error}`));
    }
}

exports.getTours = (req, res) => {
    res.status(200).render('tour', {
        title: 'The Himalyan'
    });
}
