const mongoose = require("mongoose");

const { Schema } = mongoose;

// Defiens a package document that contains generalTitle, generalDescription, image link, list of tours (ID)
const packageSchema = new Schema(
  {
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
    tours: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Defines virtual properties totalAmount and totalDays that calculates sum of all tours price and days.
packageSchema.virtual("totalAmount").get(function () {
  let sum = 0;
  if (this.tours){
    for (const tour of this.tours) {
      sum += tour.price;
    }
  }
  return sum;
});
packageSchema.virtual("totalDays").get(function () {
  let days = 0;
  if (this.tours){
    for (const tour of this.tours) {
      days += tour.days;
    }
  }
  return days;
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
