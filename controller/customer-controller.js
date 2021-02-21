const User = require("../model/auth-model");
const Vehicle = require("../model/vehicle-model");
const Appointment = require("../model/apointment-model");
const ServiceRecord = require("../model/service-record-model");
const signupHelper = require("../helper/signup-helper");
const loginHelper = require("../helper/login-helper");
const customerHelper = require("../helper/customer-helper");
const PaymentStatus = require('../enum/payment')
const UserType = require("../enum/userType");

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
    const { user, token, error } = await loginHelper.userLogin(data);
    
    if(error){
      return res.status(422).send({error})
    }
    if(user.role != UserType.CUSTOMER){
      return res.status(404).send({error:'user not find'})
    }
    
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({error:error.message});
  }
};

exports.addVehicle = async (req, res) => {
  const { carNumber, carYear, carColor } = req.body;

  try {
    const vehicle = new Vehicle({
      carNumber,
      carColor,
      carYear,
      owner:req.user,
    });

    const newVehicle = await vehicle.save();
    res.send({ message: "New vehicle created", newVehicle });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editVehicle = async (req, res) => {
  const data = req.body;
  const id = req.params.id

  try {
    const { updatedVehicle, error } = await customerHelper.editVehicleHelper(id, data);
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
      if(error === 'No customer found'){
        return res.status(404).send({error});

      }
      return res.status(500).send({error});
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
  const { date, serviceCategory,vehicleId } = req.body;

  try {
    const appointment = new Appointment({
      date:new Date(new Date(date)).getTime(),
      serviceCategory,
      customerId: req.user,
      vehicleId
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

exports.availablePayments = async(req,res)=>{
  try {
    const available = await ServiceRecord.find({paymentStatus:PaymentStatus.NOT_PAID})
    res.send({payments:available})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}


exports.paymoney = async(req,res)=>{
  const {id, money} = req.body
  try {
    const payment = await ServiceRecord.findByIdAndUpdate(id, {paid:money,
      paymentStatus:PaymentStatus.PAID
    })

    res.send({payment})
    
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}