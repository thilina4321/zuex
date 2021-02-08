const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const validator = require('validation')

const vehicle = new Schema({

  owner:{type:Schema.Types.ObjectId, ref:'auth'
  ,required:[true, 'owner is required']
},
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
