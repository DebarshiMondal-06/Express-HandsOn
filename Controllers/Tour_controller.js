const Tour = require('./../models/Tour_models');

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

            this.queryy = this.queryy.sort(sortBy);
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
        res.status(400).json({
            status: 'Fail',
            message: error
        })
    }
}

exports.get_tour = async (req, res) => {
    try {
        const single_tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                result: single_tour
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        });
    }
}

exports.update_tour = async (req, res) => {
    try {
        const update = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({
            status: "Updated",
            data: {
                result: update
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        });
    }
}



exports.delete_a_tour = async (req, res) => {
    try {
        const tour_delete = await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "deleted",
            message: "No Content"
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        });
    }
}
