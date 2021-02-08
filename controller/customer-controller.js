const User = require("../model/auth-model");
const Vehicle = require("../model/vehicle-model");
const Appointment = require("../model/apointment-model");
const ServiceRecord = require("../model/service-record-model");
const signupHelper = require("../helper/signup-helper");
const loginHelper = require("../helper/login-helper");
const customerHelper = require("../helper/customer-helper");

const UserType = require("../enum/userType");
const AppointmentType = require('../enum/appointment')

exports.registerCustomer = async (req, res) => {
  const { email, password, contactNumber, userName } = req.body;

  try {
    const {user,error} = await signupHelper.userSignUp(
      email,
      password,
      contactNumber,
      userName,
      UserType.CUSTOMER
    );

    if(error){
      return res.status(422).send({error})
    }

    res.send({ message: "customer created successfully", customer:user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginCustomer = async (req, res) => {
  const data = req.body;

  try {
    const { user, token } = await loginHelper.userLogin(data, User);
    if(user.role != UserType.CUSTOMER){
      return res.status(404).send({error:"Can not find customer"})
    }
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addVehicle = async (req, res) => {
  const { carNumber, carYear, carColor,owner } = req.body;

  try {
    const vehicle = new Vehicle({
      carNumber,
      carColor,
      carYear,
      owner,
    });

    const newVehicle = await vehicle.save();
    res.send({ message: "New vehicle created", newVehicle });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editVehicle = async (req, res) => {
  const data = req.body;

  try {
    const { updatedVehicle, error } = await customerHelper.editVehicleHelper(data.id, data);
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send({ message: "updated vehicle successfully", vehicle:updatedVehicle });
  } catch (error) {
    return res.status(500).send(error.message);
  }

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
    const serviceRecords = await ServiceRecord.find({ customerId: req.user });
    res.send(serviceRecords);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
    res.status(201).send({
      message: "New Appointment created successfully",
      appointment:newAppointment,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.paymoney = async(req,res)=>{
  const id = req.params.id
  try {
    const appointment = await Appointment.findById(id)
    if(appointment && appointment.appointmentStatus != AppointmentType.APPROVE){
      return res.send(422).send({error:'Appointment is not accept yet'})
    }

    res.send(appointment)
    
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}