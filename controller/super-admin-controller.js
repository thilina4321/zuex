const User = require("../model/auth-model");
const UserType = require("../enum/userType");
const Vehicle = require("../model/vehicle-model");
const loginHelper = require("../helper/login-helper");
const signupHelper = require("../helper/signup-helper");

exports.createSuperAdmin = async (req, res) => {
  const { email, password, contactNumber, userName } = req.body;
  try {
    const superAdmin = await signupHelper.userSignUp(
      email,
      password,
      contactNumber,
      userName,
      UserType.SUPER_ADMIN
    );
    res.send({
      message: "Signed up successfully you can login now!!",
      superAdmin
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.loginSuperAdmin = async (req, res) => {
  const data = req.body;

  try {
    const { user, token } = await loginHelper.userLogin(data, User);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createServiceAgent = async (req, res) => {
  const { email, password, contactNumber, userName } = req.body;
  try {
    const serviceAgent = signupHelper.userSignUp(
      email,
      password,
      contactNumber,
      userName,
      UserType.SERVICE_AGENT
    );
    res.sand({ message: "Create Service agent successfully", serviceAgent });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.customers = async (req, res) => {
  try {
    const customers = await User.find({ role: UserType.CUSTOMER });
    res.send(customers);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.vehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
