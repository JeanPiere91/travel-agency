const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  // amount:{
  //   type: Number,
  //   required: true,
  //   min: 0.99,
  // },
  packages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Package'
    }
  ]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
