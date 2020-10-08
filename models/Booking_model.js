const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingtour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must have a tour']
  },
  bookingUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a Price']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('bookingUser').populate({
    path: 'bookingtour',
    select: 'name'
  });
});



const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;