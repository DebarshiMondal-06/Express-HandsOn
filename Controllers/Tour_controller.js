const Tour = require('./../models/Tour_models');
const { deleteMany } = require('./../models/Tour_models');
const { query } = require('express');

exports.get_all_tours = async (req, res) => {
    try {
        // Building Query ..........................
        // 1) Filtering......
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);
        // console.log(queryObj);


        // 2) Advanced Filtering ....................
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (matc) => `$${matc}`);
        // b for exact value and g for multiple replace value............
        // replace first param replacer and second param replace value....


        let query = Tour.find(JSON.parse(queryStr)); // default express filtering............


        // 2) Sorting ....................
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            query = query.sort(sortBy);
        }
        else {
            query = query.sort('-createdAt');
        }

        // 3) Limiting fields ...........................
        if (req.query.fields) {
            const sortBy = req.query.fields.split(',').join(' ');
            // console.log(sortBy);
            query = query.select(sortBy);
        }
        else {
            query = query.select('-__v');
        }




        // Executing Query ............
        const all_tour = await query;
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
