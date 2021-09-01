const mongoose = require('mongoose');
const Tour = require('./Tour_models');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review cannot be blank!'],
        maxlength: 255
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Review must be a rating']
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

// reviewSchema.index({ forTour: 1, whichUser: 1 }, { unique: true });

reviewSchema.pre('find', function (next) {
    this.populate({
        path: 'whichUser',
        select: 'name role'
    });
    next();
});


reviewSchema.statics.calAverageRating = async function (tourId) {
    const stats = await this.aggregate([   // this refers to current model 
        {
            $match: { forTour: tourId }
        },
        {
            $group: {
                _id: '$forTour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    // console.log(stats);
    await Tour.findByIdAndUpdate(tourId, {
        ratingQuantity: stats[0].nRating,
        ratingAverage: stats[0].avgRating
    });

}

reviewSchema.post('save', function () {
    //this refers to current saved review...............
    //constructor refers to the current model.............
    this.constructor.calAverageRating(this.forTour);
});






const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;