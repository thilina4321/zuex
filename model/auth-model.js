const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const UserType = require("../enum/userType");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please Enter valid Email");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password required"],
    
  },
  userName: { type: String, required: [true, "User name required"],
  validate(value){
    if(value.length != 5){
      throw new Error("Please character");
    }
  }
 },
  contactNumber: { type: String },
  role: {
    type: String,
    enum: UserType,
  },
  tokens: [{ token: String }],
});


user.virtual('apointments', {
  ref:'appointment',
  localField:'_id',
  foreignField:'customerId'
})

user.statics.loginWithEmailAndPassword = async (credential) => {
  const user = await User.findOne({ email: credential.email });
  if (!user) {
    return {error:'Invalid email address'}
  }

  const compare = await bcrypt.compare(credential.password, user.password);
  if (!compare) {
    return {error:'Invalid password'}
  }

  return {user};
};

user.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

user.methods.generateToken = async function () {
  const user = this;

  try {
    const token = jwt.sign({ id: user._id }, process.env.SECURE_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return {token};
  } catch (error) {
    return {error:error.message}
  }
};

const User = mongoose.model("user", user);

module.exports = User;
