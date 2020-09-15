const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review cannot be blank!'],
        maxlength: 255
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    forTour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must be from a specefic Tour']
    },
    whichUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

reviewSchema.pre('find', function (next) {
    this.populate({
        path: 'whichUser',
        select: 'name role'
    });
    next();
});


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;