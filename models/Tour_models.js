const mongoose = require('mongoose');


// Building a Tour Schema ***************************
const TourSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
            unique: true
      },
      rating: {
            type: Number,
            default: 4.5
      },
      price: {
            type: Number,
            required: [true, 'A tour must have a Price']
      }
});
const Tour = mongoose.model('Tour', TourSchema);
// Ends here Schema **************************

module.exports = Tour;
