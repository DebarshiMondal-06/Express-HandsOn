const Tour = require('../models/Tour_models');
const AppError = require('../Classes/appError');
// const APIFeatures = require('../Classes/ClassAPIFeatures');
const factory = require('../Controllers/handlerFunction');

exports.best_5_middleware = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = "-ratingAverage";
    req.query.fields = 'name,price,ratingAverage,difficulty';
    next();
};


exports.get_all_tours = factory.getall(Tour);
exports.get_tour = factory.getOne(Tour, { path: 'reviews' });
exports.create_tours = factory.createOne(Tour);
exports.update_tour = factory.updateOne(Tour);
exports.delete_a_tour = factory.deleteOne(Tour);


exports.get_tour_stats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: {
                    ratingAverage: { $gt: 4.4 }
                    // secretKey: { $ne: true }
                }
            },
            {
                $group: {
                    _id: '$difficulty',
                    numTours: { $sum: 1 },
                    numRating: { $avg: '$ratingQuantity' },
                    avgRating: { $avg: '$ratingAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: -1 }
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                result: stats
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        });
    }
}

exports.get_monthly_plan = async (req, res) => {
    try {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    toursName: { $push: '$name' },
                    avgPriceofMonth: { $avg: '$price' }
                }
            },
            {
                $addFields: {
                    month: '$_id',
                    year: `${year}`,
                    // toursName: '$name'
                }
            },
            {
                $sort: { avgPriceofMonth: -1 }
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                result: plan
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        });
    }
}
