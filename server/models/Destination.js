const mongoose = require("mongoose");
const { Schema } = mongoose;
// Defnes a destination document, that contains a name of the destination.
const destinationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
