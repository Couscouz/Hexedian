const { test,fillClans } = require('@app/controllers/data.controller')
const express = require('express')
const { fillPlayers } = require('../controllers/data.controller')
const router = express.Router()

router.get("/", test)
router.get("/fillClans", fillClans)
router.get("/fillPlayers", fillPlayers)

module.exports = router