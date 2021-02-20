const express = require('express')
const router = express.Router()

const serviceRecordsControler = require('../controller/service-agent-controller')
const Auth = require('../middleware/auth-middleware')
const Agent = require('../middleware/service-agent-middleware')

router.post('/login', serviceRecordsControler.loginServiceAgent)

// records
router.post('/create-record',[Auth, Agent], serviceRecordsControler.createServiceRecord)
router.patch('/update-record/:id',[Auth, Agent], serviceRecordsControler.updateServiceRecord)
router.get('/search-record',[Auth, Agent], serviceRecordsControler.searchServiceRecords)
router.delete('/delete-record/:id',[Auth, Agent], serviceRecordsControler.deleteServiceRecords)
router.patch('/appointment/:id',[Auth, Agent], serviceRecordsControler.approveOrRejectAppointment)
router.get('/appointments',[Auth, Agent], serviceRecordsControler.getAllAppointments)

module.exports = router 