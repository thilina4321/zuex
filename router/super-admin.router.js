const express = require('express')
const router = express.Router()

const superAdminController = require('../controller/super-admin-controller')

router.post('/signup', superAdminController.createSuperAdmin)
router.post('/login', superAdminController.loginSuperAdmin)
router.post('/create-service-agent', superAdminController.createServiceAgent)
router.get('/customers', superAdminController.customers)
router.get('/vehicles', superAdminController.vehicles)

module.exports = router 