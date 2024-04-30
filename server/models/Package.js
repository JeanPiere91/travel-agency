const mongouse = require("mongouse");

const { Schema } = mongouse;

const packageSchema = new Schema({
  generalTitle: {
    type: String,
    required: true,
    trim: true,
  },
  generalDescription: {
    type: String,
  },
  image: {
    type: String,
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
  tours: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tour",
    },
  ],
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
