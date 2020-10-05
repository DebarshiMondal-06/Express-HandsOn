const Tour = require('../models/Tour_models');
const AppError = require('../Classes/appError');
const factory = require('../Controllers/handlerFunction');
const multer = require('multer');
const sharp = require('sharp');


const multerStorage = multer.memoryStorage();  // Buffer.........
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new AppError('Not an image! Please upload only images', 501), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadTourImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);

exports.ressizeTourImages = async (req, res, next) => {
    // console.log(req.files);
    if (!req.files.images || !req.files.imageCover) return next();
    try {

        req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/tours/${req.body.imageCover}`);

        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (elemen, index) => {
                const filename = `tour-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;
               
                await sharp(elemen.buffer)
                    .resize(400, 400)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/img/tours/${filename}`);
                req.body.images.push(filename);
                // console.log(req.body);
            })
        );

        next();
    } catch (error) {
        return next(new AppError(`Reszing error image - ${error}`, 501));
    }
}




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
