const Tour = require('./../models/Tour_models');
const { stat } = require('fs');
const AppError = require('../appError');

exports.best_5_middleware = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = "-ratingAverage";
    req.query.fields = 'name,price,ratingAverage,difficulty';
    next();
};


class APIFeatures {
    constructor(query, queryString) {
        this.queryy = query;
        this.queryString = queryString;

    } // mongoose query "Tour" and express querystring from routes...


    filter() {
        const queryObj = { ...this.queryString }; // This Takeout all the keyvalue pair of document and {} this assign keyvalue to new object.

        const excludeFields = ['page', 'sort', 'limit', 'fields', 'specefic']; // Deleting all the extra fields except keyvalue pair
        excludeFields.forEach((el) => delete queryObj[el]);

        this.queryy = this.queryy.find(queryObj);

        return this; // this here refers to Class name.........

    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy);
            this.queryy = this.queryy.sort(sortBy)
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const sortBy = this.queryString.fields.split(',').join(' ');
            this.queryy = this.queryy.select(sortBy);
        }
        else {
            this.queryy = this.queryy.select('-__v -createdAt');
        }
        return this;
    }

    limits() {
        if (this.queryString.limit) {
            const limit_data = this.queryString.limit * 1 || 100;
            this.queryy = this.queryy.limit(limit_data);
        }
        return this;
    }

}


exports.get_all_tours = async (req, res) => {
    try {

        // 2) Advanced Filtering ........................
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (matc) => `$${matc}`);
        // // b for exact value and g for multiple replace value............
        // // replace first param replacer and second param replace value....

        const features = new APIFeatures(Tour, req.query)
            .filter()
            .sort()
            .limitFields()
            .limits();

        // Executing Query ..............................
        const all_tour = await features.queryy;

        res.status(200).json({
            status: 'success',
            size: all_tour.length,
            data: {
                result: all_tour
            }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.create_tours = async (req, res) => {
    try {
        const new_Tour = await Tour.create(req.body);
        res.status(200).json({
            status: 'Success...',
            data: {
                tour: new_Tour
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                status: 'Fail',
                value: error.keyValue.name,
                message: "Duplicate entry"
            });
        }
        if (error.errors) {
            res.status(400).json({
                status: 'Validation Error',
                message: Object.values(error.errors).map((el) => (el.message)).join(" , "),
            });
        }
        else {
            res.status(400).json({
                status: 'Fail',
                error: error
            });
        }
    }
}

exports.get_tour = async (req, res, next) => {
    try {
        const single_tour = await Tour.findById(req.params.id);

        if (!single_tour) {
            return next(new AppError("Tour ID not found!", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                result: single_tour
            }
        });

    } catch (error) {
        if (error.kind === "ObjectId") {
            res.status(400).json({
                status: 'Fail',
                message: `Invalid Id: ${error.value}`
            });
        }
    }
}

exports.update_tour = async (req, res, next) => {
    try {
        const update = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!update) {
            return next(new AppError("Tour ID not found!", 404));
        }
        res.status(200).json({
            status: "Updated",
            data: {
                result: update
            }
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            res.status(400).json({
                status: 'Fail',
                message: `Invalid Id: ${error.value}`
            });
        }
    }
}



exports.delete_a_tour = async (req, res, next) => {
    try {
        const tour_delete = await Tour.findByIdAndDelete(req.params.id);
        if (!tour_delete) {
            return next(new AppError("Tour ID not found!", 404));
        }
        res.status(200).json({
            status: "deleted",
            message: "No Content"
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            res.status(400).json({
                status: 'Fail',
                message: `Invalid Id: ${error.value}`
            });
        }
    }
}



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
