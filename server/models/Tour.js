const mongoose = require("mongoose");

const { Schema } = mongoose;

const tourSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  days:{
    type: Number,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  destination:{
    type: Schema.Types.ObjectId,
    ref: "Destination",
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
