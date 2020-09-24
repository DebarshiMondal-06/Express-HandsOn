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
        res
            .status(200)
            .set(
                'Content-Security-Policy',
                "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
            )
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
        res.status(200).render('login', {
            title: 'Login'
        })
    } catch (error) {
        return next(new AppError(`${error}`));
    }
}