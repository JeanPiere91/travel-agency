const mongouse = require("mongouse");

const { Schema } = mongouse;

const tourSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
