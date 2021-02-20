const User = require("../model/auth-model");
const ServiceRecord = require("../model/service-record-model");
const loginHelper = require("../helper/login-helper");
const Appointment = require("../model/apointment-model");
const AppointmentType = require("../enum/appointment");
const UserType = require("../enum/userType");

exports.loginServiceAgent = async (req, res) => {
  const data = req.body;

  try {
    const { user, token } = await loginHelper.userLogin(data, User);
    if (user.role != UserType.SERVICE_AGENT) {
      return res.status(404).send({ error: "user not find" });
    }
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.createServiceRecord = async (req, res) => {
  const {
    serviceCategory,
    customerId,
    vehicleId,
    appointmentId,
    servicePrice,
  } = req.body;

  try {
    const serviceRecord = new ServiceRecord({
      serviceCategory,
      customerId,
      vehicleId,
      appointmentId,
      servicePrice,
    });

    const newserviceRecord = await serviceRecord.save();
    res.send({
      message: "Service Record create successfully",
      newserviceRecord,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.searchServiceRecords = async (req, res) => {
  const match = {};
  const { customerId, vehicleId } = req.query;

  if (customerId) {
    match.customerId = customerId;
  }

  if (vehicleId) {
    match.vehicleId = vehicleId;
  }

  console.log(match);

  try {
    const searchResult = await ServiceRecord.find(match);
    res.send(searchResult);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateServiceRecord = async (req, res) => {
  const data = req.body;

  try {
    const updateServiceRecord = await ServiceRecord.findByIdAndUpdate(
      data.id,
      data,
      { runValidators: true, new: true }
    );

    res.send(updateServiceRecord);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteServiceRecords = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedRecord = await ServiceRecord.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).send({ error: "No record found" });
    }
    res.send({ message: "Delete records successfully", delete: deletedRecord });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.send({ appointments });
  } catch (error) {
    res.status(500).send({ error: error.messgae });
  }
};

exports.approveOrRejectAppointment = async (req, res) => {
  let { status } = req.body;
  const id = req.params.id;

  if(status){
    status = AppointmentType.APPROVE
  }else{
    status = AppointmentType.REJECT
  }

  try {
      const appointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { runValidators: true, new: true }
      );

      return res.send({ message: "Reject appointment", appointment });
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.searchAppointment = async (req, res) => {
  try {
    const searchAppointment = await Appointment.find().populate(
      "customerId vehicleId"
    );
    res.send({ appointments: searchAppointment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
