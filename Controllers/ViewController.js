const Tour = require('../models/Tour_models');
const AppError = require('../Classes/appError');
const bookingModel = require('../models/Booking_model');



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


exports.loginpage = (req, res, next) => {
    if (req.userexist) res.redirect('/');
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

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: "Account"
    });
}

exports.logoutpage = (req, res) => {
    res.status(200).render('logout', {
        title: 'logout'
    });
}

exports.getMyTours = async (req, res, next) => {
    try {
        // 1) Find all bokkings
        const bookingsMy = await bookingModel.find({ bookingUser: req.user.id });

        // 2) Find tours with the returned IDs
        const tourIDs = bookingsMy.map(el => el.bookingtour);
        const tours = await Tour.find({ _id: { $in: tourIDs } });
        res.status(200).render('overview', {
            title: 'My-Tours',
            result: tours
        });
    } catch (error) {
        return next(new AppError(`${error}`, 501));
    }
}










