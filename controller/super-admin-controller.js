const User = require("../model/auth-model");
const UserType = require("../enum/userType");
const Vehicle = require("../model/vehicle-model");

const loginHelper = require("../helper/login-helper");
const signupHelper = require("../helper/signup-helper");
const customerHelper = require('../helper/customer-helper')

exports.createSuperAdmin = async (req, res) => {
  const { email, password, contactNumber, userName } = req.body;
  try {
    const {user, error} = await signupHelper.userSignUp(
      email,
      password,
      contactNumber, 
      userName, 
      UserType.SUPER_ADMIN
    );

    if(error){
      return res.status(500).send({error});
    }

    res.send({
      message: "Signed up successfully you can login now!!",
      superAdmin:user
    });
    
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.loginSuperAdmin = async (req, res) => {
  const data = req.body;

  try {
    const { user, token,error } = await loginHelper.userLogin(data, User);
    if(user.role != UserType.SUPER_ADMIN){
      return res.status(404).send({error:'user not find'})
    }
    if(error){
      return res.status(500).send({error:error.message});
    }
    res.send({ user, token });
  } catch (error) {
  }
};

exports.createServiceAgent = async (req, res) => {
  const { email, password, contactNumber, userName } = req.body;
  try {
    const {user, error} = await signupHelper.userSignUp(
      email,
      password,
      contactNumber,
      userName,
      UserType.SERVICE_AGENT
    );

    if(error){
      return res.status(500).send({error});
    }
    res.send({ message: "Create Service agent successfully", serviceAgent:user });
  } catch (error) {
    res.status(500).send({error:error.message});
  }
};


exports.createCustomer = async (req, res) => {
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
      return res.status(500).send({error});
    }

    res.send({ message: "customer created successfully", customer:user });
  } catch (error) {
    res.status(500).send(error.message);
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
  const id = req.params.id
  try {
    await User.findByIdAndDelete(id)
    res.send({message:'Delete customer successfully'})
  } catch (error) {
    res.status(500).send({error:error.message})
  }

}

exports.updateCustomer = async(req,res)=>{
  const data = req.body
  try {
    const updateCustomer = await User.findByIdAndUpdate(data.id, {...data}, {runValidators:true, new:true})
    res.send({message:'Update customer successfully', customer:updateCustomer})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}


// vehicle section 

exports.addVehicle = async (req, res) => {
  const { carNumber, carYear, carColor, owner } = req.body;

  try {
    const vehicle = new Vehicle({
      carNumber,
      carColor,
      carYear,
      owner
    });

    const newVehicle = await vehicle.save();
    res.send({ message: "New vehicle created", vehicle:newVehicle });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.vehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send({vehicles});
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.editVehicle = async (req, res) => {
  const data = req.body;

  try {
    const { updatedVehicle, error } = await customerHelper.editVehicleHelper(data.id, data);

    if (error) {
      return res.status(500).send(error.message);
    }
    res.send({ message: "updated vehicle successfully", vehicle: updatedVehicle });
  } catch (error) {
    return res.status(500).send(error.message);
  }

};

exports.deleteVehicle = async (req, res) => {

  const id = req.params.id

  try {
    const { user, error } = await customerHelper.deleteVehicleHelper(id);
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send({ message: "Deleted vehicle successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// service record section started

exports.searchServiceRecords = async (req, res) => {
  const match = {};
  const {customerId, vehicleId} = req.query;

    if (customerId) {
      match.customerId = customerId;
    } 
    if (vehicleId) {
      match.vehicleId = vehicleId;
    }
  

  try {
    const searchRecords = await ServiceRecord.find(match);
    res.send(searchRecords);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.recordsOfUser = async(req,res)=>{
    const id = req.params.id

    try {
        const customer = await User.findById(id)
        const serviceRecords = await customer
          .populate("records")
          .execPopulate();
        
        res.send({serviceRecords})
      } catch (error) {
        res.status(500).send({error:error.message})
      }
}