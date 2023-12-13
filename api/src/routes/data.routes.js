const { test } = require('@app/controllers/data.controller')
const express = require('express')
const router = express.Router()

router.get("/", test)

module.exports = router