const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const validator = require('validation')

const vehicle = new Schema({
  carNumber: {
    type: String,
    required: [true, "Car number is required"],
  },
  modelCode:{
    type:String
  },
  carColor: String,
  carYear: String,
});

module.exports = mongoose.model("vehicle", vehicle);
