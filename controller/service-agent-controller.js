const User = require("../model/auth-model");
const ServiceRecord = require("../model/service-record-model");
const loginHelper = require("../helper/login-helper");
const Appointment = require("../model/apointment-model");
const AppointmentType = require("../enum/appointment");

exports.loginServiceAgent = async (req, res) => {
  const data = req.body;

  try {
    const { user, token } = await loginHelper.userLogin(data, User);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createServiceRecord = async (req, res) => {
  const { serviceCategory, customerId, vehicleId } = req.body;

  try {
    const serviceRecord = new ServiceRecord({
      serviceCategory,
      customerId,
      vehicleId,
    });

    const newserviceRecord = await serviceRecord.save();
    res.send({
      message: "Service Record create successfully",
      newserviceRecord,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.searchServiceRecords = async (req, res) => {
  const match = {};
  const query = req.query;
  const { customerId, vehicleId } = req.body;

  if (query) {
    if (query.customerId) {
      match.customerId = customerId;
    } else if (query.vehicleId) {
      match.vehicleId = vehicleId;
    }
  }

  try {
    const searchResult = await ServiceRecord.find(match);
    res.send(searchResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateServiceRecord = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updateServiceRecord = await ServiceRecord.findByIdAndUpdate(
      id,
      data,
      { runValidators: true, new: true }
    );

    res.send(updateServiceRecord);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteServiceRecords = async (req, res) => {
  const id = req.params.id;

  try {
    await ServiceRecord.findById(id);
    res.send({ message: "Delete records successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.approveOrRejectAppointment = async (req, res) => {
  const { approve, appointmentId, price } = req.body;

  try {
    if (!approve) {

      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { approveStatus: AppointmentType.REJECT },
        { runValidators: true, new: true }
      );

      return res.send({ message: "Reject appointment", appointment });
    }


    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { approveStatus: AppointmentType.APPROVE, price },
      { runValidators: true, new: true }
    );

    return res.send({ message: "Approve appoinment", appointment });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
