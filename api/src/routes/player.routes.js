const { getAllPlayers,test } = require('@app/controllers/player.controller')
const express = require('express')
const router = express.Router()

router.get("/", getAllPlayers)
router.get("/test", test)

module.exports = router