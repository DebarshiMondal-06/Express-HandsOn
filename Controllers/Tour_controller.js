const Tour = require('./../models/Tour_models');

exports.get_all_tours = async (req, res) => {
    try {
        console.log(req.query);

        const all_tour = await Tour.find(req.query); // default express filtering............

        // const all_tour = await Tour.find().where('duration').gt(5); // mongoose filtering method..............
        res.status(200).json({
            status: 'success',
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
