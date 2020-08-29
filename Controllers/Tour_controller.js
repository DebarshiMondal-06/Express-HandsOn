const Tour = require('./../models/Tour_models');




exports.get_all_tours = (req, res) => {
    res.status(200).json({
        status: 'success'
    });
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

exports.get_tour = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
}

exports.delete_a_tour = (req, res) => {
    res.status(204).json({
        message: "Deleted"
    });
}
