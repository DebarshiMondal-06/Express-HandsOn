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

exports.getTours = async (req, res, next) => {
    try {
        const gettour = await Tour.findOne({ slug: req.params.id }).populate({
            path: 'reviews',
            fields: 'review rating whichUser'
        });

        if (!gettour) {
            console.log(req);
            return next(new AppError(`Tour not exist for this Routes`, 404));
        }

        res
            .status(200)
            .render('tour', {
                title: `${gettour.name} Tour`,
                results: gettour
            });
    } catch (error) {
        return next(new AppError(`${error}`));
    }
}


exports.loginpage = async (req, res, next) => {
    try {
        res
            .status(200)
            .render('login', {
                title: 'Login'
            })
    } catch (error) {
        return next(new AppError(`${error}`));
    }
}