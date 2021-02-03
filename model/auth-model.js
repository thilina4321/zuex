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
    unique: [true, "Email already taken"],
    validate(value) {
      if (!validator.isEmail(value)) {
        new Error("Please Enter valid Email");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password required"],
    validate(value) {
      if (value.length < 5) {
        new Error("Password should contain at least 5 characters");
      }
    },
  },
  userName: { type: String, required: [true, "User name required"] },
  contactNumber: { type: String },
  role: {
    type: String,
    enum: UserType,
  },
  tokens: [{ token: String }],
});

user.statics.loginWithEmailAndPassword = async (credential) => {
  const user = await User.findOne({ email: credential.email });
  if (!user) {
    throw new Error("Loging failed");
  }

  const compare = await bcrypt.compare(credential.password, user.password);
  if (!compare) {
    throw new Error("Invalid password");
  }

  return user;
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
    const token = jwt.sign({ id: user._id }, "thisisthesecretkey", {
      expiresIn: "1h",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (error) {
    new Error(error.message)
  }
};

const User = mongoose.model("customer", user);

module.exports = User;
