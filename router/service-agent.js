const express = require('express')
const router = express.Router()

const serviceRecordsControler = require('../controller/service-agent-controller')

router.post('/login', serviceRecordsControler.loginServiceAgent)
router.post('/create-record', serviceRecordsControler.createServiceRecord)
router.get('/delete-record', serviceRecordsControler.deleteServiceRecords)
router.get('/update-record', serviceRecordsControler.updateServiceRecord)
router.get('/search-record', serviceRecordsControler.searchServiceRecords)

module.exports = router 