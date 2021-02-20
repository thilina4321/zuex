const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppointmentType = require('../enum/appointment')

const appointment = new Schema({
  sheduledDate: { type: String },
  vehicleId: { type: Schema.Types.ObjectId, ref: "vehicle" },
  customerId: { type: Schema.Types.ObjectId, ref: "user" },
  serviceCategory: {
    type: String,
    required: [true, "service category required"],
  },
  status:{
    type:String,
    enum:AppointmentType,
    default:AppointmentType.PENDING
  },
  date:{
    type:Date
  }
});
//new Date("2020-01-12").toString().slice(0,15)

module.exports = mongoose.model("appointment", appointment);
