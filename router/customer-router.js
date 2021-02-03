const express = require('express')
const router = express.Router()

const customerController = require('../controller/customer-controller')
const Auth = require('../middleware/auth-middleware')
const Customer = require('../middleware/customer-middleware')

router.post('/signup', customerController.registerCustomer)
router.post('/login', customerController.loginCustomer)
router.post('/add-vehicle',[Auth, Customer], customerController.addVehicle)
router.patch('/update/:id',[Auth, Customer], customerController.editVehicle)
router.delete('/delete/:id',[Auth, Customer], customerController.deleteVehicle)
router.get('/search',[Auth, Customer], customerController.viewServiceRecords)
router.post('/appointment',[Auth, Customer], customerController.makeAppointment)


module.exports = router
