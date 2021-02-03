const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const validator = require('validation')

const appointment = new Schema({
  date: { type: String },
  vehicleId: { type: Schema.Types.ObjectId, ref: "vehicle" },
  customerId: { type: Schema.Types.ObjectId, ref: "user" },
  serviceCategory: {
    type: String,
    required: [true, "service category required"],
  },
});

module.exports = mongoose.model("appointment", appointment);
