const AppError = require('../Classes/appError');
const APIFeatures = require('../Classes/ClassAPIFeatures');


exports.createOne = (Model) => {
    return async (req, res, next) => {
        try {
            const new_Tour = await Model.create(req.body);
            res.status(200).json({
                status: 'Success...',
                data: {
                    tour: new_Tour
                }
            });
        }
        catch (error) {
            if (error.code === 11000) {
                return next(new AppError(`Duplicate Entry ${error.keyValue.name}`, 500));
            }
            if (error.errors) {
                res.status(400).json({
                    status: 'Validation Error',
                    message: Object.values(error.errors).map((el) => (el.message)).join(" , "),
                });
            }
            else {
                return next(new AppError(`${error}`, 500));
                // res.status(500).json({
                //     status: 'Success...',
                //     data: {
                //         error
                //     }
                // });
            }
        }
    }
}

exports.deleteOne = (Model) => {
    return async (req, res, next) => {
        try {
            const tour_delete = await Model.findByIdAndDelete(req.params.id);
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
}

exports.updateOne = (Model) => {
    return async (req, res, next) => {
        try {
            const update = await Model.findByIdAndUpdate(req.params.id, req.body, {
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
}

exports.getOne = (Model, options) => {
    return async (req, res, next) => {
        try {
            let query = Model.findById(req.params.id);
            if (options) query = query.populate(options);
            const finalquery = await query;
            if (!finalquery) {
                return next(new AppError("Tour ID not found!", 404));
            }
            res.status(200).json({
                status: "success",
                data: {
                    result: finalquery
                }
            });
        } catch (error) {
            if (error.kind === "ObjectId") {
                return next(new AppError(`Invalid Id: ${error.value} doesn't exist!`, 404));
            }
        }
    }
}

exports.getall = (Model) => {
    return async (req, res, next) => {
        try {
            const features = new APIFeatures(Model, req.query)
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
        catch (error) {
            return next(new AppError(`${error}`, 404));
        }
    }
}