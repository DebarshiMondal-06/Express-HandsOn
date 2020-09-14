const AppError = require('../Classes/appError');

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