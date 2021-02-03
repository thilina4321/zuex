const User = require("../model/auth-model");
const Vehicle = require('../model/vehicle-model')
const UserType = require("../enum/userType");

const signupHelper = require("../helper/signup-helper");
const loginHelper = require("../helper/login-helper");

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

    res.send({message:'customer created successfully',customer})
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.loginCustomer = async(req,res)=>{
    const data = req.body

    try {
        const {user, token} = await loginHelper.userLogin(data, User)
        res.send({user, token})

    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.addVehicle = async(req,res)=>{
    const {carNumber, carYear, carColor} = req.body

    try {
        const vehicle = new Vehicle({
            carNumber,
            carColor, 
            carYear
        })

        await vehicle.save()
        res.send(vehicle)

    } catch (error) {
        res.status(500).send(error.message)
    }

}


exports.editVehicle = async(req,res)=>{
    const data = req.body
    const id = req.params.id

    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, data, {runValidators:true, new:true})
        res.send({message:'updated vehicle successfully', updatedVehicle})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.deleteVehicle = async(req,res)=>{
    const id = req.params.id

    try {
        await Vehicle.findByIdAndDelete(id)
        res.send({message:'Deleted vehicle successfully'})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.viewServiceRecords = async(req,res)=>{

}

exports.makeAppointment = async(req,res)=>{
    
}