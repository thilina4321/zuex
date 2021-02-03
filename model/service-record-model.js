const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const validator = require('validation')

const serviceRecord = new Schema(
  {
    serviceCategory: { 
      type: String,
      required: [true, "Service Category needed"],
    },
    customerId: { type: Schema.Types.ObjectId, ref: "user" },
    vehicleId: { type: Schema.Types.ObjectId, ref: "vehicle" },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("serviceRecords", serviceRecord);
