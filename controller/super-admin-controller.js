const User = require('../model/auth-model')
const UserType = require('../enum/userType')
const Vehicle = require('../model/vehicle-model')

exports.createSuperAdmin = async(req,res)=>{
    const {email, password, contactNumber, userName} = req.body
    try {
        const superAdmin = new User({
            email,
            password,
            contactNumber,
            userName,
            role:UserType.SUPER_ADMIN
        })
        await superAdmin.save()
        res.sand(superAdmin)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

exports.createServiceAgent = async(req,res)=>{
    const {email, password, contactNumber, userName} = req.body
    try {
        const serviceAgent = new User({
            email,
            password,
            contactNumber,
            userName,
            role:UserType.SERVICE_AGENT
        })
        await serviceAgent.save()
        res.sand(serviceAgent)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

exports.customers = async(req,res)=>{
    try {
        const customers = await User.find({role:UserType.CUSTOMER})
        res.send(customers)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

exports.vehicles = async(req,res)=>{
    try {
        const vehicles = await Vehicle.find()
        res.send(vehicles)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}
