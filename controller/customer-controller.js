const User = require("../model/auth-model");
const Vehicle = require("../model/vehicle-model");
const UserType = require("../enum/userType");
const ServiceRecords = require("../model/service-record-model");
const Appointment = require("../model/apointment-model");

const signupHelper = require("../helper/signup-helper");
const loginHelper = require("../helper/login-helper");
const customerHelper = require("../helper/customer-helper");

exports.registerCustomer = async (req, res) => {
  const { email, password, contactNumber, userName } = req.body;

  try {
    const customer = await signupHelper.userSignUp(
      email,
      password,
      contactNumber,
      userName,
      UserType.CUSTOMER
    );

    res.send({ message: "customer created successfully", customer });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginCustomer = async (req, res) => {
  const data = req.body;

  try {
    const { user, token } = await loginHelper.userLogin(data, User);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addVehicle = async (req, res) => {
  const { carNumber, carYear, carColor } = req.body;

  try {
    const vehicle = new Vehicle({
      carNumber,
      carColor,
      carYear,
    });

    const newVehicle = await vehicle.save();
    res.send({ message: "New vehicle created", newVehicle });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editVehicle = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send({ message: "updated vehicle successfully", updatedVehicle });
  } catch (error) {
    return res.status(500).send(error.message);
  }

  const { updatedVehicle, error } = customerHelper.editVehicleHelper(id, data);
};

exports.deleteVehicle = async (req, res) => {
  const id = req.params.id;

  try {
    const { error } = await customerHelper.deleteVehicleHelper(id);
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send({ message: "Deleted vehicle successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.viewServiceRecords = async (req, res) => {
  try {
    const serviceRecords = await req.customer
      .populate("records")
      .execPopulate();
    res.send(serviceRecords);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.makeAppointment = async (req, res) => {
  const { date, serviceCategory } = req.body;

  try {
    const appointment = new Appointment({
      date,
      serviceCategory,
      customerId: req.customer,
      vehicleId: req.vehicle,
    });

    const newAppointment = await appointment.save();
    res
      .status(201)
      .send({
        message: "New Appointment created successfully",
        newAppointment,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
