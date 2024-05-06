const mongoose = require("mongoose");

const { Schema } = mongoose;

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

packageSchema.virtual("totalAmount").get(function () {
  let sum = 0;
  if (this.tours){
    for (const tour of this.tours) {
      sum += tour.price;
    }
  }
  return sum;
  // return this.tours.aggregate({
  //   $group: { _id: null, totalAmount: { $sum: "$price" } },
  // });
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
