const mongoose = require('mongoose');


// Building a Tour Schema ***************************
const TourSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
            unique: true,
            trim: true
      },
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
      priceDiscount: Number,
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
      startDates: [Date]
});
const Tour = mongoose.model('Tour', TourSchema);
// Ends here Schema **************************

module.exports = Tour;
