const mongoose = require('mongoose');

const { Schema } = mongoose;
// Defines a booking document that contains purchaseDate, number of peoples and package list
const bookingSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  people:{
    type: Number,
    min: 1,
    default: 1,
  },
  packages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Package'
    }
  ]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
