const express = require('express')
const router = express.Router()

const customerController = require('../controller/customer-controller')
const Auth = require('../middleware/auth-middleware')
const Customer = require('../middleware/customer-middleware')

router.post('/signup', customerController.registerCustomer)
router.post('/login', customerController.loginCustomer)

router.post('/add-vehicle',[Auth, Customer], customerController.addVehicle)
router.patch('/update-vehicle/:id',[Auth, Customer], customerController.editVehicle)
router.delete('/delete-vehicle/:id',[Auth, Customer], customerController.deleteVehicle)
router.get('/search',[Auth, Customer], customerController.viewServiceRecords)

// appointment
router.post('/appointment',[Auth, Customer], customerController.makeAppointment)
router.get('/available-payments', [Auth, Customer], customerController.availablePayments)
router.patch('/payment',[Auth, Customer], customerController.paymoney)

 
module.exports = router
 