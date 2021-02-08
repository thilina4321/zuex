const express = require('express')
const router = express.Router()

const serviceRecordsControler = require('../controller/service-agent-controller')
const { route } = require('./super-admin.router')


router.post('/login', serviceRecordsControler.loginServiceAgent)

// records
router.post('/create-record', serviceRecordsControler.createServiceRecord)
router.patch('/update-record', serviceRecordsControler.updateServiceRecord)
router.get('/search-record', serviceRecordsControler.searchServiceRecords)
router.delete('/delete-record', serviceRecordsControler.deleteServiceRecords)
router.post('/appointment', serviceRecordsControler.approveOrRejectAppointment)

module.exports = router 