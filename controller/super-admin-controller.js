const User = require("../model/auth-model");
const UserType = require("../enum/userType");
const Vehicle = require("../model/vehicle-model");

const loginHelper = require("../helper/login-helper");
const signupHelper = require("../helper/signup-helper");
const customerHelper = require('../helper/customer-helper')

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

exports.deleteCustomer = async(req,res)=>{
  const {id} = req.body
  try {
    await User.findByIdAndDelete(id)
    res.send({message:'Delete customer successfully'})
  } catch (error) {
    res.status(500).send(error.message)
  }

}

exports.updateCustomer = async(req,res)=>{
  const data = req.body
  try {
    await User.findByIdAndUpdate(data.id, {...data}, {runValidators:true, new:true})
    res.send({message:'Update customer successfully'})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.vehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.status(500).send("Server Error");
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



exports.searchServiceRecordsOfSelectedUser = async()=>{
    const id = req.params.id

    try {
        const customer = await User.findById(id)
        const serviceRecords = await customer
          .populate("records")
          .execPopulate();
        
        return {serviceRecords}
      } catch (error) {
        return {error:error.message}
      }
}