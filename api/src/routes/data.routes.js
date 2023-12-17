const { test,fillClans } = require('@app/controllers/data.controller')
const express = require('express')
const router = express.Router()

router.get("/", test)
router.get("/fillClans", fillClans)

module.exports = router