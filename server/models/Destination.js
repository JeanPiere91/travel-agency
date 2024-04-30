const mongouse = require("mongouse");

const { Schema } = mongouse;

const destinationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
