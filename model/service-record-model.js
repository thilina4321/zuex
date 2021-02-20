const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Payment = require('../enum/payment')

// const validator = require('validation')

const serviceRecord = new Schema(
  {
    serviceCategory: { 
      type: String,
      required: [true, "Service Category needed"],
    },
    appointmentId:{type:Schema.Types.ObjectId, ref:"appointment"},
    customerId: { type: Schema.Types.ObjectId, ref: "user" },
    vehicleId: { type: Schema.Types.ObjectId, ref: "vehicle" },
    servicePrice:{type:Number, required:true},
    paid:{type:Number, default:0},
    paymentStatus:{type:String, enum:Payment, default:Payment.NOT_PAID},
  }
);




module.exports = mongoose.model("serviceRecord", serviceRecord);
