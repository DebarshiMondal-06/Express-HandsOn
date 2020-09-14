const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./User_models');

// Building a Tour Schema ***************************
const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //Custom validator........................
        unique: true,
        trim: true
    },
    slug: String,
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a Price']
    },
    discountPrice: {
        type: Number,
        validate: { // Custom validation .....................................
            validator: function (val) {
                return val < this.price; //this only points to newly created doc for New Document not on update...................
            },
            message: 'Discount Price ({VALUE}) must be lesser than Original Price.....'
        },
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a Group Size"]
    },
    difficulty: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a Summary"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must be have an Image']
    },
    images: [
        String
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],
    secretKey: {
        type: Boolean,
        default: false
    },
    startLocation: {
        // GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [ // Embedded Document............'[]'
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    ],
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
});


// Document Middleware..........for .save() and .Create()...........................
TourSchema.pre('save', function (next) { // 'save-pre hooks always run before exectution and method save is for post query...........'
    this.slug = slugify(this.name, {
        lower: true
    });
    next();
    if (this.price > this.discountPrice) {
        return true;
    }
    else {
        return false;
    }

});

//QUERY Middleware .............for .find() and .update()  .........................
TourSchema.pre(/^find/, function (next) {  // 'pre' always run before a query exeecute.............
    this.find({ secretKey: { $ne: true } });
    this.start = new Date();
    next();
});

TourSchema.post(/^find/, function (docs, next) { // 'post' always run after a query exeecute.............
    console.log(`the time taken to execute query is ${Date.now() - this.start} milliseconds`);
    next();
});

// Aggregrate Middleware................ for .aggreate middleware ..............................
TourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({
        $match: {
            secretKey: { $ne: true }
        }
    });
    next();
});


// Advanced Mongoose modelling.................. 

// //Adding Guides(user) into Tours Embedding.............
// TourSchema.pre('save', async function (next) {
//     const guidesPromise = this.guides.map(async (id) => {
//         return await User.findById(id);  //return array of promises.......................
//     });
//     // console.log(await Promise.all(guidesPromise));
//     this.guides = await Promise.all(guidesPromise); // combines all array of promise all at same time...............
//     // this.guides = guidesPromise;
//     next();
// });


TourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: '-__v'
    });
    next();
});

// Virtual Populate........................
TourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'forTour',
    localField: '_id'
});

TourSchema.set('toObject', { virtuals: true });
TourSchema.set('toJSON', { virtuals: true });

const Tour = mongoose.model('Tour', TourSchema);
// Ends here Schema **************************

module.exports = Tour;
