const express = require('express')
const router = express.Router()

const superAdminController = require('../controller/super-admin-controller')
const Auth = require('../middleware/auth-middleware')
const Admin = require('../middleware/admin-middleware')

router.post('/signup', superAdminController.createSuperAdmin)
router.post('/login', superAdminController.loginSuperAdmin)

// service agent routes
router.post('/create-service-agent',[Auth, Admin], superAdminController.createServiceAgent)

// customer routes
router.post('/create-customer',[Auth,Admin], superAdminController.createCustomer)
router.get('/customers',[Auth,Admin], superAdminController.customers)
router.delete('/delete-customer/:id',[Auth,Admin], superAdminController.deleteCustomer)
router.patch('/update-customer/:id',[Auth,Admin], superAdminController.updateCustomer)

// vehicle routes 
router.post('/add-vehicle', [Auth,Admin], superAdminController.addVehicle)
router.get('/vehicles',[Auth,Admin], superAdminController.vehicles)
router.patch('/edit-vehicle/:id', [Auth,Admin], superAdminController.editVehicle)
 
//service records
router.get('/records', [Auth,Admin], superAdminController.searchServiceRecords)
router.get('/record/:id', [Auth,Admin], superAdminController.recordsOfUser)

module.exports = router  