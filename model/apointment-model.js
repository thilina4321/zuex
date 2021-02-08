const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppointmentType = require('../enum/appointment')
// const validator = require('validation')

const appointment = new Schema({
  date: { type: String },
  vehicleId: { type: Schema.Types.ObjectId, ref: "vehicle" },
  customerId: { type: Schema.Types.ObjectId, ref: "user" },
  serviceCategory: {
    type: String,
    required: [true, "service category required"],
  },
  appointmentStatus:{
    type:String,
    enum:AppointmentType,
    default:AppointmentType.PENDING
  },
  price:{
    type:Number,
    
  }
});

module.exports = mongoose.model("appointment", appointment);
